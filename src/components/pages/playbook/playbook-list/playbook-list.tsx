import { Alert, Button, Divider, Input, Popover, Select, Space, Tabs, Upload } from 'antd';
import { DownOutlined, DownloadOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Playbook, PlaybookElementKind } from '../../../../models/playbook';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Element } from '../../../../models/element';
import { Encounter } from '../../../../models/encounter';
import { EncounterPanel } from '../../../panels/elements/encounter-panel/encounter-panel';
import { Format } from '../../../../utils/format';
import { Montage } from '../../../../models/montage';
import { MontageData } from '../../../../data/montage-data';
import { MontagePanel } from '../../../panels/elements/montage-panel/montage-panel';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationData } from '../../../../data/negotiation-data';
import { NegotiationPanel } from '../../../panels/elements/negotiation-panel/negotiation-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
import { usePlaybookTabKey } from '../../../../hooks/use-playbook-tab-key';
import { useState } from 'react';

import './playbook-list.scss';

interface Props {
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	createElement: (kind: PlaybookElementKind, original: Element | null) => void;
	importElement: (kind: PlaybookElementKind, element: Element) => void;
}

export const PlaybookListPage = (props: Props) => {
	const navigation = useNavigation();
	const [ tabKey, setTabKey ] = usePlaybookTabKey();
	const [ previousTab, setPreviousTab ] = useState(tabKey);
	const [ element, setElement ] = useState<PlaybookElementKind>(tabKey);
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	if (tabKey !== previousTab) {
		setElement(tabKey);
		setPreviousTab(tabKey);
	}

	const createElement = (original: Element | null) => {
		props.createElement(element, original);
	};

	const getEncounters = () => {
		return props.playbook.encounters
			.filter(item => Utils.textMatches([
				item.name,
				item.description
			], searchTerm));
	};

	const getNegotiations = () => {
		return props.playbook.negotiations
			.filter(item => Utils.textMatches([
				item.name,
				item.description
			], searchTerm));
	};

	const getMontages = () => {
		return props.playbook.montages
			.filter(item => Utils.textMatches([
				item.name,
				item.description
			], searchTerm));
	};

	const getEncountersSection = (list: Encounter[]) => {
		if (list.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='No encounters'
				/>
			);
		}

		return (
			<div className='playbook-section-row'>
				{
					list.map(e => (
						<SelectablePanel key={e.id} onSelect={() => navigation.goToPlaybookView('encounter', e.id)}>
							<EncounterPanel encounter={e} playbook={props.playbook} sourcebooks={props.sourcebooks} />
						</SelectablePanel>
					))
				}
			</div>
		);
	};

	const getNegotiationsSection = (list: Negotiation[]) => {
		if (list.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='No negotiations'
				/>
			);
		}

		return (
			<div className='playbook-section-row'>
				{
					list.map(n => (
						<SelectablePanel key={n.id} onSelect={() => navigation.goToPlaybookView('negotiation', n.id)}>
							<NegotiationPanel negotiation={n} />
						</SelectablePanel>
					))
				}
			</div>
		);
	};

	const getMontagesSection = (list: Montage[]) => {
		if (list.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='No montages'
				/>
			);
		}

		return (
			<div className='playbook-section-row'>
				{
					list.map(m => (
						<SelectablePanel key={m.id} onSelect={() => navigation.goToPlaybookView('montage', m.id)}>
							<MontagePanel montage={m} />
						</SelectablePanel>
					))
				}
			</div>
		);
	};

	try {
		const elementOptions = [ 'encounter', 'negotiation', 'montage' ]
			.map(e => ({
				value: e,
				label: Format.capitalize(e, '-')
			}));

		const encounters = getEncounters();
		const negotiations = getNegotiations();
		const montages = getMontages();

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

		const exampleMontages = [
			MontageData.fightFire,
			MontageData.infiltrateThePalace,
			MontageData.prepareForBattle,
			MontageData.trackTheFugitive,
			MontageData.wildernessRace
		];

		return (
			<div className='playbook-list-page'>
				<AppHeader breadcrumbs={[ { label: 'Playbook' } ]} showDirectory={props.showDirectory} showAbout={props.showAbout} showRoll={props.showRoll}>
					<Input
						placeholder='Search'
						allowClear={true}
						value={searchTerm}
						suffix={<SearchOutlined />}
						onChange={e => setSearchTerm(e.target.value)}
					/>
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<div>
									<div className='ds-text'>What do you want to add?</div>
									<Select
										style={{ width: '100%' }}
										placeholder='Select'
										options={elementOptions}
										optionRender={option => <div className='ds-text'>{option.data.label}</div>}
										value={element}
										onChange={setElement}
									/>
								</div>
								<Divider />
								<Space>
									<Button block={true} icon={<PlusCircleOutlined />} onClick={() => createElement(null)}>Create</Button>
									<div className='ds-text'>or</div>
									<Upload
										style={{ width: '100%' }}
										accept={`.drawsteel-${element.toLowerCase()}`}
										showUploadList={false}
										beforeUpload={file => {
											file
												.text()
												.then(json => {
													const e = (JSON.parse(json) as Element);
													props.importElement(element, e);
												});
											return false;
										}}
									>
										<Button block={true} icon={<DownloadOutlined />}>Import</Button>
									</Upload>
								</Space>
								{
									element === 'negotiation' ?
										<div>
											<div className='ds-text centered-text'>or start with an example:</div>
											<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
												{
													exampleNegotiations.map(n => (
														<Button key={n.id} block={true} onClick={() => createElement(n)}>{n.name}</Button>
													))
												}
											</div>
										</div>
										: null
								}
								{
									element === 'montage' ?
										<div>
											<div className='ds-text centered-text'>or start with an example:</div>
											<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
												{
													exampleMontages.map(m => (
														<Button key={m.id} block={true} onClick={() => createElement(m)}>{m.name}</Button>
													))
												}
											</div>
										</div>
										: null
								}
							</div>
						)}
					>
						<Button>
							Create
							<DownOutlined />
						</Button>
					</Popover>
				</AppHeader>
				<div className='playbook-list-page-content'>
					<Tabs
						activeKey={tabKey}
						items={[
							{
								key: 'encounter',
								label: (
									<div className='section-header'>
										<div className='section-title'>Encounters</div>
										<div className='section-count'>{encounters.length}</div>
									</div>
								),
								children: getEncountersSection(encounters)
							},
							{
								key: 'negotiation',
								label: (
									<div className='section-header'>
										<div className='section-title'>Negotiations</div>
										<div className='section-count'>{negotiations.length}</div>
									</div>
								),
								children: getNegotiationsSection(negotiations)
							},
							{
								key: 'montage',
								label: (
									<div className='section-header'>
										<div className='section-title'>Montages</div>
										<div className='section-count'>{montages.length}</div>
									</div>
								),
								children: getMontagesSection(montages)
							}
						]}
						onChange={tabKey => setTabKey(tabKey as PlaybookElementKind)}
					/>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
