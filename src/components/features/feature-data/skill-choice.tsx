import { Button, Drawer, Flex, Select, Space } from 'antd';
import { Feature, FeatureSkillChoiceData } from '@/models/feature';
import { CloseOutlined } from '@ant-design/icons';
import { Collections } from '@/utils/collections';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { SkillList } from '@/enums/skill-list';
import { SkillSelectModal } from '@/components/modals/select/skill-select/skill-select-modal';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureSkillChoiceData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoSkillChoice = (props: InfoProps) => {
	if (props.data.selected.length > 0) {
		return (
			<Field label='Skill' value={props.data.selected.join(', ')} />
		);
	}

	if (!props.feature.description) {
		const count = props.data.count || 1;

		let str = '';
		if (props.data.listOptions.length === 5) {
			str = (count > 1 ? `Choose ${count} skills.` : 'Choose a skill.');
		} else {
			const names = (Collections.sort(props.data.options, o => o) || []).concat((Collections.sort(props.data.listOptions, o => o) || []).map(l => `the ${l} list`)).join(', ');
			str = (count > 1 ? `Choose ${count} skills from ${names}.` : `Choose a skill from ${names}.`);
		}

		return (
			<div className='ds-text'>{str}</div>
		);
	}

	return null;
};

interface EditProps {
	data: FeatureSkillChoiceData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureSkillChoiceData) => void;
}

export const EditSkillChoice = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureSkillChoiceData>(Utils.copy(props.data));

	const setSkillOptions = (value: string[]) => {
		const copy = Utils.copy(data);
		copy.options = value;
		setData(copy);
		props.setData(copy);
	};

	const setSkillListOptions = (value: SkillList[]) => {
		const copy = Utils.copy(data);
		copy.listOptions = value;
		setData(copy);
		props.setData(copy);
	};

	const setCount = (value: number) => {
		const copy = Utils.copy(data);
		copy.count = value;
		setData(copy);
		props.setData(copy);
	};

	const setSkillSelected = (value: string[]) => {
		const copy = Utils.copy(data);
		copy.selected = value;
		setData(copy);
		props.setData(copy);
	};

	const skills = SourcebookLogic.getSkills(props.sourcebooks as Sourcebook[])
		.filter(skill => (data.options.includes(skill.name)) || (data.listOptions.includes(skill.list)));
	const distinctSkills = Collections.distinct(skills, s => s.name);
	const sortedSkills = Collections.sort(distinctSkills, s => s.name);

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Options</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Skills'
				allowClear={true}
				mode='multiple'
				options={SourcebookLogic.getSkills(props.sourcebooks).map(option => ({ value: option.name, description: option.description }))}
				optionRender={option => <Field label={option.data.value} value={option.data.description} />}
				value={data.options}
				onChange={setSkillOptions}
			/>
			<HeaderText>List Options</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Skill Lists'
				allowClear={true}
				mode='multiple'
				options={[ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ].map(option => ({ value: option }))}
				optionRender={option => <div className='ds-text'>{option.data.value}</div>}
				value={data.listOptions}
				onChange={setSkillListOptions}
			/>
			<HeaderText>Count</HeaderText>
			<NumberSpin min={1} value={data.count} onChange={setCount} />
			<HeaderText>Default Selection</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Selection'
				allowClear={true}
				mode='multiple'
				options={sortedSkills.map(option => ({ value: option.name }))}
				optionRender={option => <div className='ds-text'>{option.data.value}</div>}
				value={data.selected}
				onChange={setSkillSelected}
			/>
		</Space>
	);
};

interface ConfigProps {
	data: FeatureSkillChoiceData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureSkillChoiceData) => void;
}

export const ConfigSkillChoice = (props: ConfigProps) => {
	const [ skillSelectorOpen, setSkillSelectorOpen ] = useState<boolean>(false);

	const currentSkills = HeroLogic.getSkills(props.hero, props.sourcebooks).map(s => s.name);
	const skills = SourcebookLogic.getSkills(props.sourcebooks as Sourcebook[])
		.filter(skill => (props.data.options.includes(skill.name)) || (props.data.listOptions.includes(skill.list)))
		.filter(skill => !currentSkills.includes(skill.name));
	const distinctSkills = Collections.distinct(skills, s => s.name);
	const sortedSkills = Collections.sort(distinctSkills, s => s.name);

	const getAddButton = () => {
		// We can always add a custom skill, so we always show the Add button
		return (
			<Button className='status-warning' block={true} onClick={() => setSkillSelectorOpen(true)}>
				Choose a Skill
			</Button>
		);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{props.data.count > 1 ? <div className='ds-text'>Choose {props.data.count}:</div> : null}
			{
				props.data.selected.map((skill, n) => {
					const duplicated = props.hero && HeroLogic.getFeatures(props.hero)
						.map(f => f.feature)
						.filter(f => f.type === FeatureType.SkillChoice)
						.flatMap(f => f.data.selected)
						.filter(s => s === skill)
						.length > 1;

					const sk = SourcebookLogic.getSkill(skill, props.sourcebooks!);
					return (
						<Flex key={n} className='selection-box' align='center' justify='space-between' gap={10}>
							<Flex vertical={true}>
								{
									sk ?
										<Field label={sk.name} value={sk.description} style={{ flex: '1 1 0' }} />
										:
										<div className='ds-text' style={{ flex: '1 1 0' }}>{skill}</div>
								}
								{
									duplicated ?
										<Field danger={true} label='Duplicated' value='You already have this skill.' />
										: null
								}
							</Flex>
							<Flex vertical={true}>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Remove'
									icon={<CloseOutlined />}
									onClick={() => {
										const dataCopy = Utils.copy(props.data);
										dataCopy.selected = dataCopy.selected.filter(s => s !== skill);
										props.setData(dataCopy);
									}}
								/>
							</Flex>
						</Flex>
					);
				})
			}
			{(props.data.selected.length < props.data.count) || (props.data.count === -1) ? getAddButton() : null}
			<Drawer open={skillSelectorOpen} onClose={() => setSkillSelectorOpen(false)} closeIcon={null} size={500}>
				<SkillSelectModal
					skills={sortedSkills}
					sourcebooks={props.sourcebooks}
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
