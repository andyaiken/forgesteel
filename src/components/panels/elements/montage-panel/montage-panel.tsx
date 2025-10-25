import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Flex, Space } from 'antd';
import { Montage, MontageChallenge, MontageSection } from '@/models/montage';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { MontageLogic } from '@/logic/montage-logic';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Pill } from '@/components/controls/pill/pill';
import { StatsRow } from '../../stats-row/stats-row';

import './montage-panel.scss';

interface Props {
	montage: Montage;
	heroes: Hero[];
	options: Options;
	mode?: PanelMode;
}

export const MontagePanel = (props: Props) => {
	const getChallenge = (challenge: MontageChallenge) => {
		return (
			<div key={challenge.id} className='montage-challenge'>
				<Flex align='center' justify='space-between' gap={10}>
					{challenge.uses > 1 ? <Pill>x{challenge.uses}</Pill> : null}
					<Field
						style={{ flex: '1 1 0', opacity: (challenge.successes + challenge.failures) >= challenge.uses ? 0.3 : 1 }}
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

	return (
		<ErrorBoundary>
			<div className={props.mode === PanelMode.Full ? 'montage-panel' : 'montage-panel compact'} id={props.mode === PanelMode.Full ? props.montage.id : undefined}>
				<HeaderText level={1}>{props.montage.name || 'Unnamed Montage'}</HeaderText>
				<Markdown text={props.montage.description} />
				{
					props.mode === PanelMode.Full ?
						<>
							<HeaderText>Difficulty</HeaderText>
							<StatsRow>
								<Field
									orientation='vertical'
									label='Difficulty'
									value={props.montage.difficulty}
								/>
								<Field
									orientation='vertical'
									label='Success Limit'
									value={(
										<Space>
											{MontageLogic.getSuccessLimit(props.montage, props.heroes, props.options)}
											<CheckCircleFilled style={{ color: 'rgb(0, 120, 0)' }} />
										</Space>
									)}
								/>
								<Field
									orientation='vertical'
									label='Failure Limit'
									value={(
										<Space>
											{MontageLogic.getFailureLimit(props.montage, props.heroes, props.options)}
											<CloseCircleFilled style={{ color: 'rgb(200, 0, 0)' }} />
										</Space>
									)}
								/>
							</StatsRow>
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
};
