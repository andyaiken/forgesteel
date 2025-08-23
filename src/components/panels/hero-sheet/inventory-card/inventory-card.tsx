import { CharacterSheet, ItemSheet } from '../../../../models/character-sheet';
import { FeatureComponent } from '../components/feature-component';
import './inventory-card.scss';

interface ItemProps {
    item: ItemSheet;
    character: CharacterSheet;
}

export const ItemComponent = (props: ItemProps) => {
    const itemSheet = props.item;
    return (
        <div className="item">
            <div className="features">
                {itemSheet.features?.map(f =>
                    <FeatureComponent
                        key={f.id}
                        hero={props.character.hero}
                        feature={f} />
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
