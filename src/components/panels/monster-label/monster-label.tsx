import { Flex, Tag } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Fixture } from '@/models/fixture';
import { FixtureLogic } from '@/logic/fixture-logic';
import { Monster } from '@/models/monster';
import { MonsterLogic } from '@/logic/monster-logic';
import { ReactNode } from 'react';
import { Terrain } from '@/models/terrain';
import { TerrainLogic } from '@/logic/terrain-logic';

import './monster-label.scss';

interface MonsterLabelProps {
	monster: Monster;
	extra?: ReactNode;
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
				<Flex justify='center' gap={5}>
					{props.monster.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)}
				</Flex>
				<Flex align='center' justify='space-between'>
					<div className='ds-text'>{desc}</div>
					{props.extra}
				</Flex>
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
				<div className='ds-text'>{desc}</div>
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
				<div className='ds-text'>{desc}</div>
			</div>
		</ErrorBoundary>
	);
};
