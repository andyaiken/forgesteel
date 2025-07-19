import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Item } from '../../models/item';
import { ItemType } from '../../enums/item-type';

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
