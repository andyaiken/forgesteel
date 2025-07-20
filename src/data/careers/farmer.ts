import { Career } from '../../models/career';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const farmer: Career = {
	id: 'career-farmer',
	name: 'Farmer',
	description: 'You grew crops or cared for livestock.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'career-farmer-feature-1',
			listOptions: [ SkillList.Interpersonal ],
			selected: [ 'Handle Animals' ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'career-farmer-feature-2',
			listOptions: [ SkillList.Exploration ],
			count: 2
		}),
		FactoryLogic.feature.createLanguageChoice({
			id: 'career-farmer-feature-3'
		}),
		FactoryLogic.feature.createBonus({
			id: 'career-farmer-feature-4',
			field: FeatureField.ProjectPoints,
			value: 120
		}),
		FactoryLogic.feature.createPerk({
			id: 'career-farmer-feature-5',
			lists: [ PerkList.Exploration ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-farmer-ii-1',
				name: 'Blight',
				description: 'A horrible blight swept over your homeland, sickening the livestock and causing crops to rot. No one knows whether the blight is of natural origin or something more malevolent, but you set out in search of a way to cleanse the land of this affliction.'
			},
			{
				id: 'career-farmer-ii-2',
				name: 'Bored',
				description: 'You’ve always wanted so much more than gathering eggs and milking cows. You kept a secret journal of your dreams, filled with all the things you wanted. When your parent found the journal, they burned it and told you to keep your head out of the clouds. In response, you gathered what you could in a pack and left everything else behind, seeking a life of adventure.'
			},
			{
				id: 'career-farmer-ii-3',
				name: 'Cursed',
				description: 'While tilling your fields, you found something in the dirt. Perhaps it was a chipped and dented weapon, a piece of ancient jewelry, or something altogether unique. Excited by your find, you showed it to a loved one, but when they touched it, something happened. You now know it was a curse conveyed by the item, though you don’t know why it affected them and not you. You left your old life in search of answers.'
			},
			{
				id: 'career-farmer-ii-4',
				name: 'Hard Times',
				description: 'Your farm had always been prosperous, until the last few years. Changes in the weather caused smaller yields until you could no longer pay your tithe to the local noble. Her soldiers took what items of value they found, including a precious family heirloom. You left the struggling farm behind to find a better life.'
			},
			{
				id: 'career-farmer-ii-5',
				name: 'Razed',
				description: 'Your animals were killed, your crops and home set ablaze. The culprits might have been wandering bandits, raiders from a nearby kingdom, or hired thugs sent by a rival farm. Whoever they were, they left you with nothing. You couldn’t face the thought of starting again from scratch, so you took up a life of heroism to protect others from such villainy.'
			},
			{
				id: 'career-farmer-ii-6',
				name: 'Stolen',
				description: 'Your family bred horses - beautiful creatures that few could rival on the track and in the jousting lists. When a local noble arrived with an offer to buy your prized stallion, your father refused. The noble struck him down where he stood and stole the horse. Without that stallion, the renowned bloodline would end. You intend to get them back - and get revenge.'
			}
		],
		selectedID: null
	}
};
