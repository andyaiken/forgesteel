import { Button, Drawer, Flex, Input, Space } from 'antd';
import { CloseOutlined, InfoCircleOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Feature, FeatureRetainerData } from '@/models/feature';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureConfigPanel } from '@/components/panels/feature-config-panel/feature-config-panel';
import { FeatureLogic } from '@/logic/feature-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Monster } from '@/models/monster';
import { MonsterInfo } from '@/components/panels/token/token';
import { MonsterModal } from '@/components/modals/monster/monster-modal';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { NameGenerator } from '@/utils/name-generator';
import { Options } from '@/models/options';
import { RetainerSelectModal } from '@/components/modals/select/retainer-select/retainer-select-modal';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureRetainerData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoRetainer = (props: InfoProps) => {
	if (props.data.selected === null) {
		return (
			<div className='ds-text'>
				Choose a retainer.
			</div>
		);
	}

	return <MonsterPanel monster={props.data.selected} sourcebooks={props.sourcebooks || []} options={props.options} />;
};

interface ConfigProps {
	data: FeatureRetainerData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureRetainerData) => void;
}

export const ConfigRetainer = (props: ConfigProps) => {
	const [ monsterSelectorOpen, setMonsterSelectorOpen ] = useState<boolean>(false);
	const [ selectedMonster, setSelectedMonster ] = useState<Monster | null>(null);

	const setName = (value: string) => {
		const dataCopy = Utils.copy(props.data);
		dataCopy.selected!.name = value;
		props.setData(dataCopy);
	};

	const choices = props.data.selected && props.data.selected.retainer ?
		props.data.selected.retainer.featuresByLevel
			.filter(lvl => props.data.selected!.retainer!.level >= lvl.level)
			.filter(lvl => FeatureLogic.isChoice(lvl.feature))
		: [];

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
						<Space orientation='vertical' style={{ width: '100%' }}>
							<div>
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
							</div>
							{
								choices.map(lvl => (
									<FeatureConfigPanel
										key={lvl.level}
										feature={lvl.feature}
										options={props.options}
										hero={props.hero}
										sourcebooks={props.sourcebooks}
										setData={(fID, d) => {
											const dataCopy = Utils.copy(props.data);
											dataCopy.selected!.retainer!.featuresByLevel.forEach(l => {
												if (l.feature.id === fID) {
													l.feature.data = d;
												}
											});
											props.setData(dataCopy);
										}}
									/>
								))
							}
						</Space>
					</Expander>
					: null
			}
			<Drawer open={monsterSelectorOpen} onClose={() => setMonsterSelectorOpen(false)} closeIcon={null} size={500}>
				<RetainerSelectModal
					monsters={SourcebookLogic.getMonsters(props.sourcebooks)}
					sourcebooks={props.sourcebooks}
					options={props.options}
					onSelect={monster => {
						setMonsterSelectorOpen(false);

						const monsterCopy = Utils.copy(monster) as Monster;
						if (monsterCopy.retainer) {
							// Retainers match hero level
							monsterCopy.retainer.level = Math.max(monsterCopy.level, props.hero?.class?.level || 1);
						}
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
