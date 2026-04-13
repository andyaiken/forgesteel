import { Alert, Button, Divider, Drawer, Flex, Popover, Segmented, Select, Space, Tabs, Upload } from 'antd';
import { DownloadOutlined, ImportOutlined, InfoCircleOutlined, ThunderboltOutlined, ToolOutlined } from '@ant-design/icons';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { DamageType } from '@/enums/damage-type';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { Feature } from '@/models/feature';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeatureListEditPanel } from '@/components/panels/edit/feature-list-edit/feature-list-edit-panel';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { HistogramPanel } from '@/components/panels/histogram/histogram-panel';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { Monster } from '@/models/monster';
import { MonsterFeatureCategory } from '@/enums/monster-feature-category';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { MonsterSelectModal } from '@/components/modals/select/monster-select/monster-select-modal';
import { NameDescEditPanel } from '@/components/panels/edit/name-desc-edit/name-desc-edit-panel';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Pill } from '@/components/controls/pill/pill';
import { RetainerLogic } from '@/logic/retainer-logic';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './monster-edit-panel.scss';

interface Props {
	monster: Monster;
	monsterGroup?: MonsterGroup;
	sourcebooks: Sourcebook[];
	options: Options;
	mode?: PanelMode;
	onChange: (monster: Monster) => void;
	onSelectMonster?: (monster: Monster, group: MonsterGroup) => void;
}

