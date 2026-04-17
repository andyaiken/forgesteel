import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { HeroClass } from '@/models/class';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { PerkList } from '@/enums/perk-list';
import { SkillList } from '@/enums/skill-list';
import { guardian } from '@/data/classes/beastheart/guardian';
import { prowler } from '@/data/classes/beastheart/prowler';
import { punisher } from '@/data/classes/beastheart/punisher';
import { spark } from '@/data/classes/beastheart/spark';

const basilisk = FactoryLogic.createSummon({
	monster: FactoryLogic.createMonster({
		id: 'beastheart-1-2a-1',
		name: 'Basilisk',
		level: 0,
		role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
		keywords: [ 'Beast', 'Companion' ],
		encounterValue: 0,
		size: FactoryLogic.createSize(1, 'L'),
		speed: FactoryLogic.createSpeed(5),
		stamina: 0,
		stability: 2,
		freeStrikeDamage: 1,
		characteristics: FactoryLogic.createCharacteristics(2, 1, -1, 2, 2),
		features: [
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-1-1',
				field: FeatureField.Stamina,
				valueFromController: FeatureField.Stamina
			}),
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-1-2',
				field: FeatureField.FreeStrikeDamage,
				valueCharacteristics: [ Characteristic.Might ]
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'beastheart-1-2a-1-3',
				modifiers: [
					FactoryLogic.damageModifier.create({
						damageType: DamageType.Poison,
						modifierType: DamageModifierType.Immunity,
						value: 3
					})
				]
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'beastheart-1-2a-1-4',
					name: 'Petrify',
					description: 'Transfixed by the basilisk’s magical gaze or poisoned claws, the foe’s body begins to calcify.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Companion, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
					distance: [
						FactoryLogic.distance.createMelee(),
						FactoryLogic.distance.createRanged(5)
					],
					target: 'One enemy',
					sections: [
						FactoryLogic.createAbilitySectionText('The target takes corruption damage equal to 3 + the basilisk’s Might score and is stoned (save ends) (see Stoned).'),
						FactoryLogic.createAbilitySectionSpend({
							effect: 'While stoned this way, the target is also slowed.'
						})
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'beastheart-1-2a-1-5',
				name: 'Stoned',
				description: 'A stoned creature is magically turning to stone. Each time a creature fails the saving throw to end this effect, they take corruption damage equal to the basilisk’s Might score. A stoned creature or a creature adjacent to them can use a maneuver to cut the encroaching stone from the stoned target’s body, ending the effect and dealing damage to the target equal to twice the basilisk’s Might score that can’t be reduced in any way. A creature reduced to 0 Stamina while they are stoned, or by an ability that causes a creature to become stoned, is turned to stone until they are restored to life by magical means.'
			})
		]
	}),
	isSignature: false,
	cost: 0,
	count: 1,
	level3: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-1-3-1',
			name: 'Foes Forever Frozen',
			description: 'Whenever the basilisk makes a strike against a creature while rampaging, the target is stoned (save ends).'
		})
	],
	level6: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-1-6-1',
			name: 'Rock Smasher',
			description: 'Whenever you deal rolled damage to a stoned creature while the basilisk is rampaging, you deal extra damage equal to twice your Might score.'
		})
	],
	level10: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-1-10-1',
			name: 'Heart of Stone',
			description: 'While the basilisk is rampaging, you and the basilisk have damage immunity 10 as you become nearly impervious living statues.'
		})
	]
});

const bear = FactoryLogic.createSummon({
	monster: FactoryLogic.createMonster({
		id: 'beastheart-1-2a-2',
		name: 'Bear',
		level: 0,
		role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
		keywords: [ 'Animal', 'Companion' ],
		encounterValue: 0,
		size: FactoryLogic.createSize(1, 'L'),
		speed: FactoryLogic.createSpeed(5, 'climb'),
		stamina: 0,
		stability: 2,
		freeStrikeDamage: 1,
		characteristics: FactoryLogic.createCharacteristics(2, 1, -1, 2, 2),
		features: [
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-2-1',
				field: FeatureField.Stamina,
				valueFromController: FeatureField.Stamina
			}),
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-2-2',
				field: FeatureField.FreeStrikeDamage,
				valueCharacteristics: [ Characteristic.Might ]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'beastheart-1-2a-2-3',
				selected: [ 'Intimidate' ]
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'beastheart-1-2a-2-4',
					name: 'Backhand',
					description: 'The bear casually swats the pesky foe into next week.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
					distance: [ FactoryLogic.distance.createMelee() ],
					target: 'One creature or object',
					sections: [
						FactoryLogic.createAbilitySectionText('The target takes damage equal to 4 + the bear’s Might score and is pushed up to 2 squares'),
						FactoryLogic.createAbilitySectionSpend({
							effect: 'The target is force moved up to a number of additional squares equal to the bear’s Might score.'
						})
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'beastheart-1-2a-2-5',
				name: 'Strong Like Bear',
				description: 'You gain a +1 bonus to your stability.'
			})
		]
	}),
	isSignature: false,
	cost: 0,
	count: 1,
	level3: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-2-3-1',
			name: 'Foe Thresher',
			description: 'Whenever the bear targets a creature with a strike that doesn’t impose forced movement while rampaging, the bear can push the target up to a number of squares equal to the bear’s Might score.'
		})
	],
	level6: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-2-6-1',
			name: 'Ursine Form',
			description: 'While the bear is rampaging, you have damage immunity 5 and your size increases to the bear’s size (to a maximum of 2). If you don’t have enough unoccupied space to grow, you grow as soon as there is sufficient space.'
		})
	],
	level10: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-2-10-1',
			name: 'Twin Colossi',
			description: 'While the bear is rampaging, you gain a +1 bonus to distance with melee weapon abilities, your size increases to match the bear’s size (to a maximum of 3), and your strikes deal an extra 5 damage.'
		})
	]
});

const boar = FactoryLogic.createSummon({
	monster: FactoryLogic.createMonster({
		id: 'beastheart-1-2a-3',
		name: 'Boar',
		level: 0,
		role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
		keywords: [ 'Animal', 'Companion' ],
		encounterValue: 0,
		size: FactoryLogic.createSize(1, 'M'),
		speed: FactoryLogic.createSpeed(5),
		stamina: 0,
		stability: 2,
		freeStrikeDamage: 1,
		characteristics: FactoryLogic.createCharacteristics(2, 1, -1, 2, 2),
		features: [
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-3-1',
				field: FeatureField.Stamina,
				valueFromController: FeatureField.Stamina
			}),
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-3-2',
				field: FeatureField.FreeStrikeDamage,
				valueCharacteristics: [ Characteristic.Might ]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'beastheart-1-2a-3-3',
				selected: [ 'Search' ]
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'beastheart-1-2a-3-4',
					name: 'Gore',
					description: 'With an enraged snort, the boar lunges forward to rip open foes with their tusks.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
					distance: [ FactoryLogic.distance.createMelee() ],
					target: 'One creature or object',
					sections: [
						FactoryLogic.createAbilitySectionText('The boar moves up to their speed in a straight line. When this movement ends, they can deal damage equal to 3 + their Might score to an adjacent target. If the boar moved closer to the target as part of this movement, the boar deals extra damage equal to their Might score.'),
						FactoryLogic.createAbilitySectionSpend({
							effect: 'The target is bleeding until the end of their next turn.'
						})
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'beastheart-1-2a-3-5',
				name: 'Spiteful Endurance',
				description: 'While the boar is winded, they have damage immunity equal to their Might score and ignore the effects of bleeding.'
			})
		]
	}),
	isSignature: false,
	cost: 0,
	count: 1,
	level3: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-3-3-1',
			name: 'Greased Pig',
			description: 'While the boar is rampaging, they have a +2 bonus to speed and a double edge on the Escape Grab maneuver.'
		})
	],
	level6: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-3-6-1',
			name: 'Wild Rush',
			description: 'While the boar is rampaging, you can use their Gore maneuver, and you and the boar can shift instead of move when using the Charge action or the Gore maneuver.'
		})
	],
	level10: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-3-10-1',
			name: 'Immortal Rage',
			description: 'Whenever you or the boar use an ability that deals damage while the boar is rampaging, you gain 10 temporary Stamina.'
		})
	]
});

