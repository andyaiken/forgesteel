import React, { JSX, useMemo } from 'react';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { AbilitySheet, CharacterSheet } from '../../../../models/character-sheet';
import { Hero } from '../../../../models/hero';
import { Options } from '../../../../models/options';
import { Sourcebook } from '../../../../models/sourcebook';
import { CharacterSheetFormatter } from '../../../../utils/character-sheet-formatter';
import { CharacterSheetBuilder } from '../../../../utils/sheet-builder';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { AbilityCard } from '../../../panels/hero-sheet/ability-card/ability-card';
import { AncestryTraitsCard } from '../../../panels/hero-sheet/ancestry-traits-card/ancestry-traits-card';
import { CareerCard } from '../../../panels/hero-sheet/career-card/career-card';
import { ClassFeaturesCard } from '../../../panels/hero-sheet/class-features-card/class-features-card';
import { ComplicationCard } from '../../../panels/hero-sheet/complication-card/complication-card';
import { ConditionsCard } from '../../../panels/hero-sheet/conditions-card/conditions-card';
import { CultureCard } from '../../../panels/hero-sheet/culture-card/culture-card';
import { HeroHeaderCard } from '../../../panels/hero-sheet/hero-header-card/hero-header-card';
import { InventoryCard } from '../../../panels/hero-sheet/inventory-card/inventory-card';
import { ModifiersCard } from '../../../panels/hero-sheet/modifiers-card/modifiers-card';
import { PerksCard } from '../../../panels/hero-sheet/perks-card/perks-card';
import { PotenciesCard } from '../../../panels/hero-sheet/potencies-card/potencies-card';
import { ProjectsCard } from '../../../panels/hero-sheet/projects-card/projects-card';
import { FeatureReferenceCard } from '../../../panels/hero-sheet/reference/feature-reference-card';
import { EdgesBanesReferenceCard, MainActionsReferenceCard, ManeuversReferenceCard, MoveActionsReferenceCard, TurnOptionsReferenceCard } from '../../../panels/hero-sheet/reference/reference-cards';
import { TurnReferenceCard } from '../../../panels/hero-sheet/reference/turn-reference-card';
import { SkillsCard } from '../../../panels/hero-sheet/skills-card/skills-card';
import { StatsResourcesCard } from '../../../panels/hero-sheet/stats-resources-card/stats-resources-card';
import { TitlesCard } from '../../../panels/hero-sheet/titles-card/titles-card';
import './hero-sheet-page.scss';

interface Props {
    hero: Hero;
    sourcebooks: Sourcebook[];
    options: Options;
}

