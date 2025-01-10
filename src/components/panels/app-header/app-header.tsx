import { Button } from 'antd';
import { ReactNode } from 'react';
import { useNavigation } from '../../../hooks/use-navigation';

import shield from './../../../assets/shield.png';

import './app-header.scss';

interface Props {
	breadcrumbs: { label: string }[];
	children?: ReactNode;
	showAbout: () => void;
}

export const AppHeader = (props: Props) => {
	const navigation = useNavigation();

	return (
		<div className='app-header'>
			<div className='left-section'>
				<div className={props.breadcrumbs.length > 0 ? 'title clickable' : 'title'} onClick={navigation.goToWelcome}>
					<img className='title-logo' src={shield} />
					<div className='title-text'>Forge Steel</div>
				</div>
				{props.breadcrumbs.map((bc, n) => <div key={n} className='breadcrumb'>{bc.label}</div>)}
			</div>
			<div className='action-buttons'>
				{props.children}
				{props.children ? <div className='divider' /> : null}
				<Button onClick={props.showAbout}>About</Button>
			</div>
		</div>
	);
};
