import { Divider, Select } from 'antd';
import { Feature, FeatureAncestryFeatureChoice, FeatureBonus, FeatureClassAbility, FeatureData, FeaturePerk, FeatureSkillChoice } from '../../../models/feature';
import { Characteristic } from '../../../enums/characteristic';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { DropdownButton } from '../../controls/dropdown-button/dropdown-button';
import { Expander } from '../../controls/expander/expander';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { FeaturePanel } from '../elements/feature-panel/feature-panel';
import { FeatureType } from '../../../enums/feature-type';
import { FormatLogic } from '../../../logic/format-logic';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { PanelMode } from '../../../enums/panel-mode';
import { PerkList } from '../../../enums/perk-list';
import { SkillList } from '../../../enums/skill-list';
import { Sourcebook } from '../../../models/sourcebook';
import { Toggle } from '../../controls/toggle/toggle';
import { Utils } from '../../../utils/utils';

import './hero-customize-panel.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	addFeature: (feature: Feature) => void;
	deleteFeature: (feature: Feature) => void;
	setFeature: (featureID: string, feature: Feature) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

export const HeroCustomizePanel = (props: Props) => {
	const setValue = (feature: Feature, value: number) => {
		const copy = JSON.parse(JSON.stringify(feature)) as FeatureAncestryFeatureChoice;
		copy.data.value = value;
		copy.data.selected = null;
		props.setFeature(feature.id, copy);
	};

	const setValueField = (feature: Feature, value: FeatureField) => {
		const copy = JSON.parse(JSON.stringify(feature)) as FeatureBonus;
		copy.data.field = value;
		copy.name = `${copy.data.field} ${FormatLogic.getModifier(copy.data)}`;
		props.setFeature(feature.id, copy);
	};

	const setValueBonus = (feature: Feature, value: number) => {
		const copy = JSON.parse(JSON.stringify(feature)) as FeatureBonus;
		copy.data.value = value;
		copy.name = `${copy.data.field} ${FormatLogic.getModifier(copy.data)}`;
		props.setFeature(feature.id, copy);
	};

	const setValuePerLevel = (feature: Feature, value: number) => {
		const copy = JSON.parse(JSON.stringify(feature)) as FeatureBonus;
		copy.data.valuePerLevel = value;
		copy.name = `${copy.data.field} ${FormatLogic.getModifier(copy.data)}`;
		props.setFeature(feature.id, copy);
	};

	const setValuePerEchelon = (feature: Feature, value: number) => {
		const copy = JSON.parse(JSON.stringify(feature)) as FeatureBonus;
		copy.data.valuePerEchelon = value;
		copy.name = `${copy.data.field} ${FormatLogic.getModifier(copy.data)}`;
		props.setFeature(feature.id, copy);
	};

	const setValueCharacteristics = (feature: Feature, value: Characteristic[]) => {
		const copy = JSON.parse(JSON.stringify(feature)) as FeatureBonus;
		copy.data.valueCharacteristics = value;
		copy.name = `${copy.data.field} ${FormatLogic.getModifier(copy.data)}`;
		props.setFeature(feature.id, copy);
	};

	const setCost = (feature: Feature, value: number | 'signature') => {
		const copy = JSON.parse(JSON.stringify(feature)) as FeatureClassAbility;
		copy.data.cost = value;
		copy.data.selectedIDs = [];
		props.setFeature(feature.id, copy);
	};

	const setPerkLists = (feature: Feature, value: PerkList[]) => {
		const copy = JSON.parse(JSON.stringify(feature)) as FeaturePerk;
		copy.data.lists = value;
		copy.data.selected = [];
		props.setFeature(feature.id, copy);
	};

	const setSkillLists = (feature: Feature, value: SkillList[]) => {
		const copy = JSON.parse(JSON.stringify(feature)) as FeatureSkillChoice;
		copy.data.listOptions = value;
		copy.data.selected = [];
		props.setFeature(feature.id, copy);
	};

	const getEditSection = (feature: Feature) => {
		switch (feature.type) {
			case FeatureType.AncestryFeatureChoice:
				return (
					<div>
						<HeaderText>Point Cost</HeaderText>
						<NumberSpin min={1} max={2} value={feature.data.value} onChange={value => setValue(feature, value)} />
					</div>
				);
			case FeatureType.Bonus:
				return (
					<div>
						<HeaderText>Field</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Select field'
							options={[ FeatureField.Disengage, FeatureField.ProjectPoints, FeatureField.Recoveries, FeatureField.RecoveryValue, FeatureField.Renown, FeatureField.Speed, FeatureField.Stability, FeatureField.Stamina, FeatureField.Wealth ].map(o => ({ value: o }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
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
							value={feature.data.valueCharacteristics}
							onChange={value => setValueCharacteristics(feature, value)}
						/>
					</div>
				);
			case FeatureType.ClassAbility:
				return (
					<div>
						<HeaderText>Ability Cost</HeaderText>
						<Toggle label='Signature' value={feature.data.cost === 'signature'} onChange={value => setCost(feature, value ? 'signature' : 3)} />
						{feature.data.cost !== 'signature' ? <NumberSpin min={3} max={7} steps={[ 2 ]} value={feature.data.cost} onChange={value => setCost(feature, value)} /> : null}
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
							value={feature.data.listOptions}
							onChange={lists => setSkillLists(feature, lists)}
						/>
					</div>
				);
		}

		return null;
	};

	try {
		return (
			<div className='hero-customize-panel'>
				{
					props.hero.features.filter(f => f.id !== 'default-language').map(f => (
						<Expander
							key={f.id}
							title={f.name}
							extra={[
								<DangerButton key='delete' mode='icon' onConfirm={() => props.deleteFeature(f)} />
							]}
						>
							{getEditSection(f)}
							{
								f.type !== FeatureType.Bonus ?
									<FeaturePanel
										feature={f}
										hero={props.hero}
										sourcebooks={props.sourcebooks}
										mode={PanelMode.Full}
										setData={props.setFeatureData}
									/>
									: null
							}
						</Expander>
					))
				}
				{props.hero.features.filter(f => f.id !== 'default-language').length > 0 ? <Divider /> : null}
				<DropdownButton
					label='Add a new feature'
					items={[
						{ key: 'ancestry', label: <div className='ds-text centered-text'>Ancestry Feature</div> },
						{ key: 'bonus', label: <div className='ds-text centered-text'>Bonus</div> },
						{ key: 'class-ability', label: <div className='ds-text centered-text'>Class Ability</div> },
						{ key: 'language', label: <div className='ds-text centered-text'>Language</div> },
						{ key: 'perk', label: <div className='ds-text centered-text'>Perk</div> },
						{ key: 'skill', label: <div className='ds-text centered-text'>Skill</div> },
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
									former: true
								});
								break;
							case 'bonus':
								feature = FactoryLogic.feature.createBonus({
									id: Utils.guid(),
									name: `${FeatureField.Stamina} + 6`,
									field: FeatureField.Stamina,
									value: 6
								});
								break;
							case 'class-ability':
								feature = FactoryLogic.feature.createClassAbilityChoice({
									id: Utils.guid(),
									cost: 'signature'
								});
								break;
							case 'language':
								feature = FactoryLogic.feature.createLanguageChoice({
									id: Utils.guid()
								});
								break;
							case 'perk':
								feature = FactoryLogic.feature.createPerk({
									id: Utils.guid(),
									lists: [ PerkList.Crafting, PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural ]
								});
								break;
							case 'skill':
								feature = FactoryLogic.feature.createSkillChoice({
									id: Utils.guid(),
									listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
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
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
