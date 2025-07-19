import { Button, Flex, Input, Popover, Segmented, Select, Space } from 'antd';
import { Feature, FeatureAncestryFeatureChoice, FeatureBonus, FeatureCharacteristicBonus, FeatureClassAbility, FeatureConditionImmunity, FeatureDamageModifier, FeatureData, FeatureFollower, FeatureMovementMode, FeaturePerk, FeatureProficiency, FeatureTitleChoice } from '../../../models/feature';
import { PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Characteristic } from '../../../enums/characteristic';
import { ConditionType } from '../../../enums/condition-type';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { DamageType } from '../../../enums/damage-type';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { Empty } from '../../controls/empty/empty';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { Expander } from '../../controls/expander/expander';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { FeaturePanel } from '../elements/feature-panel/feature-panel';
import { FeatureType } from '../../../enums/feature-type';
import { Field } from '../../controls/field/field';
import { FollowerLogic } from '../../../logic/follower-logic';
import { FollowerType } from '../../../enums/follower-type';
import { FormatLogic } from '../../../logic/format-logic';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { KitArmor } from '../../../enums/kit-armor';
import { KitWeapon } from '../../../enums/kit-weapon';
import { NameGenerator } from '../../../utils/name-generator';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { Options } from '../../../models/options';
import { PanelMode } from '../../../enums/panel-mode';
import { PerkList } from '../../../enums/perk-list';
import { SkillList } from '../../../enums/skill-list';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookLogic } from '../../../logic/sourcebook-logic';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './hero-customize-panel.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	addFeature: (feature: Feature) => void;
	deleteFeature: (feature: Feature) => void;
	setFeature: (featureID: string, feature: Feature) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

