import { Alert, Segmented, Statistic } from 'antd';
import { Characteristic } from '../../../enums/characteristic';
import { ConditionType } from '../../../enums/condition-type';
import { DieRollPanel } from '../../panels/die-roll/die-roll-panel';
import { Expander } from '../../controls/expander/expander';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { Modal } from '../modal/modal';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { useState } from 'react';

import './roll-modal.scss';

interface Props {
	characteristics?: Characteristic[];
	hero?: Hero;
	onClose: () => void;
}

export const RollModal = (props: Props) => {
	const [ modifier, setModifier ] = useState<number>(0);
	const [ type, setType ] = useState<'Power Roll' | 'Saving Throw'>('Power Roll');

	try {
		const warnings: { label: string, text: string }[] = [];
		let bonus = 0;

		if (props.characteristics && props.hero) {
			if (props.characteristics.some(ch => [ Characteristic.Might, Characteristic.Agility ].includes(ch))) {
				if (props.hero.state.conditions.some(c => c.type === ConditionType.Bleeding) || (HeroLogic.getCombatState(props.hero) === 'dying')) {
					warnings.push({
						label: ConditionType.Bleeding,
						text: 'Whenever you make a test using Might or Agility, you lose 1d6 Stamina after it is resolved.'
					});
				}
				if (props.hero.state.conditions.some(c => c.type === ConditionType.Restrained)) {
					warnings.push({
						label: ConditionType.Restrained,
						text: 'You have a bane on Might and Agility tests.'
					});
				}
			}

			bonus = Math.max(...props.characteristics.map(ch => HeroLogic.getCharacteristic(props.hero!, ch)));
		}

		const getContent = () => {
			switch (type) {
				case 'Power Roll':
					return (
						<>
							{
								warnings.map((warn, n) => (
									<Alert
										key={n}
										type='warning'
										showIcon={true}
										message={<div><b>{warn.label}</b>: {warn.text}</div>}
									/>
								))
							}
							{
								props.characteristics && props.hero ?
									<Statistic title={props.characteristics.join(', ')} value={bonus} />
									: null
							}
							<NumberSpin label='Modifier' value={modifier} onChange={setModifier} />
							<Expander title='Rules'>
								<HeaderText>Test Results</HeaderText>
								<table>
									<thead>
										<tr>
											<th>Roll</th>
											<th>Easy</th>
											<th>Medium</th>
											<th>Hard</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>11 -</td>
											<td>Success with consequence</td>
											<td>Failure</td>
											<td>Failure with consequence</td>
										</tr>
										<tr>
											<td>12 - 16</td>
											<td>Success</td>
											<td>Success with consequence</td>
											<td>Failure</td>
										</tr>
										<tr>
											<td>17 +</td>
											<td>Success with reward</td>
											<td>Success</td>
											<td>Success</td>
										</tr>
										<tr>
											<td>Natural 19 - 20</td>
											<td>Success with reward</td>
											<td>Success with reward</td>
											<td>Success with reward</td>
										</tr>
									</tbody>
								</table>
							</Expander>
							<DieRollPanel type='Power Roll' modifiers={[ bonus, modifier ]} />
						</>
					);
				case 'Saving Throw':
					return (
						<>
							<DieRollPanel type='Saving Throw' modifiers={[ modifier ]} />
						</>
					);
			}
		};

		return (
			<Modal
				toolbar={
					<div style={{ width: '100%', textAlign: 'center' }}>
						<Segmented
							name='tabs'
							options={[ 'Power Roll', 'Saving Throw' ]}
							value={type}
							onChange={setType}
						/>
					</div>
				}
				content={
					<div className='roll-modal'>
						{getContent()}
					</div>
				}
				onClose={props.onClose}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
