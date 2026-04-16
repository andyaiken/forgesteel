import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { SubClass } from '@/models/subclass';

export const spark: SubClass = {
	id: 'beastheart-sub-4',
	name: 'Spark',
	description: 'Your connection with nature has imbued you and your companion with the raging magic of the elemental storm. Flame, frost, and lightning crackle from your hands and their claws.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-sub-4-1-1',
					selected: [ 'Magic' ]
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'beastheart-sub-4-1-2',
					name: 'Wild Nature Benefit',
					description: 'This strike deals cold, fire, lightning, or sonic damage. You gain 1 surge.',
					tag: 'feral-strike'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-4-1-3',
						name: 'Jaws of the Storm',
						description: 'Your foes are torn by a tempest of primordial teeth and claws.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Beastheart, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target takes cold, fire, lightning, or sonic damage (your choice) equal to your Might score.'),
							FactoryLogic.createAbilitySectionSpend({
								effect: 'The size of the cube increases by 1.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-4-1-4',
						name: 'Pyre',
						description: 'You burn to ash before your foes’ eyes.',
						type: FactoryLogic.type.createTrigger('You take damage.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You take half the damage and teleport up to 5 squares.'),
							FactoryLogic.createAbilitySectionSpend({
								effect: 'When you teleport this way, each enemy adjacent to your original space takes lightning or fire damage (your choice) equal to your Intuition score.'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'beastheart-sub-4-2-1b',
					name: 'Stormheart',
					description: 'Whenever you or your companion deals cold, fire, lightning, sonic, or untyped damage, you can change the damage type to cold, fire, lightning, or sonic damage.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-4-2-2',
					name: 'Spark Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-4-2-2a',
									name: 'Burning Lash',
									description: 'A blazing tongue of energy entangles a foe.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Companion, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee(2) ],
									target: 'One creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '6 + I fire or lightning damage; M < [weak], prone',
												tier2: '9 + I fire or lightning damage; M < [average], prone',
												tier3: '14 + I fire or lightning damage; M < [strong], prone and can’t stand (EoT)'
											})
										),
										FactoryLogic.createAbilitySectionSpend({
											effect: 'If you are within distance of the target, you can use a free maneuver to wield a second whip, dealing extra fire or lightning damage equal to your Intuition score.'
										})
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-4-2-2b',
									name: 'Howling Gale',
									description: 'A blizzard or thunderstorm sends foes flying and lifts you like a feather.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Companion, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 5 }) ],
									target: 'Each enemy in the area',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '6 cold or sonic damage; slide 1',
												tier2: '9 cold or sonic damage; slide 2',
												tier3: '13 cold or sonic damage; slide 4'
											})
										),
										FactoryLogic.createAbilitySectionText('Until the end of your next turn, you and your companion can fly and gain a +3 bonus to speed.')
									]
								})
							}),
							value: 1
						}
					]
				})
			]
		},
		{
			level: 3,
			features: []
		},
		{
			level: 4,
			features: []
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'beastheart-sub-4-5-1',
					name: 'Wildfire Pyre',
					description: 'When you or your companion deals damage with your Pyre ability, each enemy adjacent to either of you takes the damage.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-4-6-1',
					name: 'Spark Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-4-6-1a',
									name: 'Elements Unleashed',
									description: 'Your companion’s body becomes a bank of glowing coals, a web of arcing lightning, a cloud of rumbling thunder, or a flurry of dancing ice crystals.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Companion, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText(`
Your companion transforms into a creature made of elemental energy. Choose a damage type from cold, fire, lightning, or sonic damage. While transformed, your companion gains the following benefits:

* Your companion can fly. If they could already fly, they gain a +2 bonus to speed.
* When your companion enters another creature’s space for the first time on a turn or damages a creature with a strike, your companion deals 5 damage of the chosen type to the creature.
* Your companion has immunity all to the chosen damage type and immunity 5 to all other damage.

Your companion’s transformation lasts until the start of your next turn. At the start of each of your turns, you can spend 3 ferocity to extend the transformation’s duration for one turn. When you do so, you can change the chosen damage type.`),
										FactoryLogic.createAbilitySectionSpend({
											value: 2,
											effect: 'You also transform.'
										})
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-4-6-1b',
									name: 'Killing Frost',
									description: 'Black frost freezes boots to the floor and creeps up trapped victims until they are completely encased in ice.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Companion, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 1 }) ],
									target: 'Each enemy in the area',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '5 cold damage; I < [weak] restrained (save ends)',
												tier2: '7 cold damage; I < [average] restrained (save ends)',
												tier3: '12 cold damage; I < [strong] restrained (save ends)'
											})
										),
										FactoryLogic.createAbilitySectionText('While restrained this way, a creature takes 5 cold damage at the start of each of your turns. A creature killed by this ability becomes an ice statue and their space is difficult terrain.')
									]
								})
							}),
							value: 1
						}
					]
				})
			]
		},
		{
			level: 7,
			features: []
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.create({
					id: 'beastheart-sub-4-8-1',
					name: 'Nature Will Not Harm Us',
					description: 'You and your companion have damage immunity 10 to cold, fire, lightning, and sonic damage.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-4-9-1',
					name: 'Spark Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-4-9-1a',
									name: 'For the Pack!',
									description: 'They’d tell stories in hushed tones of your companion’s last stand — if any of them were left to tell the tale.',
									type: FactoryLogic.type.createTrigger('After taking damage, your companion is dead or dying.', { free: true }),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Companion, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('Your companion makes a power roll, which targets each enemy in a 5 burst.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '20 cold, fire, lightning, or sonic damage',
												tier2: '25 cold, fire, lightning, or sonic damage',
												tier3: '30 cold, fire, lightning, or sonic damage'
											})
										),
										FactoryLogic.createAbilitySectionText('Your companion dies. If you are dead and in the area, you are restored to life with 1 Stamina. You and each ally in the area can spend up to 2 Recoveries.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-4-9-1b',
									name: 'Wild Hunt',
									description: 'Your companion summons a ravening pack of spectral ancestors to devour your foes.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Companion, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 20 }) ],
									target: 'Each enemy in the area',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText(`
Your companion summons a ghostly pack of creatures that resemble them to fill the area. The pack can appear in and move through creatures, objects, and terrain. Once summoned, the pack moves in a straight line toward your companion until it’s centered on your companion’s space, then continues moving in a straight line until it is up to 20 squares away.

Your companion targets each enemy inside the pack’s area during its movement once with the following power roll. If a creature is killed by this ability, their body is dragged off to Quintessence to be devoured at leisure`),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '9 damage',
												tier2: '13 damage',
												tier3: '18 damage'
											})
										)
									]
								})
							}),
							value: 1
						}
					]
				})
			]
		},
		{
			level: 10,
			features: []
		}
	],
	abilities: [],
	selected: false
};
