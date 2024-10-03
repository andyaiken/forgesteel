import { KitArmor, KitImplement, KitType, KitWeapon } from '../enums/kit';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityLogic } from '../logic/ability-logic';
import { CampaignSetting } from '../models/campaign-setting';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { FeatureLogic } from '../logic/feature-logic';
import { Kit } from '../models/kit';
import { KitLogic } from '../logic/kit-logic';

export class KitData {
	static cloakAndDagger: Kit = {
		id: 'kit-cloak-and-dagger',
		name: 'Cloak and Dagger',
		description: 'Providing throwable light weapons and light armor easily concealed by a cloak to confuse your enemies, the Cloak and Dagger kit makes you more mobile while providing a boost to your effectiveness at range and to your damage. This kit is good for a hero who wants to be able to move all over the battlefield while keeping their options open for using short-range attacks.',
		type: KitType.Martial,
		armor: [ KitArmor.Light ],
		weapon: [ KitWeapon.Light ],
		implement: [],
		stamina: 3,
		speed: 2,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(1, 1, 1),
		rangedDamage: KitLogic.createDamageBonus(1, 1, 1),
		magicalDamage: null,
		distance: 5,
		reach: 0,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-cloak-and-dagger-signature',
				name: 'Fade',
				description: 'A stab, and a few quick, careful steps back.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
				distance: [
					AbilityLogic.createDistance({
						type: AbilityDistanceType.Reach,
						value: 1
					}),
					AbilityLogic.createDistance({
						type: AbilityDistanceType.Ranged,
						value: 5
					})
				],
				target: '1 creature',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '3 damage; you shift 1 square',
					tier2: '8 damage; you shift 2 squares',
					tier3: '12 damage; you shift 3 squares'
				})
			})
		],
		features: []
	};

	static guisarmier: Kit = {
		id: 'kit-guisarmier',
		name: 'Guisarmier',
		description: 'The Guisarmier kit is for those who want to use a polearm for extended reach and still gain the extra protection of armor. This is the kit that allows you to become the ultimate halberd, longspear, or glaive fighter.',
		type: KitType.Martial,
		armor: [ KitArmor.Medium ],
		weapon: [ KitWeapon.Polearm ],
		implement: [],
		stamina: 6,
		speed: 0,
		stability: 1,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		magicalDamage: null,
		distance: 0,
		reach: 1,
		area: 0,
		mobility: false,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-guisarmier-signature',
				name: 'Forward Thrust, Backward Smash',
				description: 'In your hands, the haft is as good as the head.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
				target: '2 creatures or objects',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '2 damage',
					tier2: '4 damage',
					tier3: '6 damage'
				})
			})
		],
		features: []
	};

	static martialArtist: Kit = {
		id: 'kit-martial-artist',
		name: 'Martial Artist',
		description: 'If you want to be fast in a fight, then Martial Artist is the kit for you. Unencumbered by weapons or armor, this fighting style rewards quick, focused unarmed strikes to opponents, and allows you to be the ultimate skirmisher.',
		type: KitType.Martial,
		armor: [],
		weapon: [ KitWeapon.Unarmed ],
		implement: [],
		stamina: 3,
		speed: 3,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		magicalDamage: null,
		distance: 0,
		reach: 0,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-martial-artist-signature',
				name: 'Battle Grace',
				description: 'You feint to move your enemies into perfect position.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
				target: '1 creature',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '3 damage',
					tier2: '7 damage; you swap places with the target',
					tier3: '10 damage; you swap places with the target, then slide the target two squares'
				}),
				effect: 'If you roll a 12 or better and can’t swap places with the target because one or both of you is too big to fit into the swapped space, you both remain in your original spaces and the target takes 2 extra damage.'
			})
		],
		features: []
	};

	static mountain: Kit = {
		id: 'kit-mountain',
		name: 'Mountain',
		description: 'The Mountain kit does exactly what it says on the tin. You don heavy armor and a heavy weapon to stand strong against your foes, quickly demolishing them when it’s your turn to attack.',
		type: KitType.Martial,
		armor: [ KitArmor.Heavy ],
		weapon: [ KitWeapon.Heavy ],
		implement: [],
		stamina: 9,
		speed: 0,
		stability: 2,
		meleeDamage: KitLogic.createDamageBonus(0, 0, 4),
		rangedDamage: null,
		magicalDamage: null,
		distance: 0,
		reach: 0,
		area: 0,
		mobility: false,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-mountain-signature',
				name: 'Pain For Pain',
				description: 'An enemy who tagged you will pay for that.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
				target: '1 creature',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '3 damage',
					tier2: '8 damage',
					tier3: '12 damage'
				}),
				effect: 'If the target dealt damage to you since the end of your last turn, this attack gains an edge.'
			})
		],
		features: []
	};

	static panther: Kit = {
		id: 'kit-panther',
		name: 'Panther',
		description: 'If you want a good balance of protection, speed, and damage, the Panther kit is for you. This kit increases your Stamina not by wearing armor, but through the focused battle preparation of body and mind, letting you be fast and mobile while swinging a heavy weapon at your foes.',
		type: KitType.Martial,
		armor: [],
		weapon: [ KitWeapon.Heavy ],
		implement: [],
		stamina: 6,
		speed: 1,
		stability: 1,
		meleeDamage: KitLogic.createDamageBonus(0, 0, 4),
		rangedDamage: null,
		magicalDamage: null,
		distance: 0,
		reach: 0,
		area: 0,
		mobility: false,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-panther-signature',
				name: 'Devastating Rush',
				description: 'The faster you move, the harder you hit.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
				target: '1 creature or object',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '3 damage',
					tier2: '8 damage',
					tier3: '12 damage'
				}),
				effect: 'You can move up to 3 squares straight toward the target before this attack. You deal extra damage equal to the distance moved this way.'
			})
		],
		features: []
	};

	static pugilist: Kit = {
		id: 'kit-pugilist',
		name: 'Pugilist',
		description: 'Meant for brawlers and boxers, the Pugilist kit gives you access to a melee fighting style that gives you a boost to Stamina and damage while allowing you to float like a butterfly. If you want to be a tough, strong hero who doles out punishment with your fists, then this kit is for you.',
		type: KitType.Martial,
		armor: [],
		weapon: [ KitWeapon.Unarmed ],
		implement: [],
		stamina: 6,
		speed: 2,
		stability: 1,
		meleeDamage: KitLogic.createDamageBonus(1, 1, 1),
		rangedDamage: null,
		magicalDamage: null,
		distance: 0,
		reach: 0,
		area: 0,
		mobility: false,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-pugilist-signature',
				name: 'Let’s Dance',
				description: 'Keeping your enemies stumbling around the battlefield is second nature to you.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
				target: '1 creature',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '3 damage',
					tier2: '8 damage; slide 1',
					tier3: '12 damage; slide 2'
				}),
				effect: 'You can shift into any square your target leaves after you slide them.'
			})
		],
		features: []
	};

	static raider: Kit = {
		id: 'kit-raider',
		name: 'Raider',
		description: 'The Raider kit keeps you protected while granting you full mobility, providing a boost to speed and distance that lets you run around the battlefield like a Viking warrior.',
		type: KitType.Martial,
		armor: [ KitArmor.Medium, KitArmor.Shield ],
		weapon: [ KitWeapon.Light ],
		implement: [],
		stamina: 9,
		speed: 1,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(1, 1, 1),
		rangedDamage: null,
		magicalDamage: null,
		distance: 5,
		reach: 0,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-raider-signature',
				name: 'Shield Bash',
				description: 'In your hands, a shield isn’t just for protection.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
				target: '1 creature',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '3 damage; push 1',
					tier2: '7 damage; push 2',
					tier3: '10 damage; push 3; prone if the target is your size or smaller'
				})
			})
		],
		features: []
	};

	static ranger: Kit = {
		id: 'kit-ranger',
		name: 'Ranger',
		description: 'The Ranger kit outfits you with light armor and several weapons, letting you easily switch between using a melee weapon and a bow. This kit provides a good balance of bonuses to Stamina, speed, damage, and range to create a hero who is a jack-of-all-trades.',
		type: KitType.Martial,
		armor: [ KitArmor.Medium ],
		weapon: [ KitWeapon.Medium, KitWeapon.Bow ],
		implement: [],
		stamina: 6,
		speed: 1,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(1, 1, 1),
		rangedDamage: KitLogic.createDamageBonus(1, 1, 1),
		magicalDamage: null,
		distance: 5,
		reach: 0,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-ranger-signature',
				name: 'Hamstring Shot',
				description: 'A well-placed shot leaves your enemy struggling to move.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
				target: '1 creature',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '2 damage',
					tier2: '6 damage; slowed (EoT)',
					tier3: '9 damage; slowed (EoE)'
				})
			})
		],
		features: []
	};

	static rapidFire: Kit = {
		id: 'kit-rapid-fire',
		name: 'Rapid Fire',
		description: 'The Rapid-Fire kit is for archers who want to deal maximum damage by shooting as many arrows as possible into nearby enemies. With this kit, your fighting technique focuses on peppering foes at medium range.',
		type: KitType.Martial,
		armor: [ KitArmor.Light ],
		weapon: [ KitWeapon.Bow ],
		implement: [],
		stamina: 3,
		speed: 1,
		stability: 0,
		meleeDamage: null,
		rangedDamage: KitLogic.createDamageBonus(2, 2, 2),
		magicalDamage: null,
		distance: 7,
		reach: 0,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-rapid-fire-signature',
				name: 'Two Shot',
				description: 'When you fire two arrows back to back, both hit their mark.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
				target: '2 creatures or objects',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '2 damage',
					tier2: '4 damage',
					tier3: '5 damage'
				})
			})
		],
		features: []
	};

	static retiarius: Kit = {
		id: 'kit-retiarius',
		name: 'Retiarius',
		description: 'The retiarius is often depicted as a lightly armored warrior with a net in one hand and a trident in the other, and this kit gives you the equipment and fighting technique to make that happen. Tie up your foe with a net and then poke them to death!',
		type: KitType.Martial,
		armor: [ KitArmor.Light ],
		weapon: [ KitWeapon.Polearm, KitWeapon.Ensnaring ],
		implement: [],
		stamina: 3,
		speed: 1,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		magicalDamage: null,
		distance: 0,
		reach: 1,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-retiarius-signature',
				name: 'Net And Stab',
				description: 'The well-thrown net that follows your main attack leaves your foes right where you want them.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
				target: '1 creature',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '2 damage',
					tier2: '5 damage; slowed (EoT)',
					tier3: '8 damage; restrained (EoT)'
				})
			})
		],
		features: []
	};

	static shiningArmor: Kit = {
		id: 'kit-shining-armor',
		name: 'Shining Armor',
		description: 'The Shining Armor kit provides the most protection a kit can afford, providing you with the sword, shield, and armor necessary to play the prototypical knight.',
		type: KitType.Martial,
		armor: [ KitArmor.Heavy, KitArmor.Shield ],
		weapon: [ KitWeapon.Medium ],
		implement: [],
		stamina: 12,
		speed: 0,
		stability: 1,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		magicalDamage: null,
		distance: 0,
		reach: 0,
		area: 0,
		mobility: false,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-shining-armor-signature',
				name: 'Protective Attack',
				description: 'The strength of your assault makes it impossible for your foe to ignore you.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
				target: '1 creature',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '3 damage; taunted (EoT)',
					tier2: '7 damage; taunted (EoT)',
					tier3: '10 damage; taunted (EoT)'
				})
			})
		],
		features: []
	};

	static sniper: Kit = {
		id: 'kit-sniper',
		name: 'Sniper',
		description: 'The Sniper kit gives you the tools and techniques to take down enemies from afar. This kit can help you become the archer who lurks behind trees or down tunnels, picking off enemies with a bow or crossbow as they approach.',
		type: KitType.Martial,
		armor: [],
		weapon: [ KitWeapon.Bow ],
		implement: [],
		stamina: 0,
		speed: 1,
		stability: 0,
		meleeDamage: null,
		rangedDamage: KitLogic.createDamageBonus(0, 0, 4),
		magicalDamage: null,
		distance: 10,
		reach: 0,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-sniper-signature',
				name: 'Patient Shot',
				description: 'Breathe … aim … wait… then strike!',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
				target: '1 creature',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '3 damage',
					tier2: '7 damage',
					tier3: '10 damage'
				}),
				effect: 'If you don’t take a move action this turn, you gain an edge on this attack.'
			})
		],
		features: []
	};

	static stickAndRobe: Kit = {
		id: 'kit-stick-and-robe',
		name: 'Stick And Robe',
		description: 'Armed with a simple reach weapon, often a quarterstaff, heroes using the Stick and Robe kit are highly mobile thanks to their light armor. This allows them to make maximum use of their weapon’s length.',
		type: KitType.Martial,
		armor: [ KitArmor.Light ],
		weapon: [ KitWeapon.Polearm ],
		implement: [],
		stamina: 3,
		speed: 2,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(1, 1, 1),
		rangedDamage: null,
		magicalDamage: null,
		distance: 0,
		reach: 1,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-stick-and-robe-signature',
				name: 'Where I Want You',
				description: 'When your stick speaks, your enemy moves.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
				target: '1 creature',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '3 damage',
					tier2: '7 damage; slide 1',
					tier3: '10 damage; slide 3'
				})
			})
		],
		features: []
	};

	static swashbuckler: Kit = {
		id: 'kit-swashbuckler',
		name: 'Swashbuckler',
		description: 'If you want to be mobile and deal a lot of damage with melee attacks, then you should reach for the Swashbuckler kit. This is a great kit for heroes who want to be master duelists.',
		type: KitType.Martial,
		armor: [ KitArmor.Light ],
		weapon: [ KitWeapon.Medium ],
		implement: [],
		stamina: 3,
		speed: 3,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
		rangedDamage: null,
		magicalDamage: null,
		distance: 0,
		reach: 0,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-swashbuckler-signature',
				name: 'Fancy Footwork',
				description: 'All combat is a dance—and you’ll be the one leading.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
				target: '1 creature',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '3 damage',
					tier2: '8 damage; push 1',
					tier3: '12 damage; push 2'
				}),
				effect: 'You can shift into any square your target leaves after you force move them with this ability.'
			})
		],
		features: []
	};

	static whirlwind: Kit = {
		id: 'kit-whirlwind',
		name: 'Whirlwind',
		description: 'The Whirlwind kit makes effective use of whips, granting you mobility, damage, and reach. If you want to be a mobile warrior who uses a chain or whip, then this is the kit for you.',
		type: KitType.Martial,
		armor: [],
		weapon: [ KitWeapon.Whip ],
		implement: [],
		stamina: 0,
		speed: 3,
		stability: 0,
		meleeDamage: KitLogic.createDamageBonus(1, 1, 1),
		rangedDamage: null,
		magicalDamage: null,
		distance: 0,
		reach: 1,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-whirlwind-signature',
				name: 'Extension Of My Arm',
				description: 'When you draw your whip back after an attack, your enemy comes ever closer.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 2 }) ],
				target: '1 creature',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '3 damage',
					tier2: '7 damage; pull 1',
					tier3: '10 damage; pull 2'
				})
			})
		],
		features: []
	};

	static bloodpact: Kit = {
		id: 'kit-bloodpact',
		name: 'Bloodpact',
		description: 'Sometimes you need a direct line to your heart to get the most of your magic. The Bloodpact kit trades your blood or lifeforce for more power and heightened casting. With careful control of your natural resources (or borrowing someone else’s), you can take care of business before succumbing to your own hubris. While using this kit, the smell of blood becomes super intense to your senses.',
		type: KitType.Caster,
		armor: [],
		weapon: [],
		implement: [ KitImplement.Metal ],
		stamina: 6,
		speed: 0,
		stability: 0,
		meleeDamage: null,
		rangedDamage: null,
		magicalDamage: KitLogic.createDamageBonus(2, 2, 2),
		distance: 5,
		reach: 0,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-bloodpact-signature',
				name: 'Drain',
				description: 'You drain the energy from your target and revitalize your senses.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Melee ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
				target: '1 creature',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '3 corruption damage',
					tier2: '8 corruption damage',
					tier3: '12 corruption damage; you can spend 1 Recovery to regain Stamina'
				})
			})
		],
		features: [
			FeatureLogic.createFeature({
				id: 'kit-bloodpact-ward',
				name: 'Blood Ward',
				description: 'The blood ward is a large projection of your heart that magnifies the sound of your heartbeat. Whenever an ability lets you spend a Recovery, you can forgo regaining Stamina to instead increase your speed by 2 and have your abilities deal 2 extra corruption damage until the end of the encounter instead.'
			})
		]
	};

	static dancer: Kit = {
		id: 'kit-dancer',
		name: 'Dancer',
		description: 'The Dancer kit forgoes nearly all equipment in exchange for speed, letting you rely purely on kinetic energy to channel your power. The more you move, the more others may want to move with you. Select this kit when your party regularly needs to close the distance on your enemies. While you use this kit, your heartbeat becomes an audible metronome.',
		type: KitType.Caster,
		armor: [],
		weapon: [],
		implement: [ KitImplement.Glass ],
		stamina: 0,
		speed: 2,
		stability: 0,
		meleeDamage: null,
		rangedDamage: null,
		magicalDamage: KitLogic.createDamageBonus(0, 1, 2),
		distance: 0,
		reach: 0,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-dancer-signature',
				name: 'Tarantella Volley',
				description: 'Visible energy sparks off you to wash across a nearby foe, who you invite to dance with you.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Melee ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 2 }) ],
				target: '1 creature or object',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Agility, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '2 damage',
					tier2: '6 damage; you swap places with the target',
					tier3: '9 damage; you swap places with the target, and a hero within distance can shift up to 2 squares'
				}),
				effect: 'If you roll a 12 or better and can’t swap places with the target because one or both of you is too big to fit into the swapped space, you both remain in your original spaces and the target takes 2 extra damage.'
			})
		],
		features: [
			FeatureLogic.createFeature({
				id: 'kit-dancer-ward',
				name: 'Walzing Ward',
				description: `
Your ward surrounds you with a soft, enchanting melody whose volume you control, and grants you the following benefits:
• Whenever an enemy ends their turn adjacent to you, you can shift 2 squares as a free triggered action.
• Whenever a creature damages you with a melee ability, you can slide them a number of squares equal to your highest characteristic score.`
			})
		]
	};

	static frigid: Kit = {
		id: 'kit-frigid',
		name: 'Frigid',
		description: 'The Frigid kit is for heroes who want to tap into the power of arcane blizzards and magical cold. Armed only with an implement of crystal, you can create bursts of ice and protect yourself with frigid winds. When you meditate to prepare this kit, others notice the area around you becoming slightly cooler.',
		type: KitType.Caster,
		armor: [],
		weapon: [],
		implement: [ KitImplement.Crystal ],
		stamina: 3,
		speed: 0,
		stability: 0,
		meleeDamage: null,
		rangedDamage: null,
		magicalDamage: null,
		distance: 7,
		reach: 0,
		area: 1,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-frigid-signature',
				name: 'Frozen Explosion',
				description: 'You unleash a blast of frigid air to freeze and hinder your foes.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Cube, value: 2, within: 5 }) ],
				target: 'All enemies',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '2 cold damage',
					tier2: '3 cold damage; slowed (EoT)',
					tier3: '4 cold damage; slowed (EoE)'
				})
			})
		],
		features: [
			FeatureLogic.createFeature({
				id: 'kit-frigid-ward',
				name: 'Ice Armor',
				description: `
Your ward covers your body in ice, and grants you the following benefits:
• You have cold immunity and fire immunity equal to your highest characteristic score.
• When a creature damages you with a melee ability, they take cold damage equal to your highest characteristic score.`
			})
		]
	};

	static meditator: Kit = {
		id: 'kit-meditator',
		name: 'Meditator',
		description: 'The Meditator kit allows you to wield magic hardened by experience and isolation. Your spirit visibly extends beyond your physical form in the form of moss, spores, and pulsing aura of light. While using this kit, you tend to skip meals and ignore inclement weather.',
		type: KitType.Caster,
		armor: [ KitArmor.Light ],
		weapon: [],
		implement: [ KitImplement.Bone ],
		stamina: 6,
		speed: 1,
		stability: 0,
		meleeDamage: null,
		rangedDamage: null,
		magicalDamage: null,
		distance: 0,
		reach: 0,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-meditator-signature',
				name: 'Bountiful Decay',
				description: 'Your curse causes a foe’s flesh to rot off as spores that aid your allies.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
				target: '1 creature',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '2 corruption damage; a hero within distance can make a resistance roll to end an effect',
					tier2: '6 corruption damage; a hero within distance can make a resistance roll to end an effect',
					tier3: '9 corruption damage; a hero within distance who is affected by an “(EoT)” or “(resistance ends)” effect has the effect end'
				})
			})
		],
		features: [
			FeatureLogic.createFeature({
				id: 'kit-meditator-ward',
				name: 'Spirit Ward',
				description: `
Your spirit overflows and warms the area around you. It grants you the following benefits:
• You gain an edge on resistance rolls.
• Whenever an enemy damages you with a melee ability, you deal corruption damage to that enemy equal to your highest characteristic score.`
			})
		]
	};

	static missile: Kit = {
		id: 'kit-missile',
		name: 'Missile',
		description: 'The Missile kit allows you to throw your implement at your foes, then recall it back to you. Enemies impacted by this concentration of magic are left reeling while you stand safely out of their reach. When you use this kit, your competitive nature is more pronounced, and you wield your implement recklessly.',
		type: KitType.Caster,
		armor: [],
		weapon: [],
		implement: [ KitImplement.Wood ],
		stamina: 0,
		speed: 0,
		stability: 0,
		meleeDamage: null,
		rangedDamage: null,
		magicalDamage: KitLogic.createDamageBonus(0, 1, 2),
		distance: 10,
		reach: 0,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-missile-signature',
				name: 'Spike!',
				description: 'You lob your implement at high speed toward your opponent, unleashing a chaotic flare of magic.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
				target: '1 creature or object',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '2 fire damage',
					tier2: '7 cold damage',
					tier3: '9 lightning damage'
				}),
				effect: 'If your Magic Eye Ward is locked onto the target, you can target them with this ability regardless of the distance as long as you have line of effect to them, and this ability deals additional damage equal to your highest characteristic.'
			})
		],
		features: [
			FeatureLogic.createFeature({
				id: 'kit-missile-ward',
				name: 'Magic Eye Ward',
				description: `
Your ward wraps itself around your head and shields your eyes, granting you the following benefits:
• You have Ranged immunity equal to your highest characteristic score.
• Whenever an enemy within 15 squares of you damages you with a ranged ability, your ward locks onto them until the end of the encounter.`
			})
		]
	};

	static natureCalling: Kit = {
		id: 'kit-nature-calling',
		name: 'Nature Calling',
		description: 'The Nature Calling kit allows you to tap into the magical forces of nature. You wield an implement of stone so that your feet stand firm on the earth and your magic can be carried by the wind. While using this kit, you can faintly hear the whispers of the land around you.',
		type: KitType.Caster,
		armor: [],
		weapon: [],
		implement: [ KitImplement.Stone ],
		stamina: 0,
		speed: 0,
		stability: 2,
		meleeDamage: null,
		rangedDamage: null,
		magicalDamage: null,
		distance: 7,
		reach: 0,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-nature-calling-signature',
				name: 'Lightning Spark',
				description: 'You call forth a small bolt of lightning, then hurl it at your foe.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
				target: '1 creature or object',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '2 lightning damage',
					tier2: '6 damage; the target takes a bane on their next power roll',
					tier3: '9 damage; the target has a double bane on their next power roll'
				})
			})
		],
		features: [
			FeatureLogic.createFeature({
				id: 'kit-nature-calling-ward',
				name: 'Vine Ward',
				description: `
Your ward surrounds you with protective animal spirits, and grants you the following benefits:
• The area within 2 squares of you is difficult terrain for your enemies.
• Whenever an enemy within 12 squares of you damages you with a ranged ability, you can either shift towards them or pull them a number of squares equal to your highest characteristic score.`
			})
		]
	};

	static rook: Kit = {
		id: 'kit-rook',
		name: 'Rook',
		description: 'The Rook kit allows you to use strong armor so you can be better protected while you heal and enhance your allies on the frontline. Heroes with this kit often dive into support magic. While using this kit, your armor resonates with the sounds of choirs from on high as you polish it.',
		type: KitType.Caster,
		armor: [ KitArmor.Heavy ],
		weapon: [],
		implement: [ KitImplement.Bone ],
		stamina: 12,
		speed: 0,
		stability: 0,
		meleeDamage: null,
		rangedDamage: null,
		magicalDamage: null,
		distance: 0,
		reach: 0,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-rook-signature',
				name: 'Blessed Light',
				description: 'Burning radiance falls upon your foe, outlining them with a holy glow.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
				target: '1 creature or object',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '2 holy damage; the next attack against the target has an edge',
					tier2: '6 holy damage; the next attack against the target has an edge',
					tier3: '9 holy damage; the next attack against the target has a double edge'
				})
			})
		],
		features: [
			FeatureLogic.createFeature({
				id: 'kit-rook-ward',
				name: 'Castle Guard',
				description: `
Your armor is reinforced by a bright ward of holy energy, and grants you the following benefits:
• Allies within 2 squares of you have their stability increased by 1.
• Whenever an enemy damages you with a melee ability, you or an ally within 2 can shift 2 as a free triggered action.`
			})
		]
	};

	static spellslinger: Kit = {
		id: 'kit-spellslinger',
		name: 'Spellslinger',
		description: 'The Spellslinger kit is for those who want to focus magic on their foes from far away, becoming a magical blaster surrounded by rippling energy. While using this kit, you can faintly see auras of energy emanating from far-off creatures.',
		type: KitType.Caster,
		armor: [],
		weapon: [],
		implement: [ KitImplement.Metal ],
		stamina: 0,
		speed: 1,
		stability: 0,
		meleeDamage: null,
		rangedDamage: null,
		magicalDamage: KitLogic.createDamageBonus(1, 1, 1),
		distance: 5,
		reach: 0,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-spellslinger-signature',
				name: 'Split Beam',
				description: 'Two beams of supernatural force lance out at your command.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
				target: '2 creatures or objects',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '2 damage',
					tier2: '4 damage',
					tier3: '5 damage'
				})
			})
		],
		features: [
			FeatureLogic.createFeature({
				id: 'kit-spellslinger-ward',
				name: 'Invigorating Ward',
				description: 'Your ward surrounds you with crackling energy. Whenever you take damage, you gain a bonus to damage equal to your highest characteristic score, which you apply to the next damage-dealing magic ability you use before the end of the encounter. This benefit is cumulative, so that you can accrue bonus damage multiple times, then expend it all on one use of an ability.'
			})
		]
	};

	static wardWeaver: Kit = {
		id: 'kit-ward-weaver',
		name: 'Ward Weaver',
		description: 'The Ward Weaver kit allows you to protect yourself in combat with telekinetic techniques that also boost your damage. This kit creates a supernatural hero who can more effectively ward themself and their allies. While you use this kit, you occasionally take on the mannerisms of your allies without realizing it.',
		type: KitType.Caster,
		armor: [],
		weapon: [],
		implement: [ KitImplement.Bone ],
		stamina: 6,
		speed: 0,
		stability: 1,
		meleeDamage: null,
		rangedDamage: null,
		magicalDamage: null,
		distance: 5,
		reach: 0,
		area: 0,
		mobility: true,
		abilities: [
			AbilityLogic.createAbility({
				id: 'kit-ward-weaver-signature',
				name: 'Energy Siphon',
				description: 'Absorbing psychic energy from another creature lets you shield yourself within it.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
				target: '1 creature',
				cost: 0,
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Intuition ],
					tier1: '2 psychic damage; you gain damage immunity 1 until the end of your next turn',
					tier2: '6 psychic damage; you gain damage immunity 3 until the end of your next turn',
					tier3: '9 psychic damage; you gain damage immunity 5 until the end of your next turn'
				})
			})
		],
		features: [
			FeatureLogic.createFeature({
				id: 'kit-ward-weaver-ward',
				name: 'Repulsive Ward',
				description: 'You have an invisible ward of magical force that extends 2 squares from you in all directions. When you or an ally within the area of your ward take damage from another creature’s melee ability, you can push that creature a number of squares equal to your highest characteristic score.'
			})
		]
	};

	static getKits = (settings: CampaignSetting[]) => {
		const list: Kit[] = [];

		settings.forEach(setting => {
			list.push(...setting.kits);
		});

		return Collections.sort(list, item => item.name);
	};
}
