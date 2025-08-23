import { LabeledBooleanField, LabeledTextField } from '../components/labeled-field';
import { CharacterSheet } from '../../../../models/character-sheet';
import { CharacterSheetFormatter } from '../../../../utils/character-sheet-formatter';
import { FeatureComponent } from '../components/feature-component';

import './modifiers-card.scss';

import rollT1 from '../../../../assets/icons/power-roll-t1.svg';
import rollT2 from '../../../../assets/icons/power-roll-t2.svg';
import rollT3 from '../../../../assets/icons/power-roll-t3.svg';

interface Props {
	character: CharacterSheet;
}

export const ModifiersCard = (props: Props) => {
	const character = props.character;

	let shownModifiers = [ 'Kit', 'Prayer', 'Ward', 'Augmentation', 'Enchantment' ];
	if (character.modifierTypes?.length) {
		shownModifiers = shownModifiers.filter(t => character.modifierTypes?.includes(t));
	}
	const modifierClasses = shownModifiers.map(m => m.toLocaleLowerCase());

	const isKit = !character.modifierTypes?.length || character.modifierTypes?.includes('Kit');
	const kitDamageModificationSection = (isKit ?
		<>
			<div className='power-roll-damage-modifiers'>
				<h4>Ranged Weapon Damage</h4>
				<div className='roll-tiers'>
					<div className='tier t1'>
						<div className='effect'>{CharacterSheetFormatter.addSign(character.modifierRangedDamageT1)}</div>
						<img src={rollT1} alt='≤ 11' className='range' />
					</div>
					<div className='tier t2'>
						<div className='effect'>{CharacterSheetFormatter.addSign(character.modifierRangedDamageT2)}</div>
						<img src={rollT2} alt='12 - 16' className='range' />
					</div>
					<div className='tier t3'>
						<div className='effect'>{CharacterSheetFormatter.addSign(character.modifierRangedDamageT3)}</div>
						<img src={rollT3} alt='17 +' className='range' />
					</div>
				</div>
			</div>
			<div className='power-roll-damage-modifiers'>
				<h4>Melee Weapon Damage</h4>
				<div className='roll-tiers'>
					<div className='tier t1'>
						<div className='effect'>{CharacterSheetFormatter.addSign(character.modifierMeleeDamageT1)}</div>
						<img src={rollT1} alt='≤ 11' className='range' />
					</div>
					<div className='tier t2'>
						<div className='effect'>{CharacterSheetFormatter.addSign(character.modifierMeleeDamageT2)}</div>
						<img src={rollT2} alt='12 - 16' className='range' />
					</div>
					<div className='tier t3'>
						<div className='effect'>{CharacterSheetFormatter.addSign(character.modifierMeleeDamageT3)}</div>
						<img src={rollT3} alt='17 +' className='range' />
					</div>
				</div>
			</div>
		</>
		: undefined);

	return (
		<div className='modifiers card'>
			<h2>Modifiers</h2>
			<ul className='modifier-types'>
				{shownModifiers.map(t =>
					<li key={t}>
						<LabeledBooleanField
							label={t}
							value={character.modifierTypes?.includes(t)}
						/>
					</li>
				)}
			</ul>
			<LabeledTextField
				label='Name'
				content={character.modifierName}
				additionalClasses={[ 'name' ]}
			/>

			<div className={[ 'modifier-augmentations' ].concat(modifierClasses).join(' ')}>
				<div className='proficiencies'>
					<LabeledTextField
						label='Weapon/Implement'
						content={character.modifierWeaponImplement}
					/>
					<LabeledTextField
						label='Armor'
						content={character.modifierArmor}
					/>
				</div>

				<div className='stats'>
					<LabeledTextField
						label='Speed'
						content={CharacterSheetFormatter.addSign(character.modifierSpeed)}
					/>
					<LabeledTextField
						label='Melee'
						content={CharacterSheetFormatter.addSign(character.modifierMeleeDistance)}
					/>
					<LabeledTextField
						label='Ranged'
						content={CharacterSheetFormatter.addSign(character.modifierRangedDistance)}
					/>
					<LabeledTextField
						label='Disengage'
						content={CharacterSheetFormatter.addSign(character.modifierDisengage)}
					/>
					<LabeledTextField
						label='Stability'
						content={CharacterSheetFormatter.addSign(character.modifierStability)}
					/>
					<LabeledTextField
						label='Stamina'
						content={CharacterSheetFormatter.addSign(character.modifierStamina)}
					/>
				</div>
			</div>

			<div className={[ 'effects' ].concat(modifierClasses).join(' ')}>
				<div className='damage-modifiers'>
					{kitDamageModificationSection}
				</div>

				<div className='benefits'>
					<h4>Benefits</h4>
					<div className='features'>
						{character.modifierBenefits?.map(f =>
							<FeatureComponent
								key={f.id}
								hero={character.hero}
								feature={f}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
