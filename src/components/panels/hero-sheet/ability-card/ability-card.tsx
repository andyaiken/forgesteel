import { AbilitySheet } from '../../../../models/character-sheet';
import { Collections } from '../../../../utils/collections';
import { DrawSteelSymbolText } from '../components/ds-symbol-text-component';
import { Markdown } from '../../../controls/markdown/markdown';

import './ability-card.scss';

import distanceIcon from '../../../../assets/icons/distance.svg';
import rollT1 from '../../../../assets/icons/power-roll-t1.svg';
import rollT2 from '../../../../assets/icons/power-roll-t2.svg';
import rollT3 from '../../../../assets/icons/power-roll-t3.svg';
import targetIcon from '../../../../assets/icons/target.svg';

interface Props {
	ability: AbilitySheet;
}

export const AbilityCard = (props: Props) => {
	const ability = props.ability;

	const getAbilityCost = () => {
		if (ability.cost > 0) {
			return (
				<span className='cost'>{ability.cost}</span>
			);
		}
	};

	const getPowerRollSection = () => {
		if (ability.hasPowerRoll) {
			return (
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
			);
		}
	};

	const getTriggerSection = () => {
		if (ability.trigger) {
			return (
				<p className='trigger'><label>Trigger: </label>{ability.trigger}</p>
			);
		}
	};

	const getEffectSection = () => {
		if (ability.effect) {
			return (
				<div className='effect'>
					<h4>Effect:</h4>
					<Markdown
						text={ability.effect}
						className='ability-effect'
					/>
				</div>
			);
		}
	};

	const getCardClasses = (ability: AbilitySheet) => {
		const classes = [ 'ability', 'card' ];
		if (ability.actionType) {
			classes.push(ability.actionType.toLocaleLowerCase().split(' ').join('-'));
		}
		if (ability.abilityType) {
			classes.push(ability.abilityType.toLocaleLowerCase().split(' ').join('-'));
		}
		return Collections.distinct(classes, c => c).join(' ');
	};

	return (
		<div className={getCardClasses(ability)}>
			<section className='bordered'>
				<h3>{ability.abilityType}</h3>
				<h2><span className='ability-name'>{ability.name}</span>{getAbilityCost()}</h2>
				{ability.description?.length ?
					<p className='description'>{ability.description}</p>
					: undefined }
				<div className='stats'>
					<div className='keywords-action-type'>
						<div className='keywords'>{ability.keywords}</div>
						<div className='action-type'>{ability.actionType}</div>
					</div>
					<div className='distance-target'>
						<div className='distance'>
							{ability.distance?.length ?
								<img src={distanceIcon} alt='Distance' />
								: undefined }
							<span>{ability.distance}</span>
						</div>
						<div className='target'>
							<img src={targetIcon} alt='Target' />
							<span>{ability.target}</span>
						</div>
					</div>
				</div>
				{ability.qualifiers?.map((q, i) => {
					return (<div className='action-qualifier' key={`qualifier-${i}`}>{q}</div>);
				})}
				{getPowerRollSection()}
				{getTriggerSection()}
				{getEffectSection()}
			</section>
		</div>
	);
};
