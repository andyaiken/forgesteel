import { Button, Divider, Popover, Segmented, Space, Tag } from 'antd';
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
import { Expander } from '../../../controls/expander/expander';
import { Feature } from '../../../../models/feature';
import { Follower } from '../../../../models/follower';
import { Hero } from '../../../../models/hero';
import { HeroClass } from '../../../../models/class';
import { HeroPanel } from '../../../panels/hero/hero-panel';
import { HeroSheetPage } from '../hero-sheet/hero-sheet-page';
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
import { Toggle } from '../../../controls/toggle/toggle';
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
	setOptions: (options: Options) => void;
	exportHero: (hero: Hero, format: 'image' | 'json') => void;
	exportPdf: (hero: Hero, mode: 'portrait' | 'landscape' | 'html', formFillable: boolean) => void;
	exportStandardAbilities: () => void;
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
	const [ view, setView ] = useState<'modern' | 'classic' | 'abilities'>('modern');
	const [ pdfOrientation, setPdfOrientation ] = useState<'portrait' | 'landscape'>('portrait');
	const [ pdfFormFillable, setPdfFormFillable ] = useState<boolean>(false);
	const hero = useMemo(
		() => props.heroes.find(h => h.id === heroID)!,
		[ heroID, props.heroes ]
	);

	try {
		const exportPDF = () => {
			switch (view) {
				case 'modern':
					props.exportPdf(hero, pdfOrientation, pdfFormFillable);
					break;
				case 'classic':
					props.exportPdf(hero, 'html', pdfFormFillable);
					break;
				case 'abilities':
					props.exportStandardAbilities();
					break;
			}
		};

		const getContent = () => {
			switch (view) {
				case 'modern':
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
				case 'classic':
					return (
						<HeroSheetPage
							hero={hero}
							sourcebooks={props.sourcebooks}
							options={props.options}
						/>
					);
				case 'abilities':
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
								<div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
									<Button onClick={exportPDF}>Export as PDF</Button>
									<Button onClick={() => props.exportHero(hero, 'json')}>Export as Data</Button>
									<Divider />
									<Expander title='PDF Options'>
										<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
											<Segmented
												disabled={view !== 'modern'}
												block={true}
												options={[
													{ value: 'portrait', label: 'Portrait' },
													{ value: 'landscape', label: 'Landscape' }
												]}
												value={pdfOrientation}
												onChange={setPdfOrientation}
											/>
											<Toggle
												disabled={view !== 'modern'}
												label='Form fillable'
												value={pdfFormFillable}
												onChange={setPdfFormFillable}
											/>
										</Space>
									</Expander>
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
							content={(
								<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
									<Segmented
										block={true}
										vertical={true}
										options={[
											{ value: 'modern', label: <div className='ds-text'>Modern Sheet</div> },
											{ value: 'classic', label: <div className='ds-text'><Tag color='red'>BETA</Tag>Classic Sheet</div> },
											{ value: 'abilities', label: <div className='ds-text'>Standard Abilities</div> }
										]}
										value={view}
										onChange={setView}
									/>
								</div>
							)}
						>
							<Button>
								View
								<DownOutlined />
							</Button>
						</Popover>
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
					<AppFooter page='heroes' showAbout={props.showAbout} showRoll={props.showRoll} showReference={() => props.showReference(hero)} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
