import { LeveledImplementData } from '@/data/items/leveled-implement-data';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';
import { TitleData } from '@/data/title-data';
import { TrinketData } from '@/data/items/trinket-data';
import { summoner } from '@/data/classes/summoner/summoner';

export const summonerSourcebook: Sourcebook = {
	id: 'summoner',
	name: 'The Summoner',
	description: 'Contains the Summoner class, items, and titles.',
	type: SourcebookType.Official,
	adventures: [],
	ancestries: [],
	careers: [],
	classes: [
		summoner
	],
	complications: [],
	cultures: [],
	domains: [],
	encounters: [],
	imbuements: [],
	items: [
		// 1st Echelon Trinkets
		TrinketData.snakerattleBangle,
		// 2nd Echelon Trinkets
		TrinketData.abyssalMapInk,
		TrinketData.graspOfTheChainedHand,
		TrinketData.thunderChariot,
		// 3rd Echelon Trinkets
		TrinketData.crossOfTheScornedPuppeteer,
		TrinketData.crystallizedEssence,
		TrinketData.warbannerOfPride,
		// 4th Echelon Trinkets
		TrinketData.hagbasket,
		TrinketData.warbannerOfWrath,
		// Levelled Implements
		LeveledImplementData.fieldCommandersBaton,
		LeveledImplementData.rexScepter,
		LeveledImplementData.sanctuaryHorn,
		LeveledImplementData.wandOfTheUnheardOrchestra
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
	titles: [
		TitleData.safeguarded,
		TitleData.sigilwright,
		TitleData.summonerSuccessor,
		TitleData.ringleader,
		TitleData.delegator,
		TitleData.highSummoner
	],
	skills: [],
	languages: []
};
