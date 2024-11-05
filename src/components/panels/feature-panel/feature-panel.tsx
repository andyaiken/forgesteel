import { Alert, Select, Space } from 'antd';
import { Feature, FeatureAbilityCostData, FeatureAbilityData, FeatureBonusData, FeatureChoiceData, FeatureClassAbilityData, FeatureDamageModifierData, FeatureData, FeatureDomainData, FeatureDomainFeatureData, FeatureKitData, FeatureKitTypeData, FeatureLanguageData, FeatureMultipleData, FeatureSizeData, FeatureSkillChoiceData, FeatureSkillData } from '../../../models/feature';
import { Ability } from '../../../models/ability';
import { AbilityPanel } from '../ability-panel/ability-panel';
import { CampaignSetting } from '../../../models/campaign-setting';
import { Collections } from '../../../utils/collections';
import { DomainData } from '../../../data/domains';
import { DomainPanel } from '../domain-panel/domain-panel';
import { FeatureLogic } from '../../../logic/feature-logic';
import { FeatureType } from '../../../enums/feature-type';
import { Field } from '../../controls/field/field';
import { FormatLogic } from '../../../logic/format-logic';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { HeroicResourceBadge } from '../../controls/heroic-resource-badge/heroic-resource-badge';
import { KitData } from '../../../data/kit-data';
import { KitPanel } from '../kit-panel/kit-panel';
import { LanguageData } from '../../../data/language-data';
import { PanelMode } from '../../../enums/panel-mode';
import { SkillData } from '../../../data/skill-data';
import { Utils } from '../../../utils/utils';

import './feature-panel.scss';

interface Props {
	feature: Feature;
	hero?: Hero;
	campaignSettings?: CampaignSetting[];
	mode?: PanelMode;
	setData?: (featureID: string, data: FeatureData) => void;
}

