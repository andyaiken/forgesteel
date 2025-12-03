import { Button, Drawer, Flex, Input, Space } from 'antd';
import { CloseOutlined, InfoCircleOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Feature, FeatureCompanionData } from '@/models/feature';
import { Expander } from '@/components/controls/expander/expander';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Monster } from '@/models/monster';
import { MonsterInfo } from '@/components/panels/token/token';
import { MonsterModal } from '@/components/modals/monster/monster-modal';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { MonsterSelectModal } from '@/components/modals/select/monster-select/monster-select-modal';
import { NameGenerator } from '@/utils/name-generator';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureCompanionData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoCompanion = (props: InfoProps) => {
	if (props.data.selected === null) {
		return (
			<div className='ds-text'>
				Choose a monster.
			</div>
		);
	}

	return <MonsterPanel monster={props.data.selected} sourcebooks={props.sourcebooks || []} options={props.options} />;
};

interface ConfigProps {
	data: FeatureCompanionData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureCompanionData) => void;
}

export const ConfigCompanion = (props: ConfigProps) => {
	const [ monsterSelectorOpen, setMonsterSelectorOpen ] = useState<boolean>(false);
	const [ selectedMonster, setSelectedMonster ] = useState<Monster | null>(null);

	const setName = (value: string) => {
		const dataCopy = Utils.copy(props.data);
		dataCopy.selected!.name = value;
		props.setData(dataCopy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{
				props.data.selected ?
					<Flex className='selection-box' align='center' gap={10}>
						<MonsterInfo
							style={{ flex: '1 1 0' }}
							monster={props.data.selected}
						/>
						<div style={{ flex: '0 0 auto' }}>
							<Button
								type='text'
								title='Show details'
								icon={<InfoCircleOutlined />}
								onClick={() => setSelectedMonster(props.data.selected)}
							/>
							<Button
								type='text'
								title='Remove'
								icon={<CloseOutlined />}
								onClick={() => {
									const dataCopy = Utils.copy(props.data);
									dataCopy.selected = null;
									props.setData(dataCopy);
								}}
							/>
						</div>
					</Flex>
					:
					<Button block={true} className='status-warning' onClick={() => setMonsterSelectorOpen(true)}>Select</Button>
			}
			{
				props.data.selected ?
					<Expander title='Customize'>
						<HeaderText>Name</HeaderText>
						<Space.Compact style={{ width: '100%' }}>
							<Input
								status={props.data.selected.name === '' ? 'warning' : ''}
								placeholder='Name'
								allowClear={true}
								value={props.data.selected.name}
								onChange={e => setName(e.target.value)}
							/>
							<Button icon={<ThunderboltOutlined />} onClick={() => setName(NameGenerator.generateName())} />
						</Space.Compact>
					</Expander>
					: null
			}
			<Drawer open={monsterSelectorOpen} onClose={() => setMonsterSelectorOpen(false)} closeIcon={null} size={500}>
				<MonsterSelectModal
					monsters={SourcebookLogic.getMonsters(props.sourcebooks)}
					sourcebooks={props.sourcebooks}
					options={props.options}
					onSelect={monster => {
						setMonsterSelectorOpen(false);

						const monsterCopy = Utils.copy(monster) as Monster;
						const dataCopy = Utils.copy(props.data);
						dataCopy.selected = monsterCopy;
						props.setData(dataCopy);
					}}
					onClose={() => setMonsterSelectorOpen(false)}
				/>
			</Drawer>
			<Drawer open={!!selectedMonster} onClose={() => setSelectedMonster(null)} closeIcon={null} size={500}>
				{selectedMonster ? <MonsterModal monster={selectedMonster} sourcebooks={props.sourcebooks} options={props.options} onClose={() => setSelectedMonster(null)} /> : null}
			</Drawer>
		</Space>
	);
};
