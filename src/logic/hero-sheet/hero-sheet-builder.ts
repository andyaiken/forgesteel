import { CareerSheet, ComplicationSheet, FollowerSheet, HeroSheet, ProjectSheet } from '@/models/classic-sheets/hero-sheet';
import { AbilityData } from '@/data/ability-data';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Career } from '@/models/career';
import { Characteristic } from '@/enums/characteristic';
import { ClassicSheetBuilder } from '@/logic/classic-sheet/classic-sheet-builder';
import { ClassicSheetLogic } from '@/logic/classic-sheet/classic-sheet-logic';
import { Collections } from '@/utils/collections';
import { Complication } from '@/models/complication';
import { ConditionType } from '@/enums/condition-type';
import { CreatureLogic } from '@/logic/creature-logic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { Feature } from '@/models/feature';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureType } from '@/enums/feature-type';
import { Follower } from '@/models/follower';
import { Format } from '@/utils/format';
import { FormatLogic } from '@/logic/format-logic';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { ModifierLogic } from '@/logic/modifier-logic';
import { Monster } from '@/models/monster';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterSheet } from '@/models/classic-sheets/monster-sheet';
import { Options } from '@/models/options';
import { Project } from '@/models/project';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { SheetPageSize } from '@/enums/sheet-page-size';
import { SkillList } from '@/enums/skill-list';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Summon } from '@/models/summon';

export class HeroSheetBuilder {
	static buildHeroSheet = (hero: Hero, sourcebooks: Sourcebook[], options: Options): HeroSheet => {
		const sheet: HeroSheet = {
			hero: hero,
			name: hero.name,

			stamina: {},
			recoveries: {},

			modifierTypes: [],
			immunities: [],
			weaknesses: [],
			abilities: [],
			standardAbilities: [],
			projects: [],
			followers: [],
			summons: [],
			featuresReferenceOther: [],
			extraReferenceItems: [],

			notes: hero.state.notes
		};

		const coveredFeatureIds: string[] = [];
		const allFeatures = HeroLogic.getFeatures(hero);

		// Package Contents handled within packages
		const packageContents = allFeatures.filter(f => f.feature.type == FeatureType.PackageContent);
		coveredFeatureIds.push(...packageContents.map(p => p.feature.id));

		sheet.currentVictories = hero.state.victories;
		sheet.wealth = hero.state.wealth;
		sheet.renown = HeroLogic.getRenown(hero);
		sheet.xp = hero.state.xp;

		const featureItems = allFeatures.map(f => f.feature)
			.filter(f => f.type === FeatureType.ItemChoice)
			.flatMap(f => f.data.selected);

		const inventory = hero.state.inventory.concat(featureItems);
		sheet.inventory = inventory.map(item => ClassicSheetBuilder.buildItemSheet(item, hero, options));
		coveredFeatureIds.push(...inventory.flatMap(i => FeatureLogic.getFeaturesFromItem(i, hero).map(f => f.feature).map(f => f.id) || []));

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
				sheet.heroicResourceGains = [ ...heroicResource.gains ].sort(SheetFormatter.sortHeroicResourceGains);
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
			sheet.ancestryName = SheetFormatter.fixAncestryName(hero.ancestry.name);
			// Ancestry features/traits moved to combine with Perks below
		}
		// #endregion

		sheet.size = FormatLogic.getSize(HeroLogic.getSize(hero));
		sheet.speed = FormatLogic.getSpeed(HeroLogic.getSpeed(hero));
		sheet.disengage = HeroLogic.getDisengage(hero);
		sheet.stability = HeroLogic.getStability(hero);

		sheet.stamina = {
			max: HeroLogic.getStamina(hero),
			current: HeroLogic.getStamina(hero) - hero.state.staminaDamage,
			temp: hero.state.staminaTemp,
			windedAt: HeroLogic.getWindedThreshold(hero),
			deadAt: HeroLogic.getDeadThreshold(hero)
		};

		sheet.recoveries = {
			max: HeroLogic.getRecoveries(hero),
			value: HeroLogic.getRecoveryValue(hero),
			current: HeroLogic.getRecoveries(hero) - hero.state.recoveriesUsed
		};

