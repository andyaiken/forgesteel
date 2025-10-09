import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Feature } from '@/models/feature';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { RetainerData } from '@/data/retainer-data';

export class RetainerLogic {
	static getRetainerAdvancementFeatures = (level: number, role: MonsterRoleType, level4?: Feature, level7?: Feature, level10?: Feature): { level: number, feature: Feature }[] => {
		const options4 = level4 ? [ level4 ] : [];
		const options7 = level7 ? [ level7 ] : [];
		const options10 = level10 ? [ level10 ] : [];

		const std = RetainerLogic.getRetainerStandardAbilities(role);
		if (std) {
			options4.push(std.level4);
		}
		if (std) {
			options7.push(std.level7);
		}
		if (std) {
			options10.push(std.level10);
		}

		const levels = [
			{
				level: 2,
				feature: FactoryLogic.feature.createChoice({
					id: 'retainer-2',
					name: 'Level 2 Characteristic Increase',
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
					name: 'Level 4 Choice',
					options: options4.map(o => ({ feature: o, value: 1 }))
				})
			},
			{
				level: 5,
				feature: FactoryLogic.feature.createMultiple({
					id: 'retainer-5',
					name: 'Level 5 Characteristic Increase',
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
					name: 'Level 7 Choice',
					options: options7.map(o => ({ feature: o, value: 1 }))
				})
			},
			{
				level: 8,
				feature: FactoryLogic.feature.createChoice({
					id: 'retainer-8',
					name: 'Level 8 Characteristic Increase',
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
					name: 'Level 10 Choice',
					options: options10.map(o => ({ feature: o, value: 1 }))
				})
			}
		];

		return levels.filter(lvl => lvl.level > level);
	};

	static getRetainerStandardAbilities = (role: MonsterRoleType) => {
		switch (role) {
			case MonsterRoleType.Ambusher:
				return {
					level4: RetainerData.ambusher4,
					level7: RetainerData.ambusher7,
					level10: RetainerData.ambusher10
				};
			case MonsterRoleType.Artillery:
				return {
					level4: RetainerData.artillery4,
					level7: RetainerData.artillery7,
					level10: RetainerData.artillery10
				};
			case MonsterRoleType.Brute:
				return {
					level4: RetainerData.brute4,
					level7: RetainerData.brute7,
					level10: RetainerData.brute10
				};
			case MonsterRoleType.Controller:
				return {
					level4: RetainerData.controller4,
					level7: RetainerData.controller7,
					level10: RetainerData.controller10
				};
			case MonsterRoleType.Defender:
				return {
					level4: RetainerData.defender4,
					level7: RetainerData.defender7,
					level10: RetainerData.defender10
				};
			case MonsterRoleType.Harrier:
				return {
					level4: RetainerData.harrier4,
					level7: RetainerData.harrier7,
					level10: RetainerData.harrier10
				};
			case MonsterRoleType.Hexer:
				return {
					level4: RetainerData.hexer4,
					level7: RetainerData.hexer7,
					level10: RetainerData.hexer10
				};
			case MonsterRoleType.Mount:
				return {
					level4: RetainerData.mount4,
					level7: RetainerData.mount7,
					level10: RetainerData.mount10
				};
			case MonsterRoleType.Support:
				return {
					level4: RetainerData.support4,
					level7: RetainerData.support7,
					level10: RetainerData.support10
				};
		}

		return null;
	};
}
