import { CSSProperties, ReactNode } from 'react';

import './field.scss';

interface Props {
	className?: string;
	style?: CSSProperties;
	innerStyle?: CSSProperties;
	label: ReactNode;
	labelTag?: ReactNode;
	value: ReactNode;
	valueTag?: ReactNode;
	orientation?: 'horizontal' | 'vertical';
	disabled?: boolean;
	danger?: boolean;
	highlight?: boolean;
	compact?: boolean;
};

export const Field = (props: Props) => {
	try {
		let className = `field ${props.orientation || 'horizontal'}`;
		if (props.className) {
			className += ` ${props.className}`;
		}
		if (props.disabled) {
			className += ' disabled';
		}
		if (props.danger) {
			className += ' danger';
		}
		if (props.highlight) {
			className += ' highlight';
		}
		if (props.compact) {
			className += ' compact';
		}

		return (
			<div className={className} style={props.style}>
				<span className='field-label' style={props.innerStyle}>
					{
						props.labelTag ?
							<div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
								{props.label}
								{props.labelTag}
							</div>
							:
							props.label
					}
				</span>
				<span className='field-value' style={props.innerStyle}>
					{props.value}
				</span>
				{
					props.valueTag ?
						<span className='field-tag'>
							{props.valueTag}
						</span>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
