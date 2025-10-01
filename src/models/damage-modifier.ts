import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FeatureField } from '@/enums/feature-field';

export interface Modifier {
	value: number;
	valueFromController: FeatureField | null;
	valueCharacteristics: Characteristic[];
	valueCharacteristicMultiplier: number;
	valuePerLevel: number;
	valuePerEchelon: number;
}

export interface DamageModifier extends Modifier {
	damageType: DamageType;
	type: DamageModifierType;
}
