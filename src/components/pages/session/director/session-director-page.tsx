import { Alert, Button, Input, Popover, Segmented, Space } from 'antd';
import { DownOutlined, ReadOutlined } from '@ant-design/icons';
import { AppFooter } from '@/components/panels/app-footer/app-footer';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { Collections } from '@/utils/collections';
import { Counter } from '@/models/counter';
import { CounterRunPanel } from '@/components/panels/run/counter-run/counter-run-panel';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { Encounter } from '@/models/encounter';
import { EncounterData } from '@/data/encounter-data';
import { EncounterRunPanel } from '@/components/panels/run/encounter-run/encounter-run-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Format } from '@/utils/format';
import { Hero } from '@/models/hero';
import { Montage } from '@/models/montage';
import { MontageData } from '@/data/montage-data';
import { MontageRunPanel } from '@/components/panels/run/montage-run/montage-run-panel';
import { Negotiation } from '@/models/negotiation';
import { NegotiationData } from '@/data/negotiation-data';
import { NegotiationRunPanel } from '@/components/panels/run/negotiation-run/negotiation-run-panel';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Playbook } from '@/models/playbook';
import { PlaybookLogic } from '@/logic/playbook-logic';
import { Sourcebook } from '@/models/sourcebook';
import { TacticalMap } from '@/models/tactical-map';
import { TacticalMapDisplayType } from '@/enums/tactical-map-display-type';
import { TacticalMapPanel } from '@/components/panels/elements/tactical-map-panel/tactical-map-panel';
import { Utils } from '@/utils/utils';
import { useNavigation } from '@/hooks/use-navigation';
import { useState } from 'react';
import { useTitle } from '@/hooks/use-title';

import './session-director-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	playbook: Playbook;
	session: Playbook;
	options: Options;
	highlightAbout: boolean;
	showReference: () => void;
	showRoll: () => void;
	showAbout: () => void;
	showSettings: () => void;
	showPlayerView: () => void;
	startEncounter: (encounter: Encounter) => Promise<string>;
	startMontage: (montage: Montage) => Promise<string>;
	startNegotiation: (negotiation: Negotiation) => Promise<string>;
	startMap: (map: TacticalMap) => Promise<string>;
	startCounter: (counter: Counter) => Promise<string>;
	updateHero: (hero: Hero) => void;
	updateEncounter: (encounter: Encounter) => void;
	updateMontage: (montage: Montage) => void;
	updateNegotiation: (negotiation: Negotiation) => void;
	updateMap: (map: TacticalMap) => void;
	updateCounter: (counter: Counter) => void;
	finishSessionElement: (id: string) => string | null;
}

