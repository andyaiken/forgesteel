import { Element } from './element';
import { Plot } from './plot';

export interface Adventure extends Element {
	party: {
		count: number;
		level: number;
	};
	introduction: Element[];
	plot: Plot;
}
