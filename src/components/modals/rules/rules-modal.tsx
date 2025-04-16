import { Segmented, Space, Tabs } from 'antd';
import { AbilityData } from '../../../data/ability-data';
import { AbilityPanel } from '../../panels/elements/ability-panel/ability-panel';
import { AbilityUsage } from '../../../enums/ability-usage';
import { Collections } from '../../../utils/collections';
import { ConditionLogic } from '../../../logic/condition-logic';
import { ConditionType } from '../../../enums/condition-type';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { Markdown } from '../../controls/markdown/markdown';
import { Modal } from '../modal/modal';
import { PanelMode } from '../../../enums/panel-mode';
import { RulesPage } from '../../../enums/rules-page';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { SkillList } from '../../../enums/skill-list';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookLogic } from '../../../logic/sourcebook-logic';
import { StarFilled } from '@ant-design/icons';
import { useState } from 'react';

import './rules-modal.scss';

interface Props {
	hero: Hero | null;
	sourcebooks: Sourcebook[];
	startPage?: RulesPage;
	onClose: () => void;
}

export const RulesModal = (props: Props) => {
	const [ page, setPage ] = useState<string>(props.startPage || RulesPage.Rules);

	try {
		const getRulesSection = () => {
			const md = `
# SURPRISE

When battle begins, the Director determines which creatures, if any, are caught off guard. Any creature who isn’t ready for combat at the start of an encounter is surprised until the end of the first round of combat. A surprised creature can’t take triggered or free triggered actions and ability power rolls against them gain an edge.

# FLANKING

When you and at least one ally are adjacent to the same enemy and on completely opposite sides of the enemy, you are flanking that enemy. While flanking an enemy, you gain an edge on melee strikes against them.

If you’re unsure whether your hero and an ally are flanking a foe, imagine a line extending from the center of your space to your ally’s space. If that line passes through opposite sides or corners of the enemy’s space, then you and your ally are flanking the enemy.

You must have line of effect to the enemy and be able to take triggered actions in order to gain or grant the flanking benefit.

# COVER

When you have line of effect to a creature or object but that target has at least half their form blocked by a solid obstruction such as a tree, wall, or overturned table, the target has cover. You take a bane on abilities that deal damage against creatures or objects that have cover from you.

# CONCEALMENT

Darkness, fog, invisibility magic, and any other effect that fully obscures a creature but doesn’t protect their body grants that creature concealment. You can target a creature who has concealment with strikes, provided they aren’t hidden. However, strikes against such creatures take a bane. Even if you have line of effect to a creature, they have concealment from you if you can’t see them.

## INVISIBLE CREATURES

Invisible creatures always have concealment from other creatures. If an invisible creature isn’t hidden, they can still be targeted with abilities, though strikes against them take a bane. The test made to find a hidden creature who is invisible takes a bane.`;
			return (
				<Markdown text={md} />
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
			const abilities = [
				AbilityData.advance,
				AbilityData.disengage,
				AbilityData.ride,
				AbilityData.aidAttack,
				AbilityData.catchBreath,
				AbilityData.drinkPotion,
				AbilityData.escapeGrab,
				AbilityData.grab,
				AbilityData.hide,
				AbilityData.knockback,
				AbilityData.makeAssistTest,
				AbilityData.search,
				AbilityData.standUp,
				AbilityData.charge,
				AbilityData.defend,
				AbilityData.heal
			];

			return (
				<Tabs
					items={[
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
						},
						{
							key: 'actions',
							label: 'Actions',
							children:
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										abilities
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
										abilities
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
										abilities
											.filter(a => a.type.usage === AbilityUsage.Move)
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
					<div className='rules-modal'>
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
