import { Alert, Button, Drawer, Flex, Progress, Space } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { FollowerType } from '@/enums/follower-type';
import { Format } from '@/utils/format';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLevelUpModal } from '@/components/modals/hero-level-up/hero-level-up-modal';
import { HeroLogic } from '@/logic/hero-logic';
import { Modal } from '@/components/modals/modal/modal';
import { Monster } from '@/models/monster';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Pill } from '@/components/controls/pill/pill';
import { Random } from '@/utils/random';
import { ResourceGainFrequency } from '@/enums/resource-gain-frequency';
import { RetainerSelectModal } from '@/components/modals/select/retainer-select/retainer-select-modal';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useOptions } from '@/contexts/data-context';
import { useState } from 'react';

import './hero-resources-modal.scss';

interface Expression {
	kind: 'resource' | 'surge';
	resourceID: string;
	resourceName: string;
	tag: string;
	gainIndex: number;
	throws: number;
	sides: number;
	constant: number;
	result: number | null;
}

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	onClose: () => void;
	onChange: (hero: Hero) => void;
}

export const HeroResourcesModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));
	const [ expression, setExpression ] = useState<Expression | null>(null);
	const [ showLevelUp, setShowLevelUp ] = useState<boolean>(false);
	const [ showRetainers, setShowRetainers ] = useState<boolean>(false);
	const options = useOptions();

	const gainSurges = (tag: string, value: number) => {
		const copy = Utils.copy(hero);

		copy.state.surges += value;

		const gains = HeroLogic.getAllSurgeGains(copy).map(f => f.data);
		const tags = HeroLogic.getSurgeGainTags(gains, tag);

		gains
			.filter(g => tags.has(g.tag))
			.filter(g => g.frequency !== ResourceGainFrequency.AtWill)
			.forEach(g => g.used = true);

		setHero(copy);
		props.onChange(copy);
	};

	const getGainButton = (gain: { tag: string, value: string, used: boolean }, onGain: (tag: string, value: number) => void, onRoll: (exp: Expression) => void, resourceID: string, resourceName: string, kind: 'resource' | 'surge', gainIndex: number = 0) => {
		const digits = /^\s*[+-]?\s*\d+\s*$/;
		if (digits.test(gain.value)) {
			const v = parseInt(gain.value);
			return (
				<Button className='gain-btn' disabled={gain.used} onClick={() => onGain(gain.tag, v)}>
					<div>+{gain.value}</div>
				</Button>
			);
		}

		const dice = /^(?<throws>\d+)d(?<sides>\d+)(?:\s*)(?:\+(?<constant>\d))?$/;
		const match = dice.exec(gain.value);
		if (match) {
			const exp: Expression = {
				kind: kind,
				resourceID: resourceID,
				resourceName: resourceName,
				tag: gain.tag,
				gainIndex: gainIndex,
				throws: parseInt(match.groups?.throws || '1'),
				sides: parseInt(match.groups?.sides || '3'),
				constant: parseInt(match.groups?.constant || '0'),
				result: null
			};
			return (
				<Button className='gain-btn' disabled={gain.used} onClick={() => onRoll(exp)}>
					<div>+{gain.value}</div>
				</Button>
			);
		}

		return (
			<div style={{ padding: '0 8px' }}>+{gain.value}</div>
		);
	};

	const getHeroicResourceSection = () => {
		const setHeroicResource = (featureID: string, value: number) => {
			const copy = Utils.copy(hero);
			HeroLogic.getFeatures(copy, false)
				.map(f => f.feature)
				.filter(f => f.type === FeatureType.HeroicResource)
				.filter(f => f.id === featureID)
				.forEach(f => f.data.value = value);
			setHero(copy);
			props.onChange(copy);
		};

		const gainResource = (featureID: string, tag: string, gainIndex: number, value: number) => {
			const copy = Utils.copy(hero);

			HeroLogic.getFeatures(copy, false)
				.map(f => f.feature)
				.filter(f => f.type === FeatureType.HeroicResource)
				.filter(f => f.id === featureID)
				.forEach(f => {
					f.data.value += value;
				});

			if (tag.toLowerCase().startsWith('start')) {
				// This is the hero's round boundary, so it clears every per-round gain they have -
				// surge gains and any other resource's gains included, not just this resource's
				HeroLogic.resetGains(copy, ResourceGainFrequency.OncePerRound);
			} else {
				// Gains are identified by position rather than by tag; a hero can have several
				// gains sharing a tag (each domain's gain is untagged) and only one is claimed here
				HeroLogic.getHeroicResources(copy)
					.filter(hr => hr.id === featureID)
					.flatMap(hr => hr.gains.filter((_, n) => n === gainIndex))
					.filter(g => g.frequency !== ResourceGainFrequency.AtWill)
					.forEach(g => g.used = true);
			}

			setHero(copy);
			props.onChange(copy);
		};

		const startEncounter = () => {
			const copy = Utils.copy(hero);

			HeroLogic.getFeatures(copy, false)
				.map(f => f.feature)
				.filter(f => f.type === FeatureType.HeroicResource)
				.forEach(f => f.data.value = copy.state.victories);

			HeroLogic.resetGains(copy);

			setHero(copy);
			props.onChange(copy);
		};

		const endEncounter = () => {
			const copy = Utils.copy(hero);

			HeroLogic.getFeatures(copy, false)
				.map(f => f.feature)
				.filter(f => f.type === FeatureType.HeroicResource)
				.forEach(f => f.data.value = 0);

			HeroLogic.resetGains(copy);

			copy.state.victories += 1;
			copy.state.surges = 0;
			setHero(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					HeroLogic.getHeroicResources(hero)
						.map(hr => (
							<Space key={hr.id} orientation='vertical' style={{ width: '100%' }}>
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
												hr.gains.map((g, n) => (
													<div className={g.used ? 'gain used' : 'gain'} key={n}>
														<div style={{ flex: '1 1 0' }}>{g.trigger}</div>
														{g.frequency !== ResourceGainFrequency.AtWill ? <Pill>{g.frequency}</Pill> : null}
														{getGainButton(g, (tag, value) => gainResource(hr.id, tag, n, value), setExpression, hr.id, hr.name, 'resource', n)}
													</div>
												))
											}
											{
												hr.type === 'heroic' ?
													<Flex align='center' justify='space-evenly' gap={10}>
														<Button
															key='start-encounter'
															style={{ flex: '1 1 0' }}
															className='tall-button'
															onClick={startEncounter}
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
															onClick={endEncounter}
														>
															<div>
																<div>End Encounter</div>
																<div className='subtext'>
																	+1 Victory
																</div>
															</div>
														</Button>
													</Flex>
													: null
											}
										</>
										: null
								}
							</Space>
						))
				}
				<Drawer open={!!expression} onClose={() => setExpression(null)} closeIcon={null} size={500}>
					<Modal
						content={
							expression ?
								<Space orientation='vertical' style={{ width: '100%', padding: '0 20px' }}>
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
												if (expression.kind === 'surge') {
													gainSurges(expression.tag, expression.result);
												} else {
													gainResource(expression.resourceID, expression.tag, expression.gainIndex, expression.result);
												}
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
			</Space>
		);
	};

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

		const addFollower = (type: FollowerType) => {
			const follower = FactoryLogic.feature.createFollower({
				id: Utils.guid(),
				follower: FactoryLogic.createFollower(type)
			});

			const copy = Utils.copy(hero);
			copy.features.push(follower);
			setHero(copy);
			props.onChange(copy);
		};

		const addRetainer = (monster: Monster) => {
			const retainer = FactoryLogic.feature.createRetainer({
				id: Utils.guid(),
				retainer: monster
			});

			const copy = Utils.copy(hero);
			copy.features.push(retainer);
			setHero(copy);
			props.onChange(copy);
		};

		const surgeGains = HeroLogic.getSurgeGains(hero);

		const maxCharacteristic = Math.max(...[
			HeroLogic.getCharacteristic(hero, Characteristic.Might),
			HeroLogic.getCharacteristic(hero, Characteristic.Agility),
			HeroLogic.getCharacteristic(hero, Characteristic.Reason),
			HeroLogic.getCharacteristic(hero, Characteristic.Intuition),
			HeroLogic.getCharacteristic(hero, Characteristic.Presence)
		]);

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Surges</HeaderText>
				<NumberSpin
					value={hero.state.surges}
					min={0}
					onChange={setSurges}
				/>
				{
					surgeGains.map(f => (
						<div className={f.data.used ? 'gain used' : 'gain'} key={f.id}>
							<div style={{ flex: '1 1 0' }}>
								<div>{f.data.trigger}</div>
								{
									f.data.condition ?
										<div className='gain-condition'>{f.data.condition}</div>
										: null
								}
								{
									f.description ?
										<div className='gain-description'>{f.description}</div>
										: null
								}
							</div>
							{f.data.frequency !== ResourceGainFrequency.AtWill ? <Pill>{f.data.frequency}</Pill> : null}
							{getGainButton(f.data, gainSurges, setExpression, '', 'Surges', 'surge')}
						</div>
					))
				}
				{
					hero.state.surges > 0 ?
						<Alert
							type='info'
							title={
								<>
									<div>
										Spend <b>1 - 3 surges</b> to add {maxCharacteristic} damage per surge to one target.
									</div>
									{
										hero.state.surges >= 2 ?
											<div>Spend <b>2 surges</b> to increase an ability’s potency by 1 for a single target.</div>
											: null
									}
								</>
							}
						/>
						: null
				}
				<HeaderText>Victories</HeaderText>
				<NumberSpin
					value={hero.state.victories}
					min={0}
					onChange={setVictories}
				/>
				<HeaderText>Renown</HeaderText>
				<NumberSpin
					value={hero.state.renown}
					format={() => HeroLogic.getRenown(hero).toString()}
					onChange={setRenown}
				/>
				{
					hero.features.filter(f => [ FeatureType.Follower, FeatureType.Retainer ].includes(f.type)).length < Math.floor(HeroLogic.getRenown(hero) / 3) ?
						<Alert
							type='info'
							title={
								<>
									<div>
										You can gain a follower (an artisan, a sage, or a retainer).
									</div>
									<Flex gap={10} style={{ margin: '5px 0' }}>
										<Button block={true} onClick={() => addFollower(FollowerType.Artisan)}>Add an artisan</Button>
										<Button block={true} onClick={() => addFollower(FollowerType.Sage)}>Add a sage</Button>
										<Button block={true} onClick={() => setShowRetainers(true)}>Add a retainer</Button>
									</Flex>
								</>
							}
						/>
						: null
				}
				<HeaderText>Wealth</HeaderText>
				<NumberSpin
					value={hero.state.wealth}
					format={() => HeroLogic.getWealth(hero).toString()}
					onChange={setWealth}
				/>
				<Drawer open={showRetainers} onClose={() => setShowRetainers(false)} closeIcon={null} size={500}>
					<RetainerSelectModal
						monsters={SourcebookLogic.getMonsters(props.sourcebooks)}
						sourcebooks={props.sourcebooks}
						onSelect={monster => {
							setShowRetainers(false);

							const monsterCopy = Utils.copy(monster) as Monster;
							if (monsterCopy.retainer) {
								// Retainers match hero level
								monsterCopy.retainer.level = Math.max(monsterCopy.level, hero?.class?.level || 1);
							}

							addRetainer(monsterCopy);
						}}
						onClose={() => setShowRetainers(false)}
					/>
				</Drawer>
			</Space>
		);
	};

	const getExperienceSection = () => {
		const setXP = (value: number) => {
			const copy = Utils.copy(hero);
			copy.state.xp = value;
			setHero(copy);
			props.onChange(copy);
		};

		const minXP = HeroLogic.getMinXP(hero.class!.level, options);

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>XP</HeaderText>
				<NumberSpin
					min={minXP}
					suffix={`/ ${options.xpPerLevel * hero.class!.level}`}
					value={hero.state.xp}
					onChange={setXP}
				/>
				<Flex justify='center'>
					<Progress percent={100 * (hero.state.xp - minXP) / options.xpPerLevel} steps={options.xpPerLevel} showInfo={false} />
				</Flex>
				{
					HeroLogic.canLevelUp(hero, options) ?
						<Alert
							type='info'
							showIcon={true}
							title='You have enough XP to level up.'
							action={<Button icon={<ArrowUpOutlined />} onClick={() => setShowLevelUp(true)}>Level Up</Button>}
						/>
						: null
				}
			</Space>
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
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Hero Tokens</HeaderText>
				<NumberSpin
					value={hero.state.heroTokens}
					min={0}
					onChange={setHeroTokens}
				/>
				<Alert
					type='info'
					title={
						<>
							<div>
								Hero tokens are a resource shared by your party; they typically refresh at the beginning of each game session.
							</div>
							{
								hero.state.heroTokens > 0 ?
									<Flex align='center' justify='space-between' gap={10}>
										<div>Spend a hero token to gain two surges.</div>
										<Button onClick={gainSurges}>+2 Surges</Button>
									</Flex>
									: null
							}
							{
								hero.state.heroTokens > 0 ?
									<div>
										Spend a hero token when you fail a saving throw to succeed on it instead.
									</div>
									: null
							}
							{
								hero.state.heroTokens > 0 ?
									<div>
										Spend a hero token to reroll a test. You must use the new roll.
									</div>
									: null
							}
							{
								hero.state.heroTokens >= 2 ?
									<Flex align='center' justify='space-between' gap={10}>
										<div>Spend 2 hero tokens on your turn or whenever you take damage (no action required) to regain Stamina equal to your recovery value before taking the damage.</div>
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
						</>
					}
				/>
			</Space>
		);
	};

	return (
		<Modal
			content={
				<div className='hero-resources-modal'>
					<div style={{ paddingBottom: '20px' }}>
						{getHeroicResourceSection()}
						{getStatsSection()}
						{getExperienceSection()}
						{getHeroTokenSection()}
					</div>
					<Drawer open={showLevelUp} onClose={() => setShowLevelUp(false)} closeIcon={null} size={500}>
						{
							showLevelUp ?
								<HeroLevelUpModal
									hero={hero}
									soucebooks={props.sourcebooks}
									onAccept={h => {
										setShowLevelUp(false);
										setHero(h);
										props.onChange(h);
									}}
									onClose={() => setShowLevelUp(false)}
								/>
								: null
						}
					</Drawer>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
