import { Alert, Button, Input, Space } from 'antd';
import { Item } from '../../../models/item';
import { ItemPanel } from '../../panels/elements/item-panel/item-panel';
import { Modal } from '../modal/modal';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookLogic } from '../../../logic/sourcebook-logic';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './shop-modal.scss';

interface Props {
	sourcebooks: Sourcebook[];
	onSelect: (item: Item) => void;
	onCancel: () => void;
}

export const ShopModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	try {
		const items = SourcebookLogic
			.getItems(props.sourcebooks)
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
						<Button onClick={props.onCancel}>Cancel</Button>
					</>
				}
				content={
					<div className='shop-modal'>
						<Space direction='vertical' style={{ width: '100%' }}>
							{
								items.map(item => (
									<SelectablePanel
										key={item.id}
										onSelect={() => {
											const copy = JSON.parse(JSON.stringify(item)) as Item;
											copy.id = Utils.guid();
											props.onSelect(copy);
										}}
									>
										<ItemPanel item={item} />
									</SelectablePanel>
								))
							}
							{
								items.length === 0 ?
									<Alert
										type='warning'
										showIcon={true}
										message='No items to show'
									/>
									: null
							}
						</Space>
					</div>
				}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