export const HeroSheetPage = (props: Props) => {
    try {
        const hero = useMemo(() => props.hero, [props.hero] );
        const displayOptions = useMemo(
            () => FactoryLogic.createSheetDisplayOptions(props.options),
            [props.options]
        );

        const character = useMemo(
            () => CharacterSheetBuilder.buildSheetForHero(hero, props.sourcebooks),
            [props.hero, props.sourcebooks]
        );

        let pageNum = 0;
        const addPageId = (hero: Hero): string => {
            pageNum +=1;
            return CharacterSheetFormatter.getPageId(hero.id, pageNum);
        };

        let requiredExtraCards = [{
            element: <InventoryCard character={character} key='inventory' />,
            width: 1,
        }];
        let optionalReferenceCards = [
            {
                element: <TurnOptionsReferenceCard key='turn-options-reference' />,
                width: 1,
            },
            {
                element: <EdgesBanesReferenceCard key='edges-banes-reference' />,
                width: 1,
            },
            {
                element: <MainActionsReferenceCard key='main-actions-reference' />,
                width: 1,
            },
            {
                element: <MoveActionsReferenceCard key='move-actions-reference' />,
                width: 1,
            },
            {
                element: <ManeuversReferenceCard key='maneuvers-reference' />,
                width: 1,
            }
        ];

        if ((character.referenceFeatures?.length || 0) > 0) {
            requiredExtraCards.unshift({
                element: <FeatureReferenceCard character={character} key='feature-reference' />,
                width: 2,
            });
        }

        const getFillerCards = (spacesToFill: number): JSX.Element[] => {
            const refCards = [];
            nextCard: while (spacesToFill > 0 && (requiredExtraCards.length > 0 || optionalReferenceCards.length > 0)) {
                const spaceInRow = (spacesToFill % 3) || 3;
                for (let req of requiredExtraCards) {
                    if (req.width <= spaceInRow) {
                        refCards.push(req.element);
                        spacesToFill -= req.width;
                        requiredExtraCards = requiredExtraCards.filter(c => c !== req);
                        continue nextCard;
                    }
                }
                for (let card of optionalReferenceCards) {
                    if (card.width <= spaceInRow) {
                        refCards.push(card.element);
                        spacesToFill -= card.width;
                        optionalReferenceCards = optionalReferenceCards.filter(c => c !== card);
                        continue nextCard;
                    }
                }
            }
            return refCards;
        };


        const addAbilityPages = (character: CharacterSheet) => {
            const allAbilities = character.freeStrikes.concat(character.signatureAbilities,
                character.heroicAbilities,
                character.triggeredActions,
                character.otherRollAbilities,
                character.otherAbilities);

            const abilitiesSplit: AbilitySheet[][] = [];
            let n = 0;
            while (n < allAbilities.length) {
                let start = n;
                let end = Math.min(n + 9, allAbilities.length);
                let pageAbilities = allAbilities.slice(start, end);
                abilitiesSplit.push(pageAbilities);
                n = end;
            }

            const abilityCardPages = abilitiesSplit.map(abilities => {
                let refCards: JSX.Element[] = [];
                if (abilities.length < 9) {
                    const spacesToFill = 9 - abilities.length;
                    refCards = getFillerCards(spacesToFill);
                }
                return (
                <React.Fragment key={pageNum}>
                    <hr className='dashed' />
                    <div className='abilities page' id={addPageId(hero)}>
                        {abilities.map(a =>
                            <AbilityCard key={a.id}
                                ability={a} />
                        )}
                        {refCards}
                    </div>
                </React.Fragment>
                );
            });
            return abilityCardPages;
        };

        return (
            <ErrorBoundary>
                <main id='hero-sheet-page'>
                    <div className='hero-sheet' id={hero.id}>
                        {/* <div className='page' id={addPageId(hero)}>
                            <FontTester />
                        </div>
                        <hr className='dashed' /> */}
                        <div className='page page-1' id={addPageId(hero)}>
                            <HeroHeaderCard
                                character={character}
                                displayOptions={displayOptions} />
                            <StatsResourcesCard
                                character={character}
                                displayOptions={displayOptions} />
                            <div className='modifiers-statuses'>
                                <ModifiersCard
                                    character={character} />
                                <PotenciesCard
                                    character={character} />
                                <ConditionsCard
                                    character={character}
                                    displayOptions={displayOptions} />
                                <TurnReferenceCard
                                    character={character} />
                            </div>
                            <div className='class-ancestry-features'>
                                <ClassFeaturesCard
                                    character={character} />
                                <AncestryTraitsCard
                                    character={character} />
                            </div>
                        </div>
                        <hr className='dashed' />
                        <div className='page page-2' id={addPageId(hero)}>
                            <CareerCard
                                character={character} />
                            <ComplicationCard
                                character={character} />
                            <SkillsCard
                                character={character} />
                            <CultureCard
                                character={character} />
                            <PerksCard
                                character={character} />
                            <div className='titles-projects'>
                                <TitlesCard
                                    character={character} />
                                <ProjectsCard
                                    character={character} />
                            </div>
                        </div>
                        {addAbilityPages(character)}
                        {requiredExtraCards.length > 0 ? (
                            <>
                                <hr className='dashed' />
                                <div className='abilities page' id={addPageId(hero)}>
                                    {getFillerCards(9)}
                                </div>
                            </>
                        ) : undefined }
                    </div>
                </main>
            </ErrorBoundary>
        );
    } catch (ex) {
        console.error(ex);
        return null;
    }
};