const condor = FactoryLogic.createSummon({
	monster: FactoryLogic.createMonster({
		id: 'beastheart-1-2a-4',
		name: 'Condor',
		level: 0,
		role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
		keywords: [ 'Animal', 'Companion' ],
		encounterValue: 0,
		size: FactoryLogic.createSize(1, 'M'),
		speed: FactoryLogic.createSpeed(7, 'fly'),
		stamina: 0,
		stability: 0,
		freeStrikeDamage: 1,
		characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
		features: [
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-4-1',
				field: FeatureField.Stamina,
				valueFromController: FeatureField.Stamina
			}),
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-4-2',
				field: FeatureField.FreeStrikeDamage,
				valueCharacteristics: [ Characteristic.Might ]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'beastheart-1-2a-4-3',
				selected: [ 'Alertness' ]
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'beastheart-1-2a-4-4',
					name: 'Flurry of Wings',
					description: 'I can’t draw a bead on them with that infernal bird flapping in my face!',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
					distance: [ FactoryLogic.distance.createMelee() ],
					target: 'One enemy',
					sections: [
						FactoryLogic.createAbilitySectionText('The target takes damage equal to 3 + the condor’s Might score. Additionally, enemies are weakened while adjacent to the condor until the end of your next turn.'),
						FactoryLogic.createAbilitySectionSpend({
							effect: 'An enemy who would be weakened by this ability is taunted instead.'
						})
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'beastheart-1-2a-4-5',
				name: 'Moving Target',
				description: 'While the condor is flying and has a speed greater than 0, ranged strikes against them take a bane.'
			})
		]
	}),
	isSignature: false,
	cost: 0,
	count: 1,
	level3: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-4-3-1',
			name: 'Dive Bomb',
			description: 'Whenever the condor makes a strike while rampaging, they deal extra damage equal to the number of squares they’ve moved on their turn (to a maximum of 5).'
		})
	],
	level6: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-4-6-1',
			name: 'Borne Aloft',
			description: 'While the condor is rampaging, you gain wings and can fly. While flying, you gain a +2 bonus to speed. If you are midair when the condor’s rampage ends, you take no damage from the fall.'
		})
	],
	level10: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-4-10-1',
			name: 'Flight of the Condor',
			description: 'While the condor is rampaging, you and the condor gain a +5 bonus to speed.'
		})
	]
});

const deinonychus = FactoryLogic.createSummon({
	monster: FactoryLogic.createMonster({
		id: 'beastheart-1-2a-5',
		name: 'Deinonychus',
		level: 0,
		role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
		keywords: [ 'Animal', 'Companion' ],
		encounterValue: 0,
		size: FactoryLogic.createSize(1, 'M'),
		speed: FactoryLogic.createSpeed(7),
		stamina: 0,
		stability: 1,
		freeStrikeDamage: 1,
		characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
		features: [
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-5-1',
				field: FeatureField.Stamina,
				valueFromController: FeatureField.Stamina
			}),
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-5-2',
				field: FeatureField.FreeStrikeDamage,
				valueCharacteristics: [ Characteristic.Might ]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'beastheart-1-2a-5-3',
				selected: [ 'Track' ]
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'beastheart-1-2a-5-4',
					name: 'Terrible Claws',
					description: 'The deinonychus kicks their prey, slashing them with their wicked claws.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
					distance: [ FactoryLogic.distance.createMelee() ],
					target: 'One enemy',
					sections: [
						FactoryLogic.createAbilitySectionText('The target takes damage equal to 3 + the deinonychus’s Might score, and if they have M < [average], they are bleeding until the end of their next turn'),
						FactoryLogic.createAbilitySectionSpend({
							effect: 'A target who has M < [strong] is bleeding (save ends).'
						})
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'beastheart-1-2a-5-5',
				name: 'Blood Frenzy',
				description: 'Whenever the deinonychus deals damage to a bleeding creature, they gain 1 surge.'
			})
		]
	}),
	isSignature: false,
	cost: 0,
	count: 1,
	level3: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-5-3-1',
			name: 'Tear You to Ribbons',
			description: 'Whenever the deinonychus makes a strike against a creature while rampaging, the target is bleeding until the end of their next turn.'
		})
	],
	level6: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-5-6-1',
			name: 'Slake my Thirst in Blood',
			description: 'Whenever you use an ability that deals rolled damage to a bleeding creature while the deinonychus is rampaging, you gain 2 surges.'
		})
	],
	level10: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-5-10-1',
			name: 'Reaping Scythe',
			description: 'The deinonychus’s claws slash at creatures underfoot. When the deinonychus moves adjacent to an enemy or enters an enemy’s space for the first time on a turn while rampaging, the deinonychus deals damage to that enemy equal to the deinonychus’s Might score.'
		})
	]
});

const drake = FactoryLogic.createSummon({
	monster: FactoryLogic.createMonster({
		id: 'beastheart-1-2a-6',
		name: 'Drake',
		level: 0,
		role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
		keywords: [ 'Companion', 'Dragon' ],
		encounterValue: 0,
		size: FactoryLogic.createSize(1, 'M'),
		speed: FactoryLogic.createSpeed(5, 'fly'),
		stamina: 0,
		stability: 1,
		freeStrikeDamage: 1,
		characteristics: FactoryLogic.createCharacteristics(2, 1, -1, 2, 2),
		features: [
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-6-1',
				field: FeatureField.Stamina,
				valueFromController: FeatureField.Stamina
			}),
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-6-2',
				field: FeatureField.FreeStrikeDamage,
				valueCharacteristics: [ Characteristic.Might ]
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'beastheart-1-2a-6-3',
					name: 'Drake Breath',
					description: 'The drake exhales a blast of flesh-melting energy.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Companion, AbilityKeyword.Area ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 1 }) ],
					target: 'Each creature in the area',
					sections: [
						FactoryLogic.createAbilitySectionText('The target takes damage of the drake’s attuned damage type (see Elementally Attuned) equal to the drake’s Might score.'),
						FactoryLogic.createAbilitySectionSpend({
							repeatable: true,
							effect: 'This ability affects a 3 cube (if you spend 1 ferocity) or a 4 cube (if you spend 2 ferocity) within 1.'
						})
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'beastheart-1-2a-6-4',
				name: 'Elementally Attuned',
				description: 'When you gain this companion, you choose their attuned damage type from acid, cold, corruption, fire, lightning, poison, or sonic. The drake’s attuned damage type affects their other features.'
			}),
			FactoryLogic.feature.create({
				id: 'beastheart-1-2a-6-5',
				name: 'Shared Immunity',
				description: 'You have immunity 3 to the drake’s attuned damage type.'
			})
		]
	}),
	isSignature: false,
	cost: 0,
	count: 1,
	level3: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-6-3-1',
			name: 'Endless Breath',
			description: 'The drake’s Drake Breath maneuver deals an extra 2 damage.'
		})
	],
	level6: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-6-6-1',
			name: 'A Burning Inside Me',
			description: 'While the drake is rampaging, you gain draconic wings and can fly. If you are midair when the drake’s rampage ends, you take no damage from the fall. Additionally, you can use the drake’s Drake Breath maneuver until their rampage ends'
		})
	],
	level10: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-6-10-1',
			name: 'Elemental Avatar',
			description: 'While the drake is rampaging, you and the drake have immunity all to the drake’s attuned damage type, and whenever you or the drake make a strike against a creature you can cause the target to be dragonsealed (save ends). A dragonsealed creature has weakness 10 to the drake’s attuned damage type.'
		})
	]
});

