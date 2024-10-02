import { Button, Popover } from 'antd';
import { Kit } from '../../../models/kit';
import { KitPanel } from '../../panels/kit-panel/kit-panel';
import { PanelMode } from '../../../enums/panel-mode';

import './kit-modal.scss';

interface Props {
	kit: Kit;
	export: (format: 'image' | 'pdf' | 'json') => void;
}

export const KitModal = (props: Props) => {
	try {
		return (
			<div className='kit-modal'>
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
				<KitPanel kit={props.kit} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
