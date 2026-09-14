import { Button, Drawer, Segmented, Space } from 'antd';
import { Feature, FeatureSkillCancelChoiceData } from '@/models/feature';
import { Collections } from '@/utils/collections';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { SelectionBox } from '@/components/panels/feature-config-panel/feature-config-panel';
import { SkillSelectModal } from '@/components/modals/select/skill-select/skill-select-modal';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureSkillCancelChoiceData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
}

export const InfoSkillCancelChoice = (props: InfoProps) => {
	if (props.data.selected.length > 0) {
		return (
			<Field label='Lost Skill' value={<s>{props.data.selected.join(', ')}</s>} />
		);
	}

	return null;
};

interface EditProps {
	data: FeatureSkillCancelChoiceData;
	sourcebooks: Sourcebook[];
	setData: (data: FeatureSkillCancelChoiceData) => void;
}

export const EditSkillCancelChoice = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureSkillCancelChoiceData>(Utils.copy(props.data));

	const setKnownSkillsOnly = (value: boolean) => {
		const copy = Utils.copy(data);
		copy.knownSkillsOnly = value;
		copy.selected = [];
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
			<HeaderText>Options</HeaderText>
			<Segmented
				block={true}
				options={[
					{ value: true, label: 'A skill you have' },
					{ value: false, label: 'Any skill' }
				]}
				value={data.knownSkillsOnly}
				onChange={setKnownSkillsOnly}
			/>
			<HeaderText>Count</HeaderText>
			<NumberSpin min={1} value={data.count} onChange={setCount} />
		</Space>
	);
};

interface ConfigProps {
	data: FeatureSkillCancelChoiceData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	setData: (data: FeatureSkillCancelChoiceData) => void;
}

export const ConfigSkillCancelChoice = (props: ConfigProps) => {
	const [ skillSelectorOpen, setSkillSelectorOpen ] = useState<boolean>(false);

	// Skills which have already been cancelled - by this feature or any other - can't be chosen again
	const cancelledSkills = HeroLogic.getCancelledSkillNames(props.hero);
	const skills = (props.data.knownSkillsOnly ? HeroLogic.getSkills(props.hero, props.sourcebooks) : SourcebookLogic.getSkills(props.sourcebooks))
		.filter(skill => !cancelledSkills.includes(skill.name));
	const distinctSkills = Collections.distinct(skills, s => s.name);
	const sortedSkills = Collections.sort(distinctSkills, s => s.name);

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{
				props.data.selected.map((skill, n) => {
					const sk = SourcebookLogic.getSkill(skill, props.sourcebooks);
					return (
						<SelectionBox
							key={n}
							content={
								sk ?
									<Field label={<s>{sk.name}</s>} value={sk.description} style={{ flex: '1 1 0' }} />
									:
									<div className='ds-text' style={{ flex: '1 1 0' }}><s>{skill}</s></div>
							}
							onRemove={() => {
								const dataCopy = Utils.copy(props.data);
								dataCopy.selected = dataCopy.selected.filter(s => s !== skill);
								props.setData(dataCopy);
							}}
						/>
					);
				})
			}
			{
				(props.data.selected.length < props.data.count) || (props.data.count === -1) ?
					<Button
						className='status-warning'
						block={true}
						disabled={props.data.knownSkillsOnly && (sortedSkills.length === 0)}
						onClick={() => setSkillSelectorOpen(true)}
					>
						Choose a Skill to Lose
					</Button>
					: null
			}
			<Drawer open={skillSelectorOpen} onClose={() => setSkillSelectorOpen(false)} closeIcon={null} size={500}>
				<SkillSelectModal
					skills={sortedSkills}
					sourcebooks={props.sourcebooks}
					restrictToSkills={props.data.knownSkillsOnly}
					excludeSkills={cancelledSkills}
					onSelect={s => {
						setSkillSelectorOpen(false);

						const dataCopy = Utils.copy(props.data);
						dataCopy.selected.push(s.name);
						props.setData(dataCopy);
					}}
					onClose={() => setSkillSelectorOpen(false)}
				/>
			</Drawer>
		</Space>
	);
};