const elementalSpark = FactoryLogic.createSummon({
	monster: FactoryLogic.createMonster({
		id: 'beastheart-1-2a-6b',
		name: 'Elemental Spark',
		level: 0,
		role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
		keywords: [ 'Companion', 'Elemental' ],
		encounterValue: 0,
		size: FactoryLogic.createSize(1, 'M'),
		speed: FactoryLogic.createSpeed(7),
		stamina: 0,
		stability: 1,
		freeStrikeDamage: 1,
		characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
		features: [
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-6b-1',
				field: FeatureField.Stamina,
				valueFromController: FeatureField.Stamina
			}),
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-6b-2',
				field: FeatureField.FreeStrikeDamage,
				valueCharacteristics: [ Characteristic.Might ]
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'beastheart-1-2a-6b-3',
				modifiers: [
					FactoryLogic.damageModifier.create({
						damageType: DamageType.Lightning,
						modifierType: DamageModifierType.Immunity,
						value: 3
					})
				]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'beastheart-1-2a-6b-4',
				selected: [ 'Magic' ]
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'beastheart-1-2a-6b-5',
					name: 'Static Shock',
					description: 'An arc of lightning crackles from the spark.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Companion, AbilityKeyword.Magic, AbilityKeyword.Melee ],
					distance: [ FactoryLogic.distance.createMelee() ],
					target: 'One creature or object',
					sections: [
						FactoryLogic.createAbilitySectionText('The target takes lightning damage equal to 2 + the spark’s Might score.'),
						FactoryLogic.createAbilitySectionSpend({
							effect: 'The distance increases to melee 5.'
						})
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'beastheart-1-2a-6b-6',
				name: 'Electric Surge',
				description: 'The first time on a turn that you or the spark deal lightning damage, you gain 1 surge.'
			})
		]
	}),
	isSignature: false,
	cost: 0,
	count: 1,
	level3: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-6b-3-1',
			name: 'Electroshock',
			description: 'Whenever the spark makes a strike against a creature while rampaging, they can cause a target who has M < [average] to be dazed until the end of the target’s next turn.'
		})
	],
	level6: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-6b-6-1',
			name: 'Conductive',
			description: 'While the spark is rampaging, lightning sings through your blood, and whenever you make a strike against a creature, you deal extra lightning damage equal to your Might score.'
		})
	],
	level10: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-6b-10-1',
			name: 'Lightning Speed',
			description: 'While the spark is rampaging, you and the spark can shift up to your speed as a free maneuver once on each of your turns.'
		})
	]
});

const gummyBall = FactoryLogic.createSummon({
	monster: FactoryLogic.createMonster({
		id: 'beastheart-1-2a-7',
		name: 'Gummy Ball',
		level: 0,
		role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
		keywords: [ 'Companion', 'Ooze' ],
		encounterValue: 0,
		size: FactoryLogic.createSize(1, 'L'),
		speed: FactoryLogic.createSpeed(5),
		stamina: 0,
		stability: 2,
		freeStrikeDamage: 1,
		characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
		features: [
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-7-1',
				field: FeatureField.Stamina,
				valueFromController: FeatureField.Stamina
			}),
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-7-2',
				field: FeatureField.FreeStrikeDamage,
				valueCharacteristics: [ Characteristic.Might ]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'beastheart-1-2a-7-2a',
				selected: [ 'Sneak' ]
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'beastheart-1-2a-7-3',
				modifiers: [
					FactoryLogic.damageModifier.create({
						damageType: DamageType.Acid,
						modifierType: DamageModifierType.Immunity,
						value: 3
					})
				]
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'beastheart-1-2a-7-4',
					name: 'Absorb',
					description: 'With a sickening squelch, the sphere oozes around their hapless prey.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
					distance: [ FactoryLogic.distance.createMelee() ],
					target: 'One enemy',
					sections: [
						FactoryLogic.createAbilitySectionText('The target takes acid damage equal to 3 + the ball’s Might score, and if they have A < [average], the ball moves into the target’s space. If the target completely fits within the ball’s space, the target is grabbed by the ball.'),
						FactoryLogic.createAbilitySectionSpend({
							effect: 'A target grabbed this way takes acid damage equal to the ball’s Might score at the end of each of the ball’s turns.'
						})
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'beastheart-1-2a-7-5',
				name: 'Gelatinous',
				description: 'The ball can occupy another creature’s space. While occupying a creature’s space, the ball has line of effect to that creature. If the creature completely fits within the ball’s space, the creature has line of effect only to the ball and creatures outside the ball don’t have line of effect to the creature. The ball’s space is difficult terrain.'
			})
		]
	}),
	isSignature: false,
	cost: 0,
	count: 1,
	level3: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-7-3-1',
			name: 'Suck it Up',
			description: 'Whenever the ball makes a strike while rampaging, one target is pulled up to 3 squares into the ball’s space. If the target ends this movement and completely fits within the ball’s space, the target is grabbed by the ball.'
		})
	],
	level6: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-7-6-1',
			name: 'A Burning Inside Me',
			description: 'While the ball is rampaging, your arms and legs become viscous and stretchy, and you gain a +2 bonus to speed and melee distance.'
		})
	],
	level10: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-7-10-1',
			name: 'Runaway Expansion',
			description: 'While the ball is rampaging, you and the ball have acid immunity 10, and whenever a creature is reduced to 0 Stamina while inside the ball, the ball’s size increases by 1 (to a maximum of 5). The ball’s size can’t increase this way more than once a turn, and the ball shrinks back to their original size when their rampage ends.'
		})
	]
});

const hellhound = FactoryLogic.createSummon({
	monster: FactoryLogic.createMonster({
		id: 'beastheart-1-2a-8',
		name: 'Hellhound',
		level: 0,
		role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
		keywords: [ 'Companion', 'Infernal' ],
		encounterValue: 0,
		size: FactoryLogic.createSize(1, 'M'),
		speed: FactoryLogic.createSpeed(7),
		stamina: 0,
		stability: 1,
		freeStrikeDamage: 1,
		characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
		features: [
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-8-1',
				field: FeatureField.Stamina,
				valueFromController: FeatureField.Stamina
			}),
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-8-2',
				field: FeatureField.FreeStrikeDamage,
				valueCharacteristics: [ Characteristic.Might ]
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'beastheart-1-2a-8-3',
				modifiers: [
					FactoryLogic.damageModifier.create({
						damageType: DamageType.Fire,
						modifierType: DamageModifierType.Immunity,
						value: 3
					})
				]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'beastheart-1-2a-8-4',
				selected: [ 'Intimidate' ]
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'beastheart-1-2a-8-5',
					name: 'Fire Breath',
					description: 'The hellhound exhales infernal flames.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee ],
					distance: [ FactoryLogic.distance.createMelee(2) ],
					target: 'One creature or object',
					sections: [
						FactoryLogic.createAbilitySectionText('The target takes fire damage equal to 3 + the hellhound’s Might score.'),
						FactoryLogic.createAbilitySectionSpend({
							effect: 'This ability gains a bonus to either its damage or distance equal to the hellhound’s Intuition score.'
						})
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'beastheart-1-2a-8-6',
				name: 'Hellish Pact',
				description: 'You have fire immunity equal to the hellhound’s fire immunity.'
			})
		]
	}),
	isSignature: false,
	cost: 0,
	count: 1,
	level3: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-8-3-1',
			name: 'Infernal Apparition',
			description: 'Whenever the hellhound makes a strike against a creature while rampaging, they can cause a target who has P < [average] to be frightened until the end of the target’s next turn.'
		})
	],
	level6: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-8-6-1',
			name: 'Mad Dog',
			description: 'While the hellhound is rampaging, your mouth foams with acidic ichor, and whenever you make a strike against a creature, you deal extra acid damage equal to your Might score.'
		})
	],
	level10: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-8-10-1',
			name: 'Wreathed in Flames',
			description: 'While the hellhound is rampaging, you and the hellhound are surrounded by an aura of flames, and each enemy who starts their turn adjacent to you or the hellhound takes fire damage equal to the hellhound’s Might score.'
		})
	]
});

