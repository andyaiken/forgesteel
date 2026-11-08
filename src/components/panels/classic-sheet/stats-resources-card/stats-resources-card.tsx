import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import { HeroSheetValue } from '@/enums/hero-sheet-value';
import { LabeledTextField } from '@/components/panels/classic-sheet/components/labeled-field';
import { RecoveriesComponent } from '@/components/panels/classic-sheet/components/recoveries-component';
import { StaminaComponent } from '@/components/panels/classic-sheet/components/stamina-component';
import { Utils } from '@/utils/utils';
import { useOptions } from '@/contexts/data-context';

import './stats-resources-card.scss';

interface Props {
	character: HeroSheet;
}

export const StatsResourcesCard = (props: Props) => {
	const character = props.character;
	const options = useOptions();
	const showState = options.includePlayState;

	return (
		<div className='stats-resources card'>
			<div className='characteristics-measurements'>
				<div className='characteristics'>
					<div className='labeled-field label-above fancy'>
						<label><span className='symbol'>M</span>ight</label>
						<div className='labeled-field-content'><span>{options.hiddenHeroSheetValues.includes(HeroSheetValue.Might) || Utils.isNullOrEmpty(character.might?.toString()) ? <>&nbsp;</> : character.might}</span></div>
					</div>
					<div className='labeled-field label-above fancy'>
						<label><span className='symbol'>A</span>gility</label>
						<div className='labeled-field-content'><span>{options.hiddenHeroSheetValues.includes(HeroSheetValue.Agility) || Utils.isNullOrEmpty(character.agility?.toString()) ? <>&nbsp;</> : character.agility}</span></div>
					</div>
					<div className='labeled-field label-above fancy'>
						<label><span className='symbol'>R</span>eason</label>
						<div className='labeled-field-content'><span>{options.hiddenHeroSheetValues.includes(HeroSheetValue.Reason) || Utils.isNullOrEmpty(character.reason?.toString()) ? <>&nbsp;</> : character.reason}</span></div>
					</div>
					<div className='labeled-field label-above fancy'>
						<label><span className='symbol'>I</span>ntuition</label>
						<div className='labeled-field-content'><span>{options.hiddenHeroSheetValues.includes(HeroSheetValue.Intuition) || Utils.isNullOrEmpty(character.intuition?.toString()) ? <>&nbsp;</> : character.intuition}</span></div>
					</div>
					<div className='labeled-field label-above fancy'>
						<label><span className='symbol'>P</span>resence</label>
						<div className='labeled-field-content'><span>{options.hiddenHeroSheetValues.includes(HeroSheetValue.Presence) || Utils.isNullOrEmpty(character.presence?.toString()) ? <>&nbsp;</> : character.presence}</span></div>
					</div>
				</div>
				<div className='measurements'>
					<LabeledTextField
						label='Size'
						content={options.hiddenHeroSheetValues.includes(HeroSheetValue.Size) ? '' : character.size}
					/>
					<LabeledTextField
						label='Speed'
						content={options.hiddenHeroSheetValues.includes(HeroSheetValue.Speed) ? '' : character.speed}
					/>
					<LabeledTextField
						label='Disengage'
						content={options.hiddenHeroSheetValues.includes(HeroSheetValue.Disengage) ? '' : character.disengage}
					/>
					<LabeledTextField
						label='Stability'
						content={options.hiddenHeroSheetValues.includes(HeroSheetValue.Stability) ? '' : character.stability}
					/>
				</div>
			</div>
			<StaminaComponent
				stamina={character.stamina}
			/>
			<RecoveriesComponent
				recoveries={character.recoveries}
			/>
			<div className='heroic-resource'>
				<LabeledTextField
					label='Heroic Resource'
					content={(showState && character.heroicResourceCurrent?.toString()) || ''}
					additionalClasses={[ 'label-above', 'fancy' ]}
				/>
				<LabeledTextField
					label='Name'
					content={character.heroicResourceName}
					additionalClasses={[ 'no-box' ]}
				/>
			</div>
			<div className='surges'>
				<LabeledTextField
					label='Surges'
					content={(showState && character.surgesCurrent?.toString()) || ''}
					additionalClasses={[ 'label-above', 'fancy' ]}
				/>
				<div className='reference'>
					<div>1 Surge = Damage <span className='data'>{character.surgeDamageAmount}</span></div>
					<div>2 Surges = Potency + 1</div>
				</div>
			</div>
		</div>
	);
};
