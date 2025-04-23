import { Element } from '../../../../models/element';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Input } from 'antd';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './element-edit-panel.scss';

interface Props {
	element: Element;
	onChange: (element: Element) => void;
}

export const ElementEditPanel = (props: Props) => {
	const [ element, setElement ] = useState<Element>(props.element);

	const setName = (value: string) => {
		const copy = Utils.copy(element);
		copy.name = value;
		setElement(copy);
		props.onChange(copy);
	};

	const setDescription = (value: string) => {
		const copy = Utils.copy(element);
		copy.description = value;
		setElement(copy);
		props.onChange(copy);
	};

	try {
		return (
			<ErrorBoundary>
				<div className='monster-edit-panel'>
					<HeaderText>Name</HeaderText>
					<Input
						status={element.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						value={element.name}
						onChange={e => setName(e.target.value)}
					/>
					<HeaderText>Description</HeaderText>
					<MultiLine label='Description' value={element.description} onChange={setDescription} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
