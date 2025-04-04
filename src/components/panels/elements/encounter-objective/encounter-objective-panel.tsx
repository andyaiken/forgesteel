import { EncounterObjective } from '../../../../models/encounter';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { PanelMode } from '../../../../enums/panel-mode';

import './encounter-objective-panel.scss';

interface Props {
	objective: EncounterObjective;
	mode?: PanelMode;
}

export const EncounterObjectivePanel = (props: Props) => {
	try {
		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'encounter-objective-panel' : 'encounter-objective-panel compact'} id={props.mode === PanelMode.Full ? props.objective.id : undefined}>
					<HeaderText level={1}>{props.objective.name || 'Unnamed Objective'}</HeaderText>
					<Markdown text={props.objective.description} />
					{
						props.mode === PanelMode.Full ?
							<>
								<Field label='Difficulty Modifier' value={<Markdown text={props.objective.difficultyModifier} useSpan={true} />} />
								<Field label='Success Condition' value={<Markdown text={props.objective.successCondition} useSpan={true} />} />
								<Field label='Failure Condition' value={<Markdown text={props.objective.failureCondition} useSpan={true} />} />
								<Field label='Victories' value={<Markdown text={props.objective.victories} useSpan={true} />} />
							</>
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
