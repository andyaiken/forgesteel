import { AbilitySheet } from '../../../../models/character-sheet';
import { LabeledTextField } from '../components/labeled-field';
import './ability-card.scss';
import rollT1 from '../../../../assets/icons/power-roll-t1.svg';
import rollT2 from '../../../../assets/icons/power-roll-t2.svg';
import rollT3 from '../../../../assets/icons/power-roll-t3.svg';
import { Markdown } from '../../../controls/markdown/markdown';
import { DrawSteelSymbolText } from '../components/ds-symbol-text-component';

interface Props {
    ability: AbilitySheet;
}

export const AbilityCard = (props: Props) => {
    const ability = props.ability;

    const abilityCost = ability.cost > 0 ? <span className="cost">{ability.cost}</span> : '';

    const powerRollSection = ability.hasPowerRoll ? 
        <div className='power-roll'>
            <div className='power'>Power Roll + <DrawSteelSymbolText content={ability.rollPower} lookFor='characteristics' /></div>
            <div className='roll-tiers'>
                <div className='tier t1'>
                    <img src={rollT1} alt='≤ 11' className='range' />
                    <span className='effect'>
                        <DrawSteelSymbolText content={ability.rollT1Effect} lookFor='potencies' />
                    </span>
                </div>
                <div className='tier t2'>
                    <img src={rollT2} alt='12 - 16' className='range' />
                    <span className='effect'>
                        <DrawSteelSymbolText content={ability.rollT2Effect} lookFor='potencies' />
                    </span>
                </div>
                <div className='tier t3'>
                    <img src={rollT3} alt='17 +' className='range' />
                    <span className='effect'>
                        <DrawSteelSymbolText content={ability.rollT3Effect} lookFor='potencies' />
                    </span>
                </div>
            </div>
        </div>
        : undefined;

    const triggerSection = ability.trigger ?
        <p className='trigger'><label>Trigger: </label>{ability.trigger}</p>
        : undefined;

    const effectSection = ability.effect ?
        <div className='effect'>
            <h4>Effect:</h4>
            <Markdown
                text={ability.effect}
                className='ability-effect' />
        </div>
        : undefined;

    return (
        <div className='ability card'>
            <section className="bordered">
                <h3>{ability.abilityType}</h3>
                <h2>{ability.name}{abilityCost}</h2>
                <div className="stats">
                    <LabeledTextField
                        label='Keywords'
                        content={ability.keywords}
                        additionalClasses={['keywords']} />
                    <LabeledTextField
                        label='Type'
                        content={ability.actionType}
                        additionalClasses={['action-type']} />
                    <LabeledTextField
                        label='Distance'
                        content={ability.distance}
                        additionalClasses={['distance']} />
                    <LabeledTextField
                        label='Target'
                        content={ability.target}
                        additionalClasses={['target']} />
                </div>

                {powerRollSection}
                {triggerSection}
                {effectSection}
            </section>
        </div>
    );
};
