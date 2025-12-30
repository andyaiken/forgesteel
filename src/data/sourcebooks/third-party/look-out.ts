import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { FeatureType } from '@/enums/feature-type';
import { HeroClass } from '@/models/class';
import { Kit } from '@/models/kit';
import { Perk } from '@/models/perk';
import { PerkList } from '@/enums/perk-list';
import { SkillList } from '@/enums/skill-list';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

// #region Clases

const kiln: HeroClass = {
	id: 'class-kiln',
	name: 'Kiln',
	description: `
Kilns are magical warriors and guardians of the Undermind. The omnipresent roots of the Undermind metabolize souls into magical ether that you capture in your wooden talismans. Different woods burn with different powers and you wield them all to turn your foes to ash.

As a kiln, you arrive to stoke the flame wherever the spark of opportunity presents itself, empowering your allies to devastate your enemies. Should the need arise, however, you’re well-equipped to put those who stand against you to the pyre yourself.`,
	type: 'standard',
	subclassName: 'Cadre',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Agility, Characteristic.Reason ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'AHShD5RQJEsUMI5D',
					name: 'Stamina',
					field: FeatureField.Stamina,
					value: 21,
					valuePerLevel: 9
				}),
				FactoryLogic.feature.createBonus({
					id: 'fASrDG7UhEX5Blxa',
					name: 'Recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createSkillChoice({
					id: '40EUJLeDYXVn2fjh',
					selected: [ AbilityKeyword.Magic ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: '1D5vcoaQjS4bxAfB',
					selected: [ 'Carpentry' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'XpH3WAhclAzTtZiv',
					listOptions: [ SkillList.Crafting, SkillList.Lore ],
					count: 2
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'heroic-resource',
					name: 'Spark',
					gains: [
						{
							trigger: 'Start of your turn',
							value: '1d3',
							tag: 'start-turn'
						},
						{
							trigger: 'You use the Stoke the Flame ability targeting an ally',
							value: '1',
							tag: 'stoke-ally'
						}
					]
				}),
				FactoryLogic.feature.createPackage({
					id: 'pVGsG9NfxCcT1pfc',
					name: 'Enkindle',
					description: `
Whenever you roll to gain spark at the start of your turn, you can kindle (no action required). If you do, your roll gains the following additional effects:

* If the roll is a 1, the Undermind accepts your offering. You take psychic damage equal to 1d10 + your level, which can’t be reduced in any way. You are enkindled.
* If the roll is a 2, you are enkindled.
* If the roll is a 3, you are enkindled and you gain 1 extra spark.

While you are enkindled, your abilities granted by your Talisman Kit are empowered. Enkindled lasts until the end of the round.

You lose any remaining spark at the end of the encounter.`,
					tag: 'Enkindle'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: '6AEyy4LFirQe4qST',
						name: 'Stoke the Flame',
						description: 'As an ally attacks, you harness a bit of arcane energy to grant them a decisive advantage.',
						type: FactoryLogic.type.createTrigger('The target makes an ability roll for a damage-dealing ability.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: '1 ally',
						sections: [
							FactoryLogic.createAbilitySectionText('Apply one Stoke the Flame effect from your talisman kit granted by the Tinderbox feature.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Inner Flame',
								effect: 'Once per round, you can spend 1 spark to use Stoke the Flame targeting yourself instead of an ally as a free triggered action. You can use Stoke the Flame this way even if you are dazed.'
							})
						]
					})
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'dXmTjCwMVwFeU1vV'
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'dsTOgwyx33aQcquK',
					name: 'Tinderbox',
					types: [ 'Kiln' ]
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'QeAzUQduMYs8dMZS',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'zWI9wDu9dKJVBjaj',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'HmIp8TIc3VCF2ZSV',
					name: 'Perk',
					description: `
You gain one crafting, lore, or supernatural, or kiln perk of your choice.

If you choose a kiln perk, you must first complete a task from the Undermind before you gain the perk. Work with your Director to come up with what the task is. It might be anything, but probably something you can accomplish in your next 16 Victories. As examples, your task might be one of the following:

* Plant the brain of a freshly slain enemy in the shade of a thousand-year old tree.
* Go to the nearest wode, take the seeds from a fruit freshly plucked, and feed those seeds to birds outside the wode.`,
					lists: [ PerkList.Crafting, PerkList.Lore, PerkList.Supernatural, PerkList.Special ]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createPackageContent({
					id: 'sJRlfIIufT36YWjq',
					name: 'A Fire Unburdened',
					description: `
While you are enkindled, as a maneuver, you can choose one of the following:

* End the restrained condition.
* End the slowed condition.

As part of the maneuver, you can additionally stand up if you are prone.`,
					tag: 'Enkindle'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'ss3x5Aky77xMctKf',
					modifiers: [
						FactoryLogic.damageModifier.createValuePlusPerLevel({
							damageType: DamageType.Fire,
							modifierType: DamageModifierType.Immunity,
							value: 5,
							perLevel: 1
						})
					]
				}),
				FactoryLogic.feature.create({
					id: 'dxLQNl9YTdlHy61x',
					name: 'Controlled Burn',
					description: 'You gain an edge on Presence tests made to interact with other creatures when you are near a visible flame that is 2 squares or larger. As a maneuver, you can ignite or snuff out any number of at-most size 1 prepared objects (kindling, torches, candles, fuses, and so forth) at any distance as long as you can see and recognize the object.'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: '2LVjHk8ypQyx6LsO',
					cost: 7
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'o6o03jRIxEG0NQpx',
			name: 'Dance Like Embers',
			description: 'You dart from skirmish to skirmish leaving an ephemeral doppelganger of fire in your wake.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionText('You can teleport twice, each time up to 2 squares, leaving a doppelganger in each square you teleport from until the start of your next turn. If you are adjacent an enemy, no matter the enemy’s size, you can teleport to a space on the opposite side of the enemy as one of the teleports. When an enemy is adjacent to at least one of your doppelgangers, they have damage weakness equal to your Reason score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'ghpGUOgj52GuvcYZ',
			name: 'Heat Wave',
			description: 'Toasty.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'All enemies',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '4 fire damage',
						tier2: '5 fire damage; push 1',
						tier3: '7 fire damage; push 2'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: '4IphmdVho7h9FoY8',
			name: 'Smoke on the Wind',
			description: 'Your body grows hazy and you briefly fade to an incorporeal state.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionText('You can shift up to your speed. You can pass through 1 square of solid matter as part of this movement, but you cannot end this movement inside solid matter. Allies occupying squares that you move through during this shift each gain a surge. Squares occupied by enemies do not count as difficult terrain during this movement. You can make one free strike at any point during this movement.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'sDLIrCOVMuotUg77',
			name: 'Wavering Flame',
			description: 'The heat of your movement plays tricks on your foes’ eyes.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee(), FactoryLogic.distance.createRanged(5) ],
			target: '2 creatures or objects',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '3 damage; R < [weak], blinded (EoT)',
						tier2: '4 damage; R < [average], blinded (EoT)',
						tier3: '6 damage; R < [strong], blinded (EoT)'
					})
				),
				FactoryLogic.createAbilitySectionText('A blinded creature has line of effect only to creatures and objects within 2 squares of them.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'pJu7F0ayOaU0jL8Y',
			name: 'Grasp and Immolate',
			description: 'There may be such thing as too warm of an embrace.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '4 + A fire damage; burning (EoT) and grabbed',
						tier2: '6 + A fire damage; burning (EoT) and grabbed',
						tier3: '9 + A fire damage; burning (EoT) and grabbed'
					})
				),
				FactoryLogic.createAbilitySectionText('A burning target takes 1d6 fire damage at the start of each of their turns until the condition ends.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'Y11uB8aPXNICBB0Z',
			name: 'Rake Over the Coals',
			description: 'They drag their feet, but they only kick up more fire.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: 'Push 3',
						tier2: 'Push 4',
						tier3: 'Push 6'
					})
				),
				FactoryLogic.createAbilitySectionText('An object you target must be your size or smaller. The target takes fire damage equal to the number of squares they are pushed. Squares the target is forced from as part of this ability become difficult terrain for enemies.')
			]
		}),
		FactoryLogic.createAbility({
			id: '02UsIBtWuprA6Ti5',
			name: 'Searing Strike',
			description: 'Memory of your steel radiates oppressive heat.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '5 + A damage; M < [weak], the target has fire weakness 5 (save ends)',
						tier2: '8 + A damage; M < [average], the target has fire weakness 5 (save ends)',
						tier3: '11 + A damage; M < [strong], the target has fire weakness 5 (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, whenever the target takes damage, all adjacent enemies take 2 fire damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'vZHDpe6mKOcP89Xy',
			name: 'Smoldering Sword',
			description: 'Embers and ash rise and coalesce into a solid mass, honed to an edge and ready to command.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(5) ],
			target: 'Special',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText(`
You summon in an unoccupied space within distance a hovering, flaming sword of size 1S that can’t be harmed. The sword lasts until the end of the encounter. Summoning a new smoldering sword dismisses the previous one. All creatures can move through the sword’s space.

When you or an ally uses a Melee Weapon ability, they can choose to use it from the sword’s position. An ability performed in this way temporarily gains the Magic keyword and deals additional fire damage equal to your Reason score.

At the start of your turn while the sword is summoned, as a free maneuver, you can move the sword up to your speed.`)
			]
		}),
		FactoryLogic.createAbility({
			id: 'Cb2gcWe4lmscq3mO',
			name: 'Demoralizing Incense',
			description: 'Your talismans burn with an acrid smell that distracts and sows doubt.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'All enemies',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, targets of your Stoke the Flame ability gain a 2 aura until the end of the round. Enemies within the aura take a bane on power rolls.')
			]
		}),
		FactoryLogic.createAbility({
			id: '68wY6lq8sUxzAeTM',
			name: 'Focusing Incense',
			description: 'Your talismans burn with an earthy smell that sharpens your focus.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self and all allies',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, targets of your Stoke the Flame ability gain a 2 aura until the end of the round. When targets of this ability within the aura make a power roll (including on the ability that triggered Stoke the Flame) and at least one of the d10s rolled is a 1, they can reroll one d10. Additionally, targets of this ability in the aura automatically succeed saving throws to end the dazed condition.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'dfxNUT4lp8fTkmDR',
			name: 'Invigorating Incense',
			description: 'Your talismans burn with a sweet smell that affirms and empowers.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self and all non-minion allies',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, targets of your Stoke the Flame ability gain a 2 aura until the end of the round. Targets of this ability who end their turn within the aura gain one surge and their next strike deals extra fire damage equal to your Reason score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'gzgbDNJYvg7VgOb2',
			name: 'Revitalizing Incense',
			description: 'Your talismans burn with a floral smell that heals and reinvigorates.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self and all allies',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText(`
Until the end of the encounter, targets of your Stoke the Flame ability gain a 2 aura until the end of the round. Targets of this ability who end their turn within the aura can use a free triggered action to do one of the following:

* Spend a Recovery.
* End one effect that is ended by a saving throw or that ends at the end of the target’s turn.`)
			]
		})
	],
	subclasses: [
		{
			id: 'iIRFRndVCP4jQuXo',
			name: 'Flameweaver',
			description: 'You weave through the battlefield from skirmish to skirmish like a thread in the wind. Your power guides you to where you are needed most.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'j0NHyyP7a0NF1TnH',
							selected: [ 'Navigate' ]
						}),
						FactoryLogic.feature.createPackageContent({
							id: 'P6VcK01mJc1PkCfH',
							name: 'Wildfire',
							description: 'While you are enkindled, whenever you shift or teleport, the distance of the movement is increased by 1 and one ally adjacent to you at the beginning of the movement can teleport to an unoccupied space adjacent to you at the end of the movement.',
							tag: 'Enkindle'
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'Gxs8yJ8vd4YOA35Y',
							name: 'Reflections of Ember',
							description: 'You can swim, climb, or otherwise move along reflective surfaces, such as the surface of a river or up a wall of metal, at full speed.'
						}),
						FactoryLogic.feature.createChoice({
							id: 'A3HMgrcRcFRfxv1S',
							name: '2nd-Level Flameweaver Ability',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'O1TthHv1McjpFexz',
											name: 'See the Tapestry of Battle',
											description: 'This section over here could use a patch.',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Magic ],
											distance: [ FactoryLogic.distance.createRanged(10) ],
											target: '1 ally',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionText('Teleport to an unoccupied space adjacent the target. You or the target can use a signature ability and you or the target can spend a Recovery, in either order. Whomever spends a Recovery in this way gains 2 surges.')
											]
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: '8Wtn6iAKFPJS5VZM',
											name: 'Thread the Needle',
											description: 'Connect the movements, just as you were trained.',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Magic ],
											distance: [ FactoryLogic.distance.createSelf() ],
											target: 'Self',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionText('Use a signature ability. After you use the ability, you can shift up to your speed. At the end of your movement, you or an adjacent ally can make a melee free strike.')
											]
										})
									}),
									value: 1
								}
							]
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			selected: false,
			abilities: []
		},
		{
			id: 'ezVKqdKSYQqHhxe0',
			name: 'Hexblaze',
			description: 'You are an eruption, and the battlefield will burn to ash. The explosive force of your power shatters any hope of victory for your enemies.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'K2orXNVgQlytsh8Q',
							selected: [ 'Endurance' ]
						}),
						FactoryLogic.feature.createPackageContent({
							id: 'QFwqnEtHE9TZFhXd',
							name: 'Fan the Flame',
							description: 'While you are enkindled, the first time in a round that you take damage, reduce the damage by your Agility score and gain 1 surge.',
							tag: 'Enkindle'
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.createDamageModifier({
							id: '',
							modifiers: [
								FactoryLogic.damageModifier.create({
									damageType: DamageType.Lightning,
									modifierType: DamageModifierType.Immunity,
									value: 5
								})
							]
						}),
						FactoryLogic.feature.create({
							id: 'pFyTE1iMXxhXgVFl',
							name: 'St. Elmo\'s Fire',
							description: 'During and shortly after a thunderstorm, you glow with a faint blue flame and you have an edge on tests that use the Navigate skill.'
						}),
						FactoryLogic.feature.createChoice({
							id: '7kh47fRjTepke93l',
							name: '2nd-Level Hexblaze Ability',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'wCiKLNvVLdmSNcCY',
											name: 'Color out of Flame',
											description: 'The hue of your fire entrances you, to the mortal detriment of the Undermind’s enemies.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Magic ],
											distance: [ FactoryLogic.distance.createSelf() ],
											target: 'Self',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionText(`
Until the end of the encounter, your flames take on a color of your choosing:

* **Green:** Once per round, when you use a fire damage-dealing ability, you can make a melee free strike against one of the targets of the ability. If you kill at least one non-minion with either the ability or the free strike, you gain 2 surges and you can spend a Recovery.
* **White:** Once per round, when you use a fire damage-dealing ability, you gain temporary Stamina equal to twice your Reason score and you can end one effect that is ended by a saving throw or that ends at the end of your turn.

Changing the color of your flames requires the use of this ability again.`)
											]
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'Q0ZfOtiA3tO2aiIB',
											name: 'Fuel the Engine',
											description: 'Your heart burns hotter with each strike.',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'Two creatures or objects',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Reason,
														tier1: '4 fire damage',
														tier2: '6 fire damage',
														tier3: '8 fire damage'
													})
												),
												FactoryLogic.createAbilitySectionText('Gain 1 surge that you can use immediately.'),
												FactoryLogic.createAbilitySectionSpend({
													effect: 'For each enemy you kill with this ability, regain Stamina equal to 5 + your Reason score.',
													value: 2
												})
											]
										})
									}),
									value: 1
								}
							]
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			selected: false,
			abilities: []
		},
		{
			id: 'R7zJXR3bkJBsMMlP',
			name: 'Smokewight',
			description: 'You are at once everywhere and nowhere. You slip through the grasp of your foes and you cannot be pinned down.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'Jx8AcVTauHPBKCxS',
							selected: [ 'Escape Artist' ]
						}),
						FactoryLogic.feature.createPackageContent({
							id: 'ErWk8f3OqP3RYNJn',
							name: 'Backdraft',
							description: 'While you are enkindled, when you pull a creature, you ignore their stability, and when you force move a creature, the distance of the move gains a +1 bonus.',
							tag: 'Enkindle'
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'Xyfrt3SQO1Lx52rl',
							name: 'The Soul is in the Breath',
							description: 'In combat, you can’t suffocate and you gain an edge on the Escape Grab maneuver. Out of combat, you can hold your breath for a number of minutes equal to twice your Reason score, and while you hold your breath, you can turn your body to dense smoke. While in this form, you move through gaps as if you were size 1T, you can hover, and you don’t take damage from falling.'
						}),
						FactoryLogic.feature.createChoice({
							id: 'cS6etUqiiyIoRNd4',
							name: '2nd-Level Smokewight Ability',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'Oy7AuSc53Nyo0pR2',
											name: 'Choking Soot',
											description: 'The blackened sky grants you a vision: your foes reduced to ash.',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Magic ],
											distance: [ FactoryLogic.distance.createSelf() ],
											target: 'Self',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionText('Until the end of the encounter, soot falls from the sky. You and each ally gain an edge on tests that use the Hide skill. Enemies have fire weakness 3. If an enemy is grabbed, they have fire weakness 7.')
											]
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'Oy7AuSc53Nyo0pRj',
											name: 'Vortex in the Smog',
											description: 'Draw them in, then slip out.',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
											distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
											target: 'All enemies',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Agility,
														tier1: 'Pull 3; M < [weak], restrained (EoT)',
														tier2: 'Pull 5; M < [average], restrained (EoT)',
														tier3: 'Pull 7; M < [strong], restrained (EoT)'
													})
												),
												FactoryLogic.createAbilitySectionText('You can shift up to your speed. If you end the movement with cover or concealment, you are hidden.'),
												FactoryLogic.createAbilitySectionSpend({
													effect: 'For every additional 2 spark you spend, the potency is increased by 1 and the size of the burst is increased by 1.',
													value: 2,
													repeatable: true
												})
											]
										})
									}),
									value: 1
								}
							]
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			selected: false,
			abilities: []
		}
	],
	level: 1,
	characteristics: []
};

