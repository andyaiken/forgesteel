import { Collections } from '@/utils/collections';
import { CreatureLogic } from '@/logic/creature-logic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { FeatureDamageModifier } from '@/models/feature';
import { Hero } from '@/models/hero';
import { Modifier } from '@/models/damage-modifier';
import { Monster } from '@/models/monster';
import { MonsterLogic } from '@/logic/monster-logic';

export class ModifierLogic {
	static getDamageModifiers = (features: FeatureDamageModifier[], creature: Hero | Monster) => {
		const damageTypes: { damageType: string, immunities: number[], weaknesses: number[] }[] = [];

		// Collate from features
		features.forEach(f => {
			f.data.modifiers
				.forEach(dm => {
					const value = ModifierLogic.calculateModifierValue(dm, creature);

					const existing = damageTypes.find(x => x.damageType === dm.damageType);
					if (existing) {
						switch (dm.type) {
							case DamageModifierType.Immunity:
								existing.immunities.push(value);
								break;
							case DamageModifierType.Weakness:
								existing.weaknesses.push(value);
								break;
						}
					} else {
						switch (dm.type) {
							case DamageModifierType.Immunity:
								damageTypes.push({ damageType: dm.damageType, immunities: [ value ], weaknesses: [] });
								break;
							case DamageModifierType.Weakness:
								damageTypes.push({ damageType: dm.damageType, immunities: [], weaknesses: [ value ] });
								break;
						}
					}
				});
		});

		const modifiers: { damageType: string, modifierType: DamageModifierType, value: number }[] = [];
		damageTypes.forEach(dt => {
			const immunityMax = Math.max(...dt.immunities, 0);
			const weaknessMax = Math.max(...dt.weaknesses, 0);
			if (immunityMax > weaknessMax) {
				modifiers.push({ damageType: dt.damageType, modifierType: DamageModifierType.Immunity, value: immunityMax - weaknessMax });
			}
			if (weaknessMax > immunityMax) {
				modifiers.push({ damageType: dt.damageType, modifierType: DamageModifierType.Weakness, value: weaknessMax - immunityMax });
			}
		});

		return Collections.sort(modifiers, dm => dm.damageType);
	};

	static calculateModifierValue = (modifier: Modifier, creature: Hero | Monster) => {
		let value;

		if (modifier.valueFromController) {
			if (CreatureLogic.isHero(creature)) {
				value = CreatureLogic.getField(creature, modifier.valueFromController);
			} else {
				value = 0;
			}
		} else {
			value = modifier.value;
		}

		if (modifier.valueCharacteristics.length > 0) {
			const characteristicValue = Collections.max(modifier.valueCharacteristics.map(ch => CreatureLogic.getCharacteristic(creature, ch)), v => v) || 0;
			const multiplier = modifier.valueCharacteristicMultiplier || 1;
			value += characteristicValue * multiplier;
		}

		let level;
		if (CreatureLogic.isMonster(creature)) {
			level = MonsterLogic.getMonsterLevel(creature);
		} else {
			level = creature.class ? creature.class.level : 0;
		}
		value += modifier.valuePerLevel * (level - 1);
		value += modifier.valuePerEchelon * CreatureLogic.getEchelon(level);

		return value;
	};
}
