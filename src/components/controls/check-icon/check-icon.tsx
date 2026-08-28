import { CheckCircleFilled, CloseCircleFilled, EllipsisOutlined, ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons';

import './check-icon.scss';

interface Props {
	state?: 'pending' | 'success' | 'warning' | 'failure';
}

export const CheckIcon = (props: Props) => {
	switch (props.state) {
		case 'pending':
			return (
				<div className='check-icon pending'>
					<LoadingOutlined />
				</div>
			);
		case 'success':
			return (
				<div className='check-icon success'>
					<CheckCircleFilled />
				</div>
			);
		case 'warning':
			return (
				<div className='check-icon warning'>
					<ExclamationCircleFilled />
				</div>
			);
		case 'failure':
			return (
				<div className='check-icon failure'>
					<CloseCircleFilled />
				</div>
			);
		default:
			return (
				<div className='check-icon none'>
					<EllipsisOutlined />
				</div>
			);
	}
};
