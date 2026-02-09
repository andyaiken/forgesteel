import { Space, Tabs } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Feature } from '@/models/feature';
import { FeatureListEditPanel } from '@/components/panels/edit/feature-list-edit/feature-list-edit-panel';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { NameDescEditPanel } from '@/components/panels/edit/name-desc-edit/name-desc-edit-panel';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Title } from '@/models/title';
import { TitlePanel } from '@/components/panels/elements/title-panel/title-panel';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './title-edit-panel.scss';

interface Props {
	title: Title;
	sourcebooks: Sourcebook[];
	options: Options;
	mode?: PanelMode;
	onChange: (title: Title) => void;
}

export const TitleEditPanel = (props: Props) => {
	const [ title, setTitle ] = useState<Title>(props.title);
	const [ revision, setRevision ] = useState<number>(0);

	const updateTitle = (value: Title) => {
		setTitle(value);
		setRevision(revision + 1);
		props.onChange(value);
	};

	const getNameAndDescriptionSection = () => {
		const onChange = (name: string, desc: string) => {
			const copy = Utils.copy(title);
			copy.name = name;
			copy.description = desc;
			updateTitle(copy);
		};

		return (
			<NameDescEditPanel
				element={title}
				onChange={onChange}
			/>
		);
	};

	const getTitleEditSection = () => {
		const setEchelon = (value: number) => {
			const copy = Utils.copy(title);
			copy.echelon = value;
			updateTitle(copy);
		};

		const setPrerequisites = (value: string) => {
			const copy = Utils.copy(title);
			copy.prerequisites = value;
			updateTitle(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Echelon</HeaderText>
				<NumberSpin min={1} max={4} value={title.echelon} onChange={setEchelon} />
				<HeaderText>Prerequisites</HeaderText>
				<TextInput
					placeholder='Prerequisites'
					allowClear={true}
					value={title.prerequisites}
					onChange={setPrerequisites}
				/>
			</Space>
		);
	};

	const getFeaturesEditSection = () => {
		const onChange = (features: Feature[]) => {
			const copy = Utils.copy(title);
			copy.features = Utils.copy(features);
			updateTitle(copy);
		};

		return (
			<FeatureListEditPanel
				title='Features'
				features={title.features}
				sourcebooks={props.sourcebooks}
				options={props.options}
				onChange={onChange}
			/>
		);
	};

	return (
		<ErrorBoundary>
			<div className='title-edit-panel'>
				<div className='title-workspace-column'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Title',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Details',
								children: getTitleEditSection()
							},
							{
								key: '3',
								label: 'Features',
								children: getFeaturesEditSection()
							}
						]}
					/>
				</div>
				{
					props.mode === PanelMode.Full ?
						<div className='title-preview-column'>
							<Tabs
								items={[
									{
										key: '1',
										label: 'Preview',
										children: (
											<SelectablePanel>
												<TitlePanel
													key={revision}
													title={title}
													sourcebooks={props.sourcebooks}
													options={props.options}
													mode={PanelMode.Full}
												/>
											</SelectablePanel>
										)
									}
								]}
							/>
						</div>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
