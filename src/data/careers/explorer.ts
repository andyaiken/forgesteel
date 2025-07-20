import { Career } from '../../models/career';
import { FactoryLogic } from '../../logic/factory-logic';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const explorer: Career = {
	id: 'career-explorer',
	name: 'Explorer',
	description: 'You ventured into uncharted areas and made your living as a cartographer, researcher, resource seeker, or treasure hunter.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'career-explorer-feature-1',
			listOptions: [ SkillList.Exploration ],
			selected: [ 'Navigate' ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'career-explorer-feature-2',
			listOptions: [ SkillList.Exploration ],
			count: 2
		}),
		FactoryLogic.feature.createLanguageChoice({
			id: 'career-explorer-feature-3',
			count: 2
		}),
		FactoryLogic.feature.createPerk({
			id: 'career-explorer-feature-4',
			lists: [ PerkList.Exploration ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-explorer-ii-1',
				name: 'Awakening',
				description: 'In an uncharted area, you awakened some dark horror. You have turned to the life of a hero to put an end to the horror you unleashed and keep other hidden dangers at bay.'
			},
			{
				id: 'career-explorer-ii-2',
				name: 'Missing Piece',
				description: 'You made an important but dangerous discovery about a treasure or ancient ritual that could spell mass destruction. Then the unthinkable happened when an unscrupulous colleague, spy, or treasure hunter stole your research notes. You’re looking for them now, and anyone else who might use such discoveries for ill.'
			},
			{
				id: 'career-explorer-ii-3',
				name: 'Nothing Belongs in a Museum',
				description: 'Traversing seas and mountains to collect valuable artifacts for cultural institutions was once your way of life. When people died trying to reclaim one of the objects you took, you realized the truth. Your work was part of a larger problem of misappropriation and the best place for these significant objects wasn’t in a museum but with the people who created them. You set out to return what had been taken and to protect others from theft.'
			},
			{
				id: 'career-explorer-ii-4',
				name: 'Unschooled',
				description: 'You delved into dungeons and far-off places by studying them in books. You were an explorer who never felt the need to experience the dangers your peers did. However, your theory about a lost world cost you your reputation. It gave you the impetus to go on adventures and stand up for those with different ideas.'
			},
			{
				id: 'career-explorer-ii-5',
				name: 'Wanderlust',
				description: 'You saw yourself as an observer and operated within a code of conduct. You swore to never interfere with a group by exposing them to your technology, knowledge, or values. When faced with a moral conundrum, you either broke your code or stood idly by - and suffered the consequences. During this incident, you lost your observation journal but became a hero who refuses to let evil stand unchecked.'
			},
			{
				id: 'career-explorer-ii-6',
				name: 'Wind in your Sails',
				description: 'As a seafaring explorer, you lived to chart unknown courses. Though travel on the high seas was fraught with danger, the destination was always rewarding in riches, knowledge, or some other way that was meaningful to you. Your luck ran out when your ship was destroyed by pirates or other enemy forces. You’ve taken to protecting those who seek safe passage while also hoping to avenge your crew.'
			}
		],
		selectedID: null
	}
};