// #endregion

// #region Kits

const hawthorn: Kit = {
	id: 'b6M3EJI16GGBBOnS',
	name: 'Hawthorn',
	description: 'Your talismans grant you the ability to ensnare, burden, and wrest vitality out of your victims.',
	type: 'Kiln',
	armor: [],
	weapon: [],
	stamina: 0,
	speed: 0,
	stability: 0,
	meleeDamage: null,
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'LfpLq2z0MdHLluQs',
				name: 'Put Down Roots',
				description: 'Unwavering in the storm.',
				type: FactoryLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Magic, AbilityKeyword.Area ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
				target: 'Self',
				sections: [
					FactoryLogic.createAbilitySectionText('Until the start of your next turn, your stability is increased by 2. You and allies in the area each gain 1 surge and can spend a Recovery.'),
					FactoryLogic.createAbilitySectionField({
						name: 'Enkindled',
						effect: 'Allies in the area gain temporary Stamina equal to twice your stability.'
					}),
					FactoryLogic.createAbilitySectionSpend({
						effect: 'For each spark you spend, the burst’s size is increased by 1 and your stability is further increased by 1 until the start of your next turn, which increases the temporary Stamina gained by affected allies.'
					})
				]
			})
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'cYrUy8SoUpCBmQvT',
				name: 'Untame the Land',
				description: 'Your talismans imbue you with a vivid memory of the wode before war or time.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
				target: 'All enemies',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '2 poison damage',
							tier2: '3 poison damage; pull 1',
							tier3: '4 poison damage; pull 1; restrained (EoT)'
						})
					),
					FactoryLogic.createAbilitySectionField({
						name: 'Enkindled',
						effect: 'The pull effect on tier 2 and tier 3 outcomes changes to vertical pull and the distance of the pull is increased by your Reason.'
					})
				]
			})
		}),
		FactoryLogic.feature.create({
			id: 'Rh3THhEfz7wQfVYR',
			name: 'Hawthorn Stoke the Flame Effects',
			description: `
| Talisman | Stoke the Flame Effect |
| :--- | :--- |
| Berkanan | The ability gains an edge. An enemy within 2 squares of one of the targets of the ability is grabbed by a target of the ability. The grab cannot be ended by the grabber. |
| Eihwaz | The target gains a surge, which they can use immediately. If the target uses 3 or more surges to increase the damage of the ability, the target of the ability is dazed (EoT) or bleeding (save ends), your choice. |
| Thurisaz | After using the ability, the target can end one condition or effect on them that is ended by a saving throw or that ends at the end of their turn. |`
		})
	]
};

