import { ClocktowerCharacter } from '@/models/clocktower';
import { ClocktowerLogic } from '@/logic/clocktower-logic';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { useState } from 'react';

import './clocktower-token.scss';

interface Props {
	character: ClocktowerCharacter;
	size: number;
	flippable?: boolean;
}

export const ClocktowerToken = (props: Props) => {
	const [ flipped, setFlipped ] = useState(false);

	let className = 'clocktower-token';
	if (props.flippable) {
		className += ' flippable';

		if (flipped) {
			className += ' flipped';
		}
	}

	const img = ClocktowerLogic.getImageLocation(props.character);

	return (
		<ErrorBoundary>
			<div
				className={className}
				style={{ width: `${props.size}px` }}
				onClick={e => {
					if (props.flippable) {
						e.stopPropagation();
						setFlipped(!flipped);
					}
				}}
			>
				<div className='clocktower-token-inner'>
					<div className='clocktower-token-front'>
						<div className='clocktower-token-content'>
							{img ? <img className='clocktower-token-image' src={img} /> : undefined}
							<svg className='clocktower-token-text' viewBox='0 0 100 100'>
								<defs>
									<path id='arc' d='M 5,50 A 45,45 0 0 0 95,50' fill='none' />
								</defs>
								<text>
									<textPath href='#arc' startOffset='50%' textAnchor='middle' fill='rgba(0, 0, 0, 0.7)'>
										{props.character.role.name}
									</textPath>
								</text>
							</svg>
						</div>
					</div>
					<div className='clocktower-token-back'>
						<div className='clocktower-token-content'>
							<div className='clocktower-token-ability' style={{ fontSize: `${props.size / 15}px` }}>
								{props.character.role.ability}
							</div>
						</div>
					</div>
				</div>
			</div>
		</ErrorBoundary>
	);
};
