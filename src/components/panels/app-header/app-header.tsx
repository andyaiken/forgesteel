import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { LogoPanel } from '@/components/panels/logo/logo-panel';
import { ReactNode } from 'react';
import { useIsSmall } from '@/hooks/use-is-small';

import './app-header.scss';

interface Props {
	subheader?: string;
	children?: ReactNode;
}

export const AppHeader = (props: Props) => {
	const isSmall = useIsSmall();

	return (
		<ErrorBoundary>
			<div className='app-header'>
				<div className='left-section'>
					{!isSmall ? <LogoPanel text={props.subheader} /> : null}
				</div>
				<div className='right-section'>
					{props.children}
				</div>
			</div>
		</ErrorBoundary>
	);
};
