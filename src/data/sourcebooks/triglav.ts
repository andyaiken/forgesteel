import { EnvironmentData, OrganizationData, UpbringingData } from '@/data/culture-data';
import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { ConditionType } from '@/enums/condition-type';
import { CultureType } from '@/enums/culture-type';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

const boggit: Ancestry = {
	id: 'boggit',
	name: 'Boggit',
	description: `
*By Triglav Games*

*You hear the croaking? We should be leaving as soon as possible, the boggits are already upon us.*
* Garak, the reincarnating human adventurer right before having his heart pierced with a boggit javelin.

Denizens of bogs, swamps and marshes, the boggits are creatures inextricably linked to the wet environments. A type of beastkin also called frogfolk, froggenwights or anurians (by scholars), the boggits need water to reproduce, laying large amounts of eggs from which their tadpoles hatch. Young boggits are less aggressive and characterized by wanderlust that makes them leave their birthplace, but with age the boggits become more attached to their tribe's land and rarely leave.

Though tending to keep to themselves, the boggits are also highly territorial and quick to scare off or hunt down any intruders entering their watery realms. Boggit tribes often wage wars with each other for access to more land and water, and sometimes even try to get rid of their neighbors of other ancestries to expand their territories by flooding them through means both mundane and magical. Many boggits hatch with an ability to perform one from a range of supernatural croaks that bolster their allies or hinder their foes.

The boggits speak their own language called Boggish.`,
	features: [
		FactoryLogic.feature.createSize({
			id: 'boggit-1',
			name: 'Small!',
			sizeValue: 1,
			sizeMod: 'S'
		}),
		FactoryLogic.feature.create({
			id: 'boggit-2',
			name: 'Frog Jumps',
			description: `
Your strong, elongated hind legs make you an exceptional jumper. You gain the following benefits:

* You have an edge on Might and Agility tests made to jump.
* You gain a bonus to your jumping distance equal to your echelon.
* You can jump out of difficult or damaging terrain.
* Your jump distance can exceed your speed.
* Once per round, upon taking damage, you can jump up to your long jump distance as a free triggered action. This movement doesn't provoke opportunity attacks.`
		}),
		FactoryLogic.feature.create({
			id: 'boggit-3',
			name: 'Amphibian Empathy',
			description: 'You can speak with and understand frogs, toads and similar creatures.'
		}),
		FactoryLogic.feature.createChoice({
			id: 'boggit-4',
			name: 'Boggit Traits',
			options: [
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'boggit-4a',
						name: 'Bog Immunities',
						description: 'You lived in a swamp long enough to develop some resilience against various poisons.',
						features: [
							FactoryLogic.feature.createDamageModifier({
								id: 'boggit-4a-1',
								modifiers: [
									FactoryLogic.damageModifier.createPerLevel({
										damageType: DamageType.Poison,
										modifierType: DamageModifierType.Immunity,
										value: 1
									})
								]
							}),
							FactoryLogic.feature.createConditionImmunity({
								id: 'boggit-4a-2',
								conditions: [ ConditionType.Weakened ]
							})
						]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'boggit-4b',
						name: 'Reliable Jumps',
						description: 'You achieved consistency when it comes to jumping. You can\'t obtain lower than a tier 2 outcome on any Might or Agility test made to jump.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'boggit-4c',
						name: 'Slippery Skin',
						description: 'Your slippery skin makes you harder to catch. Enemies take a bane on tests and a -1 on potencies made to grab or restrain you. You have an edge on tests made to escape grabs.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'boggit-4d',
							name: 'Sticky Strike',
							description: 'You use your tongue to strike and pull an enemy.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createMelee(3) ],
							target: 'One creature or object',
							cost: 'signature',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might, Characteristic.Agility ],
										tier1: '2 + M or A damage; pull 1; A < [weak], grabbed',
										tier2: '4 + M or A damage; pull 2; A < [average], grabbed',
										tier3: '6 + M or A damage; pull 3; A < [strong], grabbed'
									})
								),
								FactoryLogic.createAbilitySectionText('If you grab the target this way, they don\'t count towards your limit of grabbed creatures.')
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'boggit-4e',
						name: 'Spadefeet Burrowing',
						description: 'Your limbs are adapted for digging. You can automatically burrow horizontally at full speed while moving and you can use the Dig maneuver.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createChoice({
						id: 'boggit-4f',
						name: 'Supernatural Croak',
						options: [
							{
								feature: FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: 'boggit-4f-1',
										name: 'Devastating Croak',
										description: 'Your directed croaking spreads destruction among your enemies.',
										type: FactoryLogic.type.createMain(),
										keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
										distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
										target: 'All enemies',
										cost: 'signature',
										sections: [
											FactoryLogic.createAbilitySectionRoll(
												FactoryLogic.createPowerRoll({
													characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
													tier1: '2 sonic damage; push 1',
													tier2: '3 sonic damage; push 2',
													tier3: '5 sonic damage; push 3'
												})
											)
										]
									})
								}),
								value: 1
							},
							{
								feature: FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: 'boggit-4f-2',
										name: 'Fortifying Croak',
										description: 'Your croaking builds up the spirits of your allies.',
										type: FactoryLogic.type.createMain(),
										keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
										distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
										target: 'All allies in the area',
										cost: 'signature',
										sections: [
											FactoryLogic.createAbilitySectionText('Each target gains temporary Stamina equal to your Reason, Intuition, or Presence score.')
										]
									})
								}),
								value: 1
							},
							{
								feature: FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: 'boggit-4f-3',
										name: 'Frightening Croak',
										description: 'Your croaking sows terror in the hearts of your enemies.',
										type: FactoryLogic.type.createMain(),
										keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
										distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
										target: 'All enemies in the area',
										cost: 'signature',
										sections: [
											FactoryLogic.createAbilitySectionRoll(
												FactoryLogic.createPowerRoll({
													characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
													tier1: '2 psychic damage; P < [weak], frightened (EoT)',
													tier2: '3 psychic damage; P < [average], frightened (EoT)',
													tier3: '5 psychic damage; P < [strong], frightened (EoT)'
												})
											)
										]
									})
								}),
								value: 1
							},
							{
								feature: FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: 'boggit-4f-4',
										name: 'Mobilizing Croak',
										description: 'Your croaking encourages your allies to fight harder.',
										type: FactoryLogic.type.createMain(),
										keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
										distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
										target: 'All allies in the area',
										cost: 'signature',
										sections: [
											FactoryLogic.createAbilitySectionText('Each target gains a surge.')
										]
									})
								}),
								value: 1
							},
							{
								feature: FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: 'boggit-4f-5',
										name: 'Provocative Croak',
										description: 'Your irreverent croaking angers your adversaries.',
										type: FactoryLogic.type.createMain(),
										keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
										distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
										target: 'All enemies in the area',
										cost: 'signature',
										sections: [
											FactoryLogic.createAbilitySectionRoll(
												FactoryLogic.createPowerRoll({
													characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
													tier1: 'R < [weak], taunted (save ends)',
													tier2: 'R < [average], taunted (save ends)',
													tier3: 'R < [strong], taunted (save ends)'
												})
											)
										]
									})
								}),
								value: 1
							},
							{
								feature: FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: 'boggit-4f-6',
										name: 'Vexing Croak',
										description: 'Your loud croaking disturbs nearby enemies.',
										type: FactoryLogic.type.createMain(),
										keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
										distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
										target: 'All enemies',
										cost: 'signature',
										sections: [
											FactoryLogic.createAbilitySectionRoll(
												FactoryLogic.createPowerRoll({
													characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
													tier1: '1 psychic damage; I < [weak], dazed (EoT)',
													tier2: '2 psychic damage; I < [average], dazed (EoT)',
													tier3: '3 psychic damage; I < [strong], dazed (EoT)'
												})
											)
										]
									})
								}),
								value: 1
							}
						]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'boggit-4g',
						name: 'Swamp Dweller',
						description: `
Years of traversing swamps have taught you how to deal with terrain obstacles and thrive both on land and in water. You gain the following benefits:

* You ignore difficult terrain.
* You can automatically swim at full speed while moving.
* You can breathe underwater.`
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'boggit-4h',
						name: 'Swarm Tactics',
						description: 'Your abilities gain an edge when used against creatures that are adjacent to at least one of your non-minion allies, but you don\'t gain another edge when the same ally is also flanking the creature with you.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'boggit-4i',
						name: 'Wetland Warrior',
						description: 'Your abilities gain an edge when used against creatures affected by difficult terrain. Additionally, you have concealment when you are in water or difficult terrain.'
					}),
					value: 1
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3,
	culture: FactoryLogic.createCulture('Boggit', 'Wilderness, communal, labor.', CultureType.Ancestral, EnvironmentData.wilderness, OrganizationData.communal, UpbringingData.labor, 'Boggish')
};

export const triglav: Sourcebook = {
	id: 'triglav',
	name: 'Triglav Games',
	description: 'Third-party content from Triglav Games.',
	type: SourcebookType.ThirdParty,
	adventures: [],
	ancestries: [
		boggit
	],
	careers: [],
	classes: [],
	complications: [],
	cultures: [],
	domains: [],
	encounters: [],
	imbuements: [],
	items: [],
	kits: [],
	monsterGroups: [],
	montages: [],
	negotiations: [],
	perks: [],
	projects: [],
	subclasses: [],
	tacticalMaps: [],
	terrain: [],
	titles: [],
	skills: [],
	languages: []
};
