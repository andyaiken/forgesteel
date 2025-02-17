import { Button, Divider, Popover } from 'antd';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
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
import { HeroStatePage } from '../../../../enums/hero-state-page';
import { Kit } from '../../../../models/kit';
import { Monster } from '../../../../models/monster';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';
import { Toggle } from '../../../controls/toggle/toggle';
import { useMemo } from 'react';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './hero-view-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	setOptions: (options: Options) => void;
	exportHero: (hero: Hero, format: 'image' | 'pdf' | 'json') => void;
	exportHeroPDF: (hero: Hero, format: 'portrait') => void;
	deleteHero: (hero: Hero) => void;
	showAncestry: (ancestry: Ancestry) => void;
	showCulture: (culture: Culture) => void;
	showCareer: (career: Career) => void;
	showClass: (heroClass: HeroClass) => void;
	showComplication: (complication: Complication) => void;
	showDomain: (domain: Domain) => void;
	showKit: (kit: Kit) => void;
	showCompanion: (monster: Monster) => void;
	showCharacteristic: (characteristic: Characteristic, hero: Hero) => void;
	showAbility: (ability: Ability, hero: Hero) => void;
	showHeroState: (hero: Hero, page: HeroStatePage) => void;
	showRules: (hero: Hero) => void;
}

const getHero = (heroID: string, heroes: Hero[]) => heroes.find(h => h.id === heroID)!;

export const HeroViewPage = (props: Props) => {
	const navigation = useNavigation();
	const { heroID } = useParams<{ heroID: string }>();
	const hero = useMemo(() => getHero(heroID!, props.heroes), [ heroID, props.heroes ]);

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

		const exportHero = (key: string) => {
			switch (key) {
				case 'pdf-portrait':
					props.exportHeroPDF(hero, 'portrait');
					break;
				default:
					props.exportHero(hero, key as 'image' | 'json');
					break;
			}
		};

		return (
			<div className='hero-view-page'>
				<AppHeader breadcrumbs={[ { label: 'Heroes' } ]} showDirectory={props.showDirectory} showAbout={props.showAbout} showRoll={props.showRoll}>
					<Button onClick={navigation.goToHeroList}>
						Close
					</Button>
					<Button onClick={() => props.showHeroState(hero, HeroStatePage.Hero)}>
						State
					</Button>
					<Button onClick={() => props.showRules(hero)}>
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
											key: 'pdf-portrait',
											label: <div className='ds-text centered-text'>Export As PDF</div>
										},
										{
											key: 'json',
											label: <div className='ds-text centered-text'>Export As Data</div>
										}
									]}
									onClick={exportHero}
								/>
								<Button icon={<EditOutlined />} onClick={() => navigation.goToHeroEdit(heroID!, 'details')}>Edit</Button>
								<DangerButton block={true} onConfirm={() => props.deleteHero(hero)} />
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
						onSelectAncestry={props.showAncestry}
 						onSelectCulture={props.showCulture}
 						onSelectCareer={props.showCareer}
 						onSelectClass={props.showClass}
 						onSelectComplication={props.showComplication}
 						onSelectDomain={props.showDomain}
 						onSelectKit={props.showKit}
						onSelectCompanion={props.showCompanion}
 						onSelectCharacteristic={characteristic => props.showCharacteristic(characteristic, hero)}
 						onSelectAbility={ability => props.showAbility(ability, hero)}
 						onShowState={page => props.showHeroState(hero, page)}
					/>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
