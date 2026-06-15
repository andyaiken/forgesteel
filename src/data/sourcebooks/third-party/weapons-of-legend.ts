import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { ItemType } from '@/enums/item-type';
import { KitWeapon } from '@/enums/kit-weapon';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

const amzysTrophy = FactoryLogic.createItem({
	id: 'item-amzys-trophy',
	name: 'Amzy’s Trophy',
	description: `
*From [Weapons of Legend](https://www.drivethrurpg.com/en/product/530513/weapons-of-legend-powered-by-draw-steel)*

Swift to strike and pure of heart, the wielder of Amzy’s Trophy is a shimmering force of protection for their allies.`,
	type: ItemType.LeveledWeapon,
	keywords: [ KitWeapon.Light, AbilityKeyword.Magic ],
	crafting: FactoryLogic.createProject({
		prerequisites: 'A unicorn’s horn',
		source: 'Texts or lore in Yllyric or Kheltivari',
		characteristic: [ Characteristic.Agility, Characteristic.Presence ],
		goal: 450
	}),
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'item-amzys-trophy-1',
					name: 'Level 1',
					description: 'Any weapon ability that deals rolled damage using this weapon that obtains a tier 3 outcome gains a +1 damage bonus, and you gain 5 temporary Stamina. While you have this stamina, you faintly radiate celestial light.'
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'item-amzys-trophy-5',
					name: 'Level 5',
					description: 'The weapon’s damage bonus increases to +3. The temporary Stamina increases to 10, and now affects you and 1 ally within 5 squares.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'item-amzys-trophy-9',
					name: 'Level 9',
					description: 'Any weapon ability that deals rolled damage using this weapon ignores damage immunity. The weapon’s damage bonus increases to +5. The temporary Stamina increases to 15, and now affects you and all allies within 5 squares.'
				})
			]
		}
	]
});

const beast = FactoryLogic.createItem({
	id: 'item-beast',
	name: 'Beast',
	description: `
*From [Weapons of Legend](https://www.drivethrurpg.com/en/product/530513/weapons-of-legend-powered-by-draw-steel)*

While the creature was greatly feared in life, the weapon fashioned from its skull is even more frightening in the right hands.`,
	type: ItemType.LeveledWeapon,
	keywords: [ KitWeapon.Heavy, AbilityKeyword.Psionic ],
	crafting: FactoryLogic.createProject({
		prerequisites: 'The skull of a beast that hunts humanoids',
		source: 'Texts or lore in Khamish',
		characteristic: [ Characteristic.Might, Characteristic.Intuition, Characteristic.Presence ],
		goal: 450
	}),
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'item-beast-1',
					name: 'Level 1',
					description: 'Any weapon ability that deals rolled damage using this weapon deals an extra 1 cold damage. Additionally, whenever you make a strike using this weapon, if the target has M < [average], they are bleeding (save ends).'
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'item-beast-5',
					name: 'Level 5',
					description: 'The weapon’s extra cold damage increases to 2. A creature that is bleeding is also weakened (the weakened condition ends when the bleeding condition ends). Additionally, as a maneuver you can cause the Beast to emit a roar. All enemies within 5 squares that have P < [average] are frightened (save ends). Once you use this maneuver, you can’t use it again until you earn a Victory.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'item-beast-9',
					name: 'Level 9',
					description: 'The weapon’s extra cold damage increases to 3. Additionally, the weapon inflicts bleeding if the target has M < [strong] instead. A creature that is bleeding is also weakened and frightened (all three conditions end when the bleeding condition ends).'
				})
			]
		}
	]
});

const bladeOfEquinox = FactoryLogic.createItem({
	id: 'item-blade-of-equinox',
	name: 'Blade of Equinox',
	description: `
*From [Weapons of Legend](https://www.drivethrurpg.com/en/product/530513/weapons-of-legend-powered-by-draw-steel)*

Strike with the shadows, from the shadows, for the shadows.`,
	type: ItemType.LeveledWeapon,
	keywords: [ AbilityKeyword.Magic, KitWeapon.Medium ],
	crafting: FactoryLogic.createProject({
		prerequisites: 'An ingot of lonnar, the fade-metal',
		source: 'Texts or lore in Illyvric',
		characteristic: [ Characteristic.Agility, Characteristic.Presence ],
		goal: 450
	}),
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'item-blade-of-equinox-1',
					name: 'Level 1',
					description: 'Any weapon ability that deals rolled damage using this weapon deals an extra 1 corruption damage, or an extra 2 corruption damage if you are concealed. Additionally, if you start your turn concealed, your speed increases by 1.'
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'item-blade-of-equinox-5',
					name: 'Level 5',
					description: 'The weapon’s corruption damage increases to 2, or to 4 if you are concealed. Additionally, if you start your turn concealed, you can move through an enemy’s space at normal speed. An enemy takes corruption damage equal to your highest attribute the first time you pass through them on a turn.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'item-blade-of-equinox-9',
					name: 'Level 9',
					description: 'The weapon’s corruption damage increases to 3, or to 6 if you are concealed. Additionally, if you start your turn concealed, creatures can’t make opportunity attacks against you during your movement. When an enemy takes corruption damage from you moving through them, you can spend surges to increase that damage. The first time you pass through an enemy on a turn, you gain a surge.'
				})
			]
		}
	]
});

