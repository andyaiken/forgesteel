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
import { FeatureField } from '@/enums/feature-field';
import { FeatureType } from '@/enums/feature-type';
import { HeroClass } from '@/models/class';
import { Kit } from '@/models/kit';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';
import { Perk } from '@/models/perk';
import { PerkList } from '@/enums/perk-list';
import { SkillList } from '@/enums/skill-list';
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

const vampireAncestry: Ancestry = {
	id: 'vampire-ancestry',
	name: 'Vampire',
	description: `
*By Triglav Games*

When choosing an ancestry, you can choose to be a vampire. A hero with the vampire ancestry can't use the vampire class.`,
	features: [
		FactoryLogic.feature.create({
			id: 'vampire-ancestry-1',
			name: 'Bloodthirst',
			description: 'You gain an edge on ability rolls made against bleeding, winded, or dying creatures. If there is a bleeding, winded, or dying creature within 10 squares of you, you take a bane on ability rolls against creatures not suffering from any of these conditions. Using the Sanguine Kiss maneuver suppresses the drawback of this feature until the start of your next turn.'
		}),
		FactoryLogic.feature.createAncestry({
			id: 'vampire-ancestry-2',
			name: 'Former Life',
			description: 'Choose the ancestry you were before you died. Your size is that ancestry’s size and your speed is 5. Unless you select one of the Previous Life traits (see below), you don’t receive any other ancestral traits from your original ancestry.'
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'vampire-ancestry-3',
				name: 'Sanguine Kiss',
				description: 'I have to admit, your blood tastes simply delicious...',
				type: FactoryLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Melee ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'One creature',
				sections: [
					FactoryLogic.createAbilitySectionText('The target takes corruption damage equal to your highest characteristic score. This damage can\'t be reduced in any way. You gain temporary Stamina equal to your level + 2. For each condition the target is suffering, increase the damage taken and temporary Stamina gained by 1.')
				]
			})
		}),
		FactoryLogic.feature.createMultiple({
			id: 'vampire-ancestry-4',
			name: 'Vampiric Undeath',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'vampire-ancestry-4a',
					modifiers: [
						FactoryLogic.damageModifier.create({
							damageType: DamageType.Holy,
							modifierType: DamageModifierType.Weakness,
							value: 5
						})
					]
				}),
				FactoryLogic.feature.create({
					id: 'vampire-ancestry-4b',
					name: 'Vampiric Undeath',
					description: `
You can't suffocate, but you need to feed on the blood of living creatures to stay alive — or undead. If you don't consume blood for long periods of time (as decided by the Director, typically a few weeks), you go feral and lose control of your character. The Director decides when you regain control of your character, which usually happens after your character sates their thirst by drinking blood of the first creature they stumble upon. Despite being undead, you still do have a soul — a corrupted one, but a soul nonetheless.

Additionally, when your Stamina reaches the negative of your winded value, you become inert instead of dying. You fall prone and can’t stand. You continue to observe your surroundings, but you can’t speak, take main actions, maneuvers, move actions, or triggered actions. While inert this way, if you take any holy damage, or if your body is exposed to sunlight for a long period of time (as decided by the Director, typically a few days), your body is destroyed and you die. Otherwise, after 12 hours, you regain Stamina equal to your recovery value. You can't regain Stamina this way while inert and exposed to sunlight.`
				})
			]
		}),
		FactoryLogic.feature.createChoice({
			id: 'vampire-ancestry-5',
			name: 'Vampire Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'vampire-ancestry-5a',
						name: 'Draining Passion',
						description: 'Your bites sap strength from your prey. When you use the Sanguine Kiss maneuver, the target is M < Average weakened (save ends).'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'vampire-ancestry-5b',
						name: 'Growing Appetite',
						description: 'Once per round, when you deal damage to a bleeding, winded, or dying creature, you gain 1 surge.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'vampire-ancestry-5c',
						name: 'Immodest Drinking',
						description: 'When you are winded and use the Sanguine Kiss maneuver, you can spend a Recovery as part of the ability.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'vampire-ancestry-5d',
						name: 'Out for Blood',
						description: 'Your senses are sensitive to blood. You don\'t take a bane on strikes made against bleeding, dying or winded creatures with concealment, and such creatures can\'t be hidden from you.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAncestryFeature({
						id: 'vampire-ancestry-5e',
						current: false,
						former: true,
						customID: '',
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAncestryFeature({
						id: 'vampire-ancestry-5f',
						current: false,
						former: true,
						customID: '',
						value: 2
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'vampire-ancestry-5g',
						name: 'Profane Vitality',
						description: 'The dark magic keeping you alive surges within you, allowing you to keep fighting longer.',
						field: FeatureField.Recoveries,
						value: 2
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'vampire-ancestry-5h',
						name: 'Thirsty Celerity',
						description: 'Whenever you start your turn within 10 squares of a bleeding, winded, or dying creature, you gain a +2 bonus to speed until the start of your next turn.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'vampire-ancestry-5i',
						name: 'Undead Immunities',
						description: 'With time your undead body became resistant to many types of damage.',
						modifiers: [
							FactoryLogic.damageModifier.createPerLevel({
								damageType: DamageType.Cold,
								modifierType: DamageModifierType.Immunity,
								value: 1
							}),
							FactoryLogic.damageModifier.createPerLevel({
								damageType: DamageType.Corruption,
								modifierType: DamageModifierType.Immunity,
								value: 1
							}),
							FactoryLogic.damageModifier.createPerLevel({
								damageType: DamageType.Poison,
								modifierType: DamageModifierType.Immunity,
								value: 1
							})
						]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createPerk({
						id: 'vampire-ancestry-5j',
						name: 'Vampire Perk',
						lists: [ PerkList.Special ]
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 2
};

const vampireClass: HeroClass = {
	id: 'vampire-class',
	name: 'Vampire',
	description: `
*By Triglav Games*

The thrill of the hunt. The quickened beating of your victim's heart. The fear in their eyes when you descend upon them. Their pain and sudden numbness when you sink your fangs into their skin and drink their blood. You are a vampire, an undead predator, a creature of darkness. You hunt in order to satiate your longing for blood and violence, but it is your choice if you feed upon the innocent or the guilty.

As a vampire, you possess supernatural abilities that make you an excellent hunter. You are swift, strong, and you wield powers making your enemies unable to escape your thirst.`,
	type: 'standard',
	subclassName: 'Bloodline',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Might, Characteristic.Presence ],
		[ Characteristic.Agility, Characteristic.Presence ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'vampire-class-1-1',
					name: 'Stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 6
				}),
				FactoryLogic.feature.createBonus({
					id: 'vampire-class-1-2',
					name: 'Recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'vampire-class-1-3',
					selected: [ 'Alertness' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'vampire-class-1-4',
					listOptions: [ SkillList.Exploration, SkillList.Intrigue, SkillList.Lore ]
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'vampire-class-1-5',
					name: 'Thirst',
					gains: [
						{
							tag: 'start',
							trigger: 'Start of your turn',
							value: '1d3'
						},
						{
							tag: 'bleeding',
							trigger: 'The first time each round that a non-minion creature within 10 squares of you is made bleeding, winded, or dying, or reduced to 0 Stamina',
							value: '1'
						},
						{
							tag: 'deal-damage-self',
							trigger: 'The first time each round that you deal damage to a bleeding, winded, or dying creature',
							value: '1'
						}
					]
				}),
				FactoryLogic.feature.create({
					id: 'vampire-class-1-6',
					name: 'Insatiable Thirst',
					description: `
The more thirst you accumulate, the more savage you become, increasing your fighting prowess in exchange for your deteriorating mental state, gaining benefits and drawbacks from the tables below. These benefits and drawbacks last until the end of your turn (unless stated otherwise), even if they would become unavailable to you because of the amount of thirst you spend during your turn.

Some Insatiable Thirst benefits can be applied only if you are a specific level or higher, with the level of those benefits noted in the table below. Drawbacks don't have level requirements.

On your turn you can take psychic damage equal to the amount of thirst you have (no action required), which can't be reduced in any way, to suppress the drawbacks. If your thirst increases above the amount of damage taken, you take more damage so that the total damage taken is equal to the highest amount of thirst accumulated on your turn. Once you take the damage, the thirst drawbacks don't affect you until the start of your next turn.

| Thirst | Benefit |
|:=======|:========|
| 2      | You gain a bonus to speed and to the distance you can shift when you take the Disengage move action equal to your Presence score. |
| 4      | The first time on a turn that you deal damage to a bleeding, winded, or dying creature, you gain 1 surge, which you can immediately spend. |
| 6      | You gain an edge on abilities used against bleeding, winded, or dying creatures. |

| Thirst | Drawback |
|:=======|:=========|
| 4      | You take a bane on abilities used against creatures that are not bleeding, winded, or dying. |
| 8      | Your Reason, Intuition, and Presence scores count as 1 lower for the purpose of resisting potencies until the start of your next turn. |
| 12     | At the start of each of your turns, or immediately if you reach this drawback during your turn, you must use your Drink Most Exquisite ability as a free maneuver against the nearest bleeding, winded, or dying creature, or against the nearest creature if there are no such creatures. You must use your move action to move within distance of the target if necessary, and if you can't, convert your main action into a move action to move as close as possible to a target. Once you harm a creature this way, you may continue the rest of your turn as normal. If you are unable to get within distance of a creature at all, you move as close as possible to the nearest creature and end your turn. |
`
				}),
				FactoryLogic.feature.createMultiple({
					id: 'vampire-class-1-7',
					name: 'Vampiric Undeath',
					features: [
						FactoryLogic.feature.createDamageModifier({
							id: 'vampire-class-1-7a',
							modifiers: [
								FactoryLogic.damageModifier.createPerLevel({
									damageType: DamageType.Cold,
									modifierType: DamageModifierType.Immunity,
									value: 1
								}),
								FactoryLogic.damageModifier.createPerLevel({
									damageType: DamageType.Corruption,
									modifierType: DamageModifierType.Immunity,
									value: 1
								}),
								FactoryLogic.damageModifier.createPerLevel({
									damageType: DamageType.Poison,
									modifierType: DamageModifierType.Immunity,
									value: 1
								}),
								FactoryLogic.damageModifier.createPerLevel({
									damageType: DamageType.Holy,
									modifierType: DamageModifierType.Weakness,
									value: 6
								})
							]
						}),
						FactoryLogic.feature.create({
							id: 'vampire-class-1-7b',
							name: 'Vampiric Undeath',
							description: `
You can't suffocate, but you need to feed on the blood of living creatures to stay alive — or undead. If you don't consume blood for long periods of time (as decided by the Director, typically a few weeks), you go feral and lose control of your character. The director decides if and when you regain control of your character, which usually happens after your character satiates their thirst by drinking blood of the first creature they stumble upon. Despite being undead, you still do have a soul — a corrupted one, but a soul nonetheless.

Additionally, when your Stamina reaches the negative of your winded value, you become inert instead of dying. You fall prone and can’t stand. You continue to observe your surroundings, but you can’t speak, take main actions, maneuvers, move actions, or triggered actions. While inert this way, if you take any holy damage, or if your body is exposed to sunlight for a long period of time (as decided by the Director, typically a few days), your body is destroyed and you die. Otherwise, after 12 hours, you regain Stamina equal to your recovery value. You can't regain Stamina this way while inert and exposed to sunlight.`
						})
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'vampire-class-1-8',
						name: 'Drink Most Exquisite',
						description: 'Don\'t worry, I am going to just take a sip...',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('The target takes corruption damage equal to your level + 2. This damage can\'t be reduced in any way. You gain temporary Stamina equal to your level + 2.'),
							FactoryLogic.createAbilitySectionSpend({
								repeatable: true,
								effect: `
Spending additional thirst on this ability grants you the following benefits:

* For each additional thirst spent, the corruption damage dealt and temporary Stamina gained increases by 1.
* If you've spent at least 3 total thirst on this ability, the target is M < [average] weakened (save ends), and you can spend a Recovery.
* If you've spent at least 5 total thirst on this ability, the target is M < [strong] weakened (save ends) instead, and you can spend another Recovery.

For each condition the target suffers from, treat the thirst spent on this ability as 1 higher.`
							})
						]
					})
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'vampire-class-1-9'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'vampire-class-1-10',
					cost: 'signature'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'vampire-class-1-11',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'vampire-class-1-12',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'vampire-class-2-1',
					lists: [ PerkList.Special ]
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'vampire-class-2-2',
					cost: 5,
					fromSubclassOnly: true
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.create({
					id: 'vampire-class-3-',
					name: 'Predatory Senses',
					description: 'Your heightened senses of sight, smell, and hearing make you excellent at finding hidden prey. You gain a double edge on tests made to search for hidden creatures. Once on each of your turns, you can Search for Hidden Creatures as a free maneuver. You ignore concealment and creatures that are bleeding, winded, or dying can\'t be hidden from you.'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'vampire-class-3-2',
					cost: 7
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'vampire-class-ability-1',
			name: 'Cornering Scheme',
			description: 'There\'s nowhere to run now.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '2 + M or A damage; slide 1',
						tier2: '4 + M or A damage; slide 2',
						tier3: '6 + M or A damage; slide 3'
					})
				),
				FactoryLogic.createAbilitySectionText('Slide the target first. You can\'t slide them beyond your melee distance. Until the start of your next turn, objects (including walls) count as your allies for the purposes of flanking. If the target is flanked, you gain 1 surge which you can use immediately.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vampire-class-ability-2',
			name: 'Crippling Strike',
			description: 'Where do you think you\'re going?',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '2 + M or A damage; A < [weak], slowed (save ends)',
						tier2: '5 + M or A damage; A < [average], slowed (save ends)',
						tier3: '7 + M or A damage; A < [strong], slowed (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'vampire-class-ability-3',
			name: 'Go for the Throat',
			description: 'That pulsating vein on your neck is fascinating...',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '2 + M or A damage; M < [weak], bleeding (save ends)',
						tier2: '5 + M or A damage; M < [average], bleeding (save ends)',
						tier3: '7 + M or A damage; M < [strong], bleeding (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'vampire-class-ability-4',
			name: 'Sonic Surprise',
			description: 'A concentrated blast of sound catches your prey off guard.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createMelee(3) ],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '4 + P sonic damage; I < [weak], dazed (EoT)',
						tier2: '5 + P sonic damage; I < [average], dazed (EoT)',
						tier3: '7 + P sonic damage; I < [strong], dazed (EoT)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'vampire-class-ability-5',
			name: 'Bleed them Dry',
			description: 'What a pity! So much drink spilled!',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'Three creatures',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionField({
					name: 'Special',
					effect: 'Each target must be adjacent to another target as well as within distance.'
				}),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '3 damage; M < [weak], bleeding (save ends)',
						tier2: '5 damage; M < [average], bleeding (save ends)',
						tier3: '8 damage; M < [strong], bleeding (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'vampire-class-ability-6',
			name: 'Harass the Hunted',
			description: 'You slip among their ranks, attacking and escaping their retaliation.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'Two creatures or objects',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '4 damage',
						tier2: '6 damage',
						tier3: '10 damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You shift up to your speed while using this ability. This movement can be broken up before, after, and in between striking each target however you wish.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vampire-class-ability-7',
			name: 'Isolating Rush',
			description: 'In the end, you\'re all alone, anyway.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '5 + M or A damage; P < [weak], frightened (EoT)',
						tier2: '9 + M or A damage; P < [average], frightened (EoT)',
						tier3: '12 + M or A damage; P < [strong], frightened (EoT)'
					})
				),
				FactoryLogic.createAbilitySectionText('If you use this ability as part of the Charge action, you gain an edge. If you don\'t, you can move up to half your speed before you make the strike. Each enemy adjacent to the target is pushed away from the target up to a number of squares equal to your Presence score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vampire-class-ability-8',
			name: 'Ravenous Storm',
			description: 'You furiously assault enemies surrounding you, relishing their pain.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '5 damage',
						tier2: '8 damage',
						tier3: '11 damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You gain temporary Stamina equal to your Presence score for each enemy in the area.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vampire-class-ability-9',
			name: 'Agonizing Mutilation',
			description: 'You don\'t really need BOTH of your kidneys, do you?',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '7 + M or A damage; M < [weak], bleeding and weakened (save ends)',
						tier2: '11 + M or A damage; M < [average], bleeding and weakened (save ends)',
						tier3: '16 + M or A damage; M < [strong], bleeding and weakened (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'vampire-class-ability-10',
			name: 'Ultrasonic Screech',
			description: 'Your shriek impels and disorients your prey.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 1, within: 1 }) ],
			target: 'Each enemy and object in the area',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '5 sonic damage; push 2; I < [weak] dazed (save ends)',
						tier2: '8 sonic damage; push 4; I < [average] dazed (save ends)',
						tier3: '11 sonic damage; push 6; I < [strong] dazed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('The targets are force moved one at a time, starting with the target nearest to you, and can be pushed into other targets in the same line.')
			]
		})
	],
	subclasses: [
		{
			id: 'vampire-subclass-1',
			name: 'Shrouded Lurker',
			description: 'You are a master of darkness and shadows do your bidding. You use your dark tools to bind and wound your victims, as well as to escape their retaliation, hide, and patiently wait for the best moment to strike.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'vampire-subclass-1-1-1',
							selected: [ 'Hide' ]
						}),
						FactoryLogic.feature.create({
							id: 'vampire-subclass-1-1-2',
							name: 'Beast from the Mist',
							description: `
You specialize in attacking from hiding, and lurking in the shadows for your prey whets your appetite for violence. While you have concealment, you gain an edge on strikes and on the Grab maneuver against creatures that would take a bane on strikes made against creatures with concealment. Against such creatures, this edge replaces the edge granted by being hidden. Additionally, whenever you grab a creature, you can use a free triggered action to move up to half your speed or to move the grabbed creature into an unoccupied space adjacent to you.

### Shadow Damage

The nature of each Shrouded Lurker's shadow magic is unique to them. Some manipulate shadows that cut like razors, while others use shadows that burn like fire, corrupt flesh, or are as cold as the void between the stars. Choose one of the following damage types: cold, corruption, fire or untyped. Whenever an ability says it deals shadow damage, it deals the chosen damage type. You can change the chosen damage type as a respite activity or as a part of changing your kit as a respite activity. Additionally, whenever you deal shadow damage, you ignore an amount of immunity to the chosen damage type equal to your highest characteristic score.

### Shroud Effects

Some of your abilities have a shroud effect entry. Whenever you use a shroud ability, the ability gains extra effects specified in the shroud entry if you have concealment when using the ability.`
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'vampire-subclass-1-1-3',
								name: 'Misty Passage',
								description: 'You cannot escape and you cannot catch me...',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('You teleport up to a number of squares equal to twice your Presence score.'),
									FactoryLogic.createAbilitySectionSpend({
										effect: 'You gain concealment until the start of your next turn and automatically become hidden.'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'vampire-subclass-1-1-4',
								name: 'Fade Away',
								description: 'Now you see me, now you don\'t...',
								type: FactoryLogic.type.createTrigger('You take damage'),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('You take half the triggering damage, then can teleport up to a number of squares equal to your Presence score after the triggering effect resolves.'),
									FactoryLogic.createAbilitySectionSpend({
										effect: 'You gain concealment until the start of your next turn and automatically become hidden.'
									})
								]
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'vampire-subclass-1-2-1',
							name: 'No One Can Hear you Scream',
							description: 'You can enshroud your surroundings with a thick mist that can hide and mute your activities, granting you and your allies an edge on any test made to hide, sneak, or conceal anything within the mist. You can influence an area with a radius of up to 1 mile. Conjuring the mist takes up to 10 minutes, depending on distance. The mist fades after an hour of you not focusing on spreading or maintaining the mist. You and your allies can\'t be surprised while in the mist. No one outside of the mist is aware of encounters happening inside. You can end the mist at will (no action required).'
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'vampire-subclass-1-ability-1',
					name: 'From the Shadows and Back',
					description: 'You strike and then fade into darkness like a fleeting shadow.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [
						FactoryLogic.distance.createMelee(),
						FactoryLogic.distance.createRanged(5)
					],
					target: 'One creature or object',
					cost: 'signature',
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility ],
								tier1: '2 + M or A damage',
								tier2: '4 + M or A damage',
								tier3: '6 + M or A damage'
							})
						),
						FactoryLogic.createAbilitySectionText('You can shift up to half your speed after the strike.'),
						FactoryLogic.createAbilitySectionField({
							name: 'Shroud',
							effect: 'After you shift, you automatically become hidden.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'vampire-subclass-1-ability-2',
					name: 'Darkspeed',
					description: 'You blink and I\'m...right behind you!',
					type: FactoryLogic.type.createManeuver({ free: true }),
					keywords: [ AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.createSelf() ],
					target: 'Self',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('You can teleport up to a number of squares equal to 10 + your Presence score. You have concealment until the start of your next turn. After you teleport, you can make a free strike as a free maneuver.'),
						FactoryLogic.createAbilitySectionField({
							name: 'Shroud',
							effect: 'After you teleport, you can use a signature ability or Drink Most Exquisite as a free maneuver instead of the free strike.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'vampire-subclass-1-ability-3',
					name: 'Longing Shadows',
					description: 'The shadows reach out to enfold your prey.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature or object',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Presence ],
								tier1: '4 + P shadow damage; A < [weak], restrained (save ends)',
								tier2: '6 + P shadow damage; A < [average], restrained (save ends)',
								tier3: '8 + P shadow damage; A < [strong], restrained (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('While the target is restrained this way, at the start of each of their turns, they take shadow damage equal to your Presence score.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'vampire-subclass-1-ability-4',
					name: 'Chthonic Embrace',
					description: 'Shadowy appendages burst from the ground to seize your prey.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
					target: 'Each enemy in the area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Presence ],
								tier1: '3 shadow damage; A < [weak], restrained (save ends)',
								tier2: '4 shadow damage; A < [average], restrained (save ends)',
								tier3: '5 shadow damage; A < [strong], restrained (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('Each target standing on the ground takes 1d3 extra damage, and the potency of this ability increases by 1 against them.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'vampire-subclass-1-ability-5',
					name: 'Only the Black Remains',
					description: 'Are you afraid of the dark? You should be.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Presence ],
								tier1: 'blind (EoT); P < [weak], frightened',
								tier2: 'blind (save ends); P < [average], frightened',
								tier3: 'blind (save ends); P < [strong], frightened'
							})
						),
						FactoryLogic.createAbilitySectionText('A blind target treats all other creatures and objects as if they are invisible, and doesn\'t have line of effect to creatures or objects more than 5 squares away. A target made frightened this way is frightened as long as they are blind.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'vampire-subclass-1-ability-6',
					name: 'Umbral Shroud',
					description: 'You obscure yourself and your allies with a veil made of shadows.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
					target: 'Self and all allies',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('Each target has concealment until the end of the encounter or until you are dying.'),
						FactoryLogic.createAbilitySectionField({
							name: 'Shroud',
							effect: 'You become invisible until the end of the encounter or until you are dying.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'vampire-subclass-1-ability-7',
					name: 'Impenetrable Veil',
					description: 'A field of darkness so dense, not even the sun can pierce it.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
					target: 'Each enemy in the area',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Presence ],
								tier1: '4 shadow damage',
								tier2: '6 shadow damage',
								tier3: '8 shadow damage'
							})
						),
						FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, each enemy who enters the area for the first time in a combat round or starts their turn there takes shadow damage equal to your Presence score. In addition, the area blocks line of effect for enemies.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'vampire-subclass-1-ability-8',
					name: 'Within My Dark Grasp',
					description: 'A shadowy hand grabs, pulls, and places your prey at your mercy.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature or object',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Presence ],
								tier1: '8 + P shadow damage; pull 3',
								tier2: '12 + P shadow damage; pull 5',
								tier3: '16 + P shadow damage; pull 7'
							})
						),
						FactoryLogic.createAbilitySectionText('If you pull the target adjacent to you, you can use a signature ability or your Drink Most Exquisite ability against them as a free maneuver.')
					]
				})
			],
			selected: false
		},
		{
			id: 'vampire-subclass-2',
			name: 'Spore Bearer',
			description: 'You are a host to innumerable parasites that prey upon both the dead and the living. Infectious spores swirl around you, poisoning and wearing down your victims as well as nourishing and bolstering your allies.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'vampire-subclass-2-1-1',
							selected: [ 'Nature' ]
						}),
						FactoryLogic.feature.create({
							id: 'vampire-subclass-2-1-2',
							name: 'Infection',
							description: `
You are a source of infection that spreads through contagious spores constantly infecting creatures around you. Your spores are dormant outside of combat, but once an encounter begins, they become more dangerous the longer it goes. The severity of your spores is expressed by your virulence value. At the start of a combat encounter, your virulence is equal to 0. If you have 5 or more Victories at the start of a combat encounter, your virulence is equal to 1 instead. At the start of each combat round, your virulence increases by 1.

Virulence Effects

Some of your abilities have a virulence effect entry. Whenever you use a virulence ability, the ability gains extra effects specified in the virulence entry if your virulence is equal to or greater than the number in the virulence entry. For example, an ability with "Virulence 3" would gain extra effects if your virulence is equal to or greater than 3.

### Infected

Some of your abilities and features can make creatures infected. Infected is a special effect that indicates a creature is affected by your spores. You and your allies are considered to be infected outside of combat. At the start of any combat encounter, you and your non-minion allies within 5 squares of you become infected. You can target your allies with abilities that can make creatures infected as if they were enemies. If you do, they can ignore the ability's damage and other negative effects and just become infected. An infected creature stops being infected at the end of the encounter. If a creature would become infected from a different source than your abilities and features, the infection is separate from yours.

### Spore Cloud

During combat, you emanate a visible 1 aura of infectious spores. Each creature who enters the area for the first time in a combat round or starts their turn there becomes infected. You can activate and deactivate the aura at will (no action required). Your virulence is treated as 1 higher against creatures in the area. This can make a virulence effect entry affect those creatures even when your virulence wouldn't otherwise be high enough. Outside of combat, the aura remains dormant.

### Spore Keyword

Some of your abilities have the Spore keyword. Abilities with the Spore keyword don't need line of effect to affect a target within distance.`
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'vampire-subclass-2-1-3',
								name: 'Expand the Spread',
								description: 'You increase the reach of your swirling swarm of spores.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('The size of your Spore Cloud aura increases by 1 until the start of your next turn.'),
									FactoryLogic.createAbilitySectionSpend({
										effect: 'After the size of your aura increases, each enemy in the area gains damage weakness equal to your echelon until the end of their next turn.'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'vampire-subclass-2-1-4',
								name: 'Emergency Release',
								description: 'Upon spotting danger, you release more spores to disorient the attacker.',
								type: FactoryLogic.type.createTrigger('An enemy targets you or an ally with an ability.'),
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'Self or one infected ally',
								sections: [
									FactoryLogic.createAbilitySectionText('Spores are released in a 1 burst area originating from the target. Each creature in the area becomes infected. The area lasts until the start of your next turn. You and your allies have concealment while in the area, including against the triggering ability, and all creatures have concealment from enemies in the area.'),
									FactoryLogic.createAbilitySectionSpend({
										effect: 'Each enemy in the area takes poison damage equal to your Presence score + your virulence.'
									})
								]
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'vampire-subclass-2-2-1',
							name: 'The Woods Have Eyes',
							description: 'You can infect plants, fungi and animals with your spores and make them spread throughout the environment. The spores spread at a rate of 1 mile per hour while you actively focus on them and do nothing else. You perceive everything in the area at once. You can hear things happening, but you cannot determine the position, tone, or quality of the sound. You can see things happening, but you can\'t make out fine details such as the events\' surroundings, creatures\' facial features, or emblems or insignias. You can influence an area with a radius of up to a number of miles equal to your Presence score. The spreading spores recede after an hour of you not focusing on spreading or maintaining them.'
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'vampire-subclass-2-ability-1',
					name: 'One Good Spread',
					description: 'Your attack delivers a cavalcade of infectious spores.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [
						FactoryLogic.distance.createMelee(),
						FactoryLogic.distance.createRanged(5)
					],
					target: '',
					cost: 'signature',
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility ],
								tier1: '3 + M or A damage',
								tier2: '5 + M or A damage',
								tier3: '8 + M or A damage'
							})
						),
						FactoryLogic.createAbilitySectionText('The target becomes infected and takes extra poison damage equal to your virulence.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'vampire-subclass-2-ability-2',
					name: 'Exude Venom',
					description: 'Your spores secrete poison afflicting your prey.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Spore ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
					target: 'Each infected enemy in the area',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Presence ],
								tier1: '4 poison damage',
								tier2: '5 poison damage',
								tier3: '7 poison damage'
							})
						),
						FactoryLogic.createAbilitySectionText('The target takes extra poison damage equal to your virulence. This ability ignores an amount of damage immunity equal to your Presence score.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'vampire-subclass-2-ability-3',
					name: 'Vitalizing Secretions',
					description: 'Your spores release soothing substances into your allies.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Spore ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
					target: 'Self and each infected ally in the area',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('Each target can spend a Recovery.'),
						FactoryLogic.createAbilitySectionField({
							name: 'Virulence 3',
							effect: 'Each target can end one condition or effect on them that is ended by a saving throw or that ends at the end of their turn.'
						}),
						FactoryLogic.createAbilitySectionField({
							name: 'Virulence 5',
							effect: 'Each target can spend an additional Recovery.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'vampire-subclass-2-ability-4',
					name: 'Dissolve the Insides',
					description: 'Your spores release acid that burns your prey from within.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Spore, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One infected creature',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Presence ],
								tier1: '9 + P acid damage',
								tier2: '13 + P acid damage',
								tier3: '18 + P acid damage'
							})
						),
						FactoryLogic.createAbilitySectionText('This ability ignores an amount of damage immunity equal to your Presence score.'),
						FactoryLogic.createAbilitySectionField({
							name: 'Virulence 3',
							effect: 'The target takes an extra 1d6 acid damage.'
						}),
						FactoryLogic.createAbilitySectionField({
							name: 'Virulence 5',
							effect: 'The target takes an extra 2d6 acid damage instead of 1d6.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'vampire-subclass-2-ability-5',
					name: 'Malignant Growths',
					description: 'Your spores sprout from your foes into menacing appendages.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Spore ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
					target: 'Self and each infected creature in the area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Presence ],
								tier1: '4 damage',
								tier2: '5 damage',
								tier3: '7 damage'
							})
						),
						FactoryLogic.createAbilitySectionText('An appendage originating from each target can strike the target themselves, a creature adjacent to the target, or not strike at all. After the strike, the appendage withers and dies. Creatures hit with the strike becomes infected. A creature can be hit with only one such strike.'),
						FactoryLogic.createAbilitySectionField({
							name: 'Virulence 3',
							effect: 'The distance of the appendage\'s strike increases to 2 and in addition to dealing damage and making creatures infected, it can also slide the target up to a number of squares equal to the tier outcome of your power roll.'
						}),
						FactoryLogic.createAbilitySectionField({
							name: 'Virulence 5',
							effect: `
The slide from the appendage's strike can be vertical.

If the target is an enemy, the appendage doesn't immediately wither down and is making the target weakened until it is removed by the target or their ally with a maneuver. The appendage withers down and dies at the end of the encounter.`
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'vampire-subclass-2-ability-6',
					name: 'Protective Thallus',
					description: 'Your spores sprout into a protective layer covering your allies.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Spore ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
					target: 'Self and each infected ally in the area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('Each target gains temporary Stamina equal to twice your virulence. While the temporary Stamina persists, they have immunity to acid, cold, corruption, and poison damage equal to your Presence score.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'vampire-subclass-2-ability-7',
					name: 'Adrenal Stimulation',
					description: 'Your spores mobilize your allies to fight harder.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Spore ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
					target: 'Self and each infected ally in the area',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionText('Each target gains 1 surge and a bonus to speed equal to your Presence score until the end of their next turn.'),
						FactoryLogic.createAbilitySectionField({
							name: 'Virulence 4',
							effect: 'Each target gains 2 surges instead of 1, and the bonus to speed lasts until the end of the encounter for them.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'vampire-subclass-2-ability-8',
					name: 'Restraining Creepers',
					description: 'Your spores sprout from your prey into binding vines.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Spore ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
					target: 'Each infected enemy in the area',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Presence ],
								tier1: '4 damage; M < [weak], slowed (save ends)',
								tier2: '5 damage; M < [average], slowed (save ends)',
								tier3: '7 damage; M < [strong], slowed (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('While slowed or restrained this way, at the start of each target\'s turn, they take damage equal to your Presence score + your virulence.'),
						FactoryLogic.createAbilitySectionField({
							name: 'Virulence 3',
							effect: 'Each target is restrained instead of slowed.'
						}),
						FactoryLogic.createAbilitySectionField({
							name: 'Virulence 5',
							effect: 'For each target, the potency of this ability increases by 1.'
						})
					]
				})
			],
			selected: false
		}
	],
	level: 1,
	characteristics: []
};

