import { Drawer, Radio } from 'antd';
import { Ability } from '../../models/ability';
import { AbilityModal } from '../modals/ability/ability-modal';
import { AboutModal } from '../modals/about/about-modal';
import { Ancestry } from '../../models/ancestry';
import { AncestryModal } from '../modals/ancestry/ancestry-modal';
import { CampaignSetting } from '../../models/campaign-setting';
import { CampaignSettingData } from '../../data/campaign-setting-data';
import { CampaignSettingLogic } from '../../logic/campaign-setting-logic';
import { Career } from '../../models/career';
import { CareerModal } from '../modals/career/career-modal';
import { Characteristic } from '../../enums/characteristic';
import { CharacteristicModal } from '../modals/characteristic/characteristic-modal';
import { ClassModal } from '../modals/class/class-modal';
import { Collections } from '../../utils/collections';
import { Complication } from '../../models/complication';
import { ComplicationModal } from '../modals/complication/complication-modal';
import { Culture } from '../../models/culture';
import { CultureModal } from '../modals/culture/culture-modal';
import { Hero } from '../../models/hero';
import { HeroClass } from '../../models/class';
import { HeroEditPage } from '../pages/heroes/hero-edit/hero-edit-page';
import { HeroListPage } from '../pages/heroes/hero-list/hero-list-page';
import { HeroLogic } from '../../logic/hero-logic';
import { HeroPage } from '../pages/heroes/hero-view/hero-view-page';
import { HeroStateModal } from '../modals/hero-state/hero-state-modal';
import { ImportHeroModal } from '../modals/import-hero/import-hero-modal';
import { Kit } from '../../models/kit';
import { KitModal } from '../modals/kit/kit-modal';
import { KitType } from '../../enums/kit';
import { Options } from '../../models/options';
import { SourcebookListPage } from '../pages/sourcebooks/sourcebook-list/sourcebook-list';
import { Utils } from '../../utils/utils';
import { WelcomePage } from '../pages/welcome/welcome-page';
import localforage from 'localforage';
import { useState } from 'react';

import pbds from '../../assets/powered-by-draw-steel.png';

import './main.scss';

enum Page {
	Welcome,
	HeroList,
	HeroView,
	HeroEdit,
	SourcebookList
}

interface Props {
	heroes: Hero[];
	homebrewSettings: CampaignSetting[];
	options: Options;
}

