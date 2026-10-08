import { Feature } from '@/models/feature';
import { FeatureListEditPanel } from '@/components/panels/edit/list-edit/list-edit-panel';
import { FeatureType } from '@/enums/feature-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Monster } from '@/models/monster';
import { MonsterEditPanel } from '@/components/panels/edit/monster-edit/monster-edit-panel';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Sourcebook } from '@/models/sourcebook';
import { Summon } from '@/models/summon';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';

interface Props {
	summon: Summon;
	sourcebooks: Sourcebook[];
	onChange: (summon: Summon) => void;
}

export const SummonEditPanel = (props: Props) => {
	const summon = props.summon;

	const setIsSignature = (value: boolean) => {
		const copy = Utils.copy(summon);
		copy.info.isSignature = value;
		props.onChange(copy);
	};

	const setCost = (value: number) => {
		const copy = Utils.copy(summon);
		copy.info.cost = value;
		props.onChange(copy);
	};

	const setCount = (value: number) => {
		const copy = Utils.copy(summon);
		copy.info.count = value;
		props.onChange(copy);
	};

	const setLevelFeatures = (level: 'level3' | 'level6' | 'level10', value: Feature[]) => {
		const copy = Utils.copy(summon);
		copy.info[level] = Utils.copy(value);
		props.onChange(copy);
	};

	const setMonster = (value: Monster) => {
		const copy = Utils.copy(summon);
		copy.monster = value;
		// The summon is named for its monster, as FactoryLogic.createSummon does
		copy.name = value.name;
		copy.description = value.description;
		props.onChange(copy);
	};

	return (
		<>
			<HeaderText>Summoning</HeaderText>
			<Toggle label='Is signature' value={summon.info.isSignature} onChange={setIsSignature} />
			<NumberSpin min={1} label='Cost' value={summon.info.cost} onChange={setCost} />
			<NumberSpin min={1} label='Count' value={summon.info.count} onChange={setCount} />
			<MonsterEditPanel
				monster={summon.monster}
				sourcebooks={props.sourcebooks}
				onChange={setMonster}
			/>
			<HeaderText>At Higher Levels</HeaderText>
			{
				([ 'level3', 'level6', 'level10' ] as const).map(lvl => (
					<FeatureListEditPanel
						key={lvl}
						title={`Level ${lvl.substring(5)}`}
						features={summon.info[lvl]}
						allowedTypes={[ FeatureType.Text, FeatureType.Ability, FeatureType.Bonus, FeatureType.ConditionImmunity, FeatureType.DamageModifier, FeatureType.Size ]}
						sourcebooks={props.sourcebooks}
						onChange={value => setLevelFeatures(lvl, value)}
					/>
				))
			}
		</>
	);
};
