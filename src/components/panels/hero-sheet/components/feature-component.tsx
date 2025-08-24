import { Feature, FeatureAbility, FeatureAbilityDamage, FeatureAbilityDistance, FeatureAncestryChoice, FeatureBonus, FeatureChoice, FeatureConditionImmunity, FeatureDamageModifier, FeatureDomain, FeatureDomainFeature, FeatureItemChoice, FeatureLanguageChoice, FeaturePackage, FeaturePackageContent, FeaturePerk, FeatureSkillChoice, FeatureText } from '../../../../models/feature';
import { AbilityUsage } from '../../../../enums/ability-usage';
import { CharacterSheetFormatter } from '../../../../utils/character-sheet-formatter';
import { DamageModifier } from '../../../../models/damage-modifier';
import { DamageModifierType } from '../../../../enums/damage-modifier-type';
import { FeatureType } from '../../../../enums/feature-type';
import { Fragment } from 'react';
import { Hero } from '../../../../models/hero';
import { HeroLogic } from '../../../../logic/hero-logic';
import { Markdown } from '../../../controls/markdown/markdown';

import './feature-component.scss';

import abilityMelee from '../../../../assets/icons/sword.svg';
import abilityMeleeRanged from '../../../../assets/icons/melee ranged.svg';
import abilityRanged from '../../../../assets/icons/ranged.svg';
import abilityStar from '../../../../assets/icons/star.svg';
import abilityTriggered from '../../../../assets/icons/trigger-solid.svg';
import targetSelf from '../../../../assets/icons/self.svg';

interface Props {
	feature: Feature;
	hero: Hero,
	additionalClasses?: string[];
}

const BasicFeatureComponent = (feature: Feature) => {
	return (
		<>
			<div className='feature-line'><strong>{`• ${feature.type}: `}</strong>{feature.name}</div>
			{feature.description ?
				<div className='feature-description'>{feature.description}</div>
				: undefined}
		</>
	);
};

const ChoiceFeatureComponent = (feature: FeatureChoice | FeatureLanguageChoice | FeaturePerk | FeatureItemChoice) => {
	let selectedOptions;
	if (feature.data.selected.length > 0) {
		selectedOptions = feature.data.selected.map(s => typeof s === 'string' ? s : s.name).map(s => {
			return (<div className='feature-iteration' key={s}>{s}</div>);
		});
	}
	return (
		<>
			<div className='feature-line'>
				{`• ${feature.data.count} ${CharacterSheetFormatter.pluralize(feature.name, feature.data.count)}`}
			</div>
			{selectedOptions}
		</>
	);
};

const AncestryChoiceFeatureComponent = (feature: FeatureAncestryChoice) => {
	return (
		<>
			<div className='feature-line'>
				<strong>{`• ${feature.type}: `}</strong>{feature.data.selected?.name}
			</div>
		</>
	);
};

const SkillChoiceFeatureComponent = (feature: FeatureSkillChoice) => {
	const lists = feature.data.listOptions.join('/');
	let selectedOptions;
	if (feature.data.selected) {
		selectedOptions = feature.data.selected.map(s => {
			return (<div className='feature-iteration' key={s}>{s}</div>);
		});
	}
	return (
		<>
			<div className='feature-line'>
				{`• ${feature.data.count} ${lists} ${CharacterSheetFormatter.pluralize('Skill', feature.data.count)}`}
			</div>
			{selectedOptions}
		</>
	);
};

const BonusFeatureComponent = (feature: FeatureBonus, hero: Hero) => {
	const value = hero ? HeroLogic.calculateModifierValue(hero, feature.data) : feature.data.value;
	return (
		<>
			<div className='feature-line'><strong>{`• ${feature.name}: `}</strong>{`${feature.data.field} ${CharacterSheetFormatter.addSign(value)}`}</div>
		</>
	);
};

const TextFeatureComponent = (feature: FeatureText | FeaturePackage | FeaturePackageContent) => {
	return (
		<>
			<div className='feature-title'>{feature.name}</div>
			<Markdown
				text={feature.description}
				className='feature-description'
			/>
		</>
	);
};

