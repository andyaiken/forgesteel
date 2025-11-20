import { Alert, Flex, Result } from 'antd';
import { useEffect, useState } from 'react';
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
import { PlaybookUpdateLogic } from '@/logic/update/playbook-update-logic';
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
	playbook: Playbook;
	session: Playbook;
	options: Options;
};

export const DataLoader = (props: Props) => {
	const [ connectionSettingsState, setConnectionSettingsState ] = useState<'loading' | 'success' | 'error' | null>(null);
	const [ getHeroesState, setGetHeroesState ] = useState<'loading' | 'success' | 'error' | null>(null);
	const [ getHomebrewState, setGetHomebrewState ] = useState<'loading' | 'success' | 'error' | null>(null);
	const [ getOptionsState, setGetOptionsState ] = useState<'loading' | 'success' | 'error' | null>(null);
	const [ getPlaybookState, setGetPlaybookState ] = useState<'loading' | 'success' | 'error' | null>(null);
	const [ getSessionState, setGetSessionState ] = useState<'loading' | 'success' | 'error' | null>(null);
	const [ getHiddenSettingsState, setGetHiddenSettingsState ] = useState<'loading' | 'success' | 'error' | null>(null);

	const [ errors, setErrors ] = useState<string[]>([]);

	// Load connection settings and create DataService
	async function getDataService() {
		await new Promise(res => setTimeout(res, 2000));

		let settings = await localforage.getItem<ConnectionSettings>('forgesteel-connection-settings');

		if (!settings) {
			settings = FactoryLogic.createConnectionSettings();
		}
		ConnectionSettingsUpdateLogic.updateSettings(settings);

		return new DataService(settings);
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

			const promises = [
				dataService.getHomebrew()
					.then(result => {
						setGetHomebrewState('success');
						return result;
					})
					.catch(reason => {
						setGetHomebrewState('error');
						throw reason;
					}),
				dataService.getHeroes()
					.then(result => {
						setGetHeroesState('success');
						return result;
					})
					.catch(reason => {
						setGetHeroesState('error');
						throw reason;
					}),
				dataService.getHiddenSettingIds()
					.then(result => {
						setGetHiddenSettingsState('success');
						return result;
					})
					.catch(reason => {
						setGetHiddenSettingsState('error');
						throw reason;
					}),
				dataService.getPlaybook()
					.then(result => {
						setGetPlaybookState('success');
						return result;
					})
					.catch(reason => {
						setGetPlaybookState('error');
						throw reason;
					}),
				dataService.getSession()
					.then(result => {
						setGetSessionState('success');
						return result;
					})
					.catch(reason => {
						setGetSessionState('error');
						throw reason;
					}),
				dataService.getOptions()
					.then(result => {
						setGetOptionsState('success');
						return result;
					})
					.catch(reason => {
						setGetOptionsState('error');
						throw reason;
					})
			];

			setGetHomebrewState('loading');
			setGetHeroesState('loading');
			setGetPlaybookState('loading');
			setGetSessionState('loading');
			setGetOptionsState('loading');
			setGetHiddenSettingsState('loading');
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

				let playbook = results[3] as Playbook | null;
				if (!playbook) {
					playbook = FactoryLogic.createPlaybook();
				}

				PlaybookUpdateLogic.updatePlaybook(playbook);

				// #endregion

				// #region Session

				let session = results[4] as Playbook | null;
				if (!session) {
					session = FactoryLogic.createPlaybook();
				}

				PlaybookUpdateLogic.updatePlaybook(session);

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
					playbook: playbook,
					session: session,
					options: options
				};

				setTimeout(() => {
					props.onComplete(loadedData);
				}, 150);// veeeery small timeout so user gets at least a _chance_ to see everything loaded
			}).catch(reason => {
				const newErr = [ ...errors ];
				newErr.push(reason);
				setErrors(newErr);
			});
		});
	};

	useEffect(() => {
		loadData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Result
			icon={<LoadingOutlined />}
			title='Loading data...'
		>
			<Flex gap='middle' align='center' justify='center' vertical>
				<Flex gap='small' justify='space-between' vertical>
					<Flex gap='small' justify='flex-start'>
						<LoadingSuccessError state={connectionSettingsState} />
						Connection Settings
					</Flex>
					<Flex gap='small' justify='flex-start'>
						<LoadingSuccessError state={getHeroesState} />
						Heroes
					</Flex>
					<Flex gap='small' justify='flex-start'>
						<LoadingSuccessError state={getHomebrewState} />
						Homebrew Content
					</Flex>
					<Flex gap='small' justify='flex-start'>
						<LoadingSuccessError state={getPlaybookState} />
						Playbook
					</Flex>
					<Flex gap='small' justify='flex-start'>
						<LoadingSuccessError state={getSessionState} />
						Session
					</Flex>
					<Flex gap='small' justify='flex-start'>
						<LoadingSuccessError state={getOptionsState} />
						Options
					</Flex>
					<Flex gap='small' justify='flex-start'>
						<LoadingSuccessError state={getHiddenSettingsState} />
						Identifying Manifold
					</Flex>
				</Flex>
				{
					errors.map((reason, i) => {
						return (
							<Alert type='error' message={reason} key={`data-load-alert-${i}`} />
						);
					})
				}
			</Flex>
		</Result>
	);
};
