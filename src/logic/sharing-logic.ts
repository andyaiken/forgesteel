import { Inflate, deflateSync } from 'fflate';

import { Element } from '@/models/element';
import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';
import { Monster } from '@/models/monster';
import { SharingDictionary } from '@/logic/sharing-dictionary';
import { Title } from '@/models/title';
import { UpdateLogic } from '@/logic/update/update-logic';
import { Utils } from '@/utils/utils';

/*
 * What a code can carry. Not every kind of library element is here: monster groups run to
 * thousands of characters even compressed, so they stay on file export, and a single monster
 * is only shareable because a retainer is stored on the hero rather than referenced.
 */
export type SharedElementKind = 'item' | 'title' | 'monster';

export interface SharedElement {
	kind: SharedElementKind;
	item: Item | null;
	title: Title | null;
	monster: Monster | null;
};

/*
 * Discord cuts a message off at 2000 characters, and it is the tightest of the chat apps a
 * code is likely to be pasted into. A code longer than this still works - decode strips
 * whitespace, so it can be sent in pieces and pasted back together - but it stops being the
 * one-paste operation the format is for, which is worth warning about.
 */
export const MAX_CHAT_CODE_LENGTH = 2000;

const PREFIX = 'FS1';
const SEPARATOR = '.';
const MAX_DECODED_BYTES = 1024 * 1024;
const MAX_INPUT_CHUNK = 4 * 1024;
const TOO_MUCH_DATA = 'That code contains far too much data.';

/**
 * Turns an item or a title into a short piece of text which can be pasted into a chat message,
 * and turns that text back into an item or a title.
 *
 * The code looks like this:
 *
 *     FS1.item.zVqxTsMwFPyViKkMkXAJUjuiTkjAAIxdEictxWmD2ODruXfPSRxwoFLVqmuc2LH93vndncMVtJAxP1J...22ik1nbuc80
 *     |   |    |                                                                                        |
 *     |   |    |                                                                                        checksum
 *     |   |    JSON, deflated against the shared dictionary, base64url encoded
 *     |   what kind of thing this is
 *     format version
 *
 * The dictionary in sharing-dictionary.ts is what keeps these short - it takes roughly a third
 * off, and more for anything close to a book item. It is also why the format version matters:
 * a code can only be read by a copy of Forge Steel holding the same dictionary.
 */
export class SharingLogic {
	static encode = async (kind: SharedElementKind, element: Element): Promise<string> => {
		const copy = Utils.copy(element);

		if (kind === 'title') {
			// The recipient should choose their own feature
			(copy as Title).selectedFeatureID = '';
		}

		const json = JSON.stringify(copy);
		const payload = SharingLogic.toBase64Url(SharingLogic.deflate(json));

		return [ PREFIX, kind, payload, SharingLogic.getChecksum(payload) ].join(SEPARATOR);
	};

	static decode = async (code: string): Promise<SharedElement> => {
		const parts = code.replace(/\s/g, '').split(SEPARATOR);

		if (!parts[0].startsWith('FS')) {
			throw new Error('That does not look like a Forge Steel code.');
		}

		if (parts.length !== 4) {
			throw new Error('That code is incomplete or garbled; make sure you copied all of it.');
		}

		const [ prefix, kind, payload, checksum ] = parts;

		if (prefix !== PREFIX) {
			throw new Error('That code was made with a newer version of Forge Steel.');
		}

		if ((kind !== 'item') && (kind !== 'title') && (kind !== 'monster')) {
			throw new Error(`Forge Steel cannot import a ${kind} code here.`);
		}

		if (checksum !== SharingLogic.getChecksum(payload)) {
			throw new Error('That code is incomplete or garbled; make sure you copied all of it.');
		}

		let element: unknown;
		try {
			element = JSON.parse(SharingLogic.inflate(SharingLogic.fromBase64Url(payload)));
		} catch (ex) {
			const tooMuch = (ex instanceof Error) && (ex.message === TOO_MUCH_DATA);
			throw new Error(tooMuch ? TOO_MUCH_DATA : 'That code is damaged and cannot be read.', { cause: ex });
		}

		switch (kind) {
			case 'item':
				return SharingLogic.readItem(element as Item);
			case 'title':
				return SharingLogic.readTitle(element as Title);
			case 'monster':
				return SharingLogic.readMonster(element as Monster);
		}
	};

	static getKind = (code: string): SharedElementKind | null => {
		const kind = code.replace(/\s/g, '').split(SEPARATOR)[1];
		return ((kind === 'item') || (kind === 'title') || (kind === 'monster')) ? kind : null;
	};

	// #region Reading

	private static readItem = (item: Item): SharedElement => {
		if (!item || (typeof item !== 'object') || (typeof item.name !== 'string') || !Object.values(ItemType).includes(item.type)) {
			throw new Error('That code does not contain an item.');
		}

		UpdateLogic.updateItem(item);

		return { kind: 'item', item: item, title: null, monster: null };
	};

	private static readTitle = (title: Title): SharedElement => {
		if (!title || (typeof title !== 'object') || (typeof title.name !== 'string') || (typeof title.echelon !== 'number')) {
			throw new Error('That code does not contain a title.');
		}

		UpdateLogic.updateTitle(title);

		return { kind: 'title', item: null, title: title, monster: null };
	};

	private static readMonster = (monster: Monster): SharedElement => {
		if (!monster || (typeof monster !== 'object') || (typeof monster.name !== 'string') || !monster.role || (typeof monster.level !== 'number')) {
			throw new Error('That code does not contain a monster.');
		}

		UpdateLogic.updateMonster(monster);

		return { kind: 'monster', item: null, title: null, monster: monster };
	};

	// #endregion

	// #region Plumbing

	private static getChecksum = (payload: string) => {
		return Utils.hashCode(payload).toString(36);
	};

	private static deflate = (text: string) => {
		return deflateSync(new TextEncoder().encode(text), { level: 9, dictionary: SharingDictionary });
	};

	private static inflate = (bytes: Uint8Array) => {
		const chunks: Uint8Array[] = [];
		let length = 0;

		const stream = new Inflate({ dictionary: SharingDictionary });
		stream.ondata = chunk => {
			length += chunk.length;
			if (length > MAX_DECODED_BYTES) {
				throw new Error(TOO_MUCH_DATA);
			}

			chunks.push(chunk);
		};

		// Fed in slices rather than all at once, so that a code which claims to hold a gigabyte
		// trips the limit above after a few kilobytes instead of after the allocation.
		for (let n = 0; n < bytes.length; n += MAX_INPUT_CHUNK) {
			const end = Math.min(n + MAX_INPUT_CHUNK, bytes.length);
			stream.push(bytes.subarray(n, end), end === bytes.length);
		}

		const data = new Uint8Array(length);
		let offset = 0;
		chunks.forEach(chunk => {
			data.set(chunk, offset);
			offset += chunk.length;
		});

		return new TextDecoder().decode(data);
	};

	private static toBase64Url = (bytes: Uint8Array) => {
		let binary = '';
		bytes.forEach(b => binary += String.fromCharCode(b));

		return btoa(binary)
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');
	};

	private static fromBase64Url = (text: string) => {
		const base64 = text.replace(/-/g, '+').replace(/_/g, '/');
		const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
		const binary = atob(padded);

		const bytes = new Uint8Array(binary.length);
		for (let n = 0; n < binary.length; ++n) {
			bytes[n] = binary.charCodeAt(n);
		}

		return bytes;
	};

	// #endregion
};
