import { Button, Segmented, Select, Space, Tabs } from 'antd';
import { ButtonConfig, ButtonGroup, DangerConfig } from '@/components/controls/button-group/button-group';
import { CaretDownOutlined, CaretUpOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Markdown, MarkdownEditor } from '@/components/controls/markdown/markdown';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Element } from '@/models/element';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { Field } from '@/components/controls/field/field';
import { Format } from '@/utils/format';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { LanguageType } from '@/enums/language-type';
import { NameDescEditPanel } from '../../edit/name-desc-edit/name-desc-edit-panel';
import { NameSuggestions } from '@/components/panels/name-suggestions/name-suggestions';
import { PanelMode } from '@/enums/panel-mode';
import { SkillList } from '@/enums/skill-list';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Utils } from '@/utils/utils';
import { useHeroes } from '@/contexts/data-context';
import { useState } from 'react';

import './sourcebook-panel.scss';

interface Props {
	sourcebook: Sourcebook;
	sourcebooks: Sourcebook[];
	visibility?: {
		visible: boolean;
		onSetVisibility: (value: boolean) => void;
	};
	mode?: PanelMode;
	showEditButtons?: boolean;
	onChange?: (sourcebook: Sourcebook) => void;
	onDelete?: (sourcebook: Sourcebook) => void;
}

