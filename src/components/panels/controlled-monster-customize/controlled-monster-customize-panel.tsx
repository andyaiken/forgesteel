import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureConfigPanel } from '../feature-config-panel/feature-config-panel';
import { FeatureData } from '@/models/feature';
import { FeatureLogic } from '@/logic/feature-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Monster } from '@/models/monster';
import { MonsterLogic } from '@/logic/monster-logic';
import { NameSuggestions } from '../name-suggestions/name-suggestions';
import { Sourcebook } from '@/models/sourcebook';
import { Space } from 'antd';
import { TextInput } from '@/components/controls/text-input/text-input';

interface Props {
	monster: Monster;
	hero: Hero;
	sourcebooks: Sourcebook[];
	onChangeName: (value: string) => void;
	onChangeFeature: (featureID: string, data: FeatureData) => void;
}

export const ControlledMonsterCustomizePanel = (props: Props) => {
	return (
		<ErrorBoundary>
			<Space orientation='vertical' style={{ width: '100%' }}>
				<div>
					<HeaderText>Name</HeaderText>
					<Space.Compact style={{ width: '100%' }}>
						<TextInput
							status={props.monster.name === '' ? 'warning' : ''}
							placeholder='Name'
							allowClear={true}
							value={props.monster.name}
							onChange={props.onChangeName}
						/>
						<NameSuggestions onSelect={props.onChangeName} />
					</Space.Compact>
				</div>
				{
					MonsterLogic.getFeatures(props.monster)
						.filter(FeatureLogic.isChoice)
						.map(feature => (
							<FeatureConfigPanel
								key={feature.id}
								feature={feature}
								hero={props.hero}
								sourcebooks={props.sourcebooks}
								setData={props.onChangeFeature}
							/>
						))
				}
			</Space>
		</ErrorBoundary>
	);
};
