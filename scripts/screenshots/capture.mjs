/**
 * Regenerates the tip screenshots in src/assets/screenshots.
 *
 *   npm run screenshots                  regenerate everything in the manifest
 *   npm run screenshots -- --list        list the shots without capturing
 *   npm run screenshots -- --only foo    capture just the named shot(s)
 *   npm run screenshots -- --out tmp     write elsewhere instead of src/assets
 *   npm run screenshots -- --headed      watch it happen
 *
 * Shots are declared in manifest.mjs; the app state they run against is built in seed.mjs.
 */

import { buildSeedState, writeSeedState } from './seed.mjs';
import { chromium } from 'playwright';
import { createServer } from 'vite';
import { fileURLToPath } from 'node:url';
import { shots } from './manifest.mjs';
import path from 'node:path';
import fs from 'node:fs/promises';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const defaults = {
	viewport: { width: 1200, height: 900 },
	// Rendered at 2x then downsampled to this width, which is what the tip panel displays
	outputWidth: 600,
	// The red callout box drawn around whatever a tip is pointing at
	highlight: { color: '#e8452c', width: 3, radius: 8, padding: 4 }
};

const parseArgs = argv => {
	const options = { only: [], out: 'src/assets/screenshots', list: false, headed: false };

	for (let i = 0; i < argv.length; i++) {
		switch (argv[i]) {
			case '--only':
				options.only.push(argv[++i]);
				break;
			case '--out':
				options.out = argv[++i];
				break;
			case '--list':
				options.list = true;
				break;
			case '--headed':
				options.headed = true;
				break;
			default:
				throw new Error(`Unknown argument '${argv[i]}'`);
		}
	}

	return options;
};

const resolveRoute = (route, state) => typeof route === 'function' ? route(state) : route;

/**
 * Replaces the page's randomness with a fixed sequence.
 *
 * Some screens genuinely roll dice - the random hero generator most obviously - and would
 * otherwise produce a different image every run, so every capture would look like a change.
 * Seeding both sources makes the whole suite reproducible without special-casing shots.
 */
const deterministicRandom = () => {
	let seed = 0x2f6e2b1;
	const next = () => {
		seed ^= seed << 13;
		seed ^= seed >>> 17;
		seed ^= seed << 5;
		return (seed >>> 0) / 0x100000000;
	};

	Math.random = next;
	if (globalThis.crypto) {
		crypto.getRandomValues = array => {
			for (let i = 0; i < array.length; i++) {
				array[i] = Math.floor(next() * 256);
			}
			return array;
		};
	}
};

// Settles the UI so repeat runs produce identical pixels. Animations are made instant rather
// than removed outright: antd fades its dropdowns and drawers in, so `animation: none` leaves
// them stuck at the start of the fade - visible to nobody, and unclickable to Playwright.
const settleStyles = `
	*, *::before, *::after {
		transition-duration: 1ms !important;
		transition-delay: 0s !important;
		animation-duration: 1ms !important;
		animation-delay: 0s !important;
		caret-color: transparent !important;
	}
`;

/**
 * Draws the red callout box the tips use to point at things.
 *
 * Boxes are resolved to rectangles here rather than in the page so that shots can use
 * Playwright's selector engine - `:has-text(...)` and friends - not just plain CSS.
 */
// Floating elements antd repositions after its own initial guess - once real content has been
// measured, not on a fixed schedule - so waiting on CSS animations alone isn't enough to catch it
const floatingSelector = '.ant-popover:not(.ant-popover-hidden), .ant-dropdown:not(.ant-dropdown-hidden), '
	+ '.ant-select-dropdown:not(.ant-select-dropdown-hidden), .ant-drawer-content-wrapper, .ant-modal';

/**
 * Waits for any open popover/dropdown/drawer to stop moving.
 *
 * antd measures a floating element's real content after it first mounts, then corrects its
 * position - a plain style write, not a CSS animation, so `document.getAnimations()` never sees
 * it. A popover with tall or variable-height content (a scrollable list, wrapped text) is
 * particularly prone to this: it can still be sliding into its final spot on the frame a
 * screenshot is taken, which is silent - nothing fails, the shot is just wrong on some runs.
 */
