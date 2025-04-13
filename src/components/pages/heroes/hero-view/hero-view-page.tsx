import { Button, Popover } from 'antd';
import { CloseOutlined, CopyOutlined, EditOutlined, FileOutlined, SettingOutlined, ToolOutlined, UploadOutlined } from '@ant-design/icons';
import { Monster, MonsterGroup } from '../../../../models/monster';
import { Ability } from '../../../../models/ability';
import { Ancestry } from '../../../../models/ancestry';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Career } from '../../../../models/career';
import { Characteristic } from '../../../../enums/characteristic';
import { Complication } from '../../../../models/complication';
import { Culture } from '../../../../models/culture';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Domain } from '../../../../models/domain';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Hero } from '../../../../models/hero';
import { HeroClass } from '../../../../models/class';
import { HeroPanel } from '../../../panels/hero/hero-panel';
import { HeroStatePage } from '../../../../enums/hero-state-page';
import { Kit } from '../../../../models/kit';
import { Options } from '../../../../models/options';
import { OptionsPanel } from '../../../panels/options/options-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { RulesPage } from '../../../../enums/rules-page';
import { Sourcebook } from '../../../../models/sourcebook';
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
	exportHeroPDF: (hero: Hero, format: 'portrait' | 'landscape') => void;
	copyHero: (hero: Hero) => void;
	deleteHero: (hero: Hero) => void;
	showAncestry: (ancestry: Ancestry) => void;
	showCulture: (culture: Culture) => void;
	showCareer: (career: Career) => void;
	showClass: (heroClass: HeroClass) => void;
	showComplication: (complication: Complication) => void;
	showDomain: (domain: Domain) => void;
	showKit: (kit: Kit) => void;
	showCompanion: (monster: Monster, monsterGroup?: MonsterGroup) => void;
	showCharacteristic: (characteristic: Characteristic, hero: Hero) => void;
	showAbility: (ability: Ability, hero: Hero) => void;
	showHeroState: (hero: Hero, page: HeroStatePage) => void;
	showRules: (hero: Hero, page?: RulesPage) => void;
}

export const HeroViewPage = (props: Props) => {
	const navigation = useNavigation();
	const { heroID } = useParams<{ heroID: string }>();
	const hero = useMemo(
		() => props.heroes.find(h => h.id === heroID)!,
		[ heroID, props.heroes ]
	);

	try {
		const exportHero = (key: string) => {
			switch (key) {
				case 'pdf-portrait':
					props.exportHeroPDF(hero, 'portrait');
					break;
				case 'pdf-landscape':
					props.exportHeroPDF(hero, 'landscape');
					break;
				default:
					props.exportHero(hero, key as 'image' | 'json');
					break;
			}
		};

		return (
			<ErrorBoundary>
				<div className='hero-view-page'>
					<AppHeader subheader='Hero' showDirectory={props.showDirectory} showAbout={props.showAbout} showRoll={props.showRoll} showRules={() => props.showRules(hero)}>
						<Button icon={<CloseOutlined />} onClick={() => navigation.goToHeroList(hero.folder)}>
							Close
						</Button>
						<div className='divider' />
						<Popover
							trigger='click'
							content={(
								<div style={{ minWidth: '120px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
									<Button icon={<EditOutlined />} onClick={() => navigation.goToHeroEdit(heroID!, 'details')}>
										Edit
									</Button>
									<Button icon={<CopyOutlined />} onClick={() => props.copyHero(hero)}>
										Copy
									</Button>
									<Popover
										trigger='click'
										content={(
											<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
												<Button onClick={() => exportHero('image')}>Export As Image</Button>
												<Button onClick={() => exportHero('pdf-portrait')}>Export As PDF (portrait)</Button>
												<Button onClick={() => exportHero('pdf-landscape')}>Export As PDF (landscape)</Button>
												<Button onClick={() => exportHero('json')}>Export As Data</Button>
											</div>
										)}
									>
										<Button icon={<UploadOutlined />}>
											Export
										</Button>
									</Popover>
									<DangerButton
										mode='block'
										onConfirm={() => props.deleteHero(hero)}
									/>
								</div>
							)}
						>
							<Button icon={<FileOutlined />}>
								File
							</Button>
						</Popover>
						<Button icon={<ToolOutlined />} onClick={() => props.showHeroState(hero, HeroStatePage.Hero)}>
							Manage
						</Button>
						<Popover
							trigger='click'
							content={<OptionsPanel mode='hero' options={props.options} heroes={props.heroes} setOptions={props.setOptions} />}
						>
							<Button icon={<SettingOutlined />}>
								Options
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
							onShowRules={page => props.showRules(hero, page)}
						/>
					</div>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
