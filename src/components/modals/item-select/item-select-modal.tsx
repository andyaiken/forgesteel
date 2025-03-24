import { Button, Input, Space } from 'antd';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Empty } from '../../controls/empty/empty';
import { Hero } from '../../../models/hero';
import { Item } from '../../../models/item';
import { ItemPanel } from '../../panels/elements/item-panel/item-panel';
import { ItemType } from '../../../enums/item-type';
import { Modal } from '../modal/modal';
import { Options } from '../../../models/options';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookLogic } from '../../../logic/sourcebook-logic';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './item-select-modal.scss';

interface Props {
	types: ItemType[];
	sourcebooks: Sourcebook[];
	options: Options;
	hero: Hero;
	selectOriginal?: boolean;
	onClose: () => void;
	onSelect: (item: Item) => void;
}

export const ItemSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	try {
		const items = SourcebookLogic
			.getItems(props.sourcebooks)
			.filter(item => props.types.includes(item.type))
			.filter(item => Utils.textMatches([
				item.name,
				item.description,
				...item.keywords,
				...item.featuresByLevel.flatMap(lvl => lvl.features.map(f => f.name))
			], searchTerm));

		return (
			<Modal
				toolbar={
					<>
						<Input
							placeholder='Search'
							allowClear={true}
							value={searchTerm}
							suffix={<SearchOutlined />}
							onChange={e => setSearchTerm(e.target.value)}
						/>
						<Button icon={<CloseOutlined />} onClick={props.onClose}>Cancel</Button>
					</>
				}
				content={
					<div className='item-select-modal'>
						<Space direction='vertical' style={{ width: '100%' }}>
							{
								items.map(item => (
									<SelectablePanel
										key={item.id}
										onSelect={() => {
											if (props.selectOriginal) {
												props.onSelect(item);
											} else {
												const copy = Utils.copy(item);
												copy.id = Utils.guid();
												props.onSelect(copy);
											}
										}}
									>
										<ItemPanel item={item} options={props.options} hero={props.hero} />
									</SelectablePanel>
								))
							}
							{
								items.length === 0 ?
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
