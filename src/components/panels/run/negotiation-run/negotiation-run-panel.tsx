import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationLogic } from '../../../../logic/negotiation-logic';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Progress } from 'antd';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './negotiation-run-panel.scss';

interface Props {
	negotiation: Negotiation;
	onChange: (negotiation: Negotiation) => void;
}

export const NegotiationRunPanel = (props: Props) => {
	const [ negotiation, setNegotiation ] = useState<Negotiation>(Utils.copy(props.negotiation));

	const setImpression = (value: number) => {
		const copy = Utils.copy(negotiation);
		copy.impression = value;
		setNegotiation(copy);
		props.onChange(copy);
	};

	const setInterest = (value: number) => {
		const copy = Utils.copy(negotiation);
		copy.interest = value;
		setNegotiation(copy);
		props.onChange(copy);
	};

	const setPatience = (value: number) => {
		const copy = Utils.copy(negotiation);
		copy.patience = value;
		setNegotiation(copy);
		props.onChange(copy);
	};

	try {
		return (
			<ErrorBoundary>
				<div className='negotiation-run-panel' id={negotiation.id}>
					<HeaderText level={1}>{props.negotiation.name || 'Unnamed Negotiation'}</HeaderText>
					<Markdown text={props.negotiation.description} />
					<div className='stats'>
						<NumberSpin min={0} max={20} value={negotiation.impression} onChange={setImpression}>
							<Field orientation='vertical' label='Impression' value={negotiation.impression} />
						</NumberSpin>
						<NumberSpin min={0} max={5} value={negotiation.interest} onChange={setInterest}>
							<Field orientation='vertical' label='Interest' value={<Progress percent={negotiation.interest * 20} steps={5} showInfo={false} />} />
						</NumberSpin>
						<NumberSpin min={0} max={5} value={negotiation.patience} onChange={setPatience}>
							<Field orientation='vertical' label='Patience' value={<Progress percent={negotiation.patience * 20} steps={5} showInfo={false} />} />
						</NumberSpin>
					</div>
					<div className='negotiation-content'>
						<div>
							<HeaderText>Motivations</HeaderText>
							{props.negotiation.motivations.map((t, n) => <Field key={n} label={t.trait} value={t.description || NegotiationLogic.getMotivationDescription(t.trait)} />)}
							{props.negotiation.motivations.length === 0 ? <div className='ds-text dimmed-text'>None</div> : null}
						</div>
						<div>
							<HeaderText>Pitfalls</HeaderText>
							{props.negotiation.pitfalls.map((t, n) => <Field key={n} label={t.trait} value={t.description || NegotiationLogic.getPitfallDescription(t.trait)} />)}
							{props.negotiation.pitfalls.length === 0 ? <div className='ds-text dimmed-text'>None</div> : null}
						</div>
						<div>
							<HeaderText>Outcomes</HeaderText>
							<Field disabled={negotiation.interest !== 5} label='5' value={<Markdown text={props.negotiation.outcomes[5] || 'Yes, and...'} useSpan={true} />} />
							<Field disabled={negotiation.interest !== 4} label='4' value={<Markdown text={props.negotiation.outcomes[4] || 'Yes'} useSpan={true} />} />
							<Field disabled={negotiation.interest !== 3} label='3' value={<Markdown text={props.negotiation.outcomes[3] || 'Yes, but...'} useSpan={true} />} />
							<Field disabled={negotiation.interest !== 2} label='2' value={<Markdown text={props.negotiation.outcomes[2] || 'No, but...'} useSpan={true} />} />
							<Field disabled={negotiation.interest !== 1} label='1' value={<Markdown text={props.negotiation.outcomes[1] || 'No'} useSpan={true} />} />
							<Field disabled={negotiation.interest !== 0} label='0' value={<Markdown text={props.negotiation.outcomes[0] || 'No, and...'} useSpan={true} />} />
						</div>
					</div>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
