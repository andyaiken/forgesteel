import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Kit } from '../../models/kit';
import { KitArmor } from '../../enums/kit-armor';
import { KitWeapon } from '../../enums/kit-weapon';

export const battlemind: Kit = {
	id: 'kit-battlemind',
	name: 'Battlemind',
	description: 'Who says lightly armored heroes can\'t also be hard to move? You just need to employ some psionics! The Battlemind kit harnesses the power of your mind to make you harder to move—and to make your foes easier to push around.',
	type: '',
	armor: [ KitArmor.Light ],
	weapon: [ KitWeapon.Medium ],
	stamina: 3,
	speed: 2,
	stability: 1,
	meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-battlemind-signature',
				name: 'Unmooring',
				description: 'Your weapon unleashes psionic energy that reduces your target’s weight.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'One creature',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '3 + M, R, I, or P damage',
							tier2: '6 + M, R, I, or P damage',
							tier3: '9 + M, R, I, or P damage'
						})
					),
					FactoryLogic.createAbilitySectionText('Until the end of the target\'s next turn, any forced movement that affects the target has its distance increased by 2.')
				]
			})
		})
	]
};
