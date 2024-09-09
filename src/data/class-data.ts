import { AbilityLogic } from '../logic/ability-logic';
import { AbilityUsage } from '../enums/ability-usage';
import { Characteristic } from '../enums/characteristic';
import { FeatureLogic } from '../logic/feature-logic';
import { HeroClass } from '../models/class';
import { SkillList } from '../enums/skill-list';

export class ClassData {
	static shadow: HeroClass = {
		id: 'class-shadow',
		name: 'Shadow',
		description: 'Subtlety is your art, the tip of the blade your brush. You studied at a secret college, specializing in alchemy, illusion, or shadow-magics. Your training and knowledge places you among the elite assassins, spies, and commandos. But more powerful than any weapon or sorcery is your insight into your enemy’s weakness.',
		heroicResource: 'Insight',
		primaryCharacteristics: [ Characteristic.Agility, Characteristic.Presence ],
		startingStamina: 18,
		staminaPerLevel: 8,
		recoveries: 10,
		featuresByLevel: [
			{
				level: 1,
				features: [
					FeatureLogic.createSkillFeature({
						id: 'shadow-1-1',
						name: 'Skill',
						skill: 'Hide'
					}),
					FeatureLogic.createSkillFeature({
						id: 'shadow-1-2',
						name: 'Skill',
						skill: 'Sneak'
					}),
					FeatureLogic.createSkillChoiceFeature({
						id: 'shadow-1-3',
						name: 'Skill',
						options: [ 'Criminal Underworld' ],
						listOptions: [ SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue ],
						count: 5
					}),
					FeatureLogic.createAbilityFeature({
						ability: AbilityLogic.createAbility({
							id: 'shadow-1-4',
							name: 'Hesitation Is Weakness',
							description: 'Waiting for your enemies to act was never your style.',
							type: AbilityLogic.createAbilityType({ usage: AbilityUsage.Trigger, free: true, trigger: 'Another hero ends their turn.' }),
							distance: 'Self',
							target: 'Self',
							cost: 1,
							effect: 'You take your turn immediately.'
						})
					})
					// TODO: Choose Abilities (0pt, 3pt, 5pt)
				]
			}
		],
		abilities: [
			// TODO: Shadow abilities
		],
		subclasses: [
			{
				id: 'shadow-sub-1',
				name: 'College of Black Ash',
				description: 'The College of Black Ash founded the art of being a shadow. Its graduates use Black Ash sorcery to teleport around the battlefield in clouds of soot, and to manipulate and create darkness. Graduates of the college are unmatched in mobility.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							FeatureLogic.createSkillFeature({
								id: 'shadow-sub-1-1-1',
								name: 'Skill',
								skill: 'Magic'
							})
							// TODO: Black Ash Teleport
							// TODO: In All This Confusion
						]
					}
				]
			}
		],
		level: 1,
		characteristics: [],
		subclassID: null
	};

	static getClasses = () => {
		return [
			this.shadow
		];
	};
}
