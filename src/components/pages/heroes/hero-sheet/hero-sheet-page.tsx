import { CardPageLayout, ExtraCards, FillerCard, SheetLayout } from '@/logic/classic-sheet/sheet-layout';
import { CarryThreeSafelyReference, EdgesBanesReferenceCard, FallingReferenceCard, MainActionsReferenceCard, ManeuversReferenceCard, MarkdownReferenceCard, MoveActionsReferenceCard, MovementReferenceCard, RulesReferenceCard } from '@/components/panels/classic-sheet/reference/reference-cards';
import { ConsumablesCard, LeveledTreasureCard, RemainingInventoryCard, TrinketsCard } from '@/components/panels/classic-sheet/inventory-card/inventory-card';
import { CareerCard } from '@/components/panels/classic-sheet/career-card/career-card';
import { ClassFeaturesCard } from '@/components/panels/classic-sheet/class-features-card/class-features-card';
import { CompanionCard } from '@/components/panels/classic-sheet/follower-card/companion-card';
import { ComplicationCard } from '@/components/panels/classic-sheet/complication-card/complication-card';
import { ConditionsCard } from '@/components/panels/classic-sheet/conditions-card/conditions-card';
import { CultureCard } from '@/components/panels/classic-sheet/culture-card/culture-card';
import { DebugCard } from '@/components/panels/classic-sheet/reference/debug-card';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureReferenceCard } from '@/components/panels/classic-sheet/reference/feature-reference-card';
import { FollowersCard } from '@/components/panels/classic-sheet/follower-card/followers-card';
import { Hero } from '@/models/hero';
import { HeroHeaderCard } from '@/components/panels/classic-sheet/hero-header-card/hero-header-card';
import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import { HeroSheetBuilder } from '@/logic/hero-sheet/hero-sheet-builder';
import { ImmunitiesWeaknessesCard } from '@/components/panels/classic-sheet/immunities-weaknesses-card/immunities-weaknesses-card';
import { ItemLogic } from '@/logic/item-logic';
import { ItemType } from '@/enums/item-type';
import { ModifiersCard } from '@/components/panels/classic-sheet/modifiers-card/modifiers-card';
import { MonsterCard } from '@/components/panels/classic-sheet/monster-card/monster-card';
import { NotesCard } from '@/components/panels/classic-sheet/notes-card/notes-card';
import { PerksCard } from '@/components/panels/classic-sheet/perks-card/perks-card';
import { PotenciesCard } from '@/components/panels/classic-sheet/potencies-card/potencies-card';
import { PrimaryReferenceCard } from '@/components/panels/classic-sheet/reference/primary-reference-card';
import { ProjectsCard } from '@/components/panels/classic-sheet/projects-card/projects-card';
import { ProjectsOverviewCard } from '@/components/panels/classic-sheet/projects-card/project-info-card';
import { RollModifiersCard } from '@/components/panels/classic-sheet/roll-modifiers-card/roll-modifiers-card';
import { RulesData } from '@/data/rules-data';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { SkillsCard } from '@/components/panels/classic-sheet/skills-card/skills-card';
import { Sourcebook } from '@/models/sourcebook';
import { StatsResourcesCard } from '@/components/panels/classic-sheet/stats-resources-card/stats-resources-card';
import { TerrainCard } from '@/components/panels/classic-sheet/monster-card/terrain-card';
import { TitlesCard } from '@/components/panels/classic-sheet/titles-card/titles-card';
import { useMemo } from 'react';
import { useOptions } from '@/contexts/data-context';

import './hero-sheet-page.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
};