const hazel: Kit = {
	id: 'MvZbaWiYbk9GfvEI',
	name: 'Hazel',
	description: 'Your talismans grant you the ability to anticipate the future and discern illusion from reality.',
	type: 'Kiln',
	armor: [],
	weapon: [],
	stamina: 0,
	speed: 0,
	stability: 0,
	meleeDamage: null,
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'LfpLq2z0MdHLluQs',
				name: 'Shiver with Anticipation',
				description: 'Remove the cause, but not the symptom.',
				type: FactoryLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Magic, AbilityKeyword.Area ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
				target: 'All enemies',
				sections: [
					FactoryLogic.createAbilitySectionText('The next strike against each target gains an edge and each target is additionally I < [weak] weakened (save ends).'),
					FactoryLogic.createAbilitySectionField({
						name: 'Enkindled',
						effect: 'You or an ally in the area can make a melee free strike.'
					}),
					FactoryLogic.createAbilitySectionSpend({
						effect: 'For each spark you spend, the burst’s size is increased by 1 and the potency is increased by 1.'
					})
				]
			})
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'cYrUy8SoUpCBmQvT',
				name: 'Peer Beyond the Veil',
				description: 'The line between what is and what will be has never been clearer.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
				target: 'All enemies',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionText('Targets of this ability do not need to be within line of effect. Hidden enemies in the area are automatically revealed.'),
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '2 psychic damage',
							tier2: '3 psychic damage; you can shift 1 square',
							tier3: '4 psychic damage; you can shift up to 2 squares'
						})
					),
					FactoryLogic.createAbilitySectionField({
						name: 'Enkindled',
						effect: 'You can teleport instead of shift, and you do not need line of effect to your destination. If you teleport to a space adjacent to any allies, one of the allies can make a free strike.'
					})
				]
			})
		}),
		FactoryLogic.feature.create({
			id: 'Rh3THhEfz7wQfVYR',
			name: 'Hazel Stoke the Flame Effects',
			description: `
| Talisman | Stoke the Flame Effect |
| :--- | :--- |
| Dagaz | All targets of the ability are R < [average] weakened (EoT). If the target is hidden, the ability deals extra psychic damage equal to twice your Reason score to one creature it is targeting. |
| Laguz | The target gains a surge, which they can use immediately. If the target uses 3 or more surges to increase the damage of the ability, the ability roll is a critical hit on double rolled values (e.g. two 6s) instead of 19 or higher. |
| Kaunan | The ability gains an edge. If the ability is made with a double edge against a creature that is frightened or weakened, then the target gains 1 Heroic Resource after resolving the ability. |`
		})
	]
};

