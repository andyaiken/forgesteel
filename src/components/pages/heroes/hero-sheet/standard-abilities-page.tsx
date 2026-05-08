import { ExtraCards, SheetLayout } from '@/logic/classic-sheet/sheet-layout';
import { AbilityData } from '@/data/ability-data';
import { ClassicSheetBuilder } from '@/logic/classic-sheet/classic-sheet-builder';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Hero } from '@/models/hero';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { useMemo } from 'react';
import { useOptions } from '@/contexts/data-context';

interface Props {
	hero: Hero;
};

export const StandardAbilitiesPage = (props: Props) => {
	const options = useOptions();
	const abilities = useMemo(
		() => AbilityData.standardAbilities.map(a => ClassicSheetBuilder.buildAbilitySheet(a, props.hero, undefined, options)),
		[ props.hero, options ]
	);
	abilities.sort((a, b) => SheetFormatter.sortAbilitiesByType(a, b, 'asc'));

	const layout = useMemo(
		() => SheetLayout.getAbilityLayout(options),
		[ options ]
	);

	const sheetClasses = useMemo(
		() => {
			const classes = [
				'hero-sheet',
				options.classicSheetPageSize.toLowerCase()
			];
			if (options.colorSheet) {
				classes.push('color');
				classes.push(`colors-${options.colorScheme}`);
			}
			return classes;
		},
		[ options.classicSheetPageSize, options.colorSheet, options.colorScheme ]
	);

	const extraCards = {
		required: [],
		optional: []
	} as ExtraCards;

	return (
		<ErrorBoundary>
			<main id='classic-sheet'>
				<div className={sheetClasses.join(' ')} id={props.hero.id}>
					{
						SheetLayout.getAbilityPages(abilities, extraCards, layout, p => SheetFormatter.getPageId('hero-sheet', 'standard-abilities', `abilities-${p}`))
					}
				</div>
			</main>
		</ErrorBoundary>
	);
};
