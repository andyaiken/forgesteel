import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { Item } from '../../models/item';
import { ItemType } from '../../enums/item-type';

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
						description: 'While you wield this implement, your damage-dealing supernatural abilities gain a +1 rolled damage bonus. Additionally, whenever you deal damage to a creature with a supernatural ability, you gain temporary Stamina equal to your highest characteristic score.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-abjurers-bastion-5',
						name: '',
						description: 'The implement\'s damage bonus increases to +2. Additionally, whenever you deal damage using a supernatural ability, you can use a maneuver to create an immobile field of protection that is a 1 cube, around yourself or an ally within 5 squares. While in the area, you or the chosen ally has damage immunity 5. The field disappears at the start of your next turn.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-abjurers-bastion-9',
						name: '',
						description: 'The implement\'s damage bonus increases to +3. Whenever you deal damage to a creature using a supernatural ability, you and each ally within 5 squares of you gains temporary Stamina equal to your highest characteristic score. Additionally, the size of your field of protection increases to a 3 cube, and it can be placed anywhere within 10 squares of you. You and each ally in the area gain its benefits.'
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
			prerequisites: 'Three ounces of shattered quartz',
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
						name: '',
						description: 'While you wield this implement, your damage-dealing supernatural abilities deal an extra 2 rolled psychic damage. Additionally, you gain an edge on supernatural power rolls if you aren\'t at full Stamina, or a double edge if you are winded.'
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
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-brittlebreaker-5',
						name: '',
						description: 'The implement\'s extra psychic damage increases to 3. Additionally, once per round when you take more than 20 damage from a single source, the implement\'s extra damage is doubled until the end of your next turn.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-brittlebreaker-9',
						name: '',
						description: 'The implement\'s extra psychic damage increases to 4. Additionally, whenever you use a damage-dealing supernatural ability, you can take half as much damage as is dealt to the target to immediately use the same ability again. The damage you take can\'t be reduced in any way. You can repeat this process until you become winded.'
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
						description: 'While you wield this implement, your damage-dealing supernatural abilities gain a +1 rolled damage bonus. Additionally, if you make a magic strike, the strike must deal cold damage instead of its usual damage.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-chaldorb-5',
						name: '',
						description: 'The implement\'s damage bonus increases to +2. Additionally, whenever you use a magic ability, a whirlwind of sleet and ice whips around you, dealing 3 cold damage to each enemy within 1 square of you.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-chaldorb-9',
						name: '',
						description: 'The implement\'s damage bonus increases to +3. The whirlwind you create when you use a magic ability deals 6 cold damage to each enemy within 2 squares of you, and creates a 2 aura around you that lasts until the start of your next turn. Each enemy who enters the aura for the first time in a round or starts their turn there takes 6 cold damage.'
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
						description: 'While you wield this implement, your damage-dealing supernatural abilities gain a +1 rolled damage bonus. Additionally, whenever you deal damage to a creature with a supernatural ability, they become insubstantial to you until the end of their next turn, allowing you to pass through them freely. While insubstantial, a creature can\'t make opportunity attacks against you.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-ether-fueled-vessel-5',
						name: '',
						description: 'The implement\'s damage bonus increases to +2. When you move through a creature who is insubstantial to you, you can use a free triggered action to make them take damage equal to your highest characteristic score. If you do, the insubstantial effect ends immediately after you pass through them and exist into an adjacent space outside of them.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-ether-fueled-vessel-9',
						name: '',
						description: 'The implement\'s damage bonus increases to +3. Any creature who isn\'t a leader or a solo creature who becomes insubstantial to you also can\'t make opportunity attacks against your allies.'
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
						description: 'While you wield this implement, whenever you deal damage to a creature with a supernatural ability, you can use that creature\'s senses until the end of your next turn, allowing you to experience all they observe and use your abilities as if you were in their space. You also benefit from your own senses at the same time'
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
						description: 'Whenever you deal damage to a creature with a supernatural ability, you can also cause intense pain in one creature whose senses you are using. That creature takes a bane on power rolls until the start of your next turn.'
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
						description: 'Any creature you have damaged with an ability using this implement in the last minute is dazed while you are using their senses.'
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

	static geometricManipulator: Item = FactoryLogic.createItem({
		id: 'item-geometric-manipulator',
		name: 'Geometric Manipulator',
		description: 'This tiny gold sphere is made up of intricately interlocking rings and plates.',
		type: ItemType.LeveledImplement,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Orb ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Fourteen gold rings each two inches in diameter',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-geometric-manipulator-1',
						name: '',
						description: 'While you wield this implement, your damage-dealing supernatural abilities gain a +1 rolled damage bonus. Additionally, when you use any supernatural ability that creates a cube or a burst, you can use a maneuver to rearrange the squares of the area into any shape you wish, provided there are no empty squares inside it.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-geometric-manipulator-5',
						name: '',
						description: 'The implement\'s damage bonus increases to +2. Additionally, when you use any supernatural ability that creates a cube or a burst, you can increase or decrease the size of the area by 1. If you decrease the size of the area, you gain an edge on the ability. If you increase the size, you take a bane on the ability.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-geometric-manipulator-9',
						name: '',
						description: 'The implement\'s damage bonus increases to +3. Additionally, you can increase or decrease the size of all your supernatural area abilities by up to 2, and rearranging the squares of a cube or burst ability requires no action.'
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
						description: 'You open or close the tome as a maneuver while saying its full name. While the tome is open, it floats in a space adjacent to you and flips to specific pages at your command. Additionally, you gain an edge on Intuition tests to recall lore.'
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
					FactoryLogic.feature.create({
						id: 'item-words-become-wonders-5',
						name: '',
						description: 'While the tome is open, the bonus to distance of your ranged magical abilities increases to +5. Additionally, when you or a creature you have line of effect to uses a supernatural ability, you can use a triggered action to gain a +3 bonus to the power roll.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-words-become-wonders-9',
						name: '',
						description: 'While the tome is open, you automatically obtain a tier 3 result on Intuition tests to recall lore, and when you use a heroic ability, its heroic resource cost is reduced by 1.'
					})
				]
			}
		]
	});
}
