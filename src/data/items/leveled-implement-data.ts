import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';

export class LeveledImplementData {
	static abjurersBastion: Item = FactoryLogic.createItem({
		id: 'item-abjurers-bastion',
		name: 'Abjurer\'s Bastion',
		description: 'An ornate ring is set with a large diamond that swirls with blue light, and whose inner surface is etched with protective runes.',
		type: ItemType.LeveledImplement,
		keywords: [ AbilityKeyword.Implement, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A diamond ring',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Might, Characteristic.Presence, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-abjurers-bastion-1',
						name: '',
						description: 'Whenever you deal rolled damage to a creature using a magic or psionic ability, you gain temporary Stamina equal to your highest characteristic score.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-abjurers-bastion-1a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-abjurers-bastion-1b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-abjurers-bastion-5',
							name: 'Implement Ability',
							type: FactoryLogic.type.createManeuver({ qualifiers: [ 'After you deal rolled damage using a magic or psionic ability' ] }),
							distance: [ FactoryLogic.distance.createRanged(5) ],
							target: 'Self or one ally',
							sections: [
								FactoryLogic.createAbilitySectionText('Create an immobile field of protection that is a 1 cube around the target. While in the area, the target has damage immunity 5. The field disappears at the start of your next turn.'),
								FactoryLogic.createAbilitySectionPackage('item-abjurers-bastion-tag')
							]
						})
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-abjurers-bastion-5a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-abjurers-bastion-5b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-abjurers-bastion-9',
						name: '',
						description: 'Whenever you deal rolled damage to a creature using a magic or psionic ability, you and each ally within 5 squares of you gains temporary Stamina equal to your highest characteristic score.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-abjurers-bastion-9a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-abjurers-bastion-9b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1
					}),
					FactoryLogic.feature.createPackageContent({
						id: 'item-abjurers-bastion-9c',
						name: '',
						description: 'The size of your field of protection increases to a 3 cube, and it can be placed anywhere within 10 squares of you. You and each ally in the area gain its benefits.',
						tag: 'item-abjurers-bastion-tag'
					})
				]
			}
		]
	});

	static brittlebreaker: Item = FactoryLogic.createItem({
		id: 'item-brittlebreaker',
		name: 'Brittlebreaker',
		description: 'This crystal wand thrums with power, yet is so thin and brittle that it feels as if even a slight squeeze will shatter it.',
		type: ItemType.LeveledImplement,
		keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Wand ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A handful of shattered quartz',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-brittlebreaker-1',
						name: 'Implement Ability',
						description: 'While you wield this implement, you gain an edge on magic or psionic abilities if you aren’t at full Stamina, or a double edge if you are winded.'
					}),
					FactoryLogic.feature.createDamageModifier({
						id: 'item-brittlebreaker-1a',
						modifiers: [
							FactoryLogic.damageModifier.create({
								damageType: DamageType.Damage,
								modifierType: DamageModifierType.Weakness,
								value: 3
							})
						]
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-brittlebreaker-1b',
						keywords: [ AbilityKeyword.Magic ],
						value: 2,
						damageType: DamageType.Psychic
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-brittlebreaker-1c',
						keywords: [ AbilityKeyword.Psionic ],
						value: 2,
						damageType: DamageType.Psychic
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-brittlebreaker-5',
						name: '',
						description: 'Once per round when you take more than 20 damage from a single source, the implement’s extra damage is doubled until the end of your next turn.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-brittlebreaker-5a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1,
						damageType: DamageType.Psychic
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-brittlebreaker-5b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1,
						damageType: DamageType.Psychic
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-brittlebreaker-9',
						name: '',
						description: 'Whenever you use a damage-dealing magic or psionic ability, you can take half as much total damage as is dealt to all targets to immediately use the same ability again. The damage you take can’t be reduced in any way. You can’t use this benefit more than once a turn.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-brittlebreaker-9a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1,
						damageType: DamageType.Psychic
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-brittlebreaker-9b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1,
						damageType: DamageType.Psychic
					})
				]
			}
		]
	});

	static chaldorb: Item = FactoryLogic.createItem({
		id: 'item-chaldorb',
		name: 'Chaldorb',
		description: 'A perfectly clear sphere is embossed with fine ivory and crystal that is frigid to the touch.',
		type: ItemType.LeveledImplement,
		keywords: [ AbilityKeyword.Implement, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'An ounce of primordial ice, an ounce of mammoth-ivory shards',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-chaldorb-1',
						name: '',
						description: 'While you wield this implement, if you make a magic strike, the strike must deal cold damage instead of its usual damage.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-chaldorb-1a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-chaldorb-1b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-chaldorb-5',
						name: '',
						description: 'Whenever you use a magic or psionic ability, a whirlwind of sleet and ice whips around you, dealing 3 cold damage to each adjacent enemy.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-chaldorb-5a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-chaldorb-5b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-chaldorb-9',
						name: '',
						description: 'The whirlwind you create when you use a magic or psionic ability deals 6 cold damage to each enemy within 2 squares of you. Additionally, the whirlwind creates a 2 aura around you that lasts until the start of your next turn. Each enemy who enters the aura for the first time in a combat round or starts their turn there takes 6 cold damage.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-chaldorb-9a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-chaldorb-9b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1
					})
				]
			}
		]
	});

	static etherFueledVessel: Item = FactoryLogic.createItem({
		id: 'item-ether-fueled-vessel',
		name: 'Ether-Fueled Vessel',
		description: 'This bronze bottle has been shaped into the form of a ghostly figure.',
		type: ItemType.LeveledImplement,
		keywords: [ AbilityKeyword.Implement, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Incense distilled from the essence of ether',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Intuition, Characteristic.Reason ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-ether-fueled-vessel-1',
						name: '',
						description: 'While you wield this implement, whenever you deal rolled damage to a creature using a magic or psionic ability, they become insubstantial to you until the end of their next turn, allowing you to pass through them freely. While insubstantial, a creature can’t make opportunity attacks against you.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-ether-fueled-vessel-1a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-ether-fueled-vessel-1b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-ether-fueled-vessel-5',
						name: '',
						description: 'When you move through a creature who is insubstantial to you, you can use a free triggered action to deal damage to them equal to your highest characteristic score. If you do, the insubstantial effect ends immediately after you pass through the creature and into an adjacent space outside them.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-ether-fueled-vessel-5a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-ether-fueled-vessel-5b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-ether-fueled-vessel-9',
						name: '',
						description: 'Any creature who is insubstantial to you and isn’t a leader or solo creature also can’t make opportunity attacks against your allies while they remain insubstantial.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-ether-fueled-vessel-9a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-ether-fueled-vessel-9b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1
					})
				]
			}
		]
	});

	static foesenseLenses: Item = FactoryLogic.createItem({
		id: 'item-foesense-lenses',
		name: 'Foesense Lenses',
		description: 'These spectacles feature pink-tinted glass lenses held in a silver frame.',
		type: ItemType.LeveledImplement,
		keywords: [ AbilityKeyword.Implement, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Two clear lenses carved from volcanic glass',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-foesense-lenses-1',
						name: '',
						description: 'While you wield this implement, whenever you deal rolled damage to a creature using a magic or psionic ability, you can use that creature’s senses until the end of your next turn, allowing you to experience all they observe and to use your abilities as if you were in their space. You also benefit from your own senses at the same time.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-foesense-lenses-1a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-foesense-lenses-1b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-foesense-lenses-5',
						name: '',
						description: 'Whenever you deal 20 or more rolled damage with a magic or psionic ability to a creature whose senses you are using, that creature is weakend until the end of their next turn.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-foesense-lenses-5a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-foesense-lenses-5b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-foesense-lenses-9',
						name: '',
						description: 'Whenever you deal 30 or more rolled damage with a magic or psionic ability to a creature whose senses you are using, that creature is dazed until the end of their next turn.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-foesense-lenses-9a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-foesense-lenses-9b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1
					})
				]
			}
		]
	});

	static wordsBecomeWonders: Item = FactoryLogic.createItem({
		id: 'item-words-become-wonders',
		name: 'Words Become Wonders at Next Breath',
		description: 'This ornate high elf tome seems to sigh each time it is opened.',
		type: ItemType.LeveledImplement,
		keywords: [ AbilityKeyword.Implement, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Written permission from a high elf magistrate',
			source: 'Texts or lore in Hyrallic',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-words-become-wonders-1',
						name: '',
						description: 'You can open or close the tome as a maneuver while speaking or thinking its full name. While the tome is open, it floats in an adjacent space and flips to specific pages at your command, and you gain an edge on Reason tests made to recall lore.'
					}),
					FactoryLogic.feature.createAbilityDistance({
						id: 'item-words-become-wonders-1a',
						name: '',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						value: 3
					}),
					FactoryLogic.feature.createAbilityDistance({
						id: 'item-words-become-wonders-1b',
						name: '',
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						value: 3
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-words-become-wonders-5',
							name: 'Implement Ability',
							type: FactoryLogic.type.createTrigger('Target uses a magic or psionic ability'),
							distance: [ FactoryLogic.distance.createSpecial('Line of effect') ],
							target: 'Self or one creature',
							sections: [
								FactoryLogic.createAbilitySectionText('You grant a +3 bonus to the power roll.')
							]
						})
					}),
					FactoryLogic.feature.createAbilityDistance({
						id: 'item-words-become-wonders-5a',
						name: '',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						value: 2
					}),
					FactoryLogic.feature.createAbilityDistance({
						id: 'item-words-become-wonders-5b',
						name: '',
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						value: 2
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-words-become-wonders-9',
						name: '',
						description: 'While the tome is open, you automatically obtain a tier 3 outcome on Reason tests made to recall lore, and when you use a heroic ability, its Heroic Resource cost is reduced by 1 (to a minimum of 1).'
					})
				]
			}
		]
	});
}
