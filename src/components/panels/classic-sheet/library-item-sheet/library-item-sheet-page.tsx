import { ClassicSheetBuilder } from '@/logic/classic-sheet/classic-sheet-builder';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Terrain } from '@/models/terrain';
import { TerrainCard } from '../monster-card/terrain-card';
import { useMemo } from 'react';
import { useOptions } from '@/contexts/data-context';

import './library-item-sheet-page.scss';

interface Props {
	category: string;
	terrain: Terrain;
}

export const LibraryItemSheetPage = (props: Props) => {
	const terrain = useMemo(
		() => ClassicSheetBuilder.buildTerrainSheet(props.terrain),
		[ props.terrain ]
	);

	const options = useOptions();

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
				<div className={`page page-1 ${options.pageOrientation}`} id={SheetFormatter.getPageId('terrain', terrain.id)}>
					<TerrainCard terrain={terrain} />
				</div>
			</div>
		</main>
	);
};
