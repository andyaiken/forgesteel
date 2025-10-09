import { Button, Divider, Flex, Segmented, Space, Upload } from 'antd';
import { DownloadOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { AdventurePackage } from '@/models/adventure';
import { Element } from '@/models/element';
import { EncounterData } from '@/data/encounter-data';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { Field } from '@/components/controls/field/field';
import { MontageData } from '@/data/montage-data';
import { NegotiationData } from '@/data/negotiation-data';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { PlaybookElementKind } from '@/models/playbook';
import { TacticalMapLogic } from '@/logic/tactical-map-logic';
import { useState } from 'react';

import './create-panel.scss';

interface Props {
	currentTab: PlaybookElementKind;
	createElement: (kind: PlaybookElementKind, original: Element | null) => void;
	importElement: (kind: PlaybookElementKind, element: Element) => void;
	importAdventurePackage: (ap: AdventurePackage) => void;
}

export const CreatePanel = (props: Props) => {
	const [ mapImportType, setMapImportType ] = useState<'image' | 'video'>('image');
	const [ mapImportData, setMapImportData ] = useState<string>('');
	const [ mapImportWidth, setMapImportWidth ] = useState<number>(10);
	const [ mapImportHeight, setMapImportHeight ] = useState<number>(5);
	const [ mapGenerateType, setMapGenerateType ] = useState<'dungeon' | 'cavern'>('dungeon');
	const [ mapGenerateSize, setMapGenerateSize ] = useState<number>(5);

	const createElement = (original: Element | null) => {
		props.createElement(props.currentTab, original);
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
		createElement(map);
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
		createElement(map);
	};

	const exampleEncounters = [
		EncounterData.goblinAmbush,
		EncounterData.dragonAttack
	];

	const exampleMontages = [
		MontageData.fightFire,
		MontageData.infiltrateThePalace,
		MontageData.prepareForBattle,
		MontageData.trackTheFugitive,
		MontageData.wildernessRace
	];

	const exampleNegotiations = [
		NegotiationData.banditChief,
		NegotiationData.knight,
		NegotiationData.guildmaster,
		NegotiationData.warlord,
		NegotiationData.burgomaster,
		NegotiationData.virtuoso,
		NegotiationData.highPriest,
		NegotiationData.duke,
		NegotiationData.dragon,
		NegotiationData.monarch,
		NegotiationData.lich,
		NegotiationData.deity
	];

	return (
		<div className='create-panel'>
			<Space direction='vertical' style={{ width: '100%' }}>
				<Button type='primary' block={true} icon={<PlusOutlined />} onClick={() => createElement(null)}>Create</Button>
				<Upload
					accept={`.drawsteel-${props.currentTab.toLowerCase()},.ds-${props.currentTab.toLowerCase()}`}
					showUploadList={false}
					beforeUpload={file => {
						file
							.text()
							.then(json => {
								if (props.currentTab === 'adventure') {
									const ap = JSON.parse(json) as AdventurePackage;
									props.importAdventurePackage(ap);
								} else {
									const e = JSON.parse(json) as Element;
									props.importElement(props.currentTab, e);
								}
							});
						return false;
					}}
				>
					<Button block={true} icon={<DownloadOutlined />}>Import</Button>
				</Upload>
			</Space>
			{
				props.currentTab === 'encounter' ?
					<div>
						<div className='ds-text centered-text'>or start with a premade example:</div>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
							{
								exampleEncounters.map(n => (
									<Button key={n.id} block={true} onClick={() => createElement(n)}>{n.name}</Button>
								))
							}
						</div>
					</div>
					: null
			}
			{
				props.currentTab === 'negotiation' ?
					<div>
						<div className='ds-text centered-text'>or start with a premade example:</div>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
							{
								exampleNegotiations.map(n => (
									<Button key={n.id} block={true} onClick={() => createElement(n)}>{n.name}</Button>
								))
							}
						</div>
					</div>
					: null
			}
			{
				props.currentTab === 'montage' ?
					<div>
						<div className='ds-text centered-text'>or start with a premade example:</div>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
							{
								exampleMontages.map(m => (
									<Button key={m.id} block={true} onClick={() => createElement(m)}>{m.name}</Button>
								))
							}
						</div>
					</div>
					: null
			}
			{
				props.currentTab === 'tactical-map' ?
					<Space direction='vertical' style={{ width: '300px' }}>
						<Divider />
						<Expander title='Use a battlemap'>
							<Space direction='vertical' style={{ width: '100%', marginTop: '15px' }}>
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
						</Expander>
						<Expander title='Generate a random map'>
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
					</Space>
					: null
			}
		</div>
	);
};
