import { PowerRollPanel } from './power-roll-panel';
import type { Test } from '../../../models/power-roll';
import { useMemo } from 'react';

interface Props {
	test: Test;
	onRoll?: () => void;
}

export const TestPanel = (props: Props) => {
	const header = useMemo(() => {
		const characteristics = props.test.characteristic.join(' or ');
		return characteristics ? `${characteristics} Test` : 'Test';
	}, [ props.test ]);
	return (<PowerRollPanel header={header} powerRoll={props.test} onRoll={props.onRoll} />);
};
