import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const dragonMeteor: MonsterGroup = {
	id: 'monster-group-dragon-meteor',
	name: 'Dragon, Meteor',
	description: 'They dwell in the cold, airless depths of space in lair-cities built of stolen kingdoms for centuries at a time. Then without warning or mercy, a meteor dragon attacks.',
	picture: null,
	information: [
		{
			id: 'dragon-meteor-info-1',
			name: 'Kingdom Killers',
			description: 'A meteor dragon’s territory is hard to define. Their attacks might come ages apart, and not every dead civilization or ruined city is the work of a dragon. But when a city grows too great, an empire too powerful, or a culture too advanced, the meteor dragon descends. Their violence isn’t mindless or wanton, but cold and calculated. Often, they breach dams, trigger landslides, and devastate granaries and fields, knowing that the chaos and devastation they unleash will continue long after they return to their lairs.'
		},
		{
			id: 'dragon-meteor-info-2',
			name: 'Cities in the Sky',
			description: 'Other dragons hoard trinkets and baubles. Meteor dragons claim their domain over infrastructure. Palaces, fortresses, monuments, and towers are often stolen by these creatures and brought back to their spacefaring lairs, arranged into dilapidated tableaus of the places they have obliterated. A meteor dragon’s floating lair-city is both their hoard and home, fused together and secured by the dragon’s glittering crystal dragonseal. Within this labyrinthine jumble of ruination, a meteor dragon lurks in wait for the next civilization to grow too comfortable.'
		},
		{
			id: 'dragon-meteor-info-3',
			name: 'Avatar of the Infinite',
			description: `
Meteor dragons have an innate mastery over gravitational forces that allows them to crush enemies and buildings on a whim. They’re among the smallest of the dragons, but the density of their bodies exudes an intense field of the cold, airless void of space around them wherever they go.

A meteor dragon’s body is infused with crystalline starlight, which they can convert to a barrage of white-hot energy rays. At any distance, the dragon’s presence can forever sear the minds of lesser creatures.`
		},
		{
			id: 'dragon-meteor-info-4',
			name: 'Voidlight Annihilation',
			description: 'Voidlight is the name given to the unique energy produced by the breath of a meteor dragon. It is anathema to existence, an evil energy that destroys all. Anything that exists, no matter its material, strength, or potency, is inverted and ceases to exist when bathed in voidlight.'
		},
		{
			id: 'dragon-meteor-info-5',
			name: 'Meteor Dragon Languages',
			description: 'Meteor dragons are not known for their conversational habits. When they do deign to speak, it is exclusively in Vastariax and the First Language.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'dragon-meteor-malice-1',
			name: 'Liftoff',
			cost: 3,
			sections: [
				'The next time the dragon uses their Crescent Claws ability, they can also slide the target up to 5 squares. If the target is dragon-sealed, the dragon can vertical slide them instead.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-meteor-malice-3',
			name: 'Solo Action',
			cost: 5,
			sections: [
				'The dragon takes an additional main action on their turn. They can use this feature even if they are dazed.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-meteor-malice-2',
			name: 'Starfall',
			cost: 5,
			sections: [
				'The dragon drops stars into five 2 cubes anywhere on the encounter map. The area is difficult terrain, and each creature and object in the area when it appears makes an **Agility test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Intuition,
					tier1: '20 holy damage; slowed (save ends), prone',
					tier2: '16 holy damage; slowed (save ends)',
					tier3: '10 holy damage'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-meteor-malice-4',
			name: 'Event Horizon',
			cost: 10,
			sections: [
				'A black hole manifests as a 1 cube within 20 squares of the dragon in an unoccupied space. Each creature who has M<5 and each object of size 3 or smaller is vertical pulled 2 squares toward the area at the start of each round, ignoring stability. Any creature who starts their turn in the area or any object in the area at the end of the round suffers the effect of the dragon’s Voidlight Breath ability, and the black hole disappears.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'dragon-meteor-1',
			name: 'Meteor Dragon',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Dragon', 'Elemental' ],
			encounterValue: 144,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(15, 'fly'),
			stamina: 650,
			stability: 6,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(5, 5, 3, 3, 5),
			features: [
				FactoryLogic.feature.createSoloMonster({
					id: 'dragon-meteor-feature-2',
					name: 'the dragon',
					endEfect: 20
				}),
				FactoryLogic.feature.create({
					id: 'dragon-meteor-feature-3',
					name: 'Voidshroud Wyrmscale Aura',
					description: 'The dragon’s scales create a 1 aura of void space around them. Any enemy who starts their turn in the area takes 10 cold damage and is suffocating. Each time the dragon takes damage, the area of the aura increases by 1 (to a maximum of 5), and they deal an extra 5 damage the next time they use an ability that deals rolled damage.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-meteor-feature-4',
						name: 'Gravity Well',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
						target: 'Each creature and object in the area',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes a **Might test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Might,
								tier1: '20 sonic damage; the target is dragonsealed (save ends)',
								tier2: '16 sonic damage; the target is dragonsealed (save ends)',
								tier3: '10 sonic damage'
							})),
							FactoryLogic.createAbilitySectionText('A dragonsealed target emits a golden aura, and takes 2 damage per square moved when falling or when force moved into an obstacle.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-meteor-feature-5',
						name: 'Cosmic Tail Ray',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createMelee(2),
							FactoryLogic.distance.createRanged(15)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 holy damage; A<4 weakened (save ends)',
								tier2: '21 holy damage; A<4 weakened (save ends)',
								tier3: '25 holy damage; A<4 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If a target made weakened this way is already weakened, they are instead dazed until the end of their next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dragon-meteor-feature-6',
					name: 'Crescent Claws',
					description: 'Once per turn, the dragon chooses a target within 3 squares. The dragon can make a free strike against the target, and ignores banes when using abilities against the target until the start of their next turn.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-meteor-feature-7',
						name: 'Investiture of Gravity',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 15 }) ],
						target: 'Each enemy in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('Each target must be dragonsealed. The dragon chooses a direction and vertical slides each target 10 squares in that direction, ignoring stability. A target who strikes an obstacle takes damage as if they had fallen the forced movement distance.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-meteor-feature-8',
						name: 'Field Collapse',
						type: FactoryLogic.type.createTrigger('The dragon takes damage from an ability while the area of their Voidshroud Wyrmscale Aura is 2 or more.', { free: true }),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The dragon halves the damage. Each enemy and object in the area of the dragon’s Voidshroud Wyrmscale Aura trait takes 5 sonic damage and is pulled up to 5 squares toward the dragon. The area of the wyrmscale aura then resets to 1.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-meteor-feature-9',
						name: 'A Hero Faces the Void',
						type: FactoryLogic.type.createTrigger('A creature within distance spends their Heroic Resource to use an ability.', { free: true }),
						cost: 2,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '10 psychic damage; P<4 frightened (save ends)',
									tier2: '16 psychic damage; P<5 frightened (save ends)',
									tier3: '20 psychic damage; P<6 frightened (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('While frightened this way, the target can’t use the triggering ability.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dragon-meteor-feature-10',
					name: 'Meteor Dragon’s Domain',
					description: 'If the encounter map is a location the dragon has occupied for 1 week or more, each creature other than the dragon has their stability reduced to 0 and automatically obtains a tier 1 outcome on Agility tests. Additionally, any creature who is suffocating during the encounter takes an extra 1d6 damage at the end of each round.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-meteor-feature-11',
						name: 'Impactful Arrival',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSpecial('1-mile burst') ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target takes 30 fire damage, and if they have M<5, they are knocked prone.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Special',
								effect: 'The dragon can use this ability before the encounter begins.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-meteor-feature-12',
						name: 'Burning Aurora',
						type: FactoryLogic.type.createVillainAction(2),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of the encounter, each enemy who is dragonsealed and weakened and who the dragon has line of effect to loses 1 of their Heroic Resource at the start of each of their turns (to a minimum of 0). The dragon then uses their Cosmic Tail Ray ability with a double edge, targeting four creatures or objects.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-meteor-feature-13',
						name: 'Voidlight Breath',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSpecial('∞ × 3 line within 1') ],
						target: 'Each enemy and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Agility,
									tier1: '25 damage; I<6 the target is annihilated',
									tier2: '21 damage; I<5 the target is annihilated',
									tier3: '15 damage; I<4 the target is annihilated'
								})
							),
							FactoryLogic.createAbilitySectionText('An annihilated target must make the test again, decreasing the potency for themself by 2 each time they are annihilated. A creature reduced to 0 Stamina by this dies and their soul is destroyed.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
