import { Career } from '../models/career';
import { FeatureLogic } from '../logic/feature-logic';
import { SkillList } from '../enums/skill-list';

export class CareerData {
	static artisan: Career = {
		id: 'career-artisan',
		name: 'Artisan',
		description: 'You started off making and selling art or useful wares.',
		features: [
			FeatureLogic.createSkillChoiceFeature({
				id: 'artisan-feature-1',
				name: 'Skills',
				description: '',
				listOptions: [ SkillList.Crafting ],
				count: 2
			}),
			FeatureLogic.createLanguageChoiceFeature({
				id: 'artisan-feature-2',
				name: 'Languages',
				description: ''
			})
		],
		projectPoints: 0,
		title: FeatureLogic.createFeature({
			id: 'artisan-title',
			name: 'Expert Artisan',
			description: 'Whenever you make a test as part of a research or crafting project that uses a skill you have from the crafting skill group, you can roll the test twice and use either roll.'
		})
	};

	static getCareers = () => {
		return [
			this.artisan
		];
	};
}
