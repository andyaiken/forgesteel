import { Feature, FeatureData } from '@/models/feature';
import { FeatureType } from '@/enums/feature-type';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';

import { ConfigAncestryChoice, InfoAncestryChoice } from '@/components/features/feature-data/ancestry-choice';
import { ConfigAncestryFeatureChoice, EditAncestryFeatureChoice, InfoAncestryFeatureChoice } from '@/components/features/feature-data/ancestry-feature-choice';
import { ConfigChoice, EditChoice, InfoChoice } from '@/components/features/feature-data/choice';
import { ConfigClassAbility, EditClassAbility, InfoClassAbility } from '@/components/features/feature-data/class-ability';
import { ConfigCompanion, InfoCompanion } from '@/components/features/feature-data/companion';
import { ConfigDomain, EditDomain, InfoDomain } from '@/components/features/feature-data/domain';
import { ConfigDomainFeature, EditDomainFeature, InfoDomainFeature } from '@/components/features/feature-data/domain-feature';
import { ConfigItemChoice, EditItemChoice, InfoItemChoice } from '@/components/features/feature-data/item-choice';
import { ConfigKit, EditKit, InfoKit } from '@/components/features/feature-data/kit';
import { ConfigLanguageChoice, EditLanguageChoice, InfoLanguageChoice } from '@/components/features/feature-data/language-choice';
import { ConfigPerk, EditPerk, InfoPerk } from '@/components/features/feature-data/perk';
import { ConfigRetainer, InfoRetainer } from '@/components/features/feature-data/retainer';
import { ConfigSkillChoice, EditSkillChoice, InfoSkillChoice } from '@/components/features/feature-data/skill-choice';
import { ConfigSummonChoice, EditSummonChoice, InfoSummonChoice } from '@/components/features/feature-data/summon-choice';
import { ConfigTaggedFeatureChoice, EditTaggedFeatureChoice, InfoTaggedFeatureChoice } from '@/components/features/feature-data/tagged-feature-choice';
import { ConfigTitleChoice, EditTitleChoice, InfoTitleChoice } from '@/components/features/feature-data/title-choice';
import { EditAbilityCost, InfoAbilityCost } from '@/components/features/feature-data/ability-cost';
import { EditAbilityDamage, InfoAbilityDamage } from '@/components/features/feature-data/ability-damage';
import { EditAbilityDistance, InfoAbilityDistance } from '@/components/features/feature-data/ability-distance';
import { EditBonus, InfoBonus } from '@/components/features/feature-data/bonus';
import { EditCharacteristicBonus, InfoCharacteristicBonus } from '@/components/features/feature-data/characteristic-bonus';
import { EditConditionImmunity, InfoConditionImmunity } from '@/components/features/feature-data/condition-immunity';
import { EditDamageModifier, InfoDamageModifier } from '@/components/features/feature-data/damage-modifier';
import { EditFixture, InfoFixture } from '@/components/features/feature-data/fixture';
import { EditHeroicResource, InfoHeroicResource } from '@/components/features/feature-data/heroic-resource';
import { EditHeroicResourceGain, InfoHeroicResourceGain } from '@/components/features/feature-data/heroic-resource-gain';
import { EditLanguage, InfoLanguage } from '@/components/features/feature-data/language';
import { EditMalice, InfoMalice } from '@/components/features/feature-data/malice';
import { EditMovementMode, InfoMovementMode } from '@/components/features/feature-data/movement-mode';
import { EditMultiple, InfoMultiple } from '@/components/features/feature-data/multiple';
import { EditPackage, InfoPackage } from '@/components/features/feature-data/package';
import { EditProficiency, InfoProficiency } from '@/components/features/feature-data/proficiency';
import { EditSaveThreshold, InfoSaveThreshold } from '@/components/features/feature-data/save-threshold';
import { EditSize, InfoSize } from '@/components/features/feature-data/size';
import { EditSpeed, InfoSpeed } from '@/components/features/feature-data/speed';
import { EditSummon, InfoSummon } from '@/components/features/feature-data/summon';
import { EditTaggedFeature, InfoTaggedFeature } from '@/components/features/feature-data/tagged-feature';
import { EditAbilityData } from '@/components/features/feature-data/ability';
import { EditAddOn } from '@/components/features/feature-data/addon';
import { EditMaliceAbility } from '@/components/features/feature-data/malice-ability';
import { EditPackageContent } from '@/components/features/feature-data/package-content';

