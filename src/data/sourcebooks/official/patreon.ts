import { KitData } from '@/data/kit-data';
import { PerkData } from '@/data/perk-data';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';
import { beastheart } from '@/data/classes/beastheart/beastheart';

export const patreon: Sourcebook = {
	id: 'patreon',
	name: 'Patreon Content',
	description: 'Playtest content for Patreon subscribers.',
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
	titles: [],
	skills: [],
	languages: []
};
