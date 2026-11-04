import { ChoiceAssignmentLogic, ChoiceSlot } from '@/logic/choice-assignment-logic';
import { Feature, FeatureData, FeatureLanguageChoice, FeatureSkillChoice } from '@/models/feature';
import { Flex, Space, Tag } from 'antd';
import { CheckIcon } from '@/components/controls/check-icon/check-icon';
import { Empty } from '@/components/controls/empty/empty';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureConfigPanel } from '@/components/panels/feature-config-panel/feature-config-panel';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureType } from '@/enums/feature-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { LanguageType } from '@/enums/language-type';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SkillList } from '@/enums/skill-list';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Toggle } from '@/components/controls/toggle/toggle';
import { useState } from 'react';

import './skills-languages-section.scss';

interface ChoiceItem {
	name: string;
	description: string;
	group: string;
}

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	setFeaturesData: (updates: { featureID: string, data: FeatureData }[]) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

export const SkillsLanguagesSection = (props: Props) => {
	const [ advanced, setAdvanced ] = useState<boolean>(false);

	const features = HeroLogic.getFeatures(props.hero);

	const allSkills = SourcebookLogic.getSkills(props.sourcebooks);
	const allLanguages = SourcebookLogic.getLanguages(props.sourcebooks);
	const cancelledSkills = HeroLogic.getCancelledSkillNames(props.hero);
	const knownSkills = features
		.map(f => f.feature)
		.flatMap(f => {
			if (f.type === FeatureType.SkillChoice && f.data.selectAt !== 'build') {
				return f.data.selected;
			}
			return [];
		});

	// Skills
	const skillFeatures = features
		.map(f => ({ feature: f.feature as Feature, source: f.source }))
		.filter(f => f.feature.type === FeatureType.SkillChoice && f.feature.data.selectAt === 'build') as { feature: FeatureSkillChoice, source: string }[];

	const skillSlots: ChoiceSlot[] = skillFeatures.map(f => {
		const data = f.feature.data;
		const accepts = (name: string) => {
			if (data.options.includes(name)) {
				return true;
			}
			const skill = allSkills.find(s => s.name === name);
			return !!skill && data.listOptions.includes(skill.list);
		};
		return {
			id: f.feature.id,
			capacity: data.count,
			selected: data.selected,
			rank: allSkills.filter(s => accepts(s.name)).length + data.options.filter(o => !allSkills.some(s => s.name === o)).length,
			accepts: accepts
		};
	});
	const skillSources = Object.fromEntries(skillFeatures.map(f => [ f.feature.id, f.source ]));
	const skillItems: ChoiceItem[] = allSkills
		.filter(s => skillSlots.some(slot => slot.accepts(s.name)))
		.map(s => ({ name: s.name, description: s.description, group: s.list }));
	const skillGroups = [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore, SkillList.Custom ] as string[];

	// Languages
	const languageFeatures = features
		.map(f => ({ feature: f.feature as Feature, source: f.source }))
		.filter(f => f.feature.type === FeatureType.LanguageChoice && f.feature.data.selectAt === 'build') as { feature: FeatureLanguageChoice, source: string }[];

	const languageSlots: ChoiceSlot[] = languageFeatures.map(f => {
		const data = f.feature.data;
		const accepts = (name: string) => {
			const language = allLanguages.find(l => l.name === name);
			return !!language && data.allowedTypes.includes(language.type);
		};
		return {
			id: f.feature.id,
			capacity: data.count,
			selected: data.selected,
			rank: allLanguages.filter(l => accepts(l.name)).length,
			accepts: accepts
		};
	});
	const languageSources = Object.fromEntries(languageFeatures.map(f => [ f.feature.id, f.source ]));
	const knownLanguages = features
		.map(f => f.feature)
		.flatMap(f => {
			if (f.type === FeatureType.Language) {
				return [ f.data.language ];
			}
			if (f.type === FeatureType.LanguageChoice && f.data.selectAt !== 'build') {
				return f.data.selected;
			}
			return [];
		});
	// Granted languages are always listed, even if no choice feature could pick them
	const languageItems: ChoiceItem[] = allLanguages
		.filter(l => knownLanguages.includes(l.name) || languageSlots.some(slot => slot.accepts(l.name)))
		.map(l => ({ name: l.name, description: l.description, group: l.type }));
	knownLanguages
		.filter(name => !languageItems.some(i => i.name === name))
		.forEach(name => languageItems.push({ name: name, description: '', group: LanguageType.Custom }));
	const languageGroups = [ LanguageType.Common, LanguageType.Regional, LanguageType.Cultural, LanguageType.Dead, LanguageType.Custom ] as string[];

	const applySelections = (slots: ChoiceSlot[], features: { feature: FeatureSkillChoice | FeatureLanguageChoice }[], selections: Record<string, string[]>) => {
		const updates: { featureID: string, data: FeatureData }[] = [];
		slots.forEach(slot => {
			const next = selections[slot.id];
			const feature = features.find(f => f.feature.id === slot.id);
			if (feature && next && (next.length !== slot.selected.length || next.some((n, i) => n !== slot.selected[i]))) {
				updates.push({ featureID: slot.id, data: { ...feature.feature.data, selected: next } });
			}
		});
		if (updates.length > 0) {
			props.setFeaturesData(updates);
		}
	};

	let content;

	if (advanced) {
		const allFeatures = features.map(f => f.feature);
		const advancedLanguages = allFeatures
			.filter(f => f.type === FeatureType.LanguageChoice)
			.map(f => FactoryLogic.feature.createLanguageChoice({
				id: f.id,
				name: f.name || 'Language',
				options: [ ...f.data.options ],
				allowedTypes: [ ...f.data.allowedTypes ],
				count: f.data.count,
				selected: [ ...f.data.selected ]
			}));
		const advancedSkills = allFeatures
			.filter(f => f.type === FeatureType.SkillChoice)
			.map(f => FactoryLogic.feature.createSkillChoice({
				id: f.id,
				name: 'Skill',
				options: [ ...f.data.options ],
				listOptions: [ ...f.data.listOptions ],
				count: f.data.count,
				selected: [ ...f.data.selected ]
			}));
		const languagesDone = advancedLanguages.every(f => FeatureLogic.isChosen(f, props.hero, props.sourcebooks));
		const skillsDone = advancedSkills.every(f => FeatureLogic.isChosen(f, props.hero, props.sourcebooks));

		content = (
			<div className='hero-edit-content skills-languages-section'>
				<div className='hero-edit-content-column selected' id='skill-selections'>
					<HeaderText
						level={1}
						extra={
							skillsDone ? <CheckIcon state='success' /> : null
						}
					>
						Skills
					</HeaderText>
					{
						advancedSkills.map(f => (
							<FeatureConfigPanel
								key={f.id}
								feature={f}
								hero={props.hero}
								sourcebooks={props.sourcebooks}
								setData={props.setFeatureData}
							/>
						))
					}
					{advancedSkills.length === 0 ? <Empty /> : null}
				</div>
				<div className='hero-edit-content-column selected' id='language-selections'>
					<HeaderText
						level={1}
						extra={
							languagesDone ? <CheckIcon state='success' /> : null
						}
					>
						Languages
					</HeaderText>
					{
						advancedLanguages.map(f => (
							<FeatureConfigPanel
								key={f.id}
								feature={f}
								hero={props.hero}
								sourcebooks={props.sourcebooks}
								setData={props.setFeatureData}
							/>
						))
					}
					{advancedLanguages.length === 0 ? <Empty /> : null}
				</div>
			</div>
		);
	} else {
		content = (
			<div className='hero-edit-content skills-languages-section'>
				<div className='hero-edit-content-column selected' id='skill-selections'>
					<ChoiceGroups
						title='Skills'
						slots={skillSlots}
						slotSources={skillSources}
						items={skillItems}
						groups={skillGroups}
						disabledNames={cancelledSkills}
						knownNames={knownSkills}
						onChange={selections => applySelections(skillSlots, skillFeatures, selections)}
					/>
				</div>
				<div className='hero-edit-content-column selected' id='language-selections'>
					<ChoiceGroups
						title='Languages'
						slots={languageSlots}
						slotSources={languageSources}
						items={languageItems}
						groups={languageGroups}
						disabledNames={[]}
						knownNames={knownLanguages}
						onChange={selections => applySelections(languageSlots, languageFeatures, selections)}
					/>
				</div>
			</div>
		);
	}

	return (
		<>
			{content}
			<Toggle label='Advanced' value={advanced} onChange={setAdvanced} />
		</>
	);
};

