import { Alert, Button, Drawer, Flex, Segmented } from 'antd';
import { ConditionEndType, ConditionType } from '../../../enums/condition-type';
import { Condition } from '../../../models/condition';
import { ConditionPanel } from '../condition/condition-panel';
import { ConditionSelectModal } from '../../modals/condition-select/condition-select-modal';
import { DropdownButton } from '../../controls/dropdown-button/dropdown-button';
import { Encounter } from '../../../models/encounter';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { Field } from '../../controls/field/field';
import { MonsterOrganizationType } from '../../../enums/monster-organization-type';
import { MonsterState } from '../../../models/monster';
import { MonsterToken } from '../../controls/token/token';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './monster-state-panel.scss';

interface Props {
	state: MonsterState;
	source: 'monster' | 'minion-group' | 'minion';
	encounter?: Encounter;
	updateState: (state: MonsterState) => void;
}

export const MonsterStatePanel = (props: Props) => {
	const [ state, setState ] = useState<MonsterState>(Utils.copy(props.state));
	const [ addingCondition, setAddingCondition ] = useState<boolean>(false);

	const setStaminaDamage = (value: number) => {
		const copy = Utils.copy(state);
		copy.staminaDamage = value;
		setState(copy);
		props.updateState(copy);
	};

	const setStaminaTemp = (value: number) => {
		const copy = Utils.copy(state);
		copy.staminaTemp = value;
		setState(copy);
		props.updateState(copy);
	};

	const setDefeated = (value: boolean) => {
		const copy = Utils.copy(state);
		copy.defeated = value;
		setState(copy);
		props.updateState(copy);
	};

	const setCaptainID = (value: string) => {
		const copy = Utils.copy(state);
		copy.captainID = value;
		setState(copy);
		props.updateState(copy);
	};

	const addCondition = (value: ConditionType) => {
		const copy = Utils.copy(state);
		copy.conditions.push({
			id: Utils.guid(),
			type: value,
			text: '',
			ends: ConditionEndType.EndOfTurn
		});
		setState(copy);
		setAddingCondition(false);
		props.updateState(copy);
	};

	const changeCondition = (condition: Condition) => {
		const copy = Utils.copy(state);
		const index = copy.conditions.findIndex(c => c.id === condition.id);
		if (index !== -1) {
			copy.conditions[index] = condition;
		}
		setState(copy);
		props.updateState(copy);
	};

	const deleteCondition = (condition: Condition) => {
		const copy = Utils.copy(state);
		copy.conditions = copy.conditions.filter(c => c.id !== condition.id);
		setState(copy);
		props.updateState(copy);
	};

	return (
		<ErrorBoundary>
			<div className='monster-state-panel'>
				<Flex align='center' justify='space-evenly' style={{ marginTop: '10px' }}>
					<Segmented
						options={[
							{ value: false, label: 'Active' },
							{ value: true, label: 'Defeated' }
						]}
						value={state.defeated}
						onChange={setDefeated}
					/>
					<Button onClick={() => setAddingCondition(true)}>Add a condition</Button>
					{
						(props.source === 'minion-group') && props.encounter ?
							<DropdownButton
								label='Captain'
								items={
									props.encounter.groups
										.flatMap(g => g.slots)
										.flatMap(s => s.monsters)
										.filter(m => m.role.organization !== MonsterOrganizationType.Minion)
										.filter(m => !m.state.defeated)
										.map(m => ({
											key: m.id,
											label: (
												<div
													style={{
														display: 'flex',
														alignItems: 'center',
														gap: '10px',
														padding: '5px',
														borderRadius: '5px',
														background: (m.id === state.captainID ? 'rgb(64, 150, 255)' : undefined),
														color: (m.id === state.captainID ? 'rgb(255, 255, 255)' : undefined)
													}}>
													<MonsterToken monster={m} />
													{m.name}
												</div>
											)
										}))
								}
								onClick={setCaptainID}
							/>
							: null
					}
				</Flex>
				{
					state.conditions.map(c => (
						<ConditionPanel
							key={c.id}
							condition={c}
							onChange={changeCondition}
							onDelete={deleteCondition}
						/>
					))
				}
				{
					props.source === 'minion' ?
						<Alert
							type='info'
							showIcon={true}
							message='Minion stamina is tracked as a group, not individually.'
						/>
						:
						<div className='stats'>
							<NumberSpin min={0} value={state.staminaDamage} onChange={setStaminaDamage}>
								<Field orientation='vertical' label='Damage' value={state.staminaDamage} />
							</NumberSpin>
							<NumberSpin min={0} value={state.staminaTemp} onChange={setStaminaTemp}>
								<Field orientation='vertical' label='Temp' value={state.staminaTemp} />
							</NumberSpin>
						</div>
				}
				<Drawer open={addingCondition} onClose={() => setAddingCondition(false)} closeIcon={null} width='500px'>
					<ConditionSelectModal
						onSelect={addCondition}
						onClose={() => setAddingCondition(false)}
					/>
				</Drawer>
			</div>
		</ErrorBoundary>
	);
};
