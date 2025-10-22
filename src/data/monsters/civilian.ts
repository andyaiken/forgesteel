import { FactoryLogic } from '@/logic/factory-logic';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';

export const civilian: MonsterGroup = {
	id: 'monster-group-civilian',
	name: 'Civilian',
	description: '',
	picture: null,
	information: [],
	malice: [],
	monsters: [
		FactoryLogic.createMonster({
			id: 'civilian-1',
			name: 'Civilian',
			level: 0,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.NoOrganization),
			keywords: [ 'Humanoid or Animal' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: FactoryLogic.createCharacteristics(0, 0, 0, 0, 0),
			features: []
		})
	],
	addOns: []
};
