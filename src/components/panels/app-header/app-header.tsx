import { Button } from 'antd';
import { ReactNode } from 'react';
import shield from './../../../assets/shield.png';
import { useModals } from '../../../hooks/use-modals';

import './app-header.scss';

interface Props {
	subtitle?: string;
	children?: ReactNode;
	goHome?: () => void;
}

export const AppHeader = (props: Props) => {
	const modals = useModals();
	return (
		<div className='app-header'>
			<div className={props.goHome ? 'title clickable' : 'title'} onClick={props.goHome}>
				<img className='title-logo' src={shield} />
				<div className='title-text'>Forge Steel</div>
				{ props.subtitle ? <div className='subtitle-text'>{props.subtitle}</div> : null}
			</div>
			<div className='action-buttons'>
				{props.children}
				{props.children ? <div className='divider' /> : null}
				<Button onClick={modals.showAbout}>About</Button>
			</div>
		</div>
	);
};
