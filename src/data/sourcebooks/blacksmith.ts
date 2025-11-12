import { AncestryData } from '../ancestry-data';
import { BlacksmithItemData } from '../items/blacksmith-item-data';
import { KitData } from '../kit-data';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

export const blacksmith: Sourcebook = {
	id: 'blacksmith',
	name: 'Blacksmith\'s Guild',
	description: 'Community-created content from the [Blacksmith\'s Guild](https://tabletopnonsenseverse.myshopify.com/).',
	type: SourcebookType.ThirdParty,
	ancestries: [
		AncestryData.goblinSquad
		// Psi-Borg
	],
	careers: [],
	complications: [],
	cultures: [],
	classes: [],
	domains: [],
	imbuements: [],
	items: [
		BlacksmithItemData.abundanceOfLoveAndReticence,
		BlacksmithItemData.braidedDecay,
		BlacksmithItemData.darkStarPlate,
		BlacksmithItemData.shiftingTides,
		BlacksmithItemData.siegeEnder,
		BlacksmithItemData.titanShield,
		BlacksmithItemData.wingedSandals
		// Psi-Borg Implants
	],
	kits: [
		KitData.barnacle,
		KitData.condor,
		KitData.eagle,
		KitData.juggernaut,
		KitData.mauler,
		KitData.sunWukong,
		KitData.swift
	],
	monsterGroups: [],
	perks: [],
	projects: [
		// Psi-Borg Projects
	],
	subclasses: [],
	terrain: [],
	titles: [],
	skills: [],
	languages: []
};
