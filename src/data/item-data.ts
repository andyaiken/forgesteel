import { AbilityKeyword } from '../enums/ability-keyword';
import { Characteristic } from '../enums/characteristic';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { DamageType } from '../enums/damage-type';
import { FactoryLogic } from '../logic/factory-logic';
import { FeatureField } from '../enums/feature-field';
import { Item } from '../models/item';
import { ItemType } from '../enums/item-type';
import { KitArmor } from '../enums/kit-armor';
import { KitWeapon } from '../enums/kit-weapon';

export class ConsumableData {
	static blackAshDart: Item = FactoryLogic.createItem({
		id: 'item-black-ash-dart',
		name: 'Black Ash Dart',
		description: 'A diamond-shaped dart holds a shimmering black vial at its core.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Three vials of black ash from the College of Black Ash',
			source: 'Texts or lore in Szetch',
			characteristic: [ Characteristic.Agility, Characteristic.Intuition ],
			goal: 45,
			effect: 'Yields 1d3 darts, or three darts if crafted by a shadow'
		}),
		effect: `
As a maneuver, you can make a ranged free strike using a black ash dart. The attack deals 1 bonus damage and adds the following effects to the tier results of the power roll:

* 11 or lower: You can teleport the target up to 2 squares.
* 12–16: You can teleport the target up to 4 squares.
* 17+: You can teleport the target up to 6 squares.`
	});

	static bloodEssenceVial: Item = FactoryLogic.createItem({
		id: 'item-blood-essence-vial',
		name: 'Blood Essence Vial',
		description: 'A brittle glass tube has a ruby set atop it, attached by a hinge.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Potion, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A ruby purloined from a vampire',
			source: 'Texts or lore in Proto-Ctholl',
			characteristic: [ Characteristic.Agility, Characteristic.Reason ],
			goal: 45
		}),
		effect: 'When you damage an adjacent creature who has blood, you can capture the target\'s life essence in this vial (no action required). Record the damage you dealt. As a maneuver, you can drink the contents of the vial to regain Stamina equal to half the damage dealt. If you spend 1 Heroic Resource while you drink, you regain Stamina equal to the damage dealt. Once you drink from the vial, it crumbles to dust.'
	});

	static catapultDust: Item = FactoryLogic.createItem({
		id: 'item-catapult-dust',
		name: 'Catapult Dust',
		description: 'A small leather pouch is filled with this fine blue powder.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'An ounce of witherite crystal',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Agility, Characteristic.Intuition ],
			goal: 45
		}),
		effect: 'Catapult Dust was developed as a cost-effective magical siege weapon. As an action, you pour the dust out in an adjacent unoccupied space to fill an area as large as a 2 cube. At the start of your next turn, the ground at the bottom of the area erupts violently upwards and in a direction of your choice. Any unattended objects in the area, or creatures who have entered the area since the dust was poured, are launched in an arc that is 6 + 1d6 squares long and 3 + 1d6 squares high.'
	});

	static giantsBloodFlame: Item = FactoryLogic.createItem({
		id: 'item-giants-blood-flame',
		name: 'Giant\'s Blood Flame',
		description: 'A small pot is filled with a viscous, ochre oil that smells of sulfur and burnt hair.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Oil ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'One vial of fire giant blood',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 45
		}),
		effect: `
As a maneuver, you coat a weapon in this oil and ignite it. The weapon burns persistently and without harming itself until it is extinguished as a maneuver. Whenever you use a weapon that is ignited this way with a weapon ability, you deal an extra 2 fire damage with rolled damage.

Alternatively, you can use a maneuver to throw the pot up to 5 squares, coating the square where it lands and any creatures or objects in that square with a sticky, flammable oil. If the oil takes any fire damage, it burns persistently and deals 5 fire damage at the end of each of your turns to anything it has coated. A creature covered in the oil or who can reach it can use an action to extinguish the flames and end the effect.`
	});

	static growthPotion: Item = FactoryLogic.createItem({
		id: 'item-growth-potion',
		name: 'Growth Potion',
		description: 'This thick, green liquid tastes of licorice and potatoes.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Potion ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Five ounces of seagrass',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 45
		}),
		effect: 'As a maneuver, you can drink this potion or pour it over an object of size 2 or smaller, causing the target\'s size to increase by 1. If you are the target, your current Stamina and Stability are doubled, you gain an edge on Might tests, and your weapon abilities deal extra rolled damage equal to your highest characteristic score. You shrink back to your original size after 3 rounds, halving your current Stamina and Stability, and losing the potion\'s other benefits. Objects maintain their new size permanently.'
	});

	static healingPotion: Item = FactoryLogic.createItem({
		id: 'item-healing-potion',
		name: 'Healing Potion',
		description: 'Thick and red, this liquid tastes of sour beer.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Potion ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'One ounce of costmary leaves',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 45
		}),
		effect: 'When you drink this potion as a maneuver, you regain Stamina equal to your recovery value without spending a Recovery.'
	});

	static impsTongue: Item = FactoryLogic.createItem({
		id: 'item-imps-tongue',
		name: 'Imp\'s Tongue',
		description: 'The tongue of an imp has been dried and preserved. Yuck.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'One imp\'s tongue',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 45
		}),
		effect: 'As a maneuver, you place the imp\'s tongue on your own tongue, causing it to reconstitute and attach itself to your tongue. While attached, the Imp\'s Tongue allows you to speak any language and understand any language spoken to you. This benefit ends after 1 hour, when the tongue is absorbed into your body.'
	});

	static lachompTooth: Item = FactoryLogic.createItem({
		id: 'item-lachomp-tooth',
		name: 'Lachomp Tooth',
		description: 'A thumb-sized serrated tooth seems to scratch your flesh in some way whenever it is handled.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A leftover carcass of a lachomp meal',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 45,
			effect: 'Yields 1d3 teeth'
		}),
		effect: `
As a maneuver, you attach a lachomp tooth to a weapon, allowing that weapon to supernaturally flicker in and out of reality. Your next strike that uses this weapon can tear through multiple targets in a line (for a ranged strike) or surrounding you (for a melee strike). The attack adds the following effects to the tier results of the power roll:

* 11 or lower: You can affect one additional target with this strike.
* 12-16: You can affect up to three additional targets with this strike.
* 17+: You can affect up to seven additional targets with this strike.`
	});

	static mirrorToken: Item = FactoryLogic.createItem({
		id: 'item-mirror-token',
		name: 'Mirror Token',
		description: 'A gold-rimmed, mirror-faced coin trembles in the hand as if it were repelled by your touch.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Three sheets of glass, sunbaked gold dust',
			source: 'Texts or lore in Variac',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 45
		}),
		effect: 'While the Mirror Token is on your person and you are targeted by a ranged strike, you can use a triggered action to crush the token and ignore the strike. Half the damage you would have taken and any effects of the triggering strike are imposed on the creature making the strike.'
	});

	static pocketHomunculus: Item = FactoryLogic.createItem({
		id: 'item-pocket-homunculus',
		name: 'Pocket Homunculus',
		description: 'A densely interlocking sphere of clockwork gears features facets that show the countenance of the item\'s wielder.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A strip of starmetal coated in the blood of the item\'s crafter',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Reason ],
			goal: 45
		}),
		effect: `
When activated as a maneuver, this item erupts in a bright flash, you can shift 1 square without your enemies noticing your movement, and a homunculus perfectly resembling you appears in a space adjacent to you. The homunculus is a creature with Stamina 15, a 0 in all their characteristics, and a speed and stability equal to yours.

They appear indistinguishable from you, but can't use any abilities.

While you have line of effect to your homunculus, you can use a maneuver to issue them a telepathic command. The homunculus performs the command to the best of their ability. If not commanded, the homunculus mimics your movements and speech. When you move, the homunculus moves with you, matching your pace. The homunculus crumbles to dust after 1 hour or if reduced to Stamina 0.`
	});

	static portableCloud: Item = FactoryLogic.createItem({
		id: 'item-portable-cloud',
		name: 'Portable Cloud',
		description: 'This thin glass sphere holds a tiny roiling cloud.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Ten ounces of rainwater from a sacred fey grove',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 30
		}),
		effect: 'As a maneuver, you throw this delicate glass sphere up to 5 squares, breaking it and creating a 4 cube of fog. The fog dissipates after 10 minutes or if a strong gust of wind created by a storm or magic passes through the area.'
	});

	static noxiousCloud: Item = FactoryLogic.createItem({
		id: 'item-noxious-cloud',
		name: 'Noxious Cloud',
		description: 'This thin glass sphere holds a tiny roiling cloud.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Ten ounces of rainwater from a sacred fey grove; one ounce of undead flesh',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 45
		}),
		effect: 'Filled with a green or putrid yellow haze, this sphere spreads a choking, foul-smelling mist when broken. Each creature who enters the cloud for the first time in a round or starts their turn there takes 5 poison damage. Additionally, any creature is weakened while in the fog.'
	});

	static thunderheadCloud: Item = FactoryLogic.createItem({
		id: 'item-thunderhead-cloud',
		name: 'Thunderhead Cloud',
		description: 'This thin glass sphere holds a tiny roiling cloud.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Ten ounces of rainwater from a sacred fey grove, a spool of copper wire',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 45
		}),
		effect: 'Small lightning bolts arc around the black cloud in this sphere, which creates a 3 cube of cloud and lightning when broken. Each creature who enters the cloud for the first time in a round or starts their turn there takes 5 lightning damage. Additionally, any creature is slowed while in the cloud.'
	});

	static veratismo: Item = FactoryLogic.createItem({
		id: 'item-veratismo',
		name: 'Professor Veratismo\'s Quaff\'n\'Huff Snuff',
		description: 'This tiny compact holds a colorless powder with the slightest astringent smell.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Potion, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'The roots of a just-budded nightshade',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason ],
			goal: 45
		}),
		effect: 'As a maneuver, you sprinkle a dose of this powder onto food or drink, or blow it at an adjacent creature who is grabbed, restrained, or unconscious. A creature who is exposed to blown powder (even if they hold their breath) or consumes a dose of the powder must speak only true statements for the next hour. Additionally, other creatures gain an edge on Presence and Intuition tests made to convince the target to speak or to read the target\'s emotions. Any such creature has a double edge on the test if the target doesn\'t realize they\'ve been affected by the snuff.'
	});

	static snapdragon: Item = FactoryLogic.createItem({
		id: 'item-snapdragon',
		name: 'Snapdragon',
		description: 'This delicate orange blossom has a sickly-sweet smell.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Fifty snapdragon seeds',
			source: 'Texts or lore in Yllyric',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 45,
			effect: 'Yields 1d6 + 1 snapdragons'
		}),
		effect: 'As a maneuver, you sniff a magical snapdragon blossom, causing it to whither and making your movements more forceful and explosive. The next damage-dealing ability you use deals 5 extra damage and gains a +2 bonus to the distance of any forced movement it imposes. If the ability does not impose forced movement, you can push each creature targeted by the ability up to 2 squares.'
	});
}

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

