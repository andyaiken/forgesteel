import { Button, Drawer, Flex, Tabs, notification } from 'antd';
import { ClocktowerRole, ClocktowerRoleCombined, ClocktowerRoleDetails, ClocktowerScript } from '@/models/clocktower';
import { CopyOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { ClocktowerData } from '@/data/clocktower-data';
import { ClocktowerLogic } from '@/logic/clocktower-logic';
import { ClocktowerRolePanel } from '@/components/pages/clocktower/clocktower-role-panel/clocktower-role-panel';
import { ClocktowerTeam } from '@/enums/clocktower-team';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Modal } from '@/components/modals/modal/modal';
import { StatsRow } from '@/components/panels/stats-row/stats-row';
import { useState } from 'react';

import './clocktower-script-panel.scss';

interface ScriptPanelProps {
	script: ClocktowerScript;
	detailsMap: { [ id: string ]: ClocktowerRoleDetails };
}

export const ClocktowerScriptPanel = (props: ScriptPanelProps) => {
	const [ selectedRole, setSelectedRole ] = useState<ClocktowerRoleCombined | null>(null);
	const [ notify, notifyContext ] = notification.useNotification();

	const copyToClipboard = () => {
		const json = JSON.stringify(props.script);
		window.navigator.clipboard.writeText(json);

		notify.info({
			title: 'Script Copied',
			description: 'You can now import it into the BotC app.',
			placement: 'top'
		});
	};

	const getRoles = (team: ClocktowerTeam) => {
		const roles = ClocktowerLogic.getCharacters(ClocktowerData.script)
			.filter(r => (r as ClocktowerRole).team === team)
			.map(r => ClocktowerLogic.getRoleDetails(ClocktowerData.script, ClocktowerData.detailsMap, r.id))
			.filter(r => !!r);

		return (
			<>
				{
					roles.map(r => (
						<Flex key={r.role.id} align='center' gap={5}>
							<Button type='text' icon={<InfoCircleOutlined />} onClick={() => setSelectedRole(r)} />
							<Field label={r.role.name} value={r.role.ability} />
						</Flex>
					))
				}
				{
					roles.length === 0 ?
						<Empty />
						: null
				}
			</>
		);
	};

	const info = ClocktowerLogic.getScriptInfo(props.script);
	if (!info) {
		return null;
	}

	return (
		<ErrorBoundary>
			<div className='clocktower-script-panel'>
				<HeaderText
					level={1}
					extra={
						<Button icon={<CopyOutlined />} onClick={copyToClipboard}>
							Copy
						</Button>
					}
				>
					{info.name}
				</HeaderText>
				<StatsRow>
					<Field orientation='vertical' label='Townsfolk' value={ClocktowerLogic.getCharacters(props.script).filter(c => c.team === ClocktowerTeam.Townsfolk).length} />
					<Field orientation='vertical' label='Outsiders' value={ClocktowerLogic.getCharacters(props.script).filter(c => c.team === ClocktowerTeam.Outsider).length} />
					<Field orientation='vertical' label='Minions' value={ClocktowerLogic.getCharacters(props.script).filter(c => c.team === ClocktowerTeam.Minion).length} />
					<Field orientation='vertical' label='Demons' value={ClocktowerLogic.getCharacters(props.script).filter(c => c.team === ClocktowerTeam.Demon).length} />
					<Field orientation='vertical' label='Travellers' value={ClocktowerLogic.getCharacters(props.script).filter(c => c.team === ClocktowerTeam.Traveller).length} />
					<Field orientation='vertical' label='Fabled' value={ClocktowerLogic.getCharacters(props.script).filter(c => c.team === ClocktowerTeam.Fabled).length} />
					<Field orientation='vertical' label='Lorics' value={ClocktowerLogic.getCharacters(props.script).filter(c => c.team === ClocktowerTeam.Loric).length} />
				</StatsRow>
				<Tabs
					items={[
						{
							key: 'townsfolk',
							label: 'Townsfolk',
							children: (
								<>
									{getRoles(ClocktowerTeam.Townsfolk)}
								</>
							)
						},
						{
							key: 'outsiders',
							label: 'Outsiders',
							children: (
								<>
									{getRoles(ClocktowerTeam.Outsider)}
								</>
							)
						},
						{
							key: 'minions',
							label: 'Minions',
							children: (
								<>
									{getRoles(ClocktowerTeam.Minion)}
								</>
							)
						},
						{
							key: 'demons',
							label: 'Demons',
							children: (
								<>
									{getRoles(ClocktowerTeam.Demon)}
								</>
							)
						},
						{
							key: 'travellers',
							label: 'Travellers',
							children: (
								<>
									{getRoles(ClocktowerTeam.Traveller)}
								</>
							)
						},
						{
							key: 'fabled',
							label: 'Fabled',
							children: (
								<>
									{getRoles(ClocktowerTeam.Fabled)}
								</>
							)
						},
						{
							key: 'lorics',
							label: 'Lorics',
							children: (
								<>
									{getRoles(ClocktowerTeam.Loric)}
								</>
							)
						},
						{
							key: 'first-night',
							label: 'First Night',
							children: (
								<>
									{
										info.firstNight?.map((id, n) => {
											const role = ClocktowerLogic.getRoleDetails(props.script, props.detailsMap, id);
											if (role) {
												return (
													<Field key={n} label={role.role.name} value={role.role.firstNightReminder || '-'} />
												);
											}

											return (
												<div key={n}>
													[{id}]
												</div>
											);
										})
									}
								</>
							)
						},
						{
							key: 'other-nights',
							label: 'Other Nights',
							children: (
								<>
									{
										info.otherNight?.map((id, n) => {
											const role = ClocktowerLogic.getRoleDetails(props.script, props.detailsMap, id);
											if (role) {
												return (
													<Field key={n} label={role.role.name} value={role.role.otherNightReminder || '-'} />
												);
											}

											return (
												<div key={n}>
													[{id}]
												</div>
											);
										})
									}
								</>
							)
						}
					]}
				/>
			</div>
			<Drawer open={!!selectedRole} onClose={() => setSelectedRole(null)} closeIcon={null} size={500}>
				<Modal
					content={selectedRole ? <ClocktowerRolePanel role={selectedRole} /> : null}
					onClose={() => setSelectedRole(null)}
				/>
			</Drawer>
			{notifyContext}
		</ErrorBoundary>
	);
};
