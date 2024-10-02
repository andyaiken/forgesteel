import { Button, Popover } from 'antd';
import { Culture } from '../../../models/culture';
import { CulturePanel } from '../../panels/culture-panel/culture-panel';
import { PanelMode } from '../../../enums/panel-mode';

import './culture-modal.scss';

interface Props {
	culture: Culture;
	export: (format: 'image' | 'pdf' | 'json') => void;
}

export const CultureModal = (props: Props) => {
	try {
		return (
			<div className='culture-modal'>
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
				<CulturePanel culture={props.culture} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
