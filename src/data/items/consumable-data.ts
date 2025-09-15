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
As a maneuver, you can make a ranged free strike using a black ash dart. The strike deals an extra 1 damage and adds the following effects to the tier outcomes of the power roll:

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
		effect: 'When you damage an adjacent creature who has blood, you can capture the target’s life essence in this vial (no action required). Record the damage you dealt. You can capture life essence in the vial only once. As a maneuver, you drink the contents of the vial to regain Stamina equal to half the damage dealt. If you spend 1 Heroic Resource while you drink, you regain Stamina equal to the damage dealt. Once you drink from the vial, it crumbles to dust.'
	});

	static buzzBalm: Item = FactoryLogic.createItem({
		id: 'item-buzz-balm',
		name: 'Buzz Balm',
		description: 'This cooling orange salve crackles and pops when exposed to the air.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Oil ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'An ounce of demon honey',
			source: 'Texts or lore in Kalliak',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 45
		}),
		effect: 'As a maneuver, you rub the balm on your body and feel it tingle across your skin. You immediately end the bleeding and weakened conditions on yourself, and you gain a +2 bonus to speed until the start of your next turn.'
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
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 45
		}),
		effect: 'Catapult Dust was developed as a cost-effective magic siege weapon. As a main action, you pour the dust out in an adjacent unoccupied space to fill an area as large as a 2 cube. At the start of your next turn, the ground at the bottom of the area erupts violently upwards and in a direction of your choice. Any unattended objects in the area, or creatures who have entered the area since the dust was poured, are launched in an arc that is 6 + 1d6 squares long and 3 + 1d6 squares high.'
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
As a maneuver, you coat a weapon in this oil and ignite it. The weapon burns persistently and without harming itself until it is extinguished as a maneuver. Whenever you use a weapon ability that deals rolled damage using a weapon that is ignited this way, the ability deals an extra 2 fire damage.

Alternatively, you can use a maneuver to throw the pot up to 5 squares, coating the square where it lands and any creatures or objects in that square with a sticky flammable oil. If the oil takes any fire damage, it burns persistently and deals 5 fire damage at the end of each of your turns to anything it has coated. A creature covered in the oil or who can reach it can use a main action to extinguish the flames and end the effect.

