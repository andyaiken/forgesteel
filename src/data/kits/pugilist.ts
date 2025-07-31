import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Kit } from '../../models/kit';
import { KitWeapon } from '../../enums/kit-weapon';

export const pugilist: Kit = {
	id: 'kit-pugilist',
	name: 'Pugilist',
	description: 'Meant for brawlers and boxers, the Pugilist kit gives you access to a melee fighting style that gives you a boost to Stamina and damage while allowing you to float like a butterfly. If you want to be a tough, strong hero who doles out punishment with your fists, then this kit is for you.',
	type: '',
	armor: [],
	weapon: [ KitWeapon.Unarmed ],
	stamina: 6,
	speed: 2,
	stability: 1,
	meleeDamage: FactoryLogic.createKitDamageBonus(1, 1, 1),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-pugilist-signature',
				name: 'Let’s Dance',
				description: 'Keeping your enemies stumbling around the battlefield is second nature to you.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: '1 creature',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '2 + M or A damage',
							tier2: '5 + M or A damage; slide 1',
							tier3: '7 + M or A damage; slide 2'
						})
					),
					FactoryLogic.createAbilitySectionText('You can shift into any square your target leaves after you slide them.')
				]
			})
		})
	]
};
