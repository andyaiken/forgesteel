import { CheckCircleOutlined, EllipsisOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';

import './loading-success-error.scss';

interface Props {
	state: 'loading' | 'success' | 'error' | null;
}

export const LoadingSuccessError = (props: Props) => {
	switch (props.state) {
		case 'loading':
			return (
				<div className='loading-status loading'>
					<LoadingOutlined />
				</div>
			);
		case 'success':
			return (
				<div className='loading-status success'>
					<CheckCircleOutlined />
				</div>
			);
		case 'error':
			return (
				<div className='loading-status error'>
					<ExclamationCircleOutlined />
				</div>
			);
		default:
			return (
				<div className='loading-status none'>
					<EllipsisOutlined />
				</div>
			);
	}
};
