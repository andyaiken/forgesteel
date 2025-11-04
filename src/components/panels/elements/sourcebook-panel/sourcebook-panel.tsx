import { Button, Flex, Input, Segmented, Select, Space } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, CheckCircleOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, PlusOutlined, ThunderboltOutlined, UploadOutlined } from '@ant-design/icons';
import { ReactNode, useState } from 'react';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { LanguageType } from '@/enums/language-type';
import { Markdown } from '@/components/controls/markdown/markdown';
import { MultiLine } from '@/components/controls/multi-line/multi-line';
import { NameGenerator } from '@/utils/name-generator';
import { SkillList } from '@/enums/skill-list';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { Utils } from '@/utils/utils';

import './sourcebook-panel.scss';

const getSourcebookContent = (sourcebook: Sourcebook) => {
	const elementCount = SourcebookLogic.getElements(sourcebook).length;
	return (
		<>
			<Markdown text={sourcebook.description} />
			{
				elementCount < 3 ?
					<div className='ds-text'>
						{elementCount} elements
					</div>
					:
					<div className='ds-text'>
						{elementCount} elements, including {SourcebookLogic.getExampleContent(sourcebook).join(', ')}
					</div>
			}
		</>
	);
};

interface Props {
	sourcebook: Sourcebook;
}

export const SourcebookPanel = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='sourcebook-panel' id={props.sourcebook.id}>
				<HeaderText
					tags={[ props.sourcebook.type ]}
				>
					{props.sourcebook.name || 'Unnamed Sourcebook'}
				</HeaderText>
				{getSourcebookContent(props.sourcebook)}
			</div>
		</ErrorBoundary>
	);
};

interface EditorProps {
	sourcebook: Sourcebook;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	visible: boolean;
	onSetVisible: (sourcebook: Sourcebook, visible: boolean) => void;
	onChange: (sourcebook: Sourcebook) => void;
	onDelete: (sourcebook: Sourcebook) => void;
}

