import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureType } from '../../enums/feature-type';
import { Perk } from '../../models/perk';
import { PerkList } from '../../enums/perk-list';

export class LorePerkData {
	static butIKnowWhoDoes: Perk = {
		id: 'perk-but-i-know-who-does',
		name: 'But I Know Who Does',
		description: 'When you fail a test to recall lore with a skill from the lore skill group that you have, you know the closest place where the information you seek with that test can be found. It could be a sage, in a library, or somewhere deep in a dungeon. The Director determines the source’s location.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static eideticMemory: Perk = {
		id: 'perk-eidetic-memory',
		name: 'Eidetic Memory',
		description: 'Your mind is an encyclopedia, though not always an easy one to organize. After finishing a respite, choose one skill from the lore skill you don’t have. You gain that skill until you finish a respite. Additionally, if you spend at least 1 minute reading a page of text, you can memorize its contents. You can memorize entire books this way.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static expertSage: Perk = {
		id: 'perk-expert-sage',
		name: 'Expert Sage',
		description: 'Whenever you make a test as part of a research or crafting project that uses a skill you have from the lore skill group, you can roll the test twice and use either roll.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static iveReadAboutThisPlace: Perk = {
		id: 'perk-ive-read-about-this-place',
		name: 'I\'ve Read About This Place',
		description: `
When you enter a settlement you’ve never been to before, you can ask the Director one of the following questions:

* Who’s the most influential public figure in this settlement?
* Who in this town would be friendly to us right now?
* What does this settlement need most from outsiders?

If the Director does not have an answer to the question you ask, you can instead ask a different question.`,
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static linguist: Perk = {
		id: 'perk-linguist',
		name: 'Linguist',
		description: 'You have an ear for languages.',
		type: FeatureType.Multiple,
		data: {
			features: [
				FactoryLogic.feature.create({
					id: 'perk-linguist-1',
					name: 'Linguist',
					description: 'If you spend at least 7 days in a place where you regularly hear a language you don’t know spoken, you can pick up enough of that language to hold a conversation, though you still can’t read it. After doing so, you can learn it twice as fast as normal.'
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
		description: 'When you make a test to recall lore and don’t have a skill that applies to the test, you gain a +1 bonus to the test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static specialist: Perk = {
		id: 'perk-specialist',
		name: 'Specialist',
		description: 'You are a leading expert on a particular subject. Choose one skill you have from the lore skill group. You always have a double edge on tests made to recall lore that use this skill. Additionally, you have at least one major contribution to this field, such as a thesis, field guide, gazetteer, or even an ongoing newsletter you maintain. This contribution grants you notoriety in your field. You treat your Renown as 1 higher when negotiating with people who know of your work, or 2 higher if they have the skill that you chose for this perk.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static travellingSage: Perk = {
		id: 'perk-travelling-sage',
		name: 'Travelling Sage',
		description: 'On a day when you don’t take a respite, you can spend an uninterrupted hour working on a research project that uses a lore skill you have. If you do so, you gain 1d10 points toward that project.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};
}
