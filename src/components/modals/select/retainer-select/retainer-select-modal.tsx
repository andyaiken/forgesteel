import { Input, Space } from 'antd';
import { Collections } from '@/utils/collections';
import { Empty } from '@/components/controls/empty/empty';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Modal } from '@/components/modals/modal/modal';
import { Monster } from '@/models/monster';
import { MonsterFilter } from '@/models/filter';
import { MonsterFilterPanel } from '@/components/panels/monster-filter/monster-filter-panel';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { Options } from '@/models/options';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './retainer-select-modal.scss';

interface Props {
	monsters: Monster[];
	sourcebooks: Sourcebook[];
	options: Options;
	onClose: () => void;
	onSelect: (monster: Monster) => void;
}

export const RetainerSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ filter, setFilter ] = useState<MonsterFilter>(FactoryLogic.createMonsterFilter());

	const monsters = props.monsters
		.filter(m => m.role.organization === MonsterOrganizationType.Retainer)
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
				<div className='retainer-select-modal'>
					<Space orientation='vertical' style={{ width: '100%' }}>
						<Expander title='Filter'>
							<HeaderText>Filter</HeaderText>
							<MonsterFilterPanel
								monsterFilter={filter}
								monsters={props.monsters}
								includeNameFilter={false}
								includeOrgFilter={false}
								includeEVFilter={false}
								onChange={setFilter}
							/>
						</Expander>
						{
							sortedMonsters.map(m => (
								<SelectablePanel
									key={m.id}
									onSelect={() => props.onSelect(m)}
								>
									<MonsterPanel monster={m} sourcebooks={props.sourcebooks} options={props.options} />
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
};
