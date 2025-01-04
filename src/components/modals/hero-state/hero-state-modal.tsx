import { Alert, Button, Divider, Flex, Space, Tabs } from 'antd';
import { Condition, Hero } from '../../../models/hero';
import { ConditionEndType, ConditionType } from '../../../enums/condition-type';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Characteristic } from '../../../enums/characteristic';
import { ConditionPanel } from '../../panels/condition/condition-panel';
import { DropdownButton } from '../../controls/dropdown-button/dropdown-button';
import { HeroLogic } from '../../../logic/hero-logic';
import { Modal } from '../modal/modal';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './hero-state-modal.scss';

interface Props {
	hero: Hero;
	startPage: 'hero' | 'stats' | 'conditions';
	onChange: (hero: Hero) => void;
	onLevelUp: () => void;
}

export const HeroStateModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(JSON.parse(JSON.stringify(props.hero)));

	const setHeroicResource = (value: number) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.heroicResource = value;
		setHero(copy);
		props.onChange(copy);
	};

	const setSurges = (value: number) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.surges = value;
		setHero(copy);
		props.onChange(copy);
	};

	const setVictories = (value: number) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.victories = value;
		setHero(copy);
		props.onChange(copy);
	};

	const setXP = (value: number) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.xp = value;
		setHero(copy);
		props.onChange(copy);
	};

	const setStaminaDamage = (value: number) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.staminaDamage = value;
		setHero(copy);
		props.onChange(copy);
	};

	const setRecoveriesUsed = (value: number) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.recoveriesUsed = value;
		setHero(copy);
		props.onChange(copy);
	};

	const setHeroTokens = (value: number) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.heroTokens = value;
		setHero(copy);
		props.onChange(copy);
	};

	const setRenown = (value: number) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.renown = value;
		setHero(copy);
		props.onChange(copy);
	};

	const setWealth = (value: number) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.wealth = value;
		setHero(copy);
		props.onChange(copy);
	};

	const setProjectPoints = (value: number) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.projectPoints = value;
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
			<Space direction='vertical' style={{ width: '100%' }}>
				<NumberSpin
					label={hero.class ? hero.class.heroicResource : 'Heroic Resource'}
					value={hero.state.heroicResource}
					min={0}
					onChange={setHeroicResource}
				/>
				<NumberSpin
					label='Surges'
					value={hero.state.surges}
					min={0}
					onChange={setSurges}
				/>
				<NumberSpin
					label='Victories'
					value={hero.state.victories}
					min={0}
					onChange={setVictories}
				/>
				<NumberSpin
					label='XP'
					value={hero.state.xp}
					min={0}
					onChange={setXP}
				/>
				{
					HeroLogic.canLevelUp(hero) ?
						<Alert
							style={{ margin: '10px 0' }}
							type='info'
							showIcon={true}
							message='You have enough XP to level up.'
							action={<Button title='Level Up' type='text' icon={<ArrowUpOutlined />} onClick={props.onLevelUp} />}
						/>
						: null
				}
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
					onChange={setStaminaDamage}
				/>
				<NumberSpin
					label='Recoveries Used'
					value={hero.state.recoveriesUsed}
					min={0}
					max={HeroLogic.getRecoveries(hero)}
					onChange={setRecoveriesUsed}
				/>
				{
					hero.state.staminaDamage >= (HeroLogic.getStamina(hero) / 2) ?
						<Alert
							style={{ margin: '10px 0' }}
							type='warning'
							showIcon={true}
							message='You are winded.'
						/>
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
			</Space>
		);
	};

	const getStatisticsSection = () => {
		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<NumberSpin
					label='Hero Tokens'
					value={hero.state.heroTokens}
					min={0}
					onChange={setHeroTokens}
				/>
				<NumberSpin
					label='Renown'
					value={hero.state.renown}
					min={0}
					onChange={setRenown}
				/>
				<NumberSpin
					label='Wealth'
					value={hero.state.wealth}
					min={1}
					onChange={setWealth}
				/>
				<NumberSpin
					label='Project Points'
					value={hero.state.projectPoints}
					min={0}
					steps={[ 5 ]}
					onChange={setProjectPoints}
				/>
			</Space>
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
					].map(ct => ({ key: ct, label: <div className='ds-text centered-text'>{ct}</div> }))}
					onClick={key => addCondition(key as ConditionType)}
				/>
			</div>
		);
	};

	try {
		return (
			<Modal
				content={
					<div className='hero-state-modal'>
						<Tabs
							items={[
								{
									key: 'hero',
									label: 'Hero',
									children: getHeroSection()
								},
								{
									key: 'stats',
									label: 'Statistics',
									children: getStatisticsSection()
								},
								{
									key: 'conditions',
									label: 'Conditions',
									children: getConditionsSection()
								}
							]}
							defaultActiveKey={props.startPage}
						/>
					</div>
				}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
