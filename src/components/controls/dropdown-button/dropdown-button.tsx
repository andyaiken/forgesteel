import { Button, Dropdown } from 'antd';
import { CSSProperties, ReactNode } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';

import './dropdown-button.scss';

interface Props {
	className?: string;
	style?: CSSProperties;
	label: ReactNode;
	items: { key: string, label: ReactNode }[];
	onClick: (key: string) => void;
}

export const DropdownButton = (props: Props) => {
	return (
		<ErrorBoundary>
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
		</ErrorBoundary>
	);
};