export class LeveledImplementData {
	static abjurersBastion: Item = FactoryLogic.createItem({
		id: 'item-abjurers-bastion',
		name: 'Abjurer\'s Bastion',
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
						description: 'While you wield this implement, your damage-dealing supernatural abilities gain a +1 rolled damage bonus. Additionally, whenever you deal damage to a creature with a supernatural ability, you gain temporary Stamina equal to your highest characteristic score.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-abjurers-bastion-5',
						name: '',
						description: 'The implement\'s damage bonus increases to +2. Additionally, whenever you deal damage using a supernatural ability, you can use a maneuver to create an immobile field of protection that is a 1 cube, around yourself or an ally within 5 squares. While in the area, you or the chosen ally has damage immunity 5. The field disappears at the start of your next turn.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-abjurers-bastion-9',
						name: '',
						description: 'The implement\'s damage bonus increases to +3. Whenever you deal damage to a creature using a supernatural ability, you and each ally within 5 squares of you gains temporary Stamina equal to your highest characteristic score. Additionally, the size of your field of protection increases to a 3 cube, and it can be placed anywhere within 10 squares of you. You and each ally in the area gain its benefits.'
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
			prerequisites: 'Three ounces of shattered quartz',
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
						name: '',
						description: 'While you wield this implement, your damage-dealing supernatural abilities deal an extra 2 rolled psychic damage. Additionally, you gain an edge on supernatural power rolls if you aren\'t at full Stamina, or a double edge if you are winded.'
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
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-brittlebreaker-5',
						name: '',
						description: 'The implement\'s extra psychic damage increases to 3. Additionally, once per round when you take more than 20 damage from a single source, the implement\'s extra damage is doubled until the end of your next turn.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-brittlebreaker-9',
						name: '',
						description: 'The implement\'s extra psychic damage increases to 4. Additionally, whenever you use a damage-dealing supernatural ability, you can take half as much damage as is dealt to the target to immediately use the same ability again. The damage you take can\'t be reduced in any way. You can repeat this process until you become winded.'
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
						description: 'While you wield this implement, your damage-dealing supernatural abilities gain a +1 rolled damage bonus. Additionally, if you make a magic strike, the strike must deal cold damage instead of its usual damage.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-chaldorb-5',
						name: '',
						description: 'The implement\'s damage bonus increases to +2. Additionally, whenever you use a magic ability, a whirlwind of sleet and ice whips around you, dealing 3 cold damage to each enemy within 1 square of you.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-chaldorb-9',
						name: '',
						description: 'The implement\'s damage bonus increases to +3. The whirlwind you create when you use a magic ability deals 6 cold damage to each enemy within 2 squares of you, and creates a 2 aura around you that lasts until the start of your next turn. Each enemy who enters the aura for the first time in a round or starts their turn there takes 6 cold damage.'
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
						description: 'While you wield this implement, your damage-dealing supernatural abilities gain a +1 rolled damage bonus. Additionally, whenever you deal damage to a creature with a supernatural ability, they become insubstantial to you until the end of their next turn, allowing you to pass through them freely. While insubstantial, a creature can\'t make opportunity attacks against you.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-ether-fueled-vessel-5',
						name: '',
						description: 'The implement\'s damage bonus increases to +2. When you move through a creature who is insubstantial to you, you can use a free triggered action to make them take damage equal to your highest characteristic score. If you do, the insubstantial effect ends immediately after you pass through them and exist into an adjacent space outside of them.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-ether-fueled-vessel-9',
						name: '',
						description: 'The implement\'s damage bonus increases to +3. Any creature who isn\'t a leader or a solo creature who becomes insubstantial to you also can\'t make opportunity attacks against your allies.'
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
						description: 'While you wield this implement, your damage-dealing supernatural abilities gain a +1 rolled damage bonus. Additionally, whenever you deal damage to a creature with a supernatural ability, you can use that creature\'s senses until the end of your next turn, allowing you to experience all they observe and use your abilities as if you were in their space. You also benefit from your own senses at the same time'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-foesense-lenses-5',
						name: '',
						description: 'The implement\'s damage bonus increases to +2. Additionally, whenever you deal damage to a creature with a supernatural ability, you can also cause intense pain in one creature whose senses you are using. That creature takes a bane on power rolls until the start of your next turn.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-foesense-lenses-9',
						name: '',
						description: 'The implement\'s damage bonus increases to +3. Additionally, any creature you have damaged with an ability using this implement in the last minute is dazed while you are using their senses.'
					})
				]
			}
		]
	});

	static geometricManipulator: Item = FactoryLogic.createItem({
		id: 'item-geometric-manipulator',
		name: 'Geometric Manipulator',
		description: 'This tiny gold sphere is made up of intricately interlocking rings and plates.',
		type: ItemType.LeveledImplement,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Orb ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Fourteen gold rings each two inches in diameter',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-geometric-manipulator-1',
						name: '',
						description: 'While you wield this implement, your damage-dealing supernatural abilities gain a +1 rolled damage bonus. Additionally, when you use any supernatural ability that creates a cube or a burst, you can use a maneuver to rearrange the squares of the area into any shape you wish, provided there are no empty squares inside it.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-geometric-manipulator-5',
						name: '',
						description: 'The implement\'s damage bonus increases to +2. Additionally, when you use any supernatural ability that creates a cube or a burst, you can increase or decrease the size of the area by 1. If you decrease the size of the area, you gain an edge on the ability. If you increase the size, you take a bane on the ability.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-geometric-manipulator-9',
						name: '',
						description: 'The implement\'s damage bonus increases to +3. Additionally, you can increase or decrease the size of all your supernatural area abilities by up to 2, and rearranging the squares of a cube or burst ability requires no action.'
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
						description: 'You open or close the tome as a maneuver while saying its full name. While the tome is open, it floats in a space adjacent to you and flips to specific pages at your command. Additionally, you gain an edge on Intuition tests to recall lore.'
					}),
					FactoryLogic.feature.createAbilityDistance({
						id: 'item-words-become-wonders-1a',
						name: '',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						modifier: 3
					}),
					FactoryLogic.feature.createAbilityDistance({
						id: 'item-words-become-wonders-1b',
						name: '',
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						modifier: 3
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-words-become-wonders-5',
						name: '',
						description: 'While the tome is open, the bonus to distance of your ranged magical abilities increases to +5. Additionally, when you or a creature you have line of effect to uses a supernatural ability, you can use a triggered action to gain a +3 bonus to the power roll.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-words-become-wonders-9',
						name: '',
						description: 'While the tome is open, you automatically obtain a tier 3 result on Intuition tests to recall lore, and when you use a heroic ability, its heroic resource cost is reduced by 1.'
					})
				]
			}
		]
	});
}

