import { Divider, Progress } from 'antd';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';

import './health-panel.scss';

interface Props {
	hero: Hero;
}

export const HealthPanel = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='health-panel'>
				{
					props.hero.state.staminaTemp > 0 ?
						<Progress
							className='stamina-temp-progress'
							type='dashboard'
							percent={100 * props.hero.state.staminaTemp / HeroLogic.getStamina(props.hero)}
							showInfo={false}
							status='active'
						/>
						: null
				}
				<Progress
					className='stamina-progress'
					type='dashboard'
					percent={100 * (HeroLogic.getStamina(props.hero) - props.hero.state.staminaDamage) / HeroLogic.getStamina(props.hero)}
					showInfo={false}
					status={HeroLogic.isWinded(props.hero) ? 'exception' : 'active'}
				/>
				<Progress
					className='recovery-progress'
					type='dashboard'
					percent={100 * (HeroLogic.getRecoveries(props.hero) - props.hero.state.recoveriesUsed) / HeroLogic.getRecoveries(props.hero)}
					showInfo={false}
					status='active'
				/>
				<div className='gauge-info'>
					{
						props.hero.state.staminaTemp > 0 ?
							<>
								<div>
									Tmp <b>{props.hero.state.staminaTemp}</b>
								</div>
								<Divider style={{ margin: '5px 0' }} />
							</>
							: null
					}
					<div>
						Sta <b>{props.hero.state.staminaDamage ? `${HeroLogic.getStamina(props.hero) - props.hero.state.staminaDamage} / ${HeroLogic.getStamina(props.hero)}` : `${HeroLogic.getStamina(props.hero)}`}</b>
					</div>
					<Divider style={{ margin: '5px 0' }} />
					<div>
						Rec <b>{props.hero.state.recoveriesUsed ? `${HeroLogic.getRecoveries(props.hero) - props.hero.state.recoveriesUsed} / ${HeroLogic.getRecoveries(props.hero)}` : `${HeroLogic.getRecoveries(props.hero)}`}</b>
					</div>
				</div>
			</div>
		</ErrorBoundary>
	);
};
