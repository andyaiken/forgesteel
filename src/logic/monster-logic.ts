import { Monster, MonsterGroup, MonsterRole } from '../models/monster';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { FeatureDamageModifierData } from '../models/feature';
import { FeatureType } from '../enums/feature-type';
import { MonsterFilter } from '../models/monster-filter';
import { MonsterRoleType } from '../enums/monster-role-type';
import { Size } from '../models/size';

export class MonsterLogic {
	static getMonsterName = (monster: Monster, group: MonsterGroup) => {
		if (monster.name) {
			return monster.name;
		}

		if (group.name) {
			return `${group.name} ${monster.role.type}`;
		}

		return 'Unnamed Monster';
	};

	static matches = (monster: Monster, monsterGroup: MonsterGroup, filter: MonsterFilter) => {
		if (filter.name) {
			const tokens = filter.name.toLowerCase().split(' ');
			const monsterName = MonsterLogic.getMonsterName(monster, monsterGroup);
			if (!tokens.every(token => monsterName.toLowerCase().includes(token))) {
				return false;
			}
		}

		if (filter.roles.length > 0) {
			return filter.roles.includes(monster.role.type);
		}

		switch (filter.isMinion) {
			case 'yes':
				if (!monster.role.isMinion) {
					return false;
				}
				break;
			case 'no':
				if (monster.role.isMinion) {
					return false;
				}
				break;
		}

		const minLevel = Math.min(...filter.level);
		const maxLevel = Math.max(...filter.level);
		if ((monster.level < minLevel) || (monster.level > maxLevel)) {
			return false;
		}

		const minEV = Math.min(...filter.ev);
		const maxEV = Math.max(...filter.ev);
		if ((monster.encounterValue < minEV) || (monster.encounterValue > maxEV)) {
			return false;
		}

		return true;
	};

	static getCharacteristic = (monster: Monster, characteristic: Characteristic) => {
		const ch = monster.characteristics.find(ch => ch.characteristic === characteristic);
		if (ch) {
			return ch.value;
		}

		return 0;
	};

	static getDamageModifiers = (monster: Monster, type: DamageModifierType) => {
		const immunities: { type: string, value: number }[] = [];

		// Collate from features
		monster.features
			.filter(f => f.type === FeatureType.DamageModifier)
			.forEach(f => {
				const data = f.data as FeatureDamageModifierData;
				data.modifiers
					.filter(dm => dm.type === type)
					.forEach(dm => {
						const value = dm.value + (dm.valuePerLevel * (monster.level - 1)) + (dm.valuePerEchelon * MonsterLogic.getEchelon(monster.level));
						immunities.push({
							type: dm.damageType,
							value: value
						});
					});
			});

		return Collections.sort(immunities, i => i.type);
	};

	static getEchelon = (level: number) => {
		switch (level) {
			case 1:
			case 2:
			case 3:
				return 1;
			case 4:
			case 5:
			case 6:
				return 2;
			case 7:
			case 8:
			case 9:
				return 3;
			case 10:
				return 4;
		}

		return 1;
	};

	static getRoleDescription = (type: MonsterRoleType) => {
		switch (type) {
			case MonsterRoleType.Ambusher:
				return 'Ambushers are melee warriors who can slip by beefier heroes to reach squishier targets in the back lines.';
			case MonsterRoleType.Artillery:
				return 'Artillery creatures fight best from afar, and can use their most powerful abilities at great distance.';
			case MonsterRoleType.Brute:
				return 'Brutes are hardy creatures who have lots of Stamina and deal lots of damage. They have abilities and traits that make them difficult to ignore and hard to get away from, and that let them push enemies around.';
			case MonsterRoleType.Controller:
				return 'Controllers are creatures who change the battlefield, often with magic or psionics. They reposition foes and alter terrain to make it more advantageous for their allies. Controllers are often on the squishier side, so they need some protection!';
			case MonsterRoleType.Defender:
				return 'Defenders are tough creatures able to take a lot of damage, and who can force enemies to attack them instead of squishier targets. Defenders often act in squads with allies who have lower Stamina, such as controllers and hexers.';
			case MonsterRoleType.Harrier:
				return 'Harriers are mobile warriors who make definitive use of hit-and-run tactics. Their traits allow them to make the most of their positioning on the battlefield.';
			case MonsterRoleType.Hexer:
				return 'Hexers specialize in debuffing enemies with conditions and other effects. They are generally squishy and rely on allies to help defend them.';
			case MonsterRoleType.Leader:
				return 'Leader creatures are powerful commanders who often serve as villains at the climax of adventures and campaigns. They have better Stamina and damage output than other creatures, and often aid those creatures — or can sacrifice lesser allies for their own benefit.';
			case MonsterRoleType.Mount:
				return 'Mounts are mobile creatures meant to be ridden in combat, and who make their riders even more dangerous. Mounts act at the same time as their riders.';
			case MonsterRoleType.Solo:
				return 'A solo creature is an action-oriented creature capable of taking on the player characters on their own, or with the backup of just a handful of underlings.';
			case MonsterRoleType.Support:
				return 'Support creatures specialize in aiding their allies, providing buffs, healing, movement, or action options.';
		}
	};

	///////////////////////////////////////////////////////////////////////////

	static createRole = (type: MonsterRoleType, isMinion?: boolean): MonsterRole => {
		return {
			type: type,
			isMinion: isMinion || false
		};
	};

	static createSize = (value: number, mod?: string): Size => {
		return {
			value: value,
			mod: mod || ''
		};
	};

	static createSpeed = (value: number, modes?: string) => {
		return {
			value: value,
			modes: modes || ''
		};
	};

	static createCharacteristics = (might: number, agility: number, reason: number, intuition: number, presence: number) => {
		return [
			{ characteristic: Characteristic.Might, value: might },
			{ characteristic: Characteristic.Agility, value: agility },
			{ characteristic: Characteristic.Reason, value: reason },
			{ characteristic: Characteristic.Intuition, value: intuition },
			{ characteristic: Characteristic.Presence, value: presence }
		];
	};
}