export class LeveledWeaponData {
	static authoritysEnd: Item = FactoryLogic.createItem({
		id: 'item-authoritys-end',
		name: 'Authority\'s End',
		description: 'This twelve-foot chain is composed entirely of broken links held together by unseen power.',
		type: ItemType.LeveledWeapon,
		keywords: [ AbilityKeyword.Psionic, KitWeapon.Whip ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A lash used to punish a mutineer',
			source: 'Texts or lore in Khelt',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-authoritys-end-1',
						name: '',
						description: 'Whenever you damage a creature with the weapon, you can immediately use a maneuver to end one condition or effect imposed by that creature on you or another creature within 5 squares of you.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-authoritys-end-1a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						modifier: 1
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-authoritys-end-5',
						name: '',
						description: 'You and each ally within 2 squares of you gains a +1 bonus on saving throws.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-authoritys-end-5a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						modifier: 1
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-authoritys-end-9',
						name: '',
						description: 'You no longer need to use a maneuver to end one condition or effect when you damage a creature with the weapon. The weapon also refuses to vie for control of your psyche, and no longer counts against the limit of leveled treasures you can carry safely.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-authoritys-end-9a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						modifier: 1
					})
				]
			}
		]
	});

	static bladeOfQuintessence: Item = FactoryLogic.createItem({
		id: 'item-blade-of-quintessence',
		name: 'Blade of Quintessence',
		description: 'This crystal blade houses a stormy vortex of fire, ice, and lightning.',
		type: ItemType.LeveledWeapon,
		keywords: [ KitWeapon.Medium, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A ruby hardened in the fires of the City of Brass, a sapphire that has been struck by lightning',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-blade-of-quintessence-1',
						name: '',
						description: 'You can change the damage type of weapon abilities to cold, fire, lightning, or sonic.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-blade-of-quintessence-1a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						modifier: 1
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-blade-of-quintessence-5',
						name: '',
						description: 'The weapon can be used with ranged weapon abilities, and returns to you when a ranged ability is resolved. Ranged abilities used with the weapon increase their distance by 3, and must deal cold, fire, lightning, or sonic damage (chosen when you use the ability).'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-blade-of-quintessence-5a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Ranged ],
						modifier: 1
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-blade-of-quintessence-5b',
						name: '',
						keywords: [ AbilityKeyword.Weapon ],
						modifier: 1
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-blade-of-quintessence-9a',
						name: '',
						keywords: [ AbilityKeyword.Weapon ],
						modifier: 1
					}),
					FactoryLogic.feature.createDamageModifier({
						id: 'item-blade-of-quintessence-9b',
						modifiers: [
							FactoryLogic.damageModifier.create({
								damageType: DamageType.Cold,
								modifierType: DamageModifierType.Immunity,
								value: 10
							}),
							FactoryLogic.damageModifier.create({
								damageType: DamageType.Fire,
								modifierType: DamageModifierType.Immunity,
								value: 10
							}),
							FactoryLogic.damageModifier.create({
								damageType: DamageType.Lightning,
								modifierType: DamageModifierType.Immunity,
								value: 10
							}),
							FactoryLogic.damageModifier.create({
								damageType: DamageType.Sonic,
								modifierType: DamageModifierType.Immunity,
								value: 10
							})
						]
					})
				]
			}
		]
	});

	static bladeOfTheLuxuriousFop: Item = FactoryLogic.createItem({
		id: 'item-blade-of-the-luxurious-fop',
		name: 'Blade of the Luxurious Fop',
		description: 'Despite sporting an outrageously ornate hilt adorned with far too many jewels, this blade remains perfectly balanced.',
		type: ItemType.LeveledWeapon,
		keywords: [ KitWeapon.Light, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A personal blessing from the greatest duelist in the land, six fake and extremely shiny gemstones',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-blade-of-the-luxurious-fop-1',
						name: '',
						description: 'Whenever you deal damage with this weapon, you can immediately shift 1 square. As well, while you wield or carry the weapon and are present in a negotiation, if an NPC in a negotiation has the Greed, Legacy, Power, or Revelry motivation, their starting interest increases by 1 (to a maximum of 5).'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-blade-of-the-luxurious-fop-1a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						modifier: 1
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-blade-of-the-luxurious-fop-5',
						name: '',
						description: 'When you make an opportunity attack against an enemy of your size or smaller, you can use fancy footwork to knock them prone. You also gain a +1 bonus to Renown.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-blade-of-the-luxurious-fop-5a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						modifier: 1
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-blade-of-the-luxurious-fop-9',
						name: '',
						description: 'You have a double edge on any test you make using a skill you have from the interpersonal skill group.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-blade-of-the-luxurious-fop-9a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						modifier: 1
					})
				]
			}
		]
	});

	static displacer: Item = FactoryLogic.createItem({
		id: 'item-displacer',
		name: 'Displacer',
		description: 'This crystal battleaxe seems to pull at the hands that wield it, as if anxious to leap across the battlefield.',
		type: ItemType.LeveledWeapon,
		keywords: [ KitWeapon.Medium, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'An ancient bronze gear covered in indecipherable runes',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-displacer-1',
						name: '',
						description: 'Any damage-dealing weapon ability using this weapon deals an extra 1 rolled psychic damage. Additionally, whenever you deal damage to a creature, you can use a maneuver to trade places with that creature, provided you both fit into each other’s spaces.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-displacer-5',
						name: '',
						description: 'The weapon’s extra psychic damage increases to 2. Whenever you deal damage to a creature, you can use a maneuver to trade places with that creature or any creature within 4 squares of them, provided you both fit into each other’s spaces.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-displacer-9',
						name: '',
						description: 'The weapon’s extra psychic damage increases to 3. Whenever you deal damage to a creature, you can use a maneuver to trade places with that creature or any creature within 8 squares of them, provided you both fit into each other’s spaces. Additionally, you can choose for the creature you traded places with to be weakened until the end of their next turn, or to spend a Recovery.'
					})
				]
			}
		]
	});

	static executionersBlade: Item = FactoryLogic.createItem({
		id: 'item-executioners-blade',
		name: 'Executioner\'s Blade',
		description: 'This blade exudes a faint hum that grows louder as its quarry weakens.',
		type: ItemType.LeveledWeapon,
		keywords: [ KitWeapon.Heavy, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'The skull of a convicted criminal',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-executioners-blade-1',
						name: '',
						description: 'Any damage-dealing weapon ability using this weapon deals an extra 1 rolled psychic damage, or an extra 2 psychic damage if the target is winded. Additionally, the first time in an encounter that you cause an enemy to become winded with an ability using the weapon, you gain 10 temporary Stamina.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-executioners-blade-5',
						name: '',
						description: 'The weapon’s extra psychic damage increases to 2, or to 4 if the target is winded. Additionally, whenever you cause an enemy to become winded with an ability using the weapon, you gain two surges that you can immediately spend.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-executioners-blade-9',
						name: '',
						description: 'The weapon’s extra psychic damage increases to 3, or to 6 if the target is winded. Additionally, you gain an edge on any ability using the weapon against any winded target.'
					})
				]
			}
		]
	});

	static icemakerMaul: Item = FactoryLogic.createItem({
		id: 'item-icemaker-maul',
		name: 'Icemaker Maul',
		description: 'The head of this platinum hammer is cold to the touch, and encases whatever it strikes in a thin layer of ice.',
		type: ItemType.LeveledWeapon,
		keywords: [ KitWeapon.Heavy, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Eight iron bars cooled in a glacier, the branch of an ancient evergreen',
			source: 'Texts in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-icemaker-maul-1',
						name: '',
						description: 'Any damage-dealing weapon ability using this weapon deals an extra 1 rolled cold damage. Additionally, you can use a maneuver to create an ice field in a 3 burst. This ground in this area is difficult terrain for enemies and lasts until the end of the encounter or when you use this ability again.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-icemaker-maul-5',
						name: '',
						description: 'The weapon\'s extra cold damage increases to 2, and the ice field becomes a 4 burst. Additionally, whenever you use a weapon ability using the weapon against one or more enemies in the ice field, you gain one surge that you can use immediately.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-icemaker-maul-9',
						name: '',
						description: 'The weapon\'s extra cold damage increases to 3, and the ice field becomes a 5 burst. Additionally, any enemy in the ice field who is reduced to 0 Stamina by an ability using the weapon can be shattered, killing them and dealing 15 cold damage to each enemy within 3 squares of them.'
					})
				]
			}
		]
	});

	static knifeOfNine: Item = FactoryLogic.createItem({
		id: 'item-knife-of-nine',
		name: 'Knife of Nine',
		description: 'This ivory dagger features nine faintly glowing indentations along the blade.',
		type: ItemType.LeveledWeapon,
		keywords: [ KitWeapon.Light, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Eighteen daggers - nine taken from personal enemies and nine gifted by friends',
			source: 'Texts or lore in Variac',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-knife-of-nine-1',
						name: '',
						description: 'Any damage-dealing weapon ability using this weapon deals an extra 1 rolled psychic damage. This extra damage increases by 1 each time you deal damage with an ability using the weapon to the same target during the same encounter, to a maximum increase of 3.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-knife-of-nine-5',
						name: '',
						description: 'Whenever you reduce a creature to 0 Stamina with an ability using the weapon, one of its indentations glows brighter. When you use a signature ability using the weapon, you can use a triggered action to expend any number of bright-glowing indentations, with the ability dealing extra psychic damage equal to the number of indentations. The expended indentations then return to a dim glow.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-knife-of-nine-9',
						name: '',
						description: 'If you make a weapon strike using this weapon against a target after dropping down on them from at least 2 squares\' height, the attack deals an extra 10 psychic damage. You can distribute all extra psychic damage dealt by the attack between the target and any enemies adjacent to them.'
					})
				]
			}
		]
	});

	static lanceOfTheSunderedStar: Item = FactoryLogic.createItem({
		id: 'item-lance-of-the-sundered-star',
		name: 'Lance of the Sundered Star',
		description: 'This needle-like lance is cast of shimmering metal, and induces a yearning for the skies in those who handle it.',
		type: ItemType.LeveledWeapon,
		keywords: [ AbilityKeyword.Magic, KitWeapon.Polearm ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Night-blooming flower petals, a starmetal meteorite',
			source: 'Texts or lore in Hyrallic',
			characteristic: [ Characteristic.Agility, Characteristic.Presence ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-lance-of-the-sundered-star-1',
						name: '',
						description: 'Any damage-dealing weapon ability using this weapon deals an extra 1 rolled holy damage. Additionally, when the weapon is used with a weapon ability that allows you to push a target, you can shift to any square adjacent to the target after the push.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-lance-of-the-sundered-star-5',
						name: '',
						description: 'The weapon\'s extra holy damage increases to 2. Additionally, whenever you take the Charge action and use an ability with the Charge keyword, or whenever you use an ability that allows you to shift, you can fly as part of the charge movement or the shift. If you don\'t end your flying movement on the ground, you fall.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-lance-of-the-sundered-star-9',
						name: '',
						description: 'The weapon\'s extra holy damage increases to 3. Additionally, whenever the weapon is used with a weapon ability that allows you to push or slide a target, that forced movement can be vertical.'
					})
				]
			}
		]
	});

	static moltenConstrictor: Item = FactoryLogic.createItem({
		id: 'item-molten-constrictor',
		name: 'Molten Constrictor',
		description: 'This flexible black-iron net burns with the heat of a volcano.',
		type: ItemType.LeveledWeapon,
		keywords: [ AbilityKeyword.Magic, KitWeapon.Ensnaring ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Four iron bars coated in magma slag',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-molten-constrictor-1',
						name: '',
						description: 'Any damage-dealing weapon ability using this weapon deals an extra 1 rolled fire damage. Additionally, whenever you make a strike using the net and obtain a tier 3 result, you can automatically grab the target. A target grabbed in this way takes a bane when using the Escape Grab maneuver.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-molten-constrictor-5',
						name: '',
						description: 'The weapon\'s extra fire damage increases to 2. Additionally, a target grabbed by a strike using the net takes 8 fire damage each time they attempt to escape using the Escape Grab maneuver.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-molten-constrictor-9',
						name: '',
						description: 'The weapon\'s extra fire damage increases to 3, and the damage taken by a grabbed creature attempting to escape increases to 15. Additionally, you can use a maneuver to make a free strike with another weapon against a target grabbed using the net.'
					})
				]
			}
		]
	});

	static onerousBow: Item = FactoryLogic.createItem({
		id: 'item-onerous-bow',
		name: 'Onerous Bow',
		description: 'This mechanized bow is set with magical reservoirs that carry the faint tang of toxins.',
		type: ItemType.LeveledWeapon,
		keywords: [ KitWeapon.Bow, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A venom sac from a giant spider, one valok gyroscope',
			source: 'Texts or lore in Caelian and Variac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-onerous-bow-1',
						name: '',
						description: 'Any damage-dealing weapon ability using this weapon deals an extra 1 rolled poison damage. Additionally, any signature ability using the weapon that obtains a tier 3 result also makes the target weakened until the end of their turn.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-onerous-bow-5',
						name: '',
						description: 'The weapon\'s extra poison damage increases to 2. A signature ability made using the weapon that obtains a tier 3 result also makes the target weakened and slowed until the end of their turn.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-onerous-bow-9',
						name: '',
						description: 'The weapon\'s extra poison damage increases to 3. Additionally, if you use an ability using the weapon that targets one creature and you don\'t have a bane or double bane on the ability, you can take a bane. Doing so lets you target another creature within 1 square of the original target. Alternatively, you can take a double bane to target two creatures within 1 square of the original target.'
					})
				]
			}
		]
	});

	static steeltongue: Item = FactoryLogic.createItem({
		id: 'item-steeltongue',
		name: 'Steeltongue',
		description: 'This sinuous whip reflects all light off its plated steel surfaces.',
		type: ItemType.LeveledWeapon,
		keywords: [ AbilityKeyword.Magic, KitWeapon.Whip ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'One hundred steel arrowheads stained with blood',
			source: 'Texts or lore in Caelian and Kalliak',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-steeltongue-1',
						name: '',
						description: 'You gain a +1 bonus to melee distance with weapon abilities using this weapon. Additionally, when you use a damage-dealing weapon ability using the weapon against a target who has A < [average], that target is bleeding (save ends).'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-steeltongue-5',
						name: '',
						description: 'The weapon\'s bonus to melee distance increases to +2. Additionally, when you use a damage-dealing weapon ability using the weapon, that ability gains a +3 rolled damage bonus against any target who is bleeding.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-steeltongue-9',
						name: '',
						description: 'The weapon\'s bonus to melee distance increases to +3. Additionally, if you use a signature ability using the weapon that targets one or more bleeding creatures, you can use the same ability again immediately as a maneuver.'
					})
				]
			}
		]
	});

	static thirdEyeSeeker: Item = FactoryLogic.createItem({
		id: 'item-third-eye-seeker',
		name: 'Third Eye Seeker',
		description: 'The shifting patterns on this bow\'s crystalline grip resemble dozens of blinking eyes.',
		type: ItemType.LeveledWeapon,
		keywords: [ KitWeapon.Bow, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Heart strings of a tapir, a pound of tiger\'s eye gemstones',
			source: 'Texts or lore in Variac',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-third-eye-seeker-1',
						name: '',
						description: 'Any damage-dealing weapon ability using this weapon deals an extra 1 rolled psychic damage. Additionally, any damage-dealing weapon ability using the weapon that achieves a tier 3 result also leaves the target dazed until the end of their turn.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-third-eye-seeker-5',
						name: '',
						description: 'The weapon\'s extra psychic damage increases to 2. Additionally, whenever a creature within distance of your ranged weapon free strike uses a triggered action, you can use a triggered action after their triggered action resolves to make a ranged weapon free strike using the weapon against the creature.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-third-eye-seeker-9',
						name: '',
						description: 'The weapon\'s extra psychic damage increases to 3. Additionally, you have a double edge on weapon abilities that use the weapon against creatures who have used a psionic ability since the end of your last turn.'
					})
				]
			}
		]
	});

	static thunderheadBident: Item = FactoryLogic.createItem({
		id: 'item-thunderhead-bident',
		name: 'Thunderhead Bident',
		description: 'This bident is made from two pieces of moon metal twisted together, and hums like a tuning fork.',
		type: ItemType.LeveledWeapon,
		keywords: [ AbilityKeyword.Magic, KitWeapon.Medium ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A jar of captured thunder, two ingots of moon metal',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-thunderhead-bident-1',
						name: '',
						description: 'Any damage-dealing weapon ability using this weapon deals an extra 1 rolled sonic damage. Additionally, when the weapon is used with any weapon ability that pushes a target, the push distance gains a +1 bonus. If the ability deals damage to a target but doesn\'t impose forced movement, you can push the target a distance equal to this bonus.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-thunderhead-bident-5',
						name: '',
						description: 'The weapon\'s extra sonic damage increases to 2, and the bonus to push distance becomes +2. Additionally, the weapon can be used with ranged weapon abilities, and gains power the farther it is hurled. For each 2 squares the weapon travels to the target of a ranged strike, the strike deals an extra 1 sonic damage.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-thunderhead-bident-9',
						name: '',
						description: 'The weapon\'s extra sonic damage increases to 3, and it deals an extra 1 sonic damage for each square it travels as part of a ranged strike. Additionally, whenever you make a weapon strike using this weapon, each creature adjacent to the target takes 6 sonic damage.'
					})
				]
			}
		]
	});

	static wetwork: Item = FactoryLogic.createItem({
		id: 'item-wetwork',
		name: 'Wetwork',
		description: 'When first held, this naginata whispers the names of its past victims.',
		type: ItemType.LeveledWeapon,
		keywords: [ KitWeapon.Polearm, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A folded metal blade infused with blood',
			source: 'Texts or lore in Higaran',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-wetwork-1',
						name: '',
						description: 'Any damage-dealing weapon ability using this weapon deals an extra 1 rolled psychic damage. Additionally, if you kill a creature using this weapon, you can immediately use a maneuver to make a melee free strike.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-wetwork-5',
						name: '',
						description: 'The weapon\'s extra sonic damage increases to 2. Additionally, if you kill a creature using the weapon, you can use a maneuver to make a melee free strike and move up to 2 squares before or after the strike.'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-wetwork-9',
						name: '',
						description: 'The weapon\'s extra sonic damage increases to 3. Additionally, if you kill a creature using the weapon, you can use a maneuver to move up to your speed and make either a signature strike or a melee free strike.'
					})
				]
			}
		]
	});
}

