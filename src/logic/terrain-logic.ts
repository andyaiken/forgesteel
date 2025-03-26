import { Collections } from '../utils/collections';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { Terrain } from '../models/terrain';
import { TerrainFilter } from '../models/filter';

export class TerrainLogic {
	static getTerrainDescription = (terrain: Terrain) => {
		return `Level ${terrain.level} ${terrain.role.type} ${terrain.role.terrainType}`;
	};

	static getDamageModifiers = (terrain: Terrain, type: DamageModifierType) => {
		const modifiers: { damageType: string, value: number }[] = [];

		terrain.damageMods
			.filter(dm => dm.type === type)
			.forEach(dm => {
				let value = dm.value;
				// value += (Collections.max(dm.valueCharacteristics.map(ch => MonsterLogic.getCharacteristic(monster, ch)), v => v) || 0) * dm.valueCharacteristicMultiplier;
				value += dm.valuePerLevel * (terrain.level - 1);
				// value += dm.valuePerEchelon * MonsterLogic.getEchelon(monster);

				const existing = modifiers.find(x => x.damageType === dm.damageType);
				if (existing) {
					existing.value += dm.value;
				} else {
					modifiers.push({
						damageType: dm.damageType,
						value: value
					});
				}
			});

		return Collections.sort(modifiers, dm => dm.damageType);
	};

	static getStaminaDescription = (terrain: Terrain) => {
		if (terrain.stamina.base && !terrain.stamina.perSquare) {
			return `${terrain.stamina.base}`;
		}

		if (!terrain.stamina.base && terrain.stamina.perSquare) {
			return `${terrain.stamina.perSquare} per square`;
		}

		return `${terrain.stamina.base} + ${terrain.stamina.perSquare} per square`;
	};

	static getStaminaValue = (terrain: Terrain) => {
		let value = terrain.stamina.base;

		if (terrain.stamina.perSquare) {
			value += (terrain.stamina.perSquare * terrain.state.squares);
		}

		if (terrain.state.staminaDamage > 0) {
			value -= terrain.state.staminaDamage;
		}

		return Math.max(value, 0);
	};

	static matches = (terrain: Terrain, filter: TerrainFilter) => {
		if (filter.name) {
			const tokens = filter.name.toLowerCase().split(' ');
			if (!tokens.every(token => terrain.name.toLowerCase().includes(token))) {
				return false;
			}
		}

		if (filter.roles.length > 0) {
			if (!filter.roles.includes(terrain.role.type)) {
				return false;
			}
		}

		if (filter.terrainRoles.length > 0) {
			if (!filter.terrainRoles.includes(terrain.role.terrainType)) {
				return false;
			}
		}

		const minLevel = Math.min(...filter.level);
		const maxLevel = Math.max(...filter.level);
		if ((terrain.level < minLevel) || (terrain.level > maxLevel)) {
			return false;
		}

		const minEV = Math.min(...filter.ev);
		const maxEV = Math.max(...filter.ev);
		if ((terrain.encounterValue < minEV) || (terrain.encounterValue > maxEV)) {
			return false;
		}

		return true;
	};
}
