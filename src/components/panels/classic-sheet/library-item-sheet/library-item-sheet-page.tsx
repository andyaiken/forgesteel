import { ClassicSheetBuilder } from '@/logic/classic-sheet/classic-sheet-builder';
import { Monster } from '@/models/monster';
import { MonsterCard } from '../monster-card/monster-card';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { SheetLayout } from '@/logic/classic-sheet/sheet-layout';
import { Terrain } from '@/models/terrain';
import { TerrainCard } from '../monster-card/terrain-card';
import { useMemo } from 'react';
import { useOptions } from '@/contexts/data-context';

import './library-item-sheet-page.scss';

interface Props {
	category: string;
	item: unknown;
}

export const LibraryItemSheetPage = (props: Props) => {
	const options = useOptions();
	const layout = useMemo(
		() => SheetLayout.getFollowerCardsLayout(options, false),
		[ options ]
	);

	const getContent = () => {
		const pageClasses = [
			'page',
			options.pageOrientation,
			`row-cards-${layout.perRow}`
		].join(' ');

		switch (props.category) {
			case 'terrain': {
				const sheet = ClassicSheetBuilder.buildTerrainSheet(props.item as Terrain);
				return (
					<div className={pageClasses} id={SheetFormatter.getPageId('terrain', sheet.id)}>
						<TerrainCard terrain={sheet} />
					</div>
				);
			}
			case 'monster': {
				const sheet = ClassicSheetBuilder.buildMonsterSheet(props.item as Monster);
				const cardH = SheetFormatter.calculateMonsterSize(sheet, layout.cardLineLen);
				let w = 1;
				if (cardH > layout.linesY) {
					w = 2;
				}

				return (
					<div className={pageClasses} id={SheetFormatter.getPageId('monster', sheet.id)}>
						<MonsterCard monster={sheet} columns={w} />
					</div>
				);
			}
		}
	};

	const content = useMemo(
		() => getContent(),
		[ props.item, props.category ]
	);

	const sheetClasses = useMemo(
		() => {
			const classes = [
				'library-item-sheet',
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

	return (
		<main id='classic-sheet'>
			<div className={sheetClasses.join(' ')}>
				{content}
			</div>
		</main>
	);
};
