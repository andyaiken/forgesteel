import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { StatBlockIcon } from '../../enums/stat-block-icon';

export const lich: MonsterGroup = {
	id: 'monster-group-lich',
	name: 'Lich',
	description: 'A lich begins life as a mortal, often a studied mage, fueled by a burning, unquenchable hunger for knowledge at any cost. Knowledge beyond life and death, beyond this world, beyond gods and fiends. Possessed by the unshakable belief that ultimate knowledge brings ultimate power. The necessary rites are forbidden in many cultures, for they require a bloody, evil act: the sacrifice of someone dear to the would-be lich.',
	picture: null,
	information: [
		{
			id: 'lich-info-1',
			name: 'Forging a Soulstone',
			description: 'The ritual to create a lich requires a sphere constructed of something personal to the subject, such as steel from an heirloom suit of armor or a tangle of branches from the tree that shaded their wedding. To complete the rite, the subject must rip out their own heart and the heart of a living loved one, placing both inside the sphere. The hearts conjoin and transmute into a ruby that welds to the sphere, creating the new lich’s soulstone. As long as their soulstone remains intact, a lich can never truly die. Most soulstones are small and easy to conceal, though a lich can construct the stone’s outer sphere to be any size that suits their purpose.'
		},
		{
			id: 'lich-info-2',
			name: 'Terrifying Immortality',
			description: `
A lich’s true appearance is ghastly. The damage to their chest never heals, and over the centuries, their body slowly decays into a skeleton. Some liches hide their appearance with an illusion that makes them even more attractive and vivacious than they were in life. Others embrace their terrifying look, proudly displaying their fell triumph to every creature they encounter.

Though all liches desire eternal life, it fails to satisfy most. Liches who were once powerful adventurers seek more of everything they’ve always craved—more glory, more power, more wealth. Most set about amassing all three, building armies of followers to seize whatever the lich desires from any who resist their power.`
		},
		{
			id: 'lich-info-3',
			name: 'Eldritch Lairs',
			description: 'Liches are strongest when surrounded by devoted followers. Although they are often encountered alone, most liches have legions of undead, mind-warped cultists, or amoral mercenary companies guarding their most important holdings. Their lairs can be found inside strong­ holds and castles, hidden in bank vaults or government halls, or ensconced in false temples. The most savvy of these undead mages refuse to consolidate their power in a single location, often scattering lairs in a way that leads adventurers on chases across whole worlds.'
		},
		{
			id: 'lich-info-4',
			name: 'Merciless Schemers',
			description: `
All liches understand the potential of do-gooder heroes to threaten their pursuits and destroy their soulstone, and they do everything in their power to stay on top of such threats. Adventurers with a trove of powerful supernatural treasures or the potential strength to resist a lich are hunted mercilessly.

Liches know they have all the time in the world to plot against their foes, and have refined hatred into an art form.`
		},
		{
			id: 'lich-info-5',
			name: 'Lich Languages',
			description: 'A lich speaks the languages they knew in life, and might also pick up Anjali, Proto-Ctholl, Variac, and Vastariax over their limitless lifetime.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'lich-malice-1',
			name: 'Soul Sip',
			cost: 3,
			icon: StatBlockIcon.Self,
			sections: [
				'The lich makes a free strike against one enemy within 20 squares. They then gain an edge on their next power roll.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'lich-malice-2',
			name: 'Solo Action',
			cost: 5,
			icon: StatBlockIcon.Villain,
			sections: [
				'The lich takes an additional main action on their turn. They can use this feature even if they are dazed.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'lich-malice-3',
			name: 'Spirit Shell',
			cost: 5,
			icon: StatBlockIcon.Self,
			sections: [
				'The lich summons a swirling cloud of angry spirits to surround them until the start of the next round. Any creature who deals damage to the lich with a melee strike while the spirit shell is active makes a **Presence test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Presence,
					tier1: '16 psychic damage, dazed (save ends)',
					tier2: 'Dazed (save ends)',
					tier3: 'No effect.'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'lich-malice-4',
			name: 'Cloud of Deceit',
			cost: 7,
			icon: StatBlockIcon.SpecialArea,
			sections: [
				`
The lich summons a mind-altering mist, turns invisible until the start of their next turn, and moves up to half their speed. Each enemy within 20 squares of the lich’s starting point who has I<4 is deceived. While deceived, a creature perceives all allies and enemies as the lich, and perceives the environment as an unfamiliar wasteland corrupted by necrotic blight. If other creatures attempt to communicate with a deceived creature, that creature interprets their words as ghastly taunts in the lich’s voice.

This effect lasts until an affected creature takes damage or an ally uses a main action to shake them out of it. Each time this feature is used during an encounter, the distance of the effect decreases by 5 squares (to a minimum of 5 squares) and the potency increases by 1.`
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'lich-1',
			name: 'Lich',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Undead' ],
			encounterValue: 144,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(10, 'fly, hover'),
			stamina: 650,
			stability: 1,
			freeStrikeDamage: 10,
			characteristics: FactoryLogic.createCharacteristics(2, 3, 5, 5, 5),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'lich-1-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 10 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 10 })
					]
				}),
				FactoryLogic.feature.createSoloMonster({
					id: 'lich-1-2',
					name: 'the lich',
					endEffect: 20
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lich-1-3',
						name: 'Conflagration',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '15 fire damage; A<4 the target is immolated (save ends)',
									tier2: '21 fire damage; A<5 the target is immolated (save ends)',
									tier3: '25 fire damage; A<6 the target is immolated (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('An immolated creature takes 10 fire damage whenever they use a main action and a maneuver on their turn. This damage can’t be reduced in any way.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lich-1-4',
						name: 'Hopeless Place',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '8 corruption damage; P<4 the target is hopeless (save ends)',
									tier2: '13 corruption damage; P<5 the target is hopeless (save ends)',
									tier3: '16 corruption damage; P<6 the target is hopeless (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('A hopeless creature can’t benefit from edges or double edges, can’t gain or use surges, and can’t gain temporary Stamina.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								effect: 'The distance of this ability increases to a 20 burst and its potency increases by 1.',
								value: 3
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lich-1-5',
						name: 'Pain Unending',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One creature or object',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '17 psychic damage',
									tier2: '24 psychic damage',
									tier3: '29 psychic damage'
								})
							),
							FactoryLogic.createAbilitySectionText('A target who has M<4 is wracked with pain (save ends). A creature wracked with pain has a double bane on abilities.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								effect: 'The lich chooses one additional target.',
								value: 3
							}),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								effect: 'Each creature wracked with pain gains one of the following conditions of the lich’s choice for each 2 Malice spent: bleeding, slowed, or prone and can’t stand. These conditions end when a creature is no longer wracked with pain.',
								value: 2,
								repeatable: true
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lich-1-6',
						name: 'Necrotic Form',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The lich becomes spectral, moves up to their speed, and becomes corporeal again. While spectral, the lich automatically ends the grabbed or restrained conditions, has damage immunity 5, can move through solid matter, and ignores difficult terrain. If the lich ends this movement inside solid matter, they are shunted out into the space from which they entered it.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lich-1-7',
						name: 'Baleful Swap',
						type: FactoryLogic.type.createTrigger('The lich is targeted using an ability by a creature other than the target.'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One enemy',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionText('If the target has P<4, they swap places with the lich to become the new target of the triggering ability.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'lich-1-8',
					name: 'Herald of Oblivion',
					description: 'In the lich’s presence, death’s call is stronger. Any winded creature within 5 squares of the lich is bleeding and can’t use the Catch Breath maneuver.'
				}),
				FactoryLogic.feature.create({
					id: 'lich-1-9',
					name: 'Glare of Undeath',
					description: 'At the start of each round, the lich chooses a creature within 10 squares. If that creature has r<4], they are restrained until the end of the lich’s next turn. The lich can’t choose the same creature two rounds in a row.'
				}),
				FactoryLogic.feature.create({
					id: 'lich-1-10',
					name: 'Rejuvenation',
					description: `
The lich has a soulstone, which has 50 Stamina and damage immunity all except to sonic damage and holy damage. If the lich is destroyed while their soulstone is intact, their soul retreats into the soulstone. Any creature who has p<5] and who moves within 5 squares of an inhabited soulstone for the first time in a round or starts their turn there is compelled (save ends). A compelled creature must do everything in their power to move toward and touch the soulstone.

A creature who touches an inhabited soulstone makes a **Might test** that takes a bane.

* **11-**: The creature is reduced to 0 Stamina and the lich manifests adjacent to the soulstone with full Stamina.
* **12 - 16**: The creature is reduced to 0 Stamina and the lich manifests adjacent to the soulstone with 300 Stamina.
* **17+**: The creature has their Stamina reduced to their winded value unless it is already lower, and the lich manifests adjacent to the soulstone with 100 Stamina.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lich-1-11',
						name: 'Cages of Wasting',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createSpecial('Two 3 cubes within 10') ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes an **Agility test**.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Agility,
									tier1: '10 corruption damage; restrained (save ends)',
									tier2: '16 corruption damage; restrained (EoT)',
									tier3: '20 corruption damage'
								})
							),
							FactoryLogic.createAbilitySectionText('The lich deals an additional 10 corruption damage to each creature restrained this way.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lich-1-12',
						name: 'My Power Alone',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 12 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('A target can’t use heroic abilities until the start of the lich’s next turn.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lich-1-13',
						name: 'Arms of Necrosis',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 6 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '8 corruption damage; A<4 frightened (save ends)',
									tier2: '13 corruption damage; A<5 frightened (save ends)',
									tier3: '16 corruption damage; A<6 frightened (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('At the end of each of the lich’s turns, they regain 10 Stamina for each creature frightened this way.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
