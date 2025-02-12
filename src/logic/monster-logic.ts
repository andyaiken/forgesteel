import { Feature, FeatureDamageModifierData } from '../models/feature';
import { Monster, MonsterGroup } from '../models/monster';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { FactoryLogic } from './factory-logic';
import { FeatureType } from '../enums/feature-type';
import { MonsterFilter } from '../models/monster-filter';
import { MonsterOrganizationType } from '../enums/monster-organization-type';
import { MonsterRoleType } from '../enums/monster-role-type';

export class MonsterLogic {
	static getMonsterName = (monster: Monster, group?: MonsterGroup) => {
		if (monster.name) {
			return monster.name;
		}

		if (group && group.name) {
			return `${group.name} ${monster.role.type}`;
		}

		return 'Unnamed Monster';
	};

	static getMonsterLevel = (monster: Monster) => {
		if (monster.retainer && monster.retainer.level) {
			return monster.retainer.level;
		}

		return monster.level;
	};

	static getMonsterDescription = (monster: Monster) => {
		const lvl = MonsterLogic.getMonsterLevel(monster);

		if (monster.role.type === MonsterRoleType.NoRole) {
			return `Level ${lvl} ${monster.role.organization}`;
		}

		const orgGoesLast = [
			MonsterOrganizationType.Retainer
		].includes(monster.role.organization);
		if (orgGoesLast) {
			return `Level ${lvl} ${monster.role.type} ${monster.role.organization}`;
		}

		return `Level ${lvl} ${monster.role.organization} ${monster.role.type}`;
	};

	static getStamina = (monster: Monster) => {
		let stamina = monster.stamina;

		if (monster.retainer && monster.retainer.level) {
			stamina += 10 * (monster.retainer.level - monster.level);
		}

		return stamina;
	};

	static getSignatureDamageBonus = (monster: Monster) => {
		let tier1 = 0;
		let tier2 = 0;
		let tier3 = 0;

		if (monster.retainer && monster.retainer.level) {
			const levels = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].filter(lvl => (lvl > monster.level) && (lvl <= monster.retainer!.level));
			tier1 += levels.filter(lvl => lvl % 2 === 0).length;
			tier2 += levels.length;
			tier3 += levels.length;
		}

		if (tier1 + tier2 + tier3 === 0) {
			return null;
		}

