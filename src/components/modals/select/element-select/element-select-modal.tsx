import { Button, Divider, Input, Space } from 'antd';
import { Markdown, MarkdownEditor } from '@/components/controls/markdown/markdown';
import { Element } from '@/models/element';
import { Expander } from '@/components/controls/expander/expander';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Modal } from '@/components/modals/modal/modal';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './element-select-modal.scss';

interface Props {
	elements: Element[];
	onClose: () => void;
	onSelect: (element: Element) => void;
}

export const ElementSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ customElement, setCustomElement ] = useState<Element>({ id: Utils.guid(), name: '', description: '' });

	const setCustomName = (value: string) => {
		const copy = Utils.copy(customElement);
		copy.name = value;
		setCustomElement(copy);
	};

	const setCustomDescription = (value: string) => {
		const copy = Utils.copy(customElement);
		copy.description = value;
		setCustomElement(copy);
	};

	const elements = props.elements
		.filter(e => Utils.textMatches([
			e.name,
			e.description
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
				<div className='element-select-modal'>
					<Space orientation='vertical' style={{ width: '100%' }}>
						{
							elements.map(e => (
								<SelectablePanel key={e.id} onSelect={() => props.onSelect(e)}>
									<HeaderText>{e.name}</HeaderText>
									<Markdown text={e.description} />
								</SelectablePanel>
							))
						}
					</Space>
					<Divider />
					<Expander title='Add a custom element'>
						<Space orientation='vertical' style={{ width: '100%' }}>
							<HeaderText>Name</HeaderText>
							<Input
								placeholder='Name'
								allowClear={true}
								value={customElement.name}
								onChange={e => setCustomName(e.target.value)}
							/>
							<HeaderText>Description</HeaderText>
							<MarkdownEditor value={customElement.description} onChange={setCustomDescription} />
							<Button block={true} disabled={!customElement.name} onClick={() => props.onSelect(customElement)}>Select</Button>
						</Space>
					</Expander>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
