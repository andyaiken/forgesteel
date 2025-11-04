import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Kit } from '@/models/kit';
import { KitWeapon } from '@/enums/kit-weapon';

export const sniper: Kit = {
	id: 'kit-sniper',
	name: 'Sniper',
	description: 'The Sniper kit gives you the tools and techniques to take down enemies from afar. This kit can help you become the archer who lurks behind trees or down tunnels, picking off enemies with a bow or crossbow as they approach.',
	type: '',
	armor: [],
	weapon: [ KitWeapon.Bow ],
	stamina: 0,
	speed: 1,
	stability: 0,
	meleeDamage: null,
	rangedDamage: FactoryLogic.createKitDamageBonus(0, 0, 4),
	meleeDistance: 0,
	rangedDistance: 10,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-sniper-signature',
				name: 'Patient Shot',
				description: 'Breathe … aim … wait … then strike!',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createRanged(5) ],
				target: 'One creature',
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
					FactoryLogic.createAbilitySectionText('If you don\'t take a move action this turn, this strike deals extra damage equal to your Might or Agility score (your choice).')
				]
			})
		})
	]
};
