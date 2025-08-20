import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const warDog3rd: MonsterGroup = {
	id: 'monster-group-wardog-3rd',
	name: 'War Dog - 3rd Echelon',
	description: 'As a war dog proves their loyalty and gains the favor of their superiors, they might be rewarded with special attention from the flesh sculptors of the Body Banks, smoothing out their construction and supplying them with higher-quality parts. War dogs who have risen through the ranks this way pride themselves on their nearly ordinary appearances.',
	picture: null,
	information: [
		{
			id: 'wardog-3rd-info-warning',
			name: 'Content Warning: Brainwashing and Body Horror',
			description: 'War dogs are explicitly evil soldiers built from the body parts of other humanoids. Check in with your players before running war dogs to make sure that they’re okay with battling brainwashed soldiers with an appearance akin to Frankenstein’s monster if he were built to be a shock trooper. If anyone is uncomfortable, modify the appearance and lore of the war dogs as you see fit.'
		},
		{
			id: 'wardog-3rd-info-1',
			name: 'Happy Accidents',
			description: 'Making war dogs is more art than science, and happy little accidents can create war dogs with unusual characteristics. These war dogs are given great attention by the flesh sculptors, both to further improve the abilities of these deviants and to learn how to replicate their creation.'
		},
		{
			id: 'wardog-3rd-info-2',
			name: 'Made to Order',
			description: `War dogs are most often made by playing the odds, with each new resurrection assumed to create certain ratios of infantry, mages, specialists, and so on. However, by radically altering their creation processes and providing special materials, war dogs can be made who bear little resemblance to any humanoid, and who possess power beyond that of any typical conscript.

These monstrous war dogs are developed to fulfill specific roles and combat niches, and are often fused with inorganic materials after their rebirth as living war machines. Monstrous war dogs are uniformly respected for having been chosen for greatness, and they consider their unnatural forms a badge of honor bestowed by Ajax.`
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'wardog-3rd-malice-1',
			name: 'Reconstitute',
			cost: 3,
			sections: [
				'One war dog acting this turn tears apart a nearby corpse of a humanoid and incorporates its body parts into their own. The war dog regains Stamina equal to 5 times their level.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-3rd-malice-2',
				name: 'Fire for Effect',
				type: FactoryLogic.type.createManeuver(),
				cost: 3,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
				target: 'Each creature in the area',
				sections: [
					FactoryLogic.createAbilitySectionText('**Effect:** Each target makes an **Agility test**. The same condition is imposed on each affected target'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '5 fire damage; slowed or weakened (save ends)',
						tier2: '5 fire damage; slowed or weakened (EoT)',
						tier3: '5 fire damage'
					}))
				]
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'wardog-3rd-malice-3',
			name: 'Fodder Run',
			cost: 7,
			sections: [
				'Each war dog minion in the encounter shifts up to their speed and can make a free strike. A minion who does so is then reduced to 0 Stamina.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-3rd-malice-4',
				name: 'Loyalty Unto Death',
				type: FactoryLogic.type.createManeuver(),
				cost: 5,
				keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.createRanged(10) ],
				target: 'Two war dogs',
				sections: [
					FactoryLogic.createAbilitySectionText('**Effect:** Each target who has a loyalty collar shifts up to their speed, then is reduced to 0 Stamina. After each target’s Loyalty Collar trait is resolved, each enemy adjacent to either target makes a **Presence test**.'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: 'Push 4; the enemy is frightened of the nearest non-minion war dog (save end)',
						tier2: 'Push 2; the enemy is frightened of the nearest non-minion war dog (EoT)',
						tier3: 'Push 2'
					}))
				]
			})
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-3rd-malice-5',
				name: 'Alchemical Cloud',
				type: FactoryLogic.type.createNoAction(),
				cost: 7,
				keywords: [ ],
				distance: [ ],
				target: '',
				sections: [
					FactoryLogic.createAbilitySectionText('A bank of choking chemicals sweeps across the area of the enácounter map. Each enemy in the encounter makes a **Might test**.'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '8 poison damage; dazed (Eot)',
						tier2: '7 poison damage; weakened (EoT)',
						tier3: '4 poison damage'
					}))
				]
			})
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'wardog-3rd-1',
			name: 'War Dog Draconite',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 13,
			stability: 2,
			freeStrikeDamage: 4,
			withCaptain: '+3 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(4, 1, -2, -1, 2),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-2',
			name: 'War Dog Saboteur',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 12,
			stability: 0,
			freeStrikeDamage: 4,
			withCaptain: '+5 bonus to ranged distance',
			characteristics: MonsterLogic.createCharacteristics(-1, 2, 4, 3, 1),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-3',
			name: 'War Dog Shriketroop',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 4,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(1, 4, 3, 1, 1),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-4',
			name: 'War Dog Aerocite',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(8, 'Fly'),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 4, 1, 3, 1),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-5',
			name: 'War Dog Ballistite',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(0),
			stamina: 72,
			stability: 5,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(4, -2, 2, 3, 2),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-6',
			name: 'War Dog Blackcap',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'Teleport'),
			stamina: 45,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(1, 4, 4, 2, 0),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-7',
			name: 'War Dog Breaker',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 36,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 200,
			stability: 4,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(4, 2, 1, 1, 3),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-8',
			name: 'War Dog Firestarter',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 45,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 3, 4, 1),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-9',
			name: 'War Dog Geomancer',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'Burrow'),
			stamina: 45,
			stability: 3,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 4, 4, 2),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-10',
			name: 'War Dog Iron Priest',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 1, 4, 4),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-11',
			name: 'War Dog Prismite',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5, 'Fly, hover'),
			stamina: 82,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(4, 0, 4, 2, 3),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-12',
			name: 'War Dog Taxiarch',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 44,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'Teleport'),
			stamina: 240,
			stability: 1,
			freeStrikeDamage: 9,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 5, 4, 3),
			features: [
			]
		})
	],
	addOns: []
};
