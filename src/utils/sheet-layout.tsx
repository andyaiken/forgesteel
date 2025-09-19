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

interface CardPageLayout {
	orientation: 'portrait' | 'landscape';
	perRow: number;
	linesY: number;
	cardLineLen: number;
	cardGap: number;
};

export class SheetLayout {
	static getAbilityLayout = (options: Options): CardPageLayout => {
		// Get root font size (1rem)
		const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
		const charWidth = rootFontSize * 0.553;

		// gap between cards
		const gapPx = 10; // px

		const abilitiesPerRow = options.pageOrientation === 'portrait' ? 3 : 4;

		let lineLenPx = options.pageOrientation === 'portrait' ? 415 : 402.5;
		let linesY = options.pageOrientation === 'portrait' ? 88 : 68;
		if (options.classicSheetPageSize === SheetPageSize.A4) {
			linesY = options.pageOrientation === 'portrait' ? 94 : 66;
			lineLenPx = options.pageOrientation === 'portrait' ? 403 : 428.5;
		}

		return {
			orientation: options.pageOrientation,
			perRow: abilitiesPerRow,
			linesY: linesY,
			cardLineLen: Math.round(lineLenPx / charWidth),
			cardGap: Math.round(gapPx / charWidth)
		};
	};

	static getFollowerCardsLayout = (options: Options, hasRetainers: boolean): CardPageLayout => {
		// Get root font size (1rem)
		const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
		const charWidth = rootFontSize * 0.553;

		// FORCE portrait if there are any retainers
		const orientation = hasRetainers ? 'portrait' : options.pageOrientation;

		// gap between cards
		const gapPx = 10; // px
		const cardsPerRow = orientation === 'portrait' ? 2 : 3;

		let lineLenPx = orientation === 'portrait' ? 627.5 : 540;
		let linesY = orientation === 'portrait' ? 88 : 68;
		if (options.classicSheetPageSize === SheetPageSize.A4) {
			linesY = orientation === 'portrait' ? 94 : 66;
			lineLenPx = orientation === 'portrait' ? 610 : 575;
		}

		return {
			orientation: orientation,
			perRow: cardsPerRow,
			linesY: linesY,
			cardLineLen: Math.round(lineLenPx / charWidth),
			cardGap: Math.round(gapPx / charWidth)
		};
	};

