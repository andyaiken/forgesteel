import { Ability } from '@/models/ability';
import { AbilityLogic } from '@/logic/ability-logic';
import { AbilitySheet } from '@/models/classic-sheets/ability-sheet';
import { AbilityUsage } from '@/enums/ability-usage';
import { Characteristic } from '@/enums/characteristic';
import { CharacteristicsSheet } from '@/models/classic-sheets/classic-sheets';
import { ClassicSheetLogic } from './classic-sheet-logic';
import { CreatureLogic } from '@/logic/creature-logic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { FeatureLogic } from '../feature-logic';
import { FeatureType } from '@/enums/feature-type';
import { Follower } from '@/models/follower';
import { Format } from '@/utils/format';
import { FormatLogic } from '../format-logic';
import { Hero } from '@/models/hero';
import { HeroLogic } from '../hero-logic';
import { Item } from '@/models/item';
import { ItemSheet } from '@/models/classic-sheets/hero-sheet';
import { ItemType } from '@/enums/item-type';
import { Monster } from '@/models/monster';
import { MonsterLogic } from '../monster-logic';
import { MonsterSheet } from '@/models/classic-sheets/monster-sheet';
import { Options } from '@/models/options';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Summon } from '@/models/summon';

export class ClassicSheetBuilder {
	static buildCharacteristicsSheet = (creature: Hero | Monster | Follower | undefined): CharacteristicsSheet => {
		if (!creature) {
			return {
				might: 0,
				agility: 0,
				reason: 0,
				intuition: 0,
				presence: 0
			};
		} else if (CreatureLogic.isHero(creature)) {
			return {
				might: HeroLogic.getCharacteristic(creature, Characteristic.Might),
				agility: HeroLogic.getCharacteristic(creature, Characteristic.Agility),
				reason: HeroLogic.getCharacteristic(creature, Characteristic.Reason),
				intuition: HeroLogic.getCharacteristic(creature, Characteristic.Intuition),
				presence: HeroLogic.getCharacteristic(creature, Characteristic.Presence)
			};
		} else if (CreatureLogic.isMonster(creature)) {
			return {
				might: MonsterLogic.getCharacteristic(creature, Characteristic.Might),
				agility: MonsterLogic.getCharacteristic(creature, Characteristic.Agility),
				reason: MonsterLogic.getCharacteristic(creature, Characteristic.Reason),
				intuition: MonsterLogic.getCharacteristic(creature, Characteristic.Intuition),
				presence: MonsterLogic.getCharacteristic(creature, Characteristic.Presence)
			};
		} else {
			const follower = creature as Follower;
			return {
				might: follower.characteristics.find(c => c.characteristic === Characteristic.Might)?.value || 0,
				agility: follower.characteristics.find(c => c.characteristic === Characteristic.Agility)?.value || 0,
				reason: follower.characteristics.find(c => c.characteristic === Characteristic.Reason)?.value || 0,
				intuition: follower.characteristics.find(c => c.characteristic === Characteristic.Intuition)?.value || 0,
				presence: follower.characteristics.find(c => c.characteristic === Characteristic.Presence)?.value || 0
			};
		}
	};

	// #region Monster Sheet
	static buildMonsterSheet = (monster: Monster): MonsterSheet => {
		const level = MonsterLogic.getMonsterLevel(monster);
		const monsterType = `Lvl ${level} ${monster.role.organization} ${monster.role.type}`;

		const speed = MonsterLogic.getSpeed(monster);
		const immunities = MonsterLogic.getDamageModifiers(monster, DamageModifierType.Immunity);
		const weaknesses = MonsterLogic.getDamageModifiers(monster, DamageModifierType.Weakness);

		const sheet: MonsterSheet = {
			id: monster.id,
			name: MonsterLogic.getMonsterName(monster),
			type: monsterType,
			role: monster.role.type,

			characteristics: ClassicSheetBuilder.buildCharacteristicsSheet(monster),

			keywords: monster.keywords.join(', '),
			size: FormatLogic.getSize(monster.size),
			speed: speed.value,
			stamina: MonsterLogic.getStamina(monster),
			stability: monster.stability,
			freeStrike: MonsterLogic.getFreeStrikeDamage(monster),
			immunity: immunities.map(mod => `${mod.damageType} ${mod.value}`).join(', '),
			weakness: weaknesses.map(mod => `${mod.damageType} ${mod.value}`).join(', '),
			movement: speed.modes.map(m => Format.capitalize(m)).join(', '),
			withCaptain: monster.withCaptain
		};

		sheet.features = MonsterLogic.getFeatures(monster)
			.filter(f => [ FeatureType.Text, FeatureType.AddOn ].includes(f.type));

		const abilities = MonsterLogic.getFeatures(monster)
			.filter(f => f.type === FeatureType.Ability)
			.map(f => f.data.ability);
		sheet.abilities = abilities.map(a => ClassicSheetBuilder.buildAbilitySheet(a, monster));

		return sheet;
	};
	// #endregion