const crimsonKnight: Kit = {
	id: 'kit-crimson-knight',
	name: 'Crimson Knight',
	description: `
*By Triglav Games*

You've adopted the fighting traditions of knights and nobles. Protected by your house's ornate armor and wielding a blade that drains lifeforce of your enemies, you fight with deadly grace, balancing offense and defense.`,
	type: '',
	armor: [ KitArmor.Medium ],
	weapon: [ KitWeapon.Medium ],
	stamina: 6,
	speed: 1,
	stability: 1,
	disengage: 0,
	meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-crimson-knight-1',
				name: 'Draining Strike',
				description: 'Just let it flow straight to me!',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'One creature or object',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '2 + M or A damage',
							tier2: '5 + M or A damage',
							tier3: '7 + M or A damage; M < [strong], weakened (save ends)'
						})
					),
					FactoryLogic.createAbilitySectionText('You gain temporary Stamina equal to your highest characteristic score.')
				]
			})
		})
	]
};

const lasher: Kit = {
	id: 'kit-lasher',
	name: 'Lasher',
	description: `
*By Triglav Games*

You are a master of a whip, and your weapon leaves gory marks on the bodies of your enemies. Even though you use a weapon of your enemies, you don't use it to subjugate others, but to punish those who do, and to liberate those enslaved by them.`,
	type: '',
	armor: [ KitArmor.Light ],
	weapon: [ KitWeapon.Whip ],
	stamina: 3,
	speed: 1,
	stability: 0,
	disengage: 0,
	meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
	rangedDamage: null,
	meleeDistance: 1,
	rangedDistance: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-lasher-1',
				name: 'Blood Streak',
				description: 'These will definitely leave scars...',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee(2) ],
				target: 'One creature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '3 + M or A damage; A < [weak], bleeding (EoT)',
							tier2: '5 + M or A damage; A < [average], bleeding (EoT)',
							tier3: '8 + M or A damage; A < [strong], bleeding (save ends)'
						})
					)
				]
			})
		})
	]
};

