import { HeroSheet, ItemSheet } from '@/models/classic-sheets/hero-sheet';
import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';
import { ItemLogic } from '@/logic/item-logic';
import { ItemType } from '@/enums/item-type';
import { LabeledTextField } from '../components/labeled-field';
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

export const TrinketsCard = (props: InventoryProps) => {
	const character = props.character;
	const wide = props.wide || false;
	const cardClasses = [ 'inventory', 'trinkets', 'card' ];

	const getTrinkets = () => {
		return character.inventory?.filter(i => ItemLogic.isTrinket(i.item)) || [];
	};

	return (
		<div className={cardClasses.join(' ')}>
			<h2>Trinkets</h2>
			<ul className={`features-container ${wide ? 'three-column' : 'two-column'}`}>
				{getTrinkets().map(item => (
					<li key={item.id}>
						<ItemComponent item={item} character={character} />
					</li>
				))}
			</ul>
		</div>
	);
};

export const ConsumablesCard = (props: InventoryProps) => {
	const character = props.character;
	const columns = props.wide || false;
	const cardClasses = [ 'inventory', 'consumables', 'card' ];
	if (columns) {
		cardClasses.push('wide');
	}

	const getConsumables = () => {
		return character.inventory?.filter(i => i.item.type === ItemType.Consumable) || [];
	};

	return (
		<div className={cardClasses.join(' ')}>
			<h2>Consumables</h2>
			<ul>
				{getConsumables().map(item => (
					<li key={item.id}>
						<ItemComponent item={item} character={character} />
					</li>
				))}
			</ul>
		</div>
	);
};

export const LeveledTreasureCard = (props: InventoryProps) => {
	const character = props.character;
	const columns = props.wide || false;
	const cardClasses = [ 'inventory', 'leveled-treasure', 'card' ];
	if (columns) {
		cardClasses.push('wide');
	}

	const getLeveledTreasures = () => {
		return character.inventory?.filter(i => ItemLogic.isLeveledTreasure(i.item)) || [];
	};

	const leveledTreasures = getLeveledTreasures();

	return (
		<div className={cardClasses.join(' ')}>
			<h2>
				<div className='title'>Leveled Treasures</div>
				<div className='count'>
					<label>Carry Three Safely</label>
					<div className='leveled-treasure-boxes'>
						<ol>
							{[ ...Array(3) ].map((_o, i) => {
								return <li key={`leveled-treasure-marker-${i}`}>{leveledTreasures.length >= i + 1 ? '◼' : <>&nbsp;</>}</li>;
							})}
						</ol>
					</div>
				</div>
			</h2>
			<ul className='features-container three-column'>
				{leveledTreasures.map(item => (
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

			if (item.type === ItemType.Consumable) {
				return (
					<>
						<span className='item-name'>{name}</span>
						<span className='item-uses'>
							<ol>
								{[ ...Array(item.count) ].map((_o, i) => {
									return <li key={`consumable-${item.id}-uses-${i}`}>◇</li>;
								})}
							</ol>
						</span>
					</>
				);
			}
		}

		return name;
	};

	const getItemType = () => {
		let type = item.type.toString();

		if (ItemLogic.isTrinket(item)) {
			type = 'Trinket';
		} else if (ItemLogic.isImbuedItem(item)) {
			type = '';
		}

		return type;
	};

	const getItemEffect = () => {
		return (
			<>
				{
					ItemLogic.isImbuedItem(item) ?
						<LabeledTextField
							label={item.type.toString().slice(7)}
							additionalClasses={[ 'label-overlay' ]}
							content={undefined}
						/>
						: null
				}
				<Markdown
					text={itemSheet.effect}
					className='item-effect'
				/>
			</>
		);
	};

	const featuresToDisplay = itemSheet.features?.filter(f => f.id !== item.id) || [];

	return (
		<div className='item'>
			<h3>{getItemName()}</h3>
			<div className='keywords-item-type'>
				<div className='keywords'>{item.keywords.join(', ')}</div>
				<div className='item-type'>{getItemType()}</div>
			</div>
			{getItemEffect()}
			{
				featuresToDisplay.length ?
					<div className='item-features'>
						{featuresToDisplay.map(f =>
							<FeatureComponent
								key={f.id}
								hero={props.character.hero}
								feature={f}
							/>
						)}
					</div>
					: null
			}
		</div>
	);
};
