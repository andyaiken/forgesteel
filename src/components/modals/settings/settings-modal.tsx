import { Button, Divider, Drawer, Flex, Input, Segmented, Select, Space } from 'antd';
import { CopyOutlined, FlagFilled, FlagOutlined, MoonOutlined, SettingOutlined, SunOutlined } from '@ant-design/icons';
import { AbilityData } from '@/data/ability-data';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureFlags } from '@/utils/feature-flags';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { LabelControl } from '@/components/controls/label-control/label-control';
import { Modal } from '@/components/modals/modal/modal';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelWidth } from '@/enums/panel-width';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SheetPageSize } from '@/enums/sheet-page-size';
import { StandardAbilitySelectModal } from '@/components/modals/select/standard-ability-select/standard-ability-select-modal';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';

import './settings-modal.scss';

interface Props {
	options: Options;
	errors: Event[];
	heroes: Hero[];
	setOptions: (options: Options) => void;
	clearErrors: () => void;
	onClose: () => void;
}

export const SettingsModal = (props: Props) => {
	const { themeMode, setTheme } = useTheme();
	const [ options, setOptions ] = useState<Options>(Utils.copy(props.options));
	const [ page, setPage ] = useState<string>('Settings');
	const [ showAbilitySelector, setShowAbilitySelector ] = useState<boolean>(false);
	const [ flag, setFlag ] = useState<string>('');

	const getAppearance = () => {
		return (
			<Expander title='Appearance'>
				<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
					<Segmented
						block={true}
						value={themeMode}
						onChange={setTheme}
						options={[
							{ label: 'Light Mode', value: 'light', icon: <SunOutlined /> },
							{ label: 'System', value: 'system', icon: <SettingOutlined /> },
							{ label: 'Dark Mode', value: 'dark', icon: <MoonOutlined /> }
						]}
					/>
				</Space>
			</Expander>
		);
	};

	const getHeroesGeneral = () => {
		const setShownStandardAbilities = (value: string | string[]) => {
			const copy = Utils.copy(options);
			copy.shownStandardAbilities = [ value ].flat(1);
			props.setOptions(copy);
		};

		const getShownStandardAbilitiesValue = () => {
			if (options.shownStandardAbilities.length === 0) {
				return 'none';
			}

			if (options.shownStandardAbilities.length === AbilityData.standardAbilities.length) {
				return 'all';
			}

			return 'custom';
		};

		const setShownStandardAbilitiesValue = (value: string) => {
			switch (value) {
				case 'none':
					setShownStandardAbilities([]);
					break;
				case 'custom':
					setShowAbilitySelector(true);
					break;
				case 'all':
					setShownStandardAbilities(AbilityData.standardAbilities.map(a => a.id));
					break;
			}
		};

		return (
			<Expander title='Heroes - General'>
				<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
					<div>
						<LabelControl
							label='Show standard abilities'
							control={
								<Segmented
									block={true}
									options={[
										{ value: 'none', label: 'None' },
										{ value: 'custom', label: 'Custom' },
										{ value: 'all', label: 'All' }
									]}
									value={getShownStandardAbilitiesValue()}
									onChange={setShownStandardAbilitiesValue}
								/>
							}
						/>
						{
							getShownStandardAbilitiesValue() === 'custom' ?
								<Button block={true} onClick={() => setShowAbilitySelector(true)}>Select Abilities</Button>
								: null
						}
					</div>
				</Space>
				<Drawer open={showAbilitySelector} onClose={() => setShowAbilitySelector(false)} closeIcon={null} width='500px'>
					<StandardAbilitySelectModal
						abilityIDs={options.shownStandardAbilities}
						onSelect={setShownStandardAbilities}
						onClose={() => setShowAbilitySelector(false)}
					/>
				</Drawer>
			</Expander>
		);
	};

	const getHeroesModern = () => {
		const setSeparateInventoryFeatures = (value: boolean) => {
			const copy = Utils.copy(options);
			copy.separateInventoryFeatures = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setShowSkillsInGroups = (value: boolean) => {
			const copy = Utils.copy(options);
			copy.showSkillsInGroups = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setDimUnavailableAbilities = (value: boolean) => {
			const copy = Utils.copy(options);
			copy.dimUnavailableAbilities = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setShowSources = (value: boolean) => {
			const copy = Utils.copy(options);
			copy.showSources = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setSinglePage = (value: boolean) => {
			const copy = Utils.copy(options);
			copy.singlePage = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setCompactView = (value: boolean) => {
			const copy = Utils.copy(options);
			copy.compactView = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setAbilityWidth = (value: PanelWidth) => {
			const copy = Utils.copy(options);
			copy.abilityWidth = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		return (
			<Expander title='Heroes - Modern Sheet'>
				<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
					<Toggle label='Separate inventory features' value={options.separateInventoryFeatures} onChange={setSeparateInventoryFeatures} />
					<Toggle label='Show skills in groups' value={options.showSkillsInGroups} onChange={setShowSkillsInGroups} />
					<Toggle label='Dim unavailable abilities' value={options.dimUnavailableAbilities} onChange={setDimUnavailableAbilities} />
					<Toggle label='Show feature / ability sources' value={options.showSources} onChange={setShowSources} />
					<LabelControl
						label='Ability card width'
						control={
							<Segmented
								name='abilitywidth'
								block={true}
								disabled={options.compactView}
								options={[
									{ value: PanelWidth.Narrow, label: 'S' },
									{ value: PanelWidth.Medium, label: 'M' },
									{ value: PanelWidth.Wide, label: 'L' },
									{ value: PanelWidth.ExtraWide, label: 'XL' }
								]}
								value={options.abilityWidth}
								onChange={setAbilityWidth}
							/>
						}
					/>
					<div>
						<Divider>View</Divider>
						<Toggle label='Single page' value={options.singlePage} onChange={setSinglePage} />
						<Toggle label='Compact' value={options.compactView} onChange={setCompactView} />
					</div>
				</Space>
			</Expander>
		);
	};

	const getHeroesClassic = () => {
		const setIncludePlayState = (value: boolean) => {
			const copy = Utils.copy(options);
			copy.includePlayState = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setColorSheet = (value: boolean) => {
			const copy = Utils.copy(options);
			copy.colorSheet = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setFeaturesInclude = (value: 'minimal' | 'no-basic' | 'all') => {
			const copy = Utils.copy(options);
			copy.featuresInclude = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		return (
			<Expander title='Heroes - Classic Sheet'>
				<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
					<Toggle label='Show play state' value={options.includePlayState} onChange={setIncludePlayState} />
					<Toggle label='Use color' value={options.colorSheet} onChange={setColorSheet} />
					<LabelControl
						label='Show class features'
						control={
							<Select
								style={{ width: '100%' }}
								options={[
									{
										value: 'minimal',
										label: 'Minimal',
										desc: 'No abilities; only perks, text features, and the like.'
									},
									{
										value: 'no-basic',
										label: 'No Simple',
										desc: 'Does not show things like bonuses, skills, languages, etc; does still show abilities.'
									},
									{
										value: 'all',
										label: 'All',
										desc: 'Show all features. Useful for seeing where all of the numbers come from on the sheet.'
									}
								]}
								optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
								value={options.featuresInclude}
								onChange={setFeaturesInclude}
							/>
						}
					/>
				</Space>
			</Expander>
		);
	};

	const getClassicSheet = () => {
		const setClassicSheetPageSize = (value: SheetPageSize) => {
			const copy = Utils.copy(options);
			copy.classicSheetPageSize = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setPageOrientation = (value: 'portrait' | 'landscape') => {
			const copy = Utils.copy(options);
			copy.pageOrientation = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const changeTextColor = (newColor: 'light' | 'default' | 'dark') => {
			setDrawColor(newColor);
			setSheetTextColor(newColor);
		};

		const setDrawColor = (newColor: 'light' | 'default' | 'dark') => {
			let value = 34;
			switch (newColor) {
				case 'light':
					value = 68;
					break;
				case 'dark':
					value = 0;
					break;
			}
			const base = `rgb(${value}, ${value}, ${value})`;
			document.documentElement.style.setProperty('--color-text', base);
			const lighter = `rgb(${value + 34}, ${value + 34}, ${value + 34})`;
			document.documentElement.style.setProperty('--color-text-lighter', lighter);
			const lightest = `rgb(${value + 68}, ${value + 68}, ${value + 68})`;
			document.documentElement.style.setProperty('--color-text-lightest', lightest);
		};
		setDrawColor(options.sheetTextColor);

		const setSheetTextColor = (value: 'light' | 'default' | 'dark') => {
			const copy = Utils.copy(options);
			copy.sheetTextColor = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		return (
			<Expander title='Classic Sheet'>
				<Space direction='vertical' style={{ width: '100%' }}>
					<LabelControl
						label='Page size'
						control={
							<Segmented
								name='pagesize'
								block={true}
								options={[ SheetPageSize.Letter, SheetPageSize.A4 ]}
								value={options.classicSheetPageSize}
								onChange={setClassicSheetPageSize}
							/>
						}
					/>
					<LabelControl
						label='Orientation'
						control={
							<Segmented
								name='orientation'
								block={true}
								options={[
									{ value: 'portrait', label: 'Portrait' },
									{ value: 'landscape', label: 'Landscape' }
								]}
								value={options.pageOrientation}
								onChange={setPageOrientation}
							/>
						}
					/>
					<LabelControl
						label='Text color'
						control={
							<Segmented
								name='textColor'
								block={true}
								options={[
									{ value: 'dark', label: 'Darker' },
									{ value: 'default', label: 'Default' },
									{ value: 'light', label: 'Lighter' }
								]}
								value={options.sheetTextColor}
								onChange={changeTextColor}
							/>
						}
					/>
				</Space>
			</Expander>
		);
	};

	const getMonsterBuilder = () => {
		const setSimilarLevel = (value: boolean) => {
			const copy = Utils.copy(options);
			copy.similarLevel = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setSimilarRole = (value: boolean) => {
			const copy = Utils.copy(options);
			copy.similarRole = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setSimilarOrganization = (value: boolean) => {
			const copy = Utils.copy(options);
			copy.similarOrganization = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setSimilarSize = (value: boolean) => {
			const copy = Utils.copy(options);
			copy.similarSize = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		return (
			<Expander title='Monster Builder'>
				<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
					<div className='ds-text'>Show data from similar monsters using these fields:</div>
					<Toggle label='Monster level' value={options.similarLevel} onChange={setSimilarLevel} />
					<Toggle label='Monster role' value={options.similarRole} onChange={setSimilarRole} />
					<Toggle label='Monster organization' value={options.similarOrganization} onChange={setSimilarOrganization} />
					<Toggle label='Monster size' value={options.similarSize} onChange={setSimilarSize} />
				</Space>
			</Expander>
		);
	};

	const getEncounterBuilder = () => {
		const setMinionCount = (value: number) => {
			const copy = Utils.copy(options);
			copy.minionCount = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		return (
			<Expander title='Encounter Builder'>
				<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
					<NumberSpin label='Minions per group' min={1} value={options.minionCount} onChange={setMinionCount} />
				</Space>
			</Expander>
		);
	};

	const getEncounterRunner = () => {
		const setParty = (value: string) => {
			const copy = Utils.copy(options);
			copy.party = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setShowDefeatedCombatants = (value: boolean) => {
			const copy = Utils.copy(options);
			copy.showDefeatedCombatants = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const parties = Collections
			.distinct(props.heroes.map(h => h.folder), f => f)
			.sort()
			.filter(f => !!f);

		return (
			<Expander title='Encounter Runner'>
				<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
					<Toggle label='Show defeated combatants' value={options.showDefeatedCombatants} onChange={setShowDefeatedCombatants} />
					{
						parties.length > 0 ?
							<LabelControl
								label='Start encounters with'
								control={
									<Select
										style={{ width: '100%' }}
										placeholder='Select a party'
										options={[ '', ...parties ].map(p => ({ value: p, label: p || 'No heroes' }))}
										optionRender={option => <div className='ds-text'>{option.data.label}</div>}
										value={options.party}
										onChange={p => setParty(p || '')}
									/>
								}
							/>
							: null
					}
				</Space>
			</Expander>
		);
	};

	const getDifficulty = () => {
		const setHeroParty = (value: string) => {
			const copy = Utils.copy(options);
			copy.heroParty = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setHeroCount = (value: number) => {
			const copy = Utils.copy(options);
			copy.heroCount = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setHeroLevel = (value: number) => {
			const copy = Utils.copy(options);
			copy.heroLevel = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setHeroVictories = (value: number) => {
			const copy = Utils.copy(options);
			copy.heroVictories = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const parties = Collections
			.distinct(props.heroes.map(h => h.folder), f => f)
			.sort()
			.filter(f => !!f);

		return (
			<Expander title='Encounter / Montage Difficulty'>
				<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
					<LabelControl
						label='Calculate difficulty based on these heroes'
						control={
							<Select
								style={{ width: '100%' }}
								placeholder='Select a party'
								options={[ ...parties, '' ].map(p => ({ value: p, label: p || 'A custom party' }))}
								optionRender={option => <div className='ds-text'>{option.data.label}</div>}
								value={options.heroParty}
								onChange={p => setHeroParty(p || '')}
							/>
						}
					/>
					{
						options.heroParty === '' ?
							<>
								<NumberSpin label='Number of heroes' min={1} value={options.heroCount} onChange={setHeroCount} />
								<NumberSpin label='Hero level' min={1} max={10} value={options.heroLevel} onChange={setHeroLevel} />
								<NumberSpin label='Number of victories' min={0} value={options.heroVictories} onChange={setHeroVictories} />
							</>
							: null
					}
				</Space>
			</Expander>
		);
	};

	const getTacticalMaps = () => {
		const setGridSize = (value: number) => {
			const copy = Utils.copy(options);
			copy.gridSize = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		const setPlayerGridSize = (value: number) => {
			const copy = Utils.copy(options);
			copy.playerGridSize = value;
			setOptions(copy);
			props.setOptions(copy);
		};

		return (
			<Expander title='Tactical Maps'>
				<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
					<NumberSpin label='Director Map Grid Size' min={5} steps={[ 5 ]} value={options.gridSize} onChange={setGridSize} />
					<NumberSpin label='Player Map Grid Size' min={5} steps={[ 5 ]} value={options.playerGridSize} onChange={setPlayerGridSize} />
				</Space>
			</Expander>
		);
	};

	const getFeatureFlags = () => {
		return (
			<Expander title='Feature Flags'>
				<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
					<Flex align='center' justify='space-between' gap={10}>
						<Input
							placeholder='Enter a feature flag code'
							allowClear={true}
							value={flag}
							onChange={e => {
								const flag = e.target.value;
								// console.error(`${flag}: ${Utils.hashCode(flag)}`);
								setFlag(flag);
							}}
						/>
						{
							flag && FeatureFlags.flagExists(Utils.hashCode(flag)) && !FeatureFlags.hasFlag(Utils.hashCode(flag)) ?
								<Button
									icon={<FlagOutlined />}
									onClick={() => {
										FeatureFlags.add(Utils.hashCode(flag));
										setFlag('');
									}}
								/>
								: null
						}
					</Flex>
					{
						FeatureFlags.active().map(flag => (
							<div key={flag.code} className='feature-flag'>
								<FlagFilled style={{ color: 'rgb(64, 150, 255)' }} />
								<div className='ds-text' style={{ flex: '1 1 0' }}>{flag.description}</div>
								<DangerButton
									mode='clear'
									message='Removing this flag will reload the app.'
									onConfirm={() => {
										FeatureFlags.remove(flag.code);
										window.location.reload();
									}}
								/>
							</div>
						))
					}
					{
						FeatureFlags.active().length === 0 ?
							<Empty />
							: null
					}
				</Space>
			</Expander>
		);
	};

	const getFeatureFlagControls = () => {
		const flags = [
			FeatureFlags.interactiveContent
		];
		if (!flags.some(f => FeatureFlags.hasFlag(f.code))) {
			return null;
		}

		const setShowInteractivePanels = (value: boolean) => {
			const copy = Utils.copy(options);
			copy.showInteractivePanels = value;
			props.setOptions(copy);
		};

		return (
			<Expander title='Features'>
				<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
					{
						FeatureFlags.hasFlag(FeatureFlags.interactiveContent.code) ?
							<Toggle label='Show content interactively' value={options.showInteractivePanels} onChange={setShowInteractivePanels} />
							: null
					}
				</Space>
			</Expander>
		);
	};

	const getErrors = () => {
		const clearErrors = () => {
			props.clearErrors();
			props.onClose();
		};

		const getError = (event: Event, index: number) => {
			let message = '';
			let output = '';
			const fields: { label: string, value: string }[] = [
				{ label: 'Type', value: `${event.type}` }
			];

			if (event.type === 'error') {
				const error = event as ErrorEvent;

				message = error.message;
				output = `title ${error.message}, file ${error.filename}, line ${error.lineno}, col ${error.colno}, data ${JSON.stringify(error.error)}`;

				fields.push({ label: 'Location', value: `${error.filename}, line ${error.lineno}, column ${error.colno}` });
				fields.push({ label: 'Data', value: JSON.stringify(error.error) });
			}

			if (event.type === 'unhandledrejection') {
				const error = event as PromiseRejectionEvent;

				message = JSON.stringify(error.reason);
				output = `reason ${JSON.stringify(error.reason)}`;
			}

			return (
				<SelectablePanel key={index}>
					<HeaderText
						extra={
							<Button
								type='text'
								icon={<CopyOutlined />}
								onClick={() => navigator.clipboard.writeText(output)}
							/>
						}
					>
						{message}
					</HeaderText>
					{fields.map((field, n) => <Field key={n} label={field.label} value={field.value} />)}
				</SelectablePanel>
			);
		};

		return props.errors.length > 0 ?
			<Expander
				title='Logs'
				extra={[
					<DangerButton key='clear' mode='clear' onConfirm={clearErrors} />
				]}
			>
				<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
					{props.errors.map(getError)}
				</Space>
			</Expander>
			: null;
	};

	const getContent = () => {
		switch (page) {
			case 'Settings':
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						{getAppearance()}
						{getHeroesGeneral()}
						{getHeroesModern()}
						{getHeroesClassic()}
						{getClassicSheet()}
						{getMonsterBuilder()}
						{getEncounterBuilder()}
						{getEncounterRunner()}
						{getDifficulty()}
						{getTacticalMaps()}
					</Space>
				);
			case 'Admin':
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						{getFeatureFlags()}
						{getFeatureFlagControls()}
						{getErrors()}
					</Space>
				);
		}

		return null;
	};

	return (
		<Modal
			toolbar={
				<Flex align='center' justify='center' style={{ width: '100%' }}>
					<Segmented
						name='tabs'
						options={[ 'Settings', 'Admin' ]}
						value={page}
						onChange={setPage}
					/>
				</Flex>
			}
			content={
				<div className='settings-modal'>
					{getContent()}
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
