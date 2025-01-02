import { Badge } from '../badge/badge';
import { useMemo } from 'react';
import './heroic-resource-badge.scss';

interface Props {
	value: number;
	units?: string;
}

export const HeroicResourceBadge = (props: Props) => {
	const units = useMemo(
		() => props.units ?? (props.value === 1 ? 'pt' : 'pts'),
		[ props.units, props.value ]
	);
	return (<Badge value={`${props.value}${units}`} />);
};
