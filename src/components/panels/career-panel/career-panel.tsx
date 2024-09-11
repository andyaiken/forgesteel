import { Career } from '../../../models/career';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Hero } from '../../../models/hero';
import { PanelMode } from '../../../enums/panel-mode';

import './career-panel.scss';

interface Props {
	career: Career;
	hero?: Hero;
	mode?: PanelMode;
}

export const CareerPanel = (props: Props) => {
	return (
		<div className='career-panel'>
			<div className='header-text'>{props.career.name}</div>
			<div className='description-text'>{props.career.description}</div>
			{
				props.mode === PanelMode.Full ?
					<div>
						{props.career.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} />)}
						<FeaturePanel feature={props.career.title} hero={props.hero} />
						{props.career.projectPoints > 0 ? <div className='ds-text'>Project Points: {props.career.projectPoints}</div> : null}
					</div>
					: null
			}
		</div>
	);
};
