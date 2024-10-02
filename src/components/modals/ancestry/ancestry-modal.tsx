import { Button, Popover } from 'antd';
import { Ancestry } from '../../../models/ancestry';
import { AncestryPanel } from '../../panels/ancestry-panel/ancestry-panel';
import { PanelMode } from '../../../enums/panel-mode';

import './ancestry-modal.scss';

interface Props {
	ancestry: Ancestry;
	export: (format: 'image' | 'pdf' | 'json') => void;
}

export const AncestryModal = (props: Props) => {
	try {
		return (
			<div className='ancestry-modal'>
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
				<AncestryPanel ancestry={props.ancestry} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
