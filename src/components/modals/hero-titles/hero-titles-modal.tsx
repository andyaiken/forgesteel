import { Hero } from '@/models/hero';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { TitlesPanel } from '@/components/modals/hero-titles/titles-panel/titles-panel';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './hero-titles-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	onClose: () => void;
	onChange: (hero: Hero) => void;
}

export const HeroTitlesModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));

	const onChange = (hero: Hero) => {
		setHero(hero);
		props.onChange(hero);
	};

	return (
		<Modal
			content={
				<div className='hero-titles-modal'>
					<TitlesPanel
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
