import './field.scss';

interface Props {
	label: string | number | JSX.Element | JSX.Element[];
	value: string | number | JSX.Element | JSX.Element[];
	className?: string;
};

export const Field = (props: Props) => {
	try {
		return (
			<div className={`field ${props.className || ''}`}> {/* for feature panel fields */}
				<span className='field-label'>{props.label}</span>
				<span className='field-value'>{props.value}</span>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
