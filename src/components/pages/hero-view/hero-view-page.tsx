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
	exportHero: () => void;
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
				<Button onClick={props.exportHero}>Export</Button>
				<Popover
					trigger='click'
					placement='bottom'
					content={(
						<div>
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
