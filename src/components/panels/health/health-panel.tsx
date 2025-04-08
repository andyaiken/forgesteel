import { Alert, Button, Divider, Flex, InputNumber, Progress, Space } from 'antd';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { Field } from '../../controls/field/field';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { Monster } from '../../../models/monster';
import { MonsterLogic } from '../../../logic/monster-logic';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './health-panel.scss';

interface HeroProps {
	hero: Hero;
	onChange: (hero: Hero) => void;
}

export const HeroHealthPanel = (props: HeroProps) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));

	const takeDamage = (value: number) => {
		const damageToTemp = Math.min(value, hero.state.staminaTemp);
		const damageToStamina = value - damageToTemp;

		const copy = Utils.copy(hero);
		copy.state.staminaDamage += damageToStamina;
		copy.state.staminaTemp -= damageToTemp;
		setHero(copy);
		props.onChange(copy);
	};

	const heal = (value: number) => {
		const copy = Utils.copy(hero);
		copy.state.staminaDamage = Math.max(hero.state.staminaDamage - value, 0);
		setHero(copy);
		props.onChange(copy);
	};

	const addTemp = (value: number) => {
		const copy = Utils.copy(hero);
		copy.state.staminaTemp = hero.state.staminaTemp + value;
		setHero(copy);
		props.onChange(copy);
	};

	const spendRecovery = () => {
		const copy = Utils.copy(hero);
		copy.state.recoveriesUsed += 1;
		copy.state.staminaDamage = Math.max(copy.state.staminaDamage - HeroLogic.getRecoveryValue(hero), 0);
		setHero(copy);
		props.onChange(copy);
	};

	return (
		<ErrorBoundary>
			<HealthPanel
				staminaMax={HeroLogic.getStamina(hero)}
				staminaDamage={hero.state.staminaDamage}
				staminaTemp={hero.state.staminaTemp}
				recoveriesMax={HeroLogic.getRecoveries(hero)}
				recoveriesUsed={hero.state.recoveriesUsed}
				recoveryValue={HeroLogic.getRecoveryValue(hero)}
				isWinded={HeroLogic.isWinded(hero)}
				immunities={HeroLogic.getDamageModifiers(hero, DamageModifierType.Immunity)}
				weaknesses={HeroLogic.getDamageModifiers(hero, DamageModifierType.Weakness)}
				takeDamage={takeDamage}
				heal={heal}
				addTemp={addTemp}
				spendRecovery={spendRecovery}
			/>
		</ErrorBoundary>
	);
};

interface MonsterProps {
	monster: Monster;
	onChange: (monster: Monster) => void;
}

export const MonsterHealthPanel = (props: MonsterProps) => {
	const [ monster, setMonster ] = useState<Monster>(Utils.copy(props.monster));

	const takeDamage = (value: number) => {
		const damageToTemp = Math.min(value, monster.state.staminaTemp);
		const damageToStamina = value - damageToTemp;

		const copy = Utils.copy(monster);
		copy.state.staminaDamage += damageToStamina;
		copy.state.staminaTemp -= damageToTemp;
		setMonster(copy);
		props.onChange(copy);
	};

	const heal = (value: number) => {
		const copy = Utils.copy(monster);
		copy.state.staminaDamage = Math.max(monster.state.staminaDamage - value, 0);
		setMonster(copy);
		props.onChange(copy);
	};

	const addTemp = (value: number) => {
		const copy = Utils.copy(monster);
		copy.state.staminaTemp = monster.state.staminaTemp + value;
		setMonster(copy);
		props.onChange(copy);
	};

	return (
		<ErrorBoundary>
			<HealthPanel
				staminaMax={MonsterLogic.getStamina(monster)}
				staminaDamage={monster.state.staminaDamage}
				staminaTemp={monster.state.staminaTemp}
				recoveriesMax={0}
				recoveriesUsed={0}
				recoveryValue={0}
				isWinded={MonsterLogic.isWinded(monster)}
				immunities={MonsterLogic.getDamageModifiers(monster, DamageModifierType.Immunity)}
				weaknesses={MonsterLogic.getDamageModifiers(monster, DamageModifierType.Weakness)}
				takeDamage={takeDamage}
				heal={heal}
				addTemp={addTemp}
				spendRecovery={() => null}
			/>
		</ErrorBoundary>
	);
};

