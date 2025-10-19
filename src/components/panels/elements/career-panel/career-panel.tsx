import { Segmented, Space } from 'antd';
import { Career } from '@/models/career';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureFlags } from '@/utils/feature-flags';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { useState } from 'react';

import './career-panel.scss';

interface Props {
	career: Career;
	options: Options;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
}

export const CareerPanel = (props: Props) => {
	const [ page, setPage ] = useState<string>('overview');

	const isInteractive = FeatureFlags.hasFlag(FeatureFlags.interactiveContent.code) && props.options.showInteractivePanels;

	const getOverview = () => {
		return (
			<Markdown text={props.career.description} />
		);
	};

	const getFeatures = () => {
		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					props.career.features.map(f => (
						<SelectablePanel key={f.id}>
							<FeaturePanel feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
						</SelectablePanel>
					))
				}
			</Space>
		);
	};

	const getIncidents = () => {
		const option = props.career.incitingIncidents.selected;
		if (option) {
			return (
				<Field key={option.id} label={option.name} value={option.description} />
			);
		}

		return (
			<div>
				{props.career.incitingIncidents.options.map(option => <Field key={option.id} label={option.name} value={option.description} />)}
			</div>
		);
	};

	const getContent = () => {
		if (isInteractive) {
			let content = null;
			switch (page) {
				case 'overview':
					content = getOverview();
					break;
				case 'features':
					content = getFeatures();
					break;
				case 'incidents':
					content = getIncidents();
					break;
			}

			return (
				<>
					<Segmented
						style={{ marginBottom: '20px' }}
						block={true}
						options={[
							{ value: 'overview', label: 'Overview' },
							{ value: 'features', label: 'Features' },
							{ value: 'incidents', label: 'Inciting Incidents' }
						]}
						value={page}
						onChange={setPage}
					/>
					{content}
				</>
			);
		}

		return (
			<>
				{getOverview()}
				{getFeatures()}
				<HeaderText>{props.career.incitingIncidents.selected ? 'Inciting Incident' : 'Inciting Incidents'}</HeaderText>
				{getIncidents()}
			</>
		);
	};

	if (props.mode !== PanelMode.Full) {
		return (
			<div className='career-panel compact'>
				<HeaderText>{props.career.name || 'Unnamed Career'}</HeaderText>
				<Markdown text={props.career.description} />
			</div>
		);
	}

	let className = 'class-panel';
	if (isInteractive) {
		className += ' interactive';
	}

	return (
		<ErrorBoundary>
			<div className={className} id={props.career.id}>
				<HeaderText level={1}>{props.career.name || 'Unnamed Career'}</HeaderText>
				{getContent()}
			</div>
		</ErrorBoundary>
	);
};
