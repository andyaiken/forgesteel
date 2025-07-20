import { Career } from '../../models/career';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const aristocrat: Career = {
	id: 'career-aristocrat',
	name: 'Aristocrat',
	description: 'Career? Who needs a career when you’re born into money! Or marry into it! Or con your way into it! Whatever the case, you didn’t need to work thanks to (someone’s) generational wealth.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'career-aristocrat-feature-1',
			listOptions: [ SkillList.Interpersonal ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'career-aristocrat-feature-2',
			listOptions: [ SkillList.Lore ]
		}),
		FactoryLogic.feature.createLanguageChoice({
			id: 'career-aristocrat-feature-3'
		}),
		FactoryLogic.feature.createBonus({
			id: 'career-aristocrat-feature-4',
			field: FeatureField.Renown,
			value: 1
		}),
		FactoryLogic.feature.createBonus({
			id: 'career-aristocrat-feature-5',
			field: FeatureField.Wealth,
			value: 1
		}),
		FactoryLogic.feature.createPerk({
			id: 'career-aristocrat-feature-6',
			lists: [ PerkList.Lore ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-aristocrat-ii-1',
				name: 'Blood Money',
				description: 'When you entered adulthood, you heard unsavory whispers about your family’s fortune before learning that their wealth came at the cost of others’ suffering. Whether you shed light on the secret or not, you left to become a hero stripped of noble title.'
			},
			{
				id: 'career-aristocrat-ii-2',
				name: 'Charmed Life',
				description: 'Through some treasure or innate ability, you were able to defraud other aristocrats. You did it for fun. When you were found out, you lost your status. Whether you served time or escaped from punishment, you decided to rehabilitate yourself and became a hero.'
			},
			{
				id: 'career-aristocrat-ii-3',
				name: 'Inheritance',
				description: 'The guardians who instilled in you the virtues of doing the right thing were murdered in a senseless petty robbery. Though their wealth was bequeathed to you, it did little to assuage the guilt you felt for being unable to stop the deadly crime. You decided to use your riches to fund your life as a hero, whether publicly or using an alter ego.'
			},
			{
				id: 'career-aristocrat-ii-4',
				name: 'Privileged Position',
				description: 'Life outside the manor never piqued your interest. You had everything you wanted. It came as a surprise when the peasants came to overthrow your family. You narrowly escaped, and for the first time witnessed the world. It caused you to become a hero for the people, fighting against inequities.'
			},
			{
				id: 'career-aristocrat-ii-5',
				name: 'Royal Pauper',
				description: 'Seeking a break from noble duties, you sought a lookalike to switch identities with. It went so well that you made a habit of switching whenever bored. Unfortunately, your counterpart became so good at imitating you that they convinced everyone you were an impostor. You lost contact with your family, but pursue a heroic path free of the pomp of your old life.'
			},
			{
				id: 'career-aristocrat-ii-6',
				name: 'Wicked Secret',
				description: 'One parent passed away when you were a baby and the other remarried years later. Then that parent died under suspicious circumstances. Their spouse ousted you, and you were banished (and possibly hunted). Rising from tragedy, you now seek to right the wrongs of the world.'
			}
		],
		selectedID: null
	}
};
