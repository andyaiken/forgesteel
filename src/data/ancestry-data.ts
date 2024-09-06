import { Ancestry } from '../models/ancestry';
import { FeatureLogic } from '../logic/feature-logic';

export class AncestryData {
	static human: Ancestry = {
		id: 'ancestry-human',
		name: 'Human',
		description: '“Humans,” the dwarf said with a combination of exasperation and awe. “Their only virtue seems to be believing in impossible things.”',
		size: {
			value: 1,
			mod: 'M'
		},
		speed: 5,
		features: [
			FeatureLogic.createFeature({
				id: 'human-feat-1',
				name: 'Detect the Supernatural',
				description: 'As a maneuver, you open your awareness to detect supernatural creatures and phenomena. Until the end of your next turn, you know the location of any supernatural object, Undead, Construct, or creature from another plane of existence within 5 squares of you, even if you don’t have line of effect to them. You know if you’re detecting an item or a creature, and you know if a creature is Undead, a Construct, or from another plane of existence.'
			}),
			FeatureLogic.createFeature({
				id: 'human-feat-2',
				name: 'Resist the Supernatural',
				description: 'Your connection to the natural world protects you from supernatural forces. You have Magic immunity 2 and Psionic immunity 2. Each of these immunities increases by 1 each time you level up.'
			}),
			FeatureLogic.createFeature({
				id: 'human-feat-3',
				name: 'Staying Power',
				description: 'Your human anatomy allows you to fight, run, and stay awake longer than others. Increase your number of Recoveries by 2.'
			})
		]
	};

	static getAncestries = () => {
		return [
			this.human
		];
	};
}
