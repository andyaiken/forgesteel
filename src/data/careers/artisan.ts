import { Career } from '../../models/career';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const artisan: Career = {
	id: 'career-artisan',
	name: 'Artisan',
	description: 'You made and sold useful wares.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'career-artisan-feature-1',
			listOptions: [ SkillList.Crafting ],
			count: 2
		}),
		FactoryLogic.feature.createLanguageChoice({
			id: 'career-artisan-feature-2'
		}),
		FactoryLogic.feature.createBonus({
			id: 'career-artisan-feature-3',
			field: FeatureField.ProjectPoints,
			value: 240
		}),
		FactoryLogic.feature.createPerk({
			id: 'career-artisan-feature-4',
			lists: [ PerkList.Crafting ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-artisan-ii-1',
				name: 'Continue the Work',
				description: 'A great hero was a fan of the things you created, and gave you a generous commission to create your best work for them. While working on this commission, you and the hero became close friends. The day you finished the work was the same day they disappeared. To honor their legacy, you took up the mantle of a hero with the intent of finishing your friend’s work.'
			},
			{
				id: 'career-artisan-ii-2',
				name: 'Inspired',
				description: 'As you traveled the road selling your wares, troll bandits attacked you. One of the bandits claimed an item belonging to someone precious to you - or perhaps claimed that person’s life - but the rest were driven off or slain by a group of heroes. Seeing the quick work these heroes made of the bandits inspired you to follow in their footsteps.'
			},
			{
				id: 'career-artisan-ii-3',
				name: 'Robbery',
				description: 'A criminal gang stole your goods and harmed a number of people who worked for you. You became a hero to prevent such indignities from being visited upon others, to seek revenge for the assault, or to find the thieves and get your stuff back.'
			},
			{
				id: 'career-artisan-ii-4',
				name: 'Stolen Passions',
				description: 'Your parents discouraged your artistic talents, instead trying to focus your passions on the family business. You refused to dim your spark and continued your work in secret. Enraged at discovering your disobedience, they sold your work to a traveling merchant. You left your hometown, seeking your lost art and encouraging others to live freely.'
			},
			{
				id: 'career-artisan-ii-5',
				name: 'Tarnished Honor',
				description: 'A new patron commissioned some art, but on completion, they refused to pay you and claimed the work as their own. You were accused of plagiarism and run out of town. For you, heroics are about restoring your name and honor.'
			},
			{
				id: 'career-artisan-ii-6',
				name: 'Twisted Skill',
				description: 'You had great success that caused an unscrupulous rival to curse you. For a time, everything you tried to create turned to ruin. You broke the curse through adventuring, and in doing so discovered a new joy and purpose that now defines you.'
			}
		],
		selected: null,
		selectedID: null
	}
};