const rosewood: Kit = {
	id: 'YUeKPGgxBP5aFXN2',
	name: 'Rosewood',
	description: 'Your talismans grant you the ability to amplify and echo your allies, and terrify your enemies.',
	type: 'Kiln',
	armor: [],
	weapon: [],
	stamina: 0,
	speed: 0,
	stability: 0,
	meleeDamage: null,
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'U8WMZZ8xUUZ9MWSU',
				name: 'Speed of Sound',
				description: 'In a clap of thunder, you flash across the battlefield, your poised form burned into the eyes of your foes.',
				type: FactoryLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Magic, AbilityKeyword.Area ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
				target: 'All enemies',
				sections: [
					FactoryLogic.createAbilitySectionText('You teleport up to 3 squares. In the square you teleport from, you leave an afterimage that lasts until the end of the round. All targets are taunted by the afterimage. You can push one creature you are adjacent to after you teleport a number of squares equal to the distance you teleported.'),
					FactoryLogic.createAbilitySectionField({
						name: 'Enkindled',
						effect: 'Until the end of the round, as a free triggered action, after you use an ability, you can swap places with your afterimage.'
					}),
					FactoryLogic.createAbilitySectionSpend({
						effect: 'You teleport 1 additional square for each spark you spend.'
					})
				]
			})
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'LLgH22ZsPAiFzzOu',
				name: 'Resonate',
				description: 'Your talismans imbue you with the resonance of a hollow trunk reaching up from the Undermind.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
				target: 'All enemies',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '2 sonic damage',
							tier2: '3 sonic damage; R < [average], slowed (save ends)',
							tier3: '4 sonic damage; R < [strong], slowed (save ends)'
						})
					),
					FactoryLogic.createAbilitySectionField({
						name: 'Enkindled',
						effect: 'You can replace the slowed effect with restrained (save ends) for one target.'
					})
				]
			})
		}),
		FactoryLogic.feature.create({
			id: 'vjgm8AHumnc3qfdG',
			name: 'Rosewood Stoke the Flame Effects',
			description: `
| Talisman | Stoke the Flame Effect |
| :--- | :--- |
| Gebo | The target gains temporary Stamina equal to your Reason score, or equal to 5 + your level if the ability has a double edge. |
| Othalan | The target gains a surge, which they can use immediately. If the target uses 3 or more surges to increase the damage of the ability, they can additionally make a free strike after the ability. |
| Uruz | The ability gains an edge. All enemies adjacent to the target are P < [average] frightened of the target (EoT). Enemies who are already slowed automatically fail to resist the potency. |`
		})
	]
};

