import { Career } from '../../models/career';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const warden: Career = {
	id: 'career-warden',
	name: 'Warden',
	description: 'You protected a wild region from those who sought to harm it, such as poachers and cultists bent on the destruction of the natural world. Knowing your land well, you could also serve as a guide or the leader of a rescue party for those wandering the wilds.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'career-warden-feature-1',
			listOptions: [ SkillList.Lore ],
			selected: [ 'Nature' ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'career-warden-feature-2',
			listOptions: [ SkillList.Exploration ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'career-warden-feature-3',
			listOptions: [ SkillList.Intrigue ]
		}),
		FactoryLogic.feature.createLanguageChoice({
			id: 'career-warden-feature-4'
		}),
		FactoryLogic.feature.createBonus({
			id: 'career-warden-feature-5',
			field: FeatureField.ProjectPoints,
			value: 120
		}),
		FactoryLogic.feature.createPerk({
			id: 'career-warden-feature-6',
			lists: [ PerkList.Exploration ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-warden-ii-1',
				name: 'Betrayed',
				description: 'When outsiders arrived in your lands with the intent to exploit the wilds for their resources, you spoke out against them. However, several other wardens spoke in favor of these outsiders and allowed them in to despoil nature. Refusing to watch your homeland destroyed, you left. Now you help others avoid such a fate.'
			},
			{
				id: 'career-warden-ii-2',
				name: 'Corruption',
				description: 'A disease has infected the lands you protect, causing animals to become violent and twisting plants into something dark and sinister. You’ve tried everything, magical and mundane, to stop the scourge, but it continues to spread. As such, you’ve set out in search of a cure or an unblighted land to protect.'
			},
			{
				id: 'career-warden-ii-3',
				name: 'Exiled',
				description: 'You made a mistake that could not be forgiven. The other wardens of the region decided your fate, exiling you from your lands with an order never to return.'
			},
			{
				id: 'career-warden-ii-4',
				name: 'Honor the Fallen',
				description: 'A group of heroes arrived in your territory with trouble close on their heels. You fought alongside them to turn back the evil, but it was too much. The heroes fell, and your wilderness was forever altered. Though your lands are beyond saving, there are other lands you can help.'
			},
			{
				id: 'career-warden-ii-5',
				name: 'Portents',
				description: 'There were signs. You tried to ignore them, but when a great beast died at your feet, you had to recognize the truth. You were meant to leave your home territory, meant to fight a battle for the fate of all lands - and so you gave up the only life you’ve ever known.'
			},
			{
				id: 'career-warden-ii-6',
				name: 'Theft',
				description: 'You were responsible for guarding something precious, something vital to your region’s survival. But you let someone in, and they betrayed your trust by stealing the thing you were meant to guard. You left your chosen territory to atone for your mistake.'
			}
		],
		selectedID: null
	}
};
