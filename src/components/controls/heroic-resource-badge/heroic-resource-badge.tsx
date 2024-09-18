import './heroic-resource-badge.scss';

interface Props {
	value: number;
}

export const HeroicResourceBadge = (props: Props) => {
	return (
		<span className='heroic-resource-badge'>
			{props.value}{props.value === 1 ? 'pt' : 'pts'}
		</span>
	);
};
