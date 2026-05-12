import { Flex, Segmented, Select } from 'antd';
import { AbilitiesPanel } from '@/components/panels/hero/abilities/abilities-panel';
import { Ability } from '@/models/ability';
import { AbilityData } from '@/data/ability-data';
import { AbilityUsage } from '@/enums/ability-usage';
import { Ancestry } from '@/models/ancestry';
import { Career } from '@/models/career';
import { Characteristic } from '@/enums/characteristic';
import { ChoicesPanel } from '@/components/panels/hero/choices/choices-panel';
import { Complication } from '@/models/complication';
import { Culture } from '@/models/culture';
import { Domain } from '@/models/domain';
import { EncounterSlot } from '@/models/encounter-slot';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Feature } from '@/models/feature';
import { FeaturesPanel } from '@/components/panels/hero/features/features-panel';
import { Fixture } from '@/models/fixture';
import { Follower } from '@/models/follower';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroModalType } from '@/enums/hero-modal-type';
import { Kit } from '@/models/kit';
import { Monster } from '@/models/monster';
import { NamePanel } from '@/components/panels/hero/name/name-panel';
import { RetinuePanel } from '@/components/panels/hero/retinue/retinue-panel';
import { RulesPage } from '@/enums/rules-page';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { SidebarPanel } from '@/components/panels/hero/sidebar/sidebar-panel';
import { Sourcebook } from '@/models/sourcebook';
import { StatsPanel } from '@/components/panels/hero/stats/stats-panel';
import { StatsSidebarPanel } from '@/components/panels/hero/stats-sidebar/stats-sidebar-panel';
import { SummoningInfo } from '@/models/summon';
import { Title } from '@/models/title';
import { useIsSmall } from '@/hooks/use-is-small';
import { useOptions } from '@/contexts/data-context';
import { useState } from 'react';

import './hero-panel.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	onSelectAncestry: (ancestry: Ancestry) => void;
	onSelectCulture: (culture: Culture) => void;
	onSelectCareer: (career: Career) => void;
	onSelectClass: (heroClass: HeroClass) => void;
	onSelectComplication: (complication: Complication) => void;
	onSelectDomain: (domain: Domain) => void;
	onSelectKit: (kit: Kit) => void;
	onSelectTitle: (title: Title) => void;
	onSelectMonster: (hero: Hero, monster: Monster, summon?: SummoningInfo) => void;
	onSelectFollower: (hero: Hero, follower: Follower) => void;
	onSelectFixture: (fixture: Fixture) => void;
	onSelectCharacteristic: (characteristic: Characteristic) => void;
	onSelectFeature: (feature: Feature) => void;
	onSelectAbility: (ability: Ability) => void;
	onShowState: (type: HeroModalType) => void;
	onShowReference: (page: RulesPage) => void;
	onAddSquad: (hero: Hero, monster: Monster, count: number) => void;
	onRemoveSquad: (hero: Hero, slotID: string) => void;
	onAddMonsterToSquad: (hero: Hero, slotID: string) => void;
	onSelectControlledMonster: (hero: Hero, monster: Monster) => void;
	onSelectControlledSquad: (hero: Hero, slot: EncounterSlot) => void;
}

