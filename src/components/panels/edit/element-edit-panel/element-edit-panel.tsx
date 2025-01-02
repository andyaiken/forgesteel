import { Element } from '../../../../models/element';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Input } from 'antd';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { useState } from 'react';

import './element-edit-panel.scss';

interface Props {
	element: Element;
	onChange: (element: Element) => void;
}

export const ElementEditPanel = (props: Props) => {
	const [ element, setElement ] = useState<Element>(props.element);

	const setName = (value: string) => {
		const copy = JSON.parse(JSON.stringify(element)) as Element;
		copy.name = value;
		setElement(copy);
		props.onChange(copy);
	};

	const setDescription = (value: string | string[]) => {
		const copy = JSON.parse(JSON.stringify(element)) as Element;
		copy.description = value;
		setElement(copy);
		props.onChange(copy);
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
				<MultiLine label='Description' value={element.description} onChange={setDescription} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
