import type { Test } from '../../../models/test';

import './test-panel.scss';

interface Props {
	test: Test;
	onRoll?: () => void;
}

export const TestPanel = (props: Props) => {
	try {
		return (
			<div className={props.onRoll ? 'test-panel clickable' : 'test-panel'} onClick={props.onRoll}>
				<div className='test-row test-header'>
					{ props.test.characteristic} Test
				</div>
				<div className='test-row'>
					<div className='tier'>11 -</div>
					<div className='effect'>{props.test.tier1}</div>
				</div>
				<div className='test-row'>
					<div className='tier'>12 - 16</div>
					<div className='effect'>{props.test.tier2}</div>
				</div>
				<div className='test-row'>
					<div className='tier'>17 +</div>
					<div className='effect'>{props.test.tier3}</div>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
