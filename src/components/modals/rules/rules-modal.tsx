import { Space, Tabs } from 'antd';
import { AbilityPanel } from '../../panels/ability-panel/ability-panel';
import { AbilityUsage } from '../../../enums/ability-usage';
import { CampaignSetting } from '../../../models/campaign-setting';
import { Collections } from '../../../utils/collections';
import { ConditionLogic } from '../../../logic/condition-logic';
import { ConditionType } from '../../../enums/condition-type';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { LanguageData } from '../../../data/language-data';
import { PanelMode } from '../../../enums/panel-mode';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { SkillData } from '../../../data/skill-data';
import { SkillList } from '../../../enums/skill-list';
import { Utils } from '../../../utils/utils';

import './rules-modal.scss';

interface Props {
	hero: Hero;
	settings: CampaignSetting[];
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
								<div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(ConditionLogic.getDescription(ct)) }} />
							</div>
						))
					}
				</div>
			);
		};

		const getSkillsSection = () => {
			const settings = props.hero.settingIDs.map(id => props.settings.find(s => s.id === id)).filter(s => !!s);

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
									SkillData.getSkills(settings)
										.filter(s => s.list === sl)
										.map(s => (
											<Field key={s.name} label={s.name} value={s.description} />
										))
								}
							</div>
						))
					}
				</div>
			);
		};

		const getActionsSection = () => {
			return (
				<Space direction='vertical'>
					{
						HeroLogic.getAbilities(props.hero, false, true, true)
							.filter(a => a.type.usage === AbilityUsage.Action)
							.map(a => <SelectablePanel key={a.id}><AbilityPanel ability={a} hero={props.hero} mode={PanelMode.Full} /></SelectablePanel>)
					}
				</Space>
			);
		};

		const getManeuversSection = () => {
			return (
				<Space direction='vertical'>
					{
						HeroLogic.getAbilities(props.hero, false, true, true)
							.filter(a => a.type.usage === AbilityUsage.Maneuver)
							.map(a => <SelectablePanel key={a.id}><AbilityPanel ability={a} hero={props.hero} mode={PanelMode.Full} /></SelectablePanel>)
					}
				</Space>
			);
		};

		const getLanguagesSection = () => {
			const settings = props.hero.settingIDs.map(id => props.settings.find(s => s.id === id)).filter(s => !!s);
			const languages = LanguageData.getLanguages(settings);

			return (
				<div>
					{Collections.sort(languages, l => l.name).map(l => <Field key={l.name} label={l.name} value={l.description} />)}
				</div>
			);
		};

		return (
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
							label: 'Actions',
							children: getActionsSection()
						},
						{
							key: '4',
							label: 'Maneuvers',
							children: getManeuversSection()
						},
						{
							key: '5',
							label: 'Languages',
							children: getLanguagesSection()
						}
					]}
				/>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
