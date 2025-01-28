import { Alert, Select, Space } from 'antd';
import { Feature, FeatureAbilityCostData, FeatureAncestryChoiceData, FeatureAncestryFeatureChoiceData, FeatureBonusData, FeatureChoiceData, FeatureClassAbilityData, FeatureDamageModifierData, FeatureData, FeatureDomainData, FeatureDomainFeatureData, FeatureItemChoiceData, FeatureKitData, FeatureKitTypeData, FeatureLanguageChoiceData, FeatureLanguageData, FeatureMaliceData, FeatureMultipleData, FeaturePerkData, FeatureSizeData, FeatureSkillChoiceData, FeatureSkillData, FeatureSpeedData, FeatureTitleChoiceData } from '../../../../models/feature';
import { Ability } from '../../../../models/ability';
import { AbilityPanel } from '../ability-panel/ability-panel';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryPanel } from '../ancestry-panel/ancestry-panel';
import { Badge } from '../../../controls/badge/badge';
import { Collections } from '../../../../utils/collections';
import { DomainPanel } from '../domain-panel/domain-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { FormatLogic } from '../../../../logic/format-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroLogic } from '../../../../logic/hero-logic';
import { HeroicResourceBadge } from '../../../controls/heroic-resource-badge/heroic-resource-badge';
import { ItemPanel } from '../item-panel/item-panel';
import { KitPanel } from '../kit-panel/kit-panel';
import { Markdown } from '../../../controls/markdown/markdown';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { PanelMode } from '../../../../enums/panel-mode';
import { Perk } from '../../../../models/perk';
import { PerkPanel } from '../perk-panel/perk-panel';
import { PowerRollPanel } from '../../power-roll/power-roll-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { TitlePanel } from '../title-panel/title-panel';

import './feature-panel.scss';

interface Props {
	feature: Feature | Perk;
	cost?: number | 'signature';
	repeatable?: boolean;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
	setData?: (featureID: string, data: FeatureData) => void;
}

