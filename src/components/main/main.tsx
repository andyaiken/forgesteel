import { Drawer, Radio } from 'antd';
import { ReactNode, useState } from 'react';
import { Ability } from '../../models/ability';
import { AbilityModal } from '../modals/ability/ability-modal';
import { AboutModal } from '../modals/about/about-modal';
import { Ancestry } from '../../models/ancestry';
import { AncestryModal } from '../modals/ancestry/ancestry-modal';
import { CampaignSetting } from '../../models/campaign-setting';
import { CampaignSettingData } from '../../data/campaign-setting-data';
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
import { Element } from '../../models/element';
import { ElementEditPage } from '../pages/elements/element-edit/element-edit';
import { ElementListPage } from '../pages/elements/element-list/element-list';
import { FactoryLogic } from '../../logic/factory-logic';
import { Hero } from '../../models/hero';
import { HeroClass } from '../../models/class';
import { HeroEditPage } from '../pages/heroes/hero-edit/hero-edit-page';
import { HeroListPage } from '../pages/heroes/hero-list/hero-list-page';
import { HeroLogic } from '../../logic/hero-logic';
import { HeroPage } from '../pages/heroes/hero-view/hero-view-page';
import { HeroStateModal } from '../modals/hero-state/hero-state-modal';
import { Kit } from '../../models/kit';
import { KitModal } from '../modals/kit/kit-modal';
import { Options } from '../../models/options';
import { Utils } from '../../utils/utils';
import { WelcomePage } from '../pages/welcome/welcome-page';
import localforage from 'localforage';

import pbds from '../../assets/powered-by-draw-steel.png';

import './main.scss';

enum Page {
	Welcome,
	HeroList,
	HeroView,
	HeroEdit,
	ElementList,
	ElementEdit
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
	const [ selectedElement, setSelectedElement ] = useState<Ancestry | Culture | Career | HeroClass | Kit | Complication | null>(null);
	const [ selectedElementSetting, setSelectedElementSetting ] = useState<CampaignSetting | null>(null);
	const [ selectedElementType, setSelectedElementType ] = useState<string>('');
	const [ drawer, setDrawer ] = useState<ReactNode>(null);

	//#region Persistence

	const persistHeroes = (heroes: Hero[]) => {
		localforage
			.setItem<Hero[]>('forgesteel-heroes', Collections.sort(heroes, h => h.name))
			.then(setHeroes);
	};

	const persistHomebrewSettings = (homebrew: CampaignSetting[]) => {
		localforage
			.setItem<CampaignSetting[]>('forgesteel-homebrew-settings', homebrew)
			.then(setHomebrewSettings);
	};

	const persistOptions = (options: Options) => {
		localforage
			.setItem<Options>('forgesteel-options', options)
			.then(setOptions);
	};

	//#endregion

	//#region Pages

	const showWelcome = () => {
		setPage(Page.Welcome);
		setSelectedHero(null);
		setSelectedElement(null);
		setSelectedElementSetting(null);
		setSelectedElementType('');
	};

	const showHeroList = () => {
		setPage(Page.HeroList);
		setSelectedHero(null);
		setSelectedElement(null);
		setSelectedElementSetting(null);
		setSelectedElementType('');
	};

	const showElementList = () => {
		setPage(Page.ElementList);
		setSelectedHero(null);
		setSelectedElement(null);
		setSelectedElementSetting(null);
		setSelectedElementType('');
	};

	//#endregion

	//#region Heroes

	const addHero = () => {
		const hero = FactoryLogic.createHero([ CampaignSettingData.core.id, CampaignSettingData.orden.id ]);

		const copy = JSON.parse(JSON.stringify(heroes)) as Hero[];
		copy.push(hero);
		Collections.sort(copy, h => h.name);

		persistHeroes(copy);
		setPage(Page.HeroEdit);
		setSelectedHero(hero);
	};

