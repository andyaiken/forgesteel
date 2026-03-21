import { Alert, Button, Divider } from 'antd';
import { AppFooter, FooterParams } from '@/components/panels/app-footer/app-footer';
import { CloseOutlined, CopyOutlined, DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { Ability } from '@/models/ability';
import { Ancestry } from '@/models/ancestry';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { ButtonGroup } from '@/components/controls/button-group/button-group';
import { Career } from '@/models/career';
import { Characteristic } from '@/enums/characteristic';
import { Complication } from '@/models/complication';
import { Culture } from '@/models/culture';
import { Domain } from '@/models/domain';
import { EncounterSlot } from '@/models/encounter-slot';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Feature } from '@/models/feature';
import { Fixture } from '@/models/fixture';
import { Follower } from '@/models/follower';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { HeroModalType } from '@/enums/hero-modal-type';
import { HeroPanel } from '@/components/panels/hero/hero-panel';
import { HeroSheetPage } from '@/components/pages/heroes/hero-sheet/hero-sheet-page';
import { Kit } from '@/models/kit';
import { Monster } from '@/models/monster';
import { MultiLine } from '@/components/controls/multi-line/multi-line';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { RulesPage } from '@/enums/rules-page';
import { Sourcebook } from '@/models/sourcebook';
import { StandardAbilitiesPage } from '@/components/pages/heroes/hero-sheet/standard-abilities-page';
import { SummoningInfo } from '@/models/summon';
import { Title } from '@/models/title';
import { ViewSelector } from '@/components/panels/view-selector/view-selector';
import { useIsSmall } from '@/hooks/use-is-small';
import { useNavigation } from '@/hooks/use-navigation';
import { useParams } from 'react-router';
import { useTitle } from '@/hooks/use-title';

import './hero-view-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	params: FooterParams;
	exportHeroData: (hero: Hero) => void;
	exportHeroImage: (hero: Hero) => void;
	exportHeroPdf: (hero: Hero, resolution: 'standard' | 'high') => void;
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
	showMonster: (hero: Hero, monster: Monster, summon?: SummoningInfo) => void;
	showFollower: (hero: Hero, follower: Follower) => void;
	showFixture: (fixture: Fixture) => void;
	showCharacteristic: (characteristic: Characteristic, hero: Hero) => void;
	showFeature: (feature: Feature, hero: Hero) => void;
	showAbility: (ability: Ability, hero: Hero) => void;
	showHeroState: (hero: Hero, type: HeroModalType) => void;
	showHeroReference: (hero: Hero, page: RulesPage) => void;
	setNotes: (hero: Hero, value: string) => void;
	onAddSquad: (hero: Hero, monster: Monster, count: number) => void;
	onRemoveSquad: (hero: Hero, slotID: string) => void;
	onAddMonsterToSquad: (hero: Hero, slotID: string) => void;
	onSelectControlledMonster: (hero: Hero, monster: Monster) => void;
	onSelectControlledSquad: (hero: Hero, slot: EncounterSlot) => void;
}

export const HeroViewPage = (props: Props) => {
	const isSmall = useIsSmall();
	const navigation = useNavigation();
	const { heroID } = useParams<{ heroID: string }>();
	const [ view, setView ] = useState<string>('modern');
	const hero = useMemo(
		() => props.heroes.find(h => h.id === heroID)!,
		[ heroID, props.heroes ]
	);
	useTitle(hero.name || 'Unnamed Hero');

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
						onSelectFixture={props.showFixture}
						onSelectCharacteristic={characteristic => props.showCharacteristic(characteristic, hero)}
						onSelectFeature={feature => props.showFeature(feature, hero)}
						onSelectAbility={ability => props.showAbility(ability, hero)}
						onShowState={page => props.showHeroState(hero, page)}
						onShowReference={page => props.showHeroReference(hero, page)}
						onAddSquad={props.onAddSquad}
						onRemoveSquad={props.onRemoveSquad}
						onAddMonsterToSquad={props.onAddMonsterToSquad}
						onSelectControlledMonster={props.onSelectControlledMonster}
						onSelectControlledSquad={props.onSelectControlledSquad}
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
					<StandardAbilitiesPage options={props.options} hero={hero} />
				);
			case 'notes':
				return (
					<MultiLine
						style={{ height: '100%', flex: '1 1 0' }}
						inputStyle={{ flex: '1 1 0', resize: 'none' }}
						value={hero.state.notes}
						onChange={value => props.setNotes(hero, value)}
					/>
				);
		}
	};

	return (
		<ErrorBoundary>
			<div className='hero-view-page'>
				<AppHeader subheader='Hero'>
					<ButtonGroup
						buttons={[
							{ type: 'button', label: isSmall ? undefined : 'Edit', icon: <EditOutlined />, onClick: () => navigation.goToHeroEdit(heroID!, 'details') },
							{ type: 'button', label: isSmall ? undefined : 'Copy', icon: <CopyOutlined />, onClick: () => props.copyHero(hero) },
							{
								type: 'dropdown',
								label: isSmall ? undefined : 'Export',
								icon: <UploadOutlined />,
								popover: (
									<div style={{ width: '325px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
										{
											![ 'classic', 'abilities' ].includes(view) ?
												<Alert
													type='info'
													showIcon={true}
													title='If you want to export your hero as a PDF, switch to Classic view.'
													action={<Button onClick={() => setView('classic')}>Classic</Button>}
												/>
												: null
										}
										{
											view === 'classic' ?
												<>
													<Button onClick={() => props.exportHeroPdf(hero, 'standard')}>Export as PDF</Button>
													<Button onClick={() => props.exportHeroPdf(hero, 'high')}>Export as PDF (high res)</Button>
												</>
												: null
										}
										{
											view === 'abilities' ?
												<Button onClick={() => props.exportStandardAbilities()}>Export as PDF</Button>
												: null
										}
										<Divider />
										<Button onClick={() => props.exportHeroData(hero)}>Export as Data</Button>
									</div>
								)
							},
							{ type: 'danger', label: isSmall ? undefined : 'Delete', icon: <DeleteOutlined />, onClick: () => props.deleteHero(hero) },
							{ type: 'control', control: <ViewSelector value={view} mode='hero' onChange={setView} /> },
							{ type: 'button', label: isSmall ? undefined : 'Close', icon: <CloseOutlined />, onClick: () => navigation.goToHeroList(hero.folder) }
						]}
					/>
				</AppHeader>
				<ErrorBoundary>
					<div className={isSmall ? 'hero-view-page-content compact' : 'hero-view-page-content'}>
						{getContent()}
					</div>
				</ErrorBoundary>
				<AppFooter
					page='heroes'
					options={props.options}
					params={props.params}
				/>
			</div>
		</ErrorBoundary>
	);
};
