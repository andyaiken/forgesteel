import { ExtraCards, SheetLayout } from '@/logic/classic-sheet/sheet-layout';
import { AbilityData } from '@/data/ability-data';
import { ClassicSheetBuilder } from '@/logic/classic-sheet/classic-sheet-builder';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FactoryLogic } from '@/logic/factory-logic';
import { Options } from '@/models/options';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { useMemo } from 'react';

interface Props {
	options: Options;
};

export const StandardAbilitiesPage = (props: Props) => {
	const hero = FactoryLogic.createHero([]);
	const abilities = AbilityData.standardAbilities.map(a => ClassicSheetBuilder.buildAbilitySheet(a, hero));
	abilities.sort(SheetFormatter.sortAbilitiesByType);

	const layout = useMemo(
		() => SheetLayout.getAbilityLayout(props.options),
		[ props.options ]
	);

	const sheetClasses = useMemo(
		() => {
			const classes = [
				'hero-sheet',
				props.options.classicSheetPageSize.toLowerCase()
			];
			if (props.options.colorSheet) {
				classes.push('color');
			}
			return classes;
		},
		[ props.options.classicSheetPageSize, props.options.colorSheet ]
	);

	const extraCards = {
		required: [],
		optional: []
	} as ExtraCards;

	return (
		<ErrorBoundary>
			<main id='classic-sheet'>
				<div className={sheetClasses.join(' ')} id={hero.id}>
					{
						SheetLayout.getAbilityPages(abilities, extraCards, layout, p => SheetFormatter.getPageId('hero-sheet', 'standard-abilities', `abilities-${p}`))
					}
				</div>
			</main>
		</ErrorBoundary>
	);
};
