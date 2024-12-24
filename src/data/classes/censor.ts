import { Characteristic } from '../../enums/characteristic';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';
import { HeroClass } from '../../models/class';
import { SkillList } from '../../enums/skill-list';

export const censor: HeroClass = {
	id: 'class-censor',
	name: 'Censor',
	description: 'Demons and devils fear you. Criminals run from the sight of your shadow in the alley. Agents of chaos, blasphemers, and heretics tremble at the sound of your voice. You carry the power of the gods, armed with judgements and sent out into the world first to seek, then censor those whose actions or even existence is anathema to your church.',
	heroicResource: 'Judgment',
	subclassName: 'Order',
	subclassCount: 1,
	primaryCharacteristics: [ Characteristic.Might, Characteristic.Presence ],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FeatureLogic.feature.createBonusFeature({
					id: 'censor-stamina',
					field: FeatureField.Stamina,
					value: 21,
					valuePerLevel: 12
				}),
				FeatureLogic.feature.createBonusFeature({
					id: 'censor-recoveries',
					field: FeatureField.Recoveries,
					value: 12
				}),
				FeatureLogic.feature.createSkillChoiceFeature({
					id: 'censor-1-1',
					listOptions: [ SkillList.Interpersonal, SkillList.Lore ],
					count: 2
				}),
				FeatureLogic.feature.createKitChoiceFeature({
					id: 'censor-1-5'
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'censor-1-6',
					cost: 0
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'censor-1-7',
					cost: 3
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'censor-1-8',
					cost: 5
				})
			]
		}
	],
	abilities: [
	],
	subclasses: [
	],
	level: 1,
	characteristics: []
};
