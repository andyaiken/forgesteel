import { Segmented, Space } from 'antd';
import { Career } from '@/models/career';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { useState } from 'react';

import './career-panel.scss';

interface Props {
	career: Career;
	sourcebooks: Sourcebook[];
	options: Options;
	hero?: Hero;
	mode?: PanelMode;
}

export const CareerPanel = (props: Props) => {
	const [ page, setPage ] = useState<string>('overview');

	const getOverview = () => {
		return (
			<Markdown text={props.career.description} />
		);
	};

	const getFeatures = () => {
		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
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
	};

	const tags = [];
	if (props.sourcebooks.length > 0) {
		const sourcebookType = SourcebookLogic.getCareerSourcebook(props.sourcebooks, props.career)?.type || SourcebookType.Official;
		if (sourcebookType !== SourcebookType.Official) {
			tags.push(sourcebookType);
		}
	}

	if (props.mode !== PanelMode.Full) {
		return (
			<div className='career-panel compact'>
				<HeaderText level={1} tags={tags}>
					{props.career.name || 'Unnamed Career'}
				</HeaderText>
				<Markdown text={props.career.description} />
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<div className='class-panel' id={SheetFormatter.getPageId('career', props.career.id)}>
				<HeaderText level={1} tags={tags}>
					{props.career.name || 'Unnamed Career'}
				</HeaderText>
				{getContent()}
			</div>
		</ErrorBoundary>
	);
};
