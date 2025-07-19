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
						description: 'An adjacent creature who deals damage to you takes 6 acid or poison damage. Additionally, you can use a maneuver to transmute a 2-cube area of liquid or gas within 1 square of you into liquid acid or poison gas until the start of your next turn. Any creature who enters the area for the first time in a round or starts their turn there takes 6 acid or poison damage, as appropriate.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-adaptive-second-skin-9a',
						field: FeatureField.Stamina,
						value: 9
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
						description: 'While you wear this armor, you can automatically swim at full speed while moving, and you can breathe underwater for up to 1 hour. Returning to the surface to breathe air again for any length of time resets the armor\'s water-breathing benefit.'
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
						description: 'Whenever you fall, you can extend your arms (no action required) to unfurl a thick membrane between your arms and your body, slowing your fall and allowing you to glide. While gliding in this way, you move downward at a speed of 1 square per round, and you can glide up to 6 squares horizontally as a free maneuver once during each of your turns.'
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
						description: 'Whenever your feet are not touching a solid surface (including floating in water or being in midair), you gain an edge on ability power rolls, and any abilities that target you take a bane.'
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
		description: 'The bluish-purple carapace and wings of a gigantic scarab beetle have been formed into an ornate breastplate.',
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
						description: 'While you wear this armor, you can fly. If you don\'t end your turn on a solid surface, you fall.'
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
						description: 'You no longer need to end your turn on a solid surface to avoid falling.'
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
			source: 'Songs in Old Sun Elf',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-kings-roar-1',
						name: '',
						description: 'You can use a maneuver to make the shield\'s lion face roar, choosing one creature or object adjacent to you and pushing that target up to 3 squares.'
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
						name: '',
						description: 'When you cause the shield to roar, you target one creature or object within 3 squares and push that target up to 4 squares.'
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
						name: '',
						description: 'When you cause the shield to roar, you target one creature or object within 6 squares, you push that target up to 5 squares, and the target is slowed until the end of their turn.'
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
					FactoryLogic.feature.create({
						id: 'item-kuranzoi-prismscale-1',
						name: '',
						description: 'Whenever a creature within 5 squares deals damage to you, you can use a triggered action to capture a moment of time in the armor, forcing the creature to immediately end their turn after the damage and any effects associated with it are resolved.'
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
					FactoryLogic.feature.create({
						id: 'item-kuranzoi-prismscale-5',
						name: '',
						description: 'When you capture a moment of time in the armor, the triggering creature is also slowed until the end of their turn.'
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
					FactoryLogic.feature.create({
						id: 'item-kuranzoi-prismscale-9',
						name: '',
						description: 'Whenever you capture a moment of time in the armor, you can immediately release it for a burst of speed. If you do, you become dazed (save ends) and can take an extra turn immediately after the triggering creature.'
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
					FactoryLogic.feature.create({
						id: 'item-paper-trappings-1',
						name: '',
						description: 'As an action, you can fold in on yourself until you and your gear are paper thin. This effect lasts for 1 minute, letting you easily slip through any opening that is at least 1 inch wide. When you return to your three-dimensional form, you are dazed for 1 minute. If you return to your true form while in a space that is too small for you, you are violently expelled into the nearest open space of your choice and take 3d6 damage.'
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
					FactoryLogic.feature.create({
						id: 'item-paper-trappings-5',
						name: '',
						description: 'When you return to your true form, you are dazed only until the end of your next turn. Additionally, while you are paper thin, you can use a maneuver to wrap yourself around an adjacent target who is the same size or smaller than you, automatically grabbing them.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-paper-trappings-5a',
						field: FeatureField.Stamina,
						value: 6
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-paper-trappings-9',
						name: '',
						description: 'You are no longer dazed when you return to your true form. Additionally, while you have a target grabbed when you are paper thin, you can use a maneuver to constrict the target, dealing 10 damage to them. A creature damaged this way takes a bane when using the Escape Grab maneuver against you and when making a strike against you.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-paper-trappings-9a',
						field: FeatureField.Stamina,
						value: 9
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
					FactoryLogic.feature.create({
						id: 'item-shrouded-memory-5',
						name: '',
						description: 'Whenever you take damage, you can use a triggered action to teleport up to 5 squares. If you do, you create an illusion of you dying in your previous space, which fades at the end of your next turn.'
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
					FactoryLogic.feature.create({
						id: 'item-shrouded-memory-9',
						name: '',
						description: 'Whenever you use the armor’s triggered action to teleport, you can teleport up to a number of squares equal to the damage taken. Additionally, if a creature dealt you the triggering damage, you become invisible to that creature until the end of your next turn.'
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
					FactoryLogic.feature.create({
						id: 'item-spiny-turtle-1',
						name: '',
						description: 'As an action, you can expand the armor on your back to create a 4 wall of metal behind you. The wall is an object that retracts if you move, or if it takes 15 damage. It then requires an action to recalibrate before it can be deployed again.'
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
					FactoryLogic.feature.create({
						id: 'item-spiny-turtle-5',
						name: '',
						description: 'The damage the wall can take before retracting increases to 25. Additionally, while the wall is expanded, spikes extrude from it, and any creature who deals damage to the wall while adjacent to it takes 3 damage.'
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
			prerequisites: 'Fifty pounds of astral ice, one pint of supercooled mercury',
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
						description: 'Any magic ability gains an edge when targeting you. Additionally, you instinctively know the location of any concealed creature within 2 squares. You can also turn invisible as a maneuver. Your invisibility ends if you take damage or use an ability, or at the end of your next turn.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-star-hunter-1a',
						field: FeatureField.Stamina,
						value: 7
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-star-hunter-5',
						name: '',
						description: 'You instinctively know the location of any concealed creature within 5 squares. Your invisibility no longer ends at the end of your next turn.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-star-hunter-5a',
						field: FeatureField.Stamina,
						value: 7
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
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-star-hunter-9',
						name: '',
						description: 'You instinctively know the location of any concealed creature within 10 squares. Your invisibility no longer ends when you use an ability.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-star-hunter-9a',
						field: FeatureField.Stamina,
						value: 11
					}),
					FactoryLogic.feature.createDamageModifier({
						id: 'item-star-hunter-9b',
						modifiers: [
							FactoryLogic.damageModifier.create({
								damageType: DamageType.Psychic,
								modifierType: DamageModifierType.Immunity,
								value: 10
							})
						]
					})
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
					FactoryLogic.feature.create({
						id: 'item-telekinetic-bulwark-1',
						name: '',
						description: 'Once per turn when an adjacent enemy uses an ability, you can use a free triggered action to use the Grab maneuver against that enemy. You can have any number of enemies grabbed in this way.'
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
					FactoryLogic.feature.create({
						id: 'item-telekinetic-bulwark-5',
						name: '',
						description: 'You can use the shield’s free triggered action to grab any enemy within 10 squares who uses an ability. Additionally, any enemy who uses the Escape Grab maneuver while grabbed this way takes a bane on the test.'
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
					FactoryLogic.feature.create({
						id: 'item-telekinetic-bulwark-9',
						name: '',
						description: 'You can use a maneuver to pull any number of targets the shield has grabbed up to 5 squares.'
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
