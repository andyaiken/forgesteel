import { CharacterSheet } from '../../../../models/character-sheet';
import { JSX } from 'react';

import './notes-card.scss';

interface Props {
	character: CharacterSheet;
}

export const NotesCard = (props: Props) => {
	const character = props.character;

	const displayNotes = (notes: string): JSX.Element[] => {
		return notes.split('\n').map((t, i) => {
			return (
				<p key={i}>{t}</p>
			);
		});
	};

	return (
		<div className='notes card'>
			<h2>Notes</h2>
			{displayNotes(character.notes)}
		</div>
	);
};
