import { Divider, Progress, Select, Space } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { Field } from '@/components/controls/field/field';
import { Format } from '@/utils/format';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Negotiation } from '@/models/negotiation';
import { NegotiationLogic } from '@/logic/negotiation-logic';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './negotiation-run-panel.scss';

interface Props {
	negotiation: Negotiation;
	onChange: (negotiation: Negotiation) => void;
}

export const NegotiationRunPanel = (props: Props) => {
	const [ negotiation, setNegotiation ] = useState<Negotiation>(Utils.copy(props.negotiation));
	const [ attitude, setAttitude ] = useState<string>();

	const updateAttitude = (value: string) => {
		setAttitude(value);

		const copy = Utils.copy(negotiation);
		switch (value) {
			case 'hostile':
				copy.interest = 1;
				copy.patience = 2;
				break;
			case 'suspicious':
				copy.interest = 2;
				copy.patience = 2;
				break;
			case 'neutral':
				copy.interest = 2;
				copy.patience = 3;
				break;
			case 'open':
				copy.interest = 3;
				copy.patience = 3;
				break;
			case 'friendly':
				copy.interest = 3;
				copy.patience = 4;
				break;
			case 'trusting':
				copy.interest = 3;
				copy.patience = 5;
				break;
		}
		setNegotiation(copy);
		props.onChange(copy);
	};

	const setInterest = (value: number) => {
		const copy = Utils.copy(negotiation);
		copy.interest = value;
		setNegotiation(copy);
		props.onChange(copy);
	};

	const setPatience = (value: number) => {
		const copy = Utils.copy(negotiation);
		copy.patience = value;
		setNegotiation(copy);
		props.onChange(copy);
	};

	return (
		<ErrorBoundary>
			<div className='negotiation-run-panel' id={negotiation.id}>
				<HeaderText level={1}>{props.negotiation.name || 'Unnamed Negotiation'}</HeaderText>
				<Markdown text={props.negotiation.description} />
				<div className='stats'>
					<Field
						orientation='vertical'
						label='Starting Attitude'
						value={
							<Select
								style={{ width: '120px' }}
								placeholder='Select'
								status={attitude ? '' : 'warning'}
								options={[ 'hostile', 'suspicious', 'neutral', 'open', 'friendly', 'trusting' ].map(o => ({ value: o, label: <div className='ds-text'>{Format.capitalize(o)}</div> }))}
								value={attitude}
								onChange={updateAttitude}
							/>
						}
					/>
					{
						attitude ?
							<>
								<NumberSpin min={0} max={5} value={negotiation.interest} onChange={setInterest}>
									<Field
										orientation='vertical'
										label='Interest'
										value={<Progress percent={negotiation.interest * 20} steps={5} showInfo={false} />}
									/>
								</NumberSpin>
								<NumberSpin min={0} max={5} value={negotiation.patience} onChange={setPatience}>
									<Field
										orientation='vertical'
										label='Patience'
										value={<Progress percent={negotiation.patience * 20} steps={5} showInfo={false} />}
									/>
								</NumberSpin>
							</>
							: null
					}
				</div>
				<Field label='Impression' value={`${negotiation.impression}: If a hero is famous to an NPC, they gain an edge on tests when making arguments to which the Flirt, Lead, or Persuade skill could be applied. If they are infamous to the NPC, they gain an edge on tests when making arguments to which the Brag, Interrogate, or Intimidate skill could be applied. A hero gains this edge even if they don’t have the appropriate skill.`} />
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
					<div>
						<HeaderText>Outcomes</HeaderText>
						<Field highlight={negotiation.interest === 5} label='5' value={<Markdown text={props.negotiation.outcomes[5] || 'Yes, and...'} useSpan={true} />} />
						<Field highlight={negotiation.interest === 4} label='4' value={<Markdown text={props.negotiation.outcomes[4] || 'Yes'} useSpan={true} />} />
						<Field highlight={negotiation.interest === 3} label='3' value={<Markdown text={props.negotiation.outcomes[3] || 'Yes, but...'} useSpan={true} />} />
						<Field highlight={negotiation.interest === 2} label='2' value={<Markdown text={props.negotiation.outcomes[2] || 'No, but...'} useSpan={true} />} />
						<Field highlight={negotiation.interest === 1} label='1' value={<Markdown text={props.negotiation.outcomes[1] || 'No'} useSpan={true} />} />
						<Field highlight={negotiation.interest === 0} label='0' value={<Markdown text={props.negotiation.outcomes[0] || 'No, and...'} useSpan={true} />} />
					</div>
				</div>
				<Divider />
				<Space direction='vertical' style={{ width: '100%' }}>
					<Expander title='Uncovering Motivations'>
						<Markdown
							text={`
If a hero wishes to figure out an NPC’s motivations, they can begin by simply asking, “What do you want out of this deal?” In response, the NPC can willingly hint at or reveal one of their motivations, usually by asking for something. For instance, a monarch NPC with the greed motivation and a penchant for collecting rare animals might suggest that the heroes retrieving a griffon egg would earn the monarch’s gratitude. The Director can also decide that during the natural course of the negotiation, the NPC might offer up similar suggestions without the heroes asking, provided the NPC already has an interest of 3 or higher. If an NPC isn’t as forthcoming, or if the heroes want to learn one of the NPC’s pitfalls, a hero can make a Reason, Intuition, or Presence test while interacting with the NPC during the negotiation, based on the tactics used to draw out the NPC. The test has the following outcomes:

**Power Roll + Reason, Intuition, or Presence:**

| Roll    | Effect                                                                                                                                                                                                      |
|:--------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ≤ 11    | The hero learns no information regarding the NPC’s motivations or pitfalls, and the NPC realizes the hero is trying to read them and becomes annoyed. As a consequence, the NPC’s patience is reduced by 1. |
| 12 - 16 | The hero learns no information regarding the NPC’s motivations or pitfalls.                                                                                                                                 |
| ≥ 17    | The hero learns one of the NPC’s motivations or pitfalls (their choice).                                                                                                                                    |

After this test is made, the heroes can’t make another test to determine the same NPC’s motivations or pitfalls until they make an argument to the NPC or the negotiation ends.`}
						/>
					</Expander>
					<Expander title='Appeal to Motivation'>
						<Markdown
							text={`
If an argument doesn’t include a pitfall and appeals to one of the NPC’s motivations that hasn’t already been appealed to, the hero making the argument can make an medium test to attempt to sway the NPC with the argument. Depending on the argument, this can be a Reason, Intuition, or Presence test using any applicable skill—most commonly a skill from the interpersonal skill group. The test has the following outcomes:

**Power Roll + Reason, Intuition, or Presence:**

| Roll    | Effect                                                                |
|:--------|:----------------------------------------------------------------------|
| ≤ 11    | The NPC’s patience decreases by 1.                                    |
| 12 - 16 | The NPC’s interest increases by 1, and their patience decreases by 1. |
| ≥ 17    | The NPC’s interest increases by 1, and their patience doesn’t change. |

At the Director’s discretion, a particularly well-roleplayed or well-reasoned argument automatically counts as a tier 3 outcome without a test. Good roleplaying should be rewarded!

If the heroes attempt to appeal to a motivation that’s already been appealed to, the NPC’s interest remains the same and their patience decreases by 1.`}
						/>
					</Expander>
					<Expander title='No Motivation or Pitfall'>
						<Markdown
							text={`
If an argument doesn’t include one of the NPC’s motivations or pitfalls, the hero who makes the argument must make a more difficult test to appeal to the NPC. The test has the following outcomes:

**Power Roll + Reason, Intuition, or Presence:**

| Roll    | Effect                                                                |
|:--------|:----------------------------------------------------------------------|
| ≤ 11    | The NPC’s patience decreases by 1, and their interest decreases by 1. |
| 12 - 16 | The NPC’s patience decreases by 1.                                    |
| ≥ 17    | The NPC’s interest increases by 1, and their patience decreases by 1. |
| 19 / 20 | The NPC’s interest increases by 1.                                    |

If the heroes try to use the same argument without a pitfall or motivation twice, the test automatically obtains a tier 1 outcome.`}
						/>
					</Expander>
					<Expander title='Caught in a Lie'>
						<Markdown text='If a hero lies to an NPC with an argument that fails to increase the NPC’s interest, the Director can decide that the NPC catches the lie and is offended by it. The NPC’s interest decreases by 1, in addition to any decrease imposed by the failure.' />
					</Expander>
					<Expander title='Pitfall Used'>
						<Markdown text='If an argument uses one of the NPC’s pitfalls, it automatically fails and the NPC’s interest and patience each decrease by 1. The NPC might also warn the heroes not to treat them in such a way again.' />
					</Expander>
				</Space>
			</div>
		</ErrorBoundary>
	);
};
