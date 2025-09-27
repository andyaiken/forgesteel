import { Characteristic } from '@/enums/characteristic';
import { DamageModifier } from '@/models/damage-modifier';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';

export class FactoryDamageModifierLogic {
	create = (data: { damageType: DamageType, modifierType: DamageModifierType, value: number }): DamageModifier => {
		return {
			damageType: data.damageType,
			type: data.modifierType,
			value: data.value,
			valueCharacteristics: [],
			valueCharacteristicMultiplier: 1,
			valuePerLevel: 0,
			valuePerEchelon: 0
		};
	};

	createPerLevel = (data: { damageType: DamageType, modifierType: DamageModifierType, value: number }): DamageModifier => {
		return {
			damageType: data.damageType,
			type: data.modifierType,
			value: data.value,
			valueCharacteristics: [],
			valueCharacteristicMultiplier: 1,
			valuePerLevel: data.value,
			valuePerEchelon: 0
		};
	};

	createValuePlusPerLevel = (data: { damageType: DamageType, modifierType: DamageModifierType, value: number, perLevel: number }): DamageModifier => {
		return {
			damageType: data.damageType,
			type: data.modifierType,
			value: data.value + data.perLevel,
			valueCharacteristics: [],
			valueCharacteristicMultiplier: 1,
			valuePerLevel: data.perLevel,
			valuePerEchelon: 0
		};
	};

	createFirstLevelHigherLevel = (data: { damageType: DamageType, modifierType: DamageModifierType, first: number, higher: number }): DamageModifier => {
		return {
			damageType: data.damageType,
			type: data.modifierType,
			value: data.first,
			valueCharacteristics: [],
			valueCharacteristicMultiplier: 1,
			valuePerLevel: data.higher,
			valuePerEchelon: 0
		};
	};

	createPerEchelon = (data: { damageType: DamageType, modifierType: DamageModifierType, value: number }): DamageModifier => {
		return {
			damageType: data.damageType,
			type: data.modifierType,
			value: 0,
			valueCharacteristics: [],
			valueCharacteristicMultiplier: 1,
			valuePerLevel: 0,
			valuePerEchelon: data.value
		};
	};

	createCharacteristic = (data: { damageType: DamageType, modifierType: DamageModifierType, characteristics: Characteristic[], multiplier?: number }): DamageModifier => {
		return {
			damageType: data.damageType,
			type: data.modifierType,
			value: 0,
			valueCharacteristics: data.characteristics,
			valueCharacteristicMultiplier: data.multiplier || 1,
			valuePerLevel: 0,
			valuePerEchelon: 0
		};
	};
}
