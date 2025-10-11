import { Fragment, JSX } from 'react';
import { AbilityCard } from '@/components/panels/classic-sheet/ability-card/ability-card';
import { AbilitySheet } from '@/models/classic-sheets/ability-sheet';
import { EncounterSheet } from '@/models/classic-sheets/encounter-sheet';
import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import { Options } from '@/models/options';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { SheetPageSize } from '@/enums/sheet-page-size';

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
		}
		// console.log(`Filling ${spaceInRow} spaces in current row, with currentH=${rowH} (& total ${availableLinesY}) available Y lines`);
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
			// console.log('Available space in current row:', spaceInRow, 'current rowH:', rowH, 'overall H:', availableLinesY);

			// Space filling precedence:
			//	1. Largest required card under rowH
			let card = extraCards.required.filter(c => !c.shown && c.width <= spaceInRow)
				.sort((a, b) => b.height - a.height)
				.find(c => c.height <= rowH);

			//	2. Smallest required card under availableLinesY
			if (!card) {
				card = extraCards.required.filter(c => !c.shown && c.width <= spaceInRow)
					.sort((a, b) => a.height - b.height)
					.find(c => c.height <= availableLinesY);
			}

			//  3. Largest optional card under rowH
			if (!card) {
				card = extraCards.optional.filter(c => !c.shown && c.width <= spaceInRow)
					.sort((a, b) => b.height - a.height)
					.find(c => c.height <= rowH);
			}

			//	4. Smallest under availableLinesY
			if (!card) {
				card = extraCards.optional.filter(c => !c.shown && c.width <= spaceInRow)
					.sort((a, b) => a.height - b.height)
					.find(c => c.height <= availableLinesY);
			}

			if (card) {
				// console.log(`Adding card ${card.element.key} with H ${card.height} and W ${card.width} to current row`);
				refCards.push(card.element);
				slotsToFillInRow -= card.width;
				card.shown = true;
				rowH = Math.max(rowH, card.height);
				continue nextCard;
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
		if (availableLinesY > 0 && extraCards.optional.length > 0)
			console.warn('Got through all cards?', extraCards);
		return refCards;
	};

	static getAbilityPages = (character: HeroSheet, extraCards: ExtraCards, layout: CardPageLayout, options: Options) => {
		let allAbilities = character.abilities;

		if (options.shownStandardAbilities.length) {
			allAbilities = allAbilities.concat(character.standardAbilities.filter(a => options.shownStandardAbilities.includes(a.id)));
		}

		if (options.abilitySort === 'type') {
			allAbilities.sort(SheetFormatter.sortAbilitiesByType);
		} else {
			allAbilities.sort(SheetFormatter.sortAbilitiesByLength);
		}

		const pageClasses = [ 'abilities', 'page', layout.orientation, `row-cards-${layout.perRow}` ];
		let p = 1;
		const abilityCardPages: JSX.Element[] = [];
		// console.log('Layout:', layout);
		let numAbilitiesPlaced = 0;
		while (numAbilitiesPlaced < allAbilities.length) {
			// build a single page
			const pageStart = numAbilitiesPlaced;
			let pageH = 0;
			let rowH = 0;
			let pageAbilityGrid: { card: AbilitySheet, h: number; }[][] = [];
			let refCards: JSX.Element[] = [];

			while (numAbilitiesPlaced < allAbilities.length && pageH < layout.linesY) {
				// Try to fill a row with ability cards, calculating height
				const rowStartN = numAbilitiesPlaced;
				// const rowEnd = Math.min(numAbilitiesPlaced + layout.perRow, allAbilities.length);
				const rowAbilities = allAbilities.slice(rowStartN);

				rowH = 0;
				let rowSlotsFilled = 0;
				let rowIsFilled = false;

				let slotH = 0;
				let currentSlotCards: { card: AbilitySheet, h: number }[] = [];
				rowAbilities.every(a => {
					// if row was just filled, break out
					if (rowIsFilled)
						return false;

					// Calculate the next ability card height
					const aH = SheetFormatter.calculateAbilitySize(a, layout.cardLineLen);
					// if we are trying to fill a partial slot, check combined height
					if (currentSlotCards.length > 0) {
						// only fill up to current row height (+ a little wiggle room)
						let canStack = slotH + aH <= (rowH + 2);
						// -or- if there is not a lot of pageH left, allow going up to that
						if (layout.linesY - (pageH + rowH) < 20) {
							canStack = pageH + Math.max(slotH + aH, rowH) <= layout.linesY;
						}
						if (canStack) {
							currentSlotCards.push({ card: a, h: aH });
							numAbilitiesPlaced += 1;
							slotH += aH;

							rowH = Math.max(slotH, rowH);

							return true;
						} else {
							// Can't stack with previous slot, place *previous* slot
							pageAbilityGrid.push(currentSlotCards);
							rowH = Math.max(rowH, slotH);
							currentSlotCards = [];
							slotH = 0;

							rowSlotsFilled += 1;
							rowIsFilled = rowSlotsFilled === layout.perRow;

							if (rowIsFilled)
								return false;
						}
					}

					// If we got this far, check height as a new slot
					if (pageH + aH <= layout.linesY) {
						currentSlotCards.push({ card: a, h: aH });
						numAbilitiesPlaced += 1;
						slotH += aH;

						// Check if we can consolidate *previous* cards based on current rowH
						// Process:
						// - start with most recent TWO slots (only makes sense at 2+)
						// 		(or just grab whole row?)
						// - see if the combined heights is <= the latest card H
						// - if so, combine them and re-add to the array, adjusting rowSlots as necessary
						if (rowSlotsFilled >= 2) {
							let currentRow: { card: AbilitySheet, h: number; }[][] = [];

							for (let i = rowSlotsFilled; i > 0; --i) {
								const slot = pageAbilityGrid.pop();
								if (slot)
									currentRow.unshift(slot);
							}

							const slotHeights = currentRow.map(arr => arr.reduce((h, ash) => h += ash.h, 0));
							if (slotHeights[slotHeights.length - 1] + slotHeights[slotHeights.length - 2] <= slotH) {
								const combined = currentRow.slice(-2).flat(1);
								currentRow = currentRow.slice(0, -2);
								currentRow.push(combined);
								rowSlotsFilled -= 1;
							}

							currentRow.forEach(ash => pageAbilityGrid.push(ash));
						}

						return true;
					}
					return false;
				});
				// The final card will still need to be placed if we ended by going through all of the cards
				if (!rowIsFilled && currentSlotCards.length > 0) {
					pageAbilityGrid.push(currentSlotCards);
					rowH = Math.max(rowH, slotH);
					rowSlotsFilled += 1;
					rowIsFilled = rowSlotsFilled === layout.perRow;
				}

				pageH += rowH;
				if (rowH > 0) {
					pageH += 2.5; // For vertical card gap between rows
					// console.log(`Row (${rowStart + 1}, ${n}):`, allAbilities.slice(rowStart, n).map(a => a.name), 'Height', rowH);
				}

				// If we didn't fill this row, break out to start getting filler cards
				if (!rowIsFilled)
					break;
			}
			const filledSlotsInLastRow = (pageAbilityGrid.length % layout.perRow) || layout.perRow;
			// console.log('last row:', abilitiesInLastRow, 'pageH', pageH, 'lines', layout.linesY);
			if (filledSlotsInLastRow < layout.perRow || pageH < layout.linesY) {
				// try to find filler cards that will fit
				const spacesToFill = layout.perRow - filledSlotsInLastRow;
				let spaceY = layout.linesY - pageH + rowH;
				// console.log(`Need more cards, with ${pageAbilities.length} existing cards to fill out ${spaceY} lines in rows of ${layout.perRow} cards`);
				if (spacesToFill === 0) {
					// new row, so remove prev rowH
					spaceY -= rowH;
					rowH = 0;
				}
				// console.log('overall spaceY:', spaceY, '/', layout.linesY, ' current rowH:', rowH);
				refCards = SheetLayout.getFillerCards(spacesToFill, spaceY, rowH, extraCards, layout);
				// console.log('reference cards:', refCards);

				if (refCards.length < spacesToFill && filledSlotsInLastRow < layout.perRow) {
					// console.log('Need to cleanup partial abilities row!');
					// Incomplete row, remove partial row
					const newEnd = pageAbilityGrid.length - filledSlotsInLastRow;
					numAbilitiesPlaced -= filledSlotsInLastRow;
					pageAbilityGrid = pageAbilityGrid.slice(0, newEnd);
				}
			}

			if (numAbilitiesPlaced === pageStart) {
				console.warn(`Didn't add any abilities to this page! (pg ${abilityCardPages.length}), n=${numAbilitiesPlaced}/${allAbilities.length}`);
				numAbilitiesPlaced = allAbilities.length;
			}
			// console.log(`page abilities (${pageStart}, ${n}):`, pageAbilities);
			abilityCardPages.push(
				<Fragment key={`abilities-${p++}`}>
					<hr className='dashed' />
					<div className={pageClasses.join(' ')} id={SheetFormatter.getPageId('hero-sheet', character.hero.id, `abilities-${p}`)}>
						{pageAbilityGrid.map((a, i) => {
							if (a.length > 1) {
								return (
									<div className='stacked-cards' key={`abilities-${p}-${i}`}>
										{a.map(sa =>
											<AbilityCard
												key={sa.card.id}
												ability={sa.card}
											/>
										)}
									</div>
								);
							} else {
								return (
									<AbilityCard
										key={a[0].card.id}
										ability={a[0].card}
									/>
								);
							}
						})}
						{refCards}
					</div>
				</Fragment>
			);
		}
		return abilityCardPages;
	};

	static getRequiredCardPages = (extraCards: ExtraCards, character: HeroSheet, layout: CardPageLayout, idPrefix = 'extra') => {
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
					<div className={pageClasses.join(' ')} id={SheetFormatter.getPageId('hero-sheet', character.hero.id, `${idPrefix}-${i}`)}>
						{cards}
					</div>
				</Fragment>
			);
		}
		return pages;
	};

	static getMonsterCardPages = (monsterCards: FillerCard[], encounter: EncounterSheet, layout: CardPageLayout, idPrefix = 'extra') => {
		const pages: JSX.Element[] = [];
		let i = 0;
		const extraCards: ExtraCards = {
			required: monsterCards,
			optional: []
		};

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
					<div className={pageClasses.join(' ')} id={SheetFormatter.getPageId('encounter', encounter.id, `${idPrefix}-${i}`)}>
						{cards}
					</div>
				</Fragment>
			);
		}
		return pages;
	};
}
