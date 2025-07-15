import { Alert, Input, Space } from 'antd';
import { Collections } from '../../../../utils/collections';
import { Empty } from '../../../controls/empty/empty';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { Modal } from '../../modal/modal';
import { Monster } from '../../../../models/monster';
import { MonsterFilter } from '../../../../models/filter';
import { MonsterFilterPanel } from '../../../panels/monster-filter/monster-filter-panel';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterPanel } from '../../../panels/elements/monster-panel/monster-panel';
import { Options } from '../../../../models/options';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './monster-select-modal.scss';

interface Props {
	monsters: Monster[];
	subset?: 'mount' | 'retainer';
	options: Options;
	selectOriginal?: boolean;
	onClose: () => void;
	onSelect: (monster: Monster) => void;
}

export const MonsterSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ filter, setFilter ] = useState<MonsterFilter>(FactoryLogic.createMonsterFilter());

	try {
		const monsters = props.monsters
			.filter(m => MonsterLogic.matches(m, filter))
			.filter(m => Utils.textMatches([
				m.name,
				m.description,
				...m.keywords
			], searchTerm));

		const sortedMonsters = Collections.sort(monsters, m => MonsterLogic.getMonsterName(m));

		return (
			<Modal
				toolbar={
					<Input
						name='search'
						placeholder='Search'
						allowClear={true}
						value={searchTerm}
						suffix={<SearchOutlined />}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				}
				content={
					<div className='monster-select-modal'>
						<Space direction='vertical' style={{ width: '100%' }}>
							{
								props.subset ?
									<Alert
										showIcon={true}
										message={`Showing only ${props.subset}s.`}
									/>
									: null
							}
							<Expander title='Filter'>
								<MonsterFilterPanel
									monsterFilter={filter}
									monsters={props.monsters}
									includeNameFilter={false}
									onChange={setFilter}
								/>
							</Expander>
							{
								sortedMonsters.map(m => (
									<SelectablePanel
										key={m.id}
										onSelect={() => {
											if (props.selectOriginal) {
												props.onSelect(m);
											} else {
												const copy = Utils.copy(m);
												copy.id = Utils.guid();
												props.onSelect(copy);
											}
										}}
									>
										<MonsterPanel monster={m} options={props.options} />
									</SelectablePanel>
								))
							}
							{
								sortedMonsters.length === 0 ?
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
