import { AbilityKeyword } from '../../enums/ability-keyword';
import { AbilityLogic } from '../../logic/ability-logic';
import { Ancestry } from '../../models/ancestry';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';

export const polder: Ancestry = {
	id: 'ancestry-polder',
	name: 'Polder',
	description: 'After humans, polders are the most numerous and diverse ancestry in Orden. They are not humans, but they live in and among humans, sharing their gods and culture. Almost every human culture in Orden has a polder saint or a human saint venerated by polder.',
	features: [
		FeatureLogic.feature.createSizeFeature({
			id: 'polder-size',
			sizeValue: 1,
			sizeMod: 'S'
		}),
		FeatureLogic.feature.createBonusFeature({
			id: 'polder-speed',
			field: FeatureField.Speed,
			value: 5
		}),
		FeatureLogic.feature.createFeature({
			id: 'polder-feature-1',
			name: 'Polder Geist',
			description: 'When you start your turn while no creatures have line of effect to you, or while you are hidden from or have concealment from all creatures with line of effect to you, your speed is increased by 3 until the end of your turn.'
		}),
		FeatureLogic.feature.createAbilityFeature({
			ability: AbilityLogic.createAbility({
				id: 'polder-feature-2',
				name: 'Shadowmeld',
				description: 'You become an actual shadow.',
				type: AbilityLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Magic ],
				distance: [ AbilityLogic.distance.createSelf() ],
				target: 'Self',
				effect: 'You flatten yourself into a shadow against a wall or floor you are touching, and become hidden from any creature you have cover or concealment from or who isn’t observing you. While in shadow form, you have full awareness of your surroundings, attacks against you and tests made to find you take a bane, and you can’t move or take actions or maneuvers except to exit this form. Any ability or effect that targets more than 1 square affects you in this form only if it explicitly affects the surface you are flattened against. You can exit this form as a maneuver.'
			})
		})
	]
};
