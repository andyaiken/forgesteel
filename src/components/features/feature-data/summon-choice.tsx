import { Button, Drawer, Empty, Flex, Space } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, CloseOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Feature, FeatureSummonChoiceData } from '@/models/feature';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Monster } from '@/models/monster';
import { MonsterEditPanel } from '@/components/panels/edit/monster-edit/monster-edit-panel';
import { MonsterInfo } from '@/components/panels/token/token';
import { MonsterModal } from '@/components/modals/monster/monster-modal';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
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
	options: Options;
}

export const InfoSummonChoice = (props: InfoProps) => {
	if (props.data.selected.length > 0) {
		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{props.data.selected.map(s => <SelectablePanel key={s.id}><MonsterPanel monster={s.monster} summon={s.info} sourcebooks={props.sourcebooks || []} options={props.options} /></SelectablePanel>)}
			</Space>
		);
	}

	if (!props.feature.description) {
		return (
			<>
				<div className='ds-text'>Choose {props.data.count > 1 ? props.data.count : 'a'} {props.data.count > 1 ? 'monsters' : 'monster'}.</div>
				<Space orientation='vertical' style={{ width: '100%' }}>
					{props.data.options.map(s => <SelectablePanel key={s.id}><MonsterPanel monster={s.monster} summon={s.info} sourcebooks={props.sourcebooks || []} options={props.options} /></SelectablePanel>)}
				</Space>
			</>
		);
	}

	return null;
};

interface EditProps {
	data: FeatureSummonChoiceData;
	sourcebooks: Sourcebook[];
	options: Options;
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
							options={props.options}
							similarMonsters={[]}
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
	options: Options;
	setData: (data: FeatureSummonChoiceData) => void;
}

export const ConfigSummonChoice = (props: ConfigProps) => {
	const [ monsterSelectorOpen, setMonsterSelectorOpen ] = useState<boolean>(false);
	const [ selectedSummon, setSelectedSummon ] = useState<Summon | null>(null);

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{
				!props.data.selected ?
					<Button block={true} className='status-warning' onClick={() => setMonsterSelectorOpen(true)}>Select</Button>
					: null
			}
			{
				props.data.selected.map(summon => (
					<Flex className='selection-box' align='center' gap={10}>
						<MonsterInfo
							style={{ flex: '1 1 0' }}
							monster={summon.monster}
						/>
						<div style={{ flex: '0 0 auto' }}>
							<Button
								type='text'
								title='Show details'
								icon={<InfoCircleOutlined />}
								onClick={() => setSelectedSummon(summon)}
							/>
							<Button
								type='text'
								title='Remove'
								icon={<CloseOutlined />}
								onClick={() => {
									const dataCopy = Utils.copy(props.data);
									dataCopy.selected = dataCopy.selected.filter(m => m.id !== summon.id);
									props.setData(dataCopy);
								}}
							/>
						</div>
					</Flex>
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
					options={props.options}
					onSelect={summon => {
						setMonsterSelectorOpen(false);

						const dataCopy = Utils.copy(props.data);
						dataCopy.selected.push(Utils.copy(summon));
						props.setData(dataCopy);
					}}
					onClose={() => setMonsterSelectorOpen(false)}
				/>
			</Drawer>
			<Drawer open={!!selectedSummon} onClose={() => setSelectedSummon(null)} closeIcon={null} size={500}>
				{selectedSummon ? <MonsterModal monster={SummonLogic.getSummonedMonster(selectedSummon.monster, props.hero)} summon={selectedSummon.info} sourcebooks={props.sourcebooks} options={props.options} onClose={() => setSelectedSummon(null)} /> : null}
			</Drawer>
		</Space>
	);
};
