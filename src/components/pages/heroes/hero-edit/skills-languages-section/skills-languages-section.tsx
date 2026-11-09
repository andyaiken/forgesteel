import { Alert, Flex, Space, Tag } from 'antd';
import { ChoiceAssignmentLogic, ChoiceSlot } from '@/logic/choice-assignment-logic';
import { Feature, FeatureData, FeatureLanguageChoice, FeatureSkillChoice } from '@/models/feature';
import { SelectionLogic, SelectionWarnings } from '@/logic/selection-logic';
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
	warnings: SelectionWarnings;
	allowAnySkills: boolean;
	allowAnyLanguages: boolean;
	setAllowAnySkills: (value: boolean) => void;
	setAllowAnyLanguages: (value: boolean) => void;
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
	const allSkillFeatures = features
		.map(f => ({ feature: f.feature as Feature, source: f.source }))
		.filter(f => f.feature.type === FeatureType.SkillChoice) as { feature: FeatureSkillChoice, source: string }[];

	const allSkillSlots = SelectionLogic.getSkillSlots(allSkillFeatures.map(f => f.feature), allSkills);
	const skillFeatures = allSkillFeatures.filter(f => f.feature.data.selectAt === 'build');
	const skillSlots = allSkillSlots.filter(slot => skillFeatures.some(f => f.feature.id === slot.id));
	const unsupportedSkills = props.warnings.skills;
	const skillWarning = unsupportedSkills.length > 0 && !props.allowAnySkills ?
		<Alert
			type='warning'
			showIcon={true}
			title='One or more selected skills are outside the default options. These choices require your Director’s approval.'
			description={unsupportedSkills.join(', ')}
		/>
		: null;
	const skillSources = Object.fromEntries(skillFeatures.map(f => [ f.feature.id, f.source ]));
	const skillItems: ChoiceItem[] = allSkills
		.filter(s => props.allowAnySkills || skillSlots.some(slot => slot.accepts(s.name) || slot.selected.includes(s.name)) || knownSkills.includes(s.name))
		.map(s => ({ name: s.name, description: s.description, group: s.list }));
	[ ...skillSlots.flatMap(slot => slot.selected), ...knownSkills ]
		.filter((name, index, names) => names.indexOf(name) === index && !skillItems.some(item => item.name === name))
		.forEach(name => skillItems.push({ name, description: '', group: SkillList.Custom }));
	const skillGroups = [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore, SkillList.Custom ] as string[];

	// Languages
	const allLanguageFeatures = features
		.map(f => ({ feature: f.feature as Feature, source: f.source }))
		.filter(f => f.feature.type === FeatureType.LanguageChoice) as { feature: FeatureLanguageChoice, source: string }[];

	const allLanguageSlots = SelectionLogic.getLanguageSlots(allLanguageFeatures.map(f => f.feature), allLanguages);
	const languageFeatures = allLanguageFeatures.filter(f => f.feature.data.selectAt === 'build');
	const languageSlots = allLanguageSlots.filter(slot => languageFeatures.some(f => f.feature.id === slot.id));
	const unsupportedLanguages = props.warnings.languages;
	const languageWarning = unsupportedLanguages.length > 0 && !props.allowAnyLanguages ?
		<Alert
			type='warning'
			showIcon={true}
			title='One or more selected languages are outside the default options. These choices require your Director’s approval.'
			description={unsupportedLanguages.join(', ')}
		/>
		: null;
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
	// Include named options even when they aren't in the sourcebooks' language catalog.
	const languageItems: ChoiceItem[] = allLanguages
		.filter(l => props.allowAnyLanguages || knownLanguages.includes(l.name) || languageSlots.some(slot => slot.accepts(l.name) || slot.selected.includes(l.name)))
		.map(l => ({ name: l.name, description: l.description, group: l.type }));
	[ ...knownLanguages, ...languageFeatures.flatMap(f => f.feature.data.options), ...languageSlots.flatMap(slot => slot.selected) ]
		.filter((name, index, names) => names.indexOf(name) === index && !languageItems.some(i => i.name === name))
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
					<Toggle label='Allow any skill (Consult with Director)' value={props.allowAnySkills} onChange={props.setAllowAnySkills} />
					{skillWarning}
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
					<Toggle label='Allow any language (Consult with Director)' value={props.allowAnyLanguages} onChange={props.setAllowAnyLanguages} />
					{languageWarning}
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
					<Toggle label='Allow any skill (Consult with Director)' value={props.allowAnySkills} onChange={props.setAllowAnySkills} />
					{skillWarning}
					<ChoiceGroups
						title='Skills'
						allowAny={props.allowAnySkills}
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
					<Toggle label='Allow any language (Consult with Director)' value={props.allowAnyLanguages} onChange={props.setAllowAnyLanguages} />
					{languageWarning}
					<ChoiceGroups
						title='Languages'
						allowAny={props.allowAnyLanguages}
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
	allowAny: boolean;
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
											ChoiceAssignmentLogic.selectWithOverride(props.slots, item.name, props.allowAny);
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
