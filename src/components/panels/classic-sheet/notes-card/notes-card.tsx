import { Markdown } from '@/components/controls/markdown/markdown';

import './notes-card.scss';

interface NotesProps {
	notes: string;
}

export const NotesCard = (props: NotesProps) => {
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

interface GenericProps {
	title: string;
	content: string;
}

export const GenericCard = (props: GenericProps) => {
	return (
		<div className='card'>
			<h2>{props.title}</h2>
			<div className='content'>
				<Markdown text={props.content} />
			</div>
		</div>
	);
};
