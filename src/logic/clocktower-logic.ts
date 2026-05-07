import { ClocktowerScript } from '@/models/clocktower';
import { Utils } from '@/utils/utils';

export class ClocktowerLogic {
	static createExportScript = (script: ClocktowerScript) => {
		const meta = Utils.copy(script.meta);
		if (meta.firstNight) {
			meta.firstNight = [
				'dusk',
				'minioninfo',
				'demoninfo',
				...meta.firstNight,
				'dawn'
			];
		}
		if (meta.otherNight) {
			meta.otherNight = [
				'dusk',
				...meta.otherNight,
				'dawn'
			];
		}

		return [
			meta,
			...script.characters.map(ch => ch.role)
		];
	};
};