const mangler: Kit = {
	id: 'kit-mangler',
	name: 'Mangler',
	description: `
*By Triglav Games*

You are all muscle, no finesse. You focus on being as brutal as possible for you know there is no better enemy than a dead and mutilated one. Your clawed hands usually just graze your opponents, but once you land a solid hit, you mercilessly maim your prey.`,
	type: '',
	armor: [ KitArmor.Medium ],
	weapon: [ KitWeapon.Unarmed ],
	stamina: 6,
	speed: 1,
	stability: 1,
	disengage: 0,
	meleeDamage: FactoryLogic.createKitDamageBonus(0, 0, 4),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-mangler-1',
				name: 'Shred To Bits',
				description: 'When I am done with you, you will be but a lump of meat!',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'One creature or object',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might ],
							tier1: '3 + M damage',
							tier2: '6 + M damage',
							tier3: '9 + M damage; A < [strong], prone and bleeding (save ends)'
						})
					)
				]
			})
		})
	]
};

const slasher: Kit = {
	id: 'kit-slasher',
	name: 'Slasher',
	description: `
*By Triglav Games*

You use your sharp, elongated claws to cut and tear your enemies, trying to injure as many as possible as fast as possible. You are fast and deadly, joining the fray immediately and relentlessly wounding your enemies.`,
	type: '',
	armor: [ KitArmor.Light ],
	weapon: [ KitWeapon.Unarmed ],
	stamina: 3,
	speed: 3,
	stability: 0,
	disengage: 1,
	meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-slasher-1',
				name: 'Furious Lacerations',
				description: 'One more cut and you fall apart!',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'Up to three creatures or objects',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '1 damage',
							tier2: '3 damage',
							tier3: '5 damage'
						})
					),
					FactoryLogic.createAbilitySectionText('If you target two targets, this ability deals 2 extra damage to both of them. If you target only one target, this ability deals extra damage equal to 3 + your Might or Agility score.')
				]
			})
		})
	]
};

