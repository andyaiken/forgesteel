import { Ability, PowerRoll } from '../../../models/ability';
import { AbilityPanel } from '../../panels/ability-panel/ability-panel';
import { Button } from 'antd';
import { Collections } from '../../../utils/collections';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { PanelMode } from '../../../enums/panel-mode';
import { Random } from '../../../utils/random';
import { useState } from 'react';

import './power-roll.scss';

interface Props {
	hero: Hero;
	ability: Ability;
}

export const PowerRollModal = (props: Props) => {
	const [ results, setResults ] = useState<number[]>([]);

	const roll = () => {
		setResults([ Random.die(10), Random.die(10) ]);
	};

	try {
		const powerRoll = props.ability.powerRoll as PowerRoll;
		const values = powerRoll.characteristic.map(ch => HeroLogic.getCharacteristic(props.hero as Hero, ch));
		const characteristic = Collections.max(values, v => v) || 0;

		return (
			<div className='power-roll-modal'>
				<AbilityPanel ability={props.ability} hero={props.hero} mode={PanelMode.Full} />
				<Button type='primary' block={true} onClick={roll}>Roll</Button>
				{
					results.length > 0 ?
						<div className='result-row'>
							{
								results.map((r, n) => <div key={n} className='roll'>{r}</div>)
							}
							<div className='bonus'>+{characteristic}</div>
							<div className='result'>{Collections.sum(results, r => r)}</div>
						</div>
						: null
				}
			</div>
		);
	} catch {
		return null;
	}
};
