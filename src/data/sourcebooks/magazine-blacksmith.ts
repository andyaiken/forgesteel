import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';
import { Kit } from '@/models/kit';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

// #region Ancestries

const goblinSquad: Ancestry = {
	id: 'ancestry-goblin-squad',
	name: 'Goblin Squad',
	description: `
*By Tamwin Le'Feur*

Ever wish you were just a bunch of little guys? Are you a believer in Quantity over Quality? Then this may be the ancestry for you! Easily reflavourable to be a band of kobolds, angulotls, radenwights, or any other similar group.`,
	features: [
		FactoryLogic.feature.create({
			id: 'goblin-squad-feature-1',
			name: 'Goblins Goblins Everywhere!',
			description: `
You are a group of 5 1S minions, and your stamina pool has breakpoints at 2/3, 1/3, 0, and -1/3 of your health. Whenever you are dropped to or below a breakpoint, the goblin who was damaged dies (or maybe just runs away). Whenever you spend a recovery, another goblin jumps out of some nearby bushes, climbs out of a sewer, is dropped by a giant hawk, or otherwise enters the battlefield to join your squad. The exact entry point is up to the Director, but you may have the new goblin (and only the new goblins) immediately take a move action as a free triggered action.

Each goblin MUST have their own unique name.`
		}),
		FactoryLogic.feature.create({
			id: 'goblin-squad-feature-2',
			name: 'The Boss',
			description: `
Every goblin group has a Boss, chosen through rigorous methods such as having the most impressive ears or holding That One Cool Stick We Found. Even in situations where a non-goblin (such as another hero, perhaps) is the actual "boss" of a group, they will inevitably have a goblin sub-boss handling the day-to-day operations. You may change which goblin is the Boss as no action at the start of your turn to another goblin within a range of 5 plus your highest characteristic score, tossing over the stick or reclassifying the metrics for ear impressiveness as needed. If the Boss is killed, choose a new boss immediately. If there is no "valid" target (either due to range or LoE obstruction), then the closest goblin becomes the boss. You may also need to change the boss selection method if the cool stick was lost.

In combat, any goblin who is out of range of the Boss (ignoring LoE) can only use movement, and can only move towards the Boss.`
		}),
		FactoryLogic.feature.create({
			id: 'goblin-squad-feature-3',
			name: 'Tiny Stabs',
			description: 'Whenever a goblin makes an opportunity attack, they deal damage equal to their highest characteristic plus any weapon damage bonus you have (such as from kits or treasures).'
		}),
		FactoryLogic.feature.create({
			id: 'goblin-squad-feature-4',
			name: 'Frail Constitution',
			description: 'While together they may be mighty, individually they are very weak. When an individual goblin is suffering from being Weakened, Slowed, Frightened, Dazed, or Bleeding, they are stunned. While stunned this way, they can take no actions, manoeuvres/free manoeuvres, triggered actions/free triggered actions, movement, and cannot be made the Boss. If every goblin is stunned, then the boss can still act as normal (though still suffering normally from any conditions they might have).'
		}),
		FactoryLogic.feature.create({
			id: 'goblin-squad-feature-5',
			name: 'Goblin Turns',
			description: 'On your turn, you can use actions, manoeuvres, and triggered actions from any goblin. If you use an ability which only affects yourself, then you can use it with ALL of your goblins (For example, the Push and Grab manoeuvres happen for one goblin, but the stand up from prone and escape grab manoeuvres apply to every goblin). When you move, you can move with every goblin, and you can individually choose to advance, disengage, or ride for each.'
		}),
		FactoryLogic.feature.create({
			id: 'goblin-squad-feature-6',
			name: 'Safety in Numbers',
			description: 'Being a tight-knit squad is all fun and games until the Elementalist casts conflagration. Whenever multiple goblins take damage from the same ability, each goblin takes half damage. This includes being attacked by a squad of minions.'
		}),
		FactoryLogic.feature.create({
			id: 'goblin-squad-feature-7',
			name: 'No, That\'s MY Surge!',
			description: 'Goblins will squabble over anything. If multiple goblins in the same squad would benefit or be allowed to act by an ability, only one of them gains that benefit. When a goblin dies with a beneficial effect that has a duration, another goblin of your choice gains that effect for the remainder of the duration.'
		}),
		FactoryLogic.feature.createChoice({
			id: 'goblin-squad-feature-8',
			name: 'Goblin Squad Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8a',
						name: 'The Big Boss',
						description: 'Whether through prodigious appetite, by virtue of not actually being a goblin, or the clever use of two friends and a trenchcoat, one member of your group has grown to the point where there is no question that they are in charge. The Boss is size 1L, but can no longer be changed to a different goblin outside of a respite. If the Boss would die from being damaged below a breakpoint, you may have another goblin heroically sacrifice themselves instead.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8b',
						name: 'Snap Elections',
						description: 'Goblins are masters of rapid democracy and picking the right gob for the job. You can change the Boss off your turn, and can make stunned goblins the Boss.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8c',
						name: 'There are Dozens of Us. Dozens!',
						description: 'For each that falls, two one will take their place. As a triggered action when a goblin is killed, you may spend a recovery.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8d',
						name: 'Never Seen the Guy in My Life!',
						description: 'Your group of goblins has some clearly identifiable mark, such as a uniform, signature weapon, or manner of speech. By having a goblin remove that mark, their actions will not be attributed to your group. Particularly insightful or prejudiced individuals may still have suspicions, even if nothing can be proven.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8e',
						name: 'Sneaky',
						description: 'Stealth comes third nature to goblins (after stabbing things and running away). You can move at full speed when sneaking.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8f',
						name: 'A Very Particular Set of Skills',
						description: 'Each member of your band is a highly specialised expert. Assign each skill you have to a specific goblin in your group, as evenly as possible. Whenever that goblin dies, you lose those skills, and must pick different ones from the same skill groups which will be given to their replacement.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8g',
						name: 'Many Hands Make Grabby Work',
						description: 'You are practised in coordinated takedowns. When you have multiple goblins next to a target you attempt to grab, they can all take the grab maneuver against that target. The maximum size of creature you can grab is increased by the number of goblins currently or attempting to grab them beyond the first.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8h',
						name: 'Crafty',
						description: 'By weaving in between their legs, you can turn your enemies or allies into protectors. When you move into a creature\'s square, that movement doesn\'t trigger opportunity attacks.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8i',
						name: 'Crafty, no wait actually',
						description: 'Like chefs in a kitchen, you know how to best work together and get the job done. Add +2 to the results of any crafting project roll. If you are crafting a consumable item, add +4 instead.'
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 4
};

const psiBorg: Ancestry = {
	id: 'ancestry-psi-borg',
	name: 'Psi-Borg',
	description: `
*By Jacob Taylor*

Flesh and blood fused with crystal and technology, a union disdained by most timescape governance. Whether implanted through black markets or created under the tight leash of UNISOL, the life of a Psi-borg is far from comfortable. It is not uncommon for Psi-borgs to flee to lower-energy worlds in search of escape. They were outlawed in the earliest days of UNISOL, following their devastating use in the First Psychic War.`,
	features: [
		FactoryLogic.feature.createAncestry({
			id: 'psi-borg-feature-1',
			name: 'Vessel of Flesh',
			description: 'Choose the ancestry you were before you were improved! Your size is that ancestry’s size and your speed is 5. Unless you select one of the Vestige of the Vessel traits (see below), you don’t receive any other ancestral traits from your original ancestry.'
		}),
		FactoryLogic.feature.create({
			id: 'psi-borg-feature-2',
			name: 'Certainty of the Artificial',
			description: `
Most of your body has been replaced with psionic implants that allow you to function more reliably. You don’t require food, water, or air.

The enhancements are largely hidden with artificial skin and minor illusions although you may decide that the enhancements are visually noticeable to an unavoidable extent (Crystal Limbs, External Machinery, etc). If this is the case you gain an additional ancestry point and are most likely wanted by UNISOL. Directors should consider how common a presence UNISOL is in their campaign and how NPCs would react to a visually obvious Psi-borg character.`
		}),
		FactoryLogic.feature.createChoice({
			id: 'psi-borg-feature-3',
			name: 'Psi-Borg Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'psi-borg-feature-3-1',
						name: 'Psi-Brand',
						description: 'You are an agent of UNISOL and maintain direct communication with your handler. As long as you continue to support UNISOL’s interests, you may call in favours. Make sure to talk to your Director about the limits of aid given by UNISOL and how it would work in practice.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'psi-borg-feature-3-2',
						name: 'Improvement of the Flesh',
						description: 'You select an echelon 1 Psionic Implant that you have already had installed. You gain the effects of this implant.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAncestryFeature({
						id: 'psi-borg-feature-3-3',
						name: 'Vestige of the Vessel',
						current: false,
						former: true,
						customID: '',
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAncestryFeature({
						id: 'psi-borg-feature-3-4',
						name: 'Vestige of the Vessel',
						current: false,
						former: true,
						customID: '',
						value: 2
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3
};

// #endregion

// #region Items

const abundanceOfLoveAndReticence: Item = FactoryLogic.createItem({
	id: 'item-abundance',
	name: 'Abundance of Love and Reticence',
	description: `
*By Anna / Nathan Lee*

A wand made of twisted flower stems with three colourful petals sprouting from the tip.`,
	type: ItemType.Leveled,
	keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Wand ],
	crafting: FactoryLogic.createProject({
		prerequisites: 'A yellow rose, a red lily, a white sunflower',
		source: 'Texts or lore in Yllyric',
		characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
		goal: 450
	}),
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'item-abundance-1',
					name: 'Level 1',
					description: 'The tip of this wand has three petals, each a different colour: yellow, red, and white. At the start of combat you can pluck one of the petals from the wand to gain temporary stamina equal to your highest characteristic (no action required). This temporary stamina is added with any temporary stamina granted by the Disciple of Green feature. Any missing petals regrow when you take a respite.'
				}),
				FactoryLogic.feature.createAbilityDistance({
					id: 'item-abundance-1a',
					keywords: [ AbilityKeyword.Magic ],
					value: 3
				}),
				FactoryLogic.feature.createAbilityDistance({
					id: 'item-abundance-1b',
					keywords: [ AbilityKeyword.Psionic ],
					value: 3
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'item-abundance-5',
					name: 'Level 5',
					description: 'The petals take on additional effects. When you pluck the yellow petal, you become invisible and ignore difficult terrain until the end of your next turn. When you pluck the red petal, one ally within 5 also gains the temporary stamina. When you pluck the white petal, one enemy within 10 takes poison damage equal to three times your highest characteristic.'
				}),
				FactoryLogic.feature.createAbilityDistance({
					id: 'item-abundance-5a',
					keywords: [ AbilityKeyword.Magic ],
					value: 2
				}),
				FactoryLogic.feature.createAbilityDistance({
					id: 'item-abundance-5b',
					keywords: [ AbilityKeyword.Psionic ],
					value: 2
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'item-abundance-9',
					name: '',
					description: 'While you wield this implement, your area magic or psionic abilities with an aura or burst increase in size by 1.'
				}),
				FactoryLogic.feature.create({
					id: 'item-abundance-9a',
					name: 'Level 9',
					description: 'The wand sprouts an additional petal of each colour.'
				})
			]
		}
	]
});

const braidedDecay: Item = FactoryLogic.createItem({
	id: 'item-braided-decay',
	name: 'Braided Decay',
	description: `
*By Anna / Nathan Lee*

This belt, always damp to the touch, growls and barks in reaction to the vital energies of battle.`,
	type: ItemType.Leveled,
	keywords: [ AbilityKeyword.Belt, AbilityKeyword.Magic, AbilityKeyword.Rot ],
	crafting: FactoryLogic.createProject({
		prerequisites: 'Pelts from three partially-decomposed beasts, each from a different world',
		source: 'Texts or lore in Tholl',
		characteristic: [ Characteristic.Intuition, Characteristic.Presence ],
		goal: 450
	}),
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'item-braided-decay-1',
					name: 'Level 1',
					description: 'At the end of each of your turns, each enemy adjacent to you takes 2 poison damage. Damage from this belt is doubled against enemies with temporary stamina.'
				}),
				FactoryLogic.feature.createBonus({
					id: 'item-braided-decay-1a',
					field: FeatureField.Stamina,
					value: 6
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'item-braided-decay-5',
					name: 'Level 5',
					description: 'The belt’s poison damage increases to 4. Enemies damaged by this belt can’t regain stamina until the end of their next turn. Additionally, you can instantly wither mundane plants that come adjacent to you.'
				}),
				FactoryLogic.feature.createBonus({
					id: 'item-braided-decay-5a',
					field: FeatureField.Stamina,
					value: 6
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'item-braided-decay-9',
					name: 'Level 9',
					description: 'The belt’s poison damage increases to 6. Enemies damaged by this belt are weakened and can’t regain stamina until the end of their next turn. Damage from this belt can’t be reduced in any way.'
				}),
				FactoryLogic.feature.createBonus({
					id: 'item-braided-decay-9b',
					field: FeatureField.Stamina,
					value: 9
				})
			]
		}
	]
});

