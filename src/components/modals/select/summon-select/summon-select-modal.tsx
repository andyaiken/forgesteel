import { Input, Space } from 'antd';
import { Collections } from '@/utils/collections';
import { Empty } from '@/components/controls/empty/empty';
import { Hero } from '@/models/hero';
import { Modal } from '@/components/modals/modal/modal';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Summon } from '@/models/summon';
import { SummonLogic } from '@/logic/summon-logic';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './summon-select-modal.scss';

interface Props {
	summons: Summon[];
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	onClose: () => void;
	onSelect: (summon: Summon) => void;
}

export const SummonSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

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
					<Space orientation='vertical' style={{ width: '100%' }}>
						{
							sortedSummons.map(s => (
								<SelectablePanel
									key={s.id}
									onSelect={() => props.onSelect(s)}
								>
									<MonsterPanel monster={SummonLogic.getSummonedMonster(s.monster, props.hero)} summon={s.info} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />
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
};
