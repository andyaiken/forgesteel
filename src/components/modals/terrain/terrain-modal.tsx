import { Modal } from '@/components/modals/modal/modal';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { Terrain } from '@/models/terrain';
import { TerrainPanel } from '@/components/panels/elements/terrain-panel/terrain-panel';

import './terrain-modal.scss';

interface Props {
	terrain: Terrain;
	upgradeIDs: string[];
	sourcebooks: Sourcebook[];
	onClose: () => void;
	updateTerrain?: (terrain: Terrain) => void;
}

export const TerrainModal = (props: Props) => {
	return (
		<Modal
			content={
				<div className='terrain-modal'>
					<TerrainPanel
						terrain={props.terrain}
						showCustomizations={true}
						sourcebooks={props.sourcebooks}
						mode={PanelMode.Full}
						updateTerrain={props.updateTerrain}
					/>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
