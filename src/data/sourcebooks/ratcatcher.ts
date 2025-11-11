import { AncestryData } from '@/data/ancestry-data';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

export const ratcatcher: Sourcebook = {
	id: 'ratcatcher',
	name: 'Ratcatcher Magazine',
	description: 'Community-created content from [Ratcatcher Magazine](https://tidalwavegames.itch.io/ratcatcher-magazine).',
	type: SourcebookType.ThirdParty,
	ancestries: [
		AncestryData.anthousai,
		AncestryData.dryad
	],
	careers: [],
	complications: [],
	cultures: [],
	classes: [],
	domains: [],
	imbuements: [],
	items: [],
	kits: [],
	monsterGroups: [],
	perks: [],
	projects: [],
	subclasses: [],
	terrain: [],
	titles: [],
	skills: [],
	languages: []
};
