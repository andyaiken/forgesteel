import { FeatureType } from '../../enums/feature-type';
import { Perk } from '../../models/perk';
import { PerkList } from '../../enums/perk-list';

export class CraftingPerkData {
	static areaOfExpertise: Perk = {
		id: 'perk-area-of-expertise',
		name: 'Area of Expertise',
		description: 'Choose one skill from the crafting skill group that you have. When you roll an 11 or lower on an easy or medium test with this skill, you instead take the 12-16 result. Additionally, if you spend 1 minute inspecting an object related to this skill, you can approximate its value and learn of any flaws in its construction.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static expertArtisan: Perk = {
		id: 'perk-expert-artisan',
		name: 'Expert Artisan',
		description: 'Whenever you make a test as part of a research or crafting project that uses a skill you have from the crafting skill group, you can roll the test twice and use either roll.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static handy: Perk = {
		id: 'perk-handy',
		name: 'Handy',
		description: 'When you make a test to craft something and don’t have a skill that applies, you gain a +1 bonus to the roll.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static homesteader: Perk = {
		id: 'perk-homesteader',
		name: 'Homesteader',
		description: 'You gain an artisan follower, in addition to followers you acquire through renown or other means.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static improvisationCreation: Perk = {
		id: 'perk-improvisation-creation',
		name: 'Improvisation Creation',
		description: 'Even without tools, you can quickly jury-rig a mundane item or repair a mundane piece of equipment related to a skill you have from the crafting skill group without needing to make a test. That items works for 1 hour or 1 use (whichever comes first) then breaks beyond repair. For example, if you have the carpentry skill, you can repair a rickety wooden bridge long enough for a group of creatures to cross it or build a simple shovel made of wood that works for 1 hour.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static inspiredArtisan: Perk = {
		id: 'perk-inspired-artisan',
		name: 'Inspired Artisan',
		description: 'When you make a project roll using a skill from the crafting skill group that you have, you can spend a hero token to make another project roll for the same project as part of the same respite activity. You can’t use this perk more than once per respite.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static travellingArtisan: Perk = {
		id: 'perk-travelling-artisan',
		name: 'Travelling Artisan',
		description: 'On a day when you don’t take a respite, you can spend an uninterrupted hour working on a crafting project that uses a crafting skill you have. If you do so, you gain 1d10 points toward that project.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};
}
