import { AbilitySheet, CharacterSheet } from '../models/character-sheet';

import { Ability } from '../models/ability';
import { AbilityData } from '../data/ability-data';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityLogic } from '../logic/ability-logic';
import { AbilityUsage } from '../enums/ability-usage';
import { CharacterSheetFormatter } from './character-sheet-formatter';
import { Characteristic } from '../enums/characteristic';
import { Collections } from './collections';
import { ConditionType } from '../enums/condition-type';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { FactoryFeatureLogic } from '../logic/factory-feature-logic';
import { Feature } from '../models/feature';
import { FeatureLogic } from '../logic/feature-logic';
import { FeatureType } from '../enums/feature-type';
import { Format } from './format';
import { FormatLogic } from '../logic/format-logic';
import { Hero } from '../models/hero';
import { HeroLogic } from '../logic/hero-logic';
import { Sourcebook } from '../models/sourcebook';
import { SourcebookLogic } from '../logic/sourcebook-logic';

export class CharacterSheetBuilder {
	static buildSheetForHero = (hero: Hero, sourcebooks: Sourcebook[]) => {
		const sheet: CharacterSheet = {
			hero: hero,
			name: hero.name,

			freeStrikes: [],
			signatureAbilities: [],
			heroicAbilities: [],
			triggeredActions: [],
			otherRollAbilities: [],
			otherAbilities: [],

			featuresReferenceOther: []
		};

		let coveredFeatureIds: string[] = [];
		const allFeatures = HeroLogic.getFeatures(hero);

		if (hero.ancestry) {
			sheet.ancestryName = hero.ancestry.name;

			const ancestryFeatures = FeatureLogic.getFeaturesFromAncestry(hero.ancestry, hero)
				.map(f => f.feature);

			const ancestryTraits = ancestryFeatures.filter(f => f.type !== FeatureType.Choice);
			const longFeatures = ancestryTraits
				.filter(f => f.type === FeatureType.Text)
				.filter(CharacterSheetFormatter.isLongFeature);
			sheet.ancestryTraits = CharacterSheetFormatter.convertFeatures(ancestryTraits);
			sheet.featuresReferenceOther = sheet.featuresReferenceOther?.concat(longFeatures);

			coveredFeatureIds = coveredFeatureIds.concat(ancestryFeatures.map(f => f.id));
		}

		sheet.currentVictories = hero.state.victories;
		sheet.wealth = hero.state.wealth;
		sheet.renown = HeroLogic.getRenown(hero);
		sheet.xp = hero.state.xp;

		sheet.inventory = hero.state.inventory.map(item => {
			const features = FeatureLogic.getFeaturesFromItem(item, hero).map(f => f.feature);
			return {
				id: item.id,
				item: item,
				features: features
			};
		});
		coveredFeatureIds = coveredFeatureIds.concat(sheet.inventory.flatMap(i => i.features?.map(f => f.id) || []));

		if (hero.class) {
			sheet.className = hero.class.name;
			sheet.subclassTypeName = hero.class.subclassName;
			sheet.subclassName = hero.class.subclasses.find(s => s.selected)?.name;

			sheet.level = hero.class.level;

			sheet.might = hero.class.characteristics.find(c => c.characteristic === Characteristic.Might)?.value;
			sheet.agility = hero.class.characteristics.find(c => c.characteristic === Characteristic.Agility)?.value;
			sheet.reason = hero.class.characteristics.find(c => c.characteristic === Characteristic.Reason)?.value;
			sheet.intuition = hero.class.characteristics.find(c => c.characteristic === Characteristic.Intuition)?.value;
			sheet.presence = hero.class.characteristics.find(c => c.characteristic === Characteristic.Presence)?.value;

			const heroicResource = allFeatures.map(f => f.feature).find(f => f.type === FeatureType.HeroicResource);
			sheet.heroicResourceFeature = heroicResource;
			sheet.heroicResourceName = heroicResource?.name;
			sheet.heroicResourceCurrent = allFeatures
				.map(f => f.feature)
				.filter(f => f.type === FeatureType.HeroicResource)
				.find(f => f.data.type === 'heroic')?.data.value;
		}

		sheet.size = FormatLogic.getSize(HeroLogic.getSize(hero));
		sheet.speed = FormatLogic.getSpeed(HeroLogic.getSpeed(hero));
		sheet.disengage = HeroLogic.getDisengage(hero);
		sheet.stability = HeroLogic.getStability(hero);

		sheet.staminaMax = HeroLogic.getStamina(hero);
		sheet.staminaCurrent = sheet.staminaMax - hero.state.staminaDamage;
		sheet.staminaTemp = hero.state.staminaTemp;
		sheet.windedAt = HeroLogic.getWindedThreshold(hero);
		sheet.deadAt = HeroLogic.getDeadThreshold(hero);

		sheet.recoveriesMax = HeroLogic.getRecoveries(hero);
		sheet.recoveryValue = HeroLogic.getRecoveryValue(hero);
		sheet.recoveriesCurrent = sheet.recoveriesMax - hero.state.recoveriesUsed;

		sheet.surgeDamageAmount = CharacterSheetFormatter.addSign(HeroLogic.calculateSurgeDamage(hero));
		sheet.surgesCurrent = hero.state.surges;

		const kits = HeroLogic.getKits(hero);

		const modifiers = allFeatures.map(f => f.feature)
			.filter(f => f.type !== FeatureType.Choice)
			.filter(f => f.name.match(' Augmentation')
                        || f.name.match('Ward')
                        || f.name.match('Prayer of')
                        || f.name.match('Enchantment of'));

		sheet.modifierTypes = [];
		if (kits.length) {
			sheet.modifierTypes.push('Kit');
			sheet.modifierName = kits.map(k => k.name).join(' | ');
			sheet.modifierWeaponImplement = kits.map(k => k.weapon[0]).filter(v => v).join(', ');
			sheet.modifierArmor = [ ...new Set(kits.map(k => k.armor[0]).filter(v => v)) ].join(', ');

			sheet.modifierSpeed = HeroLogic.getBonusFromModifier(hero, k => k.speed);
			sheet.modifierMeleeDistance = HeroLogic.getBonusFromModifier(hero, k => k.meleeDistance);
			sheet.modifierRangedDistance = HeroLogic.getBonusFromModifier(hero, k => k.rangedDistance);
			sheet.modifierDisengage = HeroLogic.getBonusFromModifier(hero, k => k.disengage);
			sheet.modifierStability = HeroLogic.getBonusFromModifier(hero, k => k.stability);
			sheet.modifierStamina = HeroLogic.getBonusFromModifier(hero, k => k.stamina);

			const kitDmg = HeroLogic.getKitDamageBonuses(hero);
			sheet.modifierMeleeDamageT1 = kitDmg.find(x => x.type === 'melee')?.tier1;
			sheet.modifierMeleeDamageT2 = kitDmg.find(x => x.type === 'melee')?.tier2;
			sheet.modifierMeleeDamageT3 = kitDmg.find(x => x.type === 'melee')?.tier3;
			sheet.modifierRangedDamageT1 = kitDmg.find(x => x.type === 'ranged')?.tier1;
			sheet.modifierRangedDamageT2 = kitDmg.find(x => x.type === 'ranged')?.tier2;
			sheet.modifierRangedDamageT3 = kitDmg.find(x => x.type === 'ranged')?.tier3;

			const kitFeatures = kits.flatMap(k => k.features)
				.filter(f => !this.isClassFeatureInKit(f));
			sheet.modifierBenefits = CharacterSheetFormatter.convertFeatures(kitFeatures);

			coveredFeatureIds = coveredFeatureIds.concat(kitFeatures.map(f => f.id));
		} else if (modifiers) {
			if (modifiers.find(f => f.name.match(' Augmentation')))
				sheet.modifierTypes.push('Augmentation');
			if (modifiers.find(f => f.name.match('Ward')))
				sheet.modifierTypes.push('Ward');
			if (modifiers.find(f => f.name.match('Prayer of')))
				sheet.modifierTypes.push('Prayer');
			if (modifiers.find(f => f.name.match('Enchantment of')))
				sheet.modifierTypes.push('Enchantment');

			sheet.modifierName = Collections.distinct(modifiers.map(f => f.name), n => n).join(' | ');

			// Augmentation is either Multiple or AbilityDamage (or...?)
			modifiers.forEach(modifier => {
				switch (modifier.type) {
					case FeatureType.Multiple:
						modifier.data.features.forEach(f => {
							CharacterSheetBuilder.populateModifierAugmentation(f, hero, sheet);
							coveredFeatureIds.push(f.id);
						});
						break;
					default:
						CharacterSheetBuilder.populateModifierAugmentation(modifier, hero, sheet);
						coveredFeatureIds.push(modifier.id);
						break;
				}
			});
			sheet.modifierBenefits = CharacterSheetFormatter.convertFeatures(modifiers);
		}

		sheet.immunities = HeroLogic.getDamageModifiers(hero, DamageModifierType.Immunity);
		sheet.weaknesses = HeroLogic.getDamageModifiers(hero, DamageModifierType.Weakness);
		sheet.conditionImmunities = HeroLogic.getConditionImmunities(hero);

		// Potencies
		sheet.potencyStrong = HeroLogic.getPotency(hero, 'strong');
		sheet.potencyAverage = HeroLogic.getPotency(hero, 'average');
		sheet.potencyWeak = HeroLogic.getPotency(hero, 'weak');

		// Conditions
		sheet.saveEndsTarget = HeroLogic.calculateSaveValue(hero);

		const conditions = hero.state.conditions;
		conditions.filter(c => [ ConditionType.Custom, ConditionType.Quick ].includes(c.type))
			.forEach((c, i) => {
				if (i === 0) {
					sheet.condition1Name = c.text;
				}
				if (i === 1) {
					sheet.condition2Name = c.text;
				}
			});
		sheet.conditions = conditions;

		if (hero.class) {
			let classFeatures = FeatureLogic.getFeaturesFromClass(hero.class, hero)
				.filter(f => !coveredFeatureIds.includes(f.feature.id))
				.filter(f => f.feature.type !== FeatureType.ClassAbility)
				.map(f => f.feature);

			// Perks are covered elsewhere - just keep the choice here
			const perkIds = classFeatures.filter(f => f.type === FeatureType.Perk)
				.flatMap(f => f.data.selected.map(p => p.id));
			classFeatures = classFeatures.filter(f => !perkIds.includes(f.id));
			classFeatures.sort(CharacterSheetFormatter.sortFeatures);

			const longFeatures = classFeatures
				.filter(f => f.type === FeatureType.Text)
				.filter(CharacterSheetFormatter.isLongFeature);
			sheet.classFeatures = CharacterSheetFormatter.convertFeatures(classFeatures);
			sheet.featuresReferenceOther = sheet.featuresReferenceOther?.concat(CharacterSheetFormatter.convertFeatures(longFeatures));

			coveredFeatureIds = coveredFeatureIds.concat(classFeatures.map(f => f.id));
		}

		if (hero.career) {
			sheet.careerName = hero.career.name;
			const careerFeatures = hero.career.features;
			sheet.careerBenefits = careerFeatures;
			coveredFeatureIds = coveredFeatureIds.concat(careerFeatures.map(f => f.id));

			const incident = hero.career.incitingIncidents.options.find(
				o => o.id === (hero.career && hero.career.incitingIncidents.selectedID)
			);
			sheet.careerInsightingIncident = incident;
		}

		if (hero.complication) {
			sheet.complicationName = hero.complication.name;
			const complicationFeatures = hero.complication.features;

			const drawbacks = complicationFeatures.filter(this.isFeatureDrawback);
			sheet.complicationDrawbacks = drawbacks;

			const benefits = complicationFeatures.filter(f => !this.isFeatureDrawback(f));
			sheet.complicationBenefits = benefits;

			coveredFeatureIds = coveredFeatureIds.concat(benefits.map(f => f.id));
			coveredFeatureIds = coveredFeatureIds.concat(drawbacks.map(f => f.id));
		}

		const skillsMap = new Map<string, string[]>();
		const allSkills = SourcebookLogic.getSkills(sourcebooks).reduce((map, skill) => {
			const skillList = map.get(skill.list.toString()) || [];
			skillList.push(skill.name);
			map.set(skill.list.toString(), Collections.distinct(skillList, s => s).sort());
			return map;
		}, skillsMap);
		sheet.allSkills = new Map([ ...allSkills.entries() ].sort());

		sheet.skills = HeroLogic.getSkills(hero, sourcebooks).map(s => s.name);
		coveredFeatureIds = coveredFeatureIds.concat(
			allFeatures.filter(f => [ FeatureType.Skill, FeatureType.SkillChoice ].includes(f.feature.type))
				.map(f => f.feature.id));

		// Culture
		if (hero.culture) {
			let cultureFeatures: Feature[] = [];
			cultureFeatures = cultureFeatures.concat(allFeatures.filter(f => f.source.includes('Culture')).map(f => f.feature))
				.concat(hero.culture.languages.map(lang => FactoryFeatureLogic.createLanguage({
					id: `culture-${hero.culture?.name}-language-${lang}`,
					language: lang
				})));
			sheet.culture = hero.culture;
			sheet.cultureFeatures = cultureFeatures;

			coveredFeatureIds = coveredFeatureIds.concat(cultureFeatures.map(f => f.id));
		}

		sheet.languages = HeroLogic.getLanguages(hero, sourcebooks).map(l => l.name);
		coveredFeatureIds = coveredFeatureIds.concat(
			allFeatures.filter(f => [ FeatureType.Language, FeatureType.LanguageChoice ].includes(f.feature.type))
				.map(f => f.feature.id));

		const perks = HeroLogic.getPerks(hero);
		sheet.perks = perks;
		coveredFeatureIds = coveredFeatureIds.concat(perks.map(p => p.id));

		const titles = HeroLogic.getTitles(hero);
		sheet.titles = titles;
		coveredFeatureIds = coveredFeatureIds.concat(titles.flatMap(t => t.features.map(f => f.id)));
		coveredFeatureIds = coveredFeatureIds.concat(
			allFeatures.filter(f => [ FeatureType.TitleChoice ].includes(f.feature.type))
				.map(f => f.feature.id));

		sheet.projects = hero.state.projects.map(p => ({
			id: p.id,
			name: p.name,
			characteristic: CharacterSheetFormatter.joinCommasOr(p.characteristic
				.sort(CharacterSheetFormatter.sortCharacteristics)
				.map(c => Format.capitalize(c.slice(0, 1)))
			),
			pointsGoal: p.goal,
			pointsCurrent: p.progress?.points
		}));

		// Abilities
		const abilities = HeroLogic.getAbilities(hero, sourcebooks, false).map(a => a.ability);

		sheet.freeStrikes = [ AbilityData.freeStrikeMelee, AbilityData.freeStrikeRanged ].map(a => this.buildAbilitySheet(a, hero));
		sheet.signatureAbilities = abilities.filter(a => a.cost === 'signature').map(a => this.buildAbilitySheet(a, hero));
		sheet.heroicAbilities = abilities.filter(a => 0 < Number(a.cost)).map(a => this.buildAbilitySheet(a, hero));
		sheet.triggeredActions = abilities.filter(a => 0 === a.cost).filter(a => a.type.usage === AbilityUsage.Trigger).map(a => this.buildAbilitySheet(a, hero));

		let coveredAbilityIds = sheet.freeStrikes.map(a => a.id)
			.concat(sheet.signatureAbilities.map(a => a.id))
			.concat(sheet.heroicAbilities.map(a => a.id))
			.concat(sheet.triggeredActions.map(a => a.id));
		const otherAbilities = abilities.filter(a => !coveredAbilityIds.includes(a.id));
		sheet.otherRollAbilities = otherAbilities.filter(a => a.sections.some(s => s.type === 'roll')).map(a => this.buildAbilitySheet(a, hero));
		sheet.otherAbilities = otherAbilities.filter(a => !a.sections.some(s => s.type === 'roll')).map(a => this.buildAbilitySheet(a, hero));

		coveredAbilityIds = coveredAbilityIds
			.concat(sheet.otherRollAbilities.map(a => a.id))
			.concat(sheet.otherAbilities.map(a => a.id));

		coveredFeatureIds = coveredFeatureIds.concat(
			allFeatures.filter(f => [ FeatureType.ClassAbility, FeatureType.Ability ].includes(f.feature.type))
				.map(f => f.feature.id));

		// Feature coverage check
		const missedFeatures: { feature: Feature; source: string; }[] = [];
		allFeatures.filter(f => !coveredFeatureIds.includes(f.feature.id)).forEach(f => missedFeatures.push(f));
		if (missedFeatures.length) {
			console.warn('Missed features! - adding to "other"', missedFeatures);
			sheet.featuresReferenceOther = (sheet.featuresReferenceOther || []).concat(missedFeatures.map(f => f.feature));
		}
		// Ability coverage check
		const missedAbilities: Ability[] = [];
		abilities.filter(a => !coveredAbilityIds.includes(a.id)).forEach(a => missedAbilities.push(a));
		if (missedAbilities.length) {
			console.warn('Missed Abilities!', missedAbilities);
		}

		return sheet;
	};

