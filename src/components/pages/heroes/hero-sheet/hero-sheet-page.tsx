import { ClimbCreaturesCard, ClimbSwimReferenceCard, EdgesBanesReferenceCard, FallingReferenceCard, JumpReferenceCard, MainActionsReferenceCard, ManeuversReferenceCard, MoveActionsReferenceCard, MovementReferenceCard, TurnOptionsReferenceCard } from '../../../panels/hero-sheet/reference/reference-cards';
import { ExtraCards, SheetLayout } from '../../../../utils/sheet-layout';
import { AncestryTraitsCard } from '../../../panels/hero-sheet/ancestry-traits-card/ancestry-traits-card';
import { CareerCard } from '../../../panels/hero-sheet/career-card/career-card';
import { CharacterSheet } from '../../../../models/character-sheet';
import { CharacterSheetBuilder } from '../../../../utils/sheet-builder';
import { ClassFeaturesCard } from '../../../panels/hero-sheet/class-features-card/class-features-card';
import { ComplicationCard } from '../../../panels/hero-sheet/complication-card/complication-card';
import { ConditionsCard } from '../../../panels/hero-sheet/conditions-card/conditions-card';
import { CultureCard } from '../../../panels/hero-sheet/culture-card/culture-card';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FeatureReferenceCard } from '../../../panels/hero-sheet/reference/feature-reference-card';
import { FollowerCard } from '../../../panels/hero-sheet/follower-card/follower-card';
import { Hero } from '../../../../models/hero';
import { HeroHeaderCard } from '../../../panels/hero-sheet/hero-header-card/hero-header-card';
import { ImmunitiesWeaknessesCard } from '../../../panels/hero-sheet/immunities-weaknesses-card/immunities-weaknesses-card';
import { InventoryCard } from '../../../panels/hero-sheet/inventory-card/inventory-card';
import { ModifiersCard } from '../../../panels/hero-sheet/modifiers-card/modifiers-card';
import { NotesCard } from '../../../panels/hero-sheet/notes-card/notes-card';
import { Options } from '../../../../models/options';
import { PerksCard } from '../../../panels/hero-sheet/perks-card/perks-card';
import { PotenciesCard } from '../../../panels/hero-sheet/potencies-card/potencies-card';
import { PrimaryReferenceCard } from '../../../panels/hero-sheet/reference/primary-reference-card';
import { ProjectsCard } from '../../../panels/hero-sheet/projects-card/projects-card';
import { SheetFormatter } from '../../../../utils/sheet-formatter';
import { SkillsCard } from '../../../panels/hero-sheet/skills-card/skills-card';
import { Sourcebook } from '../../../../models/sourcebook';
import { StatsResourcesCard } from '../../../panels/hero-sheet/stats-resources-card/stats-resources-card';
import { TitlesCard } from '../../../panels/hero-sheet/titles-card/titles-card';
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
		() => CharacterSheetBuilder.buildSheetForHero(hero, props.sourcebooks, props.options),
		[ hero, props.sourcebooks, props.options ]
	);

	const sheetClasses = useMemo(
		() => {
			const classes = [
				'hero-sheet',
				props.options.classicSheetPageSize.toLowerCase(),
				props.options.pageOrientation
			];
			if (props.options.colorSheet) {
				classes.push('color');
			}
			return classes;
		},
		[ props.options.classicSheetPageSize, props.options.pageOrientation, props.options.colorSheet ]
	);

	const layout = useMemo(
		() => SheetLayout.getAbilityLayout(props.options),
		[ props.options ]
	);

	const populateExtraCards = (character: CharacterSheet): ExtraCards => {
		const required = [
			{
				element: <NotesCard character={character} key='notes' />,
				width: 1,
				height: Math.min(20, SheetFormatter.countLines(character.notes, layout.cardLineLen)),
				shown: false
			}
		];

		let lineWidth = layout.cardLineLen;

		// Inventory
		let invH = Math.max(20, SheetFormatter.calculateInventorySize(character.inventory, lineWidth));
		let invW = 1;
		if (invH > 60) {
			lineWidth = layout.cardGap + 2 * layout.cardLineLen;
			invW = 2;
			invH = Math.ceil(SheetFormatter.calculateInventorySize(character.inventory, lineWidth));
			invH = Math.min(layout.linesY, invH);// Will probably need a better solution at some point
		}
		// console.log('###### Inventory size: ', invH);
		required.unshift({
			element: <InventoryCard character={character} wide={invW > 1} key='inventory' />,
			width: invW,
			height: invH,
			shown: false
		});

		// Features / Reference / Other
		if (character.featuresReferenceOther?.length) {
			lineWidth = layout.cardGap + 2 * layout.cardLineLen;
			let refH = SheetFormatter.calculateFeatureReferenceSize(character.featuresReferenceOther, lineWidth);
			let refW = 2;
			if (refH > 60) {
				refW = 3;
				lineWidth = (2 * layout.cardGap) + (3 * layout.cardLineLen) * 0.49;
				refH = SheetFormatter.calculateFeatureReferenceSize(character.featuresReferenceOther, lineWidth) * 0.50;
				refH = Math.min(layout.linesY, refH);// Will probably need a better solution at some point
			}
			// console.log('###### Reference size: ', refH);
			required.unshift({
				element: <FeatureReferenceCard character={character} columns={refW > 2} key='feature-reference' />,
				width: refW,
				height: refH,
				shown: false
			});
		}

		// Folowers
		if (character.followers.length) {
			character.followers.forEach(fs => {
				required.push({
					element: <FollowerCard follower={fs} key={fs.id} />,
					width: 1,
					height: 10,
					shown: false
				});
			});
		}

		const optional = [
			{
				element: <TurnOptionsReferenceCard key='turn-options-reference' />,
				width: 1,
				height: 29,
				shown: false
			},
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
				height: 38,
				shown: false
			},
			{
				element: <MoveActionsReferenceCard key='move-actions-reference' />,
				width: 1,
				height: 14,
				shown: false
			},
			{
				element: <ClimbSwimReferenceCard key='climb-swim' />,
				width: 1,
				height: 23,
				shown: false
			},
			{
				element: <JumpReferenceCard key='jump' />,
				width: 1,
				height: 26,
				shown: false
			},
			{
				element: <ClimbCreaturesCard key='climbing-creatures-reference' />,
				width: 1,
				height: 31,
				shown: false
			},
			{
				element: <MovementReferenceCard key='movement-reference' />,
				width: 1,
				height: 23,
				shown: false
			},
			{
				element: <FallingReferenceCard key='falling-reference' />,
				width: 1,
				height: 25,
				shown: false
			}
		];

		return {
			required: required,
			optional: optional.sort((a, b) => b.height - a.height)
		};
	};

	const addAbilityPages = (character: CharacterSheet, extraCards: ExtraCards) => {
		return SheetLayout.getAbilityPages(character, extraCards, props.options);
	};

	const getFinalCards = (extraCards: ExtraCards) => {
		return SheetLayout.getRequiredCardPages(extraCards, character, props.options);
	};

	try {
		const extraCards = populateExtraCards(character);
		return (
			<ErrorBoundary>
				<main id='hero-sheet-page'>
					<div className={sheetClasses.join(' ')} id={hero.id}>
						<div className='page page-1' id={SheetFormatter.getPageId(hero.id, 'main')}>
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
						<div className='page page-2' id={SheetFormatter.getPageId(hero.id, '2')}>
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
						{getFinalCards(extraCards)}
					</div>
				</main>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
