import { CustomizePanel } from '@/components/modals/hero-state/customize-panel/customize-panel';
import { Hero } from '@/models/hero';
import { HeroHealthPanel } from '@/components/panels/health/health-panel';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroStatePage } from '@/enums/hero-state-page';
import { InventoryPanel } from '@/components/modals/hero-state/inventory-panel/inventory-panel';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { ProjectsPanel } from '@/components/modals/hero-state/projects-panel/projects-panel';
import { Segmented } from 'antd';
import { Sourcebook } from '@/models/sourcebook';
import { StatsPanel } from '@/components/modals/hero-state/stats-panel/stats-panel';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './hero-state-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	startPage: HeroStatePage;
	showEncounterControls: boolean;
	onClose: () => void;
	onChange: (hero: Hero) => void;
	onLevelUp?: (hero: Hero) => void;
}

export const HeroStateModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));
	const [ page, setPage ] = useState<HeroStatePage>(props.startPage);

	const onChange = (hero: Hero) => {
		setHero(hero);
		props.onChange(hero);
	};

	const getContent = () => {
		switch (page) {
			case HeroStatePage.Hero:
				return (
					<StatsPanel
						hero={hero}
						onChange={onChange}
						onLevelUp={props.onLevelUp}
					/>
				);
			case HeroStatePage.Vitals:
				return (
					<HeroHealthPanel
						hero={hero}
						showEncounterControls={props.showEncounterControls}
						onChange={onChange}
					/>
				);
			case HeroStatePage.Inventory:
				return (
					<InventoryPanel
						hero={hero}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={onChange}
					/>
				);
			case HeroStatePage.Projects:
				return (
					<ProjectsPanel
						hero={hero}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={onChange}
					/>
				);
			case HeroStatePage.Customize:
				return (
					<CustomizePanel
						hero={hero}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={onChange}
					/>
				);
		}
	};

	return (
		<Modal
			toolbar={
				<div style={{ width: '100%' }}>
					<Segmented
						name='tabs'
						block={true}
						options={
							HeroLogic.getStamina(hero) !== 0 ?
								[
									HeroStatePage.Hero,
									HeroStatePage.Vitals,
									HeroStatePage.Inventory,
									HeroStatePage.Projects,
									HeroStatePage.Customize
								]
								:
								[
									HeroStatePage.Vitals
								]
						}
						value={page}
						onChange={setPage}
					/>
				</div>
			}
			content={
				<div className='hero-state-modal'>
					{getContent()}
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
