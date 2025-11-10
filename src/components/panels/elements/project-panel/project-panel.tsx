import { Button, Divider, Progress, Select, Space } from 'antd';
import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Characteristic } from '@/enums/characteristic';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Item } from '@/models/item';
import { Markdown } from '@/components/controls/markdown/markdown';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { PanelMode } from '@/enums/panel-mode';
import { Project } from '@/models/project';
import { ProjectEditPanel } from '@/components/panels/edit/project-edit/project-edit';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './project-panel.scss';

interface Props {
	project: Project;
	sourcebooks: Sourcebook[]
	hero?: Hero;
	mode?: PanelMode;
	onChange?: (project: Project) => void;
	addItemAndDeleteProject?: (item: Item, project: Project) => void;
}

export const ProjectPanel = (props: Props) => {
	const [ project, setProject ] = useState<Project>(Utils.copy(props.project));
	const [ editing, setEditing ] = useState<boolean>(false);

	const getPrerequisitesMet = () => {
		if (project.itemPrerequisites && project.progress && !project.progress.prerequisites) {
			return false;
		}

		if (project.source && project.progress && !project.progress.source) {
			return false;
		}

		return true;
	};

	const getPreparation = () => {
		const setPrerequisites = (value: boolean) => {
			const copy = Utils.copy(project);
			copy.progress!.prerequisites = value;
			setProject(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		const setSource = (value: boolean) => {
			const copy = Utils.copy(project);
			copy.progress!.source = value;
			setProject(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		return (
			<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
				{project.itemPrerequisites ? <Field label='Item Prerequisites' value={props.project.itemPrerequisites} /> : null}
				{project.itemPrerequisites && project.progress ? <Toggle label='Obtained Items' value={project.progress.prerequisites} onChange={setPrerequisites} /> : null}
				{project.source ? <Field label='Source' value={props.project.source} /> : null}
				{project.source && project.progress ? <Toggle label='Obtained Source' value={project.progress.source} onChange={setSource} /> : null}
			</Space>
		);
	};

	const getProgress = () => {
		if (!project.progress || !props.hero || !getPrerequisitesMet()) {
			return null;
		}

		const setFollowerID = (value: string | null) => {
			const copy = Utils.copy(project);
			copy.progress!.followerID = value;
			setProject(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		const setPoints = (value: number) => {
			const copy = Utils.copy(project);
			copy.progress!.points = value;
			setProject(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		const follower = HeroLogic.getFollowers(props.hero).find(f => f.id === project.progress!.followerID);

		const getCharacteristic = (characteristic: Characteristic) => {
			if (!follower) {
				return 0;
			}

			const c = follower.characteristics.find(ch => ch.characteristic === characteristic);
			return c ? c.value : 0;
		};

		const item = SourcebookLogic.getItems(props.sourcebooks).find(i => i.crafting && (i.crafting.id === project.id));

		return (
			<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
				{
					HeroLogic.getFollowers(props.hero).length > 0 ?
						<Select
							style={{ width: '100%' }}
							placeholder='Choose a follower'
							allowClear={true}
							options={HeroLogic.getFollowers(props.hero).map(f => ({ value: f.id, label: <div className='ds-text'>{f.name}</div> }))}
							value={project.progress.followerID}
							onChange={setFollowerID}
						/>
						: null
				}
				{
					follower ?
						<div>
							<HeaderText tags={[ follower.type ]}>{follower.name}</HeaderText>
							<Field label='Characteristics' value={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(ch => `${ch} ${getCharacteristic(ch)}`).join(', ')} />
							<Field label='Skills' value={follower.skills.join(', ')} />
							<Field label='Languages' value={follower.languages.join(', ')} />
						</div>
						: null
				}
				<NumberSpin
					label='Progress'
					min={0}
					max={project.goal || undefined}
					steps={[ 1, 10 ]}
					value={project.progress.points}
					suffix={props.project.goal ? `/ ${props.project.goal}` : undefined}
					onChange={setPoints}
				/>
				{
					project.goal > 0 ?
						<div className='project-progress-gauge'>
							<Progress
								type='dashboard'
								percent={100 * project.progress.points / project.goal}
								format={value => `${Math.round(value || 0)}%`}
							/>
						</div>
						: null
				}
				{
					(project.goal > 0) && (project.progress.points >= project.goal) && item && props.addItemAndDeleteProject ?
						<>
							<Divider />
							<Button
								block={true}
								type='primary'
								className='tall-button'
								onClick={() => props.addItemAndDeleteProject!(item, project)}
							>
								<div>
									<div>Finish</div>
									<div className='subtext'>
										Add {item.name || 'Unnamed Item'} to your inventory, then close this project
									</div>
								</div>
							</Button>
						</>
						: null
				}
			</Space>
		);
	};

	const getEditor = () => {
		const onChange = (value: Project) => {
			const copy = Utils.copy(value);
			setProject(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		return (
			<ProjectEditPanel
				project={project}
				includeNameAndDescription={true}
				onChange={onChange}
			/>
		);
	};

	const tags = [];
	if (props.sourcebooks.length > 0) {
		let sourcebook = SourcebookLogic.getProjectSourcebook(props.sourcebooks, project);
		if (!sourcebook) {
			// This might be a crafting project from an item
			sourcebook = props.sourcebooks.find(sb => sb.items.some(i => i.crafting && i.crafting.id === project.id));
		}
		if (!sourcebook) {
			// This might be a crafting project from an imbuement
			sourcebook = props.sourcebooks.find(sb => sb.imbuements.some(i => i.crafting && i.crafting.id === project.id));
		}
		const sourcebookType = sourcebook ? sourcebook.type : SourcebookType.Homebrew;
		if (sourcebookType !== SourcebookType.Official) {
			tags.push(sourcebookType);
		}
	}

	if (props.mode !== PanelMode.Full) {
		return (
			<ErrorBoundary>
				<div className='project-panel compact'>
					<HeaderText
						level={1}
						tags={tags}
					>
						{props.project.name || 'Unnamed Project'}
					</HeaderText>
					<Markdown text={props.project.description} />
				</div>
			</ErrorBoundary>
		);
	}

	return (
		<ErrorBoundary>
			<div className='project-panel' id={SheetFormatter.getPageId('project', props.project.id)}>
				<HeaderText
					level={1}
					tags={tags}
					extra={
						project.isCustom ?
							<Button type='text' icon={editing ? <CheckCircleOutlined /> : <EditOutlined />} onClick={() => setEditing(!editing)} />
							: null
					}
				>
					{props.project.name || 'Unnamed Project'}
				</HeaderText>
				<Markdown text={props.project.description} />
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						!editing ?
							<Expander title='Preparation' expandedByDefault={!getPrerequisitesMet()}>
								{getPreparation()}
							</Expander>
							: null
					}
					<div>
						<Field
							label='Characteristic'
							value={props.project.characteristic.length === 5 ? 'highest characteristic' : props.project.characteristic.join(' or ')}
						/>
						<Field
							label='Goal'
							value={props.project.goal || '(varies)'}
						/>
					</div>
					{
						!editing && props.hero ?
							<Expander title='Progress' expandedByDefault={getPrerequisitesMet()}>
								{getProgress()}
							</Expander>
							: null
					}
					{editing ? getEditor() : null}
				</Space>
			</div>
		</ErrorBoundary>
	);
};
