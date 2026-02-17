import { Button, Divider, Space } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { ReactNode } from 'react';

import './button-group.scss';

interface ButtonGroupProps {
	buttons: {
		label?: ReactNode;
		tooltip?: string;
		icon?: ReactNode;
		onClick: () => void;
	}[];
}

export const ButtonGroup = (props: ButtonGroupProps) => {
	return (
		<ErrorBoundary>
			<div className='button-group'>
				<Space size={2} separator={<Divider orientation='vertical' />}>
					{
						props.buttons.map((btn, n) => (
							<Button key={n} type='text' title={btn.tooltip} onClick={btn.onClick}>
								{btn.icon}
								{btn.label}
							</Button>
						))
					}
				</Space>
			</div>
		</ErrorBoundary>
	);
};