export const SourcebookPanel = (props: Props) => {
	const [ sourcebook, setSourcebook ] = useState<Sourcebook>(Utils.copy(props.sourcebook));
	const [ isEditing, setIsEditing ] = useState<boolean>(false);
	const allHeroes = useHeroes();

	const getContent = () => {
		if (props.onChange && isEditing) {
			const languages = SourcebookLogic.getLanguages(props.sourcebooks as Sourcebook[]);
			const distinctLanguages = Collections.distinct(languages, l => l.name);
			const sortedLanguages = Collections.sort(distinctLanguages, l => l.name);

			const setNameAndDescription = (name: string, desc: string) => {
				const copy = Utils.copy(sourcebook);
				copy.name = name;
				copy.description = desc;
				setSourcebook(copy);
				props.onChange!(copy);
			};

			const addLanguage = () => {
				const copy = Utils.copy(sourcebook);
				copy.languages.push({ name: '', description: '', type: LanguageType.Cultural, related: [] });
				setSourcebook(copy);
				props.onChange!(copy);
			};

			const deleteLanguage = (index: number) => {
				const copy = Utils.copy(sourcebook);
				copy.languages.splice(index, 1);
				setSourcebook(copy);
				props.onChange!(copy);
			};

			const moveLanguage = (index: number, direction: 'up' | 'down') => {
				const copy = Utils.copy(sourcebook);
				copy.languages = Collections.move(copy.languages, index, direction);
				setSourcebook(copy);
				props.onChange!(copy);
			};

			const setLanguageName = (index: number, value: string) => {
				const copy = Utils.copy(sourcebook);
				copy.languages[index].name = value;
				setSourcebook(copy);
				props.onChange!(copy);
			};

			const setLanguageDescription = (index: number, value: string) => {
				const copy = Utils.copy(sourcebook);
				copy.languages[index].description = value;
				setSourcebook(copy);
				props.onChange!(copy);
			};

			const setLanguageType = (index: number, value: LanguageType) => {
				const copy = Utils.copy(sourcebook);
				copy.languages[index].type = value;
				setSourcebook(copy);
				props.onChange!(copy);
			};

			const setLanguageRelated = (index: number, value: string[]) => {
				const copy = Utils.copy(sourcebook);
				copy.languages[index].related = value;
				setSourcebook(copy);
				props.onChange!(copy);
			};

			const addSkill = () => {
				const copy = Utils.copy(sourcebook);
				copy.skills.push({ name: '', description: '', list: SkillList.Crafting });
				setSourcebook(copy);
				props.onChange!(copy);
			};

			const deleteSkill = (index: number) => {
				const copy = Utils.copy(sourcebook);
				copy.skills.splice(index, 1);
				setSourcebook(copy);
				props.onChange!(copy);
			};

			const moveSkill = (index: number, direction: 'up' | 'down') => {
				const copy = Utils.copy(sourcebook);
				copy.skills = Collections.move(copy.skills, index, direction);
				setSourcebook(copy);
				props.onChange!(copy);
			};

			const setSkillName = (index: number, value: string) => {
				const copy = Utils.copy(sourcebook);
				copy.skills[index].name = value;
				setSourcebook(copy);
				props.onChange!(copy);
			};

			const setSkillDescription = (index: number, value: string) => {
				const copy = Utils.copy(sourcebook);
				copy.skills[index].description = value;
				setSourcebook(copy);
				props.onChange!(copy);
			};

			const setSkillList = (index: number, value: SkillList) => {
				const copy = Utils.copy(sourcebook);
				copy.skills[index].list = value;
				setSourcebook(copy);
				props.onChange!(copy);
			};

			return (
				<Space orientation='vertical' style={{ width: '100%', paddingBottom: '5px' }} onClick={e => e.stopPropagation()}>
					<Tabs
						items={[
							{
								key: 'sourcebook',
								label: 'Sourcebook',
								children: (
									<NameDescEditPanel
										element={sourcebook}
										showNameGenerator={true}
										onChange={setNameAndDescription}
									/>
								)
							},
							{
								key: 'languages',
								label: 'Languages',
								children: (
									<Space orientation='vertical' style={{ width: '100%' }}>
										<HeaderText
											extra={<Button type='text' icon={<PlusOutlined />} onClick={addLanguage} />}
										>
											Languages
										</HeaderText>
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
													<Space orientation='vertical' style={{ width: '100%' }}>
														<Space.Compact style={{ width: '100%' }}>
															<TextInput
																status={lang.name === '' ? 'warning' : ''}
																placeholder='Name'
																allowClear={true}
																value={lang.name}
																onChange={value => setLanguageName(n, value)}
															/>
															<NameSuggestions onSelect={value => setLanguageName(n, value)} />
														</Space.Compact>
														<MarkdownEditor placeholder='Description' value={lang.description} onChange={value => setLanguageDescription(n, value)} />
														<Segmented
															block={true}
															options={[ LanguageType.Common, LanguageType.Regional, LanguageType.Cultural, LanguageType.Dead ]}
															value={lang.type}
															onChange={value => setLanguageType(n, value)}
														/>
														<Select
															style={{ width: '100%' }}
															mode='tags'
															allowClear={true}
															placeholder='Select related languages'
															options={sortedLanguages.filter(l => l.name !== lang.name).map(l => ({ label: l.name, value: l.name, desc: l.description }))}
															optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
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
								)
							},
							{
								key: 'skills',
								label: 'Skills',
								children: (
									<Space orientation='vertical' style={{ width: '100%' }}>
										<HeaderText
											extra={<Button type='text' icon={<PlusOutlined />} onClick={addSkill} />}
										>
											Skills
										</HeaderText>
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
													<Space orientation='vertical' style={{ width: '100%' }}>
														<Space.Compact style={{ width: '100%' }}>
															<TextInput
																status={skill.name === '' ? 'warning' : ''}
																placeholder='Name'
																allowClear={true}
																value={skill.name}
																onChange={value => setSkillName(n, value)}
															/>
															<NameSuggestions onSelect={value => setSkillName(n, value)} />
														</Space.Compact>
														<MarkdownEditor placeholder='Description' value={skill.description} onChange={value => setSkillDescription(n, value)} />
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
								)
							}
						]}
					/>
				</Space>
			);
		}

		if (props.mode !== PanelMode.Full) {
			const elementCount = SourcebookLogic.getElements(sourcebook).length;

			return (
				<>
					<Markdown text={sourcebook.description} />
					{
						elementCount > 3 ?
							<div className='ds-text'>
								{elementCount} elements, including:
							</div>
							: null
					}
					{
						elementCount > 0 ?
							<ul>
								{
									SourcebookLogic.getExampleContent(sourcebook)
										.map(x => (
											<li key={x.element.id}>
												{x.element.name} <span style={{ opacity: '0.5' }}>({x.type.split('-').join(' ')})</span>
											</li>
										))
								}
							</ul>
							:
							<Empty text='No content in this sourcebook' />
					}
				</>
			);
		}

		return (
			<div>
				{
					[ 'adventure', 'ancestry', 'career', 'class', 'complication', 'culture', 'domain', 'encounter', 'imbuement', 'item', 'kit', 'monster-group', 'montage', 'negotiation', 'perk', 'project', 'subclass', 'tactical-map', 'terrain', 'title' ].map((type, n) => {
						const elements = SourcebookLogic.getElements(sourcebook).filter(e => e.type === type);
						if (elements.length === 0) {
							return null;
						}
						return (
							<div key={n}>
								<HeaderText>
									{Format.capitalize(type.split('-').join(' '))}
								</HeaderText>
								{Collections.sort(elements, e => e.element.name).map(x => <Field key={x.element.id} label={x.element.name} value={<Markdown text={x.element.description} useSpan={true} />} />)}
							</div>
						);
					})
				}
				{
					sourcebook.languages.length > 0 ?
						<>
							<HeaderText>
								Languages
							</HeaderText>
							{Collections.sort(sourcebook.languages, l => l.name).map((l, n) => <Field key={`lang-${n}`} label={l.name} value={<Markdown text={l.description} useSpan={true} />} />)}
						</>
						: null
				}
				{
					sourcebook.skills.length > 0 ?
						<>
							<HeaderText>
								Skills
							</HeaderText>
							{Collections.sort(sourcebook.skills, s => s.name).map((s, n) => <Field key={`skill-${n}`} label={s.name} value={<Markdown text={s.description} useSpan={true} />} />)}
						</>
						: null
				}
			</div>
		);
	};

	const getButtons = () => {
		const buttons: (ButtonConfig | DangerConfig)[] = [];

		if (props.visibility && !isEditing) {
			buttons.push(
				{
					type: 'button',
					icon: props.visibility.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />,
					tooltip: 'Show / Hide',
					onClick: () => props.visibility!.onSetVisibility(!props.visibility!.visible)
				}
			);
		}

		if (props.showEditButtons && (sourcebook.type === SourcebookType.Homebrew)) {
			if (isEditing) {
				buttons.push(
					{
						type: 'button',
						label: 'OK',
						onClick: () => setIsEditing(false)
					}
				);
			} else {
				buttons.push(
					{
						type: 'button',
						icon: <EditOutlined />,
						tooltip: 'Edit',
						onClick: () => setIsEditing(true)
					}
				);

				buttons.push(
					{
						type: 'button',
						icon: <UploadOutlined />,
						tooltip: 'Export',
						onClick: () => Utils.exportData(sourcebook.name || 'Unnamed Sourcebook', sourcebook, 'sourcebook')
					}
				);

				const heroes = allHeroes.filter(h => h.sourcebookIDs.includes(sourcebook.id));

				const used: { element: Element, type: string, container: Element }[] = [];
				const elements = [
					...SourcebookLogic.getElements(props.sourcebook),
					...props.sourcebook.classes.flatMap(c => c.subclasses).map(sc => ({ element: sc, type: 'Subclass' })),
					...props.sourcebook.monsterGroups.flatMap(g => g.monsters).map(m => ({ element: m, type: 'Monster' }))
				];
				elements.forEach(e => {
					SourcebookLogic.getUsedIn(props.sourcebooks, e.element.id)
						.filter(x => !elements.map(e => e.element.id).includes(x.id))
						.forEach(x => {
							used.push({ element: e.element, type: e.type, container: x });
						});
				});

				let msg = undefined;
				if ((heroes.length > 0) || (used.length > 0)) {
					msg = (
						<>
							<div>Cannot delete this sourcebook:</div>
							<ul>
								{
									heroes.map(h => (
										<li key={h.id}>
											{h.name || 'Unnamed Hero'} uses this sourcebook
										</li>
									))
								}
								{
									used.map(x => (
										<li key={x.element.id}>
											<b>{x.element.name || 'Unnamed Element'}</b> ({Format.capitalize(x.type.split('-').join(' '))}) is used in <b>{x.container.name || 'Unnamed Element'}</b>
										</li>
									))
								}
							</ul>
						</>
					);
				}

				buttons.push(
					{
						type: 'danger',
						disabled: msg !== undefined,
						disabledMessage: msg,
						onClick: () => props.onDelete!(sourcebook)
					}
				);
			}
		}

		return (
			<ButtonGroup buttons={buttons} />
		);
	};

	return (
		<ErrorBoundary>
			<div className='sourcebook-panel' id={sourcebook.id}>
				<HeaderText
					level={1}
					strikethrough={props.visibility && !props.visibility.visible}
					tags={[ sourcebook.type ]}
					extra={getButtons()}
				>
					{sourcebook.name || 'Unnamed Sourcebook'}
				</HeaderText>
				{getContent()}
			</div>
		</ErrorBoundary>
	);
};
