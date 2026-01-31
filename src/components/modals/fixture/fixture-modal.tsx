import { Fixture } from '@/models/fixture';
import { FixturePanel } from '@/components/panels/elements/fixture-panel/fixture-panel';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';

import './fixture-modal.scss';

interface Props {
	fixture: Fixture;
	sourcebooks: Sourcebook[];
	options: Options;
	onClose: () => void;
}

export const FixtureModal = (props: Props) => {
	return (
		<Modal
			content={
				<div className='fixture-modal'>
					<FixturePanel fixture={props.fixture} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
