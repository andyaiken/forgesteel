import { FillerCard, SheetLayout } from '@/logic/classic-sheet/sheet-layout';
import { ClassicSheetBuilder } from '@/logic/classic-sheet/classic-sheet-builder';
import { GenericCard } from '../notes-card/notes-card';
import { MaliceGroupComponent } from '../malice-card/malice-card';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Monster } from '@/models/monster';
import { MonsterCard } from '../monster-card/monster-card';
import { MonsterGroup } from '@/models/monster-group';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
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
		() => SheetLayout.getMonsterCardsLayout(options),
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
			case 'monster-group': {
				const group = props.item as MonsterGroup;

				const infoCards = group.information.map(info => {
					return <GenericCard title={info.name} content={info.description} key={`info-${info.id}`} />;
				});
				infoCards.push(
					<div className='malice card'>
						<h2>Malice</h2>
						<div className='malice-features features-container content'>
							<MaliceGroupComponent monster={group.name} malice={group.malice} />
						</div>
					</div>
				);

				const monsterCards: FillerCard[] = [];
				group.monsters.forEach(monster => {
					const ms = ClassicSheetBuilder.buildMonsterSheet(monster);
					let mH = SheetFormatter.calculateMonsterSize(ms, layout.cardLineLen);
					let mW = 1;
					if (mH > layout.linesY) {
						mW = 2;
						mH = SheetFormatter.calculateMonsterSize(ms, layout.cardLineLen, 2);
						if (mH > layout.linesY) {
							console.warn('Card still larger than a full page!', ms.name, mH);
							mH = layout.linesY;
						}
					}
					monsterCards.push({
						element: <MonsterCard monster={ms} columns={mW} key={ms.id} />,
						width: mW,
						height: mH,
						shown: false
					});
				});
				monsterCards.sort((a, b) => a.height - b.height);

				return (
					<>
						<div className={`page extra-cards row-cards-2 ${options.pageOrientation}`} id={SheetFormatter.getPageId('monster-group', group.id, 'info')}>
							<div className='card'>
								<h1>{group.name}</h1>
								<div className='content'>
									<Markdown text={group.description} />
								</div>
							</div>
							{infoCards}
						</div>
						{SheetLayout.getMonsterCardPages(monsterCards, layout, `monster-group-${group.id}-page-monsters`)}
					</>
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
