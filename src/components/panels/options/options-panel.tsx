import { Alert, Divider, Segmented, Select } from 'antd';
import { Collections } from '../../../utils/collections';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { Hero } from '../../../models/hero';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { Options } from '../../../models/options';
import { OptionsLogic } from '../../../logic/options-logic';
import { PanelWidth } from '../../../enums/panel-width';
import { Toggle } from '../../controls/toggle/toggle';
import { Utils } from '../../../utils/utils';

import './options-panel.scss';

interface Props {
	mode: 'hero' | 'library' | 'monster' | 'encounter' | 'tactical-map' | 'session' | 'player';
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

	const setAbilityWidth = (value: PanelWidth) => {
		const copy = Utils.copy(props.options);
		copy.abilityWidth = value;
		props.setOptions(copy);
	};

	const setShowMonstersInGroups = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.showMonstersInGroups = value;
		props.setOptions(copy);
	};

	const setShowSimilarMonsters = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.showSimilarMonsters = value;
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
					<div>Start encounters with these heroes:</div>
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
			case 'hero':
				return (
					<>
						<Toggle label='Single page' value={props.options.singlePage} onChange={setSinglePage} />
						<Toggle label='Separate inventory features' value={props.options.separateInventoryFeatures} onChange={setSeparateInventoryFeatures} />
						<Toggle label='Show skills in groups' value={props.options.showSkillsInGroups} onChange={setShowSkillsInGroups} />
						<Toggle label='Include standard abilities' value={props.options.showStandardAbilities} onChange={setShowStandardAbilities} />
						<Toggle label='Dim unavailable abilities' value={props.options.dimUnavailableAbilities} onChange={setDimUnavailableAbilities} />
						<Toggle label='Show feature / ability sources' value={props.options.showSources} onChange={setShowSources} />
						<div className='option-heading'>Abilities</div>
						<Segmented
							name='abilitywidth'
							options={[ PanelWidth.Narrow, PanelWidth.Medium, PanelWidth.Wide, PanelWidth.ExtraWide ]}
							value={props.options.abilityWidth}
							onChange={setAbilityWidth}
						/>
					</>
				);
			case 'library':
				return (
					<>
						<Toggle label='Show monsters in groups' value={props.options.showMonstersInGroups} onChange={setShowMonstersInGroups} />
					</>
				);
			case 'monster':
				return (
					<>
						<Toggle label='Show data from similar monsters in the monster builder' value={props.options.showSimilarMonsters} onChange={setShowSimilarMonsters} />
						{
							props.options.showSimilarMonsters ?
								<div>
									<div className='ds-text centered-text'>Determine similarity using:</div>
									<Toggle label='Monster level' value={props.options.similarLevel} onChange={setSimilarLevel} />
									<Toggle label='Monster role' value={props.options.similarRole} onChange={setSimilarRole} />
									<Toggle label='Monster organization' value={props.options.similarOrganization} onChange={setSimilarOrganization} />
									<Toggle label='Monster size' value={props.options.similarSize} onChange={setSimilarSize} />
								</div>
								: null
						}
					</>
				);
			case 'encounter':
				return (
					<>
						<NumberSpin label='Minions per group' min={1} value={props.options.minionCount} onChange={setMinionCount} />
						{getPartySection(true)}
						<Divider />
						<Alert type='info' showIcon={true} message={`Calculate encounter difficulty based on ${OptionsLogic.getPartyDescription(props.options)}.`} />
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

	try {
		return (
			<ErrorBoundary>
				<div className='options-panel'>
					{getContent()}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