interface ChoiceGroupsProps {
	title: string;
	slots: ChoiceSlot[];
	slotSources: Record<string, string>;
	items: ChoiceItem[];
	groups: string[];
	disabledNames: string[];
	knownNames: string[];
	onChange: (selections: Record<string, string[]>) => void;
}

const ChoiceGroups = (props: ChoiceGroupsProps) => {
	const total = props.slots.reduce((sum, s) => sum + Math.max(s.capacity, 0), 0);
	const chosen = props.slots.reduce((sum, s) => sum + s.selected.length, 0);
	const unlimited = props.slots.some(s => s.capacity === -1);
	const done = props.slots.every(s => s.capacity === -1 || s.selected.length >= s.capacity);
	const selectedNames = props.slots.flatMap(s => s.selected);

	if (props.slots.length === 0) {
		return (
			<SelectablePanel>
				<HeaderText>{props.title}</HeaderText>
				<Empty />
			</SelectablePanel>
		);
	}

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText
				level={1}
				extra={
					<Space>
						{unlimited ? `${chosen} chosen` : `${chosen} of ${total}`}
						{done ? <CheckIcon state='success' /> : null}
					</Space>
				}
			>
				{props.title}
			</HeaderText>
			{
				props.groups.map(group => {
					const subset = props.items.filter(i => i.group === group);
					if (subset.length === 0) {
						return null;
					}

					return (
						<div key={group}>
							<HeaderText>{group}</HeaderText>
							<Flex gap={4} wrap={true}>
								{
									subset.map(item => {
										const known = props.knownNames.includes(item.name);
										const isSelected = selectedNames.includes(item.name);
										const placement = (known || isSelected || props.disabledNames.includes(item.name)) ?
											null
											:
											ChoiceAssignmentLogic.select(props.slots, item.name);
										const disabled = !known && !isSelected && !placement;

										return (
											<span key={item.name} title={item.description}>
												<Tag.CheckableTag
													checked={isSelected || known}
													style={disabled ? { opacity: 0.5, cursor: 'not-allowed' } : (known && !isSelected ? { cursor: 'default' } : undefined)}
													onChange={() => {
														if (disabled) {
															return;
														}
														if (isSelected) {
															props.onChange(ChoiceAssignmentLogic.deselect(props.slots, item.name));
														} else if (known) {
															return;
														} else if (placement) {
															props.onChange(placement);
														}
													}}
												>
													{item.name}
												</Tag.CheckableTag>
											</span>
										);
									})
								}
							</Flex>
						</div>
					);
				})
			}
		</Space>
	);
};
