import { Size } from '../models/size';

export class FormatLogic {
	static getSize = (size: Size) => {
		return `${size.value}${size.mod}`;
	};
}
