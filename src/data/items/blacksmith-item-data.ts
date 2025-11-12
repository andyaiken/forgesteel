import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';

export class BlacksmithItemData {
	static abundanceOfLoveAndReticence: Item = FactoryLogic.createItem({
		id: 'item-abundance',
		name: 'Abundance of Love and Reticence',
		description: 'A wand made of twisted flower stems with three colourful petals sprouting from the tip.',
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

	static braidedDecay: Item = FactoryLogic.createItem({
		id: 'item-braided-decay',
		name: 'Braided Decay',
		description: 'This belt, always damp to the touch, growls and barks in reaction to the vital energies of battle.',
		type: ItemType.LeveledArmor,
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
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-braided-decay-5',
						name: 'Level 5',
						description: 'Enemies damaged by this belt can’t regain stamina until the end of their next turn. Additionally, you can instantly wither mundane plants that come adjacent to you.'
					}),
					FactoryLogic.feature.create({
						id: 'item-braided-decay-5a',
						name: '',
						description: 'The belt’s poison damage increases to 4.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-braided-decay-9',
						name: 'Level 9',
						description: 'Enemies damaged by this belt are weakened and can’t regain stamina until the end of their next turn. Damage from this belt can’t be reduced in any way.'
					}),
					FactoryLogic.feature.create({
						id: 'item-braided-decay-9a',
						name: '',
						description: 'The belt’s poison damage increases to 6.'
					})
				]
			}
		]
	});

	static darkStarPlate: Item = FactoryLogic.createItem({
		id: 'item-dark-star-plate',
		name: 'Dark Star Plate',
		description: 'Light does not reflect off of this full suit of armour.',
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

	static shiftingTides: Item = FactoryLogic.createItem({
		id: 'item-shifting-tides',
		name: 'Shifting Tides',
		description: 'The water in this clear staff is constantly moving and shifting between ice, water, and steam. The movement continues even as the staff is held still.',
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

	static siegeEnder: Item = FactoryLogic.createItem({
		id: 'item-siege-ender',
		name: 'Siege Ender',
		description: 'This morning star has a glowing, cylindrical head that emits a flare-up whenever it strikes.',
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

	static titanShield: Item = FactoryLogic.createItem({
		id: 'item-titan-shield',
		name: 'Titan Shield',
		description: 'This tower shield has a projection of Orden seen from a great height across its face. The projection slowly moves over time.',
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

	static wingedSandals: Item = FactoryLogic.createItem({
		id: 'item-winged-sandals',
		name: 'Winged Sandals',
		description: 'Tiny, fluttering wings decorate the sides of these sandals.',
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

	static arachnianImplants: Item = FactoryLogic.createItem({
		id: 'item-arachnian-implants',
		name: 'Arachnian Implants',
		description: 'This black metal implant replaces your spine with a set of extendable blades.',
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

	static internalSuspension: Item = FactoryLogic.createItem({
		id: 'item-internal-suspension',
		name: 'Internal Suspension',
		description: 'This neural implant causes a numb sensation at the base of your neck.',
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

	static opticalMoteFocuser: Item = FactoryLogic.createItem({
		id: 'item-optical-mote-focuser',
		name: 'Optical Mote Focuser',
		description: 'This bulky crystalline implant replaces your eye with a singular bead of red.',
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

	static psionicBackup: Item = FactoryLogic.createItem({
		id: 'item-psionic-backup',
		name: 'Psionic Backup',
		description: 'Just in case…',
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
}
