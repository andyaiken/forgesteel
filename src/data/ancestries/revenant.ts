import { AbilityKeyword } from '../../enums/ability-keyword';
import { Ancestry } from '../../models/ancestry';
import { Characteristic } from '../../enums/characteristic';
import { ConditionType } from '../../enums/condition-type';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';

export const revenant: Ancestry = {
	id: 'ancestry-revenant',
	name: 'Revenant',
	description: 'The dead walk among us. Some of them are happier about it than others. Unlike the necromantic rituals that produce wights and wraiths and zombies, revenants rise from the grave through a combination of an unjust death and a burning desire for vengeance. Creatures sustained on pure will, they have no need of food or water or air - and, unlike their zombified cousins, they retain all their memories and personality from life.',
	features: [
		FactoryLogic.feature.createAncestry({
			id: 'revenant-feature-1',
			name: 'Former Life',
			description: 'Choose the ancestry you were before you died. Your size is that ancestry’s size and your speed is 5. Unless you select one of the Previous Life traits (see below), you don’t receive any other ancestral traits from your original ancestry.'
		}),
		FactoryLogic.feature.createDamageModifier({
			id: 'revenant-feature-2',
			modifiers: [
				FactoryLogic.damageModifier.createPerLevel({ damageType: DamageType.Cold, modifierType: DamageModifierType.Immunity, value: 1 }),
				FactoryLogic.damageModifier.createPerLevel({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
				FactoryLogic.damageModifier.createPerLevel({ damageType: DamageType.Lightning, modifierType: DamageModifierType.Immunity, value: 1 }),
				FactoryLogic.damageModifier.createPerLevel({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 }),
				FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Weakness, value: 5 })
			]
		}),
		FactoryLogic.feature.create({
			id: 'revenant-feature-3',
			name: 'Tough But Withered',
			description: 'When your Stamina reaches the negative of your winded value, you become inert instead of dying. You fall prone and can’t stand. You continue to observe your surroundings, but you can’t speak, take main actions, maneuvers, move actions, or triggered actions. While inert this way, if you take any fire damage, your body is destroyed and you die. Otherwise, after 12 hours, you regain Stamina equal to your recovery value.'
		}),
		FactoryLogic.feature.createChoice({
			id: 'revenant-feature-4',
			name: 'Revenant Traits',
			options: [
				{
					feature: FactoryLogic.feature.createAncestryFeature({
						id: 'revenant-feature-4-1',
						current: false,
						former: true,
						customID: '',
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'revenant-feature-4-2',
						name: 'Undead Influence',
						description: 'Your supernatural gifts allow you to influence other undead. You gain an edge on Reason, Intuition, and Presence tests made to interact with undead creatures.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createConditionImmunity({
						id: 'revenant-feature-4-3',
						name: 'Bloodless',
						description: 'For you, an open wound is indistinguishable from a scratch.',
						conditions: [ ConditionType.Bleeding ]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAncestryFeature({
						id: 'revenant-feature-4-4',
						current: false,
						former: true,
						customID: '',
						value: 2
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'revenant-feature-4-5',
						name: 'Vengeance Mark',
						features: [
							FactoryLogic.feature.create({
								id: 'revenant-feature-4-5-1',
								name: 'Vengeance Mark',
								description: `
As a maneuver, you place a magic sigil on a creature within 10 squares of you. When you place a sigil, you can decide where it appears on the creature’s body, and whether the sigil is visible to only you or to all creatures.

You always know the direction to the exact location of a creature who bears one of your sigils and is on the same world. You can have an active number of sigils equal to your level, and can remove a sigil from a creature at will (no action required). If you already have the maximum number of sigils activated and you place a new one, your oldest sigil disappears with no other effect.`
							}),
							FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'revenant-feature-4-5-2',
									name: 'Detonate Sigil',
									description: 'A magic sigil you placed on a creature explodes with energy.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'One creature bearing your sigil',
									cost: 'signature',
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
												tier1: '3 + R, I, or P damage; slide 1',
												tier2: '3 + R, I, or P damage; slide 2',
												tier3: '8 + R, I, or P damage; slide 3'
											})
										),
										FactoryLogic.createAbilitySectionText('The sigil disappears from the creature.')
									]
								})
							})
						]
					}),
					value: 2
				}
			],
			count: 2 // This should be '2 or 3 if size is 1S', but I don't know how to encode that. 
		})
	]
};
