import { Alert, Button, Input, Popover, Segmented, Space } from 'antd';
import { PlusOutlined, ReadOutlined } from '@ant-design/icons';
import { AppHeader } from '../../panels/app-header/app-header';
import { CounterPanel } from '../../panels/elements/counter-panel/counter-panel';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { Empty } from '../../controls/empty/empty';
import { Encounter } from '../../../models/encounter';
import { EncounterPanel } from '../../panels/elements/encounter-panel/encounter-panel';
import { Format } from '../../../utils/format';
import { HeaderText } from '../../controls/header-text/header-text';
import { Montage } from '../../../models/montage';
import { MontageData } from '../../../data/montage-data';
import { MontagePanel } from '../../panels/elements/montage-panel/montage-panel';
import { Negotiation } from '../../../models/negotiation';
import { NegotiationData } from '../../../data/negotiation-data';
import { NegotiationPanel } from '../../panels/elements/negotiation-panel/negotiation-panel';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { Options } from '../../../models/options';
import { PanelMode } from '../../../enums/panel-mode';
import { Playbook } from '../../../models/playbook';
import { PlaybookLogic } from '../../../logic/playbook-logic';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../models/sourcebook';
import { Utils } from '../../../utils/utils';
import { useNavigation } from '../../../hooks/use-navigation';
import { useParams } from 'react-router';
import { useState } from 'react';

import './session-page.scss';

interface Props {
	session: Playbook;
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	options: Options;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	updateSession: (session: Playbook) => void;
}

