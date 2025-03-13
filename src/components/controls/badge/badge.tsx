import { ReactNode } from 'react';
import './badge.scss';

interface Props {
	children?: ReactNode;
}

export const Badge = (props: Props) => (
	<span className='badge'>
		{props.children}
	</span>
);

interface HeroicResourceBadgeProps {
	value: number;
	repeatable?: boolean;
	units?: string;
}

export const HeroicResourceBadge = (props: HeroicResourceBadgeProps) => {
	return (
		<Badge>
			{props.repeatable ? `${props.value}+` : props.value}{props.units ?? (props.value === 1 ? 'pt' : 'pts')}
		</Badge>
	);
};
