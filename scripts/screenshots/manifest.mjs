/**
 * The screenshots to capture, one entry per file in src/assets/screenshots.
 *
 * Each shot supports:
 *   name          output filename, without the .png extension
 *   route         hash route to open, or a function of the seeded state
 *   viewport      CSS pixel size the app is laid out at (default 1200x900)
 *   prepare       async (page) => {} - clicks, hovers, whatever gets the UI into shape
 *   highlight     selector(s) to draw the red callout box around
 *   clip          selector to crop to (default: the whole viewport)
 *   clipPadding   pixels of breathing room around the clip selector (default 0)
 *   clipAvoid     selectors that draw over the clip, and should be trimmed out of it
 *
 * Selectors go through Playwright's engine, so `:has-text(...)` works as well as plain CSS.
 *
 * Adding a shot: copy an entry, point it at a route, and run
 *   npm run screenshots -- --only <name>
 * to iterate on it without regenerating everything else.
 */

// The hero screen's side panels (Resources, Vitals, Inventory, ...) open in a drawer from a
// row of buttons. The drawer covers the button that opened it, so there's nothing useful to
// call out - these shots crop to the drawer instead.
const heroPanelButton = name => `.header-text-panel .button-group button:has-text("${name}")`;
const openHeroPanel = name => async page => page.locator(heroPanelButton(name)).click();
const heroPanelDrawer = '.ant-drawer-section';
// The app header and footer sit above the drawer, so crops have to dodge them
const appChrome = [ '.app-header', '.app-footer' ];
// Shorter than the default so the drawer shots don't trail off into empty panel
const heroPanelViewport = { width: 1200, height: 720 };

// The session screen keeps everything that's been started in one segmented strip
const selectSessionItem = name => async page => page.locator('.session-page-content-selector').getByText(name, { exact: true }).click();

// Library element pages and the hero sheet share an icon-only view selector in the header,
// where the second option is always the printable Classic view
const viewSelector = '.app-header .ant-segmented';
const switchToClassic = async page => page.locator(`${viewSelector} .ant-segmented-item`).nth(1).click();

// Editors put the thing being edited on the left and a live preview on the right, with the
// section under construction picked from the left-hand tab strip
const editorTab = name => async page => page.locator('.ant-tabs-tab', { hasText: name }).first().click();

const footerButton = name => `.app-footer button:has-text("${name}")`;
const clickFooter = name => async page => page.locator(footerButton(name)).click();

// Customize, Conditional Features and Settings live behind the '...' button at the end of the
// hero's tool row, rather than having a button of their own
const openHeroOverflow = name => async (page, settle) => {
	await page.locator('.header-text-panel .button-group button:has(.anticon-ellipsis)').click();
	await settle();
	await page.getByRole('button', { name: name, exact: true }).click();
};

// The Library's Add button opens a popover of collapsed sections - premade examples, random
// generators - one of which has to be expanded before it shows anything
const openAddSection = title => async (page, settle) => {
	await page.getByRole('button', { name: 'Add' }).click();
	await settle();
	await page.locator('.ant-collapse-header', { hasText: title }).click();
};

