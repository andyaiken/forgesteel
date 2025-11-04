import { Button, Divider, Drawer, Space } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Project } from '@/models/project';
import { ProjectPanel } from '@/components/panels/elements/project-panel/project-panel';
import { ProjectSelectModal } from '@/components/modals/select/project-select/project-select-modal';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './projects-panel.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (hero: Hero) => void;
}

export const ProjectsPanel = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));
	const [ projectsVisible, setProjectsVisible ] = useState<boolean>(false);

	const setProjectPoints = (value: number) => {
		const copy = Utils.copy(hero);
		copy.state.projectPoints = value;
		setHero(copy);
		props.onChange(copy);
	};

	const addProject = (project: Project) => {
		const projectCopy = Utils.copy(project);
		projectCopy.id = Utils.guid();
		projectCopy.progress = FactoryLogic.createProjectProgress();

		const copy = Utils.copy(hero);
		copy.state.projects.push(projectCopy);
		setHero(copy);
		setProjectsVisible(false);
		props.onChange(copy);
	};

	const changeProject = (project: Project) => {
		const copy = Utils.copy(hero);
		const index = copy.state.projects.findIndex(p => p.id === project.id);
		copy.state.projects[index] = project;
		setHero(copy);
		props.onChange(copy);
	};

	const moveProject = (project: Project, direction: 'up' | 'down') => {
		const copy = Utils.copy(hero);
		const index = copy.state.projects.findIndex(p => p.id === project.id);
		copy.state.projects = Collections.move(copy.state.projects, index, direction);
		setHero(copy);
		props.onChange(copy);
	};

	const deleteProject = (project: Project) => {
		const copy = Utils.copy(hero);
		copy.state.projects = copy.state.projects.filter(p => p.id !== project.id);
		setHero(copy);
		props.onChange(copy);
	};

	return (
		<ErrorBoundary>
			<Space direction='vertical' style={{ width: '100%', paddingBottom: '20px' }}>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={() => setProjectsVisible(true)} />
					}
				>
					Projects
				</HeaderText>
				<NumberSpin
					label='Project Points'
					value={hero.state.projectPoints}
					steps={[ 1, 10 ]}
					format={() => HeroLogic.getProjectPoints(hero).toString()}
					onChange={setProjectPoints}
				/>
				<Divider />
				{
					hero.state.projects.map(project => (
						<Expander
							key={project.id}
							title={project.name}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveProject(project, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveProject(project, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteProject(project); }} />
							]}
						>
							<ProjectPanel
								project={project}
								hero={hero}
								mode={PanelMode.Full}
								onChange={changeProject}
							/>
						</Expander>
					))
				}
				{
					hero.state.projects.length === 0 ?
						<Empty text='You have no projects underway.' />
						: null
				}
				<Drawer open={projectsVisible} onClose={() => setProjectsVisible(false)} closeIcon={null} width='500px'>
					<ProjectSelectModal sourcebooks={props.sourcebooks} onSelect={addProject} onClose={() => setProjectsVisible(false)} />
				</Drawer>
			</Space>
		</ErrorBoundary>
	);
};
