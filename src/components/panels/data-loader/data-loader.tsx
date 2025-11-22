import { Alert, Flex, Result } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';
import { ConnectionSettings } from '@/models/connection-settings';
import { ConnectionSettingsUpdateLogic } from '@/logic/update/connection-settings-update-logic';
import { DataService } from '@/utils/data-service';
import { FactoryLogic } from '@/logic/factory-logic';
import { Format } from '@/utils/format';
import { Hero } from '@/models/hero';
import { HeroUpdateLogic } from '@/logic/update/hero-update-logic';
import { LoadingOutlined } from '@ant-design/icons';
import { LoadingSuccessError } from '@/components/controls/loading-success-error/loading-success-error';
import { Options } from '@/models/options';
import { OptionsUpdateLogic } from '@/logic/update/options-update-logic';
import { Playbook } from '@/models/playbook';
import { Session } from '@/models/session';
import { SessionUpdateLogic } from '@/logic/update/session-update-logic';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { SourcebookUpdateLogic } from '@/logic/update/sourcebook-update-logic';
import localforage from 'localforage';

interface Props {
	onComplete: (data: LoadedData) => void;
}

export interface LoadedData {
	connectionSettings: ConnectionSettings;
	service: DataService;
	heroes: Hero[];
	homebrew: Sourcebook[];
	hiddenSourcebookIDs: string[];
	session: Session;
	options: Options;
};

