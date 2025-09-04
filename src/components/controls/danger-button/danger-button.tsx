import { Button, Popover } from 'antd';
import { MouseEvent, ReactNode, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

import './danger-button.scss';

interface Props {
	mode?: 'default' | 'block' | 'clear' | 'icon';
	disabled?: boolean;
	label?: string;
	icon?: ReactNode;
	message?: ReactNode;
	onConfirm: (e: MouseEvent) => void;
}

export const DangerButton = (props: Props) => {
	const [ open, setOpen ] = useState<boolean>(false);

	try {
		const disabled = props.disabled || false;
		const icon = props.icon || <DeleteOutlined />;

		const getContent = () => {
			switch (props.mode) {
				case 'block':
					return (
						<Button icon={icon} block={true} disabled={disabled} danger={true}>
							{props.label || 'Delete'}
						</Button>
					);
				case 'clear':
					return (
						<Button type='text' title={props.label || 'Delete'} icon={icon} disabled={disabled} danger={true} />
					);
				case 'icon':
					return (
						<Button title={props.label || 'Delete'} icon={icon} disabled={disabled} danger={true} />
					);
				default:
					return (
						<Button icon={icon} disabled={disabled} danger={true}>
							{props.label || 'Delete'}
						</Button>
					);
			}
		};

		return (
			<Popover
				className={props.mode === 'icon' ? 'danger-button icon' : 'danger-button'}
				open={disabled ? false : open}
				onOpenChange={setOpen}
				trigger='click'
				content={(
					<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
						{props.message || <div className='ds-text'>This can't be undone; are you sure?</div>}
						<Button danger={true} onClick={e => { setOpen(false); props.onConfirm(e); }}>
							{props.label || 'Delete'}
						</Button>
					</div>
				)}
			>
				<div onClick={e => e.stopPropagation()}>
					{getContent()}
				</div>
			</Popover>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
