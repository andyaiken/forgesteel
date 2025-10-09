import { Button, Progress } from 'antd';
import { FeatureMalice, FeatureMaliceAbility } from '@/models/feature';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeaturePanel } from '../elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { ResourcePill } from '@/components/controls/pill/pill';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';

import './malice-panel.scss';

interface Props {
	malice: FeatureMalice | FeatureMaliceAbility;
	options: Options;
	currentMalice?: number
	updateCurrentMalice?: (value: number) => void;
}

export const MalicePanel = (props: Props) => {
	const cost = props.malice.type === FeatureType.MaliceAbility ? props.malice.data.ability.cost as number : props.malice.data.cost;

	return (
		<ErrorBoundary>
			<SelectablePanel key={props.malice.id}>
				<div className='malice-panel'>
					<FeaturePanel
						feature={props.malice}
						options={props.options}
						cost={cost}
						repeatable={props.malice.type === FeatureType.Malice ? props.malice.data.repeatable : undefined}
						mode={PanelMode.Full}
					/>
					{
						(props.currentMalice !== undefined) ?
							props.currentMalice >= cost ?
								<Button
									block={true}
									onClick={() => {
										if (props.updateCurrentMalice) {
											const malice = Math.max(props.currentMalice! - cost, 0);
											props.updateCurrentMalice(malice);
										}
									}}
								>
									Use
									<ResourcePill value={cost} />
								</Button>
								:
								<div className='malice-progress'>
									<Progress percent={100 * props.currentMalice / cost} steps={cost} showInfo={false} />
									<ResourcePill value={`${props.currentMalice} of ${cost}`} />
								</div>
							: null
					}
				</div>
			</SelectablePanel>
		</ErrorBoundary>
	);
};
