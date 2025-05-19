import { Button, Divider, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Empty } from '../../../controls/empty/empty';
import { Expander } from '../../../controls/expander/expander';
import { Hero } from '../../../../models/hero';
import { HeroLogic } from '../../../../logic/hero-logic';
import { Item } from '../../../../models/item';
import { ItemPanel } from '../../../panels/elements/item-panel/item-panel';
import { ItemType } from '../../../../enums/item-type';
import { Modal } from '../../modal/modal';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Toggle } from '../../../controls/toggle/toggle';
import { Utils } from '../../../../utils/utils';
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
	const [ showUsableOnly, setShowUsableOnly ] = useState<boolean>(true);
	const [ showTypes, setShowTypes ] = useState<{ [ type: string ]: boolean }>(() => {
		const types: { [ type: string ]: boolean } = {};
		props.types.forEach(type => {
			types[type] = true;
		});
		return types;
	});

	const setShowEverything = (value: boolean) => {
		const types = { ...showTypes };
		props.types.forEach(type => {
			types[type] = value;
		});
		setShowTypes(types);
	};

	try {
		const items = SourcebookLogic
			.getItems(props.sourcebooks)
			.filter(item => props.types.includes(item.type))
			.filter(item => !showUsableOnly || HeroLogic.canUseItem(props.hero, item))
			.filter(item => showTypes[item.type])
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
					<div className='item-select-modal'>
						<Space direction='vertical' style={{ width: '100%' }}>
							<Expander title='Filter'>
								<div className='item-type-filter-panel'>
									<Toggle label='Show everything' value={props.types.every(t => showTypes[t])} onChange={setShowEverything} />
									<Divider />
									{
										props.types.map(type => (
											<Toggle
												key={type}
												label={type}
												value={showTypes[type]}
												onChange={value => {
													const newTypes = { ...showTypes };
													newTypes[type] = value;
													setShowTypes(newTypes);
												}}
											/>
										))
									}
									<Divider />
									<Toggle label='Only show items you can use' value={showUsableOnly} onChange={setShowUsableOnly} />
								</div>
							</Expander>
							<Divider />
							{
								items.map(item => (
									<Expander
										key={item.id}
										title={item.name}
										tags={[ item.type ]}
										extra={[
											<Button
												key='select'
												type='text'
												icon={<PlusOutlined />}
												onClick={() => {
													if (props.selectOriginal) {
														props.onSelect(item);
													} else {
														const copy = Utils.copy(item);
														copy.id = Utils.guid();
														props.onSelect(copy);
													}
												}}
											/>
										]}
									>
										<ItemPanel item={item} options={props.options} hero={props.hero} mode={PanelMode.Full} />
									</Expander>
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
