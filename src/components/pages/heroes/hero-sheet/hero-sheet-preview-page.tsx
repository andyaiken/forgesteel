import { Divider, Drawer, FloatButton, Segmented, Select, SelectProps, Space, Tag } from 'antd';
import { useMemo, useState } from 'react';
import { AbilityData } from '@/data/ability-data';
import { Career } from '@/models/career';
import { CareerCard } from '@/components/panels/classic-sheet/career-card/career-card';
import { ClassicSheetBuilder } from '@/logic/classic-sheet/classic-sheet-builder';
import { ComplicationCard } from '@/components/panels/classic-sheet/complication-card/complication-card';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FactoryLogic } from '@/logic/factory-logic';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroSheetBuilder } from '@/logic/hero-sheet/hero-sheet-builder';
import { HeroSheetPage } from '@/components/pages/heroes/hero-sheet/hero-sheet-page';
import { Options } from '@/models/options';
import { SettingFilled } from '@ant-design/icons';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { SheetPageSize } from '@/enums/sheet-page-size';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useParams } from 'react-router';

import './hero-sheet-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	setOptions: (options: Options) => void;
}

export const HeroSheetPreviewPage = (props: Props) => {
	const { heroID } = useParams<{ heroID: string }>();
	const hero = useMemo(
		() => props.heroes.find(h => h.id === heroID)!,
		[ heroID, props.heroes ]
	);

	const [ drawerOpen, setDrawerOpen ] = useState(false);
	const [ previewOptions, setPreviewOptions ] = useState<'html' | 'canvas'>('html');

	const changeTextColor = (newColor: 'light' | 'default' | 'dark') => {
		setDrawColor(newColor);
		setSheetTextColor(newColor);
	};

	const setDrawColor = (newColor: 'light' | 'default' | 'dark') => {
		let value = 34;
		switch (newColor) {
			case 'light':
				value = 68;
				break;
			case 'dark':
				value = 0;
				break;
		}
		const base = `rgb(${value}, ${value}, ${value})`;
		document.documentElement.style.setProperty('--color-text', base);
		const lighter = `rgb(${value + 34}, ${value + 34}, ${value + 34})`;
		document.documentElement.style.setProperty('--color-text-lighter', lighter);
		const lightest = `rgb(${value + 68}, ${value + 68}, ${value + 68})`;
		document.documentElement.style.setProperty('--color-text-lightest', lightest);
	};
	setDrawColor(props.options.sheetTextColor);

	const setSheetTextColor = (value: 'light' | 'default' | 'dark') => {
		const copy = Utils.copy(props.options);
		copy.sheetTextColor = value;
		props.setOptions(copy);
	};

	const showDrawer = () => {
		setDrawerOpen(true);
	};

	const onDrawerClose = () => {
		setDrawerOpen(false);
	};

	const setIncludePlayState = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.includePlayState = value;
		props.setOptions(copy);
	};

	const setColorSheet = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.colorSheet = value;
		props.setOptions(copy);
	};

	const setFeaturesInclude = (value: 'minimal' | 'no-basic' | 'all') => {
		const copy = Utils.copy(props.options);
		copy.featuresInclude = value;
		props.setOptions(copy);
	};

	const setClassicSheetPageSize = (value: SheetPageSize) => {
		const copy = Utils.copy(props.options);
		copy.classicSheetPageSize = value;
		props.setOptions(copy);
	};

	const setPageOrientation = (value: 'portrait' | 'landscape') => {
		const copy = Utils.copy(props.options);
		copy.pageOrientation = value;
		props.setOptions(copy);
	};

	const includedStandardAbilitiesChanged = (value: string | string[]) => {
		const copy = Utils.copy(props.options);
		copy.shownStandardAbilities = [ value ].flat(1);
		props.setOptions(copy);
	};

	const standardAbilityOptions: SelectProps['options'] = [];
	const standardAbilities = HeroLogic.getAbilities(FactoryLogic.createHero([]), [], AbilityData.standardAbilities.map(a => a.id))
		.map(a => ClassicSheetBuilder.buildAbilitySheet(a.ability, undefined));
	standardAbilities.sort(SheetFormatter.sortAbilitiesByType);
	standardAbilities.forEach(a => {
		standardAbilityOptions.push({
			value: a.id,
			label: <div className='ds-text'>{a.name} <Tag>{a.actionType}</Tag></div>
		});
	});

	const setDisplay = (type: 'html' | 'canvas') => {
		setPreviewOptions(type);
		const element = document.getElementById('classic-sheet');
		const canvasElem = document.getElementById('pdf-canvas');
		const prevDpr = window.devicePixelRatio;
		if (element && canvasElem) {
			const initialW = element.clientWidth;
			switch (type) {
				case 'html':
					element.className = '';
					canvasElem.className = 'hidden';
					break;
				case 'canvas':
					element.className = '';
					window.devicePixelRatio = 4;
					Utils.elementToCanvas(element)
						.then(function (canvas) {
							canvas.style.width = initialW + 'px';
							canvasElem.replaceChildren(canvas);
							canvasElem.className = '';
							element.className = 'hidden';
							window.devicePixelRatio = prevDpr;
						});
					break;
			}
		}
	};

	const fakeHero = FactoryLogic.createHero(props.sourcebooks.map(s => s.id));
	const getPageClasses = () => {
		return [
			'hero-sheet',
			props.options.classicSheetPageSize.toLowerCase(),
			props.options.pageOrientation
		].join(' ');
	};

	const getAllCareers = () => {
		return SourcebookLogic.getCareers(props.sourcebooks)
			.flatMap(c => {
				const withIncidents: Career[] = [];
				c.incitingIncidents.options.forEach(i => {
					const selected = Utils.copy(c.incitingIncidents);
					selected.selected = Utils.copy(i);
					withIncidents.push({
						...c,
						incitingIncidents: selected
					});
				});
				return withIncidents;
			})
			.map(HeroSheetBuilder.buildCareerSheet);
	};

	const getAllComplications = () => {
		return SourcebookLogic.getComplications(props.sourcebooks)
			.map(HeroSheetBuilder.buildComplicationSheet);
	};

	const getPreviewPage = () => {
		if (heroID === 'careers') {
			return (
				<main id='hero-sheet-page' className='classic-sheet'>
					<div className={getPageClasses()}>
						<h2>All Careers</h2>
						<div className='all-careers'>
							<CareerCard
								career={undefined}
								hero={fakeHero}
							/>
							{getAllCareers().map(c => {
								return (
									<CareerCard
										key={c.id}
										career={c}
										hero={fakeHero}
									/>
								);
							})}
						</div>
					</div>
				</main>
			);
		} else if (heroID === 'complications') {
			return (
				<main id='hero-sheet-page' className='classic-sheet'>
					<div className={getPageClasses()}>
						<h2>All Complications</h2>
						<div className='all-complications'>
							<ComplicationCard
								complication={undefined}
								hero={fakeHero}
							/>
							{getAllComplications().map(c => {
								return (
									<ComplicationCard
										key={c.id}
										complication={c}
										hero={fakeHero}
									/>
								);
							})}
						</div>
					</div>
				</main>
			);
		} else {
			return (
				<HeroSheetPage
					hero={hero}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
			);
		}
	};

	return (
		<ErrorBoundary>
			<div id='pdf-preview'>
				<div className='menu'>
					<Segmented
						options={[
							{ value: 'html', label: 'HTML' },
							{ value: 'canvas', label: 'Canvas' }
						]}
						value={previewOptions}
						onChange={setDisplay}
					/>
				</div>
				{getPreviewPage()}
				<div id='pdf-canvas'></div>
				<FloatButton
					icon={<SettingFilled />}
					onClick={showDrawer}
					tooltip={<div>Sheet Display Options</div>}
				/>
				<Drawer
					title='Sheet Display Options'
					closable={{ 'aria-label': 'Close Button' }}
					onClose={onDrawerClose}
					open={drawerOpen}
					style={{ padding: '10px' }}
				>
					<Toggle label='Show play state' value={props.options.includePlayState} onChange={setIncludePlayState} />
					<Toggle label='Use color' value={props.options.colorSheet} onChange={setColorSheet} />
					<Divider size='small'>Text Color</Divider>
					<Segmented
						name='textColor'
						block={true}
						options={[
							{ value: 'dark', label: 'Darker' },
							{ value: 'default', label: 'Default' },
							{ value: 'light', label: 'Lighter' }
						]}
						value={props.options.sheetTextColor}
						onChange={changeTextColor}
					/>
					<Divider size='small'>Include Class Features</Divider>
					<Segmented
						style={{ width: '100%' }}
						name='abilitySort'
						block={true}
						options={[
							{ value: 'minimal', label: 'Minimal' },
							{ value: 'no-basic', label: 'No Simple' },
							{ value: 'all', label: 'All' }
						]}
						value={props.options.featuresInclude}
						onChange={setFeaturesInclude}
					/>
					<Divider size='small'>Included Standard Abilities</Divider>
					<Select
						mode='tags'
						placeholder='Included Standard Abilities'
						onChange={includedStandardAbilitiesChanged}
						options={standardAbilityOptions}
					/>
					<Divider>Layout</Divider>
					<Space direction='vertical' style={{ width: '100%' }}>
						<Segmented
							name='pagesize'
							block={true}
							options={[ SheetPageSize.Letter, SheetPageSize.A4 ]}
							value={props.options.classicSheetPageSize}
							onChange={setClassicSheetPageSize}
						/>
						<Segmented
							name='orientation'
							block={true}
							options={[
								{ value: 'portrait', label: 'Portrait' },
								{ value: 'landscape', label: 'Landscape' }
							]}
							value={props.options.pageOrientation}
							onChange={setPageOrientation}
						/>
					</Space>
				</Drawer>
			</div>
		</ErrorBoundary>
	);
};
