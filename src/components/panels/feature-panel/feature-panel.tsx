import { Feature, FeatureAbilityData, FeatureChoiceData, FeatureClassAbilityData, FeatureData, FeatureKitData, FeatureLanguageData, FeatureSkillData } from '../../../models/feature';
import { Select, Space } from 'antd';
import { Ability } from '../../../models/ability';
import { AbilityPanel } from '../ability-panel/ability-panel';
import { CampaignSettingData } from '../../../data/campaign-setting-data';
import { Collections } from '../../../utils/collections';
import { FeatureType } from '../../../enums/feature-type';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { KitData } from '../../../data/kit-data';
import { KitPanel } from '../kit-panel/kit-panel';
import { PanelMode } from '../../../enums/panel-mode';
import { SkillData } from '../../../data/skill-data';

import './feature-panel.scss';

interface Props {
	feature: Feature;
	hero?: Hero;
	mode?: PanelMode;
	setData?: (featureID: string, data: FeatureData) => void;
}

export const FeaturePanel = (props: Props) => {
	try {
		if (props.feature.type === FeatureType.Ability) {
			const data = props.feature.data as FeatureAbilityData;
			return (
				<AbilityPanel ability={data.ability} hero={props.hero} />
			);
		}

		let extra = null;
		switch (props.feature.type) {
			case FeatureType.Choice: {
				const data = props.feature.data as FeatureChoiceData;
				extra = (
					<Space direction='vertical' style={{ width: '100%' }}>
						<Select
							style={{ width: '100%' }}
							mode={data.count === 1 ? undefined : 'multiple'}
							maxCount={data.count === 1 ? undefined : data.count}
							allowClear={true}
							placeholder='Select'
							options={data.options.map(o => ({ label: o.feature.name, value: o.feature.id }))}
							value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0].id : null) : data.selected.map(f => f.id)}
							onChange={value => {
								let ids: string[] = [];
								if (data.count === 1) {
									const val = value as string;
									ids = [ val ];
								} else {
									ids = value as string[];
								}
								const features: Feature[] = [];
								ids.forEach(id => {
									const option = data.options.find(o => o.feature.id === id);
									if (option) {
										const featureCopy = JSON.parse(JSON.stringify(option.feature)) as Feature;
										features.push(featureCopy);
									}
								});
								const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureChoiceData;
								dataCopy.selected = features;
								if (props.setData) {
									props.setData(props.feature.id, dataCopy);
								}
							}}
						/>
						{
							data.selected.map(f => (
								<FeaturePanel key={f.id} feature={f} mode={PanelMode.Full} />
							))
						}
					</Space>
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
								let ids: string[] = [];
								if (data.count === 1) {
									const val = value as string;
									ids = [ val ];
								} else {
									ids = value as string[];
								}
								const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureClassAbilityData;
								dataCopy.selectedIDs = ids;
								if (props.setData) {
									props.setData(props.feature.id, dataCopy);
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
			case FeatureType.Kit: {
				const data = props.feature.data as FeatureKitData;
				const kits = KitData.getKits().filter(k => data.types.includes(k.type));

				const sortedKits = Collections.sort(kits, k => k.name);

				extra = (
					<Space direction='vertical' style={{ width: '100%' }}>
						<Select
							style={{ width: '100%' }}
							mode={data.count === 1 ? undefined : 'multiple'}
							maxCount={data.count === 1 ? undefined : data.count}
							allowClear={true}
							placeholder='Select'
							options={sortedKits.map(a => ({ label: a.name, value: a.id }))}
							value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0].id : null) : data.selected.map(k => k.id)}
							onChange={value => {
								let ids: string[] = [];
								if (data.count === 1) {
									const val = value as string;
									ids = [ val ];
								} else {
									ids = value as string[];
								}
								const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureKitData;
								dataCopy.selected = [];
								ids.forEach(id => {
									const kit = KitData.getKits().find(k => k.id === id);
									if (kit) {
										dataCopy.selected.push(kit);
									}
								});
								if (props.setData) {
									props.setData(props.feature.id, dataCopy);
								}
							}}
						/>
						{
							data.selected.map(k => {
								return (
									<KitPanel key={k.id} kit={k} mode={PanelMode.Full} />
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
									let ids: string[] = [];
									if (data.count === 1) {
										const val = value as string;
										ids = [ val ];
									} else {
										ids = value as string[];
									}
									const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureLanguageData;
									dataCopy.selected = ids;
									if (props.setData) {
										props.setData(props.feature.id, dataCopy);
									}
								}}
							/>
							{
								data.selected.map((l, n) => {
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
												<div key={n} className='ds-text warning-text'>{l} is also granted by {features.map(f => f.name).join(', ')}</div>
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
						SkillData.getSkillsFromList(list, setting).forEach(skill => {
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
									let ids: string[] = [];
									if (data.count === 1) {
										const val = value as string;
										ids = [ val ];
									} else {
										ids = value as string[];
									}
									const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureSkillData;
									dataCopy.selected = ids;
									if (props.setData) {
										props.setData(props.feature.id, dataCopy);
									}
								}}
							/>
							{
								data.selected.map((s, n) => {
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
												<div key={n} className='ds-text warning-text'>{s} is also granted by {features.map(f => f.name).join(', ')}</div>
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
				<div className='ds-text description-text'>{props.feature.description}</div>
				{props.mode === PanelMode.Full ? extra : null}
			</div>
		);
	} catch {
		return null;
	}
};
