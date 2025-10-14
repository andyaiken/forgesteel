import { ConsumablesCard, LeveledTreasureCard, TrinketsCard } from '@/components/panels/classic-sheet/inventory-card/inventory-card';
import { EdgesBanesReferenceCard, FallingReferenceCard, MainActionsReferenceCard, ManeuversReferenceCard, MoveActionsReferenceCard, MovementReferenceCard, RulesReferenceCard } from '@/components/panels/classic-sheet/reference/reference-cards';
import { ExtraCards, SheetLayout } from '@/logic/classic-sheet/sheet-layout';
import { CareerCard } from '@/components/panels/classic-sheet/career-card/career-card';
import { ClassFeaturesCard } from '@/components/panels/classic-sheet/class-features-card/class-features-card';
import { ComplicationCard } from '@/components/panels/classic-sheet/complication-card/complication-card';
import { ConditionsCard } from '@/components/panels/classic-sheet/conditions-card/conditions-card';
import { CultureCard } from '@/components/panels/classic-sheet/culture-card/culture-card';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureReferenceCard } from '@/components/panels/classic-sheet/reference/feature-reference-card';
import { FollowersCard } from '@/components/panels/classic-sheet/follower-card/followers-card';
import { Hero } from '@/models/hero';
import { HeroHeaderCard } from '@/components/panels/classic-sheet/hero-header-card/hero-header-card';
import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import { HeroSheetBuilder } from '@/logic/hero-sheet/hero-sheet-builder';
import { ImmunitiesWeaknessesCard } from '@/components/panels/classic-sheet/immunities-weaknesses-card/immunities-weaknesses-card';
import { ModifiersCard } from '@/components/panels/classic-sheet/modifiers-card/modifiers-card';
import { NotesCard } from '@/components/panels/classic-sheet/notes-card/notes-card';
import { Options } from '@/models/options';
import { PerksCard } from '@/components/panels/classic-sheet/perks-card/perks-card';
import { PotenciesCard } from '@/components/panels/classic-sheet/potencies-card/potencies-card';
import { PrimaryReferenceCard } from '@/components/panels/classic-sheet/reference/primary-reference-card';
import { ProjectsCard } from '@/components/panels/classic-sheet/projects-card/projects-card';
import { RetainerCard } from '@/components/panels/classic-sheet/follower-card/retainer-card';
import { RulesData } from '@/data/rules-data';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { SkillsCard } from '@/components/panels/classic-sheet/skills-card/skills-card';
import { Sourcebook } from '@/models/sourcebook';
import { StatsResourcesCard } from '@/components/panels/classic-sheet/stats-resources-card/stats-resources-card';
import { TitlesCard } from '@/components/panels/classic-sheet/titles-card/titles-card';
import { useMemo } from 'react';

import './hero-sheet-page.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
};

