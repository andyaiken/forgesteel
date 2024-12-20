import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityLogic } from '../logic/ability-logic';
import { Ancestry } from '../models/ancestry';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { FeatureField } from '../enums/feature-field';
import { FeatureLogic } from '../logic/feature-logic';
import { Sourcebook } from '../models/sourcebook';

export class AncestryData {
	static devil: Ancestry = {
		id: 'ancestry-devil',
		name: 'Devil',
		description: 'The native ancestry of the Seven Cities of Hell, devils are humanoids with red or blue skin expressed in a wide variety of hues, from bright crimson to deep purple. Each devil is born with some hellmark—horns, a tail, cloven hooves, a forked tongue, fanged incisors, or even wings.',
		features: [
			FeatureLogic.createSizeFeature({
				id: 'devil-size',
				sizeValue: 1,
				sizeMod: 'M'
			}),
			FeatureLogic.createBonusFeature({
				id: 'devil-speed',
				field: FeatureField.Speed,
				value: 5
			}),
			FeatureLogic.createChoiceFeature({
				id: 'devil-feature-1',
				name: 'Fiendish Features',
				options: [
					{
						feature: FeatureLogic.createFeature({
							id: 'devil-feature-1a',
							name: 'Barbed Tail',
							description: 'Your pointy tail allows you to punctuate all your actions. Once per round, you can deal 1 extra damage on a melee attack or free strike.'
						}),
						value: 1
					},
					{
						feature: FeatureLogic.createBonusFeature({
							id: 'devil-feature-1b',
							name: 'Beast Legs',
							description: 'Your powerful legs improve your speed by 1.',
							field: FeatureField.Speed,
							value: 1
						}),
						value: 2
					},
					{
						feature: FeatureLogic.createDamageModifierFeature({
							id: 'devil-feature-1c',
							name: 'Exposed Skeleton',
							description: 'Your bones are visible and hardened above your skin, granting you Weapon immunity 2.',
							modifiers: [
								{
									type: DamageModifierType.Immunity,
									damageType: 'Weapon',
									value: 2,
									valuePerLevel: 0
								}
							]
						}),
						value: 2
					},
					{
						feature: FeatureLogic.createFeature({
							id: 'devil-feature-1d',
							name: 'Glowing Eyes',
							description: 'Your eyes are a solid, vibrant color that flares to show your excitement or rage. Whenever you take damage from a creature, you can use a triggered action to curse that creature for daring to do you harm. The creature takes 1d10 psychic damage.'
						}),
						value: 1
					},
					{
						feature: FeatureLogic.createFeature({
							id: 'devil-feature-1e',
							name: 'Hellsight',
							description: 'Your eyes let you see through the dark, fog, and other types of concealment. You don’t take a bane on attacks against concealed, unhidden creatures.'
						}),
						value: 1
					},
					{
						feature: FeatureLogic.createFeature({
							id: 'devil-feature-1f',
							name: 'Horns',
							description: 'Your cherished horns are a hardened representation of your force of will, granting you an edge on Presence resistance rolls.'
						}),
						value: 1
					},
					{
						feature: FeatureLogic.createFeature({
							id: 'devil-feature-1g',
							name: 'Prehensile Tail',
							description: 'Your prehensile tail allows you to challenge foes on all sides. You can’t be flanked.'
						}),
						value: 1
					},
					{
						feature: FeatureLogic.createFeature({
							id: 'devil-feature-1h',
							name: 'Wings',
							description: 'You possess wings powerful enough to take you airborne. As a maneuver, you can switch between walking and flying when you are touching the ground, or vice versa when you are within 1 square of the ground. While flying, your stability drops to 0 and you have damage weakness 5. While using your wings to fly, you can stay aloft for a number of rounds equal to your Might (minimum of 1 round) before you fall prone.'
						}),
						value: 2
					}
				],
				count: 3
			}),
			FeatureLogic.createFeature({
				id: 'devil-feature-2',
				name: 'Silver Tongue',
				description: 'You can twist how your words are perceived to get a better read on people. You gain an edge when attempting to discover an NPC’s motivations and pitfalls during negotiations.'
			})
		]
	};