export class LeveledOtherData {
	static bloodboundBand: Item = FactoryLogic.createItem({
		id: 'item-bloodbound-band',
		name: 'Bloodbound Band',
		description: 'This ring appears to be traced by dried blood, which returns each time it is rubbed away.',
		type: ItemType.Leveled,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ring ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A pair of obituaries that each mention the subject of the other',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-bloodbound-band-1',
						name: '',
						description: 'During a respite, you can touch the ring to any number of other Bloodbound Bands worn by willing creatures to form a bond among all of you. Creatures related by blood can\'t form bonds in this way. Bonded creatures can each use the highest recovery value of any bonded creature in place of their own, and can spend each other\'s Recoveries as if they were their own. Whenever any other bonded creature takes damage, each bonded creature takes 1 damage that can\'t be reduced in any way. Your bond ends if you remove the ring, use it to bond with one or more other creatures, or die, but other rings continue to be bonded to each other.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-bloodbound-band-1a',
						field: FeatureField.Stamina,
						value: 6
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.createBonus({
						id: 'item-bloodbound-band-5a',
						field: FeatureField.Stamina,
						value: 6
					}),
					FactoryLogic.feature.createDamageModifier({
						id: 'item-bloodbound-band-5b',
						modifiers: [
							FactoryLogic.damageModifier.create({
								damageType: DamageType.Damage,
								modifierType: DamageModifierType.Immunity,
								value: 2
							})
						]
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-bloodbound-band-9',
						name: '',
						description: 'If a creature bonded with you dies, you can choose to die in their place. Your sacrifice twists fate to remove the creature from danger, and they regain Stamina equal to their winded value. Your ring then teleports into their possession and ceases to be magical.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-bloodbound-band-9a',
						field: FeatureField.Stamina,
						value: 9
					})
				]
			}
		]
	});

	static bloodyHandWraps: Item = FactoryLogic.createItem({
		id: 'item-bloody-hand-wraps',
		name: 'Bloody Hand Wraps',
		description: 'These rough hand wraps are stained with blood that never comes clean.',
		type: ItemType.Leveled,
		keywords: [ AbilityKeyword.Hands, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'One cotton bolt soaked in the blood of six adventurers',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-bloody-hand-wraps-1',
						name: '',
						description: 'Once per turn, you can take 5 damage that can\'t be reduced in any way to use the Grab maneuver (no action required).'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-bloody-hand-wraps-1a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						modifier: 1
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-bloody-hand-wraps-5',
						name: '',
						description: 'Once per turn, you can take 10 damage that can\'t be reduced in any way to make a melee free strike (no action required).'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-bloody-hand-wraps-5a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						modifier: 1
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-bloody-hand-wraps-9',
						name: '',
						description: 'Once per turn, you can take 15 damage that can\'t be reduced in any way to use a signature ability (no action required).'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-bloody-hand-wraps-9a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						modifier: 1
					})
				]
			}
		]
	});

	static lightningTreads: Item = FactoryLogic.createItem({
		id: 'item-lightning-treads',
		name: 'Lightning Treads',
		description: 'Sparks strike from these boots whenever they touch the ground, increasing in number as the wearer gathers speed.',
		type: ItemType.Leveled,
		keywords: [ AbilityKeyword.Feet, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'One jar of lightning',
			source: 'Texts or lore in Yllyric',
			characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-lightning-treads-1a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						modifier: 1,
						damageType: DamageType.Lightning
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-lightning-treads-1b',
						name: '',
						field: FeatureField.Speed,
						value: 2
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-lightning-treads-5',
						name: '',
						description: 'Any damage-dealing weapon ability using your unarmed strike deals 1 extra lightning damage for each square you move this turn before you use the ability to a maximum bonus of +2.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-lightning-treads-5a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						modifier: 1,
						damageType: DamageType.Lightning
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-lightning-treads-9',
						name: '',
						description: 'The maximum total damage bonus you can earn including movement increase to +3. Additionally, you can use a maneuver to perform a flying lightning kick on one adjacent creature. That target is pushed up to 5 squares, and you can move to any square adjacent to the target after the push.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-lightning-treads-9a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						modifier: 1,
						damageType: DamageType.Lightning
					})
				]
			}
		]
	});

	static revengersWrap: Item = FactoryLogic.createItem({
		id: 'item-revengers-wrap',
		name: 'Revenger\'s Wrap',
		description: 'When first handled, this tattered cloak fills the mind with thoughts of revenge',
		type: ItemType.Leveled,
		keywords: [ AbilityKeyword.Neck, AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A cloak worn by a murdered monarch',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-revengers-wrap-1',
						name: '',
						description: 'While you wear this cloak, any creature who damages you is marked for revenge until the end of your next turn or until another creature damages you. Any strike you make against a creature marked for revenge deals extra damage equal to your highest characteristic score, and whenever you damage a creature marked for revenge, they are also bleeding until the end of their turn.'
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-revengers-wrap-5',
						name: '',
						description: 'Each creature who damages you is marked for revenge until the end of your next turn. Whenever you damage a creature marked for revenge, they are also bleeding (save ends).'
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-revengers-wrap-9',
						name: '',
						description: 'When you have three or more creatures marked for revenge and you target one of them with an ability that targets only one creature, you target all the creatures marked for revenge regardless of their distance and line of effect from you.'
					})
				]
			}
		]
	});

	static thiefOfJoy: Item = FactoryLogic.createItem({
		id: 'item-thief-of-joy',
		name: 'Thief of Joy',
		description: 'This burnished copper torc thrums with a sense of judgment.',
		type: ItemType.Leveled,
		keywords: [ AbilityKeyword.Neck, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A pound of feathers, a pound of bricks from the Seven Cities of Hell',
			source: 'Texts or lore in Anjali',
			characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
			goal: 450
		}),
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-thief-of-joy-1',
						name: '',
						description: `
You can use a maneuver to choose a creature in your line of effect and learn their level. If their level is higher than yours, the torc grants you envy. If their level is equal to or lower than yours, the torc grants you disdain.

You can have both envy and disdain, but not more than one instance of either. Whenever a creature within 10 squares of you deals damage to another creature, you can use a triggered action to expend your envy or disdain. If you expend envy, you deal damage equal to the triggering damage to a creature adjacent to you. If you expend disdain, you reduce the triggering damage by half. At the end of the encounter, you lose any envy or disdain granted by the torc.`
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-thief-of-joy-1a',
						field: FeatureField.Stamina,
						valueCharacteristics: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
						valueCharacteristicMultiplier: 2
					})
				]
			},
			{
				level: 5,
				features: [
					FactoryLogic.feature.create({
						id: 'item-thief-of-joy-5',
						name: '',
						description: 'When you use the torc\'s maneuver and the target creature is the same level as you, you gain your choice of envy or disdain.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-thief-of-joy-5a',
						field: FeatureField.Stamina,
						valueCharacteristics: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
						valueCharacteristicMultiplier: 3
					})
				]
			},
			{
				level: 9,
				features: [
					FactoryLogic.feature.create({
						id: 'item-thief-of-joy-9',
						name: '',
						description: 'You can have multiple instances of envy and disdain, with no limit on either.'
					}),
					FactoryLogic.feature.createBonus({
						id: 'item-thief-of-joy-9a',
						field: FeatureField.Stamina,
						valueCharacteristics: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
						valueCharacteristicMultiplier: 5
					})
				]
			}
		]
	});
}

