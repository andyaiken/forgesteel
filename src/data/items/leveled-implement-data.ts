import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';

export class LeveledImplementData {
	static abjurersBastion: Item = FactoryLogic.createItem({
		id: 'item-abjurers-bastion',
		name: 'Abjurer’s Bastion',
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
							name: 'Use Abjurer’s Bastion',
							type: FactoryLogic.type.createManeuver({ qualifiers: [ 'After you deal rolled damage using a magic or psionic ability' ] }),
							sections: [
								FactoryLogic.createAbilitySectionText('Create an immobile field of protection that is a 1 cube around the yourself or around an ally within 5 squares. While in the area, the target has damage immunity 5. The field disappears at the start of your next turn.'),
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

	static fieldCommandersBaton: Item = FactoryLogic.createItem({
		id: 'item-field-commanders-baton',
		name: '33 Field Commanders Baton',
		description: `
This long, ornate rod with a silver bulb head is braided with 33 green cords. A new cord starts to grow while you wield the baton.

**Special**: If you are a tactician, you can wield this implement as if it had the Light Weapon keyword. Replace any reference to magic or psionic abilities with weapon abilities.`,
		type: ItemType.LeveledImplement,
		keywords: [ AbilityKeyword.Implement, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A silver ingot and a written strategy from 33 warleaders',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-field-commanders-baton-1a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-field-commanders-baton-1b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1
					}),
					FactoryLogic.feature.create({
						id: 'item-field-commanders-baton-1c',
						name: '1st Level',
						description: 'While you wield this baton, you are imbued with the experience of the commanders who wielded it before you. On your turn, whenever you or an ally deal damage to a creature within 5 squares of you, you can immediately use your maneuver to slide the creature up to 2 squares.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-field-commanders-baton-5a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-field-commanders-baton-5b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1
					}),
					FactoryLogic.feature.create({
						id: 'item-field-commanders-baton-5c',
						name: '5th Level',
						description: 'When you slide a creature using this ability and they end this slide adjacent to one of your allies, that ally can use the Grab or Knockback maneuver against the creature as a free triggered action.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-field-commanders-baton-9a',
						keywords: [ AbilityKeyword.Magic ],
						value: 1
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-field-commanders-baton-9b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 1
					}),
					FactoryLogic.feature.create({
						id: 'item-field-commanders-baton-9c',
						name: '9th Level',
						description: 'On your turn, whenever you or an ally deal damage to a creature within 10 squares of you, you can immediately use your maneuver to slide the creature up to 3 squares, ignoring stability.'
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

	static rexScepter: Item = FactoryLogic.createItem({
		id: 'item-rex-scepter',
		name: 'Rex Scepter',
		description: 'The rod resembles a simple tree branch. It grows and braids itself into an ornate scepter in the heat of battle.',
		type: ItemType.LeveledImplement,
		keywords: [ AbilityKeyword.Implement, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A tree branch and fealty from three hundred or more sworn followers',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Presence ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createBonus({
						id: 'item-rex-scepter-1a',
						field: FeatureField.Renown,
						value: 1
					}),
					FactoryLogic.feature.create({
						id: 'item-rex-scepter-1b',
						name: '1st Level',
						description: 'You can use a main action once per turn targeting a willing ally or two minions you control within 5 squares of you to make a free strike on a target within the same distance of you as a free triggered action.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.createBonus({
						id: 'item-rex-scepter-5a',
						field: FeatureField.Renown,
						value: 1
					}),
					FactoryLogic.feature.create({
						id: 'item-rex-scepter-5b',
						name: '5th Level',
						description: 'Whenever a creature you command using the scepter makes a free strike, they gain 1 surge that can be used immediately.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.createBonus({
						id: 'item-rex-scepter-9a',
						field: FeatureField.Renown,
						value: 1
					}),
					FactoryLogic.feature.create({
						id: 'item-rex-scepter-9b',
						name: '9th Level',
						description: 'The scepter’s main action can now be used as a maneuver.'
					})
				]
			}
		]
	});

	static sanctuaryHorn: Item = FactoryLogic.createItem({
		id: 'item-sanctuary-horn',
		name: 'Sanctuary Horn',
		description: 'This spiral hunting horn is embellished with branching veins of copper across the body. The metal glows red hot as the horn is blown.',
		type: ItemType.LeveledImplement,
		keywords: [ AbilityKeyword.Implement, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'The spiral shell of a fallen armory snail and whirlwinds captured from Quintessence',
			source: 'Texts or lore in Kalliac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-sanctuary-horn-1',
						name: '1st Level',
						description: 'While you wield the horn, your magic and psionic strikes deal sonic damage instead of their usual damage. Additionally, you can use a maneuver once per turn to blow the horn, allowing one ally or up to two minions you control within 5 squares of you to be recalled, instantly teleporting them into unoccupied spaces adjacent to you.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-sanctuary-horn-5',
						name: '5th Level',
						description: 'While you wield the horn, the area of your cube, burst, and aura magic or psionic abilities increases by 1. Additionally, whenever a creature is teleported by this horn, they can choose to either spend a Recovery or gain a surge.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-sanctuary-horn-9',
						name: '9th Level',
						description: 'The horn’s area bonus increases to 2. After you blow the horn as a maneuver, you can teleport yourself, another ally, or up to two other minions you control within 5 squares of you into the space left behind by a recalled target, provided they fit into the space.'
					})
				]
			}
		]
	});

	static wandOfTheUnheardOrchestra: Item = FactoryLogic.createItem({
		id: 'item-wand-of-the-unheard-orchestra',
		name: 'Wand of the Unheard Orchestra',
		description: 'This conductor’s baton has an unassuming and inornate steel body. It increases in length when it’s swung and flashes a bright light when wanded at a regular interval.',
		type: ItemType.LeveledImplement,
		keywords: [ AbilityKeyword.Implement, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'An iron ingot and a singing tree’s wood found in Arcadia',
			source: 'Texts or lore in Khelt',
			characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbilityDistance({
						id: 'item-wand-of-the-unheard-orchestra-1a',
						keywords: [ AbilityKeyword.Magic ],
						value: 3
					}),
					FactoryLogic.feature.createAbilityDistance({
						id: 'item-wand-of-the-unheard-orchestra-1b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 3
					}),
					FactoryLogic.feature.create({
						id: 'item-wand-of-the-unheard-orchestra-1c',
						name: '1st Level',
						description: 'You can use a maneuver once per turn targeting yourself or a willing ally within 5 squares of you to use a move action as a free triggered action.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.createAbilityDistance({
						id: 'item-wand-of-the-unheard-orchestra-5a',
						keywords: [ AbilityKeyword.Magic ],
						value: 2
					}),
					FactoryLogic.feature.createAbilityDistance({
						id: 'item-wand-of-the-unheard-orchestra-5b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 2
					}),
					FactoryLogic.feature.create({
						id: 'item-wand-of-the-unheard-orchestra-5c',
						name: '5th Level',
						description: 'You and any minions you control have their speed increased by 2. Whenever you or any minions you control take the Disengage move action, they can shift 2 additional squares as part of that move action.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.createAbilityDistance({
						id: 'item-wand-of-the-unheard-orchestra-9a',
						keywords: [ AbilityKeyword.Magic ],
						value: 3
					}),
					FactoryLogic.feature.createAbilityDistance({
						id: 'item-wand-of-the-unheard-orchestra-9b',
						keywords: [ AbilityKeyword.Psionic ],
						value: 3
					}),
					FactoryLogic.feature.create({
						id: 'item-wand-of-the-unheard-orchestra-9c',
						name: '9th Level',
						description: 'The wand’s maneuver can now be used as a free maneuver once during your turn, targeting yourself or an ally within 10 squares of you to use a move action as a free triggered action.'
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
							name: 'Words Become Wonders',
							type: FactoryLogic.type.createTrigger('You or a creature you have line of effect to uses a magic or psionic ability'),
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