const darkStarPlate: Item = FactoryLogic.createItem({
	id: 'item-dark-star-plate',
	name: 'Dark Star Plate',
	description: `
*By Anna / Nathan Lee*

Light does not reflect off of this full suit of armour.`,
	type: ItemType.LeveledArmor,
	keywords: [ KitArmor.Heavy, AbilityKeyword.Void ],
	crafting: FactoryLogic.createProject({
		prerequisites: 'Four ingots of starmetal',
		source: 'Texts or lore in Ullorvic',
		characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
		goal: 450
	}),
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'item-dark-star-plate-1a',
					name: 'Level 1',
					description: 'When an ally within 5 is targeted by a strike that you are not a target of, you can use a free triggered action to increase your gravitational pull relative to the strike and become the target instead of the triggering ally, using the same power roll. You must be within range and line of effect of the strike.'
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'item-dark-star-plate-5a',
					name: 'Level 5',
					description: 'You can use a maneuver to vertically pull 5 a creature or object within 5 of you. If the creature is willing, this forced movement ignores their stability.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'item-dark-star-plate-9a',
					name: 'Level 9',
					description: 'The range for both effects increases to 10, and the pull ignores the stability of enemies.'
				})
			]
		}
	]
});

const shiftingTides: Item = FactoryLogic.createItem({
	id: 'item-shifting-tides',
	name: 'Shifting Tides',
	description: `
*By Anna / Nathan Lee*

The water in this clear staff is constantly moving and shifting between ice, water, and steam. The movement continues even as the staff is held still.`,
	type: ItemType.LeveledImplement,
	keywords: [ AbilityKeyword.Implement, AbilityKeyword.Magic, AbilityKeyword.Water ],
	crafting: FactoryLogic.createProject({
		prerequisites: 'A vial of water from seven different seas',
		source: 'Texts or lore in The First Language',
		characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
		goal: 450
	}),
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'item-shifting-tides-1',
					name: 'Level 1',
					description: 'When you use a magic or psionic ability that deals damage that isn’t untyped or holy damage, you can change the damage type to another, non-holy damage type as a free triggered action.'
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'item-shifting-tides-9',
					name: 'Level 5',
					description: 'While you wield this implement, you or an adjacent ally takes damage that isn’t untyped or holy damage, you can change the damage type to another, non-holy damage type as a triggered action. The first time you use this triggered action in an encounter, it is a free triggered action.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'item-shifting-tides-9',
					name: 'Level 9',
					description: 'You can now sculpt your supernatural abilities as well as change their energies. Your magic or psionic abilities that create areas of lines can be placed as if they were walls. Lines with a width dimension greater than 1 maintain their width and height, even when placed as a wall. Your magic or psionic abilities that create a wall can be placed as if they were lines with a length equal to the wall length and a width and height of 1.'
				})
			]
		}
	]
});

