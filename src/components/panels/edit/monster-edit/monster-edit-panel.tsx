import { Button, Divider, Input, Segmented, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, ImportOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Monster, MonsterGroup } from '../../../../models/monster';
import { Badge } from '../../../controls/badge/badge';
import { Characteristic } from '../../../../enums/characteristic';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { Feature } from '../../../../models/feature';
import { FeatureEditPanel } from '../feature-edit/feature-edit-panel';
import { FeatureLogic } from '../../../../logic/feature-logic';
import { FeaturePanel } from '../../elements/feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { HistogramPanel } from '../../histogram/histogram-panel';
import { MonsterFeatureCategory } from '../../../../enums/monster-feature-category';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterOrganizationType } from '../../../../enums/monster-organization-type';
import { MonsterRoleType } from '../../../../enums/monster-role-type';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NameGenerator } from '../../../../utils/name-generator';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './monster-edit-panel.scss';

interface Props {
	monster: Monster;
	monsterGroup: MonsterGroup;
	sourcebooks: Sourcebook[];
	options: Options;
	similarMonsters: Monster[];
	onChange: (monster: Monster) => void;
}

export const MonsterEditPanel = (props: Props) => {
	const [ monster, setMonster ] = useState<Monster>(props.monster);
	const [ selectedCategory, setSelectedCategory ] = useState<MonsterFeatureCategory>(MonsterFeatureCategory.Text);

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = Utils.copy(monster);
			copy.name = value;
			setMonster(copy);
			props.onChange(copy);
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(monster);
			copy.description = value;
			setMonster(copy);
			props.onChange(copy);
		};

		const setRandomName = () => {
			if (props.monsterGroup.name) {
				setName(`${props.monsterGroup.name} ${NameGenerator.generateName()}`);
			} else {
				setName(NameGenerator.generateName());
			}
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Input
					status={monster.name === '' ? 'warning' : ''}
					placeholder='Name'
					allowClear={true}
					addonAfter={<ThunderboltOutlined className='random-btn' onClick={setRandomName} />}
					value={monster.name}
					onChange={e => setName(e.target.value)}
				/>
				<HeaderText>Description</HeaderText>
				<MultiLine label='Description' value={monster.description} onChange={setDescription} />
			</Space>
		);
	};

	const getTypeSection = () => {
		const setKeywords = (value: string) => {
			const copy = Utils.copy(monster);
			copy.keywords = value.split(', ');
			setMonster(copy);
			props.onChange(copy);
		};

		const setLevel = (value: number) => {
			const copy = Utils.copy(monster);
			copy.level = value;
			if (copy.retainer) {
				if (copy.level >= 4) {
					copy.retainer.level4 = undefined;
					copy.retainer.featuresByLevel = MonsterLogic.getRetainerAdvancementFeatures(copy.level, copy.role.type, copy.retainer.level4, copy.retainer.level7, copy.retainer.level10);
				}
				if (copy.level >= 7) {
					copy.retainer.level7 = undefined;
					copy.retainer.featuresByLevel = MonsterLogic.getRetainerAdvancementFeatures(copy.level, copy.role.type, copy.retainer.level4, copy.retainer.level7, copy.retainer.level10);
				}
				if (copy.level >= 10) {
					copy.retainer.level10 = undefined;
					copy.retainer.featuresByLevel = MonsterLogic.getRetainerAdvancementFeatures(copy.level, copy.role.type, copy.retainer.level4, copy.retainer.level7, copy.retainer.level10);
				}
			}
			setMonster(copy);
			props.onChange(copy);
		};

		const setRoleType = (value: MonsterRoleType) => {
			const copy = Utils.copy(monster);
			copy.role.type = value;
			setMonster(copy);
			props.onChange(copy);
		};

		const setRoleOrganization = (value: MonsterOrganizationType) => {
			const copy = Utils.copy(monster);
			copy.role.organization = value;
			if (copy.role.organization === MonsterOrganizationType.Retainer) {
				const lvl4 = FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: Utils.guid(),
						name: 'Level 4',
						type: FactoryLogic.type.createAction(),
						distance: [],
						target: ''
					})
				});

				const lvl7 = FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: Utils.guid(),
						name: 'Level 7',
						type: FactoryLogic.type.createAction(),
						distance: [],
						target: ''
					})
				});

				const lvl10 = FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: Utils.guid(),
						name: 'Level 10',
						type: FactoryLogic.type.createAction(),
						distance: [],
						target: ''
					})
				});

				copy.retainer = {
					level: copy.level,
					level4: lvl4,
					level7: lvl7,
					level10: lvl10,
					featuresByLevel: MonsterLogic.getRetainerAdvancementFeatures(copy.level, copy.role.type, lvl4, lvl7, lvl10)
				};
			} else {
				copy.retainer = null;
			}
			setMonster(copy);
			props.onChange(copy);
		};

		const setSizeValue = (value: number) => {
			const copy = Utils.copy(monster);
			copy.size.value = value;
			setMonster(copy);
			props.onChange(copy);
		};

		const setSizeMod = (value: ''| 'T' | 'S' | 'M' | 'L') => {
			const copy = Utils.copy(monster);
			copy.size.mod = value;
			setMonster(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Keywords</HeaderText>
				<Input
					placeholder='Keywords'
					allowClear={true}
					value={monster.keywords.join(', ')}
					onChange={e => setKeywords(e.target.value)}
				/>
				<HeaderText>Level</HeaderText>
				<NumberSpin min={1} max={10} value={monster.level} onChange={setLevel} />
				<HeaderText>Role</HeaderText>
				<Select
					style={{ width: '100%' }}
					placeholder='Select role'
					options={[ MonsterRoleType.NoRole, MonsterRoleType.Ambusher, MonsterRoleType.Artillery, MonsterRoleType.Brute, MonsterRoleType.Controller, MonsterRoleType.Defender, MonsterRoleType.Harrier, MonsterRoleType.Hexer, MonsterRoleType.Mount, MonsterRoleType.Support ].map(option => ({ value: option, desc: MonsterLogic.getRoleTypeDescription(option) }))}
					optionRender={option => <Field label={option.data.value} value={option.data.desc} />}
					showSearch={true}
					filterOption={(input, option) => {
						const strings = option ?
							[
								option.value
							]
							: [];
						return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
					}}
					value={monster.role.type}
					onChange={setRoleType}
				/>
				<Select
					style={{ width: '100%' }}
					placeholder='Select organization'
					options={[ MonsterOrganizationType.NoOrganization, MonsterOrganizationType.Minion, MonsterOrganizationType.Band, MonsterOrganizationType.Platoon, MonsterOrganizationType.Troop, MonsterOrganizationType.Leader, MonsterOrganizationType.Solo, MonsterOrganizationType.Retainer ].map(option => ({ value: option, desc: MonsterLogic.getRoleOrganizationDescription(option) }))}
					optionRender={option => <Field label={option.data.value} value={option.data.desc} />}
					showSearch={true}
					filterOption={(input, option) => {
						const strings = option ?
							[
								option.value
							]
							: [];
						return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
					}}
					value={monster.role.organization}
					onChange={setRoleOrganization}
				/>
				<HeaderText>Size</HeaderText>
				<NumberSpin min={1} value={monster.size.value} onChange={setSizeValue} />
				{
					monster.size.value === 1 ?
						<Segmented<'' | 'T' | 'S' | 'M' | 'L'>
							name='sizemodtypes'
							block={true}
							options={[ 'T', 'S', 'M', 'L' ]}
							value={monster.size.mod}
							onChange={setSizeMod}
						/>
						: null
				}
			</Space>
		);
	};

	const getStatsSection = () => {
		const setEncounterValue = (value: number) => {
			const copy = Utils.copy(monster);
			copy.encounterValue = value;
			setMonster(copy);
			props.onChange(copy);
		};

		const setSpeed = (value: number) => {
			const copy = Utils.copy(monster);
			copy.speed.value = value;
			setMonster(copy);
			props.onChange(copy);
		};

		const setMovementMode = (value: string) => {
			const copy = Utils.copy(monster);
			copy.speed.modes = value;
			setMonster(copy);
			props.onChange(copy);
		};

		const setStamina = (value: number) => {
			const copy = Utils.copy(monster);
			copy.stamina = value;
			setMonster(copy);
			props.onChange(copy);
		};

		const setStability = (value: number) => {
			const copy = Utils.copy(monster);
			copy.stability = value;
			setMonster(copy);
			props.onChange(copy);
		};

		const setFreeStrikeDamage = (value: number) => {
			const copy = Utils.copy(monster);
			copy.freeStrikeDamage = value;
			setMonster(copy);
			props.onChange(copy);
		};

		const selectRandomEncounterValue = () => {
			const values = props.similarMonsters.map(m => m.encounterValue);
			setEncounterValue(Collections.draw(values));
		};

		const selectRandomSpeed = () => {
			const values = props.similarMonsters.map(m => m.speed.value);
			setSpeed(Collections.draw(values));
		};

		const selectRandomStamina = () => {
			const values = props.similarMonsters.map(m => m.stamina);
			setStamina(Collections.draw(values));
		};

		const selectRandomStability = () => {
			const values = props.similarMonsters.map(m => m.stability);
			setStability(Collections.draw(values));
		};

		const selectRandomFreeStrikeDamage = () => {
			const values = props.similarMonsters.map(m => m.freeStrikeDamage);
			setFreeStrikeDamage(Collections.draw(values));
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Encounter Value</HeaderText>
				<NumberSpin min={1} value={monster.encounterValue} steps={[ 1, 10 ]} onChange={setEncounterValue} />
				{
					props.similarMonsters.length > 0 ?
						<Expander
							title='Similar Monsters'
							extra={[
								<Button key='random' type='text' title='Random' icon={<ThunderboltOutlined />} onClick={e => { e.stopPropagation(); selectRandomEncounterValue(); }} />
							]}
						>
							<HeaderText>Encounter Value</HeaderText>
							<HistogramPanel
								min={0}
								values={props.similarMonsters.map(m => m.encounterValue)}
								selected={monster.encounterValue}
								onSelect={setEncounterValue}
							/>
						</Expander>
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
						<Expander
							title='Similar Monsters'
							extra={[
								<Button key='random' type='text' title='Random' icon={<ThunderboltOutlined />} onClick={e => { e.stopPropagation(); selectRandomSpeed(); }} />
							]}
						>
							<HeaderText>Speed</HeaderText>
							<HistogramPanel
								min={0}
								values={props.similarMonsters.map(m => m.speed.value)}
								selected={monster.speed.value}
								onSelect={setSpeed}
							/>
						</Expander>
						: null
				}
				<HeaderText>Stamina</HeaderText>
				<NumberSpin min={0} value={monster.stamina} steps={[ 1, 10 ]} onChange={setStamina} />
				{
					props.similarMonsters.length > 0 ?
						<Expander
							title='Similar Monsters'
							extra={[
								<Button key='random' type='text' title='Random' icon={<ThunderboltOutlined />} onClick={e => { e.stopPropagation(); selectRandomStamina(); }} />
							]}
						>
							<HeaderText>Stamina</HeaderText>
							<HistogramPanel
								values={props.similarMonsters.map(m => m.stamina)}
								selected={monster.stamina}
								onSelect={setStamina}
							/>
						</Expander>
						: null
				}
				<HeaderText>Stability</HeaderText>
				<NumberSpin min={0} value={monster.stability} onChange={setStability} />
				{
					props.similarMonsters.length > 0 ?
						<Expander
							title='Similar Monsters'
							extra={[
								<Button key='random' type='text' title='Random' icon={<ThunderboltOutlined />} onClick={e => { e.stopPropagation(); selectRandomStability(); }} />
							]}
						>
							<HeaderText>Stability</HeaderText>
							<HistogramPanel
								min={0}
								values={props.similarMonsters.map(m => m.stability)}
								selected={monster.stability}
								onSelect={setStability}
							/>
						</Expander>
						: null
				}
				<HeaderText>Free Strike Damage</HeaderText>
				<NumberSpin min={0} value={monster.freeStrikeDamage} steps={[ 1, 10 ]} onChange={setFreeStrikeDamage} />
				{
					props.similarMonsters.length > 0 ?
						<Expander
							title='Similar Monsters'
							extra={[
								<Button key='random' type='text' title='Random' icon={<ThunderboltOutlined />} onClick={e => { e.stopPropagation(); selectRandomFreeStrikeDamage(); }} />
							]}
						>
							<HeaderText>Free Strike Damage</HeaderText>
							<HistogramPanel
								min={0}
								values={props.similarMonsters.map(m => m.freeStrikeDamage)}
								selected={monster.freeStrikeDamage}
								onSelect={setFreeStrikeDamage}
							/>
						</Expander>
						: null
				}
			</Space>
		);
	};

	const getCharacteristicsSection = () => {
		const setCharacteristic = (ch: Characteristic, value: number) => {
			const copy = Utils.copy(monster);
			copy.characteristics
				.filter(c => c.characteristic === ch)
				.forEach(c => c.value = value);
			setMonster(copy);
			props.onChange(copy);
		};

		const selectRandom = (ch: Characteristic) => {
			const values = props.similarMonsters.map(m => MonsterLogic.getCharacteristic(m, ch));
			setCharacteristic(ch, Collections.draw(values));
		};

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
									<Expander
										title='Similar Monsters'
										extra={[
											<Button key='random' type='text' title='Random' icon={<ThunderboltOutlined />} onClick={e => { e.stopPropagation(); selectRandom(ch); }} />
										]}
									>
										<HeaderText>{ch}</HeaderText>
										<HistogramPanel
											min={-5}
											max={5}
											values={props.similarMonsters.map(m => MonsterLogic.getCharacteristic(m, ch))}
											selected={MonsterLogic.getCharacteristic(monster, ch)}
											onSelect={value => setCharacteristic(ch, value)}
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
		const addFeature = () => {
			const copy = Utils.copy(monster);
			copy.features.push(FactoryLogic.feature.create({
				id: Utils.guid(),
				name: '',
				description: ''
			}));
			setMonster(copy);
			props.onChange(copy);
		};

		const importFeature = (feature: Feature) => {
			const featureCopy = Utils.copy(feature);
			featureCopy.id = Utils.guid();

			const copy = Utils.copy(monster);
			copy.features.push(featureCopy);
			setMonster(copy);
			props.onChange(copy);
		};

		const changeFeature = (feature: Feature) => {
			const copy = Utils.copy(monster);
			const index = copy.features.findIndex(f => f.id === feature.id);
			if (index !== -1) {
				copy.features[index] = feature;
			}
			setMonster(copy);
			props.onChange(copy);
		};

		const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
			const copy = Utils.copy(monster);
			const index = copy.features.findIndex(f => f.id === feature.id);
			copy.features = Collections.move(copy.features, index, direction);
			setMonster(copy);
			props.onChange(copy);
		};

		const deleteFeature = (feature: Feature) => {
			const copy = Utils.copy(monster);
			copy.features = copy.features.filter(f => f.id !== feature.id);
			setMonster(copy);
			props.onChange(copy);
		};

		const similar: { feature: Feature, count: number }[] = [];
		props.similarMonsters.forEach(m => {
			m.features
				.filter(f => FeatureLogic.getFeatureCategory(f) === selectedCategory)
				.filter(f => !monster.features.some(mf => mf.name === f.name))
				.forEach(f => {
					const current = similar.find(sf => sf.feature.name === f.name);
					if (current) {
						current.count += 1;
					} else {
						similar.push({
							feature: f,
							count: 1
						});
					}
				});
		});
		const sortedSimilar = Collections.sort(similar, s => s.feature.name);

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					monster.features.map(f => (
						<Expander
							key={f.id}
							title={f.name || 'Unnamed Feature'}
							tags={[ FeatureLogic.getFeatureTag(f) ]}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteFeature(f); }} />
							]}
						>
							<FeatureEditPanel
								feature={f}
								sourcebooks={props.sourcebooks}
								allowedTypes={[ FeatureType.Text, FeatureType.Ability, FeatureType.ConditionImmunity, FeatureType.DamageModifier ]}
								onChange={changeFeature}
							/>
						</Expander>
					))
				}
				{
					monster.features.length === 0 ?
						<Empty />
						: null
				}
				<Button block={true} onClick={addFeature}>
					<PlusOutlined />
					Add a new feature
				</Button>
				{props.similarMonsters.length > 0 ? <Divider /> : null}
				{
					props.similarMonsters.length > 0 ?
						<Expander title='Similar Monsters'>
							<HeaderText>Features from Similar Monsters</HeaderText>
							<Space direction='vertical' style={{ width: '100%' }}>
								<Segmented
									name='categories'
									block={true}
									options={
										[ MonsterFeatureCategory.Text, MonsterFeatureCategory.DamageMod, MonsterFeatureCategory.Signature, MonsterFeatureCategory.Action, MonsterFeatureCategory.Maneuver, MonsterFeatureCategory.Trigger, MonsterFeatureCategory.Other ]
											.map(tab => ({
												value: tab,
												label: <div className='category-selector'>{tab}</div>
											}))
									}
									value={selectedCategory}
									onChange={setSelectedCategory}
								/>
								{
									sortedSimilar.map(s => (
										<Expander
											key={s.feature.id}
											title={s.feature.name}
											tags={[ FeatureLogic.getFeatureTag(s.feature) ]}
											extra={[
												<Button key='up' type='text' title='Import' icon={<ImportOutlined />} onClick={e => { e.stopPropagation(); importFeature(s.feature); }} />
											]}
										>
											<FeaturePanel feature={s.feature} options={props.options} mode={PanelMode.Full} />
										</Expander>
									))
								}
								{
									sortedSimilar.length === 0 ?
										<Empty text='None in similar monsters' />
										: null
								}
							</Space>
						</Expander>
						: null
				}
			</Space>
		);
	};

	const getMinionSection = () => {
		const setWithCaptain = (value: string) => {
			const copy = Utils.copy(monster);
			copy.withCaptain = value;
			setMonster(copy);
			props.onChange(copy);
		};

		const values = props.similarMonsters.map(m => m.withCaptain).filter(text => !!text);
		const options = Collections.distinct(values, k => k).sort().map(text => ({
			text: text,
			count: values.filter(v => v === text).length
		}));

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>With Captain</HeaderText>
				<MultiLine label='With Captain' value={monster.withCaptain} onChange={setWithCaptain} />
				{
					props.similarMonsters.length > 0 ?
						<Expander title='Similar Monsters'>
							<HeaderText>With Captain</HeaderText>
							<Space direction='vertical' style={{ width: '100%' }}>
								{
									options.map((opt, n) => (
										<Button key={n} block={true} onClick={() => setWithCaptain(opt.text)}>
											{opt.text} {opt.count > 1 ? <Badge>x{opt.count}</Badge> : null}
										</Button>
									))
								}
							</Space>
						</Expander>
						: null
				}
			</Space>
		);
	};

	const getRetainerSection = () => {
		const changeRetainerFeature = (feature: Feature, level: 4 | 7 | 10) => {
			const copy = Utils.copy(monster);
			switch (level) {
				case 4:
					copy.retainer!.level4 = feature;
					break;
				case 7:
					copy.retainer!.level7 = feature;
					break;
				case 10:
					copy.retainer!.level10 = feature;
					break;
			}
			copy.retainer!.featuresByLevel = MonsterLogic.getRetainerAdvancementFeatures(copy.level, copy.role.type, copy.retainer!.level4, copy.retainer!.level7, copy.retainer!.level10);
			setMonster(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					monster.retainer && monster.retainer.level4 ?
						<Expander
							title='Level 4'
							tags={[ FeatureLogic.getFeatureTag(monster.retainer.level4) ]}
						>
							<FeatureEditPanel
								feature={monster.retainer.level4}
								sourcebooks={props.sourcebooks}
								allowedTypes={[ FeatureType.Ability ]}
								onChange={f => changeRetainerFeature(f, 4)}
							/>
						</Expander>
						: null
				}
				{
					monster.retainer && monster.retainer.level7 ?
						<Expander
							title='Level 7'
							tags={[ FeatureLogic.getFeatureTag(monster.retainer.level7) ]}
						>
							<FeatureEditPanel
								feature={monster.retainer.level7}
								sourcebooks={props.sourcebooks}
								allowedTypes={[ FeatureType.Ability ]}
								onChange={f => changeRetainerFeature(f, 7)}
							/>
						</Expander>
						: null
				}
				{
					monster.retainer && monster.retainer.level10 ?
						<Expander
							title='Level 10'
							tags={[ FeatureLogic.getFeatureTag(monster.retainer.level10) ]}
						>
							<FeatureEditPanel
								feature={monster.retainer.level10}
								sourcebooks={props.sourcebooks}
								allowedTypes={[ FeatureType.Ability ]}
								onChange={f => changeRetainerFeature(f, 10)}
							/>
						</Expander>
						: null
				}
			</Space>
		);
	};

	try {
		const genesplice = () => {
			const copy = Utils.copy(monster);
			MonsterLogic.genesplice(copy, props.similarMonsters);
			setMonster(copy);
			props.onChange(copy);
		};

		const tabs = [
			{
				key: 'monster',
				label: 'Monster',
				children: getNameAndDescriptionSection()
			},
			{
				key: 'type',
				label: 'Type',
				children: getTypeSection()
			},
			{
				key: 'stats',
				label: 'Stats',
				children: getStatsSection()
			},
			{
				key: 'characteristics',
				label: 'Characteristics',
				children: getCharacteristicsSection()
			},
			{
				key: 'features',
				label: 'Features',
				children: getFeaturesSection()
			}
		];

		if (monster.role.organization === MonsterOrganizationType.Minion) {
			tabs.push({
				key: 'minion',
				label: 'Minion',
				children: getMinionSection()
			});
		}

		if (monster.role.organization === MonsterOrganizationType.Retainer) {
			tabs.push({
				key: 'retainer',
				label: 'Retainer',
				children: getRetainerSection()
			});
		}

		return (
			<ErrorBoundary>
				<div className='monster-edit-panel'>
					<Tabs
						items={tabs}
						tabBarExtraContent={
							props.similarMonsters.length > 1 ?
								<Button type='text' title='Genesplice' icon={<ThunderboltOutlined />} onClick={genesplice} />
								: null
						}
					/>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
