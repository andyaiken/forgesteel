import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { ConditionType } from '@/enums/condition-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';

export const aurealgar: Ancestry = {
	id: 'ancestry-aurealgar',
	name: 'Aurealgar',
	description:
		'Lion- and tiger-blooded Aurians from badlands caravans and border holds. Broad, proud, and made to stand in front. They fight like a pride and roar like a drumline.',
	features: [
		// shared claws + stock signature
		FactoryLogic.feature.createMultiple({
			id: 'aurealgar-feature-1',
			name: 'Aurian Lineage',
			features: [
				FactoryLogic.feature.create({
					id: 'aurealgar-feature-1a',
					name: 'Natural Claws – Predator\'s Rend',
					description:
						'Triggered, 1/round. When you hit with a melee strike, you can use a triggered action to deal extra damage equal to your highest characteristic to that target.'
				}),
				FactoryLogic.feature.create({
					id: 'aurealgar-feature-1b',
					name: 'Big',
					description: 'Your size is 1L (large).'
				})
			]
		}),
		// options menu – shared + Aurealgar
		FactoryLogic.feature.createChoice({
			id: 'aurealgar-feature-2',
			name: 'Aurealgar Traits',
			options: [
				// shared 1-point
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-1',
						name: 'Scent Sense',
						description:
							'You can track and identify by scent. You can pick up lingering trails and tell apart known individuals by smell (Director adjudicates specifics).'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-2',
						name: 'Night-Eyes',
						description:
							'You ignore penalties from dim light. In darkness, you gain an edge on tests to detect adjacent creatures.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'aurealgar-feature-2-3',
						name: 'Tail Balance',
						description: 'Your tail provides enhanced balance and agility when maneuvering.',
						field: FeatureField.Disengage,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'aurealgar-feature-2-4',
						name: 'Cat\'s Grace',
						description: 'Your feline agility grants you enhanced movement speed.',
						field: FeatureField.Speed,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-5',
						name: 'Sheath & Strike',
						description:
							'The first melee strike you make each fight gains +2 damage if you moved 2+ squares earlier that turn.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'aurealgar-feature-2-6',
						name: 'Sun-Doze',
						description: 'Your ability to rest in sunlight increases your resilience.',
						field: FeatureField.Stamina,
						valuePerEchelon: 3
					}),
					value: 1
				},

				// Aurealgar 1-point
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'aurealgar-feature-2-7',
						name: 'Thick Hide',
						description: 'Your thick hide provides enhanced protection.',
						field: FeatureField.Stamina,
						valuePerEchelon: 3
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'aurealgar-feature-2-8',
							name: 'Pride-Guard',
							description: 'You protect your allies with fierce dedication.',
							type: FactoryLogic.type.createTrigger('You or an adjacent ally takes damage from a strike'),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'The triggering creature',
							sections: [
								FactoryLogic.createAbilitySectionText('You reduce the damage from the strike by an amount equal to your level.')
							]
						})
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-9',
						name: 'Savanna Stride',
						description: '+1 speed and you ignore difficult terrain from sand, scree, and broken rock.'
					}),
					value: 1
				},

				// shared 2-point
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'aurealgar-feature-2-10',
							name: 'Pounce',
							description: 'You leap toward your prey with feline grace.',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText('Stride up to your speed toward a creature you can see, then make a melee strike. On a tier 2+ outcome, push the target 1.')
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-11',
						name: 'Nine Lives',
						description:
							'Triggered, 1/scene. When damage would reduce you to 0 Stamina, reduce that damage by your level + 5.'
					}),
					value: 2
				},

				// Aurealgar 2-point
				{
					feature: FactoryLogic.feature.createConditionImmunity({
						id: 'aurealgar-feature-2-12',
						name: 'King of the Dunes',
						description: 'Your proud nature makes you immune to fear.',
						conditions: [ ConditionType.Frightened ]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'aurealgar-feature-2-13',
							name: 'Mauling Drive',
							description: 'You drive forward with overwhelming force.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'One creature',
							cost: 'signature',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might ],
										tier1: '+2 damage',
										tier2: '+4 damage; push 1',
										tier3: '+6 damage; push 2'
									})
								)
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'aurealgar-feature-2-14',
							name: 'Standing Charge',
							description: 'You charge forward with the support of your pride.',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText('Move up to 2. Your next strike this turn gains +5 damage if you started the maneuver adjacent to an ally.')
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'aurealgar-feature-2-15',
							name: 'Lion\'s Roar',
							description: 'You let loose a mighty roar to shake your foes\' spirits.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
							target: 'Each enemy in the area',
							cost: 'signature',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might, Characteristic.Presence ],
										tier1: '2 damage',
										tier2: '5 damage; push 1',
										tier3: '7 damage; push 2'
									})
								)
							]
						})
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 2
};
