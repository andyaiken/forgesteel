import { Ability } from '../../models/ability';
import { AbilityModal } from '../modals/ability/ability-modal';
import { AboutModal } from '../modals/about/about-modal';
import { Ancestry } from '../../models/ancestry';
import { AncestryPanel } from '../panels/ancestry-panel/ancestry-panel';
import { CampaignSettingData } from '../../data/campaign-setting-data';
import { Career } from '../../models/career';
import { CareerPanel } from '../panels/career-panel/career-panel';
import { Characteristic } from '../../enums/characteristic';
import { CharacteristicModal } from '../modals/characteristic/characteristic-modal';
import { ClassPanel } from '../panels/class-panel/class-panel';
import { Collections } from '../../utils/collections';
import { Complication } from '../../models/complication';
import { ComplicationPanel } from '../panels/complication-panel/complication-panel';
import { Culture } from '../../models/culture';
import { CulturePanel } from '../panels/culture-panel/culture-panel';
import { Drawer } from 'antd';
import { Hero } from '../../models/hero';
import { HeroClass } from '../../models/class';
import { HeroEditPage } from '../pages/hero-edit/hero-edit-page';
import { HeroListPage } from '../pages/hero-list/hero-list-page';
import { HeroLogic } from '../../logic/hero-logic';
import { HeroPage } from '../pages/hero-view/hero-view-page';
import { HeroStateModal } from '../modals/hero-state/hero-state-modal';
import { Kit } from '../../models/kit';
import { KitPanel } from '../panels/kit-panel/kit-panel';
import { PanelMode } from '../../enums/panel-mode';
import { Skill } from '../../models/skill';
import { SkillModal } from '../modals/skill/skill-modal';
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
	HeroEdit
}

interface Props {
	heroes: Hero[];
}

export const Main = (props: Props) => {
	const [ heroes, setHeroes ] = useState<Hero[]>(props.heroes);
	const [ page, setPage ] = useState<Page>(Page.Welcome);
	const [ selectedHero, setSelectedHero ] = useState<Hero | null>(null);
	const [ drawer, setDrawer ] = useState<JSX.Element | null>(null);

	const persistHeroes = (heroes: Hero[]) => {
		localforage.setItem<Hero[]>('forgesteel-heroes', heroes)
			.then(() => {
				setHeroes(heroes);
			});
	};

	const showAbout = () => {
		setDrawer(
			<AboutModal />
		);
	};

	const showHeroList = () => {
		setPage(Page.HeroList);
		setSelectedHero(null);
	};

	const goHome = () => {
		setPage(Page.Welcome);
		setSelectedHero(null);
	};

	const addHero = () => {
		const hero = HeroLogic.createHero(CampaignSettingData.orden.id);

		const copy = JSON.parse(JSON.stringify(heroes)) as Hero[];
		copy.push(hero);
		Collections.sort(copy, h => h.name);

		persistHeroes(copy);
		setPage(Page.HeroEdit);
		setSelectedHero(hero);
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

	const exportSelectedHero = (format: 'image' | 'pdf') => {
		if (selectedHero) {
			Utils.takeScreenshot(selectedHero.id, selectedHero.name || 'Unnamed Hero', format);
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
			const filtered = heroes.filter(h => h.id !== selectedHero.id);
			filtered.push(hero);

			persistHeroes(filtered);
			setPage(Page.HeroView);
			setSelectedHero(hero);
		}
	};

	const cancelEditSelectedHero = () => {
		if (selectedHero) {
			setPage(Page.HeroView);
		}
	};

	const onSelectAncestry = (ancestry: Ancestry) => {
		setDrawer(
			<AncestryPanel ancestry={ancestry} mode={PanelMode.Full} />
		);
	};

	const onSelectCulture = (culture: Culture) => {
		setDrawer(
			<CulturePanel culture={culture} mode={PanelMode.Full} />
		);
	};

	const onSelectCareer = (career: Career) => {
		setDrawer(
			<CareerPanel career={career} mode={PanelMode.Full} />
		);
	};

	const onSelectClass = (heroClass: HeroClass) => {
		setDrawer(
			<ClassPanel heroClass={heroClass} mode={PanelMode.Full} />
		);
	};

	const onSelectComplication = (complication: Complication) => {
		setDrawer(
			<ComplicationPanel complication={complication} mode={PanelMode.Full} />
		);
	};

	const onSelectKit = (kit: Kit) => {
		setDrawer(
			<KitPanel kit={kit} mode={PanelMode.Full} />
		);
	};

	const onSelectSkill = (skill: Skill) => {
		setDrawer(
			<SkillModal skill={skill} />
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
						setSelectedHero(updatedHero);

						const filtered = heroes.filter(h => h.id !== updatedHero.id);
						filtered.push(updatedHero);
						persistHeroes(filtered);
					}}
				/>
			);
		}
	};

	const getContent = () => {
		switch (page) {
			case Page.Welcome:
				return (
					<WelcomePage
						showAbout={showAbout}
						showHeroes={heroes.length === 0 ? addHero : showHeroList}
					/>
				);
			case Page.HeroList:
				return (
					<HeroListPage
						heroes={heroes}
						goHome={goHome}
						showAbout={showAbout}
						addHero={addHero}
						viewHero={viewHero}
					/>
				);
			case Page.HeroView:
				return (
					<HeroPage
						hero={selectedHero as Hero}
						goHome={goHome}
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
						onSelectSkill={onSelectSkill}
						onSelectCharacteristic={onSelectCharacteristic}
						onSelectAbility={onSelectAbility}
						onShowState={onShowState}
					/>
				);
			case Page.HeroEdit:
				return (
					<HeroEditPage
						hero={selectedHero as Hero}
						goHome={goHome}
						showAbout={showAbout}
						saveChanges={saveEditSelectedHero}
						cancelChanges={cancelEditSelectedHero}
					/>
				);
		}
	};

	return (
		<div className='main'>
			<div className='main-content'>
				{getContent()}
			</div>
			<div className='main-footer'>
				<div className='main-footer-section'>
					<img className='ds-logo' src={pbds} />
					<div>FORGE STEEL is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC</div>
				</div>
				<div className='main-footer-section'>
					DRAW STEEL © 2024 MCDM Productions, LLC
				</div>
				<div className='main-footer-section'>
					Designed by Andy Aiken
				</div>
			</div>
			<Drawer open={drawer !== null} onClose={() => setDrawer(null)} closeIcon={null} width='450px'>
				{drawer}
			</Drawer>
		</div>
	);
};