Any fire caused by the oil is extinguished after burning for 1 hour.`
	});

	static growthPotion: Item = FactoryLogic.createItem({
		id: 'item-growth-potion',
		name: 'Growth Potion',
		description: 'This thick, green liquid tastes of licorice and potatoes.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Potion ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A half-pound of seagrass',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 45
		}),
		effect: 'As a maneuver, you can drink this potion or pour it over an object of size 2 or smaller, causing the target’s size to increase by 1(to a minimum size of 2). If you are the target, your Stamina maximum and Stability are doubled, you gain an edge on Might tests, and your weapon abilities that deal rolled damage gain a damage bonus equal to your highest characteristic score. You shrink back to your original size after 3 rounds, halving your current Stamina maximum and Stability, and losing the potion’s other benefits. Objects maintain their new size permanently.'
	});

	static healingPotion: Item = FactoryLogic.createItem({
		id: 'item-healing-potion',
		name: 'Healing Potion',
		description: 'Thick and red, this liquid tastes of sour beer.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Potion ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'An ounce of costmary leaves',
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
		effect: 'As a maneuver, you place the imp’s tongue on your own tongue, causing it to reconstitute and attach itself to your tongue. While attached, the Imp’s Tongue allows you to speak any language and understand any language spoken to you. This benefit ends after 1 hour, when the tongue is absorbed into your body.'
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
As a maneuver, you attach a lachomp tooth to a weapon, allowing that weapon to supernaturally flicker in and out of reality. Your next strike that uses the weapon can tear through multiple targets in a line (for a ranged strike) or surrounding you (for a melee strike). The strike adds the following effects to the tier outcomes of the power roll:

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
When activated as a maneuver, this item erupts in a bright flash, you can shift 1 square without your enemies noticing your movement, and a homunculus perfectly resembling you appears in an adjacent space. The homunculus is a creature with Stamina 15, a 0 in all their characteristics, and a speed and stability equal to yours. They appear indistinguishable from you but can’t use any abilities.

While you have line of effect to your homunculus, you can use a maneuver to issue them a telepathic command. The homunculus performs the command to the best of their ability. If not commanded, the homunculus mimics your movements and speech. When you move, the homunculus moves with you, matching your pace. The homunculus crumbles to dust after 1 hour or if reduced to 0 Stamina.`
	});

	static portableCloud: Item = FactoryLogic.createItem({
		id: 'item-portable-cloud',
		name: 'Portable Cloud',
		description: 'This thin glass sphere holds a tiny roiling cloud.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A cup of rainwater from a sacred fey grove',
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
		effect: `
As a maneuver, you throw this delicate glass sphere up to 5 squares, breaking it and creating a 4 cube of fog. The fog dissipates after 10 minutes or if a strong gust of wind created by a storm or magic passes through the area.

Filled with a green or putrid yellow haze, this sphere spreads a choking, foul-smelling mist when broken. Each creature who enters the cloud for the first time in a combat round or starts their turn there takes 5 poison damage. Additionally, any creature is weakened while in the fog.`
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
		effect: `
As a maneuver, you throw this delicate glass sphere up to 5 squares, breaking it and creating a 4 cube of fog. The fog dissipates after 10 minutes or if a strong gust of wind created by a storm or magic passes through the area.

Small lightning bolts arc around the black cloud in this sphere, which creates a 3 cube of cloud and lightning when broken. Each creature who enters the cloud for the first time in a combat round or starts their turn there takes 5 lightning damage. Additionally, any creature is slowed while in the cloud`
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
		effect: 'As a maneuver, you sprinkle a dose of this powder onto food or drink, or blow it at an adjacent creature who is grabbed, restrained, or unconscious. A creature who is exposed to blown powder (even if they hold their breath) or consumes a dose of the powder must communicate in only true statements for 1 hour. Additionally, other creatures gain an edge on Intuition and Presence tests made to convince the target to communicate, or to read the target’s emotions. Any such creature has a double edge on the test if the target doesn’t realize they’ve been affected by the snuff.'
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
		effect: 'As a maneuver, you sniff a magic snapdragon blossom, causing it to whither and making your movements more forceful and explosive. The next damage-dealing ability you use deals an extra 5 damage and gains a +2 bonus to the distance of any forced movement it imposes. If the ability does not impose forced movement, you can push each creature targeted by the ability up to 2 squares.'
	});

	static breathofDawn: Item = FactoryLogic.createItem({
		id: 'item-breath-of-dawn',
		name: 'Breath of Dawn',
		description: 'A glass flask contains a whirl of gentle sunlight.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'The breath of a mystic sage captured at sunrise',
			source: 'Texts or lore in Hyrallic',
			characteristic: [ Characteristic.Intuition, Characteristic.Presence ],
			goal: 90
		}),
		effect: 'As a maneuver, you inhale the Breath of Dawn and are overcome with tranquility. You immediately end the frightened, slowed, and taunted conditions on yourself, and you gain a +8 bonus to Stability until the end of the encounter.'
	});

	static bullShot: Item = FactoryLogic.createItem({
		id: 'item-bull-shot',
		name: 'Bull Shot',
		description: 'Tiny chips of white bone float within this dark potion, which carries the scent of beef broth.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Potion ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'One vial of pure bovine essence',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 90
		}),
		effect: 'When you drink this potion as a maneuver, you sprout 3-foot sharpened horns from your forehead. Whenever you use the Charge main action, the target of your strike is gored upon your horns and grabbed. While grabbed this way, the creature is bleeding. You can also grab another creature with your limbs. The horns harmlessly fall off your head at the end of the encounter.'
	});

	static chocolateofImmovability: Item = FactoryLogic.createItem({
		id: 'item-chocolate-of-immovability',
		name: 'Chocolate of Immovability',
		description: 'This decadent-looking treat feels strangely heavy in the hand.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A chocolate made by a gnome confectioner',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 90
		}),
		effect: 'When you consume this delicious piece of candy as a maneuver, you gain 15 temporary Stamina and a +10 bonus to stability. Additionally, if you don’t use your movement during your turn, any strikes you make on that turn deal an extra 5 damage, and any strikes against you take a bane until the start of your next turn. This effect and the bonus to stability lasts until the end of the encounter, after which you are sleepy. If not reduced beforehand, the temporary Stamina lasts until the end of your next respite.'
	});

	static concealmentPotion: Item = FactoryLogic.createItem({
		id: 'item-concealment-potion',
		name: 'Concealment Potion',
		description: 'This dark, viscous liquid tastes like burnt leaves.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Potion, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'An ounce of sap from a tree damaged by psionic fire',
			source: 'Texts or lore in Yllyric',
			characteristic: [ Characteristic.Agility, Characteristic.Intuition ],
			goal: 90
		}),
		effect: 'When you drink this potion as a maneuver, light shifts around your body, letting you blend into the environment around you for 10 minutes. While this effect is active, you have a double edge on tests made to hide and sneak, and you can use the Hide maneuver even while you are observed.'
	});

	static floatPowder: Item = FactoryLogic.createItem({
		id: 'item-float-powder',
		name: 'Float Powder',
		description: 'A glass vial holds translucent flakes that twinkle in the light.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'Several strands of hag hair',
			source: 'Texts or lore in Khelt',
			characteristic: [ Characteristic.Intuition, Characteristic.Presence ],
			goal: 90,
			effect: 'Yields 1d3 vials'
		}),
		effect: 'Dousing yourself in this powder as a maneuver causes you to weightlessly float off the ground. For 1 hour, your stability is reduced to 0, and you can fly and hover. Additionally, the hag that the powder is sourced from knows exactly where and when you use it.'
	});

	static purifiedJelly: Item = FactoryLogic.createItem({
		id: 'item-purified-jelly',
		name: 'Purified Jelly',
		description: 'This clear, pasty substance has a bitter aroma.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Potion, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A cup of algae from glacial water',
			source: 'Texts or lore in Yllyric',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 90,
			effect: 'Yields 1d3 doses'
		}),
		effect: 'Consuming this potion as a maneuver causes your skin to shimmer and a set of tiny gills to appear on your neck or shoulders. For 1 hour, you can breathe in any environment, and you ignore the effects of harmful gases, vapors, and inhaled poisons.'
	});

	static scrollofResurrection: Item = FactoryLogic.createItem({
		id: 'item-scroll-of-resurrection',
		name: 'Scroll of Resurrection',
		description: 'This scroll is marked by sigils of power, death, and life.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Scroll ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A sheet of paper infused with the dust of a painite',
			source: 'Texts or lore in the First Language',
			characteristic: [ Characteristic.Intuition, Characteristic.Presence ],
			goal: 90
		}),
		effect: `
As a respite activity, you repeatedly chant the contents of this scroll over the remains of a creature who has been dead for less than 1 year. The creature’s soul must be willing to return to life for the scroll to work. If they are not willing, you instinctively understand that as you start the respite activity and can cease it immediately. The scroll is not consumed, and you can undertake a new respite activity.

A creature with a willing soul returns to life at the end of the respite with full Stamina and half their Recoveries. You regain only half your Recoveries at the end of the respite, and the scroll is consumed.`
	});

	static elemagnet: Item = FactoryLogic.createItem({
		id: 'item-telemagnet',
		name: 'Telemagnet',
		description: 'A short iron wand shaped of interlocking segments leaks greasy black oil from its joints.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A shard of prismacore, an ounce of ferrous metal',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 90
		}),
		effect: `
As a maneuver, you snap this wand in half, letting you vertically pull any object or creature within line of effect of size 3 or less a number of squares based on that target’s size:

* **Size 1L or smaller:** vertical pull 6
* **Size 2:** vertical pull 3
* **Size 3:** vertical pull 1

If you pull a size 1T object adjacent to you, you can catch it.`
	});

	static vialofetherealAttack: Item = FactoryLogic.createItem({
		id: 'item-vial-of-ethereal-attack',
		name: 'Vial of Ethereal Attack',
		description: 'Clear liquid seems to constantly churn within an obsidian vial, even when at rest.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A signed agreement with a ghost, a large obsidian disk',
			source: 'Texts or lore in Anjali',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 90
		}),
		effect: 'As a maneuver, you throw this vial up to 10 squares, destroying the vial and creating a 2-cube ethereal vortex centered on the spot where it lands. The vortex dissipates at the end of the encounter or when you dismiss it (no action required). Any creature who enters the vortex for the first time in a combat round or starts their turn there takes 10 psychic damage. At the start of each of your turns, you can move the vortex up to 5 squares (no action required).'
	});

	static anamorphicLarva: Item = FactoryLogic.createItem({
		id: 'item-anamorphic-larva',
		name: 'Anamorphic Larva',
		description: 'A cloudy glass vial holds a writhing monstrous grub.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A grub steeped in voiceless talker bil',
			source: 'Texts or lore in Variac',
			characteristic: [ Characteristic.Might, Characteristic.Intuition ],
			goal: 180
		}),
		effect: `
When you release the larva as a maneuver, it feeds on psychic energy to grow exponentially, creating a 10 wall of larval flesh adjacent to you. The wall can’t be created to fill any square occupied by a creature with stability 1 or higher. Each other creature in the wall when it is created is pushed to the nearest unoccupied space.

At the start of each of your turns, each creature adjacent to the wall takes psychic damage equal to three times their Intuition score, and you can add 1 square to the wall for each creature who takes this damage. If no creature takes damage at the start of your turn, the larva dies and the wall disappears.`
	});

	static bottledParadox: Item = FactoryLogic.createItem({
		id: 'item-bottled-paradox',
		name: 'Bottled Paradox',
		description: 'Liquid constantly swirls within a cut glass bottle that is ice cold to the touch.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Potion ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A month’s lifespan from the creator or another willing creature, ground sapphire',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 180
		}),
		effect: 'As a maneuver, you can drink this potion or throw it up to 10 squares. If you drink it, you choose a test you made in the last minute, then reroll that test repeatedly until the outcome changes. If the potion is thrown, it creates a 3-cube area of shimmering magic. Any event that took place in that area in the previous minute changes at the discretion of the Director, who has full freedom to decide what happens. The energy then dissipates.'
	});

	static galliosvisitingCard: Item = FactoryLogic.createItem({
		id: 'item-gallios-visiting-card',
		name: 'G’Allios Visiting Card',
		description: 'A card bearing the Eighth City Advocacy Services crest smells faintly of smoke and spices.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'One vial of archdevil’s blood, an expired contract',
			source: 'Texts or lore in Anjali',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 180
		}),
		effect: 'Whenever you would take damage, you can use a triggered action to tear the card and summon a devil. You avoid the damage and any accompanying effects, and the devil redirects the triggering effect to a target of their choice anywhere on the same manifold. You are treated to a clear vision of whoever suffers the damage. The devil then disappears.'
	});

	static personalEffigy: Item = FactoryLogic.createItem({
		id: 'item-personal-effigy',
		name: 'Personal Effigy',
		description: 'This tiny humanoid effigy appears unnervingly lifelike and is always warm to the touch.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A brief period of contact with the creature the effigy is tied to',
			source: 'Texts or lore in Khemharic',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 120
		}),
		effect: 'The Personal Effigy is crafted to depict a specific humanoid creature it is tied to, and activates only for the first minute after the creature dies. While you are within 5 squares of the remains of the creature the effigy is tied to, you can use a maneuver to manually light and burn the effigy and bring the creature back to life. The creature returns to life with Stamina equal to their winded value and 10 temporary Stamina that lasts until the end of their next respite. If the creature has been dead for more than 1 minute, they remain dead and the effigy dissolves into dust.'
	});

	static stygianLiquor: Item = FactoryLogic.createItem({
		id: 'item-stygian-liquor',
		name: 'Stygian Liquor',
		description: 'This muddy brown whiskey tastes of peat and death.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Potion ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'An ounce of scrapings from a coven’s used cauldron',
			source: 'Texts or lore in Anjali',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 180
		}),
		effect: 'When you drink this potion as a maneuver, you gain a tenacious will to cling to life for 24 hours. If you are dying during this time, you don’t die until you reach the negative of your Stamina maximum rather than your winded value. Additionally, while you are dying, you gain on edge on power rolls and you take half the damage dealt by the bleeding condition. Once the potion’s magic is triggered, it ends when you are no longer dying.'
	});

	static timesplitter: Item = FactoryLogic.createItem({
		id: 'item-timesplitter',
		name: 'Timesplitter',
		description: 'This spiked crystal makes a beautiful ringing sound when first touched.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A time crystal',
			source: 'Texts or lore in Voll',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 180
		}),
		effect: `
As a maneuver, you make a ranged free strike using the Timesplitter, which shatters upon impact. The strike deals an extra 1d6 psychic damage and adds the following effects to the tier outcomes of the power roll:

* 11 or lower: The target and each creature within 3 squares of them a slowed (save ends).
* 12-16: The target and each creature within 5 squares of them a slowed (save ends).
* 17+: The target and each creature within 8 squares of them a slowed (save ends).`
	});

	static wardToken: Item = FactoryLogic.createItem({
		id: 'item-ward-token',
		name: 'Ward Token',
		description: 'This smoothly polished quartz stone feels strangely warm to the touch.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A small quartz',
			source: 'Texts or lore in Zaliac',
			characteristic: [ Characteristic.Might, Characteristic.Intuition ],
			goal: 180
		}),
		effect: 'As a maneuver, you toss this stone above you and it shatters, showering you in dust. Until the end of the encounter, any enemy ability that targets you has a double bane.'
	});

	static wellnessTonic: Item = FactoryLogic.createItem({
		id: 'item-wellness-tonic',
		name: 'Wellness Tonic',
		description: 'This thick purple liquid has a bitter scent that lingers.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Potion, AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'An ounce of troll’s blood, raw honey',
			source: 'Texts or lore in Variac',
			characteristic: [ Characteristic.Might, Characteristic.Intuition ],
			goal: 180
		}),
		effect: 'When you drink this tonic as a maneuver, you feel a surge of physical and spiritual immunity. You can immediately end up to three conditions or effects affecting you. Additionally, until the start of your next turn, you can ignore any effect that would last until the end of your next turn or be ended by a saving throw.'
	});

	static breathofCreation: Item = FactoryLogic.createItem({
		id: 'item-breath-of-creation',
		name: 'Breath of Creation',
		description: 'A glass flask holds a roiling storm of astral plasma.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Psionic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'The captured breath of a god, an ounce of condensed dreams',
			source: 'Texts or lore in the First Language',
			characteristic: [ Characteristic.Intuition, Characteristic.Presence ],
			goal: 360
		}),
		effect: `
When you inhale the Breath of Creation as a maneuver, you are imbued with cosmic power. You earn 1 Renown, and you create a size 2 portal to a new demiplane in an adjacent square. The demiplane is a 20-cube area whose form and mundane features are chosen by you. The portal appears only to you and creatures you designate, and only you and those creatures can enter the demiplane. When a creature moves into the portal, they emerge from a corresponding portal inside the demiplane, and vice versa. Objects created within the demiplane turn to dust if removed from it.

Each time you use another Breath of Creation, you can create a new demiplane or expand a demiplane you have already created or visited. The size of an expanded demiplane increases by 20, and you create a second portal to the demiplane with a corresponding portal inside.`
	});

	static elixirofsaintElspeth: Item = FactoryLogic.createItem({
		id: 'item-elixir-of-saint-elspeth',
		name: 'Elixir of Saint Elspeth',
		description: 'This thick red liquid smells of cinnamon.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic, AbilityKeyword.Potion ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'An ounce of the blood of Saint Elspeth',
			source: 'Texts or lore in Caelian',
			characteristic: [ Characteristic.Presence ],
			goal: 360
		}),
		effect: 'When you pour the elixir onto your forehead as a maneuver, it vanishes and you protect yourself against effects that might harm your body, mind, or soul. For a number of rounds equal to your current Victories, any enemy ability targeting you automatically obtains a tier 1 outcome against you. Additionally, the ability can only deal damage to you, letting you ignore its other effects.'
	});

	static solaris: Item = FactoryLogic.createItem({
		id: 'item-solaris',
		name: 'Page From the Infinite Library: Solaris',
		description: 'This page is covered with writing and diagrams detailing the release of limitless energy—and the dangers of that process.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'One vial of sacred ink, blessed parchment',
			source: 'Reference materials in the First Language from the Infinite Library detailing incomplete instructions for building a sun',
			characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
			goal: 360
		}),
		effect: 'As a maneuver, you spend 1 Heroic Resource to destroy this page and create a 4-cube area within 20 squares. The area is filled with the energy of a tiny sun that lasts until the end of the encounter. Any creature who enters the area for the first time in a combat round or starts their turn there takes 20 fire damage and is dazed until the end of their turn.'
	});

	static brightCourt: Item = FactoryLogic.createItem({
		id: 'item-bright-court',
		name: 'Restorative of the Bright Court',
		description: 'An ornately decorated golden vial smells of summer rain and subtle zesty fruits.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			prerequisites: 'A year’s lifespan from the creator or another willing creature, the laughter of a young hero',
			source: 'Texts or lore in Khelt',
			characteristic: [ Characteristic.Reason, Characteristic.Presence ],
			goal: 360
		}),
		effect: 'When opened as a maneuver, this vial bursts into a storm of multicolored lights. You and each ally within 5 squares of you regain 1d6 Recoveries. However, any mortal using this treasure draws the interest of a powerful fey noble.'
	});
}
