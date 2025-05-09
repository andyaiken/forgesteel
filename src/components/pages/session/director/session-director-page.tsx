import { Alert, Button, Input, Popover, Segmented, Space } from 'antd';
import { DownOutlined, ReadOutlined, SettingOutlined } from '@ant-design/icons';
import { AppFooter } from '../../../panels/app-footer/app-footer';
import { AppHeader } from '../../../panels/app-header/app-header';
import { CounterRunPanel } from '../../../panels/run/counter-run/counter-run-panel';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Empty } from '../../../controls/empty/empty';
import { Encounter } from '../../../../models/encounter';
import { EncounterData } from '../../../../data/encounter-data';
import { EncounterRunPanel } from '../../../panels/run/encounter-run/encounter-run-panel';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Format } from '../../../../utils/format';
import { Hero } from '../../../../models/hero';
import { Montage } from '../../../../models/montage';
import { MontageData } from '../../../../data/montage-data';
import { MontageRunPanel } from '../../../panels/run/montage-run/montage-run-panel';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationData } from '../../../../data/negotiation-data';
import { NegotiationRunPanel } from '../../../panels/run/negotiation-run/negotiation-run-panel';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Options } from '../../../../models/options';
import { OptionsPanel } from '../../../panels/options/options-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { Playbook } from '../../../../models/playbook';
import { PlaybookLogic } from '../../../../logic/playbook-logic';
import { Sourcebook } from '../../../../models/sourcebook';
import { TacticalMap } from '../../../../models/tactical-map';
import { TacticalMapDisplayType } from '../../../../enums/tactical-map-display-type';
import { TacticalMapPanel } from '../../../panels/elements/tactical-map-panel/tactical-map-panel';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useState } from 'react';

import './session-director-page.scss';

interface Props {
	session: Playbook;
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showReference: () => void;
	showPlayerView: () => void;
	updateHero: (hero: Hero) => void;
	updateSession: (session: Playbook) => void;
	setOptions: (options: Options) => void;
}

