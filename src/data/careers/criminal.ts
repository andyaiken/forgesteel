import { Career } from '../../models/career';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const criminal: Career = {
	id: 'career-criminal',
	name: 'Criminal',
	description: 'You once worked as a bandit, insurgent, smuggler, outlaw, or even as an assassin.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'career-criminal-feature-1',
			listOptions: [ SkillList.Lore ],
			selected: [ 'Criminal Underworld' ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'career-criminal-feature-2',
			listOptions: [ SkillList.Intrigue ],
			count: 2
		}),
		FactoryLogic.feature.createLanguageChoice({
			id: 'career-criminal-feature-3'
		}),
		FactoryLogic.feature.createBonus({
			id: 'career-criminal-feature-4',
			field: FeatureField.ProjectPoints,
			value: 120
		}),
		FactoryLogic.feature.createPerk({
			id: 'career-criminal-feature-5',
			lists: [ PerkList.Intrigue ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-criminal-ii-1',
				name: 'Antiquity Procurement',
				description: 'You stole, smuggled, and sold antiquities. In your haste to make a quick sale, you didn’t fully vet a client and they subsequently robbed your warehouse. When the items you had stolen were taken from you, you realized the harm you had caused. Now you adventure to find those items you lost and return them where they belong.'
			},
			{
				id: 'career-criminal-ii-2',
				name: 'Atonement',
				description: 'The last criminal job you pulled led to the death of someone or the destruction of something you love. To make up for the loss you caused, you left your criminal ways behind and became a hero.'
			},
			{
				id: 'career-criminal-ii-3',
				name: 'Friendly Priest',
				description: 'You went to prison for your crimes and eventually escaped. An elderly priest took you in and shielded you from the law, convinced that your soul wasn’t corrupt. They never judged you for your past, speaking only of the future. Eventually, the priest died, imparting final words that inspired you to become a hero.'
			},
			{
				id: 'career-criminal-ii-4',
				name: 'Shadowed Influence',
				description: 'You spent years blackmailing and manipulating nobles for influence and wealth until a scheme went wrong. You were publicly exposed, and after a narrow escape, you reevaluated your life. Under a new identity, you work as a hero and hope no one looks at your past too closely.'
			},
			{
				id: 'career-criminal-ii-5',
				name: 'Simply Survival',
				description: 'Stealing was a matter of survival for you and not what defined you - at least in your mind. But when your thieving actions lead to innocent folk being harmed, you knew you could be better. You turned your back on your old life, though your old skills come in handy.'
			},
			{
				id: 'career-criminal-ii-6',
				name: 'Stand Against Tyranny',
				description: 'When a tyrant rose to power in your homeland, they began cracking down on all criminals with deadly raids and public executions. The nature of the crime didn’t matter - pickpockets and beggars were made to kneel before the axe alongside murderers. After losing enough friends, you stood up and joined the resistance - not just against this tyrant, but against authoritarians anywhere.'
			}
		],
		selectedID: null
	}
};
