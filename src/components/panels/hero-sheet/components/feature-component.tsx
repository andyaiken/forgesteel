import { Feature, FeatureAbility, FeatureAbilityDamage, FeatureAbilityDistance, FeatureAncestryChoice, FeatureBonus, FeatureCharacteristicBonus, FeatureChoice, FeatureConditionImmunity, FeatureDamageModifier, FeatureDomain, FeatureHeroicResource, FeatureItemChoice, FeatureLanguageChoice, FeaturePackage, FeaturePackageContent, FeaturePerk, FeatureSkillChoice, FeatureText } from '../../../../models/feature';

import { Ability } from '../../../../models/ability';
import { AbilityDistanceType } from '../../../../enums/abiity-distance-type';
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

import areaIcon from '../../../../assets/icons/area-icon.svg';
import burstIcon from '../../../../assets/icons/burst-icon.svg';
import meleeIcon from '../../../../assets/icons/sword.svg';
import meleeRangedIcon from '../../../../assets/icons/melee ranged.svg';
import rangedIcon from '../../../../assets/icons/ranged.svg';
import selfIcon from '../../../../assets/icons/self.svg';
import starIcon from '../../../../assets/icons/star.svg';
import triggerIcon from '../../../../assets/icons/trigger-solid.svg';

interface Props {
	feature: Feature;
	hero: Hero,
	additionalClasses?: string[];
}

const BasicFeatureComponent = (feature: Feature) => {
	// console.warn('Default feature display: ', feature);
	return (
		<>
			<div className='feature-line'><strong>{`• ${feature.type}: `}</strong>{feature.name}</div>
			{feature.description ?
				<div className='feature-description'>{feature.description}</div>
				: undefined}
		</>
	);
};

const ChoiceFeatureComponent = (feature: FeatureChoice | FeatureLanguageChoice | FeaturePerk | FeatureItemChoice, hero: Hero) => {
	let selectedOptions;
	if (feature.data.selected.length > 0) {
		selectedOptions = feature.data.selected.map(s => typeof s === 'string' ? s : s.name).map(s => {
			return (<div className='feature-iteration' key={s}>{s}</div>);
		});
	} else {
		selectedOptions = [
			<div className='feature-iteration no-selection'>Unselected</div>
		];
	}
	const count = feature.data.count === 'ancestry' ? HeroLogic.getAncestryPoints(hero) : feature.data.count;
	return (
		<>
			<div className='feature-line'>
				{`• ${feature.data.count} ${CharacterSheetFormatter.pluralize(feature.name, count)}`}
			</div>
			{selectedOptions}
		</>
	);
};

const AncestryChoiceFeatureComponent = (feature: FeatureAncestryChoice) => {
	return (
		<>
			<div className='feature-line'>
				<strong>{`• ${feature.name}: `}</strong>{feature.data.selected?.name}
			</div>
		</>
	);
};

const SkillChoiceFeatureComponent = (feature: FeatureSkillChoice) => {
	const lists = CharacterSheetFormatter.joinCommasOr(feature.data.listOptions);
	let selectedOptions;
	if (feature.data.selected.length) {
		selectedOptions = feature.data.selected.map(s => {
			return (<div className='feature-iteration' key={s}>{s}</div>);
		});
	} else {
		selectedOptions = [
			<div className='feature-iteration no-selection'>Unselected</div>
		];
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

const CharacteristicBonusFeatureComponent = (feature: FeatureCharacteristicBonus) => {
	return (
		<>
			<div className='feature-line'><strong>• Characteristic Bonus: </strong>{`${feature.data.characteristic} ${CharacterSheetFormatter.addSign(feature.data.value)}`}</div>
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
	let abilityIcon = starIcon;
	// Melee / Ranged
	if (feature.data.ability.keywords.includes('Melee')) {
		if (feature.data.ability.keywords.includes('Ranged')) {
			abilityIcon = meleeRangedIcon;
		} else {
			abilityIcon = meleeIcon;
		}
	} else if (feature.data.ability.keywords.includes('Ranged')) {
		abilityIcon = rangedIcon;
	}

	// Targets
	if (feature.data.ability.target.toLowerCase() === 'self') {
		abilityIcon = selfIcon;
	}

	// Other Distances
	if (feature.data.ability.distance.find(d => [ AbilityDistanceType.Aura, AbilityDistanceType.Burst ].includes(d.type))) {
		abilityIcon = burstIcon;
	} else if (feature.data.ability.distance.find(d => [ AbilityDistanceType.Line, AbilityDistanceType.Cube, AbilityDistanceType.Wall ].includes(d.type))) {
		abilityIcon = areaIcon;
	}

	// Ability Type
	const usage = feature.data.ability.type.usage;
	if (usage === AbilityUsage.Trigger) {
		abilityIcon = triggerIcon;
	}

	const getAbilityType = (ability: Ability) => {
		if (![ AbilityUsage.NoAction, AbilityUsage.Other ].includes(ability.type.usage)) {
			return ability.type.usage;
		}
		if (ability.keywords.includes('Performance')) {
			return 'Performance';
		}
	};

	return (
		<>
			<div className='feature-title'>
				<img src={abilityIcon} alt='Ability' />
				<span className='ability-name'>{feature.name}</span>
				<span className='type'>{getAbilityType(feature.data.ability)}</span>
			</div>
			<div className='feature-description'><em>{feature.description.replace(/^\s+/, '')}</em></div>
		</>
	);
};

const AbilityModifierComponent = (feature: FeatureAbilityDamage | FeatureAbilityDistance, hero: Hero) => {
	const value = HeroLogic.calculateModifierValue(hero, feature.data);
	const type = feature.type === FeatureType.AbilityDistance ? 'distance' : 'damage';
	return (
		<div className='feature-line'>
			• [{feature.data.keywords.sort(CharacterSheetFormatter.sortKeywords).join(' ')}] Abilities: {CharacterSheetFormatter.addSign(value)} {type}
		</div>
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

const DomainFeatureComponent = (feature: FeatureDomain) => {
	let selectedOptions;
	if (feature.data.selected.length) {
		selectedOptions = feature.data.selected.map(s => {
			return (<div className='feature-iteration' key={s.id}>{s.name}</div>);
		});
	} else {
		selectedOptions = [
			<div className='feature-iteration no-selection'>Unselected</div>
		];
	}
	return (
		<>
			<div className='feature-line'><strong>• {CharacterSheetFormatter.pluralize(feature.name, feature.data.count)}:</strong></div>
			{selectedOptions}
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

const HeroicResourceComponent = (feature: FeatureHeroicResource) => {
	return (
		<>
			<div className='feature-line'><strong>{`• ${feature.type}: `}</strong>{feature.name}</div>
			{feature.data.details ?
				<div className='feature-description'>{feature.data.details}</div>
				: undefined}
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
			content = ChoiceFeatureComponent(feature, hero);
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
		case FeatureType.CharacteristicBonus:
			content = CharacteristicBonusFeatureComponent(feature);
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
			content = DomainFeatureComponent(feature);
			break;
		case FeatureType.ConditionImmunity:
			content = ConditionImmunityFeatureComponent(feature);
			break;
		case FeatureType.HeroicResource:
			content = HeroicResourceComponent(feature);
			break;
		case FeatureType.Multiple:
		case FeatureType.DomainFeature:
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