const deceptiveAppearance: Perk = {
	id: 'deceptive-appearance',
	name: 'Deceptive Appearance',
	list: PerkList.Special,
	description: `
*Vampires only*

An illusory glamor makes you attractive and easy on the eyes of the beholder. It is up to you if you still look like a vampire, a non-vampire member of your ancestry, or a member of another ancestry of the same size and general shape as yours. You can change your appearance as a maneuver. You gain an edge on Presence tests using the Flirt or Persuade skills. You gain a double edge on tests using the Disguise skill while pretending to be someone else.`,
	type: FeatureType.Text,
	data: null
};

const insidiousMist: Perk = {
	id: 'insidious-mist',
	name: 'Insidious Mist',
	list: PerkList.Special,
	description: `
*Vampires only*

As a maneuver, you can turn into a cloud of sentient mist. In this form, you gain the following benefits and drawbacks:

* You can fly and hover. Your speed is equal to your highest characteristic score, and can't be increased or decreased in any way.
* You can't be made prone, restrained, or grabbed, and those conditions end for you when you transform. If you were suffering from any other conditions beforehand, those conditions are suppressed until you revert back to your true form.
* You can't be force moved unless the forced movement comes from a gust of wind or similar source, in which case the forced movement is doubled, or can explicitly affect gaseous objects. You don't take damage from forced movement.
* You can move through very small spaces, but the smaller the space, the more time it takes to move through it, up to 1 minute to get through a keyhole-sized opening.
* You have damage immunity equal to your level.
* You can't use main actions, triggered actions, or free triggered actions, and the only maneuver you can use is a maneuver to revert back to your true, solid form.
* When you are dying, you revert back to your true, solid form and can't use your mist form until you are no longer dying.`,
	type: FeatureType.Text,
	data: null
};

