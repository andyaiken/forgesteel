import { Button, Divider, Popover } from 'antd';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Ability } from '../../../../models/ability';
import { Ancestry } from '../../../../models/ancestry';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Career } from '../../../../models/career';
import { Characteristic } from '../../../../enums/characteristic';
import { Complication } from '../../../../models/complication';
import { Culture } from '../../../../models/culture';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Domain } from '../../../../models/domain';
import { DropdownButton } from '../../../controls/dropdown-button/dropdown-button';
import { Hero } from '../../../../models/hero';
import { HeroClass } from '../../../../models/class';
import { HeroPanel } from '../../../panels/elements/hero-panel/hero-panel';
import { Kit } from '../../../../models/kit';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';
import { Toggle } from '../../../controls/toggle/toggle';
import { useParams } from 'react-router';

import './hero-view-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	setOptions: (options: Options) => void;
	goHome: () => void;
	showAbout: () => void;
	closeHero: () => void;
	editHero: (heroId: string) => void;
	exportHero: (heroId: string, format: 'image' | 'pdf' | 'json') => void;
	deleteHero: (heroId: string) => void;
	onSelectAncestry: (ancestry: Ancestry) => void;
	onSelectCulture: (culture: Culture) => void;
	onSelectCareer: (career: Career) => void;
	onSelectClass: (heroClass: HeroClass) => void;
	onSelectComplication: (complication: Complication) => void;
	onSelectDomain: (domain: Domain) => void;
	onSelectKit: (kit: Kit) => void;
	onSelectCharacteristic: (characteristic: Characteristic, hero: Hero) => void;
	onSelectAbility: (ability: Ability, hero: Hero) => void;
	onShowHeroState: (heroId: string, page: 'hero' | 'stats' | 'conditions') => void;
	onShowRules: (heroId: string) => void;
}

const getHero = (heroId: string, heroes: Hero[]) => heroes.find(h => h.id === heroId)!;

export const HeroPage = (props: Props) => {
	const { heroId } = useParams<{ heroId: string }>();
	const [ hero, setHero ] = useState(getHero(heroId!, props.heroes));
	useEffect(() => setHero(getHero(heroId!, props.heroes)), [ heroId, props.heroes ]);
	try {
		const setShowSkillsInGroups = (value: boolean) => {
			const copy = JSON.parse(JSON.stringify(props.options)) as Options;
			copy.showSkillsInGroups = value;
			props.setOptions(copy);
		};

		const setShowFreeStrikes = (value: boolean) => {
			const copy = JSON.parse(JSON.stringify(props.options)) as Options;
			copy.showFreeStrikes = value;
			props.setOptions(copy);
		};

		const setShowStandardAbilities = (value: boolean) => {
			const copy = JSON.parse(JSON.stringify(props.options)) as Options;
			copy.showStandardAbilities = value;
			props.setOptions(copy);
		};

		const setDimUnavailableAbilities = (value: boolean) => {
			const copy = JSON.parse(JSON.stringify(props.options)) as Options;
			copy.dimUnavailableAbilities = value;
			props.setOptions(copy);
		};

		return (
			<div className='hero-view-page'>
				<AppHeader subtitle='Heroes' goHome={props.goHome} showAbout={props.showAbout}>
					<Button onClick={props.closeHero}>
						Close
					</Button>
					<Button onClick={() => props.onShowHeroState(heroId!, 'hero')}>
						State
					</Button>
					<Button onClick={() => props.onShowRules(heroId!)}>
						Rules
					</Button>
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<Toggle label='Show skills in groups' value={props.options.showSkillsInGroups} onChange={setShowSkillsInGroups} />
								<Toggle label='Show free strikes' value={props.options.showFreeStrikes} onChange={setShowFreeStrikes} />
								<Toggle label='Show standard abilities' value={props.options.showStandardAbilities} onChange={setShowStandardAbilities} />
								<Toggle label='Dim unavailable abilities' value={props.options.dimUnavailableAbilities} onChange={setDimUnavailableAbilities} />
								<Divider />
								<DropdownButton
									label='Export'
									items={[
										{
											key: 'image',
											label: <div className='ds-text centered-text'>Export As Image</div>
										},
										{
											key: 'pdf',
											label: <div className='ds-text centered-text'>Export As PDF</div>
										},
										{
											key: 'json',
											label: <div className='ds-text centered-text'>Export As Data</div>
										}
									]}
									onClick={key => props.exportHero(heroId!, key as 'image' | 'pdf' | 'json')}
								/>
								<Button icon={<EditOutlined />} onClick={() => (props).editHero(heroId!)}>Edit</Button>
								<DangerButton onConfirm={() => props.deleteHero(heroId!)} />
							</div>
						)}
					>
						<Button>
							Options
							<DownOutlined />
						</Button>
					</Popover>
				</AppHeader>
				<div className='hero-view-page-content'>
					<HeroPanel
						hero={hero}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onSelectAncestry={props.onSelectAncestry}
						onSelectCulture={props.onSelectCulture}
						onSelectCareer={props.onSelectCareer}
						onSelectClass={props.onSelectClass}
						onSelectComplication={props.onSelectComplication}
						onSelectDomain={props.onSelectDomain}
						onSelectKit={props.onSelectKit}
						onSelectCharacteristic={characteristic => props.onSelectCharacteristic(characteristic, hero)}
						onSelectAbility={ability => props.onSelectAbility(ability, hero)}
						onShowState={page => props.onShowHeroState(heroId!, page)}
					/>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
