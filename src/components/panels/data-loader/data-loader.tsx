import { Alert, Flex } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';
import { CheckIcon } from '@/components/controls/check-icon/check-icon';
import { CheckLabel } from '@/components/controls/check-label/check-label';
import { ConnectionSettings } from '@/models/connection-settings';
import { ConnectionSettingsPanel } from '@/components/panels/connection-settings/connection-settings-panel';
import { ConnectionSettingsUpdateLogic } from '@/logic/update/connection-settings-update-logic';
import { DataService } from '@/utils/data-service';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureFlags } from '@/utils/feature-flags';
import { Format } from '@/utils/format';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroUpdateLogic } from '@/logic/update/hero-update-logic';
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

import './data-loader.scss';

export interface LoadedData {
	connectionSettings: ConnectionSettings;
	service: DataService;
	heroes: Hero[];
	homebrew: Sourcebook[];
	hiddenSourcebookIDs: string[];
	session: Session;
	options: Options;
};

interface Props {
	onComplete: (data: LoadedData) => void;
}

type LoadingStatus = 'pending' | 'success' | 'failure' | undefined;

export const DataLoader = (props: Props) => {
	const [ connectionSettingsState, setConnectionSettingsState ] = useState<LoadingStatus>(undefined);
	const [ heroesState, setHeroesState ] = useState<LoadingStatus>(undefined);
	const [ homebrewState, setHomebrewState ] = useState<LoadingStatus>(undefined);
	const [ optionsState, setOptionsState ] = useState<LoadingStatus>(undefined);
	const [ playbookState, setPlaybookState ] = useState<LoadingStatus>(undefined);
	const [ sessionState, setSessionState ] = useState<LoadingStatus>(undefined);
	const [ hiddenSettingsState, setHiddenSettingsState ] = useState<LoadingStatus>(undefined);
	const [ overallLoadState, setOverallLoadState ] = useState<LoadingStatus>('pending');
	const [ connectionSettings, setConnectionSettings ] = useState<ConnectionSettings | null>(null);
	const [ error, setError ] = useState<string | null>(null);

	// Load connection settings and create DataService
	async function getDataService() {
		let settings = await localforage.getItem<ConnectionSettings>('forgesteel-connection-settings');
		if (!settings) {
			settings = FactoryLogic.createConnectionSettings();
		}
		ConnectionSettingsUpdateLogic.updateSettings(settings);

		setConnectionSettings(settings);
		return new DataService(settings);
	};

	const persistConnectionSettings = (connectionSettings: ConnectionSettings) => {
		return localforage
			.setItem<ConnectionSettings>('forgesteel-connection-settings', connectionSettings)
			.then(
				setConnectionSettings,
				err => {
					console.error(err);
				}
			).then(loadData);// reload data
	};

	async function updateLoadingStatus<T>(getterPromise: Promise<T>, setStateFunc: (value: SetStateAction<LoadingStatus>) => void): Promise<T> {
		return getterPromise
			.then(result => {
				setStateFunc('success');
				return result;
			})
			.catch(reason => {
				setStateFunc('failure');
				throw reason;
			});
	};

	const loadData = () => {
		setError(null);
		setOverallLoadState('pending');
		setConnectionSettingsState('pending');

		setHomebrewState(undefined);
		setHeroesState(undefined);
		setPlaybookState(undefined);
		setSessionState(undefined);
		setOptionsState(undefined);
		setHiddenSettingsState(undefined);

		getDataService().then(dataService => {
			setConnectionSettingsState('success');

			setHomebrewState('pending');
			setHeroesState('pending');
			setPlaybookState('pending');
			setSessionState('pending');
			setOptionsState('pending');
			setHiddenSettingsState('pending');

			const promises = [
				updateLoadingStatus(dataService.getHomebrew(), setHomebrewState),
				updateLoadingStatus(dataService.getHeroes(), setHeroesState),
				updateLoadingStatus(dataService.getHiddenSettingIds(), setHiddenSettingsState),
				updateLoadingStatus(dataService.getPlaybook(), setPlaybookState),
				updateLoadingStatus(dataService.getSession(), setSessionState),
				updateLoadingStatus(dataService.getOptions(), setOptionsState)
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
					if (!playbook.adventures) {
						playbook.adventures = [];
					}
					if (!playbook.encounters) {
						playbook.encounters = [];
					}
					if (!playbook.montages) {
						playbook.montages = [];
					}
					if (!playbook.negotiations) {
						playbook.negotiations = [];
					}
					if (!playbook.tacticalMaps) {
						playbook.tacticalMaps = [];
					}

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

				setOverallLoadState('success');
				setTimeout(
					() => props.onComplete({
						connectionSettings: dataService.settings,
						service: dataService,
						heroes: heroes,
						homebrew: sourcebooks,
						hiddenSourcebookIDs: hiddenSourcebookIDs,
						session: session,
						options: options
					}),
					1000
				);
			}).catch(reason => {
				console.error(reason);
				setError(reason.message);
				setOverallLoadState('failure');
			});
		});
	};

	useEffect(
		loadData,
		// dependencies here needs to be an empty array so that it only runs once
		// otherwise, it runs several times as things change
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return (
		<div className='data-loader'>
			<div className='data-loader-container'>
				<div className='overall-state'>
					<CheckIcon state={overallLoadState} />
				</div>
				<HeaderText level={1}>Loading Data</HeaderText>
				<Flex vertical={true}>
					<Flex vertical={true}>
						<CheckLabel state={connectionSettingsState}>Connection Settings</CheckLabel>
						<CheckLabel state={heroesState}>Heroes</CheckLabel>
						<CheckLabel state={homebrewState}>Homebrew Content</CheckLabel>
						<CheckLabel state={playbookState}>Playbook</CheckLabel>
						<CheckLabel state={sessionState}>Session</CheckLabel>
						<CheckLabel state={optionsState}>Options</CheckLabel>
						<CheckLabel state={hiddenSettingsState}>Identifying Manifold</CheckLabel>
					</Flex>
					{
						error ?
							<Alert
								type='error'
								showIcon={true}
								title='Data load error'
								description={error}
							/>
							: null
					}
					{
						error && connectionSettings?.useWarehouse && FeatureFlags.hasFlag(FeatureFlags.warehouse.code) ?
							<Flex gap='small' justify='space-between' vertical={true}>
								<Alert
									type='info'
									showIcon={true}
									title='Update Warehouse settings below, if necessary.'
								/>
								<Expander title='Forge Steel Warehouse Settings'>
									<ConnectionSettingsPanel
										connectionSettings={connectionSettings}
										setConnectionSettings={persistConnectionSettings}
									/>
								</Expander>
							</Flex>
							: null
					}
				</Flex>
			</div>
		</div>
	);
};
