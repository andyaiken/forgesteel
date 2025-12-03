import { Button, Flex, Space } from 'antd';
import { CheckOutlined, CloseOutlined, SyncOutlined } from '@ant-design/icons';
import { Montage, MontageChallenge, MontageSection } from '@/models/montage';
import { CheckIcon } from '@/components/controls/check-icon/check-icon';
import { Collections } from '@/utils/collections';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { MontageLogic } from '@/logic/montage-logic';
import { Options } from '@/models/options';
import { Pill } from '@/components/controls/pill/pill';
import { StatsRow } from '@/components/panels/stats-row/stats-row';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './montage-run-panel.scss';

interface Props {
	montage: Montage;
	heroes: Hero[];
	options: Options;
	onChange: (montage: Montage) => void;
}

export const MontageRunPanel = (props: Props) => {
	const [ montage, setMontage ] = useState<Montage>(Utils.copy(props.montage));

	const getChallenge = (challenge: MontageChallenge, sectionIndex: number, challengeIndex: number) => {
		const addSuccess = () => {
			const copy = Utils.copy(montage);
			const section = copy.sections[sectionIndex];
			const challenge = section.challenges[challengeIndex];

			challenge.successes += 1;

			setMontage(copy);
			props.onChange(copy);
		};

		const addFailure = () => {
			const copy = Utils.copy(montage);
			const section = copy.sections[sectionIndex];
			const challenge = section.challenges[challengeIndex];

			challenge.failures += 1;

			setMontage(copy);
			props.onChange(copy);
		};

		const reset = () => {
			const copy = Utils.copy(montage);
			const section = copy.sections[sectionIndex];
			const challenge = section.challenges[challengeIndex];

			challenge.successes = 0;
			challenge.failures = 0;

			setMontage(copy);
			props.onChange(copy);
		};

		const getIcons = () => {
			const icons = [];

			for (let n = 0; n < challenge.successes; ++n) {
				icons.push(<CheckIcon key={`success-${n}`} state='success' />);
			}

			for (let n = 0; n < challenge.failures; ++n) {
				icons.push(<CheckIcon key={`failure-${n}`} state='failure' />);
			}

			while (icons.length < challenge.uses) {
				icons.push(<CheckIcon key={`pending-${icons.length}`} />);
			}

			return icons;
		};

		return (
			<div key={challenge.id} className='montage-challenge'>
				<Flex align='center' justify='space-between' gap={10}>
					<div className='status'>
						{getIcons()}
					</div>
					{challenge.uses > 1 ? <Pill>x{challenge.uses}</Pill> : null}
					<Field
						style={{ flex: '1 1 0', opacity: (challenge.successes + challenge.failures) >= challenge.uses ? 0.3 : 1 }}
						label={challenge.name}
						value={
							<Markdown text={challenge.description} useSpan={true} />
						}
					/>
					<Flex gap={3}>
						<Button title='Add a success' icon={<CheckOutlined />} onClick={addSuccess} />
						<Button title='Add a failure' icon={<CloseOutlined />} onClick={addFailure} />
						<Button title='Reset' icon={<SyncOutlined />} onClick={reset} />
					</Flex>
				</Flex>
			</div>
		);
	};

	const getSection = (section: MontageSection, index: number) => {
		const successes = Collections.sum(section.challenges, c => c.successes);
		const failures = Collections.sum(section.challenges, c => c.failures);

		return (
			<div key={section.id} className='montage-section'>
				<HeaderText>{section.name}</HeaderText>
				<Markdown text={section.description} />
				<StatsRow>
					<Field
						orientation='vertical'
						label='Successes'
						value={(
							<Space>
								{successes}
								<CheckIcon state='success' />
							</Space>
						)}
					/>
					<Field
						orientation='vertical'
						label='Failures'
						value={(
							<Space>
								{failures}
								<CheckIcon state='failure' />
							</Space>
						)}
					/>
				</StatsRow>
				<HeaderText>{section.name || 'Montage'} Challenges</HeaderText>
				{section.challenges.map((c, n) => getChallenge(c, index, n))}
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

	const successes = Collections.sum(montage.sections, s => Collections.sum(s.challenges, c => c.successes));
	const failures = Collections.sum(montage.sections, s => Collections.sum(s.challenges, c => c.failures));
	const successLimit = MontageLogic.getSuccessLimit(props.montage, props.heroes, props.options);
	const failureLimit = MontageLogic.getFailureLimit(props.montage, props.heroes, props.options);
	const outcome = MontageLogic.getOutcome(props.montage, props.heroes, props.options);

	return (
		<ErrorBoundary>
			<div className='montage-run-panel' id={montage.id}>
				<HeaderText level={1}>{montage.name || 'Unnamed Montage'}</HeaderText>
				<Markdown text={montage.description} />
				<StatsRow>
					<Field
						orientation='vertical'
						label='Difficulty'
						value={props.montage.difficulty}
					/>
					<Field
						orientation='vertical'
						label='Successes'
						value={(
							<Space>
								{successes} / {successLimit}
								<CheckIcon state='success' />
							</Space>
						)}
					/>
					<Field
						orientation='vertical'
						label='Failures'
						value={(
							<Space>
								{failures} / {failureLimit}
								<CheckIcon state='failure' />
							</Space>
						)}
					/>
					<Field
						orientation='vertical'
						label='Outcome'
						value={outcome}
					/>
				</StatsRow>
				<HeaderText>Setting the Scene</HeaderText>
				<Markdown text={montage.scene} />
				{montage.sections.map(getSection)}
				<div>
					<HeaderText>Montage Test Outcomes</HeaderText>
					<Field label='Total Success' value={<Markdown text={montage.outcomes.totalSuccess} useSpan={true} />} />
					<Field label='Partial Success' value={<Markdown text={montage.outcomes.partialSuccess} useSpan={true} />} />
					<Field label='Total Failure' value={<Markdown text={montage.outcomes.totalFailure} useSpan={true} />} />
				</div>
			</div>
		</ErrorBoundary>
	);
};