export class ArtifactData {
	static bladeOfAThousandYears: Item = FactoryLogic.createItem({
		id: 'item-blade-of-a-thousand-years',
		name: 'Blade of a Thousand Years',
		description: 'This fabled sword features a hilt made of glittering starlight, out of which its gleaming metal blade extends.',
		type: ItemType.Artifact,
		keywords: [ AbilityKeyword.Magic, KitWeapon.Light, KitWeapon.Medium, KitWeapon.Heavy ],
		effect: `
Whether drawn from a stone, gifted by a lake spirit, forged by a god, or used to kill one, there is a sword that exists outside of time and space. It is always where it needs to be precisely when it needs to be there--then is gone in a flash when the need for it has waned. The sword is depicted in art, song, and story across many living cultures--and even more frequently among those long buried, often after proving the deciding factor in a battle. It's been wielded by numerous heroes of legend, and even more who have slipped into the forgotten shadows of history.

Though its size and make are often debated, the sword is consistently described as a hilt with no crossguard, made from pure starlight. When wielded, a brilliant metal blade springs forth from that hilt, suiting the holder's taste in weapons. Those who touch the blade are filled with the vigor and power of the heroes who have held it before.`,
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-blade-of-a-thousand-years-1',
						name: 'Suited for Victory',
						description: 'This sword takes on the size, shape, and make that the wielder wills into it. It can be a light, medium, or heavy weapon, and you can change its weapon type and appearance as a free maneuver. Any damagedealing weapon ability using the Blade of a Thousand Years always deals holy damage. Any creature vulnerable to holy damage who takes damage from this weapon is also weakened and frightened until the end of their turn.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-blade-of-a-thousand-years-1a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						modifier: 5
					}),
					FactoryLogic.feature.create({
						id: 'item-blade-of-a-thousand-years-2',
						name: 'Rally the Righteous',
						description: 'This blade fills all around it with hope and courage. Each ally within 1 mile of the weapon gains an edge on weapon abilities and magic abilities, and has damage immunity 5. Additionally, each such creature\'s Stamina maximum increases by 15 and they gain a +15 bonus to Stamina when this ability first affects them.'
					}),
					FactoryLogic.feature.create({
						id: 'item-blade-of-a-thousand-years-3',
						name: 'Turn the Tide',
						description: 'Each enemy minion within 1 mile of the sword is dazed. Any enemy leader or solo in that area takes a bane on ability power rolls.'
					}),
					FactoryLogic.feature.create({
						id: 'item-blade-of-a-thousand-years-4',
						name: 'Victory\'s Assurance',
						description: 'This weapon always appears on the eve before what will later come to be known as a historic battle. It disappears after 24 hours or when the battle is won, whichever comes first. By taking the blade, the wielder unwittingly enters into a pact with the weapon. If they don\'t secure victory against monumental odds or some great foe by the time the sword disappears, they are pulled into the sword, preventing any chance of resurrection, and forever dooming them to lend their strength to the heroes of other ages.'
					}),
					FactoryLogic.feature.create({
						id: 'item-blade-of-a-thousand-years-5',
						name: 'Soul of the Martyr',
						description: 'If the wielder dies while holding this blade, their soul is drawn into the starlight hilt, where it remains for the rest of time to prevent any chance of resurrection. The sword disappears, but the lingering feeling of hope that spreads from it remains. For the next hour, the effects of Rally the Righteous increase to provide a double edge on weapon abilities and magic abilities, damage immunity 10, an increase to Stamina maximum of 30, and a bonus to Stamina of +30.'
					})
				]
			}
		]
	});

	static encepter: Item = FactoryLogic.createItem({
		id: 'item-encepter',
		name: 'Encepter',
		description: 'A bejeweled scepter with a spiraling porcelain handle balances an orb of light above its crown.',
		type: ItemType.Artifact,
		keywords: [ AbilityKeyword.Magic ],
		effect: `
This scepter waits high in the sky, resting within an endlessly raging cyclone. It waits for the one who will unify all people under its light. It awaits its champion.

The Encepter is said to have first manifested in a young world doomed to apocalypse--unless every last inhabitant of that world could stand together. The scepter is said to impose either dominion or obliteration over any threat its light is drawn around. Today, it is most commonly known as a bad omen, and should the Encepter reveal itself, folk know that the world teeters on the brink of destruction. Whether any of the stories are true, few can say, for the only living eyes that have witnessed the Encepter belong to dragons deep in slumber.`,
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-encepter-1',
						name: 'Shining Presence',
						description: 'The one who wields the Encepter is always cast in a brilliant glow. Any power roll made by the wielder that uses Presence automatically achieves a tier 3 result, though the wielder can still roll in an attempt to score a critical hit.'
					}),
					FactoryLogic.feature.create({
						id: 'item-encepter-2',
						name: 'Champion\'s Lasso',
						description: 'As a free maneuver, the wielder of the scepter can trigger a glowing line of light that traces their path as they move, or can dismiss the glowing line. If the wielder crosses over this line, each creature and object of the wielder\'s choice enclosed inside the line and within 2 squares above and below it are considered lassoed by the Encepter. Creatures remain lassoed until the lasso is released or until a new line is drawn.'
					}),
					FactoryLogic.feature.create({
						id: 'item-encepter-3',
						name: 'Dominion',
						description: 'Each creature lassoed by the Encepter is restrained and can\'t teleport. A creature caught in midair while lassoed stays in place rather than falling.'
					}),
					FactoryLogic.feature.create({
						id: 'item-encepter-4',
						name: 'Obliteration',
						description: 'As an action, the wielder raises the Encepter to the sky. Each target lassoed by the Encepter erupts into a prismatic burst of light, taking 10 psychic damage for each square horizontally encircled by the lasso. The lasso is then immediately released.'
					}),
					FactoryLogic.feature.create({
						id: 'item-encepter-5',
						name: 'At World\'s End',
						description: 'If the Encepter was not taken from its cyclonic resting place with the purpose of vanquishing a terrible peril, then a terrible peril emerges to threaten the world within three days of the scepter being taken.'
					})
				]
			}
		]
	});

	static mortalCoil: Item = FactoryLogic.createItem({
		id: 'item-mortal-coil',
		name: 'Mortal Coil',
		description: 'This floating helix of golden metal spins ever faster as it activates, crackling with crimson sparks.',
		type: ItemType.Artifact,
		keywords: [ AbilityKeyword.Psionic ],
		effect: `
Change is the engine of existence. Permanence begets stagnation. When the past refuses to relinquish control, a path must be cleared for the future. Energized by the flickering of minds and souls passing through the void, the Mortal Coil taps into the entropic potential inherent in every living creature to cast a shadow capable of felling even gods. For the true gift of life is death, and gifts are meant to be given.

Only one destined for death can contain the power of the Mortal Coil. A mortal creature who carries this artifact serves as its host, gaining an additional action on each of their turns, aging at ten times the normal rate, and becoming unable to ever regain Stamina. A host with no natural maximum lifespan permanently reduces their maximum Stamina by 10 each year.

When the Mortal Coil is left unattended or is in the possession of a creature who is not mortal, it activates and can't be deactivated until a mortal creature becomes its host once more. While active, the artifact extends a penumbra of influence for 10 miles in every direction. Every creature in the penumbra is subject to the following effects.`,
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-mortal-coil-1',
						name: 'One Foot in the Grave',
						description: 'Any creature in the penumbra has damage weakness 2 and can\'t regain Stamina.'
					}),
					FactoryLogic.feature.create({
						id: 'item-mortal-coil-2',
						name: 'Get Busy Dyin\'',
						description: 'Each creature in the penumbra ages at 10 times the normal rate, and diseases and poisons affecting creatures in the penumbra run their course at 10 times their normal rate. A creature with no natural maximum lifespan permanently reduces their maximum Stamina by 10 each year. Each creature can undertake one additional respite activity during each respite.'
					}),
					FactoryLogic.feature.create({
						id: 'item-mortal-coil-3',
						name: 'If You Meet God on the Road, Kill Them',
						description: 'Every nonmortal entity in the penumbra is granted the gift of mortality. Previously immortal or invulnerable entities from planar creatures to the gods themselves--can be killed while in the penumbra, though not necessarily easily. Any creature or entity who dies in the Mortal Coil\'s penumbra experiences perfect death. They are permanently, irrevocably dead, and no magic, psionics, or technology can restore them to life.'
					}),
					FactoryLogic.feature.create({
						id: 'item-mortal-coil-4',
						name: 'Perpetual Motion',
						description: 'If there are ever no creatures or entities within the Mortal Coil\'s penumbra, the radius of the penumbra doubles.'
					}),
					FactoryLogic.feature.create({
						id: 'item-mortal-coil-5',
						name: 'Beneath Contempt',
						description: 'Deities and their servants always overlook the Mortal Coil and its host--either unable to notice it, or not considering it a threat. If the artifact is somehow destroyed or unmade through godly power, it consumes a year of life from every humanoid in the manifold where it was destroyed, then reforms in a hidden place.'
					})
				]
			}
		]
	});
}

