import { Input, Space } from 'antd';
import { Empty } from '@/components/controls/empty/empty';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Perk } from '@/models/perk';
import { PerkList } from '@/enums/perk-list';
import { PerkPanel } from '@/components/panels/elements/perk-panel/perk-panel';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Utils } from '@/utils/utils';
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
						{
							[ PerkList.Crafting, PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural ].map(list => {
								const subset = perks.filter(p => p.list === list);
								if (subset.length === 0) {
									return null;
								}

								return (
									<Space key={list} direction='vertical' style={{ width: '100%' }}>
										<HeaderText level={1}>{list}</HeaderText>
										{
											subset.map((p, n) => (
												<SelectablePanel key={n} onSelect={() => props.onSelect(p)}>
													<PerkPanel perk={p} hero={props.hero} mode={PanelMode.Full} options={props.options} />
												</SelectablePanel>
											))
										}
									</Space>
								);
							})
						}
						{
							perks.length === 0 ?
								<Empty />
								: null
						}
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
