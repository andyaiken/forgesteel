import { Alert, Slider } from 'antd';
import { ReactNode, useState } from 'react';
import { Encounter } from '../../../models/encounter';
import { EncounterLogic } from '../../../logic/encounter-logic';
import { Expander } from '../../controls/expander/expander';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookLogic } from '../../../logic/sourcebook-logic';

import './encounter-difficulty-panel.scss';

interface Props {
	encounter: Encounter;
	sourcebooks: Sourcebook[]
}

export const EncounterDifficultyPanel = (props: Props) => {
	const [ heroCount, setHeroCount ] = useState<number>(4);
	const [ heroLevel, setHeroLevel ] = useState<number>(1);
	const [ heroVictories, setHeroVictories ] = useState<number>(0);

	try {
		const getPartyDescription = () => {
			if (heroVictories > 0) {
				return `${heroCount} heroes at level ${heroLevel} with ${heroVictories} victories`;
			}

			return `${heroCount} heroes at level ${heroLevel}`;
		};

		const count = EncounterLogic.getMonsterCount(props.encounter, props.sourcebooks);
		const budgets = EncounterLogic.getBudgets(heroCount, heroLevel, heroVictories);
		const strength = EncounterLogic.getStrength(props.encounter, props.sourcebooks);
		const difficulty = EncounterLogic.getDifficulty(strength, heroCount, heroLevel, heroVictories);
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
		if (Math.max(...levels) > heroLevel + 2) {
			warnings.push(
				<Alert
					key='too-high-level'
					type='warning'
					showIcon={true}
					message={`This encounter contains a monster of level ${Math.max(...levels)}; for this party, anything above level ${heroLevel + 2} may cause problems.`}
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
				<Expander title={getPartyDescription()}>
					<HeaderText>Heroes</HeaderText>
					<NumberSpin label='Heroes' min={1} value={heroCount} onChange={setHeroCount} />
					<NumberSpin label='Level' min={1} max={10} value={heroLevel} onChange={setHeroLevel} />
					<NumberSpin label='Victories' min={0} value={heroVictories} onChange={setHeroVictories} />
				</Expander>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
