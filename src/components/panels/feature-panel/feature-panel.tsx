import { Feature, FeatureLanguageData, FeatureSkillData } from '../../../models/feature';
import { CampaignSettingData } from '../../../data/campaign-setting-data';
import { Collections } from '../../../utils/collections';
import { FeatureType } from '../../../enums/feature-type';
import { PanelMode } from '../../../enums/panel-mode';
import { Select } from 'antd';
import { SkillData } from '../../../data/skill-data';

import './feature-panel.scss';

interface Props {
	feature: Feature;
	mode?: PanelMode;
	settingID: string;
	setData?: (featureID: string, data: FeatureSkillData | FeatureLanguageData) => void;
}

export const FeaturePanel = (props: Props) => {
	let extra = null;
	switch (props.feature.type) {
		case FeatureType.Skill:
			if (props.feature.choice) {
				const data = props.feature.data as FeatureSkillData;
				const skills: string[] = [];
				data.options.forEach(skill => skills.push(skill));
				data.listOptions.forEach(list => {
					const setting = CampaignSettingData.getCampaignSettings().find(s => s.id === props.settingID);
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
						allowClear={true}
						placeholder='Please select'
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
				const data = props.feature.data as FeatureSkillData;
				extra = (
					<div className='ds-text'>{data.selected.join(', ')}</div>
				);
			}
			break;
		case FeatureType.Language:
			if (props.feature.choice) {
				const data = props.feature.data as FeatureLanguageData;
				const languages: string[] = [];
				data.options.forEach(language => languages.push(language));
				if (languages.length === 0) {
					const setting = CampaignSettingData.getCampaignSettings().find(s => s.id === props.settingID);
					setting?.languages.forEach(l => languages.push(l));
				}
				const distinctLanguages = Collections.distinct(languages, l => l);
				const sortedLanguages = Collections.sort(distinctLanguages, l => l);

				extra = (
					<Select
						style={{ width: '100%' }}
						mode={data.count == 1 ? undefined : 'multiple'}
						allowClear={true}
						placeholder='Please select'
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
				const data = props.feature.data as FeatureLanguageData;
				extra = (
					<div className='ds-text'>{data.selected.join(', ')}</div>
				);
			}
			break;
	}

	return (
		<div className='feature-panel'>
			<div className='header-text'>{props.feature.name}</div>
			<div className='description-text'>{props.feature.description}</div>
			{extra}
		</div>
	);
};
