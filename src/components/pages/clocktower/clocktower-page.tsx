import { AppFooter, FooterParams } from '@/components/panels/app-footer/app-footer';
import { Button, Tabs } from 'antd';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { ClocktowerData } from '@/data/clocktower-data';
import { ClocktowerLogic } from '@/logic/clocktower-logic';
import { ClocktowerRole } from '@/models/clocktower';
import { ClocktowerTeam } from '@/enums/clocktower-team';
import { CopyOutlined } from '@ant-design/icons';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Options } from '@/models/options';
import { StatsRow } from '@/components/panels/stats-row/stats-row';

import './clocktower-page.scss';

interface Props {
	options: Options;
	params: FooterParams;
}

export const ClocktowerPage = (props: Props) => {
	const copyToClipboard = () => {
		const json = JSON.stringify(ClocktowerData.script);
		window.navigator.clipboard.writeText(json);
	};

	const getRoles = (team: ClocktowerTeam) => {
		const roles = ClocktowerLogic.getCharacters(ClocktowerData.script)
			.filter(r => (r as ClocktowerRole).team === team);

		if (roles.length === 0) {
			return (
				<Empty />
			);
		}

		return (
			<>
				{
					roles.map(r => (
						<Field key={r.id} label={r.name} value={r.ability} />
					))
				}
			</>
		);
	};

	const info = ClocktowerLogic.getScriptInfo(ClocktowerData.script);
	if (!info) {
		return null;
	}

	return (
		<ErrorBoundary>
			<div className='clocktower-page'>
				<AppHeader />
				<div className='clocktower-page-content'>
					<HeaderText
						level={1}
						extra={<Button type='text' icon={<CopyOutlined />} onClick={copyToClipboard} />}
					>
						{info.name}
					</HeaderText>
					<StatsRow>
						<Field orientation='vertical' label='Townsfolk' value={ClocktowerLogic.getCharacters(ClocktowerData.script).filter(c => c.team === ClocktowerTeam.Townsfolk).length} />
						<Field orientation='vertical' label='Outsiders' value={ClocktowerLogic.getCharacters(ClocktowerData.script).filter(c => c.team === ClocktowerTeam.Outsider).length} />
						<Field orientation='vertical' label='Minions' value={ClocktowerLogic.getCharacters(ClocktowerData.script).filter(c => c.team === ClocktowerTeam.Minion).length} />
						<Field orientation='vertical' label='Demons' value={ClocktowerLogic.getCharacters(ClocktowerData.script).filter(c => c.team === ClocktowerTeam.Demon).length} />
						<Field orientation='vertical' label='Travellers' value={ClocktowerLogic.getCharacters(ClocktowerData.script).filter(c => c.team === ClocktowerTeam.Traveller).length} />
						<Field orientation='vertical' label='Fabled' value={ClocktowerLogic.getCharacters(ClocktowerData.script).filter(c => c.team === ClocktowerTeam.Fabled).length} />
						<Field orientation='vertical' label='Lorics' value={ClocktowerLogic.getCharacters(ClocktowerData.script).filter(c => c.team === ClocktowerTeam.Loric).length} />
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
												const role = ClocktowerLogic.getRole(ClocktowerData.script, id);
												if (role) {
													return (
														<Field key={n} label={role.name} value={role.firstNightReminder || '-'} />
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
												const role = ClocktowerLogic.getRole(ClocktowerData.script, id);
												if (role) {
													return (
														<Field key={n} label={role.name} value={role.otherNightReminder || '-'} />
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
				<AppFooter
					page='welcome'
					params={props.params}
					options={props.options}
				/>
			</div>
		</ErrorBoundary>
	);
};
