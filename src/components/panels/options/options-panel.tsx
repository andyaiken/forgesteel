import { Divider, Segmented, Select, SelectProps, Space, Tooltip } from 'antd';
import { ClassicSheetBuilder } from '@/logic/classic-sheet/classic-sheet-builder';
import { Collections } from '@/utils/collections';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FactoryLogic } from '@/logic/factory-logic';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelWidth } from '@/enums/panel-width';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { SheetPageSize } from '@/enums/sheet-page-size';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';

import './options-panel.scss';
interface Props {
	mode: 'hero-modern' | 'hero-classic' | 'library' | 'monster' | 'encounter-modern' | 'encounter-classic' | 'tactical-map' | 'session' | 'player';
	options: Options;
	heroes: Hero[];
	setOptions: (options: Options) => void;
}

export const OptionsPanel = (props: Props) => {
	const setSinglePage = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.singlePage = value;
		props.setOptions(copy);
	};

	const setSeparateInventoryFeatures = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.separateInventoryFeatures = value;
		props.setOptions(copy);
	};

	const setShowSkillsInGroups = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.showSkillsInGroups = value;
		props.setOptions(copy);
	};

	const setShowStandardAbilities = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.showStandardAbilities = value;
		props.setOptions(copy);
	};

	const setDimUnavailableAbilities = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.dimUnavailableAbilities = value;
		props.setOptions(copy);
	};

	const setShowSources = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.showSources = value;
		props.setOptions(copy);
	};

	const setIncludePlayState = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.includePlayState = value;
		props.setOptions(copy);
	};

	const setColorSheet = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.colorSheet = value;
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
	setDrawColor(props.options.sheetTextColor);

	const setSheetTextColor = (value: 'light' | 'default' | 'dark') => {
		const copy = Utils.copy(props.options);
		copy.sheetTextColor = value;
		props.setOptions(copy);
	};

	const setFeaturesInclude = (value: 'minimal' | 'no-basic' | 'all') => {
		const copy = Utils.copy(props.options);
		copy.featuresInclude = value;
		props.setOptions(copy);
	};

	const setAbilitySort = (value: 'size' | 'type') => {
		const copy = Utils.copy(props.options);
		copy.abilitySort = value;
		props.setOptions(copy);
	};

	const setClassicSheetPageSize = (value: SheetPageSize) => {
		const copy = Utils.copy(props.options);
		copy.classicSheetPageSize = value;
		props.setOptions(copy);
	};

	const setPageOrientation = (value: 'portrait' | 'landscape') => {
		const copy = Utils.copy(props.options);
		copy.pageOrientation = value;
		props.setOptions(copy);
	};

	const setAbilityWidth = (value: PanelWidth) => {
		const copy = Utils.copy(props.options);
		copy.abilityWidth = value;
		props.setOptions(copy);
	};

	const setCompactView = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.compactView = value;
		props.setOptions(copy);
	};

	const setSimilarLevel = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.similarLevel = value;
		props.setOptions(copy);
	};

	const setSimilarRole = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.similarRole = value;
		props.setOptions(copy);
	};

	const setSimilarOrganization = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.similarOrganization = value;
		props.setOptions(copy);
	};

	const setSimilarSize = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.similarSize = value;
		props.setOptions(copy);
	};

	const setShowMonsterGroups = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.showMonsterGroups = value;
		props.setOptions(copy);
	};

	const setMinionCount = (value: number) => {
		const copy = Utils.copy(props.options);
		copy.minionCount = value;
		props.setOptions(copy);
	};

	const setParty = (value: string) => {
		const copy = Utils.copy(props.options);
		copy.party = value;
		props.setOptions(copy);
	};

	const setHeroParty = (value: string) => {
		const copy = Utils.copy(props.options);
		copy.heroParty = value;
		props.setOptions(copy);
	};

	const setHeroCount = (value: number) => {
		const copy = Utils.copy(props.options);
		copy.heroCount = value;
		props.setOptions(copy);
	};

	const setHeroLevel = (value: number) => {
		const copy = Utils.copy(props.options);
		copy.heroLevel = value;
		props.setOptions(copy);
	};

	const setHeroVictories = (value: number) => {
		const copy = Utils.copy(props.options);
		copy.heroVictories = value;
		props.setOptions(copy);
	};

	const setShowDefeatedCombatants = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.showDefeatedCombatants = value;
		props.setOptions(copy);
	};

	const setGridSize = (value: number) => {
		const copy = Utils.copy(props.options);
		copy.gridSize = value;
		props.setOptions(copy);
	};

	const setPlayerGridSize = (value: number) => {
		const copy = Utils.copy(props.options);
		copy.playerGridSize = value;
		props.setOptions(copy);
	};

	const includedStandardAbilitiesChanged = (value: string | string[]) => {
		const copy = Utils.copy(props.options);
		copy.shownStandardAbilities = [ value ].flat(1);
		props.setOptions(copy);
	};

	const standardAbilityOptions: SelectProps['options'] = [];
	const standardAbilities = HeroLogic.getAbilities(FactoryLogic.createHero([]), [], true)
		.map(a => ClassicSheetBuilder.buildAbilitySheet(a.ability, undefined));
	standardAbilities.sort(SheetFormatter.sortAbilitiesByType);
	standardAbilities.forEach(a => {
		standardAbilityOptions.push({
			value: a.id,
			label: `[${a.actionType}] ${a.name}`
		});
	});

	const getContent = () => {
		const getParties = () => {
			return Collections
				.distinct(props.heroes.map(h => h.folder), f => f)
				.sort()
				.filter(f => !!f);
		};

		const getPartySection = (initialDivider: boolean) => {
			const parties = getParties();
			if (parties.length === 0) {
				return null;
			}

			return (
				<>
					{initialDivider ? <Divider /> : null}
					<div className='ds-text'>
						Start encounters with these heroes:
					</div>
					<Select
						style={{ width: '100%' }}
						placeholder='Select a party'
						options={[ '', ...parties ].map(p => ({ value: p, label: p || 'No heroes' }))}
						optionRender={option => <div className='ds-text'>{option.data.label}</div>}
						showSearch={true}
						filterOption={(input, option) => {
							const strings = option ?
								[
									option.label
								]
								: [];
							return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
						}}
						value={props.options.party}
						onChange={p => setParty(p || '')}
					/>
				</>
			);
		};

		switch (props.mode) {
			case 'hero-modern':
				return (
					<>
						<Toggle label='Separate inventory features' value={props.options.separateInventoryFeatures} onChange={setSeparateInventoryFeatures} />
						<Toggle label='Show skills in groups' value={props.options.showSkillsInGroups} onChange={setShowSkillsInGroups} />
						<Toggle label='Include standard abilities' value={props.options.showStandardAbilities} onChange={setShowStandardAbilities} />
						<Toggle label='Dim unavailable abilities' value={props.options.dimUnavailableAbilities} onChange={setDimUnavailableAbilities} />
						<Toggle label='Show feature / ability sources' value={props.options.showSources} onChange={setShowSources} />
						<Divider>View</Divider>
						<Toggle label='Single page' value={props.options.singlePage} onChange={setSinglePage} />
						<Toggle label='Compact' value={props.options.compactView} onChange={setCompactView} />
						<Divider>Abilities</Divider>
						<Segmented
							name='abilitywidth'
							block={true}
							disabled={props.options.compactView}
							options={[
								{ value: PanelWidth.Narrow, label: 'S' },
								{ value: PanelWidth.Medium, label: 'M' },
								{ value: PanelWidth.Wide, label: 'L' },
								{ value: PanelWidth.ExtraWide, label: 'XL' }
							]}
							value={props.options.abilityWidth}
							onChange={setAbilityWidth}
						/>
					</>
				);
			case 'hero-classic':
				return (
					<>
						<Toggle label='Show play state' value={props.options.includePlayState} onChange={setIncludePlayState} />
						<Toggle label='Use color' value={props.options.colorSheet} onChange={setColorSheet} />
						<Divider size='small'>Included Standard Abilities</Divider>
						<Select
							mode='tags'
							placeholder='Included Standard Abilities'
							onChange={includedStandardAbilitiesChanged}
							options={standardAbilityOptions}
						/>
						<Divider size='small'>Text Color</Divider>
						<Segmented
							name='textColor'
							block={true}
							options={[
								{ value: 'dark', label: 'Darker' },
								{ value: 'default', label: 'Default' },
								{ value: 'light', label: 'Lighter' }
							]}
							value={props.options.sheetTextColor}
							onChange={changeTextColor}
						/>
						<Divider size='small'>Include Class Features</Divider>
						<Segmented
							name='abilitySort'
							block={true}
							options={[
								{
									value: 'minimal',
									label: (
										<Tooltip title='No Abilities. Only Perks, Text features, and the like.'>
											Minimal
										</Tooltip>
									)
								},
								{
									value: 'no-basic',
									label: (
										<Tooltip title='Does not show things like bonuses, skills, languages, etc. Does still show Abilities.'>
											No Simple
										</Tooltip>
									)
								},
								{
									value: 'all',
									label: (
										<Tooltip title='Show all features. Useful for seeing where all of the numbers come from on the sheet.'>
											All
										</Tooltip>
									)
								}
							]}
							value={props.options.featuresInclude}
							onChange={setFeaturesInclude}
						/>
						<Divider size='small'>Sort Abilities By</Divider>
						<Segmented
							name='abilitySort'
							block={true}
							options={[
								{ value: 'size', label: 'Length' },
								{ value: 'type', label: 'Action Type' }
							]}
							value={props.options.abilitySort}
							onChange={setAbilitySort}
						/>
						<Divider>Layout</Divider>
						<Space direction='vertical' style={{ width: '100%' }}>
							<Segmented
								name='pagesize'
								block={true}
								options={[ SheetPageSize.Letter, SheetPageSize.A4 ]}
								value={props.options.classicSheetPageSize}
								onChange={setClassicSheetPageSize}
							/>
							<Segmented
								name='orientation'
								block={true}
								options={[
									{ value: 'portrait', label: 'Portrait' },
									{ value: 'landscape', label: 'Landscape' }
								]}
								value={props.options.pageOrientation}
								onChange={setPageOrientation}
							/>
						</Space>
					</>
				);
			case 'monster':
				return (
					<>
						<div className='ds-text'>Show data from similar monsters using these fields:</div>
						<Toggle label='Monster level' value={props.options.similarLevel} onChange={setSimilarLevel} />
						<Toggle label='Monster role' value={props.options.similarRole} onChange={setSimilarRole} />
						<Toggle label='Monster organization' value={props.options.similarOrganization} onChange={setSimilarOrganization} />
						<Toggle label='Monster size' value={props.options.similarSize} onChange={setSimilarSize} />
					</>
				);
			case 'library':
				return (
					<>
						<Toggle label='Show monster groups' value={props.options.showMonsterGroups} onChange={setShowMonsterGroups} />
						<NumberSpin label='Minions per group' min={1} value={props.options.minionCount} onChange={setMinionCount} />
					</>
				);
			case 'encounter-modern':
				return (
					<>
						<NumberSpin label='Minions per group' min={1} value={props.options.minionCount} onChange={setMinionCount} />
						{getPartySection(true)}
						<Divider />
						<div className='ds-text'>
							Calculate encounter difficulty based on these heroes:
						</div>
						<Select
							style={{ width: '100%' }}
							placeholder='Select a party'
							options={[ ...getParties(), '' ].map(p => ({ value: p, label: p || 'A custom party' }))}
							optionRender={option => <div className='ds-text'>{option.data.label}</div>}
							showSearch={true}
							filterOption={(input, option) => {
								const strings = option ?
									[
										option.label
									]
									: [];
								return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
							}}
							value={props.options.heroParty}
							onChange={p => setHeroParty(p || '')}
						/>
						{
							props.options.heroParty === '' ?
								<>
									<NumberSpin label='Number of heroes' min={1} value={props.options.heroCount} onChange={setHeroCount} />
									<NumberSpin label='Hero level' min={1} max={10} value={props.options.heroLevel} onChange={setHeroLevel} />
									<NumberSpin label='Number of victories' min={0} value={props.options.heroVictories} onChange={setHeroVictories} />
								</>
								: null
						}
					</>
				);
			case 'encounter-classic':
				return (
					<>
						<Toggle label='Use color' value={props.options.colorSheet} onChange={setColorSheet} />
						<Divider size='small'>Text Color</Divider>
						<Segmented
							name='textColor'
							block={true}
							options={[
								{ value: 'dark', label: 'Darker' },
								{ value: 'default', label: 'Default' },
								{ value: 'light', label: 'Lighter' }
							]}
							value={props.options.sheetTextColor}
							onChange={changeTextColor}
						/>
						<Divider>Layout</Divider>
						<Space direction='vertical' style={{ width: '100%' }}>
							<Segmented
								name='pagesize'
								block={true}
								options={[ SheetPageSize.Letter, SheetPageSize.A4 ]}
								value={props.options.classicSheetPageSize}
								onChange={setClassicSheetPageSize}
							/>
						</Space>
					</>
				);
			case 'tactical-map':
				return (
					<>
						<NumberSpin label='Map Grid Size' min={5} steps={[ 5 ]} value={props.options.gridSize} onChange={setGridSize} />
					</>
				);
			case 'session':
				return (
					<>
						{getPartySection(false)}
						<Divider />
						<Toggle label='Show defeated combatants' value={props.options.showDefeatedCombatants} onChange={setShowDefeatedCombatants} />
						<NumberSpin label='Map Grid Size' min={5} steps={[ 5 ]} value={props.options.gridSize} onChange={setGridSize} />
					</>
				);
			case 'player':
				return (
					<>
						<NumberSpin label='Map Grid Size' min={5} steps={[ 5 ]} value={props.options.playerGridSize} onChange={setPlayerGridSize} />
					</>
				);
		}
	};

	return (
		<ErrorBoundary>
			<div className='options-panel'>
				{getContent()}
			</div>
		</ErrorBoundary>
	);
};
