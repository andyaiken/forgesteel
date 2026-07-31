import { Flex, Tag } from 'antd';
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
		<div className={`monster-label ${type}`}>
			<Flex orientation='vertical' gap={8}>
				<Flex gap={3}>
					{props.monster.keywords.filter(k => !!k).map((k, n) => <Tag key={n} variant='outlined'>{k}</Tag>)}
				</Flex>
				<div>{desc}</div>
			</Flex>
			{props.extra}
		</div>
	);
};

interface TerrainLabelProps {
	terrain: Terrain;
	extra?: ReactNode;
}

export const TerrainLabel = (props: TerrainLabelProps) => {
	const desc = TerrainLogic.getTerrainDescription(props.terrain);
	if (!desc) {
		return null;
	}

	const type = props.terrain.role.type.toLowerCase().replace(' ', '');
	return (
		<div className={`terrain-label ${type}`}>
			<div>{desc}</div>
			{props.extra}
		</div>
	);
};

interface FixtureLabelProps {
	fixture: Fixture;
	extra?: ReactNode;
}

export const FixtureLabel = (props: FixtureLabelProps) => {
	const desc = FixtureLogic.getFixtureDescription(props.fixture);
	if (!desc) {
		return null;
	}

	const type = props.fixture.role.type.toLowerCase().replace(' ', '');
	return (
		<div className={`fixture-label ${type}`}>
			<div>{desc}</div>
			{props.extra}
		</div>
	);
};
