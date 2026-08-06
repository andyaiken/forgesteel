import { Characteristic } from '@/enums/characteristic';
import { CheckIcon } from '@/components/controls/check-icon/check-icon';
import { Collections } from '@/utils/collections';
import { Format } from '@/utils/format';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Modal } from '@/components/modals/modal/modal';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Tag } from 'antd';

import './party-modal.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	onClose: () => void;
}

export const PartyModal = (props: Props) => {
	const languages = SourcebookLogic.getLanguages(props.sourcebooks)
		.map(l => l.name)
		.filter(l => props.heroes.some(h => HeroLogic.getLanguages(h, props.sourcebooks).some(x => x.name === l)));
	const skills = SourcebookLogic.getSkills(props.sourcebooks)
		.map(s => s.name)
		.filter(s => props.heroes.some(h => HeroLogic.getSkills(h, props.sourcebooks).some(x => x.name === s)));

	const itemProficiencies = Collections.distinct(props.heroes.flatMap(h => HeroLogic.getProficiencies(h)), x => x).sort();

	return (
		<Modal
			content={
				<div className='party-modal'>
					<HeaderText>Stamina</HeaderText>
					<table>
						<thead>
							<tr>
								<th></th>
								{props.heroes.map(h => <th key={h.id} className='hero-column-header'>{h.name}</th>)}
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='row-label stamina-cell'>Stamina</td>
								{
									props.heroes.map(h => {
										const max = HeroLogic.getStamina(h);
										const current = max - h.state.staminaDamage;
										const state = HeroLogic.getCombatState(h);

										return (
											<td key={h.id} className='row-cell stamina-cell'>
												{max > 0 ? `${current} / ${max}` : '-'}
												{
													!([ 'healthy', 'injured' ].includes(state)) ?
														<div>
															<Tag color={state === 'winded' ? 'orange' : 'red'} variant='outlined'>{Format.capitalize(state)}</Tag>
														</div>
														: null
												}
											</td>
										);
									})
								}
							</tr>
							<tr>
								<td className='row-label'>Recoveries</td>
								{
									props.heroes.map(h => {
										const max = HeroLogic.getRecoveries(h);
										const current = max - h.state.recoveriesUsed;

										return (
											<td key={h.id} className='row-cell'>
												{max > 0 ? `${current} / ${max}` : '-'}
											</td>
										);
									})
								}
							</tr>
						</tbody>
					</table>
					<HeaderText>Heroic Resource</HeaderText>
					<table>
						<thead>
							<tr>
								<th></th>
								{props.heroes.map(h => <th key={h.id} className='hero-column-header'>{h.name}</th>)}
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='row-label'>Resources</td>
								{
									props.heroes.map(h => {
										const resources = HeroLogic.getHeroicResources(h);
										return (
											<td key={h.id} className='row-cell'>
												{
													resources.length > 0 ?
														resources.map(hr => (
															<div key={hr.id}>
																<div>{hr.value}</div>
																<div className='resource-name'>{hr.name}</div>
															</div>
														))
														: '-'
												}
											</td>
										);
									})
								}
							</tr>
						</tbody>
					</table>
					<HeaderText>Languages</HeaderText>
					<table>
						<thead>
							<tr>
								<th></th>
								{props.heroes.map(h => <th key={h.id} className='hero-column-header'>{h.name}</th>)}
							</tr>
						</thead>
						<tbody>
							{
								languages.map((l, n) => {
									return (
										<tr key={n}>
											<td className='row-label'>{l}</td>
											{
												props.heroes.map(h => (
													<td key={h.id} className='row-cell'>
														{HeroLogic.getLanguages(h, props.sourcebooks).some(x => x.name === l) ? <CheckIcon state='success' /> : null}
													</td>
												))
											}
										</tr>
									);
								})
							}
						</tbody>
					</table>
					<HeaderText>Skills</HeaderText>
					<table>
						<thead>
							<tr>
								<th></th>
								{props.heroes.map(h => <th key={h.id} className='hero-column-header'>{h.name}</th>)}
							</tr>
						</thead>
						<tbody>
							{
								skills.map((s, n) => {
									return (
										<tr key={n}>
											<td className='row-label'>{s}</td>
											{
												props.heroes.map(h => (
													<td key={h.id} className='row-cell'>
														{HeroLogic.getSkills(h, props.sourcebooks).some(x => x.name === s) ? <CheckIcon state='success' /> : null}
													</td>
												))
											}
										</tr>
									);
								})
							}
						</tbody>
					</table>
					<HeaderText>Equipment</HeaderText>
					<table>
						<thead>
							<tr>
								<th></th>
								{props.heroes.map(h => <th key={h.id} className='hero-column-header'>{h.name}</th>)}
							</tr>
						</thead>
						<tbody>
							{
								itemProficiencies.map((i, n) => {
									return (
										<tr key={n}>
											<td className='row-label'>{i}</td>
											{
												props.heroes.map(h => (
													<td key={h.id} className='row-cell'>
														{HeroLogic.getProficiencies(h).includes(i) ? <CheckIcon state='success' /> : null}
													</td>
												))
											}
										</tr>
									);
								})
							}
						</tbody>
					</table>
					<HeaderText>Characteristics</HeaderText>
					<table>
						<thead>
							<tr>
								<th></th>
								{props.heroes.map(h => <th key={h.id} className='hero-column-header'>{h.name}</th>)}
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='row-label'>Might</td>
								{
									props.heroes.map(h => (
										<td key={h.id} className='row-cell'>
											{HeroLogic.getCharacteristic(h, Characteristic.Might)}
										</td>
									))
								}
							</tr>
							<tr>
								<td className='row-label'>Agility</td>
								{
									props.heroes.map(h => (
										<td key={h.id} className='row-cell'>
											{HeroLogic.getCharacteristic(h, Characteristic.Agility)}
										</td>
									))
								}
							</tr>
							<tr>
								<td className='row-label'>Reason</td>
								{
									props.heroes.map(h => (
										<td key={h.id} className='row-cell'>
											{HeroLogic.getCharacteristic(h, Characteristic.Reason)}
										</td>
									))
								}
							</tr>
							<tr>
								<td className='row-label'>Intuition</td>
								{
									props.heroes.map(h => (
										<td key={h.id} className='row-cell'>
											{HeroLogic.getCharacteristic(h, Characteristic.Intuition)}
										</td>
									))
								}
							</tr>
							<tr>
								<td className='row-label'>Presence</td>
								{
									props.heroes.map(h => (
										<td key={h.id} className='row-cell'>
											{HeroLogic.getCharacteristic(h, Characteristic.Presence)}
										</td>
									))
								}
							</tr>
						</tbody>
					</table>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
