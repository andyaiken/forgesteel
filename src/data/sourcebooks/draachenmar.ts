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
		AncestryData.angulotl,
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
		// --- Orden Core Ancestral Cultures ---
		FactoryLogic.createCulture('Devil', 'Urban, bureaucratic, academic.', CultureType.Ancestral, EnvironmentData.urban, OrganizationData.bureaucratic, UpbringingData.academic, 'Anjali'),
		FactoryLogic.createCulture('Dragon Knight', 'Secluded, bureaucratic, martial.', CultureType.Ancestral, EnvironmentData.secluded, OrganizationData.bureaucratic, UpbringingData.martial, 'Vastariax'),
		FactoryLogic.createCulture('Dwarf', 'Secluded, bureaucratic, creative.', CultureType.Ancestral, EnvironmentData.secluded, OrganizationData.bureaucratic, UpbringingData.creative, 'Zaliac'),
		FactoryLogic.createCulture('Wode Elf', 'Wilderness, bureaucratic, martial.', CultureType.Ancestral, EnvironmentData.wilderness, OrganizationData.bureaucratic, UpbringingData.martial, 'Yllyric'),
		FactoryLogic.createCulture('High Elf', 'Secluded, bureaucratic, martial.', CultureType.Ancestral, EnvironmentData.secluded, OrganizationData.bureaucratic, UpbringingData.martial, 'Hyrallic'),
		FactoryLogic.createCulture('Hakaan', 'Rural, communal, labor.', CultureType.Ancestral, EnvironmentData.rural, OrganizationData.communal, UpbringingData.labor, 'Vhoric'),
		FactoryLogic.createCulture('Human', 'Urban, communal, labor.', CultureType.Ancestral, EnvironmentData.urban, OrganizationData.communal, UpbringingData.labor, 'Vaslorian'),
		FactoryLogic.createCulture('Memonek', 'Nomadic, communal, academic.', CultureType.Ancestral, EnvironmentData.nomadic, OrganizationData.communal, UpbringingData.academic, 'Axiomatic'),
		FactoryLogic.createCulture('Orc', 'Wilderness, communal, creative.', CultureType.Ancestral, EnvironmentData.wilderness, OrganizationData.communal, UpbringingData.creative, 'Kalliac'),
		FactoryLogic.createCulture('Polder', 'Urban, communal, creative.', CultureType.Ancestral, EnvironmentData.urban, OrganizationData.communal, UpbringingData.creative, 'Khoursirian'),
		FactoryLogic.createCulture('Time Raider', 'Nomadic, communal, martial.', CultureType.Ancestral, EnvironmentData.nomadic, OrganizationData.communal, UpbringingData.martial, 'Voll'),

		// --- Draachenmar Ancestral Cultures ---
		FactoryLogic.createCulture(
			'Angulotl',
			'Wilderness, communal, creative — amphibious river-delvers and tide-pool artisans skilled in current-craft and aquatic lore.',
			CultureType.Ancestral,
			EnvironmentData.wilderness,
			OrganizationData.communal,
			UpbringingData.creative,
			'Filliaric'
		),
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
		{ name: 'Draachen Trade', description: 'Caravan and market koine across Draachenmar; used from Stoneharbor and Gulanbarak to the Henge market and Lineton. Keeps mixed-arm units interoperable.', type: LanguageType.Common, related: [] },
		{ name: 'Concordial', description: 'Diplomatic koine - court/negotiator register used for cross-cultural diplomacy.', type: LanguageType.Cultural, related: [] },
		{ name: 'Aeryn', description: 'Aarakocra/avian language; wind-tones, sky-measure and thermals vocabulary; spoken by aarakocra anywhere.', type: LanguageType.Cultural, related: [] },
		{ name: 'Anjali', description: 'Devil bureaucracy and contracts; precise legal registers.', type: LanguageType.Cultural, related: [] },
		{ name: 'Aurish', description: 'Language of the Aurian prides; rhythmic cadence and proverb-rich idioms; spoken by Aurians anywhere.', type: LanguageType.Cultural, related: [ 'Aurealgar', 'Aurven', 'Aurkin' ] },
		{ name: 'Axiomel', description: 'Memonek language; precise logical structures with truth-operators and formal address; spoken by memonek anywhere.', type: LanguageType.Cultural, related: [] },
		{ name: 'Dracalis', description: 'Dragonborn language spoken worldwide; Vandrhaf & Providence keep the prestige dialects.', type: LanguageType.Cultural, related: [] },
		{ name: 'Durekh', description: 'Dwarven language spoken worldwide; Gulanbar runes are the dominant script variant.', type: LanguageType.Cultural, related: [ 'Steel Kuric' ] },
		{ name: 'Filliaric', description: 'Angulotl language; fluid consonant clusters and tidal cadence; spoken by Angulotls anywhere in the world.', type: LanguageType.Cultural, related: [] },
		{ name: 'Forged Cant', description: 'Warforged code-speech and worksign; concise signals, taps, and machine-loanwords.', type: LanguageType.Cultural, related: [] },
		{ name: 'Gobbic', description: 'Goblin language spoken worldwide; \'Shard-cant\' is a thieves’/warband register.', type: LanguageType.Cultural, related: [] },
		{ name: 'Gnomari', description: 'Gnome language spoken worldwide; Kronus adds dense technic and elemental vocabulary.', type: LanguageType.Cultural, related: [] },
		{ name: 'Grulakh', description: 'Orc language spoken worldwide; notable Kettles and Shard dialects.', type: LanguageType.Cultural, related: [] },
		{ name: 'Hartic', description: 'Hornvar macrolect; stocks/dialects include Elgari, Cervari, and Caprini.', type: LanguageType.Cultural, related: [ 'Elgari', 'Cervari', 'Caprini' ] },
		{ name: 'Hearthain', description: 'Halfling language spoken worldwide; famed for hearth-tales and community idiom.', type: LanguageType.Cultural, related: [] },
		{ name: 'Jotunic', description: 'Giant language spoken worldwide; Vilos traditions emphasize \'Frostcraft,\' but hill, stone, cloud, and storm dialects persist.', type: LanguageType.Cultural, related: [] },
		{ name: 'Khelt', description: 'Bugbear/fey offshoot; oral-heavy, chantlike; related to Kheltivari.', type: LanguageType.Cultural, related: [ 'Kheltivari' ] },
		{ name: 'Kheltivari', description: 'Old hobgoblin state dialect; martial and administrative registers.', type: LanguageType.Cultural, related: [ 'Khelt' ] },
		{ name: 'Seraphic', description: 'Juridical and devotional tongue of the Seraphites; used for oaths, judgments, and sanctuary pleas.', type: LanguageType.Cultural, related: [] },
		{ name: 'Ssar’uk', description: 'Lizardfolk language; sibilant hisses, alveolar clicks, and tide-terms; spoken by lizardfolk anywhere.', type: LanguageType.Cultural, related: [] },
		{ name: 'Terrari', description: 'Tortle/terran folk language; deliberate cadence, contractual/legal idioms; spoken by terrari anywhere.', type: LanguageType.Cultural, related: [] },
		{ name: 'Umbrathi', description: 'Drow language spoken worldwide; Maelgoroth preserves an archaic register beneath the dome near the Orc Kettles.', type: LanguageType.Cultural, related: [] },
		{ name: 'Vhroun', description: 'Hakaan language; resonant stone-phrasing and deep tonals; spoken by hakaan anywhere.', type: LanguageType.Cultural, related: [] },
		{ name: 'Voll', description: 'Language of the Time Raiders (four-armed extradimensional people); clipped command-patterns, battle-math, and caravan loanwords.', type: LanguageType.Cultural, related: [] },
		{ name: 'Avalonian', description: 'Maritime duchies Aerlin, Braeten, Veringia, Albion.', type: LanguageType.Regional, related: [] },
		{ name: 'Dalelandic', description: 'Henge/Dale Lands; heavy academic/arcane register (Conclave & schools).', type: LanguageType.Regional, related: [] },
		{ name: 'Jungari', description: 'Uxmal’s human diplomats/traders; Tyravos (Volcano of Omens) vocabulary.', type: LanguageType.Regional, related: [] },
		{ name: 'Merish', description: 'Courtly arts dialect of the Duchy of Merish near Lineton.', type: LanguageType.Regional, related: [] },
		{ name: 'Rider-cant', description: 'Badlands (Respite/Providence); survival/riding and rune-lexicon.', type: LanguageType.Regional, related: [] }
	],
	projects: [],
	terrain: []
};
