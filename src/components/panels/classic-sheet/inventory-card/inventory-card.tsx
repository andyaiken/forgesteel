import { HeroSheet, ItemSheet } from '@/models/classic-sheets/hero-sheet';
import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';
import { Markdown } from '@/components/controls/markdown/markdown';

import './inventory-card.scss';

interface InventoryProps {
	character: HeroSheet;
	wide?: boolean;
}

export const InventoryCard = (props: InventoryProps) => {
	const character = props.character;

	const columns = props.wide || false;

	const cardClasses = [ 'inventory', 'card' ];
	if (columns) {
		cardClasses.push('wide');
	}

	return (
		<div className={cardClasses.join(' ')}>
			<h2>Inventory</h2>
			<ul>
				{character.inventory?.map(item => (
					<li key={item.id}>
						<ItemComponent item={item} character={character} />
					</li>
				))}
			</ul>
		</div>
	);
};

interface ItemProps {
	item: ItemSheet;
	character: HeroSheet;
}

export const ItemComponent = (props: ItemProps) => {
	const itemSheet = props.item;
	const item = itemSheet.item;

	const getItemName = () => {
		let name = item.name;

		if (item.count > 1) {
			name += ` (x${item.count})`;
		}

		return name;
	};

	return (
		<div className='item'>
			<h3>{getItemName()}</h3>
			<div className='keywords-item-type'>
				<div className='keywords'>{item.keywords.join(', ')}</div>
				<div className='item-type'>{item.type}</div>
			</div>
			<Markdown
				text={itemSheet.effect}
				className='item-effect'
			/>
			<div className='item-features'>
				{itemSheet.features?.filter(f => f.id !== item.id).map(f =>
					<FeatureComponent
						key={f.id}
						hero={props.character.hero}
						feature={f}
					/>
				)}
			</div>
		</div>
	);
};
