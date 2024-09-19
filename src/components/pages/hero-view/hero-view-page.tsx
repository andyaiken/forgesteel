import { Button, Popover } from 'antd';
import { Ancestry } from '../../../models/ancestry';
import { AppHeader } from '../../controls/app-header/app-header';
import { Career } from '../../../models/career';
import { Complication } from '../../../models/complication';
import { Culture } from '../../../models/culture';
import { Hero } from '../../../models/hero';
import { HeroClass } from '../../../models/class';
import { HeroPanel } from '../../panels/hero-panel/hero-panel';
import { Kit } from '../../../models/kit';
import { PanelMode } from '../../../enums/panel-mode';
import { Toggle } from '../../controls/toggle/toggle';
import { useState } from 'react';

import './hero-view-page.scss';

interface Props {
	hero: Hero;
	showAbout: () => void;
	closeHero: () => void;
	editHero: () => void;
	exportHero: (format: 'image' | 'pdf') => void;
	deleteHero: () => void;
	onSelectAncestry: (ancestry: Ancestry) => void;
	onSelectCulture: (culture: Culture) => void;
	onSelectCareer: (career: Career) => void;
	onSelectClass: (heroClass: HeroClass) => void;
	onSelectComplication: (complication: Complication) => void;
	onSelectKit: (kit: Kit) => void;
}

export const HeroPage = (props: Props) => {
	const [ showSkillsInGroups, setShowSkillsInGroups ] = useState<boolean>(false);
	const [ showFreeStrikes, setShowFreeStrikes ] = useState<boolean>(false);

	return (
		<div className='hero-view-page'>
			<AppHeader showAbout={props.showAbout}>
				<Button onClick={props.closeHero}>
					Close
				</Button>
				<Button onClick={props.editHero}>
					Edit
				</Button>
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
						Export
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
						Options
					</Button>
    			</Popover>
				<Popover
					trigger='click'
					placement='bottom'
					content={(
						<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
							<div>This can't be undone; are you sure?</div>
							<Button danger={true} onClick={props.deleteHero}>Delete</Button>
						</div>
					)}
				>
					<Button>
						Delete
					</Button>
    			</Popover>
			</AppHeader>
			<div className='hero-view-page-content'>
				<HeroPanel
					hero={props.hero}
					mode={PanelMode.Full}
					showSkillsInGroups={showSkillsInGroups}
					showFreeStrikes={showFreeStrikes}
					onSelectAncestry={props.onSelectAncestry}
					onSelectCulture={props.onSelectCulture}
					onSelectCareer={props.onSelectCareer}
					onSelectClass={props.onSelectClass}
					onSelectComplication={props.onSelectComplication}
					onSelectKit={props.onSelectKit}
				/>
			</div>
		</div>
	);
};
