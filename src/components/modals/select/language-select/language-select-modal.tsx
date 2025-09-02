import { Button, Divider, Input, Space } from 'antd';
import { Expander } from '../../../controls/expander/expander';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Language } from '../../../../models/language';
import { LanguageType } from '../../../../enums/language-type';
import { Markdown } from '../../../controls/markdown/markdown';
import { Modal } from '../../modal/modal';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './language-select-modal.scss';

interface Props {
	languages: Language[];
	onClose: () => void;
	onSelect: (language: Language) => void;
}

export const LanguageSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ customLanguage, setCustomLanguage ] = useState<string>('');

	try {
		const languages = props.languages
			.filter(l => Utils.textMatches([
				l.name,
				l.description
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
					<div className='language-select-modal'>
						{
							[ LanguageType.Common, LanguageType.Cultural, LanguageType.Regional, LanguageType.Dead ].map(type => {
								const subset = languages.filter(l => l.type === type);
								if (subset.length === 0) {
									return null;
								}

								return (
									<Space direction='vertical' style={{ width: '100%' }}>
										<HeaderText level={1}>{type}</HeaderText>
										{
											subset.map((l, n) => (
												<SelectablePanel key={n} onSelect={() => props.onSelect(l)}>
													<HeaderText>{l.name}</HeaderText>
													<Markdown text={l.description} />
												</SelectablePanel>
											))
										}
									</Space>
								);
							})
						}
						<Divider />
						<Expander title='Add a custom language'>
							<Space direction='vertical' style={{ width: '100%' }}>
								<HeaderText>Custom Language</HeaderText>
								<Input
									placeholder='Custom Language Name'
									allowClear={true}
									value={customLanguage}
									onChange={e => setCustomLanguage(e.target.value)}
								/>
								<Button block={true} disabled={!customLanguage} onClick={() => props.onSelect({ name: customLanguage, description: '', type: LanguageType.Cultural, related: [] })}>Select</Button>
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
