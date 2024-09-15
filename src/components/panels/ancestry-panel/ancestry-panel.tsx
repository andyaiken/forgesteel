import { Ancestry } from '../../../models/ancestry';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { PanelMode } from '../../../enums/panel-mode';

import './ancestry-panel.scss';

interface Props {
	ancestry: Ancestry;
	hero?: Hero;
	mode?: PanelMode;
}

export const AncestryPanel = (props: Props) => {
	try {
		return (
			<div className='ancestry-panel'>
				<HeaderText>{props.ancestry.name}</HeaderText>
				<div className='description-text'>{props.ancestry.description}</div>
				{
					props.mode === PanelMode.Full ?
						<div>
							<Field label='Size' value={HeroLogic.getSize(props.ancestry.size)} />
							<Field label='Speed' value={props.ancestry.speed} />
							{props.ancestry.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} />)}
						</div>
						:
						<Field label='Features' value={props.ancestry.features.map(f => f.name).join(', ')} />
				}
			</div>
		);
	} catch {
		return null;
	}
};
