import { Feature } from '../../../models/feature';
import { FeaturePanel } from '../../panels/elements/feature-panel/feature-panel';
import { Hero } from '../../../models/hero';
import { Modal } from '../modal/modal';
import { Options } from '../../../models/options';
import { PanelMode } from '../../../enums/panel-mode';
import { Sourcebook } from '../../../models/sourcebook';

import './feature-modal.scss';

interface Props {
	feature: Feature;
	hero: Hero;
	options: Options;
	sourcebooks: Sourcebook[];
	onClose: () => void;
}

export const FeatureModal = (props: Props) => {
	try {
		return (
			<Modal
				content={
					<div className='feature-modal'>
						<FeaturePanel
							feature={props.feature}
							options={props.options}
							hero={props.hero}
							sourcebooks={props.sourcebooks}
							mode={PanelMode.Full}
						/>
					</div>
				}
				onClose={props.onClose}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
