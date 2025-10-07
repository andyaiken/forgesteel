import { KitData } from '@/data/kit-data';
import { PerkData } from '@/data/perk-data';
import { Sourcebook } from '@/models/sourcebook';
import { beastheart } from '@/data/classes/beastheart/beastheart';
import { summoner } from '@/data/classes/summoner/summoner';

export const playtest: Sourcebook = {
	id: 'playtest',
	name: 'Playtest',
	description: '',
	isHomebrew: false,
	ancestries: [],
	cultures: [],
	careers: [],
	classes: [
		beastheart,
		summoner
	],
	subclasses: [],
	complications: [],
	domains: [],
	kits: [
		KitData.outrider,
		KitData.predator,
		KitData.stormcrow,
		KitData.warBeast
	],
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
	titles: [],
	items: [],
	imbuements: [],
	monsterGroups: [],
	skills: [],
	languages: [],
	projects: [],
	terrain: []
};