export const SourcebookEditorPanel = (props: EditorProps) => {
	const [ sourcebook, setSourcebook ] = useState<Sourcebook>(Utils.copy(props.sourcebook));
	const [ isEditing, setIsEditing ] = useState<boolean>(false);

	let content: ReactNode = null;
	const buttons: ReactNode[] = [];

	if (isEditing) {
		const languages = SourcebookLogic.getLanguages(props.sourcebooks as Sourcebook[]);
		const distinctLanguages = Collections.distinct(languages, l => l.name);
		const sortedLanguages = Collections.sort(distinctLanguages, l => l.name);

		const setName = (value: string) => {
			const copy = Utils.copy(sourcebook);
			copy.name = value;
			setSourcebook(copy);
			props.onChange(copy);
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(sourcebook);
			copy.description = value;
			setSourcebook(copy);
			props.onChange(copy);
		};

		const addLanguage = () => {
			const copy = Utils.copy(sourcebook);
			copy.languages.push({ name: '', description: '', type: LanguageType.Cultural, related: [] });
			setSourcebook(copy);
			props.onChange(copy);
		};

		const deleteLanguage = (index: number) => {
			const copy = Utils.copy(sourcebook);
			copy.languages.splice(index, 1);
			setSourcebook(copy);
			props.onChange(copy);
		};

		const moveLanguage = (index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(sourcebook);
			copy.languages = Collections.move(copy.languages, index, direction);
			setSourcebook(copy);
			props.onChange(copy);
		};

		const setLanguageName = (index: number, value: string) => {
			const copy = Utils.copy(sourcebook);
			copy.languages[index].name = value;
			setSourcebook(copy);
			props.onChange(copy);
		};

		const setLanguageDescription = (index: number, value: string) => {
			const copy = Utils.copy(sourcebook);
			copy.languages[index].description = value;
			setSourcebook(copy);
			props.onChange(copy);
		};

		const setLanguageType = (index: number, value: LanguageType) => {
			const copy = Utils.copy(sourcebook);
			copy.languages[index].type = value;
			setSourcebook(copy);
			props.onChange(copy);
		};

		const setLanguageRelated = (index: number, value: string[]) => {
			const copy = Utils.copy(sourcebook);
			copy.languages[index].related = value;
			setSourcebook(copy);
			props.onChange(copy);
		};

		const addSkill = () => {
			const copy = Utils.copy(sourcebook);
			copy.skills.push({ name: '', description: '', list: SkillList.Crafting });
			setSourcebook(copy);
			props.onChange(copy);
		};

		const deleteSkill = (index: number) => {
			const copy = Utils.copy(sourcebook);
			copy.skills.splice(index, 1);
			setSourcebook(copy);
			props.onChange(copy);
		};

		const moveSkill = (index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(sourcebook);
			copy.skills = Collections.move(copy.skills, index, direction);
			setSourcebook(copy);
			props.onChange(copy);
		};

		const setSkillName = (index: number, value: string) => {
			const copy = Utils.copy(sourcebook);
			copy.skills[index].name = value;
			setSourcebook(copy);
			props.onChange(copy);
		};

		const setSkillDescription = (index: number, value: string) => {
			const copy = Utils.copy(sourcebook);
			copy.skills[index].description = value;
			setSourcebook(copy);
			props.onChange(copy);
		};

		const setSkillList = (index: number, value: SkillList) => {
			const copy = Utils.copy(sourcebook);
			copy.skills[index].list = value;
			setSourcebook(copy);
			props.onChange(copy);
		};

		content = (
			<Space direction='vertical' style={{ width: '100%', paddingBottom: '5px' }}>
				<Input
					status={sourcebook.name === '' ? 'warning' : ''}
					placeholder='Name'
					allowClear={true}
					addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
					value={sourcebook.name}
					onChange={e => setName(e.target.value)}
				/>
				<Expander title='Description'>
					<HeaderText>Description</HeaderText>
					<MultiLine value={sourcebook.description} onChange={setDescription} />
				</Expander>
				<Expander title='Languages'>
					<HeaderText
						extra={<Button type='text' icon={<PlusOutlined />} onClick={addLanguage} />}
					>
						Languages
					</HeaderText>
					<Space direction='vertical' style={{ width: '100%' }}>
						{
							sourcebook.languages.map((lang, n) => (
								<Expander
									key={n}
									title={lang.name || 'Unnamed Language'}
									extra={[
										<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveLanguage(n, 'up'); }} />,
										<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveLanguage(n, 'down'); }} />,
										<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteLanguage(n); }} />
									]}
								>
									<Space direction='vertical' style={{ width: '100%' }}>
										<Input
											status={lang.name === '' ? 'warning' : ''}
											placeholder='Name'
											allowClear={true}
											addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setLanguageName(n, NameGenerator.generateName())} />}
											value={lang.name}
											onChange={e => setLanguageName(n, e.target.value)}
										/>
										<MultiLine placeholder='Description' value={lang.description} onChange={value => setLanguageDescription(n, value)} />
										<Segmented
											block={true}
											options={[ LanguageType.Common, LanguageType.Regional, LanguageType.Cultural, LanguageType.Dead ]}
											value={lang.type}
											onChange={value => setLanguageType(n, value)}
										/>
										<Select
											style={{ width: '100%' }}
											mode='multiple'
											allowClear={true}
											placeholder='Select related languages'
											options={sortedLanguages.filter(l => l.name !== lang.name).map(l => ({ label: l.name, value: l.name, desc: l.description }))}
											optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
											showSearch={true}
											filterOption={(input, option) => {
												const strings = option ?
													[
														option.label,
														option.desc
													]
													: [];
												return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
											}}
											value={lang.related}
											onChange={value => setLanguageRelated(n, value)}
										/>
									</Space>
								</Expander>
							))
						}
						{
							sourcebook.languages.length === 0 ?
								<Empty />
								: null
						}
					</Space>
				</Expander>
				<Expander title='Skills'>
					<HeaderText
						extra={<Button type='text' icon={<PlusOutlined />} onClick={addSkill} />}
					>
						Skills
					</HeaderText>
					<Space direction='vertical' style={{ width: '100%' }}>
						{
							sourcebook.skills.map((skill, n) => (
								<Expander
									key={n}
									title={skill.name || 'Unnamed Skill'}
									extra={[
										<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSkill(n, 'up'); }} />,
										<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSkill(n, 'down'); }} />,
										<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteSkill(n); }} />
									]}
								>
									<Space direction='vertical' style={{ width: '100%' }}>
										<Input
											status={skill.name === '' ? 'warning' : ''}
											placeholder='Name'
											allowClear={true}
											addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setSkillName(n, NameGenerator.generateName())} />}
											value={skill.name}
											onChange={e => setSkillName(n, e.target.value)}
										/>
										<MultiLine placeholder='Description' value={skill.description} onChange={value => setSkillDescription(n, value)} />
										<Select
											style={{ width: '100%' }}
											placeholder='Skill List'
											options={[ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ].map(option => ({ value: option }))}
											optionRender={option => <div className='ds-text'>{option.data.value}</div>}
											value={skill.list}
											onChange={list => setSkillList(n, list)}
										/>
									</Space>
								</Expander>
							))
						}
						{
							sourcebook.skills.length === 0 ?
								<Empty />
								: null
						}
					</Space>
				</Expander>
			</Space>
		);

		if (sourcebook.type === SourcebookType.Homebrew) {
			buttons.push(
				<Button key='save' type='text' title='OK' icon={<CheckCircleOutlined />} onClick={() => setIsEditing(false)} />
			);
		}
	} else {
		content = getSourcebookContent(props.sourcebook);

		buttons.push(
			<Button key='show-hide' type='text' title='Show / Hide' icon={props.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />} onClick={() => props.onSetVisible(sourcebook, !props.visible)} />
		);
		if (sourcebook.type === SourcebookType.Homebrew) {
			buttons.push(
				<Button key='edit' type='text' title='Edit' icon={<EditOutlined />} onClick={() => setIsEditing(true)} />
			);
			buttons.push(
				<Button key='export' type='text' title='Export' icon={<UploadOutlined />} onClick={() => Utils.export([ sourcebook.id ], sourcebook.name || 'Unnamed Sourcebook', sourcebook, 'sourcebook', 'json')} />
			);
			buttons.push(
				<DangerButton key='delete' disabled={props.heroes.some(h => h.settingIDs.includes(sourcebook.id))} mode='clear' onConfirm={() => props.onDelete(sourcebook)} />
			);
		}
	}

	return (
		<ErrorBoundary>
			<div className='sourcebook-panel' id={sourcebook.id}>
				<HeaderText
					tags={[ sourcebook.type ]}
					extra={<Flex>{buttons}</Flex>}
				>
					{sourcebook.name || 'Unnamed Sourcebook'}
				</HeaderText>
				{content}
			</div>
		</ErrorBoundary>
	);
};
