import { Badge } from '../badge/badge';

interface Props {
	value: number;
	units?: string;
}

export const HeroicResourceBadge = (props: Props) => {
	return (<Badge value={`${props.value}${props.units ?? (props.value === 1 ? 'pt' : 'pts')}`} />);
};
