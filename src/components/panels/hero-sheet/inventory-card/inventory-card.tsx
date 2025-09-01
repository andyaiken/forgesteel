import { CharacterSheet, ItemSheet } from '../../../../models/character-sheet';
import { FeatureComponent } from '../components/feature-component';
import { Markdown } from '../../../controls/markdown/markdown';

import './inventory-card.scss';

interface ItemProps {
	item: ItemSheet;
	character: CharacterSheet;
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
				text={item.effect}
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

interface InventoryProps {
	character: CharacterSheet;
}

export const InventoryCard = (props: InventoryProps) => {
	const character = props.character;
	return (
		<div className='inventory card'>
			<h2>Inventory</h2>
			{character.inventory?.map(item => (
				<ItemComponent item={item} character={character} key={item.id} />
			))}
		</div>
	);
};
