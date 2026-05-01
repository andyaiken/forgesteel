import { ClocktowerRoleCombined } from '@/models/clocktower';
import { Divider } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { Format } from '@/utils/format';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Markdown } from '@/components/controls/markdown/markdown';

import './clocktower-role-panel.scss';

interface RolePanelProps {
	role: ClocktowerRoleCombined;
}

export const ClocktowerRolePanel = (props: RolePanelProps) => {
	return (
		<ErrorBoundary>
			<div className='clocktower-role-panel'>
				<HeaderText
					level={1}
					tags={[
						Format.capitalize(props.role.role.team)
					]}
				>
					{props.role.role.name}
				</HeaderText>
				<div className='ds-text flavor-text'>
					{`"${props.role.role.flavor}"`}
				</div>
				<Field label='Ability' value={props.role.role.ability} />
				<Divider />
				<Markdown text={props.role.details.description} />
			</div>
		</ErrorBoundary>
	);
};
