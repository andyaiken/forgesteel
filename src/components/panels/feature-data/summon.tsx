import { Button, Empty, Space } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
import { Feature, FeatureSummonData } from '@/models/feature';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Monster } from '@/models/monster';
import { MonsterEditPanel } from '@/components/panels/edit/monster-edit/monster-edit-panel';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureSummonData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoSummon = (props: InfoProps) => {
	if (props.data.summons.length > 0) {
		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{props.data.summons.map(s => <SelectablePanel key={s.id}><MonsterPanel monster={s.monster} summon={s.info} sourcebooks={props.sourcebooks || []} options={props.options} /></SelectablePanel>)}
			</Space>
		);
	}

	return null;
};

interface EditProps {
	data: FeatureSummonData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureSummonData) => void;
}

export const EditSummon = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureSummonData>(Utils.copy(props.data));

	const addSummon = (data: FeatureSummonData) => {
		const copy = Utils.copy(data);
		copy.summons.push(
			FactoryLogic.createSummon({
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
			})
		);
		setData(copy);
		props.setData(copy);
	};

	const moveSummon = (data: FeatureSummonData, index: number, direction: 'up' | 'down') => {
		const copy = Utils.copy(data);
		copy.summons = Collections.move(copy.summons, index, direction);
		setData(copy);
		props.setData(copy);
	};

	const deleteSummon = (data: FeatureSummonData, index: number) => {
		const copy = Utils.copy(data);
		copy.summons.splice(index, 1);
		setData(copy);
		props.setData(copy);
	};

	const setSummonIsSignature = (data: FeatureSummonData, index: number, value: boolean) => {
		const copy = Utils.copy(data);
		copy.summons[index].info.isSignature = value;
		setData(copy);
		props.setData(copy);
	};

	const setSummonCost = (data: FeatureSummonData, index: number, value: number) => {
		const copy = Utils.copy(data);
		copy.summons[index].info.cost = value;
		setData(copy);
		props.setData(copy);
	};

	const setSummonCount = (data: FeatureSummonData, index: number, value: number) => {
		const copy = Utils.copy(data);
		copy.summons[index].info.count = value;
		setData(copy);
		props.setData(copy);
	};

	const setSummonMonster = (data: FeatureSummonData, index: number, value: Monster) => {
		const copy = Utils.copy(data);
		copy.summons[index].monster = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText
				extra={
					<Button type='text' icon={<PlusOutlined />} onClick={() => addSummon(data)} />
				}
			>
				Options
			</HeaderText>
			{
				data.summons.map((summon, n) => (
					<Expander
						key={summon.monster.id}
						title={summon.monster.name || 'Unnamed Monster'}
						extra={[
							<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSummon(data, n, 'up'); }} />,
							<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSummon(data, n, 'down'); }} />,
							<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteSummon(data, n); }} />
						]}
					>
						<HeaderText>Summoning</HeaderText>
						<Toggle label='Is signature' value={summon.info.isSignature} onChange={value => setSummonIsSignature(data, n, value)} />
						<NumberSpin min={1} label='Cost' value={summon.info.cost} onChange={value => setSummonCost(data, n, value)} />
						<NumberSpin min={1} label='Count' value={summon.info.count} onChange={value => setSummonCount(data, n, value)} />
						<MonsterEditPanel
							monster={summon.monster}
							sourcebooks={props.sourcebooks}
							options={props.options}
							similarMonsters={[]}
							onChange={m => setSummonMonster(data, n, m)}
						/>
					</Expander>
				))
			}
			{
				data.summons.length === 0 ?
					<Empty />
					: null
			}
		</Space>
	);
};
