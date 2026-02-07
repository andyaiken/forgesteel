import { Button, Space } from 'antd';
import { Element } from '@/models/element';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { NameGenerator } from '@/utils/name-generator';
import { TextInput } from '@/components/controls/text-input/text-input';
import { ThunderboltOutlined } from '@ant-design/icons';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './name-desc-edit-panel.scss';

interface Props {
	element: Element;
	showNameGenerator?: boolean;
	onChange: (name: string, desc: string) => void;
}

export const NameDescEditPanel = (props: Props) => {
	const [ element, setElement ] = useState(Utils.copy(props.element));

	const setName = (value: string) => {
		const copy = Utils.copy(element);
		copy.name = value;
		setElement(copy);
		props.onChange(value, element.description);
	};

	const setDescription = (value: string) => {
		const copy = Utils.copy(element);
		copy.description = value;
		setElement(copy);
		props.onChange(element.name, value);
	};

	return (
		<div className='name-desc-edit-panel'>
			<HeaderText>Name</HeaderText>
			<Space.Compact style={{ width: '100%' }}>
				<TextInput
					status={element.name === '' ? 'warning' : ''}
					placeholder='Name'
					allowClear={true}
					value={element.name}
					onChange={setName}
				/>
				{
					props.showNameGenerator ?
						<Button icon={<ThunderboltOutlined />} onClick={() => setName(NameGenerator.generateName())} />
						: null
				}
			</Space.Compact>
			<HeaderText>Description</HeaderText>
			<MarkdownEditor value={element.description} onChange={setDescription} />
		</div>
	);
};
