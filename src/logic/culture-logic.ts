import { Culture } from '@/models/culture';
import { Feature } from '@/models/feature';
import { FeatureType } from '@/enums/feature-type';

type CultureAspect = 'environment' | 'organization' | 'upbringing';

export class CultureLogic {
	static getAspectDisplay = (feature: Feature, aspect: CultureAspect): Feature => {
		const label = aspect.charAt(0).toUpperCase() + aspect.slice(1);
		let description = feature.description;
		if (feature.type === FeatureType.SkillChoice) {
			const options = [
				...feature.data.options,
				...feature.data.listOptions.map(list => `any ${list} skill`)
			];
			const count = feature.data.count;
			const choice = `Choose ${count === 1 ? 'one skill' : `${count} skills`} from: ${options.length ? options.join(', ') : 'any skill'}.`;
			description = [ description, choice ].filter(Boolean).join('\n\n');
		}
		return { ...feature, name: `${label}: ${feature.name}`, description };
	};

	static getFeatureDisplay = (feature: Feature, culture: Culture): Feature => {
		const aspect = ([ 'environment', 'organization', 'upbringing' ] as const)
			.find(key => culture[key]?.id === feature.id);
		return aspect ? CultureLogic.getAspectDisplay(feature, aspect) : feature;
	};
}
