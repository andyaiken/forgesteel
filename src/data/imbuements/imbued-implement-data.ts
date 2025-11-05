import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { Imbuement } from '@/models/imbuement';
import { ItemType } from '@/enums/item-type';

export class ImbuedImplementData {
	static berserking: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'The tusk of a feral boar',
			source: 'Texts or lore in Kalliak',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-berserking',
			name: 'Berserking',
			description: 'Whenever you damage a creature using a magic or psionic ability and obtain a tier 3 outcome, that creature must make an opportunity attack against their nearest ally if possible after the ability’s effects resolve. This strike deals extra damage equal to the highest of your Reason, Intuition, or Presence scores.'
		})
	});

	static displacingI: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'Slime from an ooze',
			source: 'Texts or lore in Khelt',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-displacing-i',
			name: 'Displacing I',
			description: 'Whenever you damage a creature using a magic or psionic ability and obtain a tier 3 outcome, you can teleport that creature up to 2 squares after the ability’s effects resolve. If the creature started on a horizontal surface, they must end on a horizontal surface.'
		})
	});

	static elemental: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'Ashes or other leavings from a natural disaster',
			source: 'Texts or lore in The First Language',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-elemental',
			name: 'Elemental',
			description: 'Whenever you use an ability with the Air, Earth, Fire, Green, Rot, Void, or Water keyword, you can attune this implement to that element until the end of the encounter. While the implement is attuned, you gain an edge on power rolls with that elemental keyword. The implement can be attuned to only one element at a time.'
		})
	});

	static forcefulI: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A lead slingstone that killed a giant',
			source: 'Texts or lore in High Kuric',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-forceful-i',
			name: 'Forceful I',
			description: 'Whenever you use a magic or psionic ability to push or pull a creature, you can move that creature an additional 2 squares.'
		})
	});

	static ratForm: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'One hundred rat pelts',
			source: 'Texts or lore in Khamish',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'imbuement-rat-form',
				name: 'Rat Form',
				type: FactoryLogic.type.createManeuver(),
				sections: [
					FactoryLogic.createAbilitySectionText('You transform into a rat. Your equipment transforms with you. As a rat, you have speed 5 and can automatically climb at full speed while moving, your size is 1T, and you can see in the dark. You can speak and keep your skills while in rat form, but your Might is −5 and you lose all your regular abilities, features, and benefits. You can revert to your natural form as a maneuver, and do so automatically if you take any damage.')
				]
			})
		})
	});

	static rejuvenatingI: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A singing quartz crystal',
			source: 'Texts or lore in The First Language',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-rejuvenating-i',
			name: 'Rejuvenating I',
			description: 'Whenever you use an ability that costs 1 or more of your Heroic Resource, roll a d10. On a 9 or higher, you gain 1 Heroic Resource.'
		})
	});

	static seeking: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'An inch-long needle carved from a diamond',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-seeking',
			name: 'Seeking',
			description: 'Your ranged magic or psionic abilities gain a +2 distance bonus. Additionally, if you think the name of a specific creature, place, or object to the implement, the implement points toward that target, provided you are on the same world.'
		})
	});

	static thoughtSending: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'The brain of a psionic creature',
			source: 'Texts or lore in Variac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-thought-sending',
			name: 'Thought Sending',
			description: 'Your ranged magic and psionic abilities gain a +2 distance bonus. Additionally, you can telepathically communicate with any willing creature who knows a language and whose name you know, provided they are on the same world as you. You must initiate the conversation, but once you do, the creature can respond until you end the conversation.'
		})
	});

	static wardingI: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'Three skulls from the same chimera',
			source: 'Texts or lore in Variac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 1,
		feature: FactoryLogic.feature.createBonus({
			id: 'imbuement-warding-i',
			name: 'Warding I',
			field: FeatureField.Stamina,
			value: 6
		})
	});

	static celerity: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A dire falcon’s beak',
			source: 'Texts or lore in Khelt',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-celerity',
			name: 'Celerity',
			description: 'Immediately after using a magic or psionic ability that requires a main action, you can shift up to 3 squares, or you can use the Escape Grab maneuver as a free maneuver.'
		})
	});

	static celestine: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A still-warm piece of a meteorite',
			source: 'Texts or lore in Ullorvic',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'imbuement-celestine',
				name: 'Celestine',
				type: FactoryLogic.type.createMain(),
				sections: [
					FactoryLogic.createAbilitySectionText('You conjure up to three stars, which hover in unoccupied squares of your choice within 5 squares of you. The stars remain in place, and disappear if you create more stars. When an enemy enters any star’s space, the star detonates and is destroyed, and the enemy takes 10 fire damage. If you have line of effect to the enemy, you can also slide them 1 square. Otherwise, the enemy slides 1 square in a random direction.')
				]
			})
		})
	});

	static displacingII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'The wing of a pixie',
			source: 'Texts or lore in Voll',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-displacing-ii',
			name: 'Displacing II',
			description: 'When you use the implement’s Displacing I enhancement, you can teleport the creature up to 4 squares. Additionally, the creature takes a bane on their next power roll made before the end of their next turn'
		})
	});

	static eruptingI: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'Obsidian from an active volcano',
			source: 'Texts or lore in Vastariax',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-erupting-i',
			name: 'Erupting I',
			description: 'Whenever you damage a creature using a magic or psionic ability that targets only a single creature and obtain a tier 3 outcome, each enemy within 2 squares of the creature takes 3 fire damage after the ability’s effects resolve.'
		})
	});

	static forcefulII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A marble stone giant’s fingernail',
			source: 'Texts or lore in High Kuric',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-forceful-ii',
			name: 'Forceful II',
			description: 'Whenever you use a magic or psionic ability to push or pull a creature, you can move that creature an additional 3 squares. This replaces the benefit of Forceful I.'
		})
	});

	static hallucinatory: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A night hag’s hairpin',
			source: 'Texts or lore in Variac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'imbuement-hallucinatory',
				name: 'Hallucinatory',
				type: FactoryLogic.type.createManeuver(),
				sections: [
					FactoryLogic.createAbilitySectionText('You create an area of sensory instability in a 2 aura centered on yourself. The area is difficult terrain for your enemies until the end of the encounter.')
				]
			})
		})
	});

	static lingeringI: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'Slow-acting poison refined from rare fungi',
			source: 'Texts or lore in Szetch',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-lingering-i',
			name: 'Lingering I',
			description: 'Whenever you damage a creature using a magic or psionic ability and obtain a tier 3 outcome, that creature takes 8 damage at the start of your next turn.'
		})
	});

	static rejuvenatingII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A still-growing bonsai tree at least 30 years old',
			source: 'Texts or lore in The First Language',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-rejuvenating-ii',
			name: 'Rejuvenating II',
			description: 'Whenever you use an ability that costs 1 or more of your Heroic Resource, roll a d10. On an 8 or higher, you gain 1 Heroic Resource and you can spend a Recovery. This replaces the benefit of Rejuvenating I.'
		})
	});

	static wardingII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A metallic dragon’s horn',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 5,
		feature: FactoryLogic.feature.createMultiple({
			id: 'imbuement-warding-ii',
			name: 'Warding II',
			features: [
				FactoryLogic.feature.createBonus({
					id: 'warding-ii-a',
					field: FeatureField.Stamina,
					value: 6
				}),
				FactoryLogic.feature.create({
					id: 'warding-ii-b',
					name: 'Warding II',
					description: 'Your characteristic scores are considered 1 higher for the purpose of resisting potencies.'
				})
			]
		})
	});

	static anathema: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'An olothec tentacle',
			source: 'Texts or lore in Variac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-anathema',
			name: 'Anathema',
			description: 'Whenever you damage a creature using a magic or psionic ability and obtain a tier 3 outcome, that creature is also weakened (save ends). If the creature is within 10 squares when this weakened effect ends, you can use a free triggered action to make a free strike against them.'
		})
	});

	static displacingIII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'The keystone from a gate used for crossing between worlds',
			source: 'Texts or lore in Voll',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-displacing-iii',
			name: 'Displacing III',
			description: 'When you use the implement’s Displacing I enhancement, you can teleport the creature up to 5 squares. Additionally, the creature takes a bane on their next power roll made before the end of their next turn.'
		})
	});

	static eruptingII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A sealed geode containing explosive gas',
			source: 'Texts or lore in Vastariax',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-erupting-ii',
			name: 'Erupting II',
			description: 'The fire damage dealt by the implement’s Erupting I enhancement increases to 6.'
		})
	});

	static forcefulIII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A scale from the kraken',
			source: 'Texts or lore in High Kuric',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-forceful-iii',
			name: 'Forceful III',
			description: 'Whenever you use a magic or psionic ability to push or pull a creature, you can move that creature an additional 3 squares and that movement can be vertical. This replaces the benefit of Forceful II.'
		})
	});

	static lingeringII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A venom gland from a mature dragon',
			source: 'Texts or lore in Szetch',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-lingering-ii',
			name: 'Lingering II',
			description: 'Whenever you damage a creature using a magic or psionic ability and obtain a tier 3 outcome, that creature takes 15 damage at the start of your next turn. This replaces the benefit of Lingering I.'
		})
	});

	static piercing: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'Black iron harvested from a slain blood elemental',
			source: 'Texts or lore in Anjali',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-piercing',
			name: 'Piercing',
			description: 'Your magic and psionic abilities ignore damage immunities.'
		})
	});

	static psionicSiphon: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'The frontal lobe of an overmind',
			source: 'Texts or lore in Variac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-psionic-siphon',
			name: 'Psionic Siphon',
			description: 'Once per turn when you damage one or more creatures using a magic or psionic ability and obtain a tier 3 outcome, you gain Stamina equal to your highest characteristic score, and one creature you damage takes an extra 5 damage.'
		})
	});

	static rejuvenatingIII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'A live flower that blooms only once a decade',
			source: 'Texts or lore in The First Language',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.create({
			id: 'imbuement-rejuvenating-iii',
			name: 'Rejuvenating III',
			description: 'Whenever you use an ability that costs 1 or more of your Heroic Resource, roll a d10. On a 7 or higher, you gain 1 Heroic Resource, and you or a creature of your choice within 3 squares can spend a Recovery. This replaces the benefit of Rejuvenating II.'
		})
	});

	static wardingIII: Imbuement = FactoryLogic.createImbuement({
		type: ItemType.ImbuedImplement,
		crafting: FactoryLogic.createProject({
			prerequisites: 'Heartwood from a two-century-old tree',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 150
		}),
		level: 9,
		feature: FactoryLogic.feature.createMultiple({
			id: 'imbuement-warding-iii',
			name: 'Warding III',
			features: [
				FactoryLogic.feature.createBonus({
					id: 'warding-iii-a',
					field: FeatureField.Stamina,
					value: 6
				}),
				FactoryLogic.feature.create({
					id: 'warding-iii-b',
					name: 'Warding III',
					description: 'You and each ally within 3 squares of you has their characteristic scores considered 1 higher for the purpose of resisting potencies. This replaces the benefit of Warding II.'
				})
			]
		})
	});
};
