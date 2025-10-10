import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { ReactNode } from 'react';

import './modal.scss';

interface Props {
	toolbar?: ReactNode;
	content: ReactNode;
	onClose: () => void;
}

export const Modal = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='modal'>
				<div className='modal-toolbar'>
					<ErrorBoundary>
						{props.toolbar}
					</ErrorBoundary>
				</div>
				<div className='modal-content'>
					<ErrorBoundary>
						{props.content}
					</ErrorBoundary>
				</div>
				<div className='modal-footer'>
					<Button className='close-btn' block={true} icon={<CloseOutlined />} onClick={props.onClose}>Close</Button>
				</div>
			</div>
		</ErrorBoundary>
	);
};
