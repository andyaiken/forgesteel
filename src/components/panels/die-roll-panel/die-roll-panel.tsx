import { Alert, Button, Statistic } from 'antd';
import { Characteristic } from '../../../enums/characteristic';
import { Collections } from '../../../utils/collections';
import { Expander } from '../../controls/expander/expander';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { Random } from '../../../utils/random';
import { useState } from 'react';

import './die-roll-panel.scss';

interface Props {
	hero: Hero;
	characteristics: Characteristic[];
}

export const DieRollPanel = (props: Props) => {
	const [ edges, setEdges ] = useState<number>(0);
	const [ banes, setBanes ] = useState<number>(0);
	const [ results, setResults ] = useState<number[]>([]);

	const roll = () => {
		setResults([ Random.die(10), Random.die(10) ]);
	};

	try {
		const values = props.characteristics.map(ch => HeroLogic.getCharacteristic(props.hero as Hero, ch));
		const modifier = Collections.max(values, v => v) ?? 0;

		let bonus = 0;
		let tierMessage = null;

		switch (edges) {
			case 0:
				switch (banes) {
					case 1:
						bonus = -2;
						break;
					case 2:
						tierMessage = 'Move the result down one tier.';
						break;
				}
				break;
			case 1:
				switch (banes) {
					case 0:
						bonus = 2;
						break;
					case 2:
						bonus = -2;
						break;
				}
				break;
			case 2:
				switch (banes) {
					case 0:
						tierMessage = 'Move the result up one tier.';
						break;
					case 1:
						bonus = 2;
						break;
				}
				break;
		}

		return (
			<div className='die-roll-panel'>
				<Expander title='Edges and Banes'>
					<NumberSpin
						label='Edges'
						value={edges}
						min={0}
						max={2}
						onChange={setEdges}
					/>
					<NumberSpin
						label='Banes'
						value={banes}
						min={0}
						max={2}
						onChange={setBanes}
					/>
				</Expander>
				<Button type='primary' block={true} onClick={roll}>Roll</Button>
				{
					results.length > 0 ?
						<div className='result-row'>
							{
								results.map((r, n) => <Statistic key={n} title='d10' value={r} />)
							}
							<Statistic title='Modifier' value={`${modifier >= 0 ? '+' : ''}${modifier}`} />
							{bonus ? <Statistic title={bonus > 0 ? 'Edge' : 'Bane'} value={`${bonus >= 0 ? '+' : ''}${bonus}`} /> : null}
							<Statistic className='result' title='Result' value={Collections.sum([ ...results, modifier, bonus ], r => r)} />
						</div>
						: null
				}
				{tierMessage ? <Alert type='warning' showIcon={true} message={tierMessage} /> : null}
				{
					Collections.sum(results, r => r) >= 19 ?
						<Alert type='success' showIcon={true} message='Critical hit!' />
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
