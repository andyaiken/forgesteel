import { Button, Flex, Space } from 'antd';
import { CheckCircleFilled, CheckOutlined, CloseCircleFilled, CloseOutlined, EllipsisOutlined, SyncOutlined } from '@ant-design/icons';
import { Montage, MontageChallenge, MontageSection } from '../../../../models/montage';
import { Badge } from '../../../controls/badge/badge';
import { Collections } from '../../../../utils/collections';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './montage-run-panel.scss';

interface Props {
	montage: Montage;
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
				icons.push(<CheckCircleFilled key={`s${n}`} style={{ color: 'rgb(0, 120, 0)' }} />);
			}

			for (let n = 0; n < challenge.failures; ++n) {
				icons.push(<CloseCircleFilled key={`f${n}`} style={{ color: 'rgb(200, 0, 0)' }} />);
			}

			while (icons.length < challenge.uses) {
				icons.push(<EllipsisOutlined key={`x${icons.length}`} />);
			}

			return icons;
		};

		return (
			<div key={challenge.id} className='montage-challenge'>
				<Flex align='center' justify='space-between' gap={10}>
					<div className='status'>
						{getIcons()}
					</div>
					{challenge.uses > 1 ? <Badge>x{challenge.uses}</Badge> : null}
					<Field
						style={{ flex: '1 1 0', opacity: (challenge.successes + challenge.failures)>= challenge.uses ? 0.3 : 1 }}
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
				<div className='stats'>
					<Field
						orientation='vertical'
						label='Successes'
						value={(
							<Space>
								{successes}
								<CheckCircleFilled style={{ color: 'rgb(0, 120, 0)' }} />
							</Space>
						)}
					/>
					<Field
						orientation='vertical'
						label='Failures'
						value={(
							<Space>
								{failures}
								<CloseCircleFilled style={{ color: 'rgb(200, 0, 0)' }} />
							</Space>
						)}
					/>
				</div>
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

	try {
		return (
			<ErrorBoundary>
				<div className='montage-run-panel' id={montage.id}>
					<HeaderText level={1}>{montage.name || 'Unnamed Montage'}</HeaderText>
					<Markdown text={montage.description} />
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
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
