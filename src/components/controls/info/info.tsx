import { InfoCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { ReactNode } from 'react';

import './info.scss';

interface Props {
	children: ReactNode;
}
export const Info = (props: Props) => {
	return (
		<Popover content={props.children}>
			<InfoCircleOutlined className='info-icon' />
		</Popover>
	);
};
