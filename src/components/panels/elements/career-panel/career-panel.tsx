import { Career } from '../../../../models/career';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Markdown } from '../../../controls/markdown/markdown';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';

import './career-panel.scss';

interface Props {
	career: Career;
	options: Options;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
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
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'career-panel' : 'career-panel compact'} id={props.mode === PanelMode.Full ? props.career.id : undefined}>
					<HeaderText level={1}>{props.career.name || 'Unnamed Career'}</HeaderText>
					<Markdown text={props.career.description} />
					{
						props.mode === PanelMode.Full ?
							<div>
								{props.career.features.map(f => <FeaturePanel key={f.id} feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />)}
								{getIncitingIncidents()}
							</div>
							: null
					}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
