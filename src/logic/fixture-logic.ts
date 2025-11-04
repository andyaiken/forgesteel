import { Fixture } from '@/models/fixture';

export class FixtureLogic {
	static getFixtureDescription = (fixture: Fixture) => {
		return `${fixture.role.terrainType} ${fixture.role.type}`;
	};

	static getStamina = (fixture: Fixture) => {
		return `${fixture.baseStamina} + summoner level`;
	};
}
