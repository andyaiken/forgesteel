import { AbilitySheet, CharacterSheet } from '../models/character-sheet';
import { Fragment, JSX } from 'react';
import { AbilityCard } from '../components/panels/hero-sheet/ability-card/ability-card';
import { Options } from '../models/options';
import { SheetFormatter } from './sheet-formatter';
import { SheetPageSize } from '../enums/sheet-page-size';

export interface FillerCard {
	element: JSX.Element;
	width: number;
	height: number;
	shown: boolean;
};

export interface ExtraCards {
	required: FillerCard[];
	optional: FillerCard[];
};

export class SheetLayout {
	static getAbilityLayout = (options: Options) => {
		// Get root font size (1rem)
		const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
		const charWidth = rootFontSize * 0.553;

		// gap between cards
		const gapPx = 10; // px

		const abilitiesPerPage = options.pageOrientation === 'portrait' ? 9 : 12;
		const abilitiesPerRow = options.pageOrientation === 'portrait' ? 3 : 4;

		let lineLenPx = options.pageOrientation === 'portrait' ? 415 : 402.5;
		let linesY = options.pageOrientation === 'portrait' ? 88 : 68;
		if (options.classicSheetPageSize === SheetPageSize.A4) {
			linesY = options.pageOrientation === 'portrait' ? 94 : 66;
			lineLenPx = options.pageOrientation === 'portrait' ? 403 : 428.5;
		}

		return {
			perPage: abilitiesPerPage,
			perRow: abilitiesPerRow,
			linesY: linesY,
			cardLineLen: Math.round(lineLenPx / charWidth),
			cardGap: Math.round(gapPx / charWidth)
		};
	};

	static getFillerCards = (spacesToFill: number, availableLinesY: number, rowH: number, extraCards: ExtraCards, options: Options): JSX.Element[] => {
		const layout = SheetLayout.getAbilityLayout(options);
		let refCards = [];
		let availableRowH = rowH;
		let spaceInRow = (spacesToFill % layout.perRow) || layout.perRow;
		if (spaceInRow === layout.perRow) {
			rowH = 0;
		} else {
			availableLinesY += rowH;
		}
		// console.log(`Filling ${spacesToFill} spaces, with ${rowH} + ${availableLinesY} available Y lines`);
		nextCard: while (spacesToFill > 0 && (extraCards.required.find(c => !c.shown) || extraCards.optional.find(c => !c.shown))) {
			spaceInRow = (spacesToFill % layout.perRow) || layout.perRow;
			if (spaceInRow === layout.perRow) {
				// new row
				availableLinesY -= rowH;
				if (rowH > 0)
					availableLinesY -= 2; // For vertical card gap between rows
				availableRowH = availableLinesY;
				rowH = 0;
			}
			// console.log('Available space in current row: ', spaceInRow, ' H:', availableRowH);
			for (const card of extraCards.required) {
				if (!card.shown && card.width <= spaceInRow && card.height <= availableRowH) {
					// console.log(`Adding card with H ${card.height} to current row`);
					refCards.push(card.element);
					spacesToFill -= card.width;
					card.shown = true;
					rowH = Math.max(rowH, card.height);
					continue nextCard;
				}
			}
			for (const card of extraCards.optional) {
				if (!card.shown && card.width <= spaceInRow && card.height <= availableRowH) {
					refCards.push(card.element);
					spacesToFill -= card.width;
					card.shown = true;
					rowH = Math.max(rowH, card.height);
					continue nextCard;
				}
			}
			// no cards found to fill the spot, clean up and break out
			if (spaceInRow !== layout.perRow) {
				// Incomplete row, remove partial row
				const newEnd = refCards.length - (layout.perRow - spaceInRow);
				refCards.slice(newEnd).forEach(card => {
					const req = extraCards.required.find(c => c.element === card);
					if (req) {
						req.shown = false;
					} else {
						const opt = extraCards.optional.find(c => c.element === card);
						if (opt)
							opt.shown = false;
					}
				});
				refCards = refCards.slice(0, newEnd);
			}
			return refCards;
		}
		return refCards;
	};

