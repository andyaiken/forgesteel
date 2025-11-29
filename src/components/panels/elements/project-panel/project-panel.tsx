import { Button, Divider, Progress, Select, Space } from 'antd';
import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Characteristic } from '@/enums/characteristic';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { Field } from '@/components/controls/field/field';
import { Follower } from '@/models/follower';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { ImbuedItemData } from '@/data/items/imbued-item-data';
import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';
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
		if (editing) {
			return null;
		}

		if (!project.itemPrerequisites && !project.source) {
			return null;
		}

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
			<Space orientation='vertical' style={{ width: '100%' }}>
				{project.itemPrerequisites ? <Field label='Item Prerequisites' value={props.project.itemPrerequisites} /> : null}
				{project.itemPrerequisites && project.progress ? <Toggle label='Obtained Items' value={project.progress.prerequisites} onChange={setPrerequisites} /> : null}
				{project.source ? <Field label='Source' value={props.project.source} /> : null}
				{project.source && project.progress ? <Toggle label='Obtained Source' value={project.progress.source} onChange={setSource} /> : null}
			</Space>
		);
	};

	const getProgress = () => {
		if (editing) {
			return null;
		}

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

		const getFollower = (follower: Follower, project: Project) => {
			const getCharacteristic = (characteristic: Characteristic) => {
				if (!follower) {
					return 0;
				}

				const c = follower.characteristics.find(ch => ch.characteristic === characteristic);
				return c ? c.value : 0;
			};

			return (
				<div>
					<HeaderText tags={[ follower.type ]}>
						{follower.name || 'Unnamed Follower'}
					</HeaderText>
					<Field
						label='Characteristics'
						value={
							[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ]
								.filter(ch => project.characteristic.includes(ch))
								.map(ch => `${ch} ${getCharacteristic(ch)}`)
								.join(', ')
						}
					/>
					<Field
						label='Skills'
						value={follower.skills.join(', ')}
					/>
					<Field
						label='Languages'
						value={follower.languages.join(', ')}
					/>
				</div>
			);
		};

		const follower = HeroLogic.getFollowers(props.hero).find(f => f.id === project.progress!.followerID);

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					HeroLogic.getFollowers(props.hero).length > 0 ?
						<Select
							style={{ width: '100%' }}
							placeholder='Choose a follower'
							allowClear={true}
							options={
								HeroLogic.getFollowers(props.hero).map(f => ({
									value: f.id,
									label: f.name,
									follower: f
								}))
							}
							optionRender={option => getFollower(option.data.follower, project)}
							value={project.progress.followerID}
							onChange={setFollowerID}
						/>
						: null
				}
				{follower ? getFollower(follower, project) : null}
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
			</Space>
		);
	};

	const getItem = () => {
		if (editing) {
			return null;
		}

		if ((project.goal === 0) || !project.progress || (project.progress.points < project.goal) || !props.hero || !props.addItemAndDeleteProject || !getPrerequisitesMet()) {
			return null;
		}

		let item = SourcebookLogic.getItems(props.sourcebooks).find(i => i.crafting && (i.crafting.id === project.id));
		if (!item) {
			const imbuement = SourcebookLogic.getImbuements(props.sourcebooks).find(i => i.crafting && (i.crafting.id === project.id));
			if (imbuement) {
				switch (imbuement.type) {
					case ItemType.ImbuedArmor:
						item = Utils.copy(ImbuedItemData.imbuedArmor);
						break;
					case ItemType.ImbuedImplement:
						item = Utils.copy(ImbuedItemData.imbuedImplement);
						break;
					case ItemType.ImbuedWeapon:
						item = Utils.copy(ImbuedItemData.imbuedWeapon);
						break;
				}

				if (item) {
					item.imbuements.push(Utils.copy(imbuement));
				}
			}
		} else {
			item = Utils.copy(item);
		}

		if (!item) {
			return null;
		}

		return (
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

	const preparation = getPreparation();
	const progress = getProgress();
	const item = getItem();

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
				<Space orientation='vertical' style={{ width: '100%' }}>
					{
						preparation ?
							<Expander title='Preparation' expandedByDefault={!getPrerequisitesMet()}>
								{preparation}
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
						progress ?
							<Expander title='Progress' expandedByDefault={getPrerequisitesMet()}>
								{progress}
							</Expander>
							: null
					}
					{item ? <Divider /> : null}
					{item}
					{editing ? getEditor() : null}
				</Space>
			</div>
		</ErrorBoundary>
	);
};
