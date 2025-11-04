import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { PerkData } from '@/data/perk-data';
import { SubClass } from '@/models/subclass';

export const spark: SubClass = {
	id: 'beastheart-sub-4',
	name: 'Spark',
	description: 'Your connection with nature has imbued you and your companion with the raging magic of the elemental storm. Flame, frost, and lightning crackle from your hands and claws.',
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
					description: 'This strike deals cold, fire, lightning, or sonic damage. You gain a surge.',
					tag: 'feral-strike'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-4-1-3',
						name: 'Self-Immolate',
						description: 'You vanish in a sizzling burst of elemental energy.',
						type: FactoryLogic.type.createTrigger('You take damage.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You teleport up to 5 spaces and halve the triggering damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'When you teleport in this way, each enemy adjacent to your original position takes cold, fire, lightning, or sonic damage equal to your Intuition score.'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'beastheart-sub-4-2-1a',
					selected: [ PerkData.wildsExplorer ]
				}),
				FactoryLogic.feature.create({
					id: 'beastheart-sub-4-2-1b',
					name: 'Elemental Core',
					description: 'Whenever you or your companion deals damage with no type or deals cold, fire, lightning, or sonic damage, you can change the damage type to cold, fire, lightning, or sonic damage.'
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
									description: 'A blazing whip of energy lashes out to curl around a foe’s legs and burn them to a crisp.',
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
										FactoryLogic.createAbilitySectionField({
											name: 'Spend',
											value: 1,
											effect: 'If you are within 2 squares of the enemy, you can use a free maneuver to wield a second whip, dealing extra fire or lightning damage to the target equal to your Intuition score.'
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
										FactoryLogic.createAbilitySectionText('Until the end of your next turn, you and your companion can fly and both of your speed increases by 3.')
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
					name: 'Suspended Teleportation',
					description: 'When you or your companion teleports using Self-Immolate, they can choose to take a breather in a cozy backwater of Quintessence before arriving. They are removed from the encounter. At the start of your next turn, they can spend a Recovery and they reappear in a space within 5 squares of their original position.'
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
									name: 'Elemental Form',
									description: 'Your companion’s body becomes a bank of glowing coals, a web of arcing lightning, a cloud of rumbling thunder, or a flurry of dancing ice crystals.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Companion, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText(`
Your companion transforms into a creature made of elemental energy. Choose a damage type from cold, fire, lightning, or sonic damage. While transformed, your companion has the following benefits:

* Your companion’s speed has the Fly tag. If their speed already had the Fly tag, their speed increases by 2.
* When your companion enters another creature’s space for the first time on a turn or damages a creature with an attack, your companion deals 5 damage of the chosen type to the creature.
* Your companion has immunity to the chosen damage type and immunity 5 to all other damage.

Your companion’s transformation lasts until the start of your next turn. At the start of each turn, you can spend 3 ferocity to extend the transformation’s duration for 1 more turn. When you do so, you can change the damage type chosen`),
										FactoryLogic.createAbilitySectionField({
											name: 'Spend',
											value: 2,
											effect: 'You are transformed as well.'
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
										FactoryLogic.createAbilitySectionText('While restrained by this ability, a creature takes 5 cold damage at the start of each of your turns. A creature killed by this ability becomes an ice statue; their space is difficult terrain.')
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
					name: 'Walk Through Flames',
					description: 'You both gain damage immunity 10 to cold, fire, lightning, and sonic damage.'
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
									name: 'Phoenix Ascendant',
									description: 'They’d tell stories in hushed tones of your companion’s last stand—if any of them were left to tell the tale.',
									type: FactoryLogic.type.createTrigger('After taking damage, your companion is dead or dying.', { free: true }),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Companion, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.createSpecial('-') ],
									target: '-',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('Your companion makes a power roll, which affects each enemy in a 5 burst.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '20 cold, fire, lightning, or sonic damage',
												tier2: '25 cold, fire, lightning, or sonic damage',
												tier3: '30 cold, fire, lightning, or sonic damage'
											})
										),
										FactoryLogic.createAbilitySectionText('Your companion dies. If you are dead and in the area, you are restored to life with 1 Stamina. You and each ally in the area can spend 1 or 2 Recoveries.')
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
										FactoryLogic.createAbilitySectionText('Your companion summons an area of ghostly creatures that resemble your companion. The area can appear in and move through creatures, objects, and terrain. Once it is summoned, it moves in a straight line toward your companion until its center is in the center of your companion’s space, and it then continues moving in a straight line until it is up to 20 squares away. Any enemy inside the area at any point during its movement is targeted once by the following power roll. The body of any creature killed by this ability is dragged off to the Primordial Chaos to be devoured at leisure.'),
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
	selected: false
};
