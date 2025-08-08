import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { Item } from '../../models/item';
import { ItemType } from '../../enums/item-type';
import { FeatureField } from '../../enums/feature-field';

export class TrinketData {
	static colorCloakBlue: Item = FactoryLogic.createItem({
		id: 'item-color-cloak-blue',
		name: 'Color Cloak (blue)',
		description: 'This silky-blue hooded cloak is emblazoned with a golden Anjali sigil meaning "ice."',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Neck ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A pint of blue ichor, soul chalk',
			source: 'Licensing agreements in Anjali',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createDamageModifier({
						id: 'item-color-cloak-blue-1',
						modifiers: [
							FactoryLogic.damageModifier.createPerLevel({
								damageType: DamageType.Cold,
								modifierType: DamageModifierType.Immunity,
								value: 1
							})
						]
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-color-cloak-blue-2',
							name: 'Item Ability',
							type: FactoryLogic.type.createTrigger('You are targeted by any effect that deals cold damage'),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText('Shift a number of squares equal to your level. The cold immunity granted by the cloak becomes cold weakness equal to your level until the end of the next round. You can\'t use this triggered action again until this weakness ends.')
							]
						})
					})
				]
			}
		]
	});

	static colorCloakRed: Item = FactoryLogic.createItem({
		id: 'item-color-cloak-red',
		name: 'Color Cloak (red)',
		description: 'This woolen red hooded cloak is emblazoned with a golden Anjali sigil meaning "fire."',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Neck ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A pint of red ichor, soul chalk',
			source: 'Licensing agreements in Anjali',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createDamageModifier({
						id: 'item-color-cloak-red-1',
						modifiers: [
							FactoryLogic.damageModifier.createPerLevel({
								damageType: DamageType.Fire,
								modifierType: DamageModifierType.Immunity,
								value: 1
							})
						]
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-color-cloak-red-2',
							name: 'Item Ability',
							type: FactoryLogic.type.createTrigger('You are targeted by any effect that deals fire damage'),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText('Reduce the damage to 0. The fire immunity granted by the cloak becomes fire weakness equal to your level until the end of the next round. You can\'t use this triggered action again until this weakness ends.')
							]
						})
					})
				]
			}
		]
	});

	static colorCloakYellow: Item = FactoryLogic.createItem({
		id: 'item-color-cloak-yellow',
		name: 'Color Cloak (yellow)',
		description: 'This rubbery, yellow hooded cloak is emblazoned with a golden Anjali sigil meaning "lightning."',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Neck ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A pint of yellow ichor, soul chalk',
			source: 'Licensing agreements in Anjali',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createDamageModifier({
						id: 'item-color-cloak-yellow-1',
						modifiers: [
							FactoryLogic.damageModifier.createPerLevel({
								damageType: DamageType.Lightning,
								modifierType: DamageModifierType.Immunity,
								value: 1
							})
						]
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-color-cloak-yellow-2',
							name: 'Item Ability',
							type: FactoryLogic.type.createTrigger('You are targeted by any effect that deals lightning damage'),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText('The next damage-dealing ability you use to deal extra lightning damage equal to your level. The lightning immunity granted by the cloak becomes ightning immunity equal to your level until the end of the next round. You can\'t use this triggered action again until this weakness ends.')
							]
						})
					})
				]
			}
		]
	});

	static deadweight: Item = FactoryLogic.createItem({
		id: 'item-deadweight',
		name: 'Deadweight',
		description: 'Though this humanoid femur is coated in lead, it feels impossibly heavy for its size.',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'One humanoid femur, one bar of lead laced with starmetal',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		effect: 'While holding the Deadweight, you fall twice as fast, taking an extra 1 damage for each square you fall (to a maximum of 75 total damage from a single fall).',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-deadweight-1',
							name: 'Item Ability',
							type: FactoryLogic.type.createManeuver({ free: true, qualifiers: [ 'When you fall 5 or more squares' ]}),
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'One enemy',
							sections: [
								FactoryLogic.createAbilitySectionText('Make a melee free strike as a free maneuver once during the fall before you hit the ground.')
							]
						})
					})
				]
			}
		]
	});

	static displacingReplacementBracer: Item = FactoryLogic.createItem({
		id: 'item-displacing-replacement-bracer',
		name: 'Displacing Replacement Bracer',
		description: 'A wooden bangle is etched with an ambigram sigil of the Zaliac word for "transfer."',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Arms, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Petrified wood from a tree that has not been observed since falling',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Reason ],
			goal: 150
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-displacing-replacement-bracer-1',
							name: 'Item Ability',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createRanged(10) ],
							target: 'Special',
							sections: [
								FactoryLogic.createAbilitySectionText('You transfer an object of size 1S or 1T held in one hand with another object of the same size that is within range. The objects change locations instantaneously and without creating any auditory or visual disturbance. If another creature is wearing or holding the object you transfer to your hand and they have I < 4, they fail to notice the transfer.')
							]
						})
					})
				]
			}
		]
	});

	static divineVine: Item = FactoryLogic.createItem({
		id: 'item-divine-vine',
		name: 'Divine Vine',
		description: 'A coil of emerald-green vines is topped with the jaws of an enormous Venus flytrap.',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Three withered mundane vines, a tree\'s blessing',
			source: 'Songs in Yllyric',
			characteristic: [ Characteristic.Reason, Characteristic.Presence ],
			goal: 100
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-divine-vine-1',
							name: 'Item Ability',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createRanged(5) ],
							target: 'One creature or object',
							sections: [
								FactoryLogic.createAbilitySectionText('You call upon the Divine Vine in Yllyric, causing it to extend up to 5 squares from you and attach its jaws to a creature or object, allowing you to use the Grab maneuver at a distance. If the target is grabbed, you can choose to keep the divine vine extended, pull the target adjacent to you, or pull yourself adjacent to the target. The divine vine stays attached to the target until it takes damage from a strike, the target escapes your grab, or you call upon the vine to release the target (no action required).')
							]
						})
					})
				]
			}
		]
	});

	static flameshadeGloves: Item = FactoryLogic.createItem({
		id: 'item-flameshade-gloves',
		name: 'Flameshade Gloves',
		description: 'These finely stitched gloves appear to flicker in and out of reality when first handled.',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Hands, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A humanoid\'s shadow disconnected from its source',
			source: 'Texts or lore in Khelt',
			characteristic: [ Characteristic.Reason ],
			goal: 150
		}),
		effect: `
When you use a move action while wearing these gloves, you can place one hand upon a mundane object as part of that move action. If the object is 1 square thick or less and has open space on the other side (for example, a door or wall), you pull your body through it as though the object wasn’t there. 

If the object is too thick or has no open space on the other side, your hand becomes stuck inside the object. Removing your hand takes a successful hard Might test made as a main action.`
	});

	static geckoGloves: Item = FactoryLogic.createItem({
		id: 'item-gecko-gloves',
		name: 'Gecko Gloves',
		description: 'These scaled gloves have palms and fingers covered in nearinvisible sticky hairs.',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Hands, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Ten gecko tails',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 100
		}),
		effect: 'While you wear these gloves, your grip is all but impossible to break. You can’t be disarmed, you can’t lose your grip while climbing unless you are force moved, and any creature grabbed by you takes a bane on the test for the Escape Grab maneuver.'
	});

	static hellchargerHelm: Item = FactoryLogic.createItem({
		id: 'item-hellcharger-helm',
		name: 'Hellcharger Helm',
		description: 'A steel helm is set with two curved ebony horns, a crackling plume of fire floating between them.',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Head, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'One broken contract, one ingot of steel',
			source: 'Texts or lore in Anjali and Caelian',
			characteristic: [ Characteristic.Might, Characteristic.Reason ],
			goal: 150
		}),
		effect: 'Whenever you take the Charge action while wearing this helmet, you gain a +5 bonus to speed until the end of your current turn.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-hellcharger-helm-1',
							name: 'Item Ability',
							type: FactoryLogic.type.createManeuver({ free: true, qualifiers: [ 'After charging' ] }),
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'One creature',
							sections: [
								FactoryLogic.createAbilitySectionText('Use the Knockback maneuver, regardless of the target creature\'s size.')
							]
						})
					})
				]
			}
		]
	});

	static maskOfTheMany: Item = FactoryLogic.createItem({
		id: 'item-mask-of-the-many',
		name: 'Mask of the Many',
		description: 'A plain white mask is lined with soft black velvet - which smells faintly of blood.',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Head, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'One used death shroud',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-mask-of-the-many-1',
							name: 'Item Ability',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText('You transform into any humanoid of equivalent size that you have previously seen. The humanoid’s appearance reflects the last time you saw them, including whatever they were wearing. Your clothing and gear are transformed into the figure’s clothing and gear, absorbed into your body, or retain their original forms, as you determine. If the figure possessed any treasures when you last saw them, they are duplicated as mundane copies while you are transformed.')
							]
						})
					})
				]
			}
		]
	});

	static quantumSatchel: Item = FactoryLogic.createItem({
		id: 'item-quantum-satchel',
		name: 'Quantum Satchel',
		description: 'A woven metal drawstring seals this plain-looking leather bag, which is affixed with an opal brooch.',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'One uncut opal',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		effect: 'When the brooch is removed from this bag and placed in a container or room, it magically entangles that location to the bag. Any item that can be placed in the Quantum Satchel appears near to the brooch and can be recovered by reaching inside while picturing the desired object. The capacity of the satchel is dictated by the size of the container or room where the entangled brooch is. If an item is removed from the container or room containing the brooch, it can’t be retrieved through the satchel.'
	});

	static unbinderBoots: Item = FactoryLogic.createItem({
		id: 'item-unbinder-boots',
		name: 'Unbinder Boots',
		description: 'A pair of ornately embroidered leather boots are covered in images of broken chains.',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Feet, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'One battered gold chain of at least fifty links',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		effect: 'These boots can temporarily unbind themselves from the chains of the earth, letting you move through the air as high as 3 squares above the ground from where you started. If you end your turn while you are still airborne, you fall.'
	});

	static bastionBelt: Item = FactoryLogic.createItem({
		id: 'item-bastion-belt',
		name: 'Bastion Belt',
		description: 'This thick leather belt features a bone clasp and feels unusually heavy when handled.',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Waist, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A giant’s tooth',
			source: 'Texts or lore in High Kuric',
			characteristic: [ Characteristic.Might, Characteristic.Intuition ],
			goal: 300
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createBonus({
						id: 'item-bastion-belt-1',
						field: FeatureField.Stamina,
						value: 3
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-bastion-belt-2',
						field: FeatureField.Stability,
						value: 1
					})
				]
			}
		]
	});

	static evilestEye : Item = FactoryLogic.createItem({
		id: 'item-evilest-eye',
		name: 'Evilest Eye',
		description: 'A perfectly preserved eyeball hangs unnervingly from a gold chain.',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Neck, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'An eyeball from a pirate captain who drowned at sea',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 300
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-evilest-eye-1',
							name: 'Item Ability',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createRanged(10) ],
							target: 'One enemy',
							sections: [
								FactoryLogic.createAbilitySectionText('You and each ally within 2 squares of the target each gain 1 surge.')
							]
						})
					})
				]
			}
		]
	});

	static insightfulCrown: Item = FactoryLogic.createItem({
		id: 'item-insightful-crown',
		name: 'Insightful Crown',
		description: 'Shaped of polished crystal, this shimmering circlet shifts through myriad colors in the presence of strong emotions.',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Head, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: ' One measure of pure crystal, a jarred memory of true joy',
			source: 'Texts or lore in Variac',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 300
		}),
		effect: 'While wearing the crown, you gain an edge on Intuition tests made to read the emotions and discern the honesty of other creatures. If you succeed on an Intuition test to read the emotions of another creature within 5 squares, you can ask the Director one question about something the creature knows, which the Director must answer honestly. At the Director’s discretion, you might not be able to tap into the creature’s deepest secrets this way.'
	});

	static keyOfInquiry: Item = FactoryLogic.createItem({
		id: 'item-key-of-inquiry',
		name: 'Key of Inquiry',
		description: 'A foot-long platinum key is set with three opals',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'The finger bone of a creature with telepathy, three black opals',
			source: ' Texts or lore in Ullorvic',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 300
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-key-of-inquiry-1',
							name: 'Item Ability',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createSpecial('Adjecent') ],
							target: 'One willing, grabbed, or restrained creature',
							sections: [
								FactoryLogic.createAbilitySectionText('Twist the key 90 degrees clockwise. The target must answer the next three questions they are asked truthfully and fully. If twisted 90 degrees counterclockwise instead, the target forgets the last 30 minutes they experienced. A creature affected by the key can’t be affected again by any Key of Inquiry for 1 year. If the key is ever destroyed, all the memories it has erased are restored. Memories erased by the key can’t be restored in any other way.')
							]
						})
					})
				]
			}
		]
	});

	static mediatorsCharm : Item = FactoryLogic.createItem({
		id: 'item-mediators-charm',
		name: 'Mediator\'s Charm',
		description: 'A fancy gold earring is set with a small ruby.',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Head, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'The gold nib of a fountain pen used to sign a major treaty or compact, a ruby once worn by a devil',
			source: 'Texts or lore in Hyrallic',
			characteristic: [ Characteristic.Reason, Characteristic.Presence ],
			goal: 300
		}),
		effect: 'While you wear the Mediator’s Charm, the patience of any NPC you negotiate with increases by 1 (to a maximum of 5). Additionally, at the start of a negotiation, you learn one of an NPC’s motivations or pitfalls of the Director’s choice.'
	});

	static necklaceOfTheBayou: Item = FactoryLogic.createItem({
		id: 'item-necklack-of-the-bayou',
		name: 'Necklace of the Bayou',
		description: 'A worn leather circlet bears a lizard-shaped pendant of rotting wood.',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Neck, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A gallon of swamp water, the limbs of four different newts',
			source: ' Texts or lore in Yllyric',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 300
		}),
		effect: 'While you wear this necklace, you can breathe underwater, you can automatically swim at full speed while moving, and you ignore difficult terrain created by water or in marsh and similar terrain.'
	});

	static scannerstone : Item = FactoryLogic.createItem({
		id: 'item-scannerstone',
		name: 'Scannerstone',
		description: 'This flat, palm-sized triangular stone is decorated with a starfield of tiny gems.',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: ': A piece of polished obsidian, seven flawless pea-sized diamonds',
			source: ' Texts or lore in Variac',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 300
		}),
		effect: 'When held against a wall or other solid surface 1 square thick or less, the Scannerstone creates an image floating in the air beside it that shows a rough miniature approximation of the space on the other side of the surface. The image displays floors, walls, and other barriers but doesn’t show other objects. It shows representations of any moving creatures on the other side, but not creatures who are still.'
	});

	static stopNGoCoin : Item = FactoryLogic.createItem({
		id: 'item-stop-n-go-coin',
		name: 'Stop-’n-Go Coin',
		description: 'This small, featureless coin is solid green on one side and solid red on the other.',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A coin minted during an earthquake',
			source: ' Texts or lore in Caelian,',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 300
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-stop-n-go-coin-1',
							name: 'Item Ability',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createSpecial('') ],
							target: 'Special; see below',
							sections: [
								FactoryLogic.createAbilitySectionText(`
You toss the coin in the air and let it fall to the ground in front of you. Roll a d3 to determine the coin’s effect, depending on which face shows when it lands:

**1—Red**: The area within 2 squares of you is difficult terrain for enemies until the end of your next turn.
**2—Green**: You and each ally who starts their turn within 2 squares of you gains a +1 bonus to speed until the end of your next turn.
**3—Spinning Coin**: Both the red and green effects occur while the coin continuously spins.

The coin must be picked up before it can be used again. If any creature picks up the coin, its effects immediately end.`)
							]
						})
					})
				]
			}
		]
	});
}
