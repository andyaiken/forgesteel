import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Kit } from '../../models/kit';
import { KitWeapon } from '../../enums/kit-weapon';

export const arcaneArcher: Kit = {
	id: 'kit-arcane-archer',
	name: 'Arcane Archer',
	description: 'The Arcane Archer kit allows you to combine magic and ranged weapon strikes. Your lack of armor keeps you mobile, and your magic makes your arrows explode to devastate your foes.',
	type: '',
	armor: [],
	weapon: [ KitWeapon.Bow ],
	stamina: 0,
	speed: 1,
	stability: 0,
	meleeDamage: null,
	rangedDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
	meleeDistance: 0,
	rangedDistance: 10,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-arcane-archer-signature',
				name: 'Exploding Arrow',
				description: 'Your ammunition explodes with magical energy.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createRanged(5) ],
				target: 'One creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '3 + A, R, I, or P fire damage',
							tier2: '5 + A, R, I, or P fire damage',
							tier3: '8 + A, R, I, or P fire damage'
						})
					),
					FactoryLogic.createAbilitySectionText('One creature or object of your choice within 2 squares of the target takes fire damage equal to the characteristic score used for this ability\'s power roll.')
				]
			})
		})
	]
};
