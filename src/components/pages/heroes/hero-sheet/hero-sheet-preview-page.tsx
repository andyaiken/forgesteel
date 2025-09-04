import { Divider, Drawer, FloatButton, Segmented, Space } from 'antd';
import { useMemo, useState } from 'react';
import { Career } from '../../../../models/career';
import { CareerCard } from '../../../panels/hero-sheet/career-card/career-card';
import { CharacterSheetBuilder } from '../../../../utils/sheet-builder';
import { ComplicationCard } from '../../../panels/hero-sheet/complication-card/complication-card';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { Hero } from '../../../../models/hero';
import { HeroSheetPage } from './hero-sheet-page';
import { Options } from '../../../../models/options';
import { SettingFilled } from '@ant-design/icons';
import { SheetPageSize } from '../../../../enums/sheet-page-size';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Toggle } from '../../../controls/toggle/toggle';
import { Utils } from '../../../../utils/utils';
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

	const setAbilitySort = (value: 'size' | 'type') => {
		const copy = Utils.copy(props.options);
		copy.abilitySort = value;
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

	const setShowStandardAbilities = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.showStandardAbilities = value;
		props.setOptions(copy);
	};

	const setDisplay = (type: 'html' | 'canvas') => {
		setPreviewOptions(type);
		const element = document.getElementById('hero-sheet-page');
		const canvasElem = document.getElementById('pdf-canvas');
		if (element && canvasElem) {
			switch (type) {
				case 'html':
					element.className = '';
					canvasElem.className = 'hidden';
					break;
				case 'canvas':
					element.className = '';
					Utils.elementToCanvas(element)
						.then(function (canvas) {
							canvasElem.replaceChildren(canvas);
							canvasElem.className = '';
							element.className = 'hidden';
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
			.map(CharacterSheetBuilder.buildCareerSheet);
	};

	const getAllComplications = () => {
		return SourcebookLogic.getComplications(props.sourcebooks)
			.map(CharacterSheetBuilder.buildComplicationSheet);
	};

	const getPreviewPage = () => {
		if (heroID === 'careers') {
			return (
				<main id='hero-sheet-page'>
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
				<main id='hero-sheet-page'>
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

	try {
		return (
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
					<Divider size='small'>Text Color:</Divider>
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
					<Divider size='small'>Include Class Features:</Divider>
					<Segmented
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
					<Divider>Abilities</Divider>
					<Toggle label='Include standard abilities' value={props.options.showStandardAbilities} onChange={setShowStandardAbilities} />
					<Divider size='small'>Sort Abilities By</Divider>
					<Segmented
						name='abilitySort'
						block={true}
						options={[
							{ value: 'size', label: 'Length' },
							{ value: 'type', label: 'Action Type' }
						]}
						value={props.options.abilitySort}
						onChange={setAbilitySort}
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
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
