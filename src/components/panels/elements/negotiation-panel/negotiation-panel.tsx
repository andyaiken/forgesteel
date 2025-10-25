import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Negotiation } from '@/models/negotiation';
import { NegotiationLogic } from '@/logic/negotiation-logic';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { StatsRow } from '../../stats-row/stats-row';

import './negotiation-panel.scss';

interface Props {
	negotiation: Negotiation;
	sourcebooks: Sourcebook[];
	mode?: PanelMode;
}

export const NegotiationPanel = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className={props.mode === PanelMode.Full ? 'negotiation-panel' : 'negotiation-panel compact'} id={props.mode === PanelMode.Full ? props.negotiation.id : undefined}>
				<HeaderText level={1}>{props.negotiation.name || 'Unnamed Negotiation'}</HeaderText>
				<Markdown text={props.negotiation.description} />
				{
					props.mode === PanelMode.Full ?
						<>
							<StatsRow>
								<Field orientation='vertical' label='Attitude' value={props.negotiation.attitude} />
								<Field orientation='vertical' label='Interest' value={props.negotiation.interest} />
								<Field orientation='vertical' label='Patience' value={props.negotiation.patience} />
								<Field orientation='vertical' label='Impression' value={props.negotiation.impression} />
							</StatsRow>
							<div className='negotiation-content'>
								<div>
									<HeaderText>Motivations</HeaderText>
									{props.negotiation.motivations.map((t, n) => <Field key={n} label={t.trait} value={<Markdown text={t.description || NegotiationLogic.getMotivationDescription(t.trait)} useSpan={true} />} />)}
									{props.negotiation.motivations.length === 0 ? <div className='ds-text dimmed-text'>None</div> : null}
								</div>
								<div>
									<HeaderText>Pitfalls</HeaderText>
									{props.negotiation.pitfalls.map((t, n) => <Field key={n} label={t.trait} value={<Markdown text={t.description || NegotiationLogic.getPitfallDescription(t.trait)} useSpan={true} />} />)}
									{props.negotiation.pitfalls.length === 0 ? <div className='ds-text dimmed-text'>None</div> : null}
								</div>
								<div>
									<HeaderText>Languages</HeaderText>
									{props.negotiation.languages.map(l => SourcebookLogic.getLanguage(l, props.sourcebooks)).filter(l => !!l).map((l, n) => <Field key={n} label={l.name} value={l.description} />)}
									{props.negotiation.languages.length === 0 ? <div className='ds-text dimmed-text'>None</div> : null}
								</div>
								<div>
									<HeaderText>Outcomes</HeaderText>
									<Field label='5' value={<Markdown text={props.negotiation.outcomes[5] || 'Yes, and...'} useSpan={true} />} />
									<Field label='4' value={<Markdown text={props.negotiation.outcomes[4] || 'Yes'} useSpan={true} />} />
									<Field label='3' value={<Markdown text={props.negotiation.outcomes[3] || 'Yes, but...'} useSpan={true} />} />
									<Field label='2' value={<Markdown text={props.negotiation.outcomes[2] || 'No, but...'} useSpan={true} />} />
									<Field label='1' value={<Markdown text={props.negotiation.outcomes[1] || 'No'} useSpan={true} />} />
									<Field label='0' value={<Markdown text={props.negotiation.outcomes[0] || 'No, and...'} useSpan={true} />} />
								</div>
							</div>
						</>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
