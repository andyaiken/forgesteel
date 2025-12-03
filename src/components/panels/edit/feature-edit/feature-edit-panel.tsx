import { Button, Drawer, Flex, Input, Select, Tabs } from 'antd';
import { Feature, FeatureData } from '@/models/feature';
import { EditAbilityCost } from '@/components/panels/feature-data/ability-cost';
import { EditAbilityDamage } from '@/components/panels/feature-data/ability-damage';
import { EditAbilityData } from '@/components/panels/feature-data/ability';
import { EditAbilityDistance } from '@/components/panels/feature-data/ability-distance';
import { EditAddOn } from '@/components/panels/feature-data/addon';
import { EditAncestryFeatureChoice } from '@/components/panels/feature-data/ancestry-feature-choice';
import { EditBonus } from '@/components/panels/feature-data/bonus';
import { EditCharacteristicBonus } from '@/components/panels/feature-data/characteristic-bonus';
import { EditChoice } from '@/components/panels/feature-data/choice';
import { EditClassAbility } from '@/components/panels/feature-data/class-ability';
import { EditConditionImmunity } from '@/components/panels/feature-data/condition-immunity';
import { EditDamageModifier } from '@/components/panels/feature-data/damage-modifier';
import { EditDomain } from '@/components/panels/feature-data/domain';
import { EditDomainFeature } from '@/components/panels/feature-data/domain-feature';
import { EditFixture } from '@/components/panels/feature-data/fixture';
import { EditHeroicResource } from '@/components/panels/feature-data/heroic-resource';
import { EditHeroicResourceGain } from '@/components/panels/feature-data/heroic-resource-gain';
import { EditItemChoice } from '@/components/panels/feature-data/item-choice';
import { EditKit } from '@/components/panels/feature-data/kit';
import { EditLanguage } from '@/components/panels/feature-data/language';
import { EditLanguageChoice } from '@/components/panels/feature-data/language-choice';
import { EditMalice } from '@/components/panels/feature-data/malice';
import { EditMaliceAbility } from '@/components/panels/feature-data/malice-ability';
import { EditMovementMode } from '@/components/panels/feature-data/movement-mode';
import { EditMultiple } from '@/components/panels/feature-data/multiple';
import { EditOutlined } from '@ant-design/icons';
import { EditPackage } from '@/components/panels/feature-data/package';
import { EditPackageContent } from '@/components/panels/feature-data/package-content';
import { EditPerk } from '@/components/panels/feature-data/perk';
import { EditProficiency } from '@/components/panels/feature-data/proficiency';
import { EditSaveThreshold } from '@/components/panels/feature-data/save-threshold';
import { EditSize } from '@/components/panels/feature-data/size';
import { EditSkillChoice } from '@/components/panels/feature-data/skill-choice';
import { EditSpeed } from '@/components/panels/feature-data/speed';
import { EditSummon } from '@/components/panels/feature-data/summon';
import { EditSummonChoice } from '@/components/panels/feature-data/summon-choice';
import { EditTaggedFeature } from '@/components/panels/feature-data/tagged-feature';
import { EditTaggedFeatureChoice } from '@/components/panels/feature-data/tagged-feature-choice';
import { EditTitleChoice } from '@/components/panels/feature-data/title-choice';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureType } from '@/enums/feature-type';
import { FeatureTypeSelectModal } from '@/components/modals/select/feature-type-select/feature-type-select-modal';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { Perk } from '@/models/perk';
import { PerkList } from '@/enums/perk-list';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './feature-edit-panel.scss';

interface Props {
	feature: Feature | Perk;
	allowedTypes?: FeatureType[];
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (feature: Feature) => void;
}

