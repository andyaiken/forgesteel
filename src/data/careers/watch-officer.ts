import { Career } from '../../models/career';
import { FactoryLogic } from '../../logic/factory-logic';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const watchOfficer: Career = {
	id: 'career-watch-officer',
	name: 'Watch Officer',
	description: 'You served as an officer of the law for a local government. You might have been a single person in a much larger city watch or the only constable patrolling a small village.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'career-watch-officer-feature-1',
			listOptions: [ SkillList.Intrigue ],
			selected: [ 'Alertness' ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'career-watch-officer-feature-2',
			listOptions: [ SkillList.Intrigue ],
			count: 2
		}),
		FactoryLogic.feature.createLanguageChoice({
			id: 'career-watch-officer-feature-3',
			count: 2
		}),
		FactoryLogic.feature.createPerk({
			id: 'career-watch-officer-feature-4',
			lists: [ PerkList.Exploration ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-watch-officer-ii-1',
				name: 'Bigger Fish',
				description: 'You grew bored and disillusioned with chasing down petty thieves and imprisoning folks just trying to survive. Surely there are greater threats in the world. You will find that evil wherever it may lurk, and you’ll be the one to stop it.'
			},
			{
				id: 'career-watch-officer-ii-2',
				name: 'Corruption Within',
				description: 'You joined the force to help the helpless and bring justice to those wronged. You weren’t prepared for the rampant corruption reaching the top of your organization. You refused to cover for your fellow officers and were told in no simple terms to leave town or face the consequences. Now you travel as a hero, acting as the protector you always wanted to be.'
			},
			{
				id: 'career-watch-officer-ii-3',
				name: 'Frame Job',
				description: 'Your partner was murdered. That much is irrefutable. But you didn’t do it, despite what the evidence implies. When it became clear you’d take the fall, you fled, leaving everything behind. Not content to cower in the shadows, you decided to adventure under a new name while you work to clear your own.'
			},
			{
				id: 'career-watch-officer-ii-4',
				name: 'Missing Mentor',
				description: 'You learned everything you know about the job from someone you always looked up to in a corrupt organization. One night, they sent you a cryptic message saying they had discovered “something big,” but before you found out more, they disappeared. No longer sure who you could trust, you slipped away and sought a new life. Now you do what good you can and search to find the truth.'
			},
			{
				id: 'career-watch-officer-ii-5',
				name: 'One That Got Away',
				description: 'A particularly violent or depraved criminal began targeting you - perhaps stealing something personal or hurting someone you love - after slipping through your grasp. You left your career to pursue the criminal, but the trail has gone cold … for now. Might as well help folk in the meantime.'
			},
			{
				id: 'career-watch-officer-ii-6',
				name: 'Powerful Enemies',
				description: 'You made it your responsibility to root out and bring down the region’s foremost crime syndicate. They sent goons to burn down your home and teach you a lesson, leaving you bleeding in the street with nothing left except your life. You’ve since taken on the life of a hero to gain the power and influence you need to destroy the syndicate once and for all.'
			}
		],
		selected: null,
		selectedID: null
	}
};
