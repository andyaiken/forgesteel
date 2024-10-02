import { Button, Popover } from 'antd';
import { Career } from '../../../models/career';
import { CareerPanel } from '../../panels/career-panel/career-panel';
import { PanelMode } from '../../../enums/panel-mode';

import './career-modal.scss';

interface Props {
	career: Career;
	export: (format: 'image' | 'pdf' | 'json') => void;
}

export const CareerModal = (props: Props) => {
	try {
		return (
			<div className='career-modal'>
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
				<CareerPanel career={props.career} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
