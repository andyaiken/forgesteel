import { Career } from '../../../../models/career';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { PanelMode } from '../../../../enums/panel-mode';
import { Utils } from '../../../../utils/utils';

import './career-panel.scss';

interface Props {
	career: Career;
	hero?: Hero;
	mode?: PanelMode;
}

export const CareerPanel = (props: Props) => {
	const getIncitingIncidents = () => {
		const option = props.career.incitingIncidents.options.find(o => o.id === props.career.incitingIncidents.selectedID);
		if (!option) {
			return (
				<div>
					<HeaderText>Inciting Incidents</HeaderText>
					{props.career.incitingIncidents.options.map(option => <Field key={option.id} label={option.name} value={option.description} />)}
				</div>
			);
		}

		return (
			<div>
				<HeaderText>Inciting Incident</HeaderText>
				<Field key={option.id} label={option.name} value={option.description} />
			</div>
		);
	};

	try {
		return (
			<div className='career-panel' id={props.mode === PanelMode.Full ? props.career.id : undefined}>
				<HeaderText level={1}>{props.career.name || 'Unnamed Career'}</HeaderText>
				{props.career.description ? <div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.career.description) }} /> : null}
				{
					props.mode === PanelMode.Full ?
						<div>
							{props.career.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} mode={PanelMode.Full} />)}
							{getIncitingIncidents()}
						</div>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