const siegeEnder: Item = FactoryLogic.createItem({
	id: 'item-siege-ender',
	name: 'Siege Ender',
	description: `
*By Anna / Nathan Lee*

This morning star has a glowing, cylindrical head that emits a flare-up whenever it strikes.`,
	type: ItemType.LeveledWeapon,
	keywords: [ AbilityKeyword.Fire, KitWeapon.Heavy, AbilityKeyword.Magic ],
	crafting: FactoryLogic.createProject({
		prerequisites: 'Metal from a siege weapon used on the losing side of a war',
		source: 'Texts or lore in Anjali',
		characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
		goal: 450
	}),
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'item-siege-ender-1',
					name: 'Level 1',
					description: 'Any weapon ability that deals rolled damage using this weapon deals an extra 1 fire damage, or an extra 2 fire damage if the target is an object. You gain a surge the first time in a round you destroy an object or force move a target into an object with an ability that benefits from this weapon’s damage.'
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'item-siege-ender-5',
					name: 'Level 5',
					description: 'The weapon’s extra fire damage increases to 2, or 4 if the target is an object. The head of this morning star now conjures an explosion when it strikes. Any ability that benefits from this weapon’s damage gains a +2 bonus to the distance of any forced movement it imposes. If the ability does not impose forced movement, you can push each target up to 2 squares. Additionally, you can use the Return to Formlessness feature as if you were a 1st level elementalist.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'item-siege-ender-9',
					name: 'Level 9',
					description: 'The weapon’s extra fire damage increases to 3, or 6 if the target is an object. Any weapon ability that deals rolled damage using this weapon deals double damage to mundane objects. You can channel the essence of destruction into more explosions. When you hurl a target through an object with an ability that benefits from this weapon’s damage, you can increase the remaining forced movement by +5 as a triggered action.'
				})
			]
		}
	]
});

