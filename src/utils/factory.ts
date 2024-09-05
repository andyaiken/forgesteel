import { Hero } from '../models/hero';
import { Utils } from './utils';

export class Factory {
	static createHero = () => {
		const hero: Hero = {
			id: Utils.guid(),
			name: '',
			ancestry: null,
			culture: null,
			class: null,
			career: null,
			complication: null,
			kits: [],
			state: {
				stamina: 0,
				recoveries: 0,
				victories: 0,
				heroicResource: 0,
				heroTokens: 0,
				renown: 0,
				conditions: []
			}
		};
		return hero;
	};
}
