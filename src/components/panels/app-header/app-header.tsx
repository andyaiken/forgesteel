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
}

export const AppHeader = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');

	return (
		<ErrorBoundary>
			<div className='app-header'>
				<div className='left-section'>
					{props.showDirectory ? <Button type='text' icon={<MenuOutlined />} onClick={props.showDirectory} /> : null}
					{!isSmall ? <LogoPanel text={props.subheader} /> : null}
				</div>
				{
					isSmall ?
						<Popover
							trigger='click'
							content={(
								<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
									{props.children}
								</div>
							)}
						>
							<Button type='primary'>
								Actions
								<DownOutlined />
							</Button>
						</Popover>
						:
						<div className='right-section'>
							{props.children}
						</div>
				}
			</div>
		</ErrorBoundary>
	);
};
