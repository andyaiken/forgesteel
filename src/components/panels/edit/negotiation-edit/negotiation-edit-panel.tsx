import { Button, Input, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NameGenerator } from '../../../../utils/name-generator';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationLogic } from '../../../../logic/negotiation-logic';
import { NegotiationTrait } from '../../../../enums/negotiation-trait';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './negotiation-edit-panel.scss';

interface Props {
	negotiation: Negotiation;
	onChange: (negotiation: Negotiation) => void;
}

export const NegotiationEditPanel = (props: Props) => {
	const [ negotiation, setNegotiation ] = useState<Negotiation>(props.negotiation);

	try {
		const getNameAndDescriptionSection = () => {
			const setName = (value: string) => {
				const copy = Utils.copy(negotiation);
				copy.name = value;
				setNegotiation(copy);
				props.onChange(copy);
			};

			const setDescription = (value: string) => {
				const copy = Utils.copy(negotiation);
				copy.description = value;
				setNegotiation(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Name</HeaderText>
					<Input
						status={negotiation.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
						value={negotiation.name}
						onChange={e => setName(e.target.value)}
					/>
					<HeaderText>Description</HeaderText>
					<MultiLine value={negotiation.description} onChange={setDescription} />
				</Space>
			);
		};

		const getNegotiationDetailsSection = () => {
			const setImpression = (value: number) => {
				const copy = Utils.copy(negotiation);
				copy.impression = value;
				setNegotiation(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<NumberSpin label='Impression' min={0} max={15} value={negotiation.impression} onChange={setImpression} />
				</Space>
			);
		};

		const getNegotiationMotivationsSection = () => {
			const addMotivation = () => {
				const copy = Utils.copy(negotiation);
				copy.motivations.push({
					trait: NegotiationTrait.Benevolence,
					description: ''
				});
				setNegotiation(copy);
				props.onChange(copy);
			};

			const setMotivationTrait = (index: number, value: NegotiationTrait) => {
				const copy = Utils.copy(negotiation);
				const m = copy.motivations[index];
				m.trait = value;
				setNegotiation(copy);
				props.onChange(copy);
			};

			const setMotivationDescription = (index: number, value: string) => {
				const copy = Utils.copy(negotiation);
				const m = copy.motivations[index];
				m.description = value;
				setNegotiation(copy);
				props.onChange(copy);
			};

			const moveMotivation = (index: number, direction: 'up' | 'down') => {
				const copy = Utils.copy(negotiation);
				copy.motivations = Collections.move(copy.motivations, index, direction);
				setNegotiation(copy);
				props.onChange(copy);
			};

			const deleteMotivation = (trait: NegotiationTrait) => {
				const copy = Utils.copy(negotiation);
				copy.motivations = copy.motivations.filter(m => m.trait !== trait);
				setNegotiation(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText
						extra={
							<Button type='text' icon={<PlusOutlined />} onClick={addMotivation} />
						}
					>
						Motivations
					</HeaderText>
					{
						negotiation.motivations.map((m, n) => (
							<Expander
								key={`m${n}`}
								title={m.trait}
								extra={[
									<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveMotivation(n, 'up'); }} />,
									<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveMotivation(n, 'down'); }} />,
									<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteMotivation(m.trait); }} />
								]}
							>
								<HeaderText>Motivation</HeaderText>
								<Space direction='vertical' style={{ width: '100%' }}>
									<Select
										style={{ width: '100%' }}
										placeholder='Trait'
										options={[ NegotiationTrait.Benevolence, NegotiationTrait.Discovery, NegotiationTrait.Freedom, NegotiationTrait.Greed, NegotiationTrait.HigherAuthority, NegotiationTrait.Justice, NegotiationTrait.Legacy, NegotiationTrait.Peace, NegotiationTrait.Power, NegotiationTrait.Protection, NegotiationTrait.Revelry, NegotiationTrait.Vengeance ].map(nt => ({ label: nt, value: nt, desc: NegotiationLogic.getMotivationDescription(nt) }))}
										optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
										showSearch={true}
										filterOption={(input, option) => {
											const strings = option ?
												[
													option.label,
													option.desc
												]
												: [];
											return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
										}}
										value={m.trait}
										onChange={t => setMotivationTrait(n, t)}
									/>
									<MultiLine placeholder='Description' value={m.description} onChange={value => setMotivationDescription(n, value)} />
								</Space>
							</Expander>
						))
					}
					{
						negotiation.motivations.length === 0 ?
							<Empty />
							: null
					}
				</Space>
			);
		};

		const getNegotiationPitfallsSection = () => {
			const addPitfall = () => {
				const copy = Utils.copy(negotiation);
				copy.pitfalls.push({
					trait: NegotiationTrait.Benevolence,
					description: ''
				});
				setNegotiation(copy);
				props.onChange(copy);
			};

			const setPitfallTrait = (index: number, value: NegotiationTrait) => {
				const copy = Utils.copy(negotiation);
				const m = copy.pitfalls[index];
				m.trait = value;
				setNegotiation(copy);
				props.onChange(copy);
			};

			const setPitfallDescription = (index: number, value: string) => {
				const copy = Utils.copy(negotiation);
				const m = copy.pitfalls[index];
				m.description = value;
				setNegotiation(copy);
				props.onChange(copy);
			};

			const movePitfall = (index: number, direction: 'up' | 'down') => {
				const copy = Utils.copy(negotiation);
				copy.pitfalls = Collections.move(copy.pitfalls, index, direction);
				setNegotiation(copy);
				props.onChange(copy);
			};

			const deletePitfall = (trait: NegotiationTrait) => {
				const copy = Utils.copy(negotiation);
				copy.pitfalls = copy.pitfalls.filter(m => m.trait !== trait);
				setNegotiation(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText
						extra={
							<Button type='text' icon={<PlusOutlined />} onClick={addPitfall} />
						}
					>
						Pitfalls
					</HeaderText>
					{
						negotiation.pitfalls.map((p, n) => (
							<Expander
								key={`p${n}`}
								title={p.trait}
								extra={[
									<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); movePitfall(n, 'up'); }} />,
									<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); movePitfall(n, 'down'); }} />,
									<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deletePitfall(p.trait); }} />
								]}
							>
								<HeaderText>Pitfall</HeaderText>
								<Space direction='vertical' style={{ width: '100%' }}>
									<Select
										style={{ width: '100%' }}
										placeholder='Trait'
										options={[ NegotiationTrait.Benevolence, NegotiationTrait.Discovery, NegotiationTrait.Freedom, NegotiationTrait.Greed, NegotiationTrait.HigherAuthority, NegotiationTrait.Justice, NegotiationTrait.Legacy, NegotiationTrait.Peace, NegotiationTrait.Power, NegotiationTrait.Protection, NegotiationTrait.Revelry, NegotiationTrait.Vengeance ].map(nt => ({ label: nt, value: nt, desc: NegotiationLogic.getPitfallDescription(nt) }))}
										optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
										showSearch={true}
										filterOption={(input, option) => {
											const strings = option ?
												[
													option.label,
													option.desc
												]
												: [];
											return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
										}}
										value={p.trait}
										onChange={t => setPitfallTrait(n, t)}
									/>
									<MultiLine placeholder='Description' value={p.description} onChange={value => setPitfallDescription(n, value)} />
								</Space>
							</Expander>
						))
					}
					{
						negotiation.pitfalls.length === 0 ?
							<Empty />
							: null
					}
				</Space>
			);
		};

		const getNegotiationOutcomesSection = () => {
			const setOutcome = (index: number, value: string) => {
				const copy = Utils.copy(negotiation);
				copy.outcomes[index] = value;
				setNegotiation(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						negotiation.outcomes.map((o, n) => (
							<Expander
								key={`o${n}`}
								title={n}
							>
								<HeaderText>Outcome {n}</HeaderText>
								<MultiLine value={o} onChange={value => setOutcome(n, value)} />
							</Expander>
						))
					}
				</Space>
			);
		};

		return (
			<ErrorBoundary>
				<div className='negotiation-edit-panel'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Negotiation',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Details',
								children: getNegotiationDetailsSection()
							},
							{
								key: '3',
								label: 'Motivations',
								children: getNegotiationMotivationsSection()
							},
							{
								key: '4',
								label: 'Pitfalls',
								children: getNegotiationPitfallsSection()
							},
							{
								key: '5',
								label: 'Outcomes',
								children: getNegotiationOutcomesSection()
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
