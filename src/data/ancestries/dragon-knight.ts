import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Ancestry } from '../../models/ancestry';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { FactoryLogic } from '../../logic/factory-logic';

export const dragonKnight: Ancestry = {
	id: 'ancestry-dragon-knight',
	name: 'Dragon Knight',
	description: 'The Ritual of Dracogenesis that grants the power to create a generation of dragon knights—also known as draconians or wyrmwights—is obscure and supremely difficult for even an experienced sorcerer to master.',
	features: [
		FactoryLogic.feature.createChoice({
			id: 'dragon-knight-feature-1',
			name: 'Wyrmplate',
			description: 'Your hardened scales grant you immunity equal to yor level to one of the following damage types: acid, cold, corruption, fire, lightning, or poison. You can change your damage immunity type when you finish a respite.',
			options: [
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'dragon-knight-feature-1-1',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Acid',
								value: 1,
								valueCharacteristics: [],
								valuePerLevel: 1,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'dragon-knight-feature-1-2',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Cold',
								value: 1,
								valueCharacteristics: [],
								valuePerLevel: 1,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'dragon-knight-feature-1-3',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Corruption',
								value: 1,
								valueCharacteristics: [],
								valuePerLevel: 1,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'dragon-knight-feature-1-4',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Fire',
								value: 1,
								valueCharacteristics: [],
								valuePerLevel: 1,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'dragon-knight-feature-1-5',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Lightning',
								value: 1,
								valueCharacteristics: [],
								valuePerLevel: 1,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'dragon-knight-feature-1-6',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Poison',
								value: 1,
								valueCharacteristics: [],
								valuePerLevel: 1,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				}
			]
		}),
		FactoryLogic.feature.createChoice({
			id: 'dragon-knight-feature-2',
			name: 'Dragon Knight Traits',
			options: [
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'dragon-knight-feature-2-1',
							name: 'Draconian Guard',
							description: 'You can swing your wings around and guard against a blow.',
							type: FactoryLogic.type.createTrigger('You, or a creature adjacent to you, takes damage from a strike'),
							keywords: [],
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							effect: 'You reduce the damage from the strike by an amount equal to your level.'
						})
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'dragon-knight-feature-2-2',
						name: 'Prismatic Scales (acid)',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Acid',
								value: 1,
								valueCharacteristics: [],
								valuePerLevel: 1,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'dragon-knight-feature-2-3',
						name: 'Prismatic Scales (cold)',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Cold',
								value: 1,
								valueCharacteristics: [],
								valuePerLevel: 1,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'dragon-knight-feature-2-4',
						name: 'Prismatic Scales (corruption)',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Corruption',
								value: 1,
								valueCharacteristics: [],
								valuePerLevel: 1,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'dragon-knight-feature-2-5',
						name: 'Prismatic Scales (fire)',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Fire',
								value: 1,
								valueCharacteristics: [],
								valuePerLevel: 1,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'dragon-knight-feature-2-6',
						name: 'Prismatic Scales (lightning)',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Lightning',
								value: 1,
								valueCharacteristics: [],
								valuePerLevel: 1,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'dragon-knight-feature-2-7',
						name: 'Prismatic Scales (poison)',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Poison',
								value: 1,
								valueCharacteristics: [],
								valuePerLevel: 1,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'dragon-knight-feature-2-8',
						name: 'Remember your Oath',
						description: `
As a maneuver, you can recite the following oath. If you do, you succeed on saving throws when you roll a 4 or higher until the start of your next turn:

> Even should the sun stop in the sky
> Even should the night last a thousand years
> I will stand forever
> I shall not yield
> Those who suffer and yearn for justice
> I am your sword and shield
> I will yield no ground
> I will speak no lies
> I will stand against all tyrants
> Until the last villain dies.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'dragon-knight-feature-2-9',
							name: 'Draconic Pride',
							description: 'You let loose a mighty roar to shake your foes’ spirits.',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
							target: 'All enemies',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Presence ],
								tier1: '2 damage',
								tier2: '5 damage; push 1',
								tier3: '7 damage; push 2'
							})
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'dragon-knight-feature-2-10',
							name: 'Dragon Breath',
							description: 'You expel energy to damage your foes.',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
							target: 'All enemies',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Presence ],
								tier1: '2 damage',
								tier2: '4 damage',
								tier3: '6 damage'
							}),
							effect: 'You choose the ability’s damage type from acid, cold, corruption, fire, lightning, or poison.'
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'dragon-knight-feature-2-11',
						name: 'Wings',
						description: 'You possess wings powerful enough to take you airborne. While using your wings to fly, you can stay aloft for a number of rounds equal to your Might (minimum of 1 round) before you fall prone. While using your wings to fly at 1st, 2nd, and 3rd level, you have damage weakness 5.'
					}),
					value: 2
				}
			],
			count: 3
		})
	]
};