	private static modifierFieldMapping: { [key: string]: (s: CharacterSheet, v: string | number | undefined) => void } = {
		Stamina: (s, v) => s.modifierStamina = Number(v),
		Stability: (s, v) => s.modifierStability = Number(v),
		Speed: (s, v) => s.modifierSpeed = Number(v),
		Disengage: (s, v) => s.modifierDisengage = Number(v)
	};

	static populateModifierAugmentation = (feature: Feature, hero: Hero, sheet: CharacterSheet) => {
		let value;
		switch (feature.type) {
			case FeatureType.Bonus: {
				value = HeroLogic.calculateModifierValue(hero, feature.data);
				const field = feature.data.field.toString();
				CharacterSheetBuilder.modifierFieldMapping[field](sheet, value);
				break;
			}
			case FeatureType.AbilityDistance:
				value = HeroLogic.calculateModifierValue(hero, feature.data);
				if (feature.data.keywords.includes(AbilityKeyword.Melee))
					sheet.modifierMeleeDistance = value;
				if (feature.data.keywords.includes(AbilityKeyword.Ranged))
					sheet.modifierRangedDistance = value;
				break;
		}
	};

	static buildAbilitySheet = (ability: Ability, hero: Hero): AbilitySheet => {
		const sheet: AbilitySheet = {
			id: ability.id,
			abilityType: 'Ability',
			name: ability.name,
			isSignature: false,
			cost: Number(ability.cost) || 0,
			actionType: ability.type.usage.toString(),
			keywords: ability.keywords.join(', '),
			target: ability.target,
			trigger: ability.type.trigger,
			hasPowerRoll: false
		};

		if (ability.cost === 'signature') {
			sheet.isSignature = true;
			sheet.abilityType = 'Signature Ability';
		} else if (ability.cost > 0) {
			sheet.abilityType = 'Heroic Ability';
		} else if (ability.type.usage === AbilityUsage.Trigger) {
			sheet.abilityType = 'Triggered Action';
		} else if (ability.type.usage === AbilityUsage.FreeStrike) {
			sheet.abilityType = 'Free Strike';
			if (ability.name.toLowerCase().includes('melee')) {
				sheet.abilityType = 'Melee Free Strike';
			} else if (ability.name.toLowerCase().includes('ranged')) {
				sheet.abilityType = 'Ranged Free Strike';
			}
		}

		if (ability.distance.length) {
			sheet.distance = ability.distance.map(d => AbilityLogic.getDistance(d, ability, hero)).join(' | ');
		}

		const effectSections = ability.sections.filter(s => s.type !== 'roll');
		sheet.effect = CharacterSheetFormatter.abilitySections(effectSections).trim();

		const rollSections = ability.sections.filter(s => s.type === 'roll');
		if (rollSections.length) {
			sheet.hasPowerRoll = true;
			const rollSection = rollSections[0];
			if (rollSections.length > 1) {
				console.warn('More than one roll section!', rollSections);
			}

			const rollPowerAmount = Math.max(...rollSection.roll.characteristic
				.map(
					c =>
						hero.class &&
                        hero.class.characteristics.find(d => d.characteristic === c)
				)
				.map(c => (c && c.value) || 0));

			const characteristics = CharacterSheetFormatter.joinCommasOr(rollSection.roll.characteristic
				.sort(CharacterSheetFormatter.sortCharacteristics)
				.map(c => Format.capitalize(c.slice(0, 1)))
			);
			sheet.rollPower = `${rollPowerAmount} (${characteristics})`;

			sheet.rollT1Effect = CharacterSheetFormatter.cleanupText(
				AbilityLogic.getTierEffect(rollSection.roll.tier1, 1, ability, undefined, hero));

			sheet.rollT2Effect = CharacterSheetFormatter.cleanupText(
				AbilityLogic.getTierEffect(rollSection.roll.tier2, 2, ability, undefined, hero));

			sheet.rollT3Effect = CharacterSheetFormatter.cleanupText(
				AbilityLogic.getTierEffect(rollSection.roll.tier3, 3, ability, undefined, hero));
		}

		return sheet;
	};

	// Returns true for features that are categorized as part of the Kit,
	// but which (I feel) should go with the Class features.
	static isClassFeatureInKit = (f: Feature): boolean => {
		return (f.name.includes('Aspect')
            || f.name.includes('Animal Form')
            || f.name.includes('Hybrid Form')
            || f.name.includes('Growing Ferocity'));
	};

	static isFeatureDrawback = (f: Feature): boolean => {
		return (f.name.includes('Drawback')
			|| /-d-?/.test(f.id));
	};
}
