import { Button, Popover } from 'antd';
import { ClassPanel } from '../../panels/class-panel/class-panel';
import { HeroClass } from '../../../models/class';
import { PanelMode } from '../../../enums/panel-mode';

import './class-modal.scss';

interface Props {
	heroClass: HeroClass;
	export: (format: 'image' | 'pdf' | 'json') => void;
}

export const ClassModal = (props: Props) => {
	try {
		return (
			<div className='class-modal'>
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
				<ClassPanel heroClass={props.heroClass} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
