import { ClocktowerCharacter } from '@/models/clocktower';
import { Divider } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { Format } from '@/utils/format';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Markdown } from '@/components/controls/markdown/markdown';

import './clocktower-character-panel.scss';

interface Props {
	character: ClocktowerCharacter;
}

export const ClocktowerCharacterPanel = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='clocktower-character-panel'>
				<HeaderText
					level={1}
					tags={[
						Format.capitalize(props.character.role.team)
					]}
				>
					{props.character.role.name}
				</HeaderText>
				{
					!!props.character.role.image && (props.character.role.image.length > 0) ?
						<div className='clocktower-token'>
							<img className='clocktower-token-image' src={props.character.role.image[0]} />
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
						: null
				}
				<div className='ds-text flavor-text'>
					{`"${props.character.role.flavor}"`}
				</div>
				<Divider />
				<Field label='Ability' value={props.character.role.ability} />
				<Divider />
				<Markdown text={props.character.details.description} />
			</div>
		</ErrorBoundary>
	);
};
