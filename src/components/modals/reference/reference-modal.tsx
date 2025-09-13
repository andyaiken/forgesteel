import { Button, Flex, Input, Segmented, Space, Tabs } from 'antd';
import { AbilityData } from '../../../data/ability-data';
import { AbilityPanel } from '../../panels/elements/ability-panel/ability-panel';
import { AbilityUsage } from '../../../enums/ability-usage';
import { ConditionLogic } from '../../../logic/condition-logic';
import { ConditionType } from '../../../enums/condition-type';
import { Empty } from '../../controls/empty/empty';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { LanguageType } from '../../../enums/language-type';
import { Markdown } from '../../controls/markdown/markdown';
import { Modal } from '../modal/modal';
import { PanelMode } from '../../../enums/panel-mode';
import { RulesData } from '../../../data/rules-data';
import { RulesPage } from '../../../enums/rules-page';
import { SearchOutlined } from '@ant-design/icons';
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
				RulesData.abilityTarget,
				RulesData.assist,
				RulesData.burrowing,
				RulesData.climbingAndSwimming,
				RulesData.concealment,
				RulesData.cover,
				RulesData.crawling,
				RulesData.criticalHit,
				RulesData.damagingTerrain,
				RulesData.difficultTerrain,
				RulesData.dyingAndDeath,
				RulesData.falling,
				RulesData.flanking,
				RulesData.flying,
				RulesData.forcedMovement,
				RulesData.hiding,
				RulesData.highGround,
				RulesData.invisibility,
				RulesData.jumping,
				RulesData.mainAction,
				RulesData.mountedCombat,
				RulesData.movement,
				RulesData.naturalRoll,
				RulesData.opportunityAttack,
				RulesData.rollVsMultipleCreatures,
				RulesData.shifting,
				RulesData.slammingCreatures,
				RulesData.slammingObjects,
				RulesData.sneaking,
				RulesData.suffocating,
				RulesData.surprise,
				RulesData.takingATurn,
				RulesData.teleporting,
				RulesData.underwaterCombat,
				RulesData.wieldingTreasures
			];

			const filteredRules = rules
				.filter(r => Utils.textMatches([ r.label, r.content ], searchTerm))
				.sort((a, b) => a.label.localeCompare(b.label))
				.map(r => r.label);

			const rule = rules.find(r => r.label === selectedRule);

			return (
				<>
					<Input
						style={{ marginTop: '20px' }}
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
				<div style={{ paddingBottom: '20px' }}>
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
								<Space direction='vertical' style={{ paddingBottom: '20px', width: '100%' }}>
									{
										allSkills
											.filter(s => s.list === sl)
											.map((s, n2) => (
												<Field
													key={n2}
													highlight={skillNames.includes(s.name)}
													label={s.name}
													value={s.description}
												/>
											))
									}
								</Space>
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
						[
							LanguageType.Common,
							LanguageType.Regional,
							LanguageType.Cultural,
							LanguageType.Dead
						].map((type, n1) => (
							<div key={n1}>
								<HeaderText>{type} Languages</HeaderText>
								<Space direction='vertical' style={{ paddingBottom: '20px', width: '100%' }}>
									{
										allLanguages
											.filter(l => l.type === type)
											.map((l, n2) => (
												<div>
													<Field
														key={n2}
														highlight={languageNames.includes(l.name)}
														label={l.name}
														value={l.description}
													/>
													{
														l.related.length > 0 ?
															<div style={{ marginTop: '-5px', paddingLeft: '10px' }}>
																Related to: {l.related.join(', ')}
															</div>
															: null
													}
												</div>
											))
									}
								</Space>
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
							key: 'mains',
							label: 'Main Actions',
							children:
								<Space direction='vertical' style={{ paddingBottom: '20px', width: '100%' }}>
									{
										[
											AbilityData.charge,
											AbilityData.defend,
											AbilityData.freeStrike,
											AbilityData.heal,
											AbilityData.swap
										]
											.filter(a => a.type.usage === AbilityUsage.MainAction)
											.map(a => <SelectablePanel key={a.id}><AbilityPanel ability={a} hero={props.hero || undefined} mode={PanelMode.Full} /></SelectablePanel>)
									}
								</Space>
						},
						{
							key: 'maneuvers',
							label: 'Maneuvers',
							children:
								<Space direction='vertical' style={{ paddingBottom: '20px', width: '100%' }}>
									{
										[
											AbilityData.aidAttack,
											AbilityData.catchBreath,
											AbilityData.clawDirt,
											AbilityData.escapeGrab,
											AbilityData.goProne,
											AbilityData.grab,
											AbilityData.hide,
											AbilityData.knockback,
											AbilityData.makeAssistTest,
											AbilityData.search,
											AbilityData.standUp,
											AbilityData.useConsumable
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
								<Space direction='vertical' style={{ paddingBottom: '20px', width: '100%' }}>
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
							key: 'triggers',
							label: 'Triggers',
							children:
								<Space direction='vertical' style={{ paddingBottom: '20px', width: '100%' }}>
									{
										[
											AbilityData.opportunityAttack
										]
											.filter(a => a.type.usage === AbilityUsage.Trigger)
											.map(a => <SelectablePanel key={a.id}><AbilityPanel ability={a} hero={props.hero || undefined} mode={PanelMode.Full} /></SelectablePanel>)
									}
								</Space>
						},
						{
							key: 'free',
							label: 'Free Strikes',
							children:
								<Space direction='vertical' style={{ paddingBottom: '20px', width: '100%' }}>
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