const titanShield: Item = FactoryLogic.createItem({
	id: 'item-titan-shield',
	name: 'Titan Shield',
	description: `
*By Anna / Nathan Lee*

This tower shield has a projection of Orden seen from a great height across its face. The projection slowly moves over time.`,
	type: ItemType.Leveled,
	keywords: [ AbilityKeyword.Earth, AbilityKeyword.Magic, KitArmor.Shield ],
	crafting: FactoryLogic.createProject({
		prerequisites: 'Roots from an oak tree, a 10-pound tungsten cube',
		source: 'Texts or lore in Zaliac',
		characteristic: [ Characteristic.Might, Characteristic.Presence ],
		goal: 450
	}),
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'item-titan-shield-1',
					name: 'Level 1',
					description: 'When you are force moved into an object and would cause it to break, you can use a free triggered action to magically brace the object. The braced object does not break from this forced movement, but you take damage from the remainder of your forced movement as usual.'
				}),
				FactoryLogic.feature.createBonus({
					id: 'item-titan-shield-1a',
					field: FeatureField.Stamina,
					value: 3
				}),
				FactoryLogic.feature.createBonus({
					id: 'item-titan-shield-1b',
					field: FeatureField.Stability,
					value: 1
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'item-titan-shield-5',
					name: 'Level 5',
					description: 'You add +2 to your effective size for the purpose of interacting with creatures and objects, including determining whether you can lift an object, are affected by forced movement, and so forth. This has no effect on whether you can be grabbed.'
				}),
				FactoryLogic.feature.createBonus({
					id: 'item-titan-shield-5a',
					field: FeatureField.Stamina,
					value: 3
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'item-titan-shield-9',
					name: 'Level 9',
					description: 'Your bonus to effective size increases to +4. When you are subjected to forced movement, you can use a free triggered action to materialize a size 1L object adjacent to you in the path of your forced movement and brace it. You decide what the object looks like and what it is made of, but it must be a fragile material similar to glass. Any such objects remaining at the end of the encounter crumble and are destroyed.'
				}),
				FactoryLogic.feature.createBonus({
					id: 'item-titan-shield-9a',
					field: FeatureField.Stamina,
					value: 3
				})
			]
		}
	]
});

