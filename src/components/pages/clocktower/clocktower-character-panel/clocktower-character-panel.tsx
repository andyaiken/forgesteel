import { ClocktowerCharacter, ClocktowerScript } from '@/models/clocktower';
import { Divider, Flex } from 'antd';
import { ClocktowerLogic } from '@/logic/clocktower-logic';
import { ClocktowerToken } from '@/components/pages/clocktower/clocktower-token/clocktower-token';
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
				character: ch,
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
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<ClocktowerToken character={props.character} size={150} flippable={true} />
					<div className='ds-text flavor-text'>
						{`"${props.character.role.flavor}"`}
					</div>
				</div>
				<Divider />
				<Field label='Ability' value={props.character.role.ability} />
				<Divider />
				<Markdown text={props.character.details.description} />
				{jinxes.length > 0 ? <HeaderText>Jinxes</HeaderText> : null}
				{
					jinxes.map(j => (
						<Flex key={j.character.role.id} align='center' gap={10}>
							<ClocktowerToken character={j.character} size={30} />
							<Field label={j.character.role.name} value={j.reason} />
						</Flex>
					))
				}
			</div>
		</ErrorBoundary>
	);
};
