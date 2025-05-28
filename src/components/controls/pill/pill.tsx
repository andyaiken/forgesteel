import { ReactNode } from 'react';

import './pill.scss';

interface Props {
	children?: ReactNode;
}

export const Pill = (props: Props) => (
	<span className='pill'>
		{props.children}
	</span>
);

interface ResourcePillProps {
	value: number;
	repeatable?: boolean;
	units?: string;
}

export const ResourcePill = (props: ResourcePillProps) => {
	return (
		<Pill>
			{props.value}{props.units ?? (props.value === 1 ? 'pt' : 'pts')} {props.repeatable ? '+' : ''}
		</Pill>
	);
};
