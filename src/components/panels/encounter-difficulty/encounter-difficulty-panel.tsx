import { Alert, Slider } from 'antd';
import { Encounter } from '../../../models/encounter';
import { EncounterLogic } from '../../../logic/encounter-logic';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Options } from '../../../models/options';
import { ReactNode } from 'react';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookLogic } from '../../../logic/sourcebook-logic';

import './encounter-difficulty-panel.scss';

interface Props {
	encounter: Encounter;
	sourcebooks: Sourcebook[];
	options: Options;
}

export const EncounterDifficultyPanel = (props: Props) => {
	try {
		const count = EncounterLogic.getMonsterCount(props.encounter, props.sourcebooks);
		const budgets = EncounterLogic.getBudgets(props.options);
		const strength = EncounterLogic.getStrength(props.encounter, props.sourcebooks);
		const difficulty = EncounterLogic.getDifficulty(strength, props.options);
		const victories = EncounterLogic.getVictories(difficulty);

		const marks: Record<string | number, ReactNode> = {};
		marks[budgets.maxTrivial] = <div className='ds-text dimmed-text small-text'>Easy</div>;
		marks[budgets.maxEasy] = <div className='ds-text dimmed-text small-text'>Standard</div>;
		marks[budgets.maxStandard] = <div className='ds-text dimmed-text small-text'>Hard</div>;
		marks[budgets.maxHard] = <div className='ds-text dimmed-text small-text'>Extreme</div>;

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
			<div className='encounter-difficulty-panel'>
				<HeaderText>Encounter Difficulty</HeaderText>
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
				<div className='encounter-stats'>
					<Field orientation='vertical' label='Monsters' value={count} />
					<Field orientation='vertical' label='Strength' value={strength} />
					<Field orientation='vertical' label='Difficulty' value={difficulty} />
					<Field orientation='vertical' label='Victories' value={victories} />
				</div>
				{warnings}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
