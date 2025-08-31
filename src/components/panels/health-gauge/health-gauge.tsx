import { Divider, Progress } from 'antd';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';

import './health-gauge.scss';

interface Props {
	stamina?: {
		staminaMax: number;
		staminaDamage: number;
		state: string;
	};
	staminaTemp?: {
		staminaTemp: number;
	}
	recoveries?: {
		recoveriesMax: number;
		recoveriesUsed: number;
	}
}

export const HealthGauge = (props: Props) => {
	if (!props.stamina) {
		return null;
	}

	return (
		<ErrorBoundary>
			<div className='health-gauge'>
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
		</ErrorBoundary>
	);
};
