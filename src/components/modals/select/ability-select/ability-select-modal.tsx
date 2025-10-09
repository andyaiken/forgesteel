import { Input, Space } from 'antd';
import { Ability } from '@/models/ability';
import { AbilityPanel } from '@/components/panels/elements/ability-panel/ability-panel';
import { Empty } from '@/components/controls/empty/empty';
import { Hero } from '@/models/hero';
import { Modal } from '@/components/modals/modal/modal';
import { PanelMode } from '@/enums/panel-mode';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './ability-select-modal.scss';

interface Props {
	abilities: Ability[];
	hero: Hero;
	onClose: () => void;
	onSelect: (ability: Ability) => void;
}

export const AbilitySelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	const abilities = props.abilities
		.filter(a => Utils.textMatches([
			a.name,
			a.description,
			a.type.usage,
			...a.keywords,
			...a.sections.filter(s => s.type === 'text').map(s => s.text),
			...a.sections.filter(s => s.type === 'field').map(s => s.effect)
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
				<div className='ability-select-modal'>
					<Space direction='vertical' style={{ width: '100%' }}>
						{
							abilities.map(a => (
								<SelectablePanel
									key={a.id}
									onSelect={() => props.onSelect(a)}
								>
									<AbilityPanel ability={a} hero={props.hero} mode={PanelMode.Full} />
								</SelectablePanel>
							))
						}
						{
							abilities.length === 0 ?
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
