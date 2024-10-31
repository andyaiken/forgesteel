import { ReactNode } from 'react';

import './field.scss';

interface Props {
	label: ReactNode;
	value: ReactNode;
	disabled?: boolean;
};

export const Field = (props: Props) => {
	try {
		return (
			<div className={props.disabled ? 'field disabled' : 'field'}>
				<span className='field-label'>{props.label}</span>
				<span className='field-value'>{props.value}</span>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
