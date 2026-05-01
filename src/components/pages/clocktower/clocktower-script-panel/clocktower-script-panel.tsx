import { Button, Drawer, Tabs, notification } from 'antd';
import { ClocktowerRole, ClocktowerRoleCombined, ClocktowerRoleDetails, ClocktowerScript, ClocktowerScriptInfo } from '@/models/clocktower';
import { ReactNode, useState } from 'react';
import { ClocktowerLogic } from '@/logic/clocktower-logic';
import { ClocktowerRolePanel } from '@/components/pages/clocktower/clocktower-role-panel/clocktower-role-panel';
import { ClocktowerTeam } from '@/enums/clocktower-team';
import { CopyOutlined } from '@ant-design/icons';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Modal } from '@/components/modals/modal/modal';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { StatsRow } from '@/components/panels/stats-row/stats-row';

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
			description: 'This script has been copied into your clipboard. You can now import it into the BotC app.',
			placement: 'top'
		});
	};

	const getTabs = (info: ClocktowerScriptInfo) => {
		const tabs: { key: string, label: string, children: ReactNode }[] = [];

		[
			ClocktowerTeam.Townsfolk,
			ClocktowerTeam.Outsider,
			ClocktowerTeam.Minion,
			ClocktowerTeam.Demon,
			ClocktowerTeam.Traveller,
			ClocktowerTeam.Fabled,
			ClocktowerTeam.Loric
		]
			.forEach(team => {
				const count = getTeamCount(team);
				if (count > 0) {
					tabs.push({
						key: team,
						label: getTeamName(team),
						children: getRoleSection(team)
					});
				}
			});

		tabs.push({
			key: 'first-night',
			label: 'First Night',
			children: getNightSection(info, true)
		});
		tabs.push({
			key: 'other-nights',
			label: 'Other Nights',
			children: getNightSection(info, false)
		});

		return tabs;
	};

	const getTeamName = (team: ClocktowerTeam) => {
		switch (team) {
			case ClocktowerTeam.Townsfolk:
				return 'Townsfolk';
			case ClocktowerTeam.Outsider:
				return 'Outsiders';
			case ClocktowerTeam.Minion:
				return 'Minions';
			case ClocktowerTeam.Demon:
				return 'Demons';
			case ClocktowerTeam.Traveller:
				return 'Travellers';
			case ClocktowerTeam.Fabled:
				return 'Fabled';
			case ClocktowerTeam.Loric:
				return 'Lorics';
		}
	};

	const getTeamCount = (team: ClocktowerTeam) => {
		return ClocktowerLogic.getCharacters(props.script).filter(c => c.team === team).length;
	};

	const getRoleSection = (team: ClocktowerTeam) => {
		const roles = ClocktowerLogic.getCharacters(props.script)
			.filter(r => (r as ClocktowerRole).team === team)
			.map(r => ClocktowerLogic.getRoleDetails(props.script, props.detailsMap, r.id))
			.filter(r => !!r);

		return (
			<div className='roles-section'>
				{
					roles.map(r => (
						<SelectablePanel key={r.role.id} onSelect={() => setSelectedRole(r)}>
							<HeaderText>{r.role.name}</HeaderText>
							<div className='ds-text'>{r.role.ability}</div>
						</SelectablePanel>
					))
				}
				{
					roles.length === 0 ?
						<Empty />
						: null
				}
			</div>
		);
	};

	const getNightSection = (info: ClocktowerScriptInfo, first: boolean) => {
		const list = first ? info.firstNight : info.otherNight;

		return (
			<div className='night-section'>
				{
					(list || []).map((id, n) => {
						const role = ClocktowerLogic.getRoleDetails(props.script, props.detailsMap, id);
						if (role) {
							const reminder = (first ? role.role.firstNightReminder : role.role.otherNightReminder) || '-';
							return (
								<Field
									key={n}
									label={role.role.name}
									value={reminder}
								/>
							);
						}

						return (
							<div key={n}>
								[{id}]
							</div>
						);
					})
				}
				{
					(list || []).length === 0 ?
						<Empty />
						: null
				}
			</div>
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
					{
						[
							ClocktowerTeam.Townsfolk,
							ClocktowerTeam.Outsider,
							ClocktowerTeam.Minion,
							ClocktowerTeam.Demon,
							ClocktowerTeam.Traveller,
							ClocktowerTeam.Fabled,
							ClocktowerTeam.Loric
						]
							.map(team => {
								const count = getTeamCount(team);
								return count > 0 ?
									<Field key={team} orientation='vertical' label={getTeamName(team)} value={count} />
									: null;
							})
					}
				</StatsRow>
				<Tabs items={getTabs(info)} />
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
