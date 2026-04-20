import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { FeatureType } from '@/enums/feature-type';
import { ItemType } from '@/enums/item-type';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';
import { PerkList } from '@/enums/perk-list';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';
import { beastheart } from '@/data/classes/beastheart/beastheart';

export const beastheartSourcebook: Sourcebook = {
	id: 'beastheart',
	name: 'The Beastheart',
	description: 'Contains the Beastheart class, items, and perks.',
	type: SourcebookType.Official,
	adventures: [],
	ancestries: [],
	careers: [],
	classes: [
		beastheart
	],
	complications: [],
	cultures: [],
	domains: [],
	encounters: [],
	imbuements: [],
	items: [
		{
			id: 'precious-collar',
			name: 'Precious Collar',
			description: 'This gold collar is bedazzled with semiprecious gems spelling out a cute pet name.',
			type: ItemType.Trinket1st,
			keywords: [
				AbilityKeyword.Magic,
				AbilityKeyword.Neck
			],
			crafting: {
				id: 'precious-collar-crafting',
				name: 'Craft Precious Collar',
				description: 'Craft a Precious Collar.',
				itemPrerequisites: 'One collar worn by a royal pet',
				source: 'Texts or lore in Vaslorian',
				characteristic: [
					Characteristic.Reason,
					Characteristic.Intuition
				],
				goal: 150,
				isCustom: false,
				progress: null
			},
			effect: '**Effect:** Only a beastheart’s companion can wear this collar. As a free maneuver, the companion can become 1T or revert to their true size. While reduced in size, the companion has an edge on tests made to hide, sneak, and disguise themselves as an ordinary animal.',
			featuresByLevel: [
				{
					level: 1,
					features: []
				},
				{
					level: 5,
					features: []
				},
				{
					level: 9,
					features: []
				}
			],
			imbuements: [],
			count: 1
		},
		{
			id: 'ruby-ring-of-recall',
			name: 'Ruby Ring of Recall',
			description: 'A dim light gleams in the heart of this ring’s gem.',
			type: ItemType.Trinket1st,
			keywords: [
				AbilityKeyword.Magic,
				AbilityKeyword.Ring
			],
			crafting: {
				id: 'ruby-ring-of-recall-crafting',
				name: 'Craft Ruby Ring of Recall',
				description: 'Craft a Ruby Ring of Recall.',
				itemPrerequisites: 'A ruby retrieved from an ancient sky elf ruin',
				source: 'Texts or lore in Hyrallic',
				characteristic: [
					Characteristic.Reason,
					Characteristic.Intuition,
					Characteristic.Presence
				],
				goal: 150,
				isCustom: false,
				progress: null
			},
			effect: '**Effect:** While wearing this ring, you can pull a willing, unconscious, or dead creature within 2 squares into the ring’s ruby as a maneuver. If the creature inside the ring is conscious they can see and hear the ring’s surroundings. Either you or the creature in the ring can use a maneuver to recall the creature from the ring, causing the creature to appear in an unoccupied space within 2 squares. A creature inside the ring can’t act except to exit the ring.',
			featuresByLevel: [
				{
					level: 1,
					features: []
				},
				{
					level: 5,
					features: []
				},
				{
					level: 9,
					features: []
				}
			],
			imbuements: [],
			count: 1
		},
		{
			id: 'speaking-scarab',
			name: 'Speaking Scarab',
			description: 'A black leather necklace is set with a golden representation of a scarab beetle.',
			type: ItemType.Trinket1st,
			keywords: [
				AbilityKeyword.Neck,
				AbilityKeyword.Psionic
			],
			crafting: {
				id: 'speaking-scarab-crafting',
				name: 'Craft Speaking Scarab',
				description: 'Craft a Speaking Scarab.',
				itemPrerequisites: 'Jewelry worn by a voiceless talker',
				source: 'Texts or lore in Variac',
				characteristic: [
					Characteristic.Reason,
					Characteristic.Intuition,
					Characteristic.Presence
				],
				goal: 150,
				isCustom: false,
				progress: null
			},
			effect: '**Effect:** Only a beastheart’s companion or an animal can wear this necklace. While wearing this necklace, the creature’s Reason score is 0 unless it would otherwise be higher. The creature can speak any language they know, and another creature who knows a language can teach that language to the creature as a respite activity. When the creature speaks, their voice issues from the scarab on the necklace.',
			featuresByLevel: [
				{
					level: 1,
					features: []
				},
				{
					level: 5,
					features: []
				},
				{
					level: 9,
					features: []
				}
			],
			imbuements: [],
			count: 1
		},
		{
			id: 'werewolf-tooth-pendant',
			name: 'Werewolf Tooth Pendant',
			description: 'A dim light gleams in the heart of this ring’s gem.',
			type: ItemType.Trinket2nd,
			keywords: [
				AbilityKeyword.Magic,
				AbilityKeyword.Neck
			],
			crafting: {
				id: 'werewolf-tooth-pendant-crafting',
				name: 'Craft Werewolf Tooth Pendant',
				description: 'Craft a Werewolf Tooth Pendant.',
				itemPrerequisites: 'An incisor from a werewolf',
				source: 'Sagas in High Kuric',
				characteristic: [
					Characteristic.Intuition,
					Characteristic.Might
				],
				goal: 300,
				isCustom: false,
				progress: null
			},
			effect: '**Effect:** : You must be a beastheart to wear this necklace. While wearing this necklace, you can use a free maneuver and spend 1 ferocity during combat to shapeshift into a hybrid form that grants you your companion’s physical characteristics. Your hybrid form lasts until the end of the encounter or you revert to your true form as a free maneuver. While in hybrid form, you can use abilities with the Companion keyword, your speed increases to your companion’s speed (if it is higher), and you gain your companion’s movement types and damage immunities.',
			featuresByLevel: [
				{
					level: 1,
					features: []
				},
				{
					level: 5,
					features: []
				},
				{
					level: 9,
					features: []
				}
			],
			imbuements: [],
			count: 1
		},
		{
			id: 'bandana-of-invisibility',
			name: 'Bandana of Invisibility',
			description: 'Although you see nothing before you, your hands can discern an invisible scrap of cloth.',
			type: ItemType.Trinket3rd,
			keywords: [
				AbilityKeyword.Neck,
				AbilityKeyword.Psionic
			],
			crafting: {
				id: 'bandana-of-invisibility-crafting',
				name: 'Craft Bandana of Invisibility',
				description: 'Craft a Bandana of Invisibility.',
				itemPrerequisites: 'Lightbender fur',
				source: 'Texts or lore in Hyrallic',
				characteristic: [
					Characteristic.Intuition,
					Characteristic.Reason,
					Characteristic.Presence
				],
				goal: 450,
				isCustom: false,
				progress: null
			},
			effect: '**Effect:** Only a beastheart’s companion or an animal can wear this bandana. While wearing this bandana, the creature is invisible. When the creature uses an ability that deals damage, they become visible until the start of their next turn.',
			featuresByLevel: [
				{
					level: 1,
					features: []
				},
				{
					level: 5,
					features: []
				},
				{
					level: 9,
					features: []
				}
			],
			imbuements: [],
			count: 1
		},
		{
			id: 'battle-wings',
			name: 'Battle Wings',
			description: 'These gently undulating wings affix themselves to a creature’s shoulders.',
			type: ItemType.Trinket4th,
			keywords: [
				AbilityKeyword.Neck,
				AbilityKeyword.Magic
			],
			crafting: {
				id: 'battle-wings-crafting',
				name: 'Craft Battle Wings',
				description: 'Craft a Battle Wings.',
				itemPrerequisites: 'A creature’s feather given as a gift by the creature',
				source: 'Texts or lore in Khelt and Yllric',
				characteristic: [
					Characteristic.Intuition,
					Characteristic.Agility
				],
				goal: 500,
				isCustom: false,
				progress: null
			},
			effect: '**Effect:** Only a beastheart’s companion or an animal can wear this item. While wearing it, the creature grows feathered wings if they don’t already have wings and can fly. If the creature can already fly, they gain a +3 bonus to their speed while flying.',
			featuresByLevel: [
				{
					level: 1,
					features: []
				},
				{
					level: 5,
					features: []
				},
				{
					level: 9,
					features: []
				}
			],
			imbuements: [],
			count: 1
		},
		{
			id: 'cavalry-armor',
			name: 'Cavalry Armor',
			description: '(Beastheart only) While wearing this absurdly heavy plate armor it’s almost impossible to move — and once you get into motion, it’s equally hard to stop.',
			type: ItemType.LeveledArmor,
			keywords: [
				KitArmor.Heavy,
				AbilityKeyword.Magic
			],
			crafting: {
				id: 'cavalry-armor-crafting',
				name: 'Craft Cavalry Armor',
				description: 'Craft a Cavalry Armor.',
				itemPrerequisites: 'Melted-down dragon knight armor',
				source: 'Texts or lore in Vaslorian and Vastariax',
				characteristic: [
					Characteristic.Might,
					Characteristic.Intuition
				],
				goal: 450,
				isCustom: false,
				progress: null
			},
			effect: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.create({
							id: '2R4igWPPK0rMD4ar',
							name: '1st Level',
							description: 'The first time on a turn that you or your companion would move into a creature’s space, whoever is moving can push that creature 1 square before continuing their movement. This forced movement ignores stability if the creature’s stability is lower than the pusher’s stability.'
						}),
						FactoryLogic.feature.createBonus({
							id: '5kJE5eWyV5oYvBQt',
							field: FeatureField.Stamina,
							value: 6
						}),
						FactoryLogic.feature.createBonus({
							id: 'cB1JfMneGZRNMeJV',
							field: FeatureField.Stability,
							value: 1
						})
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.create({
							id: 'bmYdcuzw1Q2ZLX0Y',
							name: '5th Level',
							description: 'When a creature is force moved into you or your companion, whoever was collided with takes no damage.'
						}),
						FactoryLogic.feature.createBonus({
							id: 'ffiJZH8pEExQLtj2',
							field: FeatureField.Stamina,
							value: 6
						}),
						FactoryLogic.feature.createBonus({
							id: 'HlLIaFQ4hDQZfIOo',
							field: FeatureField.Stability,
							value: 1
						})
					]
				},
				{
					level: 9,
					features: [
						FactoryLogic.feature.create({
							id: 'E3JvJ8ZXonrifW4p',
							name: '9th Level',
							description: 'When you or your companion pushes a creature using this armor’s feature, the creature takes damage equal to twice the pusher’s Might score and is knocked prone.'
						}),
						FactoryLogic.feature.createBonus({
							id: 'losIkWDYVI48lsyW',
							field: FeatureField.Stamina,
							value: 9
						}),
						FactoryLogic.feature.createBonus({
							id: '1pabujhaYnt8u1ws',
							field: FeatureField.Stability,
							value: 1
						})
					]
				}
			],
			imbuements: [],
			count: 1
		},
		{
			id: 'pack-harness',
			name: 'Pack Harness',
			description: '(Beastheart only) While wearing these worn leather bands, your companion appears as not a single creature but a hunting pack.',
			type: ItemType.ImbuedArmor,
			keywords: [
				AbilityKeyword.Magic,
				KitArmor.Light
			],
			crafting: {
				id: 'pack-harness-crafting',
				name: 'Craft Pack Harness',
				description: 'Craft a Pack Harness.',
				itemPrerequisites: 'A leash from an archfey’s hunting pack',
				source: 'Texts or lore in Khelt',
				characteristic: [
					Characteristic.Intuition,
					Characteristic.Agility
				],
				goal: 450,
				isCustom: false,
				progress: null
			},
			effect: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.create({
							id: '2R4igWPPK0rMD4ar',
							name: '1st Level',
							description: 'You can spend 10 minutes to activate this armor’s power, causing two illusory copies of your companion to appear in their space and move with them. Whenever your companion takes damage from an ability that deals rolled damage while visible, you can banish one copy to decrease the power roll outcome by one tier (to a minimum of tier 1). When you activate this armor’s power again, any old copies vanish.'
						}),
						FactoryLogic.feature.createBonus({
							id: '6RFOW2b7AXKcKIzX',
							field: FeatureField.Stamina,
							value: 6
						})
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.create({
							id: 'bmYdcuzw1Q2ZLX0Y',
							name: '5th Level',
							description: 'Whenever you activate this armor’s power, your companion gains three illusory copies.'
						}),
						FactoryLogic.feature.createBonus({
							id: 'bGhbnK99URPnzspV',
							field: FeatureField.Stamina,
							value: 6
						})
					]
				},
				{
					level: 9,
					features: [
						FactoryLogic.feature.create({
							id: 'E3JvJ8ZXonrifW4p',
							name: '9th Level',
							description: 'Whenever you activate this armor’s power, your companion gains four illusory copies. Additionally, while you share your companion’s space, you take on the appearance of one of the pack. When you take damage from an ability that deals rolled damage while in your companion’s space, you can banish one copy to decrease the power roll outcome by one tier (to a minimum of tier 1).'
						}),
						FactoryLogic.feature.createBonus({
							id: 'mzRRLq8y6apIiBnV',
							field: FeatureField.Stamina,
							value: 9
						})
					]
				}
			],
			imbuements: [],
			count: 1
		},
		{
			id: 'thorn-dragonscale',
			name: 'Thorn Dragonscale',
			description: '(Beastheart only) This armor, fashioned from the barbed scales of a thorn dragon, still pulses with the echo of the dragon’s heartbeat.',
			type: ItemType.ImbuedArmor,
			keywords: [
				AbilityKeyword.Magic,
				KitArmor.Medium
			],
			crafting: {
				id: 'thorn-dragonscale-crafting',
				name: 'Craft Thorn Dragonscale',
				description: 'Craft a Thorn Dragonscale.',
				itemPrerequisites: 'Scales from a slain thorn dragon',
				source: 'Texts or lore in the first language.',
				characteristic: [
					Characteristic.Intuition,
					Characteristic.Agility
				],
				goal: 450,
				isCustom: false,
				progress: null
			},
			effect: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.create({
							id: 'item-kings-roar-1',
							name: '1st Level',
							description: 'When a creature starts their turn either grabbed by or grabbing you or your companion, they are bleeding until the end of their next turn.'
						}),
						FactoryLogic.feature.createBonus({
							id: 'item-kings-roar-1a',
							field: FeatureField.Stamina,
							value: 6
						})
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.create({
							id: 'item-kings-roar-5',
							name: '5th Level',
							description: 'You or your companion can use a maneuver to latch onto a creature or object of size 1L or smaller within 3 squares with thorned vines, pulling the target 3 squares.'
						}),
						FactoryLogic.feature.createBonus({
							id: 'item-kings-roar-5a',
							field: FeatureField.Stamina,
							value: 6
						})
					]
				},
				{
					level: 9,
					features: [
						FactoryLogic.feature.create({
							id: 'item-kings-roar-9',
							name: '9th Level',
							description: 'Whenever you or your companion pulls a creature with thorned vines using the armor, the target also takes 5 damage and is grabbed by whoever force moved them.'
						}),
						FactoryLogic.feature.createBonus({
							id: 'item-kings-roar-9a',
							field: FeatureField.Stamina,
							value: 9
						})
					]
				}
			],
			imbuements: [],
			count: 1
		},
		{
			id: 'rampant-shield',
			name: 'Rampant Shield',
			description: '(Beastheart only) This battered shield bears a magically animated painting of a lion rampant.',
			type: ItemType.ImbuedArmor,
			keywords: [
				AbilityKeyword.Magic,
				KitArmor.Shield
			],
			crafting: {
				id: 'rampant-shield-crafting',
				name: 'Craft Rampant Shield',
				description: 'Craft a Rampant Shield.',
				itemPrerequisites: 'Strands from the manes of nine lions',
				source: 'Texts or lore in Vaslorian',
				characteristic: [
					Characteristic.Intuition,
					Characteristic.Might
				],
				goal: 450,
				isCustom: false,
				progress: null
			},
			effect: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.create({
							id: 'item-kings-roar-1',
							name: '1st Level',
							description: 'The painting on the shield changes to resemble your companion. Additionally, your companion can see as if they were in your space as well as their own, and whenever your companion uses an ability, they can do so as if they were in either your space or their own.'
						}),
						FactoryLogic.feature.createBonus({
							id: 'item-kings-roar-1a',
							field: FeatureField.Stamina,
							value: 3
						})
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.create({
							id: 'item-kings-roar-5',
							name: '5th Level',
							description: 'Your companion can use 2 squares of movement to teleport from their current location and leap out of the shield, landing in a space adjacent to you.'
						}),
						FactoryLogic.feature.createBonus({
							id: 'item-kings-roar-5a',
							field: FeatureField.Stamina,
							value: 3
						})
					]
				},
				{
					level: 9,
					features: [
						FactoryLogic.feature.create({
							id: 'item-kings-roar-9',
							name: '9th Level',
							description: 'The shield can make opportunity attacks as if it was your companion.'
						}),
						FactoryLogic.feature.createBonus({
							id: 'item-kings-roar-9a',
							field: FeatureField.Stamina,
							value: 3
						})
					]
				}
			],
			imbuements: [],
			count: 1
		},
		{
			id: 'glancing-bow',
			name: 'Glancing Bow',
			description: '(Beastheart only) This bow is festooned with mirrors and sights pointing in all directions.',
			type: ItemType.LeveledWeapon,
			keywords: [
				KitWeapon.Bow,
				AbilityKeyword.Magic
			],
			crafting: {
				id: 'glancing-bow-crafting',
				name: 'Craft Glancing Bow',
				description: 'Craft a Glancing Bow.',
				itemPrerequisites: 'A bow used to shoot an apple from someone’s head ',
				source: 'Texts or lore in Yllric',
				characteristic: [
					Characteristic.Reason,
					Characteristic.Intuition,
					Characteristic.Agility
				],
				goal: 450,
				isCustom: false,
				progress: null
			},
			effect: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.create({
							id: 'item-glancing-bow-1',
							name: '1st Level',
							description: 'You can target your companion with a ranged weapon strike using this bow, making a glancing shot. The companion can use a free triggered action to redirect the strike to another target as if the companion were the source of the ability, using the ability’s original distance. You can’t make more than one glancing shot as part of the same ability.'
						}),
						FactoryLogic.feature.createAbilityDamage({
							id: 'item-glancing-bow-1a',
							keywords: [
								AbilityKeyword.Weapon,
								AbilityKeyword.Ranged
							],
							value: 1
						})
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.create({
							id: 'item-glancing-bow-5',
							name: '5th Level',
							description: 'When your companion redirects your glancing shot, the strike gains an edge if the target is within 5 squares of your companion.'
						}),
						FactoryLogic.feature.createAbilityDamage({
							id: 'item-glancing-bow-5a',
							keywords: [
								AbilityKeyword.Weapon,
								AbilityKeyword.Ranged
							],
							value: 1
						})
					]
				},
				{
					level: 9,
					features: [
						FactoryLogic.feature.create({
							id: 'item-glancing-bow-9',
							name: '9th Level',
							description: 'You can now make a glancing shot off of an enemy. When you do so, the enemy is unaffected by the strike but takes damage equal to your Intuition score, and you can redirect the strike to a second target as if the enemy was the source of the ability, provided you can see the second target.'
						}),
						FactoryLogic.feature.createAbilityDamage({
							id: 'item-glancing-bow-9a',
							keywords: [
								AbilityKeyword.Weapon,
								AbilityKeyword.Ranged
							],
							value: 1
						})
					]
				}
			],
			imbuements: [],
			count: 1
		},
		{
			id: 'horned-champion',
			name: 'Horned Champion',
			description: '(Beastheart only) This paired helmet and barding face shield are each set with a pair of curving metal horns.',
			type: ItemType.LeveledWeapon,
			keywords: [
				KitWeapon.Heavy,
				AbilityKeyword.Magic
			],
			crafting: {
				id: 'horned-champion-crafting',
				name: 'Craft Horned Champion',
				description: 'Craft a Horned Champion.',
				itemPrerequisites: 'The horns of a minotaur',
				source: 'Epic poem in High Kuric',
				characteristic: [
					Characteristic.Might,
					Characteristic.Reason,
					Characteristic.Intuition
				],
				goal: 450,
				isCustom: false,
				progress: null
			},
			effect: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.create({
							id: 'XSBQw-DSs4v-mNPX3-DWpph-12mD0-5gDkg',
							name: '1st Level',
							description: 'Your abilities with the Melee and Weapon keywords also gain the Charge keyword.'
						}),
						FactoryLogic.feature.createAbilityDamage({
							id: 'ekCLl-nWNa2-iTQ7d-g8K8l-Zwzj6-0lA1Z',
							keywords: [
								AbilityKeyword.Weapon,
								AbilityKeyword.Melee
							],
							value: 1
						})
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.create({
							id: 'Wi3x9-2baXL-WU3U4-nv330-p99FD-w3sGN',
							name: '5th Level',
							description: 'Whenever you or your companion uses the Charge main action and obtains a tier 3 outcome with an ability, whoever used the action can either knock the target prone, push them 2 squares or increase the distance of a push made as part of the charge, or deal extra damage equal to their own Might score.'
						}),
						FactoryLogic.feature.createAbilityDamage({
							id: 'pgUi1-Q1Yps-NZfwz-hedfS-AOHVQ-JGCTy',
							keywords: [
								AbilityKeyword.Weapon,
								AbilityKeyword.Melee
							],
							value: 1
						})
					]
				},
				{
					level: 9,
					features: [
						FactoryLogic.feature.create({
							id: 'tfEin-gTp4k-g289z-WSJ8D-Ex8yv-67l6R',
							name: '9th Level',
							description: 'When you or your companion uses the Charge main action, the movement doesn’t provoke opportunity attacks.'
						}),
						FactoryLogic.feature.createAbilityDamage({
							id: '5hfiW-KgVm1-4SWMU-IXA0O-GO4N7-yI21T',
							keywords: [
								AbilityKeyword.Weapon,
								AbilityKeyword.Melee
							],
							value: 1
						})
					]
				}
			],
			imbuements: [],
			count: 1
		},
		{
			id: 'longclaw',
			name: 'Longclaw',
			description: '(Beastheart only) The arm-length claws jutting from your armor are your only weapon.',
			type: ItemType.LeveledWeapon,
			keywords: [
				AbilityKeyword.Magic,
				KitWeapon.Medium
			],
			crafting: {
				id: 'longclaw-crafting',
				name: 'Craft Longclaw',
				description: 'Craft a Longclaw.',
				itemPrerequisites: 'The claws of a dragon',
				source: 'Texts or lore in the First Language',
				characteristic: [
					Characteristic.Might,
					Characteristic.Reason,
					Characteristic.Intuition
				],
				goal: 450,
				isCustom: false,
				progress: null
			},
			effect: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.create({
							id: 'Ig1Sp-T0Grz-zmmPw-SpKqn-lCS0K-rm7Hf',
							name: '1st Level',
							description: 'You and your companion gain a +1 bonus to melee distance.'
						}),
						FactoryLogic.feature.createAbilityDamage({
							id: 'rvoOL-jOOC8-LzpAd-FNFl1-QHGwj-HoAvG',
							keywords: [
								AbilityKeyword.Weapon,
								AbilityKeyword.Melee
							],
							value: 1
						})
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.create({
							id: 'aGsgY-T3GiD-2fHcN-LLQty-9mZA9-BbDIt',
							name: '5th Level',
							description: 'Whenever you or your companion grabs a creature or a creature grabs either of you, the creature is bleeding (save ends).'
						}),
						FactoryLogic.feature.createAbilityDamage({
							id: 'MjhJL-x3qZV-upeWs-lAWBA-X1m6W-Apz4J',
							keywords: [
								AbilityKeyword.Melee,
								AbilityKeyword.Weapon
							],
							value: 1
						})
					]
				},
				{
					level: 9,
					features: [
						FactoryLogic.feature.create({
							id: 'YIaRO-j44K7-kICc4-7clUG-qPFYt-jQXAA',
							name: '9th Level',
							description: 'Whenever you or your companion causes a creature to become bleeding or uses an ability that deals damage to a bleeding creature, you can each spend a Recovery.'
						}),
						FactoryLogic.feature.createAbilityDamage({
							id: '9kFjH-fkcqO-rJvvK-IdzvI-bxl35-ytZUG',
							keywords: [
								AbilityKeyword.Weapon,
								AbilityKeyword.Melee
							],
							value: 1
						})
					]
				}
			],
			imbuements: [],
			count: 1
		},
		{
			id: 'scorpion-tails',
			name: 'Scorpion Tails',
			description: '(Beastheart only) These braids of articulated, wickedly barbed tails weave behind your heads, threatening painful stings.',
			type: ItemType.LeveledWeapon,
			keywords: [
				AbilityKeyword.Magic,
				KitWeapon.Light
			],
			crafting: {
				id: 'scorpion-tails-crafting',
				name: 'Craft Scorpion Tails',
				description: 'Craft a Scorpion Tails.',
				itemPrerequisites: 'The stinger from a manticore\'s tail',
				source: 'Texts or lore in Khemharic',
				characteristic: [
					Characteristic.Agility,
					Characteristic.Reason,
					Characteristic.Intuition
				],
				goal: 450,
				isCustom: false,
				progress: null
			},
			effect: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'SwopF-Qac8G-EV0Cw-h71I4-yu3or-2p2Og',
								name: 'Scorpion Tail',
								description: 'Your scorpion tail lashes out.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [
									AbilityKeyword.Melee,
									AbilityKeyword.Strike
								],
								distance: [
									FactoryLogic.distance.createMelee(2)
								],
								target: 'One creature',
								sections: [
									FactoryLogic.createAbilitySectionText('The target takes poison damage equal to 3 + your Might score.'),
									FactoryLogic.createAbilitySectionPackage('scorpion-tails')
								]
							})
						}),
						FactoryLogic.feature.createAbilityDamage({
							id: 'T7q8s-HY6Sh-dQDge-W7p4b-7HktZ-C6kwh',
							keywords: [
								AbilityKeyword.Weapon,
								AbilityKeyword.Melee
							],
							value: 1
						})
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.createPackageContent({
							id: 'HNqP0-Bnqms-tH8s0-lE8AM-KicUm-QPuhO',
							name: '5th Level',
							description: 'The Scorpion Tail ability’s distance increases to melee 3.',
							tag: 'scorpion-tails'
						}),
						FactoryLogic.feature.createAbilityDamage({
							id: 'TsHdS-98ED6-DRlYp-RpPwZ-VwlV2-pb1lM',
							keywords: [
								AbilityKeyword.Melee,
								AbilityKeyword.Weapon
							],
							value: 1
						})
					]
				},
				{
					level: 9,
					features: [
						FactoryLogic.feature.createPackageContent({
							id: '8rldT-PE6Px-WMNsk-rLyxS-G6Vkj-EoFvz',
							name: '9th Level',
							description: 'The Scorpion Tail ability’s distance increases to melee 4.',
							tag: 'scorpion-tails'
						}),
						FactoryLogic.feature.createAbilityDamage({
							id: 'VTq3K-uJ1nQ-g4uZF-yxOWq-1WqO3-ojFlf',
							keywords: [
								AbilityKeyword.Weapon,
								AbilityKeyword.Melee
							],
							value: 1
						})
					]
				}
			],
			imbuements: [],
			count: 1
		}
	],
	kits: [],
	monsterGroups: [],
	montages: [],
	negotiations: [],
	perks: [
		{
			id: 'perk-born-tracker',
			name: 'Born Tracker',
			description: '(Beastheart only) You and your companion have an edge on tests made to track creatures, find your way, or search for hidden creatures.',
			type: FeatureType.Text,
			data: null,
			list: PerkList.Exploration
		},
		{
			id: 'perk-people-sense',
			name: 'People Sense',
			description: '(Beastheart only) Whenever you or your companion makes a test to determine a creature’s motives, emotions, or body language while within 5 squares of each other, your partner can make the same test as a free triggered action. You both use the higher result.',
			type: FeatureType.Text,
			data: null,
			list: PerkList.Interpersonal
		},
		{
			id: 'perk-ride-along',
			name: 'Ride Along',
			description: '(Beastheart only)',
			type: FeatureType.Ability,
			data: {
				ability: FactoryLogic.createAbility({
					id: 'perk-ride-along-1',
					name: 'Ride Along',
					description: 'You ride behind your companion’s eyes.',
					type: FactoryLogic.type.createManeuver(),
					distance: [ FactoryLogic.distance.createMelee() ],
					target: 'Companion',
					sections: [
						FactoryLogic.createAbilitySectionText(`
	Your body disappears, and your consciousness rides along in your companion’s body. While you are riding along, you can sense what your companion senses and communicate with them telepathically, but you can’t control them. You can’t be detected, targeted, or affected by any effect. Any condition or effect on you is temporarily negated until you regain your body.

	Whenever your companion takes damage while you are riding along, you take the same amount of damage, which can’t be reduced in any way. You are unaffected by any effects that don’t deal damage that affect your companion.

	While you are riding along, your companion continues to benefit from any magic treasure you are wearing.

	While you are riding along, you can’t act except to spend a free maneuver to regain your body. You also regain your body if your companion dies or chooses to eject you. When you regain your body, you reappear in a space adjacent to your companion.`)
					]
				})
			},
			list: PerkList.Exploration
		},
		{
			id: 'perk-trained-thief',
			name: 'Trained Thief',
			description: '(Beastheart only) You have the Conceal Object or Pick Pocket skill. Your companion can make a test using that skill as a maneuver.',
			type: FeatureType.Text,
			data: null,
			list: PerkList.Intrigue
		},
		{
			id: 'perk-wild-rumpus',
			name: 'Wild Rumpus',
			description: '(Beastheart only)',
			type: FeatureType.Ability,
			data: {
				ability: FactoryLogic.createAbility({
					id: 'perk-wild-rumpus-1',
					name: 'Wild Rumpus',
					description: 'The ability to glide like a condor or race like a wolf is intoxicating—but beware the temptation to run yourself to death.',
					type: FactoryLogic.type.createManeuver({ free: true }),
					distance: [ FactoryLogic.distance.createSelf() ],
					target: 'Self',
					sections: [
						FactoryLogic.createAbilitySectionText('For one minute or until you or your companion takes damage, you and your companion gain each other’s movement types in addition to your own. You and your companion both use your speed or your companion’s speed, whichever is higher. Each additional time you use this ability after the first, you take damage equal to your level until you finish a respite or gain 1 or more Victories. This damage can’t be reduced in any way and doesn’t end this ability’s effect.')
					]
				})
			},
			list: PerkList.Exploration
		},
		{
			id: 'perk-wilds-explorer',
			name: 'Wilds Explorer',
			description: '(Beastheart only) You and your companion gain an edge on tests made to overcome environmental cold, heat, weather, unsteady ground, or challenging terrain. During your turn, you and your companion can ignore the first square of difficult terrain you each enter.',
			type: FeatureType.Text,
			data: null,
			list: PerkList.Exploration
		},
		{
			id: 'perk-voice-of-the-wild',
			name: 'Voice of the Wild',
			description: '(Beastheart only) Your companion can speak any language you can speak.',
			type: FeatureType.Text,
			data: null,
			list: PerkList.Interpersonal
		},
		{
			id: 'perk-you-can-pet-them',
			name: 'You Can Pet Them, They\'re Friendly',
			description: '(Beastheart only) Whenever you make a Presence test to interact with a creature while you are within 5 squares of your companion, you can use your companion’s Presence instead of your own.',
			type: FeatureType.Text,
			data: null,
			list: PerkList.Interpersonal
		}
	],
	projects: [],
	subclasses: [],
	tacticalMaps: [],
	terrain: [],
	titles: [],
	skills: [],
	languages: []
};
