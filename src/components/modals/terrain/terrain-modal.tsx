import { Button, Popover } from 'antd';
import { DownOutlined, UploadOutlined } from '@ant-design/icons';
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
	export?: (format: 'image' | 'pdf' | 'json') => void;
	updateTerrain?: (terrain: Terrain) => void;
}

export const TerrainModal = (props: Props) => {
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