// #endregion

// #region Perks

const aConversationWithFire: Perk = {
	id: '5wkxbUTj0F8JUfO2',
	name: 'A Conversation With Fire',
	description: `
*Kilns only*

When you spend 1 uninterrupted minute in front of a fire, you can speak the name of another creature. If that creature is willing to speak to you, their image appears in the fire, and they can see you before them in a shimmering ball of light. The two of you can speak to each other through these images as if you were together in person. As a maneuver, you or the creature can end the conversation.`,
	type: FeatureType.Text,
	data: null,
	list: PerkList.Special
};

const burntOutArtisan: Perk = {
	id: 'dHjsVbGZQUGgDJdS',
	name: 'Burnt Out Artisan',
	description: `
*Kilns only*

When you make a project roll using a skill from the crafting skill group, you can choose to gain 30 project points instead of the total of your roll. After doing this, you cannot achieve a breakthrough on any subsequent project roll (ever!) until you complete the Spend Time With Loved Ones activity (see <u>Downtime Activities</u> in the Core Rules).`,
	type: FeatureType.Text,
	data: null,
	list: PerkList.Special
};

const hotBox: Perk = {
	id: '6IWjRGECdMfbsvFo',
	name: 'Hot Box',
	description: `
*Kilns only*

You can quickly fill a room with the smoke of an incense that dulls the mind and lifts the spirit. When interacting with a living humanoid or animal in an enclosed space no larger than a small room, you treat your Renown as 1 higher than usual, you gain an edge on Reason tests made to interact with them, and without the use of magic, they cannot tell when you are lying.`,
	type: FeatureType.Text,
	data: null,
	list: PerkList.Special
};

