import { Input, Space } from 'antd';
import { Empty } from '../../../controls/empty/empty';
import { Hero } from '../../../../models/hero';
import { Modal } from '../../modal/modal';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Perk } from '../../../../models/perk';
import { PerkPanel } from '../../../panels/elements/perk-panel/perk-panel';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './perk-select-modal.scss';

interface Props {
	perks: Perk[];
	hero: Hero;
	options: Options;
	onClose: () => void;
	onSelect: (perk: Perk) => void;
}

export const PerkSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	try {
		const perks = props.perks
			.filter(p => Utils.textMatches([
				p.name,
				p.description
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
					<div className='perk-select-modal'>
						<Space direction='vertical' style={{ width: '100%' }}>
							{
								perks.map(p => (
									<SelectablePanel
										key={p.id}
										onSelect={() => props.onSelect(p)}
									>
										<PerkPanel perk={p} hero={props.hero} mode={PanelMode.Full} options={props.options} />
									</SelectablePanel>
								))
							}
							{
								perks.length === 0 ?
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