export const HeroPanel = (props: Props) => {
	const isSmall = useIsSmall();
	const [ tab, setTab ] = useState<string>('Hero');
	const options = useOptions();

	const getTabs = () => {
		const tabs: string[] = [];

		tabs.push('Hero');
		tabs.push('Features');

		const abilities = HeroLogic.getAbilities(props.hero, props.sourcebooks, options.shownStandardAbilities);
		if (options.compactView) {
			if (abilities.length > 0) {
				tabs.push('Abilities');
			}
		} else {
			const mains = abilities.filter(a => a.ability.type.usage === AbilityUsage.MainAction);
			const maneuvers = abilities.filter(a => a.ability.type.usage === AbilityUsage.Maneuver);
			const moves = abilities.filter(a => a.ability.type.usage === AbilityUsage.Move);
			const triggers = abilities.filter(a => a.ability.type.usage === AbilityUsage.Trigger);
			const others = abilities.filter(a => (a.ability.type.usage === AbilityUsage.Other) || (a.ability.type.usage === AbilityUsage.NoAction));

			if (mains.length > 0) {
				tabs.push('Mains');
			}
			if (maneuvers.length > 0) {
				tabs.push('Maneuvers');
			}
			if (moves.length > 0) {
				tabs.push('Moves');
			}
			if (triggers.length > 0) {
				tabs.push('Triggers');
			}
			if (others.length > 0) {
				tabs.push('Others');
			}
			tabs.push('Free Strikes');
		}

		const retinue = HeroLogic.getCompanions(props.hero).length + HeroLogic.getFollowers(props.hero).length + HeroLogic.getRetainers(props.hero).length + HeroLogic.getSummons(props.hero).length + HeroLogic.getFixtures(props.hero).length;
		if (retinue > 0) {
			tabs.push('Retinue');
		}

		return tabs;
	};

	const getContent = (tab: string) => {
		const abilities = HeroLogic.getAbilities(props.hero, props.sourcebooks, options.shownStandardAbilities);
		const mains = abilities.filter(a => a.ability.type.usage === AbilityUsage.MainAction);
		const maneuvers = abilities.filter(a => a.ability.type.usage === AbilityUsage.Maneuver);
		const moves = abilities.filter(a => a.ability.type.usage === AbilityUsage.Move);
		const triggers = abilities.filter(a => a.ability.type.usage === AbilityUsage.Trigger);
		const others = abilities.filter(a => (a.ability.type.usage === AbilityUsage.Other) || (a.ability.type.usage === AbilityUsage.NoAction));

		const getAbilitiesSection = (title: string, abilities: { ability: Ability, source: string, level: number | undefined }[]) => {
			return (
				<AbilitiesPanel
					title={title}
					abilities={abilities}
					hero={props.hero}
					onSelectAbility={props.onSelectAbility}
				/>
			);
		};

		switch (tab) {
			case 'Hero':
				return (
					<>
						<StatsPanel
							hero={props.hero}
							onSelectCharacteristic={props.onSelectCharacteristic}
							onShowState={props.onShowState}
						/>
						<ChoicesPanel
							hero={props.hero}
							sourcebooks={props.sourcebooks}
							onSelectAncestry={props.onSelectAncestry}
							onSelectCulture={props.onSelectCulture}
							onSelectCareer={props.onSelectCareer}
							onSelectClass={props.onSelectClass}
							onSelectComplication={props.onSelectComplication}
							onSelectDomain={props.onSelectDomain}
							onSelectKit={props.onSelectKit}
							onSelectTitle={props.onSelectTitle}
							onShowState={props.onShowState}
						/>
						{
							isSmall || options.singlePage ?
								<SidebarPanel
									hero={props.hero}
									sourcebooks={props.sourcebooks}
									setTab={setTab}
									onShowState={props.onShowState}
									onShowReference={props.onShowReference}
									onAddSquad={props.onAddSquad}
									onRemoveSquad={props.onRemoveSquad}
									onAddMonsterToSquad={props.onAddMonsterToSquad}
									onSelectControlledMonster={props.onSelectControlledMonster}
									onSelectControlledSquad={props.onSelectControlledSquad}
								/>
								: null
						}
					</>
				);
			case 'Features':
				return (
					<FeaturesPanel
						hero={props.hero}
						sourcebooks={props.sourcebooks}
						onSelectFeature={props.onSelectFeature}
					/>
				);
			case 'Abilities':
				return (
					<>
						{getAbilitiesSection('Main Actions', mains)}
						{getAbilitiesSection('Maneuvers', maneuvers)}
						{getAbilitiesSection('Move Actions', moves)}
						{getAbilitiesSection('Triggered Actions', triggers)}
						{getAbilitiesSection('Other Abilities', others)}
						{getAbilitiesSection('Free Strikes', [
							{ ability: AbilityData.freeStrikeMelee, source: 'Standard', level: undefined },
							{ ability: AbilityData.freeStrikeRanged, source: 'Standard', level: undefined }
						])}
					</>
				);
			case 'Mains':
				return getAbilitiesSection('Main Actions', mains);
			case 'Maneuvers':
				return getAbilitiesSection('Maneuvers', maneuvers);
			case 'Moves':
				return getAbilitiesSection('Move Actions', moves);
			case 'Triggers':
				return getAbilitiesSection('Triggered Actions', triggers);
			case 'Others':
				return getAbilitiesSection('Other Abilities', others);
			case 'Free Strikes':
				return getAbilitiesSection('Free Strikes', [
					{ ability: AbilityData.freeStrikeMelee, source: 'Standard', level: undefined },
					{ ability: AbilityData.freeStrikeRanged, source: 'Standard', level: undefined },
					...abilities.filter(a => a.ability.type.freeStrike)
				]);
			case 'Retinue':
				return (
					<RetinuePanel
						hero={props.hero}
						sourcebooks={props.sourcebooks}
						onSelectMonster={props.onSelectMonster}
						onSelectFollower={props.onSelectFollower}
						onSelectFixture={props.onSelectFixture}
					/>
				);
		}

		return null;
	};

	return (
		<ErrorBoundary>
			<div className='hero-panel' id={SheetFormatter.getPageId('hero', props.hero.id)}>
				<NamePanel
					hero={props.hero}
					onShowState={props.onShowState}
				/>
				<div className='hero-main-section'>
					{!isSmall && !options.singlePage ? <StatsSidebarPanel hero={props.hero} showStats={tab !== 'Hero'} /> : null}
					<div className='hero-center-column'>
						{
							options.singlePage ?
								null
								:
								<div className='center-top'>
									<Flex align='center' justify='space-between' gap={10}>
										{
											isSmall ?
												<Select
													style={{ flex: '1 1 0' }}
													options={
														getTabs().map(tab => ({
															value: tab,
															label: tab
														}))
													}
													optionRender={o => <div className='ds-text'>{o.label}</div>}
													value={tab}
													onChange={setTab}
												/>
												:
												<Segmented
													style={{ flex: '1 1 0' }}
													name='sections'
													block={true}
													options={
														getTabs().map(tab => ({
															value: tab,
															label: tab
														}))
													}
													value={tab}
													onChange={setTab}
												/>
										}
									</Flex>
								</div>
						}
						<div className='center-content'>
							{
								options.singlePage ?
									getTabs().map(tab => <div key={tab}>{getContent(tab)}</div>)
									:
									getContent(tab)
							}
						</div>
					</div>
					{
						!isSmall && !options.singlePage ?
							<SidebarPanel
								hero={props.hero}
								sourcebooks={props.sourcebooks}
								setTab={setTab}
								onShowState={props.onShowState}
								onShowReference={props.onShowReference}
								onAddSquad={props.onAddSquad}
								onRemoveSquad={props.onRemoveSquad}
								onAddMonsterToSquad={props.onAddMonsterToSquad}
								onSelectControlledMonster={props.onSelectControlledMonster}
								onSelectControlledSquad={props.onSelectControlledSquad}
							/>
							: null
					}
				</div>
			</div>
		</ErrorBoundary>
	);
};
