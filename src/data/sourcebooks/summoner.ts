import { Sourcebook } from '../../models/sourcebook';
import { summoner } from '../classes/summoner/summoner';

export const summonerSourcebook: Sourcebook = {
	id: 'summoner',
	name: 'Summoner',
	description: 'Contains the Summoner class.',
	isHomebrew: false,
	ancestries: [],
	cultures: [],
	careers: [],
	classes: [
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
