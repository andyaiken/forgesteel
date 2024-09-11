import { Complication } from '../models/complication';
import { FeatureLogic } from '../logic/feature-logic';

export class ComplicationData {
	static cultVictim: Complication = {
		id: 'comp-cult-victim',
		name: 'Cult Victim',
		description: 'Cultists captured you while raiding your home, then began an unholy ritual to turn your body into an undead spirit. The ritual failed, but your body became infused with corrupted magic, turning you partially incorporeal.',
		benefit: FeatureLogic.createFeature({
			id: 'comp-cult-victim-b',
			name: 'Cult Victim Benefit',
			description: 'Once per turn, you can move through a solid mundane object no more than 1 square thick. If you end your turn inside the object, you take 5 damage and are shunted out into the space where you entered the object.'
		}),
		drawback: FeatureLogic.createFeature({
			id: 'comp-cult-victim-d',
			name: 'Cult Victim Drawback',
			description: 'Your body is more susceptible to negative energy. You have corruption weakness 5.'
		})
	};

	static getComplications = () => {
		return [
			this.cultVictim
		];
	};
}
