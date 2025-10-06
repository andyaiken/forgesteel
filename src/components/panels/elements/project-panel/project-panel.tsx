import { Button, Divider, Progress, Select, Space } from 'antd';
import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Characteristic } from '@/enums/characteristic';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Markdown } from '@/components/controls/markdown/markdown';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { PanelMode } from '@/enums/panel-mode';
import { Project } from '@/models/project';
import { ProjectEditPanel } from '@/components/panels/edit/project-edit/project-edit';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './project-panel.scss';

interface Props {
	project: Project;
	hero?: Hero;
	mode?: PanelMode;
	onChange?: (project: Project) => void;
}

export const ProjectPanel = (props: Props) => {
	const [ project, setProject ] = useState<Project>(Utils.copy(props.project));
	const [ editing, setEditing ] = useState<boolean>(false);

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

	const onChange = (value: Project) => {
		const copy = Utils.copy(value);
		setProject(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	try {
		let itemOK = true;
		if (project.itemPrerequisites && project.progress && !project.progress.prerequisites) {
			itemOK = false;
		}
		let sourceOK = true;
		if (project.source && project.progress && !project.progress.source) {
			sourceOK = false;
		}

		const getProgress = () => {
			if (!project.progress || !props.hero) {
				return null;
			}

			const follower = HeroLogic.getFollowers(props.hero).find(f => f.id === project.progress!.followerID);

			const getChar = (characteristic: Characteristic) => {
				if (!follower) {
					return 0;
				}

				const c = follower.characteristics.find(ch => ch.characteristic === characteristic);
				return c ? c.value : 0;
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
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
								<Field label='Characteristics' value={`Might ${getChar(Characteristic.Might)}, Agility ${getChar(Characteristic.Agility)}, Reason ${getChar(Characteristic.Reason)}, Intuition ${getChar(Characteristic.Intuition)}, Presence ${getChar(Characteristic.Presence)}`} />
								<Field label='Skills' value={follower.skills.join(', ')} />
								<Field label='Languages' value={follower.languages.join(', ')} />
							</div>
							: null
					}
					{
						itemOK && sourceOK ?
							<NumberSpin
								label='Progress'
								min={0}
								max={project.goal || undefined}
								steps={[ 1, 10 ]}
								value={project.progress.points}
								suffix={props.project.goal ? `/ ${props.project.goal}` : undefined}
								onChange={setPoints}
							/>
							: null
					}
					{
						itemOK && sourceOK && (project.goal > 0) ?
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

		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'project-panel' : 'project-panel compact'} id={props.mode === PanelMode.Full ? props.project.id : undefined}>
					<HeaderText
						level={1}
						extra={
							project.isCustom && (props.mode === PanelMode.Full) ?
								<Button type='text' icon={editing ? <CheckCircleOutlined /> : <EditOutlined />} onClick={() => setEditing(!editing)} />
								: null
						}
					>
						{props.project.name || 'Unnamed Project'}
					</HeaderText>
					<Markdown text={props.project.description} />
					{
						(props.mode === PanelMode.Full) && !editing ?
							<>
								{project.itemPrerequisites ? <Field label='Item Prerequisites' value={props.project.itemPrerequisites} /> : null}
								{project.itemPrerequisites && project.progress ? <Toggle label='Obtained Items' value={project.progress.prerequisites} onChange={setPrerequisites} /> : null}
								{project.source ? <Field label='Source' value={props.project.source} /> : null}
								{project.source && project.progress ? <Toggle label='Obtained Source' value={project.progress.source} onChange={setSource} /> : null}
								<Field label='Characteristic' value={props.project.characteristic.length === 5 ? 'highest characteristic' : props.project.characteristic.join(' or ')} />
								<Field label='Goal' value={props.project.goal || '(varies)'} />
								<Markdown text={props.project.effect} />
								{project.progress ? <Divider /> : null}
								{getProgress()}
							</>
							: null
					}
					{
						(props.mode === PanelMode.Full) && editing ?
							<ProjectEditPanel
								project={project}
								includeNameAndDescription={true}
								onChange={onChange}
							/>
							: null
					}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
