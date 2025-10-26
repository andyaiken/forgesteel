import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Flex, Segmented, Space } from 'antd';
import { Montage, MontageChallenge, MontageSection } from '@/models/montage';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureFlags } from '@/utils/feature-flags';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { MontageLogic } from '@/logic/montage-logic';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Pill } from '@/components/controls/pill/pill';
import { StatsRow } from '../../stats-row/stats-row';
import { useState } from 'react';

import './montage-panel.scss';

interface Props {
	montage: Montage;
	heroes: Hero[];
	options: Options;
	mode?: PanelMode;
}

export const MontagePanel = (props: Props) => {
	const [ page, setPage ] = useState<string>('overview');

	const isInteractive = FeatureFlags.hasFlag(FeatureFlags.interactiveContent.code) && props.options.showInteractivePanels;

	const getOverview = () => {
		return (
			<>
				<Markdown text={props.montage.description} />
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
			</>
		);
	};

	const getSection = (section: MontageSection) => {
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

		return (
			<div key={section.id} className='montage-section'>
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

	const getOutcomes = () => {
		return (
			<>
				<Field label='Total Success' value={<Markdown text={props.montage.outcomes.totalSuccess} useSpan={true} />} />
				<Field label='Partial Success' value={<Markdown text={props.montage.outcomes.partialSuccess} useSpan={true} />} />
				<Field label='Total Failure' value={<Markdown text={props.montage.outcomes.totalFailure} useSpan={true} />} />
			</>
		);
	};

	const getContent = () => {
		if (isInteractive) {
			let content = null;
			switch (page) {
				case 'overview':
					content = getOverview();
					break;
				case 'outcomes':
					content = getOutcomes();
					break;
				default:
					content = getSection(props.montage.sections.find(s => s.id === page) as MontageSection);
					break;
			}

			return (
				<>
					<Segmented
						style={{ marginBottom: '20px' }}
						block={true}
						options={[
							{ value: 'overview', label: 'Overview' },
							...props.montage.sections.map(s => ({ value: s.id, label: s.name })),
							{ value: 'outcomes', label: 'Outcomes' }
						]}
						value={page}
						onChange={setPage}
					/>
					{content}
				</>
			);
		}

		return (
			<>
				{getOverview()}
				<HeaderText level={1}>Outcomes</HeaderText>
				{
					props.montage.sections.map(s => {
						return (
							<>
								<HeaderText>{s.name}</HeaderText>
								{getSection(s)}
							</>
						);
					})
				}
				{getOutcomes()}
			</>
		);
	};

	if (props.mode !== PanelMode.Full) {
		return (
			<div className='montage-panel compact'>
				<HeaderText level={1}>
					{props.montage.name || 'Unnamed Montage'}
				</HeaderText>
				<Markdown text={props.montage.description} />
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<div className='montage-panel' id={props.montage.id}>
				<HeaderText level={1}>{props.montage.name || 'Unnamed Montage'}</HeaderText>
				{getContent()}
			</div>
		</ErrorBoundary>
	);
};
