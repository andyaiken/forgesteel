/*
 * Builds the frozen compression dictionary used by SharingLogic.
 *
 *     npx vite-node scripts/sharing/build-dictionary.ts -- --measure
 *     npx vite-node scripts/sharing/build-dictionary.ts -- --write
 *
 * See src/logic/sharing-dictionary.ts before running this with --write: the dictionary
 * is part of the wire format, and regenerating it invalidates every code already shared.
 */

import { deflateSync } from 'fflate';
import fs from 'node:fs';
import zlib from 'node:zlib';

// The data modules reach for feature flags, which read from localStorage; outside the
// browser there is nothing to read, and the default (unflagged) set of sourcebooks is
// exactly the corpus we want.
globalThis.localStorage ??= { getItem: () => null, setItem: () => {} } as unknown as Storage;

const BUDGET = 16 * 1024;

const encoder = new TextEncoder();

/*
 * Everything a code can carry: items, titles, and single monsters. Monster groups are not in
 * here - they are far too big to share as a code, and letting them into the corpus would spend
 * the budget on material no code will ever contain.
 *
 * Retainers are called out separately because they are the monsters most likely to be shared
 * and the largest of them, so they are the ones at risk of outgrowing a chat message. They go
 * into the sample the greedy search optimises against, which is what keeps their codes short.
 */
const getDocuments = async () => {
	const { SourcebookData } = await import('@/data/sourcebook-data');
	const { SourcebookLogic } = await import('@/logic/sourcebook-logic');
	const sourcebooks = await SourcebookData.loadAll();

	const monsters = SourcebookLogic.getMonsters(sourcebooks);
	const json = (list: unknown[]) => list.map(e => JSON.stringify(e));

	return {
		elements: json([ ...sourcebooks.flatMap(sb => sb.items), ...sourcebooks.flatMap(sb => sb.titles) ]),
		retainers: json(monsters.filter(m => m.role.organization === 'Retainer')),
		monsters: json(monsters.filter(m => m.role.organization !== 'Retainer'))
	};
};

const compressedSize = (docs: string[], dictionary: Uint8Array | undefined) => {
	return docs.reduce((total, doc) => {
		const bytes = deflateSync(encoder.encode(doc), { level: 9, ...(dictionary ? { dictionary } : {}) });
		return total + bytes.length;
	}, 0);
};

/*
 * Picks whole elements, greedily: each round keeps whichever element does the most to
 * shrink the rest of the corpus when added to what we have so far.
 *
 * Fragments of elements do worse than this - and worse than no curation at all - because
 * deflate matches runs of contiguous bytes, so chopping the corpus up destroys the long
 * natural runs that make a dictionary worth having. Whole elements keep them intact.
 *
 * Each pick is prepended rather than appended: the dictionary sits immediately before the
 * data being compressed, so its tail is the cheapest place to match against, and that is
 * where the most valuable element should end up.
 */
const select = (docs: string[], sample: string[], budget: number) => {
	const remaining = new Set(docs);
	let dictionary = '';
	let size = 0;
	let best = compressedSize(sample, undefined);

	for (;;) {
		let winner: string | null = null;

		remaining.forEach(candidate => {
			const bytes = encoder.encode(candidate).length;
			if (size + bytes > budget) {
				return;
			}

			const total = compressedSize(sample, encoder.encode(candidate + dictionary));
			if (total < best) {
				best = total;
				winner = candidate;
			}
		});

		if (!winner) {
			return dictionary;
		}

		remaining.delete(winner);
		dictionary = winner + dictionary;
		size += encoder.encode(winner).length;
	}
};

// What the payload section of a code actually costs, once base64url has had its way.
const measure = (docs: string[], dictionary?: Uint8Array) => {
	return docs.reduce((total, doc) => {
		const bytes = deflateSync(encoder.encode(doc), { level: 9, ...(dictionary ? { dictionary } : {}) });
		return total + Math.ceil(bytes.length * 4 / 3);
	}, 0);
};

const TARGET = 'src/logic/sharing-dictionary.ts';
const CHUNK = 120;

// Everything outside printable ASCII becomes an escape, so that the committed file cannot
// be changed by an editor's choice of encoding or by Unicode normalisation. The bytes this
// file produces are part of the wire format; they have to survive being checked in.
const escape = (text: string) => {
	return [ ...text ].map(character => {
		const code = character.codePointAt(0)!;

		if ((character === '\\') || (character === '\'')) {
			return `\\${character}`;
		}

		if ((code < 0x20) || (code > 0x7e)) {
			return [ ...character ].map(part => `\\u${part.charCodeAt(0).toString(16).padStart(4, '0')}`).join('');
		}

		return character;
	}).join('');
};

