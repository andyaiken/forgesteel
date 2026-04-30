import { ClocktowerRole, ClocktowerScript, ClocktowerScriptInfo } from '@/models/clocktower';

export class ClocktowerLogic {
	static getScriptInfo = (script: ClocktowerScript) => {
		const info = script.find(i => i.id === '_meta');
		if (!info) {
			return null;
		}

		return info as ClocktowerScriptInfo;
	};

	static getCharacters = (script: ClocktowerScript) => {
		return script
			.filter(i => i.id !== '_meta')
			.map(r => r as ClocktowerRole);
	};

	static getRole = (script: ClocktowerScript, roleID: string) => {
		const role = script.find(i => i.id === roleID);
		if (!role) {
			return null;
		}

		return role as ClocktowerRole;
	};
};
