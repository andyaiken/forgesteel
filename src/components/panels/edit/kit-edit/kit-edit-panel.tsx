import { Alert, Button, Input, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { Feature } from '@/models/feature';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeatureLogic } from '@/logic/feature-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Kit } from '@/models/kit';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';
import { MultiLine } from '@/components/controls/multi-line/multi-line';
import { NameGenerator } from '@/utils/name-generator';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './kit-edit-panel.scss';

interface Props {
	kit: Kit;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (kit: Kit) => void;
}

export const KitEditPanel = (props: Props) => {
	const [ kit, setKit ] = useState<Kit>(props.kit);

	try {
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
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Name</HeaderText>
					<Input
						status={kit.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
						value={kit.name}
						onChange={e => setName(e.target.value)}
					/>
					<HeaderText>Description</HeaderText>
					<MultiLine value={kit.description} onChange={setDescription} />
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
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Type</HeaderText>
					<Input
						placeholder='Type'
						allowClear={true}
						value={kit.type}
						onChange={e => setType(e.target.value)}
					/>
					<Alert
						type='info'
						showIcon={true}
						message='If your kit has a Type, it can only be selected from a kit feature that specifies this value.'
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
						showSearch={true}
						filterOption={(input, option) => {
							const strings = option ?
								[
									option.value
								]
								: [];
							return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
						}}
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
						showSearch={true}
						filterOption={(input, option) => {
							const strings = option ?
								[
									option.value
								]
								: [];
							return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
						}}
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
				<Space direction='vertical' style={{ width: '100%' }}>
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
				<Space direction='vertical' style={{ width: '100%' }}>
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
				<Space direction='vertical' style={{ width: '100%' }}>
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

		return (
			<ErrorBoundary>
				<div className='kit-edit-panel'>
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
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
