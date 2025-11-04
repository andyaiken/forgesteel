import { LabeledBooleanField, LabeledTextField } from '@/components/panels/classic-sheet/components/labeled-field';
import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';
import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';

import './modifiers-card.scss';

import rollT1 from '@/assets/icons/power-roll-t1.svg';
import rollT2 from '@/assets/icons/power-roll-t2.svg';
import rollT3 from '@/assets/icons/power-roll-t3.svg';
import { useMemo } from 'react';

interface Props {
	character: HeroSheet;
}

export const ModifiersCard = (props: Props) => {
	const character = useMemo(
		() => props.character,
		[ props.character ]
	);

	const getModifierNameLabel = () => {
		let label = 'Name';

		if (character.modifierTypes.includes('Kit')) {
			label = 'Kit';
			if (character.modifierName?.includes('&')) {
				label += 's';
			}
		} else if (character.modifierTypes.includes('Augmentation')) {
			label = 'Augmentation';
		} else if (character.modifierTypes.includes('Prayer')) {
			label = 'Prayer';
		} else if (character.modifierTypes.includes('Enchantment')) {
			label = 'Enchantment';
		}

		return label;
	};

	const getKitDamageModificationSection = () => {
		return (
			<>
				<div className='power-roll-damage-modifiers'>
					<h4>Melee Damage Bonus</h4>
					<div className='roll-tiers'>
						<div className='tier t1'>
							<div className='effect'>{SheetFormatter.addSign(character.modifierMeleeDamageT1)}</div>
							<img src={rollT1} alt='≤ 11' className='range' />
						</div>
						<div className='tier t2'>
							<div className='effect'>{SheetFormatter.addSign(character.modifierMeleeDamageT2)}</div>
							<img src={rollT2} alt='12 - 16' className='range' />
						</div>
						<div className='tier t3'>
							<div className='effect'>{SheetFormatter.addSign(character.modifierMeleeDamageT3)}</div>
							<img src={rollT3} alt='17 +' className='range' />
						</div>
					</div>
				</div>
				<div className='power-roll-damage-modifiers'>
					<h4>Ranged Damage Bonus</h4>
					<div className='roll-tiers'>
						<div className='tier t1'>
							<div className='effect'>{SheetFormatter.addSign(character.modifierRangedDamageT1)}</div>
							<img src={rollT1} alt='≤ 11' className='range' />
						</div>
						<div className='tier t2'>
							<div className='effect'>{SheetFormatter.addSign(character.modifierRangedDamageT2)}</div>
							<img src={rollT2} alt='12 - 16' className='range' />
						</div>
						<div className='tier t3'>
							<div className='effect'>{SheetFormatter.addSign(character.modifierRangedDamageT3)}</div>
							<img src={rollT3} alt='17 +' className='range' />
						</div>
					</div>
				</div>
			</>
		);
	};

	let bothWeaponArmor = true;
	let onlyWeaponImplement = false;
	let onlyArmorWard = false;
	if (!character.modifierWeaponImplement?.length || !character.modifierArmorWard?.length) {
		if (character.modifierWeaponImplement?.length) {
			onlyWeaponImplement = true;
			bothWeaponArmor = false;
		}
		if (character.modifierArmorWard?.length) {
			onlyArmorWard = true;
			bothWeaponArmor = false;
		}
	}

	return (
		<div className='modifiers card'>
			<h2>
				<div className='title'>Equipment and Modifiers</div>
				<LabeledBooleanField
					label='Kit'
					value={character.modifierTypes?.includes('Kit')}
				/>
			</h2>
			<LabeledTextField
				label={getModifierNameLabel()}
				content={character.modifierName}
				additionalClasses={[ 'name', 'label-overlay' ]}
			/>

			<div className='modifier-augmentations'>
				<div className={`proficiencies ${!bothWeaponArmor ? 'single' : null}`}>
					{
						bothWeaponArmor || onlyWeaponImplement ?
							<LabeledTextField
								label='Weapon / Implement'
								content={character.modifierWeaponImplement}
								additionalClasses={[ 'label-overlay' ]}
							/>
							: null
					}
					{
						bothWeaponArmor || onlyArmorWard ?
							<LabeledTextField
								label='Armor / Ward'
								content={character.modifierArmorWard}
								additionalClasses={[ 'label-overlay' ]}
							/>
							: null
					}
				</div>

				<div className='stats'>
					<LabeledTextField
						label='Speed'
						content={SheetFormatter.addSign(character.modifierSpeed)}
					/>
					<LabeledTextField
						label='Disengage'
						content={SheetFormatter.addSign(character.modifierDisengage)}
					/>
					<LabeledTextField
						label='Stamina'
						content={SheetFormatter.addSign(character.modifierStamina)}
					/>
					<LabeledTextField
						label='Stability'
						content={SheetFormatter.addSign(character.modifierStability)}
					/>
					<LabeledTextField
						label='Melee Dist.'
						content={SheetFormatter.addSign(character.modifierMeleeDistance)}
					/>
					<LabeledTextField
						label='Ranged Dist.'
						content={SheetFormatter.addSign(character.modifierRangedDistance)}
					/>
				</div>
			</div>

			<div className='effects'>
				<div className='damage-modifiers'>
					{getKitDamageModificationSection()}
				</div>

				<div className='benefits'>
					<h3>Effects</h3>
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
