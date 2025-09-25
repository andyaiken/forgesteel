import { FactoryLogic } from '../../../logic/factory-logic';
import { MonsterLogic } from '../../../logic/monster-logic';
import { MonsterOrganizationType } from '../../../enums/monster-organization-type';
import { MonsterRoleType } from '../../../enums/monster-role-type';
import { SubClass } from '../../../models/subclass';

export const undead: SubClass = {
	id: 'summoner-sub-4',
	name: 'Undead Portfolio',
	description: 'The undead army of necromancers. The corporeal and incorporeal creatures under your command are hardy and numerous.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'summoner-1-1-1',
					name: 'Communication',
					description: 'You can communicate with creatures that have the undead keyword even if you don’t share a language.'
				}),
				FactoryLogic.feature.create({
					id: 'summoner-4-1-2',
					name: 'Dead Men Do Tell Tales',
					description: `
You can touch a corpse of a creature that died within the past week and ask them a question. The corpse can choose to answer the question to the best of their ability. Each additional question you ask the corpse requires a Moderate Reason Test, where failure or consequence breaks your connection with the corpse permanently.

The corpse can also choose to refuse to answer or lie, especially if you were the one to kill them in the first place.`
				}),
				FactoryLogic.feature.create({
					id: 'summoner-4-1-3',
					name: 'Rise!',
					description: `
Once per round, when a creature dies within your Summoner’s Range that you didn’t sacrifice, you can use a triggered action to summon a signature undead minion in their space at no cost even if you’re at your minion maximum, but only if they can be organized into one of your squads. The new minion can’t act until the start of your next turn.

This ability becomes a free triggered action if the target was a minion (either yours or an enemy).`
				}),
				FactoryLogic.feature.createSummonChoice({
					id: 'summoner-4-1-4',
					name: 'Signature Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-1-4a',
								name: 'Husk',
								description: 'A stiff corpse that snaps and crackles with each sudden movement. Corrosive breath endlessly billows out from their slackjawed faces.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
								keywords: [],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 0,
								stability: 0,
								freeStrikeDamage: 0,
								characteristics: MonsterLogic.createCharacteristics(0, 0, 0, 0, 0),
								features: []
							}),
							isSignature: true,
							cost: 1,
							count: 1
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-1-4b',
								name: 'Shrieker',
								description: 'The shrieker expresses their unending pain in a way that can be heard and felt for miles. A white hot fire rests within each of their sunken eye sockets.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
								keywords: [],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 0,
								stability: 0,
								freeStrikeDamage: 0,
								characteristics: MonsterLogic.createCharacteristics(0, 0, 0, 0, 0),
								features: []
							}),
							isSignature: true,
							cost: 1,
							count: 1
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-1-4c',
								name: 'Skeleton',
								description: 'Autonomous bone networks that fall short of replicating the structure they had in life. Skeleton bones are especially brittle and can splinter into huge shards when met with enough force.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
								keywords: [],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 0,
								stability: 0,
								freeStrikeDamage: 0,
								characteristics: MonsterLogic.createCharacteristics(0, 0, 0, 0, 0),
								features: []
							}),
							isSignature: true,
							cost: 1,
							count: 1
						})
					],
					count: 2
				}),
				FactoryLogic.feature.createSummonChoice({
					id: 'summoner-4-1-5',
					name: '3-Essence Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-1-5a',
								name: 'Grave Knight',
								description: 'Zombie warriors that continue to fight after death. Any blood spilled at a grave knight’s hand runs pitch black.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
								keywords: [],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 0,
								stability: 0,
								freeStrikeDamage: 0,
								characteristics: MonsterLogic.createCharacteristics(0, 0, 0, 0, 0),
								features: []
							}),
							isSignature: false,
							cost: 3,
							count: 2
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-1-5b',
								name: 'Stalker Shade',
								description: 'An umbral stalker that floats free from any floor or surface. They can bend their appearance to completely vanish in the light.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
								keywords: [],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 0,
								stability: 0,
								freeStrikeDamage: 0,
								characteristics: MonsterLogic.createCharacteristics(0, 0, 0, 0, 0),
								features: []
							}),
							isSignature: false,
							cost: 3,
							count: 2
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-1-5c',
								name: 'Zombie Lumberer',
								description: 'Massive, animated ogre corpses with incredible grip strength. When a lumberer falls, they’ll take anything within reach down with them.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
								keywords: [],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 0,
								stability: 0,
								freeStrikeDamage: 0,
								characteristics: MonsterLogic.createCharacteristics(0, 0, 0, 0, 0),
								features: []
							}),
							isSignature: false,
							cost: 3,
							count: 2
						})
					],
					count: 2
				})
			]
		},
		{
			level: 2,
			features: []
		},
		{
			level: 3,
			features: []
		},
		{
			level: 4,
			features: []
		},
		{
			level: 5,
			features: []
		},
		{
			level: 6,
			features: []
		},
		{
			level: 7,
			features: []
		},
		{
			level: 8,
			features: []
		},
		{
			level: 9,
			features: []
		},
		{
			level: 10,
			features: []
		}
	],
	selected: false
};
