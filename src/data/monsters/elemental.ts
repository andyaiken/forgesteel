import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { ConditionType } from '../../enums/condition-type';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const elemental: MonsterGroup = {
	id: 'monster-group-elemental',
	name: 'Elemental',
	description: 'When the gods formed the mundane world, they took sparks of creation from the roiling plane of Quintessence and gave sentience to some of the multiverse’s most basic elements—air, earth, fire, and water. Many elementals contain just one of these components, but can come to embody multiple reagents as they age.',
	picture: null,
	information: [
		{
			id: 'elemental-info-1',
			name: 'Duality of Form',
			description: `
Elementals are mercurial creatures of creation, destruction, and transformation. Though the deities first created the mundane world, elementals cultivated and shaped it. When a tree, stone, or other aspect of the world doesn’t suit an elemental, they break it down with elemental fury then build it anew.

Elementals change like the winds and the tides, and from age to age, they remake themselves to reflect what the world has become. They are protectors armored by stone, lizards ablaze with fire, and sometimes dragons clad in steel.`
		},
		{
			id: 'elemental-info-2',
			name: 'Rebirth and Reformation',
			description: 'When an elemental dies in the mundane world, their spirit returns to Quintessence, where they must rest for decades to regain their strength. Should the spirit return to the mundane world, they take on a form that reflects a creature or other aspect of that plane.'
		},
		{
			id: 'elemental-info-3',
			name: 'Crux of Fire',
			description: `
Cruxes of fire, often called blazecasters, take the form of fiery lizards. They commonly live in hot zones of planar convergence or areas of volcanic activity. These territorial elementals usually question interlopers from afar—and if they don’t like the answers, they rain down fire before their foes can draw near.

Though many elementals weave their innate gifts into oral storytelling, cruxes of fire are particularly adroit at animating their stories in silhouettes of flame.`
		},
		{
			id: 'elemental-info-4',
			name: 'Essence of Storms',
			description: `
At a distance, most would mistake an essence of storms, sometimes known as a galeweaver, for a large bird of prey. This majestic creature is formed from streaks of colored cloud stuff woven into the silhouette of a large eagle or falcon.

Galeweavers act as scouts for their handlers or for groups of elementals, and they’re usually the first to spot trouble. Insatiably curious, an essence of storms often swoops down to talk when they observe travelers.`
		},
		{
			id: 'elemental-info-5',
			name: 'Essence of Tides',
			description: `
An essence of tides looks like a shimmering blue manta ray that glides over land as easily as through water, earning them the common name of tidedrifter. Most common along coastlines, essences of tides enjoy harmless pranks, especially against folk who regularly sail or swim in their waters.

Tidedrifters have a healthy sense of humor that makes it easy to win their friendship—but their relaxed demeanor evaporates if friends or family face threats.`
		},
		{
			id: 'elemental-info-6',
			name: 'Field of Growth',
			description: 'The field of growth takes the form of a massive centipede made of vegetation. Often called verdant primevals, these caretakers of the natural cycle of life (and death) fight those they see as upsetting that cycle. Fields of growth seek not only to destroy undead and those who create them, but to sabotage divine servitors who casually peddle resurrection magic.'
		},
		{
			id: 'elemental-info-7',
			name: 'Field of Earth',
			description: 'A protective earth elemental, a force of earth resembles a nine-foot-tall great ape formed of dirt and rough stone. They act as guardians and historians when among other elementals, working tirelessly to thwart ills from befalling the group. These elementals are sometimes called earthen bulwarks.'
		},
		{
			id: 'elemental-info-8',
			name: 'Elemental Languages',
			description: 'Most elementals speak Low Kuric. Some can use Caelian when they need to.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'elemental-malice-1',
			name: 'Elemental Swap',
			cost: 3,
			sections: [
				'Two elementals on the encounter map teleport to swap places, and each has damage immunity 2 until the end of the round.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'elemental-malice-2',
			name: 'Split',
			cost: 5,
			sections: [
				'An elemental acting this turn cleaves themself into two separate elementals. Each elemental has the same statistics as the original, except that each has half the original’s current Stamina and is one size smaller. Both elementals can then shift up to their speed.'
			]
		}),
		FactoryLogic.feature.createMaliceAbility({
			ability: FactoryLogic.createAbility({
				id: 'elemental-malice-3',
				name: 'Convocation of Chaos',
				type: FactoryLogic.type.createManeuver(),
				cost: 7,
				keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [
					FactoryLogic.distance.createRanged(8)
				],
				target: 'Self or one elemental',
				sections: [
					FactoryLogic.createAbilitySectionText('Until the end of the encounter, the target has a +5 bonus to speed and a +5 damage bonus to strikes. Additionally, whenever an elemental within the target’s line of effect uses an ability with “Convocation” in the name, the target also gains the effects of that ability.')
				]
			})
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'elemental-1',
			name: 'Crux of Fire',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Artillery),
			keywords: [ 'Elemental' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'T'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 80,
			stability: 0,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(-1, 2, 0, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-1-feature-1',
						name: 'Spitfire',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(12) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '8 fire damage',
								tier2: '12 fire damage; A<1 the target is burning (save ends)',
								tier3: '15 fire damage; A<2 the target is burning (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A burning creature takes 1d6 fire damage at the start of each of their turns. A burning object takes 1d6 fire damage at the end of each round.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('Until the start of the crux’s next turn, the target has fire immunity 5.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 3,
								effect: 'Until the end of the encounter, the ground within 3 squares of the target is wreathed in fire. Any enemy who enters that area for the first time in a round or starts their turn there takes 3 fire damage.'
							})
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
						sections: [
							FactoryLogic.createAbilitySectionText('The crux ignores any effects associated with the damage and can fly up to their speed. If the crux doesn’t end this movement on solid ground, they fall.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'elemental-1-feature-4',
					name: 'Fickle and Free',
					description: 'The crux ignores diﬃcult terrain.'
				}),
				FactoryLogic.feature.createConditionImmunity({
					id: 'elemental-1-feature-4b',
					conditions: [ ConditionType.Restrained, ConditionType.Slowed, ConditionType.Prone ]
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
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Harrier),
			keywords: [ 'Elemental' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(8, 'fly'),
			stamina: 100,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: FactoryLogic.createCharacteristics(1, 2, -1, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-2-feature-1',
						name: 'Bluster',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage',
								tier2: '5 damage; 4 lightning damage; push 1',
								tier3: '5 damage; 7 lightning damage; push 3'
							})),
							FactoryLogic.createAbilitySectionText('The essence shifts up to 3 squares before or after using this ability.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('Until the start of the essence’s next turn, the target has lightning immunity 5.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 3,
								effect: 'Until the end of the encounter, a vortex surrounds the target in a 3 aura. The area is difficult terrain for enemies. Additionally, at the end of each of the target’s turns, they can push one creature in the area up to 5 squares.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-2-feature-3',
						name: 'Thunderclap',
						type: FactoryLogic.type.createTrigger('A creature within distance deals damage to the essence.'),
						cost: 1,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.createRanged(5)
						],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target takes 5 lightning damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'elemental-2-feature-4',
					name: 'Fickle and Free',
					description: 'The essence ignores diﬃcult terrain.'
				}),
				FactoryLogic.feature.createConditionImmunity({
					id: 'elemental-2-feature-4b',
					conditions: [ ConditionType.Restrained, ConditionType.Slowed, ConditionType.Prone ]
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
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Controller),
			keywords: [ 'Elemental' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'swim'),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 5,
			characteristics: FactoryLogic.createCharacteristics(2, 0, 1, -1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-3-feature-1',
						name: 'Water Wing',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage; slide 1',
								tier2: '11 damage; slide 2',
								tier3: '14 damage; slide 3'
							})),
							FactoryLogic.createAbilitySectionText('If a target has P<2, their stability is reduced to 0 and they move 2 additional squares whenever they are force moved (save ends).')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('Until the start of the essence’s next turn, the target has cold immunity 5.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 3,
								effect: 'Until the end of the encounter, the ground within 1 square of the target is a pool of water that is difficult terrain. This water extends out behind the target as they move, creating a stream that lasts until the end of the encounter. Any enemy who ends their turn in the stream and has M<2 is slowed (save ends).'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-3-feature-3',
						name: 'Sea Salted Wounds',
						type: FactoryLogic.type.createTrigger('An ally deals rolled damage to the target.'),
						cost: 1,
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('The essence makes a free strike against the target.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'elemental-3-feature-4',
					name: 'Water Glide',
					description: 'Whenever the essence starts their turn in a space containing water, they can fly until the end of their turn. While flying, the essence doesn’t provoke opportunity attacks.'
				}),
				FactoryLogic.feature.create({
					id: 'elemental-3-feature-5',
					name: 'Fickle and Free',
					description: 'The essence ignores diﬃcult terrain.'
				}),
				FactoryLogic.feature.createConditionImmunity({
					id: 'elemental-3-feature-5b',
					conditions: [ ConditionType.Restrained, ConditionType.Slowed, ConditionType.Prone ]
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
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Controller),
			keywords: [ 'Elemental' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(8, 'climb'),
			stamina: 120,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(2, 0, 0, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-4-feature-1',
						name: 'Hampering Roots',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '8 damage',
								tier2: '13 damage; R<1 prone and can\'t stand (save ends)',
								tier3: '16 damage; R<2 prone and can\'t stand (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If a target made prone this way is already prone, they are instead restrained (save ends). If the target was also unable to stand, that effect ends when they are no longer restrained this way.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('The target gains 15 temporary Stamina that lasts until the start of the field’s next turn.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 3,
								effect: 'Until the end of the encounter, the ground within 1 square of the target is overgrown with underbrush and vines. Whenever any enemy makes a strike against the target while within line of effect of that area, the enemy is pulled 5 squares toward the area after the strike is resolved. Any enemy who enters the area for the first time in a round or starts their turn there is knocked prone.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-4-feature-3',
						name: 'Rose Lash Wounds',
						type: FactoryLogic.type.createTrigger('A creature or object within distance deals damage to the field.'),
						cost: 1,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'The triggering creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('The target takes 6 damage, and if they have A<2, they are bleeding (save ends).')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'elemental-4-feature-4',
					name: 'Roots Run Deep',
					description: 'The field can target any creature touching the ground with their abilities, even if they don’t have line of effect to that creature.'
				}),
				FactoryLogic.feature.create({
					id: 'elemental-4-feature-5',
					name: 'Fickle and Free',
					description: 'The field ignores difficult terrain.'
				}),
				FactoryLogic.feature.createConditionImmunity({
					id: 'elemental-4-feature-5b',
					conditions: [ ConditionType.Restrained, ConditionType.Slowed, ConditionType.Prone ]
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
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Elemental' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5, 'burrow'),
			stamina: 132,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(2, -1, 0, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elemental-5-feature-1',
						name: 'Slam Into Dirt',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '8 damage',
								tier2: '12 damage; M<1 restrained (save ends)',
								tier3: '15 damage; M<2 restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The target\'s space is difficult terrain.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('Until the start of the force’s next turn, any melee strike made against the target takes a bane if it doesn’t already have a bane or double bane.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 3,
								effect: 'Until the end of the encounter, the target grows a carapace of stone. They have a +3 bonus to stability and gain 15 temporary Stamina.'
							})
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
						sections: [
							FactoryLogic.createAbilitySectionText('The force halves the damage, and has damage weakness 3 and a +3 bonus to speed until the end of the encounter. This damage weakness increases by 3 each time the force uses this ability in the same encounter.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'elemental-5-feature-4',
					name: 'Primordial Strength',
					description: 'The force’s strikes gain a +6 damage bonus against objects.'
				}),
				FactoryLogic.feature.create({
					id: 'elemental-5-feature-5',
					name: 'Fickle and Free',
					description: 'The force ignores diﬃcult terrain.'
				}),
				FactoryLogic.feature.createConditionImmunity({
					id: 'elemental-5-feature-5b',
					conditions: [ ConditionType.Restrained, ConditionType.Slowed, ConditionType.Prone ]
				})
			]
		})
	],
	addOns: []
};
