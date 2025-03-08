import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const xorannox: MonsterGroup = {
	id: 'monster-group-xorannox',
	name: 'Xorannox The Tyract',
	description: 'Xorannox the Tyract is an Overmind. Formally known by their endonym, vaurath (plural vaurathi), overminds plot and scheme against their chief rivals, the synlirii and the olothec, for control of the World Below.',
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
			description: 'Unlike their rivals, overminds have an intense hatred of their own kind and never work together. However, overminds often enjoy diplomacy with other species, seeking to form alliances and build secret networks of agents throughout the World Below.'
		},
		{
			id: 'xorannox-info-5',
			name: 'Smelly Eggs',
			description: `
Overmind procreation involves one horror laying a single egg in a slime pool and leaving it behind. When another overmind later detects the distinct smell of the egg, they spray their inseminating fluid into the pool. These actions are compelled by biological necessity, a compulsion even the overminds can’t ignore.

Unwitting explorers sometimes accidentally abscond with an egg. If unfertilized, its bearer is likely to attract the attention of other overminds and synlirii that use the eggs in genetic experiments to create psionic creatures. If fertilized, the explorer could find themselves as a newly hatched overmind’s first victim.`
		},
		{
			id: 'xorannox-info-6',
			name: 'Xorannox the Tyract',
			description: `
Xorannox (ZOR-ah-nocks) rules as Lord of the White Tower, a multi-level finger of alabaster stone. Commonly known as the Tyract – an ancient Za’hariax word that literally translates as “a king who rules with his teeth” – the overmind indeed consumes those who displease him.

Xorannox is chief of the Grasp, a secret organization that seeks to overthrow the voiceless talkers’ great empire and place Xorannox above all, first as king, then as god. 

The Tyract is a master strategist, always one step ahead of his enemies. Heroes may be surprised to discover their allies are members of the Grasp. When they meet Xorannox, he’s delighted! He loves treating with humanoids! They have the same enemies, after all.

Unfortunately, no matter how useful or dependable a party of heroes might be, Xorannox is nearly incapable of resisting the urge to betray his allies. He assumes, as do most vaurathi, that the natural end of all alliances is betrayal. Thus when the gauntlet is thrown, and his life is in danger, the only minions he can truly trust are his own six eyes.`
		},
		{
			id: 'xorannox-info-7',
			name: 'Xorannox\'s Languages',
			description: 'Overminds typically speak Za\'hariax. Xorannox also speaks Caelian, Voll, and Hyrallic.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'xorannox-malice-1',
			name: 'Gas Belch',
			cost: 3,
			sections: [
				'Xorannox lets out a noxious belch. Each enemy within 2 of him is M<3 weakened (save ends).'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'xorannox-malice-2',
			name: 'Slime Trail',
			cost: 5,
			sections: [
				'Until the end of Xorannox’s next turn, whenever he or his eyes leave their space, they secrete a viscous slime into the squares on the ground. An enemy that enters an aﬀected square has lightning weakness 5 and ﬁre weakness 5 until the end of the encounter.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'xorannox-malice-3',
			name: 'Mind Over Matter',
			cost: 7,
			sections: [
				'Xorannox ﬁlls the encounter map with a powerful telekinetic ﬁeld. The Director chooses a cardinal direction (North, South, East, or West). A creature is aﬀected by pull 2 in the chosen direction whenever they take a move action or are force moved. Each instance of this feature causes the previous instance to end. This additional movement ignores stability.'
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
			encounterValue: 80,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 450,
			stability: 3,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(4, 2, 4, 3, 3),
			features: [
				FactoryLogic.feature.createSoloMonster({
					id: 'xorannox-feature-1',
					name: 'xorannox'
				}),
				FactoryLogic.feature.create({
					id: 'xorannox-1-feature-2',
					name: 'Eyes of the Tyract',
					description: 'Six unique eyestalks float around Xorannox and act on his turn at his command. On each of Xorannox’s turns, he directs one eyestalk to move and use a signature action. When an eyestalk is destroyed, Xorannox can’t use that eyestalk’s ability.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-1-feature-3',
						name: 'Toothful Thrashing',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '12 damage; slide 2; M<2 bleeding (EoT)',
							tier2: '20 damage; slide 3; M<3 bleeding (EoT)',
							tier3: '23 damage; vertical slide 3; M<4 bleeding (EoT)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-1-feature-4',
						name: 'Grav Spike',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All enemies in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: 'Vertical push 3',
							tier2: 'Vertical push 5',
							tier3: 'Vertical push 7'
						}),
						effect: 'Xorannox shifts up to his speed before or after using this ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-1-feature-5',
						name: 'Optical Collusion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'Xorannox commands all eyestalks to move up to their speed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-1-feature-6',
						name: 'Shutout',
						cost: 2,
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 2, within: 1 }) ],
						target: 'Special',
						effect: 'Xorannox ends all ongoing supernatural effects and suppresses supernatural effects from equipment in the affected area. New supernatural effects cannot activate in the affected area until the end of Xorannox’s next turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-1-feature-7',
						name: 'Cower!',
						type: FactoryLogic.type.createTrigger('A creature deals damage to Xorannox.'),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						effect: 'The triggering creature is I<3 frightened (save ends).'
					})
				}),
				FactoryLogic.feature.create({
					id: 'xorannox-1-feature-8',
					name: 'Above It All',
					description: 'Xorannox can\'t be flanked, frightened, or knocked prone.'
				}),
				FactoryLogic.feature.create({
					id: 'xorannox-1-feature-9',
					name: 'Natural Enemies',
					description: 'If Xorannox perceives another overmind or voiceless talker on the battlefield, he targets that threat at least once every turn.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-1-feature-10',
						name: 'Disruption Beam',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '11 psychic damage; R<2 dazed (save ends)',
							tier2: '17 psychic damage; R<3 dazed (save ends)',
							tier3: '20 psychic damage; R<4 dazed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-1-feature-11',
						name: 'All Eyes, All Rise',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'Xorannox reforms all destroyed eyestalks and raises them at full Stamina.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-1-feature-12',
						name: 'Panoptibeam',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All enemies in the burst',
						effect: 'Xorannox directs each remaining eyestalk to use a signature action, targeting each creature in the area.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'xorannox-2',
			name: 'Compulsion Eye',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.NoOrganization, MonsterRoleType.Controller),
			keywords: [ 'Eyestalk', 'Overmind' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(-1, 1, 4, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-2-feature-1',
						name: 'Compulsion Beam',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(6) ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: 'I<2 charmed',
							tier2: 'I<3 charmed',
							tier3: 'I<4 charmed'
						}),
						effect: 'A charmed creature moves up to their speed and makes a free strike against an enemy of Xorannox’s choice as a free triggered action, and then is no longer charmed.'
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
			keywords: [ 'Eyestalk', 'Overmind' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(-1, 1, 4, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-3-feature-1',
						name: 'Explosion',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
						target: 'All enemies in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '6 fire damage',
							tier2: '10 fire damage; A<3 prone',
							tier3: '13 fire damage; A<4 prone'
						})
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
			keywords: [ 'Eyestalk', 'Overmind' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(-1, 1, 4, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-4-feature-1',
						name: 'Telekinetic Beam',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(6) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '11 damage; slide 4',
							tier2: '17 damage; slide 5',
							tier3: '20 damage; slide 6'
						})
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
			keywords: [ 'Eyestalk', 'Overmind' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(-1, 1, 4, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-5-feature-1',
						name: 'Necro Beam',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '11 corruption damage',
							tier2: '17 corruption damage; M<3 bleeding (save ends)',
							tier3: '20 corruption damage; M<4 bleeding (save ends)'
						}),
						effect: 'If this effect or the resulting Stamina loss from the bleeding condition reduces a creature\'s Stamina to 0, the target dies.'
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
			keywords: [ 'Eyestalk', 'Overmind' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(-1, 1, 4, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-6-feature-1',
						name: 'Toxic Vapors',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
						target: 'All enemies in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '6 poison damage',
							tier2: '10 poison damage; M<3 weakened (save ends)',
							tier3: '13 poison damage; M<4 weakened (save ends)'
						})
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
			keywords: [ 'Eyestalk', 'Overmind' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(-1, 1, 4, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'xorannox-7-feature-1',
						name: 'Suffusing Strike',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 1, within: 1 }) ],
						target: 'All enemies in the line',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '6 lightning damage',
							tier2: '10 lightning damage',
							tier3: '13 lightning damage'
						}),
						effect: 'Each target loses all Surges.'
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
