import { Button, Dropdown } from 'antd';
import { CSSProperties, ReactNode } from 'react';
import { DownOutlined } from '@ant-design/icons';

import './dropdown-button.scss';

interface Props {
	className?: string;
	style?: CSSProperties;
	label: string;
	items: { key: string, label: ReactNode }[];
	onClick: (key: string) => void;
}

export const DropdownButton = (props: Props) => {
	try {
		return (
			<div className='dropdown-button' style={props.style}>
				<Dropdown
					menu={{
						items: props.items,
						onClick: e => props.onClick(e.key)
					}}
					trigger={[ 'click' ]}
				>
					<Button className={props.className} block={true}>
						{props.label}
						<DownOutlined />
					</Button>
				</Dropdown>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
