import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { FeatureField } from '@/enums/feature-field';
import { FeatureType } from '@/enums/feature-type';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { ModifierLogic } from '@/logic/modifier-logic';
import { Monster } from '@/models/monster';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { Summon } from '@/models/summon';

export class CreatureLogic {
	static getCharacteristic = (creature: Hero | Monster | undefined, characteristic: Characteristic) => {
		if (!creature) {
			return 0;
		} else if (CreatureLogic.isMonster(creature)) {
			return MonsterLogic.getCharacteristic(creature, characteristic);
		} else {
			return HeroLogic.getCharacteristic(creature, characteristic);
		}
	};

	static getField = (creature: Hero | Monster | undefined, field: FeatureField) => {
		if (!creature) {
			return 0;
		} else if (CreatureLogic.isMonster(creature)) {
			switch (field) {
				case FeatureField.Save:
					return 0;
				case FeatureField.Stamina:
					return MonsterLogic.getStamina(creature);
				default:
					return 0;
			}
		} else {
			switch (field) {
				case FeatureField.Save:
					return HeroLogic.getSaveBonus(creature);
				case FeatureField.Stamina:
					return HeroLogic.getStamina(creature);
				default:
					return 0;
			}
		}
	};

	static getSaveThreshold = (creature: Hero | Monster | undefined) => {
		if (!creature) {
			return 0;
		} else if (CreatureLogic.isMonster(creature)) {
			return 6;
		} else {
			return HeroLogic.getSaveThreshold(creature);
		}
	};

	static getCombatState = (creature: Hero | Monster | undefined) => {
		if (!creature) {
			return 'healthy';
		} else if (CreatureLogic.isMonster(creature)) {
			return MonsterLogic.getCombatState(creature);
		} else {
			return HeroLogic.getCombatState(creature);
		}
	};

	static isMonster = (creature: unknown): creature is Monster => {
		return creature !== undefined
			&& creature !== null
			&& typeof creature === 'object'
			&& 'withCaptain' in creature;
	};

	static isHero = (creature: unknown): creature is Hero => {
		return creature !== undefined
			&& creature !== null
			&& typeof creature === 'object'
			&& 'complication' in creature;
	};

	static isSummon = (creature: unknown): creature is Summon => {
		return creature !== undefined
			&& creature !== null
			&& typeof creature === 'object'
			&& 'monster' in creature
			&& (creature.monster as Monster).role.organization === MonsterOrganizationType.Minion;
	};

	static isCompanion = (creature: unknown): creature is Summon => {
		return creature !== undefined
			&& creature !== null
			&& typeof creature === 'object'
			&& 'monster' in creature
			&& (creature.monster as Monster).role.organization === MonsterOrganizationType.Companion;
	};

	static getEchelon = (level: number) => {
		return Math.max(1, Math.min(4, Math.floor((level - 1) / 3) + 1));
	};

	static getSummonDamageModifiers = (summon: Summon, summoner: Hero, type: DamageModifierType) => {
		const modifiers: { damageType: string, value: number }[] = [];
		const monster = summon.monster;
		// Collate from features
		MonsterLogic.getFeatures(monster)
			.filter(f => f.type === FeatureType.DamageModifier)
			.forEach(f => {
				f.data.modifiers
					.filter(dm => dm.type === type)
					.forEach(dm => {
						const value = ModifierLogic.calculateModifierValue(dm, summoner);

						const existing = modifiers.find(x => x.damageType === dm.damageType);
						if (existing) {
							existing.value += dm.value;
						} else {
							modifiers.push({
								damageType: dm.damageType,
								value: value
							});
						}
					});
			});

		return Collections.sort(modifiers, dm => dm.damageType);
	};
}
