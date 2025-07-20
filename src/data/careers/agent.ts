import { Career } from '../../models/career';
import { FactoryLogic } from '../../logic/factory-logic';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const agent: Career = {
	id: 'career-agent',
	name: 'Agent',
	description: 'You worked as a spy for a government or organization.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'career-agent-feature-1',
			listOptions: [ SkillList.Intrigue ],
			selected: [ 'Sneak' ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'career-agent-feature-2',
			listOptions: [ SkillList.Interpersonal ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'career-agent-feature-3',
			listOptions: [ SkillList.Intrigue ]
		}),
		FactoryLogic.feature.createLanguageChoice({
			id: 'career-agent-feature-4',
			count: 2
		}),
		FactoryLogic.feature.createPerk({
			id: 'career-agent-feature-5',
			lists: [ PerkList.Intrigue ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-agent-ii-1',
				name: 'Disavowed',
				description: 'While on a dangerous espionage assignment, things went sideways. Although you escaped with your life, the mission was a public failure thanks to bad information your agency gave you. They denied you work for them, and you went on the run. Hero work will let you survive and clear your name.'
			},
			{
				id: 'career-agent-ii-2',
				name: 'Faceless',
				description: 'Your identity was always hidden. It was your way of protecting those around you because the work you did spying on powerful entities came with dangers. Then your world came crashing down when an enemy agent unmasked you, causing you to lose everything - your privacy, livelihood, loved ones, all gone in the blink of an eye. Instead of going into hiding, you became a public hero to protect the innocent in the name of those you lost.'
			},
			{
				id: 'career-agent-ii-3',
				name: 'Free Agent',
				description: 'There was a time in your life when you used to sell information to the highest bidder. Your acts were unsanctioned by any one organization, but you were well-connected enough to trade in secrets. Politics never mattered much to you until the information you sold wound up causing a ripple effect of harm that eventually destroyed the place you once called home. You became a hero to make up for your past.'
			},
			{
				id: 'career-agent-ii-4',
				name: 'Informed',
				description: 'After years of cultivating a rich list of informants, one of those informants risked everything to expose the heinous plans of powerful individuals. You promised to protect your informant, but your agency left them hanging - literally. You cut ties with your employer and swore to always make good on your word as a hero.'
			},
			{
				id: 'career-agent-ii-5',
				name: 'Spies and Lovers',
				description: 'While embedded in an undercover assignment, you fell for someone on the other side. They discovered you were a double-agent and though you insisted your feelings were real, the deceit cut too deep for your love interest to ignore. They exposed you, spurned you, or died because of their closeness to you. You left the espionage business to become a hero with nothing to hide.'
			},
			{
				id: 'career-agent-ii-6',
				name: 'Turncoat',
				description: 'You spent your life in service of your country or an organization that upheld your values. During your undercover operations, you discovered everything you were told was a lie. Whether you confronted your superiors or were exposed, you were stripped of your service medals before you left to become a true hero.'
			}
		],
		selectedID: null
	}
};