export const SessionPage = (props: Props) => {
	const navigation = useNavigation();
	const { elementID } = useParams<{ elementID: string }>();
	const [ previousElement, setPreviousElement ] = useState<string | undefined>(elementID);
	const [ session, setSession ] = useState<Playbook>(Utils.copy(props.session));
	const [ selectedElementID, setSelectedElementID ] = useState<string | null>(elementID ?? null);
	const [ startElement, setStartElement ] = useState<string>('encounter');
	const [ newCounterName, setNewCounterName ] = useState<string>('');
	const [ newCounterValue, setNewCounterValue ] = useState<number>(0);

	if (elementID !== previousElement) {
		setSelectedElementID(elementID ?? null);
		setPreviousElement(elementID);
	}

	const getSelectableContent = () => {
		if ((session.encounters.length === 0) && (session.montages.length === 0) && (session.negotiations.length === 0) && (session.counters.length === 0)) {
			return (
				<Empty text='Nothing is currently in progress.' />
			);
		}

		return (
			<>
				{
					session.encounters.map(e => (
						<SelectablePanel key={e.id} onSelect={() => navigation.goToSession(e.id)}>
							<EncounterPanel encounter={e} sourcebooks={props.sourcebooks} options={props.options} />
						</SelectablePanel>
					))
				}
				{
					session.montages.map(m => (
						<SelectablePanel key={m.id} onSelect={() => navigation.goToSession(m.id)}>
							<MontagePanel montage={m} />
						</SelectablePanel>
					))
				}
				{
					session.negotiations.map(n => (
						<SelectablePanel key={n.id} onSelect={() => navigation.goToSession(n.id)}>
							<NegotiationPanel negotiation={n} />
						</SelectablePanel>
					))
				}
				{
					session.counters.map(c => (
						<SelectablePanel key={c.id} onSelect={() => navigation.goToSession(c.id)}>
							<CounterPanel counter={c} />
						</SelectablePanel>
					))
				}
			</>
		);
	};

	const getSelectedContent = () => {
		if ((session.encounters.length === 0) && (session.montages.length === 0) && (session.negotiations.length === 0) && (session.counters.length === 0)) {
			return null;
		}

		if (selectedElementID) {
			const encounter = session.encounters.find(e => e.id === selectedElementID);
			if (encounter) {
				return (
					<EncounterPanel
						encounter={encounter}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={encounter => {
							const copy = Utils.copy(session);

							const index = copy.encounters.findIndex(n => n.id === encounter.id);
							if (index !== -1) {
								copy.encounters[index] = encounter;
							}

							setSession(copy);
							props.updateSession(copy);
						}}
					/>
				);
			}

			const montage = session.montages.find(m => m.id === selectedElementID);
			if (montage) {
				return (
					<MontagePanel
						montage={montage}
						mode={PanelMode.Full}
						onChange={montage => {
							const copy = Utils.copy(session);

							const index = copy.montages.findIndex(n => n.id === montage.id);
							if (index !== -1) {
								copy.montages[index] = montage;
							}

							setSession(copy);
							props.updateSession(copy);
						}}
					/>
				);
			}

			const negotiation = session.negotiations.find(n => n.id === selectedElementID);
			if (negotiation) {
				return (
					<NegotiationPanel
						negotiation={negotiation}
						mode={PanelMode.Full}
						onChange={negotiation => {
							const copy = Utils.copy(session);

							const index = copy.negotiations.findIndex(n => n.id === negotiation.id);
							if (index !== -1) {
								copy.negotiations[index] = negotiation;
							}

							setSession(copy);
							props.updateSession(copy);
						}}
					/>
				);
			}

			const counter = session.counters.find(c => c.id === selectedElementID);
			if (counter) {
				return (
					<CounterPanel
						counter={counter}
						mode={PanelMode.Full}
						onChange={counter => {
							const copy = Utils.copy(session);

							const index = copy.counters.findIndex(c => c.id === counter.id);
							if (index !== -1) {
								copy.counters[index] = counter;
							}

							setSession(copy);
							props.updateSession(copy);
						}}
					/>
				);
			}
		}

		return (
			<Empty text='Select an element from the list on the left.' />
		);
	};

	const getStartContent = () => {
		const startEncounter = (encounter: Encounter) => {
			const copy = PlaybookLogic.startEncounter(encounter, props.sourcebooks);

			const sessionCopy = Utils.copy(session);
			sessionCopy.encounters.push(copy);

			setSession(sessionCopy);
			props.updateSession(sessionCopy);
			navigation.goToSession(copy.id);
		};

		const startMontage = (montage: Montage) => {
			const copy = PlaybookLogic.startMontage(montage);

			const sessionCopy = Utils.copy(session);
			sessionCopy.montages.push(copy);

			setSession(sessionCopy);
			navigation.goToSession(copy.id);
			props.updateSession(sessionCopy);
		};

		const startNegotiation = (negotiation: Negotiation) => {
			const copy = PlaybookLogic.startNegotiation(negotiation);

			const sessionCopy = Utils.copy(session);
			sessionCopy.negotiations.push(copy);

			setSession(sessionCopy);
			props.updateSession(sessionCopy);
			navigation.goToSession(copy.id);
		};

		const startCounter = () => {
			const counter = {
				id: Utils.guid(),
				name: newCounterName || 'New Counter',
				description: '',
				value: newCounterValue
			};
			setNewCounterName('');
			setNewCounterValue(0);

			const copy = PlaybookLogic.startCounter(counter);

			const sessionCopy = Utils.copy(session);
			sessionCopy.counters.push(copy);

			setSession(sessionCopy);
			props.updateSession(sessionCopy);
			navigation.goToSession(copy.id);
		};

		const exampleMontages = [
			MontageData.fightFire,
			MontageData.infiltrateThePalace,
			MontageData.prepareForBattle,
			MontageData.trackTheFugitive,
			MontageData.wildernessRace
		];

		const exampleNegotiations = [
			NegotiationData.banditChief,
			NegotiationData.knight,
			NegotiationData.guildmaster,
			NegotiationData.warlord,
			NegotiationData.burgomaster,
			NegotiationData.virtuoso,
			NegotiationData.highPriest,
			NegotiationData.duke,
			NegotiationData.dragon,
			NegotiationData.monarch,
			NegotiationData.lich,
			NegotiationData.deity
		];

		switch (startElement) {
			case 'encounter':
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<div className='ds-text bold-text'>Your encounters:</div>
						{
							props.playbook.encounters.map(e => (
								<Button key={e.id} block={true} onClick={() => startEncounter(e)}>{e.name || 'Unnamed Encounter'}</Button>
							))
						}
						{
							props.playbook.encounters.length === 0 ?
								<Alert
									type='warning'
									showIcon={true}
									message='You have not created any encounters.'
									action={<Button type='text' title='Encounters' icon={<ReadOutlined />} onClick={() => navigation.goToPlaybookList('encounter')} />}
								/>
								: null
						}
					</Space>
				);
			case 'montage':
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<div className='ds-text bold-text'>Your montages:</div>
						{
							props.playbook.montages.map(m => (
								<Button key={m.id} block={true} onClick={() => startMontage(m)}>{m.name || 'Unnamed Montage'}</Button>
							))
						}
						{
							props.playbook.montages.length === 0 ?
								<Alert
									type='warning'
									showIcon={true}
									message='You have not created any montages.'
									action={<Button type='text' title='Montages' icon={<ReadOutlined />} onClick={() => navigation.goToPlaybookList('montage')} />}
								/>
								: null
						}
						<div className='ds-text bold-text'>Example montages:</div>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
							{
								exampleMontages.map(m => (
									<Button key={m.id} block={true} onClick={() => startMontage(m)}>{m.name}</Button>
								))
							}
						</div>
					</Space>
				);
			case 'negotiation':
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<div className='ds-text bold-text'>Your negotiations:</div>
						{
							props.playbook.negotiations.map(n => (
								<Button key={n.id} block={true} onClick={() => startNegotiation(n)}>{n.name || 'Unnamed Negotiation'}</Button>
							))
						}
						{
							props.playbook.negotiations.length === 0 ?
								<Alert
									type='warning'
									showIcon={true}
									message='You have not created any negotiations.'
									action={<Button type='text' title='Negotiations' icon={<ReadOutlined />} onClick={() => navigation.goToPlaybookList('negotiation')} />}
								/>
								: null
						}
						<div className='ds-text bold-text'>Example negotiations:</div>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
							{
								exampleNegotiations.map(n => (
									<Button key={n.id} block={true} onClick={() => startNegotiation(n)}>{n.name}</Button>
								))
							}
						</div>
					</Space>
				);
			case 'counter':
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<div className='ds-text bold-text'>Create a new counter:</div>
						<Input
							placeholder='Counter Name'
							allowClear={true}
							value={newCounterName}
							onChange={e => setNewCounterName(e.target.value)}
						/>
						<NumberSpin label='Starting Value' value={newCounterValue} onChange={setNewCounterValue} />
						<Button block={true} onClick={() => startCounter()}>Create counter</Button>
					</Space>
				);
		}
	};

	const finish = () => {
		const copy = Utils.copy(session);

		copy.encounters = copy.encounters.filter(e => e.id !== selectedElementID);
		copy.montages = copy.montages.filter(m => m.id !== selectedElementID);
		copy.negotiations = copy.negotiations.filter(n => n.id !== selectedElementID);
		copy.counters = copy.counters.filter(c => c.id !== selectedElementID);

		setSession(copy);
		props.updateSession(copy);
		if (selectedElementID === selectedElementID) {
			navigation.goToSession();
		}
	};

	try {
		return (
			<div className='session-page'>
				<AppHeader subheader='Session' showDirectory={props.showDirectory} showAbout={props.showAbout} showRoll={props.showRoll}>
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ width: '375px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<Segmented
									name='startelements'
									block={true}
									options={[ 'encounter', 'montage', 'negotiation', 'counter' ].map(o => ({ value: o, label: Format.capitalize(o) }))}
									value={startElement}
									onChange={setStartElement}
								/>
								{getStartContent()}
							</div>
						)}
					>
						<Button type='primary' icon={<PlusOutlined />}>
							Add
						</Button>
					</Popover>
					{
						selectedElementID ?
							<DangerButton
								label='Finish'
								onConfirm={finish}
							/>
							: null
					}
				</AppHeader>
				<div className='session-page-content'>
					<Space className='left-column' direction='vertical'>
						<HeaderText level={1}>In Progress</HeaderText>
						{getSelectableContent()}
					</Space>
					<div className='right-column'>
						{getSelectedContent()}
					</div>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
