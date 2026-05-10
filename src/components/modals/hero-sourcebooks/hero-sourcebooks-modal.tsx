import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Hero } from '@/models/hero';
import { HeroSourcebooksPanel } from '@/components/panels/hero-sourcebooks/hero-sourcebooks-panel';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './hero-sourcebooks-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	allSourcebooks: Sourcebook[];
	options: Options;
	onChange: (hero: Hero) => void;
	onImportSourcebook: (sourcebook: Sourcebook) => void;
	onClose: () => void;
}

export const HeroSourcebooksModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));

	const onChange = (sourcebookIDs: string[]) => {
		const heroCopy = Utils.copy(hero);
		heroCopy.settingIDs = sourcebookIDs;
		setHero(heroCopy);
		props.onChange(heroCopy);
	};

	return (
		<ErrorBoundary>
			<Modal
				content={
					<div className='hero-sourcebooks-modal'>
						<HeroSourcebooksPanel
							sourcebooks={props.allSourcebooks}
							sourcebookIDs={props.hero.settingIDs}
							onImportSourcebook={props.onImportSourcebook}
							onChange={onChange}
						/>
					</div>
				}
				onClose={props.onClose}
			/>
		</ErrorBoundary>
	);
};
