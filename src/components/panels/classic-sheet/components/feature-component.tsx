import { Feature, FeatureAbility, FeatureAbilityDamage, FeatureAbilityDistance, FeatureAncestryChoice, FeatureBonus, FeatureCharacteristicBonus, FeatureChoice, FeatureClassAbility, FeatureCompanion, FeatureConditionImmunity, FeatureDamageModifier, FeatureDomain, FeatureDomainFeature, FeatureFollower, FeatureHeroicResource, FeatureItemChoice, FeatureKit, FeatureLanguageChoice, FeatureMalice, FeatureMaliceAbility, FeaturePackage, FeaturePerk, FeatureSkillChoice, FeatureText } from '@/models/feature';

import { Ability } from '@/models/ability';
import { AbilityComponent } from '@/components/panels/classic-sheet/components/ability-component';
import { AbilityUsage } from '@/enums/ability-usage';
import { Characteristic } from '@/enums/characteristic';
import { ClassicSheetBuilder } from '@/logic/classic-sheet/classic-sheet-builder';
import { DamageModifier } from '@/models/damage-modifier';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DrawSteelSymbolText } from '@/components/panels/classic-sheet/components/ds-symbol-text-component';
import { FeatureType } from '@/enums/feature-type';
import { Format } from '@/utils/format';
import { Fragment } from 'react';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Markdown } from '@/components/controls/markdown/markdown';
import { ModifierLogic } from '@/logic/modifier-logic';
import { PerkList } from '@/enums/perk-list';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { SkillList } from '@/enums/skill-list';

import rollT1 from '@/assets/icons/power-roll-t1.svg';
import rollT2 from '@/assets/icons/power-roll-t2.svg';
import rollT3 from '@/assets/icons/power-roll-t3.svg';

import './feature-component.scss';

