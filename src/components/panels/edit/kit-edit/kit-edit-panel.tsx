import { Alert, Button, Select, Slider, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { ReactNode, useState } from 'react';
import { CheckLabel } from '@/components/controls/check-label/check-label';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { Feature } from '@/models/feature';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeatureLogic } from '@/logic/feature-logic';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Kit } from '@/models/kit';
import { KitArmor } from '@/enums/kit-armor';
import { KitPanel } from '@/components/panels/elements/kit-panel/kit-panel';
import { KitWeapon } from '@/enums/kit-weapon';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { NameGenerator } from '@/utils/name-generator';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { StatsRow } from '@/components/panels/stats-row/stats-row';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';

import './kit-edit-panel.scss';

interface Props {
	kit: Kit;
	sourcebooks: Sourcebook[];
	options: Options;
	mode?: PanelMode;
	onChange: (kit: Kit) => void;
}

export const KitEditPanel = (props: Props) => {
	const [ kit, setKit ] = useState<Kit>(props.kit);

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = Utils.copy(kit);
			copy.name = value;
			setKit(copy);
			props.onChange(copy);
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(kit);
			copy.description = value;
			setKit(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Space.Compact style={{ width: '100%' }}>
					<TextInput
						status={kit.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						value={kit.name}
						onChange={setName}
					/>
					<Button icon={<ThunderboltOutlined />} onClick={() => setName(NameGenerator.generateName())} />
				</Space.Compact>
				<HeaderText>Description</HeaderText>
				<MarkdownEditor value={kit.description} onChange={setDescription} />
			</Space>
		);
	};

	const getKitDetailsSection = () => {
		const setType = (value: string) => {
			const copy = Utils.copy(kit);
			copy.type = value;
			setKit(copy);
			props.onChange(copy);
		};

		const setArmor = (value: KitArmor[]) => {
			const copy = Utils.copy(kit);
			copy.armor = value;
			setKit(copy);
			props.onChange(copy);
		};

		const setWeapon = (value: KitWeapon[]) => {
			const copy = Utils.copy(kit);
			copy.weapon = value;
			setKit(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Type</HeaderText>
				<TextInput
					placeholder='Type'
					allowClear={true}
					value={kit.type}
					onChange={setType}
				/>
				<Alert
					type='info'
					showIcon={true}
					title='If your kit has a Type, it can only be selected from a kit feature that specifies this value.'
				/>
				<HeaderText>Armor</HeaderText>
				<Select
					style={{ width: '100%' }}
					status={kit.armor.length === 0 ? 'warning' : ''}
					mode='multiple'
					allowClear={true}
					placeholder='Select armor'
					options={[ KitArmor.Light, KitArmor.Medium, KitArmor.Heavy, KitArmor.Shield ].map(option => ({ value: option }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={kit.armor}
					onChange={setArmor}
				/>
				<HeaderText>Weapons</HeaderText>
				<Select
					style={{ width: '100%' }}
					status={kit.weapon.length === 0 ? 'warning' : ''}
					mode='multiple'
					allowClear={true}
					placeholder='Select weapon'
					options={[ KitWeapon.Bow, KitWeapon.Ensnaring, KitWeapon.Heavy, KitWeapon.Light, KitWeapon.Medium, KitWeapon.Polearm, KitWeapon.Unarmed, KitWeapon.Whip ].map(option => ({ value: option }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={kit.weapon}
					onChange={setWeapon}
				/>
			</Space>
		);
	};

	const getKitStatsEditSection = () => {
		const setStamina = (value: number) => {
			const copy = Utils.copy(kit);
			copy.stamina = value;
			setKit(copy);
			props.onChange(copy);
		};

		const setSpeed = (value: number) => {
			const copy = Utils.copy(kit);
			copy.speed = value;
			setKit(copy);
			props.onChange(copy);
		};

		const setStability = (value: number) => {
			const copy = Utils.copy(kit);
			copy.stability = value;
			setKit(copy);
			props.onChange(copy);
		};

		const setMeleeDistance = (value: number) => {
			const copy = Utils.copy(kit);
			copy.meleeDistance = value;
			setKit(copy);
			props.onChange(copy);
		};

		const setRangedDistance = (value: number) => {
			const copy = Utils.copy(kit);
			copy.rangedDistance = value;
			setKit(copy);
			props.onChange(copy);
		};

		const setDisengage = (value: number) => {
			const copy = Utils.copy(kit);
			copy.disengage = value;
			setKit(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Stamina</HeaderText>
				<NumberSpin
					min={0}
					value={kit.stamina}
					onChange={setStamina}
				/>
				<HeaderText>Speed</HeaderText>
				<NumberSpin
					min={0}
					value={kit.speed}
					onChange={setSpeed}
				/>
				<HeaderText>Stability</HeaderText>
				<NumberSpin
					min={0}
					value={kit.stability}
					onChange={setStability}
				/>
				<HeaderText>Distance</HeaderText>
				<NumberSpin
					label='Melee'
					min={0}
					value={kit.meleeDistance}
					onChange={setMeleeDistance}
				/>
				<NumberSpin
					label='Ranged'
					min={0}
					value={kit.rangedDistance}
					onChange={setRangedDistance}
				/>
				<HeaderText>Disengage</HeaderText>
				<NumberSpin
					min={0}
					value={kit.disengage}
					onChange={setDisengage}
				/>
			</Space>
		);
	};

	const getKitDamageEditSection = () => {
		const setMeleeDamage = (value: boolean) => {
			const copy = Utils.copy(kit);
			copy.meleeDamage = value ? { tier1: 0, tier2: 0, tier3: 0 } : null;
			setKit(copy);
			props.onChange(copy);
		};

		const setMeleeDamage1 = (value: number) => {
			const copy = Utils.copy(kit);
			if (copy.meleeDamage) {
				copy.meleeDamage.tier1 = value;
			}
			setKit(copy);
			props.onChange(copy);
		};

		const setMeleeDamage2 = (value: number) => {
			const copy = Utils.copy(kit);
			if (copy.meleeDamage) {
				copy.meleeDamage.tier2 = value;
			}
			setKit(copy);
			props.onChange(copy);
		};

		const setMeleeDamage3 = (value: number) => {
			const copy = Utils.copy(kit);
			if (copy.meleeDamage) {
				copy.meleeDamage.tier3 = value;
			}
			setKit(copy);
			props.onChange(copy);
		};

		const setRangedDamage = (value: boolean) => {
			const copy = Utils.copy(kit);
			copy.rangedDamage = value ? { tier1: 0, tier2: 0, tier3: 0 } : null;
			setKit(copy);
			props.onChange(copy);
		};

		const setRangedDamage1 = (value: number) => {
			const copy = Utils.copy(kit);
			if (copy.rangedDamage) {
				copy.rangedDamage.tier1 = value;
			}
			setKit(copy);
			props.onChange(copy);
		};

		const setRangedDamage2 = (value: number) => {
			const copy = Utils.copy(kit);
			if (copy.rangedDamage) {
				copy.rangedDamage.tier2 = value;
			}
			setKit(copy);
			props.onChange(copy);
		};

		const setRangedDamage3 = (value: number) => {
			const copy = Utils.copy(kit);
			if (copy.rangedDamage) {
				copy.rangedDamage.tier3 = value;
			}
			setKit(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Melee Damage</HeaderText>
				<Toggle label='Melee damage' value={!!kit.meleeDamage} onChange={setMeleeDamage} />
				{kit.meleeDamage ? <NumberSpin label='Tier 1' min={0} value={kit.meleeDamage.tier1} onChange={setMeleeDamage1} /> : null}
				{kit.meleeDamage ? <NumberSpin label='Tier 2' min={0} value={kit.meleeDamage.tier2} onChange={setMeleeDamage2} /> : null}
				{kit.meleeDamage ? <NumberSpin label='Tier 3' min={0} value={kit.meleeDamage.tier3} onChange={setMeleeDamage3} /> : null}
				<HeaderText>Ranged Damage</HeaderText>
				<Toggle label='Ranged damage' value={!!kit.rangedDamage} onChange={setRangedDamage} />
				{kit.rangedDamage ? <NumberSpin label='Tier 1' min={0} value={kit.rangedDamage.tier1} onChange={setRangedDamage1} /> : null}
				{kit.rangedDamage ? <NumberSpin label='Tier 2' min={0} value={kit.rangedDamage.tier2} onChange={setRangedDamage2} /> : null}
				{kit.rangedDamage ? <NumberSpin label='Tier 3' min={0} value={kit.rangedDamage.tier3} onChange={setRangedDamage3} /> : null}
			</Space>
		);
	};

	const getFeaturesEditSection = () => {
		const addFeature = () => {
			const copy = Utils.copy(kit);
			copy.features.push(FactoryLogic.feature.create({
				id: Utils.guid(),
				name: '',
				description: ''
			}));
			setKit(copy);
			props.onChange(copy);
		};

		const changeFeature = (feature: Feature) => {
			const copy = Utils.copy(kit);
			const index = copy.features.findIndex(f => f.id === feature.id);
			if (index !== -1) {
				copy.features[index] = feature;
			}
			setKit(copy);
			props.onChange(copy);
		};

		const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
			const copy = Utils.copy(kit);
			const index = copy.features.findIndex(f => f.id === feature.id);
			copy.features = Collections.move(copy.features, index, direction);
			setKit(copy);
			props.onChange(copy);
		};

		const deleteFeature = (feature: Feature) => {
			const copy = Utils.copy(kit);
			copy.features = copy.features.filter(f => f.id !== feature.id);
			setKit(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={addFeature} />
					}
				>
					Features
				</HeaderText>
				{
					kit.features.map(f => (
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
								options={props.options}
								onChange={changeFeature}
							/>
						</Expander>
					))
				}
				{
					kit.features.length === 0 ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	const getTuningSection = () => {
		const powerA: { name: string, value: number }[] = [];
		const powerB: { name: string, value: number }[] = [];

		powerA.push({ name: 'Stamina', value: Math.floor(kit.stamina / 3) });

		powerA.push({ name: 'Disengage', value: kit.disengage });

		powerA.push({ name: 'Speed', value: kit.speed > 0 ? 1 + kit.speed : 0 });

		powerA.push({ name: 'Stability', value: kit.stability > 0 ? 1 + kit.stability : 0 });

		powerB.push({ name: 'Melee Distance', value: 2 * kit.meleeDistance });

		const minMeleeDamage = kit.meleeDamage ? Math.min(kit.meleeDamage.tier1, kit.meleeDamage.tier2, kit.meleeDamage.tier3) : 0;
		let powerMeleeDamage = minMeleeDamage;
		if (kit.meleeDamage && (kit.meleeDamage.tier3 - minMeleeDamage >= 4)) {
			powerMeleeDamage += 2;
		}
		powerB.push({ name: 'Melee Damage', value: powerMeleeDamage });

		let powerRange = 0;
		if (kit.rangedDistance >= 5) {
			powerRange += 1;
		}
		if (kit.rangedDistance >= 7) {
			powerRange += 1;
		}
		if (kit.rangedDistance >= 10) {
			powerRange += 1;
		}
		powerB.push({ name: 'Ranged Distance', value: powerRange });

		const minRangedDamage = kit.rangedDamage ? Math.min(kit.rangedDamage.tier1, kit.rangedDamage.tier2, kit.rangedDamage.tier3) : 0;
		let powerRangedDamage = minRangedDamage;
		if (kit.rangedDamage && (kit.rangedDamage.tier3 - minRangedDamage >= 4)) {
			powerRangedDamage += 2;
		}
		powerB.push({ name: 'Ranged Damage', value: powerRangedDamage });

		const power = Collections.sum([ ...powerA, ...powerB ], p => p.value);

		const constraints: { name: string, value: boolean }[] = [];
		const gear: { name: string, value: boolean }[] = [];

		constraints.push({ name: 'Kit power value = 8', value: power === 8 });
		constraints.push({ name: 'Stamina max +12', value: kit.stamina <= 12 });
		constraints.push({ name: 'Ranged distance max +10', value: kit.rangedDistance <= 10 });
		constraints.push({ name: 'Disengage max +1', value: kit.disengage <= 1 });
		constraints.push({ name: 'Speed max +3', value: kit.speed <= 3 });
		constraints.push({ name: 'Stability max +3', value: kit.stability <= 3 });
		constraints.push({ name: 'Has disengage OR stability', value: ((kit.disengage > 0) && (kit.stability === 0)) || ((kit.disengage === 0) && (kit.stability < 0)) });

		gear.push({ name: 'Light Armor', value: kit.stamina >= 3 });
		gear.push({ name: 'Light Armor + Shield', value: kit.stamina >= 6 });
		gear.push({ name: 'Medium Armor', value: kit.stamina >= 6 });
		gear.push({ name: 'Medium Armor + Shield', value: kit.stamina >= 9 });
		gear.push({ name: 'Heavy Armor', value: (kit.stamina >= 9) && (kit.stability >= 1) });
		gear.push({ name: 'Heavy Armor + Shield', value: (kit.stamina >= 12) && (kit.stability >= 1) });
		gear.push({ name: 'Light Weapon (melee)', value: minMeleeDamage >= 1 });
		gear.push({ name: 'Medium Weapon (melee)', value: minMeleeDamage >= 2 });
		gear.push({ name: 'Heavy Weapon (melee)', value: !!kit.meleeDamage && (kit.meleeDamage.tier3 >= 4) });
		gear.push({ name: 'Light Weapon (ranged)', value: minRangedDamage >= 1 });
		gear.push({ name: 'Medium Weapon (ranged)', value: minRangedDamage >= 2 });
		gear.push({ name: 'Heavy Weapon (ranged)', value: !!kit.rangedDamage && (kit.rangedDamage.tier3 >= 4) });

		const marks: Record<string | number, ReactNode> = {};
		marks[8] = <div className='ds-text dimmed-text small-text'>Target: 8</div>;

		return (
			<div>
				<HeaderText>Power</HeaderText>
				<Slider
					range={true}
					marks={marks}
					min={0}
					max={16}
					value={[ power ]}
					styles={{
						track: {
							background: 'transparent'
						}
					}}
					tooltip={{ open: false }}
				/>
				<div className='ds-text'>
					The power level of a kit should be <b>8</b>. The calculation takes a number of kit statistics into account, listed below.
				</div>
				<StatsRow>
					{powerA.map((p, n) => <Field key={n} orientation='vertical' label={p.name} value={p.value} />)}
				</StatsRow>
				<StatsRow>
					{powerB.map((p, n) => <Field key={n} orientation='vertical' label={p.name} value={p.value} />)}
				</StatsRow>
				<HeaderText>Constraints</HeaderText>
				{
					constraints.map((c, n) => (
						<CheckLabel key={n} state={c.value ? 'success' : 'failure'}>
							<div style={{ fontWeight: c.value ? '400' : '600', opacity: c.value ? '0.5' : '1' }}>{c.name}</div>
						</CheckLabel>
					))
				}
				<HeaderText>Suggested Proficiencies</HeaderText>
				{
					gear.map((c, n) => (
						<CheckLabel key={n} state={c.value ? 'success' : 'failure'}>
							<div style={{ fontWeight: c.value ? '600' : '400', opacity: c.value ? '1' : '0.5' }}>{c.name}</div>
						</CheckLabel>
					))
				}
			</div>
		);
	};

	return (
		<ErrorBoundary>
			<div className='kit-edit-panel'>
				<div className='kit-workspace-column'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Kit',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Details',
								children: getKitDetailsSection()
							},
							{
								key: '3',
								label: 'Stats',
								children: getKitStatsEditSection()
							},
							{
								key: '4',
								label: 'Damage',
								children: getKitDamageEditSection()
							},
							{
								key: '5',
								label: 'Features',
								children: getFeaturesEditSection()
							}
						]}
					/>
				</div>
				{
					props.mode === PanelMode.Full ?
						<div className='kit-preview-column'>
							<Tabs
								items={[
									{
										key: '1',
										label: 'Preview',
										children: (
											<SelectablePanel>
												<KitPanel
													kit={kit}
													sourcebooks={props.sourcebooks}
													options={props.options}
													mode={PanelMode.Full}
												/>
											</SelectablePanel>
										)
									},
									{
										key: '2',
										label: 'Tuning',
										children: getTuningSection()
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
