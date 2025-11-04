import {
	EnvironmentData,
	OrganizationData,
	UpbringingData
} from '@/data/culture-data';
import { AncestryData } from '@/data/ancestry-data';
import { CultureType } from '@/enums/culture-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { LanguageType } from '@/enums/language-type';
import { SkillList } from '@/enums/skill-list';
import { Sourcebook } from '@/models/sourcebook';

export const draachenmar: Sourcebook = {
	id: 'draachenmar',
	name: 'Draachenmar',
	description: '32Gamers home brew game world.',
	isHomebrew: false,
	ancestries: [
		AncestryData.aurealgar,
		AncestryData.aurkin,
		AncestryData.aurven,
		AncestryData.caprini,
		AncestryData.elgari,
		AncestryData.cervari,
		AncestryData.warforged,
		AncestryData.seraphite
	],
	cultures: [
		FactoryLogic.createCulture(
			'Hakaan',
			'Rural, communal, labor.',
			CultureType.Ancestral,
			EnvironmentData.rural,
			OrganizationData.communal,
			UpbringingData.labor,
			'Khoursirian'
		),
		FactoryLogic.createCulture(
			'Khoursiri',
			'Urban, communal, creative.',
			CultureType.Ancestral,
			EnvironmentData.urban,
			OrganizationData.communal,
			UpbringingData.creative,
			'Khoursirian'
		),
		FactoryLogic.createCulture(
			'Time Raider',
			'Nomadic, communal, martial.',
			CultureType.Ancestral,
			EnvironmentData.nomadic,
			OrganizationData.communal,
			UpbringingData.martial,
			'Voll'
		),
		// --- Draachenmar Ancestries (New) ---
		FactoryLogic.createCulture(
			'Seraphite',
			'Urban, communal, academic — itinerant arbiters and archivists bearing inconvenient light.',
			CultureType.Ancestral,
			EnvironmentData.urban,
			OrganizationData.communal,
			UpbringingData.academic,
			'Seraphic'
		),
		FactoryLogic.createCulture(
			'Aurian',
			'Nomadic, communal, creative — caravan guides, cliff-shadows, and roof-runners of the pridelands.',
			CultureType.Ancestral,
			EnvironmentData.nomadic,
			OrganizationData.communal,
			UpbringingData.creative,
			'Aurish'
		),
		FactoryLogic.createCulture(
			'Hornvar',
			'Rural, communal, martial — the antlered folk of fen, steppe, and escarpment (Elgari, Cervari, Caprini).',
			CultureType.Ancestral,
			EnvironmentData.rural,
			OrganizationData.communal,
			UpbringingData.martial,
			'Antlerspeech'
		),
		FactoryLogic.createCulture(
			'Warforged',
			'Urban, bureaucratic, labor — living constructs of Karth Vol now seeking place and personhood.',
			CultureType.Ancestral,
			EnvironmentData.urban,
			OrganizationData.bureaucratic,
			UpbringingData.labor,
			'Forged Cant'
		)
	],
	careers: [],
	classes: [],
	subclasses: [],
	complications: [],
	domains: [],
	kits: [],
	perks: [],
	titles: [],
	items: [],
	imbuements: [],
	monsterGroups: [],
	skills: [
		{
			name: 'Timescape',
			description: 'Knowing about the various planets of the timescape',
			list: SkillList.Lore
		}
	],
	languages: [
		{
			name: 'Gulanbarak',
			description: 'The fortress argot of Gulanbarak and its surrounding marches.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Badlands Taal',
			description: 'Caravan-route lingua of the Badlands and desert oases.',
			type: LanguageType.Regional,
			related: [ 'Draachen Trade' ]
		},
		// Cultural
		{
			name: 'Aurish',
			description: 'Tongue of the Aurians; prides maintain dialects: Aurealgar, Aurven, Aurkin.',
			type: LanguageType.Cultural,
			related: [ 'Aurealgar', 'Aurven', 'Aurkin' ]
		},
		{
			name: 'Antlerspeech',
			description: 'Hornvar language with stock dialects: Elgari, Cervari, Caprini.',
			type: LanguageType.Cultural,
			related: [ 'Elgari', 'Cervari', 'Caprini' ]
		},
		{
			name: 'Forged Cant',
			description: 'Warforged code-speech and worksign; rooted in Karth Vol foundry protocols.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Seraphic',
			description: 'The devotional and juridical tongue of the Seraphites.',
			type: LanguageType.Cultural,
			related: [ 'Eneadic' ]
		},
		{
			name: 'Eneadic',
			description: 'Liturgical speech of the Enead of Eternity; used in vows, judgments, and scripture.',
			type: LanguageType.Cultural,
			related: [ 'Seraphic' ]
		},
		{
			name: 'Gray Cant',
			description: 'Mnemonic hashes and phrase-keys used by the Gray Order to pass messages.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Wallsign',
			description: 'A semaphoric sign-language of the Wall-watch and sappers.',
			type: LanguageType.Cultural,
			related: [ 'Bargothic' ]
		},
		// Dead / Historic
		{
			name: 'Old Bargothic',
			description: 'Pre-Rockfall inscriptions and oaths; preserved in temple stone and war-marches.',
			type: LanguageType.Dead,
			related: [ 'Bargothic' ]
		}
	],
	projects: [],
	terrain: []
};
