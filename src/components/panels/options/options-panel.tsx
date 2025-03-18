import { Divider, Segmented } from 'antd';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { Options } from '../../../models/options';
import { PanelWidth } from '../../../enums/panel-width';
import { Toggle } from '../../controls/toggle/toggle';
import { Utils } from '../../../utils/utils';

import './options-panel.scss';

interface Props {
	mode: 'hero' | 'library' | 'monster' | 'encounter';
	options: Options;
	setOptions: (options: Options) => void;
}

export const OptionsPanel = (props: Props) => {
	const setShowSkillsInGroups = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.showSkillsInGroups = value;
		props.setOptions(copy);
	};

	const setShowFreeStrikes = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.showFreeStrikes = value;
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

	const setFeatureWidth = (value: PanelWidth) => {
		const copy = Utils.copy(props.options);
		copy.featureWidth = value;
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

	const getPartyDescription = () => {
		const heroes = `${props.options.heroCount === 1 ? 'hero' : 'heroes'}`;
		const victories = `${props.options.heroVictories === 1 ? 'victory' : 'victories'}`;

		if (props.options.heroVictories > 0) {
			return `${props.options.heroCount} ${heroes} at level ${props.options.heroLevel} with ${props.options.heroVictories} ${victories}`;
		}

		return `${props.options.heroCount} ${heroes} at level ${props.options.heroLevel}`;
	};

	const getContent = () => {
		switch (props.mode) {
			case 'hero':
				return (
					<>
						<Toggle label='Show skills in groups' value={props.options.showSkillsInGroups} onChange={setShowSkillsInGroups} />
						<Toggle label='Show free strikes' value={props.options.showFreeStrikes} onChange={setShowFreeStrikes} />
						<Toggle label='Show standard abilities' value={props.options.showStandardAbilities} onChange={setShowStandardAbilities} />
						<Toggle label='Dim unavailable abilities' value={props.options.dimUnavailableAbilities} onChange={setDimUnavailableAbilities} />
						<Divider />
						<div className='ds-text bold-text'>Features</div>
						<Segmented
							name='featurewidth'
							options={[ PanelWidth.Narrow, PanelWidth.Medium, PanelWidth.Wide, PanelWidth.ExtraWide ]}
							value={props.options.featureWidth}
							onChange={setFeatureWidth}
						/>
						<div className='ds-text bold-text'>Abilities</div>
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
						<div className='ds-text'>Calculate encounter difficulty for {getPartyDescription()}.</div>
						<NumberSpin label='Number of heroes' min={1} value={props.options.heroCount} onChange={setHeroCount} />
						<NumberSpin label='Hero level' min={1} max={10} value={props.options.heroLevel} onChange={setHeroLevel} />
						<NumberSpin label='Number of victories' min={0} value={props.options.heroVictories} onChange={setHeroVictories} />
					</>
				);
		}
	};

	try {
		return (
			<div className='options-panel'>
				{getContent()}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
