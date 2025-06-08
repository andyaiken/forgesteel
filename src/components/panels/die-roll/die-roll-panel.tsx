import { Alert, Button, Drawer, Flex, Segmented, Slider, Statistic } from 'antd';
import { ReactNode, useState } from 'react';
import { BarChartOutlined } from '@ant-design/icons';
import { Collections } from '../../../utils/collections';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { HeaderText } from '../../controls/header-text/header-text';
import { HistogramPanel } from '../histogram/histogram-panel';
import { Modal } from '../../modals/modal/modal';
import { Random } from '../../../utils/random';

import './die-roll-panel.scss';

enum RollState {
	DoubleEdge = 'Double Edge',
	Edge = 'Edge',
	Standard = 'Standard Roll',
	Bane = 'Bane',
	DoubleBane = 'Double Bane'
}

interface Props {
	type: 'Power Roll' | 'Saving Throw';
	modifiers: number[];
	onRoll?: (tier: number) => void;
}

export const DieRollPanel = (props: Props) => {
	const [ rollState, setRollState ] = useState<RollState>(RollState.Standard);
	const [ showOdds, setShowOdds ] = useState<boolean>(false);
	const [ results, setResults ] = useState<number[]>([]);

	const roll = () => {
		const rolls: number[] = [];

		switch (props.type) {
			case 'Power Roll':
				rolls.push(Random.die(10), Random.die(10));
				break;
			case 'Saving Throw':
				rolls.push(Random.die(10));
				break;
		}

		setTierResult(rolls, rollState);
		setResults(rolls);
	};

	const setTierResult = (rolls: number[], state: RollState) => {
		if (props.onRoll) {
			let tier = 1;

			const total = Collections.sum([ ...rolls, ...props.modifiers, getBonus(state) ], r => r);
			if (total <= 11) {
				tier = 1;
			} else if (total <= 16) {
				tier = 2;
			} else {
				tier = 3;
			}

			switch (state) {
				case RollState.DoubleBane:
					tier = Math.max(1, tier - 1);
					break;
				case RollState.DoubleEdge:
					tier = Math.min(3, tier + 1);
					break;
			}

			props.onRoll(tier);
		}
	};

	const getBonus = (state: RollState) => {
		switch (state) {
			case RollState.Edge:
				return 2;
			case RollState.Bane:
				return -2;
		}

		return 0;
	};

	const getTierMessage = () => {
		switch (rollState) {
			case RollState.DoubleEdge:
				return 'Move the result up one tier.';
			case RollState.DoubleBane:
				return 'Move the result down one tier.';
		}

		return null;
	};

	const getOdds = () => {
		const results = [];

		for (let a = 1; a <= 10; ++a) {
			for (let b = 1; b <= 10; ++b) {
				if (a + b >= 19) {
					results.push(4);
				} else {
					const total = Collections.sum([ a, b, ...props.modifiers, getBonus(rollState) ], r => r);
					if (total >= 17) {
						// Tier 3
						switch (rollState) {
							case RollState.DoubleBane:
								results.push(2);
								break;
							default:
								results.push(3);
								break;
						}
					} else if (total >= 12) {
						// Tier 2
						switch (rollState) {
							case RollState.DoubleBane:
								results.push(1);
								break;
							case RollState.DoubleEdge:
								results.push(3);
								break;
							default:
								results.push(2);
								break;
						}
					} else {
						// Tier 1
						switch (rollState) {
							case RollState.DoubleEdge:
								results.push(2);
								break;
							default:
								results.push(1);
								break;
						}
					}
				}
			}
		}

		return results;
	};

	try {
		const bonus = getBonus(rollState);
		const tierMessage = getTierMessage();

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
							<Flex align='center' justify='space-evenly'>
								<Segmented
									className='roll-state-selector'
									options={[
										RollState.DoubleBane,
										RollState.Bane,
										RollState.Standard,
										RollState.Edge,
										RollState.DoubleEdge
									]}
									value={rollState}
									onChange={rs => {
										setTierResult(results, rs);
										setRollState(rs);
									}}
								/>
								<Button title='Odds' icon={<BarChartOutlined />} onClick={() => setShowOdds(true)} />
							</Flex>
							: null
					}
					<Button type='primary' block={true} onClick={roll}>
						{(props.type === 'Power Roll') ? 'Roll 2d10' : 'Roll 1d10' }
					</Button>
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
					{
						(props.type === 'Saving Throw') && (total > 0) ?
							<Alert
								type='info'
								showIcon={true}
								message={`This roll would usually indicate a ${total > 5 ? 'success' : 'failure'}.`}
							/>
							: null
					}
				</div>
				<Drawer open={showOdds} onClose={() => setShowOdds(false)} closeIcon={null} width='500px'>
					<Modal
						content={
							<div style={{ padding: '0 20px 20px 20px' }}>
								<HeaderText>Odds</HeaderText>
								<div className='ds-text'>
									{
										[
											'2d10',
											rollState.toLowerCase(),
											...props.modifiers
												.filter(mod => mod !== 0)
												.map(mod => `${mod >= 0 ? '+' : ''}${mod}`)
										].join(', ')
									}
								</div>
								<HistogramPanel
									min={1}
									values={getOdds()}
									showPercentages={true}
									getLabel={x => {
										switch(x) {
											case 4:
												return 'Crit';
											default:
												return `Tier ${x}`;
										}
									}}
								/>
							</div>
						}
						onClose={() => setShowOdds(false)}
					/>
				</Drawer>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
