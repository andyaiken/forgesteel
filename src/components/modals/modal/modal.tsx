import { Button } from 'antd';
import { ReactNode } from 'react';

import './modal.scss';

interface Props {
	toolbar?: ReactNode;
	content: ReactNode;
	onClose: () => void;
}

export const Modal = (props: Props) => {
	try {
		return (
			<div className='modal'>
				<div className='modal-toolbar'>
					{props.toolbar}
				</div>
				<div className='modal-content'>
					{props.content}
				</div>
				<div className='modal-footer'>
					<Button className='close-btn' onClick={props.onClose}>Close</Button>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