const AbilityFeatureComponent = (feature: FeatureAbility) => {
	let abilityIcon = abilityStar;
	// Melee / Ranged
	if (feature.data.ability.keywords.includes('Melee')) {
		if (feature.data.ability.keywords.includes('Ranged')) {
			abilityIcon = abilityMeleeRanged;
		} else {
			abilityIcon = abilityMelee;
		}
	} else if (feature.data.ability.keywords.includes('Ranged')) {
		abilityIcon = abilityRanged;
	}

	// Targets
	if (feature.data.ability.target.toLowerCase() === 'self') {
		abilityIcon = targetSelf;
	}

	// Ability Type
	if (feature.data.ability.type.usage === AbilityUsage.Trigger) {
		abilityIcon = abilityTriggered;
	}

	return (
		<>
			<div className='feature-title'><img src={abilityIcon} alt='Ability' />{feature.name}</div>
			<div className='feature-description'><em>{feature.description.replace(/^\s+/, '')}</em></div>
		</>
	);
};

const AbilityModifierComponent = (feature: FeatureAbilityDamage | FeatureAbilityDistance, hero: Hero) => {
	const value = HeroLogic.calculateModifierValue(hero, feature.data);
	const type = feature.type === FeatureType.AbilityDistance ? 'distance' : 'damage';
	return (
		<>
			<div className='feature-title'>{feature.name}</div>
			<div className='feature-description'>{`[${feature.data.keywords.sort(CharacterSheetFormatter.sortKeywords).join(' ')}] Abilities: ${CharacterSheetFormatter.addSign(value)} ${type}`}</div>
		</>
	);
};

const DamageModifierComponent = (feature: FeatureDamageModifier, hero: Hero) => {
	const modifiersMap = feature.data.modifiers.reduce((map, m) => {
		const modifiers = map.get(m.type) || [];
		modifiers.push(m);
		map.set(m.type, modifiers);
		return map;
	}, new Map<DamageModifierType, DamageModifier[]>());

	const modifiers = Array.from(modifiersMap.keys()).map(type => {
		const typeMods = modifiersMap.get(type)?.map(m => {
			return (
				<div className={`feature-iteration damage-type ${m.damageType.toLocaleLowerCase()}`} key={`${m.type}-${m.damageType}`}>
					{m.damageType} {HeroLogic.calculateModifierValue(hero, m)}
				</div>
			);
		});

		return (
			<Fragment key={type}>
				<div className='flex-break' />
				<div className='feature-description'>- {type}: </div>
				{typeMods}
			</Fragment>
		);
	});

	return (
		<>
			<div className='feature-title'>{feature.name}</div>
			{modifiers}
		</>
	);
};

const DomainFeatureComponent = (feature: FeatureDomain | FeatureDomainFeature) => {
	return (
		<>
			<div className='feature-title'>• {feature.type}: {feature.name}</div>
		</>
	);
};

const ConditionImmunityFeatureComponent = (feature: FeatureConditionImmunity) => {
	const immunities = feature.data.conditions.map(c => {
		return (<div className='feature-iteration'>{c.toString()}</div>);
	});
	return (
		<>
			<div className='feature-line'><strong>• {feature.name}</strong>: Immune to </div>
			{immunities}
		</>
	);
};

export const FeatureComponent = (props: Props) => {
	const classes = [ 'feature' ].concat(props.additionalClasses || []).join(' ');
	const feature = props.feature;
	const hero = props.hero;
	let content;
	switch (feature.type) {
		case FeatureType.LanguageChoice:
		case FeatureType.Perk:
		case FeatureType.Choice:
		case FeatureType.ItemChoice:
			content = ChoiceFeatureComponent(feature);
			break;
		case FeatureType.AncestryChoice:
			content = AncestryChoiceFeatureComponent(feature);
			break;
		case FeatureType.SkillChoice:
			content = SkillChoiceFeatureComponent(feature);
			break;
		case FeatureType.Bonus:
			content = BonusFeatureComponent(feature, hero);
			break;
		case FeatureType.Text:
		case FeatureType.Package:
		case FeatureType.PackageContent:
			content = TextFeatureComponent(feature);
			break;
		case FeatureType.Ability:
			content = AbilityFeatureComponent(feature);
			break;
		case FeatureType.AbilityDistance:
		case FeatureType.AbilityDamage:
			content = AbilityModifierComponent(feature, hero);
			break;
		case FeatureType.DamageModifier:
			content = DamageModifierComponent(feature, hero);
			break;
		case FeatureType.Domain:
		case FeatureType.DomainFeature:
			content = DomainFeatureComponent(feature);
			break;
		case FeatureType.ConditionImmunity:
			content = ConditionImmunityFeatureComponent(feature);
			break;
		case FeatureType.Multiple:
			// Do nothing for these since the individual sub-features are also iterated over, no need to double up
			break;
		default:
			content = BasicFeatureComponent(feature);
			break;
	}
	return (
		<div className={classes} key={feature.id}>
			{content}
		</div>
	);
};
