import { ClocktowerScript } from '@/models/clocktower';
import { ClocktowerScriptType } from '@/enums/clocktower-script-type';
import { ClocktowerTeam } from '@/enums/clocktower-team';
import { Utils } from '@/utils/utils';

export class ClocktowerLogic {
	static getTeamName = (team: ClocktowerTeam) => {
		switch (team) {
			case ClocktowerTeam.Townsfolk:
				return 'Townsfolk';
			case ClocktowerTeam.Outsider:
				return 'Outsiders';
			case ClocktowerTeam.Minion:
				return 'Minions';
			case ClocktowerTeam.Demon:
				return 'Demons';
			case ClocktowerTeam.Traveller:
				return 'Travellers';
			case ClocktowerTeam.Fabled:
				return 'Fabled';
			case ClocktowerTeam.Loric:
				return 'Lorics';
		}
	};

	static getCharacter = (script: ClocktowerScript, id: string) => {
		return script.characters.find(ch => ch.role.id === id) || null;
	};

	static getTeamCount = (script: ClocktowerScript, team: ClocktowerTeam) => {
		return script.characters
			.filter(ch => ch.role.team === team)
			.length;
	};

	static createMeta = (script: ClocktowerScript) => {
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

		return meta;
	};

	static createExportScript = (script: ClocktowerScript) => {
		return [
			ClocktowerLogic.createMeta(script),
			...script.characters.map(ch => ch.role)
		];
	};

	static validate = (script: ClocktowerScript) => {
		const issues: string[] = [];

		const townsfolk = ClocktowerLogic.getTeamCount(script, ClocktowerTeam.Townsfolk);
		const outsiders = ClocktowerLogic.getTeamCount(script, ClocktowerTeam.Outsider);
		const minions = ClocktowerLogic.getTeamCount(script, ClocktowerTeam.Minion);
		const demons = ClocktowerLogic.getTeamCount(script, ClocktowerTeam.Demon);
		const total = townsfolk + outsiders + minions + demons;

		switch (script.type) {
			case ClocktowerScriptType.Standard: {
				if (townsfolk !== 13) {
					issues.push('There should be 13 Townsfolk.');
				}
				if ((outsiders < 4) || (outsiders > 5)) {
					issues.push('There should be 4 to 5 Outsiders.');
				}
				if ((minions < 4) || (minions > 5)) {
					issues.push('There should be 4 to 5 Minions.');
				}
				if ((demons < 1) || (demons > 4)) {
					issues.push('There should be 1 to 4 Demons.');
				}
				if (total > 25) {
					issues.push('There should be no more than 25 total characters.');
				}
				break;
			}
			case ClocktowerScriptType.Teensyville: {
				if (townsfolk !== 6) {
					issues.push('There should be 6 Townsfolk.');
				}
				if (outsiders !== 2) {
					issues.push('There should be 2 Outsiders.');
				}
				if (minions !== 2) {
					issues.push('There should be 2 Minions.');
				}
				if ((demons < 1) || (demons > 2)) {
					issues.push('There should be 1 to 2 Demons.');
				}
				if (total > 12) {
					issues.push('There should be no more than 12 total characters.');
				}
				break;
			}
		}

		const firstNight = script.meta.firstNight || [];
		const otherNight = script.meta.otherNight || [];

		firstNight.forEach(id => {
			const role = script.characters.find(ch => ch.role.id === id);
			if (!role) {
				issues.push(`${id}: acts on the first night but is unknown`);
			}
		});
		otherNight.forEach(id => {
			const role = script.characters.find(ch => ch.role.id === id);
			if (!role) {
				issues.push(`${id}: acts on other nights but is unknown`);
			}
		});

		script.characters.forEach(ch => {
			const inFirstOrder = firstNight.includes(ch.role.id);
			const hasFirstReminder = !!ch.role.firstNightReminder;
			if (inFirstOrder !== hasFirstReminder) {
				issues.push(`${ch.role.name}: has ${hasFirstReminder ? 'a' : 'no'} first night reminder`);
			}

			const inOtherOrder = otherNight.includes(ch.role.id);
			const hasOtherReminder = !!ch.role.otherNightReminder;
			if (inOtherOrder !== hasOtherReminder) {
				issues.push(`${ch.role.name}: has ${hasOtherReminder ? 'an' : 'no'} other night reminder`);
			}
		});

		const hasModification = script.characters.some(ch => {
			return /\[.*Outsider.*\]/.test(ch.role.ability);
		});
		if (!hasModification) {
			issues.push('No outsider modification');
		}

		script.characters.forEach(ch => {
			const index = ch.role.ability.indexOf('[');
			const ability = index === -1 ? ch.role.ability : ch.role.ability.substring(0, index);
			if (ability.length > 160) {
				issues.push(`${ch.role.name}: ability is ${ability.length} characters long`);
			}
		});

		return issues;
	};
};
