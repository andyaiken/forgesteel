import { Button, Input } from 'antd';
import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Markdown, MarkdownEditor } from '@/components/controls/markdown/markdown';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { Title } from '@/models/title';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './title-panel.scss';

interface Props {
	title: Title;
	sourcebooks: Sourcebook[];
	options: Options;
	hero?: Hero;
	mode?: PanelMode;
	onChange?: (title: Title) => void;
}

export const TitlePanel = (props: Props) => {
	const [ title, setTitle ] = useState<Title>(Utils.copy(props.title));
	const [ editing, setEditing ] = useState<boolean>(false);

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

	const tags = [ `Echelon ${title.echelon}` ];
	if (props.sourcebooks.length > 0) {
		const sourcebookType = SourcebookLogic.getTitleSourcebook(props.sourcebooks, title)?.type || SourcebookType.Official;
		if (sourcebookType !== SourcebookType.Official) {
			tags.push(sourcebookType);
		}
	}

	return (
		<ErrorBoundary>
			<div className={props.mode === PanelMode.Full ? 'title-panel' : 'title-panel compact'} id={props.mode === PanelMode.Full ? SheetFormatter.getPageId('title', title.id) : undefined}>
				<HeaderText
					level={1}
					tags={tags}
					extra={
						editable ?
							<Button type='text' icon={editing ? <CheckCircleOutlined /> : <EditOutlined />} onClick={() => setEditing(!editing)} />
							: null
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
								<MarkdownEditor value={selectedFeature.description} onChange={setFeatureDescription} />
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
};
