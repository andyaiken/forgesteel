import './badge.scss';

interface Props {
	value: string | number | boolean;
}

export const Badge = (props: Props) => (
	<span className='badge'>
		{props.value}
	</span>
);
