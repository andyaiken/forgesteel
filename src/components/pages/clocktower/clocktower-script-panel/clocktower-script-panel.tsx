import { Button, Drawer, Tabs, notification } from 'antd';
import { ClocktowerCharacter, ClocktowerScript } from '@/models/clocktower';
import { ReactNode, useState } from 'react';
import { ClocktowerCharacterPanel } from '@/components/pages/clocktower/clocktower-character-panel/clocktower-character-panel';
import { ClocktowerLogic } from '@/logic/clocktower-logic';
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

interface Props {
	script: ClocktowerScript;
}

export const ClocktowerScriptPanel = (props: Props) => {
	const [ selectedCharacter, setSelectedCharacter ] = useState<ClocktowerCharacter | null>(null);
	const [ notify, notifyContext ] = notification.useNotification();

	const copyToClipboard = () => {
		const data = ClocktowerLogic.createExportScript(props.script);
		const json = JSON.stringify(data);
		window.navigator.clipboard.writeText(json);

		notify.info({
			title: 'Script Copied',
			description: 'This script has been copied into your clipboard. You can now import it into the BotC app.',
			placement: 'top'
		});
	};

	const getTabs = () => {
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
						children: getCharactersSection(team)
					});
				}
			});

		tabs.push({
			key: 'first-night',
			label: 'First Night',
			children: getNightSection(true)
		});
		tabs.push({
			key: 'other-nights',
			label: 'Other Nights',
			children: getNightSection(false)
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
		return props.script.characters.filter(ch => ch.role.team === team).length;
	};

	const getCharactersSection = (team: ClocktowerTeam) => {
		const characters = props.script.characters.filter(ch => ch.role.team === team);

		return (
			<div className='roles-section'>
				{
					characters.map(ch => (
						<SelectablePanel key={ch.role.id} onSelect={() => setSelectedCharacter(ch)}>
							<HeaderText>{ch.role.name}</HeaderText>
							<div className='ds-text'>{ch.role.ability}</div>
						</SelectablePanel>
					))
				}
				{
					characters.length === 0 ?
						<Empty />
						: null
				}
			</div>
		);
	};

	const getNightSection = (first: boolean) => {
		const list = first ? props.script.meta.firstNight : props.script.meta.otherNight;

		return (
			<div className='night-section'>
				{
					(list || []).map((id, n) => {
						const character = props.script.characters.find(ch => ch.role.id === id);
						if (character) {
							const reminder = (first ? character.role.firstNightReminder : character.role.otherNightReminder) || '-';
							return (
								<Field
									key={n}
									label={character.role.name}
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
					{props.script.meta.name}
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
				<Tabs items={getTabs()} />
			</div>
			<Drawer open={!!selectedCharacter} onClose={() => setSelectedCharacter(null)} closeIcon={null} size={500}>
				<Modal
					content={selectedCharacter ? <ClocktowerCharacterPanel character={selectedCharacter} /> : null}
					onClose={() => setSelectedCharacter(null)}
				/>
			</Drawer>
			{notifyContext}
		</ErrorBoundary>
	);
};
