import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityLogic } from '../logic/ability-logic';
import { CampaignSetting } from '../models/campaign-setting';
import { Career } from '../models/career';
import { Collections } from '../utils/collections';
import { FeatureField } from '../enums/feature-field';
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
				listOptions: [ SkillList.Crafting ],
				count: 2
			}),
			FeatureLogic.createLanguageChoiceFeature({
				id: 'artisan-feature-2'
			}),
			FeatureLogic.createBonusFeature({
				id: 'artisan-feature-3',
				field: FeatureField.ProjectPoints,
				value: 100
			})
		],
		title: FeatureLogic.createFeature({
			id: 'artisan-title',
			name: 'Expert Artisan',
			description: 'Whenever you make a test as part of a research or crafting project that uses a skill you have from the crafting skill group, you can roll the test twice and use either roll.'
		})
	};

	static criminal: Career = {
		id: 'career-criminal',
		name: 'Criminal',
		description: 'You once worked as a bandit, insurgent, smuggler, outlaw, or even as an assassin.',
		features: [
			FeatureLogic.createSkillFeature({
				id: 'criminal-feature-1',
				skill: 'Criminal Underworld'
			}),
			FeatureLogic.createSkillChoiceFeature({
				id: 'criminal-feature-2',
				listOptions: [ SkillList.Intrigue ],
				count: 2
			}),
			FeatureLogic.createLanguageChoiceFeature({
				id: 'criminal-feature-3'
			}),
			FeatureLogic.createBonusFeature({
				id: 'criminal-feature-4',
				field: FeatureField.ProjectPoints,
				value: 50
			})
		],
		title: FeatureLogic.createFeature({
			id: 'criminal-title',
			name: 'Lucky Dog',
			description: 'When you fail a test using any skill from the intrigue skill group, you can roll a d6. You lose Stamina equal to the roll and improve the result of your test by one tier. You can make this roll only once per test.'
		})
	};

	static gladiator: Career = {
		id: 'career-gladiator',
		name: 'Gladiator',
		description: 'In the past, you entertained the masses with flashy displays of violence in the arena.',
		features: [
			FeatureLogic.createSkillChoiceFeature({
				id: 'gladiator-feature-1',
				listOptions: [ SkillList.Exploration ],
				count: 2
			}),
			FeatureLogic.createLanguageChoiceFeature({
				id: 'gladiator-feature-2'
			}),
			FeatureLogic.createBonusFeature({
				id: 'gladiator-feature-3',
				field: FeatureField.Renown,
				value: 2
			})
		],
		title: FeatureLogic.createFeature({
			id: 'gladiator-title',
			name: 'Monologue Champion',
			description: 'When you are not in combat, you can shout to get the attention of all creatures within 10 squares of you. Each creature who is not hostile toward you listens to what you have to say for at least the next minute, or until they sense danger or any form of imminent harm. While creatures are listening to you, your allies gain an edge on tests made to avoid being noticed by those creatures.'
		})
	};

	static laborer: Career = {
		id: 'career-laborer',
		name: 'Laborer',
		description: 'You worked as a farmer, a builder, a lumberjack, a miner, or some other profession engaged in hard manual labor.',
		features: [
			FeatureLogic.createSkillFeature({
				id: 'laborer-feature-1',
				skill: 'Endurance'
			}),
			FeatureLogic.createSkillChoiceFeature({
				id: 'laborer-feature-2',
				options: [ 'Blacksmithing' ],
				listOptions: [ SkillList.Exploration ],
				count: 2
			}),
			FeatureLogic.createLanguageChoiceFeature({
				id: 'laborer-feature-3'
			}),
			FeatureLogic.createBonusFeature({
				id: 'laborer-feature-4',
				field: FeatureField.ProjectPoints,
				value: 50
			})
		],
		title: FeatureLogic.createFeature({
			id: 'laborer-title',
			name: 'Team Backbone',
			description: 'When you take your first turn during a montage test, you can both make a test and assist another hero’s test.'
		})
	};

	static magesApprentice: Career = {
		id: 'career-mages-apprentice',
		name: 'Mage’s Apprentice',
		description: 'For long years, you studied magic under the mentorship of a more experienced mage.',
		features: [
			FeatureLogic.createSkillFeature({
				id: 'mages-apprentice-feature-1',
				skill: 'Magic'
			}),
			FeatureLogic.createSkillChoiceFeature({
				id: 'mages-apprentice-feature-2',
				listOptions: [ SkillList.Lore ],
				count: 2
			}),
			FeatureLogic.createLanguageChoiceFeature({
				id: 'mages-apprentice-feature-3'
			}),
			FeatureLogic.createBonusFeature({
				id: 'mages-apprentice-feature-4',
				field: FeatureField.Renown,
				value: 1
			})
		],
		title: FeatureLogic.createAbilityFeature({
			ability: AbilityLogic.createAbility({
				id: 'mages-apprentice-title',
				name: 'Arcane Trick',
				description: 'You cast an entertaining spell that creates a minor but impressive magical effect.',
				type: AbilityLogic.createTypeAction(),
				keywords: [ AbilityKeyword.Magic ],
				distance: [ AbilityLogic.createDistanceSelf() ],
				target: 'Self',
				effect: `
Choose one of the following effects:
• You teleport an unattended size 1T or 1S object within 1 square of you to an unoccupied space within 1 square of you.
• Until the start of your next turn, a part of your body shoots a shower of harmless noisy sparks that give off light within 1 square of you.
• You ignite or snuff out (your choice) every mundane light source within 1 square of you.
• You make up to 1 pound of edible food you can touch taste delicious or disgusting.
• Until the start of your next turn, you make your body exude a particular odor you’ve smelled before. This smell can be sensed by creatures within 5 squares of you, but can’t impose any condition or other drawback on creatures.
• You place a small magical inscription on the surface of a mundane object you can touch, or remove an inscription that was made by you or by another creature using Arcane Trick.
• You cover a size 1T object that you touch with an illusion that makes it look like another object. A creature who handles the object can see through the illusion. The illusion ends when you stop touching the object.`
			})
		})
	};

	static performer: Career = {
		id: 'career-performer',
		name: 'Performer',
		description: 'You can sing, act, or dance well enough that people actually pay to see you do it. Imagine that!',
		features: [
			FeatureLogic.createSkillChoiceFeature({
				id: 'performer-feature-1',
				options: [ 'Music', 'Performance' ]
			}),
			FeatureLogic.createSkillChoiceFeature({
				id: 'performer-feature-2',
				listOptions: [ SkillList.Interpersonal ],
				count: 2
			}),
			FeatureLogic.createBonusFeature({
				id: 'performer-feature-3',
				field: FeatureField.Renown,
				value: 2
			})
		],
		title: FeatureLogic.createFeature({
			id: 'performer-title',
			name: 'Dazzler',
			description: 'When a creature watches you perform a song, dance, or role (as an actor, not in disguise) for at least 1 minute, you gain an edge on tests made to influence that creature for 1 hour after the performance ends.'
		})
	};

	static sage: Career = {
		id: 'career-sage',
		name: 'Sage',
		description: 'From an early age, you dedicated yourself to learning, whether you shared the knowledge of the world with others or sought out secret lore only for yourself.',
		features: [
			FeatureLogic.createSkillChoiceFeature({
				id: 'sage-feature-1',
				listOptions: [ SkillList.Lore ],
				count: 2
			}),
			FeatureLogic.createLanguageChoiceFeature({
				id: 'sage-feature-2'
			}),
			FeatureLogic.createBonusFeature({
				id: 'sage-feature-3',
				field: FeatureField.ProjectPoints,
				value: 100
			})
		],
		title: FeatureLogic.createFeature({
			id: 'sage-title',
			name: 'Expert Sage',
			description: 'Whenever you make a test as part of a research or crafting project that uses a skill you have from the lore skill group, you can roll the test twice and use either roll.'
		})
	};

	static soldier: Career = {
		id: 'career-soldier',
		name: 'Soldier',
		description: 'In your formative years, you fought tirelessly in skirmishes and campaigns against enemy forces.',
		features: [
			FeatureLogic.createSkillChoiceFeature({
				id: 'soldier-feature-1',
				listOptions: [ SkillList.Exploration ]
			}),
			FeatureLogic.createSkillChoiceFeature({
				id: 'soldier-feature-2',
				listOptions: [ SkillList.Intrigue ]
			}),
			FeatureLogic.createLanguageChoiceFeature({
				id: 'soldier-feature-3'
			}),
			FeatureLogic.createBonusFeature({
				id: 'soldier-feature-4',
				field: FeatureField.Renown,
				value: 1
			})
		],
		title: FeatureLogic.createFeature({
			id: 'soldier-title',
			name: 'Drill Sergeant',
			description: 'At the start of a group test or montage test, you can spend a hope token. If you do, all participants make tests as if they also had your exploration skills.'
		})
	};

	static getCareers = (settings: CampaignSetting[]) => {
		const list: Career[] = [];

		settings.forEach(setting => {
			list.push(...setting.careers);
		});

		return Collections.sort(list, item => item.name);
	};
}
