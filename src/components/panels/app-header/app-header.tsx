import { Button, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { LogoPanel } from '@/components/panels/logo/logo-panel';
import { ReactNode } from 'react';
import { useIsSmall } from '@/hooks/use-is-small';
import './app-header.scss';
import { LanguageSelector } from '@/components/controls/language-selector/language-selector';

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
							<LanguageSelector />
						</Popover>
						:
						<div className='right-section'>
							{props.children}
							<LanguageSelector />
						</div>
				}
			</div>
		</ErrorBoundary>
	);
};
