import { Hero } from '@/models/hero';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { Modal } from '@/components/modals/modal/modal';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './hero-notes-modal.scss';

interface Props {
	hero: Hero;
	onClose: () => void;
	onChange: (hero: Hero) => void;
}

export const HeroNotesModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));

	const setNotes = (value: string) => {
		const copy = Utils.copy(hero);
		copy.state.notes = value;
		setHero(copy);
		props.onChange(copy);
	};

	return (
		<Modal
			content={
				<div className='hero-notes-modal'>
					<MarkdownEditor value={hero.state.notes} fill={true} onChange={setNotes} />
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
