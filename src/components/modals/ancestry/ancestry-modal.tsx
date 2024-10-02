import { Ancestry } from '../../../models/ancestry';
import { AncestryPanel } from '../../panels/ancestry-panel/ancestry-panel';
import { PanelMode } from '../../../enums/panel-mode';

import './ancestry-modal.scss';

interface Props {
	ancestry: Ancestry;
}

export const AncestryModal = (props: Props) => {
	try {
		return (
			<div className='ancestry-modal'>
				<AncestryPanel ancestry={props.ancestry} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
