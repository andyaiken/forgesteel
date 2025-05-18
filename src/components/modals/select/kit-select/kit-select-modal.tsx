import { Input, Space } from 'antd';
import { Empty } from '../../../controls/empty/empty';
import { Hero } from '../../../../models/hero';
import { Kit } from '../../../../models/kit';
import { KitPanel } from '../../../panels/elements/kit-panel/kit-panel';
import { Modal } from '../../modal/modal';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './kit-select-modal.scss';

interface Props {
	kits: Kit[];
	hero: Hero;
	options: Options;
	onClose: () => void;
	onSelect: (kits: Kit) => void;
}

export const KitSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	try {
		const kits = props.kits
			.filter(k => Utils.textMatches([
				k.name,
				k.description
			], searchTerm));

		return (
			<Modal
				toolbar={
					<>
						<Input
							name='search'
							placeholder='Search'
							allowClear={true}
							value={searchTerm}
							suffix={<SearchOutlined />}
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</>
				}
				content={
					<div className='kit-select-modal'>
						<Space direction='vertical' style={{ width: '100%' }}>
							{
								kits.map(k => (
									<SelectablePanel
										key={k.id}
										onSelect={() => props.onSelect(k)}
									>
										<KitPanel kit={k} hero={props.hero} options={props.options} mode={PanelMode.Full} />
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
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
