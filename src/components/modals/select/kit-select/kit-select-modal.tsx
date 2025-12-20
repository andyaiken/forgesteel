import { Empty } from '@/components/controls/empty/empty';
import { Hero } from '@/models/hero';
import { Kit } from '@/models/kit';
import { KitPanel } from '@/components/panels/elements/kit-panel/kit-panel';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SearchBox } from '@/components/controls/text-input/text-input';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Space } from 'antd';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './kit-select-modal.scss';

interface Props {
	kits: Kit[];
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	onClose: () => void;
	onSelect: (kits: Kit) => void;
}

export const KitSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	const kits = props.kits
		.filter(k => Utils.textMatches([
			k.name,
			k.description
		], searchTerm));

	return (
		<Modal
			toolbar={
				<SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			}
			content={
				<div className='kit-select-modal'>
					<Space orientation='vertical' style={{ width: '100%' }}>
						{
							kits.map(k => (
								<SelectablePanel
									key={k.id}
									onSelect={() => props.onSelect(k)}
								>
									<KitPanel kit={k} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />
								</SelectablePanel>
							))
						}
						{
							kits.length === 0 ?
								<Empty />
								: null
						}
					</Space>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
