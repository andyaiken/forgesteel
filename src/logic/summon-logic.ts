import { AbilityLogic } from '@/logic/ability-logic';
import { Characteristic } from '@/enums/characteristic';
import { FeatureType } from '@/enums/feature-type';
import { Hero } from '@/models/hero';
import { Modifier } from '@/models/damage-modifier';
import { ModifierLogic } from '@/logic/modifier-logic';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { Summon } from '@/models/summon';
import { Utils } from '@/utils/utils';
import { beastheart } from '@/data/classes/beastheart/beastheart';

export class SummonLogic {
	static getSummonedMonster = (summon: Summon, controller: Hero) => {
		const copy = Utils.copy(summon.monster);

		const handleModifier = (mod: Modifier) => {
			return mod.valueFromController || (mod.valueCharacteristics.length > 0) || (mod.valuePerEchelon > 0) || (mod.valuePerLevel > 0);
		};

		if (summon.info.level >= 3) {
			copy.features.push(...summon.info.level3);
		}
		if (summon.info.level >= 6) {
			copy.features.push(...summon.info.level6);
		}
		if (summon.info.level >= 10) {
			copy.features.push(...summon.info.level10);
		}

		MonsterLogic.getFeatures(copy).forEach(f => {
			switch (f.type) {
				case FeatureType.Ability:
					f.data.ability.sections.forEach(s => {
						switch (s.type) {
							case 'field':
								s.effect = AbilityLogic.getTextEffect(s.effect, controller);
								break;
							case 'roll':
								s.roll.tier1 = AbilityLogic.getTextEffect(s.roll.tier1, controller);
								s.roll.tier2 = AbilityLogic.getTextEffect(s.roll.tier2, controller);
								s.roll.tier3 = AbilityLogic.getTextEffect(s.roll.tier3, controller);
								break;
							case 'text':
								s.text = AbilityLogic.getTextEffect(s.text, controller);
								break;
						}
					});
					break;
				case FeatureType.Bonus:
					if (handleModifier(f.data)) {
						const value = ModifierLogic.calculateModifierValue(f.data, controller);
						f.data.value = value;
						f.data.valueFromController = null;
						f.data.valueCharacteristics = [];
						f.data.valueCharacteristicMultiplier = 1;
						f.data.valuePerEchelon = 0;
						f.data.valuePerLevel = 0;
					}
					break;
				case FeatureType.DamageModifier:
					f.data.modifiers.forEach(dm => {
						if (handleModifier(dm)) {
							const value = ModifierLogic.calculateModifierValue(dm, controller);
							dm.value = value;
							dm.valueFromController = null;
							dm.valueCharacteristics = [];
							dm.valueCharacteristicMultiplier = 1;
							dm.valuePerEchelon = 0;
							dm.valuePerLevel = 0;
						}
					});
					break;
				case FeatureType.Text:
					f.description = AbilityLogic.getTextEffect(f.description, controller);
					break;
			}
		});

		if ((copy.role.organization === MonsterOrganizationType.Companion) && controller.class && (controller.class.id === beastheart.id)) {
			// This is a beastheart companion
			// It gains characteristic increases along with the hero
			if (controller.class.level >= 4) {
				copy.characteristics
					.filter(ch => [ Characteristic.Might, Characteristic.Intuition ].includes(ch.characteristic))
					.forEach(ch => ch.value += 1);
			}
			if (controller.class.level >= 7) {
				copy.characteristics
					.forEach(ch => ch.value += 1);
			}
			if (controller.class.level >= 10) {
				copy.characteristics
					.filter(ch => [ Characteristic.Might, Characteristic.Intuition ].includes(ch.characteristic))
					.forEach(ch => ch.value += 1);
			}
		}

		return copy;
	};
}
