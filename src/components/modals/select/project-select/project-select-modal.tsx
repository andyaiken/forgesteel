import { Button, Space } from 'antd';
import { Empty } from '@/components/controls/empty/empty';
import { FactoryLogic } from '@/logic/factory-logic';
import { Modal } from '@/components/modals/modal/modal';
import { Project } from '@/models/project';
import { ProjectPanel } from '@/components/panels/elements/project-panel/project-panel';
import { SearchBox } from '@/components/controls/text-input/text-input';
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
	onCustomize?: () => void;
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
				<SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
								props.onCustomize ?
									<div>
										<p>
											Can't find what you're looking for? It might be in a sourcebook that your hero doesn't have access to.
										</p>
										<Button block={true} onClick={props.onCustomize}>
											Click here to change your hero's sourcebooks
										</Button>
									</div>
									:
									<Empty text='Not found' />
								: null
						}
					</Space>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
