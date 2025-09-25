import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { MonsterLogic } from '../../../logic/monster-logic';
import { MonsterOrganizationType } from '../../../enums/monster-organization-type';
import { MonsterRoleType } from '../../../enums/monster-role-type';
import { SubClass } from '../../../models/subclass';

export const fey: SubClass = {
	id: 'summoner-sub-3',
	name: 'Fey Portfolio',
	description: 'The fey garden of secretaires. Your portfolio features tiny ephemeral fey spirits surrounded by weird and powerful magic.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'summoner-1-1-1',
					name: 'Communication',
					description: 'You can communicate with creatures that have the fey keyword even if you don’t share a language.'
				}),
				FactoryLogic.feature.create({
					id: 'summoner-3-1-2',
					name: 'Fairy Whispers',
					description: `
Whenever you send a minion to perform a task for you outside of combat, they can bring back a rumor from the destination you sent them to. When the minion returns, make a **Reason** test:

* **11-**: You learn an undoubtedly false common rumor.
* **12-16**: You learn a common rumor that is most likely true.
* **17+**: You learn an obscure rumor that could either be true or false.

You gain a bane on the test for each subsequent rumor you collect in the same day or in the same location.`
				}),
				FactoryLogic.feature.createMultiple({
					id: 'summoner-3-1-3',
					name: 'Pixie Dust',
					features: [
						FactoryLogic.feature.createBonus({
							id: 'summoner-3-1-3a',
							field: FeatureField.Recoveries,
							value: 2
						}),
						FactoryLogic.feature.create({
							id: 'summoner-3-1-3b',
							name: 'Pixie Dust',
							description: 'Whenever one of your fey minions dies within your Summoner’s Range, you can spend a Recovery to give temporary Stamina equal to your recovery value to each non-minion ally that was adjacent to your minion.'
						})
					]
				}),
				FactoryLogic.feature.createSummonChoice({
					id: 'summoner-3-1-4',
					name: 'Signature Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-3-1-4a',
								name: 'Nixie Soakreed',
								description: 'An especially tiny nixie with long hair that curls into reeds. The water they swim in tends to turn thick and cling to surfaces.',
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
								id: 'summoner-3-1-4b',
								name: 'Pixie Bellringer',
								description: 'Glowing pixies that jingle as they fly. Historically, bellringers worked alongside bowman to ensure their arrows struck true.',
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
								id: 'summoner-3-1-4c',
								name: 'Sprite Dandeknight',
								description: 'Dandeknights are sprite warriors whose dragonfly wingbeats emit a tonal drone. They’re usually clad in tassels that shift color as they swing their weapons.',
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
					id: 'summoner-3-1-5',
					name: '3-Essence Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-3-1-5a',
								name: 'Pixie Hydrain',
								description: 'A pixie with a delicate array of vibrant flower petals for wings. The color drains from their wings as they call forth acid rain showers.',
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
								id: 'summoner-3-1-5b',
								name: 'Pixie Loftlilly',
								description: 'Loftlillies lazily drift through the air in flower cups. They sip on toxic nectar to emit a powerful toxic haze from their skin.',
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
								id: 'summoner-3-1-5c',
								name: 'Sprite Orchiguard',
								description: 'A sprite surrounded by a wheel of shields. Orchiguards are usually crushed by the pressures of their own impenetrable defenses before ever being felled by enemy hands.',
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