const bloodcaster = FactoryLogic.createItem({
	id: 'item-bloodcaster',
	name: 'Bloodcaster',
	description: `
*From [Weapons of Legend](https://www.drivethrurpg.com/en/product/530513/weapons-of-legend-powered-by-draw-steel)*

Another body. Blood stains where the wounds should be, but no cuts in the skin. Inspector Calum thinks it’s magic, but the ‘hits’ are too precise. No, this is a pro’s work; that damned assassin is back in town.`,
	type: ItemType.LeveledWeapon,
	keywords: [ KitWeapon.Bow, AbilityKeyword.Magic ],
	crafting: FactoryLogic.createProject({
		prerequisites: 'A crossbow made of ebony wood, an obsidian vial filled with humanoid blood',
		source: 'Texts or lore in Riojan',
		characteristic: [ Characteristic.Agility, Characteristic.Intuition ],
		goal: 450
	}),
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'item-bloodcaster-1',
					name: 'Level 1',
					description: 'Any weapon ability that deals rolled damage using this weapon deals an extra 1 corruption damage. Additionally, whenever you make a strike using this weapon, you can deal 1d6 damage to yourself to deal an extra 1d6 poison damage to the target.'
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'item-bloodcaster-5',
					name: 'Level 5',
					description: 'The weapon’s extra corruption damage increases to 2. Additionally, whenever you make a strike using this weapon, you can deal 1d6 damage to yourself to grant the strike an edge, or 2d6 damage to grant it a double edge.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'item-bloodcaster-9',
					name: 'Level 9',
					description: 'The weapon’s extra corruption damage increases to 3 and the extra poison damage you deal to a target from the 1st level feature increases to 2d6. Weapon abilities that deal rolled damage using this weapon ignore corruption and poison immunity.'
				})
			]
		}
	]
});

const grasshopperStaff = FactoryLogic.createItem({
	id: 'item-grasshopper-staff',
	name: 'Grasshopper Staff',
	description: `
*From [Weapons of Legend](https://www.drivethrurpg.com/en/product/530513/weapons-of-legend-powered-by-draw-steel)*

The best way to avoid the eagle’s claw is to be somewhere else.`,
	type: ItemType.LeveledWeapon,
	keywords: [ AbilityKeyword.Magic, KitWeapon.Polearm ],
	crafting: FactoryLogic.createProject({
		prerequisites: 'None, but a nature spirit must willingly inhabit the crafter during the staff’s creation',
		source: 'Texts or lore in Kheltivari',
		characteristic: [ Characteristic.Agility, Characteristic.Intuition ],
		goal: 450
	}),
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'item-grasshopper-staff-1',
					name: 'Level 1',
					description: 'Any weapon ability that deals rolled damage using this weapon gains a +1 damage bonus. Additionally, you always succeed on Might tests made to jump. You can still roll to see if you get a success with a reward outcome. If your long jump distance becomes greater than your speed, your speed becomes equal to your long jump distance until the end of your turn.'
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'item-grasshopper-staff-5',
					name: 'Level 5',
					description: 'The weapon’s damage bonus increases to +2. Additionally, you have a +1 speed bonus, you can long jump 1 additional square, you can jump 1 square higher, and you can jump out of difficult or damaging terrain.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'item-grasshopper-staff-9',
					name: 'Level 9',
					description: 'The weapon’s damage bonus increases to +3, your speed bonus increases to +2, you can long jump 2 additional squares instead, you can jump 2 squares higher instead. Additionally, jumping doesn’t provoke opportunity attacks and you can jump while affected by the grabbed or restrained conditions, ending those conditions for you.'
				})
			]
		}
	]
});

export const weaponsOfLegend: Sourcebook = {
	id: 'weapons-of-legend',
	name: 'Weapons of Legend',
	description: 'A selection of content from [Weapons of Legend](https://www.drivethrurpg.com/en/product/530513/weapons-of-legend-powered-by-draw-steel/).',
	type: SourcebookType.ThirdParty,
	adventures: [],
	ancestries: [],
	careers: [],
	complications: [],
	cultures: [],
	classes: [],
	domains: [],
	encounters: [],
	imbuements: [],
	items: [
		amzysTrophy,
		beast,
		bladeOfEquinox,
		bloodcaster,
		grasshopperStaff
	],
	kits: [],
	monsterGroups: [],
	montages: [],
	negotiations: [],
	perks: [],
	projects: [],
	subclasses: [],
	tacticalMaps: [],
	terrain: [],
	titles: [],
	skills: [],
	languages: []
};
