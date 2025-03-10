import { Button, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LogoPanel } from '../logo/logo-panel';
import { ReactNode } from 'react';
import { useMediaQuery } from '../../../hooks/use-media-query';

import './app-header.scss';

interface Props {
	subheader?: string;
	children?: ReactNode;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll?: () => void;
}

export const AppHeader = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');

	const actions = (
		<>
			{props.children}
			{props.children ? <div className='divider' /> : null}
			{props.showRoll ? <Button onClick={props.showRoll}>Roll</Button> : null}
			<Button onClick={props.showAbout}>About</Button>
		</>
	);

	return (
		<div className='app-header'>
			<div className='left-section'>
				<LogoPanel onClick={props.showDirectory} />
				{
					props.subheader && !isSmall ? <div className='breadcrumbs'>{props.subheader}</div> : null
				}
			</div>
			{
				isSmall ?
					<div className='action-buttons-dropdown'>
						<Popover
							trigger='click'
							placement='bottom'
							content={(
								<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
									{actions}
								</div>
							)}
						>
							<Button>
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
	);
};
