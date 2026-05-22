import { Button, Drawer, Space } from 'antd';
import { Feature, FeatureCompanionData, FeatureData } from '@/models/feature';
import { ControlledMonsterCustomizePanel } from '@/components/panels/controlled-monster-customize/controlled-monster-customize-panel';
import { Expander } from '@/components/controls/expander/expander';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Monster } from '@/models/monster';
import { MonsterInfo } from '@/components/panels/token/token';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterModal } from '@/components/modals/monster/monster-modal';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { MonsterSelectModal } from '@/components/modals/select/monster-select/monster-select-modal';
import { NameSuggestions } from '@/components/panels/name-suggestions/name-suggestions';
import { SelectionBox } from '@/components/panels/feature-config-panel/feature-config-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureCompanionData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
}

export const InfoCompanion = (props: InfoProps) => {
	if (props.data.selected === null) {
		return (
			<div className='ds-text'>
				Choose a monster.
			</div>
		);
	}

	return <MonsterPanel monster={props.data.selected} sourcebooks={props.sourcebooks || []} />;
};

interface ConfigProps {
	data: FeatureCompanionData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
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
			{
				props.data.selected ?
					<Expander title='Customize'>
						<HeaderText>Name</HeaderText>
						<Space.Compact style={{ width: '100%' }}>
							<TextInput
								status={props.data.selected.name === '' ? 'warning' : ''}
								placeholder='Name'
								allowClear={true}
								value={props.data.selected.name}
								onChange={setName}
							/>
							<NameSuggestions onSelect={setName} />
						</Space.Compact>
					</Expander>
					: null
			}
			<Drawer open={monsterSelectorOpen} onClose={() => setMonsterSelectorOpen(false)} closeIcon={null} size={500}>
				<MonsterSelectModal
					monsters={SourcebookLogic.getMonsters(props.sourcebooks)}
					sourcebooks={props.sourcebooks}
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