		return {
			tier1: tier1,
			tier2: tier2,
			tier3: tier3
		};
	};

	static getFreeStrikeDamage = (monster: Monster) => {
		let damage = monster.freeStrikeDamage;

		if (monster.retainer && monster.retainer.level) {
			const levels = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].filter(lvl => (lvl > monster.level) && (lvl <= monster.retainer!.level));
			damage += levels.filter(lvl => lvl % 3 === 0).length * 2;
		}

		return damage;
	};

	static getFeatures = (monster: Monster) => {
		const features = [ ...monster.features ];

		if (monster.retainer) {
			monster.retainer.featuresByLevel
				.filter(lvl => lvl.level <= MonsterLogic.getMonsterLevel(monster))
				.forEach(lvl => {
					if (lvl.feature) {
						switch (lvl.feature.type) {
							case FeatureType.Choice:
								features.push(...lvl.feature.data.selected);
								break;
							case FeatureType.Multiple:
								features.push(...lvl.feature.data.features);
								break;
							default:
								features.push(lvl.feature);
								break;
						}
					}
				});
		}

		return features;
	};

	static getRetainerAdvancementFeatures = (level: number, level4?: Feature, level7?: Feature, level10?: Feature): { level: number, feature: Feature }[] => {
		const options4 = level4 ? [ level4 ] : [];
		const options7 = level7 ? [ level7 ] : [];
		const options10 = level10 ? [ level10 ] : [];

		const levels = [
			{
				level: 2,
				feature: FactoryLogic.feature.createChoice({
					id: 'retainer-2',
					options: [
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-2-1',
								characteristic: Characteristic.Might,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-2-2',
								characteristic: Characteristic.Agility,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-2-3',
								characteristic: Characteristic.Reason,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-2-4',
								characteristic: Characteristic.Intuition,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-2-5',
								characteristic: Characteristic.Presence,
								value: 1
							}),
							value: 1
						}
					]
				})
			},
			{
				level: 4,
				feature: FactoryLogic.feature.createChoice({
					id: 'retainer-4',
					options: options4.map(o => ({ feature: o, value: 1 }))
				})
			},
			{
				level: 5,
				feature: FactoryLogic.feature.createMultiple({
					id: 'retainer-5',
					features: [
						FactoryLogic.feature.createCharacteristicBonus({
							id: 'retainer-5-1',
							characteristic: Characteristic.Might,
							value: 1
						}),
						FactoryLogic.feature.createCharacteristicBonus({
							id: 'retainer-5-2',
							characteristic: Characteristic.Agility,
							value: 1
						}),
						FactoryLogic.feature.createCharacteristicBonus({
							id: 'retainer-5-3',
							characteristic: Characteristic.Reason,
							value: 1
						}),
						FactoryLogic.feature.createCharacteristicBonus({
							id: 'retainer-5-4',
							characteristic: Characteristic.Intuition,
							value: 1
						}),
						FactoryLogic.feature.createCharacteristicBonus({
							id: 'retainer-5-5',
							characteristic: Characteristic.Presence,
							value: 1
						})
					]
				})
			},
			{
				level: 7,
				feature: FactoryLogic.feature.createChoice({
					id: 'retainer-7',
					options: options7.map(o => ({ feature: o, value: 1 }))
				})
			},
			{
				level: 8,
				feature: FactoryLogic.feature.createChoice({
					id: 'retainer-8',
					options: [
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-8-1',
								characteristic: Characteristic.Might,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-8-2',
								characteristic: Characteristic.Agility,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-8-3',
								characteristic: Characteristic.Reason,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-8-4',
								characteristic: Characteristic.Intuition,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-8-5',
								characteristic: Characteristic.Presence,
								value: 1
							}),
							value: 1
						}
					]
				})
			},
			{
				level: 10,
				feature: FactoryLogic.feature.createChoice({
					id: 'retainer-10',
					options: options10.map(o => ({ feature: o, value: 1 }))
				})
			}
		];

		return levels.filter(lvl => lvl.level > level);
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
		let value = 0;

		const ch = monster.characteristics.find(ch => ch.characteristic === characteristic);
		if (ch) {
			value = ch.value;
		}

		MonsterLogic.getFeatures(monster).forEach(f => {
			if (f.type === FeatureType.CharacteristicBonus) {
				if (f.data.characteristic === characteristic) {
					value += f.data.value;
				}
			}
		});

		return value;
	};

	static getDamageModifiers = (monster: Monster, type: DamageModifierType) => {
		const immunities: { type: string, value: number }[] = [];

		// Collate from features
		MonsterLogic.getFeatures(monster)
			.filter(f => f.type === FeatureType.DamageModifier)
			.forEach(f => {
				const data = f.data as FeatureDamageModifierData;
				data.modifiers
					.filter(dm => dm.type === type)
					.forEach(dm => {
						let value = dm.value;
						value += (Collections.max(dm.valueCharacteristics.map(ch => MonsterLogic.getCharacteristic(monster, ch)), v => v) || 0) * dm.valueCharacteristicMultiplier;
						value += dm.valuePerLevel * (monster.level - 1);
						value += dm.valuePerEchelon * MonsterLogic.getEchelon(monster);
						immunities.push({
							type: dm.damageType,
							value: value
						});
					});
			});

		return Collections.sort(immunities, i => i.type);
	};

	static getEchelon = (monster: Monster) => {
		const level = MonsterLogic.getMonsterLevel(monster);

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

		return '';
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
			case MonsterOrganizationType.Retainer:
				return 'A retainer is a type of follower who fights alongside the heroes. A retainer can gain levels just as heroes do, so their battlefield contributions remain relevant as the heroes advance.';
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