export const SessionDirectorPage = (props: Props) => {
	const navigation = useNavigation();
	const [ selectedElementID, setSelectedElementID ] = useState<string | null>(() => {
		const options = PlaybookLogic.getContentOptions(props.session);
		return options.length > 0 ? options[0].id : null;
	});
	const [ startElement, setStartElement ] = useState<string>('encounter');
	const [ newCounterName, setNewCounterName ] = useState<string>('');
	const [ newCounterValue, setNewCounterValue ] = useState<number>(0);
	useTitle('Session');

	const getSelector = () => {
		const options = PlaybookLogic.getContentOptions(props.session).map(o => {
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
			const encounter = props.session.encounters.find(e => e.id === selectedElementID);
			if (encounter) {
				return (
					<div className='session-page-content-container'>
						<EncounterRunPanel
							key={encounter.id}
							encounter={encounter}
							sourcebooks={props.sourcebooks}
							heroes={props.heroes}
							options={props.options}
							onChange={props.updateEncounter}
						/>
					</div>
				);
			}

			const montage = props.session.montages.find(m => m.id === selectedElementID);
			if (montage) {
				return (
					<div className='session-page-content-container'>
						<MontageRunPanel
							key={montage.id}
							montage={montage}
							heroes={props.heroes}
							options={props.options}
							onChange={props.updateMontage}
						/>
					</div>
				);
			}

			const negotiation = props.session.negotiations.find(n => n.id === selectedElementID);
			if (negotiation) {
				return (
					<div className='session-page-content-container'>
						<NegotiationRunPanel
							key={negotiation.id}
							negotiation={negotiation}
							onChange={props.updateNegotiation}
						/>
					</div>
				);
			}

			const map = props.session.tacticalMaps.find(tm => tm.id === selectedElementID);
			if (map) {
				return (
					<div className='session-page-content-container'>
						<TacticalMapPanel
							key={map.id}
							map={map}
							display={TacticalMapDisplayType.DirectorEdit}
							options={props.options}
							heroes={props.heroes}
							encounters={props.session.encounters}
							sourcebooks={props.sourcebooks}
							mode={PanelMode.Full}
							updateMap={props.updateMap}
							updateHero={props.updateHero}
							updateEncounter={props.updateEncounter}
						/>
					</div>
				);
			}

			const counter = props.session.counters.find(c => c.id === selectedElementID);
			if (counter) {
				return (
					<div className='session-page-content-container'>
						<CounterRunPanel
							key={counter.id}
							counter={counter}
							onChange={props.updateCounter}
						/>
					</div>
				);
			}
		}

		const options = PlaybookLogic.getContentOptions(props.session);
		if (options.length === 0) {
			return (
				<Empty text='Nothing is currently in progress.' />
			);
		}

		return null;
	};

	const getStartContent = () => {
		const startEncounter = (encounter: Encounter) => {
			props.startEncounter(encounter).then(setSelectedElementID);
		};

		const startMontage = (montage: Montage) => {
			props.startMontage(montage).then(setSelectedElementID);
		};

		const startNegotiation = (negotiation: Negotiation) => {
			props.startNegotiation(negotiation).then(setSelectedElementID);
		};

		const startMap = (map: TacticalMap) => {
			props.startMap(map).then(setSelectedElementID);
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

			props.startCounter(counter).then(setSelectedElementID);
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
							Collections.sort(props.playbook.encounters, e => e.name).map(e => (
								<Button key={e.id} block={true} onClick={() => startEncounter(e)}>{e.name || 'Unnamed Encounter'}</Button>
							))
						}
						{
							props.playbook.encounters.length === 0 ?
								<Alert
									type='warning'
									showIcon={true}
									message='You have not created any encounters.'
									action={<Button type='text' title='Encounters' icon={<ReadOutlined />} onClick={() => navigation.goToPlaybook('encounter')} />}
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
							Collections.sort(props.playbook.montages, m => m.name).map(m => (
								<Button key={m.id} block={true} onClick={() => startMontage(m)}>{m.name || 'Unnamed Montage'}</Button>
							))
						}
						{
							props.playbook.montages.length === 0 ?
								<Alert
									type='warning'
									showIcon={true}
									message='You have not created any montages.'
									action={<Button type='text' title='Montages' icon={<ReadOutlined />} onClick={() => navigation.goToPlaybook('montage')} />}
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
							Collections.sort(props.playbook.negotiations, n => n.name).map(n => (
								<Button key={n.id} block={true} onClick={() => startNegotiation(n)}>{n.name || 'Unnamed Negotiation'}</Button>
							))
						}
						{
							props.playbook.negotiations.length === 0 ?
								<Alert
									type='warning'
									showIcon={true}
									message='You have not created any negotiations.'
									action={<Button type='text' title='Negotiations' icon={<ReadOutlined />} onClick={() => navigation.goToPlaybook('negotiation')} />}
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
							Collections.sort(props.playbook.tacticalMaps, m => m.name).map(tm => (
								<Button key={tm.id} block={true} onClick={() => startMap(tm)}>{tm.name || 'Unnamed Map'}</Button>
							))
						}
						{
							props.playbook.tacticalMaps.length === 0 ?
								<Alert
									type='warning'
									showIcon={true}
									message='You have not created any maps.'
									action={<Button type='text' title='Maps' icon={<ReadOutlined />} onClick={() => navigation.goToPlaybook('tactical-map')} />}
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
		if (selectedElementID) {
			const id = props.finishSessionElement(selectedElementID);
			setSelectedElementID(id);
		}
	};

	return (
		<ErrorBoundary>
			<div className='session-director-page'>
				<AppHeader subheader='Session'>
					<Popover
						trigger='click'
						content={(
							<div style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '500px', overflowY: 'auto' }}>
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
				</AppHeader>
				<ErrorBoundary>
					<div className='session-director-page-content'>
						{getSelector()}
						{getSelectedContent()}
					</div>
				</ErrorBoundary>
				<AppFooter
					page='session'
					highlightAbout={props.highlightAbout}
					showReference={props.showReference}
					showRoll={props.showRoll}
					showAbout={props.showAbout}
					showSettings={props.showSettings}
				/>
			</div>
		</ErrorBoundary>
	);
};
