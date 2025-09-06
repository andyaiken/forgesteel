import { Characteristic } from '../../enums/characteristic';
import { FeatureAddOnType } from '../../enums/feature-addon-type';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterGroup } from '../../models/monster-group';

export const rival3rd: MonsterGroup = {
	id: 'monster-group-rival-3rd',
	name: 'Rival - 3rd Echelon',
	description: 'Rivals at the 3rd Echelon have been through quite a few adventures the heroes might not know anything about. Even if they’ve clashed with the heroes a few times in the past, there’s something different about the rivals now.',
	picture: null,
	information: [
		{
			id: 'rival-3rd-info-1',
			name: 'Rivals',
			description: `They take the jobs you were eyeing on the local town’s job board. They sit at your favorite table in the tavern with the best drinks, food, and entertainment. You know their names, and they know yours. They’re rivals—heroes just like you. Maybe even better.

Rivals are NPCs built around the mechanics of seven of the classes in Draw Steel: Heroes—the conduit, elementalist, fury, null, shadow, tactician, and talent (see Chapter 5: Classes in that book). Their stat blocks are streamlined and modular, meant to be easy to adjust on the fly with ancestral traits or signature abilities. Examples of each type of rival are presented at every tier, capturing their foray into renown as they inevitably cross, clash with, and impede the player characters’ own heroic journey.`
		},
		{
			id: 'rival-3rd-info-2',
			name: 'Using Rivals in a Campaign',
			description: 'These grab-and-go adaptations of classes are meant to capture a class’s fantasy without making Directors run a full hero character sheet. They also seamlessly work together, allowing Directors to build a party of NPC heroes or villains who can be rivals, enemies, or even allies. The next time the heroes need a bit of competition or need to quickly visit a local tavern, temple, or guild hall in search of capable adventurers to help with a quest, you won’t be fumbling for a stat block. That’s what rivals are for.'
		},
		{
			id: 'rival-3rd-info-3',
			name: 'Rival Ancestries',
			description: 'You can adjust any rival stat block to more closely model a player character of a specific ancestry. Choose an ancestry from the Rival Ancestries table, then modify the stat block by adding the keyword, adjusting the size, adding the stability adjustment value, and giving them the ancestral trait.'
		},
		{
			id: 'rival-3rd-info-4',
			name: 'Rival Abilities',
			description: 'Any rival can replace their signature ability with a signature ability a hero has access to. The fury, shadow, and tactician can select a signature ability from any kit (see Chapter 6: Kits in Draw Steel: Heroes), and other rivals can select a signature ability from their respective class. If you replace a rival’s signature ability, the replacement ability deals extra damage equal to the rival’s level and targets two creatures or objects if the original ability targets only one.'
		},
		{
			id: 'rival-3rd-info-5',
			name: 'Rival Languagues',
			description: 'Most rivals speak Caelian and two other languages.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'rival-3rd-malice-1',
			name: 'Work as One',
			cost: 3,
			sections: [
				'Until the end of the round, each rival can impose a bane on a strike made against an adjacent rival as a free triggered action.',
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-3rd-malice-2',
			name: 'We Just Do It Better',
			cost: 3,
			sections: [
				'Until the end of the round, whenever any rival makes a power roll against the target of their Rivalry trait, they roll a d3 and add it to the power roll.',
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-3rd-malice-3',
			name: 'Check Out Our Loot',
			cost: 5,
			sections: [
				'One rival pulls out a magic consumable and hurls it, targeting a 5 × 1 line within 1 square of them or a 3 cube within 10 squares of them. Each enemy in the area makes an Agility test. The rival chooses a damage type and a condition for the outcome of the test from one of the following pairs: sonic damage and dazed, poison damange and weakened, or fire damage and frightened.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '11 damage; the condition affects the target (save ends)',
					tier2: '8 damage; the condition affects the target (EoT)',
					tier3: '5 damage'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-3rd-malice-4',
			name: 'Calling the Shots',
			cost: 7,
			sections: [
				'Each rival regains 10 Stamina. Until the end of the round, whenever a rival uses an ability against an enemy, each other rival adjacent to that enemy can make a free strike against them.',
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-3rd-malice-5',
			name: 'Coordinated Takedown',
			cost: 10,
			sections: [
				'Each rival moves up to their speed and uses a main action or maneuver that doesn’t cost Malice.',
			]
		}),
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'rival-3rd-1',
			name: 'Rival Conduit',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(1, 0, 0, 2, 0),
			features: []
		}),
		FactoryLogic.createMonster({
			id: 'rival-3rd-2',
			name: 'Rival Elementalist',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(1, 0, 0, 2, 0),
			features: []
		}),
		FactoryLogic.createMonster({
			id: 'rival-3rd-3',
			name: 'Rival Fury',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(1, 0, 0, 2, 0),
			features: []
		}),
		FactoryLogic.createMonster({
			id: 'rival-3rd-4',
			name: 'Rival Null',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(1, 0, 0, 2, 0),
			features: []
		}),
		FactoryLogic.createMonster({
			id: 'rival-3rd-5',
			name: 'Rival Shadow',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(1, 0, 0, 2, 0),
			features: []
		}),
		FactoryLogic.createMonster({
			id: 'rival-3rd-6',
			name: 'Rival Tactician',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(1, 0, 0, 2, 0),
			features: []
		}),
		FactoryLogic.createMonster({
			id: 'rival-3rd-7',
			name: 'Rival Talent',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(1, 0, 0, 2, 0),
			features: []
		})
	],
	addOns: [
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-1',
			name: 'Devil',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** 0,
- **Prehensile Tail:** The rival can't be flanked.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-2',
			name: 'Draconian (for the dragon knight)',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** +1,
- **Wings:** The rival can fly. While flying, their stability is 0.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-3',
			name: 'Dwarf',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** +2,
- **Great Fortitude:** The rival can’t be made weakened.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-4',
			name: 'High Elf / Wode Elf',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** 0,
- **Otherworldly Grace:** At the start of each of their turns, the rival can choose one effect on them that can be ended by a saving throw. That effect instead ends at the end of their turn.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-5',
			name: 'Hakaan',
			description: `
- **Size Adjustment:** 1L
- **Stability Adjustment:** +2,
- **Forceful:** When the rival force moves a creature or object, they can force move them an additional 2 squares.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-6',
			name: 'Human',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** +1,
- **Determination:** As a maneuver, the rival can end the frightened, slowed, or weakened condition on themself.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-7',
			name: 'Memonek',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** -1 (minimum 0),
- **Nonstop:** The rival can’t be made slowed.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-8',
			name: 'Orc',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** +2,
- **Glowing Recovery:** Once per round, the rival can use a maneuver to regain Stamina equal to 5 times their level.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-9',
			name: 'Polder',
			description: `
- **Size Adjustment:** 1S
- **Stability Adjustment:** 0,
- **Nimblestep:** The rival ignores difficult terrain and can move at full speed while sneaking.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-10',
			name: 'Revenant',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** +1,
- **Vengeance Mark:** The rival places a magic sigil on an enemy within 10 squares of them. The rival always knows the direction to that enemy while the sigil is active on them. As a main action, the rival can detonate the sigil, dealing damage to the target equal to the rival’s free strike and sliding the target up to 2 squares.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-11',
			name: 'Time Raider',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** 0,
- **Four-Armed Martial Arts:** Whenever the rival uses the Grab or Knockback maneuver, they can target one additional creature.`,
			category: FeatureAddOnType.Ancestry,
		})
	]
};
