import { Input, Space } from 'antd';
import { Empty } from '../../controls/empty/empty';
import { Modal } from '../modal/modal';
import { Project } from '../../../models/project';
import { ProjectPanel } from '../../panels/elements/project-panel/project-panel';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../models/sourcebook';
import { SourcebookLogic } from '../../../logic/sourcebook-logic';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './project-select-modal.scss';

interface Props {
	sourcebooks: Sourcebook[];
	selectOriginal?: boolean;
	onClose: () => void;
	onSelect: (project: Project) => void;
}

export const ProjectSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	try {
		const projects = SourcebookLogic
			.getProjects(props.sourcebooks)
			.filter(item => Utils.textMatches([
				item.name,
				item.description
			], searchTerm));

		return (
			<Modal
				toolbar={
					<>
						<Input
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
						<Space direction='vertical' style={{ width: '100%' }}>
							{
								projects.map(project => (
									<SelectablePanel
										key={project.id}
										onSelect={() => {
											if (props.selectOriginal) {
												props.onSelect(project);
											} else {
												const copy = Utils.copy(project);
												copy.id = Utils.guid();
												props.onSelect(copy);
											}
										}}
									>
										<ProjectPanel project={project} />
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
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
