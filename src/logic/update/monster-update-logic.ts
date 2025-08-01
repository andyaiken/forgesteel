import { AbilityUpdateLogic } from './ability-update-logic';
import { FeatureType } from '../../enums/feature-type';
import { FeatureUpdateLogic } from './feature-update-logic';
import { Monster } from '../../models/monster';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export class MonsterUpdateLogic {
	static updateMonster = (monster: Monster) => {
		if (monster.picture === undefined) {
			monster.picture = null;
		}

		if (monster.role.organization === undefined) {
			monster.role.organization = MonsterOrganizationType.Platoon;
		}
		if (monster.role.organization.toString() === 'Band') {
			monster.role.organization = MonsterOrganizationType.Horde;
		}
		if (monster.role.organization.toString() === 'Troop') {
			monster.role.organization = MonsterOrganizationType.Elite;
		}

		if (monster.state === undefined) {
			monster.state = {
				staminaDamage: 0,
				staminaTemp: 0,
				recoveriesUsed: 0,
				conditions: [],
				reactionUsed: false,
				hidden: false,
				defeated: false,
				captainID: undefined
			};
		}

		monster.features.forEach(FeatureUpdateLogic.updateFeature);
		monster.features
			.filter(f => f.type === FeatureType.Ability)
			.map(f => f.data.ability)
			.forEach(AbilityUpdateLogic.updateAbility);
	};
}