export const MonsterEditPanel = (props: Props) => {
	const [ monster, setMonster ] = useState<Monster>(props.monster);
	const [ selectedCategory, setSelectedCategory ] = useState<MonsterFeatureCategory>(MonsterFeatureCategory.Signature);
	const [ scratchpadMonsters, setScratchpadMonsters ] = useState<Monster[]>([]);
	const [ hiddenMonsterIDs, setHiddenMonsterIDs ] = useState<string[]>([]);
	const [ drawerOpen, setDrawerOpen ] = useState<boolean>(false);

	const setEncounterValue = (value: number) => {
		const copy = Utils.copy(monster);
		copy.encounterValue = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setSpeedValue = (value: number) => {
		const copy = Utils.copy(monster);
		copy.speed.value = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setMovementModes = (value: string) => {
		const copy = Utils.copy(monster);
		copy.speed.modes = value ? [ value ] : [];
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

	const setFreeStrikeType = (value: DamageType) => {
		const copy = Utils.copy(monster);
		copy.freeStrikeType = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setCharacteristic = (ch: Characteristic, value: number) => {
		const copy = Utils.copy(monster);
		copy.characteristics
			.filter(c => c.characteristic === ch)
			.forEach(c => c.value = value);
		setMonster(copy);
		props.onChange(copy);
	};

	const getNameAndDescriptionSection = () => {
		const setNameDesc = (name: string, desc: string) => {
			const copy = Utils.copy(monster);
			copy.name = name;
			copy.description = desc;
			setMonster(copy);
			props.onChange(copy);
		};

		const setPicture = (value: string | null) => {
			const copy = Utils.copy(monster);
			copy.picture = value;
			setMonster(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<NameDescEditPanel
					element={monster}
					showNameGenerator={true}
					onChange={setNameDesc}
				/>
				<HeaderText>Portrait</HeaderText>
				{
					monster.picture ?
						<Flex align='center' justify='center' gap={10}>
							<img className='portrait-edit' src={monster.picture} title='Portrait' />
							<DangerButton mode='clear' onConfirm={() => setPicture(null)} />
						</Flex>
						:
						<Upload
							style={{ width: '100%' }}
							accept='.png,.webp,.gif,.jpg,.jpeg,.svg'
							showUploadList={false}
							beforeUpload={file => {
								const reader = new FileReader();
								reader.onload = async progress => {
									if (progress.target) {
										const content = progress.target.result as string;
										const resized = await Utils.getResizedImage(content);
										setPicture(resized);
									}
								};
								reader.readAsDataURL(file);
								return false;
							}}
						>
							<Button>
								<DownloadOutlined />
								Choose a picture
							</Button>
						</Upload>
				}
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
					copy.retainer.featuresByLevel = RetainerLogic.getRetainerAdvancementFeatures(copy.level, copy.role.type, copy.retainer.level4, copy.retainer.level7, copy.retainer.level10);
				}
				if (copy.level >= 7) {
					copy.retainer.level7 = undefined;
					copy.retainer.featuresByLevel = RetainerLogic.getRetainerAdvancementFeatures(copy.level, copy.role.type, copy.retainer.level4, copy.retainer.level7, copy.retainer.level10);
				}
				if (copy.level >= 10) {
					copy.retainer.level10 = undefined;
					copy.retainer.featuresByLevel = RetainerLogic.getRetainerAdvancementFeatures(copy.level, copy.role.type, copy.retainer.level4, copy.retainer.level7, copy.retainer.level10);
				}
			}
			setMonster(copy);
			props.onChange(copy);
		};

		const setRoleType = (value: MonsterRoleType) => {
			const copy = Utils.copy(monster);
			copy.role.type = value;
			if (copy.retainer) {
				copy.retainer.featuresByLevel = RetainerLogic.getRetainerAdvancementFeatures(copy.level, copy.role.type, copy.retainer.level4, copy.retainer.level7, copy.retainer.level10);
			}
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
						type: FactoryLogic.type.createMain(),
						distance: [],
						target: '',
						sections: []
					})
				});

				const lvl7 = FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: Utils.guid(),
						name: 'Level 7',
						type: FactoryLogic.type.createMain(),
						distance: [],
						target: '',
						sections: []
					})
				});

				const lvl10 = FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: Utils.guid(),
						name: 'Level 10',
						type: FactoryLogic.type.createMain(),
						distance: [],
						target: '',
						sections: []
					})
				});

				copy.retainer = {
					level: copy.level,
					level4: lvl4,
					level7: lvl7,
					level10: lvl10,
					featuresByLevel: RetainerLogic.getRetainerAdvancementFeatures(copy.level, copy.role.type, lvl4, lvl7, lvl10)
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
			if (copy.size.value === 1) {
				copy.size.mod = 'M';
			}
			setMonster(copy);
			props.onChange(copy);
		};

		const setSizeMod = (value: '' | 'T' | 'S' | 'M' | 'L') => {
			const copy = Utils.copy(monster);
			copy.size.mod = value;
			setMonster(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Keywords</HeaderText>
				<TextInput
					placeholder='Keywords'
					allowClear={true}
					value={monster.keywords.join(', ')}
					onChange={setKeywords}
				/>
				<HeaderText>Level</HeaderText>
				<NumberSpin min={1} max={10} value={monster.level} onChange={setLevel} />
				<HeaderText>Role</HeaderText>
				<Select
					style={{ width: '100%' }}
					placeholder='Select organization'
					options={[ MonsterOrganizationType.NoOrganization, MonsterOrganizationType.Minion, MonsterOrganizationType.Horde, MonsterOrganizationType.Platoon, MonsterOrganizationType.Elite, MonsterOrganizationType.Leader, MonsterOrganizationType.Solo, MonsterOrganizationType.Retainer ].map(option => ({ value: option, desc: MonsterLogic.getRoleOrganizationDescription(option) }))}
					optionRender={option => <Field label={option.data.value} value={option.data.desc} />}
					value={monster.role.organization}
					onChange={setRoleOrganization}
				/>
				<Select
					style={{ width: '100%' }}
					placeholder='Select role'
					options={[ MonsterRoleType.NoRole, MonsterRoleType.Ambusher, MonsterRoleType.Artillery, MonsterRoleType.Brute, MonsterRoleType.Controller, MonsterRoleType.Defender, MonsterRoleType.Harrier, MonsterRoleType.Hexer, MonsterRoleType.Mount, MonsterRoleType.Support ].map(option => ({ value: option, desc: MonsterLogic.getRoleTypeDescription(option) }))}
					optionRender={option => <Field label={option.data.value} value={option.data.desc} />}
					value={monster.role.type}
					onChange={setRoleType}
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
		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Encounter Value</HeaderText>
				<NumberSpin min={1} value={monster.encounterValue} steps={[ 1, 10 ]} onChange={setEncounterValue} />
				<HeaderText>Speed</HeaderText>
				<NumberSpin min={0} value={monster.speed.value} onChange={setSpeedValue} />
				<TextInput
					placeholder='Movement modes'
					allowClear={true}
					value={monster.speed.modes.join(', ')}
					onChange={setMovementModes}
				/>
				<HeaderText>Stamina</HeaderText>
				<NumberSpin min={0} value={monster.stamina} steps={[ 1, 10 ]} onChange={setStamina} />
				<HeaderText>Stability</HeaderText>
				<NumberSpin min={0} value={monster.stability} onChange={setStability} />
				<HeaderText>Free Strike</HeaderText>
				<NumberSpin label='Damage' min={0} value={monster.freeStrikeDamage} steps={[ 1, 10 ]} onChange={setFreeStrikeDamage} />
				<Select
					style={{ width: '100%' }}
					placeholder='Damage type'
					options={[ DamageType.Damage, DamageType.Acid, DamageType.Cold, DamageType.Corruption, DamageType.Fire, DamageType.Holy, DamageType.Lightning, DamageType.Poison, DamageType.Psychic, DamageType.Sonic ].map(option => ({ value: option }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={monster.freeStrikeType}
					onChange={setFreeStrikeType}
				/>
			</Space>
		);
	};

	const getCharacteristicsSection = () => {
		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					[
						Characteristic.Might,
						Characteristic.Agility,
						Characteristic.Reason,
						Characteristic.Intuition,
						Characteristic.Presence
					].map(ch => (
						<Space orientation='vertical' style={{ width: '100%' }} key={ch}>
							<HeaderText>{ch}</HeaderText>
							<NumberSpin
								min={-5}
								max={5}
								value={MonsterLogic.getCharacteristic(monster, ch)}
								onChange={value => setCharacteristic(ch, value)}
							/>
						</Space>
					))
				}
			</Space>
		);
	};

	const getFeaturesSection = () => {
		const onChange = (features: Feature[]) => {
			const copy = Utils.copy(monster);
			copy.features = Utils.copy(features);
			setMonster(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<FeatureListEditPanel
					title='Features'
					features={monster.features}
					allowedTypes={[ FeatureType.Text, FeatureType.Ability, FeatureType.ConditionImmunity, FeatureType.DamageModifier ]}
					sourcebooks={props.sourcebooks}
					options={props.options}
					onChange={onChange}
				/>
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

		const values = getSimilarMonsters().map(m => m.withCaptain).filter(text => !!text);
		const options = Collections.distinct(values, k => k).sort().map(text => ({
			text: text,
			count: values.filter(v => v === text).length
		}));

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>With Captain</HeaderText>
				<MarkdownEditor value={monster.withCaptain} onChange={setWithCaptain} />
				{
					getSimilarMonsters().length > 0 ?
						<Expander title='Similar Monsters'>
							<HeaderText>With Captain</HeaderText>
							<Space orientation='vertical' style={{ width: '100%' }}>
								{
									options.map((opt, n) => (
										<Button key={n} block={true} onClick={() => setWithCaptain(opt.text)}>
											{opt.text} {opt.count > 1 ? <Pill>x{opt.count}</Pill> : null}
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
			copy.retainer!.featuresByLevel = RetainerLogic.getRetainerAdvancementFeatures(copy.level, copy.role.type, copy.retainer!.level4, copy.retainer!.level7, copy.retainer!.level10);
			setMonster(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
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
								options={props.options}
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
								options={props.options}
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
								options={props.options}
								onChange={f => changeRetainerFeature(f, 10)}
							/>
						</Expander>
						: null
				}
			</Space>
		);
	};

	const getSimilarMonsters = () => {
		const monsters = SourcebookLogic
			.getSimilarMonsters(props.sourcebooks, monster, props.options)
			.filter(m => !hiddenMonsterIDs.includes(m.id));

		scratchpadMonsters
			.filter(m => !monsters.map(monster => monster.id).includes(m.id))
			.forEach(m => monsters.push(m));

		return Collections.sort(monsters, m => MonsterLogic.getMonsterName(m));
	};

	const getMonsterStatsSection = () => {
		const similarMonsters = getSimilarMonsters();
		const stats = MonsterLogic.getSuggestedStats(monster);

		const getChart = (title: string, getValue: (m: Monster) => number, onChange: (value: number) => void) => {
			const values = similarMonsters.map(getValue);
			const selected = getValue(monster);

			const min = Math.max(0, Math.min(...values, selected) - 3);
			const max = Math.max(...values, selected) + 3;
			const median = Math.round(Collections.median(values, x => x));

			return (
				<div style={{ width: '350px' }}>
					<Flex align='center' justify='space-between'>
						<b>{title}</b>
						<Field label='Median' compact={true} value={median} />
					</Flex>
					<Divider />
					{
						values.length > 0 ?
							<HistogramPanel min={min} max={max} values={values} selected={selected} onSelect={onChange} />
							:
							<Empty text='No similar monsters' />
					}
				</div>
			);
		};

		return (
			<div>
				<Alert
					type='info'
					showIcon={false}
					title={
						<>
							<div>This page shows typical values for a <b>{MonsterLogic.getMonsterDescription(monster)}</b> monster.</div>
							<div>Click on any <InfoCircleOutlined /> to see explanations and actual values from similar monsters.</div>
						</>
					}
				/>
				<HeaderText>Stats</HeaderText>
				<Flex align='center' justify='space-between'>
					<Field
						orientation='vertical'
						label={
							<Space>
								EV
								<Popover
									trigger='click'
									content={getChart('Encounter Value', m => m.encounterValue, setEncounterValue)}
								>
									<InfoCircleOutlined />
								</Popover>
							</Space>
						}
						value={stats.ev}
					/>
					<Field
						orientation='vertical'
						label={
							<Space>
								Speed
								<Popover
									trigger='click'
									content={getChart('Speed', m => m.speed.value, setSpeedValue)}
								>
									<InfoCircleOutlined />
								</Popover>
							</Space>
						}
						value='5 - 6'
					/>
					<Field
						orientation='vertical'
						label={
							<Space>
								Stamina
								<Popover
									trigger='click'
									content={getChart('Stamina', m => m.stamina, setStamina)}
								>
									<InfoCircleOutlined />
								</Popover>
							</Space>
						}
						value={stats.stamina}
					/>
					<Field
						orientation='vertical'
						label={
							<Space>
								Stability
								<Popover
									trigger='click'
									content={getChart('Stability', m => m.stability, setStability)}
								>
									<InfoCircleOutlined />
								</Popover>
							</Space>
						}
						value='0 - 1'
					/>
					<Field
						orientation='vertical'
						label={
							<Space>
								Free Strike
								<Popover
									trigger='click'
									content={getChart('Free Strike Damage', m => m.freeStrikeDamage, setFreeStrikeDamage)}
								>
									<InfoCircleOutlined />
								</Popover>
							</Space>
						}
						value={stats.freeStrikeDamage}
					/>
				</Flex>
				<HeaderText>Characteristics</HeaderText>
				<Flex align='center' justify='space-between'>
					<Field
						orientation='vertical'
						label='Highest'
						value={stats.highestCharacteristic}
					/>
					<Divider orientation='vertical' />
					<Field
						orientation='vertical'
						label={
							<Space>
								M
								<Popover
									trigger='click'
									content={getChart('Might', m => MonsterLogic.getCharacteristic(m, Characteristic.Might), value => setCharacteristic(Characteristic.Might, value))}
								>
									<InfoCircleOutlined />
								</Popover>
							</Space>
						}
						value={stats.characteristics.m}
					/>
					<Field
						orientation='vertical'
						label={
							<Space>
								A
								<Popover
									trigger='click'
									content={getChart('Agility', m => MonsterLogic.getCharacteristic(m, Characteristic.Agility), value => setCharacteristic(Characteristic.Agility, value))}
								>
									<InfoCircleOutlined />
								</Popover>
							</Space>
						}
						value={stats.characteristics.a}
					/>
					<Field
						orientation='vertical'
						label={
							<Space>
								R
								<Popover
									trigger='click'
									content={getChart('Reason', m => MonsterLogic.getCharacteristic(m, Characteristic.Reason), value => setCharacteristic(Characteristic.Reason, value))}
								>
									<InfoCircleOutlined />
								</Popover>
							</Space>
						}
						value={stats.characteristics.r}
					/>
					<Field
						orientation='vertical'
						label={
							<Space>
								I
								<Popover
									trigger='click'
									content={getChart('Intuition', m => MonsterLogic.getCharacteristic(m, Characteristic.Intuition), value => setCharacteristic(Characteristic.Intuition, value))}
								>
									<InfoCircleOutlined />
								</Popover>
							</Space>
						}
						value={stats.characteristics.i}
					/>
					<Field
						orientation='vertical'
						label={
							<Space>
								P
								<Popover
									trigger='click'
									content={getChart('Presence', m => MonsterLogic.getCharacteristic(m, Characteristic.Presence), value => setCharacteristic(Characteristic.Presence, value))}
								>
									<InfoCircleOutlined />
								</Popover>
							</Space>
						}
						value={stats.characteristics.p}
					/>
				</Flex>
				<HeaderText>Number of Abilities</HeaderText>
				<Flex align='center' justify='space-between'>
					<Field
						orientation='vertical'
						label='Main (sig.)'
						value={1}
					/>
					<Field
						orientation='vertical'
						label='Main (other)'
						value={stats.actions.main}
					/>
					<Field
						orientation='vertical'
						label='Maneuver'
						value={stats.actions.maneuver}
					/>
					<Field
						orientation='vertical'
						label='Triggered'
						value={stats.actions.triggered}
					/>
					<Field
						orientation='vertical'
						label='Villain'
						value={stats.actions.villain}
					/>
				</Flex>
				<HeaderText>Ability Damage</HeaderText>
				<Flex align='center' justify='space-between'>
					<Field
						orientation='vertical'
						label={
							<Space>
								Typical
								<Popover
									trigger='click'
									content={
										<div>
											<p>Ability affects one target (two targets for elite / leader / solo)</p>
											<Divider />
											<p>Common riders:</p>
											<ul>
												<li>Forced movement: push / pull / slide 2</li>
												<li>Grabbed / prone at tier 2 and 3</li>
												<li>Bleeding / slowed</li>
											</ul>
										</div>
									}
								>
									<InfoCircleOutlined />
								</Popover>
							</Space>
						}
						value={`${stats.damage.tier1} / ${stats.damage.tier2} / ${stats.damage.tier3}`}
					/>
					<Field
						orientation='vertical'
						label={
							<Space>
								Light
								<Popover
									trigger='click'
									content={
										<div>
											<p>Ability affects multiple extra targets / has an area effect / has a heavy rider</p>
											<Divider />
											<p>Common riders:</p>
											<ul>
												<div>Dazed / frightened / restrained</div>
												<div>Forced movement, plus another rider</div>
											</ul>
										</div>
									}
								>
									<InfoCircleOutlined />
								</Popover>
							</Space>
						}
						value={`${stats.damagePlus2.tier1} / ${stats.damagePlus2.tier2} / ${stats.damagePlus2.tier3}`}
					/>
					<Field
						orientation='vertical'
						label={
							<Space>
								Moderate
								<Popover
									trigger='click'
									content={
										<div>
											<p>Ability affects one extra target / has a typical rider</p>
											<Divider />
											<p>Common riders:</p>
											<ul>
												<li>Slowed / weakened (save ends)</li>
												<li>Dazed on tier 3</li>
												<li>Grabbed / restrained at tier 2 and 3</li>
												<li>Forced movement, plus a condition</li>
											</ul>
										</div>
									}
								>
									<InfoCircleOutlined />
								</Popover>
							</Space>
						}
						value={`${stats.damagePlus1.tier1} / ${stats.damagePlus1.tier2} / ${stats.damagePlus1.tier3}`}
					/>
					<Field
						orientation='vertical'
						label={
							<Space>
								Heavy
								<Popover
									trigger='click'
									content={
										<div>
											<p>Ability affects fewer targets / has a light (or no) rider</p>
											<Divider />
											<p>Common riders:</p>
											<ul>
												<li>Forced movement: push/pull/slide 1</li>
												<li>Prone at tier 3</li>
											</ul>
										</div>
									}
								>
									<InfoCircleOutlined />
								</Popover>
							</Space>
						}
						value={`${stats.damageMinus1.tier1} / ${stats.damageMinus1.tier2} / ${stats.damageMinus1.tier3}`}
					/>
				</Flex>
			</div>
		);
	};

	const getExampleAbilitiesSection = () => {
		const similar: { feature: Feature, count: number }[] = [];
		getSimilarMonsters().forEach(m => {
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

		const importFeature = (feature: Feature) => {
			const featureCopy = Utils.copy(feature);
			featureCopy.id = Utils.guid();

			const copy = Utils.copy(monster);
			copy.features.push(featureCopy);
			setMonster(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<Segmented
					block={true}
					options={[
						{ value: MonsterFeatureCategory.Signature, label: 'Signature' },
						{ value: MonsterFeatureCategory.Action, label: 'Main' },
						{ value: MonsterFeatureCategory.Maneuver, label: 'Maneuver' },
						{ value: MonsterFeatureCategory.Trigger, label: 'Triggered' },
						{ value: MonsterFeatureCategory.Villain, label: 'Villain' }
					]}
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
		);
	};

	const getSimilarMonstersSection = () => {
		const similarMonsters = getSimilarMonsters();

		const genesplice = () => {
			const copy = Utils.copy(monster);
			MonsterLogic.genesplice(copy, similarMonsters);
			setMonster(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						<Popover
							trigger='click'
							content={
								<Space orientation='vertical'>
									<Button block={true} onClick={() => setDrawerOpen(true)}>Add a Monster</Button>
									<Button block={true} disabled={hiddenMonsterIDs.length === 0} onClick={() => setHiddenMonsterIDs([])}>Restore Hidden Monsters</Button>
									<Divider />
									<Button block={true} disabled={getSimilarMonsters().length < 2} icon={<ThunderboltOutlined />} onClick={genesplice}>Genesplice</Button>
								</Space>
							}
						>
							<Button type='text' icon={<ToolOutlined />} />
						</Popover>
					}
				>
					Similar Monsters
				</HeaderText>
				{
					similarMonsters.map(m => {
						const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, m.id);
						if (!monsterGroup) {
							return null;
						}

						return (
							<SelectablePanel
								key={m.id}
								action={
									<Button
										onClick={e => {
											e.stopPropagation();
											if (scratchpadMonsters.map(spm => spm.id).includes(m.id)) {
												let copy = Utils.copy(scratchpadMonsters) as Monster[];
												copy = copy.filter(cm => cm.id !== m.id);
												setScratchpadMonsters(copy);
											} else {
												const copy = Utils.copy(hiddenMonsterIDs) as string[];
												copy.push(m.id);
												setHiddenMonsterIDs(copy);
											}
										}}
									>
										Hide
									</Button>
								}
								onSelect={props.onSelectMonster ? () => props.onSelectMonster!(m, monsterGroup) : undefined}
							>
								<MonsterPanel
									monster={m}
									monsterGroup={monsterGroup}
									sourcebooks={props.sourcebooks}
									options={props.options}
								/>
							</SelectablePanel>
						);
					})
				}
				{
					similarMonsters.length === 0 ?
						<Empty text='No similar monsters.' />
						: null
				}
				<Drawer open={drawerOpen} closeIcon={null} onClose={() => setDrawerOpen(false)} size={500}>
					<MonsterSelectModal
						monsters={props.sourcebooks.flatMap(sb => sb.monsterGroups).flatMap(g => g.monsters)}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onSelect={monster => {
							const copy = Utils.copy(scratchpadMonsters) as Monster[];
							copy.push(monster);
							setScratchpadMonsters(copy);
							setDrawerOpen(false);
						}}
						onClose={() => setDrawerOpen(false)}
					/>
				</Drawer>
			</Space>
		);
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
				<div className='monster-workspace-column'>
					<Tabs items={tabs} />
				</div>
				{
					props.mode === PanelMode.Full ?
						<div className='monster-preview-column'>
							<Tabs
								items={[
									{
										key: '1',
										label: 'Preview',
										children: (
											<SelectablePanel>
												<MonsterPanel
													monster={monster}
													sourcebooks={props.sourcebooks}
													options={props.options}
													mode={PanelMode.Full}
												/>
											</SelectablePanel>
										)
									},
									{
										key: '2',
										label: 'Suggested Statistics',
										children: getMonsterStatsSection()
									},
									{
										key: '3',
										label: 'Example Abilities',
										children: getExampleAbilitiesSection()
									},
									{
										key: '4',
										label: 'Similar Monsters',
										children: getSimilarMonstersSection()
									}
								]}
							/>
						</div>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
