import { Button, Popover } from 'antd';
import { DownOutlined, UploadOutlined } from '@ant-design/icons';
import { Modal } from '../modal/modal';
import { PanelMode } from '../../../enums/panel-mode';
import { Terrain } from '../../../models/terrain';
import { TerrainPanel } from '../../panels/elements/terrain-panel/terrain-panel';

import './terrain-modal.scss';

interface Props {
	terrain: Terrain;
	upgradeIDs: string[];
	onClose: () => void;
	export?: (format: 'image' | 'pdf' | 'json') => void;
	updateTerrain?: (terrain: Terrain) => void;
}

export const TerrainModal = (props: Props) => {
	try {
		return (
			<Modal
				toolbar={
					<>
						{
							props.export ?
								<Popover
									trigger='click'
									content={(
										<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
											<Button onClick={() => props.export!('image')}>Export As Image</Button>
											<Button onClick={() => props.export!('pdf')}>Export As PDF</Button>
											<Button onClick={() => props.export!('json')}>Export as Data</Button>
										</div>
									)}
								>
									<Button icon={<UploadOutlined />}>
										Export
										<DownOutlined />
									</Button>
								</Popover>
								: null
						}
					</>
				}
				content={
					<div className='terrain-modal'>
						<TerrainPanel
							terrain={props.terrain}
							showCustomizations={true}
							mode={PanelMode.Full}
							updateTerrain={props.updateTerrain}
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
