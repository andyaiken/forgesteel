import { Drawer, Radio } from 'antd';
import { Ability } from '../../models/ability';
import { AbilityModal } from '../modals/ability/ability-modal';
import { AboutModal } from '../modals/about/about-modal';
import { Ancestry } from '../../models/ancestry';
import { AncestryData } from '../../data/ancestry-data';
import { AncestryModal } from '../modals/ancestry/ancestry-modal';
import { CampaignSettingData } from '../../data/campaign-setting-data';
import { Career } from '../../models/career';
import { CareerData } from '../../data/career-data';
import { CareerModal } from '../modals/career/career-modal';
import { Characteristic } from '../../enums/characteristic';
import { CharacteristicModal } from '../modals/characteristic/characteristic-modal';
import { ClassData } from '../../data/class-data';
import { ClassModal } from '../modals/class/class-modal';
import { Collections } from '../../utils/collections';
import { Complication } from '../../models/complication';
import { ComplicationData } from '../../data/complication-data';
import { ComplicationModal } from '../modals/complication/complication-modal';
import { Culture } from '../../models/culture';
import { CultureData } from '../../data/culture-data';
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
import { KitData } from '../../data/kit-data';
import { KitModal } from '../modals/kit/kit-modal';
import { Options } from '../../models/options';
import { Sourcebook } from '../../models/sourcebook';
import { SourcebookListPage } from '../pages/sourcebook/sourcebook-list/sourcebook-list';
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
	Sourcebook
}

interface Props {
	heroes: Hero[];
	homebrew: Sourcebook;
	options: Options;
}

export const Main = (props: Props) => {
	const [ heroes, setHeroes ] = useState<Hero[]>(props.heroes);
	const [ homebrew /*, setHomebrew*/ ] = useState<Sourcebook>(props.homebrew);
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

	/*
	const persistHomebrew = (homebrew: Sourcebook) => {
		localforage.setItem<Sourcebook>('forgesteel-homebrew', homebrew)
			.then(() => {
				setHomebrew(homebrew);
			});
	};
	*/

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

	const showSourcebook = () => {
		setPage(Page.Sourcebook);
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
			if (format === 'json') {
				Utils.saveFile(selectedHero, selectedHero.name || 'Unnamed Hero', 'hero');
			} else {
				Utils.takeScreenshot(selectedHero.id, selectedHero.name || 'Unnamed Hero', format);
			}
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

	//#region Sourcebook

	const getSourcebook = () => {
		const sourcebook: Sourcebook = {
			settings: [],
			ancestries: Collections.sort(([] as Ancestry[]).concat(AncestryData.getAncestries()).concat(homebrew.ancestries), a => a.name),
			cultures: Collections.sort(([] as Culture[]).concat(CultureData.getCultures()).concat(homebrew.cultures), a => a.name),
			careers: Collections.sort(([] as Career[]).concat(CareerData.getCareers()).concat(homebrew.careers), a => a.name),
			classes: Collections.sort(([] as HeroClass[]).concat(ClassData.getClasses()).concat(homebrew.classes), a => a.name),
			kits: Collections.sort(([] as Kit[]).concat(KitData.getKits()).concat(homebrew.kits), a => a.name),
			complications: Collections.sort(([] as Complication[]).concat(ComplicationData.getComplications()).concat(homebrew.complications), a => a.name)
		};

		return sourcebook;
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
			<AncestryModal ancestry={ancestry} />
		);
	};

	const onSelectCulture = (culture: Culture) => {
		setDrawer(
			<CultureModal culture={culture} />
		);
	};

	const onSelectCareer = (career: Career) => {
		setDrawer(
			<CareerModal career={career} />
		);
	};

	const onSelectClass = (heroClass: HeroClass) => {
		setDrawer(
			<ClassModal heroClass={heroClass} />
		);
	};

	const onSelectKit = (kit: Kit) => {
		setDrawer(
			<KitModal kit={kit} />
		);
	};

	const onSelectComplication = (complication: Complication) => {
		setDrawer(
			<ComplicationModal complication={complication} />
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
						showSourcebook={showSourcebook}
					/>
				);
			case Page.HeroList:
				return (
					<HeroListPage
						heroes={heroes}
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
						goHome={showWelcome}
						showAbout={showAbout}
						saveChanges={saveEditSelectedHero}
						cancelChanges={cancelEditSelectedHero}
					/>
				);
			case Page.Sourcebook:
				return (
					<SourcebookListPage
						sourcebook={getSourcebook()}
						goHome={showWelcome}
						showAbout={showAbout}
						viewAncestry={onSelectAncestry}
						viewCulture={onSelectCulture}
						viewCareer={onSelectCareer}
						viewClass={onSelectClass}
						viewKit={onSelectKit}
						viewComplication={onSelectComplication}
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
		case Page.Sourcebook:
			str = 'Sourcebook';
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
								options={[ 'Heroes', 'Sourcebook' ]}
								optionType='button'
								buttonStyle='solid'
								block={true}
								value={str}
								onChange={x => {
									switch (x.target.value) {
										case 'Heroes':
											showHeroList();
											break;
										case 'Sourcebook':
											showSourcebook();
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
