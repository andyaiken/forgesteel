import { Alert, Button, Slider, Space, Statistic } from 'antd';
import { ReactNode, useState } from 'react';
import { Collections } from '../../../utils/collections';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { Expander } from '../../controls/expander/expander';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { Random } from '../../../utils/random';

import './die-roll-panel.scss';

interface Props {
	type: 'Power Roll' | 'Saving Throw';
	modifiers: number[];
}

export const DieRollPanel = (props: Props) => {
	const [ edges, setEdges ] = useState<number>(0);
	const [ banes, setBanes ] = useState<number>(0);
	const [ results, setResults ] = useState<number[]>([]);

	const roll = () => {
		switch (props.type) {
			case 'Power Roll':
				setResults([ Random.die(10), Random.die(10) ]);
				break;
			case 'Saving Throw':
				setResults([ Random.die(10) ]);
				break;
		}
	};

	try {
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

		const total = Collections.sum([ ...results, ...props.modifiers, bonus ], r => r);

		let max: number;
		const marks: Record<string | number, ReactNode> = {};
		switch (props.type) {
			case 'Power Roll':
				max = 20;
				marks[1] = <div className='ds-text dimmed-text small-text'>1</div>;
				marks[11.5] = <div className='ds-text dimmed-text small-text'>-</div>;
				marks[16.5] = <div className='ds-text dimmed-text small-text'>-</div>;
				marks[20] = <div className='ds-text dimmed-text small-text'>20</div>;
				break;
			case 'Saving Throw':
				max = 10;
				marks[1] = <div className='ds-text dimmed-text small-text'>1</div>;
				marks[5.5] = <div className='ds-text dimmed-text small-text'>-</div>;
				marks[10] = <div className='ds-text dimmed-text small-text'>10</div>;
				break;
		}

		return (
			<ErrorBoundary>
				<div className='die-roll-panel'>
					{
						props.type === 'Power Roll' ?
							<Expander title='Edges and Banes'>
								<Space direction='vertical' style={{ paddingTop: '15px', width: '100%' }}>
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
								</Space>
							</Expander>
							: null
					}
					<Button type='primary' block={true} onClick={roll}>Roll</Button>
					{
						results.length > 0 ?
							<div className='result-row'>
								{(props.type === 'Power Roll') ? results.map((r, n) => <Statistic key={n} title='d10' value={r} />) : null}
								{(props.type === 'Power Roll') ? props.modifiers.filter(m => m !== 0).map((m, n) => <Statistic key={n} title='Modifier' value={`${m >= 0 ? '+' : ''}${m}`} />) : null}
								{(props.type === 'Power Roll') && bonus ? <Statistic title={bonus > 0 ? 'Edge' : 'Bane'} value={`${bonus >= 0 ? '+' : ''}${bonus}`} /> : null}
								<Statistic className='total' title='Total' value={total} />
							</div>
							: null
					}
					{
						results.length > 0 ?
							<Slider
								range={true}
								marks={marks}
								min={Math.min(1, total)}
								max={Math.max(max, total)}
								value={[ total ]}
								styles={{
									track: {
										background: 'transparent'
									}
								}}
								tooltip={{ open: false }}
							/>
							: null
					}
					{
						tierMessage ?
							<Alert
								type='warning'
								showIcon={true}
								message={tierMessage}
							/>
							: null
					}
					{
						(props.type === 'Power Roll') && (Collections.sum(results, r => r) >= 19) ?
							<Alert
								type='success'
								showIcon={true}
								message='Critical hit!'
							/>
							: null
					}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
