import { Button, Input } from 'antd';
import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Markdown } from '../../../controls/markdown/markdown';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';
import { Title } from '../../../../models/title';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './title-panel.scss';

interface Props {
	title: Title;
	options: Options;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
	onChange?: (title: Title) => void;
}

export const TitlePanel = (props: Props) => {
	const [ title, setTitle ] = useState<Title>(Utils.copy(props.title));
	const [ editing, setEditing ] = useState<boolean>(false);

	try {
		const selectedFeature = title.features.find(f => f.id === title.selectedFeatureID);
		const editable = selectedFeature && (selectedFeature.type === FeatureType.Text);

		const setName = (value: string) => {
			const copy = Utils.copy(title);
			copy.name = value;
			setTitle(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(title);
			copy.description = value;
			setTitle(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'title-panel' : 'title-panel compact'} id={props.mode === PanelMode.Full ? props.title.id : undefined}>
					<HeaderText
						level={1}
						tags={[ `Echelon ${props.title.echelon}` ]}
						extra={
							editable ? <Button type='text' icon={editing ? <CheckCircleOutlined /> : <EditOutlined />} onClick={() => setEditing(!editing)} /> : null
						}
					>
						{props.title.name || 'Unnamed Title'}
					</HeaderText>
					<Markdown text={props.title.description} />
					{props.title.prerequisites ? <Field label='Prerequisites' value={props.title.prerequisites} /> : null}
					{
						props.mode === PanelMode.Full ?
							selectedFeature && editing ?
								<div className='features'>
									<HeaderText>Name</HeaderText>
									<Input
										status={selectedFeature.name === '' ? 'warning' : ''}
										placeholder='Name'
										allowClear={true}
										value={selectedFeature.name}
										onChange={e => setName(e.target.value)}
									/>
									<HeaderText>Description</HeaderText>
									<MultiLine label='Description' value={selectedFeature.description} onChange={setDescription} />
								</div>
								:
								<div className='features'>
									{
										props.title.features
											.filter(f => props.title.selectedFeatureID ? (f.id === props.title.selectedFeatureID) : true)
											.map(f => (
												<FeaturePanel
													key={f.id}
													feature={f}
													options={props.options}
													hero={props.hero}
													sourcebooks={props.sourcebooks}
													mode={PanelMode.Full}
												/>
											))
									}
								</div>
							: null
					}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