	static dragonKnight: Ancestry = {
		id: 'ancestry-dragon-knight',
		name: 'Dragon Knight',
		description: 'The Ritual of Dracogenesis that grants the power to create a generation of dragon knights—also known as draconians or wyrmwights—is obscure and supremely difficult for even an experienced sorcerer to master.',
		features: [
			FeatureLogic.createSizeFeature({
				id: 'dragon-knight-size',
				sizeValue: 1,
				sizeMod: 'M'
			}),
			FeatureLogic.createBonusFeature({
				id: 'dragon-knight-speed',
				field: FeatureField.Speed,
				value: 5
			}),
			FeatureLogic.createChoiceFeature({
				id: 'dragon-knight-feature-1',
				name: 'Wyrmplate',
				description: 'Your hardened scales grant you immunity 5 to one of the following damage types: cold, corruption, fire, lightning, or poison. You can change your damage immunity type while out of combat (no action required).',
				options: [
					{
						feature: FeatureLogic.createDamageModifierFeature({
							id: 'dragon-knight-feature-1a',
							modifiers: [
								{
									type: DamageModifierType.Immunity,
									damageType: 'Cold',
									value: 5,
									valuePerLevel: 0
								}
							]
						}),
						value: 1
					},
					{
						feature: FeatureLogic.createDamageModifierFeature({
							id: 'dragon-knight-feature-1b',
							modifiers: [
								{
									type: DamageModifierType.Immunity,
									damageType: 'Corruption',
									value: 5,
									valuePerLevel: 0
								}
							]
						}),
						value: 1
					},
					{
						feature: FeatureLogic.createDamageModifierFeature({
							id: 'dragon-knight-feature-1c',
							modifiers: [
								{
									type: DamageModifierType.Immunity,
									damageType: 'Fire',
									value: 5,
									valuePerLevel: 0
								}
							]
						}),
						value: 1
					},
					{
						feature: FeatureLogic.createDamageModifierFeature({
							id: 'dragon-knight-feature-1d',
							modifiers: [
								{
									type: DamageModifierType.Immunity,
									damageType: 'Lightning',
									value: 5,
									valuePerLevel: 0
								}
							]
						}),
						value: 1
					},
					{
						feature: FeatureLogic.createDamageModifierFeature({
							id: 'dragon-knight-feature-1e',
							modifiers: [
								{
									type: DamageModifierType.Immunity,
									damageType: 'Poison',
									value: 5,
									valuePerLevel: 0
								}
							]
						}),
						value: 1
					}
				]
			}),
			FeatureLogic.createChoiceFeature({
				id: 'dragon-knight-feature-2',
				name: 'Knighthood',
				options: [
					{
						feature: FeatureLogic.createFeature({
							id: 'dragon-knight-feature-2a',
							name: 'Draconian Rush',
							description: 'As a maneuver, you can fly in a straight line up to your speed. Until you reach level 6, you must end your turn on a solid surface or fall, then fall prone.'
						}),
						value: 1
					},
					{
						feature: FeatureLogic.createFeature({
							id: 'dragon-knight-feature-2b',
							name: 'Draconian Guard',
							description: 'When you or a creature adjacent to you is attacked, you can use a triggered action to swing your wings around and guard against the blow, reducing any damage from the attack by an amount equal to your level + your Victories.'
						}),
						value: 1
					},
					{
						feature: FeatureLogic.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'dragon-knight-feature-2c',
								name: 'Draconian Pride',
								description: 'You let loose a mighty roar to repel your foes and shake their spirits.',
								type: AbilityLogic.createTypeAction(),
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
								distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Burst, value: 2 }) ],
								target: 'All enemies',
								powerRoll: AbilityLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Presence ],
									tier1: '2 damage; push 1',
									tier2: '4 damage; push 3',
									tier3: '7 damage; push 5; frightened (EoT)'
								}),
								effect: 'You have a bane on the power roll for this ability when you use it in consecutive rounds of the same encounter.'
							})
						}),
						value: 1
					}
				]
			})
		]
	};

	static dwarf: Ancestry = {
		id: 'ancestry-dwarf',
		name: 'Dwarf',
		description: 'Possessed of a strength that belies their size, dwarves have flesh infused with stone—a silico-organic hybrid making them physically denser than other humanoids. They enjoy a reputation in Orden as savvy engineers and technologists thanks to the lore they inherited from their elder siblings, the long-extinct steel dwarves.',
		features: [
			FeatureLogic.createSizeFeature({
				id: 'dwarf-size',
				sizeValue: 1,
				sizeMod: 'M'
			}),
			FeatureLogic.createBonusFeature({
				id: 'dwarf-speed',
				field: FeatureField.Speed,
				value: 5
			}),
			FeatureLogic.createBonusFeature({
				id: 'dwarf-feature-1',
				name: 'Grounded',
				field: FeatureField.Stability,
				value: 1
			}),
			FeatureLogic.createFeature({
				id: 'dwarf-feature-2',
				name: 'Runic Carving',
				description: `
You can carve a magic rune onto your skin. The rune you carve determines the benefit you receive. You can change or remove this rune with 10 minutes of work while not engaged in combat.
• **Detection**: Pick a specific type of creature, such as “goblins” or “humans” or an object, such as “magic swords” or “potions.” Your rune glows softly when you are within 20 squares of a chosen creature or object, regardless of line of effect. You can change the type of creature as a maneuver.
• **Light**: Your skin sheds light for 10 squares. You can turn this on and off as a maneuver.
• **Voice**: As a maneuver, you can communicate telepathically with another willing creature you have met before whose name you name, who can speak and understand a language you know, and is within 1 mile of you. You and the creature can respond to one another as if having a normal conversation. You can change the person you communicate with by changing the rune.`
			}),
			FeatureLogic.createBonusFeature({
				id: 'dwarf-feature-3',
				name: 'Spark Off Your Skin',
				field: FeatureField.Stamina,
				value: 6,
				valuePerLevel: 1
			})
		]
	};

	static wodeElf: Ancestry = {
		id: 'ancestry-wode-elf',
		name: 'Elf (wode)',
		description: 'Children of the sylvan celestials and masters of the elf-haunted forests called wodes, wode elves see all forests as their domain by birthright. They know and enjoy their reputation among humans for snatching children who wander too far into the woods. Humans should fear the trees.',
		features: [
			FeatureLogic.createSizeFeature({
				id: 'wode-elf-size',
				sizeValue: 1,
				sizeMod: 'M'
			}),
			FeatureLogic.createBonusFeature({
				id: 'wode-elf-speed',
				field: FeatureField.Speed,
				value: 6
			}),
			FeatureLogic.createFeature({
				id: 'wode-elf-feature-1',
				name: 'Otherworldly Grace',
				description: 'Your elven body and mind can’t be contained for long, and accessing memories is as easy as living in the present for you. You gain an edge on resistance rolls, and on tests that use any skills you have from the lore skill group.'
			}),
			FeatureLogic.createFeature({
				id: 'wode-elf-feature-2',
				name: 'Wode Elf Glamor',
				description: 'You can magically alter your appearance to better blend in with your surroundings. You gain an edge on Agility tests made to hide and sneak, and tests made to find you while you are hidden take a bane.'
			})
		]
	};

	static highElf: Ancestry = {
		id: 'ancestry-high-elf',
		name: 'Elf (high)',
		description: 'Children of the solar celestials created to tend their libraries and attend to the true elves as heralds, the high elves remember a better age, before the coming of humans and war. A time when the celestials were still in the world, and all that mattered was art and beauty.',
		features: [
			FeatureLogic.createSizeFeature({
				id: 'high-elf-size',
				sizeValue: 1,
				sizeMod: 'M'
			}),
			FeatureLogic.createBonusFeature({
				id: 'high-elf-speed',
				field: FeatureField.Speed,
				value: 5
			}),
			FeatureLogic.createFeature({
				id: 'high-elf-feature-1',
				name: 'High Elf Glamor',
				description: 'A magic glamor makes others perceive you as interesting and engaging, granting you an edge on Presence tests using the Flirt or Persuade skills. This glamor makes you look and sound slightly different to each creature you meet, since what is engaging to one might be different for another. However, you never appear to be anyone other than yourself.'
			}),
			FeatureLogic.createFeature({
				id: 'high-elf-feature-2',
				name: 'Otherworldly Grace',
				description: 'Your elven body and mind can’t be contained for long, and accessing memories is as easy as living in the present for you. You gain an edge on resistance rolls, and on tests that use any skills you have from the lore skill group.'
			}),
			FeatureLogic.createFeature({
				id: 'high-elf-feature-3',
				name: 'Unstoppable Mind',
				description: 'Your mind allows you to maintain your cool in any situation. You can’t be dazed.'
			})
		]
	};

	static hakaan: Ancestry = {
		id: 'ancestry-hakaan',
		name: 'Hakaan',
		description: 'In spite of their friendly, outgoing nature, the rare presence of a hakaan in human society is considered a harbinger—an omen of dark times. Descended from a tribe of giants in upper Vanigar, the original Haka’an tribe made a bargain with Holkatja the Vanigar trickster god. They traded some of their gigantic size and strength for the ability to see the future.',
		features: [
			FeatureLogic.createSizeFeature({
				id: 'hakaan-size',
				sizeValue: 1,
				sizeMod: 'L'
			}),
			FeatureLogic.createBonusFeature({
				id: 'hakaan-speed',
				field: FeatureField.Speed,
				value: 5
			}),
			FeatureLogic.createFeature({
				id: 'hakaan-feature-1',
				name: 'Doomsight',
				description: 'Working with your Director, you can predetermine an encounter in which you will die. When that encounter begins, you become doomed. While doomed, you lose the Undaunted benefit from this ancestry, you automatically get tier 3 results on tests and resistance rolls, and you don’t die no matter how low your Stamina falls. You then die immediately at the end of the encounter. If you don’t predetermine your death encounter, you can choose to become doomed while you are dying with the director’s approval (no action required).'
			}),
			FeatureLogic.createFeature({
				id: 'hakaan-feature-2',
				name: 'Hakaan Might',
				description: 'When you force move a creature or object, you can increase the distance moved by 1.'
			}),
			FeatureLogic.createFeature({
				id: 'hakaan-feature-3',
				name: 'Undaunted',
				description: 'You can’t be weakened. Additionally, when your Stamina equals the negative of your winded value, you turn to rubble instead of dying. You are unaware of your surroundings in this state. After 12 hours, you regain Stamina equal to your recovery value.'
			})
		]
	};

	static human: Ancestry = {
		id: 'ancestry-human',
		name: 'Human',
		description: '“Humans,” the dwarf said with a combination of exasperation and awe. “Their only virtue seems to be believing in impossible things.”',
		features: [
			FeatureLogic.createSizeFeature({
				id: 'human-size',
				sizeValue: 1,
				sizeMod: 'M'
			}),
			FeatureLogic.createBonusFeature({
				id: 'human-speed',
				field: FeatureField.Speed,
				value: 5
			}),
			FeatureLogic.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'human-feature-1',
					name: 'Detect the Supernatural',
					description: 'You open your awareness to detect supernatural creatures and phenomena.',
					type: AbilityLogic.createTypeManeuver(),
					distance: [ AbilityLogic.createDistanceSelf() ],
					target: 'Self',
					effect: 'Until the end of your next turn, you know the location of any supernatural object, Undead, Construct, or creature from another plane of existence within 5 squares of you, even if you don’t have line of effect to them. You know if you’re detecting an item or a creature, and you know if a creature is Undead, a Construct, or from another plane of existence.'
				})
			}),
			FeatureLogic.createDamageModifierFeature({
				id: 'human-feature-2',
				name: 'Resist the Supernatural',
				modifiers: [
					{
						damageType: 'Magic',
						type: DamageModifierType.Immunity,
						value: 2,
						valuePerLevel: 1
					},
					{
						damageType: 'Psionic',
						type: DamageModifierType.Immunity,
						value: 2,
						valuePerLevel: 1
					}
				]
			}),
			FeatureLogic.createBonusFeature({
				id: 'human-feature-3',
				name: 'Staying Power',
				description: 'Your human anatomy allows you to fight, run, and stay awake longer than others.',
				field: FeatureField.Recoveries,
				value: 2
			})
		]
	};

	static memonek: Ancestry = {
		id: 'ancestry-memonek',
		name: 'Memonek',
		description: 'The native denizens of Axiom, the Plane of Uttermost Law, memonek dwell in a land with lakes and trees and birds and flowers. But on this alien world, the lakes are seas of mercury, the birds glitter with wings of glass stretched gossamer thin, and the flowers’ petals are iridescent metal as flexible and fragile as any earthly rose.',
		features: [
			FeatureLogic.createSizeFeature({
				id: 'memonek-size',
				sizeValue: 1,
				sizeMod: 'M'
			}),
			FeatureLogic.createBonusFeature({
				id: 'memonek-speed',
				field: FeatureField.Speed,
				value: 7
			}),
			FeatureLogic.createFeature({
				id: 'memonek-feature-1a',
				name: 'Lightweight',
				description: 'Your silicone body is aerodynamic and low in density. Whenever you fall, you reduce the distance of the fall by 2 squares. When you are force moved, you are force moved an additional 2 squares.'
			}),
			FeatureLogic.createBonusFeature({
				id: 'memonek-feature-1b',
				field: FeatureField.Stability,
				value: -2
			}),
			FeatureLogic.createFeature({
				id: 'memonek-feature-2',
				name: 'Keeper of Order',
				description: 'When you or a creature adjacent to you makes a power roll, you can remove an edge or a bane on the roll as a free triggered action. You can only use this benefit once per round.'
			})
		]
	};

	static orc: Ancestry = {
		id: 'ancestry-orc',
		name: 'Orc',
		description: 'An anger that cannot be hidden. A fury that drives them in battle. Orcs are famed throughout the world as consummate warriors—a reputation that the peace-loving orcs find distasteful.',
		features: [
			FeatureLogic.createSizeFeature({
				id: 'orc-size',
				sizeValue: 1,
				sizeMod: 'M'
			}),
			FeatureLogic.createBonusFeature({
				id: 'orc-speed',
				field: FeatureField.Speed,
				value: 5
			}),
			FeatureLogic.createFeature({
				id: 'orc-feature-1',
				name: 'Bloodfire Rush',
				description: 'When you take damage, your speed increases by 2 until the end of your next turn. You can benefit from this feature only once per round.'
			}),
			FeatureLogic.createFeature({
				id: 'orc-feature-2',
				name: 'Relentless',
				description: 'When a creature deals damage to you that leaves you dying, you can make a free strike against any creature. If the creature is reduced to 0 Stamina by your attack, you can spend a Recovery.'
			})
		]
	};

	static polder: Ancestry = {
		id: 'ancestry-polder',
		name: 'Polder',
		description: 'After humans, polders are the most numerous and diverse ancestry in Orden. They are not humans, but they live in and among humans, sharing their gods and culture. Almost every human culture in Orden has a polder saint or a human saint venerated by polder.',
		features: [
			FeatureLogic.createSizeFeature({
				id: 'polder-size',
				sizeValue: 1,
				sizeMod: 'S'
			}),
			FeatureLogic.createBonusFeature({
				id: 'polder-speed',
				field: FeatureField.Speed,
				value: 5
			}),
			FeatureLogic.createFeature({
				id: 'polder-feature-1',
				name: 'Polder Geist',
				description: 'When you start your turn while no creatures have line of effect to you, or while you are hidden from or have concealment from all creatures with line of effect to you, your speed is increased by 3 until the end of your turn.'
			}),
			FeatureLogic.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'polder-feature-2',
					name: 'Shadowmeld',
					description: 'You become an actual shadow.',
					type: AbilityLogic.createTypeManeuver(),
					keywords: [ AbilityKeyword.Magic ],
					distance: [ AbilityLogic.createDistanceSelf() ],
					target: 'Self',
					effect: 'You flatten yourself into a shadow against a wall or floor you are touching, and become hidden from any creature you have cover or concealment from or who isn’t observing you. While in shadow form, you have full awareness of your surroundings, attacks against you and tests made to find you take a bane, and you can’t move or take actions or maneuvers except to exit this form. Any ability or effect that targets more than 1 square affects you in this form only if it explicitly affects the surface you are flattened against. You can exit this form as a maneuver.'
				})
			})
		]
	};

	static revenant: Ancestry = {
		id: 'ancestry-revenant',
		name: 'Revenant',
		description: 'Unlike the necromantic rituals that produce wights and wraiths and zombies, revenants rise from the grave through a combination of an unjust death and a burning desire for vengeance. Creatures sustained on pure will, they have no need of food or water or air—and, unlike their zombified cousins, they retain all their memories and personality from life.',
		features: [
			FeatureLogic.createBonusFeature({
				id: 'revenant-speed',
				field: FeatureField.Speed,
				value: 5
			}),
			FeatureLogic.createChoiceFeature({
				id: 'revenant-feature-1',
				name: 'Former Life',
				options: [
					{
						feature: FeatureLogic.createSizeFeature({
							id: 'revenant-feature-1a',
							description: '1S',
							sizeValue: 1,
							sizeMod: 'S'
						}),
						value: 1
					},
					{
						feature: FeatureLogic.createSizeFeature({
							id: 'revenant-feature-1b',
							description: '1M',
							sizeValue: 1,
							sizeMod: 'M'
						}),
						value: 1
					},
					{
						feature: FeatureLogic.createSizeFeature({
							id: 'revenant-feature-1c',
							description: '1L',
							sizeValue: 1,
							sizeMod: 'L'
						}),
						value: 1
					}
				]
			}),
			FeatureLogic.createFeature({
				id: 'revenant-feature-2a',
				name: 'Vengeance Mark',
				description: 'As a maneuver, you place a magic sigil on a creature within 10 squares of you. When you place a sigil, you can decide where it appears on the creature’s body, and whether the sigil is visible to only you or to all creatures. You always know the direction to the exact location of a creature who bears one of your sigils and is on the same plane of existence as you. You can have an active number of sigils equal to your level. You can remove a sigil from a creature harmlessly (no action required). If you are already using your maximum number of sigils and place a new one, your oldest sigil disappears with no other effect.'
			}),
			FeatureLogic.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'revenant-feature-2b',
					name: 'Detonate Sigil',
					description: 'A magical sigil you placed on a creature explodes with energy.',
					type: AbilityLogic.createTypeAction(),
					keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ AbilityLogic.createDistanceRanged(10) ],
					target: '1 creature with your sigil',
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
						tier1: '3 damage; slide 1',
						tier2: '7 damage; slide 2',
						tier3: '10 damage; slide 3'
					}),
					effect: 'The sigil disappears from the creature.'
				})
			}),
			FeatureLogic.createFeature({
				id: 'revenant-feature-3a',
				name: 'Tough But Withered',
				description: 'You can’t suffocate, and you don’t need to eat or drink to stay alive. Additionally, when your Stamina equals the negative of your winded value, you become inert instead of dying. You can continue to observe your surroundings, but you can’t speak, take actions, maneuvers, or triggered actions, or move and you fall prone. If you take any fire damage while in this state, your body is destroyed and you die. Otherwise, after 12 hours, you regain Stamina equal to your recovery value.'
			}),
			FeatureLogic.createDamageModifierFeature({
				id: 'revenant-feature-3b',
				modifiers: [
					{
						damageType: 'Cold',
						type: DamageModifierType.Immunity,
						value: 1,
						valuePerLevel: 1
					},
					{
						damageType: 'Corruption',
						type: DamageModifierType.Immunity,
						value: 1,
						valuePerLevel: 1
					},
					{
						damageType: 'Lightning',
						type: DamageModifierType.Immunity,
						value: 1,
						valuePerLevel: 1
					},
					{
						damageType: 'Poison',
						type: DamageModifierType.Immunity,
						value: 1,
						valuePerLevel: 1
					},
					{
						damageType: 'Fire',
						type: DamageModifierType.Weakness,
						value: 5,
						valuePerLevel: 0
					}
				]
			}),
			FeatureLogic.createFeature({
				id: 'revenant-feature-4',
				name: 'Undead Influence',
				description: 'Your supernatural gifts allow you to influence other undead. You gain an edge on Reason, Intuition, and Presence tests made to interact with undead creatures.'
			})
		]
	};

	static timeRaider: Ancestry = {
		id: 'ancestry-time-raider',
		name: 'Time Raider',
		description: 'The original servitor species of the synliiroi—evil psions with near god-like power—the kuran’zoi liberated themselves during the First Psychic War. In the centuries since, they built their own culture and civilization as nomads of the timescape. The exonym “time raiders” was given to them by denizens of the lower worlds who, seeing the advanced technology they wield, concluded they must be from the future.',
		features: [
			FeatureLogic.createSizeFeature({
				id: 'time-raider-size',
				sizeValue: 1,
				sizeMod: 'M'
			}),
			FeatureLogic.createBonusFeature({
				id: 'time-raider-speed',
				field: FeatureField.Speed,
				value: 5
			}),
			FeatureLogic.createFeature({
				id: 'time-raider-feature-1',
				name: 'Foresight',
				description: 'Your senses extend past mundane obscuration and the veil of the future alike. You instinctively know the location of any concealed creatures who aren’t hidden from you, negating the usual bane on attacks against them. Additionally, whenever you are attacked, you can use a triggered action to impose a bane on the power roll.'
			}),
			FeatureLogic.createFeature({
				id: 'time-raider-feature-2',
				name: 'Four Arms',
				description: 'Your multiple arms let you take on multiple tasks at the same time. Whenever you use the Grab or Knockback maneuver against an adjacent creature, you can target an additional adjacent creature, using the same power roll for both targets. You can grab up to two creatures at a time.'
			}),
			FeatureLogic.createDamageModifierFeature({
				id: 'time-raider-feature-3',
				name: 'Psionic Gift',
				modifiers: [
					{
						damageType: 'Psionic',
						type: DamageModifierType.Immunity,
						value: 5,
						valuePerLevel: 0
					}
				]
			})
		]
	};

	static getAncestries = (sourcebooks: Sourcebook[]) => {
		const list: Ancestry[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.ancestries);
		});

		return Collections.sort(list, item => item.name);
	};
}
