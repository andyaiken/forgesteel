import { AbilityKeyword } from '../../enums/ability-keyword';
import { Ancestry } from '../../models/ancestry';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';

export const revenant: Ancestry = {
	id: 'ancestry-revenant',
	name: 'Revenant',
	description: 'Unlike the necromantic rituals that produce wights and wraiths and zombies, revenants rise from the grave through a combination of an unjust death and a burning desire for vengeance. Creatures sustained on pure will, they have no need of food or water or air - and, unlike their zombified cousins, they retain all their memories and personality from life.',
	features: [
		FactoryLogic.feature.createAncestry({
			id: 'revenant-feature-1',
			name: 'Former Life',
			description: 'Choose the ancestry you were before you died.'
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
			description: 'When your Stamina equals the negative of your winded value, you become inert instead of dying. You can continue to observe your surroundings, but you can’t speak, take actions, maneuvers, or triggered actions, or move and you fall prone. If you take any fire damage while in this state, your body is destroyed and you die. Otherwise, after 12 hours, you regain Stamina equal to your recovery value.'
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
					feature: FactoryLogic.feature.create({
						id: 'revenant-feature-4-3',
						name: 'Bloodless',
						description: 'For you, an open wound is indistinguishable from a scratch. You can’t become bleeding.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAncestryFeature({
						id: 'revenant-feature-4-4',
						current: false,
						former: true,
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

You always know the direction to the exact location of a creature who bears one of your sigils and is on the same world as you.

You can have an active number of sigils equal to your level. You can remove a sigil from a creature harmlessly (no action required). If you are already using your maximum number of sigils and place a new one, your oldest sigil disappears with no other effect.`
							}),
							FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'revenant-feature-4-5-2',
									name: 'Detonate Sigil',
									description: 'A magical sigil you placed on a creature explodes with energy.',
									type: FactoryLogic.type.createAction(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: '1 creature with your sigil',
									powerRoll: FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
										tier1: '3 + R, I, or P damage; slide 1',
										tier2: '3 + R, I, or P damage; slide 2',
										tier3: '8 + R, I, or P damage; slide 3'
									}),
									effect: 'The sigil disappears from the creature.'
								})
							})
						]
					}),
					value: 2
				}
			],
			count: 2
		})
	]
};
