import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';

import './sash-panel.scss';

interface Props {
	monogram: string;
}

export const SashPanel = (props: Props) => {
	try {
		return (
			<ErrorBoundary>
				<div className={`sash-panel type-${props.monogram.toLowerCase()}`}>{props.monogram}</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
