import { Button, Drawer, Flex, Input, Space, Tabs, Upload } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, CopyOutlined, DownloadOutlined, EditOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { FeatureAddOn, FeatureMalice, FeatureMaliceAbility } from '@/models/feature';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Element } from '@/models/element';
import { ElementEditPanel } from '@/components/panels/edit/element-edit/element-edit-panel';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureAddOnType } from '@/enums/feature-addon-type';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeatureType } from '@/enums/feature-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { Monster } from '@/models/monster';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { MonsterSelectModal } from '@/components/modals/select/monster-select/monster-select-modal';
import { NameGenerator } from '@/utils/name-generator';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './monster-group-edit-panel.scss';

interface Props {
	monsterGroup: MonsterGroup;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (monsterGroup: MonsterGroup) => void;
	onEditMonster: (monster: Monster) => void;
}

export const MonsterGroupEditPanel = (props: Props) => {
	const [ monsterGroup, setMonsterGroup ] = useState<MonsterGroup>(props.monsterGroup);
	const [ drawerOpen, setDrawerOpen ] = useState<boolean>(false);

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = Utils.copy(monsterGroup);
			copy.name = value;
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(monsterGroup);
			copy.description = value;
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		const setPicture = (value: string | null) => {
			const copy = Utils.copy(monsterGroup);
			copy.picture = value;
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		const picture = (
			<>
				<HeaderText>Portrait</HeaderText>
				{
					monsterGroup.picture ?
						<Flex align='center' justify='center' gap={10}>
							<img className='portrait-edit' src={monsterGroup.picture} title='Portrait' />
							<DangerButton mode='clear' onConfirm={() => setPicture(null)} />
						</Flex>
						:
						<Upload
							style={{ width: '100%' }}
							accept='.png,.webp,.gif,.jpg,.jpeg,.svg'
							showUploadList={false}
							beforeUpload={file => {
								const reader = new FileReader();
								reader.onload = progress => {
									if (progress.target) {
										const content = progress.target.result as string;
										setPicture(content);
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
			</>
		);

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Space.Compact style={{ width: '100%' }}>
					<Input
						status={monsterGroup.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						value={monsterGroup.name}
						onChange={e => setName(e.target.value)}
					/>
					<Button icon={<ThunderboltOutlined />} onClick={() => setName(NameGenerator.generateName())} />
				</Space.Compact>
				<HeaderText>Description</HeaderText>
				<MarkdownEditor value={monsterGroup.description} onChange={setDescription} />
				{picture}
			</Space>
		);
	};

	const getInformationEditSection = () => {
		const addInformation = () => {
			const copy = Utils.copy(monsterGroup);
			copy.information.push({
				id: Utils.guid(),
				name: '',
				description: ''
			});
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		const changeInformation = (information: Element) => {
			const copy = Utils.copy(monsterGroup);
			const index = copy.information.findIndex(i => i.id === information.id);
			if (index !== -1) {
				copy.information[index] = information;
			}
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		const moveInformation = (information: Element, direction: 'up' | 'down') => {
			const copy = Utils.copy(monsterGroup);
			const index = copy.information.findIndex(i => i.id === information.id);
			copy.information = Collections.move(copy.information, index, direction);
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		const deleteInformation = (information: Element) => {
			const copy = Utils.copy(monsterGroup);
			copy.information = copy.information.filter(i => i.id !== information.id);
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={addInformation} />
					}
				>
					Information
				</HeaderText>
				{
					monsterGroup.information.map(i => (
						<Expander
							key={i.id}
							title={i.name || 'Unnamed Information'}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveInformation(i, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveInformation(i, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteInformation(i); }} />
							]}
						>
							<ElementEditPanel
								element={i}
								onChange={changeInformation}
							/>
						</Expander>
					))
				}
				{
					monsterGroup.information.length === 0 ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	const getMaliceEditSection = () => {
		const addMaliceFeature = () => {
			const copy = Utils.copy(monsterGroup);
			copy.malice.push(FactoryLogic.feature.createMalice({
				id: Utils.guid(),
				name: '',
				cost: 3,
				sections: [
					''
				]
			}));
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		const changeMaliceFeature = (feature: FeatureMalice | FeatureMaliceAbility) => {
			const copy = Utils.copy(monsterGroup);
			const index = copy.malice.findIndex(f => f.id === feature.id);
			if (index !== -1) {
				copy.malice[index] = feature;
			}
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		const moveMaliceFeature = (feature: FeatureMalice | FeatureMaliceAbility, direction: 'up' | 'down') => {
			const copy = Utils.copy(monsterGroup);
			const index = copy.malice.findIndex(f => f.id === feature.id);
			copy.malice = Collections.move(copy.malice, index, direction);
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		const deleteMaliceFeature = (feature: FeatureMalice | FeatureMaliceAbility) => {
			const copy = Utils.copy(monsterGroup);
			copy.malice = copy.malice.filter(f => f.id !== feature.id);
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={addMaliceFeature} />
					}
				>
					Malice
				</HeaderText>
				{
					monsterGroup.malice.map(f => (
						<Expander
							key={f.id}
							title={f.name || 'Unnamed Malice Feature'}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveMaliceFeature(f, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveMaliceFeature(f, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteMaliceFeature(f); }} />
							]}
						>
							<FeatureEditPanel
								feature={f}
								allowedTypes={[ FeatureType.Malice, FeatureType.MaliceAbility ]}
								sourcebooks={props.sourcebooks}
								options={props.options}
								onChange={f => changeMaliceFeature(f as FeatureMalice | FeatureMaliceAbility)}
							/>
						</Expander>
					))
				}
				{
					monsterGroup.malice.length === 0 ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	const getMonstersEditSection = () => {
		const addMonster = () => {
			const copy = Utils.copy(monsterGroup);
			copy.monsters.push(FactoryLogic.createMonster({
				id: Utils.guid(),
				name: '',
				level: 1,
				role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Ambusher),
				keywords: [],
				encounterValue: 0,
				size: FactoryLogic.createSize(1, 'M'),
				speed: FactoryLogic.createSpeed(5),
				stamina: 5,
				stability: 0,
				freeStrikeDamage: 2,
				characteristics: FactoryLogic.createCharacteristics(0, 0, 0, 0, 0),
				features: []
			}));
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		const copyMonster = (monster: Monster) => {
			const monsterCopy = Utils.copy(monster);
			monsterCopy.id = Utils.guid();

			const copy = Utils.copy(monsterGroup);
			copy.monsters.push(monsterCopy);
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		const moveMonster = (monster: Monster, direction: 'up' | 'down') => {
			const copy = Utils.copy(monsterGroup);
			const index = copy.monsters.findIndex(m => m.id === monster.id);
			copy.monsters = Collections.move(copy.monsters, index, direction);
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		const deleteMonster = (monster: Monster) => {
			const copy = Utils.copy(monsterGroup);
			copy.monsters = copy.monsters.filter(m => m.id !== monster.id);
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					monsterGroup.monsters.map(m => (
						<Expander
							key={m.id}
							title={MonsterLogic.getMonsterName(m, monsterGroup)}
							extra={[
								<Button key='edit' type='text' title='Edit' icon={<EditOutlined />} onClick={e => { e.stopPropagation(); props.onEditMonster(m); }} />,
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveMonster(m, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveMonster(m, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteMonster(m); }} />
							]}
						>
							<MonsterPanel
								monster={m}
								monsterGroup={monsterGroup}
								sourcebooks={props.sourcebooks}
								options={props.options}
							/>
						</Expander>
					))
				}
				{
					monsterGroup.monsters.length === 0 ?
						<Empty />
						: null
				}
				<Flex gap={10}>
					<Button block={true} icon={<PlusOutlined />} onClick={addMonster}>
						Add a new monster
					</Button>
					<Upload
						accept='.drawsteel-monster,.ds-monster'
						showUploadList={false}
						beforeUpload={file => {
							file
								.text()
								.then(json => {
									const monster = JSON.parse(json) as Monster;
									copyMonster(monster);
								});
							return false;
						}}
					>
						<Button block={true} onClick={() => null}>
							<DownloadOutlined />
							Import a monster
						</Button>
					</Upload>
					<Button block={true} onClick={() => setDrawerOpen(true)}>
						<CopyOutlined />
						Copy an existing monster
					</Button>
				</Flex>
				<Drawer open={drawerOpen} closeIcon={null} onClose={() => setDrawerOpen(false)} size={500}>
					<MonsterSelectModal
						monsters={props.sourcebooks.flatMap(sb => sb.monsterGroups).flatMap(g => g.monsters)}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onSelect={monster => {
							copyMonster(monster);
							setDrawerOpen(false);
						}}
						onClose={() => setDrawerOpen(false)}
					/>
				</Drawer>
			</Space>
		);
	};

	const getMonstersCustomizationSection = () => {
		const addAddOn = () => {
			const copy = Utils.copy(monsterGroup);
			copy.addOns.push(FactoryLogic.feature.createAddOn({
				id: Utils.guid(),
				name: '',
				description: '',
				category: FeatureAddOnType.Defensive,
				cost: 1
			}));
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		const changeAddOn = (addOn: FeatureAddOn) => {
			const copy = Utils.copy(monsterGroup);
			const index = copy.addOns.findIndex(i => i.id === addOn.id);
			if (index !== -1) {
				copy.addOns[index] = addOn;
			}
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		const moveAddOn = (addOn: FeatureAddOn, direction: 'up' | 'down') => {
			const copy = Utils.copy(monsterGroup);
			const index = copy.addOns.findIndex(i => i.id === addOn.id);
			copy.addOns = Collections.move(copy.addOns, index, direction);
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		const deleteAddOn = (addOn: FeatureAddOn) => {
			const copy = Utils.copy(monsterGroup);
			copy.addOns = copy.addOns.filter(i => i.id !== addOn.id);
			setMonsterGroup(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={addAddOn} />
					}
				>
					Customizations
				</HeaderText>
				{
					monsterGroup.addOns.map(i => (
						<Expander
							key={i.id}
							title={i.name || 'Unnamed Customization'}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveAddOn(i, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveAddOn(i, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteAddOn(i); }} />
							]}
						>
							<FeatureEditPanel
								feature={i}
								allowedTypes={[ FeatureType.AddOn ]}
								sourcebooks={props.sourcebooks}
								options={props.options}
								onChange={f => changeAddOn(f as FeatureAddOn)}
							/>
						</Expander>
					))
				}
				{
					monsterGroup.addOns.length === 0 ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	return (
		<ErrorBoundary>
			<div className='monster-group-edit-panel'>
				<Tabs
					items={[
						{
							key: '1',
							label: 'Monster Group',
							children: getNameAndDescriptionSection()
						},
						{
							key: '2',
							label: 'Information',
							children: getInformationEditSection()
						},
						{
							key: '3',
							label: 'Malice',
							children: getMaliceEditSection()
						},
						{
							key: '4',
							label: 'Monsters',
							children: getMonstersEditSection()
						},
						{
							key: '5',
							label: 'Customization',
							children: getMonstersCustomizationSection()
						}
					]}
				/>
			</div>
		</ErrorBoundary>
	);
};
