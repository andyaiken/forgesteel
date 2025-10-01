import { Ability } from '@/models/ability';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { AbilityLogic } from '@/logic/ability-logic';
import { AbilityUsage } from '@/enums/ability-usage';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { FormatLogic } from '@/logic/format-logic';
import { Hero } from '@/models/hero';
import { SashPanel } from '@/components/panels/sash/sash-panel';

import './ability-info-panel.scss';

interface Props {
	ability: Ability;
	hero?: Hero;
}

export const AbilityInfoPanel = (props: Props) => {
	try {
		if ((props.ability.type.usage === AbilityUsage.NoAction) && (props.ability.distance.length === 0) && (props.ability.target === '') && (props.ability.type.trigger === '')) {
			return null;
		}

		const getMonogram = () => {
			let monogram = '';

			switch (props.ability.type.usage) {
				case AbilityUsage.MainAction:
					monogram = 'main';
					break;
				case AbilityUsage.Maneuver:
					monogram = 'maneuver';
					break;
				case AbilityUsage.Trigger:
					monogram = 'trigger';
					break;
				case AbilityUsage.Move:
					monogram = 'move';
					break;
				case AbilityUsage.VillainAction:
					monogram = 'villain';
					break;
				case AbilityUsage.ChampionAction:
					monogram = 'champion';
					break;
			}

			if (props.ability.type.free) {
				monogram = 'free';
			}

			if (props.ability.keywords.includes(AbilityKeyword.Performance)) {
				monogram = 'perform';
			}

			return monogram;
		};

		const type = FormatLogic.getAbilityType(props.ability.type);
		const distance = props.ability.distance.map(d => AbilityLogic.getDistance(d, props.ability, props.hero)).join(' or ');
		const monogram = getMonogram();

		return (
			<ErrorBoundary>
				<div className='ability-info-panel'>
					<div className='ds-text compact-text bold-text'>{type}</div>
					{
						distance ?
							<Field
								compact={true}
								label={props.ability.target !== distance ? 'Distance' : 'Distance / Target'}
								value={distance}
							/>
							: null
					}
					{
						props.ability.target && (props.ability.target !== distance) ?
							<Field
								compact={true}
								label='Target'
								value={props.ability.target}
							/>
							: null
					}
					{
						props.ability.type.trigger ?
							<Field
								compact={true}
								label='Trigger'
								value={props.ability.type.trigger}
							/>
							: null
					}
					{monogram ? <SashPanel monogram={monogram} /> : null}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