const waitForFloatingLayoutStable = async (page, selector) => {
	let previous = null;
	for (let i = 0; i < 10; i++) {
		await page.evaluate(() => new Promise(requestAnimationFrame));
		const current = await page.evaluate(sel => JSON.stringify(
			[ ...document.querySelectorAll(sel) ].map(el => {
				const r = el.getBoundingClientRect();
				return [ Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height) ];
			})
		), selector);

		if (current === previous) {
			return;
		}
		previous = current;
	}
};

/**
 * Waits for in-flight animations to finish, then for any floating element's position to settle.
 * They're already near-instant, but "near-instant" still isn't "finished" - without this,
 * drawers and dropdowns get measured or clicked while they're a frame or two from their final
 * position.
 */
const settle = async page => {
	// Twice, because a transition triggered by a click doesn't exist yet on the frame the
	// click returns - the first pass waits for it to start, the second for it to finish
	for (let pass = 0; pass < 2; pass++) {
		await page.evaluate(() => new Promise(requestAnimationFrame));
		await page.evaluate(async () => {
			await Promise.race([
				Promise.allSettled(document.getAnimations()
					.filter(a => a.effect?.getTiming().iterations !== Infinity)
					.map(a => a.finished)),
				new Promise(resolve => setTimeout(resolve, 1000))
			]);
		});
	}

	await waitForFloatingLayoutStable(page, floatingSelector);
};

const drawHighlights = async (page, selectors, style) => {
	const rects = [];
	for (const selector of selectors) {
		const elements = await page.locator(selector).all();
		if (!elements.length) {
			throw new Error(`Highlight selector '${selector}' matched nothing`);
		}

		for (const element of elements) {
			const box = await element.boundingBox();
			if (box) {
				rects.push(box);
			}
		}
	}

	await page.evaluate(({ rects, style }) => {
		rects.forEach(rect => {
			const box = document.createElement('div');
			box.dataset.screenshotHighlight = 'true';
			Object.assign(box.style, {
				position: 'absolute',
				left: `${rect.x + window.scrollX - style.padding}px`,
				top: `${rect.y + window.scrollY - style.padding}px`,
				width: `${rect.width + (style.padding * 2)}px`,
				height: `${rect.height + (style.padding * 2)}px`,
				border: `${style.width}px solid ${style.color}`,
				borderRadius: `${style.radius}px`,
				pointerEvents: 'none',
				zIndex: '99999'
			});
			document.body.appendChild(box);
		});
	}, { rects: rects, style: style });
};

const getClip = async (page, shot) => {
	const padding = shot.clipPadding ?? 0;
	const box = await page.locator(shot.clip).first().boundingBox();
	if (!box) {
		throw new Error(`Clip selector '${shot.clip}' matched nothing`);
	}

	const viewport = page.viewportSize();
	let top = Math.max(0, box.y - padding);
	let bottom = Math.min(viewport.height, box.y + box.height + padding);

	// Some things - the app header and footer, mainly - draw over the top of drawers and
	// modals. Pull the crop in past anything named here so it doesn't catch a slice of them.
	for (const selector of shot.clipAvoid ?? []) {
		const avoid = await page.locator(selector).first().boundingBox();
		if (!avoid) {
			continue;
		}

		const avoidBottom = avoid.y + avoid.height;
		if (avoid.y <= top && avoidBottom > top) {
			top = Math.min(avoidBottom, bottom);
		}
		if (avoidBottom >= bottom && avoid.y < bottom) {
			bottom = Math.max(avoid.y, top);
		}
	}

	const left = Math.max(0, box.x - padding);

	return {
		x: left,
		y: top,
		width: Math.min(box.width + (padding * 2), viewport.width - left),
		height: bottom - top
	};
};

/**
 * Downsamples by repeated halving, which keeps text far more readable than a
 * single big drawImage. Done in the browser to avoid pulling in an image library.
 */
const downscale = async (page, buffer, targetWidth) => {
	const dataUrl = await page.evaluate(async ({ source, targetWidth }) => {
		const image = new Image();
		image.src = source;
		await image.decode();

		let canvas = document.createElement('canvas');
		canvas.width = image.naturalWidth;
		canvas.height = image.naturalHeight;
		canvas.getContext('2d').drawImage(image, 0, 0);

		const shrinkTo = width => {
			const next = document.createElement('canvas');
			next.width = width;
			next.height = Math.round(canvas.height * (width / canvas.width));

			const context = next.getContext('2d');
			context.imageSmoothingEnabled = true;
			context.imageSmoothingQuality = 'high';
			context.drawImage(canvas, 0, 0, next.width, next.height);

			canvas = next;
		};

		while (canvas.width / 2 >= targetWidth) {
			shrinkTo(Math.round(canvas.width / 2));
		}
		if (canvas.width > targetWidth) {
			shrinkTo(targetWidth);
		}

		return canvas.toDataURL('image/png');
	}, { source: `data:image/png;base64,${buffer.toString('base64')}`, targetWidth: targetWidth });

	return Buffer.from(dataUrl.split(',')[1], 'base64');
};

