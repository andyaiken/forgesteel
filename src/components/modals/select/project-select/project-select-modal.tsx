import { Input, Space } from 'antd';
import { Empty } from '@/components/controls/empty/empty';
import { FactoryLogic } from '@/logic/factory-logic';
import { Modal } from '@/components/modals/modal/modal';
import { Project } from '@/models/project';
import { ProjectPanel } from '@/components/panels/elements/project-panel/project-panel';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './project-select-modal.scss';

interface Props {
	sourcebooks: Sourcebook[];
	onClose: () => void;
	onSelect: (project: Project) => void;
}

export const ProjectSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	const projects = [
		FactoryLogic.createProject({
			name: 'Custom Project',
			isCustom: true
		}),
		...SourcebookLogic.getProjects(props.sourcebooks, true, true)
	]
		.filter(item => Utils.textMatches([
			item.name,
			item.description
		], searchTerm));

	return (
		<Modal
			toolbar={
				<>
					<Input
						name='search'
						placeholder='Search'
						allowClear={true}
						value={searchTerm}
						suffix={<SearchOutlined />}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</>
			}
			content={
				<div className='project-select-modal'>
					<Space orientation='vertical' style={{ width: '100%' }}>
						{
							projects.map(project => (
								<SelectablePanel
									key={project.id}
									onSelect={() => props.onSelect(project)}
								>
									<ProjectPanel project={project} sourcebooks={props.sourcebooks} />
								</SelectablePanel>
							))
						}
						{
							projects.length === 0 ?
								<Empty />
								: null
						}
					</Space>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