export const SessionDirectorPage = (props: Props) => {
	const navigation = useNavigation();
	const [ session, setSession ] = useState<Playbook>(Utils.copy(props.session));
	const [ selectedElementID, setSelectedElementID ] = useState<string | null>(() => {
		const options = PlaybookLogic.getContentOptions(session);
		return options.length > 0 ? options[0].id : null;
	});
	const [ startElement, setStartElement ] = useState<string>('encounter');
	const [ newCounterName, setNewCounterName ] = useState<string>('');
	const [ newCounterValue, setNewCounterValue ] = useState<number>(0);

	const getSelector = () => {
		const options = PlaybookLogic.getContentOptions(session).map(o => {
			return {
				value: o.id,
				label: o.name
			};
		});

		if (options.length <= 1) {
			return null;
		}

		return (
			<div className='session-page-content-selector'>
				<Segmented
					options={options}
					value={selectedElementID}
					onChange={setSelectedElementID}
				/>
			</div>
		);
	};

	const getSelectedContent = () => {
		if (selectedElementID) {
			const encounter = session.encounters.find(e => e.id === selectedElementID);
			if (encounter) {
				return (
					<div className='session-page-content-container'>
						<EncounterRunPanel
							encounter={encounter}
							sourcebooks={props.sourcebooks}
							heroes={props.heroes}
							options={props.options}
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
					</div>
				);
			}

			const montage = session.montages.find(m => m.id === selectedElementID);
			if (montage) {
				return (
					<div className='session-page-content-container'>
						<MontageRunPanel
							montage={montage}
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
					</div>
				);
			}

			const negotiation = session.negotiations.find(n => n.id === selectedElementID);
			if (negotiation) {
				return (
					<div className='session-page-content-container'>
						<NegotiationRunPanel
							negotiation={negotiation}
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
					</div>
				);
			}

			const map = session.tacticalMaps.find(tm => tm.id === selectedElementID);
			if (map) {
				return (
					<div className='session-page-content-container'>
						<TacticalMapPanel
							map={map}
							display={TacticalMapDisplayType.DirectorEdit}
							options={props.options}
							heroes={props.heroes}
							encounters={session.encounters}
							sourcebooks={props.sourcebooks}
							mode={PanelMode.Full}
							updateMap={map => {
								const copy = Utils.copy(session);

								const index = copy.tacticalMaps.findIndex(tm => tm.id === map.id);
								if (index !== -1) {
									copy.tacticalMaps[index] = map;
								}

								setSession(copy);
								props.updateSession(copy);
							}}
							updateHero={props.updateHero}
							updateEncounter={encounter => {
								const copy = Utils.copy(session);

								const index = copy.encounters.findIndex(enc => enc.id === encounter.id);
								if (index !== -1) {
									copy.encounters[index] = encounter;
								}

								setSession(copy);
								props.updateSession(copy);
							}}
						/>
					</div>
				);
			}

			const counter = session.counters.find(c => c.id === selectedElementID);
			if (counter) {
				return (
					<div className='session-page-content-container'>
						<CounterRunPanel
							counter={counter}
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
					</div>
				);
			}
		}

		const options = PlaybookLogic.getContentOptions(session);
		if (options.length === 0) {
			return (
				<Empty text='Nothing is currently in progress.' />
			);
		}

		return null;
	};

	const getStartContent = () => {
		const startEncounter = (encounter: Encounter) => {
			const copy = PlaybookLogic.startEncounter(encounter, props.sourcebooks, props.heroes, props.options);

			const sessionCopy = Utils.copy(session);
			sessionCopy.encounters.push(copy);

			setSession(sessionCopy);
			props.updateSession(sessionCopy);
			setSelectedElementID(copy.id);
		};

		const startMontage = (montage: Montage) => {
			const copy = PlaybookLogic.startMontage(montage);

			const sessionCopy = Utils.copy(session);
			sessionCopy.montages.push(copy);

			setSession(sessionCopy);
			props.updateSession(sessionCopy);
			setSelectedElementID(copy.id);
		};

		const startNegotiation = (negotiation: Negotiation) => {
			const copy = PlaybookLogic.startNegotiation(negotiation);

			const sessionCopy = Utils.copy(session);
			sessionCopy.negotiations.push(copy);

			setSession(sessionCopy);
			props.updateSession(sessionCopy);
			setSelectedElementID(copy.id);
		};

		const startMap = (map: TacticalMap) => {
			const copy = PlaybookLogic.startMap(map);

			const sessionCopy = Utils.copy(session);
			sessionCopy.tacticalMaps.push(copy);

			setSession(sessionCopy);
			props.updateSession(sessionCopy);
			setSelectedElementID(copy.id);
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
			setSelectedElementID(copy.id);
		};

		const exampleEncounters = [
			EncounterData.goblinAmbush,
			EncounterData.dragonAttack
		];

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
						<div className='ds-text bold-text'>Example encounters:</div>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
							{
								exampleEncounters.map(e => (
									<Button key={e.id} block={true} onClick={() => startEncounter(e)}>{e.name}</Button>
								))
							}
						</div>
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
			case 'map':
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<div className='ds-text bold-text'>Your maps:</div>
						{
							props.playbook.tacticalMaps.map(tm => (
								<Button key={tm.id} block={true} onClick={() => startMap(tm)}>{tm.name || 'Unnamed Map'}</Button>
							))
						}
						{
							props.playbook.tacticalMaps.length === 0 ?
								<Alert
									type='warning'
									showIcon={true}
									message='You have not created any maps.'
									action={<Button type='text' title='Maps' icon={<ReadOutlined />} onClick={() => navigation.goToPlaybookList('tactical-map')} />}
								/>
								: null
						}
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
		copy.tacticalMaps = copy.tacticalMaps.filter(tm => tm.id !== selectedElementID);
		copy.counters = copy.counters.filter(c => c.id !== selectedElementID);

		if (copy.playerViewID === selectedElementID) {
			copy.playerViewID = null;
		}

		setSession(copy);
		props.updateSession(copy);

		const options = PlaybookLogic.getContentOptions(copy);
		setSelectedElementID(options.length > 0 ? options[0].id : null);
	};

	try {
		return (
			<ErrorBoundary>
				<div className='session-director-page'>
					<AppHeader subheader='Session' showDirectory={props.showDirectory}>
						<Popover
							trigger='click'
							content={(
								<div style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
									<Segmented
										name='startelements'
										block={true}
										options={[ 'encounter', 'montage', 'negotiation', 'map', 'counter' ].map(o => ({ value: o, label: Format.capitalize(o) }))}
										value={startElement}
										onChange={setStartElement}
									/>
									{getStartContent()}
								</div>
							)}
						>
							<Button type='primary'>
								Start
								<DownOutlined />
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
						<div className='divider' />
						<Button onClick={props.showPlayerView}>Player View</Button>
						<Popover
							trigger='click'
							content={<OptionsPanel mode='session' options={props.options} heroes={props.heroes} setOptions={props.setOptions} />}
						>
							<Button icon={<SettingOutlined />}>
								Options
								<DownOutlined />
							</Button>
						</Popover>
					</AppHeader>
					<div className='session-page-content'>
						{getSelector()}
						{getSelectedContent()}
					</div>
					<AppFooter page='session' showAbout={props.showAbout} showRoll={props.showRoll} showReference={props.showReference} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
