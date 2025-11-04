import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Fixture } from '@/models/fixture';
import { FixtureLogic } from '@/logic/fixture-logic';
import { Monster } from '@/models/monster';
import { MonsterLogic } from '@/logic/monster-logic';
import { Terrain } from '@/models/terrain';
import { TerrainLogic } from '@/logic/terrain-logic';

import './monster-label.scss';

interface MonsterLabelProps {
	monster: Monster;
}

export const MonsterLabel = (props: MonsterLabelProps) => {
	const desc = MonsterLogic.getMonsterDescription(props.monster);
	if (!desc) {
		return null;
	}

	const type = props.monster.role.type.toLowerCase().replace(' ', '');
	return (
		<ErrorBoundary>
			<div className={`monster-label ${type}`}>
				{desc}
			</div>
		</ErrorBoundary>
	);
};

interface TerrainLabelProps {
	terrain: Terrain;
}

export const TerrainLabel = (props: TerrainLabelProps) => {
	const desc = TerrainLogic.getTerrainDescription(props.terrain);
	if (!desc) {
		return null;
	}

	const type = props.terrain.role.type.toLowerCase().replace(' ', '');
	return (
		<ErrorBoundary>
			<div className={`terrain-label ${type}`}>
				{desc}
			</div>
		</ErrorBoundary>
	);
};

interface FixtureLabelProps {
	fixture: Fixture;
}

export const FixtureLabel = (props: FixtureLabelProps) => {
	const desc = FixtureLogic.getFixtureDescription(props.fixture);
	if (!desc) {
		return null;
	}

	const type = props.fixture.role.type.toLowerCase().replace(' ', '');
	return (
		<ErrorBoundary>
			<div className={`fixture-label ${type}`}>
				{desc}
			</div>
		</ErrorBoundary>
	);
};