interface Props {
	feature: Feature;
	hero?: Hero,
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

const ChoiceFeatureComponent = (feature: FeatureChoice | FeatureLanguageChoice | FeatureItemChoice, hero?: Hero) => {
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
	let ancestryPts = 0;
	if (hero) {
		ancestryPts = HeroLogic.getAncestryPoints(hero);
	}
	const count = feature.data.count === 'ancestry' ? ancestryPts : feature.data.count;
	return (
		<>
			<div className='feature-line'>
				{`• ${feature.data.count} ${SheetFormatter.pluralize(feature.name, count)}`}
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

const isAllSkillLists = (lists: SkillList[]): boolean => {
	return Object.values(SkillList)
		.filter(l => l !== SkillList.Custom)
		.every(l => lists.includes(l));
};

const isAllPerkLists = (lists: PerkList[]): boolean => {
	return Object.values(PerkList).every(l => lists.includes(l));
};

const SkillChoiceFeatureComponent = (feature: FeatureSkillChoice | FeaturePerk) => {
	let listNames;
	let choiceType;
	switch (feature.type) {
		case FeatureType.SkillChoice:
			if (!isAllSkillLists(feature.data.listOptions))
				listNames = feature.data.listOptions.map(l => l.toString());
			choiceType = 'Skill';
			break;
		case FeatureType.Perk:
			if (!isAllPerkLists(feature.data.lists))
				listNames = feature.data.lists.map(l => l.toString());
			choiceType = 'Perk';
			break;
	}
	const lists = SheetFormatter.joinCommasOr(listNames);
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
				• {feature.data.count} {lists} {SheetFormatter.pluralize(choiceType, feature.data.count)}
			</div>
			{selectedOptions}
		</>
	);
};

const BonusFeatureComponent = (feature: FeatureBonus, hero?: Hero) => {
	const value = hero ? ModifierLogic.calculateModifierValue(feature.data, hero) : feature.data.value;
	return (
		<>
			<div className='feature-line'><strong>• {feature.name}: </strong>{SheetFormatter.addSign(value)} {feature.data.field}</div>
		</>
	);
};

const CharacteristicBonusFeatureComponent = (feature: FeatureCharacteristicBonus) => {
	return (
		<>
			<div className='feature-line'><strong>• Characteristic Bonus: </strong>{SheetFormatter.addSign(feature.data.value)} {feature.data.characteristic}</div>
		</>
	);
};

const TextFeatureComponent = (feature: FeatureText) => {
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

const PackageFeatureComponent = (feature: FeaturePackage, hero: Hero | undefined) => {
	const packageContent = hero ?
		HeroLogic.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.PackageContent)
			.filter(f => f.data.tag === feature.data.tag)
			.map(f => (
				<div className='feature-description' key={f.id}>
					<div className='package-content-name'>{f.name}</div>
					<Markdown text={f.description} />
				</div>
			))
		: null;

	const showPackageContent = !feature.description.includes('class="continued-in-reference"');
	return (
		<>
			<div className='feature-title'>{feature.name}</div>
			<Markdown
				text={feature.description}
				className='feature-description'
			/>
			{showPackageContent ? packageContent : null}
		</>
	);
};

const AbilityFeatureComponent = (feature: FeatureAbility) => {
	const abilityIcon = SheetFormatter.getAbilityIcon(feature.data.ability);

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
			<div className='feature-iteration no-selection' key='unselected'>Unselected</div>
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

const AbilityModifierComponent = (feature: FeatureAbilityDamage | FeatureAbilityDistance, hero?: Hero) => {
	const value = hero ? ModifierLogic.calculateModifierValue(feature.data, hero) : feature.data.value;
	const type = feature.type === FeatureType.AbilityDistance ? 'distance' : 'damage';
	return (
		<div className='feature-line'>
			• [{feature.data.keywords.sort(SheetFormatter.sortKeywords).join(' ')}] Abilities: {SheetFormatter.addSign(value)} {type}
		</div>
	);
};

const DamageModifierComponent = (feature: FeatureDamageModifier, hero?: Hero) => {
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
					{m.damageType} {hero ? ModifierLogic.calculateModifierValue(m, hero) : m.value}
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
			<div className='feature-line'><strong>• {SheetFormatter.pluralize(feature.name, feature.data.count)}:</strong></div>
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
		<div className='feature-line'>
			<strong>• Follower: </strong>
			{follower.name}
			{follower.type ?
				<em> ({follower.type})</em>
				: undefined}
		</div>
	);
};

const CompanionFeatureComponent = (feature: FeatureCompanion) => {
	const companion = feature.data.selected;
	let details;
	if (companion?.retainer) {
		details = <em>{` (Level ${companion.retainer.level} ${companion.role.type} ${companion.role.organization})`}</em>;
	}

	return (
		<div className='feature-line'>
			<strong>• {feature.type}: </strong>
			{companion?.name}
			{details}
		</div>
	);
};

const MaliceFeatureComponent = (feature: FeatureMalice) => {
	const getHeader = (characteristics: Characteristic[]) => {
		if (characteristics.length === 0) {
			return 'Test';
		}
		if (characteristics.length === 5) {
			return 'Highest Characteristic Test';
		}
		return `${characteristics.join(' or ')} Test`;
	};
	const sections = (feature.data.sections ?? []).map((section, n) => (typeof section === 'string') ?
		<Markdown key={n} text={section} className='feature-description' />
		:
		<div className='power-roll' key={n}>
			<div className='header'>{getHeader(section.characteristic)}</div>
			<div className='roll-tiers'>
				<div className='tier t1'>
					<img src={rollT1} alt='≤ 11' className='range' />
					<span className='effect'>
						<DrawSteelSymbolText content={section.tier1} lookFor='potencies' />
					</span>
				</div>
				<div className='tier t2'>
					<img src={rollT2} alt='12 - 16' className='range' />
					<span className='effect'>
						<DrawSteelSymbolText content={section.tier2} lookFor='potencies' />
					</span>
				</div>
				<div className='tier t3'>
					<img src={rollT3} alt='17 +' className='range' />
					<span className='effect'>
						<DrawSteelSymbolText content={section.tier3} lookFor='potencies' />
					</span>
				</div>
			</div>
		</div>
	);
	const iconSrc = SheetFormatter.getIconSrc(feature.data.icon);

	return (
		<div className='feature feature-malice ability' key={feature.id}>
			<img src={iconSrc} className='icon' />
			<div className='details'>
				<div className='header'>
					<label className='name'>{feature.name}</label>
					<div className='ability-type'>
						{feature.data.cost} Malice
					</div>
				</div>
				{sections}
			</div>
		</div>
	);
};

const MaliceAbilityFeatureComponent = (feature: FeatureMaliceAbility) => {
	const abilitySheet = ClassicSheetBuilder.buildAbilitySheet(feature.data.ability, undefined);
	// abilitySheet.abilityType = undefined;
	const icon = SheetFormatter.getAbilityIcon(abilitySheet);

	return (
		<div className='feature feature-malice' key={feature.id}>
			<img src={icon} className='icon' />
			<div className='details'>
				<AbilityComponent
					ability={abilitySheet}
				/>
			</div>
		</div>
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
			content = TextFeatureComponent(feature);
			break;
		case FeatureType.Package:
			content = PackageFeatureComponent(feature, hero);
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
		case FeatureType.Companion:
			content = CompanionFeatureComponent(feature);
			break;
		case FeatureType.Malice:
			content = MaliceFeatureComponent(feature);
			break;
		case FeatureType.MaliceAbility:
			content = MaliceAbilityFeatureComponent(feature);
			break;
		case FeatureType.Multiple:// Do nothing for these since the individual sub-features are also iterated over, no need to double up
		case FeatureType.PackageContent: // These are brought in as part of the Package
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
