import type { PowerRoll } from '../../../models/power-roll';
import { PowerRollPanel } from './power-roll-panel';
import { useMemo } from 'react';

interface Props {
	test: PowerRoll;
	onRoll?: () => void;
}

export const TestPanel = (props: Props) => {
	const header = useMemo(() => {
		const characteristics = props.test.characteristic.join(' or ');
		return characteristics ? `${characteristics} Test` : 'Test';
	}, [ props.test ]);

	return (
		<PowerRollPanel
			header={header}
			powerRoll={props.test}
			onRoll={props.onRoll}
		/>
	);
};
