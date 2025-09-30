import { Markdown } from '@/components/controls/markdown/markdown';

import './notes-card.scss';

interface Props {
	notes: string;
}

export const NotesCard = (props: Props) => {
	const notes = props.notes;

	return (
		<div className='notes card'>
			<h2>Notes</h2>
			<div className='content'>
				<Markdown text={notes} />
			</div>
		</div>
	);
};
