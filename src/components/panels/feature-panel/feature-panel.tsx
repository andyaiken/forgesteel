import { Feature, FeatureAbilityData, FeatureClassAbilityData, FeatureLanguageData, FeatureSkillData } from '../../../models/feature';
import { AbilityPanel } from '../ability-panel/ability-panel';
import { CampaignSettingData } from '../../../data/campaign-setting-data';
import { Collections } from '../../../utils/collections';
import { FeatureType } from '../../../enums/feature-type';
import { Hero } from '../../../models/hero';
import { PanelMode } from '../../../enums/panel-mode';
import { Select } from 'antd';
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
				<AbilityPanel ability={data.ability} />
			);
		}
			break;
		case FeatureType.ClassAbility: {
			const data = props.feature.data as FeatureClassAbilityData;
			const abilities = props.hero?.class?.abilities.filter(a => a.cost === data.cost) || [];

			const distinctAbilities = Collections.distinct(abilities, a => a.name);
			const sortedAbilities = Collections.sort(distinctAbilities, a => a.name);

			extra = (
				<Select
					style={{ width: '100%' }}
					mode={data.count === 1 ? undefined : 'multiple'}
					maxCount={data.count}
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
					<Select
						style={{ width: '100%' }}
						mode={data.count == 1 ? undefined : 'multiple'}
						maxCount={data.count}
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
					<Select
						style={{ width: '100%' }}
						mode={data.count === 1 ? undefined : 'multiple'}
						maxCount={data.count}
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
			<div className='header-text'>{props.feature.name}</div>
			<div className='description-text'>{props.feature.description}</div>
			{props.mode === PanelMode.Full ? extra : null}
		</div>
	);
};