interface InfoProps {
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoFeature = (props: InfoProps) => {
	switch (props.feature.type) {
		case FeatureType.AbilityCost:
			return <InfoAbilityCost data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.AbilityDamage:
			return <InfoAbilityDamage data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.AbilityDistance:
			return <InfoAbilityDistance data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.AncestryChoice:
			return <InfoAncestryChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.AncestryFeatureChoice:
			return <InfoAncestryFeatureChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.Bonus:
			return <InfoBonus data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.CharacteristicBonus:
			return <InfoCharacteristicBonus data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.Choice:
			return <InfoChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.ClassAbility:
			return <InfoClassAbility data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.Companion:
			return <InfoCompanion data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.ConditionImmunity:
			return <InfoConditionImmunity data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.DamageModifier:
			return <InfoDamageModifier data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.Domain:
			return <InfoDomain data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.DomainFeature:
			return <InfoDomainFeature data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.Fixture:
			return <InfoFixture data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.HeroicResource:
			return <InfoHeroicResource data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.HeroicResourceGain:
			return <InfoHeroicResourceGain data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.ItemChoice:
			return <InfoItemChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.Kit:
			return <InfoKit data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.Language:
			return <InfoLanguage data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.LanguageChoice:
			return <InfoLanguageChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.Malice:
			return <InfoMalice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.MovementMode:
			return <InfoMovementMode data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.Multiple:
			return <InfoMultiple data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.Package:
			return <InfoPackage data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.Perk:
			return <InfoPerk data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.Proficiency:
			return <InfoProficiency data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.Retainer:
			return <InfoRetainer data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.SaveThreshold:
			return <InfoSaveThreshold data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.Size:
			return <InfoSize data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.SkillChoice:
			return <InfoSkillChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.Speed:
			return <InfoSpeed data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.Summon:
			return <InfoSummon data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.SummonChoice:
			return <InfoSummonChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.TaggedFeature:
			return <InfoTaggedFeature data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.TaggedFeatureChoice:
			return <InfoTaggedFeatureChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		case FeatureType.TitleChoice:
			return <InfoTitleChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
	}

	return null;
};

interface EditProps {
	feature: Feature;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureData) => void;
}

export const EditFeature = (props: EditProps) => {
	switch (props.feature.type) {
		case FeatureType.Ability:
			return <EditAbilityData data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.AbilityCost:
			return <EditAbilityCost data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.AbilityDamage:
			return <EditAbilityDamage data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.AbilityDistance:
			return <EditAbilityDistance data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.AddOn:
			return <EditAddOn data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.AncestryFeatureChoice:
			return <EditAncestryFeatureChoice data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Bonus:
			return <EditBonus data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.CharacteristicBonus:
			return <EditCharacteristicBonus data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Choice:
			return <EditChoice data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.ClassAbility:
			return <EditClassAbility data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.ConditionImmunity:
			return <EditConditionImmunity data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.DamageModifier:
			return <EditDamageModifier data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Domain:
			return <EditDomain data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.DomainFeature:
			return <EditDomainFeature data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Fixture:
			return <EditFixture data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.HeroicResource:
			return <EditHeroicResource data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.HeroicResourceGain:
			return <EditHeroicResourceGain data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.ItemChoice:
			return <EditItemChoice data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Kit:
			return <EditKit data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Language:
			return <EditLanguage data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.LanguageChoice:
			return <EditLanguageChoice data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Malice:
			return <EditMalice data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.MaliceAbility:
			return <EditMaliceAbility data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.MovementMode:
			return <EditMovementMode data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Multiple:
			return <EditMultiple data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Package:
			return <EditPackage data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.PackageContent:
			return <EditPackageContent data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Perk:
			return <EditPerk data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Proficiency:
			return <EditProficiency data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.SaveThreshold:
			return <EditSaveThreshold data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Size:
			return <EditSize data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.SkillChoice:
			return <EditSkillChoice data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Speed:
			return <EditSpeed data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Summon:
			return <EditSummon data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.SummonChoice:
			return <EditSummonChoice data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.TaggedFeature:
			return <EditTaggedFeature data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.TaggedFeatureChoice:
			return <EditTaggedFeatureChoice data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.TitleChoice:
			return <EditTitleChoice data={props.feature.data} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
	}

	return null;
};

interface ConfigProps {
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureData) => void;
}

export const ConfigFeature = (props: ConfigProps) => {
	switch (props.feature.type) {
		case FeatureType.AncestryChoice:
			return <ConfigAncestryChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.AncestryFeatureChoice:
			return <ConfigAncestryFeatureChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Choice:
			return <ConfigChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.ClassAbility:
			return <ConfigClassAbility data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Companion:
			return <ConfigCompanion data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Domain:
			return <ConfigDomain data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.DomainFeature:
			return <ConfigDomainFeature data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.ItemChoice:
			return <ConfigItemChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Kit:
			return <ConfigKit data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.LanguageChoice:
			return <ConfigLanguageChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Perk:
			return <ConfigPerk data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.Retainer:
			return <ConfigRetainer data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.SkillChoice:
			return <ConfigSkillChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.SummonChoice:
			return <ConfigSummonChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.TaggedFeatureChoice:
			return <ConfigTaggedFeatureChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
		case FeatureType.TitleChoice:
			return <ConfigTitleChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={props.setData} />;
	}

	return null;
};
