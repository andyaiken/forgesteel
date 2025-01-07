import { Badge } from '../badge/badge';

interface Props {
	value: number;
	repeatable?: boolean;
	units?: string;
}

export const HeroicResourceBadge = (props: Props) => {
	return (<Badge>{props.repeatable ? `${props.value}+` : props.value}{props.units ?? (props.value === 1 ? 'pt' : 'pts')}</Badge>);
};
