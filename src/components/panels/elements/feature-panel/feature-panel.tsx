import { Alert, Select, Space } from 'antd';
import { Feature, FeatureAbilityCostData, FeatureAbilityData, FeatureBonusData, FeatureChoiceData, FeatureClassAbilityData, FeatureDamageModifierData, FeatureData, FeatureDomainData, FeatureDomainFeatureData, FeatureKitData, FeatureKitTypeData, FeatureLanguageChoiceData, FeatureLanguageData, FeatureMaliceData, FeatureMultipleData, FeaturePerkData, FeatureSizeData, FeatureSkillChoiceData, FeatureSkillData, FeatureSpeedData, FeatureTitleData } from '../../../../models/feature';
import { Ability } from '../../../../models/ability';
import { AbilityPanel } from '../ability-panel/ability-panel';
import { Collections } from '../../../../utils/collections';
import { DomainPanel } from '../domain-panel/domain-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { FormatLogic } from '../../../../logic/format-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroLogic } from '../../../../logic/hero-logic';
import { HeroicResourceBadge } from '../../../controls/heroic-resource-badge/heroic-resource-badge';
import { KitPanel } from '../kit-panel/kit-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { Perk } from '../../../../models/perk';
import { PerkPanel } from '../perk-panel/perk-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { TitlePanel } from '../title-panel/title-panel';
import { Utils } from '../../../../utils/utils';
import { usePersistedSourcebooks } from '../../../../hooks/use-persisted-sourcebooks';

import './feature-panel.scss';

interface Props {
	feature: Feature | Perk;
	cost?: number;
	hero?: Hero;
	mode?: PanelMode;
	setData?: (featureID: string, data: FeatureData) => void;
}

