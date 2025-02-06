import { Divider, Progress } from 'antd';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';

import './health-panel.scss';

interface Props {
	hero: Hero;
}

export const HealthPanel = (props: Props) => {
	return (
		<div className='health-panel'>
			<Progress
				className='stamina-progress'
				type='dashboard'
				percent={100 * (HeroLogic.getStamina(props.hero) - props.hero.state.staminaDamage) / HeroLogic.getStamina(props.hero)}
				showInfo={false}
				status='active'
			/>
			<Progress
				className='recovery-progress'
				type='dashboard'
				percent={100 * (HeroLogic.getRecoveries(props.hero) - props.hero.state.recoveriesUsed) / HeroLogic.getRecoveries(props.hero)}
				showInfo={false}
				status='active'
			/>
			<div className='gauge-info'>
				<div>
					Sta <b>{props.hero.state.staminaDamage ? `${HeroLogic.getStamina(props.hero) - props.hero.state.staminaDamage} / ${HeroLogic.getStamina(props.hero)}` : `${HeroLogic.getStamina(props.hero)}`}</b>
				</div>
				<Divider style={{ margin: '5px 0' }} />
				<div>
					Rec <b>{props.hero.state.recoveriesUsed ? `${HeroLogic.getRecoveries(props.hero) - props.hero.state.recoveriesUsed} / ${HeroLogic.getRecoveries(props.hero)}` : `${HeroLogic.getRecoveries(props.hero)}`}</b>
				</div>
			</div>
		</div>
	);
};
