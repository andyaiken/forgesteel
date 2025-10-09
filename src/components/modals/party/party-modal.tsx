import { Button, Drawer } from 'antd';
import { Ancestry } from '@/models/ancestry';
import { AncestryPanel } from '@/components/panels/elements/ancestry-panel/ancestry-panel';
import { Career } from '@/models/career';
import { CareerPanel } from '@/components/panels/elements/career-panel/career-panel';
import { Characteristic } from '@/enums/characteristic';
import { CheckCircleFilled } from '@ant-design/icons';
import { ClassPanel } from '@/components/panels/elements/class-panel/class-panel';
import { Collections } from '@/utils/collections';
import { Complication } from '@/models/complication';
import { ComplicationPanel } from '@/components/panels/elements/complication-panel/complication-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { HeroLogic } from '@/logic/hero-logic';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { useState } from 'react';

import './party-modal.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	onClose: () => void;
}

export const PartyModal = (props: Props) => {
	const [ selectedAncestry, setSelectedAncestry ] = useState<Ancestry | null>(null);
	const [ selectedCareer, setSelectedCareer ] = useState<Career | null>(null);
	const [ selectedClass, setSelectedClass ] = useState<HeroClass | null>(null);
	const [ selectedComplication, setSelectedComplication ] = useState<Complication | null>(null);

	const languages = SourcebookLogic.getLanguages(props.sourcebooks)
		.map(l => l.name)
		.filter(l => props.heroes.some(h => HeroLogic.getLanguages(h, props.sourcebooks).some(x => x.name === l)));
	const skills = SourcebookLogic.getSkills(props.sourcebooks)
		.map(s => s.name)
		.filter(s => props.heroes.some(h => HeroLogic.getSkills(h, props.sourcebooks).some(x => x.name === s)));

	const itemProficiencies = Collections.distinct(props.heroes.flatMap(h => HeroLogic.getProficiencies(h)), x => x).sort();

	return (
		<ErrorBoundary>
			<Modal
				content={
					<div className='party-modal'>
						<HeaderText>Overview</HeaderText>
						<table>
							<thead>
								<tr>
									<th></th>
									{props.heroes.map(h => <th key={h.id} className='hero-column-header'>{h.name || 'Unnamed Hero'}</th>)}
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='row-label'>Ancestry</td>
									{
										props.heroes.map(h => (
											<td key={h.id} className='row-cell'>
												{
													h.ancestry ?
														<Button block={true} type='text' onClick={() => setSelectedAncestry(h.ancestry)}>{h.ancestry.name || 'Unnamed Ancestry'}</Button>
														: '(none)'
												}
											</td>
										))
									}
								</tr>
								<tr>
									<td className='row-label'>Career</td>
									{
										props.heroes.map(h => (
											<td key={h.id} className='row-cell'>
												{
													h.career ?
														<Button block={true} type='text' onClick={() => setSelectedCareer(h.career)}>{h.career.name || 'Unnamed Career'}</Button>
														: '(none)'
												}
											</td>
										))
									}
								</tr>
								<tr>
									<td className='row-label'>Class</td>
									{
										props.heroes.map(h => (
											<td key={h.id} className='row-cell'>
												{
													h.class ?
														<Button block={true} type='text' onClick={() => setSelectedClass(h.class)}>{h.class.name || 'Unnamed Class'}</Button>
														: '(none)'
												}
											</td>
										))
									}
								</tr>
								<tr>
									<td className='row-label'>Complication</td>
									{
										props.heroes.map(h => (
											<td key={h.id} className='row-cell'>
												{
													h.complication ?
														<Button block={true} type='text' onClick={() => setSelectedComplication(h.complication)}>{h.complication.name || 'Unnamed Complication'}</Button>
														: '(none)'
												}
											</td>
										))
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
															{HeroLogic.getLanguages(h, props.sourcebooks).some(x => x.name === l) ? <CheckCircleFilled style={{ color: 'rgb(0, 120, 0)' }} /> : null}
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
															{HeroLogic.getSkills(h, props.sourcebooks).some(x => x.name === s) ? <CheckCircleFilled style={{ color: 'rgb(0, 120, 0)' }} /> : null}
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
															{HeroLogic.getProficiencies(h).includes(i) ? <CheckCircleFilled style={{ color: 'rgb(0, 120, 0)' }} /> : null}
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
			<Drawer open={!!selectedAncestry} onClose={() => setSelectedAncestry(null)} closeIcon={null} width='500px'>
				<Modal
					content={
						selectedAncestry ?
							<AncestryPanel
								ancestry={selectedAncestry}
								sourcebooks={props.sourcebooks}
								options={props.options}
								mode={PanelMode.Full}
							/>
							: null
					}
					onClose={() => setSelectedAncestry(null)}
				/>
			</Drawer>
			<Drawer open={!!selectedCareer} onClose={() => setSelectedCareer(null)} closeIcon={null} width='500px'>
				<Modal
					content={
						selectedCareer ?
							<CareerPanel
								career={selectedCareer}
								sourcebooks={props.sourcebooks}
								options={props.options}
								mode={PanelMode.Full}
							/>
							: null
					}
					onClose={() => setSelectedCareer(null)}
				/>
			</Drawer>
			<Drawer open={!!selectedClass} onClose={() => setSelectedClass(null)} closeIcon={null} width='500px'>
				<Modal
					content={
						selectedClass ?
							<ClassPanel
								heroClass={selectedClass}
								sourcebooks={props.sourcebooks}
								options={props.options}
								mode={PanelMode.Full}
							/>
							: null
					}
					onClose={() => setSelectedClass(null)}
				/>
			</Drawer>
			<Drawer open={!!selectedComplication} onClose={() => setSelectedComplication(null)} closeIcon={null} width='500px'>
				<Modal
					content={
						selectedComplication ?
							<ComplicationPanel
								complication={selectedComplication}
								options={props.options}
								mode={PanelMode.Full}
							/>
							: null
					}
					onClose={() => setSelectedComplication(null)}
				/>
			</Drawer>
		</ErrorBoundary>
	);
};
