import { FeatureType } from '@/enums/feature-type';
import { Perk } from '@/models/perk';
import { PerkList } from '@/enums/perk-list';

export class CraftingPerkData {
	static areaOfExpertise: Perk = {
		id: 'perk-area-of-expertise',
		name: 'Area of Expertise',
		description: 'Choose one skill you already have from the crafting skill group. Whenever you obtain a tier 1 outcome on an easy or medium test using this skill, you treat it as a tier 2 outcome instead. Additionally, if you spend 1 minute inspecting an object related to the chosen skill, you can estimate its value and learn of any flaws in its construction.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static expertArtisan: Perk = {
		id: 'perk-expert-artisan',
		name: 'Expert Artisan',
		description: 'Whenever you make a test as part of a crafting or research project that uses a skill you already have from the crafting skill group, you can make the power roll twice and use either roll.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static handy: Perk = {
		id: 'perk-handy',
		name: 'Handy',
		description: 'Whenever you make a test to craft something and don’t have a skill that applies to the test, you gain a +1 bonus to the power roll.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static improvisationCreation: Perk = {
		id: 'perk-improvisation-creation',
		name: 'Improvisation Creation',
		description: 'Without needing to make a test—and even without tools—you can quickly jury-rig or repair a mundane item or piece of equipment related to a skill you have from the crafting skill group. That item lasts for 1 hour or works for one use or activation (whichever comes first, as the Director determines), then breaks beyond repair. For example, if you have the Carpentry skill, you could repair a rickety wooden bridge long enough for a group of creatures to cross it, or build a simple shovel made of wood that can be used for 1 hour.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static inspiredArtisan: Perk = {
		id: 'perk-inspired-artisan',
		name: 'Inspired Artisan',
		description: 'When you make a project roll using a skill from the crafting skill group, you can spend a hero token to make another project roll for the same project as part of the same respite activity. You can’t use this perk more than once per respite.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static travellingArtisan: Perk = {
		id: 'perk-travelling-artisan',
		name: 'Travelling Artisan',
		description: 'On any day when you don’t take a respite, you can spend 1 uninterrupted hour working on a crafting project using a skill you have from the crafting skill group. If you do so, you gain 1d10 project points toward that project.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};
}
