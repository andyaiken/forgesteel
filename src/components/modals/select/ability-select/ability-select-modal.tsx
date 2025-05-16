import { Input, Space } from 'antd';
import { Ability } from '../../../../models/ability';
import { AbilityPanel } from '../../../panels/elements/ability-panel/ability-panel';
import { Empty } from '../../../controls/empty/empty';
import { Hero } from '../../../../models/hero';
import { Modal } from '../../modal/modal';
import { PanelMode } from '../../../../enums/panel-mode';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Utils } from '../../../../utils/utils';
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

	try {
		const abilities = props.abilities
			.filter(a => Utils.textMatches([
				a.name,
				a.description
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
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
