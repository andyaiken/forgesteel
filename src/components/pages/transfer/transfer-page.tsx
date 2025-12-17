import { Alert, Button, Empty, Flex, Popconfirm, Segmented, Space, Spin, Tabs } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Collections } from '@/utils/collections';
import { ConnectionSettings } from '@/models/connection-settings';
import { DataService } from '@/utils/data-service';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureFlags } from '@/utils/feature-flags';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroMergeLogic } from '@/logic/merge/hero-merge-logic';
import { HeroPanel } from '@/components/panels/hero/hero-panel';
import { LabelControl } from '@/components/controls/label-control/label-control';
import { MergeDuplicateBehavior } from '@/enums/merge-duplicate-behavior';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookMergeLogic } from '@/logic/merge/sourcebook-merge-logic';
import { SourcebookPanel } from '@/components/panels/elements/sourcebook-panel/sourcebook-panel';
import { Utils } from '@/utils/utils';
import { useNavigation } from '@/hooks/use-navigation';
import { RemoteGoogleDriveDataService } from '@/utils/remote-google-drive-data-service';

import './transfer-page.scss';

interface Props {
	connectionSettings: ConnectionSettings;
	heroes: Hero[];
	homebrewSourcebooks: Sourcebook[];
	options: Options;
};

export const TransferPage = (props: Props) => {
	const settings = props.connectionSettings;
	const [ mergeBehavior, setMergeBehavior ] = useState<MergeDuplicateBehavior>(MergeDuplicateBehavior.Skip);
	const [ copyLocalOpen, setCopyLocalOpen ] = useState<boolean>(false);
	const [ mergeStatusMessage, setMergeStatusMessage ] = useState<string | null>(null);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const [ remoteModifiedTime, setRemoteModifiedTime ] = useState<Date | null>(null);

	const [ localHeroes, setLocalHeroes ] = useState<Hero[]>([]);
	const [ localHomebrewSourcebooks, setLocalHomebrewSourcebooks ] = useState<Sourcebook[]>([]);

	const [ remoteHeroes, setRemoteHeroes ] = useState<Hero[]>([]);
	const [ remoteHomebrewSourcebooks, setRemoteHomebrewSourcebooks ] = useState<Sourcebook[]>([]);

	const localDs = useMemo(() => new DataService({ ...settings, useWarehouse: false }), [ settings ]);
	const warehouseDs = useMemo(() => {
		if (settings.useGoogleDrive && FeatureFlags.hasFlag(FeatureFlags.remoteGoogleDrive.code)) {
			return new RemoteGoogleDriveDataService(settings);
		}
		return new DataService(settings);
	}, [ settings ]);

	const hasRemoteStorage = useMemo(() => {
		const gdrive = settings.useGoogleDrive && FeatureFlags.hasFlag(FeatureFlags.remoteGoogleDrive.code);
		return settings.useWarehouse || gdrive;
	}, [ settings ]);

	let remoteStorageReady = useMemo(() => {
		if (settings.useGoogleDrive && FeatureFlags.hasFlag(FeatureFlags.remoteGoogleDrive.code)) {
			const googleDriveService = warehouseDs as RemoteGoogleDriveDataService;
			if (!googleDriveService.isAuthorized()) {
				console.warn('Google Drive not authorized');
				return false;	// not authorized yet
			}
		}
		return true;	// asssume the remote storage is working and ready if it's the warehouse
	}, [ settings ]);

	const mergeToWarehouse = async () => {
		if (!warehouseDs) {
			console.error('No warehouse data service available');
			return;
		}

		try {
			setIsLoading(true);
			const mergedHeroes = HeroMergeLogic.merge(localHeroes, remoteHeroes, mergeBehavior);
			console.log('Merged heroes:', mergedHeroes);
			await warehouseDs.saveHeroes(mergedHeroes);
			setRemoteHeroes(mergedHeroes);

			const mergedSourcebooks = SourcebookMergeLogic.merge(localHomebrewSourcebooks, remoteHomebrewSourcebooks, mergeBehavior);
			await warehouseDs.saveHomebrew(mergedSourcebooks);
			setRemoteHomebrewSourcebooks(mergedSourcebooks);

			setMergeStatusMessage('Data merged successfully!');
			setTimeout(() => setMergeStatusMessage(null), 5000);
		} catch (err) {
			console.error('Error during merge:', err);
			setMergeStatusMessage(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
		} finally {
			setIsLoading(false);
		}
	};

	const copyToLocal = () => {
		const heroesCopy = Utils.copy(remoteHeroes);
		localDs.saveHeroes(heroesCopy).then(setLocalHeroes);

		const homebrewCopy = Utils.copy(remoteHomebrewSourcebooks);
		localDs.saveHomebrew(homebrewCopy).then(setLocalHomebrewSourcebooks);
	};

	const initializeData = () => {
		if (!warehouseDs || !hasRemoteStorage || !remoteStorageReady) {
			return;
		}

		// Load remote data
		setIsLoading(true);

		Promise.all([
			warehouseDs.getHeroes()
				.then(heroes => {
					if (heroes !== null) {
						setRemoteHeroes(heroes);
					}
				}),
			warehouseDs.getHomebrew()
				.then(sourcebooks => {
					if (sourcebooks !== null) {
						setRemoteHomebrewSourcebooks(sourcebooks);
					}
				}),
			localDs.getHeroes()
				.then(heroes => {
					if (heroes !== null) {
						setLocalHeroes(heroes);
					}
				}),
			localDs.getHomebrew()
				.then(sourcebooks => {
					if (sourcebooks !== null) {
						setLocalHomebrewSourcebooks(sourcebooks);
					}
				}),
			warehouseDs instanceof RemoteGoogleDriveDataService ?
				(warehouseDs as RemoteGoogleDriveDataService).getRemoteFileModifiedTime()
					.then(time => setRemoteModifiedTime(time))
				: Promise.resolve()
		]).finally(() => setIsLoading(false));
	};

	useEffect(
		initializeData,
		[
			localDs,
			warehouseDs,
			hasRemoteStorage
		]
	);

	const getHeroSection = (heroes: Hero[], sourcebooks: Sourcebook[]) => {
		const folders = Collections.distinct(heroes.map(h => h.folder).sort(), f => f);
		if (folders.length === 0) {
			folders.push('');
		}

		const getHeroes = (folder: string) => {
			return heroes
				.filter(h => h.folder === folder);
		};

		const getHeroesSection = (list: Hero[]) => {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			return (
				<div className='hero-section'>
					{
						list.map(hero => (
							<HeroPanel key={`local-hero-${hero.id}`} hero={hero} sourcebooks={SourcebookLogic.getSourcebooks(sourcebooks)} options={props.options} />
						))
					}
				</div>
			);
		};

		return (
			<div className='hero-list-page-content'>
				<Tabs
					items={folders.map(f => ({
						key: f,
						label: (
							<div className='section-header'>
								<div className='section-title'>{f || 'Heroes'}</div>
								<div className='section-count'>{getHeroes(f).length}</div>
							</div>
						),
						children: getHeroesSection(getHeroes(f))
					}))}
				/>
			</div>
		);
	};

	const getCopyLocalButton = () => {
		const localDataMissingInWarehouse = HeroMergeLogic.missingData(localHeroes, remoteHeroes)
			|| SourcebookMergeLogic.missingData(localHomebrewSourcebooks, remoteHomebrewSourcebooks);

		const confirm = () => {
			setCopyLocalOpen(false);
			copyToLocal();
		};

		const cancel = () => {
			setCopyLocalOpen(false);
		};

		const handleOpenChange = (newOpen: boolean) => {
			if (!newOpen) {
				setCopyLocalOpen(newOpen);
				return;
			}

			if (localDataMissingInWarehouse) {
				setCopyLocalOpen(newOpen);
			} else {
				confirm();
			}
		};

		return (
			<Popconfirm
				title='Copy warehouse data to local'
				description='It looks like there might be local data that is not present in the warehouse. If so, this action will DELETE that data. Are you sure you want to proceed?'
				open={copyLocalOpen}
				onOpenChange={handleOpenChange}
				onConfirm={confirm}
				onCancel={cancel}
				okText='Yes'
				cancelText='No'
			>
				<Button type='primary'>
					Copy Warehouse data to Local
				</Button>
			</Popconfirm>
		);
	};

	const getTransferContent = () => {
		if (!hasRemoteStorage || !remoteStorageReady) {
			return (
				<Alert
					title='Not connected to warehouse'
					type='info'
					description='You are not currently setup to use the Warehouse - nothing to do!'
					showIcon={true}
				/>
			);
		} else {
			return (
				<Space orientation='vertical' style={{ width: '100%' }}>
					<HeaderText level={4}>Upload Local data into the Warehouse 💻 ➜ ☁️ </HeaderText>
					<LabelControl
						label='What to do when there is a duplicate item (by id) in the warehouse?'
						control={
							<Segmented<MergeDuplicateBehavior>
								value={mergeBehavior}
								onChange={setMergeBehavior}
								options={[ MergeDuplicateBehavior.Replace, MergeDuplicateBehavior.Skip ]}
							/>
						}
					/>
					<Button
						type='primary'
						onClick={() => mergeToWarehouse()}
					>
						Merge Local data into Warehouse
					</Button>

					<p></p>
					<HeaderText level={4}>Download Warehouse data to Local storage ☁️ ➜ 💻 </HeaderText>
					<Alert
						type='warning'
						title='This replaces the local content completely!'
					/>
					{getCopyLocalButton()}

					<HeaderText level={2}>Content Overview</HeaderText>

					<HeaderText level={3}>Local Storage</HeaderText>

					<Expander title={`Heroes (${localHeroes.length})`}>
						{getHeroSection(localHeroes, localHomebrewSourcebooks)}
					</Expander>

					<Expander title={`Sourcebooks (${localHomebrewSourcebooks.length})`}>
						<div className='sourcebook-section'>
							{
								localHomebrewSourcebooks.map(sb => (
									<SourcebookPanel key={`local-sb-${sb.id}`} sourcebook={sb} />
								))
							}
						</div>
					</Expander>

					<HeaderText level={3}>Warehouse Storage</HeaderText>

					{remoteModifiedTime && (
						<p style={{ fontSize: '12px', color: '#999', margin: '4px' }}>
							Last synced: {remoteModifiedTime.toLocaleString()}
						</p>
					)}

					<Expander title={`Heroes (${remoteHeroes.length})`}>
						{getHeroSection(remoteHeroes, remoteHomebrewSourcebooks)}
					</Expander>

					<Expander title={`Sourcebooks (${remoteHomebrewSourcebooks.length})`}>
						<Flex wrap={true} gap='20px'>
							{
								remoteHomebrewSourcebooks.map(sb => (
									<SourcebookPanel key={`remote-sb-${sb.id}`} sourcebook={sb} />
								))
							}
						</Flex>
					</Expander>
				</Space>
			);
		}
	};

	const nav = useNavigation();
	const navHome = () => {
		// set the url directly so the app reloads
		const url = window.location.toString();
		const match = url.match(/^([^#]+)(#.*)/);
		if (match) {
			const base = match[1];
			window.location.href = base;
		} else {
			nav.goToWelcome();
		}
	};

	return (
		<ErrorBoundary>
			<div className='transfer-page'>
				<div className='transfer-page-content'>
					<Spin spinning={isLoading}>
						<HeaderText level={1}>Data Transfer</HeaderText>
						<p>
							By default, Forge Steel uses your local browser storage to store your data.
							This means that you didn't have to register or sign up anywhere, and all of your data stays local to you.
							But it also means that you can't access your data across browsers, and a browser reset could wipe all your data.
						</p>
						<p>
							However, once you have connected with the Warehouse, you have access to persistent, remote storage
							that you can use to keep data and access it across devices, and which won't get wiped if your browser cache clears.
						</p>
						<p>
							Use this page to transfer data between the browser storage (Local), and the Warehouse.
						</p>
						<h4>Some important notes:</h4>
						<p>
							This tool does <strong>NOT</strong> compare the contents of <em>ANY</em> piece of data.
							It only checks the internal ID for determining if a chunk of data is 'the same'.
							This means that copying or merging data could result in some data loss. Use at your own risk!
						</p>
						{
							hasRemoteStorage ?
								<>
									<p>
										Once you are done, you will need to reload the app to see the updated data.
									</p>
									<Button type='primary' onClick={navHome}>Return To App Home Page</Button>
								</>
								: null
						}
						{getTransferContent()}
					</Spin>
				</div>
			</div>
		</ErrorBoundary>
	);
};
