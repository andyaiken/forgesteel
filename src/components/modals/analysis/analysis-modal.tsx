import { AbilityBudget, AnalysisLogic } from '@/logic/analysis-logic';
import { Ability } from '@/models/ability';
import { Alert } from 'antd';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Modal } from '@/components/modals/modal/modal';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';

import './analysis-modal.scss';

interface Props {
	sourcebooks: Sourcebook[];
	onClose: () => void;
}

// Human-readable version of a feature key like 'forced-movement:tier-2-3' or 'usage:ranged'
const formatLabel = (label: string) => {
	return label
		.split(':')
		.join(' · ')
		.split('-')
		.join(' ');
};

export const AnalysisModal = (props: Props) => {
	const abilities = props.sourcebooks
		.flatMap(SourcebookLogic.getAllAbilities)
		.map(AnalysisLogic.convertAbility);

	// Only class / subclass / domain abilities use the signature / 3 / 5 / 7 / 9 / 11 heroic
	// resource cost economy; ancestry, item, and monster abilities spend different resources (or
	// none at all), so they'd only add noise to a model of that economy. Abilities with no power
	// roll (edicts, stances, and other pure-utility abilities) are dropped too - their cost isn't
	// paying for damage or effects at all, so they don't fit a 'spend the budget' model of cost.
	const heroAbilities = props.sourcebooks
		.flatMap(sb => [
			...sb.classes.flatMap(c => SourcebookLogic.getAbilitiesFromClass(c, true, true, true, true, true, true)),
			...sb.subclasses.flatMap(sc => SourcebookLogic.getAbilitiesFromSubclass(sc, true, true)),
			...sb.domains.flatMap(SourcebookLogic.getAbilitiesFromDomain)
		])
		.filter(a => a.sections.some(s => s.type === 'roll'))
		.map(ability => ({ ability: ability, data: AnalysisLogic.convertAbility(ability) }))
		.filter(a => (typeof a.data.cost === 'number') && [ 3, 5, 7, 9, 11 ].includes(a.data.cost));

	const costModel = AnalysisLogic.getCostModel(heroAbilities.map(a => a.data));
	const budgetTerms = costModel.terms.filter(t => t.role === 'budget');
	const spendTerms = costModel.terms.filter(t => t.role === 'spend');

	const budgets = heroAbilities
		.map(a => ({ ability: a.ability, result: AnalysisLogic.getBudget(a.data, costModel) }))
		.filter((a): a is { ability: Ability; result: AbilityBudget } => a.result !== null)
		.sort((a, b) => b.result.ratio - a.result.ratio);

	const bestValue = budgets.slice(0, 8);
	const weakestValue = budgets.slice(-8).reverse();

	return (
		<Modal
			content={
				<div className='analysis-modal'>
					<HeaderText>Analysis</HeaderText>
					<Alert
						type='info'
						showIcon={true}
						title='This tool attempts to analyze how abilities are constructed.'
					/>
					{
						[ 'signature', 3, 5, 7, 9, 11 ].map((cost, n) => (
							<div key={n}>
								{cost}: {abilities.filter(d => d.cost === cost).length}
							</div>
						))
					}
					<HeaderText>Cost Model</HeaderText>
					<Alert
						type='info'
						showIcon={true}
						title={`Fitted against ${costModel.sampleSize} class / subclass / domain abilities with a power roll, at a signature-resource cost of 3, 5, 7, 9, or 11; R² = ${costModel.rSquared.toFixed(2)}. An ability's own cost, adjusted for its usage type, is its budget; its damage & effects, priced at the rates below, are its spend.`}
					/>
					<div>Baseline spend (every ability gets this, folded into the total below): {costModel.intercept.toFixed(2)}</div>
					<div><strong>Budget (from cost &amp; usage type)</strong></div>
					{
						budgetTerms.map((term, n) => (
							<div key={n}>
								{formatLabel(term.label)}: {term.weight.toFixed(2)} <small>(n={term.support})</small>
							</div>
						))
					}
					<div><strong>Spend (price list for damage &amp; effects)</strong></div>
					{
						spendTerms.map((term, n) => (
							<div key={n}>
								{formatLabel(term.label)}: {term.weight.toFixed(2)} <small>(n={term.support})</small>
							</div>
						))
					}
					<HeaderText>Best Value For Cost</HeaderText>
					{
						bestValue.map((o, n) => (
							<div key={n}>
								{o.ability.name}: cost {o.result.cost}, budget {o.result.budget.toFixed(1)}, spends {o.result.spend.toFixed(1)} ({(o.result.ratio * 100).toFixed(0)}%)
							</div>
						))
					}
					<HeaderText>Weakest For Cost</HeaderText>
					{
						weakestValue.map((o, n) => (
							<div key={n}>
								{o.ability.name}: cost {o.result.cost}, budget {o.result.budget.toFixed(1)}, spends {o.result.spend.toFixed(1)} ({(o.result.ratio * 100).toFixed(0)}%)
							</div>
						))
					}
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
