import { Alert, Button, Input, Segmented, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Feature, FeatureAbilityCostData, FeatureAbilityData, FeatureBonusData, FeatureChoiceData, FeatureClassAbilityData, FeatureDamageModifierData, FeatureData, FeatureDomainData, FeatureDomainFeatureData, FeatureKitData, FeatureLanguageData, FeatureMultipleData, FeatureSizeData, FeatureSkillChoiceData, FeatureSkillData } from '../../../models/feature';
import { Ability } from '../../../models/ability';
import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityEditPanel } from '../ability-edit-panel/ability-edit-panel';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { AbilityLogic } from '../../../logic/ability-logic';
import { Collections } from '../../../utils/collections';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { Expander } from '../../controls/expander/expander';
import { FeatureField } from '../../../enums/feature-field';
import { FeatureLogic } from '../../../logic/feature-logic';
import { FeatureType } from '../../../enums/feature-type';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { KitType } from '../../../enums/kit';
import { LanguageData } from '../../../data/language-data';
import { MultiLine } from '../../controls/multi-line/multi-line';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { SkillData } from '../../../data/skill-data';
import { SkillList } from '../../../enums/skill-list';
import { Sourcebook } from '../../../models/sourcebook';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './feature-edit-panel.scss';

interface Props {
	feature: Feature;
	allowedTypes?: FeatureType[];
	sourcebooks: Sourcebook[];
	onChange: (feature: Feature) => void;
}