export const DataLoader = (props: Props) => {
	type LoadingStatus = 'loading' | 'success' | 'error' | null;
	const [ connectionSettingsState, setConnectionSettingsState ] = useState<LoadingStatus>(null);
	const [ getHeroesState, setGetHeroesState ] = useState<LoadingStatus>(null);
	const [ getHomebrewState, setGetHomebrewState ] = useState<LoadingStatus>(null);
	const [ getOptionsState, setGetOptionsState ] = useState<LoadingStatus>(null);
	const [ getPlaybookState, setGetPlaybookState ] = useState<LoadingStatus>(null);
	const [ getSessionState, setGetSessionState ] = useState<LoadingStatus>(null);
	const [ getHiddenSettingsState, setGetHiddenSettingsState ] = useState<LoadingStatus>(null);

	const [ errors, setErrors ] = useState<string[]>([]);

	// Load connection settings and create DataService
	async function getDataService() {
		let settings = await localforage.getItem<ConnectionSettings>('forgesteel-connection-settings');
		if (!settings) {
			settings = FactoryLogic.createConnectionSettings();
		}
		ConnectionSettingsUpdateLogic.updateSettings(settings);

		return new DataService(settings);
	};

	async function updateLoadingStatus<T>(getFunc: () => Promise<T>, setStateFunc: (value: SetStateAction<LoadingStatus>) => void): Promise<T> {
		return getFunc()
			.then(result => {
				setStateFunc('success');
				return result;
			})
			.catch(reason => {
				setStateFunc('error');
				throw reason;
			});
	};

	const loadData = () => {
		setErrors([]);
		setConnectionSettingsState('loading');

		setGetHomebrewState(null);
		setGetHeroesState(null);
		setGetPlaybookState(null);
		setGetSessionState(null);
		setGetOptionsState(null);
		setGetHiddenSettingsState(null);

		getDataService().then(dataService => {
			setConnectionSettingsState('success');

			setGetHomebrewState('loading');
			setGetHeroesState('loading');
			setGetPlaybookState('loading');
			setGetSessionState('loading');
			setGetOptionsState('loading');
			setGetHiddenSettingsState('loading');

			const promises = [
				updateLoadingStatus(dataService.getHomebrew, setGetHomebrewState),
				updateLoadingStatus(dataService.getHeroes, setGetHeroesState),
				updateLoadingStatus(dataService.getHiddenSettingIds, setGetHiddenSettingsState),
				updateLoadingStatus(dataService.getPlaybook, setGetPlaybookState),
				updateLoadingStatus(dataService.getSession, setGetSessionState),
				updateLoadingStatus(dataService.getOptions, setGetOptionsState)
			];

			Promise.all(promises).then(results => {
				// #region Homebrew sourcebooks
				let sourcebooks = results[0] as Sourcebook[] | null;

				if (!sourcebooks) {
					sourcebooks = [];
				}

				sourcebooks.forEach(sourcebook => {
					sourcebook.type = SourcebookType.Homebrew;
					SourcebookUpdateLogic.updateSourcebook(sourcebook);
				});

				SourcebookLogic.getSourcebooks(sourcebooks).forEach(sourcebook => {
					sourcebook.items.forEach(item => {
						if (item.crafting) {
							item.crafting.id = `${item.id}-crafting`;
							item.crafting.name = `Craft ${item.name}`;
							item.crafting.description = `Craft ${Format.startsWithVowel(item.name) ? 'an' : 'a'} ${item.name}.`;
						}
					});
					sourcebook.imbuements.forEach(imbuement => {
						if (imbuement.crafting) {
							imbuement.crafting.id = `${imbuement.id}-crafting`;
							imbuement.crafting.name = `Imbue ${imbuement.name}`;
							imbuement.crafting.description = `Imbue an item with ${imbuement.name}.`;
						}
					});
				});

				// #endregion

				// #region Heroes

				let heroes = results[1] as Hero[] | null;

				if (!heroes) {
					heroes = [];
				}

				heroes.forEach(hero => {
					HeroUpdateLogic.updateHero(hero, SourcebookLogic.getSourcebooks(sourcebooks));
				});

				// #endregion

				// #region Hidden sourcebook IDs

				let hiddenSourcebookIDs = results[2] as string[] | null;
				if (!hiddenSourcebookIDs) {
					hiddenSourcebookIDs = [];
				}

				// #endregion

				// #region Playbook

				const playbook = results[3] as Playbook | null;
				if (playbook) {
					if ((playbook.adventures.length > 0) || (playbook.encounters.length > 0) || (playbook.montages.length > 0) || (playbook.negotiations.length > 0) || (playbook.tacticalMaps.length > 0)) {
						// Copy everything from the playbook into a homebrew sourcebook
						if (sourcebooks.length === 0) {
							const sb = FactoryLogic.createSourcebook();
							sb.name = 'Playbook';
							sourcebooks.push(sb);
						}

						const sb = sourcebooks[0];

						sb.adventures.push(...playbook.adventures.filter(adventure => !sb.adventures.some(a => a.id === adventure.id)));
						sb.encounters.push(...playbook.encounters.filter(encounter => !sb.encounters.some(e => e.id === encounter.id)));
						sb.montages.push(...playbook.montages.filter(montage => !sb.montages.some(m => m.id === montage.id)));
						sb.negotiations.push(...playbook.negotiations.filter(negotiation => !sb.negotiations.some(n => n.id === negotiation.id)));
						sb.tacticalMaps.push(...playbook.tacticalMaps.filter(map => !sb.tacticalMaps.some(tm => tm.id === map.id)));

						SourcebookUpdateLogic.updateSourcebook(sb);
					};
				}

				// #endregion

				// #region Session

				let session = results[4] as Session | null;
				if (!session) {
					session = FactoryLogic.createSession();
				}

				SessionUpdateLogic.updateSession(session);

				// #endregion

				// #region Options

				let options = results[5] as Options | null;
				if (!options) {
					options = FactoryLogic.createOptions();
				}

				OptionsUpdateLogic.updateOptions(options);

				// #endregion

				const loadedData: LoadedData = {
					connectionSettings: dataService.settings,
					service: dataService,
					heroes: heroes,
					homebrew: sourcebooks,
					hiddenSourcebookIDs: hiddenSourcebookIDs,
					session: session,
					options: options
				};

				setTimeout(() => props.onComplete(loadedData), 1000);
			}).catch(reason => {
				const newErr = [ ...errors ];
				newErr.push(reason);
				setErrors(newErr);
			});
		});
	};

	useEffect(() => {
		loadData();
	// dependencies here needs to be an empty array so that it only runs once
	// otherwise, it runs several times as things change
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Flex align='center' justify='center' style={{ width: '100%', height: '100%' }}>
			<Result
				style={{ width: '250px', padding: '0' }}
				icon={<LoadingOutlined />}
				title='Loading data...'
			>
				<Flex gap='middle' align='center' justify='center' vertical={true}>
					<Flex gap='small' justify='space-between' vertical={true}>
						<Flex justify='flex-start' gap={10}>
							<LoadingSuccessError state={connectionSettingsState} />
							Connection Settings
						</Flex>
						<Flex gap={10}>
							<LoadingSuccessError state={getHeroesState} />
							Heroes
						</Flex>
						<Flex gap={10}>
							<LoadingSuccessError state={getHomebrewState} />
							Homebrew Content
						</Flex>
						<Flex gap={10}>
							<LoadingSuccessError state={getPlaybookState} />
							Playbook
						</Flex>
						<Flex gap={10}>
							<LoadingSuccessError state={getSessionState} />
							Session
						</Flex>
						<Flex gap={10}>
							<LoadingSuccessError state={getOptionsState} />
							Options
						</Flex>
						<Flex gap={10}>
							<LoadingSuccessError state={getHiddenSettingsState} />
							Identifying Manifold
						</Flex>
					</Flex>
					{
						errors.map((reason, n) => {
							return (
								<Alert
									key={`data-load-alert-${n}`}
									type='error'
									showIcon={true}
									message={reason}
								/>
							);
						})
					}
				</Flex>
			</Result>
		</Flex>
	);
};
