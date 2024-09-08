import { Breadcrumb } from 'antd';
import { CampaignSettingData } from '../../data/campaign-setting-data';
import { Collections } from '../../utils/collections';
import { Factory } from '../../utils/factory';
import { Hero } from '../../models/hero';
import { HeroEditPage } from '../pages/hero-edit/hero-edit-page';
import { HeroListPage } from '../pages/hero-list/hero-list-page';
import { HeroPage } from '../pages/hero-view/hero-view-page';
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

	const persistHeroes = (heroes: Hero[]) => {
		localforage.setItem<Hero[]>('forgesteel-heroes', heroes)
			.then(() => {
				setHeroes(heroes);
			});
	};

	const addHero = () => {
		const hero = Factory.createHero(CampaignSettingData.orden.id);

		const copy = JSON.parse(JSON.stringify(heroes)) as Hero[];
		copy.push(hero);
		Collections.sort(copy, h => h.name);

		persistHeroes(copy);
		setPage(Page.HeroView);
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
			</div>
			<div className='main-content'>
				{getContent()}
			</div>
			<div className='main-footer'>
				<img src={pbds} style={{ height: '30px' }} />
				<div>FORGE STEEL is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC</div>
				<a href='https://www.mcdmproductions.com/' target='_blank'>DRAW STEEL © 2024 MCDM Productions, LLC</a>
				<a href='mailto:andy.aiken@live.co.uk'>App design by Andy Aiken</a>
			</div>
		</div>
	);
};
