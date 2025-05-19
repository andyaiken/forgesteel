import { Divider, Segmented, Select, Space } from 'antd';
import { Feature, FeatureAncestryFeatureChoice, FeatureBonus, FeatureCharacteristicBonus, FeatureClassAbility, FeatureConditionImmunity, FeatureDamageModifier, FeatureData, FeaturePerk, FeatureSkillChoice, FeatureTitleChoice } from '../../../models/feature';
import { Characteristic } from '../../../enums/characteristic';
import { ConditionType } from '../../../enums/condition-type';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { DamageType } from '../../../enums/damage-type';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { DropdownButton } from '../../controls/dropdown-button/dropdown-button';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { Expander } from '../../controls/expander/expander';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { FeaturePanel } from '../elements/feature-panel/feature-panel';
import { FeatureType } from '../../../enums/feature-type';
import { Field } from '../../controls/field/field';
import { FormatLogic } from '../../../logic/format-logic';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { Options } from '../../../models/options';
import { PanelMode } from '../../../enums/panel-mode';
import { PerkList } from '../../../enums/perk-list';
import { SkillList } from '../../../enums/skill-list';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookLogic } from '../../../logic/sourcebook-logic';
import { Toggle } from '../../controls/toggle/toggle';
import { Utils } from '../../../utils/utils';

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
	const setValue = (feature: Feature, value: number) => {
		const copy = Utils.copy(feature) as FeatureAncestryFeatureChoice;
		copy.data.value = value;
		copy.data.selected = null;
		props.setFeature(feature.id, copy);
	};

	const setCharacteristic = (feature: Feature, value: Characteristic) => {
		const copy = Utils.copy(feature) as FeatureCharacteristicBonus;
		copy.data.characteristic = value;
		copy.name = `${copy.data.characteristic} + ${copy.data.value}`;
		props.setFeature(feature.id, copy);
	};

	const setCharacteristicBonus = (feature: Feature, value: number) => {
		const copy = Utils.copy(feature) as FeatureCharacteristicBonus;
		copy.data.value = value;
		copy.name = `${copy.data.characteristic} + ${copy.data.value}`;
		props.setFeature(feature.id, copy);
	};

	const setValueField = (feature: Feature, value: FeatureField) => {
		const copy = Utils.copy(feature) as FeatureBonus;
		copy.data.field = value;
		copy.name = `${copy.data.field} ${FormatLogic.getModifier(copy.data)}`;
		props.setFeature(feature.id, copy);
	};

	const setValueBonus = (feature: Feature, value: number) => {
		const copy = Utils.copy(feature) as FeatureBonus;
		copy.data.value = value;
		copy.name = `${copy.data.field} ${FormatLogic.getModifier(copy.data)}`;
		props.setFeature(feature.id, copy);
	};

	const setValuePerLevel = (feature: Feature, value: number) => {
		const copy = Utils.copy(feature) as FeatureBonus;
		copy.data.valuePerLevel = value;
		copy.name = `${copy.data.field} ${FormatLogic.getModifier(copy.data)}`;
		props.setFeature(feature.id, copy);
	};

	const setValuePerEchelon = (feature: Feature, value: number) => {
		const copy = Utils.copy(feature) as FeatureBonus;
		copy.data.valuePerEchelon = value;
		copy.name = `${copy.data.field} ${FormatLogic.getModifier(copy.data)}`;
		props.setFeature(feature.id, copy);
	};

	const setValueCharacteristics = (feature: Feature, value: Characteristic[]) => {
		const copy = Utils.copy(feature) as FeatureBonus;
		copy.data.valueCharacteristics = value;
		copy.name = `${copy.data.field} ${FormatLogic.getModifier(copy.data)}`;
		props.setFeature(feature.id, copy);
	};

	const setDamageModifierDamageType = (feature: Feature, value: DamageType) => {
		const copy = Utils.copy(feature) as FeatureDamageModifier;
		copy.data.modifiers[0].damageType = value;
		copy.name = FormatLogic.getDamageModifier(copy.data.modifiers[0]);
		props.setFeature(feature.id, copy);
	};

	const setDamageModifierType = (feature: Feature, value: DamageModifierType) => {
		const copy = Utils.copy(feature) as FeatureDamageModifier;
		copy.data.modifiers[0].type = value;
		copy.name = FormatLogic.getDamageModifier(copy.data.modifiers[0]);
		props.setFeature(feature.id, copy);
	};

	const setDamageModifierBonus = (feature: Feature, value: number) => {
		const copy = Utils.copy(feature) as FeatureDamageModifier;
		copy.data.modifiers[0].value = value;
		copy.name = FormatLogic.getDamageModifier(copy.data.modifiers[0]);
		props.setFeature(feature.id, copy);
	};

	const setDamageModifierValuePerLevel = (feature: Feature, value: number) => {
		const copy = Utils.copy(feature) as FeatureDamageModifier;
		copy.data.modifiers[0].valuePerLevel = value;
		copy.name = FormatLogic.getDamageModifier(copy.data.modifiers[0]);
		props.setFeature(feature.id, copy);
	};

	const setDamageModifierValuePerEchelon = (feature: Feature, value: number) => {
		const copy = Utils.copy(feature) as FeatureDamageModifier;
		copy.data.modifiers[0].valuePerEchelon = value;
		copy.name = FormatLogic.getDamageModifier(copy.data.modifiers[0]);
		props.setFeature(feature.id, copy);
	};

	const setDamageModifierCharacteristics = (feature: Feature, value: Characteristic[]) => {
		const copy = Utils.copy(feature) as FeatureDamageModifier;
		copy.data.modifiers[0].valueCharacteristics = value;
		copy.name = FormatLogic.getDamageModifier(copy.data.modifiers[0]);
		props.setFeature(feature.id, copy);
	};

	const setClassID = (feature: Feature, value: string) => {
		const copy = Utils.copy(feature) as FeatureClassAbility;
		copy.data.classID = value === '' ? undefined : value;
		copy.data.selectedIDs = [];
		props.setFeature(feature.id, copy);
	};

	const setCost = (feature: Feature, value: number | 'signature') => {
		const copy = Utils.copy(feature) as FeatureClassAbility;
		copy.data.cost = value;
		copy.data.selectedIDs = [];
		props.setFeature(feature.id, copy);
	};

	const setConditionTypes = (feature: Feature, value: ConditionType[]) => {
		const copy = Utils.copy(feature) as FeatureConditionImmunity;
		copy.data.conditions = value;
		props.setFeature(feature.id, copy);
	};

	const setPerkLists = (feature: Feature, value: PerkList[]) => {
		const copy = Utils.copy(feature) as FeaturePerk;
		copy.data.lists = value;
		copy.data.selected = [];
		props.setFeature(feature.id, copy);
	};

	const setSkillLists = (feature: Feature, value: SkillList[]) => {
		const copy = Utils.copy(feature) as FeatureSkillChoice;
		copy.data.listOptions = value;
		copy.data.selected = [];
		props.setFeature(feature.id, copy);
	};

	const setEchelon = (feature: Feature, value: number) => {
		const copy = Utils.copy(feature) as FeatureTitleChoice;
		copy.data.echelon = value;
		copy.data.selected = [];
		props.setFeature(feature.id, copy);
	};

	const setCustomAncestryID = (feature: Feature, value: string) => {
		const copy = Utils.copy(feature) as FeatureAncestryFeatureChoice;
		copy.data.source.customID = value;
		copy.data.selected = null;
		props.setFeature(feature.id, copy);
	};

	const getEditSection = (feature: Feature) => {
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
							onChange={id => setCustomAncestryID(feature, id)}
						/>
						<HeaderText>Point Cost</HeaderText>
						<NumberSpin min={1} max={2} value={feature.data.value} onChange={value => setValue(feature, value)} />
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
							onChange={field => setValueField(feature, field)}
						/>
						<HeaderText>Value</HeaderText>
						<NumberSpin label='Value' min={0} value={feature.data.value} onChange={value => setValueBonus(feature, value)} />
						<NumberSpin label='Per Level After 1st' min={0} value={feature.data.valuePerLevel} onChange={value => setValuePerLevel(feature, value)} />
						<NumberSpin label='Per Echelon' min={0} value={feature.data.valuePerEchelon} onChange={value => setValuePerEchelon(feature, value)} />
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
							onChange={value => setValueCharacteristics(feature, value)}
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
							onChange={ch => setCharacteristic(feature, ch)}
						/>
						<HeaderText>Value</HeaderText>
						<NumberSpin label='Value' min={0} value={feature.data.value} onChange={value => setCharacteristicBonus(feature, value)} />
					</div>
				);
			case FeatureType.ClassAbility:
				return (
					<div>
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
							value={feature.data.classID || ''}
							onChange={id => setClassID(feature, id)}
						/>
						<HeaderText>Ability Cost</HeaderText>
						<Toggle label='Signature' value={feature.data.cost === 'signature'} onChange={value => setCost(feature, value ? 'signature' : 3)} />
						{feature.data.cost !== 'signature' ? <NumberSpin min={3} max={7} steps={[ 2 ]} value={feature.data.cost} onChange={value => setCost(feature, value)} /> : null}
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
						onChange={value => setConditionTypes(feature, value)}
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
							onChange={value => setDamageModifierDamageType(feature, value)}
						/>
						<Segmented
							block={true}
							options={[ DamageModifierType.Immunity, DamageModifierType.Weakness ].map(o => ({ label: o, value: o }))}
							value={feature.data.modifiers[0].type}
							onChange={value => setDamageModifierType(feature, value)}
						/>
						<HeaderText>Value</HeaderText>
						<NumberSpin label='Value' min={0} value={feature.data.modifiers[0].value} onChange={value => setDamageModifierBonus(feature, value)} />
						<NumberSpin label='Per Level After 1st' min={0} value={feature.data.modifiers[0].valuePerLevel} onChange={value => setDamageModifierValuePerLevel(feature, value)} />
						<NumberSpin label='Per Echelon' min={0} value={feature.data.modifiers[0].valuePerEchelon} onChange={value => setDamageModifierValuePerEchelon(feature, value)} />
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
							onChange={value => setDamageModifierCharacteristics(feature, value)}
						/>
					</Space>
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
							onChange={lists => setPerkLists(feature, lists)}
						/>
					</div>
				);
			case FeatureType.SkillChoice:
				return (
					<div>
						<HeaderText>Skill List</HeaderText>
						<Select
							style={{ width: '100%' }}
							mode='multiple'
							allowClear={true}
							placeholder='List'
							options={[ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ].map(pl => ({ label: pl, value: pl }))}
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
							value={feature.data.listOptions}
							onChange={lists => setSkillLists(feature, lists)}
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
							onChange={value => setEchelon(feature, value)}
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
										[ FeatureType.Bonus, FeatureType.ConditionImmunity, FeatureType.DamageModifier ].includes(f.type) ?
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
					{props.hero.features.filter(f => f.id !== 'default-language').length > 0 ? <Divider /> : null}
					<DropdownButton
						label='Add a new feature'
						items={[
							{ key: 'ancestry', label: <div className='ds-text centered-text'>Ancestry Feature</div> },
							{ key: 'characteristic-bonus', label: <div className='ds-text centered-text'>Characteristic Bonus</div> },
							{ key: 'class-ability', label: <div className='ds-text centered-text'>Class Ability</div> },
							{ key: 'companion', label: <div className='ds-text centered-text'>Companion</div> },
							{ key: 'condition-immunity', label: <div className='ds-text centered-text'>Condition Immunity</div> },
							{ key: 'damage-mod', label: <div className='ds-text centered-text'>Immunity / Weakness</div> },
							{ key: 'kit', label: <div className='ds-text centered-text'>Kit</div> },
							{ key: 'language', label: <div className='ds-text centered-text'>Language</div> },
							{ key: 'mount', label: <div className='ds-text centered-text'>Mount</div> },
							{ key: 'perk', label: <div className='ds-text centered-text'>Perk</div> },
							{ key: 'retainer', label: <div className='ds-text centered-text'>Retainer</div> },
							{ key: 'skill', label: <div className='ds-text centered-text'>Skill</div> },
							{ key: 'stat-bonus', label: <div className='ds-text centered-text'>Stat Bonus</div> },
							{ key: 'title', label: <div className='ds-text centered-text'>Title</div> }
						]}
						onClick={key => {
							let feature = null;
							switch (key) {
								case 'ancestry':
									feature = FactoryLogic.feature.createAncestryFeature({
										id: Utils.guid(),
										value: 1,
										current: true,
										former: true,
										customID: ''
									});
									break;
								case 'characteristic-bonus':
									feature = FactoryLogic.feature.createCharacteristicBonus({
										id: Utils.guid(),
										name: `${Characteristic.Might} + 1`,
										characteristic: Characteristic.Might,
										value: 1
									});
									break;
								case 'class-ability':
									feature = FactoryLogic.feature.createClassAbilityChoice({
										id: Utils.guid(),
										cost: 'signature'
									});
									break;
								case 'companion':
									feature = FactoryLogic.feature.createCompanion({
										id: Utils.guid(),
										type: 'companion'
									});
									break;
								case 'condition-immunity':
									feature = FactoryLogic.feature.createConditionImmunity({
										id: Utils.guid(),
										conditions: []
									});
									break;
								case 'damage-mod':
									feature = FactoryLogic.feature.createDamageModifier({
										id: Utils.guid(),
										modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 2 }) ]
									});
									break;
								case 'kit':
									feature = FactoryLogic.feature.createKitChoice({
										id: Utils.guid()
									});
									break;
								case 'language':
									feature = FactoryLogic.feature.createLanguageChoice({
										id: Utils.guid()
									});
									break;
								case 'mount':
									feature = FactoryLogic.feature.createCompanion({
										id: Utils.guid(),
										type: 'mount'
									});
									break;
								case 'perk':
									feature = FactoryLogic.feature.createPerk({
										id: Utils.guid(),
										lists: [ PerkList.Crafting, PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural ]
									});
									break;
								case 'retainer':
									feature = FactoryLogic.feature.createCompanion({
										id: Utils.guid(),
										type: 'retainer'
									});
									break;
								case 'skill':
									feature = FactoryLogic.feature.createSkillChoice({
										id: Utils.guid(),
										listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
									});
									break;
								case 'stat-bonus':
									feature = FactoryLogic.feature.createBonus({
										id: Utils.guid(),
										name: `${FeatureField.Stamina} + 6`,
										field: FeatureField.Stamina,
										value: 6
									});
									break;
								case 'title':
									feature = FactoryLogic.feature.createTitleChoice({
										id: Utils.guid(),
										echelon: 1
									});
									break;
							}
							if (feature) {
								props.addFeature(feature);
							}
						}}
					/>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
