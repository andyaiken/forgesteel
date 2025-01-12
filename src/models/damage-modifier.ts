import { Characteristic } from '../enums/characteristic';
import { DamageModifierType } from '../enums/damage-modifier-type';

export interface DamageModifier {
	damageType: string;
	type: DamageModifierType;
	value: number,
	valueCharacteristics: Characteristic[];
	valuePerLevel: number;
	valuePerEchelon: number;
}
