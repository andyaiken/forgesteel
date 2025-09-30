import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureType } from '@/enums/feature-type';
import { Perk } from '@/models/perk';
import { PerkList } from '@/enums/perk-list';

export class LorePerkData {
	static butIKnowWhoDoes: Perk = {
		id: 'perk-but-i-know-who-does',
		name: 'But I Know Who Does',
		description: 'Whenever you fail a test to recall lore using a skill from the lore skill group, you instinctively recall the nearest location where the information you seek might be found. This could be the tower of a local sage, a library in a nearby city, somewhere deep in a dungeon, or any other location of the Director’s determination. The Director can decide that certain lore can’t be revealed this way.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static eideticMemory: Perk = {
		id: 'perk-eidetic-memory',
		name: 'Eidetic Memory',
		description: 'Your mind is an encyclopedia, though not always an easy one to organize. When you finish a respite, choose one skill from the lore skill group that you don’t have. You have that skill until you finish your next respite. Additionally, if you spend 1 uninterrupted minute or more reading any page of text, you can memorize its contents, allowing you to memorize entire books with sufficient time.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static expertSage: Perk = {
		id: 'perk-expert-sage',
		name: 'Expert Sage',
		description: 'Whenever you make a test as part of a crafting or research project using a skill from the lore skill group, you can make the power roll twice and use either roll.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static iveReadAboutThisPlace: Perk = {
		id: 'perk-ive-read-about-this-place',
		name: 'I\'ve Read About This Place',
		description: `
Each time you enter a settlement you’ve never been to before, you can ask the Director one of the following questions:

* Who is the most influential public figure in this settlement?
* Who in this settlement would be the friendliest to us right now?
* What does this settlement need most from outsiders?

If the Director doesn’t have an answer to the question you ask, or doesn’t want to answer, you can instead ask a different question.`,
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static linguist: Perk = {
		id: 'perk-linguist',
		name: 'Linguist',
		description: 'You have an ear for languages. You automatically learn two new languages, as long as you have regularly heard those languages spoken or seen them written before.',
		type: FeatureType.Multiple,
		data: {
			features: [
				FactoryLogic.feature.create({
					id: 'perk-linguist-1',
					name: 'Linguist',
					description: 'If you spend 7 days or more in a place where you regularly hear or read a language you don’t know, you can pick up enough of that language to hold a conversation or understand basic written information. Having picked up a language this way, you can subsequently learn it using the Learn New Language research project at half the usual project goal cost.'
				}),
				FactoryLogic.feature.createLanguageChoice({
					id: 'perk-linguist-2',
					count: 2
				})
			]
		},
		list: PerkList.Lore
	};

	static polymath: Perk = {
		id: 'perk-polymath',
		name: 'Polymath',
		description: 'Whenever you make a test to recall lore and don’t have a skill that applies to the test, you gain a +1 bonus to the power roll.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static specialist: Perk = {
		id: 'perk-specialist',
		name: 'Specialist',
		description: 'You are a leading expert on a particular subject. Choose one skill you have from the lore skill group. You always have a double edge on tests made to recall lore using this skill. Additionally, your specialist knowledge grants you notoriety in fields related to the chosen skill. You treat your Renown as 1 higher when negotiating with an NPC who knows your reputation, or 2 higher if they have the same skill you chose for this perk.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static travellingSage: Perk = {
		id: 'perk-travelling-sage',
		name: 'Travelling Sage',
		description: 'On any day when you don’t take a respite, you can spend 1 uninterrupted hour working on a research project using a skill you have from the lore skill group. If you do so, you gain 1d10 project points toward that project.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};
}
