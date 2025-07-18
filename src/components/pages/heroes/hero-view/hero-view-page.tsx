import { Button, Divider, Popover, Segmented } from 'antd';
import { CloseOutlined, CopyOutlined, DownOutlined, EditOutlined, SettingOutlined, ToolOutlined, UploadOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { Ability } from '../../../../models/ability';
import { Ancestry } from '../../../../models/ancestry';
import { AppFooter } from '../../../panels/app-footer/app-footer';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Career } from '../../../../models/career';
import { Characteristic } from '../../../../enums/characteristic';
import { Complication } from '../../../../models/complication';
import { Culture } from '../../../../models/culture';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Domain } from '../../../../models/domain';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Feature } from '../../../../models/feature';
import { Follower } from '../../../../models/follower';
import { Hero } from '../../../../models/hero';
import { HeroClass } from '../../../../models/class';
import { HeroPanel } from '../../../panels/hero/hero-panel';
import { HeroStatePage } from '../../../../enums/hero-state-page';
import { Kit } from '../../../../models/kit';
import { Monster } from '../../../../models/monster';
import { Options } from '../../../../models/options';
import { OptionsPanel } from '../../../panels/options/options-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { RulesPage } from '../../../../enums/rules-page';
import { Sourcebook } from '../../../../models/sourcebook';
import { StandardAbilitiesPanel } from '../../../panels/standard-abilities/standard-abilities-panel';
import { Title } from '../../../../models/title';
import { useMediaQuery } from '../../../../hooks/use-media-query';
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
	showReference: (hero: Hero, page?: RulesPage) => void;
	showSourcebooks: () => void;
	setOptions: (options: Options) => void;
	exportHero: (hero: Hero, format: 'image' | 'pdf' | 'json') => void;
	exportHeroPDF: (hero: Hero, format: 'portrait' | 'landscape') => void;
	exportStandardAbilities: (format: 'image' | 'pdf') => void;
	copyHero: (hero: Hero) => void;
	deleteHero: (hero: Hero) => void;
	showAncestry: (ancestry: Ancestry) => void;
	showCulture: (culture: Culture) => void;
	showCareer: (career: Career) => void;
	showClass: (heroClass: HeroClass) => void;
	showComplication: (complication: Complication) => void;
	showDomain: (domain: Domain) => void;
	showKit: (kit: Kit) => void;
	showTitle: (title: Title) => void;
	showMonster: (monster: Monster) => void;
	showFollower: (follower: Follower) => void;
	showCharacteristic: (characteristic: Characteristic, hero: Hero) => void;
	showFeature: (feature: Feature, hero: Hero) => void;
	showAbility: (ability: Ability, hero: Hero) => void;
	showHeroState: (hero: Hero, page: HeroStatePage) => void;
}

export const HeroViewPage = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');
	const navigation = useNavigation();
	const { heroID } = useParams<{ heroID: string }>();
	const [ content, setContent ] = useState<'hero' | 'standard'>('hero');
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

		const getContent = () => {
			switch (content) {
				case 'hero':
					return (
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
							onSelectTitle={props.showTitle}
							onSelectMonster={props.showMonster}
							onSelectFollower={props.showFollower}
							onSelectCharacteristic={characteristic => props.showCharacteristic(characteristic, hero)}
							onSelectFeature={feature => props.showFeature(feature, hero)}
							onSelectAbility={ability => props.showAbility(ability, hero)}
							onShowState={page => props.showHeroState(hero, page)}
							onshowReference={page => props.showReference(hero, page)}
						/>
					);
				case 'standard':
					return (
						<StandardAbilitiesPanel hero={hero} />
					);
			}
		};

		return (
			<ErrorBoundary>
				<div className='hero-view-page'>
					<AppHeader subheader='Hero' showDirectory={props.showDirectory}>
						<Button icon={<CloseOutlined />} onClick={() => navigation.goToHeroList(hero.folder)}>
							Close
						</Button>
						<div className='divider' />
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
									<Segmented
										options={[
											{ value: 'hero', label: 'Hero Sheet' },
											{ value: 'standard', label: 'Standard Abilities' }
										]}
										value={content}
										onChange={setContent}
									/>
									<Divider />
									{
										content === 'hero' ?
											<>
												<Button onClick={() => exportHero('pdf-portrait')}>Export As PDF (portrait)</Button>
												<Button onClick={() => exportHero('pdf-landscape')}>Export As PDF (landscape)</Button>
												<Button onClick={() => exportHero('json')}>Export As Data</Button>
											</>
											: null
									}
									{
										content === 'standard' ?
											<>
												<Button onClick={() => props.exportStandardAbilities('image')}>Export As Image</Button>
												<Button onClick={() => props.exportStandardAbilities('pdf')}>Export As PDF</Button>
											</>
											: null
									}
								</div>
							)}
						>
							<Button icon={<UploadOutlined />}>
								Export
								<DownOutlined />
							</Button>
						</Popover>
						<DangerButton
							mode='block'
							onConfirm={() => props.deleteHero(hero)}
						/>
						<div className='divider' />
						<Button
							icon={<ToolOutlined />}
							onClick={() => props.showHeroState ? props.showHeroState(hero, HeroStatePage.Hero) : null}
						>
							Manage
						</Button>
						<Popover
							trigger='click'
							content={<OptionsPanel mode='hero' options={props.options} heroes={props.heroes} setOptions={props.setOptions} />}
						>
							<Button icon={<SettingOutlined />}>
								Options
								<DownOutlined />
							</Button>
						</Popover>
					</AppHeader>
					<div className={isSmall ? 'hero-view-page-content compact' : 'hero-view-page-content'}>
						{getContent()}
					</div>
					<AppFooter page='heroes' heroes={props.heroes} showAbout={props.showAbout} showRoll={props.showRoll} showReference={() => props.showReference(hero)} showSourcebooks={props.showSourcebooks} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
