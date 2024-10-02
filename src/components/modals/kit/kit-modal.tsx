import { Kit } from '../../../models/kit';
import { KitPanel } from '../../panels/kit-panel/kit-panel';
import { PanelMode } from '../../../enums/panel-mode';

import './kit-modal.scss';

interface Props {
	kit: Kit;
}

export const KitModal = (props: Props) => {
	try {
		return (
			<div className='kit-modal'>
				<KitPanel kit={props.kit} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