const ifYouCantStandTheHeat: Perk = {
	id: 'tmATKmf0NIKZHFKU',
	name: 'If You Can’t Stand the Heat',
	description: `
*Kilns only*

You gain a +2 bonus to the Perfect New Recipe project roll (see Downtime Activities in the Core Rules). You additionally know the following recipes:

| Type of Recipe | Item Prerequisites | Benefits |
| :--- | :--- | :--- |
| Flame Broiled | Aromatic ingredients (onions, ginger, garlic, mustard seeds, and so forth) | Soulful |
| Spiced Up | Spicy ingredients (dragon chilis, cumin, khemharan peppercorns, and so forth) | Warming |

**Soulful:** The creature can choose to have their abilities deal psychic damage instead of any other type of damage. Additionally, when the creature uses a damage dealing ability while they are dying, they deal bonus damage equal to their level.
**Warming:** The creature has cold immunity equal to their level. Additionally, when the creature obtains a tier 3 outcome on the power roll of a damage-dealing ability, they can deal an extra 1d3 rolled fire damage.`,
	type: FeatureType.Text,
	data: null,
	list: PerkList.Special
};

const itIsTheSoulWhichHears: Perk = {
	id: 'Ycnl3YBDuUFg7uar',
	name: 'It Is the Soul Which Hears',
	description: `
*Kilns only*

You can speak with and understand animals, beasts, and plant creatures, even if they don’t share a language with you. Your ability to communicate with these creatures doesn’t make them inherently more intelligent, but you can use Reason instead of Presence while making tests to influence them.

Additionally, you can touch a living plant that is not a plant creature to communicate with it telepathically. You can use words to communicate with the plant, but it communicates with you only by transmitting feelings and sensations that can’t be overly specific.`,
	type: FeatureType.Text,
	data: null,
	list: PerkList.Special
};