	const importHero = (hero: Hero) => {
		hero.id = Utils.guid();
		HeroLogic.updateHero(hero);

		const copy = JSON.parse(JSON.stringify(heroes)) as Hero[];
		copy.push(hero);
		Collections.sort(copy, h => h.name);

		persistHeroes(copy);
		setPage(Page.HeroView);
		setSelectedHero(hero);
		setDrawer(null);
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

	//#region Elements

	const createHomebrew = (type: string, settingID: string | null) => {
		const setting = homebrewSettings.find(cs => cs.id === settingID) || null;
		switch (type) {
			case 'Ancestry':
				createAncestry(null, setting);
				break;
			case 'Culture':
				createCulture(null, setting);
				break;
			case 'Career':
				createCareer(null, setting);
				break;
			case 'Class':
				createClass(null, setting);
				break;
			case 'Kit':
				createKit(null, setting);
				break;
			case 'Complication':
				createComplication(null, setting);
				break;
		}
	};

	const createAncestry = (original: Ancestry | null, setting: CampaignSetting | null) => {
		const settings = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		if (!setting) {
			setting = FactoryLogic.createCampaignSetting();
			settings.push(setting);
		} else {
			const id = setting.id;
			setting = settings.find(cs => cs.id === id) as CampaignSetting;
		}

		let ancestry: Ancestry;
		if (original) {
			ancestry = JSON.parse(JSON.stringify(original)) as Ancestry;
			ancestry.id = Utils.guid();
		} else {
			ancestry = FactoryLogic.createAncestry();
		}

		setting.ancestries.push(ancestry);
		persistHomebrewSettings(settings);
		if (drawer) {
			onSelectAncestry(ancestry);
		} else {
			editAncestry(ancestry, setting);
		}
	};

	const createCulture = (original: Culture | null, setting: CampaignSetting | null) => {
		const settings = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		if (!setting) {
			setting = FactoryLogic.createCampaignSetting();
			settings.push(setting);
		} else {
			const id = setting.id;
			setting = settings.find(cs => cs.id === id) as CampaignSetting;
		}

		let culture: Culture;
		if (original) {
			culture = JSON.parse(JSON.stringify(original)) as Culture;
			culture.id = Utils.guid();
		} else {
			culture = FactoryLogic.createCulture();
		}

		setting.cultures.push(culture);
		persistHomebrewSettings(settings);
		if (drawer) {
			onSelectCulture(culture);
		} else {
			editCulture(culture, setting);
		}
	};

	const createCareer = (original: Career | null, setting: CampaignSetting | null) => {
		const settings = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		if (!setting) {
			setting = FactoryLogic.createCampaignSetting();
			settings.push(setting);
		} else {
			const id = setting.id;
			setting = settings.find(cs => cs.id === id) as CampaignSetting;
		}

		let career: Career;
		if (original) {
			career = JSON.parse(JSON.stringify(original)) as Career;
			career.id = Utils.guid();
		} else {
			career = FactoryLogic.createCareer();
		}

		setting.careers.push(career);
		persistHomebrewSettings(settings);
		if (drawer) {
			onSelectCareer(career);
		} else {
			editCareer(career, setting);
		}
	};

	const createClass = (original: HeroClass | null, setting: CampaignSetting | null) => {
		const settings = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		if (!setting) {
			setting = FactoryLogic.createCampaignSetting();
			settings.push(setting);
		} else {
			const id = setting.id;
			setting = settings.find(cs => cs.id === id) as CampaignSetting;
		}

		let heroClass: HeroClass;
		if (original) {
			heroClass = JSON.parse(JSON.stringify(original)) as HeroClass;
			heroClass.id = Utils.guid();
		} else {
			heroClass = FactoryLogic.createClass();
		}

		setting.classes.push(heroClass);
		persistHomebrewSettings(settings);
		if (drawer) {
			onSelectClass(heroClass);
		} else {
			editClass(heroClass, setting);
		}
	};

	const createKit = (original: Kit | null, setting: CampaignSetting | null) => {
		const settings = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		if (!setting) {
			setting = FactoryLogic.createCampaignSetting();
			settings.push(setting);
		} else {
			const id = setting.id;
			setting = settings.find(cs => cs.id === id) as CampaignSetting;
		}

		let kit: Kit;
		if (original) {
			kit = JSON.parse(JSON.stringify(original)) as Kit;
			kit.id = Utils.guid();
		} else {
			kit = FactoryLogic.createKit();
		}

		setting.kits.push(kit);
		persistHomebrewSettings(settings);
		if (drawer) {
			onSelectKit(kit);
		} else {
			editKit(kit, setting);
		}
	};

	const createComplication = (original: Complication | null, setting: CampaignSetting | null) => {
		const settings = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		if (!setting) {
			setting = FactoryLogic.createCampaignSetting();
			settings.push(setting);
		} else {
			const id = setting.id;
			setting = settings.find(cs => cs.id === id) as CampaignSetting;
		}

		let complication: Complication;
		if (original) {
			complication = JSON.parse(JSON.stringify(original)) as Complication;
			complication.id = Utils.guid();
		} else {
			complication = FactoryLogic.createComplication();
		}

		setting.complications.push(complication);
		persistHomebrewSettings(settings);
		if (drawer) {
			onSelectComplication(complication);
		} else {
			editComplication(complication, setting);
		}
	};

	const editAncestry = (ancestry: Ancestry, setting: CampaignSetting) => {
		setSelectedElement(ancestry);
		setSelectedElementSetting(setting);
		setSelectedElementType('Ancestry');
		setPage(Page.ElementEdit);
		setDrawer(null);
	};

	const editCulture = (culture: Culture, setting: CampaignSetting) => {
		setSelectedElement(culture);
		setSelectedElementSetting(setting);
		setSelectedElementType('Culture');
		setPage(Page.ElementEdit);
		setDrawer(null);
	};

	const editCareer = (career: Career, setting: CampaignSetting) => {
		setSelectedElement(career);
		setSelectedElementSetting(setting);
		setSelectedElementType('Career');
		setPage(Page.ElementEdit);
		setDrawer(null);
	};

	const editClass = (heroClass: HeroClass, setting: CampaignSetting) => {
		setSelectedElement(heroClass);
		setSelectedElementSetting(setting);
		setSelectedElementType('Class');
		setPage(Page.ElementEdit);
		setDrawer(null);
	};

	const editKit = (kit: Kit, setting: CampaignSetting) => {
		setSelectedElement(kit);
		setSelectedElementSetting(setting);
		setSelectedElementType('Kit');
		setPage(Page.ElementEdit);
		setDrawer(null);
	};

	const editComplication = (complication: Complication, setting: CampaignSetting) => {
		setSelectedElement(complication);
		setSelectedElementSetting(setting);
		setSelectedElementType('Complication');
		setPage(Page.ElementEdit);
		setDrawer(null);
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

	const createCampaignSetting = () => {
		const settings = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		const setting = FactoryLogic.createCampaignSetting();
		settings.push(setting);
		persistHomebrewSettings(settings);
		return setting;
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

	const saveEditSelectedElement = (element: Element) => {
		if (selectedElement) {
			const list = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
			const setting = list.find(cs => cs.id === (selectedElementSetting as CampaignSetting).id);
			if (setting) {
				switch (selectedElementType) {
					case 'Ancestry': {
						const ancestryIndex = setting.ancestries.findIndex(a => a.id === element.id);
						if (ancestryIndex !== -1) {
							setting.ancestries[ancestryIndex] = element as unknown as Ancestry;
						}
					}
						break;
					case 'Culture': {
						const cultureIndex = setting.cultures.findIndex(c => c.id === element.id);
						if (cultureIndex !== -1) {
							setting.cultures[cultureIndex] = element as unknown as Culture;
						}
					}
						break;
					case 'Career': {
						const careerIndex = setting.careers.findIndex(c => c.id === element.id);
						if (careerIndex !== -1) {
							setting.careers[careerIndex] = element as unknown as Career;
						}
					}
						break;
					case 'Class': {
						const classIndex = setting.classes.findIndex(c => c.id === element.id);
						if (classIndex !== -1) {
							setting.classes[classIndex] = element as unknown as HeroClass;
						}
					}
						break;
					case 'Kit': {
						const kitIndex = setting.kits.findIndex(k => k.id === element.id);
						if (kitIndex !== -1) {
							setting.kits[kitIndex] = element as unknown as Kit;
						}
					}
						break;
					case 'Complication': {
						const complicationIndex = setting.complications.findIndex(c => c.id === element.id);
						if (complicationIndex !== -1) {
							setting.complications[complicationIndex] = element as unknown as Complication;
						}
					}
						break;
				}
			};

			persistHomebrewSettings(list);
			setPage(Page.ElementList);
			setSelectedElement(null);
			setSelectedElementSetting(null);
			setSelectedElementType('');
		}
	};

	const cancelEditSelectedElement = () => {
		if (selectedElement) {
			setPage(Page.ElementList);
		}
	};

	const importHomebrew = (type: string, settingID: string | null, element: Element) => {
		element.id = Utils.guid();

		const settings = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
		let setting = settings.find(cs => cs.id === settingID);
		if (!setting) {
			setting = FactoryLogic.createCampaignSetting();
			settings.push(setting);
		}
		if (setting) {
			switch(type) {
				case 'Ancestry':
					setting.ancestries.push(element as unknown as Ancestry);
					Collections.sort(setting.ancestries, item => item.name);
					break;
				case 'Culture':
					setting.cultures.push(element as unknown as Culture);
					Collections.sort(setting.cultures, item => item.name);
					break;
				case 'Career':
					setting.careers.push(element as unknown as Career);
					Collections.sort(setting.careers, item => item.name);
					break;
				case 'Class':
					setting.classes.push(element as unknown as HeroClass);
					Collections.sort(setting.classes, item => item.name);
					break;
				case 'Kit':
					setting.kits.push(element as unknown as Kit);
					Collections.sort(setting.kits, item => item.name);
					break;
				case 'Complication':
					setting.complications.push(element as unknown as Complication);
					Collections.sort(setting.complications, item => item.name);
					break;
			}
		}

		persistHomebrewSettings(settings);
		setPage(Page.ElementList);
		setDrawer(null);
	};

	//#endregion

	//#region Modals

	const showAbout = () => {
		setDrawer(
			<AboutModal />
		);
	};

	const onSelectAncestry = (ancestry: Ancestry) => {
		const container = CampaignSettingData
			.getCampaignSettings(homebrewSettings)
			.find(cs => cs.ancestries.find(a => a.id === ancestry.id));

		setDrawer(
			<AncestryModal
				ancestry={ancestry}
				homebrewSettings={homebrewSettings}
				isHomebrew={!!homebrewSettings.flatMap(cs => cs.ancestries).find(a => a.id === ancestry.id)}
				createHomebrew={setting => createAncestry(ancestry, setting)}
				export={format => Utils.export(ancestry.id, ancestry.name || 'Ancestry', ancestry, 'ancestry', format)}
				edit={() => editAncestry(ancestry, container as CampaignSetting)}
				delete={() => deleteAncestry(ancestry)}
			/>
		);
	};

	const onSelectCulture = (culture: Culture) => {
		const container = CampaignSettingData
			.getCampaignSettings(homebrewSettings)
			.find(cs => cs.cultures.find(c => c.id === culture.id));

		setDrawer(
			<CultureModal
				culture={culture}
				homebrewSettings={homebrewSettings}
				isHomebrew={!!homebrewSettings.flatMap(cs => cs.cultures).find(c => c.id === culture.id)}
				createHomebrew={setting => createCulture(culture, setting)}
				export={format => Utils.export(culture.id, culture.name || 'Culture', culture, 'culture', format)}
				edit={() => editCulture(culture, container as CampaignSetting)}
				delete={() => deleteCulture(culture)}
			/>
		);
	};

	const onSelectCareer = (career: Career) => {
		const container = CampaignSettingData
			.getCampaignSettings(homebrewSettings)
			.find(cs => cs.careers.find(c => c.id === career.id));

		setDrawer(
			<CareerModal
				career={career}
				homebrewSettings={homebrewSettings}
				isHomebrew={!!homebrewSettings.flatMap(cs => cs.careers).find(c => c.id === career.id)}
				createHomebrew={setting => createCareer(career, setting)}
				export={format => Utils.export(career.id, career.name || 'Career', career, 'career', format)}
				edit={() => editCareer(career, container as CampaignSetting)}
				delete={() => deleteCareer(career)}
			/>
		);
	};

	const onSelectClass = (heroClass: HeroClass) => {
		const container = CampaignSettingData
			.getCampaignSettings(homebrewSettings)
			.find(cs => cs.classes.find(c => c.id === heroClass.id));

		setDrawer(
			<ClassModal
				heroClass={heroClass}
				homebrewSettings={homebrewSettings}
				isHomebrew={!!homebrewSettings.flatMap(cs => cs.classes).find(c => c.id === heroClass.id)}
				createHomebrew={setting => createClass(heroClass, setting)}
				export={format => Utils.export(heroClass.id, heroClass.name || 'Class', heroClass, 'class', format)}
				edit={() => editClass(heroClass, container as CampaignSetting)}
				delete={() => deleteClass(heroClass)}
			/>
		);
	};

	const onSelectKit = (kit: Kit) => {
		const container = CampaignSettingData
			.getCampaignSettings(homebrewSettings)
			.find(cs => cs.kits.find(k => k.id === kit.id));

		setDrawer(
			<KitModal
				kit={kit}
				homebrewSettings={homebrewSettings}
				isHomebrew={!!homebrewSettings.flatMap(cs => cs.kits).find(k => k.id === kit.id)}
				createHomebrew={setting => createKit(kit, setting)}
				export={format => Utils.export(kit.id, kit.name || 'Kit', kit, 'kit', format)}
				edit={() => editKit(kit, container as CampaignSetting)}
				delete={() => deleteKit(kit)}
			/>
		);
	};

	const onSelectComplication = (complication: Complication) => {
		const container = CampaignSettingData
			.getCampaignSettings(homebrewSettings)
			.find(cs => cs.complications.find(c => c.id === complication.id));

		setDrawer(
			<ComplicationModal
				complication={complication}
				homebrewSettings={homebrewSettings}
				isHomebrew={!!homebrewSettings.flatMap(cs => cs.complications).find(c => c.id === complication.id)}
				createHomebrew={setting => createComplication(complication, setting)}
				export={format => Utils.export(complication.id, complication.name || 'Complication', complication, 'complication', format)}
				edit={() => editComplication(complication, container as CampaignSetting)}
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
						showElements={showElementList}
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
						campaignSettings={CampaignSettingData.getCampaignSettings(homebrewSettings)}
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
						campaignSettings={CampaignSettingData.getCampaignSettings(homebrewSettings)}
						goHome={showWelcome}
						showAbout={showAbout}
						saveChanges={saveEditSelectedHero}
						cancelChanges={cancelEditSelectedHero}
					/>
				);
			case Page.ElementList:
				return (
					<ElementListPage
						campaignSettings={CampaignSettingData.getCampaignSettings(homebrewSettings)}
						goHome={showWelcome}
						showAbout={showAbout}
						viewAncestry={onSelectAncestry}
						viewCulture={onSelectCulture}
						viewCareer={onSelectCareer}
						viewClass={onSelectClass}
						viewKit={onSelectKit}
						viewComplication={onSelectComplication}
						onSettingCreate={createCampaignSetting}
						onSettingChange={changeCampaignSetting}
						onSettingDelete={deleteCampaignSetting}
						onCreateHomebrew={createHomebrew}
						onImportHomebrew={importHomebrew}
					/>
				);
			case Page.ElementEdit:
				return (
					<ElementEditPage
						element={selectedElement as Ancestry | Culture | Career | HeroClass | Kit | Complication}
						elementType={selectedElementType}
						campaignSettings={[ CampaignSettingData.core, CampaignSettingData.orden, selectedElementSetting as CampaignSetting ]}
						goHome={showWelcome}
						showAbout={showAbout}
						saveChanges={saveEditSelectedElement}
						cancelChanges={cancelEditSelectedElement}
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
		case Page.ElementList:
		case Page.ElementEdit:
			str = 'Elements';
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
								options={[ 'Heroes', 'Elements' ]}
								optionType='button'
								buttonStyle='solid'
								block={true}
								value={str}
								onChange={x => {
									switch (x.target.value) {
										case 'Heroes':
											showHeroList();
											break;
										case 'Elements':
											showElementList();
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
