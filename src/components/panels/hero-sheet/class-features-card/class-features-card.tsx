import { CharacterSheet } from '../../../../models/character-sheet';
import { FeatureComponent } from '../components/feature-component';
import './class-features-card.scss';

interface Props {
    character: CharacterSheet;
}

export const ClassFeaturesCard = (props: Props) => {
    const character = props.character;
    return (
        <div className='class-features card'>
            <h2>Class Features</h2>
            <ul className='features-container two-column'>
                {character.classFeatures?.map(f => 
                    <li key={f.id}>
                    <FeatureComponent
                        feature={f}
                        hero={character.hero} />
                    </li>
                )}
            </ul>
        </div>
    );
};
