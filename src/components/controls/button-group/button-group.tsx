import { Button, Divider, Popover, Space } from 'antd';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { ReactNode } from 'react';

import './button-group.scss';

export interface ButtonConfig {
	type: 'button';
	label?: string;
	tooltip?: string;
	icon?: ReactNode;
	primary?: boolean;
	disabled?: boolean;
	onClick: () => void;
}

export interface DangerConfig {
	type: 'danger';
	label?: string;
	icon?: ReactNode;
	disabled?: boolean;
	disabledMessage?: string;
	onClick: () => void;
}

export interface DropdownConfig {
	type: 'dropdown';
	label?: string;
	tooltip?: string;
	icon?: ReactNode;
	primary?: boolean;
	disabled?: boolean;
	popover: ReactNode;
}

export interface ControlConfig {
	type: 'control';
	control: ReactNode;
}

interface ButtonGroupProps {
	buttons: (ButtonConfig | DangerConfig | DropdownConfig | ControlConfig)[];
}

export const ButtonGroup = (props: ButtonGroupProps) => {
	return (
		<ErrorBoundary>
			<div className='button-group'>
				<Space size={2} separator={<Divider orientation='vertical' />}>
					{
						props.buttons.map((item, n) => {
							switch (item.type) {
								case 'button':
									return (
										<Button key={n} type={item.primary ? 'primary' : 'text'} disabled={item.disabled} icon={item.icon} title={item.tooltip} onClick={item.onClick}>
											{item.label}
										</Button>
									);
								case 'danger':
									return (
										<DangerButton mode={item.label ? 'inline' : 'icon'} label={item.label} icon={item.icon} disabled={item.disabled} disabledMessage={item.disabledMessage} onConfirm={() => item.onClick()} />
									);
								case 'dropdown':
									return (
										<Popover className='dropdown' trigger='click' content={item.popover}>
											<Button type={item.primary ? 'primary' : 'text'} disabled={item.disabled} icon={item.icon} title={item.tooltip}>
												{item.label}
											</Button>
										</Popover>
									);
								case 'control':
									return item.control;
							}
						})
					}
				</Space>
			</div>
		</ErrorBoundary>
	);
};
