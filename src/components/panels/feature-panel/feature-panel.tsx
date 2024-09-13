import { Feature, FeatureAbilityData, FeatureClassAbilityData, FeatureLanguageData, FeatureSkillData } from '../../../models/feature';
import { Select, Space } from 'antd';
import { Ability } from '../../../models/ability';
import { AbilityPanel } from '../ability-panel/ability-panel';
import { CampaignSettingData } from '../../../data/campaign-setting-data';
import { Collections } from '../../../utils/collections';
import { FeatureType } from '../../../enums/feature-type';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { PanelMode } from '../../../enums/panel-mode';
import { SkillData } from '../../../data/skill-data';

import './feature-panel.scss';

interface Props {
	feature: Feature;
	hero?: Hero;
	mode?: PanelMode;
	setData?: (featureID: string, data: FeatureClassAbilityData | FeatureSkillData | FeatureLanguageData) => void;
}

export const FeaturePanel = (props: Props) => {
	let extra = null;
	switch (props.feature.type) {
		case FeatureType.Ability: {
			const data = props.feature.data as FeatureAbilityData;
			extra = (
				<AbilityPanel ability={data.ability} hero={props.hero} />
			);
		}
			break;
		case FeatureType.ClassAbility: {
			const data = props.feature.data as FeatureClassAbilityData;
			const abilities = props.hero?.class?.abilities.filter(a => a.cost === data.cost) || [];

			const distinctAbilities = Collections.distinct(abilities, a => a.name);
			const sortedAbilities = Collections.sort(distinctAbilities, a => a.name);

			extra = (
				<Space direction='vertical' style={{ width: '100%' }}>
					<Select
						style={{ width: '100%' }}
						mode={data.count === 1 ? undefined : 'multiple'}
						maxCount={data.count === 1 ? undefined : data.count}
						allowClear={true}
						placeholder='Select'
						options={sortedAbilities.map(a => ({ label: a.name, value: a.id }))}
						value={data.count === 1 ? (data.selectedIDs.length > 0 ? data.selectedIDs[0] : null) : data.selectedIDs}
						onChange={value => {
							if (data.count === 1) {
								const val = value as string;
								const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureClassAbilityData;
								dataCopy.selectedIDs = val ? [ val ] : [];
								if (props.setData) {
									props.setData(props.feature.id, dataCopy);
								}
							} else {
								const values = value as string[];
								if (values.length <= data.count) {
									const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureClassAbilityData;
									dataCopy.selectedIDs = values;
									if (props.setData) {
										props.setData(props.feature.id, dataCopy);
									}
								}
							}
						}}
					/>
					{
						data.selectedIDs.map(id => {
							const ability = abilities.find(a => a.id === id) as Ability;
							return (
								<AbilityPanel key={ability.id} ability={ability} mode={PanelMode.Full} />
							);
						})
					}
				</Space>
			);
		}
			break;
		case FeatureType.Language: {
			const data = props.feature.data as FeatureLanguageData;
			if (props.feature.choice) {
				const languages: string[] = [];
				data.options.forEach(language => languages.push(language));
				if (languages.length === 0) {
					const setting = CampaignSettingData.getCampaignSettings().find(s => s.id === props.hero?.settingID);
					setting?.languages.forEach(l => languages.push(l));
				}
				const distinctLanguages = Collections.distinct(languages, l => l);
				const sortedLanguages = Collections.sort(distinctLanguages, l => l);

				extra = (
					<div>
						<Select
							style={{ width: '100%' }}
							mode={data.count == 1 ? undefined : 'multiple'}
							maxCount={data.count === 1 ? undefined : data.count}
							allowClear={true}
							placeholder='Select'
							options={sortedLanguages.map(l => ({ label: l, value: l }))}
							value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0] : null) : data.selected}
							onChange={value => {
								if (data.count === 1) {
									const val = value as string;
									const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureLanguageData;
									dataCopy.selected = val ? [ val ] : [];
									if (props.setData) {
										props.setData(props.feature.id, dataCopy);
									}
								} else {
									const values = value as string[];
									if (values.length <= data.count) {
										const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureLanguageData;
										dataCopy.selected = values;
										if (props.setData) {
											props.setData(props.feature.id, dataCopy);
										}
									}
								}
							}}
						/>
						{
							data.selected.map(l => {
								if (props.hero) {
									const features = HeroLogic.getFeatures(props.hero)
										.filter(f => f.id !== props.feature.id)
										.filter(f => f.type === FeatureType.Language)
										.filter(f => {
											const data = f.data as FeatureLanguageData;
											return data.selected.includes(l);
										});
									if (features.length > 0) {
										return (
											<div className='warning-text'>{l} is also granted by {features.map(f => f.name).join(', ')}</div>
										);
									}
								}
								return null;
							})
						}
					</div>
				);
			} else {
				extra = (
					<div className='ds-text'>{data.selected.join(', ')}</div>
				);
			}
		}
			break;
		case FeatureType.Skill: {
			const data = props.feature.data as FeatureSkillData;
			if (props.feature.choice) {
				const skills: string[] = [];
				data.options.forEach(skill => skills.push(skill));
				data.listOptions.forEach(list => {
					const setting = CampaignSettingData.getCampaignSettings().find(s => s.id === props.hero?.settingID);
					SkillData.getSkills(list, setting).forEach(skill => {
						skills.push(skill.name);
					});
				});
				const distinctSkills = Collections.distinct(skills, s => s);
				const sortedSkills = Collections.sort(distinctSkills, s => s);

				extra = (
					<div>
						<Select
							style={{ width: '100%' }}
							mode={data.count === 1 ? undefined : 'multiple'}
							maxCount={data.count === 1 ? undefined : data.count}
							allowClear={true}
							placeholder='Select'
							options={sortedSkills.map(s => ({ label: s, value: s }))}
							value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0] : null) : data.selected}
							onChange={value => {
								if (data.count === 1) {
									const val = value as string;
									const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureSkillData;
									dataCopy.selected = val ? [ val ] : [];
									if (props.setData) {
										props.setData(props.feature.id, dataCopy);
									}
								} else {
									const values = value as string[];
									if (values.length <= data.count) {
										const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureSkillData;
										dataCopy.selected = values;
										if (props.setData) {
											props.setData(props.feature.id, dataCopy);
										}
									}
								}
							}}
						/>
						{
							data.selected.map(s => {
								if (props.hero) {
									const features = HeroLogic.getFeatures(props.hero)
										.filter(f => f.id !== props.feature.id)
										.filter(f => f.type === FeatureType.Skill)
										.filter(f => {
											const data = f.data as FeatureSkillData;
											return data.selected.includes(s);
										});
									if (features.length > 0) {
										return (
											<div className='warning-text'>{s} is also granted by {features.map(f => f.name).join(', ')}</div>
										);
									}
								}
								return null;
							})
						}
					</div>
				);
			} else {
				extra = (
					<div className='ds-text'>{data.selected.join(', ')}</div>
				);
			}
		}
			break;
	}

	return (
		<div className='feature-panel'>
			<HeaderText>{props.feature.name}</HeaderText>
			<div className='description-text'>{props.feature.description}</div>
			{props.mode === PanelMode.Full ? extra : null}
		</div>
	);
};