export const FeaturePanel = (props: Props) => {
	// #region Editable

	const getEditableChoice = (data: FeatureChoiceData) => {
		const selectedIDs = data.selected.map(f => f.id);

		const pointsUsed = Collections.sum(selectedIDs, id => {
			const original = data.options.find(o => o.feature.id === id);
			return original ? original.value : 0;
		});
		const pointsLeft = data.count - pointsUsed;

		const availableOptions = data.options.filter(o => selectedIDs.includes(o.feature.id) || (o.value <= pointsLeft));
		const sortedOptions = Collections.sort(availableOptions, opt => opt.feature.name);

		if (sortedOptions.length === 0) {
			return (
				<Alert type='info' showIcon={true} message='There are no options to choose for this feature.' />
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					mode={data.count === 1 ? undefined : 'multiple'}
					maxCount={data.count === 1 ? undefined : data.count}
					allowClear={true}
					placeholder={data.count === 1 ? 'Select an option' : 'Select options'}
					options={sortedOptions.map(o => ({ label: o.feature.name, value: o.feature.id, desc: o.feature.description, cost: o.value }))}
					optionRender={option => (
						<Field
							label={(
								<div style={{ display: 'inline-flex',  alignItems: 'center', gap: '5px' }}>
									<span>{option.data.label}</span>
									{option.data.cost > 1 ? <HeroicResourceBadge value={option.data.cost} /> : null}
								</div>
							)}
							value={option.data.desc}
						/>
					)}
					value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0].id : null) : data.selected.map(f => f.id)}
					onChange={value => {
						let ids: string[] = [];
						if (data.count === 1) {
							ids = value !== undefined ? [ value as string ] : [];
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
						<FeaturePanel key={f.id} feature={f} hero={props.hero} campaignSettings={props.campaignSettings} mode={PanelMode.Full} />
					))
				}
			</Space>
		);
	};

	const getEditableClassAbility = (data: FeatureClassAbilityData) => {
		const abilities = props.hero?.class?.abilities.filter(a => a.cost === data.cost) || [];

		const distinctAbilities = Collections.distinct(abilities, a => a.name);
		const sortedAbilities = Collections.sort(distinctAbilities, a => a.name);

		if (sortedAbilities.length === 0) {
			return (
				<Alert type='info' showIcon={true} message='There are no options to choose for this feature.' />
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					mode={data.count === 1 ? undefined : 'multiple'}
					maxCount={data.count === 1 ? undefined : data.count}
					allowClear={true}
					placeholder={data.count === 1 ? 'Select an ability' : 'Select abilities'}
					options={sortedAbilities.map(a => ({ label: a.name, value: a.id, desc: a.description }))}
					optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
					value={data.count === 1 ? (data.selectedIDs.length > 0 ? data.selectedIDs[0] : null) : data.selectedIDs}
					onChange={value => {
						let ids: string[] = [];
						if (data.count === 1) {
							ids = value !== undefined ? [ value as string ] : [];
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
	};

	const getEditableDomain = (data: FeatureDomainData) => {
		if (!props.hero) {
			return null;
		}

		const domains = DomainData.getDomains(props.campaignSettings as CampaignSetting[]);
		const sortedDomains = Collections.sort(domains, d => d.name);

		if (sortedDomains.length === 0) {
			return (
				<Alert type='info' showIcon={true} message='There are no options to choose for this feature.' />
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					mode={data.count === 1 ? undefined : 'multiple'}
					maxCount={data.count === 1 ? undefined : data.count}
					allowClear={true}
					placeholder={data.count === 1 ? 'Select a domain' : 'Select domains'}
					options={sortedDomains.map(a => ({ label: a.name, value: a.id, desc: a.description }))}
					optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
					value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0].id : null) : data.selected.map(k => k.id)}
					onChange={value => {
						let ids: string[] = [];
						if (data.count === 1) {
							ids = value !== undefined ? [ value as string ] : [];
						} else {
							ids = value as string[];
						}
						const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureDomainData;
						dataCopy.selected = [];
						ids.forEach(id => {
							const domain = domains.find(k => k.id === id);
							if (domain) {
								dataCopy.selected.push(domain);
							}
						});
						if (props.setData) {
							props.setData(props.feature.id, dataCopy);
						}
					}}
				/>
			</Space>
		);
	};

	const getEditableDomainFeature = (data: FeatureDomainFeatureData) => {
		if (!props.hero) {
			return null;
		}

		const options: Feature[] = [];
		HeroLogic.getDomains(props.hero).forEach(d => {
			d.featuresByLevel
				.filter(lvl => lvl.level === data.level)
				.forEach(lvl => options.push(...lvl.features));
		});

		if (options.length === 0) {
			return (
				<Alert type='info' showIcon={true} message='Choose a domain to enable this feature.' />
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					mode={data.count === 1 ? undefined : 'multiple'}
					maxCount={data.count === 1 ? undefined : data.count}
					allowClear={true}
					placeholder={data.count === 1 ? 'Select an option' : 'Select options'}
					options={options.map(o => ({ label: o.name, value: o.id, desc: o.description }))}
					optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
					value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0].id : null) : data.selected.map(f => f.id)}
					onChange={value => {
						let ids: string[] = [];
						if (data.count === 1) {
							ids = value !== undefined ? [ value as string ] : [];
						} else {
							ids = value as string[];
						}
						const features: Feature[] = [];
						ids.forEach(id => {
							const option = options.find(o => o.id === id);
							if (option) {
								const featureCopy = JSON.parse(JSON.stringify(option)) as Feature;
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
						<FeaturePanel key={f.id} feature={f} hero={props.hero} campaignSettings={props.campaignSettings} mode={PanelMode.Full} />
					))
				}
			</Space>
		);
	};

	const getEditableKit = (data: FeatureKitData) => {
		if (!props.hero) {
			return null;
		}

		const kitTypes = data.types.length > 0 ? data.types : HeroLogic.getKitTypes(props.hero);
		const kits = KitData.getKits(props.campaignSettings as CampaignSetting[])
			.filter(k => kitTypes.includes(k.type));

		const sortedKits = Collections.sort(kits, k => k.name);

		if (sortedKits.length === 0) {
			return (
				<Alert type='info' showIcon={true} message='There are no options to choose for this feature.' />
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					mode={data.count === 1 ? undefined : 'multiple'}
					maxCount={data.count === 1 ? undefined : data.count}
					allowClear={true}
					placeholder={data.count === 1 ? 'Select a kit' : 'Select kits'}
					options={sortedKits.map(a => ({ label: a.name, value: a.id, desc: a.description }))}
					optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
					value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0].id : null) : data.selected.map(k => k.id)}
					onChange={value => {
						let ids: string[] = [];
						if (data.count === 1) {
							ids = value !== undefined ? [ value as string ] : [];
						} else {
							ids = value as string[];
						}
						const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureKitData;
						dataCopy.selected = [];
						ids.forEach(id => {
							const kit = kits.find(k => k.id === id);
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
	};

	const getEditableLanguage = (data: FeatureLanguageData) => {
		const languages = LanguageData.getLanguages(props.campaignSettings as CampaignSetting[]);
		const sortedLanguages = Collections.sort(languages, l => l.name);

		if (sortedLanguages.length === 0) {
			return (
				<Alert type='info' showIcon={true} message='There are no options to choose for this feature.' />
			);
		}

		return (
			<div>
				<div className='ds-text'>{data.count === 1 ? 'Select a language:' : `Select ${data.count} languages:`}</div>
				<Select
					style={{ width: '100%' }}
					mode={data.count == 1 ? undefined : 'multiple'}
					maxCount={data.count === 1 ? undefined : data.count}
					allowClear={true}
					placeholder={data.count === 1 ? 'Select a language' : 'Select languages'}
					options={sortedLanguages.map(l => ({ label: l.name, value: l.name, desc: l.description }))}
					optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
					value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0] : null) : data.selected}
					onChange={value => {
						let ids: string[] = [];
						if (data.count === 1) {
							ids = value !== undefined ? [ value as string ] : [];
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
							const languages: string[] = [];
							if (props.hero.culture) {
								languages.push(...props.hero.culture.languages);
							}
							props.hero.settingIDs.forEach(settingID => {
								if (props.campaignSettings) {
									const setting = props.campaignSettings.find(cs => cs.id === settingID);
									if (setting) {
										languages.push(...setting.defaultLanguages);
									}
								}
							});
							HeroLogic.getFeatures(props.hero)
								.filter(f => f.id !== props.feature.id)
								.filter(f => f.type === FeatureType.Language)
								.forEach(f => {
									const data = f.data as FeatureLanguageData;
									languages.push(...data.selected);
								});
							if (languages.includes(l)) {
								return (
									<Alert key={n} type='warning' showIcon={true} message={`You have already chosen ${l}.`} />
								);
							}
						}
						return null;
					})
				}
			</div>
		);
	};

	const getEditableSkillChoice = (data: FeatureSkillChoiceData) => {
		const skills = SkillData.getSkills(props.campaignSettings as CampaignSetting[])
			.filter(skill => (data.options.includes(skill.name)) || (data.listOptions.includes(skill.list)));
		const sortedSkills = Collections.sort(skills, s => s.name);

		if (sortedSkills.length === 0) {
			return (
				<Alert type='info' showIcon={true} message='There are no options to choose for this feature.' />
			);
		}

		return (
			<div>
				<div className='ds-text'>{data.count === 1 ? 'Select a skill:' : `Select ${data.count} skills:`}</div>
				<Select
					style={{ width: '100%' }}
					mode={data.count === 1 ? undefined : 'multiple'}
					maxCount={data.count === 1 ? undefined : data.count}
					allowClear={true}
					placeholder={data.count === 1 ? 'Select a skill' : 'Select skills'}
					options={sortedSkills.map(s => ({ label: s.name, value: s.name, desc: s.description }))}
					optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
					value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0] : null) : data.selected}
					onChange={value => {
						let ids: string[] = [];
						if (data.count === 1) {
							ids = value !== undefined ? [ value as string ] : [];
						} else {
							ids = value as string[];
						}
						const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureSkillChoiceData;
						dataCopy.selected = ids;
						if (props.setData) {
							props.setData(props.feature.id, dataCopy);
						}
					}}
				/>
				{
					data.selected.map((s, n) => {
						if (props.hero) {
							const selected = HeroLogic.getFeatures(props.hero)
								.filter(f => f.id !== props.feature.id)
								.some(f => {
									switch (f.type) {
										case FeatureType.Skill: {
											const data = f.data as FeatureSkillData;
											return data.skill === s;
										}
										case FeatureType.SkillChoice: {
											const data = f.data as FeatureSkillChoiceData;
											return data.selected.includes(s);
										}
									}

									return false;
								});
							if (selected) {
								return (
									<Alert key={n} type='warning' showIcon={true} message={`You have already chosen ${s}.`} />
								);
							}
						}
						return null;
					})
				}
			</div>
		);
	};

	const getEditable = () => {
		switch (props.feature.type) {
			case FeatureType.Choice:
				return getEditableChoice(props.feature.data as FeatureChoiceData);
			case FeatureType.ClassAbility:
				return getEditableClassAbility(props.feature.data as FeatureClassAbilityData);
			case FeatureType.Domain:
				return getEditableDomain(props.feature.data as FeatureDomainData);
			case FeatureType.DomainFeature:
				return getEditableDomainFeature(props.feature.data as FeatureDomainFeatureData);
			case FeatureType.Kit:
				return getEditableKit(props.feature.data as FeatureKitData);
			case FeatureType.Language:
				return getEditableLanguage(props.feature.data as FeatureLanguageData);
			case FeatureType.SkillChoice:
				return getEditableSkillChoice(props.feature.data as FeatureSkillChoiceData);
		}

		return null;
	};

	// #endregion

	// #region Extra

	const getExtraAbilityCost = (data: FeatureAbilityCostData) => {
		return (
			<Field label={data.keywords.join(', ')} value={`Heroic resource cost ${data.modifier >= 0 ? '+' : ''}${data.modifier}`} />
		);
	};

	const getExtraBonus = (data: FeatureBonusData) => {
		let desc = `${data.value >= 0 ? '+' : ''}${data.value}`;
		if (data.valuePerLevel) {
			desc += `, ${data.valuePerLevel >= 0 ? '+' : ''}${data.valuePerLevel} per level after 1st`;
		}

		return (
			<Field label={data.field} value={desc} />
		);
	};

	const getExtraChoice = (data: FeatureChoiceData) => {
		const list = data.selected.length > 0 ? data.selected : data.options.map(o => o.feature);
		if (list.length === 0) {
			return null;
		}

		return (
			<Space direction='vertical' style={{ width: '100%', padding: '0 20px' }}>
				{
					list.map(f => <FeaturePanel key={f.id} feature={f} mode={PanelMode.Full} />)
				}
			</Space>
		);
	};

	const getExtraClassAbility = (data: FeatureClassAbilityData) => {
		if ((data.selectedIDs.length > 0) && props.hero && props.hero.class) {
			const abilities = props.hero.class.abilities.filter(a => a.cost === data.cost) || [];
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
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

		if (!props.feature.description) {
			return (
				<div className='ds-text'>Choose {data.count > 1 ? data.count : 'a'} {data.cost > 0 ? `${data.cost}pt` : 'signature'} {data.count > 1 ? 'abilities' : 'ability'}.</div>
			);
		}

		return null;
	};

	const getExtraDamageModifier = (data: FeatureDamageModifierData) => {
		if (!props.feature.description) {
			return (
				<div className='ds-text'>
					{data.modifiers.map(FormatLogic.getDamageModifier).join(', ')}
				</div>
			);
		}

		return null;
	};

	const getExtraDomain = (data: FeatureDomainData) => {
		if (data.selected.length > 0) {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						data.selected.map(d => <DomainPanel key={d.id} domain={d} mode={PanelMode.Full} />)
					}
				</Space>
			);
		}

		if (!props.feature.description) {
			return (
				<div className='ds-text'>Choose {data.count > 1 ? data.count : 'a'} {data.count > 1 ? 'domains' : 'domain'}.</div>
			);
		}

		return null;
	};

	const getExtraDomainFeature = (data: FeatureDomainFeatureData) => {
		if (data.selected.length === 0) {
			return null;
		}

		if (!props.feature.description) {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						data.selected.map(f => <FeaturePanel key={f.id} feature={f} mode={PanelMode.Full} />)
					}
				</Space>
			);
		}

		return null;
	};

	const getExtraKit = (data: FeatureKitData) => {
		if (data.selected.length > 0) {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						data.selected.map(k => <KitPanel key={k.id} kit={k} mode={PanelMode.Full} />)
					}
				</Space>
			);
		}

		if (!props.feature.description) {
			return (
				<div className='ds-text'>Choose {data.count > 1 ? data.count : 'a'} {data.types.join(', ')} {data.count > 1 ? 'kits' : 'kit'}.</div>
			);
		}

		return null;
	};

	const getExtraKitType = (data: FeatureKitTypeData) => {
		if (!props.feature.description) {
			return (
				<div className='ds-text'>Allow {data.types.join(', ')} kits.</div>
			);
		}

		return null;
	};

	const getExtraLanguage = (data: FeatureLanguageData) => {
		if (data.selected.length > 0) {
			return (
				<Field label='Language' value={data.selected.join(', ')} />
			);
		}

		if (!props.feature.description) {
			return (
				<div className='ds-text'>Choose {data.count > 1 ? data.count : 'a'} {data.count > 1 ? 'languages' : 'language'}.</div>
			);
		}

		return null;
	};

	const getExtraSize = (data: FeatureSizeData) => {
		if (!props.feature.description) {
			return (
				<Field label='Size' value={FormatLogic.getSize(data.size)} />
			);
		}

		return null;
	};

	const getExtraSkill = (data: FeatureSkillData) => {
		if (!props.feature.description) {
			return (
				<Field label='Skill' value={data.skill} />
			);
		}

		return null;
	};

	const getExtraSkillChoice = (data: FeatureSkillChoiceData) => {
		if (data.selected.length > 0) {
			return (
				<Field label='Skill' value={data.selected.join(', ')} />
			);
		}

		if (!props.feature.description) {
			const count = data.count || 1;
			const names = (Collections.sort(data.options, o => o) || []).concat((Collections.sort(data.listOptions, o => o) || []).map(l => `the ${l} list`)).join(', ');
			const str = (count > 1 ? `Choose ${count} skills from ${names}.` : `Choose a skill from ${names}.`);

			return (
				<div className='ds-text'>{str}</div>
			);
		}

		return null;
	};

	const getExtra = () => {
		switch (props.feature.type) {
			case FeatureType.AbilityCost:
				return getExtraAbilityCost(props.feature.data as FeatureAbilityCostData);
			case FeatureType.Bonus:
				return getExtraBonus(props.feature.data as FeatureBonusData);
			case FeatureType.Choice:
				return getExtraChoice(props.feature.data as FeatureChoiceData);
			case FeatureType.ClassAbility:
				return getExtraClassAbility(props.feature.data as FeatureClassAbilityData);
			case FeatureType.DamageModifier:
				return getExtraDamageModifier(props.feature.data as FeatureDamageModifierData);
			case FeatureType.Domain:
				return getExtraDomain(props.feature.data as FeatureDomainData);
			case FeatureType.DomainFeature:
				return getExtraDomainFeature(props.feature.data as FeatureDomainFeatureData);
			case FeatureType.Kit:
				return getExtraKit(props.feature.data as FeatureKitData);
			case FeatureType.KitType:
				return getExtraKitType(props.feature.data as FeatureKitTypeData);
			case FeatureType.Language:
				return getExtraLanguage(props.feature.data as FeatureLanguageData);
			case FeatureType.Size:
				return getExtraSize(props.feature.data as FeatureSizeData);
			case FeatureType.Skill:
				return getExtraSkill(props.feature.data as FeatureSkillData);
			case FeatureType.SkillChoice:
				return getExtraSkillChoice(props.feature.data as FeatureSkillChoiceData);
		}

		return null;
	};

	// #endregion

	const requiresChoice = () => {
		return props.setData && FeatureLogic.isChoice(props.feature) && !FeatureLogic.isChosen(props.feature);
	};

	try {
		if (props.feature.type === FeatureType.Ability) {
			const data = props.feature.data as FeatureAbilityData;
			return (
				<AbilityPanel ability={data.ability} hero={props.hero} mode={props.mode} />
			);
		}

		if (props.feature.type === FeatureType.Multiple) {
			const data = props.feature.data as FeatureMultipleData;
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						data.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} campaignSettings={props.campaignSettings} mode={PanelMode.Full} />)
					}
				</Space>
			);
		}

		let className = 'feature-panel';
		if (requiresChoice()) {
			className += ' not-chosen';
		}

		return (
			<div className={className} id={props.mode === PanelMode.Full ? props.feature.id : undefined}>
				<HeaderText>{props.feature.name || 'Unnamed Feature'}</HeaderText>
				<div className='ds-text' dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.feature.description) }} />
				{
					props.mode === PanelMode.Full
						? (props.setData ? getEditable() : getExtra())
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