const lightbender = FactoryLogic.createSummon({
	monster: FactoryLogic.createMonster({
		id: 'beastheart-1-2a-9',
		name: 'Lightbender',
		level: 0,
		role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
		keywords: [ 'Beast', 'Companion' ],
		encounterValue: 0,
		size: FactoryLogic.createSize(1, 'L'),
		speed: FactoryLogic.createSpeed(7),
		stamina: 0,
		stability: 2,
		freeStrikeDamage: 1,
		characteristics: FactoryLogic.createCharacteristics(2, 1, -1, 2, 2),
		features: [
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-9-1',
				field: FeatureField.Stamina,
				valueFromController: FeatureField.Stamina
			}),
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-9-2',
				field: FeatureField.FreeStrikeDamage,
				valueCharacteristics: [ Characteristic.Might ]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'beastheart-1-2a-9-3',
				selected: [ 'Hide' ]
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'beastheart-1-2a-9-4',
					name: 'Sparkling Tail Whip',
					description: 'The lightbender swings their tail, sending gouts of sparks in their foe’s face.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
					distance: [ FactoryLogic.distance.createMelee() ],
					target: 'One enemy',
					sections: [
						FactoryLogic.createAbilitySectionText('The target takes damage equal to 3 + the lightbender’s Might score, and if they have M < [average], they are dazzled until the end of their next turn. A dazzled creature has line of effect only within 1 square.'),
						FactoryLogic.createAbilitySectionSpend({
							effect: 'A dazzled creature also takes a bane on strikes.'
						})
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'beastheart-1-2a-9-5',
				name: 'Avoidance',
				description: 'Any effect on the lightbender that would be ended by a saving throw instead ends automatically at the end of their next turn.'
			})
		]
	}),
	isSignature: false,
	cost: 0,
	count: 1,
	level3: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-9-3-1',
			name: 'Hit and Run',
			description: 'Whenever the lightbender makes a strike against a creature while rampaging, the lightbender can teleport up to 5 squares and use the Hide maneuver.'
		})
	],
	level6: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-9-6-1',
			name: 'Lightbearer',
			description: 'While the lightbender is rampaging, you can use a free maneuver to glow with blinding light that lasts until the rampage ends or you use this ability again. While glowing, your skin sheds light for 10 squares and strikes against you take a bane.'
		})
	],
	level10: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-9-10-1',
			name: 'Everywhere and Nowhere',
			description: 'While the lightbender is rampaging, your grip on spatial reality is weakened, and once on each of your turns, you or the lightbender can teleport up to 3 spaces as a free maneuver. Additionally, strikes made against you and the lightbender have a double bane until the lightbender’s rampage ends.'
		})
	]
});

const panther = FactoryLogic.createSummon({
	monster: FactoryLogic.createMonster({
		id: 'beastheart-1-2a-10',
		name: 'Panther',
		level: 0,
		role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
		keywords: [ 'Animal', 'Companion' ],
		encounterValue: 0,
		size: FactoryLogic.createSize(1, 'M'),
		speed: FactoryLogic.createSpeed(7, 'climb'),
		stamina: 0,
		stability: 1,
		freeStrikeDamage: 1,
		characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
		features: [
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-10-1',
				field: FeatureField.Stamina,
				valueFromController: FeatureField.Stamina
			}),
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-10-2',
				field: FeatureField.FreeStrikeDamage,
				valueCharacteristics: [ Characteristic.Might ]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'beastheart-1-2a-10-3',
				selected: [ 'Sneak' ]
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'beastheart-1-2a-10-4',
					name: 'Pounce',
					description: 'The panther bunches up, then uncoils into a deadly leap.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
					distance: [ FactoryLogic.distance.createMelee() ],
					target: 'One enemy',
					sections: [
						FactoryLogic.createAbilitySectionText('The target takes damage equal to 3 + the panther’s Might score, and if they have M < [average], they are knocked prone.'),
						FactoryLogic.createAbilitySectionSpend({
							effect: 'The panther can jump up to a number of squares equal to their speed before using this ability. If they jump at least 1 square in this way, a target who has M < [strong] is knocked prone.'
						})
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'beastheart-1-2a-10-5',
				name: 'Mighty Spring',
				description: 'Whenever the panther takes the Advance move action or the Charge action, they can jump up to a number of squares equal to their speed in any direction, including vertically, as part of this movement.'
			})
		]
	}),
	isSignature: false,
	cost: 0,
	count: 1,
	level3: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-10-3-1',
			name: 'Cat and Mouse',
			description: 'Whenever the panther makes a strike against a creature while rampaging, the panther can knock the target prone.'
		})
	],
	level6: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-10-6-1',
			name: 'Single Bound',
			description: 'While the panther is rampaging, you can jump up to a number of squares equal to your speed as a free maneuver once on each of your turns.'
		})
	],
	level10: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-10-10-1',
			name: 'Panther Spirit',
			description: 'While the panther is rampaging, you and the panther are invisible and can move through objects and terrain, which are difficult terrain for you both. A creature who ends their turn inside a solid object from moving this way is teleported to the last unoccupied space they previously occupied.'
		})
	]
});

const spider = FactoryLogic.createSummon({
	monster: FactoryLogic.createMonster({
		id: 'beastheart-1-2a-11',
		name: 'Spider',
		level: 0,
		role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
		keywords: [ 'Animal', 'Companion' ],
		encounterValue: 0,
		size: FactoryLogic.createSize(1, 'M'),
		speed: FactoryLogic.createSpeed(5, 'climb'),
		stamina: 0,
		stability: 1,
		freeStrikeDamage: 1,
		characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
		features: [
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-11-1',
				field: FeatureField.Stamina,
				valueFromController: FeatureField.Stamina
			}),
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-11-2',
				field: FeatureField.FreeStrikeDamage,
				valueCharacteristics: [ Characteristic.Might ]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'beastheart-1-2a-11-3',
				selected: [ 'Sneak' ]
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'beastheart-1-2a-11-4',
					name: 'Web Shot',
					description: 'The spider fires a ball of sticky silk.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Companion, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
					distance: [ FactoryLogic.distance.createRanged(5) ],
					target: 'One enemy',
					sections: [
						FactoryLogic.createAbilitySectionText('If the target has M < [average], they are restrained until the end of their next turn'),
						FactoryLogic.createAbilitySectionSpend({
							effect: 'If the target has M < [strong], they are restrained (save ends).'
						})
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'beastheart-1-2a-11-5',
				name: 'Come Into My Parlor',
				description: 'Whenever the spider makes a strike against a restrained creature, the spider deals extra poison damage equal to twice their Intuition score.'
			})
		]
	}),
	isSignature: false,
	cost: 0,
	count: 1,
	level3: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-11-3-1',
			name: 'Dripping Fangs',
			description: 'Whenever the spider makes a strike against a creature while rampaging, the spider can deal extra poison damage equal to their Might score.'
		})
	],
	level6: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-11-6-1',
			name: 'Web Slinger',
			description: 'Once on each of your turns while the spider is rampaging, you can shoot a web to a ceiling, wall, or sturdy object above you within 5 squares as a free maneuver. You can then fly in a straight line to any space within 5 squares of that object.'
		})
	],
	level10: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-11-10-1',
			name: 'Life Drinker',
			description: 'Whenever you or the spider deals damage with a maneuver while the spider is rampaging, the attacker regains Stamina equal to the damage dealt.'
		})
	]
});

