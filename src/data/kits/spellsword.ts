import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Kit } from '../../models/kit';
import { KitArmor } from '../../enums/kit-armor';
import { KitWeapon } from '../../enums/kit-weapon';

export const spellsword: Kit = {
	id: 'kit-spellsword',
	name: 'Spellsword',
	description: 'The Spellsword kit combines melee strikes and a little bit of magic, letting you create a warrior who doesn\'t have to choose between the incantation and the blade.',
	type: '',
	armor: [ KitArmor.Light, KitArmor.Shield ],
	weapon: [ KitWeapon.Medium ],
	stamina: 6,
	speed: 1,
	stability: 1,
	meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-spellsword-signature',
				name: 'Leaping Lightning',
				description: 'Lightning jumps from your weapon as you strike to harm a nearby foe.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'One creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '3 + M, R, I or P lightning damage',
							tier2: '6 + M, R, I or P lightning damage',
							tier3: '9 + M, R, I or P lightning damage'
						})
					),
					FactoryLogic.createAbilitySectionText('A creature or object of your choice within 2 squares of the target takes lightning damage equal to the characteristic score used for this ability\'s power roll.')
				]
			})
		})
	]
};
