import { Button, Drawer, Flex, Segmented, Tag } from 'antd';
import { ConditionEndType, ConditionType } from '../../../../enums/condition-type';
import { Monster, MonsterGroup } from '../../../../models/monster';
import { Ability } from '../../../../models/ability';
import { AbilityModal } from '../../../modals/ability/ability-modal';
import { AbilityPanel } from '../ability-panel/ability-panel';
import { Characteristic } from '../../../../enums/characteristic';
import { Condition } from '../../../../models/hero';
import { ConditionPanel } from '../../condition/condition-panel';
import { ConditionSelectModal } from '../../../modals/condition-select/condition-select-modal';
import { DamageModifierType } from '../../../../enums/damage-modifier-type';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { FormatLogic } from '../../../../logic/format-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { MonsterLabel } from '../../monster-label/monster-label';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterOrganizationType } from '../../../../enums/monster-organization-type';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Token } from '../../../controls/token/token';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './monster-panel.scss';

interface Props {
	monster: Monster;
	monsterGroup?: MonsterGroup;
	mode?: PanelMode;
	canRoll?: boolean;
	updateMonster?: (monster: Monster) => void;
}

export const MonsterPanel = (props: Props) => {
	const [ monster, setMonster ] = useState<Monster>(Utils.copy(props.monster));
	const [ selectedAbility, setSelectedAbility ] = useState<Ability | null>(null);
	const [ addingCondition, setAddingCondition ] = useState<boolean>(false);

	const setStaminaDamage = (value: number) => {
		const copy = Utils.copy(monster);
		copy.state.staminaDamage = value;
		setMonster(copy);
		if (props.updateMonster) {
			props.updateMonster(copy);
		}
	};

	const setStaminaTemp = (value: number) => {
		const copy = Utils.copy(monster);
		copy.state.staminaTemp = value;
		setMonster(copy);
		if (props.updateMonster) {
			props.updateMonster(copy);
		}
	};

	const setDefeated = (value: boolean) => {
		const copy = Utils.copy(monster);
		copy.state.defeated = value;
		setMonster(copy);
		if (props.updateMonster) {
			props.updateMonster(copy);
		}
	};

	const addCondition = (value: ConditionType) => {
		const copy = Utils.copy(monster);
		copy.state.conditions.push({
			id: Utils.guid(),
			type: value,
			text: '',
			ends: ConditionEndType.EndOfTurn
		});
		setMonster(copy);
		setAddingCondition(false);
		if (props.updateMonster) {
			props.updateMonster(copy);
		}
	};

	const changeCondition = (condition: Condition) => {
		const copy = Utils.copy(monster);
		const index = copy.state.conditions.findIndex(c => c.id === condition.id);
		if (index !== -1) {
			copy.state.conditions[index] = condition;
		}
		setMonster(copy);
		if (props.updateMonster) {
			props.updateMonster(copy);
		}
	};

	const deleteCondition = (condition: Condition) => {
		const copy = Utils.copy(monster);
		copy.state.conditions = copy.state.conditions.filter(c => c.id !== condition.id);
		setMonster(copy);
		if (props.updateMonster) {
			props.updateMonster(copy);
		}
	};

	try {
		if (props.mode !== PanelMode.Full) {
			return (
				<div className='monster-panel compact'>
					<HeaderText level={1} ribbon={<Token monster={monster} monsterGroup={props.monsterGroup} size={28} />}>
						{MonsterLogic.getMonsterName(monster, props.monsterGroup)}
					</HeaderText>
					<MonsterLabel monster={monster} />
					<Flex align='center' justify='space-between'>
						<div>{monster.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)}</div>
						<Field label='EV' value={(monster.role.organization === MonsterOrganizationType.Minion) ? `${monster.encounterValue} for 8 minions` : ((monster.encounterValue === 0) ? '-': monster.encounterValue)} />
					</Flex>
				</div>
			);
		}

		const signatureBonus = MonsterLogic.getSignatureDamageBonus(monster);

		const immunities = MonsterLogic.getDamageModifiers(monster, DamageModifierType.Immunity);
		const weaknesses = MonsterLogic.getDamageModifiers(monster, DamageModifierType.Weakness);
		const speed = monster.speed.modes !== '' ? `${monster.speed.value} (${monster.speed.modes})` : monster.speed.value;

		const features = MonsterLogic.getFeatures(monster).filter(f => (f.type === FeatureType.Text) || (f.type === FeatureType.AddOn));
		const abilities = MonsterLogic.getFeatures(monster).filter(f => f.type === FeatureType.Ability).map(f => f.data.ability);

		return (
			<div className='monster-panel' id={monster.id}>
				<HeaderText level={1} ribbon={<Token monster={monster} monsterGroup={props.monsterGroup} size={28} />}>
					{MonsterLogic.getMonsterName(monster, props.monsterGroup)}
				</HeaderText>
				<MonsterLabel monster={monster} />
				<Markdown text={monster.description} />
				<Flex align='center' justify='space-between'>
					<div>{monster.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)}</div>
					<Field label='EV' value={(monster.role.organization === MonsterOrganizationType.Minion) ? `${monster.encounterValue} for 8 minions` : ((monster.encounterValue === 0) ? '-': monster.encounterValue)} />
				</Flex>
				{
					props.updateMonster ?
						<div className='stats'>
							<NumberSpin min={0} value={monster.state.staminaDamage} onChange={setStaminaDamage}>
								<Field orientation='vertical' label='Damage' value={monster.state.staminaDamage} />
							</NumberSpin>
							<NumberSpin min={0} value={monster.state.staminaTemp} onChange={setStaminaTemp}>
								<Field orientation='vertical' label='Temp' value={monster.state.staminaTemp} />
							</NumberSpin>
							<Button onClick={() => setAddingCondition(true)}>Add a condition</Button>
						</div>
						: null
				}
				{
					props.updateMonster ?
						<div style={{ textAlign: 'center' }}>
							<Segmented
								options={[ 'Active', 'Defeated' ]}
								value={monster.state.defeated ? 'Defeated' : 'Active'}
								onChange={value => setDefeated(value === 'Defeated')}
							/>
						</div>
						: null
				}
				{
					props.updateMonster ?
						<div>
							{
								monster.state.conditions.map(c => (
									<ConditionPanel
										key={c.id}
										condition={c}
										onChange={changeCondition}
										onDelete={deleteCondition}
									/>
								))
							}
						</div>
						: null
				}
				<div className='stats'>
					<Field orientation='vertical' label='Speed' value={speed} />
					<Field orientation='vertical' label='Size' value={FormatLogic.getSize(monster.size)} />
					<Field orientation='vertical' label='Stamina' value={MonsterLogic.getStaminaDescription(monster)} />
					<Field orientation='vertical' label='Stability' value={monster.stability} />
					<Field orientation='vertical' label='Free Strike' value={MonsterLogic.getFreeStrikeDamage(monster)} />
				</div>
				<div className='stats'>
					{
						[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ]
							.map(ch => <Field key={ch} orientation='vertical' label={ch} value={MonsterLogic.getCharacteristic(monster, ch)} />)
					}
				</div>
				{
					features.length > 0 ?
						<div className='features'>
							{
								signatureBonus ?
									<Field label='Signature Ability Damage' value={`+${signatureBonus.tier1} / +${signatureBonus.tier2} / +${signatureBonus.tier3}`} />
									: null
							}
							{
								monster.withCaptain ?
									<Field label='With Captain' value={monster.withCaptain} />
									: null
							}
							{
								immunities.length > 0 ?
									<Field label='Immunities' value={immunities.map(mod => `${mod.damageType} ${mod.value}`).join(', ')} />
									: null
							}
							{
								weaknesses.length > 0 ?
									<Field label='Weaknesses' value={weaknesses.map(mod => `${mod.damageType} ${mod.value}`).join(', ')} />
									: null
							}
							{features.map(f => <Field key={f.id} label={f.name} value={<Markdown text={f.description} useSpan={true} />} />)}
						</div>
						: null
				}
				{
					abilities.length > 0 ?
						<div className='abilities'>
							{abilities.map(a => <SelectablePanel key={a.id} onSelect={() => setSelectedAbility(a)}><AbilityPanel ability={a} mode={PanelMode.Full} /></SelectablePanel>)}
						</div>
						: null
				}
				{
					monster.retainer ?
						<>
							{
								monster.retainer.level4 && (monster.retainer.level < 4) ?
									<>
										<HeaderText level={1}>Level 4</HeaderText>
										<FeaturePanel key={monster.retainer.level4.id} feature={monster.retainer.level4} mode={PanelMode.Full} />
									</>
									: null
							}
							{
								monster.retainer.level7 && (monster.retainer.level < 7) ?
									<>
										<HeaderText level={1}>Level 7</HeaderText>
										<FeaturePanel key={monster.retainer.level7.id} feature={monster.retainer.level7} mode={PanelMode.Full} />
									</>
									: null
							}
							{
								monster.retainer.level10 && (monster.retainer.level < 10) ?
									<>
										<HeaderText level={1}>Level 10</HeaderText>
										<FeaturePanel key={monster.retainer.level10.id} feature={monster.retainer.level10} mode={PanelMode.Full} />
									</>
									: null
							}
						</>
						: null
				}
				<Drawer open={selectedAbility !== null} onClose={() => setSelectedAbility(null)} closeIcon={null} width='500px'>
					{
						selectedAbility ?
							<AbilityModal
								ability={selectedAbility}
								monster={monster}
								onClose={() => setSelectedAbility(null)}
							/>
							: null
					}
				</Drawer>
				<Drawer open={addingCondition} onClose={() => setAddingCondition(false)} closeIcon={null} width='500px'>
					<ConditionSelectModal
						onSelect={addCondition}
						onClose={() => setAddingCondition(false)}
					/>
				</Drawer>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