const siftThroughTheAshesOfMemory: Perk = {
	id: 'kBb2ohe3iTiaQTn0',
	name: 'Sift Through the Ashes of Memory',
	description: `
*Kilns only*

You gain the following downtime activity (see <u>Downtime Activities</u> in the Core Rules).

### Sift Through the Ashes of Memory

**Item Prerequisite:** None
**Project Source:** None
**Project Roll Characteristic:** Reason, Intuition, or Presence
**Project Goal:** Varies

You and an ally you are respiting with both do this downtime activity together. You meditate upon the soul of a late ancestor of either of you, reflecting upon their remnant memories stored in the Undermind’s roots. You must be able to touch a tree rooted in the manifold the ancestor dies in to access their memories. The project roll for this project has the following changes:

* The project points earned by your roll represent the depth to which you are able to dive into the ancestor’s memories.
* During each respite when you and an ally undertake this activity, you both continue making alternating project rolls until one of you rolls a tier 1 outcome (indicating you stumbled into a corrupted memory, earning you no points). The other hero can make one final roll and if they roll a breakthrough, you both can continue (indicating they pulled you out of the corrupted memory).
* When you’ve made your last Sift Through the Ashes of Memory project roll for the respite, you both spend your shared project points you accrued on a reward from the Ancestral Experience table. Any points you don’t spend during the current respite are lost.

### Ancestral Experience

| Reward | Cost | Effect |
| :--- | :--- | :--- |
| The Little Moments | 80 | One of you gains the **A Day in the Life** benefit. |
| Sword Arm of an Ancestor | 130 | One of you gains the **Muscle Memory** benefit. |
| How Long Were We Out? | 150 | One of you gains the **Deep Dreamer** title and benefit. |
| Souls Melded | 330 | You both gain the **Of A Single Soul** title and benefit. |

**A Day in the Life:** Until your next respite, gain the skills and edges on tests made with those skills of one of the careers of the ancestor whose memory you meditated on.

**Muscle Memory:** Until your next respite, you can use and gain the benefits of kits. If you can already use kits, you can gain an extra signature ability and the use of the equipment from one additional kit (you do not gain the kit’s bonuses, except as they are already applied to the signature ability).

**Deep Dreamer:** You gain an edge on Sifting Through the Ashes of Memory project rolls.

**Of A Single Soul:** You can use the surges belonging to any ally who has this title as if they were your own.`,
	type: FeatureType.Text,
	data: null,
	list: PerkList.Special
};

