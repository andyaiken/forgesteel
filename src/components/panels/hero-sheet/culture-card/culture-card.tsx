import { CharacterSheet } from '../../../../models/character-sheet';
import { FeatureComponent } from '../components/feature-component';
import './culture-card.scss';

interface Props {
    character: CharacterSheet;
}

export const CultureCard = (props: Props) => {
    const character = props.character;
    return (
        <div className='culture card'>
            <h2>Culture</h2>
            <section className='bordered'>
                <h3>Environment</h3>
                <h4>{character.cultureEnvironment}</h4>
                {character.cultureEnvironmentFeatures?.map(f => 
                    <FeatureComponent
                        feature={f}
                        hero={character.hero}
                        key={f.id} />
                )}
            </section>
            <section className='bordered'>
                <h3>Organization</h3>
                <h4>{character.cultureOrganization}</h4>
                {character.cultureOrganizationFeatures?.map(f =>
                    <FeatureComponent
                        feature={f}
                        hero={character.hero}
                        key={f.id} />
                )}
            </section>
            <section className='bordered'>
                <h3>Upbringing</h3>
                <h4>{character.cultureUpbringing}</h4>
                {character.cultureUpbringingFeatures?.map(f =>
                    <FeatureComponent
                        feature={f}
                        hero={character.hero}
                        key={f.id} />
                )}
            </section>
            <section className='bordered languages'>
                <h3>Languages</h3>
                <ul>
                    {character.languages?.map(l => 
                        <li key={l}>{l}</li>
                    )}
                </ul>
            </section>
        </div>
    );
};
