import { Montage, MontageChallenge, MontageSection } from '../../../../models/montage';
import { Badge } from '../../../controls/badge/badge';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Field } from '../../../controls/field/field';
import { Flex } from 'antd';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { PanelMode } from '../../../../enums/panel-mode';

import './montage-panel.scss';

interface Props {
	montage: Montage;
	mode?: PanelMode;
}

export const MontagePanel = (props: Props) => {
	const getChallenge = (challenge: MontageChallenge) => {
		return (
			<div key={challenge.id} className='montage-challenge'>
				<Flex align='center' justify='space-between' gap={10}>
					{challenge.uses > 1 ? <Badge>x{challenge.uses}</Badge> : null}
					<Field
						style={{ flex: '1 1 0', opacity: (challenge.successes + challenge.failures)>= challenge.uses ? 0.3 : 1 }}
						label={challenge.name}
						value={
							<Markdown text={challenge.description} useSpan={true} />
						}
					/>
				</Flex>
			</div>
		);
	};

	const getSection = (section: MontageSection) => {
		return (
			<div key={section.id} className='montage-section'>
				<HeaderText>{section.name}</HeaderText>
				<Markdown text={section.description} />
				<HeaderText>{section.name || 'Montage'} Challenges</HeaderText>
				{section.challenges.map(getChallenge)}
				{(section.twists.length > 0) || (section.twistInfo !== '') ? <HeaderText>Optional Twists</HeaderText> : null}
				<Markdown text={section.twistInfo} />
				{
					section.twists.map(t => (
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
		);
	};

	try {
		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'montage-panel' : 'montage-panel compact'} id={props.mode === PanelMode.Full ? props.montage.id : undefined}>
					<HeaderText level={1}>{props.montage.name || 'Unnamed Montage'}</HeaderText>
					<Markdown text={props.montage.description} />
					{
						props.mode === PanelMode.Full ?
							<>
								<HeaderText>Setting the Scene</HeaderText>
								<Markdown text={props.montage.scene} />
								{props.montage.sections.map(getSection)}
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
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
