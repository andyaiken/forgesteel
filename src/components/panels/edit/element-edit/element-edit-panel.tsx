import { Element } from '@/models/element';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { NameDescEditPanel } from '@/components/panels/edit/name-desc-edit/name-desc-edit-panel';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './element-edit-panel.scss';

interface Props {
	element: Element;
	onChange: (element: Element) => void;
}

export const ElementEditPanel = (props: Props) => {
	const [ element, setElement ] = useState<Element>(props.element);

	const onChange = (name: string, desc: string) => {
		const copy = Utils.copy(element);
		copy.name = name;
		copy.description = desc;
		setElement(copy);
		props.onChange(copy);
	};

	return (
		<ErrorBoundary>
			<div className='element-edit-panel'>
				<NameDescEditPanel
					element={element}
					onChange={onChange}
				/>
			</div>
		</ErrorBoundary>
	);
};
