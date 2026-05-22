import { Button, Drawer, Space } from 'antd';
import { Feature, FeatureData, FeatureRetainerData } from '@/models/feature';
import { ControlledMonsterCustomizePanel } from '@/components/panels/controlled-monster-customize/controlled-monster-customize-panel';
import { Hero } from '@/models/hero';
import { Monster } from '@/models/monster';
import { MonsterInfo } from '@/components/panels/token/token';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterModal } from '@/components/modals/monster/monster-modal';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { RetainerSelectModal } from '@/components/modals/select/retainer-select/retainer-select-modal';
import { SelectionBox } from '@/components/panels/feature-config-panel/feature-config-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureRetainerData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
}

export const InfoRetainer = (props: InfoProps) => {
	if (props.data.selected === null) {
		return (
			<div className='ds-text'>
				Choose a retainer.
			</div>
		);
	}

	return <MonsterPanel monster={props.data.selected} sourcebooks={props.sourcebooks || []} />;
};

interface ConfigProps {
	data: FeatureRetainerData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	setData: (data: FeatureRetainerData) => void;
}

export const ConfigRetainer = (props: ConfigProps) => {
	const [ monsterSelectorOpen, setMonsterSelectorOpen ] = useState<boolean>(false);
	const [ selectedMonster, setSelectedMonster ] = useState<Monster | null>(null);

	const getCustomizeContent = (monster: Monster) => {
		const setName = (value: string) => {
			const dataCopy = Utils.copy(props.data);
			dataCopy.selected!.name = value;
			props.setData(dataCopy);
		};

		const setFeatureData = (featureID: string, data: FeatureData) => {
			const dataCopy = Utils.copy(props.data);
			MonsterLogic.getFeatures(dataCopy.selected!)
				.filter(f => f.id === featureID)
				.forEach(f => f.data = data);
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
				props.data.selected ?
					<SelectionBox
						content={
							<MonsterInfo
								style={{ flex: '1 1 0' }}
								monster={props.data.selected}
							/>
						}
						customizeContent={getCustomizeContent(props.data.selected)}
						onSelect={() => setSelectedMonster(props.data.selected)}
						onRemove={() => {
							const dataCopy = Utils.copy(props.data);
							dataCopy.selected = null;
							props.setData(dataCopy);
						}}
					/>
					:
					<Button block={true} className='status-warning' onClick={() => setMonsterSelectorOpen(true)}>Select</Button>
			}
			<Drawer open={monsterSelectorOpen} onClose={() => setMonsterSelectorOpen(false)} closeIcon={null} size={500}>
				<RetainerSelectModal
					monsters={SourcebookLogic.getMonsters(props.sourcebooks)}
					sourcebooks={props.sourcebooks}
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
				{
					selectedMonster ?
						<MonsterModal
							monster={selectedMonster}
							sourcebooks={props.sourcebooks}
							onClose={() => setSelectedMonster(null)}
						/>
						: null
				}
			</Drawer>
		</Space>
	);
};
