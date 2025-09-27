import { Button, Input } from 'antd';
import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { MultiLine } from '@/components/controls/multi-line/multi-line';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { Title } from '@/models/title';
import { Utils } from '@/utils/utils';
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

		const setFeatureName = (value: string) => {
			const copy = Utils.copy(title);
			copy.name = value;
			copy.features
				.filter(f => f.id === title.selectedFeatureID)
				.forEach(f => f.name = value);
			setTitle(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		const setFeatureDescription = (value: string) => {
			const copy = Utils.copy(title);
			copy.features
				.filter(f => f.id === title.selectedFeatureID)
				.forEach(f => f.description = value);
			setTitle(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'title-panel' : 'title-panel compact'} id={props.mode === PanelMode.Full ? title.id : undefined}>
					<HeaderText
						level={1}
						tags={[ `Echelon ${title.echelon}` ]}
						extra={
							editable ? <Button type='text' icon={editing ? <CheckCircleOutlined /> : <EditOutlined />} onClick={() => setEditing(!editing)} /> : null
						}
					>
						{title.name || 'Unnamed Title'}
					</HeaderText>
					<Markdown text={title.description} />
					{title.prerequisites ? <Field label='Prerequisites' value={title.prerequisites} /> : null}
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
										onChange={e => setFeatureName(e.target.value)}
									/>
									<HeaderText>Description</HeaderText>
									<MultiLine value={selectedFeature.description} onChange={setFeatureDescription} />
								</div>
								:
								<div className='features'>
									{
										title.features
											.filter(f => title.selectedFeatureID ? (f.id === title.selectedFeatureID) : true)
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