export class ImbuedData {
	static imbuedArmor: Item = FactoryLogic.createItem({
		id: 'imbued-armor',
		name: 'Imbued Armor',
		description: 'Armor imbued with an enhancement grants you special benefits while it is worn.',
		type: ItemType.ImbuedArmor,
		customizationsByLevel: [
			{
				level: 1,
				features: [
					{
						feature: FactoryLogic.feature.create({
							id: 'awe-charming',
							name: 'Awe: Charming',
							description: 'You gain an edge on Presence tests to win people other creatures over or make a good impression.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'awe-threatening',
							name: 'Awe: Threatening',
							description: 'You gain an edge on Presence tests made to intimidate, coerce, or bully.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'damage-immunity-i',
							name: 'Damage Immunity I',
							description: 'Select three damage types. You have immunity 5 to those damage types.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'disguise',
							name: 'Disguise',
							description: 'You can use a maneuver to cause this armor to appear as any type of clothing that you have been in the presence of—a noble’s dress, a guard’s uniform, a cultist’s robes, and so forth. The armor loses none of its protective qualities while transformed into other clothing.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'iridescent',
							name: 'Iridescent',
							description: 'When you are the sole target of an ability, you can use a free triggered action to reveal that the ability was targeting an afterimage of you in the same space as you. The power roll for the ability is treated as an 11. You can’t use this enhancement again until you earn a Victory.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'magic-resistance-i',
							name: 'Magic Resistance I',
							description: 'Your characteristic scores are considered 1 higher (to a maximum of 2) for the purpose of resisting the potencies of magic abilities.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'nettlebloom',
							name: 'Nettlebloom',
							description: 'Whenever you are grabbed by a creature adjacent to you, your armor sprouts toxic nettles. While an adjacent creature has you grabbed, they are weakened.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'phasing-i',
							name: 'Phasing I',
							description: 'Once per turn, you can move through 1 square of solid matter. If you end your turn inside solid matter, you take 5 damage, which can’t be reduced in any way, and are shunted out into the space from which you entered it.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'psionic-resistance-i',
							name: 'Psionic Resistance I',
							description: 'Your characteristic scores are considered 1 higher (to a maximum of 2) for the purpose of resisting the potencies of psionic abilities.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createBonus({
							id: 'swift',
							name: 'Swift',
							field: FeatureField.Speed,
							value: 1
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'tempest-i',
							name: 'Tempest I',
							description: 'As a maneuver, you can infuse this armor with the essence of a storm. The first time an adjacent creature makes deals damage to you before the end of your next turn, they take lightning damage equal to your highest characteristic score and you can push them 1 square.'
						}),
						selected: false
					}
				]
			},
			{
				level: 5,
				features: [
					{
						feature: FactoryLogic.feature.create({
							id: 'absorption',
							name: 'Absorption',
							description: `
Whenever you are targeted by a supernatural ability that targets only one creature, you can use a free triggered action to cause this armor to absorb the ability after the ability’s effects resolve. While the armor has an ability absorbed, you can’t absorb another.

You can use an absorbed ability as if you knew it, making power rolls for the ability using your choice of Reason, Intuition, or Presence. You don’t need to spend any resources to activate the ability. Once you use the ability, the armor loses it, and you can absorb another.`
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'damage-immunity-ii',
							name: 'Damage Immunity II',
							description: 'The damage immunity conveyed by the armor increases to 10.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'dragon-soul',
							name: 'Dragon Soul',
							description: `
When another creature causes you to be winded or dying, you can use a free triggered action to cause the soul of a dragon to emerge from this armor and hurtle toward the creature. Make the following power roll against the creature:

**Power Roll + Highest Characteristic**:
* **11-**: 8 damage; push 3
* **12–16**: 12 damage; push 4
* **17+**: 15 damage; push 5`
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'levitating',
							name: 'Levitating',
							description: 'On your turn, you can treat up to 5 consecutive squares of movement as flying movement. If you are still in midair at the end of your turn, you fall prone.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'magic-resistance-ii',
							name: 'Magic Resistance II',
							description: 'Your characteristic scores are considered 2 higher (to a maximum of 3) for the purpose of resisting the potencies of magic abilities. This benefit replaces Magic Resistance I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'phasing-ii',
							name: 'Phasing II',
							description: 'When you use the armor’s Phasing I enhancement, you can move through 3 squares of solid matter per turn.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'psionic-resistance-ii',
							name: 'Psionic Resistance II',
							description: 'Your characteristic scores are considered 2 higher (to a maximum of 3) for the purpose of resisting the potencies of psionic abilities. This benefit replaces Psionic Resistance I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'reactive',
							name: 'Reactive',
							description: 'Whenever you take damage, you gain damage immunity 2 until the end of your next turn after resolving the triggering damage.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'second-wind',
							name: 'Second Wind',
							description: 'Whenever you become winded, you can use a free triggered action to spend a Recovery.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'shattering',
							name: 'Shattering',
							description: 'Whenever an enemy scores a critical hit against you, they take 10 sonic damage.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'tempest-ii',
							name: 'Tempest II',
							description: 'When you use the armor’s Tempest I enhancement, the affected creature takes 8 lightning damage and you push them up to 3 squares.'
						}),
						selected: false
					}
				]
			},
			{
				level: 9,
				features: [
					{
						feature: FactoryLogic.feature.create({
							id: 'devils-bargain',
							name: 'Devil\'s Bargain',
							description: 'Your movement gains the Fly keyword. Additionally, if an effect would make you prone while flying, you can choose to not go prone by losing Stamina equal to the distance you would have fallen from becoming prone.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'dragon-soul-ii',
							name: 'Dragon Soul II',
							description: `
While you are winded, your head transforms into a dragon’s head, and you gain the following ability.

**Dragon's Fire**
You open your maw and unleash hell.
**Keywords**: Area, Magic, Melee
**Type**: Action
**Distance**: 5 × 1 line within 1
**Target**: Each enemy in the line
**Power Roll + Highest Characteristic**:
* **11-**: 5 fire damage
* **12–16**: 8 fire damage
* **17+**: 11 fire damage`
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'invulnerable',
							name: 'Invulnerable',
							description: 'When a power roll made against you has a result of 11 or lower, you can ignore its damage and effects.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'leyline-walker',
							name: 'Leyline Walker',
							description: 'Once per turn, you can spend any amount of your movement to instead teleport that distance.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'life',
							name: 'Life',
							description: 'Whenever you would die, you can spend a Recovery to regain Stamina instead. If you have no Recoveries to spend, you die.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'magic-resistance-iii',
							name: 'Magic Resistance III',
							description: 'The benefits of the armor’s Magic Resistance II enhancement extend to each ally within 3 squares of you.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'phasing-iii',
							name: 'Phasing III',
							description: 'Your movement doesn’t provoke opportunity attacks, and you can move through enemy spaces as if they were allies. You can’t end your turn in an enemy’s space.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'psionic-resistance-iii',
							name: 'Psionic Resistance III',
							description: 'The benefits of the armor’s Psionic Resistance II trait extend to each ally within 3 squares of you.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'temporal-flux',
							name: 'Temporal Flux',
							description: `
Whenever you move out of a square, you can choose to leave an imprint behind that lasts until the end of the encounter, until your imprint takes 20 or more damage, or until you create a new imprint. The square is occupied by your imprint, and you can share that space with it.

During your turn, you can teleport to the imprint’s space as a free maneuver. When you are targeted by an ability, you can use a free triggered action to teleport to your imprint, and the power roll for the ability is treated as an 11.`
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'unbending',
							name: 'Unbending',
							description: 'You can’t be subjected to forced movement unless you choose to be. Effects that ignore Stability also ignore this enhancement.'
						}),
						selected: false
					}
				]
			}
		]
	});

