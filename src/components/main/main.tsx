import { Breadcrumb, Button, Drawer, Space } from 'antd';
import { AboutModal } from '../modals/about/about';
import { CampaignSettingData } from '../../data/campaign-setting-data';
import { Collections } from '../../utils/collections';
import { Hero } from '../../models/hero';
import { HeroEditPage } from '../pages/hero-edit/hero-edit-page';
import { HeroListPage } from '../pages/hero-list/hero-list-page';
import { HeroLogic } from '../../logic/hero-logic';
import { HeroPage } from '../pages/hero-view/hero-view-page';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Utils } from '../../utils/utils';
import localforage from 'localforage';
import { useState } from 'react';

import pbds from '../../assets/powered-by-draw-steel.png';
import './main.scss';

enum Page {
	HeroList,
	HeroView,
	HeroEdit
}

interface Props {
	heroes: Hero[];
}

export const Main = (props: Props) => {
	const [ page, setPage ] = useState<Page>(Page.HeroList);
	const [ heroes, setHeroes ] = useState<Hero[]>(props.heroes);
	const [ selectedHero, setSelectedHero ] = useState<Hero | null>(null);
	const [ drawer, setDrawer ] = useState<JSX.Element | null>(null);

	const persistHeroes = (heroes: Hero[]) => {
		localforage.setItem<Hero[]>('forgesteel-heroes', heroes)
			.then(() => {
				setHeroes(heroes);
			});
	};

	const mcdm = () => {
		window.open('https://mcdmproductions.com/', '_blank');
	};

	const showAbout = () => {
		setDrawer(
			<AboutModal />
		);
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

	const exportSelectedHero = () => {
		if (selectedHero) {
			Utils.takeScreenshot(selectedHero.id, selectedHero.name || 'Unnamed Hero');
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

	const getBreadcrumbs = () => {
		switch (page) {
			case Page.HeroList:
				return [
					{ title: 'Heroes' }
				];
			case Page.HeroView:
				return [
					{ title: 'Heroes', href: '', onClick: closeSelectedHero },
					{ title: selectedHero?.name || 'Unnamed Hero' }
				];
			case Page.HeroEdit:
				return [
					{ title: 'Heroes', href: '', onClick: closeSelectedHero },
					{ title: selectedHero?.name || 'Unnamed Hero', href: '', onClick: cancelEditSelectedHero },
					{ title: 'Edit' }
				];
		}
	};

	const getContent = () => {
		switch (page) {
			case Page.HeroList:
				return (
					<HeroListPage
						heroes={heroes}
						addHero={addHero}
						viewHero={viewHero}
					/>
				);
			case Page.HeroView:
				return (
					<HeroPage
						hero={selectedHero as Hero}
						closeHero={closeSelectedHero}
						editHero={editSelectedHero}
						exportHero={exportSelectedHero}
						deleteHero={deleteSelectedHero}
					/>
				);
			case Page.HeroEdit:
				return (
					<HeroEditPage
						hero={selectedHero as Hero}
						saveChanges={saveEditSelectedHero}
						cancelChanges={cancelEditSelectedHero}
					/>
				);
		}
	};

	return (
		<div className='main'>
			<div className='main-header'>
				<div className='title'>Forge Steel</div>
				<Breadcrumb items={getBreadcrumbs()} />
				<Space />
				<div className='action-buttons'>
					<QuestionCircleOutlined style={{ fontSize: '20px' }} onClick={showAbout} />
					<QuestionCircleOutlined style={{ fontSize: '20px' }} onClick={showAbout} />
				</div>
			</div>
			<div className='main-content'>
				{getContent()}
			</div>
			<div className='main-footer'>
				<div className='main-footer-section'>
					<img src={pbds} style={{ height: '30px' }} />
					<div>FORGE STEEL is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC</div>
				</div>
				<Button type='text' onClick={mcdm}>DRAW STEEL © 2024 MCDM Productions, LLC</Button>
				<Button type='text' onClick={showAbout}>App design by Andy Aiken</Button>
			</div>
			<Drawer open={drawer !== null} onClose={() => setDrawer(null)} closeIcon={null}>
				{drawer}
			</Drawer>
		</div>
	);
};