export const FeatureEditPanel = (props: Props) => {
	const [ feature, setFeature ] = useState<Feature | Perk>(props.feature);
	const [ typeSelectorVisible, setTypeSelectorVisible ] = useState<boolean>(false);

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
		const copy = Utils.copy(feature);
		copy.type = value;
		copy.data = FeatureLogic.getFeatureData(value);
		setFeature(copy);
		props.onChange(copy);
	};

	const setList = (value: PerkList) => {
		const copy = Utils.copy(feature) as Perk;
		copy.list = value;
		setFeature(copy);
		props.onChange(copy);
	};

	const getDataSection = () => {
		const setData = (value: FeatureData) => {
			const copy = Utils.copy(feature);
			copy.data = value;
			setFeature(copy);
			props.onChange(copy);
		};

		switch (feature.type) {
			case FeatureType.Ability:
				return <EditAbilityData data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.AbilityCost:
				return <EditAbilityCost data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.AbilityDamage:
				return <EditAbilityDamage data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.AbilityDistance:
				return <EditAbilityDistance data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.AddOn:
				return <EditAddOn data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.AncestryChoice:
				return null;
			case FeatureType.AncestryFeatureChoice:
				return <EditAncestryFeatureChoice data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.Bonus:
				return <EditBonus data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.CharacteristicBonus:
				return <EditCharacteristicBonus data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.Choice:
				return <EditChoice data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.ClassAbility:
				return <EditClassAbility data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.ConditionImmunity:
				return <EditConditionImmunity data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.DamageModifier:
				return <EditDamageModifier data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.Domain:
				return <EditDomain data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.DomainFeature:
				return <EditDomainFeature data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.Fixture:
				return <EditFixture data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.HeroicResource:
				return <EditHeroicResource data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.HeroicResourceGain:
				return <EditHeroicResourceGain data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.ItemChoice:
				return <EditItemChoice data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.Kit:
				return <EditKit data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.Language:
				return <EditLanguage data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.LanguageChoice:
				return <EditLanguageChoice data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.Malice:
				return <EditMalice data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.MaliceAbility:
				return <EditMaliceAbility data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.MovementMode:
				return <EditMovementMode data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.Multiple:
				return <EditMultiple data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.Package:
				return <EditPackage data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.PackageContent:
				return <EditPackageContent data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.Perk:
				return <EditPerk data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.Proficiency:
				return <EditProficiency data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.SaveThreshold:
				return <EditSaveThreshold data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.Size:
				return <EditSize data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.SkillChoice:
				return <EditSkillChoice data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.Speed:
				return <EditSpeed data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.Summon:
				return <EditSummon data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.SummonChoice:
				return <EditSummonChoice data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.TaggedFeature:
				return <EditTaggedFeature data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.TaggedFeatureChoice:
				return <EditTaggedFeatureChoice data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
			case FeatureType.Text:
				return null;
			case FeatureType.TitleChoice:
				return <EditTitleChoice data={feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={setData} />;
		}
	};

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
									<MarkdownEditor value={feature.description} onChange={setDescription} />
								</div>
							)
						},
						{
							key: '2',
							label: 'Details',
							children: (
								<div>
									{
										(props.allowedTypes || FeatureLogic.getSelectableFeatureTypes()).length !== 1 ?
											<>
												<HeaderText>Feature Type</HeaderText>
												<Flex align='center' justify='space-between'>
													<Field label={feature.type} value={FeatureLogic.getFeatureTypeDescription(feature.type)} />
													<Button onClick={() => setTypeSelectorVisible(true)}>
														<EditOutlined />
														Change
													</Button>
												</Flex>
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
			<Drawer open={typeSelectorVisible} onClose={() => setTypeSelectorVisible(false)} closeIcon={null} size={500}>
				<FeatureTypeSelectModal
					types={props.allowedTypes || FeatureLogic.getSelectableFeatureTypes()}
					onSelect={type => { setType(type); setTypeSelectorVisible(false); }}
					onClose={() => setTypeSelectorVisible(false)}
				/>
			</Drawer>
		</ErrorBoundary>
	);
};
