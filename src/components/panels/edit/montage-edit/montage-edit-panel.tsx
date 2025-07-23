import { Button, Input, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Characteristic } from '../../../../enums/characteristic';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Montage } from '../../../../models/montage';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NameGenerator } from '../../../../utils/name-generator';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './montage-edit-panel.scss';

interface Props {
	montage: Montage;
	onChange: (montage: Montage) => void;
}

export const MontageEditPanel = (props: Props) => {
	const [ montage, setMontage ] = useState<Montage>(props.montage);

	try {
		const getNameAndDescriptionSection = () => {
			const setName = (value: string) => {
				const copy = Utils.copy(montage);
				copy.name = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const setDescription = (value: string) => {
				const copy = Utils.copy(montage);
				copy.description = value;
				setMontage(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Name</HeaderText>
					<Input
						status={montage.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
						value={montage.name}
						onChange={e => setName(e.target.value)}
					/>
					<HeaderText>Description</HeaderText>
					<MultiLine value={montage.description} onChange={setDescription} />
				</Space>
			);
		};

		const getMontageSceneSection = () => {
			const setScene = (value: string) => {
				const copy = Utils.copy(montage);
				copy.scene = value;
				setMontage(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Setting the Scene</HeaderText>
					<MultiLine value={montage.scene} onChange={setScene} />
				</Space>
			);
		};

		const getMontageSectionsSection = () => {
			const addSection = () => {
				const copy = Utils.copy(montage);
				copy.sections.push(FactoryLogic.createMontageSection());
				setMontage(copy);
				props.onChange(copy);
			};

			const setSectionName = (index: number, value: string) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[index];
				s.name = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const setSectionDescription = (index: number, value: string) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[index];
				s.description = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const setSectionTwistInfo = (index: number, value: string) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[index];
				s.twistInfo = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const moveSection = (index: number, direction: 'up' | 'down') => {
				const copy = Utils.copy(montage);
				copy.sections = Collections.move(copy.sections, index, direction);
				setMontage(copy);
				props.onChange(copy);
			};

			const deleteSection = (id: string) => {
				const copy = Utils.copy(montage);
				copy.sections = copy.sections.filter(s => s.id !== id);
				setMontage(copy);
				props.onChange(copy);
			};

			const addChallenge = (sectionIndex: number) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				s.challenges.push(FactoryLogic.createMontageChallenge({
					id: Utils.guid(),
					name: '',
					description: ''
				}));
				setMontage(copy);
				props.onChange(copy);
			};

			const setChallengeName = (sectionIndex: number, challengeIndex: number, value: string) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				const c = s.challenges[challengeIndex];
				c.name = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const setChallengeDescription = (sectionIndex: number, challengeIndex: number, value: string) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				const c = s.challenges[challengeIndex];
				c.description = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const setChallengeCharacteristics = (sectionIndex: number, challengeIndex: number, value: Characteristic[]) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				const c = s.challenges[challengeIndex];
				c.characteristics = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const setChallengeSkills = (sectionIndex: number, challengeIndex: number, value: string) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				const c = s.challenges[challengeIndex];
				c.skills = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const setChallengeAbilities = (sectionIndex: number, challengeIndex: number, value: string) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				const c = s.challenges[challengeIndex];
				c.abilities = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const setChallengeUses = (sectionIndex: number, challengeIndex: number, value: number) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				const c = s.challenges[challengeIndex];
				c.uses = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const moveChallenge = (sectionIndex: number, challengeIndex: number, direction: 'up' | 'down') => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				s.challenges = Collections.move(s.challenges, challengeIndex, direction);
				setMontage(copy);
				props.onChange(copy);
			};

			const deleteChallenge = (sectionIndex: number, id: string) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				s.challenges = s.challenges.filter(c => c.id !== id);
				setMontage(copy);
				props.onChange(copy);
			};

			const addTwist = (sectionIndex: number) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				s.twists.push(FactoryLogic.createMontageChallenge({
					id: Utils.guid(),
					name: '',
					description: ''
				}));
				setMontage(copy);
				props.onChange(copy);
			};

			const setTwistName = (sectionIndex: number, twistIndex: number, value: string) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				const t = s.twists[twistIndex];
				t.name = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const setTwistDescription = (sectionIndex: number, twistIndex: number, value: string) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				const t = s.twists[twistIndex];
				t.description = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const setTwistCharacteristics = (sectionIndex: number, twistIndex: number, value: Characteristic[]) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				const t = s.twists[twistIndex];
				t.characteristics = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const setTwistSkills = (sectionIndex: number, twistIndex: number, value: string) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				const t = s.twists[twistIndex];
				t.skills = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const setTwistAbilities = (sectionIndex: number, twistIndex: number, value: string) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				const t = s.twists[twistIndex];
				t.abilities = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const setTwistUses = (sectionIndex: number, twistIndex: number, value: number) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				const t = s.twists[twistIndex];
				t.uses = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const moveTwist = (sectionIndex: number, twistIndex: number, direction: 'up' | 'down') => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				s.twists = Collections.move(s.twists, twistIndex, direction);
				setMontage(copy);
				props.onChange(copy);
			};

			const deleteTwist = (sectionIndex: number, id: string) => {
				const copy = Utils.copy(montage);
				const s = copy.sections[sectionIndex];
				s.twists = s.twists.filter(t => t.id !== id);
				setMontage(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText
						extra={
							<Button type='text' icon={<PlusOutlined />} onClick={addSection} />
						}
					>
						Sections
					</HeaderText>
					{
						montage.sections.map((s, sectionIndex) => (
							<Expander
								key={s.id}
								title={s.name || 'Section'}
								extra={[
									<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSection(sectionIndex, 'up'); }} />,
									<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSection(sectionIndex, 'down'); }} />,
									<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteSection(s.id); }} />
								]}
							>
								<Tabs
									items={[
										{
											key: '1',
											label: 'Section',
											children: (
												<div>
													<HeaderText>Name</HeaderText>
													<MultiLine value={s.name} onChange={value => setSectionName(sectionIndex, value)} />
													<HeaderText>Description</HeaderText>
													<MultiLine value={s.description} onChange={value => setSectionDescription(sectionIndex, value)} />
												</div>
											)
										},
										{
											key: '2',
											label: 'Challenges',
											children: (
												<Space direction='vertical' style={{ width: '100%' }}>
													<HeaderText
														extra={
															<Button type='text' icon={<PlusOutlined />} onClick={() => addChallenge(sectionIndex)} />
														}
													>
														Challenges
													</HeaderText>
													{
														s.challenges.map((c, challengeIndex) => (
															<Expander
																key={c.id}
																title={c.name || 'Challenge'}
																extra={[
																	<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveChallenge(sectionIndex, challengeIndex, 'up'); }} />,
																	<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveChallenge(sectionIndex, challengeIndex, 'down'); }} />,
																	<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteChallenge(sectionIndex, c.id); }} />
																]}
															>
																<HeaderText>Name</HeaderText>
																<Input
																	status={c.name === '' ? 'warning' : ''}
																	placeholder='Name'
																	allowClear={true}
																	value={c.name}
																	onChange={e => setChallengeName(sectionIndex, challengeIndex, e.target.value)}
																/>
																<HeaderText>Description</HeaderText>
																<MultiLine value={c.description} onChange={value => setChallengeDescription(sectionIndex, challengeIndex, value)} />
																<HeaderText>Characteristics</HeaderText>
																<Select
																	style={{ width: '100%' }}
																	status={c.characteristics.length < 2 ? 'warning' : ''}
																	mode='multiple'
																	placeholder='Select characteristics'
																	options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(ch => ({ value: ch }))}
																	optionRender={option => <div className='ds-text'>{option.data.value}</div>}
																	showSearch={true}
																	filterOption={(input, option) => {
																		const strings = option ?
																			[
																				option.value
																			]
																			: [];
																		return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
																	}}
																	value={c.characteristics}
																	onChange={value => setChallengeCharacteristics(sectionIndex, challengeIndex, value)}
																/>
																<HeaderText>Skills</HeaderText>
																<Input
																	status={c.skills === '' ? 'warning' : ''}
																	placeholder='Skills'
																	allowClear={true}
																	value={c.skills}
																	onChange={e => setChallengeSkills(sectionIndex, challengeIndex, e.target.value)}
																/>
																<HeaderText>Abilities</HeaderText>
																<Input
																	status={c.abilities === '' ? 'warning' : ''}
																	placeholder='Skills'
																	allowClear={true}
																	value={c.abilities}
																	onChange={e => setChallengeAbilities(sectionIndex, challengeIndex, e.target.value)}
																/>
																<HeaderText>Uses</HeaderText>
																<NumberSpin label='Uses' min={1} value={c.uses} onChange={value => setChallengeUses(sectionIndex, challengeIndex, value)} />
															</Expander>
														))
													}
													{
														s.challenges.length === 0 ?
															<Empty />
															: null
													}
												</Space>
											)
										},
										{
											key: '3',
											label: 'Twists',
											children: (
												<Space direction='vertical' style={{ width: '100%' }}>
													<HeaderText
														extra={
															<Button type='text' icon={<PlusOutlined />} onClick={() => addTwist(sectionIndex)} />
														}
													>
														Twists
													</HeaderText>
													<MultiLine value={s.twistInfo} onChange={value => setSectionTwistInfo(sectionIndex, value)} />
													{
														s.twists.map((t, twistIndex) => (
															<Expander
																key={t.id}
																title={t.name || 'Twist'}
																extra={[
																	<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveTwist(sectionIndex, twistIndex, 'up'); }} />,
																	<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveTwist(sectionIndex, twistIndex, 'down'); }} />,
																	<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteTwist(sectionIndex, t.id); }} />
																]}
															>
																<HeaderText>Name</HeaderText>
																<Input
																	status={t.name === '' ? 'warning' : ''}
																	placeholder='Name'
																	allowClear={true}
																	value={t.name}
																	onChange={e => setTwistName(sectionIndex, twistIndex, e.target.value)}
																/>
																<HeaderText>Description</HeaderText>
																<MultiLine value={t.description} onChange={value => setTwistDescription(sectionIndex, twistIndex, value)} />
																<HeaderText>Characteristics</HeaderText>
																<Select
																	style={{ width: '100%' }}
																	status={t.characteristics.length < 2 ? 'warning' : ''}
																	mode='multiple'
																	placeholder='Select characteristics'
																	options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(ch => ({ value: ch }))}
																	optionRender={option => <div className='ds-text'>{option.data.value}</div>}
																	showSearch={true}
																	filterOption={(input, option) => {
																		const strings = option ?
																			[
																				option.value
																			]
																			: [];
																		return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
																	}}
																	value={t.characteristics}
																	onChange={value => setTwistCharacteristics(sectionIndex, twistIndex, value)}
																/>
																<HeaderText>Skills</HeaderText>
																<Input
																	status={t.skills === '' ? 'warning' : ''}
																	placeholder='Skills'
																	allowClear={true}
																	value={t.skills}
																	onChange={e => setTwistSkills(sectionIndex, twistIndex, e.target.value)}
																/>
																<HeaderText>Abilities</HeaderText>
																<Input
																	status={t.abilities === '' ? 'warning' : ''}
																	placeholder='Skills'
																	allowClear={true}
																	value={t.abilities}
																	onChange={e => setTwistAbilities(sectionIndex, twistIndex, e.target.value)}
																/>
																<HeaderText>Uses</HeaderText>
																<NumberSpin label='Uses' min={1} value={t.uses} onChange={value => setTwistUses(sectionIndex, twistIndex, value)} />
															</Expander>
														))
													}
													{
														s.challenges.length === 0 ?
															<Empty />
															: null
													}
												</Space>
											)
										}
									]}
								/>
							</Expander>
						))
					}
					{
						montage.sections.length === 0 ?
							<Empty />
							: null
					}
				</Space>
			);
		};

		const getMontageOutcomesSection = () => {
			const setSuccess = (value: string) => {
				const copy = Utils.copy(montage);
				copy.outcomes.totalSuccess = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const setPartial = (value: string) => {
				const copy = Utils.copy(montage);
				copy.outcomes.partialSuccess = value;
				setMontage(copy);
				props.onChange(copy);
			};

			const setFailure = (value: string) => {
				const copy = Utils.copy(montage);
				copy.outcomes.totalFailure = value;
				setMontage(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Total Success</HeaderText>
					<MultiLine value={montage.outcomes.totalSuccess} onChange={setSuccess} />
					<HeaderText>Partial Success</HeaderText>
					<MultiLine value={montage.outcomes.partialSuccess} onChange={setPartial} />
					<HeaderText>Total Failure</HeaderText>
					<MultiLine value={montage.outcomes.totalFailure} onChange={setFailure} />
				</Space>
			);
		};

		return (
			<ErrorBoundary>
				<div className='montage-edit-panel'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Montage',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Scene',
								children: getMontageSceneSection()
							},
							{
								key: '3',
								label: 'Sections',
								children: getMontageSectionsSection()
							},
							{
								key: '4',
								label: 'Outcomes',
								children: getMontageOutcomesSection()
							}
						]}
					/>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
