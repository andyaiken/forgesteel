import { Monster, MonsterGroup } from '../models/monster';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { FeatureDamageModifierData } from '../models/feature';
import { FeatureType } from '../enums/feature-type';
import { MonsterFilter } from '../models/monster-filter';
import { MonsterOrganizationType } from '../enums/monster-organization-type';
import { MonsterRoleType } from '../enums/monster-role-type';

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

		if (filter.organizations.length > 0) {
			return filter.organizations.includes(monster.role.organization);
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

	static getRoleMultiplier = (organization: MonsterOrganizationType) => {
		switch (organization) {
			case MonsterOrganizationType.Minion:
				return 8;
		}

		return 1;
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

	static getRoleTypeDescription = (type: MonsterRoleType) => {
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
			case MonsterRoleType.Mount:
				return 'Mounts are mobile creatures meant to be ridden in combat, and who make their riders even more dangerous. Mounts act at the same time as their riders.';
			case MonsterRoleType.Support:
				return 'Support creatures specialize in aiding their allies, providing buffs, healing, movement, or action options.';
		}
	};

	static getRoleOrganizationDescription = (organization: MonsterOrganizationType) => {
		switch (organization) {
			case MonsterOrganizationType.Minion:
				return 'Minions are weaker enemies who are made to die fast and threaten heroes en masse.';
			case MonsterOrganizationType.Band:
				return 'Monster bands are hardier and work in smaller groups than minions, but it still takes multiple of these creatures to effectively threaten a single hero of the same level.';
			case MonsterOrganizationType.Platoon:
				return 'Monster platoons are highly organized and usually self- sufficient armies.';
			case MonsterOrganizationType.Troop:
				return 'Troops are the functional opposite of minions. A creature under the troop organization is hardy and can usually stand up to two heroes of the same level on their own.';
			case MonsterOrganizationType.Leader:
				return 'A leader is a powerful who buffs their allies and grants them extra actions.';
			case MonsterOrganizationType.Solo:
				return 'A creature under a solo organization is an encounter all on their own.';
		}
	};

	///////////////////////////////////////////////////////////////////////////

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
