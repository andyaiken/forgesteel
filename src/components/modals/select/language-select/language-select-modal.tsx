import { Button, Divider, Space } from 'antd';
import { SearchBox, TextInput } from '@/components/controls/text-input/text-input';
import { Expander } from '@/components/controls/expander/expander';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Language } from '@/models/language';
import { LanguageType } from '@/enums/language-type';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Modal } from '@/components/modals/modal/modal';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Utils } from '@/utils/utils';
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

	const languages = props.languages
		.filter(l => Utils.textMatches([
			l.name,
			l.description
		], searchTerm));

	return (
		<Modal
			toolbar={
				<SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
								<Space key={type} orientation='vertical' style={{ width: '100%' }}>
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
						<Space orientation='vertical' style={{ width: '100%' }}>
							<HeaderText>Custom Language</HeaderText>
							<TextInput
								placeholder='Custom Language Name'
								allowClear={true}
								value={customLanguage}
								onChange={setCustomLanguage}
							/>
							<Button block={true} disabled={!customLanguage} onClick={() => props.onSelect({ name: customLanguage, description: '', type: LanguageType.Cultural, related: [] })}>Select</Button>
						</Space>
					</Expander>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
