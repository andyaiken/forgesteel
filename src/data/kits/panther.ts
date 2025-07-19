import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Kit } from '../../models/kit';
import { KitWeapon } from '../../enums/kit-weapon';

export const panther: Kit = {
	id: 'kit-panther',
	name: 'Panther',
	description: 'If you want a good balance of protection, speed, and damage, the Panther kit is for you. This kit increases your Stamina not by wearing armor, but through the focused battle preparation of body and mind, letting you be fast and mobile while swinging a heavy weapon at your foes.',
	type: '',
	armor: [],
	weapon: [ KitWeapon.Heavy ],
	stamina: 6,
	speed: 1,
	stability: 1,
	meleeDamage: FactoryLogic.createKitDamageBonus(0, 0, 4),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-panther-signature',
				name: 'Devastating Rush',
				description: 'The faster you move, the harder you hit.',
				type: FactoryLogic.type.createAction(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: '1 creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '3 + M or A damage',
							tier2: '6 + M or A damage',
							tier3: '9 + M or A damage'
						})
					),
					FactoryLogic.createAbilitySectionText('You can move up to 3 squares straight toward the target before this attack. You deal extra damage equal to the distance moved this way.')
				]
			})
		})
	]
};
