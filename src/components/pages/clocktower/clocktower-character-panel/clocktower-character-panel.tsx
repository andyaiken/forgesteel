import { ClocktowerCharacter, ClocktowerScript } from '@/models/clocktower';
import { ClocktowerLogic } from '@/logic/clocktower-logic';
import { Divider } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { Format } from '@/utils/format';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Markdown } from '@/components/controls/markdown/markdown';

import './clocktower-character-panel.scss';

interface Props {
	script: ClocktowerScript;
	character: ClocktowerCharacter;
}

export const ClocktowerCharacterPanel = (props: Props) => {
	const jinxes = (props.character.role.jinxes || [])
		.map(j => {
			const ch = ClocktowerLogic.getCharacter(props.script, j.id);
			if (!ch) {
				return null;
			}
			return {
				id: ch.role.id,
				name: ch.role.name,
				reason: j.reason
			};
		})
		.filter(j => !!j);

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
				<Markdown text={props.character.details.description} />
				{jinxes.length > 0 ? <HeaderText>Jinxes</HeaderText> : null}
				{jinxes.map(j => <Field key={j.id} label={j.name} value={j.reason} />)}
			</div>
		</ErrorBoundary>
	);
};