export const HeroSheetPage = (props: Props) => {
	const hero = useMemo(() => props.hero, [ props.hero ]);

	const character = useMemo(
		() => HeroSheetBuilder.buildHeroSheet(hero, props.sourcebooks, props.options),
		[ hero, props.sourcebooks, props.options ]
	);

	const sheetClasses = useMemo(
		() => {
			const classes = [
				'hero-sheet',
				props.options.classicSheetPageSize.toLowerCase()
			];
			if (props.options.colorSheet) {
				classes.push('color');
			}
			return classes;
		},
		[ props.options.classicSheetPageSize, props.options.colorSheet ]
	);

	const layout = useMemo(
		() => SheetLayout.getAbilityLayout(props.options),
		[ props.options ]
	);

	const populateExtraCards = (character: HeroSheet): ExtraCards => {
		const required = [
			{
				element: <NotesCard notes={character.notes} key='notes' />,
				width: 1,
				height: Math.max(20, SheetFormatter.countLines(character.notes, layout.cardLineLen)),
				shown: false
			}
		];

		let lineWidth = layout.cardLineLen;

		// Features / Reference / Other
		if (character.featuresReferenceOther?.length) {
			lineWidth = layout.cardGap + 2 * layout.cardLineLen;
			let refH = SheetFormatter.calculateFeatureReferenceSize(character.featuresReferenceOther, hero, lineWidth);
			let refW = 2;
			if (refH > 60) {
				refW = 3;
				lineWidth = (2 * layout.cardGap) + (3 * layout.cardLineLen) * 0.49;
				refH = SheetFormatter.calculateFeatureReferenceSize(character.featuresReferenceOther, hero, lineWidth) * 0.52;
				if (refH > layout.linesY && layout.perRow === 4) {
					refW = 4;
					lineWidth = (3 * layout.cardGap) + (4 * layout.cardLineLen) * 0.33;
					refH = SheetFormatter.calculateFeatureReferenceSize(character.featuresReferenceOther, hero, lineWidth) * 0.34;
				}
				if (refH > layout.linesY) {
					console.warn('Features reference is still too long!');
					refH = Math.min(layout.linesY, refH);// Will need a better solution at some point
				}
			}
			// console.log('###### Reference size: ', refH);
			required.unshift({
				element: <FeatureReferenceCard character={character} columns={refW - 1} key='feature-reference' />,
				width: refW,
				height: refH,
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
			RulesData.damageAndEffect,
			RulesData.duringTheMove,
			RulesData.opportunityAttack,
			RulesData.invisibility,
			RulesData.slammingCreatures,
			RulesData.slammingObjects,
			RulesData.sneaking,
			RulesData.rollVsMultipleCreatures
		];

		// future: check for 'flying' or 'hover' in the character and add relevant reference card(s)?
		// Other possible candidates:
		//   - Teleportation
		//   - Wielding Treasures
		// -- or --
		// Have a multiselect for users to manually choose reference cards like for standard abilities?

		addlRules.forEach((rule, n) => {
			optional.push({
				element: <RulesReferenceCard key={n} rule={rule} />,
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
		return SheetLayout.getAbilityPages(character, extraCards, layout, props.options);
	};

	const getFinalCards = (extraCards: ExtraCards) => {
		return SheetLayout.getRequiredCardPages(extraCards, character, layout);
	};

	const getFollowerCards = (extraCards: ExtraCards) => {
		const hasRetainers = character.followers.some(f => f.classification === 'Retainer');
		const layoutEnd = SheetLayout.getFollowerCardsLayout(props.options, hasRetainers);
		const heightRatio = 0.83;

		// Recalculate card heights
		extraCards.required.filter(card => !card.shown).forEach(card => {
			switch (card.element.key) {
				case 'notes':
					card.height = Math.max(20, card.height * heightRatio);
					break;
				case 'inventory':
					if (card.width === 1) {
						card.height = Math.max(20, SheetFormatter.calculateInventorySize(character.inventory, layoutEnd.cardLineLen));
					} else {
						card.height = Math.ceil(SheetFormatter.calculateInventorySize(character.inventory, layoutEnd.cardLineLen) * 0.5);
					}
					break;
				case 'feature-reference':
					card.width = Math.min(2, card.width);
					if (card.width === 1) {
						card.height = SheetFormatter.calculateFeatureReferenceSize(character.featuresReferenceOther, hero, layoutEnd.cardLineLen);
					} else {
						card.height = Math.ceil(SheetFormatter.calculateFeatureReferenceSize(character.featuresReferenceOther, hero, layoutEnd.cardLineLen) * 0.5);
					}
					break;
				default:
					card.height *= heightRatio;
					break;
			}
		});

		extraCards.optional.filter(card => !card.shown).forEach(card => card.height *= heightRatio);

		// Folowers only go here
		if (character.followers.length) {
			character.followers.filter(f => f.classification === 'Retainer').forEach(fs => {
				extraCards.required.push({
					element: <RetainerCard follower={fs} options={props.options} key={fs.id} />,
					width: 1,
					height: Math.min(layoutEnd.linesY, SheetFormatter.calculateFollowerSize(fs, layoutEnd.cardLineLen)),
					shown: false
				});
			});
			const followers = character.followers.filter(f => f.classification === 'Follower');
			if (followers.length) {
				extraCards.required.push({
					element: <FollowersCard followers={followers} options={props.options} key='followers' />,
					width: 1,
					height: Math.min(layoutEnd.linesY, SheetFormatter.calculateFollowersSize(followers, layoutEnd.cardLineLen)),
					shown: false
				});
			}
		}

		extraCards.required.sort((a, b) => a.height - b.height);

		return SheetLayout.getRequiredCardPages(extraCards, character, layoutEnd, 'followers');
	};

	const extraCards = populateExtraCards(character);
	return (
		<ErrorBoundary>
			<main id='classic-sheet'>
				<div className={sheetClasses.join(' ')} id={hero.id}>
					<div className={`page page-1 ${props.options.pageOrientation}`} id={SheetFormatter.getPageId('hero-sheet', hero.id, 'main')}>
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
							options={props.options}
						/>
						<ImmunitiesWeaknessesCard
							character={character}
						/>
						<ClassFeaturesCard
							character={character}
							options={props.options}
						/>
					</div>
					<hr className='dashed' />
					<div className={`page page-2 ${props.options.pageOrientation}`} id={SheetFormatter.getPageId('hero-sheet', hero.id, '2')}>
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
					<div className={`page page-titles-inventory-projects ${props.options.pageOrientation}`} id={SheetFormatter.getPageId('hero-sheet', hero.id, 'titles-inv-proj')}>
						<TitlesCard
							character={character}
							showLong='all'
							wide={props.options.pageOrientation === 'portrait'}
						/>
						<TrinketsCard
							character={character}
							wide={props.options.pageOrientation === 'portrait'}
						/>
						<LeveledTreasureCard
							character={character}
							wide={true}
						/>
						<ConsumablesCard
							character={character}
						/>
						<ProjectsCard
							character={character}
						/>
					</div>
					{getFinalCards(extraCards)}
					{getFollowerCards(extraCards)}
				</div>
			</main>
		</ErrorBoundary>
	);
};
