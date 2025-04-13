import { Button, Popover } from 'antd';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { LogoPanel } from '../logo/logo-panel';
import { ReactNode } from 'react';
import { useMediaQuery } from '../../../hooks/use-media-query';

import './app-header.scss';

interface Props {
	subheader?: string;
	children?: ReactNode;
	showDirectory?: () => void;
	showRoll: () => void;
	showRules: () => void;
	showAbout: () => void;
}

export const AppHeader = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');

	const actions = (
		<>
			{props.children}
			{props.children ? <div className='divider' /> : null}
			<Button onClick={props.showRoll}>Roll</Button>
			<Button onClick={props.showRules}>Rules</Button>
			<Button onClick={props.showAbout}>About</Button>
		</>
	);

	return (
		<ErrorBoundary>
			<div className='app-header'>
				<div className='left-section'>
					{props.showDirectory ? <Button type='text' icon={<MenuOutlined />} onClick={props.showDirectory} /> : null}
					{!isSmall ? <LogoPanel text={props.subheader} /> : null}
				</div>
				{
					isSmall ?
						<div className='action-buttons-dropdown'>
							<Popover
								trigger='click'
								content={(
									<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
										{actions}
									</div>
								)}
							>
								<Button type='primary'>
									Actions
									<DownOutlined />
								</Button>
							</Popover>
						</div>
						:
						<div className='action-buttons-panel'>
							{actions}
						</div>
				}
			</div>
		</ErrorBoundary>
	);
};
