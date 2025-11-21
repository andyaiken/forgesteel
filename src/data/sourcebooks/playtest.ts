import { KitData } from '@/data/kit-data';
import { PerkData } from '@/data/perk-data';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';
import { TitleData } from '@/data/title-data';
import { beastheart } from '@/data/classes/beastheart/beastheart';
import { summoner } from '@/data/classes/summoner/summoner';

export const playtest: Sourcebook = {
	id: 'playtest',
	name: 'Playtest',
	description: 'Unreleased game content.',
	type: SourcebookType.Official,
	adventures: [],
	ancestries: [],
	careers: [],
	classes: [
		beastheart,
		summoner
	],
	complications: [],
	cultures: [],
	domains: [],
	encounters: [],
	imbuements: [],
	items: [],
	kits: [
		KitData.outrider,
		KitData.predator,
		KitData.stormcrow,
		KitData.warBeast
	],
	monsterGroups: [],
	montages: [],
	negotiations: [],
	perks: [
		PerkData.bornTracker,
		PerkData.rideAlong,
		PerkData.wildRumpus,
		PerkData.wildsExplorer,
		PerkData.peopleSense,
		PerkData.voiceOfTheWild,
		PerkData.youCanPetThem,
		PerkData.trainedThief
	],
	projects: [],
	subclasses: [],
	tacticalMaps: [],
	terrain: [],
	titles: [
		TitleData.safeguarded,
		TitleData.summonerSuccessor,
		TitleData.ringleader,
		TitleData.delegator,
		TitleData.highSummoner
	],
	skills: [],
	languages: []
};
