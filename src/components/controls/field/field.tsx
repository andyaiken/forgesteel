import './field.scss';

interface Props {
	label: string;
	value: string | number | JSX.Element;
};

export const Field = (props: Props) => {
	return (
		<div className='field'>
			<span className='field-label'>{props.label}</span>
			<span className='field-value'>{props.value}</span>
		</div>
	);
};
