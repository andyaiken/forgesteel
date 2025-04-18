import { Input, Space } from 'antd';
import { Collections } from '../../../utils/collections';
import { Empty } from '../../controls/empty/empty';
import { Modal } from '../modal/modal';
import { Monster } from '../../../models/monster';
import { MonsterLogic } from '../../../logic/monster-logic';
import { MonsterOrganizationType } from '../../../enums/monster-organization-type';
import { MonsterPanel } from '../../panels/elements/monster-panel/monster-panel';
import { MonsterRoleType } from '../../../enums/monster-role-type';
import { Options } from '../../../models/options';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookLogic } from '../../../logic/sourcebook-logic';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './monster-select-modal.scss';

interface Props {
	type: 'companion' | 'mount' | 'retainer';
	sourcebooks: Sourcebook[];
	options: Options;
	selectOriginal?: boolean;
	onClose: () => void;
	onSelect: (monster: Monster) => void;
}

export const MonsterSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	try {
		const monsters = SourcebookLogic
			.getMonsterGroups(props.sourcebooks)
			.flatMap(g => g.monsters)
			.filter(m => {
				switch (props.type) {
					case 'mount':
						return m.role.type === MonsterRoleType.Mount;
					case 'retainer':
						return m.role.organization === MonsterOrganizationType.Retainer;
				}

				return true;
			})
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
