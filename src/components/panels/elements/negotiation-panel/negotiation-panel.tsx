import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { Negotiation } from '../../../../models/negotiation';
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
							<Field label='Motivations' value={props.negotiation.motivations.join(', ') || 'None'} />
							<Field label='Pitfalls' value={props.negotiation.pitfalls.join(', ') || 'None'} />
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
