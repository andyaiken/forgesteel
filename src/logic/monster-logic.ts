import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { FeatureDamageModifierData } from '../models/feature';
import { FeatureType } from '../enums/feature-type';
import { Monster } from '../models/monster';
import { MonsterRoleType } from '../enums/monster-role-type';

export class MonsterLogic {
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
						const value = dm.value + (dm.valuePerLevel * (monster.level - 1));
						immunities.push({
							type: dm.damageType,
							value: value
						});
					});
			});

		return Collections.sort(immunities, i => i.type);
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
}
