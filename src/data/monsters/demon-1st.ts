import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const demon1st: MonsterGroup = {
	id: 'monster-group-demon-1st',
	name: 'Demon — 1st Echelon',
	description: `
Creatures of incarnate hate, demons spawn naturally in the Abyssal Wasteland. They crave violence and suffering the way other creatures need food. A demon cares only for themself, and they torture and tear lesser demons apart for fun.

The bestial appearance of each demon is unique, composed of a chaotic arrangement of teeth, claws, and limbs meant for killing. Even demons of the same kind have unique features. One might bear an extra set of eyes or teeth, while another has a humanoid arm growing from their forehead.`,
	picture: null,
	information: [
		{
			id: 'demon-1st-info-1',
			name: 'Mortal Alliances',
			description: 'Demons form temporary alliances with evil mortals in exchange for souls to consume. Such alliances create carnage with alarming efficiency, though they inevitably collapse when the demons decide to devour their foolish partners. The only creature who can truly keep a demon in line is a more powerful demon.'
		},
		{
			id: 'demon-1st-info-2',
			name: 'Soul Reavers',
			description: 'Demons feast not on food or liquids, but on souls. Souls fuel their anarchic powers, and while a demon is starved for souls, they can scarcely think. Whenever a demon kills a creature who has a soul, they consume that soul and keep its energy within their body. A demon can then burn that soul energy to enact their most devastating abilities.'
		},
		{
			id: 'demon-1st-info-3',
			name: 'Lethe',
			description: 'When a demon’s soul energy begins to flag, they fall into a state known as lethe—a violent hunger wherein they can only lash out in a desperate search for sustenance. Demons who have fallen into lethe become single-minded and violent, seeking only to consume.'
		},
		{
			id: 'demon-1st-info-4',
			name: 'Demonic Hierarchy',
			description: `
Mortal scholars have classified demons into ten categories, each increasingly more powerful. Though demons don’t use these classifications themselves, this system reflects their hierarchy, as stronger demons bully the weak into service.

Each time a demon consumes a soul, there’s a chance they might evolve into a more powerful demon. The evolution from one category to the next can be instantaneous, or it can take years. This inconsistency has led to much scholarly debate on whether all souls are equal, or whether demonic evolution is aided by the consumption of souls that are especially corrupt—or heroic.`
		},
		{
			id: 'demon-1st-info-5',
			name: 'Demon Languages',
			description: 'Lower categories of demons speak Proto-Ctholl. As demons evolve and reach category 3 or higher, their speech turns into proper Tholl.'
		},
		{
			id: 'demon-1st-info-6',
			name: 'Demons — 1st Echelon',
			description: `
A number of lesser demons have been identified across categories 1 to 3:

• **Pitlings** resemble rodents or insects, but possess gleaming green eyes and terrible body odor, and disgorge a viscous, toxic phlegm.

• **Ensnarers** are the result of pitlings getting hold of an unfortunate soul. A pitling in the process of digesting the soul of a creature has that soul physically bore through their head to become a fanged appendage. Mouths form across the creature’s body, each attacking with long,barbed tongues.

• **Frenzied** are similar to ensnarers, but their transformation into a true demon is more advanced. This results in a fast and vicious creature full of energy and hungry for more souls.

• **Bendraks** (BEN-drax) appear as an amalgamation of flesh and the shards of broken mirrors, which they use to distract and confuse their foes. A bendrak can divert an enemy’s attack to another enemy, and can hide themselves or allies behind dazzling reflections.

• **Mucerons** (MIU-sur-onz) are the result of an ensnarer going through repeated demon evolutions to become a brutish creature. They are covered in multiple mouths that shoot out barbed tongues, tearing at enemies as they are dragged out of position.

• **Remasches** (REE-mash-iz) have physical forms blended with the nature of the wastes where they dwell. A remasch teleports around the battlefield, inflicting chaos on their enemies directly or through the minions they control. These demons are rumored to be the initial source of the teachings of all shadows through the College of Black Ash.

• **Ruinants** (rew-in-ANSE) are possessed of glowing eyes and tendrilringed maws, their bodies covered in inflamed scars and their breath coming as a sickening wheeze. A ruinant can inflict fresh wounds and burns on their victims in a pattern mirroring those on the demon’s own body.

• **Torlases** (TORR-lahs-iz) are piecemeal abominations whose physical forms don’t obey the mundane laws of geometry. They control the battlefield by using living flesh and whipping allies and enemies alike into advantageous position.

• **Chorogaunts** (cor-roh-GAWNTS) are terrifying demon leaders. Each is an amalgamation of several demon bodies formed into a mobile musical instrument. Several heads are arranged into a chorus embedded in the demon’s chest, and their ribs are upturned into a fleshy pipe organ. Their attacks entrance and confuse enemies, making them more vulnerable to other demons.`
		}

	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'demon-1st-malice-1',
			name: 'Soulburn',
			cost: 3,
			sections: [
				'Each demon acting this turn has a double edge on their abilities.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'demon-1st-malice-3',
			name: 'Abyssal Evolution',
			cost: 7,
			sections: [
				'A demon minion of your choice transforms into a non-minion horde demon of the same level.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'demon-1st-malice-2',
			name: 'Abyssal Rift',
			cost: 7,
			sections: [ 'Two size 2 rifts to the Abyssal Wasteland appear at locations of your choice. Any demon can use an abyssal rift as a portal to another abyssal rift in the encounter, moving into any space in one rift and appearing immediately in any unoccupied space in the other rift. A non-demon who enters a rift for the first time in a round or starts their turn there takes corruption damage equal to the level of the highest-level demon on the encounter map. An abyssal rift is an immovable object that has 25 Stamina, damage immunity 2, and holy weakness 5. The rift closes when there are no demons remaining on the encounter map. Additionally, a creature who has the Magic or Psionics skill can make a **Reason test** or **Intuition test** as a maneuver while adjacent to a rift to destabilize and close it.',
				FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
					tier1: 'The rift remains open and regains 5 Stamina.',
					tier2: 'The rift remains open.',
					tier3: 'The rift closes.'
				}) ]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'demon-1st-1',
			name: 'Ensnarer',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+2 bonus to melee distance',
			characteristics: MonsterLogic.createCharacteristics(2, 0, -1, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-1-feature-1',
						name: 'Barbed Tongues',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage; pull 1',
								tier2: '4 damage; pull 2',
								tier3: '5 damage; pull 3'
							})),
							FactoryLogic.createAbilitySectionText('If the target is pulled adjacent to the ensarer, the ensnarer makes a free strike against them.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-1-feature-2',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the ensnarer can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-1-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-1st-2',
			name: 'Frenzied',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: '+2 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(0, 2, -1, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-2-feature-1',
						name: 'Rip and Tear',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 damage',
								tier2: '2 damage',
								tier3: '3 damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-2-feature-2',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the ensnarer can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-2-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-1st-3',
			name: 'Pitling',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'T'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+2 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(-2, 2, -2, -2, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-3-feature-1',
						name: 'Spit',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 poison damage',
								tier2: '4 poison damage',
								tier3: '5 poison damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-3-feature-2',
					name: 'Horrid Stench',
					description: 'Any enemy who has three or more pitlings within 2 squares of them can\'t regain Stamina.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-3-feature-3',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the ensnarer can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-3-feature-4',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-1st-4',
			name: 'Bendrak',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-4-feature-1',
						name: 'Warp Perception',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 psychic damage',
								tier2: '5 psychic damage; P<1 weakened (save ends)',
								tier3: '7 psychic damage; P<2 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If the target makes a strike while weakened this way, the bendrak can choose a second target within distance for the strike. The first target takes half of any damage from the strike and the second target takes any remaining damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-4-feature-2',
						name: 'Vanish',
						type: FactoryLogic.type.createManeuver(),
						cost: 1,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target is invisible until the start of their next turn. They can then move up to 3 squares and attempt to hide.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-4-feature-3',
					name: 'Lethe',
					description: 'While the bendrak is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-4-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the bendrak can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-4-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-1st-5',
			name: 'Muceron',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 5,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-5-feature-1',
						name: 'Barbed Tongues',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; pull 2',
								tier2: '7 damage; pull 3',
								tier3: '8 damage; pull 4'
							})),
							FactoryLogic.createAbilitySectionText('If the target is pulled adjacent to the muceron, the muceron can either make a free strike or use the Grab maneuver against them.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-5-feature-2',
						name: 'Tongue Pull',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Three creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionText('The muceron pulls each target up to 5 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-5-feature-3',
					name: 'Lethe',
					description: 'While the muceron is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-5-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the bendrak can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-5-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-1st-6',
			name: 'Remasch',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'teleport'),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-6-feature-1',
						name: 'Abyssal Strike',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; the remasch can teleport up to 2 squares',
								tier2: '6 damage; the remasch can teleport up to 3 squares',
								tier3: '8 damage; the remasch can teleport up to 5 squares'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 5,
								effect: 'The remasch takes an adjacent creature with them when they teleport. The creature appears in an unoccupied space adjacent to the remasch’s destination.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-6-feature-2',
						name: 'Grasping Shadows',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The remasch can teleport up to 2 squares and uses Abyssal Strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-6-feature-3',
					name: 'Lethe',
					description: 'While the remasch is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-6-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the remasch can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-6-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-1st-7',
			name: 'Ruinant',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-7-feature-1',
						name: 'Bloodletting Claw',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage',
								tier2: '4 damage',
								tier3: '5 damage; M<2 bleeding (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-7-feature-2',
						name: 'Salt Wounds',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures',
						sections: [
							FactoryLogic.createAbilitySectionText('**Special:** Each target must be at less than full Stamina.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 corruption damage',
								tier2: '2 corruption damage',
								tier3: '3 corruption damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-7-feature-3',
					name: 'Lethe',
					description: 'While the ruinant is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-7-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the ruinant can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-7-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-1st-8',
			name: 'Torlas',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-8-feature-1',
						name: 'Floor to Flesh',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: 'Slide 3',
								tier2: 'Slide 4',
								tier3: 'Slide 5'
							})),
							FactoryLogic.createAbilitySectionText('The ground in the area turns into a morass of spongy flesh before the targets are force moved. Until the start of the torlas’s next turn, the area is difficult terrain, and each creature who moves in the area takes 1 damage for each square moved.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-8-feature-2',
						name: 'Grasping Tendons',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures',
						sections: [
							FactoryLogic.createAbilitySectionText('The torlas pulls each target up to 3 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-8-feature-3',
					name: 'Lethe',
					description: 'While the torlas is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-8-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the torlas can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-8-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-1st-9',
			name: 'Chorogaunt',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 120,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 2, 2, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-9-feature-1',
						name: 'Agonizing Harmony',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '4 psychic damage; I<1 slowed (save ends)',
								tier2: '7 psychic damage; I<2 slowed (save ends)',
								tier3: '10 psychic damage; I<3 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('One ally within 10 squares of the chorogaunt shifts up to their speed.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-9-feature-2',
						name: 'Chaotic Entrancing Harmony',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('The chorogaunt slides each target up to 3 squares, ignoring stability.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-9-feature-3',
						name: 'I Thrive on Pain',
						cost: 3,
						type: FactoryLogic.type.createTrigger('The chorogaunt is targeted by a strike.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Any damage from the strike is halved, and the chorogaunt’s abilities deal an extra 3 damage until the end of their next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-9-feature-4',
					name: 'End Effect',
					description: 'At the end of each of their turns, the chorogaunt can take 5 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-9-feature-5',
					name: 'Lethe',
					description: 'While the chorogaunt is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-1st-9-feature-6',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the chorogaunt can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1st-9-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-9-feature-8',
						name: 'Frightening Tones',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three enemies',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target must choose between taking 5 psychic damage, or being frightened (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-9-feature-9',
						name: 'Bully the Weak',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The chorogaunt kills the target, and each other ally in the encounter deals an extra 3 damage with strikes until the end of the round. The Director gains Malice equal to the number of heroes in the encounter.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1st-9-feature-10',
						name: 'Running Cacophony',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The chorogaunt shifts up to their speed, uses Agonizing Harmony, shifts up to their speed, and then uses Agonizing Harmony again.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