export const FeaturePanel = (props: Props) => {
	// #region Editable

	const getEditableAncestryChoice = (data: FeatureAncestryChoiceData) => {
		const ancestries = SourcebookLogic.getAncestries(props.sourcebooks || []);
		const sortedAncestries = Collections.sort(ancestries, a => a.name);

		if (sortedAncestries.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='There are no options to choose for this feature.'
				/>
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					className={!data.selected ? 'selection-empty' : ''}
					allowClear={true}
					placeholder='Select an ancestry'
					options={sortedAncestries.map(a => ({ label: a.name, value: a.id, desc: a.description }))}
					optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
					value={data.selected ? data.selected.id : null}
					onChange={value => {
						const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureAncestryChoiceData;
						dataCopy.selected = SourcebookLogic.getAncestries(props.sourcebooks || []).find(a => a.id === value) || null;
						if (props.setData) {
							props.setData(props.feature.id, dataCopy);
						}
					}}
				/>
				{
					data.selected ?
						<AncestryPanel ancestry={data.selected} />
						: null
				}
			</Space>
		);
	};

	const getEditableAncestryFeatureChoice = (data: FeatureAncestryFeatureChoiceData) => {
		if (!props.hero) {
			return null;
		}

		const currentFeatureIDs = HeroLogic.getFeatures(props.hero)
			.filter(f => f.id !== props.feature.id)
			.map(f => f.id);

		const ancestries: Ancestry[] = [];
		if (data.source.current && props.hero.ancestry) {
			ancestries.push(props.hero.ancestry);
		}
		if (data.source.former) {
			ancestries.push(...HeroLogic.getFormerAncestries(props.hero));
		}

		const features = ancestries
			.flatMap(a => a.features)
			.filter(f => f.type === FeatureType.Choice)
			.flatMap(f => f.data.options)
			.filter(opt => data.value === opt.value)
			.filter(opt => opt.feature.type !== FeatureType.AncestryFeatureChoice)
			.map(opt => opt.feature);
		const sortedFeatures = Collections.sort(features, f => f.name);

		if (sortedFeatures.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='There are no options to choose for this feature.'
				/>
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					className={!data.selected ? 'selection-empty' : ''}
					allowClear={true}
					placeholder='Select an ability from an ancestry'
					options={sortedFeatures.map(a => ({ label: a.name, value: a.id, desc: a.description, disabled: currentFeatureIDs.includes(a.id) }))}
					optionRender={option => <Field disabled={option.data.disabled} label={option.data.label} value={option.data.desc} />}
					value={data.selected ? data.selected.id : null}
					onChange={value => {
						const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureAncestryFeatureChoiceData;
						dataCopy.selected = features.find(f => f.id === value) || null;
						if (props.setData) {
							props.setData(props.feature.id, dataCopy);
						}
					}}
				/>
				{
					data.selected ?
						<FeaturePanel feature={data.selected} />
						: null
				}
			</Space>
		);
	};

	const getEditableChoice = (data: FeatureChoiceData) => {
		let availableOptions = [ ...data.options ];
		if (availableOptions.some(opt => opt.feature.type === FeatureType.AncestryFeatureChoice)) {
			availableOptions = availableOptions.filter(opt => opt.feature.type !== FeatureType.AncestryFeatureChoice);
			const additionalOptions = HeroLogic.getFormerAncestries(props.hero!)
				.flatMap(a => a.features)
				.filter(f => f.type === FeatureType.Choice)
				.flatMap(f => f.data.options)
				.filter(opt => opt.feature.type !== FeatureType.AncestryFeatureChoice);
			availableOptions.push(...additionalOptions);
		}
		const sortedOptions = Collections.sort(availableOptions, opt => opt.feature.name);

		if (sortedOptions.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='There are no options to choose for this feature.'
				/>
			);
		}

		const selectedIDs = data.selected.map(f => f.id);
		const pointsUsed = Collections.sum(selectedIDs, id => {
			const original = availableOptions.find(o => o.feature.id === id);
			return original ? original.value : 0;
		});
		const pointsLeft = data.count - pointsUsed;
		const unavailableIDs = availableOptions.filter(opt => opt.value > pointsLeft).map(opt => opt.feature.id);

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
					//maxCount={data.count === 1 ? undefined : data.count}
					allowClear={true}
					placeholder={data.count === 1 ? 'Select an option' : 'Select options'}
					options={sortedOptions.map(o => ({ label: o.feature.name, value: o.feature.id, desc: o.feature.description, disabled: unavailableIDs.includes(o.feature.id), cost: o.value }))}
					optionRender={option => (
						<Field
							disabled={option.data.disabled}
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
							const option = availableOptions.find(o => o.feature.id === id);
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
						<FeaturePanel key={f.id} feature={f} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
					))
				}
			</Space>
		);
	};

	const getEditableClassAbility = (data: FeatureClassAbilityData) => {
		if (!props.hero) {
			return null;
		}

		const currentAbilityIDs = HeroLogic.getFeatures(props.hero)
			.filter(f => f.id !== props.feature.id)
			.filter(f => f.type === FeatureType.ClassAbility)
			.flatMap(f => f.data.selectedIDs);

		const abilities = props.hero?.class?.abilities
			.filter(a => a.cost === data.cost)
			.filter(a => a.minLevel <= data.minLevel) || [];

		const distinctAbilities = Collections.distinct(abilities, a => a.name);
		const sortedAbilities = Collections.sort(distinctAbilities, a => a.name);

		if (sortedAbilities.length === 0) {
			return (
				<Alert
					type='warning'
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
					options={sortedAbilities.map(a => ({ label: a.name, value: a.id, desc: a.description, disabled: currentAbilityIDs.includes(a.id) }))}
					optionRender={option => <Field disabled={option.data.disabled} label={option.data.label} value={option.data.desc} />}
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

		const domains = SourcebookLogic.getDomains(props.sourcebooks as Sourcebook[]);
		const sortedDomains = Collections.sort(domains, d => d.name);

		if (sortedDomains.length === 0) {
			return (
				<Alert
					type='warning'
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
						<FeaturePanel key={f.id} feature={f} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
					))
				}
			</Space>
		);
	};

	const getEditableItemChoice = (data: FeatureItemChoiceData) => {
		if (!props.hero) {
			return null;
		}

		const items = SourcebookLogic.getItems(props.sourcebooks as Sourcebook[])
			.filter(i => data.types.includes(i.type));

		const sortedItems = Collections.sort(items, i => i.name);

		if (sortedItems.length === 0) {
			return (
				<Alert
					type='warning'
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
					options={sortedItems.map(a => ({ label: a.name, value: a.id, desc: a.description }))}
					optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
					value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0].id : null) : data.selected.map(i => i.id)}
					onChange={value => {
						let ids: string[] = [];
						if (data.count === 1) {
							ids = value !== undefined ? [ value as string ] : [];
						} else {
							ids = value as string[];
						}
						const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureItemChoiceData;
						dataCopy.selected = [];
						ids.forEach(id => {
							const item = items.find(i => i.id === id);
							if (item) {
								dataCopy.selected.push(item);
							}
						});
						if (props.setData) {
							props.setData(props.feature.id, dataCopy);
						}
					}}
				/>
				{data.selected.map(i => (<ItemPanel key={i.id} item={i} mode={PanelMode.Full} />))}
			</Space>
		);
	};

	const getEditableKit = (data: FeatureKitData) => {
		if (!props.hero) {
			return null;
		}

		const kitTypes = data.types.length > 0 ? data.types : HeroLogic.getKitTypes(props.hero);
		const kits = SourcebookLogic.getKits(props.sourcebooks as Sourcebook[])
			.filter(k => kitTypes.includes(k.type));

		const sortedKits = Collections.sort(kits, k => k.name);

		if (sortedKits.length === 0) {
			return (
				<Alert
					type='warning'
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
		const currentLanguages: string[] = [];
		if (props.hero) {
			HeroLogic.getFeatures(props.hero)
				.filter(f => f.id !== props.feature.id)
				.forEach(f => {
					switch (f.type) {
						case FeatureType.Language:
							currentLanguages.push(f.data.language);
							break;
						case FeatureType.LanguageChoice:
							currentLanguages.push(...f.data.selected);
							break;
					}
				});
			if (props.hero.culture) {
				currentLanguages.push(...props.hero.culture.languages);
			}
		}

		const languages = SourcebookLogic.getLanguages(props.sourcebooks as Sourcebook[]);
		const sortedLanguages = Collections.sort(languages, l => l.name);

		if (sortedLanguages.length === 0) {
			return (
				<Alert
					type='warning'
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
					options={sortedLanguages.map(l => ({ label: l.name, value: l.name, desc: l.description, disabled: currentLanguages.includes(l.name) }))}
					optionRender={option => <Field disabled={option.data.disabled} label={option.data.label} value={option.data.desc} />}
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
					data.selected
						.filter(l => currentLanguages.includes(l))
						.map((l, n) => (
							<Alert
								key={n}
								type='warning'
								showIcon={true}
								message={`You have already chosen ${l}.`}
							/>
						))
				}
			</div>
		);
	};

	const getEditablePerk = (data: FeaturePerkData) => {
		if (!props.hero) {
			return null;
		}

		const currentPerkIDs = HeroLogic.getFeatures(props.hero)
			.filter(f => f.id !== props.feature.id)
			.filter(f => f.type === FeatureType.Perk)
			.flatMap(f => f.data.selected)
			.map(p => p.id);

		const perks = SourcebookLogic.getPerks(props.sourcebooks as Sourcebook[]).filter(p => data.lists.includes(p.list));
		const sortedPerks = Collections.sort(perks, p => p.name);

		if (sortedPerks.length === 0) {
			return (
				<Alert
					type='warning'
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
					options={sortedPerks.map(a => ({ label: a.name, value: a.id, desc: a.description, disabled: currentPerkIDs.includes(a.id) }))}
					optionRender={option => <Field disabled={option.data.disabled} label={option.data.label} value={option.data.desc} />}
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
				{
					data.selected.map(p => <PerkPanel key={p.id} perk={p} mode={PanelMode.Full} />)
				}
			</Space>
		);
	};

	const getEditableSkillChoice = (data: FeatureSkillChoiceData) => {
		const currentSkills: string[] = [];
		if (props.hero) {
			HeroLogic.getFeatures(props.hero)
				.filter(f => f.id !== props.feature.id)
				.forEach(f => {
					switch (f.type) {
						case FeatureType.Skill:
							currentSkills.push(f.data.skill);
							break;
						case FeatureType.SkillChoice:
							currentSkills.push(...f.data.selected);
							break;
					}
				});
		}

		const skills = SourcebookLogic.getSkills(props.sourcebooks as Sourcebook[])
			.filter(skill => (data.options.includes(skill.name)) || (data.listOptions.includes(skill.list)));
		const sortedSkills = Collections.sort(skills, s => s.name);

		if (sortedSkills.length === 0) {
			return (
				<Alert
					type='warning'
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
					options={sortedSkills.map(s => ({ label: s.name, value: s.name, desc: s.description, disabled: currentSkills.includes(s.name) }))}
					optionRender={option => <Field disabled={option.data.disabled} label={option.data.label} value={option.data.desc} />}
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
					data.selected
						.filter(s => currentSkills.includes(s))
						.map((s, n) => (
							<Alert
								key={n}
								type='warning'
								showIcon={true}
								message={`You have already chosen ${s}.`}
							/>
						))
				}
			</div>
		);
	};

	const getEditableTitleChoice = (data: FeatureTitleChoiceData) => {
		if (!props.hero) {
			return null;
		}

		const currentTitleIDs = HeroLogic.getFeatures(props.hero)
			.filter(f => f.id !== props.feature.id)
			.filter(f => f.type === FeatureType.TitleChoice)
			.flatMap(f => f.data.selected)
			.map(p => p.id);

		const titles = SourcebookLogic.getTitles(props.sourcebooks as Sourcebook[]).filter(t => t.echelon === data.echelon);
		const sortedTitles = Collections.sort(titles, t => t.name);

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<NumberSpin
					label='Echelon'
					min={1}
					max={4}
					value={data.echelon}
					onChange={value => {
						const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureTitleChoiceData;
						dataCopy.echelon = value;
						dataCopy.selected = [];
						if (props.setData) {
							props.setData(props.feature.id, dataCopy);
						}
					}}
				/>
				{
					sortedTitles.length > 0 ?
						<Select
							style={{ width: '100%' }}
							className={data.selected.length === 0 ? 'selection-empty' : ''}
							mode={data.count === 1 ? undefined : 'multiple'}
							maxCount={data.count === 1 ? undefined : data.count}
							allowClear={true}
							placeholder={data.count === 1 ? 'Select a title' : 'Select titles'}
							options={sortedTitles.map(a => ({ label: a.name, value: a.id, desc: a.description, disabled: currentTitleIDs.includes(a.id) }))}
							optionRender={option => <Field disabled={option.data.disabled} label={option.data.label} value={option.data.desc} />}
							value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0].id : null) : data.selected.map(k => k.id)}
							onChange={value => {
								let ids: string[] = [];
								if (data.count === 1) {
									ids = value !== undefined ? [ value as string ] : [];
								} else {
									ids = value as string[];
								}
								const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureTitleChoiceData;
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
						:
						<Alert
							type='warning'
							showIcon={true}
							message='There are no options to choose for this feature.'
						/>
				}
				{
					data.selected.map((title, n) => (
						<Select
							key={title.id}
							style={{ width: '100%' }}
							className={title.selectedFeatureID === '' ? 'selection-empty' : ''}
							allowClear={true}
							placeholder='Select a title feature'
							options={title.features.map(f => ({ label: f.name, value: f.id, desc: f.description }))}
							optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
							value={title.selectedFeatureID || null}
							onChange={value => {
								const dataCopy = JSON.parse(JSON.stringify(data)) as FeatureTitleChoiceData;
								dataCopy.selected[n].selectedFeatureID = value;
								if (props.setData) {
									props.setData(props.feature.id, dataCopy);
								}
							}}
						/>
					))
				}
				{
					data.selected.map(title => {
						const f = title.features.find(ft => ft.id === title.selectedFeatureID);
						if (f) {
							return (
								<FeaturePanel key={f.id} feature={f} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
							);
						}

						return null;
					})
				}
			</Space>
		);
	};

	const getEditable = () => {
		switch (props.feature.type) {
			case FeatureType.AncestryChoice:
				return getEditableAncestryChoice(props.feature.data);
			case FeatureType.AncestryFeatureChoice:
				return getEditableAncestryFeatureChoice(props.feature.data);
			case FeatureType.Choice:
				return getEditableChoice(props.feature.data);
			case FeatureType.ClassAbility:
				return getEditableClassAbility(props.feature.data);
			case FeatureType.Domain:
				return getEditableDomain(props.feature.data);
			case FeatureType.DomainFeature:
				return getEditableDomainFeature(props.feature.data);
			case FeatureType.ItemChoice:
				return getEditableItemChoice(props.feature.data);
			case FeatureType.Kit:
				return getEditableKit(props.feature.data);
			case FeatureType.LanguageChoice:
				return getEditableLanguageChoice(props.feature.data);
			case FeatureType.Perk:
				return getEditablePerk(props.feature.data);
			case FeatureType.SkillChoice:
				return getEditableSkillChoice(props.feature.data);
			case FeatureType.TitleChoice:
				return getEditableTitleChoice(props.feature.data);
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

	const getExtraAncestryChoice = (data: FeatureAncestryChoiceData) => {
		if (!data.selected) {
			return null;
		}

		return (
			<AncestryPanel ancestry={data.selected} />
		);
	};

	const getExtraAncestryFeatureChoice = (data: FeatureAncestryFeatureChoiceData) => {
		if (!data.selected) {
			return (
				<div className='ds-text'>A {data.value}pt ancestry feature.</div>
			);
		}

		return null;
	};

	const getExtraBonus = (data: FeatureBonusData) => {
		return (
			<Field label={data.field} value={FormatLogic.getModifier(data)} />
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
				<div className='ds-text'>Choose {data.count > 1 ? data.count : 'a'} {(data.cost === 'signature') || (data.cost === 0) ? 'signature' : `${data.cost}pt`} {data.count > 1 ? 'abilities' : 'ability'}.</div>
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

	const getExtraItemChoice = (data: FeatureItemChoiceData) => {
		if (data.selected.length > 0) {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						data.selected.map(i => <ItemPanel key={i.id} item={i} mode={PanelMode.Full} />)
					}
				</Space>
			);
		}

		if (!props.feature.description) {
			return (
				<div className='ds-text'>Choose {data.count > 1 ? data.count : 'an'} {data.types.join(', ')} {data.count > 1 ? 'items' : 'item'}.</div>
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

	const getExtraMalice = (data: FeatureMaliceData) => {
		return (data.sections ?? []).map((section, n) => (typeof section === 'string') ?
			<Markdown key={n} text={section} />
			:
			<PowerRollPanel key={n} powerRoll={section} test={true} />
		);
	};

	const getExtraMultiple = (data: FeatureMultipleData) => {
		if (data.features.length === 0) {
			return null;
		}

		return (
			<div>
				<Space direction='vertical' style={{ width: '100%', padding: '0 20px', borderLeft: '5px solid rgb(200 200 200)' }}>
					{data.features.map(f => <FeaturePanel key={f.id} feature={f} mode={PanelMode.Full} />)}
				</Space>
			</div>
		);
	};

	const getExtraPackage = () => {
		if (!props.hero) {
			return null;
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					HeroLogic.getDomains(props.hero).map(domain => (
						<div key={domain.id}>
							<div className='ds-text bold-text'>{domain.name}</div>
							<Markdown text={domain.piety} />
						</div>
					))
				}
			</Space>
		);
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

	const getExtraTitleChoice = (data: FeatureTitleChoiceData) => {
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
				return getExtraAbilityCost(props.feature.data);
			case FeatureType.AncestryChoice:
				return getExtraAncestryChoice(props.feature.data);
			case FeatureType.AncestryFeatureChoice:
				return getExtraAncestryFeatureChoice(props.feature.data);
			case FeatureType.Bonus:
				return getExtraBonus(props.feature.data);
			case FeatureType.Choice:
				return getExtraChoice(props.feature.data);
			case FeatureType.ClassAbility:
				return getExtraClassAbility(props.feature.data);
			case FeatureType.DamageModifier:
				return getExtraDamageModifier(props.feature.data);
			case FeatureType.Domain:
				return getExtraDomain(props.feature.data);
			case FeatureType.DomainFeature:
				return getExtraDomainFeature(props.feature.data);
			case FeatureType.ItemChoice:
				return getExtraItemChoice(props.feature.data);
			case FeatureType.Kit:
				return getExtraKit(props.feature.data);
			case FeatureType.KitType:
				return getExtraKitType(props.feature.data);
			case FeatureType.Language:
				return getExtraLanguage(props.feature.data);
			case FeatureType.LanguageChoice:
				return getExtraLanguageChoice(props.feature.data);
			case FeatureType.Malice:
				return getExtraMalice(props.feature.data);
			case FeatureType.Multiple:
				return getExtraMultiple(props.feature.data);
			case FeatureType.Package:
				return getExtraPackage();
			case FeatureType.Perk:
				return getExtraPerk(props.feature.data);
			case FeatureType.Size:
				return getExtraSize(props.feature.data);
			case FeatureType.Skill:
				return getExtraSkill(props.feature.data);
			case FeatureType.SkillChoice:
				return getExtraSkillChoice(props.feature.data);
			case FeatureType.Speed:
				return getExtraSpeed(props.feature.data);
			case FeatureType.TitleChoice:
				return getExtraTitleChoice(props.feature.data);
		}

		return null;
	};

	// #endregion

	try {
		const tags = [];
		const list = (props.feature as Perk).list;
		if (list !== undefined) {
			tags.push(list);
		}

		if (props.feature.type === FeatureType.Ability) {
			return (
				<AbilityPanel ability={props.feature.data.ability} hero={props.hero} cost={props.cost} mode={props.mode} tags={tags} />
			);
		}

		if (props.feature.type === FeatureType.AncestryFeatureChoice) {
			if (props.feature.data.selected) {
				return (
					<FeaturePanel feature={props.feature.data.selected} />
				);
			}
		}

		return (
			<div className={props.mode === PanelMode.Full ? 'feature-panel' : 'feature-panel compact'} id={props.mode === PanelMode.Full ? props.feature.id : undefined}>
				<HeaderText ribbon={props.cost === 'signature' ? <Badge>Signature</Badge> : props.cost ? <HeroicResourceBadge value={props.cost} repeatable={props.repeatable} /> : null} tags={tags}>
					{props.feature.name}
				</HeaderText>
				<Markdown text={props.feature.description} />
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
