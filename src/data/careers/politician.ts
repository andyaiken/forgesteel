import { Career } from '../../models/career';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const politician: Career = {
	id: 'career-politician',
	name: 'Politician',
	description: 'You worked as a leader within a formal, bureaucratic organization or government. You might have been appointed, born, or elected into your position, but getting people to agree and making decisions for the people you serve (or who served you) was your job.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'career-politician-feature-1',
			listOptions: [ SkillList.Interpersonal ],
			count: 2
		}),
		FactoryLogic.feature.createLanguageChoice({
			id: 'career-politician-feature-2'
		}),
		FactoryLogic.feature.createBonus({
			id: 'career-politician-feature-3',
			field: FeatureField.Renown,
			value: 1
		}),
		FactoryLogic.feature.createBonus({
			id: 'career-politician-feature-4',
			field: FeatureField.Wealth,
			value: 1
		}),
		FactoryLogic.feature.createPerk({
			id: 'career-politician-feature-5',
			lists: [ PerkList.Interpersonal ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-politician-ii-1',
				name: 'Diplomatic Immunity',
				description: 'Your political power allowed you to be foolish without consequence. Through sheer carelessness or on a dare, you accidentally harmed or killed an innocent bystander. Due to your position as an official, you faced no consequences. But this event was the final straw for the person you loved or respected most, and they turned away from you. You left the world of political machinations behind to earn back their trust.'
			},
			{
				id: 'career-politician-ii-2',
				name: 'Insurrectionist',
				description: 'You secretly funded a rebel organization intent on overthrowing the corrupt establishment. Someone discovered your treason, and you were forced to leave or risk execution. You became a hero to live and fight another day on behalf of those who have no power.'
			},
			{
				id: 'career-politician-ii-3',
				name: 'Respected Consul',
				description: 'You were seneschal to a leader, able to sway their opinions, but gossip convinced the monarch you were plotting a coup, and you were ousted from court. You became a hero to continue your work making meaningful change in the world.'
			},
			{
				id: 'career-politician-ii-4',
				name: 'Right Side of History',
				description: 'You tried to work on policy change from the inside of a bureaucratic organization. There were others like you who were more vocal. You started to notice those colleagues were disappearing overnight. Not wanting to find out if you were next on the list, you left to enact change in more direct ways.'
			},
			{
				id: 'career-politician-ii-5',
				name: 'Self-Serving',
				description: 'You used your skills to collect incriminating or scandalous information about your opponents to blackmail them. A rival got one step ahead of you and stole your book of dirty secrets, but instead of using it against you, they gave you an opportunity to leave the world of politics behind. Saved from public humiliation, you now use your skills for the greater good.'
			},
			{
				id: 'career-politician-ii-6',
				name: 'Unbound',
				description: 'The red tape required to achieve anything through your political position resulted in a crisis being mishandled and countless people harmed or killed. After that unfortunate event, you resolved to be unfettered by bureaucratic interference and sought to do good through action, not paperwork.'
			}
		],
		selected: null,
		selectedID: null
	}
};
