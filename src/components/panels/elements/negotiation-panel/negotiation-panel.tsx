import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationLogic } from '../../../../logic/negotiation-logic';
import { PanelMode } from '../../../../enums/panel-mode';
import { Progress } from 'antd';

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
							<div className='stats'>
								{props.negotiation.impression ? <Field orientation='vertical' label='Impression' value={props.negotiation.impression} /> : null}
								<Field orientation='vertical' label='Starting Interest' value={<Progress percent={props.negotiation.interest * 20} steps={5} showInfo={false} />} />
								<Field orientation='vertical' label='Starting Patience' value={<Progress percent={props.negotiation.patience * 20} steps={5} showInfo={false} />} />
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
							</div>
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
