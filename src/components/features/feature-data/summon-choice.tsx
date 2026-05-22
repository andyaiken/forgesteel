import { Button, Drawer, Space } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
import { Feature, FeatureData, FeatureSummonChoiceData } from '@/models/feature';
import { Collections } from '@/utils/collections';
import { ControlledMonsterCustomizePanel } from '@/components/panels/controlled-monster-customize/controlled-monster-customize-panel';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Monster } from '@/models/monster';
import { MonsterEditPanel } from '@/components/panels/edit/monster-edit/monster-edit-panel';
import { MonsterInfo } from '@/components/panels/token/token';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterModal } from '@/components/modals/monster/monster-modal';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SelectionBox } from '@/components/panels/feature-config-panel/feature-config-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Summon } from '@/models/summon';
import { SummonLogic } from '@/logic/summon-logic';
import { SummonSelectModal } from '@/components/modals/select/summon-select/summon-select-modal';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureSummonChoiceData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
}

export const InfoSummonChoice = (props: InfoProps) => {
	if (props.data.selected.length > 0) {
		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{props.data.selected.map(s => <SelectablePanel key={s.id}><MonsterPanel monster={s.monster} summon={s.info} sourcebooks={props.sourcebooks || []} mode={PanelMode.Full} /></SelectablePanel>)}
			</Space>
		);
	}

	return (
		<>
			<div className='ds-text'>Choose {props.data.count > 1 ? props.data.count : 'a'} {props.data.count > 1 ? 'monsters' : 'monster'}.</div>
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					props.data.options.map(s => (
						<Expander key={s.id} title={s.monster.name}>
							<MonsterPanel monster={s.monster} summon={s.info} sourcebooks={props.sourcebooks || []} mode={PanelMode.Full} />
						</Expander>
					))
				}
			</Space>
		</>
	);
};

interface EditProps {
	data: FeatureSummonChoiceData;
	sourcebooks: Sourcebook[];
	setData: (data: FeatureSummonChoiceData) => void;
}

export const EditSummonChoice = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureSummonChoiceData>(Utils.copy(props.data));

	const addSummonChoice = (data: FeatureSummonChoiceData) => {
		const copy = Utils.copy(data);
		copy.options.push(FactoryLogic.createSummon({
			monster: FactoryLogic.createMonster({
				id: Utils.guid(),
				name: '',
				description: '',
				level: 1,
				role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
				keywords: [],
				encounterValue: 0,
				size: FactoryLogic.createSize(1),
				speed: FactoryLogic.createSpeed(5),
				stamina: 8,
				stability: 0,
				freeStrikeDamage: 1,
				characteristics: FactoryLogic.createCharacteristics(0, 0, 0, 0, 0),
				features: []
			}),
			isSignature: true,
			cost: 1,
			count: 1
		}));
		setData(copy);
		props.setData(copy);
	};

	const moveSummonChoice = (data: FeatureSummonChoiceData, index: number, direction: 'up' | 'down') => {
		const copy = Utils.copy(data);
		copy.options = Collections.move(copy.options, index, direction);
		setData(copy);
		props.setData(copy);
	};

	const deleteSummonChoice = (data: FeatureSummonChoiceData, index: number) => {
		const copy = Utils.copy(data);
		copy.options.splice(index, 1);
		setData(copy);
		props.setData(copy);
	};

	const setSummonChoiceIsSignature = (data: FeatureSummonChoiceData, index: number, value: boolean) => {
		const copy = Utils.copy(data);
		copy.options[index].info.isSignature = value;
		setData(copy);
		props.setData(copy);
	};

	const setSummonChoiceCost = (data: FeatureSummonChoiceData, index: number, value: number) => {
		const copy = Utils.copy(data);
		copy.options[index].info.cost = value;
		setData(copy);
		props.setData(copy);
	};

	const setSummonChoiceCount = (data: FeatureSummonChoiceData, index: number, value: number) => {
		const copy = Utils.copy(data);
		copy.options[index].info.count = value;
		setData(copy);
		props.setData(copy);
	};

	const setSummonChoiceMonster = (data: FeatureSummonChoiceData, index: number, value: Monster) => {
		const copy = Utils.copy(data);
		copy.options[index].monster = value;
		setData(copy);
		props.setData(copy);
	};

	const setCount = (value: number) => {
		const copy = Utils.copy(data);
		copy.count = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText
				extra={
					<Button type='text' icon={<PlusOutlined />} onClick={() => addSummonChoice(data)} />
				}
			>
				Options
			</HeaderText>
			{
				data.options.map((summon, n) => (
					<Expander
						key={summon.monster.id}
						title={summon.monster.name || 'Unnamed Monster'}
						extra={[
							<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSummonChoice(data, n, 'up'); }} />,
							<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSummonChoice(data, n, 'down'); }} />,
							<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteSummonChoice(data, n); }} />
						]}
					>
						<HeaderText>Summoning</HeaderText>
						<Toggle label='Is signature' value={summon.info.isSignature} onChange={value => setSummonChoiceIsSignature(data, n, value)} />
						<NumberSpin min={1} label='Cost' value={summon.info.cost} onChange={value => setSummonChoiceCost(data, n, value)} />
						<NumberSpin min={1} label='Count' value={summon.info.count} onChange={value => setSummonChoiceCount(data, n, value)} />
						<MonsterEditPanel
							monster={summon.monster}
							sourcebooks={props.sourcebooks}
							onChange={m => setSummonChoiceMonster(data, n, m)}
						/>
					</Expander>
				))
			}
			{
				data.options.length === 0 ?
					<Empty />
					: null
			}
			<HeaderText>Count</HeaderText>
			<NumberSpin min={1} value={data.count} onChange={setCount} />
		</Space>
	);
};

