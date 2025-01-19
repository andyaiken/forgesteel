import { Characteristic } from '../enums/characteristic';
import { DamageModifierType } from '../enums/damage-modifier-type';

export interface Modifier {
	value: number,
	valueCharacteristics: Characteristic[];
	valuePerLevel: number;
	valuePerEchelon: number;
}

export interface DamageModifier extends Modifier {
	damageType: string;
	type: DamageModifierType;
}
