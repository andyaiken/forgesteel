import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';

import shield from './../../../assets/shield.png';

import './logo-panel.scss';

interface Props {
	text?: string;
}

export const LogoPanel = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='logo-panel'>
				<img className='logo-panel-image' src={shield} />
				<div className='logo-panel-text'>{props.text || 'Forge Steel'}</div>
			</div>
		</ErrorBoundary>
	);
};
