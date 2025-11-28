import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Negotiation } from '@/models/negotiation';
import { NegotiationLogic } from '@/logic/negotiation-logic';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Segmented } from 'antd';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { StatsRow } from '@/components/panels/stats-row/stats-row';
import { useState } from 'react';

import './negotiation-panel.scss';

interface Props {
	negotiation: Negotiation;
	sourcebooks: Sourcebook[];
	options: Options;
	mode?: PanelMode;
}

export const NegotiationPanel = (props: Props) => {
	const [ page, setPage ] = useState<string>('overview');

	const getOverview = () => {
		return (
			<>
				<Markdown text={props.negotiation.description} />
				<StatsRow>
					<Field orientation='vertical' label='Attitude' value={props.negotiation.attitude} />
					<Field orientation='vertical' label='Interest' value={props.negotiation.interest} />
					<Field orientation='vertical' label='Patience' value={props.negotiation.patience} />
					<Field orientation='vertical' label='Impression' value={props.negotiation.impression} />
				</StatsRow>
			</>
		);
	};

	const getMotivations = () => {
		return (
			<>
				{props.negotiation.motivations.map((t, n) => <Field key={n} label={t.trait} value={<Markdown text={t.description || NegotiationLogic.getMotivationDescription(t.trait)} useSpan={true} />} />)}
				{props.negotiation.motivations.length === 0 ? <div className='ds-text dimmed-text'>None</div> : null}
			</>
		);
	};

	const getPitfalls = () => {
		return (
			<>
				{props.negotiation.pitfalls.map((t, n) => <Field key={n} label={t.trait} value={<Markdown text={t.description || NegotiationLogic.getPitfallDescription(t.trait)} useSpan={true} />} />)}
				{props.negotiation.pitfalls.length === 0 ? <div className='ds-text dimmed-text'>None</div> : null}
			</>
		);
	};

	const getLanguages = () => {
		return (
			<>
				{props.negotiation.languages.map(l => SourcebookLogic.getLanguage(l, props.sourcebooks)).filter(l => !!l).map((l, n) => <Field key={n} label={l.name} value={l.description} />)}
				{props.negotiation.languages.length === 0 ? <div className='ds-text dimmed-text'>None</div> : null}
			</>
		);
	};

	const getOutcomes = () => {
		return (
			<>
				<Field label='5' value={<Markdown text={props.negotiation.outcomes[5] || 'Yes, and...'} useSpan={true} />} />
				<Field label='4' value={<Markdown text={props.negotiation.outcomes[4] || 'Yes'} useSpan={true} />} />
				<Field label='3' value={<Markdown text={props.negotiation.outcomes[3] || 'Yes, but...'} useSpan={true} />} />
				<Field label='2' value={<Markdown text={props.negotiation.outcomes[2] || 'No, but...'} useSpan={true} />} />
				<Field label='1' value={<Markdown text={props.negotiation.outcomes[1] || 'No'} useSpan={true} />} />
				<Field label='0' value={<Markdown text={props.negotiation.outcomes[0] || 'No, and...'} useSpan={true} />} />
			</>
		);
	};

	const getContent = () => {
		let content = null;
		switch (page) {
			case 'overview':
				content = getOverview();
				break;
			case 'motivations':
				content = getMotivations();
				break;
			case 'pitfalls':
				content = getPitfalls();
				break;
			case 'languages':
				content = getLanguages();
				break;
			case 'outcomes':
				content = getOutcomes();
				break;
		}

		return (
			<>
				<Segmented
					style={{ marginBottom: '20px' }}
					block={true}
					options={[
						{ value: 'overview', label: 'Overview' },
						{ value: 'motivations', label: 'Motivations' },
						{ value: 'pitfalls', label: 'Pitfalls' },
						{ value: 'languages', label: 'Languages' },
						{ value: 'outcomes', label: 'Outcomes' }
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
		const sourcebookType = SourcebookLogic.getNegotiationSourcebook(props.sourcebooks, props.negotiation)?.type || SourcebookType.Official;
		if (sourcebookType !== SourcebookType.Official) {
			tags.push(sourcebookType);
		}
	}

	if (props.mode !== PanelMode.Full) {
		return (
			<div className='negotiation-panel compact'>
				<HeaderText level={1} tags={tags}>
					{props.negotiation.name || 'Unnamed Negotiation'}
				</HeaderText>
				<Markdown text={props.negotiation.description} />
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<div className='negotiation-panel' id={SheetFormatter.getPageId('negotiation', props.negotiation.id)}>
				<HeaderText level={1} tags={tags}>
					{props.negotiation.name || 'Unnamed Negotiation'}
				</HeaderText>
				{getContent()}
			</div>
		</ErrorBoundary>
	);
};
