import type { PowerRoll } from '../../../models/power-roll';
import { PowerRollPanel } from './power-roll-panel';

interface Props {
	test: PowerRoll;
	onRoll?: () => void;
}

export const TestPanel = (props: Props) => {
	const header = (props.test.characteristic.length > 0) ? `${props.test.characteristic.join(' or ')} Test` : 'Test';

	return (
		<PowerRollPanel
			header={header}
			powerRoll={props.test}
			onRoll={props.onRoll}
		/>
	);
};
