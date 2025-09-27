import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';
import { StatBlockIcon } from '../../enums/stat-block-icon';

export const xorannox: MonsterGroup = {
	id: 'monster-group-xorannox',
	name: 'Xorannox The Tyract',
	description: 'Xorannox the Tyract is an overmind. Formally known by their endonym, vaurath (plural: vaurathi), overminds plot and scheme against their chief rivals, the synlirii and the olothec, for control of the World Below.',
	picture: null,
	information: [
		{
			id: 'xorannox-info-1',
			name: 'Psionic Eyes',
			description: 'An overmind is an enormous floating brain with a large central eye surrounded by many smaller embedded eyes. Even more alien, several psionic eyes float within inches of their head, each connected to a small brain that can manifest a unique psionic effect.'
		},
		{
			id: 'xorannox-info-2',
			name: 'Intelligent Loremasters',
			description: 'Like their rivals, overminds are loremasters of supreme intellect. They aren’t usually wizards, but they all view the collection of knowledge and arcane sciences as the best tool for ultimate conquest. Overminds are cruel and capricious but enjoy tests of intellectual might. Their one vanity is their unshakable belief in their own intellectual superiority over all others.'
		},
		{
			id: 'xorannox-info-3',
			name: 'Overmind Lairs',
			description: 'Thanks to their innate flight, overminds prefer to build (or rather, have their thralls build) towers with no doors or entrances anywhere near the bottom.'
		},
		{
			id: 'xorannox-info-4',
			name: 'Rivalries and Negotiations',
			description: 'Unlike the synlirii and the olothec, overminds have an intense hatred of their own kind and never work together. However, overminds often enjoy diplomacy with other species, seeking to form alliances and build secret networks of agents throughout the World Below.'
		},
		{
			id: 'xorannox-info-5',
			name: 'Smelly Eggs',
			description: `
Overmind procreation involves one horror laying a single egg in a slime
pool and leaving it behind. When another overmind later detects the
distinct smell of the egg, they spray their inseminating fluid into the
pool. These actions are compelled by biological necessity, a compulsion
even the overminds can’t ignore.

Unwitting explorers sometimes accidentally abscond with an egg.
If unfertilized, its bearer is likely to attract the attention of other
overminds and synlirii that use the eggs in genetic experiments to
create psionic creatures. If the egg is fertilized, the explorer could find
themselves becoming a newly hatched overmind’s first victim.`
		},
		{
			id: 'xorannox-info-6',
			name: 'Xorannox the Tyract',
			description: `
Xorannox (ZOR-ah-nocks) rules as Lord of the White Tower, an isolated, multilevel finger of alabaster stone connecting to the World Below. He is commonly known as the Tyract, an ancient Za’hariax word that literally translates as “a king who rules with his teeth”—and the overmind indeed consumes those who displease him.

Xorannox is chief of the Grasp, a secret organization that seeks to overthrow the voiceless talkers’ great empire and place Xorannox above all, first as king, then as god. The Tyract is a master strategist, always one step ahead of his enemies. Heroes may be surprised to discover their allies are members of the Grasp. When they meet Xorannox, he’s delighted! He loves treating with humanoids! They have the same enemies, after all.

Unfortunately, no matter how useful or dependable a party of heroes might be, Xorannox is nearly incapable of resisting the urge to betray his allies. He assumes, as do most vaurathi, that the natural end of all alliances is betrayal. Thus when the gauntlet is thrown and his life is in danger, the only minions he can truly trust are his own six eyes.`
		},
		{
			id: 'xorannox-info-7',
			name: 'Xorannox\'s Languages',
			description: 'Overminds typically speak Za’hariax. Xorannox also speaks Caelian, Hyrallic, and Voll.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'xorannox-malice-1',
			name: 'Gas Belch',
			cost: 3,
			icon: StatBlockIcon.AuraBurst,
			sections: [
				'Xorannox lets out a noxious belch. Each enemy within 2 squares of him who has M<3 is weakened (save ends).'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'xorannox-malice-2',
			name: 'Slime Trail',
			cost: 5,
			icon: StatBlockIcon.Trait,
			sections: [
				'Until the end of Xorannox’s next turn, whenever he or any of his eyes leave their space, they secrete a viscous slime onto the ground in that area. Any enemy who enters an affected square has lightning weakness 5 and fire weakness 5 until the end of the encounter.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'xorannox-malice-3',
			name: 'Solo Action',
			cost: 5,
			icon: StatBlockIcon.Villain,
			sections: [
				'Xorannox takes an additional main action on his turn. He can use this feature even if he is dazed.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'xorannox-malice-4',
			name: 'Mind Over Matter',
			cost: 7,
			icon: StatBlockIcon.SpecialArea,
			sections: [
				'Xorannox fills the encounter map with a powerful telekinetic field. The Director chooses a cardinal direction (north, south, east, or west). Whenever a creature in the encounter willingly moves or is force moved, they are pulled 2 squares in the chosen direction, ignoring stability. Each time this feature is used, its previous effect ends.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'xorannox-1',
			name: 'Xorannox the Tyract',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Horror', 'Overmind' ],
			encounterValue: 96,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 450,
			stability: 2,
			freeStrikeDamage: 7,
			characteristics: FactoryLogic.createCharacteristics(4, 2, 4, 3, 3),
			features: [
				FactoryLogic.feature.createSoloMonster({
					id: 'xorannox-feature-1',
					name: 'xorannox',
					gender: 'm',
					endEffect: 10
				}),
				FactoryLogic.feature.create({
					id: 'xorannox-1-feature-2',
					name: 'Eyes of the Tyract',
					description: 'Six unique eyestalks float around Xorannox, acting on his turn at his command until they are reduced to 0 Stamina. On each of Xorannox’s turns, he directs one eyestalk to move and use a signature ability.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-1-feature-3',
						name: 'Toothful Thrashing',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '12 damage; slide 2; M<2 bleeding (EoT)',
								tier2: '20 damage; slide 3; M<3 bleeding (EoT)',
								tier3: '23 damage; vertical slide 3; M<4 bleeding (EoT)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-1-feature-4',
						name: 'Grav Spike',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: 'Vertical push 3',
								tier2: 'Vertical push 5',
								tier3: 'Vertical push 7'
							})),
							FactoryLogic.createAbilitySectionText('Xorannox shifts up to his speed before or after using this ability.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-1-feature-5',
						name: 'Optical Collusion',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Xorannox commands all his eyestalks to move up to their speed.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-1-feature-6',
						name: 'Shutout',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 2, within: 1 }) ],
						target: 'Special',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionText('Xorannox ends all ongoing supernatural effects and suppresses supernatural effects from treasures in the area. New supernatural effects can’t be activated in the area until the end of Xorannox’s next turn.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-1-feature-7',
						name: 'Cower!',
						type: FactoryLogic.type.createTrigger('A creature within distance deals damage to Xorannox.'),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('If the target has I<3 they are frightened (save ends).')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'xorannox-1-feature-8',
					name: 'Above It All',
					description: 'Xorannox can’t be made frightened or knocked prone, and he can’t be flanked.'
				}),
				FactoryLogic.feature.create({
					id: 'xorannox-1-feature-9',
					name: 'Natural Enemies',
					description: 'If Xorannox perceives another overmind or a voiceless talker on the encounter map, he targets that threat one or more times on each of his turns.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-1-feature-10',
						name: 'Disruption Beam',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '11 psychic damage; R<2 dazed (save ends)',
								tier2: '17 psychic damage; R<3 dazed (save ends)',
								tier3: '20 psychic damage; R<4 dazed (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-1-feature-11',
						name: 'All Eyes, All Rise',
						type: FactoryLogic.type.createVillainAction(2),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Xorannox recreates any destroyed eyestalks, which return in unoccupied spaces on the encounter map with full Stamina.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-1-feature-12',
						name: 'Panoptibeam',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Xorannox directs each of his eyestalks to use a signature ability against any target.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'xorannox-2',
			name: 'Compulsion Eye',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.NoOrganization, MonsterRoleType.Controller),
			keywords: [ 'Eyestalk', 'Horror', 'Overmind' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(-1, 1, 4, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-2-feature-1',
						name: 'Compulsion Beam',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(6) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: 'I<2 the target is charmed',
								tier2: 'I<3 the target is charmed',
								tier3: 'I<4 the target is charmed'
							})),
							FactoryLogic.createAbilitySectionText('As a free triggered action, a charmed target immediately moves up to their speed and can make a free strike against an enemy of Xorannox’s choice. The target is then no longer charmed.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'xorannox-2-feature-2',
					name: 'Psionic Barrier',
					description: 'The compulsion eye has damage immunity 15. When the compusion eye uses an action, this immunity disappears until the end of the round.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'xorannox-3',
			name: 'Demolition Eye',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.NoOrganization, MonsterRoleType.Artillery),
			keywords: [ 'Eyestalk', 'Horror', 'Overmind' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(-1, 1, 4, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-3-feature-1',
						name: 'Explosion',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '6 fire damage',
								tier2: '10 fire damage; M<3 prone',
								tier3: '13 fire damage; M<4 prone'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'xorannox-3-feature-2',
					name: 'Psionic Barrier',
					description: 'The demolition eye has damage immunity 15. When the compusion eye uses an action, this immunity disappears until the end of the round.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'xorannox-4',
			name: 'Mover Eye',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.NoOrganization, MonsterRoleType.Controller),
			keywords: [ 'Eyestalk', 'Horror', 'Overmind' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(-1, 1, 4, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-4-feature-1',
						name: 'Telekinetic Beam',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(6) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '11 damage; slide 4',
								tier2: '17 damage; slide 5',
								tier3: '20 damage; slide 6'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'xorannox-4-feature-2',
					name: 'Psionic Barrier',
					description: 'The mover eye has damage immunity 15. When the compusion eye uses an action, this immunity disappears until the end of the round.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'xorannox-5',
			name: 'Necrotic Eye',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.NoOrganization, MonsterRoleType.Hexer),
			keywords: [ 'Eyestalk', 'Horror', 'Overmind' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(-1, 1, 4, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-5-feature-1',
						name: 'Necro Beam',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '11 corruption damage',
								tier2: '17 corruption damage; M<3 bleeding (save ends)',
								tier3: '20 corruption damage; M<4 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If this damage or the Stamina loss from bleeding this way reduces a target creature’s Stamina to 0, that creature dies.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'xorannox-5-feature-2',
					name: 'Psionic Barrier',
					description: 'The necrotic eye has damage immunity 15. When the compusion eye uses an action, this immunity disappears until the end of the round.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'xorannox-6',
			name: 'Toxic Eye',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.NoOrganization, MonsterRoleType.Hexer),
			keywords: [ 'Eyestalk', 'Horror', 'Overmind' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(-1, 1, 4, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-6-feature-1',
						name: 'Toxic Vapors',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '6 poison damage',
								tier2: '10 poison damage; M<3 weakened (save ends)',
								tier3: '13 poison damage; M<4 weakened (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'xorannox-6-feature-2',
					name: 'Psionic Barrier',
					description: 'The toxic eye has damage immunity 15. When the compusion eye uses an action, this immunity disappears until the end of the round.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'xorannox-7',
			name: 'Zapper Eye',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.NoOrganization, MonsterRoleType.Artillery),
			keywords: [ 'Eyestalk', 'Horror', 'Overmind' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(-1, 1, 4, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-7-feature-1',
						name: 'Suffusing Strike',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 1, within: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '6 lightning damage',
								tier2: '10 lightning damage',
								tier3: '13 lightning damage'
							})),
							FactoryLogic.createAbilitySectionText('Each target loses all their surges.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'xorannox-7-feature-2',
					name: 'Psionic Barrier',
					description: 'The zapper eye has damage immunity 15. When the compusion eye uses an action, this immunity disappears until the end of the round.'
				})
			]
		})
	],
	addOns: []
};
