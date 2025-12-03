import { Alert, Button, Drawer, Input, Popover, Segmented, Space, Tabs, Upload } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, CopyOutlined, DownloadOutlined, EditOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Ability } from '@/models/ability';
import { AbilityEditPanel } from '@/components/panels/edit/ability-edit/ability-edit-panel';
import { Characteristic } from '@/enums/characteristic';
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
import { HeroClass } from '@/models/class';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { Modal } from '@/components/modals/modal/modal';
import { NameGenerator } from '@/utils/name-generator';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SubClass } from '@/models/subclass';
import { SubclassPanel } from '@/components/panels/elements/subclass-panel/subclass-panel';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './class-edit-panel.scss';

interface Props {
	heroClass: HeroClass;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (heroClass: HeroClass) => void;
	onEditSubClass: (sc: SubClass) => void;
}

export const ClassEditPanel = (props: Props) => {
	const [ heroClass, setHeroClass ] = useState<HeroClass>(props.heroClass);
	const [ drawerOpen, setDrawerOpen ] = useState<boolean>(false);

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = Utils.copy(heroClass);
			copy.name = value;
			setHeroClass(copy);
			props.onChange(copy);
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(heroClass);
			copy.description = value;
			setHeroClass(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Space.Compact style={{ width: '100%' }}>
					<Input
						status={heroClass.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						value={heroClass.name}
						onChange={e => setName(e.target.value)}
					/>
					<Button icon={<ThunderboltOutlined />} onClick={() => setName(NameGenerator.generateName())} />
				</Space.Compact>
				<HeaderText>Description</HeaderText>
				<MarkdownEditor value={heroClass.description} onChange={setDescription} />
			</Space>
		);
	};

	const getClassEditSection = () => {
		const setType = (value: 'standard' | 'master') => {
			const copy = Utils.copy(heroClass);
			copy.type = value;
			setHeroClass(copy);
			props.onChange(copy);
		};

		const setSubclassName = (value: string) => {
			const copy = Utils.copy(heroClass);
			copy.subclassName = value;
			setHeroClass(copy);
			props.onChange(copy);
		};

		const setSubclassCount = (value: number) => {
			const copy = Utils.copy(heroClass);
			copy.subclassCount = value;
			setHeroClass(copy);
			props.onChange(copy);
		};

		const addCharacteristicSet = () => {
			const copy = Utils.copy(heroClass);
			copy.primaryCharacteristicsOptions.push([]);
			setHeroClass(copy);
			props.onChange(copy);
		};

		const toggleCharacteristic = (index: number, characteristic: Characteristic) => {
			const copy = Utils.copy(heroClass);
			if (copy.primaryCharacteristicsOptions[index].includes(characteristic)) {
				copy.primaryCharacteristicsOptions[index] = copy.primaryCharacteristicsOptions[index].filter(ch => ch !== characteristic);
			} else {
				copy.primaryCharacteristicsOptions[index].push(characteristic);
			}
			setHeroClass(copy);
			props.onChange(copy);
		};

		const moveCharacteristicSet = (index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(heroClass);
			copy.primaryCharacteristicsOptions = Collections.move(copy.primaryCharacteristicsOptions, index, direction);
			setHeroClass(copy);
			props.onChange(copy);
		};

		const deleteCharacteristicSet = (index: number) => {
			const copy = Utils.copy(heroClass);
			copy.primaryCharacteristicsOptions.splice(index, 1);
			setHeroClass(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Type</HeaderText>
				<Segmented
					block={true}
					options={[
						{
							value: 'standard', label: 'Class'
						},
						{
							value: 'master', label: 'Master Class'
						}
					]}
					value={heroClass.type}
					onChange={setType}
				/>
				<HeaderText>Subclass Name</HeaderText>
				<Input
					status={heroClass.subclassName === '' ? 'warning' : ''}
					placeholder='Subclass name'
					allowClear={true}
					value={heroClass.subclassName}
					onChange={e => setSubclassName(e.target.value)}
				/>
				<HeaderText>Subclass Count</HeaderText>
				<NumberSpin
					min={0}
					value={heroClass.subclassCount}
					onChange={setSubclassCount}
				/>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={addCharacteristicSet} />
					}
				>
					Primary Characteristics
				</HeaderText>
				{
					heroClass.primaryCharacteristicsOptions.map((o, n) => (
						<Expander
							key={n}
							title={o.join(', ') || 'No Characteristics'}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveCharacteristicSet(n, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveCharacteristicSet(n, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteCharacteristicSet(n); }} />
							]}
						>
							<Space orientation='vertical' style={{ width: '100%' }}>
								<Toggle label={Characteristic.Might} value={o.includes(Characteristic.Might)} onChange={() => toggleCharacteristic(n, Characteristic.Might)} />
								<Toggle label={Characteristic.Agility} value={o.includes(Characteristic.Agility)} onChange={() => toggleCharacteristic(n, Characteristic.Agility)} />
								<Toggle label={Characteristic.Reason} value={o.includes(Characteristic.Reason)} onChange={() => toggleCharacteristic(n, Characteristic.Reason)} />
								<Toggle label={Characteristic.Intuition} value={o.includes(Characteristic.Intuition)} onChange={() => toggleCharacteristic(n, Characteristic.Intuition)} />
								<Toggle label={Characteristic.Presence} value={o.includes(Characteristic.Presence)} onChange={() => toggleCharacteristic(n, Characteristic.Presence)} />
								{
									(o.length === 0) || (o.length >= 3) ?
										<Alert
											type='warning'
											showIcon={true}
											title='One or two characteristics must be selected.'
										/>
										: null
								}
							</Space>
						</Expander>
					))
				}
				{
					heroClass.primaryCharacteristicsOptions.length === 0 ?
						<Alert
							type='warning'
							showIcon={true}
							title='A class must have one or two primary characteristics.'
						/>
						: null
				}
			</Space>
		);
	};

	const getFeaturesByLevelEditSection = () => {
		const addFeature = (level: number) => {
			const copy = Utils.copy(heroClass);
			copy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					lvl.features.push(FactoryLogic.feature.create({
						id: Utils.guid(),
						name: '',
						description: ''
					}));
				});
			setHeroClass(copy);
			props.onChange(copy);
		};

		const changeFeature = (level: number, feature: Feature) => {
			const copy = Utils.copy(heroClass);
			copy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					const index = lvl.features.findIndex(f => f.id === feature.id);
					if (index !== -1) {
						lvl.features[index] = feature;
					}
				});
			setHeroClass(copy);
			props.onChange(copy);
		};

		const moveFeature = (level: number, feature: Feature, direction: 'up' | 'down') => {
			const copy = Utils.copy(heroClass);
			copy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					const index = lvl.features.findIndex(f => f.id === feature.id);
					lvl.features = Collections.move(lvl.features, index, direction);
				});
			setHeroClass(copy);
			props.onChange(copy);
		};

		const deleteFeature = (level: number, feature: Feature) => {
			const copy = Utils.copy(heroClass);
			copy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					lvl.features = lvl.features.filter(f => f.id !== feature.id);
				});
			setHeroClass(copy);
			props.onChange(copy);
		};

		return (
			<>
				{
					heroClass.featuresByLevel.map(lvl => (
						<div key={lvl.level}>
							<HeaderText
								extra={
									<Button type='text' icon={<PlusOutlined />} onClick={() => addFeature(lvl.level)} />
								}
							>
								Level {lvl.level.toString()}
							</HeaderText>
							<Space orientation='vertical' style={{ width: '100%' }}>
								{
									lvl.features.map(f => (
										<Expander
											key={f.id}
											title={f.name || 'Unnamed Feature'}
											tags={[ FeatureLogic.getFeatureTag(f) ]}
											extra={[
												<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(lvl.level, f, 'up'); }} />,
												<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(lvl.level, f, 'down'); }} />,
												<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteFeature(lvl.level, f); }} />
											]}
										>
											<FeatureEditPanel
												feature={f}
												sourcebooks={props.sourcebooks}
												options={props.options}
												onChange={feature => changeFeature(lvl.level, feature)}
											/>
										</Expander>
									))
								}
								{
									lvl.features.length === 0 ?
										<Empty />
										: null
								}
							</Space>
						</div>
					))
				}
			</>
		);
	};

	const getClassAbilitiesEditSection = () => {
		const addAbility = () => {
			const copy = Utils.copy(heroClass);
			copy.abilities.push(FactoryLogic.createAbility({
				id: Utils.guid(),
				name: '',
				description: '',
				type: FactoryLogic.type.createMain(),
				keywords: [],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: '',
				sections: []
			}));
			setHeroClass(copy);
			props.onChange(copy);
		};

		const changeAbility = (ability: Ability) => {
			const copy = Utils.copy(heroClass);
			const index = copy.abilities.findIndex(a => a.id === ability.id);
			if (index !== -1) {
				copy.abilities[index] = ability;
			}
			setHeroClass(copy);
			props.onChange(copy);
		};

		const moveAbility = (ability: Ability, direction: 'up' | 'down') => {
			const copy = Utils.copy(heroClass);
			const index = copy.abilities.findIndex(a => a.id === ability.id);
			copy.abilities = Collections.move(copy.abilities, index, direction);
			setHeroClass(copy);
			props.onChange(copy);
		};

		const deleteAbility = (ability: Ability) => {
			const copy = Utils.copy(heroClass);
			copy.abilities = copy.abilities.filter(a => a.id !== ability.id);
			setHeroClass(copy);
			props.onChange(copy);
		};

		return (
			<>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={addAbility} />
					}
				>
					Abilities
				</HeaderText>
				<Space orientation='vertical' style={{ width: '100%' }}>
					{
						heroClass.abilities.map(a => (
							<Expander
								key={a.id}
								title={a.name || 'Unnamed Ability'}
								tags={[ a.type.usage ]}
								extra={[
									<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveAbility(a, 'up'); }} />,
									<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveAbility(a, 'down'); }} />,
									<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteAbility(a); }} />
								]}
							>
								<AbilityEditPanel
									ability={a}
									onChange={changeAbility}
								/>
							</Expander>
						))
					}
					{
						heroClass.abilities.length === 0 ?
							<Empty />
							: null
					}
				</Space>
			</>
		);
	};

	const getClassSubclassesEditSection = () => {
		const addSubclass = () => {
			const copy = Utils.copy(heroClass);
			copy.subclasses.push(FactoryLogic.createSubclass());
			setHeroClass(copy);
			props.onChange(copy);
		};

		const copySubclass = (subclass: SubClass) => {
			const subclassCopy = Utils.copy(subclass);
			subclassCopy.id = Utils.guid();

			const copy = Utils.copy(heroClass);
			copy.subclasses.push(subclassCopy);
			setHeroClass(copy);
			props.onChange(copy);
		};

		const moveSubclass = (subclass: SubClass, direction: 'up' | 'down') => {
			const copy = Utils.copy(heroClass);
			const index = copy.subclasses.findIndex(sc => sc.id === subclass.id);
			copy.subclasses = Collections.move(copy.subclasses, index, direction);
			setHeroClass(copy);
			props.onChange(copy);
		};

		const deleteSubclass = (subclass: SubClass) => {
			const copy = Utils.copy(heroClass);
			copy.subclasses = copy.subclasses.filter(o => o.id !== subclass.id);
			setHeroClass(copy);
			props.onChange(copy);
		};

		return (
			<>
				<HeaderText
					extra={
						<Popover
							trigger='click'
							content={
								<Space orientation='vertical' style={{ width: '100%' }}>
									<Button block={true} icon={<PlusOutlined />} onClick={addSubclass}>
										Add a new subclass
									</Button>
									<Upload
										accept='.drawsteel-subclass,.ds-subclass'
										showUploadList={false}
										beforeUpload={file => {
											file
												.text()
												.then(json => {
													const sc = JSON.parse(json) as SubClass;
													copySubclass(sc);
												});
											return false;
										}}
									>
										<Button block={true} onClick={() => null}>
											<DownloadOutlined />
											Import a subclass
										</Button>
									</Upload>
									<Button block={true} onClick={() => setDrawerOpen(true)}>
										<CopyOutlined />
										Copy an existing subclass
									</Button>
								</Space>
							}
						>
							<Button type='text' icon={<PlusOutlined />} onClick={() => null} />
						</Popover>
					}
				>
					Subclasses
				</HeaderText>
				<Space orientation='vertical' style={{ width: '100%' }}>
					{
						heroClass.subclasses.map(sc => (
							<Expander
								key={sc.id}
								title={sc.name || 'Unnamed Subclass'}
								extra={[
									<Button key='edit' type='text' title='Edit' icon={<EditOutlined />} onClick={e => { e.stopPropagation(); props.onEditSubClass(sc); }} />,
									<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSubclass(sc, 'up'); }} />,
									<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSubclass(sc, 'down'); }} />,
									<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteSubclass(sc); }} />
								]}
							>
								<SubclassPanel subclass={sc} sourcebooks={props.sourcebooks} options={props.options} />
							</Expander>
						))
					}
					{
						heroClass.subclasses.length === 0 ?
							<Empty />
							: null
					}
					<Drawer open={drawerOpen} closeIcon={null} onClose={() => setDrawerOpen(false)} size={500}>
						<Modal
							content={
								<Space orientation='vertical' style={{ width: '100%', padding: '20px' }}>
									{
										[
											...props.sourcebooks.flatMap(sb => sb.classes).flatMap(c => c.subclasses),
											...props.sourcebooks.flatMap(sb => sb.subclasses)
										].map((sc, n) => (
											<SelectablePanel
												key={n}
												onSelect={() => {
													copySubclass(sc);
													setDrawerOpen(false);
												}}
											>
												<SubclassPanel subclass={sc} sourcebooks={props.sourcebooks} options={props.options} />
											</SelectablePanel>
										))
									}
								</Space>
							}
							onClose={() => setDrawerOpen(false)}
						/>
					</Drawer>
				</Space>
			</>
		);
	};

	return (
		<ErrorBoundary>
			<div className='class-edit-panel'>
				<Tabs
					items={[
						{
							key: '1',
							label: 'Class',
							children: getNameAndDescriptionSection()
						},
						{
							key: '2',
							label: 'Details',
							children: getClassEditSection()
						},
						{
							key: '3',
							label: 'Levels',
							children: getFeaturesByLevelEditSection()
						},
						{
							key: '4',
							label: 'Abilities',
							children: getClassAbilitiesEditSection()
						},
						{
							key: '5',
							label: 'Subclasses',
							children: getClassSubclassesEditSection()
						}
					]}
				/>
			</div>
		</ErrorBoundary>
	);
};
