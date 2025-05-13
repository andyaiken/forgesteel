import { Button, Flex, Input, Segmented, Space, Tabs } from 'antd';
import { SearchOutlined, StarFilled } from '@ant-design/icons';
import { AbilityData } from '../../../data/ability-data';
import { AbilityPanel } from '../../panels/elements/ability-panel/ability-panel';
import { AbilityUsage } from '../../../enums/ability-usage';
import { Collections } from '../../../utils/collections';
import { ConditionLogic } from '../../../logic/condition-logic';
import { ConditionType } from '../../../enums/condition-type';
import { Empty } from '../../controls/empty/empty';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { Markdown } from '../../controls/markdown/markdown';
import { Modal } from '../modal/modal';
import { PanelMode } from '../../../enums/panel-mode';
import { RulesData } from '../../../data/rules-data';
import { RulesPage } from '../../../enums/rules-page';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { SkillList } from '../../../enums/skill-list';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookLogic } from '../../../logic/sourcebook-logic';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './reference-modal.scss';

interface Props {
	hero: Hero | null;
	sourcebooks: Sourcebook[];
	startPage?: RulesPage;
	onClose: () => void;
}

export const ReferenceModal = (props: Props) => {
	const [ page, setPage ] = useState<string>(props.startPage || RulesPage.Rules);
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ selectedRule, setSelectedRule ] = useState<string>('');

	try {
		const getRulesSection = () => {
			const rules = [
				RulesData.abilityDistance,
				RulesData.burrowing,
				RulesData.climbingAndSwimming,
				RulesData.concealment,
				RulesData.cover,
				RulesData.crawling,
				RulesData.criticalHit,
				RulesData.damagingTerrain,
				RulesData.difficultTerrain,
				RulesData.falling,
				RulesData.flanking,
				RulesData.flying,
				RulesData.forcedMovement,
				RulesData.hiding,
				RulesData.highGround,
				RulesData.invisibility,
				RulesData.jumping,
				RulesData.mountedCombat,
				RulesData.multipleTargets,
				RulesData.opportunityAttack,
				RulesData.shifting,
				RulesData.slammingCreatures,
				RulesData.slammingObjects,
				RulesData.sneaking,
				RulesData.suffocating,
				RulesData.surprise,
				RulesData.teleporting,
				RulesData.takingATurn,
				RulesData.underwaterCombat
			];

			const filteredRules = rules
				.filter(r => Utils.textMatches([ r.label, r.content ], searchTerm))
				.sort((a, b) => a.label.localeCompare(b.label))
				.map(r => r.label);

			const rule = rules.find(r => r.label === selectedRule);

			return (
				<>
					<Input
						name='search'
						placeholder='Search'
						allowClear={true}
						value={searchTerm}
						suffix={<SearchOutlined />}
						onChange={e => setSearchTerm(e.target.value)}
					/>
					<Flex gap={20} style={{ flex: '1 1 0', overflowY: 'hidden' }}>
						<Space direction='vertical' style={{ flex: '0 0 180px', marginTop: '20px', overflowY: 'auto' }}>
							{
								filteredRules.length > 0 ?
									filteredRules.map((r, n) => (
										<Button key={n} block={true} onClick={() => setSelectedRule(r)}>
											{r}
										</Button>
									))
									:
									<Empty text='No topics' />
							}
						</Space>
						{
							rule ?
								<div style={{ flex: '1 1 0', overflowY: 'auto' }}>
									<HeaderText>{rule.label}</HeaderText>
									<Markdown text={rule.content} />
								</div>
								:
								<Flex style={{ flex: '1 1 0' }} justify='center'>
									<Empty text='Select a topic from the list' />
								</Flex>
						}
					</Flex>
				</>
			);
		};

		const getConditionsSection = () => {
			return (
				<div>
					{
						[
							ConditionType.Bleeding,
							ConditionType.Dazed,
							ConditionType.Frightened,
							ConditionType.Grabbed,
							ConditionType.Prone,
							ConditionType.Restrained,
							ConditionType.Slowed,
							ConditionType.Taunted,
							ConditionType.Weakened
						].map(ct => (
							<div key={ct}>
								<HeaderText>{ct}</HeaderText>
								<Markdown text={ConditionLogic.getDescription(ct)} />
							</div>
						))
					}
				</div>
			);
		};

		const getSkillsSection = () => {
			const sourcebooks = props.hero ? props.hero.settingIDs.map(id => props.sourcebooks.find(s => s.id === id)).filter(s => !!s) : props.sourcebooks;
			const allSkills = SourcebookLogic.getSkills(sourcebooks);
			const skillNames = props.hero ? HeroLogic.getSkills(props.hero, sourcebooks).map(s => s.name) : [];

			return (
				<div>
					{
						[
							SkillList.Crafting,
							SkillList.Exploration,
							SkillList.Interpersonal,
							SkillList.Intrigue,
							SkillList.Lore
						].map((sl, n1) => (
							<div key={n1}>
								<HeaderText>{sl}</HeaderText>
								{
									allSkills
										.filter(s => s.list === sl)
										.map((s, n2) => (
											<div key={n2} className='language-row'>
												{skillNames.includes(s.name) ? <StarFilled style={{ color: 'rgb(22, 119, 255)' }} /> : null}
												<Field key={s.name} label={s.name} value={s.description} />
											</div>
										))
								}
							</div>
						))
					}
				</div>
			);
		};

		const getLanguagesSection = () => {
			const sourcebooks = props.hero ? props.hero.settingIDs.map(id => props.sourcebooks.find(s => s.id === id)).filter(s => !!s) : props.sourcebooks;
			const allLanguages = SourcebookLogic.getLanguages(sourcebooks);
			const languageNames = props.hero ? HeroLogic.getLanguages(props.hero, sourcebooks).map(l => l.name) : [];

			return (
				<div>
					{
						Collections
							.sort(allLanguages, l => l.name)
							.map((l, n) => (
								<div key={n} className='skill-row'>
									{languageNames.includes(l.name) ? <StarFilled style={{ color: 'rgb(22, 119, 255)' }} /> : null}
									<Field key={l.name} label={l.name} value={l.description} />
								</div>
							))
					}
				</div>
			);
		};

		const getAbilitiesSection = () => {
			return (
				<Tabs
					items={[
						{
							key: 'actions',
							label: 'Actions',
							children:
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										[
											AbilityData.charge,
											AbilityData.defend,
											AbilityData.heal,
											AbilityData.swap
										]
											.filter(a => a.type.usage === AbilityUsage.Action)
											.map(a => <SelectablePanel key={a.id}><AbilityPanel ability={a} hero={props.hero || undefined} mode={PanelMode.Full} /></SelectablePanel>)
									}
								</Space>
						},
						{
							key: 'maneuvers',
							label: 'Maneuvers',
							children:
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										[
											AbilityData.aidAttack,
											AbilityData.catchBreath,
											AbilityData.drinkPotion,
											AbilityData.escapeGrab,
											AbilityData.grab,
											AbilityData.hide,
											AbilityData.knockback,
											AbilityData.makeAssistTest,
											AbilityData.search,
											AbilityData.standUp
										]
											.filter(a => a.type.usage === AbilityUsage.Maneuver)
											.map(a => <SelectablePanel key={a.id}><AbilityPanel ability={a} hero={props.hero || undefined} mode={PanelMode.Full} /></SelectablePanel>)
									}
								</Space>
						},
						{
							key: 'moves',
							label: 'Move Actions',
							children:
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										[
											AbilityData.advance,
											AbilityData.disengage,
											AbilityData.ride
										]
											.filter(a => a.type.usage === AbilityUsage.Move)
											.map(a => <SelectablePanel key={a.id}><AbilityPanel ability={a} hero={props.hero || undefined} mode={PanelMode.Full} /></SelectablePanel>)
									}
								</Space>
						},
						{
							key: 'free',
							label: 'Free Strikes',
							children:
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										[
											AbilityData.freeStrikeMelee,
											AbilityData.freeStrikeRanged
										]
											.map(a => <SelectablePanel key={a.id}><AbilityPanel ability={a} hero={props.hero || undefined} mode={PanelMode.Full} /></SelectablePanel>)
									}
								</Space>
						}
					]}
				/>
			);
		};

		const getContent = () => {
			switch (page) {
				case RulesPage.Rules:
					return getRulesSection();
				case RulesPage.Conditions:
					return getConditionsSection();
				case RulesPage.Skills:
					return getSkillsSection();
				case RulesPage.Languages:
					return getLanguagesSection();
				case RulesPage.Abilities:
					return getAbilitiesSection();
			}
		};

		return (
			<Modal
				toolbar={
					<div style={{ width: '100%', textAlign: 'center' }}>
						<Segmented
							name='tabs'
							options={[ RulesPage.Rules, RulesPage.Conditions, RulesPage.Skills, RulesPage.Languages, RulesPage.Abilities ]}
							value={page}
							onChange={setPage}
						/>
					</div>
				}
				content={
					<div className='reference-modal'>
						{getContent()}
					</div>
				}
				onClose={props.onClose}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
