import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { Item } from '../../models/item';
import { ItemType } from '../../enums/item-type';

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
		effect: 'When you are targeted by any effect that deals cold damage, you can use a triggered action to shift a number of squares equal to your level. If you do so, the cold immunity granted by the cloak becomes cold weakness with the same value until the end of the next round. You can\'t use this triggered action again until this weakness ends.',
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
		effect: 'When you are targeted by any effect that deals fire damage, you can use a triggered action to reduce the damage to 0. If you do so, the fire immunity granted by this cloak becomes fire weakness with the same value until the end of the next round. You can\'t use this triggered action again until this weakness ends.',
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
		effect: 'When you are targeted by any effect that deals lightning damage, you can use a triggered action to cause the next damage-dealing ability you use to deal extra lightning damage equal to your level. Once you deal this extra damage, your lightning immunity becomes lightning weakness with the same value until the end of the next round. You can\'t use this triggered action again until this weakness ends.',
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
		effect: 'While holding the Deadweight, you fall twice as fast, taking an extra 1 damage for each square you fall (to a maximum of 75 total damage from a single fall). If you fall at least 5 squares in this way, choose one of your melee abilities normally used as an action. You can use that ability as a free maneuver once during the fall before you hit the ground.'
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
		effect: 'As a maneuver, you transfer an object of size 1S or 1T held in one hand with another object of the same size that is within 10 squares. The objects change locations instantaneously and without creating any auditory or visual disturbance. If another creature is wearing or holding the object you transfer to your hand and they have I < 4, they fail to notice the transfer.'
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
		effect: 'As a maneuver, you call upon the Divine Vine in Yllyric, causing it to extend up to 5 squares from you and attach its jaws to a creature or object, allowing you to use the Grab maneuver at a distance. If the target is grabbed, you can choose to keep the divine vine extended, pull the target adjacent to you, or pull yourself adjacent to the target. The divine vine stays attached to the target until the vine takes damage from a strike, the target escapes your grab, or you call upon the vine to release the target (no action required).'
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
When you use a move action while wearing these gloves, you can place one hand upon a mundane object as part of that move action. If the object is 1 square thick or less and has open space on the other side (for example, a door or wall), you pull your body through it as though the object wasn't there.

If the object is too thick or has no open space on the other side, your hand becomes stuck inside the object. Removing your hand takes a successful hard Might test made as an action.`
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
		effect: 'While you wear these gloves, your grip is all but impossible to break. You can\'t be disarmed, you can\'t lose your grip while climbing, and creatures grabbed by you take a bane on the test for the Escape Grab maneuver.'
	});

	static gyrotoque: Item = FactoryLogic.createItem({
		id: 'item-gyrotoque',
		name: 'Gyrotoque',
		description: 'This tight-fitting cap is topped with a freely spinning bauble.',
		type: ItemType.Trinket,
		keywords: [ AbilityKeyword.Head, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A lodestone that has been struck by lightning',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Reason ],
			goal: 150
		}),
		effect: 'When you spin the bauble atop this cap (no action required), the cap gains an amount of momentum equal to the number of squares you previously moved this turn. As a move action, you can spin the bauble the opposite direction to instantly infuse yourself with the cap\'s momentum. The next time you force move a creature before the end of your turn, the forced movement distance gains a bonus equal to the cap\'s momentum. The cap\'s momentum drops to 0 when you use it this way, if you spin the bauble again to gain new momentum, or at the end of your turn.'
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
		effect: 'Whenever you take the Charge action while wearing this helmet, you gain a +5 bonus to speed until the end of your current turn. After charging, you can use the Knockback maneuver as a free maneuver, regardless of the target creature\'s size.'
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
		effect: 'While you wear this mask, you can use a maneuver to transform into any humanoid of equivalent size that you have previously seen. The humanoid\'s appearance reflects the last time you saw them, including whatever they were wearing. Your clothing and gear are transformed into the figure\'s clothing and gear, absorbed into your body, or retain their original forms, as you determine. If the figure possessed any treasures when you last saw them, they are duplicated as mundane copies while you are transformed.'
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
		effect: 'When the brooch is removed from this bag and placed in a container or room, it magically entangles that location to the bag. Any item that can be placed in the Quantum Satchel appears near to the brooch and can be recovered by reaching inside while picturing the desired object. The capacity of the satchel is dictated by the size of the container or room where the entangled brooch is. If an item is removed from the container or room containing the brooch, it can\'t be retrieved via the satchel.'
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
}
