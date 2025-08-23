import { CharacterSheet } from '../../../../models/character-sheet';
import { FeatureComponent } from '../components/feature-component';
import './career-card.scss';

interface Props {
    character: CharacterSheet;
}

export const CareerCard = (props: Props) => {
    const character = props.character;
    return (
        <div className='career card'>
            <h2>Career</h2>
            <div className='name'>{character.careerName}</div>
            <section className='bordered'>
                <h3>Benefit</h3>
                {character.careerBenefits?.map(f => 
                    <FeatureComponent
                        feature={f}
                        hero={character.hero}
                        key={f.id} />
                )}
            </section>

            <section className='bordered'>
                <h3>Inciting Incident</h3>
                <h4>{character.careerInsightingIncident?.name}</h4>
                <p>{character.careerInsightingIncident?.description}</p>
            </section>
        </div>
    );
};
