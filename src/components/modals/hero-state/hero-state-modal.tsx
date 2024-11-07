import { Alert, Button, Divider, Flex, Tabs } from 'antd';
import { Condition, Hero } from '../../../models/hero';
import { ConditionEndType, ConditionType } from '../../../enums/condition-type';
import { Characteristic } from '../../../enums/characteristic';
import { ConditionPanel } from '../../panels/condition-panel/condition-panel';
import { DropdownButton } from '../../controls/dropdown-button/dropdown-button';
import { HeroLogic } from '../../../logic/hero-logic';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './hero-state-modal.scss';

interface Props {
	hero: Hero;
	onChange: (hero: Hero) => void;
}

export const HeroStateModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(JSON.parse(JSON.stringify(props.hero)));

	const onChange = (field: string, value: number) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		const state = copy.state as unknown;
		(state as { [field: string]: unknown })[field] = value;
		setHero(copy);
		props.onChange(copy);
	};

	const startEncounter = () => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.heroicResource = copy.state.victories;
		setHero(copy);
		props.onChange(copy);
	};

	const endEncounter = () => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.heroicResource = 0;
		copy.state.victories += 1;
		setHero(copy);
		props.onChange(copy);
	};

	const endRespite = () => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.staminaDamage = 0;
		copy.state.recoveriesUsed = 0;
		copy.state.xp = copy.state.victories;
		copy.state.victories = 0;
		setHero(copy);
		props.onChange(copy);
	};

	const spendRecovery = () => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.recoveriesUsed += 1;
		copy.state.staminaDamage = Math.max(copy.state.staminaDamage - HeroLogic.getRecoveryValue(hero), 0);
		setHero(copy);
		props.onChange(copy);
	};

	const addCondition = (type: ConditionType) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.conditions.push({
			id: Utils.guid(),
			type: type,
			ends: ConditionEndType.EndOfTurn,
			resistCharacteristic: Characteristic.Might
		});
		setHero(copy);
		props.onChange(copy);
	};

	const editCondition = (condition: Condition) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		const index = copy.state.conditions.findIndex(c => c.id === condition.id);
		if (index !== -1) {
			copy.state.conditions[index] = condition;
			setHero(copy);
			props.onChange(copy);
		}
	};

	const deleteCondition = (condition: Condition) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.conditions = copy.state.conditions.filter(c => c.id !== condition.id);
		setHero(copy);
		props.onChange(copy);
	};

	const getHeroSection = () => {
		return (
			<div>
				<NumberSpin
					label={hero.class ? hero.class.heroicResource : 'Heroic Resource'}
					value={hero.state.heroicResource}
					min={0}
					onChange={value => onChange('heroicResource', value)}
				/>
				<NumberSpin
					label='Victories'
					value={hero.state.victories}
					min={0}
					onChange={value => onChange('victories', value)}
				/>
				<Flex align='center' justify='space-between' gap='5px'>
					<Button
						className='tall-button'
						type='primary'
						block={true}
						onClick={startEncounter}
					>
						<div>
							<div>Start of Encounter</div>
							<div className='subtext'>
								Victories to {hero.class ? hero.class.heroicResource : 'Heroic Resource'}
							</div>
						</div>
					</Button>
					<Button
						className='tall-button'
						type='primary'
						block={true}
						onClick={endEncounter}
					>
						<div>
							<div>End of Encounter</div>
							<div className='subtext'>
								Gain a Victory
							</div>
						</div>
					</Button>
				</Flex>
				<Divider />
				<NumberSpin
					label='Damage Taken'
					value={hero.state.staminaDamage}
					min={0}
					onChange={value => onChange('staminaDamage', value)}
				/>
				<NumberSpin
					label='Recoveries Used'
					value={hero.state.recoveriesUsed}
					min={0}
					max={HeroLogic.getRecoveries(hero)}
					onChange={value => onChange('recoveriesUsed', value)}
				/>
				{
					hero.state.staminaDamage >= (HeroLogic.getStamina(hero) / 2) ?
						<Alert style={{ margin: '10px 0' }} type='warning' showIcon={true} message='You are winded.' />
						: null
				}
				<Flex align='center' justify='space-between' gap='5px'>
					<Button
						className='tall-button'
						type='primary'
						block={true}
						disabled={(hero.state.staminaDamage === 0) || (hero.state.recoveriesUsed >= HeroLogic.getRecoveries(hero))}
						onClick={spendRecovery}
					>
						<div>
							<div>Spend a Recovery</div>
							<div className='subtext'>
								Regain {HeroLogic.getRecoveryValue(hero)} Stamina
							</div>
						</div>
					</Button>
					<Button
						className='tall-button'
						type='primary'
						block={true}
						onClick={endRespite}
					>
						<div>
							<div>Take a Respite</div>
							<div className='subtext'>
								24 hours of rest
							</div>
						</div>
					</Button>
				</Flex>
			</div>
		);
	};

	const getStatisticsSection = () => {
		return (
			<div>
				<NumberSpin
					label='XP'
					value={hero.state.xp}
					min={0}
					onChange={value => onChange('xp', value)}
				/>
				<NumberSpin
					label='Renown'
					value={hero.state.renown}
					min={0}
					onChange={value => onChange('renown', value)}
				/>
				<NumberSpin
					label='Hero Tokens'
					value={hero.state.heroTokens}
					min={0}
					onChange={value => onChange('heroTokens', value)}
				/>
				<NumberSpin
					label='Project Points'
					value={hero.state.projectPoints}
					min={0}
					step={5}
					onChange={value => onChange('projectPoints', value)}
				/>
			</div>
		);
	};

	const getConditionsSection = () => {
		return (
			<div>
				{
					hero.state.conditions.map(c => (
						<ConditionPanel
							key={c.id}
							condition={c}
							onChange={editCondition}
							onDelete={deleteCondition}
						/>
					))
				}
				<DropdownButton
					label='Add a new condition'
					items={[
						ConditionType.Bleeding,
						ConditionType.Dazed,
						ConditionType.Frightened,
						ConditionType.Grabbed,
						ConditionType.Prone,
						ConditionType.Restrained,
						ConditionType.Slowed,
						ConditionType.Taunted,
						ConditionType.Weakened
					].map(ct => ({ key: ct, label: ct }))}
					onClick={key => addCondition(key as ConditionType)}
				/>
			</div>
		);
	};

	try {
		return (
			<div className='hero-state-modal'>
				<Tabs
					items={[
						{
							key: '1',
							label: 'Hero',
							children: getHeroSection()
						},
						{
							key: '2',
							label: 'Statistics',
							children: getStatisticsSection()
						},
						{
							key: '3',
							label: 'Conditions',
							children: getConditionsSection()
						}
					]}
				/>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
