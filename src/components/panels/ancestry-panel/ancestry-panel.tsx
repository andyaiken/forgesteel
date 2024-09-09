import { Ancestry } from '../../../models/ancestry';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { PanelMode } from '../../../enums/panel-mode';

import './ancestry-panel.scss';

interface Props {
	ancestry: Ancestry;
	mode?: PanelMode;
}

export const AncestryPanel = (props: Props) => {
	return (
		<div className='ancestry-panel'>
			<div className='header-text'>{props.ancestry.name}</div>
			<div className='description-text'>{props.ancestry.description}</div>
			{
				props.mode === PanelMode.Full ?
					<div>
						<div className='ds-text'>Size: {props.ancestry.size.value}{props.ancestry.size.mod}</div>
						<div className='ds-text'>Speed: {props.ancestry.speed}</div>
						{props.ancestry.features.map(f => <FeaturePanel key={f.id} feature={f} settingID='' />)}
					</div>
					: null
			}
		</div>
	);
};
