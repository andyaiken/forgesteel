import { FactoryLogic } from '@/logic/factory-logic';
import { Kit } from '@/models/kit';

export const warBeast: Kit = {
	id: 'kit-war-beast',
	name: 'War Beast',
	description: '',
	type: 'Beastheart',
	armor: [],
	weapon: [],
	stamina: 9,
	speed: 0,
	stability: 2,
	meleeDamage: FactoryLogic.createKitDamageBonus(0, 0, 4),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		// TODO: Features
		// TODO: Ability
	]
};
