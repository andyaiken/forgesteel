import { Button, Divider, Input } from 'antd';
import { Element } from '../../../models/element';
import { HeaderText } from '../../controls/header-text/header-text';
import { useState } from 'react';

import './element-edit-panel.scss';

interface Props {
	element: Element;
	onChange: (element: Element) => void;
	onDelete?: (element: Element) => void;
}

export const ElementEditPanel = (props: Props) => {
	const [ element, setElement ] = useState<Element>(props.element);

	const setName = (value: string) => {
		const copy = JSON.parse(JSON.stringify(element)) as Element;
		copy.name = value;
		setElement(copy);
		props.onChange(copy);
	};

	const setDescription = (value: string) => {
		const copy = JSON.parse(JSON.stringify(element)) as Element;
		copy.description = value;
		setElement(copy);
		props.onChange(copy);
	};

	const deleteElement = () => {
		if (props.onDelete) {
			props.onDelete(element);
		}
	};

	try {
		return (
			<div className='monster-edit-panel'>
				<HeaderText>Name</HeaderText>
				<Input
					className={element.name === '' ? 'input-empty' : ''}
					placeholder='Name'
					allowClear={true}
					value={element.name}
					onChange={e => setName(e.target.value)}
				/>
				<HeaderText>Description</HeaderText>
				<Input.TextArea
					placeholder='Description'
					allowClear={true}
					rows={6}
					value={element.description}
					onChange={e => setDescription(e.target.value)}
				/>
				<Divider />
				{props.onDelete ? <Button block={true} danger={true} onClick={deleteElement}>Delete</Button> : null}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
