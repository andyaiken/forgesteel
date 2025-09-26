import { AbilityLogic } from './ability-logic';
import { FeatureType } from '../enums/feature-type';
import { Hero } from '../models/hero';
import { Modifier } from '../models/damage-modifier';
import { ModifierLogic } from './modifier-logic';
import { Monster } from '../models/monster';
import { MonsterLogic } from './monster-logic';
import { Utils } from '../utils/utils';

export class SummonLogic {
	static getSummonedMonster = (monster: Monster, controller: Hero) => {
		const copy = Utils.copy(monster);

		const handleModifier = (mod: Modifier) => {
			return (mod.valueCharacteristics.length > 0) || (mod.valuePerEchelon > 0) || (mod.valuePerLevel > 0);
		};

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
								s.roll.crit = AbilityLogic.getTextEffect(s.roll.crit, controller);
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

		return copy;
	};
}
