import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Kit } from '../../models/kit';
import { KitArmor } from '../../enums/kit-armor';
import { KitWeapon } from '../../enums/kit-weapon';

export const guisarmier: Kit = {
	id: 'kit-guisarmier',
	name: 'Guisarmier',
	description: 'The Guisarmier kit is for those who want to use a polearm for extended reach while remaining protected by sturdy armor. This is the kit that allows you to become the ultimate halberd, longspear, or glaive fighter.',
	type: '',
	armor: [ KitArmor.Medium ],
	weapon: [ KitWeapon.Polearm ],
	stamina: 6,
	speed: 0,
	stability: 1,
	meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
	rangedDamage: null,
	meleeDistance: 1,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-guisarmier-signature',
				name: 'Forward Thrust, Backward Smash',
				description: 'In your hands, the haft is as good as the head.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'Two creatures or objects',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '2 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						})
					)
				]
			})
		})
	]
};
