import { ClocktowerScript } from '@/models/clocktower';

export class ClocktowerLogic {
	static createExportScript = (script: ClocktowerScript) => {
		return [
			script.meta,
			...script.characters.map(ch => ch.role)
		];
	};
};
