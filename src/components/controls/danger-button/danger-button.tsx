import { Button, Popover } from 'antd';
import { MouseEvent, ReactNode, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

interface Props {
	mode?: 'default' | 'block' | 'inline' | 'clear' | 'icon';
	label?: string;
	icon?: ReactNode;
	message?: ReactNode;
	disabled?: boolean;
	disabledMessage?: ReactNode;
	onConfirm: (e: MouseEvent) => void;
}

export const DangerButton = (props: Props) => {
	const [ open, setOpen ] = useState<boolean>(false);

	const disabled = props.disabled || false;
	const icon = props.icon || <DeleteOutlined />;

	const showDisabledMessage = disabled && !!props.disabledMessage;
	const buttonStyle = disabled ? { pointerEvents: 'none' as const } : undefined;

	const getContent = () => {
		switch (props.mode) {
			case 'block':
				return (
					<Button style={buttonStyle} icon={icon} block={true} disabled={disabled} danger={true}>
						{props.label || 'Delete'}
					</Button>
				);
			case 'inline':
				return (
					<Button style={buttonStyle} type='text' icon={icon} block={true} disabled={disabled} danger={true}>
						{props.label || 'Delete'}
					</Button>
				);
			case 'clear':
				return (
					<Button style={buttonStyle} type='text' title={props.label || 'Delete'} icon={icon} disabled={disabled} danger={true} />
				);
			case 'icon':
				return (
					<Button style={buttonStyle} title={props.label || 'Delete'} icon={icon} disabled={disabled} danger={true} />
				);
			default:
				return (
					<Button style={buttonStyle} icon={icon} disabled={disabled} danger={true}>
						{props.label || 'Delete'}
					</Button>
				);
		}
	};

	return (
		<Popover
			className={props.mode === 'icon' ? 'danger-button icon' : 'danger-button'}
			open={disabled && !showDisabledMessage ? false : open}
			onOpenChange={setOpen}
			trigger='click'
			content={(
				<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
					{
						showDisabledMessage ?
							props.disabledMessage
							: props.message || <div className='ds-text'>This can't be undone; are you sure?</div>
					}
					{
						!showDisabledMessage ?
							<Button danger={true} onClick={e => { e.stopPropagation(); setOpen(false); props.onConfirm(e); }}>
								{props.label || 'Delete'}
							</Button>
							: null
					}
				</div>
			)}
		>
			<div style={{ cursor: disabled ? 'not-allowed' : undefined }} onClick={e => e.stopPropagation()}>
				{getContent()}
			</div>
		</Popover>
	);
};