	static getFillerCards = (slotsToFillInRow: number, availableLinesY: number, rowH: number, extraCards: ExtraCards, layout: CardPageLayout): JSX.Element[] => {
		let refCards = [];
		let spaceInRow = (slotsToFillInRow % layout.perRow) || layout.perRow;
		if (spaceInRow === layout.perRow) {
			rowH = 0;
			slotsToFillInRow = layout.perRow;
		} else {
			availableLinesY += rowH;
		}
		// console.log(`Filling ${spaceInRow} spaces in current row, with ${rowH} (& total ${availableLinesY}) available Y lines`);
		nextCard: while (availableLinesY > 0 && (extraCards.required.find(c => !c.shown) || extraCards.optional.find(c => !c.shown))) {
			spaceInRow = (slotsToFillInRow % layout.perRow) || layout.perRow;
			if (spaceInRow === layout.perRow) {
				// new row
				availableLinesY -= rowH;
				slotsToFillInRow = layout.perRow;
				if (rowH > 0)
					availableLinesY -= 2.5; // For vertical card gap between rows
				rowH = 0;
			}
			// console.log('Available space in current row: ', spaceInRow, ' H:', availableLinesY);
			for (const card of extraCards.required) {
				if (!card.shown && card.width <= spaceInRow && card.height <= availableLinesY) {
					// console.log(`Adding card ${card.element.key} with H ${card.height} and W ${card.width} to current row`);
					refCards.push(card.element);
					slotsToFillInRow -= card.width;
					card.shown = true;
					rowH = Math.max(rowH, card.height);
					continue nextCard;
				}
			}
			for (const card of extraCards.optional) {
				if (!card.shown && card.width <= spaceInRow && card.height <= availableLinesY) {
					// console.log(`Adding card ${card.element.key} with H ${card.height} and W ${card.width} to current row`);
					refCards.push(card.element);
					slotsToFillInRow -= card.width;
					card.shown = true;
					rowH = Math.max(rowH, card.height);
					continue nextCard;
				}
			}
			// no cards found to fill the spot, clean up and break out
			if (spaceInRow !== layout.perRow) {
				// console.log('Need to cleanup partial row!');
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
		if (availableLinesY > 0)
			console.warn('Got through all cards?', extraCards);
		return refCards;
	};

	static getAbilityPages = (character: CharacterSheet, extraCards: ExtraCards, layout: CardPageLayout, options: Options) => {
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

		const abilitiesSplit: { abilities: AbilitySheet[], height: number }[] = [];
		// console.log('Layout:', layout);
		let n = 0;
		while (n < allAbilities.length) {
			// build a single page
			const pageStart = n;
			let pageH = 0;
			const pageAbilities: AbilitySheet[] = [];
			while (n < allAbilities.length && pageH < layout.linesY) {
				// get a row, calculate height
				const rowStart = n;
				const rowEnd = Math.min(n + layout.perRow, allAbilities.length);
				const rowAbilities = allAbilities.slice(rowStart, rowEnd);

				let rowH = 0;
				rowAbilities.every(a => {
					const aH = SheetFormatter.calculateAbilitySize(a, layout.cardLineLen);
					if (pageH + aH <= layout.linesY) {
						pageAbilities.push(a);
						rowH = Math.max(rowH, aH);
						n += 1;
						return true;
					} else {
						pageH = layout.linesY;
						return false;
					}
				});
				pageH += rowH;
				// console.log(`Row (${rowStart}, ${rowEnd}):`, rowAbilities.map(a => a.name), 'Height', rowH);
			}
			if (n === pageStart) {
				console.warn('Didn\'t add any abilities to this page!');
				n = allAbilities.length;
			}
			// console.log(`page abilities (${pageStart}, ${n}):`, pageAbilities);
			abilitiesSplit.push({ abilities: pageAbilities, height: pageH });
		}
		// console.log('Abilities split: ', abilitiesSplit);

		const abilityCardPages = abilitiesSplit.map((page, i) => {
			const pageAbilities = page.abilities;
			let refCards: JSX.Element[] = [];
			const needMoreCards = ((pageAbilities.length % layout.perRow) !== 0) || page.height < layout.linesY;
			if (needMoreCards) {
				const spacesToFill = layout.perRow - (pageAbilities.length % layout.perRow);
				// console.log(`Need more cards, with ${pageAbilities.length} existing cards to fill out rows of ${layout.perRow}`);
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
				refCards = SheetLayout.getFillerCards(spacesToFill, spaceY, rowY, extraCards, layout);
			}
			const pageClasses = [ 'abilities', 'page', layout.orientation, `row-cards-${layout.perRow}` ];
			return (
				<Fragment key={`abilities-${i}`}>
					<hr className='dashed' />
					<div className={pageClasses.join(' ')} id={SheetFormatter.getPageId(character.hero.id, `abilities-${i}`)}>
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

	static getRequiredCardPages = (extraCards: ExtraCards, character: CharacterSheet, layout: CardPageLayout, idPrefix = 'extra') => {
		const pages: JSX.Element[] = [];
		let i = 0;
		while (extraCards.required.find(c => !c.shown)) {
			const cards = SheetLayout.getFillerCards(layout.perRow, layout.linesY, 0, extraCards, layout);
			if (cards.length === 0) {
				console.warn('No cards added, but required cards still not shown!', extraCards.required);
				break;
			}
			const pageClasses = [ 'extra-cards', 'page', layout.orientation, `row-cards-${layout.perRow}` ];
			pages.push(
				<Fragment key={`${idPrefix}-${++i}`}>
					<hr className='dashed' />
					<div className={pageClasses.join(' ')} id={SheetFormatter.getPageId(character.hero.id, `${idPrefix}-${i}`)}>
						{cards}
					</div>
				</Fragment>
			);
		}
		return pages;
	};
}
