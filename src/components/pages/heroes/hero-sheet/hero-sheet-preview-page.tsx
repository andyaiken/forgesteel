import { Divider, Drawer, FloatButton, Segmented } from 'antd';
import { useMemo, useState } from 'react';
import { Hero } from '../../../../models/hero';
import { HeroSheetPage } from './hero-sheet-page';
import { Options } from '../../../../models/options';
import { SettingFilled } from '@ant-design/icons';
import { SheetPageSize } from '../../../../enums/sheet-page-size';
import { Sourcebook } from '../../../../models/sourcebook';
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

	const setColorAbilityCards = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.colorAbilityCards = value;
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
				<HeroSheetPage
					hero={hero}
					sourcebooks={props.sourcebooks}
					options={props.options}
				/>
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
					<Toggle label='Color ability cards' value={props.options.colorAbilityCards} onChange={setColorAbilityCards} />
					<Toggle label='Include standard abilities' value={props.options.showStandardAbilities} onChange={setShowStandardAbilities} />
					<Divider>Page Size</Divider>
					<Segmented
						name='pagesize'
						block={true}
						options={[ SheetPageSize.Letter, SheetPageSize.A4 ]}
						value={props.options.classicSheetPageSize}
						onChange={setClassicSheetPageSize}
					/>
					<Divider>Page Orientation</Divider>
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
				</Drawer>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
