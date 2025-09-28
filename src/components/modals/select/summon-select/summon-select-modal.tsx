import { Input, Space } from 'antd';
import { Collections } from '../../../../utils/collections';
import { Empty } from '../../../controls/empty/empty';
import { Modal } from '../../modal/modal';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterPanel } from '../../../panels/elements/monster-panel/monster-panel';
import { Options } from '../../../../models/options';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Summon } from '../../../../models/summon';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './summon-select-modal.scss';

interface Props {
	summons: Summon[];
	options: Options;
	selectOriginal?: boolean;
	onClose: () => void;
	onSelect: (summon: Summon) => void;
}

export const SummonSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	try {
		const summons = props.summons
			.filter(s => Utils.textMatches([
				s.monster.name,
				s.monster.description,
				...s.monster.keywords
			], searchTerm));

		const sortedSummons = Collections.sort(summons, s => MonsterLogic.getMonsterName(s.monster));

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
					<div className='summon-select-modal'>
						<Space direction='vertical' style={{ width: '100%' }}>
							{
								sortedSummons.map(s => (
									<SelectablePanel
										key={s.id}
										onSelect={() => props.onSelect(s)}
									>
										<MonsterPanel monster={s.monster} summon={s.info} options={props.options} />
									</SelectablePanel>
								))
							}
							{
								sortedSummons.length === 0 ?
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