interface Props {
	staminaMax: number;
	staminaDamage: number;
	staminaTemp: number;
	recoveriesMax: number;
	recoveriesUsed: number;
	recoveryValue: number;
	isWinded: boolean;
	immunities: { damageType: string, value: number }[];
	weaknesses: { damageType: string, value: number }[];
	takeDamage: (value: number) => void;
	heal: (value: number) => void;
	addTemp: (value: number) => void;
	spendRecovery: () => void;
}

const HealthPanel = (props: Props) => {
	const [ damageValue, setDamageValue ] = useState<number>(0);

	const takeDamage = () => {
		props.takeDamage(damageValue);
		setDamageValue(0);
	};

	const heal = () => {
		props.heal(damageValue);
		setDamageValue(0);
	};

	const addTemp = () => {
		props.addTemp(damageValue);
		setDamageValue(0);
	};

	return (
		<ErrorBoundary>
			<Space direction='vertical' style={{ width: '100%' }}>
				<div className='health-panel'>
					<div className='health-gauges'>
						{
							props.staminaTemp > 0 ?
								<Progress
									className='stamina-temp-progress'
									type='dashboard'
									percent={100 * props.staminaTemp / props.staminaMax}
									showInfo={false}
									status='active'
								/>
								: null
						}
						<Progress
							className='stamina-progress'
							type='dashboard'
							percent={100 * (props.staminaMax - props.staminaDamage) / props.staminaMax}
							showInfo={false}
							status={props.isWinded ? 'exception' : 'active'}
						/>
						{
							props.recoveriesMax > 0 ?
								<Progress
									className='recovery-progress'
									type='dashboard'
									percent={100 * (props.recoveriesMax - props.recoveriesUsed) / props.recoveriesMax}
									showInfo={false}
									status='active'
								/>
								: null
						}
						<div className='gauge-info'>
							{
								props.staminaTemp > 0 ?
									<>
										<div>
											Temp <b>{props.staminaTemp}</b>
										</div>
										<Divider style={{ margin: '5px 0' }} />
									</>
									: null
							}
							<div>
								Sta <b>{props.staminaDamage ? `${props.staminaMax - props.staminaDamage} / ${props.staminaMax}` : `${props.staminaMax}`}</b>
							</div>
							{
								props.recoveriesMax > 0 ?
									<>
										<Divider style={{ margin: '5px 0' }} />
										<div>
											Rec <b>{props.recoveriesUsed ? `${props.recoveriesMax - props.recoveriesUsed} / ${props.recoveriesMax}` : `${props.recoveriesMax}`}</b>
										</div>
									</>
									: null
							}
						</div>
					</div>
					<Flex style={{ flex: '1 1 0' }} vertical={true} align='center' justify='center' gap={5}>
						<NumberSpin
							min={0}
							steps={[ 1, 10 ]}
							value={damageValue}
							onChange={setDamageValue}
						>
							<InputNumber style={{ width: '75px' }} min={0} value={damageValue} onChange={value => setDamageValue(value || 0)} />
						</NumberSpin>
						<Button block={true} disabled={damageValue === 0} onClick={takeDamage}>Take Damage</Button>
						<Button block={true} disabled={damageValue === 0} onClick={heal}>Heal</Button>
						<Button block={true} disabled={damageValue === 0} onClick={addTemp}>Add Temporary Stamina</Button>
						{
							props.recoveriesMax > 0 ?
								<Button
									block={true}
									className='tall-button'
									disabled={(props.staminaDamage === 0) || (props.recoveriesUsed >= props.recoveriesMax)}
									onClick={props.spendRecovery}
								>
									<div>
										<div>Spend a Recovery</div>
										<div className='subtext'>
											Regain {props.recoveryValue} Stamina
										</div>
									</div>
								</Button>
								: null
						}
					</Flex>
				</div>
				{
					props.isWinded ?
						<Alert
							type='warning'
							showIcon={true}
							message='You are winded.'
						/>
						: null
				}
				{
					props.immunities.length > 0 ?
						<Field label='Immunities' value={props.immunities.map(dm => `${dm.damageType} ${dm.value}`).join(', ')} />
						: null
				}
				{
					props.weaknesses.length > 0 ?
						<Field label='Weakness' value={props.weaknesses.map(dm => `${dm.damageType} ${dm.value}`).join(', ')} />
						: null
				}
			</Space>
		</ErrorBoundary>
	);
};
