import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { Item } from '../../models/item';
import { ItemType } from '../../enums/item-type';
import { KitArmor } from '../../enums/kit-armor';

export class LeveledArmorData {
	static adaptiveSecondSkin: Item = FactoryLogic.createItem({
		id: 'item-adaptive-second-skin',
		name: 'Adaptive Second Skin of Toxins',
		description: 'This suit is shaped of tough leather and set with thousands of tiny barbs on the inside, all thankfully pain-free to the touch.',
		type: ItemType.LeveledArmor,
		keywords: [ KitArmor.Light, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Five rabid honey badger pelts, the quills of a hedgehog',
			source: 'Texts or lore in Yllyric',
			characteristic: [ Characteristic.Agility, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createBonus({
						id: 'item-adaptive-second-skin-1a',
						field: FeatureField.Stamina,
						value: 6
					}),
					FactoryLogic.feature.createDamageModifier({
						id: 'item-adaptive-second-skin-1b',
						modifiers: [
							FactoryLogic.damageModifier.createCharacteristic({
								damageType: DamageType.Acid,
								modifierType: DamageModifierType.Immunity,
								characteristics: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ]
							})
						]
					}),
					FactoryLogic.feature.createDamageModifier({
						id: 'item-adaptive-second-skin-1c',
						modifiers: [
							FactoryLogic.damageModifier.createCharacteristic({
								damageType: DamageType.Poison,
								modifierType: DamageModifierType.Immunity,
								characteristics: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ]
							})
						]
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-adaptive-second-skin-5',
						name: '',
						description: 'Whenever an adjacent creature deals damage to you, they take 3 acid or poison damage (your choice).'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-adaptive-second-skin-5a',
						field: FeatureField.Stamina,
						value: 6
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-adaptive-second-skin-9',
						name: '',
						description: 'An adjacent creature who deals damage to you takes 6 acid or poison damage.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-adaptive-second-skin-9a',
						field: FeatureField.Stamina,
						value: 9
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-adaptive-second-skin-9b',
							name: 'Armor Ability',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 1 }) ],
							target: 'Liquid or gas in the area',
							sections: [
								FactoryLogic.createAbilitySectionText('You transmute a 2-cube area of liquid or gas adjacent to you into liquid acid or poison gas until the start of your next turn. Any creature who enters the area for the first time in a combat round or starts their turn there takes 6 acid or poison damage, as appropriate.')
							]
						})
					})
				]
			}
		]
	});

	static chainOfTheSeaAndSky: Item = FactoryLogic.createItem({
		id: 'item-chain-of-the-sea-and-sky',
		name: 'Chain of the Sea and Sky',
		description: 'This set of heavy chain mail is created to allow free movement in extreme environments without sacrificing protection.',
		type: ItemType.LeveledArmor,
		keywords: [ KitArmor.Heavy, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A set of wings from a flying carp, a set of chain mail rusted by seawater',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-chain-of-the-sea-and-sky-1',
						name: '',
						description: 'While you wear this armor, you can automatically swim at full speed while moving, and you can breathe underwater for up to 1 hour. Returning to the surface to breathe air again for any length of time resets the armor’s water-breathing benefit.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-chain-of-the-sea-and-sky-1a',
						field: FeatureField.Stamina,
						value: 6
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-chain-of-the-sea-and-sky-5',
						name: '',
						description: 'Whenever you fall, you can extend your arms (no action required) to unfurl a thick membrane between your arms and your body, slowing your fall and allowing you to glide. While gliding this way, you move downward at 1 square per round, and you can glide up to 6 squares horizontally as a free maneuver once during each of your turns.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-chain-of-the-sea-and-sky-5a',
						field: FeatureField.Stamina,
						value: 6
					}),
					FactoryLogic.feature.createDamageModifier({
						id: 'item-chain-of-the-sea-and-sky-5b',
						modifiers: [
							FactoryLogic.damageModifier.create({
								damageType: DamageType.Cold,
								modifierType: DamageModifierType.Immunity,
								value: 5
							})
						]
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-chain-of-the-sea-and-sky-9',
						name: '',
						description: 'Whenever your feet are not touching the ground (including floating in water or being in midair), you gain an edge on ability rolls, and any ability takes a bane when targeting you.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-chain-of-the-sea-and-sky-9a',
						field: FeatureField.Stamina,
						value: 9
					}),
					FactoryLogic.feature.createDamageModifier({
						id: 'item-chain-of-the-sea-and-sky-9b',
						modifiers: [
							FactoryLogic.damageModifier.create({
								damageType: DamageType.Cold,
								modifierType: DamageModifierType.Immunity,
								value: 10
							})
						]
					})
				]
			}
		]
	});

	static grandScarab: Item = FactoryLogic.createItem({
		id: 'item-grand-scarab',
		name: 'Grand Scarab',
		description: 'The blue-purple carapace and wings of a gigantic scarab beetle have been formed into an ornate breastplate.',
		type: ItemType.LeveledArmor,
		keywords: [ AbilityKeyword.Magic, KitArmor.Medium ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A giant scarab beetle carapace',
			source: 'Texts or lore in Phaedran',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-grand-scarab-1',
						name: '',
						description: 'While you wear this armor, you can fly. If you don’t end your turn on the ground, you fall..'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-grand-scarab-1a',
						field: FeatureField.Stamina,
						value: 6
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-grand-scarab-5',
						name: '',
						description: 'You no longer need to end your turn on the ground to avoid falling.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-grand-scarab-5a',
						field: FeatureField.Stamina,
						value: 6
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-grand-scarab-9',
						name: '',
						description: 'If you fly any distance before making a strike, that strike gains an edge.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-grand-scarab-9a',
						field: FeatureField.Stamina,
						value: 9
					})
				]
			}
		]
	});

	static kingsRoar: Item = FactoryLogic.createItem({
		id: 'item-kings-roar',
		name: 'King\'s Roar',
		description: 'A sunmetal kite shield bears the face of a lion on its front, its mouth opening wider over the course of battle.',
		type: ItemType.LeveledArmor,
		keywords: [ AbilityKeyword.Magic, KitArmor.Shield ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A ballad of heroism, two ingots of sunmetal',
			source: 'Songs in High Rhyvian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-kings-roar-1',
							name: 'Armor Ability',
							description: 'You make the shield’s lion face roar.',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createSpecial('Adjacent') ],
							target: 'One creature or object',
							sections: [
								FactoryLogic.createAbilitySectionText('Push the target up to 3 squares.'),
								FactoryLogic.createAbilitySectionPackage('item-kings-roar-tag')
							]
						})
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
					FactoryLogic.feature.createPackageContent({
						id: 'item-kings-roar-5',
						name: '5th',
						description: 'Instead, target one creature or object within 3 squares and push that target up to 4 squares.',
						tag: 'item-kings-roar-tag'
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
					FactoryLogic.feature.createPackageContent({
						id: 'item-kings-roar-9',
						name: '9th',
						description: 'Instead, target one creature or object within 6 squares, you push that target up to 5 squares, and the target is slowed until the end of their turn.',
						tag: 'item-kings-roar-tag'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-kings-roar-9a',
						field: FeatureField.Stamina,
						value: 3
					})
				]
			}
		]
	});

	static kuranzoiPrismscale: Item = FactoryLogic.createItem({
		id: 'item-kuranzoi-prismscale',
		name: 'Kuran\'zoi Prismscale',
		description: 'Each scale of this iridescent armor shimmers with the faint image of a frozen moment of time.',
		type: ItemType.LeveledArmor,
		keywords: [ KitArmor.Medium, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'The eyes of a time raider who died valiantly in battle',
			source: 'Texts or lore in Voll',
			characteristic: [ Characteristic.Intuition, Characteristic.Presence ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-kuranzoi-prismscale-1',
							name: 'Armor Ability',
							description: 'You capture a moment of time in the armor.',
							type: FactoryLogic.type.createTrigger('The target deals damage to you'),
							distance: [ FactoryLogic.distance.createRanged(5) ],
							target: 'One creature',
							sections: [
								FactoryLogic.createAbilitySectionText('The target is slowed until the end of their next turn.'),
								FactoryLogic.createAbilitySectionPackage('item-kuranzoi-prismscale-tag')
							]
						})
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-kuranzoi-prismscale-1a',
						field: FeatureField.Stamina,
						value: 6
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.createPackageContent({
						id: 'item-kuranzoi-prismscale-5',
						name: '5th',
						description: 'The target also takes corruption damage equal to twice your highest characteristic score.',
						tag: 'item-kuranzoi-prismscale-tag'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-kuranzoi-prismscale-5a',
						field: FeatureField.Stamina,
						value: 6
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.createPackageContent({
						id: 'item-kuranzoi-prismscale-9',
						name: '9th',
						description: 'You can immediately release the captured moment to gain a +3 bonus to speed that lasts until the end of your next turn.',
						tag: 'item-kuranzoi-prismscale-tag'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-kuranzoi-prismscale-9a',
						field: FeatureField.Stamina,
						value: 9
					})
				]
			}
		]
	});

	static paperTrappings: Item = FactoryLogic.createItem({
		id: 'item-paper-trappings',
		name: 'Paper Trappings',
		description: 'This delicate robe is made from thousands of pages torn from books, intricately folded together without a single thread to bind them.',
		type: ItemType.LeveledArmor,
		keywords: [ KitArmor.Light, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Ten pages from each of a hundred different books',
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
							id: 'item-paper-trappings-1',
							name: 'Armor Ability',
							type: FactoryLogic.type.createMain(),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText('You fold in on yourself until you and your gear are paper thin. This effect lasts for 1 minute, letting you easily slip through any opening that is 1 inch wide or more. When you return to your three-dimensional form, you are dazed for 1 minute. If you return to your true form while in a space that is too small for you, you are violently expelled into the nearest open space of your choice and take 3d6 damage.'),
								FactoryLogic.createAbilitySectionPackage('item-paper-trappings-tag')
							]
						})
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-paper-trappings-1a',
						field: FeatureField.Stamina,
						value: 6
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.createPackageContent({
						id: 'item-paper-trappings-5',
						name: '5th',
						description: 'When you return to your true form, you are dazed only until the end of your next turn.',
						tag: 'item-paper-trappings-tag'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-paper-trappings-5a',
						field: FeatureField.Stamina,
						value: 6
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-paper-trappings-5b',
							name: 'Armor Ability',
							type: FactoryLogic.type.createManeuver({ qualifiers: [ 'You are paper thin' ] }),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'One creature who is the same size or smaller than you',
							sections: [
								FactoryLogic.createAbilitySectionText('The target is grabbed by you.')
							]
						})
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.createPackageContent({
						id: 'item-paper-trappings-9',
						name: '9th',
						description: 'You are no longer dazed when you return to your true form.',
						tag: 'item-paper-trappings-tag'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-paper-trappings-9a',
						field: FeatureField.Stamina,
						value: 9
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-paper-trappings-9b',
							name: 'Armor Ability',
							type: FactoryLogic.type.createManeuver({ qualifiers: [ 'You are paper thin' ] }),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'One creature who is grabbed by you',
							sections: [
								FactoryLogic.createAbilitySectionText('You constrict the target, dealing 10 damage to them. A creature damaged this way takes a bane when using the Escape Grab maneuver against you and when making strikes against you.')
							]
						})
					})
				]
			}
		]
	});

	static shroudedMemory: Item = FactoryLogic.createItem({
		id: 'item-shrouded-memory',
		name: 'Shrouded Memory',
		description: 'This midnight-dark leather coat is embossed with fractal patterns that appear different each time they are observed.',
		type: ItemType.LeveledArmor,
		keywords: [ KitArmor.Light, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'The will of a deceased person with no heirs',
			source: 'Texts or lore in Khelt',
			characteristic: [ Characteristic.Agility, Characteristic.Presence ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-shrouded-memory-1',
						name: '',
						description: 'You gain an edge on tests made to lie about or conceal your identity.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-shrouded-memory-1a',
						field: FeatureField.Stamina,
						value: 6
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-shrouded-memory-5',
							name: 'Armor Ability',
							type: FactoryLogic.type.createTrigger('You take damage'),
							distance: [ FactoryLogic.distance.createRanged(5) ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText('You teleport within range. You create an illusion of you dying in your previous space, which fades at the end of your next turn.'),
								FactoryLogic.createAbilitySectionPackage('item-shrouded-memory-tag')
							]
						})
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-shrouded-memory-5a',
						field: FeatureField.Stamina,
						value: 6
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.createPackageContent({
						id: 'item-shrouded-memory-9',
						name: '9th',
						description: 'You can teleport up to a number of squares equal to the damage taken (minimum 5 squares). Additionally, if a creature dealt you the triggering damage, you become invisible to that creature until the end of your next turn.',
						tag: 'item-shrouded-memory-tag'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-shrouded-memory-9a',
						field: FeatureField.Stamina,
						value: 9
					})
				]
			}
		]
	});

	static spinyTurtle: Item = FactoryLogic.createItem({
		id: 'item-spiny-turtle',
		name: 'Spiny Turtle',
		description: 'This heavy mechanized plate armor of gnomish make is designed to create its own cover on the battlefield.',
		type: ItemType.LeveledArmor,
		keywords: [ KitArmor.Heavy, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Ten steel gears from an ancient construct',
			source: 'Texts or lore in Variac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-spiny-turtle-1',
							name: 'Armor Ability',
							type: FactoryLogic.type.createMain(),
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Wall, value: 4, within: 1 }) ],
							target: 'Special',
							sections: [
								FactoryLogic.createAbilitySectionText('You expand the armor on your back to create a wall of metal behind you. The wall is an object that retracts if you move, or if it takes 15 damage. It the requires a main action to recalibrate before it can be deployed again.'),
								FactoryLogic.createAbilitySectionPackage('item-spiny-turtle-tag')
							]
						})
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-spiny-turtle-1a',
						field: FeatureField.Stamina,
						value: 6
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.createPackageContent({
						id: 'item-spiny-turtle-5',
						name: '5th',
						description: 'The damage the wall can take before retracting increases to 25. Additionally, while the wall is expanded, spikes extrude from it, and any creature who deals damage to the wall while adjacent to it takes 3 damage.',
						tag: 'item-spiny-turtle-tag'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-spiny-turtle-5a',
						field: FeatureField.Stamina,
						value: 6
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-spiny-turtle-9',
						name: '',
						description: 'Spikes cover the armor, and any creature who deals damage to you while adjacent to you takes 6 damage.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-spiny-turtle-9a',
						field: FeatureField.Stamina,
						value: 9
					})
				]
			}
		]
	});

	static starHunter: Item = FactoryLogic.createItem({
		id: 'item-star-hunter',
		name: 'Star-Hunter',
		description: 'Shimmering light flows like liquid along this suit of crystalline armor.',
		type: ItemType.LeveledArmor,
		keywords: [ KitArmor.Heavy, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A large vessel of astral ice, a pint of supercooled mercury',
			source: 'Texts or lore in Voll',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-star-hunter-1',
						name: '',
						description: 'Any magic ability gains an edge when targeting you. Additionally, you instinctively know the location of any concealed creature within 2 squares.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-star-hunter-1a',
						field: FeatureField.Stamina,
						value: 6
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-star-hunter-1b',
							name: 'Armor Ability',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText('You turn invisible. Your invisibility ends if you take damage or use an ability, or at the end of your next turn.'),
								FactoryLogic.createAbilitySectionPackage('item-star-hunter-tag')
							]
						})
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-star-hunter-5',
						name: '',
						description: 'You instinctively know the location of any concealed creature within 5 squares.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-star-hunter-5a',
						field: FeatureField.Stamina,
						value: 6
					}),
					FactoryLogic.feature.createDamageModifier({
						id: 'item-star-hunter-5b',
						modifiers: [
							FactoryLogic.damageModifier.create({
								damageType: DamageType.Psychic,
								modifierType: DamageModifierType.Immunity,
								value: 5
							})
						]
					}),
					FactoryLogic.feature.createPackageContent({
						id: 'item-star-hunter-5c',
						name: '5th',
						description: 'Your invisibility no longer ends at the end of your next turn.',
						tag: 'item-star-hunter-tag'
					}),
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-star-hunter-9',
						name: '',
						description: 'You instinctively know the location of any concealed creature within 10 squares.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-star-hunter-9a',
						field: FeatureField.Stamina,
						value: 9
					}),
					FactoryLogic.feature.createDamageModifier({
						id: 'item-star-hunter-9b',
						modifiers: [
							FactoryLogic.damageModifier.create({
								damageType: DamageType.Psychic,
								modifierType: DamageModifierType.Immunity,
								value: 5
							})
						]
					}),
					FactoryLogic.feature.createPackageContent({
						id: 'item-star-hunter-9c',
						name: '9th',
						description: 'Your invisibility no longer ends when you use an ability.',
						tag: 'item-star-hunter-tag'
					}),
				]
			}
		]
	});

	static telekineticBulwark: Item = FactoryLogic.createItem({
		id: 'item-telekinetic-bulwark',
		name: 'Telekinetic Bulwark',
		description: 'An unseen force seems to draw this steel shield toward nearby creatures.',
		type: ItemType.LeveledArmor,
		keywords: [ AbilityKeyword.Psionic, KitArmor.Shield ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Three ingots of steel, six crystals that resonate with psionic power',
			source: 'Texts or lore in Variac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-telekinetic-bulwark-1',
							name: 'Armor Ability',
							type: FactoryLogic.type.createTrigger('Target uses an ability', { free:true }),
							distance: [ FactoryLogic.distance.createSpecial('Adjacent') ],
							target: 'One enemy',
							sections: [
								FactoryLogic.createAbilitySectionText('Use the Grab maneuver against that enemy. You can have any number of enemies grabbed in this way.'),
								FactoryLogic.createAbilitySectionPackage('item-telekinetic-bulwark-tag')
							]
						})
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-telekinetic-bulwark-1a',
						field: FeatureField.Stamina,
						value: 2
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.createPackageContent({
						id: 'item-telekinetic-bulwark-5',
						name: '5th',
						description: 'The range increases to 10 squares. Additionally, any enemy who uses the Escape Grab maneuver while grabbed this way takes a bane on the test.',
						tag: 'item-telekinetic-bulwark-tag'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-telekinetic-bulwark-5a',
						field: FeatureField.Stamina,
						value: 3
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'item-telekinetic-bulwark-9',
							name: '',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createSpecial('') ],
							target: 'Any enemies the shield has grabbed',
							sections: [
								FactoryLogic.createAbilitySectionText('Pull the targets up to 5 squares.')
							]
						})
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-telekinetic-bulwark-9a',
						field: FeatureField.Stamina,
						value: 4
					})
				]
			}
		]
	});
}
