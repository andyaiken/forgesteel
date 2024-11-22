import { Ancestry } from '../models/ancestry';
import { CampaignSetting } from '../models/campaign-setting';
import { Career } from '../models/career';
import { Complication } from '../models/complication';
import { Culture } from '../models/culture';
import { Domain } from '../models/domain';
import { FeatureField } from '../enums/feature-field';
import { FeatureLogic } from './feature-logic';
import { Hero } from '../models/hero';
import { HeroClass } from '../models/class';
import { Kit } from '../models/kit';
import { KitType } from '../enums/kit';
import { SubClass } from '../models/subclass';
import { Utils } from '../utils/utils';

export class FactoryLogic {
	static createHero = (settingIDs: string[]) => {
		const hero: Hero = {
			id: Utils.guid(),
			name: '',
			settingIDs: settingIDs,
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
				conditions: []
			}
		};
		return hero;
	};

	static createCampaignSetting = () => {
		const setting: CampaignSetting = {
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
			skills: [],
			languages: [],
			defaultLanguages: []
		};
		return setting;
	};

	static createAncestry = () => {
		const ancestry: Ancestry = {
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
		return ancestry;
	};

	static createCulture = () => {
		const culture: Culture = {
			id: Utils.guid(),
			name: '',
			description: '',
			languages: [],
			environment: null,
			organization: null,
			upbringing: null
		};
		return culture;
	};

	static createCareer = () => {
		const career: Career = {
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
		return career;
	};

	static createClass = () => {
		const heroClass: HeroClass = {
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
		return heroClass;
	};

	static createSubclass = () => {
		const sc: SubClass = {
			id: Utils.guid(),
			name: '',
			description: '',
			featuresByLevel: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map(n => ({ level: n, features: [], optionalFeatures: [] })),
			selected: false
		};
		return sc;
	};

	static createDomain = () => {
		const d: Domain = {
			id: Utils.guid(),
			name: '',
			description: '',
			featuresByLevel: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map(n => ({ level: n, features: [], optionalFeatures: [] }))
		};
		return d;
	};

	static createKit = () => {
		const kit: Kit = {
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
		return kit;
	};

	static createComplication = () => {
		const complication: Complication = {
			id: Utils.guid(),
			name: '',
			description: '',
			features: []
		};
		return complication;
	};
}
