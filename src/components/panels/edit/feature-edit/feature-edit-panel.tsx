import { Button, Flex, Input, Segmented, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
import { Feature, FeatureAbilityCostData, FeatureAbilityDamageData, FeatureAbilityData, FeatureAbilityDistanceData, FeatureAddOnData, FeatureAddOnType, FeatureAncestryChoiceData, FeatureAncestryFeatureChoiceData, FeatureBonusData, FeatureCharacteristicBonusData, FeatureChoiceData, FeatureClassAbilityData, FeatureCompanionData, FeatureConditionImmunityData, FeatureDamageModifierData, FeatureData, FeatureDomainData, FeatureDomainFeatureData, FeatureItemChoiceData, FeatureKitData, FeatureLanguageChoiceData, FeatureLanguageData, FeatureMaliceData, FeatureMultipleData, FeaturePackageData, FeaturePerkData, FeatureSizeData, FeatureSkillChoiceData, FeatureSkillData, FeatureSpeedData, FeatureTaggedFeatureChoiceData, FeatureTaggedFeatureData, FeatureTitleChoiceData } from '../../../../models/feature';
import { Ability } from '../../../../models/ability';
import { AbilityEditPanel } from '../ability-edit/ability-edit-panel';
import { AbilityKeyword } from '../../../../enums/ability-keyword';
import { AbilityLogic } from '../../../../logic/ability-logic';
import { Characteristic } from '../../../../enums/characteristic';
import { Collections } from '../../../../utils/collections';
import { ConditionType } from '../../../../enums/condition-type';
import { DamageModifierType } from '../../../../enums/damage-modifier-type';
import { DamageType } from '../../../../enums/damage-type';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { FeatureField } from '../../../../enums/feature-field';
import { FeatureLogic } from '../../../../logic/feature-logic';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { Format } from '../../../../utils/format';
import { FormatLogic } from '../../../../logic/format-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { ItemType } from '../../../../enums/item-type';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Perk } from '../../../../models/perk';
import { PerkList } from '../../../../enums/perk-list';
import { PowerRoll } from '../../../../models/power-roll';
import { SkillList } from '../../../../enums/skill-list';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Toggle } from '../../../controls/toggle/toggle';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './feature-edit-panel.scss';

interface Props {
	feature: Feature | Perk;
	allowedTypes?: FeatureType[];
	sourcebooks: Sourcebook[];
	onChange: (feature: Feature) => void;
}

