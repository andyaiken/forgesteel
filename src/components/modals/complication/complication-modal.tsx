import { Button, Popover } from 'antd';
import { Complication } from '../../../models/complication';
import { ComplicationPanel } from '../../panels/complication-panel/complication-panel';
import { PanelMode } from '../../../enums/panel-mode';

import './complication-modal.scss';

interface Props {
	complication: Complication;
	export: (format: 'image' | 'pdf' | 'json') => void;
}

export const ComplicationModal = (props: Props) => {
	try {
		return (
			<div className='complication-modal'>
				<div className='toolbar'>
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<Button onClick={() => props.export('image')}>Export As Image</Button>
								<Button onClick={() => props.export('pdf')}>Export As PDF</Button>
								<Button onClick={() => props.export('json')}>Export As JSON</Button>
							</div>
						)}
					>
						<Button>
							Export
						</Button>
					</Popover>
				</div>
				<ComplicationPanel complication={props.complication} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
