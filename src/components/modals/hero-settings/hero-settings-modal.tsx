import { Hero } from '@/models/hero';
import { HeroSourcebooksPanel } from '@/components/panels/hero-sourcebooks/hero-sourcebooks-panel';
import { HeroTutorialPanel } from '@/components/panels/hero-tutorial/hero-tutorial-panel';
import { Modal } from '@/components/modals/modal/modal';
import { Sourcebook } from '@/models/sourcebook';
import { TutorialMode } from '@/enums/tutorial-mode';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './hero-settings-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	allSourcebooks: Sourcebook[];
	onChange: (hero: Hero) => void;
	onImportSourcebook: (sourcebook: Sourcebook) => void;
	onClose: () => void;
}

export const HeroSettingsModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));

	const setTutorialMode = (value: TutorialMode) => {
		const heroCopy = Utils.copy(hero);
		heroCopy.state.tutorialMode = value;
		setHero(heroCopy);
		props.onChange(heroCopy);
	};

	const setSourcebookIDs = (sourcebookIDs: string[]) => {
		const heroCopy = Utils.copy(hero);
		heroCopy.sourcebookIDs = sourcebookIDs;
		setHero(heroCopy);
		props.onChange(heroCopy);
	};

	return (
		<Modal
			content={
				<div className='hero-settings-modal'>
					<HeroTutorialPanel
						value={hero.state.tutorialMode}
						onChange={setTutorialMode}
					/>
					<HeroSourcebooksPanel
						sourcebooks={props.allSourcebooks}
						sourcebookIDs={hero.sourcebookIDs}
						onImportSourcebook={props.onImportSourcebook}
						onChange={setSourcebookIDs}
					/>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
