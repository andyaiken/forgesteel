import { AbilitySheet, CharacterSheet } from '../../../../models/character-sheet';
import { EdgesBanesReferenceCard, MainActionsReferenceCard, ManeuversReferenceCard, MoveActionsReferenceCard, TurnOptionsReferenceCard } from '../../../panels/hero-sheet/reference/reference-cards';
import { Fragment, JSX, useMemo } from 'react';

import { AbilityCard } from '../../../panels/hero-sheet/ability-card/ability-card';
import { AncestryTraitsCard } from '../../../panels/hero-sheet/ancestry-traits-card/ancestry-traits-card';
import { CareerCard } from '../../../panels/hero-sheet/career-card/career-card';
import { CharacterSheetBuilder } from '../../../../utils/sheet-builder';
import { CharacterSheetFormatter } from '../../../../utils/character-sheet-formatter';
import { ClassFeaturesCard } from '../../../panels/hero-sheet/class-features-card/class-features-card';
import { ComplicationCard } from '../../../panels/hero-sheet/complication-card/complication-card';
import { ConditionsCard } from '../../../panels/hero-sheet/conditions-card/conditions-card';
import { CultureCard } from '../../../panels/hero-sheet/culture-card/culture-card';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FeatureReferenceCard } from '../../../panels/hero-sheet/reference/feature-reference-card';
import { Hero } from '../../../../models/hero';
import { HeroHeaderCard } from '../../../panels/hero-sheet/hero-header-card/hero-header-card';
import { ImmunitiesWeaknessesCard } from '../../../panels/hero-sheet/immunities-weaknesses-card/immunities-weaknesses-card';
import { InventoryCard } from '../../../panels/hero-sheet/inventory-card/inventory-card';
import { ModifiersCard } from '../../../panels/hero-sheet/modifiers-card/modifiers-card';
import { Options } from '../../../../models/options';
import { PerksCard } from '../../../panels/hero-sheet/perks-card/perks-card';
import { PotenciesCard } from '../../../panels/hero-sheet/potencies-card/potencies-card';
import { PrimaryReferenceCard } from '../../../panels/hero-sheet/reference/primary-reference-card';
import { ProjectsCard } from '../../../panels/hero-sheet/projects-card/projects-card';
import { SheetPageSize } from '../../../../enums/sheet-page-size';
import { SkillsCard } from '../../../panels/hero-sheet/skills-card/skills-card';
import { Sourcebook } from '../../../../models/sourcebook';
import { StatsResourcesCard } from '../../../panels/hero-sheet/stats-resources-card/stats-resources-card';
import { TitlesCard } from '../../../panels/hero-sheet/titles-card/titles-card';

import './hero-sheet-page.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
}

interface FillerCard {
	element: JSX.Element;
	width: number;
	height: number;
};

interface ExtraCards {
	required: FillerCard[];
	optional: FillerCard[];
}

