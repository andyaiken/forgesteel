import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { Imbuement } from '@/models/imbuement';
import { ItemType } from '@/enums/item-type';

export class ImbuedArmorData {
	static aweCharming: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A lock of hair from a fey, taken in amicable bargain',
			source: 'Texts or lore in Khelt',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-awe-charming',
			name: 'Awe: Charming',
			description: 'You gain an edge on Presence tests made to win other creatures over or make a good impression.'
		})
	});

	static aweThreatening: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A lock of hair from a fey, taken in violence',
			source: 'Texts or lore in Khelt',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-awe-threatening',
			name: 'Awe: Threatening',
			description: 'You gain an edge on Presence tests made to intimidate, coerce, or bully.'
		})
	});

	static damageImmunityI: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'Elemental sand left behind when an elemental enters Orden from Quintessence',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.createChoice({
			id: 'imbuement-damage-immunity-i',
			name: 'Damage Immunity I',
			description: 'Select three damage types. You have immunity 5 to those damage types.',
			options: [
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-i-a',
						name: 'Damage Immunity I (Acid)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Acid,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-i-b',
						name: 'Damage Immunity I (Cold)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Cold,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-i-c',
						name: 'Damage Immunity I (Corruption)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Corruption,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-i-d',
						name: 'Damage Immunity I (Fire)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Fire,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-i-e',
						name: 'Damage Immunity I (Holy)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Holy,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-i-f',
						name: 'Damage Immunity I (Lightning)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Lightning,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-i-g',
						name: 'Damage Immunity I (Poison)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Poison,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-i-h',
						name: 'Damage Immunity I (Psychic)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Psychic,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-i-i',
						name: 'Damage Immunity I (Sonic)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Sonic,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				}
			],
			count: 3
		})
	});

	static disguise: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'The blood of a lycanthrope',
			source: 'Texts or lore in Khelt',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'imbuement-disguise',
				name: 'Disguise',
				type: FactoryLogic.type.createManeuver(),
				sections: [
					FactoryLogic.createAbilitySectionText('You cause this armor to take the form of any type of clothing that you have been in the presence of—a noble’s dress, a guard’s uniform, a cultist’s robes, and so forth. The armor loses none of its protective qualities while transformed into other clothing.')
				]
			})
		})
	});

	static iridescent: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'Fur from a lightbender',
			source: 'Texts or lore in Hyrallic',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'imbuement-iridescent',
				name: 'Iridescent',
				type: FactoryLogic.type.createTrigger('You are the sole target of an ability', { free: true }),
				sections: [
					FactoryLogic.createAbilitySectionText('You reveal that the ability was targeting an afterimage of you in the same space as you. The power roll for the ability is treated as an 11. You can’t use this enhancement again until you earn 1 or more Victories.')
				]
			})
		})
	});

	static magicResistanceI: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A scale from a dragon',
			source: 'Texts or lore in The First Language',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-magic-resistance-i',
			name: 'Magic Resistance I',
			description: 'Your characteristic scores are treated as 1 higher (to a maximum of 2) for the purpose of resisting the potencies of magic abilities.'
		})
	});

	static nettlebloom: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A rose from the magical hedge of a hag',
			source: 'Texts or lore in Khelt',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-nettlebloom',
			name: 'Nettlebloom',
			description: 'Whenever you are grabbed by an adjacent creature, your armor sprouts toxic nettles. While that creature has you grabbed, they are weakened.'
		})
	});

	static phasingI: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'Ichor from a destroyed wraith',
			source: 'Texts or lore in Szetch',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-phasing-i',
			name: 'Phasing I',
			description: 'Once per turn, you can move through 1 square of solid matter. If you end your turn inside solid matter, you are forced out into the space from which you entered it and you take 5 damage that can’t be reduced in any way.'
		})
	});

	static psionicResistanceI: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'Rare crystals that resonate with psionic energy, often found at sites of psionic experimentation',
			source: 'Texts or lore in Voll',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-psionic-resistance-i',
			name: 'Psionic Resistance I',
			description: 'Your characteristic scores are treated as 1 higher (to a maximum of 2) for the purpose of resisting the potencies of psionic abilities.'
		})
	});

	static swift: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'The feather of a falcon slain as it was diving',
			source: 'Texts or lore in Yllyric',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.createBonus({
			id: 'imbuement-swift',
			name: 'Swift',
			field: FeatureField.Speed,
			value: 1
		})
	});

	static tempestI: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A strip of starmetal struck by lightning',
			source: 'Texts or lore in Ullorvic',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'imbuement-tempest-i',
				name: 'Tempest I',
				description: 'You infuse you armor with the essence of a storm.',
				type: FactoryLogic.type.createManeuver(),
				sections: [
					FactoryLogic.createAbilitySectionText('The first time an adjacent creature deals damage to you before the end of your next turn, they take lightning damage equal to your highest characteristic score and you can push them 1 square.'),
					FactoryLogic.createAbilitySectionPackage('tempest-tag')
				]
			})
		})
	});

	static absorption: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A mirror blessed by a priest of a god of magic',
			source: 'Texts or lore in The First Language',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'imbuement-absorption',
				name: 'Absorption',
				type: FactoryLogic.type.createTrigger('You are targeted by a magic or psionic ability that targets only one creature', { free: true }),
				sections: [
					FactoryLogic.createAbilitySectionText(`
You cause this armor to absorb the ability after the ability’s effects resolve. While the armor has an ability absorbed, you can’t absorb another.

You can use an absorbed ability as if you knew it, making power rolls for the ability using your choice of Reason, Intuition, or Presence. You don’t need to spend any Heroic Resource to activate the ability. Once you use the ability, the armor loses it, and you can absorb another.`)
				]
			})
		})
	});

	static damageImmunityII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'The essence of an elemental who is still alive',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.createChoice({
			id: 'imbuement-damage-immunity-ii',
			name: 'Damage Immunity II',
			description: 'The damage immunity conveyed by the armor increases to 10. (Select the same damage types below)',
			options: [
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-ii-a',
						name: 'Damage Immunity II (Acid)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Acid,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-ii-b',
						name: 'Damage Immunity II (Cold)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Cold,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-ii-c',
						name: 'Damage Immunity II (Corruption)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Corruption,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-ii-d',
						name: 'Damage Immunity II (Fire)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Fire,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-ii-e',
						name: 'Damage Immunity II (Holy)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Holy,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-ii-f',
						name: 'Damage Immunity II (Lightning)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Lightning,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-ii-g',
						name: 'Damage Immunity II (Poison)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Poison,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-ii-h',
						name: 'Damage Immunity II (Psychic)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Psychic,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'imbuement-damage-immunity-ii-i',
						name: 'Damage Immunity II (Sonic)',
						modifiers: [ FactoryLogic.damageModifier.create({
							damageType: DamageType.Sonic,
							modifierType: DamageModifierType.Immunity,
							value: 5
						}) ]
					}),
					value: 1
				}
			],
			count: 3
		})
	});

	static dragonSoulI: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A scale from a dead dragon',
			source: 'Texts or lore in Vastariax',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'imbuement-dragon-soul-i',
				name: 'Dragon Soul I',
				type: FactoryLogic.type.createTrigger('Another creature causes you to be winded or dying', { free: true }),
				sections: [
					FactoryLogic.createAbilitySectionText('You cause the soul of a dragon to emerge from the armor and hurtle toward the creature'),
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '2 damage; push 3',
							tier2: '12 damage; push 4',
							tier3: '15 damage; push 5'
						})
					)
				]
			})
		})
	});

	static levitating: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A palm-sized crystal grown in the subterranean lair of an overmind',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-levitating',
			name: 'Levitating',
			description: 'On your turn, you can treat up to 5 consecutive squares of movement as flying movement. If you are still in midair at the end of your turn, you fall prone.'
		})
	});

	static magicResistanceII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A scale from a mature dragon',
			source: 'Texts or lore in The First Language',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-magic-resistance-ii',
			name: 'Magic Resistance II',
			description: 'Your characteristic scores are treated as 2 higher (to a maximum of 3) for the purpose of resisting the potencies of magic abilities. This benefit replaces Magic Resistance I.'
		})
	});

	static phasingII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'The remnants of a slain ooze',
			source: 'Texts or lore in Szetch',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-phasing-ii',
			name: 'Phasing II',
			description: 'When you use the armor’s Phasing I enhancement, you can move through 3 squares of solid matter per turn.'
		})
	});

	static psionicResistanceII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A fresh crystalline scale from a gemstone dragon',
			source: 'Texts or lore in Voll',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-psionic-resistance-ii',
			name: 'Psionic Resistance II',
			description: 'Your characteristic scores are treated as 2 higher (to a maximum of 3) for the purpose of resisting the potencies of psionic abilities. This benefit replaces Psionic Resistance I.'
		})
	});

	static reactive: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A complex, hand-engineered set of brass gears inscribed with runes in silver dust',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-reactive',
			name: 'Reactive',
			description: 'Whenever you take damage, you have damage immunity 2 until the end of your next turn after the triggering damage is resolved.'
		})
	});

	static secondWind: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'The sweat of a troll',
			source: 'Texts or lore in Kalliak',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'imbuement-second-wind',
				name: 'Second Wind',
				type: FactoryLogic.type.createTrigger('You become winded', { free: true }),
				sections: [
					FactoryLogic.createAbilitySectionText('Spend a recovery.')
				]
			})
		})
	});

	static shattering: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A pound of volcanic obsidian, formed naturally as a single piece',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-shattering',
			name: 'Shattering',
			description: 'Whenever an enemy scores a critical hit against you, they take 10 sonic damage.'
		})
	});

	static tempestII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'The armor must be laid out under a clear sky as a comet passes over',
			source: 'Texts or lore in Ullorvic',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.createPackageContent({
			id: 'imbuement-tempest-ii',
			name: 'Tempest II',
			description: 'The target takes 8 lightning damage and you push them up to 3 squares.',
			tag: 'tempest-tag'
		})
	});

	static devilsBargain: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'The wing of an archdevil',
			source: 'Texts or lore in Anjali',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-devils-bargain',
			name: 'Devil\'s Bargain',
			description: 'You can fly. Additionally, if an effect would make you prone while flying, you can choose to not go prone by losing Stamina equal to the distance you would have fallen from becoming prone.'
		})
	});

	static dragonSoulII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'An offering of gems, coins, and art stolen from a dragon’s hoard, sacrificed in ritual fire',
			source: 'Texts or lore in Vastariax',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'imbuement-dragon-soul-ii',
				name: 'Dragon Soul II',
				description: 'You open your maw and unleash hell.',
				type: FactoryLogic.type.createMain({ qualifiers: [ 'You are winded' ] }),
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 1, within: 1 }) ],
				target: 'Each enemy in the area',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '5 fire damage',
							tier2: '8 fire damage',
							tier3: '11 fire damage'
						})
					)
				]
			})
		})
	});

	static invulnerable: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'Repurposed metal plates from a servok war engine',
			source: 'Texts or lore in Rallarian',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-invulnerable',
			name: 'Invulnerable',
			description: 'When an ability roll made against you obtains a tier 1 outcome, you can ignore its damage and effects.'
		})
	});

	static leylineWalker: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A cutting from an ethereal tree that manifests in the mundane world only once a year',
			source: 'Texts or lore in Yllyric',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'imbuement-leyline-walker',
				name: 'Leyline Walker',
				type: FactoryLogic.type.createMove({ qualifiers: [ 'Once per turn' ] }),
				sections: [
					FactoryLogic.createAbilitySectionText('You can spend any amount of your movement to instead teleport that distance.')
				]
			})
		})
	});

	static life: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'The tear of a saint',
			source: 'Texts or lore in High Kuric',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-life',
			name: 'Life',
			description: 'Whenever you would die, you can spend a Recovery to regain Stamina instead. If you have no Recoveries to spend, you die.'
		})
	});

	static magicResistanceIII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A scale from an ancient dragon',
			source: 'Texts or lore in The First Language',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-magic-resistance-iii',
			name: 'Magic Resistance III',
			description: 'The benefit of the armor’s Magic Resistance II enhancement extends to each ally within 3 squares of you.'
		})
	});

	static phasingIII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'Perfectly clear glass from a house that disappeared into the Ethereal Plane',
			source: 'Texts or lore in Szetch',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-phasing-iii',
			name: 'Phasing III',
			description: 'Your movement doesn’t provoke opportunity attacks, and you can move through the space of any enemy as if they were an ally. You can’t end your turn in an enemy’s space.'
		})
	});

	static psionicResistanceIII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'The skull of a voiceless talker at least a century old',
			source: 'Texts or lore in Voll',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-psionic-resistance-iii',
			name: 'Psionic Resistance III',
			description: 'The benefit of the armor’s Psionic Resistance II enhancement extends to each ally within 3 squares of you.'
		})
	});

	static temporalFlux: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'An experimental temporal capacitor invented by the kuran’zoi',
			source: 'Texts or lore in Voll',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.createMultiple({
			id: 'imbuement-temporal-flux',
			name: 'Temporal Flux',
			description: 'Whenever you move out of a square, you can choose to leave an imprint behind that lasts until the end of the encounter, until your imprint takes 20 or more damage, or until you create a new imprint. The square is occupied by your imprint, and you can share that space with it.',
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'temporal-flux-a',
						name: 'Temporal Flux',
						type: FactoryLogic.type.createManeuver({ free: true }),
						sections: [
							FactoryLogic.createAbilitySectionText('You teleport to the imprint’s space')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'temporal-flux-b',
						name: 'Temporal Flux',
						type: FactoryLogic.type.createTrigger('You are targeted by an ability', { free: true }),
						distance: [ FactoryLogic.distance.createSpecial('') ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You teleport to your imprint, and the power roll for the ability is an automatic tier 1 result.')
						]
					})
				})
			]
		})
	});

	static unbending: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedArmor,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A spearhead or other weapon broken off in the body of a stone giant, and ossified for a year or more',
			source: 'Texts or lore in High Kuric',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-unbending',
			name: 'Unbending',
			description: 'You can’t be subjected to forced movement unless you choose to be. Effects that ignore Stability also ignore this enhancement.'
		})
	});
};
