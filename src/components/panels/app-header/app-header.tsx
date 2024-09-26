import { Button } from 'antd';

import shield from './../../../assets/shield.png';
import './app-header.scss';

interface Props {
	children?: string | JSX.Element | JSX.Element[];
	goHome?: () => void;
	showAbout: () => void;
}

export const AppHeader = (props: Props) => {
	return (
		<div className='app-header'>
			<div className={props.goHome ? 'title clickable' : 'title'} onClick={props.goHome}>
				<img className='title-logo' src={shield} />
				<div className='title-text'>Forge Steel</div>
			</div>
			<div className='action-buttons'>
				{props.children}
				{props.children ? <div className='divider' /> : null}
				<Button onClick={props.showAbout}>About</Button>
			</div>
		</div>
	);
};
