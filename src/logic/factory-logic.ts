import { Monster, MonsterGroup } from '../models/monster';
import { Ancestry } from '../models/ancestry';
import { Career } from '../models/career';
import { Characteristic } from '../enums/characteristic';
import { Complication } from '../models/complication';
import { Culture } from '../models/culture';
import { Domain } from '../models/domain';
import { FeatureField } from '../enums/feature-field';
import { FeatureLogic } from './feature-logic';
import { Hero } from '../models/hero';
import { HeroClass } from '../models/class';
import { Item } from '../models/item';
import { Kit } from '../models/kit';
import { KitType } from '../enums/kit';
import { MonsterRoleType } from '../enums/monster-role-type';
import { Perk } from '../models/perk';
import { PerkType } from '../enums/perk-type';
import { Sourcebook } from '../models/sourcebook';
import { SubClass } from '../models/subclass';
import { Utils } from '../utils/utils';

export class FactoryLogic {
	static createHero = (sourcebookIDs: string[]): Hero => {
		return {
			id: Utils.guid(),
			name: '',
			settingIDs: sourcebookIDs,
			ancestry: null,
			culture: null,
			class: null,
			career: null,
			complication: null,
			state: {
				staminaDamage: 0,
				recoveriesUsed: 0,
				victories: 0,
				xp: 0,
				heroicResource: 0,
				heroTokens: 0,
				renown: 0,
				projectPoints: 0,
				conditions: [],
				inventory: []
			}
		};
	};

	static createSourcebook = (): Sourcebook => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			isHomebrew: true,
			ancestries: [],
			cultures: [],
			careers: [],
			classes: [],
			domains: [],
			kits: [],
			complications: [],
			perks: [],
			items: [],
			skills: [],
			languages: [],
			defaultLanguages: []
		};
	};

	static createAncestry = (): Ancestry => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			features: [
				FeatureLogic.createSizeFeature({
					id: Utils.guid(),
					sizeValue: 1,
					sizeMod: 'M'
				}),
				FeatureLogic.createBonusFeature({
					id: Utils.guid(),
					field: FeatureField.Speed,
					value: 5
				})
			]
		};
	};

	static createCulture = (): Culture => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			languages: [],
			environment: null,
			organization: null,
			upbringing: null
		};
	};

	static createCareer = (): Career => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			features: [],
			title: FeatureLogic.createFeature({
				id: Utils.guid(),
				name: '',
				description: ''
			}),
			incitingIncidents: {
				options: [],
				selectedID: null
			}
		};
	};

	static createClass = (): HeroClass => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			heroicResource: '',
			subclassName: '',
			subclassCount: 1,
			primaryCharacteristics: [],
			featuresByLevel: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map(n => ({ level: n, features: [] })),
			abilities: [],
			subclasses: [],
			level: 1,
			characteristics: []
		};
	};

	static createSubclass = (): SubClass => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			featuresByLevel: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map(n => ({ level: n, features: [], optionalFeatures: [] })),
			selected: false
		};
	};

	static createComplication = (): Complication => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			features: []
		};
	};

	static createDomain = (): Domain => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			featuresByLevel: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map(n => ({ level: n, features: [], optionalFeatures: [] }))
		};
	};

	static createKit = (): Kit => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			type: KitType.Martial,
			armor: [],
			weapon: [],
			implement: [],
			stamina: 0,
			speed: 0,
			stability: 0,
			meleeDamage: null,
			rangedDamage: null,
			magicalDamage: null,
			distance: 0,
			reach: 0,
			area: 0,
			mobility: false,
			features: []
		};
	};

	static createPerk = (): Perk => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			type: PerkType.Crafting,
			features: []
		};
	};

	static createItem = (): Item => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			features: [],
			count: 1
		};
	};

	static createMonsterGroup = (): MonsterGroup => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			information: [],
			malice: [],
			monsters: []
		};
	};

	static createMonster = (monsterGroup: MonsterGroup): Monster => {
		return {
			id: Utils.guid(),
			name: monsterGroup.name || '',
			description: '',
			level: 1,
			role: {
				type: MonsterRoleType.Ambusher,
				isMinion: false
			},
			keywords: [],
			encounterValue: 0,
			size: {
				value: 1,
				mod: 'M'
			},
			speed: {
				value: 5,
				modes: ''
			},
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: [
				{
					characteristic: Characteristic.Might,
					value: 0
				},
				{
					characteristic: Characteristic.Agility,
					value: 0
				},
				{
					characteristic: Characteristic.Reason,
					value: 0
				},
				{
					characteristic: Characteristic.Intuition,
					value: 0
				},
				{
					characteristic: Characteristic.Presence,
					value: 0
				}
			],
			features: [],
			villainActions: []
		};
	};
}
