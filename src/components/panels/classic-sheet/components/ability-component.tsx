import { AbilitySheet } from '@/models/classic-sheets/ability-sheet';
import { DrawSteelSymbolText } from '@/components/panels/classic-sheet/components/ds-symbol-text-component';
import { Markdown } from '@/components/controls/markdown/markdown';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { useMemo } from 'react';

import './ability-component.scss';

import distanceIcon from '@/assets/icons/distance.svg';
import rollT1 from '@/assets/icons/power-roll-t1.svg';
import rollT2 from '@/assets/icons/power-roll-t2.svg';
import rollT3 from '@/assets/icons/power-roll-t3.svg';
import targetIcon from '@/assets/icons/target.svg';

interface Props {
	ability: AbilitySheet;
	includeIcon?: boolean;
}

export const AbilityComponent = (props: Props) => {
	const ability = useMemo(() => props.ability, [ props.ability ]);
	const includeIcon = props.includeIcon || false;

	const getPowerRollSection = () => {
		if (ability.hasPowerRoll) {
			return (
				<div className='power-roll'>
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
			// A small number of ability effects start with a 'Special' section, so we want to make sure we don't prepend 'Effect' to that
			let addedLabel = false;
			const effectText = ability.effect.split('\n').map(l => {
				let newLine = l;
				if (!addedLabel && !l.startsWith('**')) {
					addedLabel = true;
					newLine = '**Effect**: ' + l;
				}
				return newLine;
			}).join('\n');
			return (
				<div className='effect'>
					<Markdown
						text={effectText}
						className='ability-effect'
					/>
				</div>
			);
		}
	};

	let icon = null;
	if (includeIcon) {
		const iconSrc = SheetFormatter.getAbilityIcon(ability);
		icon = <img src={iconSrc} className='icon' />;
	}

	return (
		<div className='ability'>
			<div className='header'>
				<div className='name'>{ability.name}</div>
				{ability.hasPowerRoll ?
					<div className='power-roll'>2d10 + {ability.rollPower}</div>
					: undefined}
				<div className='ability-type'>
					{ability.abilityType}
					{icon}
				</div>
			</div>
			<div className='stats'>
				<div className='keywords-action-type'>
					<div className='keywords'>{ability.keywords}</div>
					<div className='action-type'>{ability.actionType}</div>
				</div>
				<div className='distance-target'>
					<div className='distance'>
						{ability.distance?.length ?
							<img src={distanceIcon} alt='Distance' />
							: undefined}
						<span>{ability.distance}</span>
					</div>
					<div className='target'>
						<img src={targetIcon} alt='Target' />
						<span>{ability.target}</span>
					</div>
				</div>
			</div>
			{getPowerRollSection()}
			{getTriggerSection()}
			{getEffectSection()}
		</div>
	);
};