const sporeling = FactoryLogic.createSummon({
	monster: FactoryLogic.createMonster({
		id: 'beastheart-1-2a-12',
		name: 'Sporeling',
		level: 0,
		role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
		keywords: [ 'Beast', 'Companion' ],
		encounterValue: 0,
		size: FactoryLogic.createSize(1, 'S'),
		speed: FactoryLogic.createSpeed(5),
		stamina: 0,
		stability: 0,
		freeStrikeDamage: 1,
		characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
		features: [
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-12-1',
				field: FeatureField.Stamina,
				valueFromController: FeatureField.Stamina
			}),
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-12-2',
				field: FeatureField.FreeStrikeDamage,
				valueCharacteristics: [ Characteristic.Might ]
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'beastheart-1-2a-12-3',
				modifiers: [
					FactoryLogic.damageModifier.create({
						damageType: DamageType.Poison,
						modifierType: DamageModifierType.Immunity,
						value: 3
					})
				]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'beastheart-1-2a-12-4',
				selected: [ 'Track' ]
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'beastheart-1-2a-12-5',
					name: 'Spore Puff',
					description: 'The sporeling breathes a cloud of disorienting fumes.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
					distance: [ FactoryLogic.distance.createMelee() ],
					target: 'One enemy',
					sections: [
						FactoryLogic.createAbilitySectionText('The target takes poison damage equal to 3 + the sporeling’s Might score, and the sporeling is invisible to the target until the end of the sporeling’s next turn or they deal damage to the target.'),
						FactoryLogic.createAbilitySectionSpend({
							effect: 'If the target has M < [strong], they are dazed until the end of their next turn.'
						})
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'beastheart-1-2a-12-6',
				name: 'Skulker',
				description: 'The sporeling can end their movement in an ally’s space. While occupying an ally’s space, the sporeling has cover.'
			})
		]
	}),
	isSignature: false,
	cost: 0,
	count: 1,
	level3: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-12-3-1',
			name: 'Slowing Spores',
			description: 'Whenever the sporeling makes a strike against a creature while rampaging, the sporeling can cause the target to be slowed until the end of the target’s next turn.'
		})
	],
	level6: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-12-6-1',
			name: 'Plant Walk',
			description: 'Once on each of your turns while the sporeling is rampaging, you can teleport to a space within 15 squares as a free maneuver, provided the space or an adjacent space contains the sporeling or plants or fungus of size 1S or larger. You then gain an edge on the next strike you make before the end of your turn.'
		})
	],
	level10: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-12-10-1',
			name: 'Trailing Mycelia',
			description: 'While the sporeling is rampaging, you and the sporeling sprout rootlike, gripping mycelia along your limbs, and whenever you or the sporeling makes a strike against a creature who has M < [strong], the creature is grabbed by the attacker. Additionally, you and the sporeling can’t be force moved or knocked prone until the sporeling’s rampage ends.'
		})
	]
});

const wolf = FactoryLogic.createSummon({
	monster: FactoryLogic.createMonster({
		id: 'beastheart-1-2a-13',
		name: 'Wolf',
		level: 0,
		role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
		keywords: [ 'Animal', 'Companion' ],
		encounterValue: 0,
		size: FactoryLogic.createSize(1, 'M'),
		speed: FactoryLogic.createSpeed(7),
		stamina: 0,
		stability: 1,
		freeStrikeDamage: 1,
		characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
		features: [
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-13-1',
				field: FeatureField.Stamina,
				valueFromController: FeatureField.Stamina
			}),
			FactoryLogic.feature.createBonus({
				id: 'beastheart-1-2a-13-2',
				field: FeatureField.FreeStrikeDamage,
				valueCharacteristics: [ Characteristic.Might ]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'beastheart-1-2a-13-3',
				selected: [ 'Track' ]
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'beastheart-1-2a-13-4',
					name: 'Clamping Jaws',
					description: 'With an unnerving growl, the wolf sinks powerful teeth onto their quarry.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
					distance: [ FactoryLogic.distance.createMelee() ],
					target: 'One enemy',
					sections: [
						FactoryLogic.createAbilitySectionText('The target takes damage equal to 3 + the wolf’s Might score, and if they have M < [average], they are grabbed by the wolf.'),
						FactoryLogic.createAbilitySectionSpend({
							effect: 'If the target has M < [strong], they are grabbed by the wolf.'
						})
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'beastheart-1-2a-13-5',
				name: 'Retriever',
				description: 'The wolf can move at full speed while they have a creature grabbed, no matter the grabbed creature’s size.'
			})
		]
	}),
	isSignature: false,
	cost: 0,
	count: 1,
	level3: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-13-3-1',
			name: 'My, What Big Teeth You Have',
			description: 'Whenever the wolf makes a strike against a creature while rampaging, they can grab the target.'
		})
	],
	level6: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-13-6-1',
			name: 'Call of the Wild',
			description: 'While the wolf is rampaging, you and the wolf gain a +2 bonus to speed, and creatures within 5 squares can’t be hidden or have concealment from you or the wolf.'
		})
	],
	level10: [
		FactoryLogic.feature.create({
			id: 'beastheart-1-2a-13-10-1',
			name: 'Dire Wolf',
			description: 'While the wolf is rampaging, you and the wolf are surrounded by an aura of dread, and enemies who start their turn adjacent to you or the wolf who have P < [strong] are frightened until the end of their next turn.'
		})
	]
});

