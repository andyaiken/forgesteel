import { Sourcebook } from '@/models/sourcebook';
import { beastheart } from '../classes/beastheart/beastheart';
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
