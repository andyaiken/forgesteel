import { Drawer, Space } from 'antd';
import { Analytics } from '@/utils/analytics';
import { Collections } from '@/utils/collections';
import { Empty } from '@/components/controls/empty/empty';
import { Hero } from '@/models/hero';
import { Modal } from '@/components/modals/modal/modal';
import { MonsterInfo } from '@/components/panels/token/token';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { PanelMode } from '@/enums/panel-mode';
import { SearchBox } from '@/components/controls/text-input/text-input';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SelectionBox } from '@/components/panels/feature-config-panel/feature-config-panel';
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
	onClose: () => void;
	onSelect: (summon: Summon) => void;
}

export const SummonSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ selected, setSelected ] = useState<Summon | null>(null);

	const onSelect = (summon: Summon) => {
		Analytics.logElementSelected(summon, 'Summon');
		props.onSelect(summon);
	};

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
				<SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			}
			content={
				<div className='summon-select-modal'>
					<Space orientation='vertical' style={{ width: '100%' }}>
						{
							sortedSummons.map(s => (
								<>
									<SelectablePanel
										key={s.id}
										style={{ padding: '10px' }}
										onSelect={() => onSelect(s)}
									>
										<SelectionBox
											content={<MonsterInfo monster={SummonLogic.getSummonedMonster(s, props.hero)} />}
											transparent={true}
											onSelect={() => setSelected(s)}
										/>
									</SelectablePanel>
								</>
							))
						}
						{
							sortedSummons.length === 0 ?
								<Empty />
								: null
						}
					</Space>
					<Drawer open={!!selected} onClose={() => setSelected(null)} closeIcon={null} size={500}>
						<Modal
							content={selected ? <MonsterPanel monster={SummonLogic.getSummonedMonster(selected, props.hero)} summon={selected.info} sourcebooks={props.sourcebooks} mode={PanelMode.Full} /> : null}
							onClose={() => setSelected(null)}
						/>
					</Drawer>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
