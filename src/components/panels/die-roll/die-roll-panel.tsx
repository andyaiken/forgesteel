import { Alert, Button, Drawer, Flex, Segmented, Slider, Statistic } from 'antd';
import { ReactNode, useState } from 'react';
import { BarChartOutlined } from '@ant-design/icons';
import { Collections } from '@/utils/collections';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { HistogramPanel } from '@/components/panels/histogram/histogram-panel';
import { Modal } from '@/components/modals/modal/modal';
import { Random } from '@/utils/random';
import { RollLogic } from '@/logic/roll-logic';
import { RollState } from '@/enums/roll-state';

import './die-roll-panel.scss';

interface Props {
	type: 'Power Roll' | 'Saving Throw';
	modifiers: number[];
	rollState: RollState;
	hero?: Hero;
	onRollStateChange: (value: RollState) => void;
	onRoll?: (tier: number) => void;
}

export const DieRollPanel = (props: Props) => {
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

		setTierResult(rolls, props.rollState);
		setResults(rolls);
	};

	const setTierResult = (rolls: number[], rollState: RollState) => {
		if (props.onRoll) {
			let tier = 1;

			const total = Collections.sum([ ...rolls, ...props.modifiers, RollLogic.getBonus(rollState) ], r => r);
			if (total <= 11) {
				tier = 1;
			} else if (total <= 16) {
				tier = 2;
			} else {
				tier = 3;
			}

			switch (rollState) {
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

	const getTierMessage = (rollState: RollState, type: string = 'Power Roll') => {
		if (type == 'Saving Throw') {
			return null;
		}

		switch (rollState) {
			case RollState.DoubleEdge:
				return 'Move the result up one tier.';
			case RollState.DoubleBane:
				return 'Move the result down one tier.';
		}

		return null;
	};

	const bonus = RollLogic.getBonus(props.rollState, props.type);
	const tierMessage = getTierMessage(props.rollState, props.type);

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
			marks[(props.hero ? HeroLogic.getSaveThreshold(props.hero) : 6) - 0.5] = <div className='ds-text dimmed-text small-text'>-</div>;
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
								value={props.rollState}
								onChange={rs => {
									if (results.length > 0) {
										setTierResult(results, rs);
									}
									props.onRollStateChange(rs);
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
							title={tierMessage}
						/>
						: null
				}
				{
					(props.type === 'Power Roll') && (Collections.sum(results, r => r) >= 19) ?
						<Alert
							type='success'
							showIcon={true}
							title='Critical hit!'
						/>
						: null
				}
				{
					(props.type === 'Saving Throw') && (total > 0) ?
						<Alert
							type='info'
							showIcon={true}
							title={`This roll would usually indicate a ${total >= (props.hero ? HeroLogic.getSaveThreshold(props.hero) : 6) ? 'success' : 'failure'}.`}
						/>
						: null
				}
			</div>
			<Drawer open={showOdds} onClose={() => setShowOdds(false)} closeIcon={null} size={500}>
				<Modal
					content={
						<div style={{ padding: '0 20px 20px 20px' }}>
							<HeaderText>Odds</HeaderText>
							<div className='ds-text'>
								{
									[
										'2d10',
										props.rollState.toLowerCase(),
										...props.modifiers
											.filter(mod => mod !== 0)
											.map(mod => `${mod >= 0 ? '+' : ''}${mod}`)
									].join(', ')
								}
							</div>
							<HistogramPanel
								min={1}
								values={RollLogic.getOdds(props.modifiers, props.rollState, props.type)}
								showPercentages={true}
								getLabel={x => {
									switch (x) {
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
};
