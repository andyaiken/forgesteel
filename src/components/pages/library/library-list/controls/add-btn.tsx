import { Alert, Button, Flex, Popover, Segmented, Select, Space, Upload } from 'antd';
import { DownOutlined, DownloadOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { Collections } from '@/utils/collections';
import { DestinationSelector } from '@/components/pages/library/library-list/controls/destination-selector';
import { Element } from '@/models/element';
import { EncounterData } from '@/data/encounter-data';
import { EncounterDifficulty } from '@/enums/encounter-difficulty';
import { EncounterDifficultyLogic } from '@/logic/encounter-difficulty-logic';
import { EncounterLogic } from '@/logic/encounter-logic';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { Field } from '@/components/controls/field/field';
import { Hero } from '@/models/hero';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { TacticalMapLogic } from '@/logic/tactical-map-logic';
import { useState } from 'react';

interface Props {
	category: SourcebookElementKind;
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	showMonsters: boolean;
	sourcebookID: string;
	setShowMonsters: (value: boolean) => void;
	setSourcebookID: (value: string) => void;
	createElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element | null) => void;
	importElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
}

export const AddBtn = (props: Props) => {
	const [ difficulty, setDifficulty ] = useState<EncounterDifficulty>(EncounterDifficulty.Standard);
	const [ keywords, setKeywords ] = useState<string[]>([]);
	const [ mapImportType, setMapImportType ] = useState<'image' | 'video'>('image');
	const [ mapImportData, setMapImportData ] = useState<string>('');
	const [ mapImportWidth, setMapImportWidth ] = useState<number>(10);
	const [ mapImportHeight, setMapImportHeight ] = useState<number>(5);
	const [ mapGenerateType, setMapGenerateType ] = useState<'dungeon' | 'cavern'>('dungeon');
	const [ mapGenerateSize, setMapGenerateSize ] = useState<number>(5);

	if ((props.category === 'monster-group') && props.showMonsters) {
		return (
			<Popover
				trigger='click'
				content={(
					<Alert
						type='info'
						showIcon={true}
						title='To create a new monster, switch to Group view.'
						action={<Button style={{ marginLeft: '5px' }} onClick={() => props.setShowMonsters(false)}>Switch</Button>}
					/>
				)}
			>
				<Button type='primary'>
					Add
					<DownOutlined />
				</Button>
			</Popover>
		);
	}

	const exampleEncounters = [
		EncounterData.goblinAmbush,
		EncounterData.dragonAttack
	];

	const generateEncounter = () => {
		const enc = FactoryLogic.createEncounter();

		let heroLevel = props.options.heroLevel;
		if (props.options.heroParty) {
			const party = props.heroes.filter(h => h.folder === props.options.heroParty);
			heroLevel = Math.round(Collections.mean(party, h => h.class ? h.class.level : 1));
		}

		const budgets = EncounterDifficultyLogic.getBudgets(props.options, props.heroes);
		switch (difficulty) {
			case EncounterDifficulty.Easy:
				EncounterLogic.generateEncounter(enc, props.sourcebooks, keywords, budgets.maxTrivial, heroLevel, heroLevel + 1);
				break;
			case EncounterDifficulty.Standard:
				EncounterLogic.generateEncounter(enc, props.sourcebooks, keywords, budgets.maxEasy, heroLevel, heroLevel + 1);
				break;
			case EncounterDifficulty.Hard:
				EncounterLogic.generateEncounter(enc, props.sourcebooks, keywords, budgets.maxStandard, heroLevel, heroLevel + 2);
				break;
		}

		props.createElement(props.category, props.sourcebookID, enc);
	};

	const createImageMap = () => {
		const map = FactoryLogic.createTacticalMap();
		const tile = FactoryLogic.createMapTile();
		tile.dimensions.width = mapImportWidth;
		tile.dimensions.height = mapImportHeight;
		switch (mapImportType) {
			case 'image':
				tile.content = { type: 'image', imageData: mapImportData };
				break;
			case 'video':
				tile.content = { type: 'video', videoData: mapImportData };
		}
		map.items.push(tile);
		props.createElement(props.category, props.sourcebookID, map);
	};

	const generateMap = () => {
		const map = FactoryLogic.createTacticalMap();
		switch (mapGenerateType) {
			case 'dungeon':
				TacticalMapLogic.generateDungeon(mapGenerateSize, map);
				break;
			case 'cavern':
				TacticalMapLogic.generateCavern(mapGenerateSize * 50, map);
				break;
		}
		props.createElement(props.category, props.sourcebookID, map);
	};

	const getOptions = () => {
		switch (props.category) {
			case 'encounter':
				return [
					<Expander key='premade' title='Use a premade example'>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
							{
								exampleEncounters.map(e => (
									<Button key={e.id} block={true} onClick={() => props.createElement(props.category, props.sourcebookID, e)}>{e.name}</Button>
								))
							}
						</div>
					</Expander>,
					<Expander key='random' title='Generate a random encounter'>
						<Segmented
							style={{ marginTop: '15px' }}
							block={true}
							options={[ EncounterDifficulty.Easy, EncounterDifficulty.Standard, EncounterDifficulty.Hard ]}
							value={difficulty}
							onChange={setDifficulty}
						/>
						<Select
							style={{ width: '100%', margin: '10px 0' }}
							mode='multiple'
							placeholder='Use monsters with any keywords'
							options={Collections.sort(Collections.distinct(SourcebookLogic.getMonsters(props.sourcebooks).flatMap(m => m.keywords), kw => kw), kw => kw).map(kw => ({ value: kw, label: kw }))}
							optionRender={opt => <div className='ds-text'>{opt.data.value}</div>}
							value={keywords}
							onChange={setKeywords}

						/>
						<Button block={true} type='primary' icon={<ThunderboltOutlined />} onClick={generateEncounter}>Generate</Button>
					</Expander>

				];
			case 'tactical-map':
				return [
					<Expander key='image' title='Use a battlemap'>
						<Space orientation='vertical' style={{ width: '100%' }}>
							<Segmented
								block={true}
								options={[
									{ value: 'image', label: 'Image' },
									{ value: 'video', label: 'Animated' }
								]}
								value={mapImportType}
								onChange={setMapImportType}
							/>
							<Upload
								style={{ width: '100%' }}
								accept={mapImportType === 'image' ? '.png,.webp,.gif,.jpg,.jpeg,.svg' : '.mp4,.webm'}
								showUploadList={false}
								beforeUpload={file => {
									const reader = new FileReader();
									reader.onload = progress => {
										if (progress.target) {
											const content = progress.target.result as string;
											setMapImportData(content);
										}
									};
									reader.readAsDataURL(file);
									return false;
								}}
							>
								<Button block={true}>
									<DownloadOutlined />
									Choose file
								</Button>
							</Upload>
							{
								mapImportData ?
									<>
										{
											mapImportType === 'image' ?
												<img
													style={{ width: '100%' }}
													src={mapImportData}
												/>
												:
												<video
													style={{ width: '100%' }}
													src={mapImportData}
													autoPlay={true}
													controls={false}
													loop={true}
													muted={true}
												/>
										}
										<Flex align='center' justify='space-between' gap={10}>
											<NumberSpin min={1} value={mapImportWidth} onChange={setMapImportWidth}>
												<Field orientation='vertical' label='Width' value={mapImportWidth} />
											</NumberSpin>
											<NumberSpin min={1} value={mapImportHeight} onChange={setMapImportHeight}>
												<Field orientation='vertical' label='Height' value={mapImportHeight} />
											</NumberSpin>
										</Flex>
										<Button block={true} type='primary' onClick={createImageMap}>Create</Button>
									</>
									: null
							}
						</Space>
					</Expander>,
					<Expander key='random' title='Generate a random map'>
						<Segmented
							style={{ marginTop: '15px' }}
							block={true}
							options={[
								{ value: 'dungeon', label: 'Dungeon' },
								{ value: 'cavern', label: 'Cavern' }
							]}
							value={mapGenerateType}
							onChange={setMapGenerateType}
						/>
						<NumberSpin min={1} value={mapGenerateSize} onChange={setMapGenerateSize}>
							<Field orientation='vertical' label={mapGenerateType === 'dungeon' ? 'Rooms' : 'Size'} value={mapGenerateSize} />
						</NumberSpin>
						<Button block={true} type='primary' icon={<ThunderboltOutlined />} onClick={generateMap}>Generate</Button>
					</Expander>
				];
			default:
				return [];
		}
	};

	return (
		<Popover
			trigger='click'
			content={(
				<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '300px' }}>
					<DestinationSelector sourcebooks={props.sourcebooks} sourcebookID={props.sourcebookID} setSourcebookID={props.setSourcebookID} />
					<Space orientation='vertical' style={{ width: '100%' }}>
						<Button type='primary' block={true} icon={<PlusOutlined />} onClick={() => props.createElement(props.category, props.sourcebookID, null)}>Create</Button>
						<Upload
							style={{ width: '100%' }}
							accept={`.drawsteel-${props.category.toLowerCase()},.ds-${props.category.toLowerCase()}`}
							showUploadList={false}
							beforeUpload={file => {
								file
									.text()
									.then(json => {
										const e = JSON.parse(json) as Element;
										props.importElement(props.category, props.sourcebookID, e);
									});
								return false;
							}}
						>
							<Button block={true} icon={<DownloadOutlined />}>Import</Button>
						</Upload>
						{getOptions()}
					</Space>
				</div>
			)}
		>
			<Button type='primary'>
				Add
				<DownOutlined />
			</Button>
		</Popover>
	);
};
