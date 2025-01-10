import { Space, Tabs } from 'antd';
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
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { SkillList } from '../../../enums/skill-list';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookLogic } from '../../../logic/sourcebook-logic';
import { StarFilled } from '@ant-design/icons';

import './rules-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
}

export const RulesModal = (props: Props) => {
	try {
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
			const sourcebooks = props.hero.settingIDs.map(id => props.sourcebooks.find(s => s.id === id)).filter(s => !!s);
			const allSkills = SourcebookLogic.getSkills(sourcebooks);
			const skillNames = HeroLogic.getSkills(props.hero, sourcebooks).map(s => s.name);

			return (
				<div>
					{
						[
							SkillList.Crafting,
							SkillList.Exploration,
							SkillList.Interpersonal,
							SkillList.Intrigue,
							SkillList.Lore
						].map(sl => (
							<div key={sl}>
								<HeaderText>{sl}</HeaderText>
								{
									allSkills
										.filter(s => s.list === sl)
										.map(s => (
											<div className='language-row'>
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
			const sourcebooks = props.hero.settingIDs.map(id => props.sourcebooks.find(s => s.id === id)).filter(s => !!s);
			const allLanguages = SourcebookLogic.getLanguages(sourcebooks);
			const languageNames = HeroLogic.getLanguages(props.hero, sourcebooks).map(l => l.name);

			return (
				<div>
					{
						Collections
							.sort(allLanguages, l => l.name)
							.map(l => (
								<div className='skill-row'>
									{languageNames.includes(l.name) ? <StarFilled style={{ color: 'rgb(22, 119, 255)' }} /> : null}
									<Field key={l.name} label={l.name} value={l.description} />
								</div>
							))
					}
				</div>
			);
		};

		const getAbilitiesSection = () => {
			const abilities = HeroLogic.getAbilities(props.hero, false, true, true);

			return (
				<Space direction='vertical'>
					<HeaderText>Actions</HeaderText>
					{
						abilities
							.filter(a => a.type.usage === AbilityUsage.Action)
							.map(a => <SelectablePanel key={a.id}><AbilityPanel ability={a} hero={props.hero} mode={PanelMode.Full} /></SelectablePanel>)
					}
					<HeaderText>Maneuvers</HeaderText>
					{
						abilities
							.filter(a => a.type.usage === AbilityUsage.Maneuver)
							.map(a => <SelectablePanel key={a.id}><AbilityPanel ability={a} hero={props.hero} mode={PanelMode.Full} /></SelectablePanel>)
					}
					<HeaderText>Move Actions</HeaderText>
					{
						abilities
							.filter(a => a.type.usage === AbilityUsage.Move)
							.map(a => <SelectablePanel key={a.id}><AbilityPanel ability={a} hero={props.hero} mode={PanelMode.Full} /></SelectablePanel>)
					}
				</Space>
			);
		};

		return (
			<Modal
				content={
					<div className='rules-modal'>
						<Tabs
							items={[
								{
									key: '1',
									label: 'Conditions',
									children: getConditionsSection()
								},
								{
									key: '2',
									label: 'Skills',
									children: getSkillsSection()
								},
								{
									key: '3',
									label: 'Languages',
									children: getLanguagesSection()
								},
								{
									key: '4',
									label: 'Abilities',
									children: getAbilitiesSection()
								}
							]}
						/>
					</div>
				}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
