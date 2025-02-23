import { Badge } from '../../../controls/badge/badge';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { Montage } from '../../../../models/montage';
import { PanelMode } from '../../../../enums/panel-mode';

import './montage-panel.scss';

interface Props {
	montage: Montage;
	mode?: PanelMode;
}

export const MontagePanel = (props: Props) => {
	try {
		return (
			<div className={props.mode === PanelMode.Full ? 'montage-panel' : 'montage-panel compact'} id={props.mode === PanelMode.Full ? props.montage.id : undefined}>
				<HeaderText level={1}>{props.montage.name || 'Unnamed Montage'}</HeaderText>
				<Markdown text={props.montage.description} />
				{
					props.mode === PanelMode.Full ?
						<>
							<HeaderText>Setting the Scene</HeaderText>
							<Markdown text={props.montage.scene} />
							{
								props.montage.sections.map(s => (
									<div key={s.id}>
										<HeaderText>{s.name}</HeaderText>
										<Markdown text={s.description} />
										<HeaderText>{s.name || 'Montage'} Challenges</HeaderText>
										{
											s.challenges.map(c => (
												<Field
													key={c.id}
													label={(
														<div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
															<span>{c.name}</span>
															{c.uses > 1 ? <Badge>x{c.uses}</Badge> : null}
														</div>
													)}
													value={
														<Markdown text={c.description} useSpan={true} />
													}
												/>
											))
										}
										{(s.twists.length > 0) || (s.twistInfo !== '') ? <HeaderText>Optional Twists</HeaderText> : null}
										<Markdown text={s.twistInfo} />
										{
											s.twists.map(t => (
												<Field
													key={t.id}
													label={t.name}
													value={
														<Markdown text={t.description} useSpan={true} />
													}
												/>
											))
										}
									</div>
								))
							}
							<div>
								<HeaderText>Montage Test Outcomes</HeaderText>
								<Field label='Total Success' value={<Markdown text={props.montage.outcomes.totalSuccess} useSpan={true} />} />
								<Field label='Partial Success' value={<Markdown text={props.montage.outcomes.partialSuccess} useSpan={true} />} />
								<Field label='Total Failure' value={<Markdown text={props.montage.outcomes.totalFailure} useSpan={true} />} />
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