export const FeatureEditPanel = (props: Props) => {
	const [ feature, setFeature ] = useState<Feature>(props.feature);

	const setName = (value: string) => {
		const copy = JSON.parse(JSON.stringify(feature)) as Feature;
		copy.name = value;
		setFeature(copy);
		props.onChange(copy);
	};

	const setDescription = (value: string) => {
		const copy = JSON.parse(JSON.stringify(feature)) as Feature;
		copy.description = value;
		setFeature(copy);
		props.onChange(copy);
	};

	const setType = (value: FeatureType) => {
		let data: FeatureData | null;
		switch (value) {
			case FeatureType.Ability:
				data = {
					ability: AbilityLogic.createAbility({
						id: Utils.guid(),
						name: '',
						description: '',
						type: AbilityLogic.createTypeAction(),
						keywords: [],
						distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
						target: ''
					})
				};
				break;
			case FeatureType.AbilityCost:
				data = {
					keywords: [],
					modifier: -1
				};
				break;
			case FeatureType.Bonus:
				data = {
					field: FeatureField.Recoveries,
					value: 0,
					valuePerLevel: 0
				};
				break;
			case FeatureType.Choice:
				data = {
					options: [],
					count: 1,
					selected: []
				};
				break;
			case FeatureType.ClassAbility:
				data = {
					cost: 1,
					count: 1,
					selectedIDs: []
				};
				break;
			case FeatureType.DamageModifier:
				data = {
					modifiers: []
				};
				break;
			case FeatureType.Domain:
				data = {
					count: 1,
					selected: []
				};
				break;
			case FeatureType.DomainFeature:
				data = {
					level: 1,
					count: 1,
					selected: []
				};
				break;
			case FeatureType.Kit:
				data = {
					types: [],
					count: 1,
					selected: []
				};
				break;
			case FeatureType.KitType:
				data = {
					types: []
				};
				break;
			case FeatureType.Language:
				data = {
					options: [],
					count: 1,
					selected: []
				};
				break;
			case FeatureType.Multiple:
				data = {
					features: []
				};
				break;
			case FeatureType.Size:
				data = {
					size: {
						value: 1,
						mod: 'M'
					}
				};
				break;
			case FeatureType.Skill:
				data = {
					skill: ''
				};
				break;
			case FeatureType.SkillChoice:
				data = {
					options: [],
					listOptions: [],
					count: 1,
					selected: []
				};
				break;
			case FeatureType.Text:
				data = null;
				break;
		}

		const copy = JSON.parse(JSON.stringify(feature)) as Feature;
		copy.type = value;
		copy.data = data;
		setFeature(copy);
		props.onChange(copy);
	};

	const setData = (value: FeatureData) => {
		const copy = JSON.parse(JSON.stringify(feature)) as Feature;
		copy.data = value;
		setFeature(copy);
		props.onChange(copy);
	};

	const getDataSection = () => {
		const setCount = (value: number) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureChoiceData | FeatureClassAbilityData | FeatureDomainData | FeatureDomainFeatureData | FeatureKitData | FeatureLanguageData | FeatureSkillChoiceData;
			copy.count = value;
			setData(copy);
		};

		const setLevel = (value: number) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureDomainFeatureData;
			copy.level = value;
			setData(copy);
		};

		const setValue = (value: number) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureBonusData;
			copy.value = value;
			setData(copy);
		};

		const setValuePerLevel = (value: number) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureBonusData;
			copy.valuePerLevel = value;
			setData(copy);
		};

		const setCost = (value: number) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureClassAbilityData;
			copy.cost = value;
			setData(copy);
		};

		const setSizeValue = (value: number) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureSizeData;
			copy.size.value = value;
			setData(copy);
		};

		const setSizeMod = (value: string) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureSizeData;
			copy.size.mod = value;
			setData(copy);
		};

		const setField = (value: FeatureField) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureBonusData;
			copy.field = value;
			setData(copy);
		};

		const setKitTypes = (value: KitType[]) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureKitData;
			copy.types = value;
			setData(copy);
		};

		const setLanguageOptions = (value: string[]) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureLanguageData;
			copy.options = value;
			setData(copy);
		};

		const setSkillOptions = (value: string[]) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureSkillChoiceData;
			copy.options = value;
			setData(copy);
		};

		const setSkillListOptions = (value: SkillList[]) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureSkillChoiceData;
			copy.listOptions = value;
			setData(copy);
		};

		const setSkill = (value: string) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureSkillData;
			copy.skill = value;
			setData(copy);
		};

		const setAbility = (value: Ability) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureAbilityData;
			copy.ability = value;
			setData(copy);
		};

		const setKeywords = (value: AbilityKeyword[]) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureAbilityCostData;
			copy.keywords = value;
			setData(copy);
		};

		const setModifier = (value: number) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureAbilityCostData;
			copy.modifier = value;
			setData(copy);
		};

		const addChoice = (data: FeatureChoiceData) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureChoiceData;
			copy.options.push({
				feature: FeatureLogic.createFeature({
					id: Utils.guid(),
					name: '',
					description: ''
				}),
				value: 1
			});
			setData(copy);
		};

		const moveChoice = (data: FeatureChoiceData, index: number, direction: 'up' | 'down') => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureChoiceData;
			copy.options = Collections.move(copy.options, index, direction);
			setData(copy);
		};

		const deleteChoice = (data: FeatureChoiceData, index: number) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureChoiceData;
			copy.options.splice(index);
			setData(copy);
		};

		const setChoiceFeature = (data: FeatureChoiceData, index: number, value: Feature) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureChoiceData;
			copy.options[index].feature = value;
			setData(copy);
		};

		const setChoiceValue = (data: FeatureChoiceData, index: number, value: number) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureChoiceData;
			copy.options[index].value = value;
			setData(copy);
		};

		const addDamageModifier = (data: FeatureDamageModifierData) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureDamageModifierData;
			copy.modifiers.push({
				damageType: 'Fire',
				type: DamageModifierType.Immunity,
				value: 0,
				valuePerLevel: 0
			});
			setData(copy);
		};

		const deleteDamageModifier = (data: FeatureDamageModifierData, index: number) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureDamageModifierData;
			copy.modifiers.splice(index);
			setData(copy);
		};

		const setDamageModifierDamageType = (data: FeatureDamageModifierData, index: number, value: string) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureDamageModifierData;
			copy.modifiers[index].damageType = value;
			setData(copy);
		};

		const setDamageModifierType = (data: FeatureDamageModifierData, index: number, value: DamageModifierType) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureDamageModifierData;
			copy.modifiers[index].type = value;
			setData(copy);
		};

		const setDamageModifierValue = (data: FeatureDamageModifierData, index: number, value: number) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureDamageModifierData;
			copy.modifiers[index].value = value;
			setData(copy);
		};

		const setDamageModifierValuePerLevel = (data: FeatureDamageModifierData, index: number, value: number) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureDamageModifierData;
			copy.modifiers[index].valuePerLevel = value;
			setData(copy);
		};

		const addMultipleFeature = (data: FeatureMultipleData) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureMultipleData;
			copy.features.push(FeatureLogic.createFeature({
				id: Utils.guid(),
				name: '',
				description: ''
			}));
			setData(copy);
		};

		const moveMultipleFeature = (data: FeatureMultipleData, index: number, direction: 'up' | 'down') => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureMultipleData;
			copy.features = Collections.move(copy.features, index, direction);
			setData(copy);
		};

		const deleteMultipleFeature = (data: FeatureMultipleData, index: number) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureMultipleData;
			copy.features.splice(index);
			setData(copy);
		};

		const setMultipleFeature = (data: FeatureMultipleData, index: number, value: Feature) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureMultipleData;
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
						<HeaderText>Field</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Select keywords'
							mode='multiple'
							allowClear={true}
							options={[ AbilityKeyword.Animal, AbilityKeyword.Area, AbilityKeyword.Attack, AbilityKeyword.Charge, AbilityKeyword.Earth, AbilityKeyword.Fire, AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Persistent, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Resistance, AbilityKeyword.Void, AbilityKeyword.Weapon ].map(o => ({ value: o }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							value={data.keywords}
							onChange={setKeywords}
						/>
						<HeaderText>Modifier</HeaderText>
						<NumberSpin value={data.modifier} onChange={setModifier} />
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
							options={[ FeatureField.ProjectPoints, FeatureField.Recoveries, FeatureField.RecoveryValue, FeatureField.Renown, FeatureField.Speed, FeatureField.Stability, FeatureField.Stamina ].map(o => ({ value: o }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							value={data.field}
							onChange={setField}
						/>
						<HeaderText>Value</HeaderText>
						<NumberSpin min={0} value={data.value} onChange={setValue} />
						<HeaderText>Value Per Level</HeaderText>
						<NumberSpin min={0} value={data.valuePerLevel} onChange={setValuePerLevel} />
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
									key={n}
									title={option.feature.name || 'Unnamed Feature'}
									extra={[
										{
											title: 'Move Up',
											icon: <CaretUpOutlined />,
											onClick: () => moveChoice(data, n, 'up')
										},
										{
											title: 'Move Down',
											icon: <CaretDownOutlined />,
											onClick: () => moveChoice(data, n, 'down')
										},
										{
											title: 'Delete',
											icon: <DangerButton mode='icon' onConfirm={() => deleteChoice(data, n)} />
										}
									]}
								>
									<FeatureEditPanel
										feature={option.feature}
										sourcebooks={props.sourcebooks}
										onChange={f => setChoiceFeature(data, n, f)}
									/>
									<NumberSpin min={1} value={option.value} onChange={value => setChoiceValue(data, n, value)} />
								</Expander>
							))
						}
						{
							data.options.length === 0 ?
								<Alert
									type='warning'
									showIcon={true}
									message='No options'
								/>
								: null
						}
						<Button block={true} onClick={() => addChoice(data)}>Add an option</Button>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.ClassAbility: {
				const data = feature.data as FeatureClassAbilityData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Cost</HeaderText>
						<NumberSpin min={1} value={data.cost} onChange={setCost} />
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
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
									<Input
										className={mod.damageType === '' ? 'input-empty' : ''}
										placeholder='Damage type'
										allowClear={true}
										value={mod.damageType}
										onChange={e => setDamageModifierDamageType(data, n, e.target.value)}
									/>
									<Select
										style={{ width: '100%' }}
										placeholder='Modifier type'
										options={[ DamageModifierType.Immunity, DamageModifierType.Weakness ].map(o => ({ value: o }))}
										optionRender={option => <div className='ds-text'>{option.data.value}</div>}
										value={mod.type}
										onChange={value => setDamageModifierType(data, n, value)}
									/>
									<NumberSpin min={0} value={mod.value} onChange={value => setDamageModifierValue(data, n, value)} />
									<NumberSpin min={0} value={mod.valuePerLevel} onChange={value => setDamageModifierValuePerLevel(data, n, value)} />
									<DangerButton onConfirm={() => deleteDamageModifier(data, n)} />
								</Expander>
							))
						}
						{
							data.modifiers.length === 0 ?
								<Alert
									type='warning'
									showIcon={true}
									message='No modifiers'
								/>
								: null
						}
						<Button block={true} onClick={() => addDamageModifier(data)}>Add a modifier</Button>
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
			case FeatureType.Kit: {
				const data = feature.data as FeatureKitData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Types</HeaderText>
						<Select
							style={{ width: '100%' }}
							className={data.types.length === 0 ? 'selection-empty' : ''}
							placeholder='Kit types'
							mode='multiple'
							allowClear={true}
							options={[ KitType.Martial, KitType.Caster, KitType.Stormwight ].map(option => ({ value: option }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
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
						<HeaderText>Options</HeaderText>
						<Select
							style={{ width: '100%' }}
							className={data.options.length === 0 ? 'selection-empty' : ''}
							placeholder='Options'
							mode='multiple'
							allowClear={true}
							options={LanguageData.getLanguages(props.sourcebooks).map(option => ({ value: option.name, description: option.description }))}
							optionRender={option => <Field label={option.data.value} value={option.data.description} />}
							value={data.options}
							onChange={setLanguageOptions}
						/>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
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
										{
											title: 'Move Up',
											icon: <CaretUpOutlined />,
											onClick: () => moveMultipleFeature(data, n, 'up')
										},
										{
											title: 'Move Down',
											icon: <CaretDownOutlined />,
											onClick: () => moveMultipleFeature(data, n, 'down')
										},
										{
											title: 'Delete',
											icon: <DangerButton mode='icon' onConfirm={() => deleteMultipleFeature(data, n)} />
										}
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
								<Alert
									type='warning'
									showIcon={true}
									message='No features'
								/>
								: null
						}
						<Button block={true} onClick={() => addMultipleFeature(data)}>Add a feature</Button>
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
								<Segmented
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
							className={data.skill === '' ? 'selection-empty' : ''}
							placeholder='Skill'
							allowClear={true}
							options={SkillData.getSkills(props.sourcebooks).map(option => ({ value: option.name, description: option.description }))}
							optionRender={option => <Field label={option.data.value} value={option.data.description} />}
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
							options={SkillData.getSkills(props.sourcebooks).map(option => ({ value: option.name, description: option.description }))}
							optionRender={option => <Field label={option.data.value} value={option.data.description} />}
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
							value={data.listOptions}
							onChange={setSkillListOptions}
						/>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.Text:
				return null;
		}
	};

	try {
		return (
			<div className='feature-edit-panel'>
				<Tabs
					items={[
						{
							key: '1',
							label: 'Element',
							children: (
								<div>
									<HeaderText>Name</HeaderText>
									<Input
										className={feature.name === '' ? 'input-empty' : ''}
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
							label: 'Feature',
							children: (
								<div>
									<HeaderText>Feature Type</HeaderText>
									<Select
										style={{ width: '100%' }}
										placeholder='Select type'
										options={(props.allowedTypes || [ FeatureType.Ability, FeatureType.Bonus, FeatureType.Choice, FeatureType.ClassAbility, FeatureType.DamageModifier, FeatureType.Domain, FeatureType.DomainFeature, FeatureType.Kit, FeatureType.Language, FeatureType.Multiple, FeatureType.Size, FeatureType.Skill, FeatureType.SkillChoice, FeatureType.Text ]).map(o => ({ value: o }))}
										optionRender={option => <Field label={option.data.value} value={FeatureLogic.getFeatureTypeDescription(option.data.value)} />}
										value={feature.type}
										onChange={setType}
									/>
									{getDataSection()}
								</div>
							)
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
