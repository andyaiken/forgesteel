import { Drawer, Space } from 'antd';
import { ButtonGroup } from '@/components/controls/button-group/button-group';
import { Collections } from '@/utils/collections';
import { DownloadOutlined } from '@ant-design/icons';
import { Empty } from '@/components/controls/empty/empty';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { ImportCodeModal } from '@/components/modals/import-code/import-code-modal';
import { Modal } from '@/components/modals/modal/modal';
import { Monster } from '@/models/monster';
import { MonsterFilter } from '@/models/filter';
import { MonsterFilterPanel } from '@/components/panels/monster-filter/monster-filter-panel';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { SearchBox } from '@/components/controls/text-input/text-input';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './monster-select-modal.scss';

interface Props {
	monsters: Monster[];
	sourcebooks: Sourcebook[];
	onClose: () => void;
	onSelect: (monster: Monster) => void;
}

export const MonsterSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ filter, setFilter ] = useState<MonsterFilter>(FactoryLogic.createMonsterFilter());
	const [ importVisible, setImportVisible ] = useState<boolean>(false);

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
				<>
					<SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
					<ButtonGroup
						buttons={[
							{ type: 'button', icon: <DownloadOutlined />, tooltip: 'Import a code', onClick: () => setImportVisible(true) }
						]}
					/>
				</>
			}
			content={
				<div className='monster-select-modal'>
					<Space orientation='vertical' style={{ width: '100%' }}>
						<Expander title='Filter'>
							<HeaderText>Filter</HeaderText>
							<MonsterFilterPanel
								monsterFilter={filter}
								monsters={props.monsters}
								includeNameFilter={false}
								includeOrgFilter={true}
								includeEVFilter={true}
								onChange={setFilter}
							/>
						</Expander>
						{
							sortedMonsters.map(m => (
								<SelectablePanel
									key={m.id}
									onSelect={() => props.onSelect(m)}
								>
									<MonsterPanel monster={m} sourcebooks={props.sourcebooks} />
								</SelectablePanel>
							))
						}
						{
							sortedMonsters.length === 0 ?
								<Empty />
								: null
						}
					</Space>
					<Drawer open={importVisible} onClose={() => setImportVisible(false)} closeIcon={null} size={500}>
						<ImportCodeModal
							kind='monster'
							sourcebooks={props.sourcebooks}
							onImport={element => {
								setImportVisible(false);
								props.onSelect(element as Monster);
							}}
							onClose={() => setImportVisible(false)}
						/>
					</Drawer>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
