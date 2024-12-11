import { Button, Popover } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

import './danger-button.scss';

interface Props {
	mode?: 'default' | 'icon';
	label?: ReactNode;
	message?: ReactNode;
	onConfirm: () => void;
}

export const DangerButton = (props: Props) => {
	try {
		return (
			<Popover
				className='danger-button'
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
				{
					props.mode === 'icon' ?
						<DeleteOutlined style={{ color: '#ff4d4f' }} />
						:
						<Button danger={true}>
							{props.label || 'Delete'}
						</Button>
				}
			</Popover>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
