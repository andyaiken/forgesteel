import { Ability } from '../../models/ability';
import { FactoryLogic } from '../factory-logic';

export class AbilityUpdateLogic {
	static updateAbility = (ability: Ability) => {
		if (ability.sections === undefined) {
			ability.sections = [];
		}

		/* eslint-disable @typescript-eslint/no-deprecated */

		if (ability.preEffect) {
			ability.sections.push(FactoryLogic.createAbilitySectionText(ability.preEffect));
			ability.preEffect = '';
		}

		if (ability.powerRoll) {
			ability.sections.push(FactoryLogic.createAbilitySectionRoll(ability.powerRoll));
			ability.powerRoll = null;
		}

		if (ability.test) {
			ability.sections.push(FactoryLogic.createAbilitySectionRoll(ability.test));
			ability.test = null;
		}

		if (ability.effect) {
			ability.sections.push(FactoryLogic.createAbilitySectionText(ability.effect));
			ability.effect = '';
		}

		if (ability.strained) {
			ability.sections.push(FactoryLogic.createAbilitySectionField({
				name: 'Strained',
				effect: ability.strained
			}));
			ability.strained = '';
		}

		if (ability.alternateEffects.length > 0) {
			ability.alternateEffects.forEach(ae => {
				ability.sections.push(FactoryLogic.createAbilitySectionField({
					name: 'Alternate Effect',
					effect: ae
				}));
			});
			ability.alternateEffects = [];
		}

		if (ability.spend.length > 0) {
			ability.spend.forEach(spend => {
				ability.sections.push(FactoryLogic.createAbilitySectionField({
					name: spend.name || 'Spend',
					effect: spend.effect,
					value: spend.value,
					repeatable: spend.repeatable
				}));
			});
			ability.spend = [];
		}

		if (ability.persistence.length > 0) {
			ability.persistence.forEach(persist => {
				ability.sections.push(FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					effect: persist.effect,
					value: persist.value
				}));
			});
			ability.persistence = [];
		}

		/* eslint-enable @typescript-eslint/no-deprecated */
	};
}