const nightSpeech: Perk = {
	id: 'night-speech',
	name: 'Night Speech',
	list: PerkList.Special,
	description: `
*Vampires only*

You can speak with and understand animals that are associated with night or evil in your culture, typically bats, rats, ravens, wolves, and spiders. The animals don't have to share a language with you to be able to communicate with you, and this ability doesn't make them inherently more intelligent, but you can make simple requests and they will do your bidding.`,
	type: FeatureType.Text,
	data: null
};

const oneWithTheShadows: Perk = {
	id: 'one-with-the-shadows',
	name: 'One with the Shadows',
	list: PerkList.Special,
	description: `
*Vampires only*

As a nocturnal predator, you embrace the shadows as they embrace you. You have a double edge on tests using the Hide and Sneak skills, but only when it's sufficiently dark (as determined by the Director). Additionally, at the start of an encounter, if you are in shadows or if it's sufficiently dark (as determined by the Director), you can use the Hide maneuver as a free triggered action.`,
	type: FeatureType.Text,
	data: null
};

export const triglav: Sourcebook = {
	id: 'triglav',
	name: 'Triglav Games',
	description: 'Third-party content from Triglav Games.',
	type: SourcebookType.ThirdParty,
	adventures: [],
	ancestries: [
		boggit,
		vampireAncestry
	],
	careers: [],
	classes: [
		vampireClass
	],
	complications: [],
	cultures: [],
	domains: [],
	encounters: [],
	imbuements: [],
	items: [],
	kits: [
		crimsonKnight,
		lasher,
		mangler,
		slasher
	],
	monsterGroups: [],
	montages: [],
	negotiations: [],
	perks: [
		deceptiveAppearance,
		insidiousMist,
		nightSpeech,
		oneWithTheShadows
	],
	projects: [],
	subclasses: [],
	tacticalMaps: [],
	terrain: [],
	titles: [],
	skills: [],
	languages: []
};
