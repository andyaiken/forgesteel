import { Alert, Slider } from 'antd';
import { Encounter } from '../../../models/encounter';
import { EncounterLogic } from '../../../logic/encounter-logic';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { Options } from '../../../models/options';
import { OptionsLogic } from '../../../logic/options-logic';
import { ReactNode } from 'react';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookLogic } from '../../../logic/sourcebook-logic';

import './encounter-difficulty-panel.scss';

interface Props {
	encounter: Encounter;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
}

export const EncounterDifficultyPanel = (props: Props) => {
	try {
		const count = EncounterLogic.getMonsterCount(props.encounter, props.sourcebooks, props.options);
		const budgets = EncounterLogic.getBudgets(props.options, props.heroes);
		const strength = EncounterLogic.getStrength(props.encounter, props.sourcebooks);
		const difficulty = EncounterLogic.getDifficulty(strength, props.options, props.heroes);
		const victories = EncounterLogic.getVictories(difficulty);

		const marks: Record<string | number, ReactNode> = {};
		marks[0] = <div className='ds-text dimmed-text small-text'>Trivial</div>;
		marks[budgets.maxTrivial + 1] = <div className='ds-text dimmed-text small-text'>Easy</div>;
		marks[budgets.maxEasy + 1] = <div className='ds-text dimmed-text small-text'>Standard</div>;
		marks[budgets.maxStandard + 1] = <div className='ds-text dimmed-text small-text'>Hard</div>;
		marks[budgets.maxHard + 1] = <div className='ds-text dimmed-text small-text'>Extreme</div>;

		const warnings = [];
		const levels = props.encounter.groups
			.flatMap(g => g.slots)
			.map(s => SourcebookLogic.getMonster(props.sourcebooks, s.monsterID))
			.filter(m => !!m)
			.map(m => m.level);
		if (Math.max(...levels) > props.options.heroLevel + 2) {
			warnings.push(
				<Alert
					key='too-high-level'
					type='warning'
					showIcon={true}
					message={`This encounter contains a monster of level ${Math.max(...levels)}; for this party, anything above level ${props.options.heroLevel + 2} may cause problems.`}
				/>
			);
		}

		return (
			<ErrorBoundary>
				<div className='encounter-difficulty-panel'>
					<HeaderText level={1}>Encounter Difficulty</HeaderText>
					<div className='ds-text'>Difficulty for {OptionsLogic.getPartyDescription(props.options)}.</div>
					<div className='encounter-slider'>
						<Slider
							range={true}
							marks={marks}
							min={0}
							max={Math.max(budgets.maxHard * 1.1, strength)}
							value={[ strength ]}
							styles={{
								track: {
									background: 'transparent'
								}
							}}
							tooltip={{ open: false }}
						/>
					</div>
					<div className='stats'>
						<Field orientation='vertical' label='Monsters' value={count} />
						<Field orientation='vertical' label='Strength' value={strength} />
						<Field orientation='vertical' label='Difficulty' value={difficulty} />
						<Field orientation='vertical' label='Victories' value={victories} />
					</div>
					{warnings}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
