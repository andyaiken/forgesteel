import { CustomizePanel } from './customize-panel/customize-panel';
import { Hero } from '../../../models/hero';
import { HeroHealthPanel } from '../../panels/health/health-panel';
import { HeroLogic } from '../../../logic/hero-logic';
import { HeroStatePage } from '../../../enums/hero-state-page';
import { InventoryPanel } from './inventory-panel/inventory-panel';
import { Modal } from '../modal/modal';
import { Options } from '../../../models/options';
import { ProjectsPanel } from './projects-panel/projects-panel';
import { Segmented } from 'antd';
import { Sourcebook } from '../../../models/sourcebook';
import { StatsPanel } from './stats-panel/stats-panel';
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
	const [ page, setPage ] = useState<HeroStatePage>(props.startPage);

	const getContent = () => {
		switch (page) {
			case HeroStatePage.Hero:
				return (
					<StatsPanel
						hero={props.hero}
						onChange={props.onChange}
						onLevelUp={props.onLevelUp}
					/>
				);
			case HeroStatePage.Vitals:
				return (
					<HeroHealthPanel
						hero={props.hero}
						showEncounterControls={props.showEncounterControls}
						onChange={props.onChange}
					/>
				);
			case HeroStatePage.Inventory:
				return (
					<InventoryPanel
						hero={props.hero}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={props.onChange}
					/>
				);
			case HeroStatePage.Projects:
				return (
					<ProjectsPanel
						hero={props.hero}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={props.onChange}
					/>
				);
			case HeroStatePage.Customize:
				return (
					<CustomizePanel
						hero={props.hero}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={props.onChange}
					/>
				);
		}
	};

	try {
		return (
			<Modal
				toolbar={
					<div style={{ width: '100%' }}>
						<Segmented
							name='tabs'
							block={true}
							options={
								HeroLogic.getStamina(props.hero) !== 0 ?
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
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