export const HeroSheetPage = (props: Props) => {
	const hero = useMemo(() => props.hero, [ props.hero ]);
	const options = useOptions();

	const character = useMemo(
		() => HeroSheetBuilder.buildHeroSheet(hero, props.sourcebooks, options),
		[ hero, props.sourcebooks, options ]
	);

	const sheetClasses = useMemo(
		() => {
			const classes = [
				'hero-sheet',
				options.classicSheetPageSize.toLowerCase()
			];
			if (options.colorSheet) {
				classes.push('color');
				classes.push(`colors-${options.colorScheme}`);
			}
			return classes;
		},
		[ options.classicSheetPageSize, options.colorSheet, options.colorScheme ]
	);

	const layout = useMemo(
		() => SheetLayout.getAbilityLayout(options),
		[ options ]
	);

	const getFeatureReferenceCards = (features: HeroSheet['featuresReferenceOther'], cardLayout: CardPageLayout, width: number): FillerCard[] => {
		const columns = Math.max(1, width - 1);
		const lineWidth = (width * cardLayout.cardLineLen + (width - 1) * cardLayout.cardGap) / columns;
		// Leave room for headings, paragraph spacing and differences in text wrapping.
		const groups = SheetFormatter.splitFeatureReferences(features, hero, lineWidth, columns, cardLayout.linesY * 0.85);
		return groups.map((group, i) => ({
			element: <FeatureReferenceCard character={{ ...character, featuresReferenceOther: group }} columns={columns} width={width} key={`feature-reference-${group[0].feature.id}-${i}`} />,
			width: width,
			height: SheetFormatter.calculateFeatureReferenceSize(group, hero, lineWidth, columns),
			shown: false,
			featureReferences: group
		}));
	};

	const populateExtraCards = (character: HeroSheet): ExtraCards => {
		const required = [
			{
				element: <NotesCard notes={character.notes} key='notes' />,
				width: 1,
				height: Math.max(20, SheetFormatter.countLines(character.notes, layout.cardLineLen)),
				shown: false
			}
		];

		if (options.debugClassicSheet) {
			required.push({
				element: <DebugCard key='debug' />,
				width: 1,
				height: 15,
				shown: false
			});
		}

		character.extraComplications.forEach(c => {
			required.unshift({
				element: <ComplicationCard complication={c} hero={hero} key={c.id} />,
				width: 1,
				height: Math.min(layout.linesY, SheetFormatter.calculateComplicationSize(c, layout.cardLineLen)),
				shown: false
			});
		});

		let lineWidth = layout.cardLineLen;

		// Features / Reference / Other
		if (character.featuresReferenceOther.length) {
			const refH = SheetFormatter.calculateFeatureReferenceSize(character.featuresReferenceOther, hero, layout.cardGap + 2 * layout.cardLineLen, 1);
			const refW = refH > 60 ? layout.perRow : 2;
			required.unshift(...getFeatureReferenceCards(character.featuresReferenceOther, layout, refW));
		}

		character.extraReferenceItems
			.filter(refItem => refItem.section === 'abilities')
			.forEach((refItem, i) => {
				const refW = refItem.wide ? layout.perRow : 1;
				lineWidth = refItem.wide ? ((layout.perRow - 1) * layout.cardGap) + (layout.perRow * layout.cardLineLen) : layout.cardLineLen;
				const refH = SheetFormatter.countLines(refItem.content, lineWidth);
				required.unshift({
					element: <MarkdownReferenceCard title={refItem.title} content={refItem.content} width={refW} key={`reference-${i}-${refItem.title}`} />,
					width: refW,
					height: refH,
					shown: false
				});
			});

		const numLeveledTreasures = character.inventory?.filter(i => ItemLogic.isLeveledTreasure(i.item)).length ?? 0;
		if (numLeveledTreasures > 3) {
			required.push({
				element: <CarryThreeSafelyReference key='carry-three-safely-reference' />,
				width: 1,
				height: 31,
				shown: false
			});
		}

		if (character.projects.length) {
			const h = SheetFormatter.calculateProjectsOverviewCardSize(character.projects, layout.cardLineLen);
			required.push({
				element: <ProjectsOverviewCard projects={character.projects} key='projects-overview' />,
				width: 1,
				height: h,
				shown: false
			});
		}

		if (character.rollModifiers?.length) {
			required.push({
				element: <RollModifiersCard rollModifiers={character.rollModifiers} key='roll-modifiers' />,
				width: 1,
				height: SheetFormatter.calculateRollModifiersCardSize(character.rollModifiers, layout.cardLineLen),
				shown: false
			});
		}

		const optional = [
			{
				element: <EdgesBanesReferenceCard key='edges-banes-reference' />,
				width: 1,
				height: 22,
				shown: false
			},
			{
				element: <MainActionsReferenceCard key='main-actions-reference' />,
				width: 1,
				height: 23,
				shown: false
			},
			{
				element: <ManeuversReferenceCard key='maneuvers-reference' />,
				width: 1,
				height: 39,
				shown: false
			},
			{
				element: <MoveActionsReferenceCard key='move-actions-reference' />,
				width: 1,
				height: 14,
				shown: false
			},
			{
				element: <MovementReferenceCard key='movement-reference' />,
				width: 1,
				height: 39,
				shown: false
			},
			{
				element: <FallingReferenceCard key='falling-reference' />,
				width: 1,
				height: 25,
				shown: false
			}
		];

		const addlRules = [
			RulesData.concealment,
			RulesData.criticalHit,
			RulesData.climbingAndSwimming,
			RulesData.jumping,
			RulesData.cover,
			RulesData.difficultTerrain,
			RulesData.dyingAndDeath,
			RulesData.flanking,
			RulesData.hiding,
			RulesData.highGround,
			RulesData.shifting,
			RulesData.duringTheMove,
			RulesData.opportunityAttack,
			RulesData.invisibility,
			RulesData.slammingCreatures,
			RulesData.slammingObjects,
			RulesData.sneaking,
			RulesData.rollVsMultipleCreatures
		];

		addlRules.forEach(rule => {
			optional.push({
				element: <RulesReferenceCard key={rule.label.toLocaleLowerCase().split(' ').join('-')} rule={rule} />,
				width: 1,
				height: SheetFormatter.calculateRuleReferenceCardSize(rule, layout.cardLineLen),
				shown: false
			});
		});

		return {
			required: required,
			optional: optional.sort((a, b) => b.height - a.height)
		};
	};

	const addAbilityPages = (character: HeroSheet, extraCards: ExtraCards) => {
		return SheetLayout.getAbilityPagesForCharacter(character, extraCards, layout, options);
	};

	const getRemainingCards = (extraCards: ExtraCards) => {
		const hasRetainers = character.followers.some(f => [ 'Retainer', 'Companion' ].includes(f.classification));
		const layoutEnd = SheetLayout.getFollowerCardsLayout(options, hasRetainers);
		const heightRatio = 0.83;

		// Recalculate card heights
		extraCards.required = extraCards.required.flatMap(card => {
			if (!card.shown && card.featureReferences) {
				const width = layoutEnd.orientation === 'portrait' ? 1 : 2;
				return getFeatureReferenceCards(card.featureReferences, layoutEnd, width);
			}
			return [ card ];
		});
		extraCards.required.filter(card => !card.shown).forEach(card => {
			if (card.featureReferences) {
				return;
			}
			switch (card.element.key) {
				case 'notes':
					card.height = Math.max(20, card.height * heightRatio);
					break;
				default:
					card.height *= heightRatio;
					break;
			}
		});

		extraCards.optional.filter(card => !card.shown).forEach(card => card.height *= heightRatio);

		extraCards.required.sort((a, b) => a.height - b.height);

		// Folowers only go here
		if (character.followers.length) {
			character.followers.filter(f => f.classification !== 'Follower').forEach(fs => {
				extraCards.required.unshift({
					element: <CompanionCard companion={fs} key={fs.id} />,
					width: 1,
					height: Math.min(layoutEnd.linesY, SheetFormatter.calculateFollowerSize(fs, layoutEnd.cardLineLen)),
					shown: false
				});
			});
			const followers = character.followers.filter(f => f.classification === 'Follower');
			if (followers.length) {
				extraCards.required.unshift({
					element: <FollowersCard followers={followers} key='followers' />,
					width: 1,
					height: Math.min(layoutEnd.linesY, SheetFormatter.calculateFollowersSize(followers, layoutEnd.cardLineLen)),
					shown: false
				});
			}
		}
		const lineLenWide = ((layoutEnd.perRow - 1) * layoutEnd.cardGap) + (layoutEnd.perRow * layoutEnd.cardLineLen);
		character.extraReferenceItems
			.filter(refItem => refItem.section === 'followers')
			.forEach((refItem, i) => {
				let refW = refItem.wide ? layoutEnd.perRow : 1;
				let refH = 3 + SheetFormatter.countLines(refItem.content, refItem.wide ? lineLenWide : layoutEnd.cardLineLen);
				if (refH > layoutEnd.linesY && refW === 1) {
					refW = layoutEnd.perRow;
					refH = 3 + SheetFormatter.countLines(refItem.content, lineLenWide);
				}
				extraCards.required.unshift({
					element: <MarkdownReferenceCard title={refItem.title} content={refItem.content} width={refW} key={`reference-${i}-${refItem.title}`} />,
					width: refW,
					height: refH,
					shown: false
				});
			});

		// Artifacts, and maybe consumables on 'overflow' inventory card
		const artifacts = character.inventory?.filter(i => i.item.type === ItemType.Artifact) ?? [];
		const consumables = character.inventory?.filter(i => [ ItemType.Consumable1st, ItemType.Consumable2nd, ItemType.Consumable3rd, ItemType.Consumable4th ].includes(i.item.type)) ?? [];
		const maxConsumables = options.pageOrientation === 'portrait' ? 2 : 4; // approximation
		if (artifacts.length || consumables.length > maxConsumables) {
			const inv = artifacts.concat(consumables);
			const invH = SheetFormatter.calculateInventorySize(inv, layoutEnd.cardLineLen);
			extraCards.required.push({
				element: <RemainingInventoryCard key='inventory-overflow' character={character} items={inv} />,
				width: 1,
				height: invH,
				shown: false
			});
		}

		return SheetLayout.getRequiredCardPages(extraCards, character, layoutEnd, 'followers');
	};

	const getSummonPages = () => {
		const summonLayout = SheetLayout.getCardsLayoutForOrientation(options, options.pageOrientation);
		const cards: FillerCard[] = character.summons.map(summon => {
			// Hero sheets use larger ability text than the dense monster/library sheets.
			const lineWidth = summonLayout.cardLineLen / 1.4;
			let height = SheetFormatter.calculateMonsterSize(summon, lineWidth) * 1.15;
			const width = height > summonLayout.linesY ? 2 : 1;
			if (width > 1) {
				height = SheetFormatter.calculateMonsterSize(summon, lineWidth, width) * 1.15;
			}
			return {
				element: <MonsterCard monster={summon} columns={width} key={summon.id} />,
				width: width,
				height: height,
				shown: false
			};
		});
		character.fixtures.forEach(fixture => {
			let height = SheetFormatter.calculateTerrainSize(fixture, summonLayout.cardLineLen) * 1.15;
			const width = height > summonLayout.linesY ? 2 : 1;
			if (width > 1) {
				height = SheetFormatter.calculateTerrainSize(fixture, summonLayout.cardLineLen, width) * 1.15;
			}
			cards.push({
				element: <TerrainCard terrain={fixture} columns={width} key={fixture.id} />,
				width: width,
				height: height,
				shown: false
			});
		});
		return SheetLayout.getMonsterCardPages(cards, summonLayout, SheetFormatter.getPageId('hero-sheet', hero.id, 'summons'), true);
	};

	const extraCards = populateExtraCards(character);
	return (
		<ErrorBoundary>
			<main id='classic-sheet'>
				<div className={sheetClasses.join(' ')} id={SheetFormatter.getPageId('hero', hero.id)}>
					<div className={`page page-1 ${options.pageOrientation}`} id={SheetFormatter.getPageId('hero-sheet', hero.id)}>
						<HeroHeaderCard
							character={character}
						/>
						<StatsResourcesCard
							character={character}
						/>
						<ModifiersCard
							character={character}
						/>
						<PotenciesCard
							character={character}
						/>
						<ConditionsCard
							character={character}
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
					</div>
					<hr className='dashed' />
					<div className={`page page-2 ${options.pageOrientation}`} id={SheetFormatter.getPageId('hero-sheet', hero.id, '2')}>
						<CultureCard
							character={character}
						/>
						<div className='career-complication'>
							<CareerCard
								career={character.career}
								hero={hero}
							/>
							<ComplicationCard
								complication={character.complication}
								hero={hero}
							/>

						</div>
						<SkillsCard
							character={character}
						/>
						<PerksCard
							character={character}
						/>
					</div>
					{addAbilityPages(character, extraCards)}
					<hr className='dashed' />
					<div className={`page page-titles-inventory-projects ${options.pageOrientation}`} id={SheetFormatter.getPageId('hero-sheet', hero.id, 'titles-inv-proj')}>
						<TitlesCard
							character={character}
							showLong='all'
							wide={options.pageOrientation === 'portrait'}
						/>
						<TrinketsCard
							character={character}
							wide={options.pageOrientation === 'portrait'}
						/>
						<LeveledTreasureCard
							character={character}
							wide={true}
						/>
						<ConsumablesCard
							character={character}
							wide={options.pageOrientation !== 'portrait'}
						/>
						<ProjectsCard
							projects={character.projects}
						/>
					</div>
					{getSummonPages()}
					{getRemainingCards(extraCards)}
				</div>
			</main>
		</ErrorBoundary>
	);
};
