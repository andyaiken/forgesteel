import { Alert, Button, Divider, Drawer, Flex, InputNumber, Popover, Progress, Segmented, Space } from 'antd';
import { ConditionEndType, ConditionType } from '../../../enums/condition-type';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Encounter, EncounterSlot } from '../../../models/encounter';
import { Collections } from '../../../utils/collections';
import { Condition } from '../../../models/condition';
import { ConditionPanel } from '../condition/condition-panel';
import { ConditionSelectModal } from '../../modals/select/condition-select/condition-select-modal';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { DropdownButton } from '../../controls/dropdown-button/dropdown-button';
import { Empty } from '../../controls/empty/empty';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { Field } from '../../controls/field/field';
import { Format } from '../../../utils/format';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { Markdown } from '../../controls/markdown/markdown';
import { Monster } from '../../../models/monster';
import { MonsterInfo } from '../../controls/token/token';
import { MonsterLogic } from '../../../logic/monster-logic';
import { MonsterOrganizationType } from '../../../enums/monster-organization-type';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { PanelMode } from '../../../enums/panel-mode';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './health-panel.scss';

interface HeroProps {
	hero: Hero;
	showEncounterControls: boolean;
	onChange?: (hero: Hero) => void;
}

export const HeroHealthPanel = (props: HeroProps) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));

	const setStaminaDamage = (value: number) => {
		const copy = Utils.copy(hero);
		copy.state.staminaDamage = value;
		setHero(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const setStaminaTemp = (value: number) => {
		const copy = Utils.copy(hero);
		copy.state.staminaTemp = value;
		setHero(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const setRecoveriesUsed = (value: number) => {
		const copy = Utils.copy(hero);
		copy.state.recoveriesUsed = value;
		setHero(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const takeDamage = (value: number) => {
		const damageToTemp = Math.min(value, hero.state.staminaTemp);
		const damageToStamina = value - damageToTemp;

		const copy = Utils.copy(hero);
		copy.state.staminaDamage += damageToStamina;
		copy.state.staminaTemp -= damageToTemp;
		setHero(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const heal = (value: number) => {
		const copy = Utils.copy(hero);
		copy.state.staminaDamage = Math.max(hero.state.staminaDamage - value, 0);
		setHero(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const addTemp = (value: number) => {
		const copy = Utils.copy(hero);
		copy.state.staminaTemp = hero.state.staminaTemp + value;
		setHero(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const spendRecovery = () => {
		const copy = Utils.copy(hero);
		copy.state.recoveriesUsed += 1;
		copy.state.staminaDamage = Math.max(copy.state.staminaDamage - HeroLogic.getRecoveryValue(hero), 0);
		setHero(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const setHidden = (value: boolean) => {
		const copy = Utils.copy(hero);
		copy.state.hidden = value;
		setHero(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const setDefeated = (value: boolean) => {
		const copy = Utils.copy(hero);
		copy.state.defeated = value;
		setHero(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const addCondition = (condition: Condition) => {
		const copy = Utils.copy(hero);
		copy.state.conditions.push(condition);
		setHero(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const editCondition = (condition: Condition) => {
		const copy = Utils.copy(hero);
		const index = copy.state.conditions.findIndex(c => c.id === condition.id);
		if (index !== -1) {
			copy.state.conditions[index] = condition;
			setHero(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		}
	};

	const deleteCondition = (condition: Condition) => {
		const copy = Utils.copy(hero);
		copy.state.conditions = copy.state.conditions.filter(c => c.id !== condition.id);
		setHero(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	return (
		<ErrorBoundary>
			<HealthPanel
				mode={props.onChange ? PanelMode.Full : PanelMode.Compact}
				showToggles={props.showEncounterControls}
				stamina={
					HeroLogic.getStamina(hero) !== 0 ?
						{
							staminaMax: HeroLogic.getStamina(hero),
							staminaDamage: hero.state.staminaDamage,
							state: HeroLogic.getCombatState(hero),
							immunities: HeroLogic.getDamageModifiers(hero, DamageModifierType.Immunity),
							weaknesses: HeroLogic.getDamageModifiers(hero, DamageModifierType.Weakness),
							setValue: setStaminaDamage,
							takeDamage: takeDamage,
							heal: heal
						}
						: undefined
				}
				staminaTemp={{
					staminaTemp: hero.state.staminaTemp,
					setValue: setStaminaTemp,
					addTemp: addTemp
				}}
				recoveries={{
					recoveriesMax: HeroLogic.getRecoveries(hero),
					recoveriesUsed: hero.state.recoveriesUsed,
					recoveryValue: HeroLogic.getRecoveryValue(hero),
					setValue: setRecoveriesUsed,
					spendRecovery: spendRecovery
				}}
				hidden={{
					value: hero.state.hidden,
					setValue: setHidden
				}}
				defeated={{
					value: hero.state.defeated,
					setValue: setDefeated
				}}
				conditions={{
					current: hero.state.conditions,
					immunities: HeroLogic.getConditionImmunities(hero)
				}}
				addCondition={addCondition}
				editCondition={editCondition}
				deleteCondition={deleteCondition}
			/>
		</ErrorBoundary>
	);
};

interface MonsterProps {
	monster: Monster;
	onChange?: (monster: Monster) => void;
}

export const MonsterHealthPanel = (props: MonsterProps) => {
	const [ monster, setMonster ] = useState<Monster>(Utils.copy(props.monster));

	const setStaminaDamage = (value: number) => {
		const copy = Utils.copy(monster);
		copy.state.staminaDamage = value;
		setMonster(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const setStaminaTemp = (value: number) => {
		const copy = Utils.copy(monster);
		copy.state.staminaTemp = value;
		setMonster(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const takeDamage = (value: number) => {
		const damageToTemp = Math.min(value, monster.state.staminaTemp);
		const damageToStamina = value - damageToTemp;

		const copy = Utils.copy(monster);
		copy.state.staminaDamage += damageToStamina;
		copy.state.staminaTemp -= damageToTemp;
		setMonster(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const heal = (value: number) => {
		const copy = Utils.copy(monster);
		copy.state.staminaDamage = Math.max(monster.state.staminaDamage - value, 0);
		setMonster(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const addTemp = (value: number) => {
		const copy = Utils.copy(monster);
		copy.state.staminaTemp = monster.state.staminaTemp + value;
		setMonster(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const setHidden = (value: boolean) => {
		const copy = Utils.copy(monster);
		copy.state.hidden = value;
		setMonster(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const setDefeated = (value: boolean) => {
		const copy = Utils.copy(monster);
		copy.state.defeated = value;
		setMonster(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const addCondition = (condition: Condition) => {
		const copy = Utils.copy(monster);
		copy.state.conditions.push(condition);
		setMonster(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const editCondition = (condition: Condition) => {
		const copy = Utils.copy(monster);
		const index = copy.state.conditions.findIndex(c => c.id === condition.id);
		if (index !== -1) {
			copy.state.conditions[index] = condition;
			setMonster(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		}
	};

	const deleteCondition = (condition: Condition) => {
		const copy = Utils.copy(monster);
		copy.state.conditions = copy.state.conditions.filter(c => c.id !== condition.id);
		setMonster(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	return (
		<ErrorBoundary>
			<HealthPanel
				mode={props.onChange ? PanelMode.Full : PanelMode.Compact}
				showToggles={true}
				stamina={
					monster.role.organization !== MonsterOrganizationType.Minion ?
						{
							staminaMax: MonsterLogic.getStamina(monster),
							staminaDamage: monster.state.staminaDamage,
							state: MonsterLogic.getCombatState(monster),
							immunities: MonsterLogic.getDamageModifiers(monster, DamageModifierType.Immunity),
							weaknesses: MonsterLogic.getDamageModifiers(monster, DamageModifierType.Weakness),
							setValue: setStaminaDamage,
							takeDamage: takeDamage,
							heal: heal
						}
						: undefined
				}
				staminaTemp={
					monster.role.organization !== MonsterOrganizationType.Minion ?
						{
							staminaTemp: monster.state.staminaTemp,
							setValue: setStaminaTemp,
							addTemp: addTemp
						}
						: undefined
				}
				hidden={{
					value: monster.state.hidden,
					setValue: setHidden
				}}
				defeated={{
					value: monster.state.defeated,
					setValue: setDefeated
				}}
				conditions={{
					current: monster.state.conditions,
					immunities: MonsterLogic.getConditionImmunities(monster)
				}}
				addCondition={addCondition}
				editCondition={editCondition}
				deleteCondition={deleteCondition}
			/>
		</ErrorBoundary>
	);
};

interface MinionGroupProps {
	slot: EncounterSlot;
	encounter: Encounter;
	onChange?: (slot: EncounterSlot) => void;
}

export const MinionGroupHealthPanel = (props: MinionGroupProps) => {
	const [ slot, setSlot ] = useState<EncounterSlot>(Utils.copy(props.slot));

	const setStaminaDamage = (value: number) => {
		const copy = Utils.copy(slot);
		copy.state.staminaDamage = value;
		setSlot(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const takeDamage = (value: number) => {
		const damageToTemp = Math.min(value, slot.state.staminaTemp);
		const damageToStamina = value - damageToTemp;

		const copy = Utils.copy(slot);
		copy.state.staminaDamage += damageToStamina;
		copy.state.staminaTemp -= damageToTemp;
		setSlot(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const heal = (value: number) => {
		const copy = Utils.copy(slot);
		copy.state.staminaDamage = Math.max(copy.state.staminaDamage - value, 0);
		setSlot(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const setDefeated = (value: boolean) => {
		const copy = Utils.copy(slot);
		copy.state.defeated = value;
		setSlot(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const setCaptainID = (value: string | undefined) => {
		const copy = Utils.copy(slot);
		copy.state.captainID = value;
		setSlot(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const addCondition = (condition: Condition) => {
		const copy = Utils.copy(slot);
		copy.state.conditions.push(condition);
		setSlot(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const editCondition = (condition: Condition) => {
		const copy = Utils.copy(slot);
		const index = copy.state.conditions.findIndex(c => c.id === condition.id);
		if (index !== -1) {
			copy.state.conditions[index] = condition;
			setSlot(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		}
	};

	const deleteCondition = (condition: Condition) => {
		const copy = Utils.copy(slot);
		copy.state.conditions = copy.state.conditions.filter(c => c.id !== condition.id);
		setSlot(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	return (
		<ErrorBoundary>
			<HealthPanel
				mode={props.onChange ? PanelMode.Full : PanelMode.Compact}
				showToggles={true}
				stamina={{
					staminaMax: Collections.sum(props.slot.monsters, m => MonsterLogic.getStamina(m)),
					staminaDamage: slot.state.staminaDamage,
					state: 'healthy',
					immunities: [],
					weaknesses: [],
					setValue: setStaminaDamage,
					takeDamage: takeDamage,
					heal: heal
				}}
				defeated={{
					value: slot.state.defeated,
					setValue: setDefeated
				}}
				captain={{
					captainID: slot.state.captainID,
					candidates: props.encounter.groups
						.flatMap(g => g.slots)
						.flatMap(s => s.monsters)
						.filter(m => m.role.organization !== MonsterOrganizationType.Minion)
						.filter(m => !m.state.defeated),
					setCaptainID: setCaptainID
				}}
				conditions={{
					current: slot.state.conditions,
					immunities: []
				}}
				addCondition={addCondition}
				editCondition={editCondition}
				deleteCondition={deleteCondition}
			/>
		</ErrorBoundary>
	);
};

interface Props {
	mode: PanelMode;
	showToggles: boolean;
	stamina?: {
		staminaMax: number;
		staminaDamage: number;
		state: string;
		immunities: { damageType: string, value: number }[];
		weaknesses: { damageType: string, value: number }[];
		setValue: (value: number) => void;
		takeDamage: (value: number) => void;
		heal: (value: number) => void;
	};
	staminaTemp?: {
		staminaTemp: number;
		setValue: (value: number) => void;
		addTemp: (value: number) => void;
	}
	recoveries?: {
		recoveriesMax: number;
		recoveriesUsed: number;
		recoveryValue: number;
		setValue: (value: number) => void;
		spendRecovery: () => void;
	}
	hidden?: {
		value: boolean;
		setValue: (value: boolean) => void;
	};
	defeated?: {
		value: boolean;
		setValue: (value: boolean) => void;
	};
	captain?: {
		captainID: string | undefined;
		candidates: Monster[];
		setCaptainID: (value: string | undefined) => void;
	};
	conditions: {
		current: Condition[];
		immunities: ConditionType[];
	};
	addCondition: (condition: Condition) => void;
	editCondition: (condition: Condition) => void;
	deleteCondition: (condition: Condition) => void;
}

const HealthPanel = (props: Props) => {
	const [ page, setPage ] = useState<string>(!props.stamina && props.recoveries ? 'recoveries' : 'stamina');
	const [ damageValue, setDamageValue ] = useState<number>(0);
	const [ conditionsVisible, setConditionsVisible ] = useState<boolean>(false);

	const takeDamage = () => {
		if (props.stamina) {
			props.stamina.takeDamage(damageValue);
		}
		setDamageValue(0);
	};

	const heal = () => {
		if (props.stamina) {
			props.stamina.heal(damageValue);
		}
		setDamageValue(0);
	};

	const addTemp = () => {
		if (props.staminaTemp) {
			props.staminaTemp.addTemp(damageValue);
		}
		setDamageValue(0);
	};

	const addCondition = (type: ConditionType) => {
		setConditionsVisible(false);
		props.addCondition({
			id: Utils.guid(),
			type: type,
			text: '',
			ends: ConditionEndType.UntilRemoved
		});
	};

	const addSpecial = (text: string) => {
		setConditionsVisible(false);
		props.addCondition({
			id: Utils.guid(),
			type: ConditionType.Quick,
			text: text,
			ends: ConditionEndType.UntilRemoved
		});
	};

	const getHealthGauges = () => {
		if (!props.stamina) {
			return null;
		}

		return (
			<div className='health-gauges'>
				{
					props.staminaTemp && (props.staminaTemp.staminaTemp > 0) ?
						<Progress
							className='stamina-temp-progress'
							type='dashboard'
							percent={100 * props.staminaTemp.staminaTemp / props.stamina!.staminaMax}
							showInfo={false}
							status='active'
						/>
						: null
				}
				<Progress
					className='stamina-progress'
					type='dashboard'
					percent={100 * (props.stamina!.staminaMax - props.stamina!.staminaDamage) / props.stamina!.staminaMax}
					showInfo={false}
					status={(props.stamina!.state === 'winded') ? 'exception' : 'active'}
				/>
				{
					props.recoveries && (props.recoveries.recoveriesMax > 0) ?
						<Progress
							className='recovery-progress'
							type='dashboard'
							percent={100 * (props.recoveries!.recoveriesMax - props.recoveries!.recoveriesUsed) / props.recoveries!.recoveriesMax}
							showInfo={false}
							status='active'
						/>
						: null
				}
				<div className='gauge-info'>
					{
						props.staminaTemp && (props.staminaTemp.staminaTemp > 0) ?
							<>
								<div>
									Tmp <b>{props.staminaTemp.staminaTemp}</b>
								</div>
								<Divider style={{ margin: '5px 0' }} />
							</>
							: null
					}
					<div>
						Sta <b>{props.stamina!.staminaDamage ? `${props.stamina!.staminaMax - props.stamina!.staminaDamage} / ${props.stamina!.staminaMax}` : `${props.stamina!.staminaMax}`}</b>
					</div>
					{
						props.recoveries && (props.recoveries.recoveriesMax > 0) ?
							<>
								<Divider style={{ margin: '5px 0' }} />
								<div>
									Rec <b>{props.recoveries!.recoveriesUsed ? `${props.recoveries!.recoveriesMax - props.recoveries!.recoveriesUsed} / ${props.recoveries!.recoveriesMax}` : `${props.recoveries!.recoveriesMax}`}</b>
								</div>
							</>
							: null
					}
				</div>
			</div>
		);
	};

	const getHealthControls = () => {
		return (
			<Space direction='vertical' style={{ flex: '1 1 0', width: '100%' }}>
				{
					props.stamina && props.recoveries ?
						<Segmented
							block={true}
							options={[
								{ value: 'stamina', label: 'Stamina' },
								{ value: 'recoveries', label: 'Recoveries' }
							]}
							value={page}
							onChange={setPage}
						/>
						: null
				}
				{
					page === 'stamina' ?
						<Space direction='vertical' style={{ width: '100%' }}>
							<NumberSpin
								min={0}
								steps={[ 1, 10 ]}
								value={damageValue}
								onChange={setDamageValue}
							>
								<InputNumber min={0} value={damageValue} onChange={value => setDamageValue(Math.round(value || 0))} />
							</NumberSpin>
							<Button block={true} disabled={damageValue === 0} onClick={takeDamage}>Take Damage</Button>
							<Button block={true} disabled={damageValue === 0} onClick={heal}>Regain Stamina</Button>
							{props.staminaTemp ? <Button block={true} disabled={damageValue === 0} onClick={addTemp}>Add Temporary Stamina</Button> : null}
						</Space>
						: null
				}
				{
					page === 'recoveries' ?
						<Space direction='vertical' style={{ width: '100%' }}>
							<Button
								block={true}
								className='tall-button'
								disabled={(props.stamina!.staminaDamage === 0) || (props.recoveries!.recoveriesUsed >= props.recoveries!.recoveriesMax)}
								onClick={props.recoveries!.spendRecovery}
							>
								<div>
									<div>Spend a Recovery</div>
									<div className='subtext'>
										Regain up to {props.recoveries!.recoveryValue} Stamina
									</div>
								</div>
							</Button>
							<Button
								block={true}
								className='tall-button'
								disabled={props.recoveries!.recoveriesUsed >= props.recoveries!.recoveriesMax}
								onClick={() => props.recoveries!.setValue(props.recoveries!.recoveriesUsed + 1)}
							>
								<div>
									<div>Spend a Recovery</div>
									<div className='subtext'>
										Don't regain Stamina
									</div>
								</div>
							</Button>
							<Button
								block={true}
								disabled={props.recoveries!.recoveriesUsed === 0}
								onClick={() => props.recoveries!.setValue(props.recoveries!.recoveriesUsed - 1)}
							>
								Regain a Recovery
							</Button>
						</Space>
						: null
				}
			</Space>
		);
	};

	if (props.mode === PanelMode.Compact) {
		return (
			<div className='health-panel compact'>
				{
					props.stamina ?
						<Field
							orientation='vertical'
							label='Stamina'
							value={props.stamina.staminaDamage ? `${props.stamina!.staminaMax - props.stamina!.staminaDamage} / ${props.stamina!.staminaMax}` : props.stamina!.staminaMax}
						/>
						: null
				}
				<div>
					{
						props.stamina && ![ 'healthy', 'injured' ].includes(props.stamina.state) ?
							<div className='ds-text'>{Format.capitalize(props.stamina.state)}</div>
							: null
					}
					{
						props.hidden && props.hidden.value ?
							<div className='ds-text'>Hidden</div>
							: null
					}
					{
						props.defeated && props.defeated.value ?
							<div className='ds-text'>Defeated</div>
							: null
					}
					{
						props.captain && props.captain.captainID ?
							<div className='ds-text'>{props.captain.candidates.find(m => m.id === props.captain!.captainID)?.name}</div>
							: null
					}
					{
						<div className='ds-text'>
							{props.conditions.current.map(c => c.type).join(', ') || 'Not affected by any conditions'}
						</div>
					}
				</div>
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<div className='health-panel'>
				{
					props.stamina ?
						<div className='health-panel-stamina'>
							{getHealthGauges()}
							{getHealthControls()}
						</div>
						: null
				}
				{
					props.stamina && ![ 'healthy', 'injured', 'dying' ].includes(props.stamina.state) ?
						<Alert
							type='warning'
							showIcon={true}
							message={`You are ${props.stamina.state}.`}
						/>
						: null
				}
				{
					props.stamina && (props.stamina.state === 'dying') ?
						<Alert
							type='warning'
							showIcon={true}
							message={
								<Markdown
									text={`
You are dying.

You can’t take the Catch Breath maneuver in combat, and you are bleeding, and this condition can’t be removed in any way until you are no longer dying.

Your allies can help you spend Recoveries in combat, and you can spend Recoveries out of combat as usual.`}
								/>
							}
						/>
						: null
				}
				{
					props.stamina && props.stamina.immunities.length > 0 ?
						<Field label='Immunities' value={props.stamina.immunities.map(dm => `${dm.damageType} ${dm.value}`).join(', ')} />
						: null
				}
				{
					props.stamina && props.stamina.weaknesses.length > 0 ?
						<Field label='Weakness' value={props.stamina.weaknesses.map(dm => `${dm.damageType} ${dm.value}`).join(', ')} />
						: null
				}
				{
					props.showToggles && (props.hidden || props.defeated || props.captain) ?
						<>
							<Flex align='center' justify='space-evenly' gap={10} style={{ margin: '10px 0' }}>
								{
									props.hidden ?
										<Button
											key='hidden'
											style={{ flex: '1 1 0' }}
											className='tall-button'
											onClick={() => props.hidden!.setValue(!props.hidden!.value)}
										>
											<div>
												<div>
													{props.hidden.value ? 'Hidden' : 'Not Hidden'}
												</div>
												<div className='subtext'>
													You are {props.hidden.value ? 'hidden' : 'not hidden'}
												</div>
											</div>
										</Button>
										: null
								}
								{
									props.defeated ?
										<Button
											key='defeated'
											style={{ flex: '1 1 0' }}
											type={!props.defeated.value && props.stamina && (props.stamina.staminaDamage >= props.stamina.staminaMax) ? 'primary' : 'default'}
											className='tall-button'
											onClick={() => props.defeated!.setValue(!props.defeated!.value)}
										>
											<div>
												<div>
													{props.defeated.value ? 'Defeated' : 'Active'}
												</div>
												<div className='subtext'>
													You are {props.defeated.value ? 'defeated' : 'not defeated'}
												</div>
											</div>
										</Button>
										: null
								}
								{
									props.captain ?
										<DropdownButton
											style={{ flex: '1 1 0' }}
											className='tall-button'
											label='Captain'
											items={
												props.captain.candidates.map(m => ({
													key: m.id,
													label: (
														<div
															style={{
																padding: '5px 10px',
																borderRadius: '5px',
																background: (m.id === props.captain!.captainID ? 'rgb(64, 150, 255)' : undefined),
																color: (m.id === props.captain!.captainID ? 'rgb(255, 255, 255)' : undefined)
															}}>
															<MonsterInfo monster={m} />
														</div>
													)
												}))
											}
											onClick={props.captain.setCaptainID}
										/>
										: null
								}
							</Flex>
						</>
						: null
				}
				<HeaderText
					extra={
						<Space>
							<Button onClick={() => setConditionsVisible(true)}>
								<PlusOutlined />
								Add a condition
							</Button>
							<Popover
								trigger='click'
								content={
									<Space direction='vertical'>
										<Button type='text' onClick={() => addSpecial('Judged')}>Judged</Button>
										<Button type='text' onClick={() => addSpecial('Marked')}>Marked</Button>
									</Space>
								}
							>
								<Button>
									<PlusOutlined />
									Add other
									<DownOutlined />
								</Button>
							</Popover>
						</Space>
					}
				>
					Conditions
				</HeaderText>
				{
					props.conditions.current.map(c => (
						<ConditionPanel
							key={c.id}
							condition={c}
							onChange={props.editCondition}
							onDelete={props.deleteCondition}
						/>
					))
				}
				{
					props.conditions.current.length === 0 ?
						<Empty text='You are not affected by any conditions.' />
						: null
				}
				<Drawer open={conditionsVisible} onClose={() => setConditionsVisible(false)} closeIcon={null} width='500px'>
					<ConditionSelectModal immunities={props.conditions.immunities} onSelect={addCondition} onClose={() => setConditionsVisible(false)} />
				</Drawer>
			</div>
		</ErrorBoundary>
	);
};