interface ConfigProps {
	data: FeatureSummonChoiceData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	setData: (data: FeatureSummonChoiceData) => void;
}

export const ConfigSummonChoice = (props: ConfigProps) => {
	const [ monsterSelectorOpen, setMonsterSelectorOpen ] = useState<boolean>(false);
	const [ selectedSummon, setSelectedSummon ] = useState<Summon | null>(null);

	const getCustomizeContent = (monster: Monster) => {
		const setName = (value: string) => {
			const dataCopy = Utils.copy(props.data);
			const summon = dataCopy.selected.find(s => s.monster.id === monster.id);
			if (summon) {
				summon.name = value;
				summon.monster.name = value;
			}
			props.setData(dataCopy);
		};

		const setFeatureData = (featureID: string, data: FeatureData) => {
			const dataCopy = Utils.copy(props.data);
			const summon = dataCopy.selected.find(s => s.monster.id === monster.id);
			if (summon) {
				MonsterLogic.getFeatures(summon.monster)
					.filter(f => f.id === featureID)
					.forEach(f => f.data = data);
			}
			props.setData(dataCopy);
		};

		return (
			<ControlledMonsterCustomizePanel
				monster={monster}
				hero={props.hero}
				sourcebooks={props.sourcebooks}
				onChangeName={setName}
				onChangeFeature={setFeatureData}
			/>
		);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{
				props.data.selected.map(summon => (
					<SelectionBox
						key={summon.id}
						content={
							<MonsterInfo
								style={{ flex: '1 1 0' }}
								monster={summon.monster}
							/>
						}
						customizeContent={getCustomizeContent(summon.monster)}
						onSelect={() => setSelectedSummon(summon)}
						onRemove={() => {
							const dataCopy = Utils.copy(props.data);
							dataCopy.selected = dataCopy.selected.filter(m => m.id !== summon.id);
							props.setData(dataCopy);
						}}
					/>
				))
			}
			{
				props.data.selected.length < props.data.count ?
					<Button className='status-warning' block={true} onClick={() => setMonsterSelectorOpen(true)}>
						Choose a monster
					</Button>
					: null
			}
			<Drawer open={monsterSelectorOpen} onClose={() => setMonsterSelectorOpen(false)} closeIcon={null} size={500}>
				<SummonSelectModal
					summons={props.data.options}
					hero={props.hero}
					sourcebooks={props.sourcebooks}
					onSelect={summon => {
						setMonsterSelectorOpen(false);

						const dataCopy = Utils.copy(props.data);
						const summonCopy = Utils.copy(summon);
						summonCopy.info.level = props.hero.class?.level || 1;
						dataCopy.selected.push(summonCopy);
						props.setData(dataCopy);
					}}
					onClose={() => setMonsterSelectorOpen(false)}
				/>
			</Drawer>
			<Drawer open={!!selectedSummon} onClose={() => setSelectedSummon(null)} closeIcon={null} size={500}>
				{
					selectedSummon ?
						<MonsterModal
							monster={SummonLogic.getSummonedMonster(selectedSummon, props.hero)}
							summon={selectedSummon.info}
							sourcebooks={props.sourcebooks}
							onClose={() => setSelectedSummon(null)}
						/>
						: null
				}
			</Drawer>
		</Space>
	);
};
