import { Analytics } from '@/utils/analytics';
import { Collections } from '@/utils/collections';
import { Complication } from '@/models/complication';
import { ComplicationPanel } from '@/components/panels/elements/complication-panel/complication-panel';
import { Empty } from '@/components/controls/empty/empty';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Modal } from '@/components/modals/modal/modal';
import { PanelMode } from '@/enums/panel-mode';
import { SearchBox } from '@/components/controls/text-input/text-input';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Space } from 'antd';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './complication-select-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	onClose: () => void;
	onSelect: (complication: Complication) => void;
}

export const ComplicationSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	const selectComplication = (complication: Complication) => {
		Analytics.logElementSelected(complication, 'Complication');
		props.onSelect(Utils.copy(complication));
	};

	// A hero shouldn't take the same complication twice; its features would collide
	const currentIDs = HeroLogic.getComplications(props.hero).map(c => c.id);
	const complications = Collections.sort(
		SourcebookLogic.getComplications(props.sourcebooks).filter(c => !currentIDs.includes(c.id)),
		c => c.name
	).filter(c => Utils.textMatches([
		c.name,
		c.description
	], searchTerm));

	return (
		<Modal
			toolbar={
				<SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			}
			content={
				<div className='complication-select-modal'>
					<Space orientation='vertical' style={{ width: '100%' }}>
						{
							complications.map(c => (
								<SelectablePanel
									key={c.id}
									onSelect={() => selectComplication(c)}
								>
									<ComplicationPanel complication={c} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
								</SelectablePanel>
							))
						}
						{
							complications.length === 0 ?
								<Empty text='No complications available.' />
								: null
						}
					</Space>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
