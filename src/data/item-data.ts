import { AbilityKeyword } from '../enums/ability-keyword';
import { Characteristic } from '../enums/characteristic';
import { FactoryLogic } from '../logic/factory-logic';
import { Item } from '../models/item';
import { ItemType } from '../enums/item-type';

export class ItemData {
	static blackAshDart: Item = FactoryLogic.createItem({
		id: 'item-black-ash-dart',
		name: 'Black Ash Dart',
		description: 'A diamond-shaped dart holds a shimmering black vial at its core.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			id: 'item-black-ash-dart-crafting',
			name: 'Crafting',
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

	// Blood Essence Vial

	// Catapult Dust

	// Giant's Blood Flame

	// Growth Potion

	// Healing Potion

	// Imp's Tongue

	// Lachomp Tooth

	// Mirror Token

	// Pocket Homunculus

	// Portable Cloud

	// Noxious Cloud

	// Thunderhead Cloud

	// Professor Veratismo's Quaff'n'Huff Snuff

	// Snapdragon

	// Color Cloak (blue)

	// Color Cloak (red)

	// Color Cloak (yellow)

	// Deadweight

	// Displacing Replacement Bracer

	// Divine Vine

	// Flameshade Gloves

	// Gecko Gloves

	// Gyrotoque

	// Hellcharger Helm

	// Mask of the Many

	// Quantum Satchel

	// Unbinder Boots

	// Adaptive Second Skin of Toxins

	// Chain of the Sea and Sky

	// Grand Scarab

	// King's Roar

	// Kuran'zoi Prismscale

	// Paper Trappings

	// Shrouded Memory

	// Spiny Turtle

	// Star-Hunter

	// Telekinetic Bulwark

	// Abjurer's Bastion

	// Brittlebreaker

	// Chaldorb

	// Ether-Fueled Vessel

	// Foesense Lenses

	// Geometric Manipulator

	// Words Become Wonders at Next Breath

	// Authority's End

	// Blade of Quintessence

	// Blade of the Luxurious Fop

	// Displacer

	// Executioner's Blade

	// Icemaker Maul

	// Knife of Nine

	// Lance of the Sundered Star

	// Molten Constrictor

	// Onerous Bow

	// Steeltongue

	// Third Eye Seeker

	// Thunderhead Bident

	// Wetwork

	// Bloodbound Band

	// Bloody Hand Wraps

	// Lightning Treads

	// Revenger's Wrap

	// Thief of Joy

	// Blade of a Thousand Years

	// Encepter

	// Mortal Coil
}
