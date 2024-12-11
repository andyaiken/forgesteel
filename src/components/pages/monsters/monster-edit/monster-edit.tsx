import { Button, Input, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Monster, MonsterGroup } from '../../../../models/monster';
import { AppHeader } from '../../../panels/app-header/app-header';
import { CampaignSetting } from '../../../../models/campaign-setting';
import { Collections } from '../../../../utils/collections';
import { Element } from '../../../../models/element';
import { ElementEditPanel } from '../../../panels/element-edit-panel/element-edit-panel';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { Feature } from '../../../../models/feature';
import { FeatureEditPanel } from '../../../panels/feature-edit-panel/feature-edit-panel';
import { FeatureLogic } from '../../../../logic/feature-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { MonsterEditPanel } from '../../../panels/monster-edit-panel/monster-edit-panel';
import { MonsterGroupPanel } from '../../../panels/monster-group-panel/monster-group-panel';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NameGenerator } from '../../../../utils/name-generator';
import { PanelMode } from '../../../../enums/panel-mode';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './monster-edit.scss';

interface Props {
	monsterGroup: MonsterGroup;
	campaignSettings: CampaignSetting[];
	goHome: () => void;
	showAbout: () => void;
	saveChanges: (monsterGroup: MonsterGroup) => void;
	cancelChanges: () => void;
}

