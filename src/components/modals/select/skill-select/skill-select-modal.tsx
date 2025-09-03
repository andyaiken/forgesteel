import { Button, Divider, Input, Space } from 'antd';
import { Expander } from '../../../controls/expander/expander';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { Modal } from '../../modal/modal';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Skill } from '../../../../models/skill';
import { SkillList } from '../../../../enums/skill-list';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './skill-select-modal.scss';

interface Props {
	skills: Skill[];
	onClose: () => void;
	onSelect: (skill: Skill) => void;
}

export const SkillSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ customSkill, setCustomSkill ] = useState<string>('');

	try {
		const skills = props.skills
			.filter(s => Utils.textMatches([
				s.name,
				s.description
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
					<div className='skill-select-modal'>
						{
							[ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ].map(list => {
								const subset = skills.filter(s => s.list === list);
								if (subset.length === 0) {
									return null;
								}

								return (
									<Space direction='vertical' style={{ width: '100%' }}>
										<HeaderText level={1}>{list}</HeaderText>
										{
											subset.map((s, n) => (
												<SelectablePanel key={n} onSelect={() => props.onSelect(s)}>
													<HeaderText>{s.name}</HeaderText>
													<Markdown text={s.description} />
												</SelectablePanel>
											))
										}
									</Space>
								);
							})
						}
						<Divider />
						<Expander title='Add a custom skill'>
							<Space direction='vertical' style={{ width: '100%' }}>
								<HeaderText>Custom Skill</HeaderText>
								<Input
									placeholder='Custom Skill Name'
									allowClear={true}
									value={customSkill}
									onChange={e => setCustomSkill(e.target.value)}
								/>
								<Button block={true} disabled={!customSkill} onClick={() => props.onSelect({ name: customSkill, description: '', list: SkillList.Custom })}>Select</Button>
							</Space>
						</Expander>
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
