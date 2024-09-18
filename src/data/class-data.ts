import { conduit } from './classes/conduit';
import { elementalist } from './classes/elementalist';
import { fury } from './classes/fury';
import { shadow } from './classes/shadow';
import { tactician } from './classes/tactician';

export class ClassData {
	static getClasses = () => {
		return [
			conduit,
			elementalist,
			fury,
			shadow,
			tactician
		];
	};
}
