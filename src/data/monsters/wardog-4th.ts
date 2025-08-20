import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const warDog4th: MonsterGroup = {
	id: 'monster-group-wardog-4th',
	name: 'War Dog - 4th Echelon',
	description: 'At the apex of the war dog command structure, a number of infamous figures are known for their brutal tactics, legendary battle prowess, and unbreakable loyalty to Ajax.',
	picture: null,
	information: [
		{
			id: 'wardog-4th-info-warning',
			name: 'Content Warning: Brainwashing and Body Horror',
			description: 'War dogs are explicitly evil soldiers built from the body parts of other humanoids. Check in with your players before running war dogs to make sure that they’re okay with battling brainwashed soldiers with an appearance akin to Frankenstein’s monster if he were built to be a shock trooper. If anyone is uncomfortable, modify the appearance and lore of the war dogs as you see fit.'
		},
		{
			id: 'wardog-4th-info-1',
			name: 'Castellan Hoplon',
			description: 'Hoplon’s scars are not from the Body Banks, but from years of combat and hard-fought sieges. A master of the harrying retreat, the holdfast, and the last stand, Hoplon is there to lead the defense wherever the fighting is most intense and the lines threaten to buckle.'
		},
		{
			id: 'wardog-4th-info-2',
			name: 'Iron Champion Doru',
			description: 'Upon the accidental creation of the Iron Champion, only the intervention of Ajax was able to stop Doru’s rampage. His raw strength and untempered aggression make him a valuable combatant, but it is his mysterious regeneration that makes him a true monster on the battlefield.'
		},
		{
			id: 'wardog-4th-info-3',
			name: 'Logostician Vesper',
			description: 'A master of logistical support and a living portal network, Vesper is the emergent personality of several dozen potent psychic minds working in concert. From their position within an armored and highly mobile flesh chassis, Vesper manages supply lines and transport for the forces of the Iron Saint.'
		},
		{
			id: 'wardog-4th-info-4',
			name: 'Soulbinder Psyche',
			description: 'Viewed by other war dogs as “The Goddess of the Banks,” Psyche possesses a spirit that can return from the Body Banks again and again without ever losing her core self. She is a master of the connection between soul and flesh, and a talented mage besides.'
		},
		{
			id: 'wardog-4th-info-5',
			name: 'Strategos Alkestis',
			description: 'Leader of the Legion Alkestis and one of the most brilliant commanders ever to be born a war dog, Alkestis has made her legion one of the most feared of Ajax’s armies. The Silver Wolf is known for her battlefield tactics and a willingness to stoop to any depths to gain an edge on her enemies.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'wardog-4th-malice-1',
			name: 'Reconstitute',
			cost: 3,
			sections: [
				'One war dog acting this turn tears apart a nearby corpse of a humanoid and incorporates its body parts into their own. The war dog regains Stamina equal to 5 times their level.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-4th-malice-2',
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
			id: 'wardog-4th-malice-3',
			name: 'Fodder Run',
			cost: 7,
			sections: [
				'Each war dog minion in the encounter shifts up to their speed and can make a free strike. A minion who does so is then reduced to 0 Stamina.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-4th-malice-4',
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
				id: 'wardog-4th-malice-5',
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
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-4th-malice-6',
				name: 'Cry Havoc',
				type: FactoryLogic.type.createManeuver(),
				cost: 7,
				keywords: [ ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
				target: 'Each enemy in the area',
				sections: [
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						bonus: 5,
						tier1: '7 psychic damage',
						tier2: '11 psychic damage; P < 4 frightened (save ends)',
						tier3: '14 psychic damage; P < 5 frightened (save ends)'
					})),
					FactoryLogic.createAbilitySectionText('**Effect:** Each war dog within distance deals an extra 15 damage with strikes until the end of their next turn. Additionally, they end any effect on them that can be ended by a saving throw or that ends at the end of their turn, then shift up to their speed and can make a free strike.'),
					FactoryLogic.createAbilitySectionText('**Special:** This ability can’t be used by a minion.')
				]
			})
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'wardog-4th-1',
			name: 'War Dog Blood Jumper',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'Fly'),
			stamina: 15,
			stability: 2,
			freeStrikeDamage: 4,
			withCaptain: '+3 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(5, 4, 2, 3, 2),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-2',
			name: 'War Dog Hunter-Killer',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 14,
			stability: 0,
			freeStrikeDamage: 5,
			withCaptain: '+4 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(1, 5, 3, 5, 2),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-3',
			name: 'War Dog Socialite',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 14,
			stability: 0,
			freeStrikeDamage: 4,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(2, 2, 4, 3, 5),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-4',
			name: 'Castellan Hoplon',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 260,
			stability: 3,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(5, 2, 4, 3, 4),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-5',
			name: 'Iron Champion Doru',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 260,
			stability: 2,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(5, 4, 1, 4, 2),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-6',
			name: 'Logostician Vesper',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(10),
			stamina: 253,
			stability: 3,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 5, 4, 1),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-7',
			name: 'Soulbinder Psyche',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(10, 'Fly, hover'),
			stamina: 220,
			stability: 1,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 3, 4, 5),
			features: [
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-8',
			name: 'Strategos Alkestis',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 260,
			stability: 2,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(4, 4, 5, 5, 5),
			features: [
			]
		})
	],
	addOns: []
};