const render = (dictionary: string) => {
	const characters = [ ...dictionary ];
	const chunks: string[] = [];
	for (let n = 0; n < characters.length; n += CHUNK) {
		chunks.push(escape(characters.slice(n, n + CHUNK).join('')));
	}

	return [
		'/*',
		' * The compression dictionary used by SharingLogic, built by scripts/sharing/build-dictionary.ts',
		' * from the items, titles and monsters in the built-in sourcebooks.',
		' *',
		' * DO NOT EDIT OR REGENERATE THIS FILE.',
		' *',
		' * These bytes are part of the code format, not an implementation detail. Both ends of a code',
		' * have to feed deflate the same dictionary, so changing so much as one character here turns',
		' * every code anyone has already shared into garbage. New sourcebooks do not require a rebuild;',
		' * they compress a little less well than the ones which shaped this dictionary, and that is the',
		' * trade being made. If it ever does need to change, build a second dictionary alongside this',
		' * one, give it its own format prefix, and keep this one for reading old codes.',
		' *',
		' * Retainers are the largest thing a code can carry, and the reason for the 16kB budget: they',
		' * run to about 2,500 characters uncompressed, which will not fit in a chat message.',
		' *',
		' * sharing-logic.test.ts pins the hash of this file, so an accidental edit fails the build.',
		' */',
		'',
		'export const SharingDictionary = new TextEncoder().encode([',
		...chunks.map((chunk, n) => `\t'${chunk}'${n < chunks.length - 1 ? ',' : ''}`),
		'].join(\'\'));',
		''
	].join('\n');
};

const codeLength = (json: string, dictionary?: Uint8Array) =>
	Math.ceil(deflateSync(encoder.encode(json), { level: 9, ...(dictionary ? { dictionary } : {}) }).length * 4 / 3) + 17;

const median = (values: number[]) => [ ...values ].sort((a, b) => a - b)[Math.floor(values.length / 2)];

const run = async () => {
	const docs = await getDocuments();
	const all = [ ...docs.elements, ...docs.retainers, ...docs.monsters ];
	const mode = process.argv.includes('--write') ? 'write' : 'measure';

	console.log(`${docs.elements.length} items and titles, ${docs.retainers.length} retainers, ${docs.monsters.length} other monsters`);

	// Every retainer, and a quarter of everything else. The greedy search shrinks whatever is
	// in here, so retainers carry full weight - they are the ones near the chat limit.
	const sampleOf = (d: typeof docs) => [
		...d.elements.filter((_, n) => n % 4 === 0),
		...d.retainers,
		...d.monsters.filter((_, n) => n % 4 === 0)
	];

	if (mode === 'measure') {
		// Hold out every fifth of each kind, so we are measuring things the dictionary has
		// never seen - which is what homebrew content looks like.
		const held = (list: string[]) => list.filter((_, n) => n % 5 === 0);
		const kept = (list: string[]) => list.filter((_, n) => n % 5 !== 0);
		const train = { elements: kept(docs.elements), retainers: kept(docs.retainers), monsters: kept(docs.monsters) };

		const report = (label: string, dictionary?: Uint8Array) => {
			const r = held(docs.retainers).map(j => codeLength(j, dictionary));
			const e = held(docs.elements).map(j => codeLength(j, dictionary));
			const m = held(docs.monsters).map(j => codeLength(j, dictionary));
			console.log(
				label.padEnd(10),
				`retainers ${String(median(r)).padStart(5)} (worst ${String(Math.max(...r)).padStart(5)})`,
				` monsters ${String(median(m)).padStart(4)} (worst ${String(Math.max(...m)).padStart(5)})`,
				` items+titles ${String(median(e)).padStart(4)} (worst ${String(Math.max(...e)).padStart(5)})`
			);
		};

		console.log('');
		console.log('median code length for held-out content:');
		report('no dictionary');
		[ 8192, 16384, 24576, 32768 ].forEach(budget => {
			const dictionary = encoder.encode(select([ ...train.elements, ...train.retainers, ...train.monsters ], sampleOf(train), budget));
			report(`${budget / 1024}KB`, dictionary);
			console.log(' '.repeat(16), `  ${zlib.gzipSync(dictionary, { level: 9 }).length} bytes gzip, ${zlib.brotliCompressSync(dictionary).length} brotli`);
		});
		return;
	}

	const dictionary = select(all, sampleOf(docs), BUDGET);
	fs.writeFileSync(TARGET, render(dictionary), 'utf8');

	const bytes = encoder.encode(dictionary);
	console.log(`wrote ${bytes.length} bytes of dictionary to ${TARGET}`);
	console.log(`median code: retainers ${median(docs.retainers.map(j => codeLength(j, bytes)))}, items and titles ${median(docs.elements.map(j => codeLength(j, bytes)))}`);
	console.log(`payload saving across the corpus: ${((1 - measure(all, bytes) / measure(all)) * 100).toFixed(1)}%`);
};

run();
