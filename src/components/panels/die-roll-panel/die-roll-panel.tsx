import { Alert, Button } from 'antd';
import { Characteristic } from '../../../enums/characteristic';
import { Collections } from '../../../utils/collections';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { Random } from '../../../utils/random';
import { useState } from 'react';

import './die-roll-panel.scss';

interface Props {
	hero: Hero;
	characteristics: Characteristic[];
}

export const DieRollPanel = (props: Props) => {
	const [ results, setResults ] = useState<number[]>([]);

	const roll = () => {
		setResults([ Random.die(10), Random.die(10) ]);
	};

	try {
		const values = props.characteristics.map(ch => HeroLogic.getCharacteristic(props.hero as Hero, ch));
		const characteristic = Collections.max(values, v => v) ?? 0;

		return (
			<div className='die-roll-panel'>
				<Button type='primary' block={true} onClick={roll}>Roll</Button>
				{
					results.length > 0 ?
						<div className='result-row'>
							{
								results.map((r, n) => <div key={n} className='roll'>{r}</div>)
							}
							<div className='bonus'>{characteristic >= 0 ? '+' : ''}{characteristic}</div>
							<div className='result'>{Collections.sum([ ...results, characteristic ], r => r)}</div>
						</div>
						: null
				}
				{
					Collections.sum(results, r => r) >= 19 ?
						<Alert message='Critical hit!' type='success' showIcon={true} />
						: null
				}
			</div>
		);
	} catch {
		return null;
	}
};