export const HeroSheetPage = (props: Props) => {
	const hero = useMemo(() => props.hero, [ props.hero ]);

	const character = useMemo(
		() => CharacterSheetBuilder.buildSheetForHero(hero, props.sourcebooks, props.options),
		[ hero, props.sourcebooks, props.options ]
	);

	let pageNum = 0;
	const addPageId = (hero: Hero): string => {
		pageNum += 1;
		return CharacterSheetFormatter.getPageId(hero.id, pageNum);
	};

	const getAbilityLayout = (options: Options) => {
		const abilitiesPerPage = options.pageOrientation === 'portrait' ? 9 : 12;
		const abilitiesPerRow = options.pageOrientation === 'portrait' ? 3 : 4;
		let linesY = options.pageOrientation === 'portrait' ? 88 : 67;
		let lineLen = options.pageOrientation === 'portrait' ? 50 : 47;
		if (options.classicSheetPageSize === SheetPageSize.A4) {
			linesY = options.pageOrientation === 'portrait' ? 94 : 67;
			lineLen = options.pageOrientation === 'portrait' ? 45 : 50;
		}

		return {
			perPage: abilitiesPerPage,
			perRow: abilitiesPerRow,
			linesY: linesY,
			lineLen: lineLen
		};
	};

	const layout = useMemo(
		() => getAbilityLayout(props.options),
		[ props.options ]
	);

	const populateExtraCards = (character: CharacterSheet): ExtraCards => {
		const invH = 4 + CharacterSheetFormatter.calculateInventorySize(character.inventory, layout.lineLen);
		// console.log('Inventory length:', invH);
		const required = [ {
			element: <InventoryCard character={character} key='inventory' />,
			width: 1,
			height: Math.max(invH, 20)
		} ];
		const optional = [
			{
				element: <TurnOptionsReferenceCard key='turn-options-reference' />,
				width: 1,
				height: props.options.classicSheetPageSize === SheetPageSize.Letter ? 28 : 28
			},
			{
				element: <EdgesBanesReferenceCard key='edges-banes-reference' />,
				width: 1,
				height: props.options.classicSheetPageSize === SheetPageSize.Letter ? 22 : 22
			},
			{
				element: <MainActionsReferenceCard key='main-actions-reference' />,
				width: 1,
				height: props.options.classicSheetPageSize === SheetPageSize.Letter ? 19 : 19
			},
			{
				element: <MoveActionsReferenceCard key='move-actions-reference' />,
				width: 1,
				height: props.options.classicSheetPageSize === SheetPageSize.Letter ? 14 : 14
			},
			{
				element: <ManeuversReferenceCard key='maneuvers-reference' />,
				width: 1,
				height: props.options.classicSheetPageSize === SheetPageSize.Letter ? 28 : 28
			}
		];

		if (character.featuresReferenceOther?.length) {
			const len = 4 + CharacterSheetFormatter.calculateFeaturesSize(character.featuresReferenceOther, 2 * layout.lineLen);
			// console.log('Reference length: ', len);
			required.unshift({
				element: <FeatureReferenceCard character={character} key='feature-reference' />,
				width: 2,
				height: len
			});
		}

		return {
			required: required,
			optional: optional
		};
	};

	const getFillerCards = (spacesToFill: number, availableH: number, rowH: number, extraCards: ExtraCards): JSX.Element[] => {
		const refCards = [];
		// console.log(`Filling ${spacesToFill} spaces, with ${rowH} + ${availableH} available Y lines`);
		let availableRowH = rowH;
		let spaceInRow = (spacesToFill % layout.perRow) || layout.perRow;
		if (spaceInRow === layout.perRow) {
			rowH = 0;
		} else {
			availableH += rowH;
		}

		nextCard: while (spacesToFill > 0 && (extraCards.required.length > 0 || extraCards.optional.length > 0)) {
			spaceInRow = (spacesToFill % layout.perRow) || layout.perRow;
			if (spaceInRow === layout.perRow) {
				// new row
				availableH -= rowH;
				availableRowH = availableH;
				rowH = 0;
			}
			// console.log('Available space in current row: ', spaceInRow, ' H:', availableRowH);
			for (const card of extraCards.required) {
				if (card.width <= spaceInRow && card.height <= availableRowH) {
					refCards.push(card.element);
					spacesToFill -= card.width;
					extraCards.required = extraCards.required.filter(c => c !== card);
					rowH = Math.max(rowH, card.height);
					continue nextCard;
				}
			}
			for (const card of extraCards.optional) {
				if (card.width <= spaceInRow && card.height <= availableRowH) {
					refCards.push(card.element);
					spacesToFill -= card.width;
					extraCards.optional = extraCards.optional.filter(c => c !== card);
					rowH = Math.max(rowH, card.height);
					continue nextCard;
				}
			}
			// no cards found to fill the spot, break out
			return refCards;
		}
		return refCards;
	};

	const addAbilityPages = (character: CharacterSheet, extraCards: ExtraCards) => {
		// future: Allow options to filter abilities displayed?
		const allAbilities = character.freeStrikes.concat(character.signatureAbilities,
			character.heroicAbilities,
			character.triggeredActions,
			character.otherRollAbilities,
			character.otherAbilities);

		// future: Allow sorting by other things?
		allAbilities.sort(CharacterSheetFormatter.sortAbilitiesByLength);

		const abilitiesSplit: AbilitySheet[][] = [];
		const layout = getAbilityLayout(props.options);
		// console.log('Layout:', layout);
		let n = 0;
		while (n < allAbilities.length) {
			// build a single page
			const pageStart = n;
			let h = 0;
			let pageAbilities: AbilitySheet[] = [];
			while (n < allAbilities.length && pageAbilities.length < layout.perPage && h < layout.linesY) {
				// get a row, calculate height
				const rowStart = n;
				const rowEnd = Math.min(n + layout.perRow, allAbilities.length);
				const rowAbilities = allAbilities.slice(rowStart, rowEnd);
				const rowH = rowAbilities.reduce((h, a) => {
					return Math.max(h, CharacterSheetFormatter.calculateAbilitySize(a, layout.lineLen));
				}, 0);
				// console.log(`Row (${rowStart}, ${rowEnd}):`, rowAbilities.map(a => a.name), 'Height', rowH);

				if (h + rowH <= layout.linesY) {
					pageAbilities = pageAbilities.concat(rowAbilities);
					h += rowH;
					n = rowEnd;
				} else {
					// console.log('moving to new page, not adding last row', `${h} + ${rowH} > ${layout.linesY}`);
					h = layout.linesY;
				}
			}
			if (n === pageStart) {
				console.warn('Didn\'t add any abilities to this page!');
				n = allAbilities.length;
			}

			// console.log(`page abilities (${pageStart}, ${n}):`, pageAbilities);
			abilitiesSplit.push(pageAbilities);
		}

		// console.log('Abilities split: ', abilitiesSplit);

		// future: include mixed in? Allow filtering *these* separately?
		if (props.options.showStandardAbilities) {
			const standard = character.standardAbilities.sort(CharacterSheetFormatter.sortAbilitiesByLength);
			let n = 0;
			while (n < standard.length) {
				const start = n;
				const end = Math.min(n + layout.perPage, standard.length);
				const pageAbilities = standard.slice(start, end);
				abilitiesSplit.push(pageAbilities);
				n = end;
			}
		}

		const abilityCardPages = abilitiesSplit.map(pageAbilities => {
			let refCards: JSX.Element[] = [];
			if (pageAbilities.length < layout.perPage) {
				const spacesToFill = layout.perPage - pageAbilities.length;
				// for now, assume abilities are sorted based on height so we can use the last one to get a reference height
				const numRows = Math.ceil(pageAbilities.length / layout.perRow);
				let spaceY = layout.linesY;
				let rowY = spaceY;
				for (let r = 0; r < numRows; ++r) {
					const x = Math.min(pageAbilities.length, (r + 1) * layout.perRow);
					rowY = CharacterSheetFormatter.calculateAbilitySize(pageAbilities.at(x - 1), layout.lineLen);
					// console.log(`row ${r} H: `, rowY);
					spaceY -= rowY;
				}
				// console.log('overall spaceY:', spaceY, '/', layout.linesY, ' current rowY:', rowY);
				refCards = getFillerCards(spacesToFill, spaceY, rowY, extraCards);
			}
			const abilityPageClasses = [ 'abilities', 'page' ];
			if (props.options.colorAbilityCards) {
				abilityPageClasses.push('color');
			}
			return (
				<Fragment key={pageNum}>
					<hr className='dashed' />
					<div className={abilityPageClasses.join(' ')} id={addPageId(hero)}>
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

	try {
		const extraCards = populateExtraCards(character);
		return (
			<ErrorBoundary>
				<main id='hero-sheet-page'>
					<div className={[ 'hero-sheet', props.options.classicSheetPageSize.toLowerCase(), props.options.pageOrientation ].join(' ')} id={hero.id}>
						<div className='page page-1' id={addPageId(hero)}>
							<HeroHeaderCard
								character={character}
								options={props.options}
							/>
							<StatsResourcesCard
								character={character}
								options={props.options}
							/>
							<ModifiersCard
								character={character}
							/>
							<PotenciesCard
								character={character}
							/>
							<ConditionsCard
								character={character}
								options={props.options}
							/>
							<PrimaryReferenceCard
								character={character}
							/>
							<ImmunitiesWeaknessesCard
								character={character}
							/>
							<ClassFeaturesCard
								character={character}
							/>
							<AncestryTraitsCard
								character={character}
							/>
						</div>
						<hr className='dashed' />
						<div className='page page-2' id={addPageId(hero)}>
							<CareerCard
								career={character.career}
								hero={hero}
							/>
							<ComplicationCard
								complication={character.complication}
								hero={hero}
							/>
							<SkillsCard
								character={character}
							/>
							<CultureCard
								character={character}
							/>
							<PerksCard
								character={character}
							/>
							<TitlesCard
								character={character}
							/>
							<ProjectsCard
								character={character}
							/>
						</div>
						{addAbilityPages(character, extraCards)}
						{extraCards.required.length > 0
							? (
								<>
									<hr className='dashed' />
									<div className='abilities page' id={addPageId(hero)}>
										{getFillerCards(layout.perPage, layout.linesY, 0, extraCards)}
									</div>
								</>
							)
							: undefined }
					</div>
				</main>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