const wingedSandals: Item = FactoryLogic.createItem({
	id: 'item-winged-sandals',
	name: 'Winged Sandals',
	description: `
*By Anna / Nathan Lee*

Tiny, fluttering wings decorate the sides of these sandals.`,
	type: ItemType.Leveled,
	keywords: [ AbilityKeyword.Air, AbilityKeyword.Feet, AbilityKeyword.Magic ],
	crafting: FactoryLogic.createProject({
		prerequisites: 'One jar of gale force winds',
		source: 'Texts or lore in Low Rhyvian',
		characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
		goal: 450
	}),
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'item-winged-sandals-1',
					name: 'Level 1',
					description: 'While you wear these sandals, you gain a +1 bonus to your jump distance and height. Additionally, you reduce the effective height of your falls by 2 squares.'
				}),
				FactoryLogic.feature.createBonus({
					id: '',
					field: FeatureField.Speed,
					value: 1
				}),
				FactoryLogic.feature.createBonus({
					id: '',
					field: FeatureField.Disengage,
					value: 1
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'item-winged-sandals-5',
					name: 'Level 5',
					description: 'While wearing these sandals, your speed gains the Fly keyword. Additionally, the reduction of fall height increases to 4 squares. If you have Wings from your ancestry, you have a +1 bonus to speed while flying.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'item-winged-sandals-9',
					name: 'Level 9',
					description: 'While wearing these sandals, you ignore the Slowed condition while flying. Additionally, the reduction of fall height increases to 6 squares.'
				})
			]
		}
	]
});

///////////////////////////////////////////////////////////////////////////

