import { KitArmor, KitType, KitWeapon } from '../enums/kit';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityLogic } from '../logic/ability-logic';
import { Characteristic } from '../enums/characteristic';
import { FeatureLogic } from '../logic/feature-logic';
import { Kit } from '../models/kit';
import { KitLogic } from '../logic/kit-logic';

export class KitData {
	static arcaneArcher: Kit = {
		id: 'kit-arcane-archer',
		name: 'Arcane Archer',
		description: 'The Arcane Archer kit allows you to combine magic and ranged weapon attacks. Your lack of armor keeps you mobile, and your magic makes your arrows explode to devastate your foes.',
		type: KitType.Standard,
		armor: [],
		weapon: [ KitWeapon.Bow ],
		stamina: 0,
		speed: 1,
		stability: 0,
		meleeDamage: null,
		rangedDamage: KitLogic.createDamageBonus(2, 2, 2),
		meleeDistance: 0,
		rangedDistance: 10,
		disengage: 1,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-arcane-archer-signature',
					name: 'Exploding Arrow',
					description: 'Your ammunition explodes with magical energy.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createRanged(5) ],
					target: '1 creature or object',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
						tier1: '3 + A, R, I, or P fire damage',
						tier2: '5 + A, R, I, or P fire damage',
						tier3: '8 + A, R, I, or P fire damage'
					}),
					effect: 'A creature or object within 2 squares of your target takes fire damage equal to the characteristic score you added to this ability’s power roll.'
				})
			})
		]
	};

	static battlemind: Kit = {
		id: 'kit-battlemind',
		name: 'Battlemind',
		description: 'Who says lightly armored heroes can’t also be hard to move? You just need to employ some psionics! You use the Battlemind kit harnesses the power of your mind to make yourself harder to move and your foes easier to push around.',
		type: KitType.Standard,
		armor: [ KitArmor.Light ],
		weapon: [ KitWeapon.Medium ],
		stamina: 3,
		speed: 2,
		stability: 1,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		meleeDistance: 0,
		rangedDistance: 0,
		disengage: 10,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-battlemind-signature',
					name: 'Unmooring',
					description: 'Your weapon unleashes psionic energy that reduces your target’s weight.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '1 creature',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
						tier1: '3 + M, R, I, or P damage; stability reduced by 2 (EoT)',
						tier2: '6 + M, R, I, or P damage; stability reduced by 3 (EoT)',
						tier3: '9 + M, R, I, or P damage; stability reduced by 4 (EoT)'
					})
				})
			})
		]
	};

	static cloakAndDagger: Kit = {
		id: 'kit-cloak-and-dagger',
		name: 'Cloak and Dagger',
		description: 'Providing throwable light weapons and light armor easily concealed by a cloak to confuse your enemies, the Cloak and Dagger kit makes you more mobile while providing a boost to your effectiveness at range and to your damage. This kit is good for a hero who wants to be able to move all over the battlefield while keeping their options open for using short-range attacks.',
		type: KitType.Standard,
		armor: [ KitArmor.Light ],
		weapon: [ KitWeapon.Light ],
		stamina: 3,
		speed: 2,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(1, 1, 1),
		rangedDamage: KitLogic.createDamageBonus(1, 1, 1),
		meleeDistance: 0,
		rangedDistance: 5,
		disengage: 1,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-cloak-and-dagger-signature',
					name: 'Fade',
					description: 'A stab, and a few quick, careful steps back.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [
						AbilityLogic.distance.createMelee(1),
						AbilityLogic.distance.createRanged(5)
					],
					target: '1 creature',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '2 + M or A damage; you shift 1 square',
						tier2: '5 + M or A damage; you shift up to 2 squares',
						tier3: '7 + M or A damage; you shift up to 3 squares'
					})
				})
			})
		]
	};

	static dualWielder: Kit = {
		id: 'kit-dual-wielder',
		name: 'Dual Wielder',
		description: 'The Dual Wielder kit is for folks who want to excel at using two weapons at the same time. The fighting style maximizes the power of each instrument in your hands, making you a whirling deliverer of death.',
		type: KitType.Standard,
		armor: [ KitArmor.Medium ],
		weapon: [ KitWeapon.Light, KitWeapon.Medium ],
		stamina: 6,
		speed: 2,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		meleeDistance: 0,
		rangedDistance: 0,
		disengage: 1,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-dual-wielder-signature',
					name: 'Double Strike',
					description: 'Why strike once when you could do it twice?',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '1 creature',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '2 damage',
						tier2: '4 damage',
						tier3: '6 damage'
					}),
					effect: 'If you use this ability on your turn, you can target one creature or object with it then use your maneuver and move action for that turn before targeting a second creature or object. You still use the same power roll for both targets.'
				})
			})
		]
	};

	static guisarmier: Kit = {
		id: 'kit-guisarmier',
		name: 'Guisarmier',
		description: 'The Guisarmier kit is for those who want to use a polearm for extended reach and still gain the extra protection of armor. This is the kit that allows you to become the ultimate halberd, longspear, or glaive fighter.',
		type: KitType.Standard,
		armor: [ KitArmor.Medium ],
		weapon: [ KitWeapon.Polearm ],
		stamina: 6,
		speed: 0,
		stability: 1,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		meleeDistance: 1,
		rangedDistance: 0,
		disengage: 0,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-guisarmier-signature',
					name: 'Forward Thrust, Backward Smash',
					description: 'In your hands, the haft is as good as the head.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '2 creatures or objects',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '2 damage',
						tier2: '5 damage',
						tier3: '7 damage'
					})
				})
			})
		]
	};

	static martialArtist: Kit = {
		id: 'kit-martial-artist',
		name: 'Martial Artist',
		description: 'If you want to be fast in a fight, then Martial Artist is the kit for you. Unencumbered by weapons or armor, this fighting style rewards quick, focused unarmed strikes to opponents, and allows you to be the ultimate skirmisher.',
		type: KitType.Standard,
		armor: [],
		weapon: [ KitWeapon.Unarmed ],
		stamina: 3,
		speed: 3,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		meleeDistance: 0,
		rangedDistance: 0,
		disengage: 1,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-martial-artist-signature',
					name: 'Battle Grace',
					description: 'You feint to move your enemies into perfect position.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '1 creature',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '3 + M or A damage',
						tier2: '6 + M or A damage; you swap places with the target',
						tier3: '9 + M or A damage; you swap places with the target'
					}),
					effect: 'If you roll a 12 or better and can’t swap places with the target because one or both of you is too big to fit into the swapped space, you both remain in your original spaces and the target takes 2 extra damage.'
				})
			})
		]
	};

	static mountain: Kit = {
		id: 'kit-mountain',
		name: 'Mountain',
		description: 'The Mountain kit does exactly what it says on the tin. You don heavy armor and a heavy weapon to stand strong against your foes, quickly demolishing them when it’s your turn to attack.',
		type: KitType.Standard,
		armor: [ KitArmor.Heavy ],
		weapon: [ KitWeapon.Heavy ],
		stamina: 9,
		speed: 0,
		stability: 2,
		meleeDamage: KitLogic.createDamageBonus(0, 0, 4),
		rangedDamage: null,
		meleeDistance: 0,
		rangedDistance: 0,
		disengage: 0,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-mountain-signature',
					name: 'Pain For Pain',
					description: 'An enemy who tagged you will pay for that.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '1 creature',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '3 damage + M or A damage',
						tier2: '5 damage + M or A damage',
						tier3: '9 damage + M or A damage'
					}),
					effect: 'If the target dealt damage to you since the end of your last turn, this strike deals additional damage equal to your Might or Agility score (your choice).'
				})
			})
		]
	};

	static panther: Kit = {
		id: 'kit-panther',
		name: 'Panther',
		description: 'If you want a good balance of protection, speed, and damage, the Panther kit is for you. This kit increases your Stamina not by wearing armor, but through the focused battle preparation of body and mind, letting you be fast and mobile while swinging a heavy weapon at your foes.',
		type: KitType.Standard,
		armor: [],
		weapon: [ KitWeapon.Heavy ],
		stamina: 6,
		speed: 1,
		stability: 1,
		meleeDamage: KitLogic.createDamageBonus(0, 0, 4),
		rangedDamage: null,
		meleeDistance: 0,
		rangedDistance: 0,
		disengage: 0,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-panther-signature',
					name: 'Devastating Rush',
					description: 'The faster you move, the harder you hit.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '1 creature or object',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '3 + M or A damage',
						tier2: '6 + M or A damage',
						tier3: '9 + M or A damage'
					}),
					effect: 'You can move up to 3 squares straight toward the target before this attack. You deal extra damage equal to the distance moved this way.'
				})
			})
		]
	};

	static pugilist: Kit = {
		id: 'kit-pugilist',
		name: 'Pugilist',
		description: 'Meant for brawlers and boxers, the Pugilist kit gives you access to a melee fighting style that gives you a boost to Stamina and damage while allowing you to float like a butterfly. If you want to be a tough, strong hero who doles out punishment with your fists, then this kit is for you.',
		type: KitType.Standard,
		armor: [],
		weapon: [ KitWeapon.Unarmed ],
		stamina: 6,
		speed: 2,
		stability: 1,
		meleeDamage: KitLogic.createDamageBonus(1, 1, 1),
		rangedDamage: null,
		meleeDistance: 0,
		rangedDistance: 0,
		disengage: 0,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-pugilist-signature',
					name: 'Let’s Dance',
					description: 'Keeping your enemies stumbling around the battlefield is second nature to you.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '1 creature',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '2 + M or A damage',
						tier2: '5 + M or A damage; slide 1',
						tier3: '7 + M or A damage; slide 2'
					}),
					effect: 'You can shift into any square your target leaves after you slide them.'
				})
			})
		]
	};

	static raider: Kit = {
		id: 'kit-raider',
		name: 'Raider',
		description: 'The Raider kit keeps you protected while granting you full mobility, providing a boost to speed and distance that lets you run around the battlefield like a Viking warrior.',
		type: KitType.Standard,
		armor: [ KitArmor.Medium, KitArmor.Shield ],
		weapon: [ KitWeapon.Light ],
		stamina: 6,
		speed: 1,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(1, 1, 1),
		rangedDamage: KitLogic.createDamageBonus(1, 1, 1),
		meleeDistance: 0,
		rangedDistance: 5,
		disengage: 1,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-raider-signature',
					name: 'Shock and Awe',
					description: 'You execute a brutal strike that leaves your foe reeling.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [
						AbilityLogic.distance.createMelee(1),
						AbilityLogic.distance.createRanged(5)
					],
					target: '1 creature',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '2 + M or A damage',
						tier2: '5 + M or A damage',
						tier3: '7 + M or A damage'
					}),
					effect: 'The target has a bane on their next power roll made before the end of their next turn.'
				})
			})
		]
	};

	static ranger: Kit = {
		id: 'kit-ranger',
		name: 'Ranger',
		description: 'The Ranger kit outfits you with light armor and several weapons, letting you easily switch between using a melee weapon and a bow. This kit provides a good balance of bonuses to Stamina, speed, damage, and range to create a hero who is a jack-of-all-trades.',
		type: KitType.Standard,
		armor: [ KitArmor.Medium ],
		weapon: [ KitWeapon.Medium, KitWeapon.Bow ],
		stamina: 6,
		speed: 1,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(1, 1, 1),
		rangedDamage: KitLogic.createDamageBonus(1, 1, 1),
		meleeDistance: 0,
		rangedDistance: 5,
		disengage: 1,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-ranger-signature',
					name: 'Hamstring Shot',
					description: 'A well-placed shot leaves your enemy struggling to move.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createRanged(5) ],
					target: '1 creature',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '2 + M or A damage; A < [weak] slowed (save ends)',
						tier2: '4 + M or A damage; A < [average] slowed (save ends)',
						tier3: '6 + M or A damage; A < [strong] slowed (save ends)'
					})
				})
			})
		]
	};

	static rapidFire: Kit = {
		id: 'kit-rapid-fire',
		name: 'Rapid Fire',
		description: 'The Rapid-Fire kit is for archers who want to deal maximum damage by shooting as many arrows as possible into nearby enemies. With this kit, your fighting technique focuses on peppering foes at medium range.',
		type: KitType.Standard,
		armor: [ KitArmor.Light ],
		weapon: [ KitWeapon.Bow ],
		stamina: 3,
		speed: 1,
		stability: 0,
		meleeDamage: null,
		rangedDamage: KitLogic.createDamageBonus(2, 2, 2),
		meleeDistance: 0,
		rangedDistance: 7,
		disengage: 1,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-rapid-fire-signature',
					name: 'Two Shot',
					description: 'When you fire two arrows back to back, both hit their mark.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createRanged(5) ],
					target: '2 creatures or objects',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '2 damage',
						tier2: '4 damage',
						tier3: '6 damage'
					})
				})
			})
		]
	};

	static retiarius: Kit = {
		id: 'kit-retiarius',
		name: 'Retiarius',
		description: 'The retiarius is often depicted as a lightly armored warrior with a net in one hand and a trident in the other, and this kit gives you the equipment and fighting technique to make that happen. Tie up your foe with a net and then poke them to death!',
		type: KitType.Standard,
		armor: [ KitArmor.Light ],
		weapon: [ KitWeapon.Polearm, KitWeapon.Ensnaring ],
		stamina: 3,
		speed: 1,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		meleeDistance: 1,
		rangedDistance: 0,
		disengage: 1,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-retiarius-signature',
					name: 'Net And Stab',
					description: 'The well-thrown net that follows your main attack leaves your foes right where you want them.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '1 creature',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '2 + M or A damage; A < [weak] slowed (EoT)',
						tier2: '4 + M or A damage; A < [average] slowed (EoT)',
						tier3: '6 + M or A damage; A < [strong] restrained (EoT)'
					})
				})
			})
		]
	};

	static shiningArmor: Kit = {
		id: 'kit-shining-armor',
		name: 'Shining Armor',
		description: 'The Shining Armor kit provides the most protection a kit can afford, providing you with the sword, shield, and armor necessary to play the prototypical knight.',
		type: KitType.Standard,
		armor: [ KitArmor.Heavy, KitArmor.Shield ],
		weapon: [ KitWeapon.Medium ],
		stamina: 12,
		speed: 0,
		stability: 1,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		meleeDistance: 0,
		rangedDistance: 0,
		disengage: 0,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-shining-armor-signature',
					name: 'Protective Attack',
					description: 'The strength of your assault makes it impossible for your foe to ignore you.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '1 creature',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '3 + M or A damage',
						tier2: '7 + M or A damage',
						tier3: '9 + M or A damage'
					}),
					effect: 'The target is taunted (EoT).'
				})
			})
		]
	};

	static sniper: Kit = {
		id: 'kit-sniper',
		name: 'Sniper',
		description: 'The Sniper kit gives you the tools and techniques to take down enemies from afar. This kit can help you become the archer who lurks behind trees or down tunnels, picking off enemies with a bow or crossbow as they approach.',
		type: KitType.Standard,
		armor: [],
		weapon: [ KitWeapon.Bow ],
		stamina: 0,
		speed: 1,
		stability: 0,
		meleeDamage: null,
		rangedDamage: KitLogic.createDamageBonus(0, 0, 4),
		meleeDistance: 0,
		rangedDistance: 10,
		disengage: 1,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-sniper-signature',
					name: 'Patient Shot',
					description: 'Breathe … aim … wait … then strike!',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createRanged(5) ],
					target: '1 creature',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '3 + M or A damage',
						tier2: '6 + M or A damage',
						tier3: '9 + M or A damage'
					}),
					effect: 'If you don’t take a move action this turn, this strike deals extra damage equal to your Might or Agility score (your choice).'
				})
			})
		]
	};

	static spellsword: Kit = {
		id: 'kit-spellsword',
		name: 'Spellsword',
		description: 'The Spellsword kit combines melee attacks and a little bit of magic for warriors who don’t want to have to choose between the incantation and the blade.',
		type: KitType.Standard,
		armor: [ KitArmor.Light, KitArmor.Shield ],
		weapon: [ KitWeapon.Medium ],
		stamina: 6,
		speed: 1,
		stability: 1,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		meleeDistance: 0,
		rangedDistance: 0,
		disengage: 0,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-spellsword-signature',
					name: 'Leaping Lightning',
					description: 'Lightning jumps from your weapon as you strike to harm a nearby foe.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '1 creature or object',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
						tier1: '3 + M, R, I or P lightning damage',
						tier2: '6 + M, R, I or P lightning damage',
						tier3: '9 + M, R, I or P lightning damage'
					}),
					effect: 'A creature or object within 2 squares of your target takes lightning damage equal to the characteristic you used for this ability’s power roll.'
				})
			})
		]
	};

	static stickAndRobe: Kit = {
		id: 'kit-stick-and-robe',
		name: 'Stick And Robe',
		description: 'Armed with a simple reach weapon, often a quarterstaff, heroes using the Stick and Robe kit are highly mobile thanks to their light armor. This allows them to make maximum use of their weapon’s length.',
		type: KitType.Standard,
		armor: [ KitArmor.Light ],
		weapon: [ KitWeapon.Polearm ],
		stamina: 3,
		speed: 2,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(1, 1, 1),
		rangedDamage: null,
		meleeDistance: 1,
		rangedDistance: 0,
		disengage: 1,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-stick-and-robe-signature',
					name: 'Where I Want You',
					description: 'When your stick speaks, your enemy moves.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '1 creature',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '3 + M or A damage',
						tier2: '6 + M or A damage; slide 1',
						tier3: '9 + M or A damage; slide 3'
					})
				})
			})
		]
	};

	static swashbuckler: Kit = {
		id: 'kit-swashbuckler',
		name: 'Swashbuckler',
		description: 'If you want to be mobile and deal a lot of damage with melee attacks, then you should reach for the Swashbuckler kit. This is a great kit for heroes who want to be master duelists.',
		type: KitType.Standard,
		armor: [ KitArmor.Light ],
		weapon: [ KitWeapon.Medium ],
		stamina: 3,
		speed: 3,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		meleeDistance: 0,
		rangedDistance: 0,
		disengage: 1,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-swashbuckler-signature',
					name: 'Fancy Footwork',
					description: 'All combat is a dance—and you’ll be the one leading.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '1 creature',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '3 + M or A damage',
						tier2: '5 + M or A damage; push 1',
						tier3: '8 + M or A damage; push 2'
					}),
					effect: 'You can shift into any square your target leaves after you force move them with this ability.'
				})
			})
		]
	};

	static swordAndBoard: Kit = {
		id: 'kit-sword-and-board',
		name: 'Sword and Board',
		description: 'The Sword and Board kit doesn\'t just give you a shield — it makes the shield part of your offensive arsenal. With a medium weapon in one hand and a block of steel or solid oak in the other, you can protect yourself and control the battlefield.',
		type: KitType.Standard,
		armor: [ KitArmor.Medium, KitArmor.Shield ],
		weapon: [ KitWeapon.Medium ],
		stamina: 9,
		speed: 0,
		stability: 1,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		meleeDistance: 0,
		rangedDistance: 0,
		disengage: 1,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-sword-and-board-signature',
					name: 'Shield Bash',
					description: 'In your hands, a shield isn’t just for protection.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '1 creature',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '2 + M or A damage; push 1',
						tier2: '5 + M or A damage; push 2',
						tier3: '7 + M or A damage; push 3; M < [strong] prone'
					})
				})
			})
		]
	};

	static warriorPriest: Kit = {
		id: 'kit-warrior-priest',
		name: 'Warrior Priest',
		description: 'The Warrior Priest kit imbues the power of the gods into your weapon, making it a smiting instrument. You wade into the fray without fear, thanks to the power of the divine ... and the heavy armor you’re wearing.',
		type: KitType.Standard,
		armor: [ KitArmor.Heavy ],
		weapon: [ KitWeapon.Light ],
		stamina: 9,
		speed: 1,
		stability: 1,
		meleeDamage: KitLogic.createDamageBonus(1, 1, 1),
		rangedDamage: null,
		meleeDistance: 0,
		rangedDistance: 0,
		disengage: 0,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-warrior-priest-signature',
					name: 'Weakening Brand',
					description: '',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '1 creature or object',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
						tier1: '3 + M or A damage; vertical pull 1',
						tier2: '6 + M or A damage; vertical pull 2',
						tier3: '9 + M or A damage; vertical pull 3'
					}),
					effect: 'The target has damage weakness equal to the characteristic score you used on this ability’s power roll (EoT).'
				})
			})
		]
	};

	static whirlwind: Kit = {
		id: 'kit-whirlwind',
		name: 'Whirlwind',
		description: 'The Whirlwind kit makes effective use of whips, granting you mobility, damage, and reach. If you want to be a mobile warrior who uses a chain or whip, then this is the kit for you.',
		type: KitType.Standard,
		armor: [],
		weapon: [ KitWeapon.Whip ],
		stamina: 0,
		speed: 3,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(1, 1, 1),
		rangedDamage: null,
		meleeDistance: 1,
		rangedDistance: 0,
		disengage: 1,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-whirlwind-signature',
					name: 'Extension Of My Arm',
					description: 'When you draw your whip back after an attack, your enemy comes ever closer.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(2) ],
					target: '1 creature',
					cost: 0,
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility ],
						tier1: '3 + M or A damage; vertical pull 1',
						tier2: '6 + M or A damage; vertical pull 2',
						tier3: '9 + M or A damage; vertical pull 3'
					})
				})
			})
		]
	};

	///////////////////////////////////////////////////////////////////////////

	static boren: Kit = {
		id: 'kit-boren',
		name: 'Boren',
		description: 'With this stormwight kit, you channel your primordial rage into the form of a bear, becoming large, durable, and imposing. Boren are tied to the craggy, rocky north, and this aspect is associated with the blizzard’s bitter cold.',
		type: KitType.Stormwight,
		armor: [],
		weapon: [ KitWeapon.Unarmed ],
		stamina: 9,
		speed: 0,
		stability: 2,
		meleeDamage: KitLogic.createDamageBonus(0, 0, 4),
		rangedDamage: null,
		meleeDistance: 0,
		rangedDistance: 0,
		disengage: 0,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-boren-signature',
					name: 'Bear Claws',
					description: 'Attacks with your sharp and deadly claws send your foes staggering back.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Animal, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '2 creatures or objects',
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '2 damage; push 1',
						tier2: '3 damage; push 2',
						tier3: '8 damage; push 3'
					})
				})
			}),
			FeatureLogic.feature.createFeature({
				id: 'kit-boren-feature-1',
				name: 'Aspect Benefits',
				description: `
Whenever you use forced movement to push a creature, you can pull that creature instead. Whenever an attack pulls a creature adjacent to you, you can attempt to grab that creature as a free triggered action.
* **Rage 2**: You gain an edge on Might tests, resistance rolls, and power rolls made to grab.
* **Rage 2**: While in bear form, your attacks deal extra damage equal to your Might score, and any target you have grabbed at the start of your turn takes damage equal to your Might score.
* **Rage 4**: While in bear form, you can use all your abilities, your attacks deal extra damage equal to twice your Might score, instead of once your Might score, and any target you have grabbed at the start of your turn takes damage equal to twice your Might score, instead of once your Might score.
* **Rage 6**: You have a double edge on Might tests, resistance rolls, and power rolls made with the Grab ability.`
			}),
			FeatureLogic.feature.createFeature({
				id: 'kit-boren-feature-2',
				name: 'Animal Form: Bear',
				description: 'When you are in your bear form, your speed increases by 2, your size becomes 2, and you have a +1 reach bonus with melee attacks. You gain 10 temporary Stamina the first time you shapeshift into bear form during an encounter.'
			}),
			FeatureLogic.feature.createFeature({
				id: 'kit-boren-feature-3',
				name: 'Primordial Storm: Blizzard',
				description: 'Your primordial damage type is cold.'
			})
		]
	};

	static corven: Kit = {
		id: 'kit-corven',
		name: 'Corven',
		description: 'With this stormwight kit, you channel your primordial rage into the form of a crow. Corven are tied to the mountain passes and the hot winds that flow through them. This aspect is associated with the katabatic wind.',
		type: KitType.Stormwight,
		armor: [],
		weapon: [ KitWeapon.Unarmed ],
		stamina: 3,
		speed: 3,
		stability: 2,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		meleeDistance: 0,
		rangedDistance: 0,
		disengage: 0,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-corven-signature',
					name: 'Wing Buffet',
					description: 'Foes who try to close around you do so at their peril.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Animal, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '3 creatures or objects',
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '4 damage',
						tier2: '5 damage',
						tier3: '7 damage'
					}),
					effect: 'Resolve each attack individually using one power roll. You can shift 1 square after resolving damage for each target, then choose your next target from your new location.'
				})
			}),
			FeatureLogic.feature.createFeature({
				id: 'kit-boren-feature-1',
				name: 'Aspect Benefits',
				description: `
You gain an edge on tests made to hide and sneak. Whenever you are falling, you can use your Animal Form ability as a free triggered action.
* **Rage 2**: You can shift 1 square as a free maneuver once per turn.
* **Rage 2**: While in crow form, your attacks deal extra damage equal to your Agility score.
* **Rage 2**: Once per turn while in crow form, when you move away from an enemy, that enemy takes damage equal to your Agility score.
* **Rage 4**: While in crow or hybrid crow form, you can use all your abilities, and your attacks deal extra damage equal to twice your Agility score, instead of once your Agility score.
* **Rage 4**: Once per turn while in crow or hybrid crow form, when you move away from an enemy, that enemy takes damage equal to twice your Agility score, instead of once your Agility score.
* **Rage 6**: You can shift up to 2 squares as a free maneuver once per turn.`
			}),
			FeatureLogic.feature.createFeature({
				id: 'kit-boren-feature-2',
				name: 'Animal Form: Crow',
				description: `
When you are in your crow form, your movement gains the Fly keyword, and your size becomes 1T. You can use the Hide maneuver as a free maneuver, and you can use your allies as cover when you hide.
Whenever your rage is 4 or higher, you can shapeshift to become a hybrid bipedal crow of your true form’s size. You gain 10 temporary Stamina the first time you shapeshift into hybrid crow form during an encounter.`
			}),
			FeatureLogic.feature.createFeature({
				id: 'kit-boren-feature-3',
				name: 'Primordial Storm: Katabatic Wind',
				description: 'Your primordial damage type is fire.'
			})
		]
	};

	static raden: Kit = {
		id: 'kit-raden',
		name: 'Raden',
		description: 'With this stormwight kit, you channel your primordial rage into the form of a rat. Raden are associated with the true nature of the rat, before cities became their habitat. Rats are avatars of the balance between green and rot, and this aspect is associated with the rat flood.',
		type: KitType.Stormwight,
		armor: [],
		weapon: [ KitWeapon.Unarmed ],
		stamina: 3,
		speed: 3,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		meleeDistance: 0,
		rangedDistance: 0,
		disengage: 0,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-raden-signature',
					name: 'Driving Pounce',
					description: 'Your enemies try in vain to fall back from your pouncing attack.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Animal, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '2 creatures or objects',
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '4 damage',
						tier2: '5 damage; push 1',
						tier3: '6 damage; push 2'
					}),
					effect: 'Resolve each attack one at a time. After each attack, you can shift the same number of squares that you pushed the target. You select your second target from the square where you end your shift, which can be the first target again.'
				})
			}),
			FeatureLogic.feature.createFeature({
				id: 'kit-boren-feature-1',
				name: 'Aspect Benefits',
				description: `
You gain an edge on tests made to hide and sneak. Additionally, you ignore difficult terrain, and you gain an edge on tests made to climb other creatures. If you are hidden, you automatically achieve a tier 3 result on attempts to climb and remain hidden.
* **Rage 2**: You have Weapon immunity 2.
* **Rage 2**: While in rat form, your attacks deal extra damage equal to your Agility score.
* **Rage 2**: While in rat form, if you attack a creature you are climbing, that creature is bleeding (EoT).
* **Rage 4**: While in rat or hybrid rat form, you can use all your abilities, and your attacks deal extra damage equal to twice your Agility score, instead of once your Agility score.
* **Rage 6**: You have Weapon immunity 2. Any damage you ignore because of this immunity is dealt to each enemy adjacent to you when you are attacked.`
			}),
			FeatureLogic.feature.createFeature({
				id: 'kit-boren-feature-2',
				name: 'Animal Form: Rat',
				description: `
When you are in your rat form, your movement gains the Climb keyword, and your size becomes 1T. You can use the Hide maneuver as a free maneuver, and you can use your allies as cover when hiding. You can stay hidden while moving through squares occupied by a creature.
Whenever your rage is 4 or higher, you can shapeshift to become a hybrid bipedal rat of your true form’s size. You gain 10 temporary Stamina the first time you shapeshift into hybrid rat form during an encounter.`
			}),
			FeatureLogic.feature.createFeature({
				id: 'kit-boren-feature-3',
				name: 'Primordial Storm: Rat Flood',
				description: 'Your primordial damage type is corruption.'
			})
		]
	};

	static vuken: Kit = {
		id: 'kit-vuken',
		name: 'Vuken',
		description: 'With this stormwight kit, you channel your primordial rage into the form of a wolf. Vuken are tied to forests and open steppes, and this aspect is associated with the thunderstorm.',
		type: KitType.Stormwight,
		armor: [],
		weapon: [ KitWeapon.Unarmed ],
		stamina: 9,
		speed: 2,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		meleeDistance: 0,
		rangedDistance: 0,
		disengage: 0,
		features: [
			FeatureLogic.feature.createAbilityFeature({
				ability: AbilityLogic.createAbility({
					id: 'kit-vuken-signature',
					name: 'Probing Attack',
					description: 'A savage assault forces your foes back.',
					type: AbilityLogic.type.createAction(),
					keywords: [ AbilityKeyword.Animal, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ AbilityLogic.distance.createMelee(1) ],
					target: '1 creature or object',
					powerRoll: AbilityLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '5 damage',
						tier2: '9 damage; push 1',
						tier3: '12 damage; push 2; prone if the target is your size or smaller'
					}),
					effect: 'You can shift up to 2 squares as long as you end the shift adjacent to the target.'
				})
			}),
			FeatureLogic.feature.createFeature({
				id: 'kit-boren-feature-1',
				name: 'Aspect Benefits',
				description: `
You and an ally gain the benefits of flanking whenever you are both adjacent to a target. If you and at least two other allies are all adjacent to a target, each of you has a double edge for flanking.
* **Rage 2**: You gain an edge on Agility tests and resistance rolls.
* **Rage 2**: While in wolf form, your attacks deal extra damage equal to your Agility score.
* **Rage 2**: When you attack a target while in wolf form, the next ally to damage that target before the start of your next turn deals extra damage equal to your Agility score.
* **Rage 4**: While in wolf or hybrid wolf form, you can use all your abilities, and your attacks deal extra damage equal to twice your Agility score, instead of once your Agility score.
* **Rage 4**: When you attack a target while in wolf or hybrid wolf form, the next ally to damage that target before the start of your next turn deals extra damage equal to twice your Agility score, instead of once your Agility score.
* **Rage 6**: You have a double edge on Agility tests and resistance rolls.`
			}),
			FeatureLogic.feature.createFeature({
				id: 'kit-boren-feature-2',
				name: 'Animal Form: Wolf',
				description: `
When you are in your wolf form, your speed increases by 2, you ignore difficult terrain, and your size becomes 1M.
Whenever your rage is 4 or higher, you can shapeshift to become a hybrid bipedal wolf of your true form’s size. You gain 10 temporary Stamina the first time you shapeshift into hybrid wolf form during an encounter.`
			}),
			FeatureLogic.feature.createFeature({
				id: 'kit-boren-feature-3',
				name: 'Primordial Storm: Lightning Storm',
				description: 'Your primordial damage type is lightning.'
			})
		]
	};
}