export const MonsterEditPage = (props: Props) => {
	const [ monsterGroup, setMonsterGroup ] = useState<MonsterGroup>(JSON.parse(JSON.stringify(props.monsterGroup)));
	const [ dirty, setDirty ] = useState<boolean>(false);

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			copy.name = value;
			setMonsterGroup(copy);
			setDirty(true);
		};

		const setDescription = (value: string) => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			copy.description = value;
			setMonsterGroup(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Input
					className={monsterGroup.name === '' ? 'input-empty' : ''}
					placeholder='Name'
					allowClear={true}
					addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
					value={monsterGroup.name}
					onChange={e => setName(e.target.value)}
				/>
				<HeaderText>Description</HeaderText>
				<MultiLine label='Description' value={monsterGroup.description} onChange={setDescription} />
			</Space>
		);
	};

	const getInformationEditSection = () => {
		const addInformation = () => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			copy.information.push({
				id: Utils.guid(),
				name: '',
				description: ''
			});
			setMonsterGroup(copy);
			setDirty(true);
		};

		const changeInformation = (information: Element) => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			const index = copy.information.findIndex(i => i.id === information.id);
			if (index !== -1) {
				copy.information[index] = information;
			}
			setMonsterGroup(copy);
			setDirty(true);
		};

		const moveInformation = (information: Element, direction: 'up' | 'down') => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			const index = copy.information.findIndex(i => i.id === information.id);
			copy.information = Collections.move(copy.information, index, direction);
			setMonsterGroup(copy);
			setDirty(true);
		};

		const deleteInformation = (information: Element) => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			copy.information = copy.information.filter(i => i.id !== information.id);
			setMonsterGroup(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					monsterGroup.information.map(i => (
						<Expander
							key={i.id}
							title={i.name || 'Unnamed Information'}
							extra={[
								{
									title: 'Move Up',
									icon: <CaretUpOutlined />,
									onClick: () => moveInformation(i, 'up')
								},
								{
									title: 'Move Down',
									icon: <CaretDownOutlined />,
									onClick: () => moveInformation(i, 'down')
								}
							]}
						>
							<ElementEditPanel
								element={i}
								onChange={changeInformation}
								onDelete={deleteInformation}
							/>
						</Expander>
					))
				}
				{
					monsterGroup.information.length === 0 ?
						<div className='ds-text dimmed-text'>None</div>
						: null
				}
				<Button block={true} onClick={addInformation}>Add a new information piece</Button>
			</Space>
		);
	};

	const getMaliceEditSection = () => {
		const addFeature = () => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			copy.malice.push(FeatureLogic.createFeature({
				id: Utils.guid(),
				name: '',
				description: ''
			}));
			setMonsterGroup(copy);
			setDirty(true);
		};

		const changeFeature = (feature: Feature) => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			const index = copy.malice.findIndex(f => f.id === feature.id);
			if (index !== -1) {
				copy.malice[index] = feature;
			}
			setMonsterGroup(copy);
			setDirty(true);
		};

		const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			const index = copy.malice.findIndex(f => f.id === feature.id);
			copy.malice = Collections.move(copy.malice, index, direction);
			setMonsterGroup(copy);
			setDirty(true);
		};

		const deleteFeature = (feature: Feature) => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			copy.malice = copy.malice.filter(f => f.id !== feature.id);
			setMonsterGroup(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					monsterGroup.malice.map(f => (
						<Expander
							key={f.id}
							title={f.name || 'Unnamed Malice Feature'}
							extra={[
								{
									title: 'Move Up',
									icon: <CaretUpOutlined />,
									onClick: () => moveFeature(f, 'up')
								},
								{
									title: 'Move Down',
									icon: <CaretDownOutlined />,
									onClick: () => moveFeature(f, 'down')
								}
							]}
						>
							<FeatureEditPanel
								feature={f}
								campaignSettings={props.campaignSettings}
								onChange={changeFeature}
								onDelete={deleteFeature}
							/>
						</Expander>
					))
				}
				{
					monsterGroup.malice.length === 0 ?
						<div className='ds-text dimmed-text'>None</div>
						: null
				}
				<Button block={true} onClick={addFeature}>Add a new malice feature</Button>
			</Space>
		);
	};

	const getMonstersEditSection = () => {
		const addMonster = () => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			copy.monsters.push(FactoryLogic.createMonster(copy));
			setMonsterGroup(copy);
			setDirty(true);
		};

		const changeMonster = (monster: Monster) => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			const index = copy.monsters.findIndex(m => m.id === monster.id);
			if (index !== -1) {
				copy.monsters[index] = monster;
			}
			setMonsterGroup(copy);
			setDirty(true);
		};

		const moveMonster = (monster: Monster, direction: 'up' | 'down') => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			const index = copy.monsters.findIndex(m => m.id ===  monster.id);
			copy.monsters = Collections.move(copy.monsters, index, direction);
			setMonsterGroup(copy);
			setDirty(true);
		};

		const deleteMonster = (monster: Monster) => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			copy.monsters = copy.monsters.filter(m => m.id !== monster.id);
			setMonsterGroup(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					monsterGroup.monsters.map(m => (
						<Expander
							key={m.id}
							title={m.name || 'Unnamed Monster'}
							extra={[
								{
									title: 'Move Up',
									icon: <CaretUpOutlined />,
									onClick: () => moveMonster(m, 'up')
								},
								{
									title: 'Move Down',
									icon: <CaretDownOutlined />,
									onClick: () => moveMonster(m, 'down')
								}
							]}
						>
							<MonsterEditPanel
								monster={m}
								campaignSettings={props.campaignSettings}
								onChange={changeMonster}
								onDelete={deleteMonster}
							/>
						</Expander>
					))
				}
				{
					monsterGroup.monsters.length === 0 ?
						<div className='ds-text dimmed-text'>None</div>
						: null
				}
				<Button block={true} onClick={addMonster}>Add a new monster</Button>
			</Space>
		);
	};

	const getEditSection = () => {
		return (
			<Tabs
				items={[
					{
						key: '1',
						label: 'Element',
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
					}
				]}
			/>
		);
	};

	const getPreview = () => {
		return <MonsterGroupPanel monsterGroup={monsterGroup} mode={PanelMode.Full} />;
	};

	try {
		return (
			<div className='monster-edit-page'>
				<AppHeader subtitle='Monsters' goHome={props.goHome} showAbout={props.showAbout}>
					<Button type='primary' disabled={!dirty} onClick={() => props.saveChanges(monsterGroup)}>
						Save Changes
					</Button>
					<Button onClick={() => props.cancelChanges()}>
						Cancel
					</Button>
				</AppHeader>
				<div className='monster-edit-page-content'>
					<div className='edit-column'>
						{getEditSection()}
					</div>
					<div className='preview-column'>
						{getPreview()}
					</div>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