		sheet.surgeDamageAmount = SheetFormatter.addSign(HeroLogic.calculateSurgeDamage(hero));
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
			sheet.modifierName = kits.map(k => k.name).join(' & ');
			sheet.modifierWeaponImplement = kits.map(k => k.weapon[0]).filter(v => v).join(', ');
			sheet.modifierArmorWard = [ ...new Set(kits.map(k => k.armor[0]).filter(v => v)) ].join(', ');

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
				.filter(f => !ClassicSheetLogic.isClassFeatureInKit(f));
			sheet.modifierBenefits = SheetFormatter.convertFeaturesShort(kitFeatures);

			coveredFeatureIds.push(...kitFeatures.map(f => f.id));
		} else if (modifiers) {
			modifiers.forEach(modifier => {
				if (modifier.name.match(' Augmentation')) {
					sheet.modifierTypes.push('Augmentation');
					sheet.modifierName = modifier.name;
				} else if (modifier.name.match('Ward')) {
					sheet.modifierTypes.push('Ward');
					sheet.modifierArmorWard = modifier.name;
				} else if (modifier.name.match('Prayer of')) {
					sheet.modifierTypes.push('Prayer');
					sheet.modifierName = modifier.name;
				} else if (modifier.name.match('Enchantment of')) {
					sheet.modifierTypes.push('Enchantment');
					sheet.modifierName = modifier.name;
				}

				switch (modifier.type) {
					case FeatureType.Multiple:
						modifier.data.features.forEach(f => {
							HeroSheetBuilder.populateModifierAugmentation(f, hero, sheet);
							coveredFeatureIds.push(f.id);
						});
						break;
					default:
						HeroSheetBuilder.populateModifierAugmentation(modifier, hero, sheet);
						coveredFeatureIds.push(modifier.id);
						break;
				}
			});
			sheet.modifierBenefits = SheetFormatter.convertFeaturesShort(modifiers);
		}
		// #endregion

		// #region Class Features
		if (hero.class) {
			const refAbilities = HeroLogic.getAbilities(hero, sourcebooks, []).map(a => a.ability);
			let classFeatures = FeatureLogic.getFeaturesFromClass(hero.class, hero)
				.filter(f => !coveredFeatureIds.includes(f.feature.id))
				.map(f => {
					f.feature = SheetFormatter.fixClassAbilityNames(f.feature, refAbilities);
					return f;
				});

			coveredFeatureIds.push(...classFeatures.map(f => f.feature.id));
			classFeatures = classFeatures.filter(f => ClassicSheetLogic.includeFeature(f.feature, options));

			const perkIds = classFeatures.map(f => f.feature)
				.filter(f => (f.type === FeatureType.Perk) || f.id.startsWith('perk-'))
				.flatMap(f => (f.type === FeatureType.Perk) ? f.data.selected.map(p => p.id) : f.id);
			classFeatures = classFeatures.filter(f => !perkIds.includes(f.feature.id));

			let classFeatureSpace = 0;
			let classFeatureLineLen = 0;
			let numCols = 2;
			if (options.pageOrientation === 'portrait') {
				if (options.classicSheetPageSize === SheetPageSize.Letter) {
					classFeatureSpace = 27.5;
					classFeatureLineLen = 65;
				} else {
					classFeatureSpace = 33;
					classFeatureLineLen = 60;
				}
			} else { // landscape
				numCols = 1;
				if (options.classicSheetPageSize === SheetPageSize.Letter) {
					classFeatureSpace = 40;
					classFeatureLineLen = 55;
				} else {
					classFeatureSpace = 38;
					classFeatureLineLen = 75;
				}
			}
			if (Math.max(sheet.immunities.length, sheet.weaknesses.length) > 3) {
				const extraLines = Math.ceil(Math.max(sheet.immunities.length, sheet.weaknesses.length) / 2);
				classFeatureSpace -= 2 * extraLines;
			}
			classFeatureSpace = classFeatureSpace * numCols;
			const dividedClassFeatures = SheetFormatter.divideFeatures(classFeatures, hero, classFeatureSpace, classFeatureLineLen, numCols);

			sheet.classFeatures = SheetFormatter.enhanceFeatures(SheetFormatter.convertFeatures(dividedClassFeatures.displayed));

			const referenceFeatures = dividedClassFeatures.reference;
			sheet.featuresReferenceOther.push(...referenceFeatures);
			sheet.extraReferenceItems.push(...dividedClassFeatures.extraReferenceItems);
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
		sheet.saveTarget = HeroLogic.getSaveThreshold(hero);
		sheet.saveBonus = HeroLogic.getSaveBonus(hero);

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

			coveredFeatureIds.push(...hero.career.features.map(f => f.id));
		}

		if (hero.complication) {
			sheet.complication = this.buildComplicationSheet(hero.complication);

			coveredFeatureIds.push(...sheet.complication.benefits.map(f => f.id));
			coveredFeatureIds.push(...sheet.complication.drawbacks.map(f => f.id));
		}

		const skillsMap = new Map<string, string[]>();
		const allSkills = SourcebookLogic.getSkills(sourcebooks).reduce((map, skill) => {
			const skillList = map.get(skill.list.toString()) || [];
			skillList.push(skill.name);
			map.set(skill.list.toString(), Collections.distinct(skillList, s => s).sort());
			return map;
		}, skillsMap);
		sheet.allSkills = new Map([ ...allSkills.entries() ].sort());

		const heroSkills = HeroLogic.getSkills(hero, sourcebooks);
		const customSkills = heroSkills.filter(s => s.list === SkillList.Custom);
		if (customSkills.length) {
			sheet.allSkills.set(SkillList.Custom, customSkills.map(s => s.name));
		}
		sheet.skills = heroSkills.map(s => s.name);
		coveredFeatureIds.push(...allFeatures
			.filter(f => f.feature.type === FeatureType.SkillChoice)
			.map(f => f.feature.id));

		// Culture
		if (hero.culture) {
			const cultureFeatures = FeatureLogic.getFeaturesFromCulture(hero.culture, hero).map(f => f.feature);
			sheet.culture = hero.culture;
			coveredFeatureIds.push(...cultureFeatures.map(f => f.id));
		}

		sheet.languages = HeroLogic.getLanguages(hero, sourcebooks).map(l => l.name);
		coveredFeatureIds.push(...allFeatures
			.filter(f => [ FeatureType.Language, FeatureType.LanguageChoice ].includes(f.feature.type))
			.map(f => f.feature.id));

		// #region Ancestry + Perks (combined)
		const combinedAncestryPerks: { feature: Feature, source: string }[] = [];
		if (hero.ancestry) {
			const ancestryFeatures = FeatureLogic.getFeaturesFromAncestry(hero.ancestry, hero);
			combinedAncestryPerks.push(...ancestryFeatures
				.filter(f => ClassicSheetLogic.includeFeature(f.feature, options))
				.filter(f => f.feature.type !== FeatureType.Choice)
				.map(f => ({ feature: f.feature, source: f.source })));

			coveredFeatureIds.push(...ancestryFeatures.map(f => f.feature.id));
		}

		combinedAncestryPerks.push(...HeroLogic.getPerks(hero)
			.filter(p => ClassicSheetLogic.includeFeature(p, options))
			.map(p => ({ feature: p as Feature, source: 'Perks' }))
		);

		let perkSpace = 0;
		let perkLineLen = 0;
		if (options.pageOrientation === 'portrait') {
			if (options.classicSheetPageSize === SheetPageSize.Letter) {
				perkSpace = 42;
				perkLineLen = 60;
			} else {
				perkSpace = 47;
				perkLineLen = 55;
			}
		} else { // landscape
			if (options.classicSheetPageSize === SheetPageSize.Letter) {
				perkSpace = 47;
				perkLineLen = 60;
			} else {
				perkSpace = 45;
				perkLineLen = 75;
			}
		}
		const divided = SheetFormatter.divideFeatures(combinedAncestryPerks, hero, perkSpace * 2, perkLineLen, 2);
		sheet.ancestryTraitsPerksCombined = SheetFormatter.convertFeatures(divided.displayed);

		const additional = divided.reference;
		sheet.featuresReferenceOther.push(...additional);
		coveredFeatureIds.push(...combinedAncestryPerks.map(f => f.feature.id));
		sheet.extraReferenceItems.push(...divided.extraReferenceItems);
		// #endregion

		const titles = HeroLogic.getTitles(hero);
		sheet.titles = titles;
		coveredFeatureIds.push(...titles.flatMap(t => t.features.map(f => f.id)));
		coveredFeatureIds.push(...allFeatures
			.filter(f => [ FeatureType.TitleChoice ].includes(f.feature.type))
			.map(f => f.feature.id));

		sheet.projects = hero.state.projects.map(p => this.buildProjectSheet(p, hero));

		// #region Abilities
		const abilities = HeroLogic.getAbilities(hero, sourcebooks, []).map(a => a.ability);

		const freeStrikes = [ AbilityData.freeStrikeMelee, AbilityData.freeStrikeRanged ]
			.map(a => ClassicSheetBuilder.buildAbilitySheet(a, hero, undefined, options));
		sheet.abilities = abilities.map(a => ClassicSheetBuilder.buildAbilitySheet(a, hero, undefined, options)).concat(freeStrikes);

		sheet.standardAbilities = AbilityData.standardAbilities.map(a => ClassicSheetBuilder.buildAbilitySheet(a, hero, undefined, options));

		coveredFeatureIds.push(...allFeatures
			.filter(f => [ FeatureType.ClassAbility, FeatureType.Ability ].includes(f.feature.type))
			.map(f => f.feature.id));
		// #endregion

		const retinue = allFeatures.filter(f => [ FeatureType.Follower, FeatureType.Retainer, FeatureType.Companion, FeatureType.Summon, FeatureType.SummonChoice ].includes(f.feature.type))
			.map(f => f.feature);
		sheet.followers = retinue.flatMap(f => this.buildFollowerCompanionSheet(f, hero)).filter(s => !!s);
		sheet.summons = retinue.filter(f => f.type === FeatureType.SummonChoice).flatMap(f => f.data.selected)
			.filter(f => CreatureLogic.isSummon(f)).map(f => this.buildSummonSheet(f, hero)).filter(s => !!s);

		coveredFeatureIds.push(...retinue.map(f => f.id));

		// Feature coverage check
		const missedFeatures: { feature: Feature; source: string; }[] = [];
		allFeatures.filter(f => !coveredFeatureIds.includes(f.feature.id)).forEach(f => missedFeatures.push(f));
		if (missedFeatures.length) {
			console.warn('Missed features! - adding to "other"', missedFeatures);
			sheet.featuresReferenceOther = (sheet.featuresReferenceOther || []).concat(missedFeatures);
		}
		return sheet;
	};

	// #region Helper Methods

	private static modifierFieldMapping: { [key: string]: (s: HeroSheet, v: string | number | undefined) => void } = {
		Stamina: (s, v) => s.modifierStamina = Number(v),
		Stability: (s, v) => s.modifierStability = Number(v),
		Speed: (s, v) => s.modifierSpeed = Number(v),
		Disengage: (s, v) => s.modifierDisengage = Number(v)
	};

	static populateModifierAugmentation = (feature: Feature, hero: Hero, sheet: HeroSheet) => {
		let value;
		switch (feature.type) {
			case FeatureType.Bonus: {
				value = ModifierLogic.calculateModifierValue(feature.data, hero);
				const field = feature.data.field.toString();
				HeroSheetBuilder.modifierFieldMapping[field](sheet, value);
				break;
			}
			case FeatureType.AbilityDistance:
				value = ModifierLogic.calculateModifierValue(feature.data, hero);
				if (feature.data.keywords.includes(AbilityKeyword.Melee))
					sheet.modifierMeleeDistance = value;
				if (feature.data.keywords.includes(AbilityKeyword.Ranged))
					sheet.modifierRangedDistance = value;
				break;
		}
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
		sheet.benefits = SheetFormatter.convertFeaturesShort(careerFeatures);
		sheet.incitingIncident = career.incitingIncidents.selected || undefined;

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

		const drawbacks = complicationFeatures.filter(ClassicSheetLogic.isFeatureDrawback)
			.map(f => this.stripDuplicateComplicationName(complication.name, f));
		sheet.drawbacks = drawbacks;

		const benefits = complicationFeatures.filter(f => !ClassicSheetLogic.isFeatureDrawback(f))
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

	// #region Follower Sheet
	static buildFollowerCompanionSheet = (feature: Feature, hero: Hero) => {
		if (feature.type === FeatureType.Follower) {
			return this.buildFollowerSheet(feature.data.follower);
		} else if ((feature.type === FeatureType.Retainer || feature.type === FeatureType.Companion) && feature.data.selected) {
			return this.buildRetainerSheet(feature.data.selected, hero.class?.level);
		} else if (feature.type === FeatureType.SummonChoice && feature.data.selected) {
			return feature.data.selected.filter(CreatureLogic.isCompanion).map(s => this.buildCompanionSheet(s, hero));
		}
	};

	static buildFollowerSheet = (follower: Follower): FollowerSheet => {
		// console.log(follower);
		const followerType = `${follower.type}`;
		const sheet: FollowerSheet = {
			id: follower.id,
			name: follower.name,
			classification: 'Follower',
			type: followerType,
			role: followerType,

			characteristics: ClassicSheetBuilder.buildCharacteristicsSheet(follower)
		};

		sheet.skills = follower.skills;
		sheet.languages = follower.languages;

		return sheet;
	};

	static buildRetainerSheet = (follower: Monster, heroLevel: number | undefined): FollowerSheet => {
		const level = MonsterLogic.getMonsterLevel(follower);
		const retainerType = `Lvl ${level} ${follower.role.type}`;
		const sheet: FollowerSheet = {
			id: follower.id,
			name: MonsterLogic.getMonsterName(follower),
			classification: 'Retainer',
			type: retainerType,
			role: follower.role.type,

			characteristics: ClassicSheetBuilder.buildCharacteristicsSheet(follower)
		};

		sheet.keywords = follower.keywords.join(', ');

		const speed = MonsterLogic.getSpeed(follower);
		sheet.size = FormatLogic.getSize(follower.size);
		sheet.speed = speed.value;
		sheet.stability = follower.stability;
		sheet.freeStrike = MonsterLogic.getFreeStrikeDamage(follower);

		const immunities = MonsterLogic.getDamageModifiers(follower, DamageModifierType.Immunity);
		sheet.immunity = immunities.map(mod => `${mod.damageType} ${mod.value}`).join(', ');
		const weaknesses = MonsterLogic.getDamageModifiers(follower, DamageModifierType.Weakness);
		sheet.weakness = weaknesses.map(mod => `${mod.damageType} ${mod.value}`).join(', ');
		sheet.movement = speed.modes.map(m => Format.capitalize(m)).join(', ');

		sheet.stamina = {
			max: MonsterLogic.getStamina(follower),
			current: Math.max(MonsterLogic.getStamina(follower) - follower.state.staminaDamage, 0),
			temp: follower.state.staminaTemp,
			windedAt: MonsterLogic.getWindedThreshold(follower),
			deadAt: MonsterLogic.getDeadThreshold(follower)
		};

		sheet.recoveries = {
			max: MonsterLogic.getRecoveries(follower),
			value: MonsterLogic.getRecoveryValue(follower),
			current: MonsterLogic.getRecoveries(follower) - follower.state.recoveriesUsed
		};

		sheet.features = MonsterLogic.getFeatures(follower)
			.filter(f => [ FeatureType.Text, FeatureType.AddOn ].includes(f.type));

		const abilities = MonsterLogic.getFeatures(follower)
			.filter(f => f.type === FeatureType.Ability)
			.map(f => f.data.ability);
		sheet.abilities = abilities.map(a => ClassicSheetBuilder.buildAbilitySheet(a, follower));

		const advancement = [];
		if ((!heroLevel || heroLevel >= 4) && follower.retainer?.level4?.type === FeatureType.Ability) {
			advancement.push({
				level: 4,
				ability: ClassicSheetBuilder.buildAbilitySheet(follower.retainer.level4.data.ability, follower)
			});
		}
		if ((!heroLevel || heroLevel >= 7) && follower.retainer?.level7?.type === FeatureType.Ability) {
			advancement.push({
				level: 7,
				ability: ClassicSheetBuilder.buildAbilitySheet(follower.retainer.level7.data.ability, follower)
			});
		}
		if ((!heroLevel || heroLevel >= 10) && follower.retainer?.level10?.type === FeatureType.Ability) {
			advancement.push({
				level: 10,
				ability: ClassicSheetBuilder.buildAbilitySheet(follower.retainer.level10.data.ability, follower)
			});
		}
		sheet.advancement = advancement;

		return sheet;
	};

	static buildCompanionSheet = (companion: Summon, hero: Hero): FollowerSheet => {
		const monster = companion.monster;
		const sheet: FollowerSheet = {
			id: companion.id,
			name: companion.name,
			classification: 'Companion',
			type: 'Companion',
			role: monster.role.type,

			characteristics: ClassicSheetBuilder.buildCharacteristicsSheet(monster)
		};

		sheet.keywords = monster.keywords.join(', ');

		const speed = MonsterLogic.getSpeed(monster);
		sheet.size = FormatLogic.getSize(monster.size);
		sheet.speed = speed.value;
		sheet.stability = monster.stability;
		sheet.freeStrike = MonsterLogic.getFreeStrikeDamage(monster);
		const immunities = MonsterLogic.getDamageModifiers(monster, DamageModifierType.Immunity);
		sheet.immunity = immunities.map(mod => `${mod.damageType} ${mod.value}`).join(', ');
		const weaknesses = MonsterLogic.getDamageModifiers(monster, DamageModifierType.Weakness);
		sheet.weakness = weaknesses.map(mod => `${mod.damageType} ${mod.value}`).join(', ');
		sheet.movement = speed.modes.map(m => Format.capitalize(m)).join(', ');
		sheet.skills = MonsterLogic.getSkills(monster, []).map(s => s.name);

		sheet.stamina = {
			max: HeroLogic.getStamina(hero),
			current: Math.max(HeroLogic.getStamina(hero) - monster.state.staminaDamage, 0),
			temp: monster.state.staminaTemp,
			windedAt: HeroLogic.getWindedThreshold(hero),
			deadAt: HeroLogic.getDeadThreshold(hero)
		};

		sheet.features = MonsterLogic.getFeatures(monster)
			.filter(f => [ FeatureType.Text, FeatureType.AddOn ].includes(f.type));

		const abilities = MonsterLogic.getFeatures(monster)
			.filter(f => f.type === FeatureType.Ability)
			.map(f => f.data.ability);
		sheet.abilities = abilities.map(a => ClassicSheetBuilder.buildAbilitySheet(a, monster));

		const level = hero.class?.level || 0;
		const advancement = [];
		if (level < 3 && companion.info.level3) {
			advancement.push({
				level: 3,
				features: companion.info.level3
			});
		}
		if (level < 6 && companion.info.level6) {
			advancement.push({
				level: 6,
				features: companion.info.level6
			});
		}
		if (level < 10 && companion.info.level10) {
			advancement.push({
				level: 10,
				features: companion.info.level10
			});
		}
		sheet.advancement = advancement;

		return sheet;
	};

	static buildSummonSheet = (summon: Summon, hero: Hero): MonsterSheet => {
		const monster = summon.monster;

		const sheet = ClassicSheetBuilder.buildMonsterSheet(monster);

		const signature = summon.info.isSignature ? 'Signature ' : '';
		const summonType = `${signature}Minion ${monster.role.type}`;
		sheet.type = summonType;

		let summonCost = `${summon.info.cost} essence `;
		summonCost += summon.info.count === 1 ? 'per minion summoned' : `for ${summon.info.count} minions`;
		sheet.cost = summonCost;
		sheet.freeStrikeDamageType = monster.freeStrikeType !== DamageType.Damage ? monster.freeStrikeType : '';

		const immunities = CreatureLogic.getSummonDamageModifiers(summon, hero, DamageModifierType.Immunity);
		sheet.immunity = immunities.map(mod => `${mod.damageType} ${mod.value}`).join(', ');
		return sheet;
	};
	// #endregion

	// #region Project Sheet
	static buildProjectSheet = (project: Project, hero: Hero): ProjectSheet => {
		const followers = HeroLogic.getFollowers(hero);
		const assignee = followers.find(f => f.id === project.progress?.followerID)?.name ?? '';

		let characteristics = SheetFormatter.joinCommasOr(project.characteristic
			.sort(SheetFormatter.sortCharacteristics)
			.map(c => Format.capitalize(c.slice(0, 1)))
		);
		if (characteristics === 'M, A, R, I or P') {
			characteristics = 'Any';
		}

		return {
			id: project.id,
			name: project.name,
			characteristic: characteristics,
			assignee: assignee,
			description: project.description,
			prerequisites: project.itemPrerequisites,
			havePrerequisites: project.progress?.prerequisites ?? false,
			source: project.source,
			haveSource: project.progress?.source ?? false,
			pointsGoal: project.goal,
			pointsCurrent: project.progress?.points
		};
	};
	// #endregion
}
