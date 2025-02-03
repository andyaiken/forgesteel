import { Button } from 'antd';
import { LogoPanel } from '../logo/logo-panel';
import { ReactNode } from 'react';

import './app-header.scss';

interface Props {
	breadcrumbs: { label: string }[];
	children?: ReactNode;
	showNavigation: () => void;
	showAbout: () => void;
}

export const AppHeader = (props: Props) => {
	return (
		<div className='app-header'>
			<div className='left-section'>
				<LogoPanel onClick={props.showNavigation} />
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