const arachnianImplants: Item = FactoryLogic.createItem({
	id: 'item-arachnian-implants',
	name: 'Arachnian Implants',
	description: `
*By Jacob Taylor*

This black metal implant replaces your spine with a set of extendable blades.`,
	type: ItemType.Trinket1st,
	keywords: [ AbilityKeyword.Implant, AbilityKeyword.Psionic, AbilityKeyword.Spine ],
	crafting: FactoryLogic.createProject({
		prerequisites: 'Eight zodiakol tipped blades',
		source: 'Texts or lore in Voll',
		characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
		goal: 150
	}),
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'item-item-arachnian-implants-1',
					name: 'Arachnian Implants',
					description: 'While extended, you can automatically climb at full speed. You also gain an edge on tests that use the Climb or Gymnastics skills. As a Triggered Action, when you use an ability with the Strike keyword, you can choose to deal damage equal to your Reason score to all adjacent enemies.'
				})
			]
		}
	]
});

const internalSuspension: Item = FactoryLogic.createItem({
	id: 'item-internal-suspension',
	name: 'Internal Suspension',
	description: `
*By Jacob Taylor*

This neural implant causes a numb sensation at the base of your neck.`,
	type: ItemType.Trinket1st,
	keywords: [ AbilityKeyword.Implant, AbilityKeyword.Psionic, AbilityKeyword.Neck ],
	crafting: FactoryLogic.createProject({
		prerequisites: 'Poison from an axiomatic scorpion',
		source: 'Texts or lore in Axiomatic',
		characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
		goal: 150
	}),
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'item-internal-suspension-1',
					name: 'Internal Suspension',
					description: 'Whenever you become dying all conditions affecting you end. Additionally as a manoeuvre you can enter a state of suspension that is indiscernible from death. This also removes all conditions. You can only exit your suspension if another hero uses their action to reactivate your body.'
				})
			]
		}
	]
});

const opticalMoteFocuser: Item = FactoryLogic.createItem({
	id: 'item-optical-mote-focuser',
	name: 'Optical Mote Focuser',
	description: `
*By Jacob Taylor*

This bulky crystalline implant replaces your eye with a singular bead of red.`,
	type: ItemType.Trinket1st,
	keywords: [ AbilityKeyword.Implant, AbilityKeyword.Psionic, AbilityKeyword.Eye ],
	crafting: FactoryLogic.createProject({
		prerequisites: 'A polished fire quartz from Quintessence',
		source: 'Texts or lore in Voll',
		characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
		goal: 150
	}),
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'item-optical-mote-focuser-1',
						name: 'Laser Eye!',
						description: 'A pinprick of fire extends across the battlefield.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 1, within: 1 }) ],
						target: 'Each enemy in the area',
						cost: 0,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [],
									tier1: '3 fire damage',
									tier2: '5 fire damage',
									tier3: '7 fire damage'
								})
							)
						]
					})
				})
			]
		}
	]
});

const psionicBackup: Item = FactoryLogic.createItem({
	id: 'item-psionic-backup',
	name: 'Psionic Backup',
	description: `
*By Jacob Taylor*

Just in case…`,
	type: ItemType.Trinket1st,
	keywords: [ AbilityKeyword.Implant, AbilityKeyword.Psionic, AbilityKeyword.Brain ],
	crafting: FactoryLogic.createProject({
		prerequisites: 'A flake of prismacore, synlirii cerebral fluid',
		source: 'Texts or lore in Variac',
		characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
		goal: 300
	}),
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'item-psionic-backup-1',
					name: 'Psionic Backup',
					description: 'You have a constantly updating psionic backup of your personality installed in your brain. This version of you carries your memories and is designed to continue where you left off, but it can deviate from who you truly are. The backup may be uploaded into any body or corpse using the Install Implement downtime project, fully taking over as the primary consciousness. It can also be uploaded into any psionically sufficient database. A backup may be created while the original is still alive, though its memories begin to diverge the moment it is activated. When you transfer into a new body, you lose all your current traits and gain the traits of that body.'
				})
			]
		}
	]
});

// #endregion

// #region Kits

const barnacle: Kit = {
	id: 'kit-barnacle',
	name: 'Barnacle',
	description: `
*By Harmonic Hewell*

You are like a barnacle: You have a tough exterior and are damn near impossible to get rid of. You are tough, sticky, and are a real pain in the enemy’s collective rear end.`,
	type: '',
	armor: [ KitArmor.Heavy, KitArmor.Shield ],
	weapon: [ KitWeapon.Medium ],
	stamina: 12,
	speed: 0,
	stability: 2,
	meleeDamage: FactoryLogic.createKitDamageBonus(1, 1, 1),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-barnacle-signature',
				name: 'Guillotine Choke',
				description: '“Where do you think you’re going?”',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'One creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '2 + M or A damage; M < [weak], grabbed',
							tier2: '5 + M or A damage; M < [average], grabbed',
							tier3: '7 + M or A damage; M < [strong], grabbed'
						})
					)
				]
			})
		})
	]
};