const capture = async (page, baseUrl, state, shot, helper) => {
	await page.setViewportSize(shot.viewport ?? defaults.viewport);

	// Reset storage between shots so one shot's clicking around can't leak into the next
	await page.evaluate(() => {
		localStorage.clear();
		sessionStorage.clear();
	});
	await writeSeedState(page, state.storage);

	// goto only changes the hash, which won't re-boot the app; the reload makes it read the seeded data
	await page.goto(`${baseUrl}#${resolveRoute(shot.route, state)}`);
	await page.reload({ waitUntil: 'networkidle' });

	await page.evaluate(() => document.fonts.ready);
	await settle(page);

	if (shot.prepare) {
		// The settle helper is handed over so multi-step shots can wait between their own
		// clicks, not just at the end
		await shot.prepare(page, () => settle(page));
		await page.waitForLoadState('networkidle');
		await settle(page);
	}

	// Applied after prepare, not before: antd keeps realigning a popover for as long as
	// anything inside it is animating, and shrinking every animation to 1ms turns that into a
	// permanent jitter that Playwright never sees as stable, so nothing in a popover can be
	// clicked. By now everything is open and settled, and this just pins it down for the shot.
	await page.addStyleTag({ content: settleStyles });
	await settle(page);

	if (shot.highlight) {
		const selectors = Array.isArray(shot.highlight) ? shot.highlight : [ shot.highlight ];
		await drawHighlights(page, selectors, defaults.highlight);
	}

	const clip = shot.clip ? await getClip(page, shot) : undefined;
	const raw = await page.screenshot({ clip: clip, animations: 'disabled' });

	return downscale(helper, raw, shot.outputWidth ?? defaults.outputWidth);
};

const run = async () => {
	const options = parseArgs(process.argv.slice(2));
	const selected = options.only.length ? shots.filter(s => options.only.includes(s.name)) : shots;

	if (options.only.length) {
		const missing = options.only.filter(name => !shots.some(s => s.name === name));
		if (missing.length) {
			throw new Error(`No such shot(s): ${missing.join(', ')}`);
		}
	}

	if (options.list) {
		shots.forEach(shot => console.log(shot.name));
		return;
	}

	const outDir = path.resolve(root, options.out);
	await fs.mkdir(outDir, { recursive: true });

	const server = await createServer({ root: root, server: { port: 0 } });
	await server.listen();
	const baseUrl = server.resolvedUrls.local[0];

	const browser = await chromium.launch({ headless: !options.headed });
	const context = await browser.newContext({
		viewport: defaults.viewport,
		deviceScaleFactor: 2,
		reducedMotion: 'reduce',
		colorScheme: 'light'
	});
	await context.addInitScript(deterministicRandom);

	const page = await context.newPage();
	// A scratch page used only for downsampling captured images
	const helper = await browser.newPage();

	const failures = [];

	try {
		await page.goto(baseUrl, { waitUntil: 'networkidle' });
		const state = await buildSeedState(page);

		for (const shot of selected) {
			try {
				const image = await capture(page, baseUrl, state, shot, helper);
				await fs.writeFile(path.join(outDir, `${shot.name}.png`), image);
				// Printed whole rather than as a running prefix, since the dev server
				// forwards the page's console into the middle of this
				console.log(`${shot.name} ... ${Math.round(image.length / 1024)} KB`);
			} catch (error) {
				console.log(`${shot.name} ... FAILED`);
				console.error(`  ${error.message}`);
				failures.push(shot.name);
			}
		}
	} finally {
		await browser.close();
		await server.close();
	}

	console.log(`\n${selected.length - failures.length}/${selected.length} written to ${options.out}`);
	if (failures.length) {
		process.exitCode = 1;
	}
};

run().catch(error => {
	console.error(error);
	process.exit(1);
});
