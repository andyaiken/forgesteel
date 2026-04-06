import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Flex, Statistic } from 'antd';
import { Characteristic } from '@/enums/characteristic';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FormatLogic } from '@/logic/format-logic';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroModalType } from '@/enums/hero-modal-type';
import { Options } from '@/models/options';
import { StatsRow } from '@/components/panels/stats-row/stats-row';
import { useIsSmall } from '@/hooks/use-is-small';

import './stats-panel.scss';

interface Props {
	hero: Hero;
	options: Options;
	onSelectCharacteristic: (characteristic: Characteristic) => void;
	onShowState: (type: HeroModalType) => void;
}

export const StatsPanel = (props: Props) => {
	const isSmall = useIsSmall();

	const useRows = props.options.compactView;

	const xpSuffix = HeroLogic.canLevelUp(props.hero, props.options) ? <ArrowUpOutlined /> : undefined;

	const size = HeroLogic.getSize(props.hero);
	const sizeSuffix = size.mod || undefined;

	const speed = HeroLogic.getSpeed(props.hero);
	const speedSuffix = HeroLogic.getSpeedModified(props.hero) ? <ArrowDownOutlined /> : undefined;
	const speedStr = speed.modes.length === 0 ? 'Speed' : `Speed (${FormatLogic.getSpeedModes(speed.modes).toLowerCase()})`;

	const maxStamina = HeroLogic.getStamina(props.hero);
	const stamina = props.hero.state.staminaDamage === 0 ? maxStamina : maxStamina - props.hero.state.staminaDamage;
	const staminaSuffix = props.hero.state.staminaDamage === 0 ? null : `/ ${maxStamina}`;

	const maxRecoveries = HeroLogic.getRecoveries(props.hero);
	const recoveries = props.hero.state.recoveriesUsed === 0 ? maxRecoveries : maxRecoveries - props.hero.state.recoveriesUsed;
	const recoveriesSuffix = props.hero.state.recoveriesUsed === 0 ? null : `/ ${maxRecoveries}`;

	return (
		<ErrorBoundary>
			<div className='stats-section'>
				<Flex gap={10}>
					<StatsRow caption={isSmall ? 'M' : 'Might'} onClick={() => props.onSelectCharacteristic(Characteristic.Might)} style={{ flex: '1 1 0' }}>
						<Statistic value={HeroLogic.getCharacteristic(props.hero, Characteristic.Might)} />
					</StatsRow>
					<StatsRow caption={isSmall ? 'A' : 'Agility'} onClick={() => props.onSelectCharacteristic(Characteristic.Agility)} style={{ flex: '1 1 0' }}>
						<Statistic value={HeroLogic.getCharacteristic(props.hero, Characteristic.Agility)} />
					</StatsRow>
					<StatsRow caption={isSmall ? 'R' : 'Reason'} onClick={() => props.onSelectCharacteristic(Characteristic.Reason)} style={{ flex: '1 1 0' }}>
						<Statistic value={HeroLogic.getCharacteristic(props.hero, Characteristic.Reason)} />
					</StatsRow>
					<StatsRow caption={isSmall ? 'I' : 'Intuition'} onClick={() => props.onSelectCharacteristic(Characteristic.Intuition)} style={{ flex: '1 1 0' }}>
						<Statistic value={HeroLogic.getCharacteristic(props.hero, Characteristic.Intuition)} />
					</StatsRow>
					<StatsRow caption={isSmall ? 'P' : 'Presence'} onClick={() => props.onSelectCharacteristic(Characteristic.Presence)} style={{ flex: '1 1 0' }}>
						<Statistic value={HeroLogic.getCharacteristic(props.hero, Characteristic.Presence)} />
					</StatsRow>
				</Flex>
				{
					useRows ?
						<>
							<div className='selectable-row clickable' onClick={() => props.onShowState(HeroModalType.Resources)}>
								{
									HeroLogic.getHeroicResources(props.hero).map(hr => (
										<div key={hr.id}>{hr.name}: <b>{hr.value}</b></div>
									))
								}
								<div>Surges: <b>{props.hero.state.surges}</b></div>
								<div>Victories: <b>{props.hero.state.victories}</b></div>
								<div>XP: <b>{props.hero.state.xp}</b></div>
								<div>Renown: <b>{HeroLogic.getRenown(props.hero)}</b></div>
								<div>Wealth: <b>{HeroLogic.getWealth(props.hero)}</b></div>
							</div>
							<div className='selectable-row'>
								<div>Size: <b>{FormatLogic.getSize(size)}</b></div>
								<div>{speedStr}: <b>{speed.value}</b></div>
								<div>Stability: <b>{HeroLogic.getStability(props.hero)}</b></div>
								<div>Disengage: <b>{HeroLogic.getDisengage(props.hero)}</b></div>
								<div>Save: <b>{HeroLogic.getSaveThreshold(props.hero)}</b></div>
							</div>
							<div className='selectable-row clickable' onClick={() => props.onShowState(HeroModalType.Vitals)}>
								<div>Stamina: <b>{stamina}</b></div>
								<div>Recoveries: <b>{recoveries}</b></div>
								<div>Recovery Value: <b>{HeroLogic.getRecoveryValue(props.hero)}</b></div>
							</div>
						</>
						:
						<>
							<StatsRow caption='Resources' onClick={() => props.onShowState(HeroModalType.Resources)}>
								{
									HeroLogic.getHeroicResources(props.hero).map(hr => (
										<Statistic key={hr.id} title={hr.name} value={hr.value} />
									))
								}
								<Statistic title='Surges' value={props.hero.state.surges} />
								<Statistic title='Victories' value={props.hero.state.victories} />
								<Statistic title='XP' value={props.hero.state.xp} suffix={xpSuffix} />
								<Statistic title='Renown' value={HeroLogic.getRenown(props.hero)} />
								<Statistic title='Wealth' value={HeroLogic.getWealth(props.hero)} />
							</StatsRow>
							<Flex gap={10}>
								<StatsRow caption='Statistics' style={{ flex: '5 5 0' }}>
									<Statistic title='Size' value={size.value} suffix={sizeSuffix} />
									<Statistic title={speedStr} value={speed.value} suffix={speedSuffix} />
									<Statistic title='Stability' value={HeroLogic.getStability(props.hero)} />
									<Statistic title='Disengage' value={HeroLogic.getDisengage(props.hero)} />
									<Statistic title='Save' value={HeroLogic.getSaveThreshold(props.hero)} suffix={HeroLogic.getSaveBonus(props.hero) ? `+${HeroLogic.getSaveBonus(props.hero)}` : undefined} />
								</StatsRow>
								<StatsRow caption='Vitals' onClick={() => props.onShowState(HeroModalType.Vitals)} style={{ flex: '3 3 0' }}>
									<Statistic title='Stamina' value={stamina} suffix={staminaSuffix} />
									<Statistic title='Recoveries' value={recoveries} suffix={recoveriesSuffix} />
									<Statistic title='Recovery Value' value={HeroLogic.getRecoveryValue(props.hero)} />
								</StatsRow>
							</Flex>
						</>
				}
			</div>
		</ErrorBoundary>
	);
};
