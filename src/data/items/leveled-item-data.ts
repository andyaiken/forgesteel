import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';

export class LeveledItemData {
	static bloodboundBand: Item = FactoryLogic.createItem({
		id: 'item-bloodbound-band',
		name: 'Bloodbound Band',
		description: 'This ring appears to be traced by dried blood, which returns each time it is rubbed away.',
		type: ItemType.Leveled,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ring ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A pair of obituaries that each mention the subject of the other',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-bloodbound-band-1',
						name: '',
						description: 'During a respite, you can touch the ring to any number of other Bloodbound Bands worn by willing creatures to form a bond among all of you. Creatures related by blood can’t form bonds in this way. Bonded creatures can each use the highest recovery value of any bonded creature in place of their own, and can spend each other’s Recoveries as if they were their own. Whenever any other bonded creature takes damage, each bonded creature takes 1 damage that can’t be reduced in any way. Your bond ends if you remove the ring, use it to bond with one or more other creatures, or die, but other rings continue to be bonded to each other.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-bloodbound-band-1a',
						field: FeatureField.Stamina,
						value: 6
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.createBonus({
						id: 'item-bloodbound-band-5a',
						field: FeatureField.Stamina,
						value: 6
					}),
					FactoryLogic.feature.createDamageModifier({
						id: 'item-bloodbound-band-5b',
						modifiers: [
							FactoryLogic.damageModifier.create({
								damageType: DamageType.Damage,
								modifierType: DamageModifierType.Immunity,
								value: 2
							})
						]
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-bloodbound-band-9',
						name: '',
						description: 'If a creature bonded with you dies, you can choose to die in their place. Your sacrifice twists fate to remove the creature from danger, and they regain Stamina equal to their winded value. Your ring then teleports into their possession and ceases to be magic.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-bloodbound-band-9a',
						field: FeatureField.Stamina,
						value: 9
					})
				]
			}
		]
	});

	static bloodyHandWraps: Item = FactoryLogic.createItem({
		id: 'item-bloody-hand-wraps',
		name: 'Bloody Hand Wraps',
		description: 'These rough hand wraps are stained with blood that never comes clean.',
		type: ItemType.Leveled,
		keywords: [ AbilityKeyword.Hands, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'One cotton bolt soaked in the blood of six adventurers',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-bloody-hand-wraps-1',
						name: '',
						description: 'Once per turn, you can take 5 damage that can\'t be reduced in any way to use the Grab maneuver (no action required).'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-bloody-hand-wraps-1a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						value: 1
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-bloody-hand-wraps-5',
						name: '',
						description: 'Once per turn, you can take 10 damage that can\'t be reduced in any way to make a melee free strike (no action required). On your turn, you can use the wraps’ melee free strike option or Grab maneuver option, but only one.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-bloody-hand-wraps-5a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						value: 1
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-bloody-hand-wraps-9',
						name: '',
						description: 'Once per turn, you can take 15 damage that can\'t be reduced in any way to use a signature ability (no action required). On your turn, you can use the wraps’ signature ability option, melee free strike option, or Grab maneuver option, but only one.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-bloody-hand-wraps-9a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						value: 1
					})
				]
			}
		]
	});

	static lightningTreads: Item = FactoryLogic.createItem({
		id: 'item-lightning-treads',
		name: 'Lightning Treads',
		description: 'Sparks strike from these boots whenever they touch the ground,increasing in number as the wearer gathers speed.',
		type: ItemType.Leveled,
		keywords: [ AbilityKeyword.Feet, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'One jar of lightning',
			source: 'Texts or lore in Yllyric',
			characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-lightning-treads-1a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						value: 1,
						damageType: DamageType.Lightning
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-lightning-treads-1b',
						name: '',
						field: FeatureField.Speed,
						value: 2
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-lightning-treads-5',
						name: '',
						description: 'Any damage-dealing weapon ability using your unarmed strike deals 1 extra lightning damage for each square you move this turn before you use the ability to a maximum bonus of +2.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-lightning-treads-5a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						value: 1,
						damageType: DamageType.Lightning
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-lightning-treads-9',
						name: '',
						description: 'The maximum total damage bonus you can earn including movement increase to +3. Additionally, you can use a maneuver to perform a flying lightning kick on one adjacent creature. That target is pushed up to 5 squares, and you can move to any square adjacent to the target after the push.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-lightning-treads-9a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						value: 1,
						damageType: DamageType.Lightning
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-lightning-treads-9b',
							name: 'Use Lightning Treads',
							description: 'Perform a flying lightning kick',
							type: FactoryLogic.type.createManeuver(),
							sections: [
								FactoryLogic.createAbilitySectionText('One adjacent creature is pushed up to 5 squares, and you can move to any square adjacent to the target after the push.')
							]
						})
					})
				]
			}
		]
	});

	static revengersWrap: Item = FactoryLogic.createItem({
		id: 'item-revengers-wrap',
		name: 'Revenger\'s Wrap',
		description: 'When first handled, this tattered cloak fills the mind with thoughts of revenge.',
		type: ItemType.Leveled,
		keywords: [ AbilityKeyword.Neck, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A cloak worn by a murdered monarch',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-revengers-wrap-1',
						name: '',
						description: 'While you wear this cloak, any creature who damages you is marked for revenge until the end of your next turn or until another creature damages you. Any strike you make against a creature marked for revenge deals extra damage equal to your highest characteristic score, and whenever you damage a creature marked for revenge, they are also bleeding until the end of their next turn.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-revengers-wrap-5',
						name: '',
						description: 'Each creature who damages you is marked for revenge until the end of your next turn. Whenever you damage a creature marked for revenge, they are also bleeding (save ends).'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-revengers-wrap-9',
						name: '',
						description: 'When you have three or more creatures marked for revenge and you target one of them with an ability that targets only one creature, you target all the creatures marked for revenge, regardless of their distance from you and even if you don’t have line of effect to them.'
					})
				]
			}
		]
	});

	static thiefOfJoy: Item = FactoryLogic.createItem({
		id: 'item-thief-of-joy',
		name: 'Thief of Joy',
		description: 'This burnished copper torque thrums with a sense of judgment.',
		type: ItemType.Leveled,
		keywords: [ AbilityKeyword.Neck, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A pound of feathers, a pound of bricks from the Seven Cities of Hell',
			source: 'Texts or lore in Anjali',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-thief-of-joy-1',
							name: 'Use Thief of Joy',
							type: FactoryLogic.type.createManeuver(),
							sections: [
								FactoryLogic.createAbilitySectionText('Choose a creature in your line of effect. You learn the target\'s level. If their level is higher than yours, the torque grants you envy. If their level is equal to or lower than yours, the torque grants you disdain. You can have both envy and disdain from different creatures, but not more than one instance of either.'),
								FactoryLogic.createAbilitySectionPackage('item-thief-of-joy-tag')
							]
						})
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-thief-of-joy-1a',
							name: 'Item Ability',
							type: FactoryLogic.type.createTrigger('A creature within 10 squares of you deals damage to another creature'),
							sections: [
								FactoryLogic.createAbilitySectionText('You expend your envy or disdain. If you expend envy, you deal damage equal to the triggering damage to a creature adjacent to you. If you expend disdain, you reduce the triggering damage by half. At the end of the encounter, you lose any envy or disdain granted by the torque.')
							]
						})
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-thief-of-joy-1b',
						field: FeatureField.Stamina,
						valueCharacteristics: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
						valueCharacteristicMultiplier: 2
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.createPackageContent({
						id: 'item-thief-of-joy-5',
						name: '5th',
						description: 'When the target creature is the same level as you, you gain your choice of envy or disdain.',
						tag: 'item-thief-of-joy-tag'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-thief-of-joy-5a',
						field: FeatureField.Stamina,
						valueCharacteristics: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ]
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.createPackageContent({
						id: 'item-thief-of-joy-5',
						name: '9th',
						description: 'You can have multiple instances of envy and disdain, with no limit on either.',
						tag: 'item-thief-of-joy-tag'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-thief-of-joy-9a',
						field: FeatureField.Stamina,
						valueCharacteristics: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
						valueCharacteristicMultiplier: 2
					})
				]
			}
		]
	});
}