	// #region Ability Sheet
	static buildAbilitySheet = (ability: Ability, creature: Hero | Monster | Summon | undefined, summoner?: Hero): AbilitySheet => {
		const isMonster = CreatureLogic.isMonster(creature);
		const isHero = CreatureLogic.isHero(creature);
		const isSummon = CreatureLogic.isSummon(creature);
		const sheet: AbilitySheet = {
			id: ability.id,
			abilityType: ability.type.usage.toString(),
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

		if (isHero) {
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
		}

		if (isMonster || isSummon) {
			if (ability.cost === 'signature') {
				sheet.abilityType = 'Signature Ability';
			} else if (ability.cost > 0) {
				sheet.abilityType = `${ability.cost} Malice`;
			} else if (isMonster && creature.retainer?.level) {
				sheet.abilityType = 'Encounter';
			} else {
				sheet.abilityType = '';
			}
		}

		if (creature === undefined) {
			if (ability.cost !== 'signature' && ability.cost > 0) {
				sheet.abilityType = `${ability.cost} Malice`;
			} else {
				sheet.abilityType = '';
			}
		}

		if (sheet.actionType && ability.type.free) {
			sheet.actionType = `Free ${sheet.actionType}`;
		}

		sheet.qualifiers = ability.type.qualifiers;

		let refCreature = undefined;
		if (isSummon) {
			refCreature = creature.monster;
		} else {
			refCreature = creature;
		}

		if (ability.distance.length) {
			sheet.distance = ability.distance.map(d => AbilityLogic.getDistanceCreature(d, ability, refCreature)).join(', ');
		}

		const effectSections = ability.sections.filter(s => s.type !== 'roll');
		let effectText = SheetFormatter.abilitySections(effectSections, refCreature).trim();

		// Kind of hacky, but this is a one-off at the moment
		if (CreatureLogic.isHero(creature)
				&& ([ 'grab', 'knockback' ].includes(ability.id))
				&& HeroLogic.getFeatures(creature as Hero).find(f => f.feature.id === 'null-1-8')) { // Psionic Martial Arts id
			effectText = effectText.replace(/your Might/g, 'your Intuition');
		}
		sheet.effect = effectText;

		const rollSections = ability.sections.filter(s => s.type === 'roll');
		if (rollSections.length) {
			sheet.hasPowerRoll = true;
			const rollSection = rollSections[0];
			if (rollSections.length > 1) {
				console.warn('More than one roll section!', ability.name, rollSections);
			}

			if (isSummon) {
				sheet.rollPower = AbilityLogic.getPowerRollBonusValue(ability, summoner).toString();
			} else {
				sheet.rollPower = AbilityLogic.getPowerRollBonusValue(ability, refCreature).toString();
			}

			sheet.rollT1Effect = SheetFormatter.formatAbilityTier(rollSection.roll.tier1, 1, ability, refCreature);
			sheet.rollT2Effect = SheetFormatter.formatAbilityTier(rollSection.roll.tier2, 2, ability, refCreature);
			sheet.rollT3Effect = SheetFormatter.formatAbilityTier(rollSection.roll.tier3, 3, ability, refCreature);
		}

		return sheet;
	};
	// #endregion

	// #region Item Sheet
	static buildItemSheet = (item: Item, hero: Hero, options: Options): ItemSheet => {
		const features = FeatureLogic.getFeaturesFromItem(item, hero)
			.map(f => f.feature)
			.filter(f => ClassicSheetLogic.includeFeature(f, options));
		// console.log(features);
		const sheet: ItemSheet = {
			id: item.id,
			item: item,
			effect: SheetFormatter.enhanceMarkdown(item.effect),
			features: FeatureLogic.reduceFeatures(features)
		};

		if (item.imbuements.length) {
			sheet.effect = item.imbuements.map(imbuement => imbuement.feature)
				.reduce((effect, feature) => {
					if (feature.type === FeatureType.Text) {
						if (feature.description) {
							if (feature.name) {
								effect += '\n\n';
								effect += `**${feature.name}**`;
							}
							effect += '\n\n';
							effect += feature.description;
						}
					}
					return effect;
				}, '');
		}

		if (item.type === ItemType.Artifact) {
			sheet.effect = SheetFormatter.enhanceMarkdown(features.find(f => f.id === item.id)?.description ?? sheet.effect);
		}

		if (!sheet.effect.length) {
			sheet.effect = features.find(f => f.id === item.id)?.description ?? '';
		}

		return sheet;
	};
	// #endregion
}
