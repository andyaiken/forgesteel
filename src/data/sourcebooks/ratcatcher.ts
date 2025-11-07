import { AncestryData } from '../ancestry-data';
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
	cultures: [],
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
	skills: [],
	languages: [],
	projects: [],
	terrain: []
};
