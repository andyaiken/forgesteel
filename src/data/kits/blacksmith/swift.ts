import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Kit } from '@/models/kit';
import { KitWeapon } from '@/enums/kit-weapon';

export const swift: Kit = {
	id: 'kit-swift',
	name: 'Swift',
	description: 'The Swift kit makes you a mid-range, lightning fast archer. It allows you to be a ranged fighter that sprints across the battlefield, pestering your foes with arrows and drawing their focus.',
	type: '',
	armor: [],
	weapon: [ KitWeapon.Bow ],
	stamina: 0,
	speed: 3,
	stability: 0,
	meleeDamage: null,
	rangedDamage: FactoryLogic.createKitDamageBonus(1, 1, 1),
	meleeDistance: 0,
	rangedDistance: 7,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-swift-signature',
				name: 'Maddening Missile',
				description: 'Your well-placed projectiles drive your opponents mad.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createRanged(5) ],
				target: 'One creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '2 + M or A damage',
							tier2: '4 + M or A damage',
							tier3: '6 + M or A damage'
						})
					),
					FactoryLogic.createAbilitySectionText('The target is taunted (EoT).')
				]
			})
		})
	]
};
