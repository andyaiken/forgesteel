import { ButtonConfig, ButtonGroup, DropdownConfig } from '@/components/controls/button-group/button-group';
import { CheckCircleOutlined, CopyOutlined, WarningOutlined } from '@ant-design/icons';
import { ClocktowerCharacter, ClocktowerScript } from '@/models/clocktower';
import { Drawer, Tabs, notification } from 'antd';
import { ClocktowerCharacterPanel } from '@/components/pages/clocktower/clocktower-character-panel/clocktower-character-panel';
import { ClocktowerLogic } from '@/logic/clocktower-logic';
import { ClocktowerScriptType } from '@/enums/clocktower-script-type';
import { ClocktowerTeam } from '@/enums/clocktower-team';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Modal } from '@/components/modals/modal/modal';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { StatsRow } from '@/components/panels/stats-row/stats-row';
import { useState } from 'react';

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

	const getCharactersSection = (team: ClocktowerTeam) => {
		const characters = props.script.characters.filter(ch => ch.role.team === team);

		const getImage = (ch: ClocktowerCharacter) => {
			const img = ClocktowerLogic.getImageLocation(ch);
			return img ?
				<img className='role-image' src={img} />
				: undefined;
		};

		return (
			<div className='roles-section'>
				{
					characters.map(ch => (
						<SelectablePanel key={ch.role.id} onSelect={() => setSelectedCharacter(ch)}>
							<HeaderText extra={getImage(ch)}>
								{ch.role.name}
							</HeaderText>
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
		const meta = ClocktowerLogic.createMeta(props.script);
		const list = first ? meta.firstNight : meta.otherNight;

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

	const issues = ClocktowerLogic.validate(props.script);
	const buttons: (ButtonConfig | DropdownConfig)[] = [];
	if (issues.length > 0) {
		buttons.push({
			type: 'dropdown',
			icon: issues.length === 0 ? <CheckCircleOutlined /> : <WarningOutlined />,
			disabled: issues.length === 0,
			popover: (
				<>
					{issues.map((issue, n) => (<div key={n} className='ds-text'>{issue}</div>))}
				</>
			)
		});
	}
	buttons.push({
		type: 'button',
		label: 'Copy',
		icon: <CopyOutlined />,
		onClick: copyToClipboard
	});

	return (
		<ErrorBoundary>
			<div className='clocktower-script-panel'>
				<HeaderText
					level={1}
					tags={props.script.type === ClocktowerScriptType.Teensyville ? [ 'Teensyville' ] : []}
					extra={
						<ButtonGroup buttons={buttons} />
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
								const count = ClocktowerLogic.getTeamCount(props.script, team);
								return count > 0 ?
									<Field key={team} orientation='vertical' label={ClocktowerLogic.getTeamName(team)} value={count} />
									: null;
							})
					}
				</StatsRow>
				<Tabs
					items={[
						{
							key: 'characters',
							label: 'Characters',
							children: (
								<>
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
												const count = ClocktowerLogic.getTeamCount(props.script, team);
												if (count === 0) {
													return null;
												}

												return (
													<div key={team}>
														<HeaderText>{ClocktowerLogic.getTeamName(team)}</HeaderText>
														{getCharactersSection(team)}
													</div>
												);
											})
									}
								</>
							)
						},
						{
							key: 'night-order',
							label: 'Night Order',
							children: (
								<div>
									<HeaderText>First Night</HeaderText>
									{getNightSection(true)}
									<HeaderText>Other Nights</HeaderText>
									{getNightSection(false)}
								</div>
							)
						}
					]}
				/>
			</div>
			<Drawer open={!!selectedCharacter} onClose={() => setSelectedCharacter(null)} closeIcon={null} size={500}>
				<Modal
					content={selectedCharacter ? <ClocktowerCharacterPanel character={selectedCharacter} script={props.script} /> : null}
					onClose={() => setSelectedCharacter(null)}
				/>
			</Drawer>
			{notifyContext}
		</ErrorBoundary>
	);
};
