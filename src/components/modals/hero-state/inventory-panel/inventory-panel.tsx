import { Alert, Button, Drawer, Space } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureType } from '@/enums/feature-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Item } from '@/models/item';
import { ItemPanel } from '@/components/panels/elements/item-panel/item-panel';
import { ItemSelectModal } from '@/components/modals/select/item-select/item-select-modal';
import { ItemType } from '@/enums/item-type';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './inventory-panel.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (hero: Hero) => void;
}

export const InventoryPanel = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));
	const [ shopVisible, setShopVisible ] = useState<boolean>(false);

	const addItem = (item: Item) => {
		const copy = Utils.copy(hero);
		copy.state.inventory.push(item);
		setHero(copy);
		setShopVisible(false);
		props.onChange(copy);
	};

	const changeItem = (item: Item) => {
		const copy = Utils.copy(hero);
		const index = copy.state.inventory.findIndex(i => i.id === item.id);
		copy.state.inventory[index] = item;
		setHero(copy);
		props.onChange(copy);
	};

	const moveItem = (item: Item, direction: 'up' | 'down') => {
		const copy = Utils.copy(hero);
		const index = copy.state.inventory.findIndex(i => i.id === item.id);
		copy.state.inventory = Collections.move(copy.state.inventory, index, direction);
		setHero(copy);
		props.onChange(copy);
	};

	const deleteItem = (item: Item) => {
		const copy = Utils.copy(hero);
		copy.state.inventory = copy.state.inventory.filter(i => i.id !== item.id);
		setHero(copy);
		props.onChange(copy);
	};

	const items = [
		...hero.state.inventory.map(i => ({ item: i, source: 'inventory' })),
		...HeroLogic.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.ItemChoice)
			.flatMap(f => f.data.selected)
			.map(i => ({ item: i, source: 'feature' }))
	];

	let warning = null;
	if (items.filter(i => [ ItemType.Leveled, ItemType.LeveledArmor, ItemType.LeveledImplement, ItemType.LeveledWeapon ].includes(i.item.type)).length > 3) {
		warning = (
			<Alert
				type='warning'
				showIcon={true}
				title='You can only use 3 leveled items at a time.'
			/>
		);
	}

	return (
		<ErrorBoundary>
			<Space orientation='vertical' style={{ width: '100%', paddingBottom: '20px' }}>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={() => setShopVisible(true)} />
					}
				>
					Inventory
				</HeaderText>
				{warning}
				{
					items.map(i => {
						switch (i.source) {
							case 'inventory':
								return (
									<Expander
										key={i.item.id}
										title={i.item.count === 1 ? i.item.name : `${i.item.name} (x${i.item.count})`}
										tags={[ i.item.type ]}
										extra={[
											<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveItem(i.item, 'up'); }} />,
											<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveItem(i.item, 'down'); }} />,
											<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteItem(i.item); }} />
										]}
									>
										<ItemPanel
											item={i.item}
											options={props.options}
											wielder={hero}
											sourcebooks={props.sourcebooks}
											mode={PanelMode.Full}
											onChange={changeItem}
										/>
									</Expander>
								);
							case 'feature':
								return (
									<Expander
										key={i.item.id}
										title={i.item.count === 1 ? i.item.name : `${i.item.name} (x${i.item.count})`}
										tags={[ i.item.type ]}
									>
										<ItemPanel
											item={i.item}
											options={props.options}
											wielder={hero}
											sourcebooks={props.sourcebooks}
											mode={PanelMode.Full}
										/>
									</Expander>
								);
						}
					})
				}
				{
					items.length === 0 ?
						<Empty text='Your inventory is empty.' />
						: null
				}
				<Drawer open={shopVisible} onClose={() => setShopVisible(false)} closeIcon={null} size={500}>
					<ItemSelectModal
						types={[ ItemType.Artifact, ItemType.Consumable, ItemType.ImbuedArmor, ItemType.ImbuedImplement, ItemType.ImbuedWeapon, ItemType.Leveled, ItemType.LeveledArmor, ItemType.LeveledImplement, ItemType.LeveledWeapon, ItemType.Trinket1st, ItemType.Trinket2nd, ItemType.Trinket3rd, ItemType.Trinket4th ]}
						sourcebooks={props.sourcebooks}
						options={props.options}
						hero={hero}
						onSelect={addItem}
						onClose={() => setShopVisible(false)}
					/>
				</Drawer>
			</Space>
		</ErrorBoundary>
	);
};
