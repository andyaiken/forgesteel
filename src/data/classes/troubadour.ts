import { Characteristic } from '../../enums/characteristic';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';
import { HeroClass } from '../../models/class';

export const troubadour: HeroClass = {
	id: 'class-troubadour',
	name: 'Troubadour',
	description: 'The world’s a stage and all its people actors. No one knows this better than the troubadour. You find energy in the drama of everyday life and know how to draw spectacle forth from even the most mundane of situations. You accent highs and deepen lows in service to whomever would witness your performance.',
	heroicResource: 'Drama',
	subclassName: 'Class Act',
	subclassCount: 1,
	primaryCharacteristics: [ Characteristic.Agility, Characteristic.Presence ],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FeatureLogic.feature.createBonusFeature({
					id: 'troubadour-stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 9
				}),
				FeatureLogic.feature.createBonusFeature({
					id: 'troubadour-recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FeatureLogic.feature.createKitChoiceFeature({
					id: 'troubadour-1-5'
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'troubadour-1-6',
					cost: 0
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'troubadour-1-7',
					cost: 3
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'troubadour-1-8',
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