export const beastheart: HeroClass = {
	id: 'class-beastheart',
	name: 'Beastheart',
	description: `
A beastheart never fights alone! You travel with a ferocious beast by your side — no trained pet, but an untamed creature such as a wolf, a basilisk, or even a young dragon. Bound to you by a primordial connection, your companion honors your wishes just as you are guided by their instincts. But beware! As battle rages on, your companion may succumb to a blood-soaked rampage, lashing out at enemies and friends alike.

As a beastheart, you face the world’s dangers alongside your wild companion. With your combined might, you rush into the thick of combat to challenge enemy champions or prowl around the outskirts to pick off vulnerable foes.`,
	type: 'master',
	subclassName: 'Wild Nature',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Might, Characteristic.Intuition ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'beastheart-stamina',
					field: FeatureField.Stamina,
					value: 21,
					valuePerLevel: 12
				}),
				FactoryLogic.feature.createBonus({
					id: 'beastheart-recoveries',
					field: FeatureField.Recoveries,
					value: 12
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'beastheart-resource',
					name: 'Ferocity',
					description: 'You and your companion tap into a predator’s bloodlust that grants you a Heroic Resource called ferocity.',
					gains: [
						{
							tag: 'start',
							trigger: 'Start of your turn',
							value: '1d3'
						},
						{
							tag: 'deal-damage-adjacent-companion',
							trigger: 'The first time in a round that a creature adjacent to your companion takes damage',
							value: '2'
						}
					]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-1-1a',
					selected: [ 'Handle Animals' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-1-1b',
					listOptions: [ SkillList.Exploration, SkillList.Intrigue ],
					count: 2
				}),
				FactoryLogic.feature.createSummonChoice({
					id: 'beastheart-1-2a',
					name: 'Companion',
					description: 'You gain the companionship of a wild animal that shares your travels. Your companion isn’t your pet—rather, they share a mystical bond with you, a bond that allows you to share your companion’s senses and primal instincts.',
					options: [
						basilisk,
						bear,
						boar,
						condor,
						deinonychus,
						drake,
						elementalSpark,
						gummyBall,
						hellhound,
						lightbender,
						panther,
						spider,
						sporeling,
						wolf
					]
				}),
				FactoryLogic.feature.create({
					id: 'beastheart-1-2b',
					name: 'Companions in Combat',
					description: `
**Companion Stamina and Recoveries**. Your companion’s Stamina maximum equals your Stamina maximum. Your companion has no Recoveries. When an effect would allow your companion to spend a Recovery, your companion spends one of your Recoveries.

**Companion Death**. A companion can become dying at 0 Stamina and die at negative half their Stamina, just like a hero.

**Companion Actions**. Your companion is your ally, but they take their turn as a part of your turn. For the purpose of effects that end at the end of the companion’s turn, or any other rules elements that depend on the start or end of creature’s turn, the start and end of your turn is also the start and end of the companion’s turn.

You and your companion each take your own move action. You can use one triggered action per round, which can be used by either you or your companion. Your main action and maneuver are split between you and your companion; if you take a main action, you can’t take a maneuver but your companion can. If you take a maneuver, you can’t take a main action but your companion can. Taking a main action doesn’t prevent you or your companion from taking free maneuvers.

You and your companion share one turn during montage tests and similar scenes. Typically, you’ll take this turn, but there may be circumstances when your companion does instead.

**Ranged Free Strikes**. Your companion doesn’t have a ranged free strike.

**Shared Maneuvers**. When you or your companion use the Catch Breath, Escape Grab, Hide, or Stand Up maneuvers, your partner can use the same maneuver as a triggered free action.

**Shared Abilities**. You and your companion share some abilities, but not all of them. If a beastheart ability has the Beastheart keyword, it can be used by only the beastheart. If it has the Companion keyword, it can be used by only the companion. If an ability can be used by either you or your companion, the word “you” in the ability’s text refers to whoever uses the ability, while the word “partner” refers to whoever didn’t use the ability. Within a companion’s stat block, the word “you” always refers to the beastheart. In all cases, phrases like "you both” and “you each” refer to you and your companion.

**Shared Senses**. While you are within 1 mile of each other, you and your companion can communicate telepathically as if you shared a language, although this communication uses vague images and feelings instead of words.

**Shared Skills**. Your companion has any skill you have, and vice versa. No matter what skills they possess, your companion can’t take any action their physiology wouldn’t allow (for instance, a wolf can’t pick locks).

**Shared Space**. You and your companion can move freely through and stop in each other’s spaces.

**Shared Perks, Titles, and Complications**. If you gain a benefit or drawback by earning a perk, a title, or a complication, your companion shares the benefit or drawback. Your companion can only be affected by benefits or drawbacks that logically affect an animal: for instance, an animal can’t craft and therefore can’t benefit from the Handy perk. If you’re not sure what your companion can do, ask your Director.

**Surges**. Surges you and your companion gain are added to a surge pool you both can spend from. When an effect would grant 1 or more surges to both you and your companion, you only gain the surges once.

**Changing Your Companion**. As a respite activity, you can release your current companion, then gain a new companion of a different species or summon a companion you previously released.

**One Hero**. You and your companion count as one hero for determining the difficulty of combats, montage tests, and other challenges.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-1-3a',
						name: 'Heart of the Beast',
						description: '“Better look away - this might not be pretty.”',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You must spend a Recovery without regaining Stamina. Your partner gains temporary Stamina equal to your recovery value as they leap out of your chest. Your partner teleports to your space from any distance, even if they don’t have line of effect to you.'),
							FactoryLogic.createAbilitySectionSpend({
								value: 1,
								effect: 'Your partner can shift up to their speed.'
							}),
							FactoryLogic.createAbilitySectionSpend({
								value: 1,
								repeatable: true,
								effect: 'Your partner gains additional temporary Stamina equal to their Might score for each ferocity spent this way.'
							}),
							FactoryLogic.createAbilitySectionSpend({
								value: 5,
								effect: 'You restore your dead partner to life with 1 Stamina, even if their body was destroyed. They gain no temporary Stamina if you use this ability this way.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-1-3b',
						name: 'Feral Strike',
						description: 'Your companion lunges into the fray, attacking wildly with teeth, claws, or other weapons.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionText(`
Your companion moves up to a number of squares equal to their Intuition score straight toward the closest enemy they are aware of, avoiding damaging terrain and ending the movement when they are adjacent to that enemy.

Your companion then makes the following power roll:`),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Might,
									tier1: '1 + M damage',
									tier2: '3 + M damage',
									tier3: '4 + M damage'
								})
							),
							FactoryLogic.createAbilitySectionPackage('feral-strike')
						]
					})
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'beastheart-1-4',
					name: 'Rampage',
					description: 'While your ferocity sharpens your killer instinct, it can also drive your companion into a rampage, causing them to strike friends and foes alike in a blood-soaked battle frenzy. As their rampage builds, they become something more than a mortal companion, embodying a primordial spirit of destruction.',
					gains: [],
					details: `
Your companion has a resource called rampage. Whenever you or your companion spends ferocity, your companion gains rampage equal to the ferocity spent. Your companion loses their rampage and its effects at the end of an encounter.

Your companion doesn’t spend rampage to activate abilities. Instead, when your companion gains 8 rampage, they are rampaging. As your companion’s rampage increases, they gain the listed effects from the Rampage table. Effects are cumulative. Some Rampage effects are applied only if you are a specific level or higher, with the level of these effects noted in the Rampage table.

| Rampage     | Effect |
|:============|:=======|
| 8           | At the end of each of your turns, your companion must use their Feral Strike ability as a free maneuver. You can’t willingly decrease the power roll outcome to a lower tier. For each ally damaged this way, you gain 2 surges, which you can use on this strike.    |
| 12          | Your companion has damage immunity equal to their Intuition score.    |
| 16 (lvl 4)  | When your companion uses their Feral Strike ability, they deal extra damage equal to their Intuition score to each target. You gain 1 additional surge for each ally damaged this way.    |
| 20 (lvl 7)  | As a free maneuver, your companion can increase their size up to size 2, or increase their size by 1 if their original size is already 2 or larger. This size increase lasts until your companion’s rampage ends or they use a free maneuver to end it. While your companion’s size is increased, they gain a +2 bonus to speed and stability, the potencies of their abilities increase by 1, and the size of their Feral Strike ability’s burst increases by 1.    |
| 24 (lvl 10) | When your companion increases their size, they can increase it up to size 3, or increase their size by 1 if their original size is already 3 or larger. Whenever they make a power roll while their size is increased this way, they can roll 3d10 and discard the lowest roll.    |`
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'beastheart-1-5'
				}),
				FactoryLogic.feature.create({
					id: 'beastheart-1-6',
					name: 'Beasthearts and Magic Treasure',
					description: `
**Consumables**. Your companion can’t use every consumable, but with your help, they can benefit from an edible or drinkable consumable, such as a Healing Potion. While using a kit, your companion can also benefit from a consumable that enhances a weapon, such as a Lachomp Tooth. When you use one of these kinds of consumables while you are adjacent to your companion, you can grant the benefit to your companion instead of yourself. You must take the action type required to use the consumable; no action is required of your companion.

**Trinkets**. Your companion can’t use trinkets that are designed to be worn by bipeds (such as cloaks, masks, and hats) or require words or gestures to activate. However, your companion can benefit from one necklace, pendant, collar, or other trinket with the Neck keyword that doesn’t require any action to activate, such as a Necklace of the Bayou or one of the new magic trinkets presented in this document. You companion doesn’t need to wear their trinket around their neck: a condor might wear a necklace wrapped around a talon, and a gelatinous sphere might carry it suspended inside their body!

**Leveled Items**. Although your companion can’t wield a sword, they can benefit from a magic blade! When you wield and gain the benefits of a leveled weapon, armor, implement, or other item, your companion gains those same benefits as if they were wielding the treasure.`
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-1-7',
					cost: 'signature'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-1-8',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-1-9',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'beastheart-2-1',
					name: 'Perk',
					lists: [ PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue ]
				}),
				FactoryLogic.feature.create({
					id: 'beastheart-2-2',
					name: 'Everyone’s Best Friend',
					description: 'Your companion may not be much of a talker, but they’ve got a lifetime of experience surviving the dangers of the wild. They can offer aid in nearly any circumstance: helping exhausted travelers find their way, leading panicked villagers out of a burning building, or even providing a comforting nuzzle at just the right time. Once per round during a montage test, when you or another character makes a test, your companion can increase the tier outcome by one tier (to a maximum of tier 3).'
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-3-1',
					cost: 7
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-4-1a',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-4-1b',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createPerk({
					id: 'beastheart-4-2'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-4-3'
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'beastheart-4-4b',
					name: 'Unchained Ferocity',
					tag: 'deal-damage-companion 2',
					trigger: 'The first time in a round that a creature adjacent to your companion takes damage',
					value: '3',
					replacesTags: [ 'deal-damage-adjacent-companion' ]
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-5-1',
					cost: 9
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'beastheart-6-1',
					name: 'Perk',
					lists: [ PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue ]
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-7-1a',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-7-1b',
					characteristic: Characteristic.Agility,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-7-1c',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-7-1d',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-7-1e',
					characteristic: Characteristic.Presence,
					value: 1
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'beastheart-7-2',
					name: 'Greater Ferocity',
					tag: 'start 2',
					trigger: 'Start of your turn',
					value: '1d3 +1',
					replacesTags: [ 'start' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-7-3'
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'beastheart-8-1'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-8-2',
					cost: 11
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'beastheart-9-1a',
					name: 'Avatar of the Green',
					description: 'Your companion has transcended beasthood. Although they’re still your faithful friend, they’re also a vessel for nature’s wisdom and memories. Your companion’s Reason score increases to 1, or increases by 1 if it is already 1 or higher, and they learn every language you know. Your companion can communicate telepathically with any creature within 10 squares, using language as well as images and feelings.'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-9-1b',
					selected: [ 'Nature' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-9-1c',
					listOptions: [ SkillList.Lore ]
				})
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-10-1a',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-10-1b',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'beastheart-10-2',
					name: 'Final Evolution',
					tag: 'start 3',
					trigger: 'Start of your turn',
					value: '2d3 +1',
					replacesTags: [ 'start', 'start 2' ]
				}),
				FactoryLogic.feature.createPerk({
					id: 'beastheart-10-3',
					name: 'Perk',
					lists: [ PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue ]
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'beastheart-10-4',
					name: 'Ferox',
					type: 'epic',
					gains: [
						{
							tag: '',
							trigger: 'Finish a respite',
							value: 'XP gained'
						}
					],
					description: 'You can spend 1 ferox as a free maneuver to allow you and your companion to each to take a main action on your turn, instead of a main action and a maneuver. On that turn, the ferocity cost of your heroic abilities is reduced by 1.'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-10-5',
					name: 'Skill'
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'beastheart-ability-1',
			name: 'Bodyswap',
			description: 'You and your ally morph into each other, magically switching places.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionText('If you and a willing ally are standing on the ground within 10 squares of each other, you can teleport to swap places. If you do, you gain an edge on this ability.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Intuition,
						tier1: '3 + I damage',
						tier2: '5 + I damage',
						tier3: '7 + I damage'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-2',
			name: 'Come On!',
			description: 'You launch a flurry of attacks to cover your movement.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '2 + M damage',
						tier2: '3 + M damage',
						tier3: '4 + M damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Your companion can make a melee free strike. You both shift up to a number of squares equal to your Intuition score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-3',
			name: 'Covering Fire',
			description: 'Keep your head down, or I’ll shoot it off!',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(5) ],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Intuition,
						tier1: '2 + I damage',
						tier2: '4 + I damage',
						tier3: '6 + I damage'
					})
				),
				FactoryLogic.createAbilitySectionText('If the target is not prone, they must use a free triggered action to fall prone or take extra damage equal to twice your Intuition score. Your companion can shift up to a number of squares equal to their Intuition score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-4',
			name: 'Stormrage',
			description: 'Lances of primordial energy leap from you and your companion to sear, crush, or freeze your foe.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '2 + M cold, fire, lightning, or sonic damage',
						tier2: '4 + M cold, fire, lightning, or sonic damage',
						tier3: '6 + M cold, fire, lightning, or sonic damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You can spend 1 surge without gaining its benefits. If you do, your companion can use this ability as a free triggered action, targeting a different creature or object with the same power roll, but they don’t trigger this effect.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-5',
			name: 'Bring the Thunder',
			description: 'Your companion unleashes a shattering roar, screech, or howl that terrifies your foes — or at least gets their attention.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Companion, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Intuition,
						tier1: '3 sonic damage; push 1; P < [weak], taunted (save ends)',
						tier2: '5 sonic damage; push 2; P < [average], taunted (save ends)',
						tier3: '7 sonic damage; push 3; P < [strong], frightened (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionSpend({
					effect: 'This ability also affects a 2 burst originating from you. An enemy in both areas is only affected once.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-6',
			name: 'Herd the Sheep',
			description: 'Your companion circles your foe, luring them out of position with fake openings and unpredictable attacks.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '5 + M damage; slide 1; I < [weak], weakened (save ends)',
						tier2: '8 + M damage; slide 2; I < [average], weakened (save ends)',
						tier3: '11 + M damage; slide 4; I < [strong], weakened (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('You and your companion can shift up to a number of squares equal to the number of squares the target was force moved.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-7',
			name: 'Hungry like the Wolf',
			description: 'The enemy’s blood flows like wine, invigorating your companion.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Companion, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '4 + M damage; your companion can spend a Recovery',
						tier2: '7 + M damage; you and your companion can each spend a Recovery',
						tier3: '11 + M damage; A < [strong], bleeding (EoT); you and your companion can each spend a Recovery and shift up to 2 squares'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-8',
			name: 'Pushover',
			description: 'You and your companion surround your foe in order to bring them down.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '5 + M damage; push 2',
						tier2: '8 + M damage; push 4',
						tier3: '11 + M damage; push 6'
					})
				),
				FactoryLogic.createAbilitySectionText('This forced movement can pass through your space but not end there. If the target passes through your space, they fall prone and take extra damage equal to your Intuition score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-9',
			name: 'All of You Versus All of Me',
			description: 'Let all of them come forward and shatter yourselves against your might!',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Beastheart ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'Each enemy in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('You can spend a Recovery and gain 3 temporary Stamina for each target. Each target is taunted by you until the end of their next turn.'),
				FactoryLogic.createAbilitySectionSpend({
					effect: 'This ability also affects a 3 burst originating from your companion. Targets in this second area are taunted by your companion. An enemy in both areas is taunted only by you.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-10',
			name: 'I Feed on your Pain!',
			description: 'Invigorated by the smell of blood, you strike a savage blow.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '8 + M damage',
						tier2: '12 + M damage',
						tier3: '16 + M damage; M < [strong] bleeding (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('If the target is killed by this damage, or is winded or bleeding after taking this damage, you gain 2 surges.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-11',
			name: 'Rain of Fire',
			description: 'As your arrows rain down on your foes, flames spiral around your companion, setting the arrows ablaze.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Beastheart, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 5 }) ],
			target: 'Each enemy in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '3 fire damage',
						tier2: '5 fire damage',
						tier3: '8 fire damage'
					})
				),
				FactoryLogic.createAbilitySectionText('If your companion is in the area, they deal fire damage equal to their Intuition score to each target.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-12',
			name: 'You Let Me Get Too Close',
			description: 'The wilderness has no concept of fair play.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '8 + M damage; M < [weak] grabbed',
						tier2: '12 + M damage; M < [average] grabbed',
						tier3: '16 + M damage; M < [strong] grabbed'
					})
				),
				FactoryLogic.createAbilitySectionText('If you grab the target while your companion is adjacent to them, your companion can make a melee free strike against the target.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-13',
			name: 'Death and Violence',
			description: 'You leap from your foe’s corpse.',
			type: FactoryLogic.type.createTrigger('Your companion uses an ability that reduces the target to 0 Stamina.'),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('The target dies. You teleport to the target’s space, shift up to a number of squares equal to your Might score, and can then make a melee free strike. You then make the following power roll, targeting each enemy within 5 squares of the target:'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: 'P < [weak], frightened (save ends)',
						tier2: '4 psychic damage; P < [average], frightened (save ends)',
						tier3: '8 psychic damage; P < [strong], frightened (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-14',
			name: 'Head to Head',
			description: 'Your bloody-forehead smash drives your companion into a frenzy.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Intuition,
						tier1: '13 + M damage; P < [weak], dazed (save ends)',
						tier2: '19 + M damage; P < [average], dazed (save ends)',
						tier3: '25 + M damage; P < [strong], dazed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('You are bleeding (save ends). Until the end of your next turn, your companion gains an edge on power rolls.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-15',
			name: 'Jaws of Death',
			description: 'Spectral teeth clamp on a foe, chaining them to you and draining their life essence.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '7 + I damage; P < [weak], weakened (save ends)',
						tier2: '10 + I damage; P < [average], weakened (save ends)',
						tier3: '14 + I damage; P < [strong], weakened (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('Whenever a target more than 3 squares away from you fails the saving throw while weakened this way, you can pull the target up to a number of squares equal to your Intuition score as a free triggered action.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-16',
			name: 'Shieldbreaker',
			description: 'You smash through their guard and shatter their armor, leaving them wide open.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '9 + M damage',
						tier2: '14 + M damage',
						tier3: '19 + M damage'
					})
				),
				FactoryLogic.createAbilitySectionText('The next creature who damages the target before the start of your next turn gains 3 surges, which they can use on the triggering damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-17',
			name: 'Deadshot',
			description: 'You channel your companion’s feral senses to take the perfect shot.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(15) ],
			target: 'One creature or object',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Intuition,
						tier1: '12 + I damage',
						tier2: '18 + I damage',
						tier3: '30 + I damage'
					})
				),
				FactoryLogic.createAbilitySectionText('If you are hidden, you remain hidden after the strike.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-18',
			name: 'Dogpile',
			description: 'You and your allies surround your enemy like a pack of wolves, mobbing them and pulling them down.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '10 + M damage; M < [weak], grabbed and prone',
						tier2: '15 + M damage; M < [average], grabbed and prone',
						tier3: '20 + M damage; M < [strong], grabbed and prone'
					})
				),
				FactoryLogic.createAbilitySectionText('Each ally adjacent to the target can use a free triggered action to deal damage to the target equal to their highest characteristic score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-19',
			name: 'One, Two, Three, Heave',
			description: 'Harnessing your companion’s strength, you send your foe flying.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '10 + M damage; vertical push 4; prone',
						tier2: '15 + M damage; vertical push 6; prone',
						tier3: '20 + M damage; vertical push 8; prone'
					})
				),
				FactoryLogic.createAbilitySectionText('If your companion is adjacent to the target, this forced movement can ignore the target’s stability.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-20',
			name: 'Rip Them Apart!',
			description: 'In a gruesome display, you and your companion rip off a pinioned enemy’s limb or other body part and toss it away.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '11 + M damage; M < [weak], bleeding (save ends)',
						tier2: '17 + M damage; M < [average], bleeding (save ends)',
						tier3: '22 + M damage; M < [strong], bleeding (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('If the target is grabbed by your partner, the target takes extra damage equal to your Might score plus your partner’s Might score. If the target is reduced to 0 Stamina by this ability, each enemy within 2 squares who has P < [average] is frightened (save ends).')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-21',
			name: 'Life-Drinking Wound',
			description: 'As your attack strikes home, your enemy’s escaping life force drifts to your allies in crimson threads.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '12 + M damage',
						tier2: '18 + M damage',
						tier3: '24 + M damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Up to three creatures within 2 squares of the target gain temporary Stamina equal to half the damage dealt.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-22',
			name: 'On the Razor’s Edge',
			description: 'Driven by the pain and desperation of battle, you and your companion spend your last strength in a flurry of wild attacks.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature or object',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Intuition,
						tier1: '5 + M damage',
						tier2: '15 + M damage',
						tier3: '25 + M damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Your companion can use this ability against an adjacent target, making their own power roll. Both power rolls gain an edge if either of you is bleeding, dying, or winded, and your power roll has a double edge if your companion is dead or otherwise unable to act.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-23',
			name: 'Ride or Die',
			description: 'Your enemies might be stronger than you, but that’s why you’re not here alone.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionText('You and your companion each use a different ability that costs 9 or fewer ferocity and is either a main action or a maneuver. These abilities cost no ferocity. If an ability lets you spend additional ferocity for an enhanced effect, you can’t do so.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-24',
			name: 'Turn the World to Ash',
			description: 'Wrenching power from your primordial bond, you unleash elemental power in a devastating conflagration that you can’t control.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Beastheart, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Intuition,
						tier1: '10 cold, fire, lightning, or sonic damage',
						tier2: '18 cold, fire, lightning, or sonic damage',
						tier3: '26 cold, fire, lightning, or sonic damage'
					})
				),
				FactoryLogic.createAbilitySectionSpend({
					value: 2,
					repeatable: true,
					effect: 'You can spend up to 6 ferocity. For every 2 ferocity spent, the size of the burst increases by 1, you gain a +2 bonus to the power roll, and you take 5 damage that can’t be reduced in any way. You can choose how much ferocity you spend after you make the power roll.'
				})
			]
		})
	],
	subclasses: [
		guardian,
		prowler,
		punisher,
		spark
	],
	level: 1,
	characteristics: []
};
