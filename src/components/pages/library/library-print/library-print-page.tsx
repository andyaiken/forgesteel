import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { Element } from '@/models/element';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { PrintSheet } from '@/components/panels/print-sheet/print-sheet';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useTitle } from '@/hooks/use-title';

import './library-print-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
}

export const LibraryPrintPage = (props: Props) => {
	const { kind, sourcebookID, elementID } = useParams<{ kind: SourcebookElementKind, sourcebookID: string, elementID: string }>();
	const [ element ] = useState<Element>(() => {
		const sourcebook = props.sourcebooks.find(s => s.id === sourcebookID)!;
		switch (kind!) {
			case 'adventure':
				return sourcebook.adventures.find(e => e.id === elementID)!;
			case 'ancestry':
				return sourcebook.ancestries.find(e => e.id === elementID)!;
			case 'career':
				return sourcebook.careers.find(e => e.id === elementID)!;
			case 'class':
				return sourcebook.classes.find(e => e.id === elementID)!;
			case 'complication':
				return sourcebook.complications.find(e => e.id === elementID)!;
			case 'culture':
				return sourcebook.cultures.find(e => e.id === elementID)!;
			case 'domain':
				return sourcebook.domains.find(e => e.id === elementID)!;
			case 'encounter':
				return sourcebook.encounters.find(e => e.id === elementID)!;
			case 'item':
				return sourcebook.items.find(e => e.id === elementID)!;
			case 'imbuement':
				return sourcebook.imbuements.find(e => e.id === elementID)!;
			case 'kit':
				return sourcebook.kits.find(e => e.id === elementID)!;
			case 'monster-group':
				return sourcebook.monsterGroups.find(e => e.id === elementID)!;
			case 'montage':
				return sourcebook.montages.find(e => e.id === elementID)!;
			case 'negotiation':
				return sourcebook.negotiations.find(e => e.id === elementID)!;
			case 'perk':
				return sourcebook.perks.find(e => e.id === elementID)!;
			case 'project':
				return sourcebook.projects.find(e => e.id === elementID)!;
			case 'subclass':
				return sourcebook.subclasses.find(e => e.id === elementID)!;
			case 'tactical-map':
				return sourcebook.tacticalMaps.find(e => e.id === elementID)!;
			case 'terrain':
				return sourcebook.terrain.find(e => e.id === elementID)!;
			case 'title':
				return sourcebook.titles.find(e => e.id === elementID)!;
		}
	});

	useTitle(element.name || 'Unnamed Element');

	return (
		<ErrorBoundary>
			<div className='library-print-page'>
				<PrintSheet
					type={kind!}
					element={element}
					sourcebooks={props.sourcebooks}
					heroes={props.heroes}
					options={props.options}
				/>
			</div>
		</ErrorBoundary>
	);
};
