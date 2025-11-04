import { EnvironmentData, OrganizationData, UpbringingData } from '@/data/culture-data';
import { AncestryData } from '@/data/ancestry-data';
import { CultureType } from '@/enums/culture-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { LanguageType } from '@/enums/language-type';
import { SkillList } from '@/enums/skill-list';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

export const orden: Sourcebook = {
	id: 'orden',
	name: 'Orden',
	description: 'The default setting for Draw Steel.',
	type: SourcebookType.Official,
	ancestries: [
		AncestryData.hakaan,
		AncestryData.memonek,
		AncestryData.timeRaider
	],
	cultures: [
		FactoryLogic.createCulture('Devil', 'Urban, bureaucratic, academic.', CultureType.Ancestral, EnvironmentData.urban, OrganizationData.bureaucratic, UpbringingData.academic, 'Anjali'),
		FactoryLogic.createCulture('Draconem', 'Secluded, bureaucratic, martial.', CultureType.Ancestral, EnvironmentData.secluded, OrganizationData.bureaucratic, UpbringingData.martial, 'Vastariax'),
		FactoryLogic.createCulture('Dwarf', 'Secluded, bureaucratic, creative.', CultureType.Ancestral, EnvironmentData.secluded, OrganizationData.bureaucratic, UpbringingData.creative, 'Zaliac'),
		FactoryLogic.createCulture('Wode Elf', 'Wilderness, bureaucratic, martial.', CultureType.Ancestral, EnvironmentData.wilderness, OrganizationData.bureaucratic, UpbringingData.martial, 'Yllyric'),
		FactoryLogic.createCulture('High Elf', 'Secluded, bureaucratic, martial.', CultureType.Ancestral, EnvironmentData.secluded, OrganizationData.bureaucratic, UpbringingData.martial, 'Hyrallic'),
		FactoryLogic.createCulture('Hakaan', 'Rural, communal, labor.', CultureType.Ancestral, EnvironmentData.rural, OrganizationData.communal, UpbringingData.labor, 'Vhoric'),
		FactoryLogic.createCulture('Human', 'Urban, communal, labor.', CultureType.Ancestral, EnvironmentData.urban, OrganizationData.communal, UpbringingData.labor, 'Vaslorian'),
		FactoryLogic.createCulture('Memonek', 'Nomadic, communal, academic.', CultureType.Ancestral, EnvironmentData.nomadic, OrganizationData.communal, UpbringingData.academic, 'Axiomatic'),
		FactoryLogic.createCulture('Orc', 'Wilderness, communal, creative.', CultureType.Ancestral, EnvironmentData.wilderness, OrganizationData.communal, UpbringingData.creative, 'Kalliac'),
		FactoryLogic.createCulture('Polder', 'Urban, communal, creative.', CultureType.Ancestral, EnvironmentData.urban, OrganizationData.communal, UpbringingData.creative, 'Khoursirian'),
		FactoryLogic.createCulture('Time Raider', 'Nomadic, communal, martial.', CultureType.Ancestral, EnvironmentData.nomadic, OrganizationData.communal, UpbringingData.martial, 'Voll')
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
		// Common languages
		{
			name: 'Caelian',
			description: 'The language of the ancient Caelian Empire; the common tongue of Orden.',
			type: LanguageType.Common,
			related: []
		},
		// Regional languages
		{
			name: 'Higaran',
			description: 'Spoken in Higara.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Khemharic',
			description: 'Spoken in Khemhara.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Khoursirian',
			description: 'Spoken in Khoursir; a distant offshoot of Khamish.',
			type: LanguageType.Regional,
			related: [ 'Khamish' ]
		},
		{
			name: 'Oaxuatl',
			description: 'Spoken in Ix.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Phaedran',
			description: 'Spoken in Phaedros.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Riojan',
			description: 'Spoken in Rioja.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Uvalic',
			description: 'Spoken by the gol.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Vaniric',
			description: 'Spoken in Vanigar.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Vaslorian',
			description: 'Spoken in Vasloria.',
			type: LanguageType.Regional,
			related: []
		},
		// Cultural languages
		{
			name: 'Anjali',
			description: 'Spoken in the Hells; the language of contract law.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Axiomatic',
			description: 'Spoken by Memoneks; native language of Axiom; the common language of the timescape by trade.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Filliaric',
			description: 'Spoken by Angulotls; an offshoot of Cyllinric.',
			type: LanguageType.Cultural,
			related: [ 'Cyllinric' ]
		},
		{
			name: 'The First Language',
			description: 'Spoken by elder dragons; the language of magic.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'High Kuric',
			description: 'Spoken by bredbeddles, giants, ogres, and trolls.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Hyrallic',
			description: 'Spoken by high elves; the language of interspecies diplomacy.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Illyvric',
			description: 'Spoken by shadow elves.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Kalliak',
			description: 'Spoken by orcs; an offshoot of Zaliac.',
			type: LanguageType.Cultural,
			related: [ 'Zaliac' ]
		},
		{
			name: 'Kethaic',
			description: 'Spoken by kobolds; a patois of Vastariax and Caelian.',
			type: LanguageType.Cultural,
			related: [ 'Caelian', 'Vastariax' ]
		},
		{
			name: 'Khelt',
			description: 'Spoken by bugbears and the fey; an offshoot of Kheltivari.',
			type: LanguageType.Cultural,
			related: [ 'Kheltivari' ]
		},
		{
			name: 'Low Kuric',
			description: 'Spoken by elementals.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Mindspeech',
			description: 'Spoken by voiceless talkers; a symbolic language shared among native telepaths.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Proto-Ctholl',
			description: 'Spoken by demons; an incomplete offshoot of Tholl.',
			type: LanguageType.Cultural,
			related: [ 'Tholl' ]
		},
		{
			name: 'Szetch',
			description: 'Spoken by goblins and radenwights.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Tholl',
			description: 'Spoken by gnolls.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Urollialic',
			description: 'Spoken by olothecs.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Variac',
			description: 'Spoken by gnomes, olothecs, trolls, and voiceless talkers; the common language of the World Below.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Vastariax',
			description: 'Spoken by dragons and dragon knights.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Vhoric',
			description: 'Spoken by hakaan; offshoot of the stone giant dialect of High Kuric.',
			type: LanguageType.Cultural,
			related: [ 'High Kuric' ]
		},
		{
			name: 'Voll',
			description: 'Spoken by time raiders.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Yllyric',
			description: 'Spoken by wode elves; the language of druids.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Za\'hariax',
			description: 'Spoken by overminds.',
			type: LanguageType.Cultural,
			related: []
		},
		{
			name: 'Zaliac',
			description: 'Spoken by dwarves; the language of engineering.',
			type: LanguageType.Cultural,
			related: []
		},
		// Dead languages
		{
			name: 'Ananjali',
			description: 'Was spoken by hobgoblins.',
			type: LanguageType.Dead,
			related: [ 'Anjali' ]
		},
		{
			name: 'High Rhyvian',
			description: 'Was spoken by sun elves.',
			type: LanguageType.Dead,
			related: [ 'Hyrallic', 'Yllyric' ]
		},
		{
			name: 'Khamish',
			description: 'Was spoken by beast lords.',
			type: LanguageType.Dead,
			related: [ 'Khoursirian' ]
		},
		{
			name: 'Kheltivari',
			description: 'Was spoken by the fae.',
			type: LanguageType.Dead,
			related: [ 'Khelt', 'Yllyric' ]
		},
		{
			name: 'Low Rhyvian',
			description: 'Was spoken by sky elves.',
			type: LanguageType.Dead,
			related: [ 'Hyrallic' ]
		},
		{
			name: 'Old Variac',
			description: 'Was spoken by olothecs and voiceless talkers.',
			type: LanguageType.Dead,
			related: [ 'Variac' ]
		},
		{
			name: 'Phorialtic',
			description: 'Was spoken by elementals.',
			type: LanguageType.Dead,
			related: [ 'High Kuric', 'Low Kuric' ]
		},
		{
			name: 'Rallarian',
			description: 'Was spoken by steel dwarves.',
			type: LanguageType.Dead,
			related: [ 'Zaliac' ]
		},
		{
			name: 'Ullorvic',
			description: 'Was spoken by star elves.',
			type: LanguageType.Dead,
			related: [ 'Hyrallic', 'Yllyric' ]
		}
	],
	projects: [],
	terrain: []
};
