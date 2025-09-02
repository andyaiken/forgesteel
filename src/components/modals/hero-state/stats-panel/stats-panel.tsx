import { Alert, Button, Divider, Drawer, Flex, Space, notification } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { Format } from '../../../../utils/format';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroLogic } from '../../../../logic/hero-logic';
import { Modal } from '../../modal/modal';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Random } from '../../../../utils/random';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './stats-panel.scss';

interface Expression {
	resourceID: string;
	resourceName: string;
	throws: number;
	sides: number;
	constant: number;
	result: number | null;
}

interface Props {
	hero: Hero;
	onChange: (hero: Hero) => void;
	onLevelUp?: (hero: Hero) => void;
}

export const StatsPanel = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));
	const [ respiteVisible, setRespiteVisible ] = useState<boolean>(false);
	const [ expression, setExpression ] = useState<Expression | null>(null);
	const [ notify, notifyContext ] = notification.useNotification();

	const getStatsSection = () => {
		const setSurges = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.surges = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setVictories = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.victories = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setXP = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.xp = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setRenown = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.renown = value;
			setHero(copy);
			props.onChange(copy);
		};

		const setWealth = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.wealth = value;
			setHero(copy);
			props.onChange(copy);
		};

		const levelUp = () => {
			if (props.onLevelUp) {
				const copy = Utils.copy(hero);
				if (copy.class) {
					while (HeroLogic.canLevelUp(copy)) {
						copy.class.level += 1;
					}
				}
				setHero(copy);
				props.onLevelUp(copy);
			}
		};

		const takeRespite = () => {
			const copy = Utils.copy(hero);
			HeroLogic.takeRespite(copy);
			setHero(copy);
			props.onChange(copy);

			notify.info({
				message: 'Respite',
				description: 'You\'ve taken a respite. Your hero\'s stats have been reset.',
				placement: 'top'
			});
		};

		return (
			<>
				<Flex gap={20}>
					<Space direction='vertical' style={{ flex: '1 1 0' }}>
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
					</Space>
					<Space direction='vertical' style={{ flex: '1 1 0' }}>
						<NumberSpin
							label='Renown'
							value={hero.state.renown}
							format={() => HeroLogic.getRenown(hero).toString()}
							onChange={setRenown}
						/>
						<NumberSpin
							label='Wealth'
							value={hero.state.wealth}
							format={() => HeroLogic.getWealth(hero).toString()}
							onChange={setWealth}
						/>
						<Button className='tall-button' block={true} onClick={() => setRespiteVisible(true)}>
							Respite
						</Button>
					</Space>
				</Flex>
				{
					hero.state.surges > 0 ?
						<Alert
							type='info'
							message={
								<>
									<div className='alert-text'>
										Spend <b>1 - 3 surges</b> to add {hero.class ? Math.max(...hero.class.characteristics.map(ch => ch.value)) : 0} damage per surge to one target.
									</div>
									{hero.state.surges >= 2 ? <div className='alert-text'>Spend <b>2 surges</b> to increase an ability’s potency by 1 for a single target.</div> : null}
								</>
							}
						/>
						: null
				}
				{
					HeroLogic.canLevelUp(hero) ?
						<Alert
							type='info'
							showIcon={true}
							message='You have enough XP to level up.'
							action={props.onLevelUp ? <Button type='text' title='Level Up' icon={<ArrowUpOutlined />} onClick={levelUp} /> : null}
						/>
						: null
				}
				<Drawer open={respiteVisible} onClose={() => setRespiteVisible(false)} closeIcon={null} width='500px'>
					<Modal
						content={
							<Space direction='vertical' style={{ width: '100%', padding: '0 20px' }}>
								<HeaderText>Respite</HeaderText>
								<div className='ds-text'>
									Taking a respite has the following effects:
								</div>
								<ul>
									<li>
										Your Stamina and Recoveries are reset (and any temporary Stamina goes away)
									</li>
									<li>
										Your Victories are turned into XP
									</li>
									<li>
										Any conditions affecting you are removed
									</li>
								</ul>
								<div className='ds-text'>
									During a respite you can take one respite action. Standard respite actions are:
								</div>
								<ul>
									<li>
										Make a project roll
									</li>
									<li>
										Change your kit / prayer / enchantment / augmentation / ward
									</li>
									<li>
										Attract followers (for every 3 renown, you can have 1 follower)
									</li>
								</ul>
								<Divider />
								<Button
									key='take-respite'
									block={true}
									className='tall-button'
									onClick={takeRespite}
								>
									<div>
										<div>Take a Respite</div>
										<div className='subtext'>
											24 hours of rest
										</div>
									</div>
								</Button>
							</Space>
						}
						onClose={() => setRespiteVisible(false)}
					/>
				</Drawer>
			</>
		);
	};

	const getHeroicResourceSection = () => {
		const setHeroicResource = (featureID: string, value: number) => {
			const copy = Utils.copy(hero);
			HeroLogic.getFeatures(copy)
				.map(f => f.feature)
				.filter(f => f.type === FeatureType.HeroicResource)
				.filter(f => f.id === featureID)
				.forEach(f => f.data.value = value);
			setHero(copy);
			props.onChange(copy);
		};

		const gainResource = (featureID: string, value: number) => {
			const copy = Utils.copy(hero);
			HeroLogic.getFeatures(copy)
				.map(f => f.feature)
				.filter(f => f.type === FeatureType.HeroicResource)
				.filter(f => f.id === featureID)
				.forEach(f => {
					f.data.value += value;
				});
			setHero(copy);
			props.onChange(copy);
		};

		const startEncounter = (featureID: string) => {
			const copy = Utils.copy(hero);

			HeroLogic.getFeatures(copy)
				.map(f => f.feature)
				.filter(f => f.type === FeatureType.HeroicResource)
				.filter(f => f.id === featureID)
				.forEach(f => f.data.value = copy.state.victories);

			setHero(copy);
			props.onChange(copy);
		};

		const endEncounter = (featureID: string) => {
			const copy = Utils.copy(hero);

			HeroLogic.getFeatures(copy)
				.map(f => f.feature)
				.filter(f => f.type === FeatureType.HeroicResource)
				.filter(f => f.id === featureID)
				.forEach(f => f.data.value = 0);

			copy.state.victories += 1;
			copy.state.surges = 0;
			setHero(copy);
			props.onChange(copy);
		};

		return (
			<>
				{
					HeroLogic.getHeroicResources(hero)
						.map(hr => (
							<Space key={hr.id} direction='vertical' style={{ width: '100%' }}>
								<HeaderText>{Format.capitalize(hr.type)} Resource: {hr.name}</HeaderText>
								<NumberSpin
									value={hr.value}
									min={hr.canBeNegative ? undefined : 0}
									onChange={value => setHeroicResource(hr.id, value)}
								/>
								{
									hr.gains.length > 0 ?
										<>
											{
												hr.gains.map((g, n) => {
													let btn = (
														<div style={{ padding: '0 8px' }}>+{g.value}</div>
													);
													const digits = /^\s*[+-]?\s*\d+\s*$/;
													if (digits.test(g.value)) {
														const v = parseInt(g.value);
														btn = (
															<Button className='gain-btn' onClick={() => gainResource(hr.id, v)}>
																+{g.value}
															</Button>
														);
													}
													const dice = /^(?<throws>\d+)d(?<sides>\d+)(?:\s*)(?:\+(?<constant>\d))?$/;
													const match = dice.exec(g.value);
													if (match) {
														const exp: Expression = {
															resourceID: hr.id,
															resourceName: hr.name,
															throws: parseInt(match.groups?.throws || '1'),
															sides: parseInt(match.groups?.sides || '3'),
															constant: parseInt(match.groups?.constant || '0'),
															result: null
														};
														btn = (
															<Button className='gain-btn' onClick={() => setExpression(exp)}>
																+{g.value}
															</Button>
														);
													}

													return (
														<Flex key={n} align='center' justify='space-between' gap={10}>
															<div className='ds-text compact-text'>{g.trigger}</div>
															{btn}
														</Flex>
													);
												})
											}
											<Flex align='center' justify='space-evenly' gap={10}>
												<Button
													key='start-encounter'
													style={{ flex: '1 1 0' }}
													className='tall-button'
													onClick={() => startEncounter(hr.id)}
												>
													<div>
														<div>Start Encounter</div>
														<div className='subtext'>
															Victories to {hr.name || 'Heroic Resource'}
														</div>
													</div>
												</Button>
												<Button
													key='end-encounter'
													style={{ flex: '1 1 0' }}
													className='tall-button'
													onClick={() => endEncounter(hr.id)}
												>
													<div>
														<div>End Encounter</div>
														<div className='subtext'>
															+1 Victory
														</div>
													</div>
												</Button>
											</Flex>
										</>
										: null
								}
							</Space>
						))
				}
				<Drawer open={!!expression} onClose={() => setExpression(null)} closeIcon={null} width='500px'>
					<Modal
						content={
							expression ?
								<Space direction='vertical' style={{ width: '100%', padding: '0 20px' }}>
									<HeaderText level={1}>
										Roll
									</HeaderText>
									<div className='expression'>
										<div className='expression-result'>
											{
												expression.result === null ?
													expression.constant !== 0 ?
														`+${expression.throws}d${expression.sides} +${expression.constant} ${expression.resourceName}`
														:
														`+${expression.throws}d${expression.sides} ${expression.resourceName}`
													:
													`+${expression.result}`
											}
										</div>
									</div>
									<Button
										block={true}
										onClick={() => {
											const copy = Utils.copy(expression);
											copy.result = Random.dieRoll(copy.throws, copy.sides) + copy.constant;
											setExpression(copy);
										}}
									>
										Roll
									</Button>
									<Button
										block={true}
										className='tall-button'
										type='primary'
										disabled={expression.result === null}
										onClick={() => {
											if (expression.result !== null) {
												gainResource(expression.resourceID, expression.result);
												setExpression(null);
											}
										}}
									>
										Gain {expression.result || 0} {expression.resourceName}
									</Button>
								</Space>
								: null
						}
						onClose={() => setExpression(null)}
					/>
				</Drawer>
			</>
		);
	};

	const getHeroTokenSection = () => {
		const setHeroTokens = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.heroTokens = value;
			setHero(copy);
			props.onChange(copy);
		};

		const gainSurges = () => {
			const copy = Utils.copy(hero);
			copy.state.heroTokens -= 1;
			copy.state.surges += 2;
			setHero(copy);
			props.onChange(copy);
		};

		const gainStamina = () => {
			const copy = Utils.copy(hero);
			copy.state.heroTokens -= 2;
			copy.state.staminaDamage = Math.max(copy.state.staminaDamage - HeroLogic.getRecoveryValue(copy), 0);
			setHero(copy);
			props.onChange(copy);
		};

		return (
			<>
				<HeaderText>Hero Tokens</HeaderText>
				<NumberSpin
					value={hero.state.heroTokens}
					min={0}
					onChange={setHeroTokens}
				/>
				<Alert
					type='info'
					message={
						<Space direction='vertical'>
							<div className='alert-text'>
								Hero tokens are a resource shared by your party; they typically refresh at the beginning of each game session.
							</div>
							{
								hero.state.heroTokens > 0 ?
									<Flex align='center' justify='space-between' gap={10}>
										<div className='alert-text'>Spend a hero token to gain two surges.</div>
										<Button onClick={gainSurges}>+2 Surges</Button>
									</Flex>
									: null
							}
							{
								hero.state.heroTokens > 0 ?
									<div className='alert-text'>
										Spend a hero token when you fail a saving throw to succeed on it instead.
									</div>
									: null
							}
							{
								hero.state.heroTokens > 0 ?
									<div className='alert-text'>
										Spend a hero token to reroll a test. You must use the new roll.
									</div>
									: null
							}
							{
								hero.state.heroTokens >= 2 ?
									<Flex align='center' justify='space-between' gap={10}>
										<div className='alert-text'>Spend 2 hero tokens on your turn or whenever you take damage (no action required) to regain Stamina equal to your Recovery value without spending a Recovery.</div>
										<div>
											<Field
												innerStyle={{ color: 'rgba(0, 0, 0, 0.88)' }}
												orientation='vertical'
												label='Stamina'
												value={`${HeroLogic.getStamina(hero) - hero.state.staminaDamage} / ${HeroLogic.getStamina(hero)}`}
											/>
											<Button disabled={hero.state.staminaDamage === 0} onClick={gainStamina}>+{HeroLogic.getRecoveryValue(hero)} Stamina</Button>
										</div>
									</Flex>
									: null
							}
						</Space>
					}
				/>
			</>
		);
	};

	return (
		<div className='stats-panel'>
			{getStatsSection()}
			{getHeroicResourceSection()}
			{getHeroTokenSection()}
			{notifyContext}
		</div>
	);
};
