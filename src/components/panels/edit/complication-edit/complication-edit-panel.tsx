import { Complication } from '@/models/complication';
import { ComplicationPanel } from '@/components/panels/elements/complication-panel/complication-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Feature } from '@/models/feature';
import { FeatureListEditPanel } from '@/components/panels/edit/feature-list-edit/feature-list-edit-panel';
import { NameDescEditPanel } from '@/components/panels/edit/name-desc-edit/name-desc-edit-panel';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Tabs } from 'antd';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './complication-edit-panel.scss';

interface Props {
	complication: Complication;
	sourcebooks: Sourcebook[];
	options: Options;
	mode?: PanelMode;
	onChange: (complication: Complication) => void;
}

export const ComplicationEditPanel = (props: Props) => {
	const [ complication, setComplication ] = useState<Complication>(props.complication);

	const getNameAndDescriptionSection = () => {
		const onChange = (name: string, desc: string) => {
			const copy = Utils.copy(complication);
			copy.name = name;
			copy.description = desc;
			setComplication(copy);
			props.onChange(copy);
		};

		return (
			<NameDescEditPanel
				element={complication}
				onChange={onChange}
			/>
		);
	};

	const getFeaturesEditSection = () => {
		const onChange = (features: Feature[]) => {
			const copy = Utils.copy(complication);
			copy.features = Utils.copy(features);
			setComplication(copy);
			props.onChange(copy);
		};

		return (
			<FeatureListEditPanel
				title='Features'
				features={complication.features}
				sourcebooks={props.sourcebooks}
				options={props.options}
				onChange={onChange}
			/>
		);
	};

	return (
		<ErrorBoundary>
			<div className='complication-edit-panel'>
				<div className='complication-workspace-column'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Complication',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Features',
								children: getFeaturesEditSection()
							}
						]}
					/>
				</div>
				{
					props.mode === PanelMode.Full ?
						<div className='complication-preview-column'>
							<Tabs
								items={[
									{
										key: '1',
										label: 'Preview',
										children: (
											<SelectablePanel>
												<ComplicationPanel
													complication={complication}
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