const smokemellier: Perk = {
	id: 'gxz88O3tENyXCkJB',
	name: 'Smokemellier',
	description: `
*Kilns only*

You can detect smoke from all fires within 1 mile of you, and with some concentration, you can infer the material of every thing that each fire has burned so far, no matter how long the fire has been burning. The exact level of detail is left to your Director. You cannot determine which smoke belongs to which fire unless you can see the fire in person.`,
	type: FeatureType.Text,
	data: null,
	list: PerkList.Special
};

const soulsworn: Perk = {
	id: 'pgCtSVhZsjC7I6dE',
	name: 'Soulsworn',
	description: `
*Kilns only*

Each time you finish a respite, you can choose one ally to be your soulsworn. If you spend at least 10 minutes focusing, you can teleport your soulsworn to your side from anywhere within a mile, as long as neither you nor your soulsworn are in combat.`,
	type: FeatureType.Text,
	data: null,
	list: PerkList.Special
};

const tendrilsOfTheUndermind: Perk = {
	id: 'ZM9JhmiD9C2aNJNO',
	name: 'Tendrils of the Undermind',
	description: `
*Kilns only*

Your connection with the Undermind lets you share senses with it. You can search for hidden creatures as a free maneuver once on each of your turns. Creatures within distance of your Stoke the Flame ability are automatically found when you search. Additionally, you gain the following ability.`,
	type: FeatureType.Multiple,
	data: {
		features: [
			FactoryLogic.feature.create({
				id: '5lGBjTkoXelkOmYd',
				name: 'Tendrils of the Undermind',
				description: 'Your connection with the Undermind lets you share senses with it. You can search for hidden creatures as a free maneuver once on each of your turns. Creatures within distance of your Stoke the Flame ability are automatically found when you search.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'J9Q4GZyz56Qqxw1e',
					name: 'Tendrils of the Undermind',
					description: '',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.createSelf() ],
					target: 'Self',
					sections: [
						FactoryLogic.createAbilitySectionText('Until the end of the round, your Stoke the Flame ability gains a distance bonus of +5 and you don’t need line of effect to target allies with your Stoke the Flame ability.')
					]
				})
			})
		]
	},
	list: PerkList.Special
};

const undermindTask: Perk = {
	id: 'WKBv7e1HgHgB4Ngc',
	name: 'Undermind Task',
	description: `
*Kilns only*

You've chosen to take on a task from the Undermind. Once you complete the task, gain a kiln perk of your choice.`,
	type: FeatureType.Text,
	data: null,
	list: PerkList.Special
};

const woodenFamiliar: Perk = {
	id: 'boRZ9rIWGa6h2DNJ',
	name: 'Wooden Familiar',
	description: `
*Kilns only*

You instill the embers of a friendly creature’s soul into a carving. As a respite activity, given a sufficient supply of wood, you can create a wooden familiar. You can only have one wooden familiar at a time.

Create the stat block of your familiar yourself by beginning with the Animal, Big Animal A, or Predator A stat block (see the Monsters book of the Core Rules) and adding traits that total in cost up to a number of points equal to 2 plus your Reason score. The familiar also has fire weakness 3. You can change the stat block of your familiar as a respite activity.

Your new wooden familiar is your retainer, but has no Recoveries and cannot regain Stamina by any means except by taking a respite. Additionally, your wooden familiar loses all its Stamina if it is submerged in water, as its inner flame is snuffed out.`,
	type: FeatureType.Text,
	data: null,
	list: PerkList.Special
};

// #endregion

export const lookOut: Sourcebook = {
	id: 'look-out',
	name: 'Look Out Behind You Studios',
	description: `
Third-party content from Look Out Behind You Studios.

[The Kiln crowdfunder](https://www.backerkit.com/call_to_action/5c146898-9aae-4593-af4d-9e916b1b5121/landing) is live until Feb 5th.`,
	type: SourcebookType.ThirdParty,
	adventures: [],
	ancestries: [],
	careers: [],
	complications: [],
	cultures: [],
	classes: [
		kiln
	],
	domains: [],
	encounters: [],
	imbuements: [],
	items: [],
	kits: [
		hawthorn,
		hazel,
		rosewood
	],
	monsterGroups: [],
	montages: [],
	negotiations: [],
	perks: [
		aConversationWithFire,
		burntOutArtisan,
		hotBox,
		ifYouCantStandTheHeat,
		itIsTheSoulWhichHears,
		siftThroughTheAshesOfMemory,
		smokemellier,
		soulsworn,
		tendrilsOfTheUndermind,
		undermindTask,
		woodenFamiliar
	],
	projects: [],
	subclasses: [],
	tacticalMaps: [],
	terrain: [],
	titles: [],
	skills: [],
	languages: []
};
