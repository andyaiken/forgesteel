import { Input, Space } from 'antd';
import { Empty } from '../../../controls/empty/empty';
import { Modal } from '../../modal/modal';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { SubClass } from '../../../../models/subclass';
import { SubclassPanel } from '../../../panels/elements/subclass-panel/subclass-panel';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './subclass-select-modal.scss';

interface Props {
	subClasses: SubClass[];
	options: Options;
	onClose: () => void;
	onSelect: (subClass: SubClass) => void;
}

export const SubClassSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	try {
		const subClasses = props.subClasses
			.filter(l => Utils.textMatches([
				l.name,
				l.description
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
					<div className='subclass-select-modal'>
						<Space direction='vertical' style={{ width: '100%' }}>
							{
								subClasses.map((sc, n) => (
									<SelectablePanel
										key={n}
										onSelect={() => props.onSelect(sc)}
									>
										<SubclassPanel subclass={sc} options={props.options} mode={PanelMode.Compact} />
									</SelectablePanel>
								))
							}
							{
								subClasses.length === 0 ?
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
