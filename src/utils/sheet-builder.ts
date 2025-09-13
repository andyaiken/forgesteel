import { AbilitySheet, CareerSheet, CharacterSheet, ComplicationSheet, ItemSheet } from '../models/character-sheet';
import { Ability } from '../models/ability';
import { AbilityData } from '../data/ability-data';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityLogic } from '../logic/ability-logic';
import { AbilityUsage } from '../enums/ability-usage';
import { Career } from '../models/career';
import { CharacterSheetFormatter } from './character-sheet-formatter';
import { Characteristic } from '../enums/characteristic';
import { Collections } from './collections';
import { Complication } from '../models/complication';
import { ConditionType } from '../enums/condition-type';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { FactoryLogic } from '../logic/factory-logic';
import { Feature } from '../models/feature';
import { FeatureLogic } from '../logic/feature-logic';
import { FeatureType } from '../enums/feature-type';
import { Format } from './format';
import { FormatLogic } from '../logic/format-logic';
import { Hero } from '../models/hero';
import { HeroLogic } from '../logic/hero-logic';
import { Item } from '../models/item';
import { Options } from '../models/options';
import { Sourcebook } from '../models/sourcebook';
import { SourcebookLogic } from '../logic/sourcebook-logic';

export class CharacterSheetBuilder {
	static buildSheetForHero = (hero: Hero, sourcebooks: Sourcebook[], options: Options) => {
		const sheet: CharacterSheet = {
			hero: hero,
			name: hero.name,

			freeStrikes: [],
			signatureAbilities: [],
			heroicAbilities: [],
			triggeredActions: [],
			otherRollAbilities: [],
			otherAbilities: [],
			standardAbilities: [],

			featuresReferenceOther: [],

			notes: hero.state.notes
		};

		let coveredFeatureIds: string[] = [];
		const allFeatures = HeroLogic.getFeatures(hero);

		sheet.currentVictories = hero.state.victories;
		sheet.wealth = hero.state.wealth;
		sheet.renown = HeroLogic.getRenown(hero);
		sheet.xp = hero.state.xp;

		const featureItems = allFeatures.map(f => f.feature)
			.filter(f => f.type === FeatureType.ItemChoice)
			.flatMap(f => f.data.selected);

		const inventory = hero.state.inventory.concat(featureItems).map(item => this.buildItemSheet(item, hero));

		sheet.inventory = inventory;
		coveredFeatureIds = coveredFeatureIds.concat(inventory.flatMap(i => i.features?.map(f => f.id) || []));

		// #region Class
		if (hero.class) {
			sheet.className = hero.class.name;
			sheet.subclassTypeName = hero.class.subclassName;
			sheet.subclassName = hero.class.subclasses.find(s => s.selected)?.name;
			// Conduit subclass fix
			if (hero.class.name === 'Conduit') {
				sheet.subclassTypeName = 'Domains';
				sheet.subclassName = HeroLogic.getDomains(hero).map(d => d.name).join(', ');
			}

			sheet.level = hero.class.level;

			sheet.might = HeroLogic.getCharacteristic(hero, Characteristic.Might);
			sheet.agility = HeroLogic.getCharacteristic(hero, Characteristic.Agility);
			sheet.reason = HeroLogic.getCharacteristic(hero, Characteristic.Reason);
			sheet.intuition = HeroLogic.getCharacteristic(hero, Characteristic.Intuition);
			sheet.presence = HeroLogic.getCharacteristic(hero, Characteristic.Presence);

			const heroicResource = HeroLogic.getHeroicResources(hero)[0];
			if (heroicResource) {
				sheet.heroicResourceGains = heroicResource.gains;
				sheet.heroicResourceName = heroicResource?.name;
				sheet.heroicResourceCurrent = allFeatures
					.map(f => f.feature)
					.filter(f => f.type === FeatureType.HeroicResource)
					.find(f => f.data.type === 'heroic')?.data.value;
			}
		}
		// #endregion

		// #region Ancestry
		if (hero.ancestry) {
			sheet.ancestryName = CharacterSheetFormatter.fixAncestryName(hero.ancestry.name);

			const ancestryFeatures = FeatureLogic.getFeaturesFromAncestry(hero.ancestry, hero);

			const ancestryTraits = ancestryFeatures.filter(f => f.feature.type !== FeatureType.Choice)
				.map(f => f.feature);

			let ancestrySpace = options.pageOrientation === 'portrait' ? 26 : 33;
			if (sheet.heroicResourceGains?.length || 0 > 3) {
				const extraLines = sheet.heroicResourceGains?.slice(3).reduce((sum, g) => sum + CharacterSheetFormatter.countLines(g.trigger, 40), 0) || 0;
				ancestrySpace -= extraLines;
			}
			const dividedAncestry = CharacterSheetFormatter.divideFeatures(ancestryTraits, ancestrySpace);
			sheet.ancestryTraits = CharacterSheetFormatter.convertFeatures(dividedAncestry.displayed);

			const refAncestry = ancestryFeatures.filter(f => dividedAncestry.referenceIds.includes(f.feature.id));
			sheet.featuresReferenceOther = sheet.featuresReferenceOther?.concat(refAncestry);

			coveredFeatureIds = coveredFeatureIds.concat(ancestryFeatures.map(f => f.feature.id));
		}
		// #endregion

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

		// #region Kits / Modifiers
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
		// #endregion

		// #region Class Features
		if (hero.class) {
			const refAbilities = HeroLogic.getAbilities(hero, sourcebooks, false).map(a => a.ability);
			let classFeatures = FeatureLogic.getFeaturesFromClass(hero.class, hero)
				.filter(f => !coveredFeatureIds.includes(f.feature.id))
				.map(f => {
					f.feature = CharacterSheetFormatter.fixClassAbilityNames(f.feature, refAbilities);
					return f;
				});

			coveredFeatureIds = coveredFeatureIds.concat(classFeatures.map(f => f.feature.id));
			classFeatures = classFeatures.filter(f => this.includeFeature(f.feature, options));

			const perkIds = classFeatures.map(f => f.feature)
				.filter(f => (f.type === FeatureType.Perk) || f.id.startsWith('perk-'))
				.flatMap(f => (f.type === FeatureType.Perk) ? f.data.selected.map(p => p.id) : f.id);
			classFeatures = classFeatures.filter(f => !perkIds.includes(f.feature.id));

			let classFeatureSpace = 53;
			if (sheet.heroicResourceGains?.length || 0 > 3) {
				const extraLines = sheet.heroicResourceGains?.slice(3).reduce((sum, g) => sum + CharacterSheetFormatter.countLines(g.trigger, 40), 0) || 0;
				classFeatureSpace -= 2 * extraLines;
			}
			const dividedClassFeatures = CharacterSheetFormatter.divideFeatures(classFeatures.map(f => f.feature), classFeatureSpace);

			sheet.classFeatures = CharacterSheetFormatter.convertFeatures(dividedClassFeatures.displayed);

			const referenceFeatures = classFeatures.filter(f => dividedClassFeatures.referenceIds.includes(f.feature.id));
			sheet.featuresReferenceOther = sheet.featuresReferenceOther?.concat(referenceFeatures);
		}
		// #endregion

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

		if (hero.career) {
			sheet.career = this.buildCareerSheet(hero.career);

			coveredFeatureIds = coveredFeatureIds.concat(hero.career.features.map(f => f.id));
		}

		if (hero.complication) {
			sheet.complication = this.buildComplicationSheet(hero.complication);

			coveredFeatureIds = coveredFeatureIds.concat(sheet.complication.benefits.map(f => f.id));
			coveredFeatureIds = coveredFeatureIds.concat(sheet.complication.drawbacks.map(f => f.id));
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
			const cultureFeatures = FeatureLogic.getFeaturesFromCulture(hero.culture, hero).map(f => f.feature);
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

		// #region Abilities
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

		const standard = HeroLogic.getAbilities(FactoryLogic.createHero([]), sourcebooks, true).map(a => a.ability);
		sheet.standardAbilities = standard.map(a => this.buildAbilitySheet(a, hero));

		coveredAbilityIds = coveredAbilityIds
			.concat(sheet.otherRollAbilities.map(a => a.id))
			.concat(sheet.otherAbilities.map(a => a.id));

		coveredFeatureIds = coveredFeatureIds.concat(
			allFeatures.filter(f => [ FeatureType.ClassAbility, FeatureType.Ability ].includes(f.feature.type))
				.map(f => f.feature.id));
		// #endregion

		// Feature coverage check
		const missedFeatures: { feature: Feature; source: string; }[] = [];
		allFeatures.filter(f => !coveredFeatureIds.includes(f.feature.id)).forEach(f => missedFeatures.push(f));
		if (missedFeatures.length) {
			console.warn('Missed features! - adding to "other"', missedFeatures);
			sheet.featuresReferenceOther = (sheet.featuresReferenceOther || []).concat(missedFeatures);
		}
		// Ability coverage check
		const missedAbilities: Ability[] = [];
		abilities.filter(a => !coveredAbilityIds.includes(a.id)).forEach(a => missedAbilities.push(a));
		if (missedAbilities.length) {
			console.warn('Missed Abilities!', missedAbilities);
		}

		return sheet;
	};

	// #region Helper Methods

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
			|| /-d$/.test(f.id));
	};

	static minimalFeatureTypes: FeatureType[] = [
		FeatureType.Text,
		FeatureType.Package,
		FeatureType.PackageContent
	];

	static nonBasicFeatureTypes: FeatureType[] = [
		FeatureType.Text,
		FeatureType.Package,
		FeatureType.PackageContent,
		FeatureType.Ability,
		FeatureType.HeroicResource,
		FeatureType.Kit
	];

	static includeFeature = (f: Feature, options: Options): boolean => {
		switch (options.featuresInclude) {
			case 'minimal':
				return this.minimalFeatureTypes.includes(f.type);
			case 'no-basic':
				return this.isNotBasicFeature(f);
			case 'all':
			default:
				return true;
		}
	};

	static isNotBasicFeature(f: Feature) {
		let notBasic = this.nonBasicFeatureTypes.includes(f.type);
		if (notBasic && f.type === FeatureType.Kit) {
			notBasic = f.description.length > 0;
		} else if (notBasic && f.type === FeatureType.HeroicResource) {
			notBasic = f.data.details.length > 0;
		}

		return notBasic;
	}
	// #endregion

	// #region Ability Sheet
	static buildAbilitySheet = (ability: Ability, hero: Hero): AbilitySheet => {
		const sheet: AbilitySheet = {
			id: ability.id,
			abilityType: 'Ability',
			name: ability.name,
			description: ability.description,
			isSignature: false,
			cost: Number(ability.cost) || 0,
			actionType: ability.type.usage.toString(),
			keywords: ability.keywords.join(', '),
			target: ability.target,
			trigger: ability.type.trigger,
			hasPowerRoll: false
		};

		sheet.name = sheet.name.replace(/\s*Benefit and Drawback\s*/, '').trim();

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
				sheet.name = 'Melee Free Strike';
			} else if (ability.name.toLowerCase().includes('ranged')) {
				sheet.name = 'Ranged Free Strike';
			}
		} else if (ability.type.usage === AbilityUsage.Maneuver) {
			sheet.abilityType = 'Maneuver';
		} else if (ability.type.usage === AbilityUsage.Move) {
			sheet.abilityType = 'Move Action';
		} else if (ability.keywords.includes('Performance')) {
			sheet.abilityType = 'Performance';
		}

		if (sheet.actionType && ability.type.free) {
			sheet.actionType = `Free ${sheet.actionType}`;
		}

		sheet.qualifiers = ability.type.qualifiers;

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
				.map(c => HeroLogic.getCharacteristic(hero, c)));

			const characteristics = CharacterSheetFormatter.joinCommasOr(rollSection.roll.characteristic
				.sort(CharacterSheetFormatter.sortCharacteristics)
				.map(c => Format.capitalize(c.slice(0, 1)))
			);
			sheet.rollPower = `${rollPowerAmount} (${characteristics})`;

			sheet.rollT1Effect = CharacterSheetFormatter.formatAbilityTier(rollSection.roll.tier1, 1, ability, hero);
			sheet.rollT2Effect = CharacterSheetFormatter.formatAbilityTier(rollSection.roll.tier2, 2, ability, hero);
			sheet.rollT3Effect = CharacterSheetFormatter.formatAbilityTier(rollSection.roll.tier3, 3, ability, hero);
		}

		return sheet;
	};
	// #endregion

	// #region Career Sheet
	static buildCareerSheet = (career: Career): CareerSheet => {
		const sheet: CareerSheet = {
			id: career.id,
			name: career.name,
			benefits: []
		};

		const careerFeatures = career.features;
		sheet.benefits = CharacterSheetFormatter.convertFeatures(careerFeatures);
		sheet.incitingIncident = career.incitingIncidents.selected || undefined;

		return sheet;
	};
	// #endregion

	// #region Item Sheet
	static buildItemSheet = (item: Item, hero: Hero): ItemSheet => {
		const features = FeatureLogic.getFeaturesFromItem(item, hero).map(f => f.feature);
		const sheet: ItemSheet = {
			id: item.id,
			item: item,
			effect: item.effect,
			features: features
		};

		if (!item.effect.length) {
			sheet.effect = features.find(f => f.id === item.id)?.description || '';
		}

		return sheet;
	};
	// #endregion

	// #region Complication Sheet
	static buildComplicationSheet = (complication: Complication): ComplicationSheet => {
		const sheet: ComplicationSheet = {
			id: complication.id,
			name: complication.name,
			description: complication.description,
			benefits: [],
			drawbacks: []
		};

		const complicationFeatures = complication.features;

		const drawbacks = complicationFeatures.filter(this.isFeatureDrawback)
			.map(f => this.stripDuplicateComplicationName(complication.name, f));
		sheet.drawbacks = drawbacks;

		const benefits = complicationFeatures.filter(f => !this.isFeatureDrawback(f))
			.map(f => this.stripDuplicateComplicationName(complication.name, f));
		sheet.benefits = benefits;

		return sheet;
	};

	static stripDuplicateComplicationName = (complicationName: string, f: Feature) => {
		if (f.type === FeatureType.Text && f.name.startsWith(complicationName)) {
			f.name = '';
		} else if (f.type === FeatureType.Ability) {
			f.name = f.name.replace(/\s*Benefit and Drawback\s*/, '').trim();
		}
		return f;
	};
	// #endregion
}
