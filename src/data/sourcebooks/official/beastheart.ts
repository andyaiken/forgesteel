import { PerkData } from '@/data/perk-data';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';
import { beastheart } from '@/data/classes/beastheart/beastheart';

export const beastheartSourcebook: Sourcebook = {
	id: 'beastheart',
	name: 'The Beastheart',
	description: 'Contains the Beastheart class and perks.',
	type: SourcebookType.Official,
	adventures: [],
	ancestries: [],
	careers: [],
	classes: [
		beastheart
	],
	complications: [],
	cultures: [],
	domains: [],
	encounters: [],
	imbuements: [],
	items: [],
	kits: [],
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
	titles: [],
	skills: [],
	languages: []
};