const condor: Kit = {
	id: 'kit-condor',
	name: 'Condor',
	description: `
*By Harmonic Hewell*

The Condor kit grants you the sturdiness of a front liner with the safety of mid-range fighting. With a ranged weapon and heavy armour, you fight like a gun turret!`,
	type: '',
	armor: [ KitArmor.Heavy ],
	weapon: [ KitWeapon.Bow ],
	stamina: 12,
	speed: 0,
	stability: 1,
	meleeDamage: null,
	rangedDamage: FactoryLogic.createKitDamageBonus(1, 1, 1),
	meleeDistance: 0,
	rangedDistance: 5,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-condor-signature',
				name: 'Ballista Bolt',
				description: 'You fire a heavy projectile, knocking your enemy back.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createRanged(5) ],
				target: 'One creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '2 + M or A damage; push 1',
							tier2: '5 + M or A damage; push 2',
							tier3: '7 + M or A damage; push 3'
						})
					)
				]
			})
		})
	]
};

const eagle: Kit = {
	id: 'kit-eagle',
	name: 'Eagle',
	description: `
*By Harmonic Hewell*

The Eagle kit makes you a sharp-eyed dead-shot. You fire upon your opponents from incredible distances, hitting your mark every single time.`,
	type: '',
	armor: [],
	weapon: [ KitWeapon.Bow ],
	stamina: 0,
	speed: 2,
	stability: 0,
	meleeDamage: null,
	rangedDamage: FactoryLogic.createKitDamageBonus(1, 1, 1),
	meleeDistance: 0,
	rangedDistance: 10,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-eagle-signature',
				name: 'Downtown Delivery',
				description: 'You fire an unbelievably long range shot.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createRanged(10) ],
				target: 'One creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '3 + M or A damage',
							tier2: '6 + M or A damage',
							tier3: '9 + M or A damage'
						})
					)
				]
			})
		})
	]
};

const juggernaut: Kit = {
	id: 'kit-juggernaut',
	name: 'Juggernaut',
	description: `
*By Harmonic Hewell*

The Juggernaut kit allows you to act as a one person riot. With a heavy weapon, you carve a canyon through your foes.`,
	type: '',
	armor: [ KitArmor.Heavy ],
	weapon: [ KitWeapon.Heavy ],
	stamina: 9,
	speed: 1,
	stability: 1,
	meleeDamage: FactoryLogic.createKitDamageBonus(0, 0, 4),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-juggernaut-signature',
				name: 'Cleave',
				description: 'You spin around, attacking your surrounding foes.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
				target: 'All enemies in the area',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '2 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						})
					)
				]
			})
		})
	]
};

const mauler: Kit = {
	id: 'kit-mauler',
	name: 'Mauler',
	description: `
*By Harmonic Hewell*

Heroes using the Mauler Kit charge headfirst into battle, undaunted by the dangers ahead. Wielding nothing but a medium weapon and your audacity, you are as fearsome as you are fearless.`,
	type: '',
	armor: [],
	weapon: [ KitWeapon.Medium ],
	stamina: 3,
	speed: 3,
	stability: 0,
	meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-mauler-signature',
				name: 'Untold Aggression',
				description: 'You throw yourself at an enemy and try to put the fear of the Gods into them.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'One creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '3 + M or A damage',
							tier2: '5 + M or A damage; push 1',
							tier3: '9 + M or A damage; push 2'
						})
					)
				]
			})
		})
	]
};

const sunWukong: Kit = {
	id: 'kit-sun-wukong',
	name: 'Sun Wukong',
	description: `
*By Harmonic Hewell*

Heroes using the Sun Wukong kit are highly mobile thanks to their lack of armour. They strike with long poles from just out of reach, harrying enemies with far-off attacks.`,
	type: '',
	armor: [],
	weapon: [ KitWeapon.Polearm ],
	stamina: 0,
	speed: 3,
	stability: 0,
	meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
	rangedDamage: null,
	meleeDistance: 1,
	rangedDistance: 0,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-sun-wukong-signature',
				name: 'My Stick, Your Face',
				description: '“Allow me to introduce your face to my stick.”',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee(2) ],
				target: 'One creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '3 + M or A damage',
							tier2: '5 + M or A damage',
							tier3: '9 + M or A damage'
						})
					),
					FactoryLogic.createAbilitySectionText('You gain a surge.')
				]
			})
		})
	]
};

