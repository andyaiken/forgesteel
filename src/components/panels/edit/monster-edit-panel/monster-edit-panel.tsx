import { Alert, Button, Divider, Input, Segmented, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, ImportOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Characteristic } from '../../../../enums/characteristic';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { Feature } from '../../../../models/feature';
import { FeatureEditPanel } from '../feature-edit-panel/feature-edit-panel';
import { FeaturePanel } from '../../elements/feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { HistogramPanel } from '../../histogram/histogram-panel';
import { Monster } from '../../../../models/monster';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterOrganizationType } from '../../../../enums/monster-organization-type';
import { MonsterRoleType } from '../../../../enums/monster-role-type';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NameGenerator } from '../../../../utils/name-generator';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './monster-edit-panel.scss';

interface Props {
	monster: Monster;
	sourcebooks: Sourcebook[];
	similarMonsters: Monster[];
	onChange: (monster: Monster) => void;
}

export const MonsterEditPanel = (props: Props) => {
	const [ monster, setMonster ] = useState<Monster>(props.monster);

	const setName = (value: string) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.name = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setDescription = (value: string) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.description = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setKeywords = (value: string) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.keywords = value.split(' ');
		setMonster(copy);
		props.onChange(copy);
	};

	const setLevel = (value: number) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.level = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setRoleType = (value: MonsterRoleType) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.role.type = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setRoleOrganization = (value: MonsterOrganizationType) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.role.organization = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setEncounterValue = (value: number) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.encounterValue = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setSizeValue = (value: number) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.size.value = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setSizeMod = (value: 'T' | 'S' | 'M' | 'L') => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.size.mod = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setSpeed = (value: number) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.speed.value = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setMovementMode = (value: string) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.speed.modes = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setStamina = (value: number) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.stamina = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setStability = (value: number) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.stability = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setFreeStrikeDamage = (value: number) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.freeStrikeDamage = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setWithCaptain = (value: string) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.withCaptain = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setCharacteristic = (ch: Characteristic, value: number) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.characteristics
			.filter(c => c.characteristic === ch)
			.forEach(c => c.value = value);
		setMonster(copy);
		props.onChange(copy);
	};

	const addFeature = () => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.features.push(FactoryLogic.feature.create({
			id: Utils.guid(),
			name: '',
			description: ''
		}));
		setMonster(copy);
		props.onChange(copy);
	};

	const importFeature = (feature: Feature) => {
		const featureCopy = JSON.parse(JSON.stringify(feature)) as Feature;
		featureCopy.id = Utils.guid();

		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.features.push(featureCopy);
		setMonster(copy);
		props.onChange(copy);
	};

	const changeFeature = (feature: Feature) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		const index = copy.features.findIndex(f => f.id === feature.id);
		if (index !== -1) {
			copy.features[index] = feature;
		}
		setMonster(copy);
		props.onChange(copy);
	};

	const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		const index = copy.features.findIndex(f => f.id === feature.id);
		copy.features = Collections.move(copy.features, index, direction);
		setMonster(copy);
		props.onChange(copy);
	};

	const deleteFeature = (feature: Feature) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.features = copy.features.filter(f => f.id !== feature.id);
		setMonster(copy);
		props.onChange(copy);
	};

	const getNameAndDescriptionSection = () => {
		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Input
					className={monster.name === '' ? 'input-empty' : ''}
					placeholder='Name'
					allowClear={true}
					addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
					value={monster.name}
					onChange={e => setName(e.target.value)}
				/>
				<HeaderText>Description</HeaderText>
				<MultiLine label='Description' value={monster.description} onChange={setDescription} />
			</Space>
		);
	};

	const getStatsSection = () => {
		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Keywords</HeaderText>
				<Input
					placeholder='Keywords'
					allowClear={true}
					value={monster.keywords.join(' ')}
					onChange={e => setKeywords(e.target.value)}
				/>
				<HeaderText>Level</HeaderText>
				<NumberSpin min={1} max={10} value={monster.level} onChange={setLevel} />
				<HeaderText>Role</HeaderText>
				<Select
					style={{ width: '100%' }}
					placeholder='Select role'
					options={[ MonsterRoleType.Ambusher, MonsterRoleType.Artillery, MonsterRoleType.Brute, MonsterRoleType.Controller, MonsterRoleType.Defender, MonsterRoleType.Harrier, MonsterRoleType.Hexer, MonsterRoleType.Mount, MonsterRoleType.Support ].map(option => ({ value: option, desc: MonsterLogic.getRoleTypeDescription(option) }))}
					optionRender={option => <Field label={option.data.value} value={option.data.desc} />}
					value={monster.role.type}
					onChange={setRoleType}
				/>
				<Select
					style={{ width: '100%' }}
					placeholder='Select organization'
					options={[ MonsterOrganizationType.Minion, MonsterOrganizationType.Band, MonsterOrganizationType.Platoon, MonsterOrganizationType.Troop, MonsterOrganizationType.Leader, MonsterOrganizationType.Solo ].map(option => ({ value: option, desc: MonsterLogic.getRoleOrganizationDescription(option) }))}
					optionRender={option => <Field label={option.data.value} value={option.data.desc} />}
					value={monster.role.organization}
					onChange={setRoleOrganization}
				/>
				<HeaderText>Encounter Value</HeaderText>
				<NumberSpin min={1} value={monster.encounterValue} steps={[ 1, 10 ]} onChange={setEncounterValue} />
				{
					props.similarMonsters.length > 0 ?
						<Expander title='Similar Monsters'>
							<HeaderText>Encounter Value</HeaderText>
							<HistogramPanel
								min={0}
								values={props.similarMonsters.map(m => m.encounterValue)}
							/>
						</Expander>
						: null
				}
				<HeaderText>Size</HeaderText>
				<NumberSpin min={1} value={monster.size.value} onChange={setSizeValue} />
				{
					monster.size.value === 1 ?
						<Segmented
							block={true}
							options={[ 'T', 'S', 'M', 'L' ]}
							value={monster.size.mod}
							onChange={e => setSizeMod(e as 'T' | 'S' | 'M' | 'L')}
						/>
						: null
				}
				<HeaderText>Speed</HeaderText>
				<NumberSpin min={0} value={monster.speed.value} onChange={setSpeed} />
				<Input
					placeholder='Movement mode'
					allowClear={true}
					value={monster.speed.modes}
					onChange={e => setMovementMode(e.target.value)}
				/>
				{
					props.similarMonsters.length > 0 ?
						<Expander title='Similar Monsters'>
							<HeaderText>Speed</HeaderText>
							<HistogramPanel
								min={0}
								values={props.similarMonsters.map(m => m.speed.value)}
							/>
						</Expander>
						: null
				}
				<HeaderText>Stamina</HeaderText>
				<NumberSpin min={0} value={monster.stamina} steps={[ 1, 10 ]} onChange={setStamina} />
				{
					props.similarMonsters.length > 0 ?
						<Expander title='Similar Monsters'>
							<HeaderText>Stamina</HeaderText>
							<HistogramPanel
								min={0}
								values={props.similarMonsters.map(m => m.stamina)}
							/>
						</Expander>
						: null
				}
				<HeaderText>Stability</HeaderText>
				<NumberSpin min={0} value={monster.stability} onChange={setStability} />
				{
					props.similarMonsters.length > 0 ?
						<Expander title='Similar Monsters'>
							<HeaderText>Stability</HeaderText>
							<HistogramPanel
								min={0}
								values={props.similarMonsters.map(m => m.stability)}
							/>
						</Expander>
						: null
				}
				<HeaderText>Free Strike Damage</HeaderText>
				<NumberSpin min={0} value={monster.freeStrikeDamage} steps={[ 1, 10 ]} onChange={setFreeStrikeDamage} />
				{
					props.similarMonsters.length > 0 ?
						<Expander title='Similar Monsters'>
							<HeaderText>Free Strike Damage</HeaderText>
							<HistogramPanel
								min={0}
								values={props.similarMonsters.map(m => m.freeStrikeDamage)}
							/>
						</Expander>
						: null
				}
				<HeaderText>With Captain</HeaderText>
				<MultiLine label='With Captain' value={monster.withCaptain} onChange={setWithCaptain} />
			</Space>
		);
	};

	const getCharacteristicsSection = () => {
		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					[
						Characteristic.Might,
						Characteristic.Agility,
						Characteristic.Reason,
						Characteristic.Intuition,
						Characteristic.Presence
					].map(ch => (
						<Space direction='vertical' style={{ width: '100%' }} key={ch}>
							<HeaderText>{ch}</HeaderText>
							<NumberSpin
								min={-5}
								max={5}
								value={MonsterLogic.getCharacteristic(monster, ch)}
								onChange={value => setCharacteristic(ch, value)}
							/>
							{
								props.similarMonsters.length > 0 ?
									<Expander title='Similar Monsters'>
										<HeaderText>{ch}</HeaderText>
										<HistogramPanel
											min={-5}
											max={5}
											values={props.similarMonsters.map(m => MonsterLogic.getCharacteristic(m, ch))}
										/>
									</Expander>
									: null
							}
						</Space>
					))
				}
			</Space>
		);
	};

	const getFeaturesSection = () => {
		const similarFeatures: Feature[] = [];
		props.similarMonsters.forEach(m => {
			m.features.forEach(f => {
				if (!monster.features.some(mf => mf.name === f.name) && !similarFeatures.some(sf => sf.name === f.name)) {
					similarFeatures.push(f);
				}
			});
		});
		const sortedFeatures = Collections.sort(similarFeatures, f => f.name);

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					monster.features.map(f => (
						<Expander
							key={f.id}
							title={f.name || 'Unnamed Feature'}
							extra={[
								<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f, 'up'); }} />,
								<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f, 'down'); }} />,
								<DangerButton key='delete' mode='icon' onConfirm={e => { e.stopPropagation(); deleteFeature(f); }} />
							]}
						>
							<FeatureEditPanel
								feature={f}
								sourcebooks={props.sourcebooks}
								allowedTypes={[ FeatureType.Text, FeatureType.Ability, FeatureType.DamageModifier ]}
								onChange={changeFeature}
							/>
						</Expander>
					))
				}
				{
					monster.features.length === 0 ?
						<Alert
							type='warning'
							showIcon={true}
							message='No features'
						/>
						: null
				}
				<Button block={true} onClick={addFeature}>Add a new feature</Button>
				{sortedFeatures.length > 0 ? <Divider /> : null}
				{
					sortedFeatures.length > 0 ?
						<Expander title='Similar Monsters'>
							<HeaderText>Features from Similar Monsters</HeaderText>
							<Space direction='vertical' style={{ width: '100%' }}>
								{
									sortedFeatures.map(f => (
										<Expander
											key={f.id}
											title={f.name}
											extra={[
												<Button key='up' type='text' icon={<ImportOutlined />} onClick={e => { e.stopPropagation(); importFeature(f); }} />
											]}
										>
											<FeaturePanel feature={f} mode={PanelMode.Full} />
										</Expander>
									))
								}
							</Space>
						</Expander>
						: null
				}
			</Space>
		);
	};

	try {
		return (
			<div className='monster-edit-panel'>
				<Tabs
					items={[
						{
							key: '1',
							label: 'Monster',
							children: getNameAndDescriptionSection()
						},
						{
							key: '2',
							label: 'Stats',
							children: getStatsSection()
						},
						{
							key: '3',
							label: 'Characteristics',
							children: getCharacteristicsSection()
						},
						{
							key: '4',
							label: 'Features',
							children: getFeaturesSection()
						}
					]}
				/>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
