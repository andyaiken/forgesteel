import { Button, Popover, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Hero } from '../../../models/hero';
import { HeroPanel } from '../../panels/hero-panel/hero-panel';
import { PanelMode } from '../../../enums/panel-mode';
import { Toggle } from '../../controls/toggle/toggle';
import { useState } from 'react';

import './hero-view-page.scss';

interface Props {
	hero: Hero;
	closeHero: () => void;
	editHero: () => void;
	exportHero: (format: 'image' | 'pdf') => void;
	deleteHero: () => void;
}

export const HeroPage = (props: Props) => {
	const [ showSkillsInGroups, setShowSkillsInGroups ] = useState<boolean>(false);
	const [ showFreeStrikes, setShowFreeStrikes ] = useState<boolean>(false);

	return (
		<div className='hero-view-page'>
			<div className='action-row'>
				<Button onClick={props.closeHero}>Close</Button>
				<Button onClick={props.editHero}>Edit</Button>
				<Popover
					trigger='click'
					placement='bottom'
					content={(
						<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
							<Button type='text' onClick={() => props.exportHero('image')}>Export As Image</Button>
							<Button type='text' onClick={() => props.exportHero('pdf')}>Export As PDF</Button>
						</div>
					)}
				>
      				<Button>
					  <Space>
							Export
							<DownOutlined />
						</Space>
					</Button>
    			</Popover>
				<Popover
					trigger='click'
					placement='bottom'
					content={(
						<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
							<Toggle label='Show Skills In Groups' value={showSkillsInGroups} onChange={setShowSkillsInGroups} />
							<Toggle label='Show Free Strikes' value={showFreeStrikes} onChange={setShowFreeStrikes} />
						</div>
					)}
				>
      				<Button>
					  <Space>
							Options
							<DownOutlined />
						</Space>
					</Button>
    			</Popover>
				<Button danger={true} onClick={props.deleteHero}>Delete</Button>
			</div>
			<HeroPanel hero={props.hero} mode={PanelMode.Full} showSkillsInGroups={showSkillsInGroups} showFreeStrikes={showFreeStrikes} />
		</div>
	);
};
