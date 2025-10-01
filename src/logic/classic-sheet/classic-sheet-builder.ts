import { Ability } from '@/models/ability';
import { AbilityLogic } from '@/logic/ability-logic';
import { AbilitySheet } from '@/models/classic-sheets/ability-sheet';
import { AbilityUsage } from '@/enums/ability-usage';
import { CreatureLogic } from '@/logic/creature-logic';
import { Format } from '@/utils/format';
import { Hero } from '@/models/hero';
import { Monster } from '@/models/monster';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';

export class ClassicSheetBuilder {
	// #region Ability Sheet
	static buildAbilitySheet = (ability: Ability, creature: Hero | Monster | undefined): AbilitySheet => {
		const isMonster = CreatureLogic.isMonster(creature);
		const sheet: AbilitySheet = {
			id: ability.id,
			abilityType: 'Ability',
			name: ability.name,
			description: ability.description,
			isSignature: false,
			cost: Number(ability.cost) || 0,
			actionType: ability.type.usage.toString(),
			keywords: ability.keywords.join(', '),
			target: ability.target,
			trigger: ability.type.trigger,
			hasPowerRoll: false
		};

		sheet.name = sheet.name.replace(/\s*Benefit and Drawback\s*/, '').trim();

		if (ability.cost === 'signature') {
			sheet.isSignature = true;
			sheet.abilityType = 'Signature Ability';
		} else if (ability.cost > 0) {
			sheet.abilityType = 'Heroic Ability';
		} else if (ability.type.usage === AbilityUsage.Trigger) {
			sheet.abilityType = 'Triggered Action';
		} else if (ability.type.usage === AbilityUsage.FreeStrike) {
			sheet.abilityType = 'Free Strike';
			if (ability.name.toLowerCase().includes('melee')) {
				sheet.name = 'Melee Free Strike';
			} else if (ability.name.toLowerCase().includes('ranged')) {
				sheet.name = 'Ranged Free Strike';
			}
		} else if (ability.type.usage === AbilityUsage.Maneuver) {
			sheet.abilityType = 'Maneuver';
		} else if (ability.type.usage === AbilityUsage.Move) {
			sheet.abilityType = 'Move Action';
		} else if (ability.keywords.includes('Performance')) {
			sheet.abilityType = 'Performance';
		}

		if (isMonster) {
			if (sheet.isSignature) {
				sheet.abilityType = 'Signature Ability';
			} else {
				sheet.abilityType = 'Encounter';
			}
		}

		if (sheet.actionType && ability.type.free) {
			sheet.actionType = `Free ${sheet.actionType}`;
		}

		sheet.qualifiers = ability.type.qualifiers;

		if (ability.distance.length) {
			sheet.distance = ability.distance.map(d => AbilityLogic.getDistanceCreature(d, ability, creature)).join(', ');
		}

		const effectSections = ability.sections.filter(s => s.type !== 'roll');
		sheet.effect = SheetFormatter.abilitySections(effectSections, creature).trim();

		const rollSections = ability.sections.filter(s => s.type === 'roll');
		if (rollSections.length) {
			sheet.hasPowerRoll = true;
			const rollSection = rollSections[0];
			if (rollSections.length > 1) {
				console.warn('More than one roll section!', rollSections);
			}

			let rollPowerStr = '';
			if (rollSection.roll.characteristic.length) {
				const rollPowerAmount = Math.max(...rollSection.roll.characteristic
					.map(c => CreatureLogic.getCharacteristic(creature, c)));

				const characteristics = SheetFormatter.joinCommasOr(rollSection.roll.characteristic
					.sort(SheetFormatter.sortCharacteristics)
					.map(c => Format.capitalize(c.slice(0, 1)))
				);
				rollPowerStr = isMonster ? rollPowerAmount.toString() : `${rollPowerAmount} (${characteristics})`;
			} else {
				let rollPowerAmount = 2;// echelon 1 always at least 2
				[ rollSection.roll.tier1, rollSection.roll.tier2, rollSection.roll.tier3 ].forEach(tier => {
					const potency = tier.match(/[MmAaRrIiPp]<(\d)/);
					if (potency && potency[1]) {
						rollPowerAmount = Math.max(rollPowerAmount, Number.parseInt(potency[1]));
					}
				});

				rollPowerStr = rollPowerAmount.toString();
			}

			sheet.rollPower = rollPowerStr;

			sheet.rollT1Effect = SheetFormatter.formatAbilityTier(rollSection.roll.tier1, 1, ability, creature);
			sheet.rollT2Effect = SheetFormatter.formatAbilityTier(rollSection.roll.tier2, 2, ability, creature);
			sheet.rollT3Effect = SheetFormatter.formatAbilityTier(rollSection.roll.tier3, 3, ability, creature);
		}

		return sheet;
	};
	// #endregion
}
