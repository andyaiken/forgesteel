import './empty.scss';

interface Props {
	text?: string;
}

export const Empty = (props: Props) => {
	return (
		<div className='empty'>
			{props.text || 'None'}
		</div>
	);
};