	static getAbilityPages = (character: CharacterSheet, extraCards: ExtraCards, options: Options) => {
		const layout = SheetLayout.getAbilityLayout(options);
		// future: Allow options to filter abilities displayed?
		let allAbilities = character.abilities;

		// future: Allow filtering *these* separately?
		if (options.showStandardAbilities) {
			allAbilities = allAbilities.concat(character.standardAbilities);
		}

		if (options.abilitySort === 'type') {
			allAbilities.sort(SheetFormatter.sortAbilitiesByType);
		} else {
			allAbilities.sort(SheetFormatter.sortAbilitiesByLength);
		}

		const abilitiesSplit: AbilitySheet[][] = [];
		// console.log('Layout:', layout);
		let n = 0;
		while (n < allAbilities.length) {
			// build a single page
			const pageStart = n;
			let h = 0;
			const pageAbilities: AbilitySheet[] = [];
			while (n < allAbilities.length && pageAbilities.length < layout.perPage && h < layout.linesY) {
				// get a row, calculate height
				const rowStart = n;
				const rowEnd = Math.min(n + layout.perRow, allAbilities.length);
				const rowAbilities = allAbilities.slice(rowStart, rowEnd);

				let rowH = 0;
				rowAbilities.every(a => {
					const aH = SheetFormatter.calculateAbilitySize(a, layout.cardLineLen);
					if (h + aH <= layout.linesY) {
						pageAbilities.push(a);
						rowH = Math.max(rowH, aH);
						n += 1;
						return true;
					} else {
						h = layout.linesY;
						return false;
					}
				});
				h += rowH;
				// console.log(`Row (${rowStart}, ${rowEnd}):`, rowAbilities.map(a => a.name), 'Height', rowH);
			}
			if (n === pageStart) {
				console.warn('Didn\'t add any abilities to this page!');
				n = allAbilities.length;
			}
			// console.log(`page abilities (${pageStart}, ${n}):`, pageAbilities);
			abilitiesSplit.push(pageAbilities);
		}

		// console.log('Abilities split: ', abilitiesSplit);

		const abilityCardPages = abilitiesSplit.map((pageAbilities, i) => {
			let refCards: JSX.Element[] = [];
			if (pageAbilities.length < layout.perPage) {
				const spacesToFill = layout.perPage - pageAbilities.length;
				const numRows = Math.ceil(pageAbilities.length / layout.perRow);
				let spaceY = layout.linesY;
				let rowY = spaceY;
				for (let r = 0; r < numRows; ++r) {
					const iRowStart = r * layout.perRow;
					const iRowEnd = Math.min(pageAbilities.length, (r + 1) * layout.perRow);
					rowY = SheetFormatter.getLargestSize(pageAbilities.slice(iRowStart, iRowEnd), layout.cardLineLen);
					// console.log(`row ${r} (${iRowStart}, ${iRowEnd}) H: `, rowY);
					spaceY -= rowY;
				}
				// console.log('overall spaceY:', spaceY, '/', layout.linesY, ' current rowY:', rowY);
				refCards = SheetLayout.getFillerCards(spacesToFill, spaceY, rowY, extraCards, options);
			}
			const abilityPageClasses = [ 'abilities', 'page' ];
			return (
				<Fragment key={`abilities-${i}`}>
					<hr className='dashed' />
					<div className={abilityPageClasses.join(' ')} id={SheetFormatter.getPageId(character.hero.id, `abilities-${i}`)}>
						{pageAbilities.map(a =>
							<AbilityCard
								key={a.id}
								ability={a}
							/>
						)}
						{refCards}
					</div>
				</Fragment>
			);
		});
		return abilityCardPages;
	};

	static getRequiredCardPages = (extraCards: ExtraCards, character: CharacterSheet, options: Options) => {
		const layout = SheetLayout.getAbilityLayout(options);
		const pages: JSX.Element[] = [];
		let i = 0;
		while (extraCards.required.find(c => !c.shown)) {
			const cards = SheetLayout.getFillerCards(layout.perPage, layout.linesY, 0, extraCards, options);
			if (cards.length === 0) {
				console.warn('No cards added, but required cards still not shown!', extraCards.required);
				break;
			}
			pages.push(
				<Fragment key={`extra-${++i}`}>
					<hr className='dashed' />
					<div className='abilities page' id={SheetFormatter.getPageId(character.hero.id, `extra-${i}`)}>
						{cards}
					</div>
				</Fragment>
			);
		}
		return pages;
	};
}
