import { ReactNode } from 'react';

import './field.scss';

interface Props {
	label: ReactNode;
	value: ReactNode;
	orientation?: 'horizontal' | 'vertical';
	disabled?: boolean;
};

export const Field = (props: Props) => {
	try {
		let className = `field ${props.orientation || 'horizontal'}`;
		if (props.disabled) {
			className += ' disabled';
		}

		return (
			<div className={className}>
				<span className='field-label'>{props.label}</span>
				<span className='field-value'>{props.value}</span>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
