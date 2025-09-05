import { Button, Divider, Input, Space } from 'antd';
import { Element } from '../../../../models/element';
import { Expander } from '../../../controls/expander/expander';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { Modal } from '../../modal/modal';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Utils } from '../../../../utils/utils';
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

	try {
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
						<Space direction='vertical' style={{ width: '100%' }}>
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
							<Space direction='vertical' style={{ width: '100%' }}>
								<HeaderText>Name</HeaderText>
								<Input
									placeholder='Name'
									allowClear={true}
									value={customElement.name}
									onChange={e => setCustomName(e.target.value)}
								/>
								<HeaderText>Description</HeaderText>
								<MultiLine value={customElement.description} onChange={setCustomDescription} />
								<Button block={true} disabled={!customElement.name} onClick={() => props.onSelect(customElement)}>Select</Button>
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
