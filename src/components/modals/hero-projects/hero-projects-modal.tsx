import { Hero } from '@/models/hero';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { ProjectsPanel } from '@/components/modals/hero-projects/projects-panel/projects-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './hero-projects-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	onClose: () => void;
	onChange: (hero: Hero) => void;
}

export const HeroProjectsModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));

	const onChange = (hero: Hero) => {
		setHero(hero);
		props.onChange(hero);
	};

	return (
		<Modal
			content={
				<div className='hero-projects-modal'>
					<ProjectsPanel
						hero={hero}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={onChange}
					/>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
