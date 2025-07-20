import { Career } from '../../models/career';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const sage: Career = {
	id: 'career-sage',
	name: 'Sage',
	description: 'From an early age, you dedicated yourself to learning, whether you shared the knowledge of the world with others or sought out secret lore only for yourself.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'career-sage-feature-1',
			listOptions: [ SkillList.Lore ],
			count: 2
		}),
		FactoryLogic.feature.createLanguageChoice({
			id: 'career-sage-feature-2'
		}),
		FactoryLogic.feature.createBonus({
			id: 'career-sage-feature-3',
			field: FeatureField.ProjectPoints,
			value: 240
		}),
		FactoryLogic.feature.createPerk({
			id: 'career-sage-feature-4',
			lists: [ PerkList.Lore ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-sage-ii-1',
				name: 'Bookish Ideas',
				description: 'You were always content to live a peaceful life in your library, until you found that one book - the one that told the tale of heroes who had saved the timescape. They didn’t spend their days behind a desk. They made a real difference. It was time for you to do the same.'
			},
			{
				id: 'career-sage-ii-2',
				name: 'Cure the Curse',
				description: 'You used to think knowledge could fix everything. You were wrong. When someone you loved fell under a curse, the means to cure them couldn’t be found in any of the books you owned. But that wasn’t going to stop you. The answers are out there, and you’ll find them even if you have to face down death to do so.'
			},
			{
				id: 'career-sage-ii-3',
				name: 'Lost Library',
				description: 'An evil mage took all your books for themself, cackling at your impotence as they raided your shelves. Now, you’re off to search through ancient ruins and secret libraries to rebuild your collection of rare tomes - and to find the mage who stole from you.'
			},
			{
				id: 'career-sage-ii-4',
				name: 'Paper Guilt',
				description: 'While transcribing ancient texts, you and another scribe discovered a shelf of long-forgotten books. At your suggestion, your companion started work on one and vanished along with the tome. Your guilt drove you to seek out your friend and prevent others from falling to similar dangers.'
			},
			{
				id: 'career-sage-ii-5',
				name: 'Unforeseen Futures',
				description: 'In your pursuit of ancient knowledge, you discovered a prophecy that has yet to come to pass. And that prophecy involves someone who might be … you. Since your discovery, strange dreams have plagued you, driving you to seek out your destiny.'
			},
			{
				id: 'career-sage-ii-6',
				name: 'Vanishing',
				description: 'At first you thought it was your imagination, and you brushed off the disappearance of random sentences in historical books. Then as the books changed to entirely blank pages, the disappearances became difficult to ignore, particularly those involving ancient or critical text. Driven by the desire to preserve knowledge, you have made it your purpose to restore and reverse those vanishing texts before they forever disappear.'
			}
		],
		selectedID: null
	}
};
