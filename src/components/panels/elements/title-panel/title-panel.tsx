import { Button, Divider } from 'antd';
import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureConfigPanel } from '../../feature-config-panel/feature-config-panel';
import { FeatureData } from '@/models/feature';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { NameDescEditPanel } from '../../edit/name-desc-edit/name-desc-edit-panel';
import { PanelMode } from '@/enums/panel-mode';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { Title } from '@/models/title';
import { TutorialMode } from '@/enums/tutorial-mode';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './title-panel.scss';

interface Props {
	title: Title;
	sourcebooks: Sourcebook[];
	hero?: Hero;
	mode?: PanelMode;
	onChange?: (title: Title) => void;
}

export const TitlePanel = (props: Props) => {
	const [ title, setTitle ] = useState<Title>(Utils.copy(props.title));
	const [ editing, setEditing ] = useState<boolean>(false);

	const selectedFeature = title.features.find(f => f.id === title.selectedFeatureID);
	const editable = selectedFeature && (selectedFeature.type === FeatureType.Text);

	const setFeatureNameDesc = (name: string, desc: string) => {
		const copy = Utils.copy(title);
		copy.name = name;
		copy.features
			.filter(f => f.id === title.selectedFeatureID)
			.forEach(f => {
				f.name = name;
				f.description = desc;
			});
		setTitle(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const setFeatureData = (featureID: string, value: FeatureData) => {
		const copy = Utils.copy(title);
		const features = FeatureLogic.getFeaturesFromTitle(copy, props.hero?.class?.level || 1, TutorialMode.Complete);
		features
			.filter(f => f.feature.id === featureID)
			.forEach(f => f.feature.data = Utils.copy(value));
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

	const features = FeatureLogic.getFeaturesFromTitle(title, props.hero?.class?.level || 1, TutorialMode.Complete);
	const choices = features.filter(f => FeatureLogic.isChoice(f.feature));

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
								<NameDescEditPanel element={selectedFeature} onChange={setFeatureNameDesc} />
							</div>
							:
							<div className='features'>
								{
									title.features
										.filter(f => title.selectedFeatureID ? (f.id === title.selectedFeatureID) : true)
										.map(f => (
											<div key={f.id}>
												<FeaturePanel
													feature={f}
													hero={props.hero}
													sourcebooks={props.sourcebooks}
													mode={PanelMode.Full}
												/>
											</div>
										))
								}
								{
									props.hero && (choices.length > 0) ?
										<>
											<Divider />
											<Expander title='Configure'>
												{
													choices.map(f => (
														<FeatureConfigPanel
															key={f.feature.id}
															feature={f.feature}
															hero={props.hero!}
															sourcebooks={props.sourcebooks}
															setData={setFeatureData}
														/>
													))
												}
											</Expander>
										</>
										: null
								}
							</div>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