export const Main = (props: Props) => {
	const [ heroes, setHeroes ] = useState<Hero[]>(props.heroes);
	const [ homebrewSettings, setHomebrewSettings ] = useState<CampaignSetting[]>(props.homebrewSettings);
	const [ options, setOptions ] = useState<Options>(props.options);
	const [ page, setPage ] = useState<Page>(Page.Welcome);
	const [ selectedHero, setSelectedHero ] = useState<Hero | null>(null);
	const [ drawer, setDrawer ] = useState<JSX.Element | null>(null);

	//#region Persistence

	const persistHeroes = (heroes: Hero[]) => {
		localforage.setItem<Hero[]>('forgesteel-heroes', heroes)
			.then(() => {
				setHeroes(heroes);
			});
	};

	const persistHomebrewSettings = (homebrew: CampaignSetting[]) => {
		localforage.setItem<CampaignSetting[]>('forgesteel-homebrew-settings', homebrew)
			.then(() => {
				setHomebrewSettings(homebrew);
			});
	};

	const persistOptions = (options: Options) => {
		localforage.setItem<Options>('forgesteel-options', options)
			.then(() => {
				setOptions(options);
			});
	};

	//#endregion

	//#region Pages

	const showWelcome = () => {
		setPage(Page.Welcome);
		setSelectedHero(null);
	};

	const showHeroList = () => {
		setPage(Page.HeroList);
		setSelectedHero(null);
	};

	const showSourcebookList = () => {
		setPage(Page.SourcebookList);
		setSelectedHero(null);
	};

	//#endregion

	//#region Heroes

	const addHero = () => {
		const hero = HeroLogic.createHero(CampaignSettingData.orden.id);

		const copy = JSON.parse(JSON.stringify(heroes)) as Hero[];
		copy.push(hero);
		Collections.sort(copy, h => h.name);

		persistHeroes(copy);
		setPage(Page.HeroEdit);
		setSelectedHero(hero);
	};

	const importHero = () => {
		setDrawer(
			<ImportHeroModal
				accept={hero => {
					hero.id = Utils.guid();
					HeroLogic.updateHero(hero);

					const copy = JSON.parse(JSON.stringify(heroes)) as Hero[];
					copy.push(hero);
					Collections.sort(copy, h => h.name);

					persistHeroes(copy);
					setPage(Page.HeroView);
					setSelectedHero(hero);
					setDrawer(null);
				}}
			/>
		);
	};

	const viewHero = (heroID: string) => {
		const hero = heroes.find(h => h.id === heroID);
		if (hero) {
			setPage(Page.HeroView);
			setSelectedHero(hero);
		}
	};

	const closeSelectedHero = () => {
		if (selectedHero) {
			setPage(Page.HeroList);
			setSelectedHero(null);
		}
	};

	const editSelectedHero = () => {
		if (selectedHero) {
			setPage(Page.HeroEdit);
		}
	};

	const exportSelectedHero = (format: 'image' | 'pdf' | 'json') => {
		if (selectedHero) {
			Utils.export(selectedHero.id, selectedHero.name || 'Unnamed Hero', selectedHero, 'hero', format);
		}
	};

	const deleteSelectedHero = () => {
		if (selectedHero) {
			const copy = JSON.parse(JSON.stringify(heroes)) as Hero[];
			persistHeroes(copy.filter(h => h.id !== selectedHero.id));
			setPage(Page.HeroList);
			setSelectedHero(null);
		}
	};

	const saveEditSelectedHero = (hero: Hero) => {
		if (selectedHero) {
			const list = JSON.parse(JSON.stringify(heroes)) as Hero[];
			const index = list.findIndex(h => h.id === hero.id);
			if (index !== -1) {
				list[index] = hero;
				persistHeroes(list);
				setPage(Page.HeroView);
				setSelectedHero(hero);
			}
		}
	};

	const cancelEditSelectedHero = () => {
		if (selectedHero) {
			setPage(Page.HeroView);
		}
	};

	//#endregion

	//#region Sourcebooks

	const createAncestry = (original: Ancestry | null, setting: CampaignSetting | null) => {
		const settings = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		if (!setting) {
			setting = CampaignSettingLogic.createCampaignSetting();
			settings.push(setting);
		}

		let ancestry: Ancestry;
		if (original) {
			ancestry = JSON.parse(JSON.stringify(original)) as Ancestry;
			ancestry.id = Utils.guid();
		} else {
			ancestry = {
				id: Utils.guid(),
				name: '',
				description: '',
				features: []
			};
		}

		setting.ancestries.push(ancestry);
		persistHomebrewSettings(settings);
		onSelectAncestry(ancestry);
	};

	const createCulture = (original: Culture | null, setting: CampaignSetting | null) => {
		const settings = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		if (!setting) {
			setting = CampaignSettingLogic.createCampaignSetting();
			settings.push(setting);
		}

		let culture: Culture;
		if (original) {
			culture = JSON.parse(JSON.stringify(original)) as Culture;
			culture.id = Utils.guid();
		} else {
			culture = {
				id: Utils.guid(),
				name: '',
				description: '',
				languages: [],
				environment: null,
				organization: null,
				upbringing: null
			};
		}

		setting.cultures.push(culture);
		persistHomebrewSettings(settings);
		onSelectCulture(culture);
	};

	const createCareer = (original: Career | null, setting: CampaignSetting | null) => {
		const settings = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		if (!setting) {
			setting = CampaignSettingLogic.createCampaignSetting();
			settings.push(setting);
		}

		let career: Career;
		if (original) {
			career = JSON.parse(JSON.stringify(original)) as Career;
			career.id = Utils.guid();
		} else {
			career = {
				id: Utils.guid(),
				name: '',
				description: '',
				features: [],
				title: null
			};
		}

		setting.careers.push(career);
		persistHomebrewSettings(settings);
		onSelectCareer(career);
	};

	const createClass = (original: HeroClass | null, setting: CampaignSetting | null) => {
		const settings = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		if (!setting) {
			setting = CampaignSettingLogic.createCampaignSetting();
			settings.push(setting);
		}

		let heroClass: HeroClass;
		if (original) {
			heroClass = JSON.parse(JSON.stringify(original)) as HeroClass;
			heroClass.id = Utils.guid();
		} else {
			heroClass = {
				id: Utils.guid(),
				name: '',
				description: '',
				heroicResource: '',
				subclassName: '',
				subclassCount: 1,
				primaryCharacteristics: [],
				featuresByLevel: [],
				abilities: [],
				kits: [],
				subclasses: [],
				level: 1,
				characteristics: []
			};
		}

		setting.classes.push(heroClass);
		persistHomebrewSettings(settings);
		onSelectClass(heroClass);
	};

	const createKit = (original: Kit | null, setting: CampaignSetting | null) => {
		const settings = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		if (!setting) {
			setting = CampaignSettingLogic.createCampaignSetting();
			settings.push(setting);
		}

		let kit: Kit;
		if (original) {
			kit = JSON.parse(JSON.stringify(original)) as Kit;
			kit.id = Utils.guid();
		} else {
			kit = {
				id: Utils.guid(),
				name: '',
				description: '',
				type: KitType.Martial,
				armor: [],
				weapon: [],
				implement: [],
				stamina: 0,
				speed: 0,
				stability: 0,
				meleeDamage: null,
				rangedDamage: null,
				magicalDamage: null,
				distance: 0,
				reach: 0,
				area: 0,
				mobility: false,
				abilities: [],
				features: []
			};
		}

		setting.kits.push(kit);
		persistHomebrewSettings(settings);
		onSelectKit(kit);
	};

	const createComplication = (original: Complication | null, setting: CampaignSetting | null) => {
		const settings = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		if (!setting) {
			setting = CampaignSettingLogic.createCampaignSetting();
			settings.push(setting);
		}

		let complication: Complication;
		if (original) {
			complication = JSON.parse(JSON.stringify(original)) as Complication;
			complication.id = Utils.guid();
		} else {
			complication = {
				id: Utils.guid(),
				name: '',
				description: '',
				features: []
			};
		}

		setting.complications.push(complication);
		persistHomebrewSettings(settings);
		onSelectComplication(complication);
	};

	const deleteAncestry = (ancestry: Ancestry) => {
		const copy = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		copy.forEach(cs => {
			cs.ancestries = cs.ancestries.filter(a => a.id !== ancestry.id);
		});
		persistHomebrewSettings(copy);
		setDrawer(null);
	};

	const deleteCulture = (culture: Culture) => {
		const copy = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		copy.forEach(cs => {
			cs.cultures = cs.cultures.filter(c => c.id !== culture.id);
		});
		persistHomebrewSettings(copy);
		setDrawer(null);
	};

	const deleteCareer = (career: Career) => {
		const copy = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		copy.forEach(cs => {
			cs.careers = cs.careers.filter(c => c.id !== career.id);
		});
		persistHomebrewSettings(copy);
		setDrawer(null);
	};

	const deleteClass = (heroClass: HeroClass) => {
		const copy = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		copy.forEach(cs => {
			cs.classes = cs.classes.filter(c => c.id !== heroClass.id);
		});
		persistHomebrewSettings(copy);
		setDrawer(null);
	};

	const deleteKit = (kit: Kit) => {
		const copy = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		copy.forEach(cs => {
			cs.kits = cs.kits.filter(k => k.id !== kit.id);
		});
		persistHomebrewSettings(copy);
		setDrawer(null);
	};

	const deleteComplication = (complication: Complication) => {
		const copy = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		copy.forEach(cs => {
			cs.complications = cs.complications.filter(c => c.id !== complication.id);
		});
		persistHomebrewSettings(copy);
		setDrawer(null);
	};

	const changeCampaignSetting = (setting: CampaignSetting) => {
		const list = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		const index = list.findIndex(cs => cs.id === setting.id);
		if (index !== -1) {
			list[index] = setting;
			persistHomebrewSettings(list);
		}
	};

	const deleteCampaignSetting = (setting: CampaignSetting) => {
		const copy = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		persistHomebrewSettings(copy.filter(cs => cs.id !== setting.id));
	};

	//#endregion

	//#region Modals

	const showAbout = () => {
		setDrawer(
			<AboutModal />
		);
	};

	const onSelectAncestry = (ancestry: Ancestry) => {
		setDrawer(
			<AncestryModal
				ancestry={ancestry}
				homebrewSettings={homebrewSettings}
				isHomebrew={!!homebrewSettings.flatMap(cs => cs.ancestries).find(a => a.id === ancestry.id)}
				createHomebrew={setting => createAncestry(ancestry, setting)}
				export={format => Utils.export(ancestry.id, ancestry.name || 'Ancestry', ancestry, 'ancestry', format)}
				delete={() => deleteAncestry(ancestry)}
			/>
		);
	};

	const onSelectCulture = (culture: Culture) => {
		setDrawer(
			<CultureModal
				culture={culture}
				homebrewSettings={homebrewSettings}
				isHomebrew={!!homebrewSettings.flatMap(cs => cs.cultures).find(c => c.id === culture.id)}
				createHomebrew={setting => createCulture(culture, setting)}
				export={format => Utils.export(culture.id, culture.name || 'Culture', culture, 'culture', format)}
				delete={() => deleteCulture(culture)}
			/>
		);
	};

	const onSelectCareer = (career: Career) => {
		setDrawer(
			<CareerModal
				career={career}
				homebrewSettings={homebrewSettings}
				isHomebrew={!!homebrewSettings.flatMap(cs => cs.careers).find(c => c.id === career.id)}
				createHomebrew={setting => createCareer(career, setting)}
				export={format => Utils.export(career.id, career.name || 'Career', career, 'career', format)}
				delete={() => deleteCareer(career)}
			/>
		);
	};

	const onSelectClass = (heroClass: HeroClass) => {
		setDrawer(
			<ClassModal
				heroClass={heroClass}
				homebrewSettings={homebrewSettings}
				isHomebrew={!!homebrewSettings.flatMap(cs => cs.classes).find(c => c.id === heroClass.id)}
				createHomebrew={setting => createClass(heroClass, setting)}
				export={format => Utils.export(heroClass.id, heroClass.name || 'Class', heroClass, 'class', format)}
				delete={() => deleteClass(heroClass)}
			/>
		);
	};

	const onSelectKit = (kit: Kit) => {
		setDrawer(
			<KitModal
				kit={kit}
				homebrewSettings={homebrewSettings}
				isHomebrew={!!homebrewSettings.flatMap(cs => cs.kits).find(k => k.id === kit.id)}
				createHomebrew={setting => createKit(kit, setting)}
				export={format => Utils.export(kit.id, kit.name || 'Kit', kit, 'kit', format)}
				delete={() => deleteKit(kit)}
			/>
		);
	};

	const onSelectComplication = (complication: Complication) => {
		setDrawer(
			<ComplicationModal
				complication={complication}
				homebrewSettings={homebrewSettings}
				isHomebrew={!!homebrewSettings.flatMap(cs => cs.complications).find(c => c.id === complication.id)}
				createHomebrew={setting => createComplication(complication, setting)}
				export={format => Utils.export(complication.id, complication.name || 'Complication', complication, 'complication', format)}
				delete={() => deleteComplication(complication)}
			/>
		);
	};

	const onSelectCharacteristic = (characteristic: Characteristic, hero: Hero) => {
		setDrawer(
			<CharacteristicModal characteristic={characteristic} hero={hero} />
		);
	};

	const onSelectAbility = (ability: Ability, hero: Hero) => {
		setDrawer(
			<AbilityModal ability={ability} hero={hero} />
		);
	};

	const onShowState = () => {
		if (selectedHero) {
			setDrawer(
				<HeroStateModal
					hero={selectedHero}
					onChange={updatedHero => {
						const list = JSON.parse(JSON.stringify(heroes)) as Hero[];
						const index = list.findIndex(h => h.id === updatedHero.id);
						if (index !== -1) {
							list[index] = updatedHero;
							persistHeroes(list);
							setSelectedHero(updatedHero);
						}
					}}
				/>
			);
		}
	};

	//#endregion

	const getContent = () => {
		switch (page) {
			case Page.Welcome:
				return (
					<WelcomePage
						showAbout={showAbout}
						showHeroes={heroes.length === 0 ? addHero : showHeroList}
						showSourcebooks={showSourcebookList}
					/>
				);
			case Page.HeroList:
				return (
					<HeroListPage
						heroes={heroes}
						campaignSettings={CampaignSettingData.getCampaignSettings(homebrewSettings)}
						goHome={showWelcome}
						showAbout={showAbout}
						addHero={addHero}
						importHero={importHero}
						viewHero={viewHero}
					/>
				);
			case Page.HeroView:
				return (
					<HeroPage
						hero={selectedHero as Hero}
						campaignSettings={CampaignSettingData.getCampaignSettings(homebrewSettings).filter(cs => (cs.id === '') || (cs.id === (selectedHero as Hero).settingID))}
						options={options}
						setOptions={persistOptions}
						goHome={showWelcome}
						showAbout={showAbout}
						closeHero={closeSelectedHero}
						editHero={editSelectedHero}
						exportHero={exportSelectedHero}
						deleteHero={deleteSelectedHero}
						onSelectAncestry={onSelectAncestry}
						onSelectCulture={onSelectCulture}
						onSelectCareer={onSelectCareer}
						onSelectClass={onSelectClass}
						onSelectComplication={onSelectComplication}
						onSelectKit={onSelectKit}
						onSelectCharacteristic={onSelectCharacteristic}
						onSelectAbility={onSelectAbility}
						onShowState={onShowState}
					/>
				);
			case Page.HeroEdit:
				return (
					<HeroEditPage
						hero={selectedHero as Hero}
						campaignSettings={CampaignSettingData.getCampaignSettings(homebrewSettings).filter(cs => (cs.id === '') || (cs.id === (selectedHero as Hero).settingID))}
						goHome={showWelcome}
						showAbout={showAbout}
						saveChanges={saveEditSelectedHero}
						cancelChanges={cancelEditSelectedHero}
					/>
				);
			case Page.SourcebookList:
				return (
					<SourcebookListPage
						campaignSettings={CampaignSettingData.getCampaignSettings(homebrewSettings)}
						goHome={showWelcome}
						showAbout={showAbout}
						viewAncestry={onSelectAncestry}
						viewCulture={onSelectCulture}
						viewCareer={onSelectCareer}
						viewClass={onSelectClass}
						viewKit={onSelectKit}
						viewComplication={onSelectComplication}
						onSettingChange={changeCampaignSetting}
						onSettingDelete={deleteCampaignSetting}
					/>
				);
		}
	};

	let str = '';
	switch (page) {
		case Page.HeroList:
		case Page.HeroView:
		case Page.HeroEdit:
			str = 'Heroes';
			break;
		case Page.SourcebookList:
			str = 'Sourcebooks';
			break;
	}

	return (
		<div className='main'>
			<div className='main-content'>
				{getContent()}
			</div>
			<div className='main-footer'>
				{
					page === Page.Welcome ?
						<div className='main-footer-section'>
							<img className='ds-logo' src={pbds} />
							FORGE STEEL is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC
						</div>
						: null
				}
				{
					page === Page.Welcome ?
						<div className='main-footer-section'>
							DRAW STEEL © 2024 MCDM Productions, LLC
						</div>
						: null
				}
				{
					page === Page.Welcome ?
						<div className='main-footer-section'>
							Designed by Andy Aiken
						</div>
						: null
				}
				{
					page !== Page.Welcome ?
						<div className='main-footer-section'>
							<Radio.Group
								options={[ 'Heroes', 'Sourcebooks' ]}
								optionType='button'
								buttonStyle='solid'
								block={true}
								value={str}
								onChange={x => {
									switch (x.target.value) {
										case 'Heroes':
											showHeroList();
											break;
										case 'Sourcebooks':
											showSourcebookList();
											break;
									}
								}}
							/>
						</div>
						: null
				}
			</div>
			<Drawer open={drawer !== null} onClose={() => setDrawer(null)} closeIcon={null} width='450px'>
				{drawer}
			</Drawer>
		</div>
	);
};
