import { ReactNode } from 'react';

import './modal.scss';

interface Props {
	toolbar?: ReactNode;
	content: ReactNode;
	footer?: ReactNode;
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
					{props.footer}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