export const shots = [
	{
		name: 'hero-sheet-interactive',
		route: state => `/hero/view/${state.heroes.troubadour.id}`,
		highlight: '.app-header .ant-segmented'
	},
	{
		name: 'hero-sheet-classic',
		route: state => `/hero/view/${state.heroes.troubadour.id}`,
		// The classic sheet is a fixed-width page, and needs the room
		viewport: { width: 1500, height: 1000 },
		// The view selector is icon-only, so it has to be picked out by position
		prepare: async page => page.locator('.app-header .ant-segmented-item').nth(1).click(),
		highlight: '.app-header .ant-segmented'
	},
	{
		name: 'hero-state',
		route: state => `/hero/view/${state.heroes.troubadour.id}`,
		prepare: openHeroPanel('Resources'),
		viewport: heroPanelViewport,
		clip: heroPanelDrawer,
		clipAvoid: appChrome
	},
	{
		name: 'hero-resource-frequency',
		route: state => `/hero/view/${state.heroes.troubadour.id}`,
		// The first gain is tagged 'start' and resets every Per Round gain when claimed, rather
		// than marking itself used - claim the second gain instead so the shot actually shows
		// the frequency pill next to a dimmed, already-used gain
		prepare: async (page, settle) => {
			await openHeroPanel('Resources')(page);
			await settle();
			await page.locator('.gain-btn').nth(1).click();
			await settle();
			await page.mouse.move(0, 0);
		},
		viewport: heroPanelViewport,
		clip: heroPanelDrawer,
		clipAvoid: appChrome
	},
	{
		name: 'hero-vitals',
		route: state => `/hero/view/${state.heroes.troubadour.id}`,
		prepare: openHeroPanel('Vitals'),
		viewport: heroPanelViewport,
		clip: heroPanelDrawer,
		clipAvoid: appChrome
	},
	{
		name: 'hero-sheet-inventory',
		route: state => `/hero/view/${state.heroes.troubadour.id}`,
		prepare: openHeroPanel('Inventory'),
		viewport: heroPanelViewport,
		clip: heroPanelDrawer,
		clipAvoid: appChrome
	},
	{
		name: 'hero-sheet-projects',
		route: state => `/hero/view/${state.heroes.troubadour.id}`,
		prepare: openHeroPanel('Projects'),
		viewport: heroPanelViewport,
		clip: heroPanelDrawer,
		clipAvoid: appChrome
	},
	{
		name: 'hero-sheet-customize',
		route: state => `/hero/view/${state.heroes.troubadour.id}`,
		prepare: openHeroOverflow('Customize'),
		viewport: heroPanelViewport,
		clip: heroPanelDrawer,
		clipAvoid: appChrome
	},
	{
		name: 'hero-sheet-retinue',
		route: state => `/hero/view/${state.heroes.troubadour.id}`,
		// The hero panel's tab strip is a Segmented control, and 'Retinue' also appears in the
		// sidebar - the first match is the one in the tab strip
		prepare: async page => page.locator('.ant-segmented-item:has-text("Retinue")').first().click(),
		// nth=0 because 'Retinue' also appears in the sidebar, and every match gets a box
		highlight: '.ant-segmented-item:has-text("Retinue") >> nth=0'
	},
	{
		name: 'hero-roll',
		route: state => `/hero/view/${state.heroes.troubadour.id}`,
		// Rolls are made by clicking the characteristic you're rolling against. The copies in the
		// left rail are hover-reveal - they sit under a .ghost overlay with pointer-events: none -
		// so this clicks the tile in the centre column instead.
		prepare: async page => page.locator('.stats-row.clickable', { hasText: 'Might' }).first().click(),
		viewport: heroPanelViewport,
		clip: heroPanelDrawer,
		clipAvoid: appChrome
	},
	{
		name: 'library',
		route: '/library/ancestry'
	},
	{
		name: 'sourcebooks',
		route: '/library/ancestry',
		prepare: async page => page.getByRole('button', { name: 'Sourcebooks' }).click()
	},
	{
		name: 'session-encounter',
		route: '/session/director',
		prepare: selectSessionItem('Goblin Ambush')
	},
	{
		name: 'session-montage',
		route: '/session/director',
		prepare: selectSessionItem('Fight Fire')
	},
	{
		name: 'session-negotiation',
		route: '/session/director',
		prepare: selectSessionItem('Bandit Chief')
	},
	{
		name: 'session-counter',
		route: '/session/director',
		prepare: selectSessionItem('Reinforcements')
	},
	{
		name: 'session-multiple',
		route: '/session/director',
		prepare: selectSessionItem('Goblin Ambush'),
		highlight: '.session-page-content-selector .ant-segmented'
	},
	{
		name: 'navigation',
		route: state => `/hero/view/${state.heroes.troubadour.id}`,
		clip: '.app-footer',
		clipPadding: 6,
		highlight: '.navigation-buttons-panel'
	},

	// #region Hero builder

	{
		name: 'hero-pregens',
		route: '/',
		prepare: async (page, settle) => {
			await page.getByRole('button', { name: 'Use a Premade Hero' }).click();
			await settle();
		}
	},
	{
		name: 'hero-random',
		route: '/hero',
		prepare: async (page, settle) => {
			await page.getByRole('button', { name: 'Add' }).click();
			await settle();
			// The dropdown keeps realigning itself, so it never reads as stable to Playwright;
			// the item is visible and correct, so click it without the stability check
			await page.getByText('Generate a Random Hero', { exact: true }).click({ force: true });
		}
	},
	{
		name: 'hero-folder',
		// A bare '/hero' leaves no folder selected, and the heroes all live in a named folder -
		// the tab strip would highlight fine but the list underneath would be empty
		route: state => `/hero/${encodeURIComponent(state.party)}`,
		highlight: '.section-header'
	},
	{
		name: 'hero-edit',
		route: state => `/hero/edit/${state.heroes.troubadour.id}/class`
	},
	{
		name: 'hero-edit-sourcebooks',
		route: state => `/hero/edit/${state.heroes.troubadour.id}/start`
	},

	// #endregion

	// #region Library

	{
		name: 'library-beastheart',
		route: '/library/class/class-beastheart',
		clip: '.class-panel'
	},
	{
		name: 'library-summoner',
		route: '/library/class/class-summoner',
		clip: '.class-panel'
	},
	{
		name: 'third-party',
		route: '/library/ancestry',
		prepare: async page => {
			await page.getByRole('button', { name: 'Sourcebooks' }).click();
			await page.locator('.ant-drawer').getByText('Third Party', { exact: true }).click();
		}
	},
	{
		name: 'library-encounter',
		route: state => `/library/encounter/${state.homebrew.encounter}`
	},
	{
		name: 'library-encounter-classic',
		route: state => `/library/encounter/${state.homebrew.encounter}`,
		prepare: switchToClassic,
		highlight: viewSelector
	},
	{
		name: 'library-encounter-tools',
		route: state => `/library/encounter/${state.homebrew.encounter}`,
		// The tools modal covers the button that opened it, so there's nothing to call out
		prepare: async page => page.getByRole('button', { name: 'Minis' }).click()
	},
	{
		name: 'library-encounter-random',
		route: '/library/encounter',
		prepare: openAddSection('Generate a random encounter')
	},
	{
		name: 'library-adventure',
		route: state => `/library/adventure/${state.homebrew.adventure}`
	},
	{
		name: 'library-map',
		route: state => `/library/tactical-map/${state.homebrew.map}`
	},
	{
		name: 'library-map-autobuild',
		route: '/library/tactical-map',
		prepare: openAddSection('Generate a random map')
	},
	{
		name: 'library-montage',
		route: state => `/library/montage/${state.homebrew.montage}`
	},
	{
		name: 'library-montage-classic',
		route: state => `/library/montage/${state.homebrew.montage}`,
		prepare: switchToClassic,
		highlight: viewSelector
	},
	{
		name: 'library-negotiation',
		route: state => `/library/negotiation/${state.homebrew.negotiation}`
	},
	{
		name: 'library-negotiation-classic',
		route: state => `/library/negotiation/${state.homebrew.negotiation}`,
		prepare: switchToClassic,
		highlight: viewSelector
	},

	// #endregion

	// #region Homebrew editors

	{
		name: 'library-encounter-builder',
		route: state => `/library/edit/encounter/${state.homebrew.id}/${state.homebrew.encounter}`,
		prepare: editorTab('Monsters')
	},
	{
		name: 'library-montage-builder',
		route: state => `/library/edit/montage/${state.homebrew.id}/${state.homebrew.montage}`,
		prepare: editorTab('Sections')
	},
	{
		name: 'library-negotiation-builder',
		route: state => `/library/edit/negotiation/${state.homebrew.id}/${state.homebrew.negotiation}`,
		prepare: editorTab('Motivations')
	},
	{
		name: 'monster-builder',
		route: state => `/library/edit/monster-group/${state.homebrew.id}/${state.homebrew.monsterGroup}/${state.homebrew.monster}`,
		// The builder opens on the group even when the URL names a monster, so the monster has
		// to be picked from the dropdown before the per-monster tabs - and the similar-monster
		// guidance this tip is about - become available
		prepare: async (page, settle) => {
			await page.locator('.ant-select').first().click();
			await settle();
			await page.locator('.ant-select-item-option').nth(1).click();
			await settle();
			await editorTab('Stats')(page);
			await page.locator('.ant-tabs-tab', { hasText: 'Similar Monsters' }).click();
		}
	},
	{
		name: 'monster-builder-genesplice',
		route: state => `/library/edit/monster-group/${state.homebrew.id}/${state.homebrew.monsterGroup}/${state.homebrew.monster}`,
		// Genesplice sits behind the tool icon on the Similar Monsters panel, which is only
		// reachable once a specific monster is picked out of the group
		prepare: async (page, settle) => {
			await page.locator('.ant-select').first().click();
			await settle();
			await page.locator('.ant-select-item-option').nth(1).click();
			await settle();
			await editorTab('Stats')(page);
			await page.locator('.ant-tabs-tab', { hasText: 'Similar Monsters' }).click();
			await settle();
			await page.locator('button:has(.anticon-tool)').last().click();
			// The popover's own open animation has to finish here, before the pipeline's later
			// style pass forces every transition to 1ms - interrupting it mid-flight leaves the
			// popover full-size but misaligned, pinned to the left edge of the viewport
			await settle();
		},
		highlight: 'button:has-text("Genesplice")'
	},
	{
		name: 'homebrew',
		route: state => `/library/edit/kit/${state.homebrew.id}/${state.homebrew.kit}`,
		prepare: editorTab('Damage')
	},
	{
		name: 'homebrew-kit-tuning',
		route: state => `/library/edit/kit/${state.homebrew.id}/${state.homebrew.kit}`,
		prepare: editorTab('Tuning')
	},

	// #endregion

	// #region App chrome

	{
		name: 'footer',
		route: state => `/hero/view/${state.heroes.troubadour.id}`,
		clip: '.app-footer',
		clipPadding: 6,
		highlight: footerButton('About')
	},
	{
		name: 'footer-reference',
		route: state => `/hero/view/${state.heroes.troubadour.id}`,
		// Opens on the Rules tab by default - switch to Conditions so the shot shows something
		// more useful than a bare topic list
		prepare: async (page, settle) => {
			await clickFooter('Reference')(page);
			await settle();
			await page.locator('.ant-segmented-item', { hasText: 'Conditions' }).click();
		}
	},
	{
		name: 'footer-settings',
		route: state => `/hero/view/${state.heroes.troubadour.id}`,
		prepare: clickFooter('Settings')
	}

	// #endregion
];
