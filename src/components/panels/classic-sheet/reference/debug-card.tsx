import { useOptions } from '@/contexts/data-context';

import './debug-card.scss';

export const DebugCard = () => {
	const userAgent = navigator.userAgent || 'unknown';
	const dpr = window.devicePixelRatio || 'unknown';
	const width = window.screen.width || 'unknown';
	const height = window.screen.height || 'unknown';
	const options = useOptions();

	return (
		<div className='debug card'>
			<h2>Debug</h2>
			<div className='content'>
				<div className='data'>
					<label>User Agent</label>
					<div>{userAgent}</div>
				</div>
				<div className='data'>
					<label>Pixel ratio</label>
					<div>{dpr}</div>
				</div>
				<div className='data'>
					<label>Screen Size </label>
					<div>{width} x {height}</div>
				</div>
				<div className='data'>
					<label>Page Options</label>
					<div>{options.classicSheetPageSize} / {options.pageOrientation}</div>
				</div>
			</div>
		</div>
	);
};
