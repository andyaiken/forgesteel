import { Feature, FeatureAbility, FeatureAbilityDamage, FeatureAbilityDistance, FeatureAncestryChoice, FeatureBonus, FeatureCharacteristicBonus, FeatureChoice, FeatureClassAbility, FeatureConditionImmunity, FeatureDamageModifier, FeatureDomain, FeatureDomainFeature, FeatureFollower, FeatureHeroicResource, FeatureItemChoice, FeatureKit, FeatureLanguageChoice, FeaturePackage, FeaturePackageContent, FeaturePerk, FeatureSkillChoice, FeatureText } from '../../../../models/feature';

import { Ability } from '../../../../models/ability';
import { AbilityDistanceType } from '../../../../enums/abiity-distance-type';
import { AbilityUsage } from '../../../../enums/ability-usage';
import { CharacterSheetFormatter } from '../../../../utils/character-sheet-formatter';
import { DamageModifier } from '../../../../models/damage-modifier';
import { DamageModifierType } from '../../../../enums/damage-modifier-type';
import { FeatureType } from '../../../../enums/feature-type';
import { Format } from '../../../../utils/format';
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
	return (
		<>
			<div className='feature-line'><strong>{`• ${feature.type}: `}</strong>{feature.name}</div>
			{feature.description ?
				<div className='feature-description'>{feature.description}</div>
				: undefined}
		</>
	);
};

const ChoiceFeatureComponent = (feature: FeatureChoice | FeatureLanguageChoice | FeatureItemChoice, hero: Hero) => {
	let selectedOptions;
	if (feature.data.selected.length > 0) {
		selectedOptions = feature.data.selected.map(s => typeof s === 'string' ? s : s.name).map(s => {
			return (<div className='feature-iteration' key={s}>{s}</div>);
		});
	} else {
		selectedOptions = [
			<div className='feature-iteration no-selection' key='unselected'>Unselected</div>
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

const SkillChoiceFeatureComponent = (feature: FeatureSkillChoice | FeaturePerk) => {
	let listNames;
	let choiceType;
	switch (feature.type) {
		case FeatureType.SkillChoice:
			listNames = feature.data.listOptions.map(l => l.toString());
			choiceType = 'Skill';
			break;
		case FeatureType.Perk:
			listNames = feature.data.lists.map(l => l.toString());
			choiceType = 'Perk';
			break;
	}
	const lists = CharacterSheetFormatter.joinCommasOr(listNames);
	let selectedOptions;
	if (feature.data.selected.length) {
		selectedOptions = feature.data.selected.map(s => typeof s === 'string' ? s : s.name).map(s => {
			return (<div className='feature-iteration' key={s}>{s}</div>);
		});
	} else {
		selectedOptions = [
			<div className='feature-iteration no-selection' key='unselected'>Unselected</div>
		];
	}
	return (
		<>
			<div className='feature-line'>
				• {feature.data.count} {lists} {CharacterSheetFormatter.pluralize(choiceType, feature.data.count)}
			</div>
			{selectedOptions}
		</>
	);
};

const BonusFeatureComponent = (feature: FeatureBonus, hero: Hero) => {
	const value = hero ? HeroLogic.calculateModifierValue(hero, feature.data) : feature.data.value;
	return (
		<>
			<div className='feature-line'><strong>• {feature.name}: </strong>{CharacterSheetFormatter.addSign(value)} {feature.data.field}</div>
		</>
	);
};

const CharacteristicBonusFeatureComponent = (feature: FeatureCharacteristicBonus) => {
	return (
		<>
			<div className='feature-line'><strong>• Characteristic Bonus: </strong>{CharacterSheetFormatter.addSign(feature.data.value)} {feature.data.characteristic}</div>
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
		let type = '';
		if (![ AbilityUsage.NoAction, AbilityUsage.Other ].includes(ability.type.usage)) {
			type = ability.type.usage.toString();
			if (ability.type.free) {
				type = 'Free ' + type;
			}
		}
		if (ability.keywords.includes('Performance')) {
			type = 'Performance';
		}
		return type;
	};

	const type = getAbilityType(feature.data.ability);
	const typeClasses = [ 'type' ];
	typeClasses.push(type.toLocaleLowerCase().split(' ').join('-'));

	return (
		<>
			<div className='feature-title'>
				<img src={abilityIcon} alt='Ability' />
				<span className='ability-name'>{feature.name}</span>
				<span className={typeClasses.join(' ')}>{type}</span>
			</div>
			<div className='feature-description'><em>{feature.description.replace(/^\s+/, '')}</em></div>
		</>
	);
};

const ClassAbilityFeatureComponent = (feature: FeatureClassAbility) => {
	let abilityCost = Format.capitalize(feature.data.cost.toString());
	if (typeof feature.data.cost === 'number') {
		abilityCost += ' Cost';
	}
	let ability = 'Ability';
	if (feature.data.count > 1)
		ability = 'Abilities';

	let selectedOptions;
	if (feature.data.selectedIDs.length) {
		selectedOptions = feature.data.selectedIDs.map(s => {
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
				• {abilityCost} Class {ability}:
			</div>
			{selectedOptions}
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

const DomainFeatureComponent = (feature: FeatureDomain | FeatureDomainFeature) => {
	let selectedOptions;
	if (feature.data.selected.length) {
		selectedOptions = feature.data.selected.map(s => {
			return (<div className='feature-iteration' key={s.id}>{s.name}</div>);
		});
	} else {
		selectedOptions = [
			<div className='feature-iteration no-selection' key='unselected'>Unselected</div>
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
		return (<div className='feature-iteration' key={`immunity-${c.toString}`}>{c.toString()}</div>);
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

const KitFeatureComponent = (feature: FeatureKit) => {
	let displayName = feature.name;
	if (!feature.description.length) {
		displayName = 'You can use a Kit';
	}
	return (
		<>
			<div className='feature-line'><strong>{`• ${feature.type}: `}</strong>{displayName}</div>
			{feature.description ?
				<div className='feature-description'>{feature.description}</div>
				: undefined}
		</>
	);
};

const FollowerFeatureComponent = (feature: FeatureFollower) => {
	const follower = feature.data.follower;
	return (
		<>
			<div className='feature-line'>
				<strong>Follower: </strong>
				{follower.name}
				{follower.type ?
					<em> ({follower.type})</em>
					: undefined}
			</div>
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
		case FeatureType.Choice:
		case FeatureType.ItemChoice:
			content = ChoiceFeatureComponent(feature, hero);
			break;
		case FeatureType.AncestryChoice:
			content = AncestryChoiceFeatureComponent(feature);
			break;
		case FeatureType.SkillChoice:
		case FeatureType.Perk:
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
		case FeatureType.ClassAbility:
			content = ClassAbilityFeatureComponent(feature);
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
		case FeatureType.HeroicResource:
			content = HeroicResourceComponent(feature);
			break;
		case FeatureType.Kit:
			content = KitFeatureComponent(feature);
			break;
		case FeatureType.Follower:
			content = FollowerFeatureComponent(feature);
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
