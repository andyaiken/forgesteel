import { Button, Popover } from 'antd';
import { MouseEvent, ReactNode } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

import './danger-button.scss';

interface Props {
	mode?: 'default' | 'icon';
	block?: boolean;
	disabled?: boolean;
	label?: ReactNode;
	message?: ReactNode;
	onConfirm: (e: MouseEvent) => void;
}

export const DangerButton = (props: Props) => {
	try {
		const disabled = props.disabled || false;

		return (
			<Popover
				className={props.mode === 'icon' ? 'danger-button icon' : 'danger-button'}
				trigger='click'
				placement='bottom'
				content={(
					<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
						{props.message || <div className='ds-text'>This can't be undone; are you sure?</div>}
						<Button danger={true} onClick={props.onConfirm}>
							{props.label || 'Delete'}
						</Button>
					</div>
				)}
			>
				<div onClick={e => e.stopPropagation()}>
					{
						props.mode === 'icon' ?
							<DeleteOutlined style={{ color: '#ff4d4f', pointerEvents: disabled ? 'none' : 'auto', opacity: disabled ? 0.6 : 1 }} />
							:
							<Button icon={<DeleteOutlined />} block={props.block || false} disabled={disabled} danger={true}>
								{props.label || 'Delete'}
							</Button>
					}
				</div>
			</Popover>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