export const HeroCustomizePanel = (props: Props) => {
	const [ menuOpen, setMenuOpen ] = useState<boolean>(false);

	const getEditSection = (feature: Feature) => {
		const setValue = (value: number) => {
			const copy = Utils.copy(feature) as FeatureAncestryFeatureChoice;
			copy.data.value = value;
			copy.data.selected = null;
			props.setFeature(feature.id, copy);
		};

		const setCharacteristic = (value: Characteristic) => {
			const copy = Utils.copy(feature) as FeatureCharacteristicBonus;
			copy.data.characteristic = value;
			copy.name = `${copy.data.characteristic} + ${copy.data.value}`;
			props.setFeature(feature.id, copy);
		};

		const setCharacteristicBonus = (value: number) => {
			const copy = Utils.copy(feature) as FeatureCharacteristicBonus;
			copy.data.value = value;
			copy.name = `${copy.data.characteristic} + ${copy.data.value}`;
			props.setFeature(feature.id, copy);
		};

		const setValueField = (value: FeatureField) => {
			const copy = Utils.copy(feature) as FeatureBonus;
			copy.data.field = value;
			copy.name = `${copy.data.field} ${FormatLogic.getModifier(copy.data)}`;
			props.setFeature(feature.id, copy);
		};

		const setValueBonus = (value: number) => {
			const copy = Utils.copy(feature) as FeatureBonus;
			copy.data.value = value;
			copy.name = `${copy.data.field} ${FormatLogic.getModifier(copy.data)}`;
			props.setFeature(feature.id, copy);
		};

		const setValuePerLevel = (value: number) => {
			const copy = Utils.copy(feature) as FeatureBonus;
			copy.data.valuePerLevel = value;
			copy.name = `${copy.data.field} ${FormatLogic.getModifier(copy.data)}`;
			props.setFeature(feature.id, copy);
		};

		const setValuePerEchelon = (value: number) => {
			const copy = Utils.copy(feature) as FeatureBonus;
			copy.data.valuePerEchelon = value;
			copy.name = `${copy.data.field} ${FormatLogic.getModifier(copy.data)}`;
			props.setFeature(feature.id, copy);
		};

		const setValueCharacteristics = (value: Characteristic[]) => {
			const copy = Utils.copy(feature) as FeatureBonus;
			copy.data.valueCharacteristics = value;
			copy.name = `${copy.data.field} ${FormatLogic.getModifier(copy.data)}`;
			props.setFeature(feature.id, copy);
		};

		const setDamageModifierDamageType = (value: DamageType) => {
			const copy = Utils.copy(feature) as FeatureDamageModifier;
			copy.data.modifiers[0].damageType = value;
			copy.name = FormatLogic.getDamageModifier(copy.data.modifiers[0]);
			props.setFeature(feature.id, copy);
		};

		const setDamageModifierType = (value: DamageModifierType) => {
			const copy = Utils.copy(feature) as FeatureDamageModifier;
			copy.data.modifiers[0].type = value;
			copy.name = FormatLogic.getDamageModifier(copy.data.modifiers[0]);
			props.setFeature(feature.id, copy);
		};

		const setDamageModifierBonus = (value: number) => {
			const copy = Utils.copy(feature) as FeatureDamageModifier;
			copy.data.modifiers[0].value = value;
			copy.name = FormatLogic.getDamageModifier(copy.data.modifiers[0]);
			props.setFeature(feature.id, copy);
		};

		const setDamageModifierValuePerLevel = (value: number) => {
			const copy = Utils.copy(feature) as FeatureDamageModifier;
			copy.data.modifiers[0].valuePerLevel = value;
			copy.name = FormatLogic.getDamageModifier(copy.data.modifiers[0]);
			props.setFeature(feature.id, copy);
		};

		const setDamageModifierValuePerEchelon = (value: number) => {
			const copy = Utils.copy(feature) as FeatureDamageModifier;
			copy.data.modifiers[0].valuePerEchelon = value;
			copy.name = FormatLogic.getDamageModifier(copy.data.modifiers[0]);
			props.setFeature(feature.id, copy);
		};

		const setDamageModifierCharacteristics = (value: Characteristic[]) => {
			const copy = Utils.copy(feature) as FeatureDamageModifier;
			copy.data.modifiers[0].valueCharacteristics = value;
			copy.name = FormatLogic.getDamageModifier(copy.data.modifiers[0]);
			props.setFeature(feature.id, copy);
		};

		const setClassID = (value: string) => {
			const copy = Utils.copy(feature) as FeatureClassAbility;
			copy.data.classID = value === '' ? undefined : value;
			copy.data.selectedIDs = [];
			props.setFeature(feature.id, copy);
		};

		const setCost = (value: number | 'signature') => {
			const copy = Utils.copy(feature) as FeatureClassAbility;
			copy.data.cost = value;
			copy.data.selectedIDs = [];
			props.setFeature(feature.id, copy);
		};

		const setConditionTypes = (value: ConditionType[]) => {
			const copy = Utils.copy(feature) as FeatureConditionImmunity;
			copy.data.conditions = value;
			props.setFeature(feature.id, copy);
		};

		const setFollowerName = (value: string) => {
			const copy = Utils.copy(feature) as FeatureFollower;
			copy.data.follower.name = value;
			props.setFeature(feature.id, copy);
		};

		const setFollowerType = (value: FollowerType) => {
			const copy = Utils.copy(feature) as FeatureFollower;
			copy.data.follower.type = value;
			copy.data.follower.characteristics.forEach(ch => {
				switch (ch.characteristic) {
					case Characteristic.Might:
						ch.value = value === FollowerType.Artisan ? 1 : 0;
						break;
					case Characteristic.Reason:
						ch.value = 1;
						break;
					case Characteristic.Intuition:
						ch.value = value === FollowerType.Sage ? 1 : 0;
						break;
					default:
						ch.value = 0;
						break;
				}
			});
			copy.data.follower.skills = [];
			props.setFeature(feature.id, copy);
		};

		const setFollowerCharacteristics = (value: { characteristic: Characteristic, value: number }[]) => {
			const copy = Utils.copy(feature) as FeatureFollower;
			copy.data.follower.characteristics = value;
			props.setFeature(feature.id, copy);
		};

		const setFollowerSkills = (value: string[]) => {
			const copy = Utils.copy(feature) as FeatureFollower;
			copy.data.follower.skills = value;
			props.setFeature(feature.id, copy);
		};

		const setFollowerLanguages = (value: string[]) => {
			const copy = Utils.copy(feature) as FeatureFollower;
			copy.data.follower.languages = value;
			props.setFeature(feature.id, copy);
		};

		const setMovementMode = (value: string) => {
			const copy = Utils.copy(feature) as FeatureMovementMode;
			copy.data.mode = value;
			props.setFeature(feature.id, copy);
		};

		const setPerkLists = (value: PerkList[]) => {
			const copy = Utils.copy(feature) as FeaturePerk;
			copy.data.lists = value;
			copy.data.selected = [];
			props.setFeature(feature.id, copy);
		};

		const setEchelon = (value: number) => {
			const copy = Utils.copy(feature) as FeatureTitleChoice;
			copy.data.echelon = value;
			copy.data.selected = [];
			props.setFeature(feature.id, copy);
		};

		const setCustomAncestryID = (value: string) => {
			const copy = Utils.copy(feature) as FeatureAncestryFeatureChoice;
			copy.data.source.customID = value;
			copy.data.selected = null;
			props.setFeature(feature.id, copy);
		};

		const setProficiencyWeapons = (value: KitWeapon[]) => {
			const copy = Utils.copy(feature) as FeatureProficiency;
			copy.data.weapons = value;
			props.setFeature(feature.id, copy);
		};

		const setProficiencyArmor = (value: KitArmor[]) => {
			const copy = Utils.copy(feature) as FeatureProficiency;
			copy.data.armor = value;
			props.setFeature(feature.id, copy);
		};

		switch (feature.type) {
			case FeatureType.AncestryFeatureChoice:
				return (
					<div>
						<HeaderText>Ancestry</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Select ancestry'
							options={[ null, ...SourcebookLogic.getAncestries(props.sourcebooks) ].map(o => ({ value: o ? o.id : '', label: o ? o.name : 'Your ancestry' }))}
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
							value={feature.data.source.customID}
							onChange={setCustomAncestryID}
						/>
						<HeaderText>Point Cost</HeaderText>
						<NumberSpin min={1} max={2} value={feature.data.value} onChange={setValue} />
					</div>
				);
			case FeatureType.Bonus:
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
							value={feature.data.field}
							onChange={setValueField}
						/>
						<HeaderText>Value</HeaderText>
						<NumberSpin label='Value' min={0} value={feature.data.value} onChange={setValueBonus} />
						<NumberSpin label='Per Level After 1st' min={0} value={feature.data.valuePerLevel} onChange={setValuePerLevel} />
						<NumberSpin label='Per Echelon' min={0} value={feature.data.valuePerEchelon} onChange={setValuePerEchelon} />
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
							value={feature.data.valueCharacteristics}
							onChange={setValueCharacteristics}
						/>
					</Space>
				);
			case FeatureType.CharacteristicBonus:
				return (
					<div>
						<HeaderText>Characteristic</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Select characteristic'
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
							value={feature.data.characteristic}
							onChange={setCharacteristic}
						/>
						<HeaderText>Value</HeaderText>
						<NumberSpin label='Value' min={0} value={feature.data.value} onChange={setCharacteristicBonus} />
					</div>
				);
			case FeatureType.ClassAbility:
				return (
					<div>
						<HeaderText>Class</HeaderText>
						<Select
							style={{ width: '100%' }}
							allowClear={!!feature.data.classID}
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
							value={feature.data.classID || ''}
							onChange={setClassID}
						/>
						<HeaderText>Ability Cost</HeaderText>
						<Flex align='center' justify='center'>
							<Segmented<'signature' | number>
								options={[
									{ value: 'signature', label: 'Signature' },
									{ value: 3, label: '3pts' },
									{ value: 5, label: '5pts' },
									{ value: 7, label: '7pts' },
									{ value: 9, label: '9pts' },
									{ value: 11, label: '11pts' },
									{ value: 0, label: 'Other' }
								]}
								value={feature.data.cost}
								onChange={setCost}
							/>
						</Flex>
					</div>
				);
			case FeatureType.ConditionImmunity:
				return (
					<Select
						style={{ width: '100%', marginTop: '15px' }}
						placeholder='Select condition'
						mode='multiple'
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
						value={feature.data.conditions}
						onChange={setConditionTypes}
					/>
				);
			case FeatureType.DamageModifier:
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Modifier</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Select field'
							options={[ DamageType.Damage, DamageType.Acid, DamageType.Cold, DamageType.Corruption, DamageType.Fire, DamageType.Holy, DamageType.Lightning, DamageType.Poison, DamageType.Psychic, DamageType.Sonic ].map(o => ({ value: o }))}
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
							value={feature.data.modifiers[0].damageType}
							onChange={setDamageModifierDamageType}
						/>
						<Segmented
							block={true}
							options={[ DamageModifierType.Immunity, DamageModifierType.Weakness ].map(o => ({ label: o, value: o }))}
							value={feature.data.modifiers[0].type}
							onChange={setDamageModifierType}
						/>
						<HeaderText>Value</HeaderText>
						<NumberSpin label='Value' min={0} value={feature.data.modifiers[0].value} onChange={setDamageModifierBonus} />
						<NumberSpin label='Per Level After 1st' min={0} value={feature.data.modifiers[0].valuePerLevel} onChange={setDamageModifierValuePerLevel} />
						<NumberSpin label='Per Echelon' min={0} value={feature.data.modifiers[0].valuePerEchelon} onChange={setDamageModifierValuePerEchelon} />
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
							value={feature.data.modifiers[0].valueCharacteristics}
							onChange={setDamageModifierCharacteristics}
						/>
					</Space>
				);
			case FeatureType.Follower:
				return (
					<div style={{ paddingTop: '20px' }}>
						<Expander title='Customize'>
							<HeaderText>Name</HeaderText>
							<Input
								status={feature.data.follower.name === '' ? 'warning' : ''}
								placeholder='Name'
								allowClear={true}
								addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setFollowerName(NameGenerator.generateName())} />}
								value={feature.data.follower.name}
								onChange={e => setFollowerName(e.target.value)}
							/>
							<HeaderText>Type</HeaderText>
							<Segmented
								block={true}
								options={[ FollowerType.Artisan, FollowerType.Sage ].map(o => ({ value: o, label: o }))}
								value={feature.data.follower.type}
								onChange={setFollowerType}
							/>
							<HeaderText>Characteristics</HeaderText>
							<Select
								style={{ width: '100%' }}
								allowClear={true}
								placeholder='Characteristics'
								options={FollowerLogic.getCharacteristicArrays(feature.data.follower.type).map(o => ({ value: o.filter(ch => ch.value !== 0).map(ch => `${ch.characteristic} ${ch.value}`).join(', '), array: o }))}
								optionRender={option => <div className='ds-text'>{option.data.value}</div>}
								value={feature.data.follower.characteristics.filter(ch => ch.value !== 0).map(ch => `${ch.characteristic} ${ch.value}`).join(', ')}
								onChange={(_text, option) => {
									const data = option as unknown as { value: string, array: { characteristic: Characteristic, value: number }[] };
									setFollowerCharacteristics(data.array);
								}}
							/>
							<HeaderText>Skills</HeaderText>
							<Select
								style={{ width: '100%' }}
								mode='multiple'
								maxCount={4}
								allowClear={true}
								placeholder='Skills'
								options={FollowerLogic.getSkillOptions(feature.data.follower.type, props.sourcebooks).map(s => ({ value: s.name, label: s.name, desc: s.description }))}
								optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
								showSearch={true}
								filterOption={(input, option) => {
									const strings = option ?
										[
											option.label,
											option.desc
										]
										: [];
									return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
								}}
								value={feature.data.follower.skills}
								onChange={setFollowerSkills}
							/>
							<HeaderText>Languages</HeaderText>
							<Select
								style={{ width: '100%' }}
								mode='multiple'
								maxCount={2}
								allowClear={true}
								placeholder='Languages'
								options={FollowerLogic.getLanguageOptions(props.sourcebooks).map(s => ({ value: s.name, label: s.name, desc: s.description }))}
								optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
								showSearch={true}
								filterOption={(input, option) => {
									const strings = option ?
										[
											option.label,
											option.desc
										]
										: [];
									return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
								}}
								value={feature.data.follower.languages}
								onChange={setFollowerLanguages}
							/>
						</Expander>
					</div>
				);
			case FeatureType.MovementMode:
				return (
					<div>
						<HeaderText>Name</HeaderText>
						<Input
							status={feature.data.mode === '' ? 'warning' : ''}
							placeholder='Mode'
							allowClear={true}
							value={feature.data.mode}
							onChange={e => setMovementMode(e.target.value)}
						/>
					</div>
				);
			case FeatureType.Perk:
				return (
					<div>
						<HeaderText>Perk List</HeaderText>
						<Select
							style={{ width: '100%' }}
							mode='multiple'
							allowClear={true}
							placeholder='List'
							options={[ PerkList.Crafting, PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural ].map(pl => ({ label: pl, value: pl }))}
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
							value={feature.data.lists}
							onChange={setPerkLists}
						/>
					</div>
				);
			case FeatureType.Proficiency:
				return (
					<div>
						<HeaderText>Weapons</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Weapons'
							mode='multiple'
							allowClear={true}
							options={[ KitWeapon.Bow, KitWeapon.Ensnaring, KitWeapon.Heavy, KitWeapon.Light, KitWeapon.Medium, KitWeapon.Polearm, KitWeapon.Unarmed, KitWeapon.Whip ].map(option => ({ value: option }))}
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
							value={feature.data.weapons}
							onChange={setProficiencyWeapons}
						/>
						<HeaderText>Armor</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Armor'
							mode='multiple'
							allowClear={true}
							options={[ KitArmor.Heavy, KitArmor.Light, KitArmor.Medium, KitArmor.Shield ].map(option => ({ value: option }))}
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
							value={feature.data.armor}
							onChange={setProficiencyArmor}
						/>
					</div>
				);
			case FeatureType.TitleChoice:
				return (
					<div>
						<HeaderText>Echelon</HeaderText>
						<NumberSpin
							min={1}
							max={4}
							value={feature.data.echelon}
							onChange={setEchelon}
						/>
					</div>
				);
		}

		return null;
	};

	try {
		return (
			<ErrorBoundary>
				<div className='hero-customize-panel'>
					<HeaderText
						extra={
							<Popover
								trigger='click'
								content={
									<Space direction='vertical'>
										<Button
											block={true}
											type='text'
											onClick={() => {
												setMenuOpen(false);
												props.addFeature(FactoryLogic.feature.createAncestryFeature({
													id: Utils.guid(),
													value: 1,
													current: true,
													former: true,
													customID: ''
												}));
											}}
										>
											Ancestry Feature
										</Button>
										<Button
											block={true}
											type='text'
											onClick={() => {
												setMenuOpen(false);
												props.addFeature(FactoryLogic.feature.createCharacteristicBonus({
													id: Utils.guid(),
													name: `${Characteristic.Might} + 1`,
													characteristic: Characteristic.Might,
													value: 1
												}));
											}}
										>
											Characteristic Bonus
										</Button>
										<Button
											block={true}
											type='text'
											onClick={() => {
												setMenuOpen(false);
												props.addFeature(FactoryLogic.feature.createClassAbilityChoice({
													id: Utils.guid(),
													cost: 'signature',
													allowAnySource: true
												}));
											}}
										>
											Class Ability
										</Button>
										<Button
											block={true}
											type='text'
											onClick={() => {
												setMenuOpen(false);
												props.addFeature(FactoryLogic.feature.createCompanion({
													id: Utils.guid(),
													type: 'companion'
												}));
											}}
										>
											Companion
										</Button>
										<Button
											block={true}
											type='text'
											onClick={() => {
												setMenuOpen(false);
												props.addFeature(FactoryLogic.feature.createConditionImmunity({
													id: Utils.guid(),
													conditions: []
												}));
											}}
										>
											Condition Immunity
										</Button>
										<Button
											block={true}
											type='text'
											onClick={() => {
												setMenuOpen(false);
												props.addFeature(FactoryLogic.feature.createDamageModifier({
													id: Utils.guid(),
													modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 2 }) ]
												}));
											}}
										>
											Damage Immunity / Weakness
										</Button>
										<Button
											block={true}
											type='text'
											onClick={() => {
												setMenuOpen(false);
												props.addFeature(FactoryLogic.feature.createFollower({
													id: Utils.guid()
												}));
											}}
										>
											Follower
										</Button>
										<Button
											block={true}
											type='text'
											onClick={() => {
												setMenuOpen(false);
												props.addFeature(FactoryLogic.feature.createKitChoice({
													id: Utils.guid()
												}));
											}}
										>
											Kit
										</Button>
										<Button
											block={true}
											type='text'
											onClick={() => {
												setMenuOpen(false);
												props.addFeature(FactoryLogic.feature.createLanguageChoice({
													id: Utils.guid(),
													count: -1
												}));
											}}
										>
											Languages
										</Button>
										<Button
											block={true}
											type='text'
											onClick={() => {
												setMenuOpen(false);
												props.addFeature(FactoryLogic.feature.createMovementMode({
													id: Utils.guid(),
													mode: 'fly'
												}));
											}}
										>
											Movement Mode
										</Button>
										<Button
											block={true}
											type='text'
											onClick={() => {
												setMenuOpen(false);
												props.addFeature(FactoryLogic.feature.createPerk({
													id: Utils.guid(),
													lists: [ PerkList.Crafting, PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural ]
												}));
											}}
										>
											Perk
										</Button>
										<Button
											block={true}
											type='text'
											onClick={() => {
												setMenuOpen(false);
												props.addFeature(FactoryLogic.feature.createProficiency({
													id: Utils.guid()
												}));
											}}
										>
											Proficiencies
										</Button>
										<Button
											block={true}
											type='text'
											onClick={() => {
												setMenuOpen(false);
												props.addFeature(FactoryLogic.feature.createSkillChoice({
													id: Utils.guid(),
													listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ],
													count: -1
												}));
											}}
										>
											Skills
										</Button>
										<Button
											block={true}
											type='text'
											onClick={() => {
												setMenuOpen(false);
												props.addFeature(FactoryLogic.feature.createBonus({
													id: Utils.guid(),
													name: `${FeatureField.Stamina} + 6`,
													field: FeatureField.Stamina,
													value: 6
												}));
											}}
										>
											Stat Bonus
										</Button>
										<Button
											block={true}
											type='text'
											onClick={() => {
												setMenuOpen(false);
												props.addFeature(FactoryLogic.feature.createSummon({
													id: Utils.guid(),
													options: []
												}));
											}}
										>
											Summon
										</Button>
										<Button
											block={true}
											type='text'
											onClick={() => {
												setMenuOpen(false);
												props.addFeature(FactoryLogic.feature.createTitleChoice({
													id: Utils.guid(),
													echelon: 1
												}));
											}}
										>
											Title
										</Button>
									</Space>
								}
								open={menuOpen}
								onOpenChange={setMenuOpen}
							>
								<Button type='text' icon={<PlusOutlined />} />
							</Popover>
						}
					>
						Customize
					</HeaderText>
					{
						props.hero.features
							.filter(f => f.id !== 'default-language')
							.map(f => (
								<Expander
									key={f.id}
									title={f.name}
									extra={[
										<DangerButton key='delete' mode='clear' onConfirm={() => props.deleteFeature(f)} />
									]}
								>
									{getEditSection(f)}
									{
										[ FeatureType.Bonus, FeatureType.ConditionImmunity, FeatureType.DamageModifier, FeatureType.Proficiency ].includes(f.type) ?
											null
											:
											<FeaturePanel
												feature={f}
												options={props.options}
												hero={props.hero}
												sourcebooks={props.sourcebooks}
												mode={PanelMode.Full}
												setData={props.setFeatureData}
											/>
									}
								</Expander>
							))
					}
					{
						props.hero.features.filter(f => f.id !== 'default-language').length === 0 ?
							<Empty text='You have no customizations.' />
							: null
					}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
