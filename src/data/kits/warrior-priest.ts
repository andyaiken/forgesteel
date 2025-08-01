import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Kit } from '../../models/kit';
import { KitArmor } from '../../enums/kit-armor';
import { KitWeapon } from '../../enums/kit-weapon';

export const warriorPriest: Kit = {
	id: 'kit-warrior-priest',
	name: 'Warrior Priest',
	description: 'The Warrior Priest kit imbues the power of the gods into your weapon, making it a smiting instrument. You wade into the fray without fear, thanks to the power of the divine … and the heavy armor you wear.',
	type: '',
	armor: [ KitArmor.Heavy ],
	weapon: [ KitWeapon.Light ],
	stamina: 9,
	speed: 1,
	stability: 1,
	meleeDamage: FactoryLogic.createKitDamageBonus(1, 1, 1),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-warrior-priest-signature',
				name: 'Weakening Brand',
				description: 'The impact of your weapon brands your target for destruction.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: '1 creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '2 + M, R, I, or P holy damage',
							tier2: '4 + M, R, I, or P holy damage',
							tier3: '7 + M, R, I, or P holy damage'
						})
					),
					FactoryLogic.createAbilitySectionText('Until the end of the target\'s next turn, they have damage weakness equal to the characteristic score used for this ability\'s power roll.')
				]
			})
		})
	]
};
