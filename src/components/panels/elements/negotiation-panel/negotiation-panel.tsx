import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationLogic } from '../../../../logic/negotiation-logic';
import { PanelMode } from '../../../../enums/panel-mode';

import './negotiation-panel.scss';

interface Props {
	negotiation: Negotiation;
	mode?: PanelMode;
}

export const NegotiationPanel = (props: Props) => {
	try {
		return (
			<div className={props.mode === PanelMode.Full ? 'negotiation-panel' : 'negotiation-panel compact'} id={props.mode === PanelMode.Full ? props.negotiation.id : undefined}>
				<HeaderText level={1}>{props.negotiation.name || 'Unnamed Negotiation'}</HeaderText>
				<Markdown text={props.negotiation.description} />
				{
					props.mode === PanelMode.Full ?
						<>
							<Field label='Interest' value={props.negotiation.interest} />
							<Field label='Patience' value={props.negotiation.patience} />
							<HeaderText>Motivations</HeaderText>
							{props.negotiation.motivations.map((nt, n) => <Field key={n} label={nt} value={NegotiationLogic.getMotivationDescription(nt)} />)}
							{props.negotiation.motivations.length === 0 ? <div className='ds-text dimmed-text'>None</div> : null}
							<HeaderText>Pitfalls</HeaderText>
							{props.negotiation.pitfalls.map((nt, n) => <Field key={n} label={nt} value={NegotiationLogic.getPitfallDescription(nt)} />)}
							{props.negotiation.pitfalls.length === 0 ? <div className='ds-text dimmed-text'>None</div> : null}
						</>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
