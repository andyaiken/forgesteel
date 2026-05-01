import { ClocktowerRoleCombined } from '@/models/clocktower';
import { Divider } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { HeaderText } from '@/components/controls/header-text/header-text';

import './clocktower-role-panel.scss';

interface RolePanelProps {
	role: ClocktowerRoleCombined;
}

export const ClocktowerRolePanel = (props: RolePanelProps) => {
	return (
		<ErrorBoundary>
			<div className='clocktower-role-panel'>
				<HeaderText level={1}>{props.role.role.name}</HeaderText>
				<div className='ds-text' style={{ fontStyle: 'italic', opacity: '0.7' }}>{props.role.role.flavor}</div>
				<div className='ds-text'>{props.role.role.ability}</div>
				<Divider />
				<div className='ds-text'>{props.role.details.description}</div>
			</div>
		</ErrorBoundary>
	);
};