	static imbuedImplement: Item = FactoryLogic.createItem({
		id: 'imbued-implement',
		name: 'Imbued Implement',
		description: 'Implements are jewelry, orbs, staffs, tomes, wands, weapons, and other objects used by magic and psionic users to focus their power. You decide what object to imbue when you create an implement treasure, but it must be an object you can carry or wear. You must have a mundane version of the item you plan to imbue when you begin this project. An implement imbued with an enhancement grants you special benefits while it is wielded.',
		type: ItemType.ImbuedImplement,
		customizationsByLevel: [
			{
				level: 1,
				features: [
					{
						feature: FactoryLogic.feature.create({
							id: 'berserking',
							name: 'Berserking',
							description: 'Whenever you damage a creature using a supernatural ability and obtain a tier 3 result on the power roll, that creature must make an opportunity attack against their nearest ally (if possible) after the ability’s effects resolve. This strike deals extra damage equal to the highest of your Reason, Intuition, or Presence scores.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'displacing-i',
							name: 'Displacing I',
							description: 'Whenever you damage a creature using a supernatural ability and obtain a tier 3 result on the power roll, you can teleport that creature up to 2 squares after the ability’s effects resolve. If the creature started on a horizontal surface, they must end on a horizontal surface.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'elemental',
							name: 'Elemental',
							description: 'Whenever you use an ability with the Air, Earth, Fire, Green, Rot, Void, or Water keyword, you can attune this implement to that element until the end of the encounter. While the implement is attuned, you gain an edge on power rolls with that elemental keyword. The implement can be attuned to only one element at a time.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'forceful-i',
							name: 'Forceful I',
							description: 'Whenever you use a supernatural ability to push or pull a creature, you can move that creature an additional 2 squares.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'rat-form',
							name: 'Rat Form',
							description: 'As a maneuver, you can transform into a rat. Your equipment transforms with you. As a rat, you have a speed of 5 with the Climb keyword, your size is 1T, and you can see in the dark. You can speak and keep your skills while in rat form, but your Might becomes −5 and you lose all your regular abilities, features, and benefits. You can revert to your natural form as a maneuver, and do so automatically if you take any damage.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'rejuvenating-i',
							name: 'Rejuvenating I',
							description: 'Whenever you use an ability that costs 1 or more Heroic Resources, roll a d10. On a 9 or higher, you gain 1 Heroic Resource.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'seeking',
							name: 'Seeking',
							description: 'Your ranged magic and psionic abilities gain a +2 distance bonus. Additionally, if you speak the name of a specific person, place, or object to the implement, the implement points toward that target, provided you are on the same world.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'thought-sending',
							name: 'Thought Sending',
							description: 'Your ranged magic and psionic abilities gain a +2 distance bonus. Additionally, you can telepathically speak with any willing creature who knows a language and whose name you know, provided they are on the same world as you. You must initiate the conversation, but once you do, the creature can respond until you end the conversation.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createBonus({
							id: 'warding-i',
							name: 'Warding I',
							field: FeatureField.Stamina,
							value: 6
						}),
						selected: false
					}
				]
			},
			{
				level: 5,
				features: [
					{
						feature: FactoryLogic.feature.create({
							id: 'celerity',
							name: 'Celerity',
							description: 'Immediately after using a supernatural ability that requires an action, you can shift up to 3 squares, or you can use the Escape Grab maneuver as a free maneuver.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'celestine',
							name: 'Celestine',
							description: 'As an action, you conjure up to three stars, which hover in unoccupied squares of your choice within 5 squares of you. The stars remain in place, and disappear if you create more stars. When an enemy enters any star’s space, the star detonates and is destroyed, and the enemy takes 10 fire damage. You can also slide the enemy 1 square if they are within line of effect. Otherwise, the enemy slides 1 square in a random direction.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'displacing-ii',
							name: 'Displacing II',
							description: 'When you use the implement’s Displacing I enhancement, you can teleport the creature up to 4 squares. Additionally, the creature takes a bane on their next power roll made before the end of their next turn.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'erupting-i',
							name: 'Erupting I',
							description: 'Whenever you damage a creature using a supernatural ability that targets only a single creature and obtain a tier 3 result on the power roll, each enemy within 2 squares of the creature takes 3 fire damage after the ability’s effects resolve.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'forceful-ii',
							name: 'Forceful II',
							description: 'Whenever you use a supernatural ability to push or pull a creature, you can move that creature an additional 3 squares. This replaces the benefit of Forceful I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'hallucinatory',
							name: 'Hallucinatory',
							description: 'As a maneuver, you create an area of sensory instability in a 2 aura centered on yourself. The area is difficult terrain for your enemies until the end of the encounter or until you are dying.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'lingering-i',
							name: 'Lingering I',
							description: 'Whenever you damage a creature using a supernatural ability and obtain a tier 3 result on the power roll, that creature takes 8 damage at the start of your next turn.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'rejuvenating-ii',
							name: 'Rejuvenating II',
							description: 'Whenever you use an ability that costs 1 or more Heroic Resources, roll a d10. On an 8 or higher, you gain 1 Heroic Resource, and you can spend a Recovery. This replaces the benefit of Rejuvenating II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createMultiple({
							id: 'warding-ii',
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
						}),
						selected: false
					}
				]
			},
			{
				level: 9,
				features: [
					{
						feature: FactoryLogic.feature.create({
							id: 'anathema',
							name: 'Anathema',
							description: 'Whenever you damage a creature using a supernatural ability and obtain a tier 3 result on the power roll, that creature is also weakened (save ends). If the creature is within 10 squares of you when this weakened effect ends, you can make a free strike against them as a free triggered action.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'displacing-iii',
							name: 'Displacing III',
							description: 'When you use the implement’s Displacing I enhancement, you can teleport the creature up to 5 squares. Additionally, the creature then has a bane on their next power roll made before the end of their next turn.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'erupting-ii',
							name: 'Erupting II',
							description: 'The fire damage dealt by the implement’s Erupting I enhancement increases to 6.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'forceful-iii',
							name: 'Forceful III',
							description: 'Whenever you use a supernatural ability to push or pull a creature, you can move that creature an additional 3 squares, and that movement can be vertical. This replaces the benefit of Forceful II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'lingering-ii',
							name: 'Lingering II',
							description: 'Whenever you damage a creature using a supernatural ability and obtain a tier 3 result on the power roll, that creature takes 15 damage at the start of your next turn. This replaces the benefit of Lingering I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'piercing',
							name: 'Piercing',
							description: 'Your supernatural abilities ignore damage immunities.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'psionic-siphon',
							name: 'Psionic Siphon',
							description: 'Once per turn when you damage one or more creatures with a supernatural ability and obtain a tier 3 result on the power roll, you gain Stamina equal to your highest characteristic score, and one creature you damage takes an additional 5 damage.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'rejuvenating-iii',
							name: 'Rejuvenating III',
							description: 'Whenever you use an ability that costs 1 or more Heroic Resources, roll a d10. On a 7 or higher, you gain 1 Heroic Resource, and you or a creature of your choice within 3 squares of you can spend a Recovery. This replaces the benefit of Rejuvenating II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createMultiple({
							id: 'warding-iii',
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
									description: 'You and each ally within 3 squares of you has their characteristic scores considered 1 higher for the purpose of resisting potencies.'
								})
							]
						}),
						selected: false
					}
				]
			}
		]
	});

	static imbuedWeapon: Item = FactoryLogic.createItem({
		id: 'imbued-weapon',
		name: 'Imbued Weapon',
		description: 'A weapon imbued with an enhancement grants you special benefits while it is wielded.',
		type: ItemType.ImbuedWeapon,
		customizationsByLevel: [
			{
				level: 1,
				features: [
					{
						feature: FactoryLogic.feature.create({
							id: 'blood-bargain',
							name: 'Blood Bargain',
							description: 'As a maneuver, you can harm yourself with the weapon, taking 1d6 damage that can’t be reduced in any way. An ally within 5 squares can then spend a Recovery.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'chilling-i',
							name: 'Chilling I',
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature takes 3 cold damage.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'disrupting-i',
							name: 'Disrupting I',
							description: 'Whenever you damage an undead using this weapon and leave that undead with 15 Stamina or less, they drop to 0 Stamina.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'hungering-i',
							name: 'Hungering I',
							description: 'Whenever you damage a creature other than yourself using this weapon, you regain Stamina based on the tier result of the power roll—3 Stamina for tier 1, 5 for tier 2, and 8 for tier 3. You can’t regain this Stamina if you’re dying.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'hurling',
							name: 'Hurling',
							description: 'Whenever you use an ability with a melee distance using this weapon, you can throw the weapon by treating the ability’s distance as Ranged 3 instead. When the ability is resolved, the weapon returns to your hand. Any ability used when you throw this weapon can’t impose the grabbed or restrained conditions.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'merciful',
							name: 'Merciful',
							description: 'Whenever you reduce a non-undead to 0 Stamina using this weapon, the creature falls unconscious and wakes up 1d6 hours later. A creature with the Heal skill can wake the unconscious creature early with 1 minute of medical treatment. Whenever the creature wakes, they regain 1 Stamina.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'terrifying-i',
							name: 'Terrifying I',
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature takes 3 psychic damage.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'thundering-i',
							name: 'Thundering I',
							description: 'Whenever you damage a creature using this weapon, you can push that creature up to 2 squares after the other effects of the ability resolve.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'vengeance-i',
							name: 'Vengeance I',
							description: 'Whenever you use this weapon with an ability against a creature who has dealt damage to you since the end of your last turn, you gain a +2 damage bonus on the ability.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'wingbane',
							name: 'Wingbane',
							description: 'Whenever you damage a flying creature using this weapon, that creature is also bleeding (save ends). While bleeding in this way, the creature takes 1 damage per square they fly. If the creature starts and ends their turn on the same solid surface, the bleeding condition ends.'
						}),
						selected: false
					}
				]
			},
			{
				level: 5,
				features: [
					{
						feature: FactoryLogic.feature.create({
							id: 'chargebreaker',
							name: 'Chargebreaker',
							description: `
While you wield this weapon, you have the following ability.
**Stop Right There**
Their momentum, your impact.
**Keywords**: Melee, Strike, Weapon
**Type**: Free Triggered Action
**Distance**: Melee 1
**Target**: 1 enemy
**Trigger**: The target moves into a space adjacent to you.
**Effect**: The target takes 5 damage.`
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'chilling-ii',
							name: 'Chilling II',
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature takes 6 cold damage and is slowed (save ends). This replaces the benefit of Chilling I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'devastating',
							name: 'Devastating',
							description: 'Whenever you make an ability roll using this weapon, the number you need to roll to score a critical hit is reduced by 1.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'disrupting-ii',
							name: 'Disrupting II',
							description: 'Whenever you damage an undead using this weapon and leave that undead with 30 Stamina or less, they drop to 0 Stamina. This replaces the benefit of Disrupting I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'hungering-ii',
							name: 'Hungering II',
							description: 'Whenever you damage a creature other than yourself using this weapon, you regain Stamina based on the tier result of the power roll—4 Stamina for tier 1, 10 Stamina for tier 2, and 15 Stamina for tier 3. You can’t regain this stamina if you’re dying. This replaces the benefit of Hungering I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'metamorphic',
							name: 'Metamorphic',
							description: `
You can change this weapon’s shape and form as a maneuver, granting one of the following benefits of your choice:
* **Concealed**: The weapon shrinks to the size of a piece of jewelry and can be worn as an earring, necklace, or similar accessory. While in this form, the weapon can’t be used for weapon abilities.
* **Large**: The distance of abilities using this weapon increases by 1 for melee abilities, or by 3 for ranged abilities.
* **Vicious**: Whenever you damage a creature using this weapon, you deal 1 extra damage on a tier 1 result, 2 extra damage on a tier 2 result, and 3 extra damage on a tier 3 result.`
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'silencing',
							name: 'Silencing',
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature also can’t use magic abilities (EoT).'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'terrifying-ii',
							name: 'Terrifying II',
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature takes 10 psychic damage and is frightened (save ends). This replaces the benefit of Terrifying I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'thundering-ii',
							name: 'Thundering II',
							description: 'Whenever you damage a creature using this weapon, you can push that creature up to 4 squares after the other effects of the ability resolve. If you obtained a tier 3 result on the power roll for the ability, the creature is also knocked prone after being pushed. This replaces the benefit of Thundering I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'vengeance-ii',
							name: 'Vengeance II',
							description: 'Whenever you use this weapon with an ability against a creature who has dealt damage to you since the end of your last turn, you gain a +4 damage bonus on the ability. This replaces the benefit of Vengeance I.'
						}),
						selected: false
					}
				]
			},
			{
				level: 9,
				features: [
					{
						feature: FactoryLogic.feature.create({
							id: 'chilling-iii',
							name: 'Chilling III',
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature takes 9 psionic cold damage and is slowed (save ends). This replaces the benefit of Chilling II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'disrupting-iii',
							name: 'Disrupting III',
							description: 'Whenever you damage an undead using this weapon and leave that undead with 50 Stamina or less, they immediately drop to 0 Stamina. If you instead leave the undead with 100 Stamina or less, they are frightened (save ends). This replaces the benefit of Disrupting II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'draining',
							name: 'Draining',
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature is also weakened (save ends). Each time you weaken a creature with this weapon, you gain one surge.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'hungering-iii',
							name: 'Hungering III',
							description: 'Whenever you damage a creature other than yourself using this weapon, you regain Stamina based on the tier result of the power roll—5 Stamina for tier 1, 12 for tier 2, or 20 for tier 3. Additionally, while you are dying, you gain an edge on abilities that use this weapon. This replaces the benefit of Hungering II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'imprisioning',
							name: 'Imprisioning',
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature is also restrained (save ends). While restrained in this way, the creature can’t use supernatural abilities.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'nova',
							name: 'Nova',
							description: `
Whenever you damage a creature using this weapon, each enemy within 1 square of you takes damage based on the tier result of the power roll—2 damage for tier 1, 6 for tier 2, or 10 for tier 3. Additionally, while you are winded, you gain the following ability.
**Nova**
I am an eternal flame, baby!
**Keywords**: Area, Magic, Melee
**Distance**: 3 burst
**Type**: Action
**Target**: All enemies
**Power Roll + Highest Characteristic**:
* **11-**: 7 fire damage
* **12–16**: 11 fire damage
* **17+**: 16 fire damage`
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'terrifying-iii',
							name: 'Terrifying III',
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature takes 6 psychic damage and is frightened (save ends). This replaces the benefit of Terrifying II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'thundering-iii',
							name: 'Thundering III',
							description: 'Whenever you damage a creature or object using this weapon, after the other effects of the ability resolve, you can vertical push that creature up to 5 squares and knock them prone. If the creature takes or deals damage as a result of this movement, they take 5 thunder damage. This replaces the benefit of Thundering II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'vengeance-iii',
							name: 'Vengeance III',
							description: 'Whenever you use this weapon with an ability against a creature who has dealt damage to you since the end of your last turn, you gain a +6 damage bonus on the ability. This replaces the benefit of Vengeance III.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'windcutting',
							name: 'Windcutting',
							description: 'Whenever you use a melee signature ability that normally targets one creature, you can take a bane on the ability to target each enemy in a cube 3 within distance. If your signature ability would normally cause its target to become grabbed or restrained, each target in the area is instead slowed (EoT) instead.'
						}),
						selected: false
					}
				]
			}
		]
	});
}
