import { Alert, Flex, Segmented, Statistic } from 'antd';
import { Characteristic } from '@/enums/characteristic';
import { ConditionType } from '@/enums/condition-type';
import { CreatureLogic } from '@/logic/creature-logic';
import { DieRollPanel } from '@/components/panels/die-roll/die-roll-panel';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureField } from '@/enums/feature-field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Modal } from '@/components/modals/modal/modal';
import { Monster } from '@/models/monster';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { RollModifierPanel } from '@/components/panels/roll-modifier-panel/roll-modifier-panel';
import { RollState } from '@/enums/roll-state';
import { useState } from 'react';

import './roll-modal.scss';

interface Props {
	characteristics?: Characteristic[];
	creature: Hero | Monster | null;
	onClose: () => void;
}

export const RollModal = (props: Props) => {
	const [ modifier, setModifier ] = useState<number>(0);
	const [ type, setType ] = useState<'Power Roll' | 'Saving Throw'>('Power Roll');
	const [ rollState, setRollState ] = useState<RollState>(RollState.Standard);

	const warnings: { label: string, text: string }[] = [];
	let characteristicBonus = 0;
	let saveBonus = 0;

	if (props.characteristics && props.creature) {
		if (props.characteristics.some(ch => [ Characteristic.Might, Characteristic.Agility ].includes(ch))) {
			if (props.creature.state.conditions.some(c => c.type === ConditionType.Bleeding) || (CreatureLogic.getCombatState(props.creature) === 'dying')) {
				warnings.push({
					label: ConditionType.Bleeding,
					text: 'Whenever you make a test using Might or Agility, you lose 1d6 Stamina + your level after it is resolved.'
				});
			}
			if (props.creature.state.conditions.some(c => c.type === ConditionType.Restrained)) {
				warnings.push({
					label: ConditionType.Restrained,
					text: 'You have a bane on Might and Agility tests.'
				});
			}
		}

		characteristicBonus = Math.max(...props.characteristics.map(ch => CreatureLogic.getCharacteristic(props.creature!, ch)));
	}

	if (props.creature) {
		saveBonus = CreatureLogic.getField(props.creature, FeatureField.Save);
	}

	// Only a hero carries roll modifiers, and only a power roll can be narrowed by characteristic
	const rollModifiers = (props.creature && ('class' in props.creature) && props.characteristics)
		? HeroLogic.getRollModifiersForTest(props.creature, props.characteristics)
		: [];

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
									title={<div><b>{warn.label}</b>: {warn.text}</div>}
								/>
							))
						}
						<Flex align='center' justify='space-evenly'>
							{
								props.characteristics && props.creature ?
									<Statistic title={props.characteristics.join(', ')} value={characteristicBonus} />
									: null
							}
							<NumberSpin style={{ width: '150px' }} label='Modifier' value={modifier} onChange={setModifier} />
						</Flex>
						<DieRollPanel type='Power Roll' modifiers={[ characteristicBonus, modifier ]} rollState={rollState} creature={props.creature} onRollStateChange={setRollState} />
						{
							rollModifiers.length > 0 ?
								<div>
									<HeaderText>Modifiers That Might Apply</HeaderText>
									{rollModifiers.map(f => <RollModifierPanel key={f.id} modifier={f} />)}
								</div>
								: null
						}
						<Expander title='Rules'>
							<HeaderText>Test Results</HeaderText>
							<table>
								<thead>
									<tr>
										<th className='row-header'>Roll</th>
										<th>Easy</th>
										<th>Medium</th>
										<th>Hard</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className='row-header'>≤ 11</td>
										<td>Success with consequence</td>
										<td>Failure</td>
										<td>Failure with consequence</td>
									</tr>
									<tr>
										<td className='row-header'>12 - 16</td>
										<td>Success</td>
										<td>Success with consequence</td>
										<td>Failure</td>
									</tr>
									<tr>
										<td className='row-header'>≥ 17</td>
										<td>Success with reward</td>
										<td>Success</td>
										<td>Success</td>
									</tr>
									<tr>
										<td className='row-header'>Nat 19 / 20</td>
										<td>Success with reward</td>
										<td>Success with reward</td>
										<td>Success with reward</td>
									</tr>
								</tbody>
							</table>
						</Expander>
					</>
				);
			case 'Saving Throw':
				return (
					<>
						<DieRollPanel type='Saving Throw' modifiers={[ saveBonus ]} rollState={rollState} creature={props.creature} onRollStateChange={setRollState} />
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
};
