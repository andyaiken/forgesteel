import { Characteristic } from '../../../enums/characteristic';
import { CheckCircleFilled } from '@ant-design/icons';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { Modal } from '../modal/modal';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookLogic } from '../../../logic/sourcebook-logic';

import './party-modal.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	onClose: () => void;
}

export const PartyModal = (props: Props) => {
	try {
		const languages = SourcebookLogic.getLanguages(props.sourcebooks)
			.map(l => l.name)
			.filter(l => props.heroes.some(h => HeroLogic.getLanguages(h, props.sourcebooks).some(x => x.name === l)));
		const skills = SourcebookLogic.getSkills(props.sourcebooks)
			.map(s => s.name)
			.filter(s => props.heroes.some(h => HeroLogic.getSkills(h, props.sourcebooks).some(x => x.name === s)));

		return (
			<Modal
				content={
					<div className='party-modal'>
						<HeaderText>Languages</HeaderText>
						<table>
							<thead>
								<tr>
									<th>Language</th>
									{props.heroes.map(h => <th key={h.id}>{h.name}</th>)}
								</tr>
							</thead>
							<tbody>
								{
									languages.map((l, n) => {
										return (
											<tr key={n}>
												<td className='row-label'>{l}</td>
												{props.heroes.map(h => <td key={h.id} className='row-cell'>{HeroLogic.getLanguages(h, props.sourcebooks).some(x => x.name === l) ? <CheckCircleFilled style={{ color: 'rgb(0, 120, 0)' }} /> : null}</td>)}
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
									<th>Skill</th>
									{props.heroes.map(h => <th key={h.id}>{h.name}</th>)}
								</tr>
							</thead>
							<tbody>
								{
									skills.map((s, n) => {
										return (
											<tr key={n}>
												<td className='row-label'>{s}</td>
												{props.heroes.map(h => <td key={h.id} className='row-cell'>{HeroLogic.getSkills(h, props.sourcebooks).some(x => x.name === s) ? <CheckCircleFilled style={{ color: 'rgb(0, 120, 0)' }} /> : null}</td>)}
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
									<th>Characteristic</th>
									{props.heroes.map(h => <th key={h.id}>{h.name}</th>)}
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='row-label'>Might</td>
									{props.heroes.map(h => <td key={h.id} className='row-cell'>{HeroLogic.getCharacteristic(h, Characteristic.Might)}</td>)}
								</tr>
								<tr>
									<td className='row-label'>Agility</td>
									{props.heroes.map(h => <td key={h.id} className='row-cell'>{HeroLogic.getCharacteristic(h, Characteristic.Agility)}</td>)}
								</tr>
								<tr>
									<td className='row-label'>Reason</td>
									{props.heroes.map(h => <td key={h.id} className='row-cell'>{HeroLogic.getCharacteristic(h, Characteristic.Reason)}</td>)}
								</tr>
								<tr>
									<td className='row-label'>Intuition</td>
									{props.heroes.map(h => <td key={h.id} className='row-cell'>{HeroLogic.getCharacteristic(h, Characteristic.Intuition)}</td>)}
								</tr>
								<tr>
									<td className='row-label'>Presence</td>
									{props.heroes.map(h => <td key={h.id} className='row-cell'>{HeroLogic.getCharacteristic(h, Characteristic.Presence)}</td>)}
								</tr>
							</tbody>
						</table>
					</div>
				}
				onClose={props.onClose}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
