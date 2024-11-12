import { Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

import './dropdown-button.scss';

interface Props {
	label: string;
	items: { key: string, label: ReactNode }[];
	onClick: (key: string) => void;
}

export const DropdownButton = (props: Props) => {
	try {
		return (
			<div className='dropdown-button'>
				<Dropdown
					menu={{
						items: props.items,
						onClick: e => props.onClick(e.key)
					}}
					trigger={[ 'click' ]}
				>
					<Button block={true}>
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
