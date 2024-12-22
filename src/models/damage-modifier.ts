import { DamageModifierType } from '../enums/damage-modifier-type';

export interface DamageModifier {
	damageType: string;
	type: DamageModifierType;
	value: number,
	valuePerLevel: number;
	valuePerEchelon: number;
}
