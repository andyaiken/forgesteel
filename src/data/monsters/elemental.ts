import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const elemental: MonsterGroup = {
	id: 'monster-group-elemental',
	name: 'Elemental',
	description: `
*It is in changing that we find purpose.*
*ATÆSHIA, QUEEN OF ASH*

When the gods formed the Mundane World, they took sparks of creation from the roiling plane of Quintessence and gave sentience to some of the universe’s most basic elements—air, fire, earth, and water. Some elementals contain just one of these components, but can come to embody multiple reagents as they age.`,
	information: [
		{
			id: 'elemental-info-1',
			name: 'Duality of Form',
			description: `
Elementals are mercurial creatures of transformation, creation, and destruction. Though the deities first created the Mundane World, elementals cultivated and shaped it. When a tree, stone, or other aspect of the world doesn’t suit an elemental, they break it down with fire, wind, or another element, then build it anew. 

Elementals themselves also change like the winds and the tides, and from age to age, they remake themselves to reflect what the world has become. They are protectors armored by stone, lizards ablaze with fire, and sometimes dragons clad in steel.`
		},
		{
			id: 'elemental-info-2',
			name: 'Rebirth and Reformation',
			description: 'When an elemental dies in the Mundane World, their spirit returns to Quintessence, where they must rest for decades to regain strength. Should the spirit return to the Mundane World, they take on a form that reflects a creature or other aspect of that plane.'
		},
		{
			id: 'elemental-info-3',
			name: 'Crux of Fire',
			description: `
The crux of fire, often called a *blazecaster*, takes the form of a fiery lizard. They often live in hot zones of planar convergence or areas of volcanic activity. These territorial elementals usually question interlopers from afar—and if they don’t like the answers, they rain down fire before their foes can draw near. 

While many elementals weave their innate gifts into oral storytelling, cruxes of fire are particularly adroit at animating their stories in silhouettes of flame.`
		},
		{
			id: 'elemental-info-4',
			name: 'Essence of Storms',
			description: `
At a distance, most would mistake an essence of storms, or *galeweaver*, for a large bird of prey. This majestic creature is formed from streaks of colored cloud stuff woven into the silhouette of a large eagle or falcon. 

Galeweavers act as scouts for their ishkrars, and they’re usually the first to see trouble. Also insatiably curious, the essences often swoop down to talk when they see travelers.`
		},
		{
			id: 'elemental-info-5',
			name: 'Essence of Tides',
			description: `
An essence of tides looks like a shimmering blue manta ray that glides over land as easily as through water, earning them the common name of *tidedrifter*. Most common along coastlines, essences of tides enjoy harmless pranks, especially against regulars who sail or swim in their waters.  

With the tidedrifter’s healthy sense of humor, it’s not hard to win their friendship—but their relaxed demeanor evaporates if friend or family faces threat. `
		},
		{
			id: 'elemental-info-6',
			name: 'Field of Growth',
			description: 'When an elemental dies in the Mundane World, their spirit returns to Quintessence, where they must rest for decades to regain strength. Should the spirit return to the Mundane World, they take on a form that reflects a creature or other aspect of that plane.'
		},
		{
			id: 'elemental-info-7',
			name: 'Field of Earth',
			description: 'A protective earth elemental, a force of earth resembles a nine-foot-tall great ape formed of dirt and rough stone. They act as guardians and historians to their ishkrar, working tirelessly to thwart ills from befalling the group. These elementals are sometimes called *earthen bulwarks*.'
		},
		{
			id: 'elemental-info-8',
			name: 'Elemental Languages',
			description: 'Elementals speak Low Kuric. Some can use Caelian when they need to.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'elemental-malice-1',
			name: 'Elemental Swap',
			cost: 3,
			sections: [
				'Two elementals on the encounter map teleport and swap places, gaining damage immunity 2 until the end of the round.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'elemental-malice-2',
			name: 'Split',
			cost: 5,
			sections: [
				'An elemental acting this turn cleaves themself into 2 separate elementals, splitting their current Stamina in half between them and becoming one size smaller. The elementals otherwise have the same statistics as the original. Both elementals then shift up to their speed.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'elemental-malice-3',
				name: 'Convocation of Chaos',
				type: FactoryLogic.type.createManeuver(),
				cost: 7,
				keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [
					FactoryLogic.distance.createSelf(),
					FactoryLogic.distance.createRanged(8)
				],
				target: 'Self or one elemental',
				effect: 'Until the end of the encounter, the target’s speed increases by 5 and their strikes deal an additional 5 damage. Whenever an elemental within line of eﬀect uses another convocation ability, the target also gains the eﬀects.'
			})
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'elemental-1',
			name: 'Crux of Fire',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Artillery),
			keywords: [ 'Elemental' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'T'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 80,
			stability: 0,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(2, 0, -1, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-1-feature-1',
						name: 'Spitfire',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(12) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '8 fire damage',
							tier2: '12 fire damage; A<1 burning (save ends)',
							tier3: '15 fire damage; A<2 burning (save ends)'
						}),
						effect: 'A burning creature or object takes 1d6 fire damage at the start of each of their turns until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-1-feature-2',
						name: 'Convocation of Flames',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Self or one elemental',
						effect: 'The target receives fire immunity 5 until the start of the crux’s next turn if they don’t already have it.',
						spend: [
							{ value: 3, effect: 'The ground within 3 of the target is wreathed in fire until the end of the encounter. Whenever an enemy first enters the affected area on a turn or starts their turn within it, they take 3 fire damage.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-1-feature-3',
						name: 'Flame Jet',
						type: FactoryLogic.type.createTrigger('The crux takes damage'),
						cost: 1,
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The crux ignores any effects associated with the damage and flies up to their speed. If the crux doesn’t end this movement on solid ground, they fall prone.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elemental-1-feature-4',
					name: 'Fickle and Free',
					description: 'The crux can’t be restrained, slowed, or knocked prone, and they ignore diﬃcult terrain.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'elemental-1-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elemental-2',
			name: 'Essence of Storms',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Harrier),
			keywords: [ 'Elemental' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(8, 'fly'),
			stamina: 80,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(1, 2, -1, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-2-feature-1',
						name: 'Bluster',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'All enemies in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage',
							tier2: '5 damage; 4 lightning damage; push 1',
							tier3: '5 damage; 7 lightning damage; push 3'
						}),
						effect: 'The essence shifts 3 before or after using this ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-2-feature-2',
						name: 'Convocation of Squalls',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Self or one elemental',
						effect: 'The target receives lightning immunity 5 until the start of the essence’s next turn if they don’t already have it.',
						spend: [
							{ value: 3, effect: 'The target emits a 3 aura vortex until the end of the encounter. The aura is considered difficult terrain for enemies. At the end of each of the target’s turns, the target can select 1 creature within the aura to push 5.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-2-feature-3',
						name: 'Thunderclap',
						type: FactoryLogic.type.createTrigger('The essence takes damage from the target.'),
						cost: 1,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object',
						effect: 'The essence deals 5 lightning damage to the target.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elemental-2-feature-4',
					name: 'Fickle and Free',
					description: 'The essence can’t be restrained, slowed, or knocked prone, and they ignore diﬃcult terrain.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'elemental-2-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Lightning, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elemental-3',
			name: 'Essence of Tides',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Controller),
			keywords: [ 'Elemental' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'swim'),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 1, -1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-3-feature-1',
						name: 'Water Wing',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage; slide 1',
							tier2: '11 damage; slide 2',
							tier3: '14 damage; slide 3'
						}),
						effect: 'P<2 the target\'s stability is reduced to 0 and they move 2 additional squares whenver they are force moved (save ends).'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-3-feature-2',
						name: 'Convocation of Waves',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Self or one elemental',
						effect: ' The target receives cold immunity 5 until the start of the essence’s next turn if they don’t already have it.',
						spend: [
							{ value: 3, effect: 'The target emits a 1 aura pool of water until the end of the encounter. The area beneath the aura becomes a river that trails behind the target as they move and is considered difficult terrain. An enemy that ends their turn standing in the river is M<2 slowed (save ends).' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-3-feature-3',
						name: 'Sea Salted Wounds',
						type: FactoryLogic.type.createTrigger('An ally deals damage ot the target.'),
						cost: 1,
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						effect: 'The essence makes a free strike against the target.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elemental-3-feature-4',
					name: 'Water Glide',
					description: 'When the essence starts their turn on a space containing water, they can add the ﬂying keyword to their movement until the end of their turn. While ﬂying, the essence doesn’t provoke opportunity attacks.'
				}),
				FactoryLogic.feature.create({
					id: 'elemental-3-feature-5',
					name: 'Fickle and Free',
					description: 'The essence can’t be restrained, slowed, or knocked prone, and they ignore diﬃcult terrain.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'elemental-3-feature-6',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Cold, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elemental-4',
			name: 'Field of Growth',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Controller),
			keywords: [ 'Elemental' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(8, 'climb'),
			stamina: 120,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-4-feature-1',
						name: 'Hampering Roots',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '8 damage',
							tier2: '13 damage; R<1 prone and can\'t stand (save ends)',
							tier3: '16 damage; prone; P<2 can\'t stand (save ends)'
						}),
						effect: 'This ability inflicts restrained (save ends) on targets that are already prone. When the restrained condition ends, any can’t stand effects also end.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-4-feature-2',
						name: 'Convocation of Verdure',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Self or one elemental',
						effect: 'The target gains 15 temporary Stamina that lasts until the start of the field’s next turn.',
						spend: [
							{ value: 3, effect: 'The ground within 1 of the target is overgrown with thicket and vines until the end of the encounter. Whenever an enemy attacks the target while within line of effect of the affected area, they are pulled 5 towards the affected area. Whenever an enemy enters the affected area on a turn or starts their turn within it, they are knocked prone.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-4-feature-3',
						name: 'Rose Lash Wounds',
						type: FactoryLogic.type.createTrigger('The field takes damage from the target.'),
						cost: 1,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object',
						effect: 'The field deals 6 damage to the target and A<2 bleeding (save ends).'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elemental-4-feature-4',
					name: 'Roots Run Deep',
					description: 'The ﬁeld can target creatures touching the ground with abilities, even if they don’t have line of eﬀect.'
				}),
				FactoryLogic.feature.create({
					id: 'elemental-4-feature-5',
					name: 'Fickle and Free',
					description: 'The ﬁeld can’t be restrained, slowed, or knocked prone, and they ignore diﬃcult terrain.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'elemental-4-feature-6',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elemental-5',
			name: 'Force of Earth',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
			keywords: [ 'Elemental' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5, 'burrow'),
			stamina: 132,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(2, -1, 0, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-5-feature-1',
						name: 'Slam Into Dirt',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '8 damage',
							tier2: '12 damage; M<1 restrained (save ends)',
							tier3: '15 damage; M<2 restrained (save ends)'
						}),
						effect: 'The area beneath the target becomes difficult terrain.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-5-feature-2',
						name: 'Convocation of Quartz',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Self or one elemental',
						effect: 'The target imposes a bane on melee strikes made against them until the start of the force’s next turn if they don’t already have it.',
						spend: [
							{ value: 3, effect: 'The target grows a carapace of stone, increasing their stability by 3 and granting them 15 temporary Stamina until the end of the encounter.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-5-feature-3',
						name: 'Break Armor',
						type: FactoryLogic.type.createTrigger('The force takes damage.'),
						cost: 1,
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: ' The force halves the damage, gains damage weakness 3, and increases their speed by 3. The damage weakness increases by 3 each time the force uses this ability in an encounter.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elemental-5-feature-4',
					name: 'Primordial Strength',
					description: 'The force deals an additional 6 damage with strikes targeting objects.'
				}),
				FactoryLogic.feature.create({
					id: 'elemental-5-feature-5',
					name: 'Fickle and Free',
					description: 'The force can’t be restrained, slowed, or knocked prone, and they ignore diﬃcult terrain.'
				})
			]
		})
	],
	addOns: []
};