const swift: Kit = {
	id: 'kit-swift',
	name: 'Swift',
	description: `
*By Harmonic Hewell*

The Swift kit makes you a mid-range, lightning fast archer. It allows you to be a ranged fighter that sprints across the battlefield, pestering your foes with arrows and drawing their focus.`,
	type: '',
	armor: [],
	weapon: [ KitWeapon.Bow ],
	stamina: 0,
	speed: 3,
	stability: 0,
	meleeDamage: null,
	rangedDamage: FactoryLogic.createKitDamageBonus(1, 1, 1),
	meleeDistance: 0,
	rangedDistance: 7,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-swift-signature',
				name: 'Maddening Missile',
				description: 'Your well-placed projectiles drive your opponents mad.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createRanged(5) ],
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
					FactoryLogic.createAbilitySectionText('The target is taunted (EoT).')
				]
			})
		})
	]
};

// #endregion

// #region Projects

const installImplant = FactoryLogic.createProject({
	id: 'project-install-implant',
	name: 'Install Implant',
	description: `
*By Jacob Taylor*

You can install a psionic implant into either yourself or another hero. Implants are rare and hard to create with the main hurdle being the prolonged process of installation. When this project is complete you gain the effect of the Psionic Implant.

| D6 | Event |
|:---|:------|
| 1  | Before the roll, the hero discovers an installation manual built into the implant. If the hero can read Voll, they treat the project roll as an automatic breakthrough.   |
| 2  | The Psi-tech the hero is installing contains a volatile, experimental AI, previously unknown to them. The AI may be purged from the device, but the Director must secretly roll an Easy Reason test for the hero. On a Tier 1 result, the AI survives within the implant, now desiring vengeance. If the hero chooses to keep the AI, it can communicate telepathically. As long as it remains on good terms with the hero, it grants an edge on all future research rolls. However, the AI is jealous of any other sentient equipment the hero possesses.   |
| 3  | The implant contains a psionic alarm; its creator immediately becomes aware of its location and that someone is attempting to install it.   |
| 4  | The stress of the installation process causes periodic malfunctions from the half-installed implant. Until the project is complete, the recipient gains the Psychic Eruption complication.   |
| 5  | During installation, a significant malfunction occurs. If the damage is not mitigated, the workshop is badly damaged and work on the project cannot continue until a replacement workshop is secured.   |
| 6  | A rogue Psi-borg learns of the procedure and offers to help install the implant. They reveal that they are being hunted by UNISOL agents, who are already on their trail. If the hero protects the Psi-borg from the agents, the Psi-borg becomes one of the hero’s followers. The follower is either a retainer or a sage as determined by the Director. If the hero helps the Psi-borg, they also gain an immediate 50 project points toward the implant’s installation.   |
`,
	prerequisites: 'A Psionic Implant',
	source: 'Text or lore in either Voll or Variac',
	characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
	goal: 100
});

// #endregion

export const blacksmith: Sourcebook = {
	id: 'blacksmith',
	name: 'Blacksmith\'s Guild',
	description: 'A selection of content from the [Blacksmith\'s Guild](https://tabletopnonsenseverse.myshopify.com/).',
	type: SourcebookType.ThirdParty,
	adventures: [],
	ancestries: [
		goblinSquad,
		psiBorg
	],
	careers: [],
	complications: [],
	cultures: [],
	classes: [],
	domains: [],
	encounters: [],
	imbuements: [],
	items: [
		abundanceOfLoveAndReticence,
		braidedDecay,
		darkStarPlate,
		shiftingTides,
		siegeEnder,
		titanShield,
		wingedSandals,
		// Psi-Borg Implants
		arachnianImplants,
		internalSuspension,
		opticalMoteFocuser,
		psionicBackup
	],
	kits: [
		barnacle,
		condor,
		eagle,
		juggernaut,
		mauler,
		sunWukong,
		swift
	],
	monsterGroups: [],
	montages: [],
	negotiations: [],
	perks: [],
	projects: [
		installImplant
	],
	subclasses: [],
	tacticalMaps: [],
	terrain: [],
	titles: [],
	skills: [],
	languages: []
};
