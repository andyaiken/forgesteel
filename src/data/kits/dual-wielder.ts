import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Kit } from '../../models/kit';
import { KitArmor } from '../../enums/kit-armor';
import { KitWeapon } from '../../enums/kit-weapon';

export const dualWielder: Kit = {
	id: 'kit-dual-wielder',
	name: 'Dual Wielder',
	description: 'The Dual Wielder kit is for folks who want to excel at using two weapons at the same time. The fighting style maximizes the power of each instrument in your hands, making you a whirling deliverer of death.',
	type: '',
	armor: [ KitArmor.Medium ],
	weapon: [ KitWeapon.Light, KitWeapon.Medium ],
	stamina: 6,
	speed: 2,
	stability: 0,
	meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-dual-wielder-signature',
				name: 'Double Strike',
				description: 'Why strike once when you could do it twice?',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: '2 creatures or objects',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '6 damage'
						})
					),
					FactoryLogic.createAbilitySectionText('If you use this ability on your turn, you can target one creature or object with it then use your maneuver and move action for that turn before targeting a second creature or object. You still use the same power roll for both targets.')
				]
			})
		})
	]
};
