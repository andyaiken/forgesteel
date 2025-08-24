import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const chimera: MonsterGroup = {
	id: 'monster-group-chimera',
	name: 'Chimera',
	description: 'Massive flexing claws. Lashing draconic tail. Nimble leathery wings. And not one, but three menacing heads: a snarling lion, a helix-horned ram, and a dragon with fire sparking in their throat. Many see the chimera as an aggressor—but few know this creature’s origins as a divine guardian.',
	picture: null,
	information: [
		{
			id: 'chimera-info-1',
			name: 'The First Chimera',
			description: `
The first chimera was a gift. A deity gave a devout queen this young guardian—one with a dragon’s cunning, a lion’s bravery, and a ram’s tenacity. The queen raised the chimera to be a strong protector not just for herself but also her people, who loved the chimera and their ruler. But neighboring lands feared the beast. As a conquering force swept into the land, slaughtering the chimera was their fell goal.

The queen’s resulting fury was said to be felt by the gods. As she screamed, a nearby volcano erupted, spewing basalt and chimeras over the land. With fiery might, the chimeras destroyed the opposing army, then dispersed. Each found a new territory and claimed the role of divine protector over that place, its inhabitants, and its treasures.`
		},
		{
			id: 'chimera-info-2',
			name: 'Tactical Warriors',
			description: 'Chimeras have many ways to keep themselves and their charges from being cornered. The lion head snaps up enemies in massive jaws and hurls them away, the ram head pummels them to the ground, and the dragon head bathes them in fire. The three heads crying out together can shake even the most stalwart warriors.'
		},
		{
			id: 'chimera-info-3',
			name: 'One Being, Three Heads',
			description: 'Unlike some other multiheaded creatures, a chimera possesses a single unified mind. Their heads work together, never snapping at one another over food, favors, or personality conflicts. The heads often express the chimera’s emotions in unison, braying together in times of battle or purring all at once to show affection.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'chimera-malice-1',
			name: 'Defensive Snapping',
			cost: 3,
			sections: [
				'The chimera takes up a defensive stance. Until the start of their next turn, the chimera can make a free strike against each enemy who comes within 2 squares of them.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'chimera-malice-2',
			name: 'Solo Action',
			cost: 5,
			sections: [
				'The chimera takes an additional main action on their turn. They can use this feature even if they are dazed.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'chimera-malice-3',
			name: 'Unstable Terrain',
			cost: 5,
			sections: [
				'The chimera shakes the ground, causing an eruption of loose rocks and debris that creates three size 2 stone objects anywhere on the encounter map. Each creature adjacent to one or more objects when they appear who has A<2 takes 5 damage.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'chimera-malice-4',
			name: 'Ashen Clouds',
			cost: 7,
			sections: [
				' Until the start of the chimera’s next turn, all areas of the encounter map are shrouded in a thick cloud of ash. All creatures and objects on the map have concealment that the chimera ignores. Additionally, each enemy in the cloud who has I<1 has line of effect only within 3 squares. The potency of this feature increases by 1 each time it’s used.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'chimera-1',
			name: 'Chimera',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Beast', 'Chimera' ],
			encounterValue: 60,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(10, 'fly'),
			stamina: 300,
			stability: 1,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(3, 2, -2, 1, 0),
			features: [
				FactoryLogic.feature.createSoloMonster({
					id: 'chimera-feature-1',
					name: 'the chimera'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'chimera-feature-2',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				}),
				FactoryLogic.feature.create({
					id: 'chimera-feature-3',
					name: 'Solo Monster',
					description: `*End Effect*: At the end of each of their turns, the chimera can take 5 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.

					*Solo Turns*: The chimera can take two turns each round. They can’t take turns consecutively.`
				}),
				FactoryLogic.feature.create({
					id: 'chimera-feature-4',
					name: 'Volant',
					description: 'When the chimera makes a creature winded or reduces them to 0 Stamina, they can move their speed toward an enemy.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'chimera-feature-5',
						name: 'Bite',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 damage',
								tier2: '13 damage',
								tier3: '16 damage'
							})),
							FactoryLogic.createAbilitySectionText('This strike deals an extra 3 damage if it gains an edge or has a double edge.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'chimera-feature-6',
						name: 'Dragon\'s Eruption',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'Each enemy in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 fire damage; A<1 3 fire damage',
								tier2: '5 fire damage; A<2 5 fire damage',
								tier3: '7 fire damage; A<3 7 fire damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'chimera-feature-7',
						name: 'Roar',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '4 psychic damage',
								tier2: '8 psychic damage; I<2 frightened (save ends)',
								tier3: '10 psychic damage; I<3 frightened (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'chimera-feature-8',
						name: 'Lion\'s Toss',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: 'vertical push 2',
								tier2: 'vertical push 3',
								tier3: 'vertical push 5'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'chimera-feature-9',
						name: 'Ram\'s Defiance',
						type: FactoryLogic.type.createTrigger('A creature makes a strike against the chimera and obtains a tier 1 outcome.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The chimera shifts up to 5 squares. If they end this shift within distance of the target, make a power roll.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '6 damage; M<1 slowed (save ends)',
								tier2: '8 damage; prone; M<2 slowed (save ends)',
								tier3: '10 damage; prone; M<3 slowed (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'chimera-feature-10',
						name: 'Overture of Destruction',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('The chimera can use Bite and Lion’s Toss against each target.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'chimera-feature-11',
						name: 'Fire Solo',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The chimera uses Dragon’s Eruption and Roar without spending Malice.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'chimera-feature-12',
						name: 'Chorus of Destruction',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The chimera uses Roar, then shifts up to their speed and can make a free strike against each enemy who comes adjacent to them during the shift. When the chimera ends this shift, they use Dragon’s Eruption. The use of these abilities as part of this villain action costs no Malice.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
