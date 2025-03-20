import './empty.scss';

interface Props {
	text?: string;
}

export const Empty = (props: Props) => {
	try {
		return (
			<div className='empty'>
				{props.text || 'None'}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