export const FeatureEditPanel = (props: Props) => {
	const [ feature, setFeature ] = useState<Feature | Perk>(props.feature);

	const setName = (value: string) => {
		const copy = Utils.copy(feature);
		copy.name = value;
		setFeature(copy);
		props.onChange(copy);
	};

	const setDescription = (value: string) => {
		const copy = Utils.copy(feature);
		copy.description = value;
		setFeature(copy);
		props.onChange(copy);
	};

	const setType = (value: FeatureType) => {
		let data: FeatureData | null = null;

		switch (value) {
			case FeatureType.Ability:
				data = {
					ability: FactoryLogic.createAbility({
						id: Utils.guid(),
						name: '',
						description: '',
						type: FactoryLogic.type.createAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: ''
					})
				} as FeatureAbilityData;
				break;
			case FeatureType.AbilityCost:
				data = {
					keywords: [],
					modifier: -1
				} as FeatureAbilityCostData;
				break;
			case FeatureType.AbilityDamage:
				data = {
					keywords: [],
					value: 0,
					valueCharacteristics: [],
					valueCharacteristicMultiplier: 1,
					valuePerLevel: 0,
					valuePerEchelon: 0,
					damageType: DamageType.Damage
				};
				break;
			case FeatureType.AbilityDistance:
				data = {
					keywords: [],
					value: 0,
					valueCharacteristics: [],
					valueCharacteristicMultiplier: 1,
					valuePerLevel: 0,
					valuePerEchelon: 0
				};
				break;
			case FeatureType.AddOn:
				data = {
					category: FeatureAddOnType.Defensive,
					cost: 1
				} as FeatureAddOnData;
				break;
			case FeatureType.AncestryChoice:
				data = {
					selected: null
				} as FeatureAncestryChoiceData;
				break;
			case FeatureType.AncestryFeatureChoice:
				data = {
					source: {
						current: true,
						former: true,
						customID: ''
					},
					value: 1,
					selected: null
				} as FeatureAncestryFeatureChoiceData;
				break;
			case FeatureType.Bonus:
				data = {
					field: FeatureField.Recoveries,
					value: 0,
					valueCharacteristics: [],
					valueCharacteristicMultiplier: 1,
					valuePerLevel: 0,
					valuePerEchelon: 0
				} as FeatureBonusData;
				break;
			case FeatureType.CharacteristicBonus:
				data = {
					characteristic: Characteristic.Might,
					value: 1
				} as FeatureCharacteristicBonusData;
				break;
			case FeatureType.Choice:
				data = {
					options: [],
					count: 1,
					selected: []
				} as FeatureChoiceData;
				break;
			case FeatureType.ClassAbility:
				data = {
					classID: undefined,
					cost: 1,
					count: 1,
					minLevel: 1,
					selectedIDs: []
				} as FeatureClassAbilityData;
				break;
			case FeatureType.ConditionImmunity:
				data = {
					conditions: []
				} as FeatureConditionImmunityData;
				break;
			case FeatureType.DamageModifier:
				data = {
					modifiers: []
				} as FeatureDamageModifierData;
				break;
			case FeatureType.Domain:
				data = {
					count: 1,
					selected: []
				} as FeatureDomainData;
				break;
			case FeatureType.DomainFeature:
				data = {
					level: 1,
					count: 1,
					selected: []
				} as FeatureDomainFeatureData;
				break;
			case FeatureType.ItemChoice:
				data = {
					types: [],
					count: 1,
					selected: []
				} as FeatureItemChoiceData;
				break;
			case FeatureType.Kit:
				data = {
					types: [],
					count: 1,
					selected: []
				} as FeatureKitData;
				break;
			case FeatureType.Language:
				data = {
					language: ''
				} as FeatureLanguageData;
				break;
			case FeatureType.LanguageChoice:
				data = {
					options: [],
					count: 1,
					selected: []
				} as FeatureLanguageChoiceData;
				break;
			case FeatureType.Malice:
				data = {
					cost: 3
				} as FeatureMaliceData;
				break;
			case FeatureType.Multiple:
				data = {
					features: []
				} as FeatureMultipleData;
				break;
			case FeatureType.Package:
				data = {
					//
				} as FeaturePackageData;
				break;
			case FeatureType.Perk:
				data = {
					lists: [],
					count: 1,
					selected: []
				} as FeaturePerkData;
				break;
			case FeatureType.Size:
				data = {
					size: {
						value: 1,
						mod: 'M'
					}
				} as FeatureSizeData;
				break;
			case FeatureType.Skill:
				data = {
					skill: ''
				} as FeatureSkillData;
				break;
			case FeatureType.SkillChoice:
				data = {
					options: [],
					listOptions: [],
					count: 1,
					selected: []
				} as FeatureSkillChoiceData;
				break;
			case FeatureType.Speed:
				data = {
					speed: 5
				} as FeatureSpeedData;
				break;
			case FeatureType.TaggedFeature:
				data = {
					tag: '',
					feature: FactoryLogic.feature.create({
						id: Utils.guid(),
						name: '',
						description: ''
					})
				};
				break;
			case FeatureType.TaggedFeatureChoice:
				data = {
					tag: '',
					count: 1,
					selected: []
				};
				break;
			case FeatureType.TitleChoice:
				data = {
					echelon: 1,
					count: 1,
					selected: []
				} as FeatureTitleChoiceData;
				break;
		}

		const copy = Utils.copy(feature);
		copy.type = value;
		copy.data = data;
		setFeature(copy);
		props.onChange(copy);
	};

	const setList = (value: PerkList) => {
		const copy = Utils.copy(feature) as Perk;
		copy.list = value;
		setFeature(copy);
		props.onChange(copy);
	};

	const setData = (value: FeatureData) => {
		const copy = Utils.copy(feature);
		copy.data = value;
		setFeature(copy);
		props.onChange(copy);
	};

	const getDataSection = () => {
		const setCount = (value: number) => {
			const copy = Utils.copy(feature.data) as FeatureChoiceData | FeatureClassAbilityData | FeatureDomainData | FeatureDomainFeatureData | FeatureItemChoiceData | FeatureKitData | FeatureLanguageChoiceData | FeaturePerkData | FeatureSkillChoiceData | FeatureTaggedFeatureChoiceData | FeatureTitleChoiceData;
			copy.count = value;
			setData(copy);
		};

		const setLevel = (value: number) => {
			const copy = Utils.copy(feature.data) as FeatureDomainFeatureData;
			copy.level = value;
			setData(copy);
		};

		const setValue = (value: number) => {
			const copy = Utils.copy(feature.data) as FeatureAbilityDamageData | FeatureAbilityDistanceData | FeatureBonusData | FeatureCharacteristicBonusData | FeatureAncestryFeatureChoiceData;
			copy.value = value;
			setData(copy);
		};

		const setValuePerLevel = (value: number) => {
			const copy = Utils.copy(feature.data) as FeatureAbilityDamageData | FeatureAbilityDistanceData | FeatureBonusData;
			copy.valuePerLevel = value;
			setData(copy);
		};

		const setValuePerEchelon = (value: number) => {
			const copy = Utils.copy(feature.data) as FeatureAbilityDamageData | FeatureAbilityDistanceData | FeatureBonusData;
			copy.valuePerEchelon = value;
			setData(copy);
		};

		const setValueCharacteristics = (value: Characteristic[]) => {
			const copy = Utils.copy(feature.data) as FeatureAbilityDamageData | FeatureAbilityDistanceData | FeatureBonusData;
			copy.valueCharacteristics = value;
			setData(copy);
		};

		const setCharacteristic = (value: Characteristic) => {
			const copy = Utils.copy(feature.data) as FeatureCharacteristicBonusData;
			copy.characteristic = value;
			setData(copy);
		};

		const setAbilityClassID = (value: string) => {
			const copy = Utils.copy(feature.data) as FeatureClassAbilityData;
			copy.classID = value === '' ? undefined : value;
			setData(copy);
		};

		const setAbilityCost = (value: number | 'signature') => {
			const copy = Utils.copy(feature.data) as FeatureClassAbilityData;
			copy.cost = value;
			setData(copy);
		};

		const setMinLevel = (value: number) => {
			const copy = Utils.copy(feature.data) as FeatureClassAbilityData;
			copy.minLevel = value;
			setData(copy);
		};

		const setCost = (value: number) => {
			const copy = Utils.copy(feature.data) as FeatureAddOnData | FeatureMaliceData;
			copy.cost = value;
			setData(copy);
		};

		const setCompanionType = (value: 'companion' | 'mount' | 'retainer') => {
			const copy = Utils.copy(feature.data) as FeatureCompanionData;
			copy.type = value;
			setData(copy);
		};

		const setConditions = (value: ConditionType[]) => {
			const copy = Utils.copy(feature.data) as FeatureConditionImmunityData;
			copy.conditions = value;
			setData(copy);
		};

		const setAddOnType = (value: FeatureAddOnType) => {
			const copy = Utils.copy(feature.data) as FeatureAddOnData;
			copy.category = value;
			setData(copy);
		};

		const setSizeValue = (value: number) => {
			const copy = Utils.copy(feature.data) as FeatureSizeData;
			copy.size.value = value;
			setData(copy);
		};

		const setSizeMod = (value: '' | 'T' | 'S' | 'M' | 'L') => {
			const copy = Utils.copy(feature.data) as FeatureSizeData;
			copy.size.mod = value;
			setData(copy);
		};

		const setField = (value: FeatureField) => {
			const copy = Utils.copy(feature.data) as FeatureBonusData;
			copy.field = value;
			setData(copy);
		};

		const setItemTypes = (value: ItemType[]) => {
			const copy = Utils.copy(feature.data) as FeatureItemChoiceData;
			copy.types = value;
			setData(copy);
		};

		const setKitTypes = (value: string[]) => {
			const copy = Utils.copy(feature.data) as FeatureKitData;
			copy.types = value;
			setData(copy);
		};

		const setPerkLists = (value: PerkList[]) => {
			const copy = Utils.copy(feature.data) as FeaturePerkData;
			copy.lists = value;
			setData(copy);
		};

		const setLanguage = (value: string) => {
			const copy = Utils.copy(feature.data) as FeatureLanguageData;
			copy.language = value;
			setData(copy);
		};

		const setLanguageOptions = (value: string[]) => {
			const copy = Utils.copy(feature.data) as FeatureLanguageChoiceData;
			copy.options = value;
			setData(copy);
		};

		const setSkillOptions = (value: string[]) => {
			const copy = Utils.copy(feature.data) as FeatureSkillChoiceData;
			copy.options = value;
			setData(copy);
		};

		const setSkillListOptions = (value: SkillList[]) => {
			const copy = Utils.copy(feature.data) as FeatureSkillChoiceData;
			copy.listOptions = value;
			setData(copy);
		};

		const setSkill = (value: string) => {
			const copy = Utils.copy(feature.data) as FeatureSkillData;
			copy.skill = value;
			setData(copy);
		};

		const setAbility = (value: Ability) => {
			const copy = Utils.copy(feature.data) as FeatureAbilityData;
			copy.ability = value;
			setData(copy);
		};

		const setKeywords = (value: AbilityKeyword[]) => {
			const copy = Utils.copy(feature.data) as FeatureAbilityCostData | FeatureAbilityDamageData | FeatureAbilityDistanceData;
			copy.keywords = value;
			setData(copy);
		};

		const setModifier = (value: number) => {
			const copy = Utils.copy(feature.data) as FeatureAbilityCostData;
			copy.modifier = value;
			setData(copy);
		};

		const setSourceCurrent = (value: boolean) => {
			const copy = Utils.copy(feature.data) as FeatureAncestryFeatureChoiceData;
			copy.source.current = value;
			setData(copy);
		};

		const setSourceFormer = (value: boolean) => {
			const copy = Utils.copy(feature.data) as FeatureAncestryFeatureChoiceData;
			copy.source.former = value;
			setData(copy);
		};

		const setSpeed = (value: number) => {
			const copy = Utils.copy(feature.data) as FeatureSpeedData;
			copy.speed = value;
			setData(copy);
		};

		const setTag = (value: string) => {
			const copy = Utils.copy(feature.data) as FeatureTaggedFeatureData | FeatureTaggedFeatureChoiceData;
			copy.tag = value;
			setData(copy);
		};

		const setTaggedFeature = (value: Feature) => {
			const copy = Utils.copy(feature.data) as FeatureTaggedFeatureData;
			copy.feature = value;
			setData(copy);
		};

		const addChoice = (data: FeatureChoiceData) => {
			const copy = Utils.copy(data);
			copy.options.push({
				feature: FactoryLogic.feature.create({
					id: Utils.guid(),
					name: '',
					description: ''
				}),
				value: 1
			});
			setData(copy);
		};

		const moveChoice = (data: FeatureChoiceData, index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(data);
			copy.options = Collections.move(copy.options, index, direction);
			setData(copy);
		};

		const deleteChoice = (data: FeatureChoiceData, index: number) => {
			const copy = Utils.copy(data);
			copy.options.splice(index);
			setData(copy);
		};

		const setChoiceFeature = (data: FeatureChoiceData, index: number, value: Feature) => {
			const copy = Utils.copy(data);
			copy.options[index].feature = value;
			setData(copy);
		};

		const setChoiceValue = (data: FeatureChoiceData, index: number, value: number) => {
			const copy = Utils.copy(data);
			copy.options[index].value = value;
			setData(copy);
		};

		const addDamageModifier = (data: FeatureDamageModifierData) => {
			const copy = Utils.copy(data);
			copy.modifiers.push(FactoryLogic.damageModifier.create({ damageType: DamageType.Damage, modifierType: DamageModifierType.Immunity, value: 0 }));
			setData(copy);
		};

		const deleteDamageModifier = (data: FeatureDamageModifierData, index: number) => {
			const copy = Utils.copy(data);
			copy.modifiers.splice(index);
			setData(copy);
		};

		const setDamageModifierDamageType = (data: FeatureDamageModifierData, index: number, value: DamageType) => {
			const copy = Utils.copy(data);
			copy.modifiers[index].damageType = value;
			setData(copy);
		};

		const setDamageModifierType = (data: FeatureDamageModifierData, index: number, value: DamageModifierType) => {
			const copy = Utils.copy(data);
			copy.modifiers[index].type = value;
			setData(copy);
		};

		const setDamageModifierValue = (data: FeatureDamageModifierData, index: number, value: number) => {
			const copy = Utils.copy(data);
			copy.modifiers[index].value = value;
			setData(copy);
		};

		const setDamageModifierValueCharacteristics = (data: FeatureDamageModifierData, index: number, value: Characteristic[]) => {
			const copy = Utils.copy(data);
			copy.modifiers[index].valueCharacteristics = value;
			setData(copy);
		};

		const setDamageModifierValuePerLevel = (data: FeatureDamageModifierData, index: number, value: number) => {
			const copy = Utils.copy(data);
			copy.modifiers[index].valuePerLevel = value;
			setData(copy);
		};

		const setDamageModifierValuePerEchelon = (data: FeatureDamageModifierData, index: number, value: number) => {
			const copy = Utils.copy(data);
			copy.modifiers[index].valuePerEchelon = value;
			setData(copy);
		};

		const addMaliceSectionText = (data: FeatureMaliceData) => {
			const copy = Utils.copy(data);
			copy.sections.push('');
			setData(copy);
		};

		const addMaliceSectionPowerRoll = (data: FeatureMaliceData) => {
			const copy = Utils.copy(data);
			copy.sections.push(FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '',
				tier2: '',
				tier3: ''
			}));
			setData(copy);
		};

		const moveMaliceSection = (data: FeatureMaliceData, index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(data);
			copy.sections = Collections.move(copy.sections, index, direction);
			setData(copy);
		};

		const deleteMaliceSection = (data: FeatureMaliceData, index: number) => {
			const copy = Utils.copy(data);
			copy.sections.splice(index);
			setData(copy);
		};

		const setMaliceSectionText = (data: FeatureMaliceData, index: number, value: string) => {
			const copy = Utils.copy(data);
			copy.sections[index] = value;
			setData(copy);
		};

		const setMaliceSectionPowerRollCharacteristics = (data: FeatureMaliceData, index: number, value: Characteristic[]) => {
			const copy = Utils.copy(data);
			const pr = copy.sections[index] as PowerRoll;
			pr.characteristic = value;
			setData(copy);
		};

		const setMaliceSectionPowerRoll1 = (data: FeatureMaliceData, index: number, value: string) => {
			const copy = Utils.copy(data);
			const pr = copy.sections[index] as PowerRoll;
			pr.tier1 = value;
			setData(copy);
		};

		const setMaliceSectionPowerRoll2 = (data: FeatureMaliceData, index: number, value: string) => {
			const copy = Utils.copy(data);
			const pr = copy.sections[index] as PowerRoll;
			pr.tier2 = value;
			setData(copy);
		};

		const setMaliceSectionPowerRoll3 = (data: FeatureMaliceData, index: number, value: string) => {
			const copy = Utils.copy(data);
			const pr = copy.sections[index] as PowerRoll;
			pr.tier3 = value;
			setData(copy);
		};

		const addMultipleFeature = (data: FeatureMultipleData) => {
			const copy = Utils.copy(data);
			copy.features.push(FactoryLogic.feature.create({
				id: Utils.guid(),
				name: '',
				description: ''
			}));
			setData(copy);
		};

		const moveMultipleFeature = (data: FeatureMultipleData, index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(data);
			copy.features = Collections.move(copy.features, index, direction);
			setData(copy);
		};

		const deleteMultipleFeature = (data: FeatureMultipleData, index: number) => {
			const copy = Utils.copy(data);
			copy.features.splice(index);
			setData(copy);
		};

		const setMultipleFeature = (data: FeatureMultipleData, index: number, value: Feature) => {
			const copy = Utils.copy(data);
			copy.features[index] = value;
			setData(copy);
		};

		switch (feature.type) {
			case FeatureType.Ability: {
				const data = feature.data as FeatureAbilityData;
				return (
					<div style={{ margin: '10px 0' }}>
						<Expander title={data.ability.name || 'Unnamed Ability'}>
							<AbilityEditPanel
								ability={data.ability}
								onChange={setAbility}
							/>
						</Expander>
					</div>
				);
			}
			case FeatureType.AbilityCost: {
				const data = feature.data as FeatureAbilityCostData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Keywords</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Select keywords'
							mode='multiple'
							allowClear={true}
							options={AbilityLogic.getKeywords().map(o => ({ value: o }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.value
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.keywords}
							onChange={setKeywords}
						/>
						<HeaderText>Modifier</HeaderText>
						<NumberSpin value={data.modifier} onChange={setModifier} />
					</Space>
				);
			}
			case FeatureType.AbilityDamage: {
				const data = feature.data as FeatureAbilityDamageData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Keywords</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Select keywords'
							mode='multiple'
							allowClear={true}
							options={AbilityLogic.getKeywords().map(o => ({ value: o }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.value
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.keywords}
							onChange={setKeywords}
						/>
						<HeaderText>Value</HeaderText>
						<NumberSpin label='Value' min={0} value={data.value} onChange={setValue} />
						<NumberSpin label='Per Level After 1st' min={0} value={data.valuePerLevel} onChange={setValuePerLevel} />
						<NumberSpin label='Per Echelon' min={0} value={data.valuePerEchelon} onChange={setValuePerEchelon} />
						<Select
							style={{ width: '100%' }}
							placeholder='Characteristics'
							mode='multiple'
							options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(option => ({ value: option }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.value
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.valueCharacteristics}
							onChange={setValueCharacteristics}
						/>
					</Space>
				);
			}
			case FeatureType.AbilityDistance: {
				const data = feature.data as FeatureAbilityDistanceData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Keywords</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Select keywords'
							mode='multiple'
							allowClear={true}
							options={AbilityLogic.getKeywords().map(o => ({ value: o }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.value
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.keywords}
							onChange={setKeywords}
						/>
						<HeaderText>Value</HeaderText>
						<NumberSpin label='Value' min={0} value={data.value} onChange={setValue} />
						<NumberSpin label='Per Level After 1st' min={0} value={data.valuePerLevel} onChange={setValuePerLevel} />
						<NumberSpin label='Per Echelon' min={0} value={data.valuePerEchelon} onChange={setValuePerEchelon} />
						<Select
							style={{ width: '100%' }}
							placeholder='Characteristics'
							mode='multiple'
							options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(option => ({ value: option }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.value
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.valueCharacteristics}
							onChange={setValueCharacteristics}
						/>
					</Space>
				);
			}
			case FeatureType.AddOn: {
				const data = feature.data as FeatureAddOnData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Category</HeaderText>
						<Segmented
							name='categorytypes'
							block={true}
							options={[ FeatureAddOnType.Mobility, FeatureAddOnType.Defensive, FeatureAddOnType.Offensive, FeatureAddOnType.Supernatural ].map(o => ({ value: o, label: o }))}
							value={data.category}
							onChange={setAddOnType}
						/>

						<HeaderText>Cost</HeaderText>
						<NumberSpin min={1} value={data.cost} onChange={setCost} />
					</Space>
				);
			}
			case FeatureType.AncestryChoice: {
				return null;
			}
			case FeatureType.AncestryFeatureChoice: {
				const data = feature.data as FeatureAncestryFeatureChoiceData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Source</HeaderText>
						<Toggle label='Current ancestry' value={data.source.current} onChange={setSourceCurrent} />
						<Toggle label='Former ancestry' value={data.source.former} onChange={setSourceFormer} />
						<HeaderText>Value</HeaderText>
						<NumberSpin value={data.value} onChange={setValue} />
					</Space>
				);
			}
			case FeatureType.Bonus: {
				const data = feature.data as FeatureBonusData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Field</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Select field'
							options={[ FeatureField.Disengage, FeatureField.ProjectPoints, FeatureField.Recoveries, FeatureField.RecoveryValue, FeatureField.Renown, FeatureField.Speed, FeatureField.Stability, FeatureField.Stamina, FeatureField.Wealth ].map(o => ({ value: o }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.value
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.field}
							onChange={setField}
						/>
						<HeaderText>Value</HeaderText>
						<NumberSpin label='Value' min={0} value={data.value} onChange={setValue} />
						<NumberSpin label='Per Level After 1st' min={0} value={data.valuePerLevel} onChange={setValuePerLevel} />
						<NumberSpin label='Per Echelon' min={0} value={data.valuePerEchelon} onChange={setValuePerEchelon} />
						<Select
							style={{ width: '100%' }}
							placeholder='Characteristics'
							mode='multiple'
							options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(option => ({ value: option }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.value
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.valueCharacteristics}
							onChange={setValueCharacteristics}
						/>
					</Space>
				);
			}
			case FeatureType.CharacteristicBonus: {
				const data = feature.data as FeatureCharacteristicBonusData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Characteristic</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Select field'
							options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(o => ({ value: o }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.value
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.characteristic}
							onChange={setCharacteristic}
						/>
						<HeaderText>Value</HeaderText>
						<NumberSpin label='Value' min={0} value={data.value} onChange={setValue} />
					</Space>
				);
			}
			case FeatureType.Choice: {
				const data = feature.data as FeatureChoiceData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Options</HeaderText>
						{
							data.options.map((option, n) => (
								<Expander
									key={option.feature.id}
									title={option.feature.name || 'Unnamed Feature'}
									extra={[
										<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveChoice(data, n, 'up'); }} />,
										<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveChoice(data, n, 'down');}} />,
										<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteChoice(data, n); }} />
									]}
								>
									<Space direction='vertical' style={{ width: '100%' }}>
										<FeatureEditPanel
											feature={option.feature}
											sourcebooks={props.sourcebooks}
											onChange={f => setChoiceFeature(data, n, f)}
										/>
										<NumberSpin min={1} value={option.value} onChange={value => setChoiceValue(data, n, value)} />
									</Space>
								</Expander>
							))
						}
						{
							data.options.length === 0 ?
								<Empty />
								: null
						}
						<Button block={true} onClick={() => addChoice(data)}>
							<PlusOutlined />
							Add an option
						</Button>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.ClassAbility: {
				const data = feature.data as FeatureClassAbilityData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Class</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Select class'
							options={[ { id: '', name: 'Your Class', description: 'An ability from your own class.' }, ...SourcebookLogic.getClasses(props.sourcebooks) ].map(o => ({ value: o.id, label: o.name, description: o.description }))}
							optionRender={option => <Field label={option.data.label} value={option.data.description} />}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.label
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.classID || ''}
							onChange={setAbilityClassID}
						/>
						<HeaderText>Signature</HeaderText>
						<Toggle label='Signature' value={data.cost === 'signature'} onChange={value => setAbilityCost(value ? 'signature' : 0)} />
						{
							data.cost !== 'signature' ?
								<>
									<HeaderText>Cost</HeaderText>
									<NumberSpin min={1} value={data.cost} onChange={setAbilityCost} />
								</>
								: null
						}
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
						<HeaderText>Minimum Level</HeaderText>
						<NumberSpin min={1} value={data.minLevel} onChange={setMinLevel} />
					</Space>
				);
			}
			case FeatureType.Companion: {
				const data = feature.data as FeatureCompanionData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Companion Type</HeaderText>
						<Segmented
							name='companiontypes'
							block={true}
							options={[ 'companion', 'mount', 'retainer' ].map(o => ({ value: o, label: Format.capitalize(o) }))}
							value={data.type}
							onChange={s => setCompanionType(s as 'companion' | 'mount' | 'retainer')}
						/>
					</Space>
				);
			}
			case FeatureType.ConditionImmunity: {
				const data = feature.data as FeatureConditionImmunityData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Conditions</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Select conditions'
							mode='multiple'
							allowClear={true}
							options={[ ConditionType.Bleeding, ConditionType.Dazed, ConditionType.Frightened, ConditionType.Grabbed, ConditionType.Prone, ConditionType.Restrained, ConditionType.Slowed, ConditionType.Taunted, ConditionType.Weakened ].map(o => ({ value: o }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.value
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.conditions}
							onChange={conditions => setConditions(conditions)}
						/>
					</Space>
				);
			}
			case FeatureType.DamageModifier: {
				const data = feature.data as FeatureDamageModifierData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Modifiers</HeaderText>
						{
							data.modifiers.map((mod, n) => (
								<Expander key={n} title='Damage Modifier'>
									<Space direction='vertical' style={{ width: '100%' }}>
										<HeaderText>{FormatLogic.getDamageModifier(mod)}</HeaderText>
										<Select
											style={{ width: '100%' }}
											placeholder='Damage type'
											options={[ DamageType.Damage, DamageType.Acid, DamageType.Cold, DamageType.Corruption, DamageType.Fire, DamageType.Holy, DamageType.Lightning, DamageType.Poison, DamageType.Psychic, DamageType.Sonic ].map(option => ({ value: option }))}
											optionRender={option => <div className='ds-text'>{option.data.value}</div>}
											showSearch={true}
											filterOption={(input, option) => {
												const strings = option ?
													[
														option.value
													]
													: [];
												return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
											}}
											value={mod.damageType}
											onChange={value => setDamageModifierDamageType(data, n, value)}
										/>
										<Select
											style={{ width: '100%' }}
											placeholder='Modifier type'
											options={[ DamageModifierType.Immunity, DamageModifierType.Weakness ].map(o => ({ value: o }))}
											optionRender={option => <div className='ds-text'>{option.data.value}</div>}
											showSearch={true}
											filterOption={(input, option) => {
												const strings = option ?
													[
														option.value
													]
													: [];
												return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
											}}
											value={mod.type}
											onChange={value => setDamageModifierType(data, n, value)}
										/>
										<NumberSpin label='Value' min={0} value={mod.value} onChange={value => setDamageModifierValue(data, n, value)} />
										<Select
											style={{ width: '100%' }}
											placeholder='Characteristics'
											mode='multiple'
											options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(option => ({ value: option }))}
											optionRender={option => <div className='ds-text'>{option.data.value}</div>}
											showSearch={true}
											filterOption={(input, option) => {
												const strings = option ?
													[
														option.value
													]
													: [];
												return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
											}}
											value={mod.valueCharacteristics}
											onChange={value => setDamageModifierValueCharacteristics(data, n, value)}
										/>
										<NumberSpin label='Per Level After 1st' min={0} value={mod.valuePerLevel} onChange={value => setDamageModifierValuePerLevel(data, n, value)} />
										<NumberSpin label='Per Echelon' min={0} value={mod.valuePerEchelon} onChange={value => setDamageModifierValuePerEchelon(data, n, value)} />
										<DangerButton mode='block' onConfirm={() => deleteDamageModifier(data, n)} />
									</Space>
								</Expander>
							))
						}
						{
							data.modifiers.length === 0 ?
								<Empty />
								: null
						}
						<Button block={true} onClick={() => addDamageModifier(data)}>
							<PlusOutlined />
							Add a modifier
						</Button>
					</Space>
				);
			}
			case FeatureType.DomainFeature: {
				const data = feature.data as FeatureDomainFeatureData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Level</HeaderText>
						<NumberSpin min={1} value={data.level} onChange={setLevel} />
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.Domain: {
				const data = feature.data as FeatureDomainData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.ItemChoice: {
				const data = feature.data as FeatureItemChoiceData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Types</HeaderText>
						<Select
							style={{ width: '100%' }}
							status={data.types.length === 0 ? 'warning' : ''}
							placeholder='Item types'
							mode='multiple'
							allowClear={true}
							options={[ ItemType.Artifact, ItemType.Consumable, ItemType.Leveled, ItemType.Trinket ].map(option => ({ value: option }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.value
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.types}
							onChange={setItemTypes}
						/>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.Kit: {
				const data = feature.data as FeatureKitData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Types</HeaderText>
						<Select
							style={{ width: '100%' }}
							status={data.types.length === 0 ? 'warning' : ''}
							placeholder='Kit types'
							mode='multiple'
							allowClear={true}
							options={[
								{ value: '', label: 'Standard' },
								{ value: 'Stormwight', label: 'Stormwight' }
							]}
							optionRender={option => <div className='ds-text'>{option.data.label}</div>}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.label
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.types}
							onChange={setKitTypes}
						/>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.Language: {
				const data = feature.data as FeatureLanguageData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Language</HeaderText>
						<Select
							style={{ width: '100%' }}
							status={data.language === '' ? 'warning' : ''}
							placeholder='Language'
							allowClear={true}
							options={SourcebookLogic.getLanguages(props.sourcebooks).map(option => ({ value: option.name, description: option.description }))}
							optionRender={option => <Field label={option.data.value} value={option.data.description} />}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.value
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.language || ''}
							onChange={setLanguage}
						/>
					</Space>
				);
			}
			case FeatureType.LanguageChoice: {
				const data = feature.data as FeatureLanguageChoiceData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Options</HeaderText>
						<Select
							style={{ width: '100%' }}
							status={data.options.length === 0 ? 'warning' : ''}
							placeholder='Options'
							mode='multiple'
							allowClear={true}
							options={SourcebookLogic.getLanguages(props.sourcebooks).map(option => ({ value: option.name, description: option.description }))}
							optionRender={option => <Field label={option.data.value} value={option.data.description} />}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.value
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.options}
							onChange={setLanguageOptions}
						/>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.Malice: {
				const data = feature.data as FeatureMaliceData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Cost</HeaderText>
						<NumberSpin min={1} value={data.cost} onChange={setCost} />
						<HeaderText>Sections</HeaderText>
						<Space direction='vertical' style={{ width: '100%' }}>
							{
								data.sections.map((section, n) => (
									<Expander
										key={n}
										title='Malice Section'
										extra={[
											<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveMaliceSection(data, n, 'up'); }} />,
											<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveMaliceSection(data, n, 'down'); }} />,
											<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteMaliceSection(data, n); }} />
										]}
									>
										<Space direction='vertical' style={{ width: '100%' }}>
											{
												(typeof section === 'string') ?
													<div>
														<HeaderText>Text</HeaderText>
														<MultiLine
															label='Text'
															value={section}
															onChange={value => setMaliceSectionText(data, n, value)}
														/>
													</div>
													:
													<Space direction='vertical' style={{ width: '100%' }}>
														<HeaderText>Power Roll</HeaderText>
														<Select
															style={{ width: '100%' }}
															status={section.characteristic.length === 0 ? 'warning' : ''}
															placeholder='Characteristics'
															mode='multiple'
															options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(option => ({ value: option }))}
															optionRender={option => <div className='ds-text'>{option.data.value}</div>}
															showSearch={true}
															filterOption={(input, option) => {
																const strings = option ?
																	[
																		option.value
																	]
																	: [];
																return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
															}}
															value={section.characteristic}
															onChange={value => setMaliceSectionPowerRollCharacteristics(data, n, value)}
														/>
														<Input
															status={section.tier1 === '' ? 'warning' : ''}
															placeholder='Tier 1'
															allowClear={true}
															value={section.tier1}
															onChange={e => setMaliceSectionPowerRoll1(data, n, e.target.value)}
														/>
														<Input
															status={section.tier1 === '' ? 'warning' : ''}
															placeholder='Tier 2'
															allowClear={true}
															value={section.tier2}
															onChange={e => setMaliceSectionPowerRoll2(data, n, e.target.value)}
														/>
														<Input
															status={section.tier1 === '' ? 'warning' : ''}
															placeholder='Tier 3'
															allowClear={true}
															value={section.tier3}
															onChange={e => setMaliceSectionPowerRoll3(data, n, e.target.value)}
														/>
													</Space>
											}
										</Space>
									</Expander>
								))
							}
							{
								data.sections.length === 0 ?
									<Empty />
									: null
							}
							<Flex gap='8px'>
								<Button block={true} onClick={() => addMaliceSectionText(data)}>Add Text</Button>
								<Button block={true} onClick={() => addMaliceSectionPowerRoll(data)}>Add a Power Roll</Button>
							</Flex>
						</Space>
					</Space>
				);
			}
			case FeatureType.Multiple: {
				const data = feature.data as FeatureMultipleData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Features</HeaderText>
						{
							data.features.map((feature, n) => (
								<Expander
									key={feature.id}
									title={feature.name}
									extra={[
										<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveMultipleFeature(data, n, 'up'); }} />,
										<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveMultipleFeature(data, n, 'down'); }} />,
										<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteMultipleFeature(data, n); }} />
									]}
								>
									<FeatureEditPanel
										feature={feature}
										sourcebooks={props.sourcebooks}
										onChange={f => setMultipleFeature(data, n, f)}
									/>
								</Expander>
							))
						}
						{
							data.features.length === 0 ?
								<Empty />
								: null
						}
						<Button block={true} onClick={() => addMultipleFeature(data)}>Add a feature</Button>
					</Space>
				);
			}
			case FeatureType.Package: {
				return null;
			}
			case FeatureType.Perk: {
				const data = feature.data as FeaturePerkData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Lists</HeaderText>
						<Select
							style={{ width: '100%' }}
							status={data.lists.length === 0 ? 'warning' : ''}
							placeholder='Perk lists'
							mode='multiple'
							allowClear={true}
							options={[ PerkList.Crafting, PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural ].map(option => ({ value: option }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.value
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.lists}
							onChange={setPerkLists}
						/>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.Size: {
				const data = feature.data as FeatureSizeData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Size</HeaderText>
						<NumberSpin min={1} value={data.size.value} onChange={setSizeValue} />
						{
							data.size.value === 1 ?
								<HeaderText>Modifier</HeaderText>
								: null
						}
						{
							data.size.value === 1 ?
								<Segmented<'' | 'T' | 'S' | 'M' | 'L'>
									name='sizemodtypes'
									block={true}
									options={[ 'T', 'S', 'M', 'L' ]}
									value={data.size.mod}
									onChange={setSizeMod}
								/>
								: null
						}
					</Space>
				);
			}
			case FeatureType.Skill: {
				const data = feature.data as FeatureSkillData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Skill</HeaderText>
						<Select
							style={{ width: '100%' }}
							status={data.skill === '' ? 'warning' : ''}
							placeholder='Skill'
							allowClear={true}
							options={SourcebookLogic.getSkills(props.sourcebooks).map(option => ({ value: option.name, description: option.description }))}
							optionRender={option => <Field label={option.data.value} value={option.data.description} />}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.value
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.skill || ''}
							onChange={setSkill}
						/>
					</Space>
				);
			}
			case FeatureType.SkillChoice: {
				const data = feature.data as FeatureSkillChoiceData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Options</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Skills'
							allowClear={true}
							mode='multiple'
							options={SourcebookLogic.getSkills(props.sourcebooks).map(option => ({ value: option.name, description: option.description }))}
							optionRender={option => <Field label={option.data.value} value={option.data.description} />}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.value
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.options}
							onChange={setSkillOptions}
						/>
						<HeaderText>List Options</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Skill Lists'
							allowClear={true}
							mode='multiple'
							options={[ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ].map(option => ({ value: option }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.value
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={data.listOptions}
							onChange={setSkillListOptions}
						/>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.Speed: {
				const data = feature.data as FeatureSpeedData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Speed</HeaderText>
						<NumberSpin min={1} value={data.speed} onChange={setSpeed} />
					</Space>
				);
			}
			case FeatureType.TaggedFeature: {
				const data = feature.data as FeatureTaggedFeatureData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Tag</HeaderText>
						<Input
							status={data.tag === '' ? 'warning' : ''}
							placeholder='Tag'
							allowClear={true}
							value={data.tag}
							onChange={e => setTag(e.target.value)}
						/>
						<Expander title='Feature'>
							<FeatureEditPanel
								feature={data.feature}
								sourcebooks={props.sourcebooks}
								onChange={setTaggedFeature}
							/>
						</Expander>
					</Space>
				);
			}
			case FeatureType.TaggedFeatureChoice: {
				const data = feature.data as FeatureTaggedFeatureChoiceData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Tag</HeaderText>
						<Input
							status={data.tag === '' ? 'warning' : ''}
							placeholder='Tag'
							allowClear={true}
							value={data.tag}
							onChange={e => setTag(e.target.value)}
						/>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.Text: {
				return null;
			}
			case FeatureType.TitleChoice: {
				const data = feature.data as FeatureTitleChoiceData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
		}
	};

	try {
		const featureTypes = [
			FeatureType.Text,
			FeatureType.Ability,
			FeatureType.AbilityCost,
			FeatureType.AbilityDamage,
			FeatureType.AbilityDistance,
			FeatureType.AncestryChoice,
			FeatureType.AncestryFeatureChoice,
			FeatureType.Bonus,
			FeatureType.CharacteristicBonus,
			FeatureType.Choice,
			FeatureType.ClassAbility,
			FeatureType.Companion,
			FeatureType.DamageModifier,
			FeatureType.Domain,
			FeatureType.DomainFeature,
			FeatureType.Kit,
			FeatureType.Language,
			FeatureType.LanguageChoice,
			FeatureType.Multiple,
			FeatureType.Perk,
			FeatureType.Size,
			FeatureType.Skill,
			FeatureType.SkillChoice,
			FeatureType.Speed,
			FeatureType.TaggedFeature,
			FeatureType.TaggedFeatureChoice,
			FeatureType.TitleChoice
		];

		return (
			<ErrorBoundary>
				<div className='feature-edit-panel'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Feature',
								children: (
									<div>
										<HeaderText>Name</HeaderText>
										<Input
											status={feature.name === '' ? 'warning' : ''}
											placeholder='Name'
											allowClear={true}
											value={feature.name}
											onChange={e => setName(e.target.value)}
										/>
										<HeaderText>Description</HeaderText>
										<MultiLine label='Description' value={feature.description} onChange={setDescription} />
									</div>
								)
							},
							{
								key: '2',
								label: 'Details',
								children: (
									<div>
										{
											(props.allowedTypes || []).length !== 1 ?
												<>
													<HeaderText>Feature Type</HeaderText>
													<Select
														style={{ width: '100%' }}
														placeholder='Select type'
														options={(props.allowedTypes || featureTypes).map(o => ({ value: o }))}
														optionRender={option => <Field label={option.data.value} value={FeatureLogic.getFeatureTypeDescription(option.data.value)} />}
														showSearch={true}
														filterOption={(input, option) => {
															const strings = option ?
																[
																	option.value
																]
																: [];
															return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
														}}
														value={feature.type}
														onChange={setType}
													/>
												</>
												: null
										}
										{
											(feature as Perk).list !== undefined ?
												<div>
													<HeaderText>Perk List</HeaderText>
													<Select
														style={{ width: '100%' }}
														placeholder='Select list'
														options={[ PerkList.Crafting, PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural ].map(o => ({ value: o }))}
														optionRender={option => <div className='ds-text'>{option.data.value}</div>}
														showSearch={true}
														filterOption={(input, option) => {
															const strings = option ?
																[
																	option.value
																]
																: [];
															return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
														}}
														value={(feature as Perk).list}
														onChange={setList}
													/>
												</div>
												: null
										}
										{getDataSection()}
									</div>
								)
							}
						]}
					/>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