export const FeaturePanel = (props: Props) => {
	const { sourcebooks } = usePersistedSourcebooks();
	// #region Editable

	const getEditableChoice = (data: FeatureChoiceData) => {
		const selectedIDs = data.selected.map(f => f.id);

		const pointsUsed = Collections.sum(selectedIDs, id => {
			const original = data.options.find(o => o.feature.id === id);
			return original ? original.value : 0;
		});
		const pointsLeft = data.count - pointsUsed;

		const availableOptions = data.options.filter(o => data.options.every(o => o.value === 1) || selectedIDs.includes(o.feature.id) || (o.value <= pointsLeft));
		const sortedOptions = Collections.sort(availableOptions, opt => opt.feature.name);

		if (sortedOptions.length === 0) {
			return (
				<Alert
					type='info'
					showIcon={true}
					message='There are no options to choose for this feature.'
				/>
			);
		}

		const showCosts = data.options.some(o => o.value > 1);

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<div className='ds-text'>
					{
						showCosts ?
							`You have ${data.count} points to spend on the following options:`
							:
							`Choose ${data.count} of the following options:`
					}
				</div>
				<Select
					style={{ width: '100%' }}
					className={data.selected.length === 0 ? 'selection-empty' : ''}
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
									{showCosts ? <HeroicResourceBadge value={option.data.cost} /> : null}
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
						<FeaturePanel key={f.id} feature={f} hero={props.hero} mode={PanelMode.Full} />
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
				<Alert
					type='info'
					showIcon={true}
					message='There are no options to choose for this feature.'
				/>
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					className={data.selectedIDs.length === 0 ? 'selection-empty' : ''}
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

		const domains = SourcebookLogic.getDomains(sourcebooks as Sourcebook[]);
		const sortedDomains = Collections.sort(domains, d => d.name);

		if (sortedDomains.length === 0) {
			return (
				<Alert
					type='info'
					showIcon={true}
					message='There are no options to choose for this feature.'
				/>
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					className={data.selected.length === 0 ? 'selection-empty' : ''}
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
				<Alert
					type='info'
					showIcon={true}
					message='Choose a domain to enable this feature.'
				/>
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					className={data.selected.length === 0 ? 'selection-empty' : ''}
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
						<FeaturePanel key={f.id} feature={f} hero={props.hero} mode={PanelMode.Full} />
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
		const kits = SourcebookLogic.getKits(sourcebooks)
			.filter(k => kitTypes.includes(k.type));

		const sortedKits = Collections.sort(kits, k => k.name);

		if (sortedKits.length === 0) {
			return (
				<Alert
					type='info'
					showIcon={true}
					message='There are no options to choose for this feature.'
				/>
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					className={data.selected.length === 0 ? 'selection-empty' : ''}
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

	const getEditableLanguageChoice = (data: FeatureLanguageChoiceData) => {
		const languages = SourcebookLogic.getLanguages(sourcebooks);
		const sortedLanguages = Collections.sort(languages, l => l.name);

		if (sortedLanguages.length === 0) {
			return (
				<Alert
					type='info'
					showIcon={true}
					message='There are no options to choose for this feature.'
				/>
			);
		}

		return (
			<div>
				<div className='ds-text'>{data.count === 1 ? 'Select a language:' : `Select ${data.count} languages:`}</div>
				<Select
					style={{ width: '100%' }}
					className={data.selected.length === 0 ? 'selection-empty' : ''}
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
						const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureLanguageChoiceData;
						dataCopy.selected = ids;
						if (props.setData) {
							props.setData(props.feature.id, dataCopy);
						}
					}}
				/>
				{
					data.selected.map((l, n) => {
						if (props.hero) {
							const selected = HeroLogic.getFeatures(props.hero)
								.filter(f => f.id !== props.feature.id)
								.some(f => {
									switch (f.type) {
										case FeatureType.Language: {
											const data = f.data as FeatureLanguageData;
											return data.language === l;
										}
										case FeatureType.LanguageChoice: {
											const data = f.data as FeatureLanguageChoiceData;
											return data.selected.includes(l);
										}
									}

									return false;
								});
							if (selected) {
								return (
									<Alert
										key={n}
										type='warning'
										showIcon={true}
										message={`You have already chosen ${l}.`}
									/>
								);
							}
						}
						return null;
					})
				}
			</div>
		);
	};

	const getEditablePerk = (data: FeaturePerkData) => {
		if (!props.hero) {
			return null;
		}

		const perks = SourcebookLogic.getPerks(sourcebooks).filter(p => data.lists.includes(p.list));
		const sortedPerks = Collections.sort(perks, p => p.name);

		if (sortedPerks.length === 0) {
			return (
				<Alert
					type='info'
					showIcon={true}
					message='There are no options to choose for this feature.'
				/>
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					className={data.selected.length === 0 ? 'selection-empty' : ''}
					mode={data.count === 1 ? undefined : 'multiple'}
					maxCount={data.count === 1 ? undefined : data.count}
					allowClear={true}
					placeholder={data.count === 1 ? 'Select a perk' : 'Select perks'}
					options={sortedPerks.map(a => ({ label: a.name, value: a.id, desc: a.description }))}
					optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
					value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0].id : null) : data.selected.map(k => k.id)}
					onChange={value => {
						let ids: string[] = [];
						if (data.count === 1) {
							ids = value !== undefined ? [ value as string ] : [];
						} else {
							ids = value as string[];
						}
						const dataCopy = JSON.parse(JSON.stringify(data)) as FeaturePerkData;
						dataCopy.selected = [];
						ids.forEach(id => {
							const perk = perks.find(p => p.id === id);
							if (perk) {
								dataCopy.selected.push(perk);
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

	const getEditableSkillChoice = (data: FeatureSkillChoiceData) => {
		const skills = SourcebookLogic.getSkills(sourcebooks)
			.filter(skill => (data.options.includes(skill.name)) || (data.listOptions.includes(skill.list)));
		const sortedSkills = Collections.sort(skills, s => s.name);

		if (sortedSkills.length === 0) {
			return (
				<Alert
					type='info'
					showIcon={true}
					message='There are no options to choose for this feature.'
				/>
			);
		}

		return (
			<div>
				<div className='ds-text'>{data.count === 1 ? 'Select a skill:' : `Select ${data.count} skills:`}</div>
				<Select
					style={{ width: '100%' }}
					className={data.selected.length === 0 ? 'selection-empty' : ''}
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
									<Alert
										key={n}
										type='warning'
										showIcon={true}
										message={`You have already chosen ${s}.`}
									/>
								);
							}
						}
						return null;
					})
				}
			</div>
		);
	};

	const getEditableTitle = (data: FeatureTitleData) => {
		if (!props.hero) {
			return null;
		}

		const titles = SourcebookLogic.getTitles(sourcebooks);
		const sortedTitles = Collections.sort(titles, t => t.name);

		if (sortedTitles.length === 0) {
			return (
				<Alert
					type='info'
					showIcon={true}
					message='There are no options to choose for this feature.'
				/>
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					className={data.selected.length === 0 ? 'selection-empty' : ''}
					mode={data.count === 1 ? undefined : 'multiple'}
					maxCount={data.count === 1 ? undefined : data.count}
					allowClear={true}
					placeholder={data.count === 1 ? 'Select a title' : 'Select titles'}
					options={sortedTitles.map(a => ({ label: a.name, value: a.id, desc: a.description }))}
					optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
					value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0].id : null) : data.selected.map(k => k.id)}
					onChange={value => {
						let ids: string[] = [];
						if (data.count === 1) {
							ids = value !== undefined ? [ value as string ] : [];
						} else {
							ids = value as string[];
						}
						const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureTitleData;
						dataCopy.selected = [];
						ids.forEach(id => {
							const title = titles.find(t => t.id === id);
							if (title) {
								dataCopy.selected.push(title);
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
			case FeatureType.LanguageChoice:
				return getEditableLanguageChoice(props.feature.data as FeatureLanguageChoiceData);
			case FeatureType.Perk:
				return getEditablePerk(props.feature.data as FeaturePerkData);
			case FeatureType.SkillChoice:
				return getEditableSkillChoice(props.feature.data as FeatureSkillChoiceData);
			case FeatureType.Title:
				return getEditableTitle(props.feature.data as FeatureTitleData);
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
		let desc = '';
		if (data.value) {
			desc += `${data.value >= 0 ? '+' : ''}${data.value}`;
		}
		if (data.valuePerLevel) {
			if (desc !== '') {
				desc += ', ';
			}
			desc += `${data.valuePerLevel >= 0 ? '+' : ''}${data.valuePerLevel} per level after 1st`;
		}
		if (data.valuePerEchelon) {
			if (desc !== '') {
				desc += ', ';
			}
			desc += `${data.valuePerEchelon >= 0 ? '+' : ''}${data.valuePerEchelon} per echelon`;
		}

		return (
			<Field label={data.field} value={desc} />
		);
	};

	const getExtraChoice = (data: FeatureChoiceData) => {
		if (data.selected.length > 0) {
			return (
				<Space direction='vertical' style={{ width: '100%', padding: '0 20px', borderLeft: '5px solid rgb(200 200 200)' }}>
					{data.selected.map(f => <FeaturePanel key={f.id} feature={f} mode={PanelMode.Full} />)}
				</Space>
			);
		}

		if (data.options.length === 0) {
			return null;
		}

		const showCosts = data.options.some(o => o.value > 1);
		return (
			<div>
				<div className='ds-text'>
					{
						showCosts ?
							`You have ${data.count} points to spend on the following options:`
							:
							`Choose ${data.count} of the following options:`
					}
				</div>
				<Space direction='vertical' style={{ width: '100%', padding: '0 20px', borderLeft: '5px solid rgb(200 200 200)' }}>
					{data.options.map(o => <FeaturePanel key={o.feature.id} feature={o.feature} cost={showCosts ? o.value : undefined} mode={PanelMode.Full} />)}
				</Space>
			</div>
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
		if (!props.feature.description) {
			return (
				<Field label='Language' value={data.language} />
			);
		}

		return null;
	};

	const getExtraLanguageChoice = (data: FeatureLanguageChoiceData) => {
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

	const getExtraPerk = (data: FeaturePerkData) => {
		if (data.selected.length > 0) {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						data.selected.map(p => <PerkPanel key={p.id} perk={p} mode={PanelMode.Full} />)
					}
				</Space>
			);
		}

		if (!props.feature.description) {
			return (
				<div className='ds-text'>Choose {data.count > 1 ? data.count : 'a'} {data.count > 1 ? 'perks' : 'perk'}.</div>
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

	const getExtraSpeed = (data: FeatureSpeedData) => {
		if (!props.feature.description) {
			return (
				<Field label='Speed' value={data.speed} />
			);
		}

		return null;
	};

	const getExtraTitle = (data: FeatureTitleData) => {
		if (data.selected.length > 0) {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						data.selected.map(t => <TitlePanel key={t.id} title={t} mode={PanelMode.Full} />)
					}
				</Space>
			);
		}

		if (!props.feature.description) {
			return (
				<div className='ds-text'>Choose {data.count > 1 ? data.count : 'a'} {data.count > 1 ? 'titles' : 'title'}.</div>
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
			case FeatureType.LanguageChoice:
				return getExtraLanguageChoice(props.feature.data as FeatureLanguageChoiceData);
			case FeatureType.Perk:
				return getExtraPerk(props.feature.data as FeaturePerkData);
			case FeatureType.Size:
				return getExtraSize(props.feature.data as FeatureSizeData);
			case FeatureType.Skill:
				return getExtraSkill(props.feature.data as FeatureSkillData);
			case FeatureType.SkillChoice:
				return getExtraSkillChoice(props.feature.data as FeatureSkillChoiceData);
			case FeatureType.Speed:
				return getExtraSpeed(props.feature.data as FeatureSpeedData);
			case FeatureType.Title:
				return getExtraTitle(props.feature.data as FeatureTitleData);
		}

		return null;
	};

	// #endregion

	try {
		let cost = 0;
		if (props.cost) {
			cost = props.cost;
		}
		if (props.feature.type === FeatureType.Malice) {
			const data = props.feature.data as FeatureMaliceData;
			cost = data.cost;
		}

		const tags = [];
		const list = (props.feature as Perk).list;
		if (list !== undefined) {
			tags.push(list);
		}

		if (props.feature.type === FeatureType.Ability) {
			const data = props.feature.data as FeatureAbilityData;
			return (
				<AbilityPanel ability={data.ability} hero={props.hero} cost={cost > 0 ? cost : undefined} mode={props.mode} tags={tags} />
			);
		}

		if (props.feature.type === FeatureType.Multiple) {
			const data = props.feature.data as FeatureMultipleData;
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{tags.length > 0 ? <HeaderText tags={tags}>{props.feature.name || 'Unnamed Perk'}</HeaderText> : null}
					{data.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} mode={PanelMode.Full} />)}
				</Space>
			);
		}

		return (
			<div className='feature-panel' id={props.mode === PanelMode.Full ? props.feature.id : undefined}>
				<HeaderText ribbon={cost ? <HeroicResourceBadge value={cost} /> : null} tags={tags}>
					{props.feature.name || 'Unnamed Feature'}
				</HeaderText>
				{props.feature.description ? <div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.feature.description) }} /> : null}
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
