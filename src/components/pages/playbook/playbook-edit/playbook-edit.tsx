import { Alert, Button, Divider, Input, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Encounter, EncounterGroup } from '../../../../models/encounter';
import { Monster, MonsterGroup } from '../../../../models/monster';
import { Playbook, PlaybookElementKind } from '../../../../models/playbook';
import { ReactNode, useState } from 'react';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { DropdownButton } from '../../../controls/dropdown-button/dropdown-button';
import { Element } from '../../../../models/element';
import { EncounterDifficultyPanel } from '../../../panels/encounter-difficulty/encounter-difficulty-panel';
import { EncounterPanel } from '../../../panels/elements/encounter-panel/encounter-panel';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { Field } from '../../../controls/field/field';
import { Format } from '../../../../utils/format';
import { HeaderText } from '../../../controls/header-text/header-text';
import { MonsterFilter } from '../../../../models/monster-filter';
import { MonsterFilterPanel } from '../../../panels/monster-filter/monster-filter-panel';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterPanel } from '../../../panels/elements/monster-panel/monster-panel';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NameGenerator } from '../../../../utils/name-generator';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationLogic } from '../../../../logic/negotiation-logic';
import { NegotiationPanel } from '../../../panels/elements/negotiation-panel/negotiation-panel';
import { NegotiationTrait } from '../../../../enums/negotiation-trait';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './playbook-edit.scss';

interface Props {
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showMonster: (monster: Monster, monsterGroup: MonsterGroup) => void;
	saveChanges: (kind: PlaybookElementKind, element: Element) => void;
}

export const PlaybookEditPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind, elementID } = useParams<{ kind: PlaybookElementKind, elementID: string }>();
	const [ element, setElement ] = useState<Element>(() => {
		let original: Element;
		switch (kind!) {
			case 'encounter':
				original = props.playbook.encounters.find(e => e.id === elementID)! as Element;
				break;
			case 'negotiation':
				original = props.playbook.negotiations.find(e => e.id === elementID)! as Element;
				break;
		}
		return JSON.parse(JSON.stringify(original)) as Element;
	});
	const [ dirty, setDirty ] = useState<boolean>(false);
	const [ monsterFilter, setMonsterFilter ] = useState<MonsterFilter>(FactoryLogic.createMonsterFilter(1, 3));

	//#region Edit

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = JSON.parse(JSON.stringify(element)) as Element;
			copy.name = value;
			setElement(copy);
			setDirty(true);
		};

		const setDescription = (value: string) => {
			const copy = JSON.parse(JSON.stringify(element)) as Element;
			copy.description = value;
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Input
					className={element.name === '' ? 'input-empty' : ''}
					placeholder='Name'
					allowClear={true}
					addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
					value={element.name}
					onChange={e => setName(e.target.value)}
				/>
				<HeaderText>Description</HeaderText>
				<MultiLine label='Description' value={element.description} onChange={setDescription} />
			</Space>
		);
	};

	const getEncounterContentsSection = () => {
		const encounter = element as Encounter;

		const addGroup = () => {
			const copy = JSON.parse(JSON.stringify(element)) as Encounter;
			copy.groups.push(FactoryLogic.createEncounterGroup());
			setElement(copy);
			setDirty(true);
		};

		const deleteGroup = (group: EncounterGroup) => {
			const copy = JSON.parse(JSON.stringify(element)) as Encounter;
			copy.groups = copy.groups.filter(g => g.id !== group.id);
			setElement(copy);
			setDirty(true);
		};

		const setSlotCount = (groupID: string, slotID: string, value: number) => {
			const copy = JSON.parse(JSON.stringify(element)) as Encounter;
			const group = copy.groups.find(g => g.id === groupID);
			if (group) {
				const slot = group.slots.find(s => s.id === slotID);
				if (slot) {
					slot.count = value;

					if (slot.count === 0) {
						group.slots = group.slots.filter(s => s.id !== slotID);
					}
				}

				if (group.slots.length === 0) {
					copy.groups = copy.groups.filter(g => g.id !== groupID);
				}
			}
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					encounter.groups.map((group, n) => (
						<div key={group.id} className='group-row'>
							{encounter.groups.length > 1 ? <HeaderText>Group {(n + 1).toString()}</HeaderText> : null}
							{
								group.slots.map(slot => {
									const monster = SourcebookLogic.getMonster(props.sourcebooks, slot.monsterID);
									const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, slot.monsterID);
									if (monster && monsterGroup) {
										return (
											<div key={slot.id} className='slot-row'>
												<MonsterPanel monster={monster} monsterGroup={monsterGroup} mode={PanelMode.Compact} />
												<div className='actions'>
													<Button block={true} onClick={() => props.showMonster(monster, monsterGroup)}>Details</Button>
													<NumberSpin
														value={slot.count}
														format={value => (value * MonsterLogic.getRoleMultiplier(monster.role.organization)).toString()}
														onChange={value => setSlotCount(group.id, slot.id, value)}
													/>
												</div>
											</div>
										);
									}
									return (
										<div key={slot.id} className='slot-row'>
											Unknown monster
										</div>
									);
								})
							}
							{
								group.slots.length === 0 ?
									<Alert
										type='warning'
										showIcon={true}
										message='No monsters in this group'
									/>
									: null
							}
							{encounter.groups.length > 1 ? <DangerButton block={true} label='Delete Group' onConfirm={() => deleteGroup(group)} /> : null}
						</div>
					))
				}
				{encounter.groups.length > 0 ? <Divider /> : null}
				<Button block={true} onClick={addGroup}>Add a new encounter group</Button>
			</Space>
		);
	};

	const getNegotiationDetailsSection = () => {
		const negotiation = element as Negotiation;

		const setImpression = (value: number) => {
			const copy = JSON.parse(JSON.stringify(element)) as Negotiation;
			copy.impression = value;
			setElement(copy);
			setDirty(true);
		};

		const setInterest = (value: number) => {
			const copy = JSON.parse(JSON.stringify(element)) as Negotiation;
			copy.interest = value;
			setElement(copy);
			setDirty(true);
		};

		const setPatience = (value: number) => {
			const copy = JSON.parse(JSON.stringify(element)) as Negotiation;
			copy.patience = value;
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<NumberSpin label='Impression' min={0} max={15} value={negotiation.impression} onChange={setImpression} />
				<NumberSpin label='Interest' min={0} max={5} value={negotiation.interest} onChange={setInterest} />
				<NumberSpin label='Patience' min={0} max={5} value={negotiation.patience} onChange={setPatience} />
			</Space>
		);
	};

	const getNegotiationMotivationsSection = () => {
		const negotiation = element as Negotiation;

		const addMotivation = () => {
			const copy = JSON.parse(JSON.stringify(element)) as Negotiation;
			copy.motivations.push({
				trait: NegotiationTrait.Benevolence,
				description: ''
			});
			setElement(copy);
			setDirty(true);
		};

		const setMotivationTrait = (index: number, value: NegotiationTrait) => {
			const copy = JSON.parse(JSON.stringify(element)) as Negotiation;
			const m = copy.motivations[index];
			m.trait = value;
			setElement(copy);
			setDirty(true);
		};

		const setMotivationDescription = (index: number, value: string) => {
			const copy = JSON.parse(JSON.stringify(element)) as Negotiation;
			const m = copy.motivations[index];
			m.description = value;
			setElement(copy);
			setDirty(true);
		};

		const moveMotivation = (index: number, direction: 'up' | 'down') => {
			const copy = JSON.parse(JSON.stringify(element)) as Negotiation;
			copy.motivations = Collections.move(copy.motivations, index, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteMotivation = (trait: NegotiationTrait) => {
			const copy = JSON.parse(JSON.stringify(element)) as Negotiation;
			copy.motivations = copy.motivations.filter(m => m.trait !== trait);
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					negotiation.motivations.map((m, n) => (
						<Expander
							key={`m${n}`}
							title={m.trait}
							extra={[
								<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveMotivation(n, 'up'); }} />,
								<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveMotivation(n, 'down'); }} />,
								<DangerButton key='delete' mode='icon' onConfirm={e => { e.stopPropagation(); deleteMotivation(m.trait); }} />
							]}
						>
							<HeaderText>Motivation</HeaderText>
							<Space direction='vertical' style={{ width: '100%' }}>
								<Select
									style={{ width: '100%' }}
									placeholder='Trait'
									options={[ NegotiationTrait.Benevolence, NegotiationTrait.Discovery, NegotiationTrait.Freedom, NegotiationTrait.Greed, NegotiationTrait.HigherAuthority, NegotiationTrait.Justice, NegotiationTrait.Legacy, NegotiationTrait.Peace, NegotiationTrait.Power, NegotiationTrait.Protection, NegotiationTrait.Revelry, NegotiationTrait.Vengeance ].map(nt => ({ label: nt, value: nt, desc: NegotiationLogic.getMotivationDescription(nt) }))}
									optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
									value={m.trait}
									onChange={t => setMotivationTrait(n, t)}
								/>
								<MultiLine label='Description' value={m.description} onChange={value => setMotivationDescription(n, value)} />
							</Space>
						</Expander>
					))
				}
				{
					negotiation.motivations.length === 0 ?
						<Alert
							type='warning'
							showIcon={true}
							message='No motivations'
						/>
						: null
				}
				<Button block={true} onClick={addMotivation}>Add a motivation</Button>
			</Space>
		);
	};

	const getNegotiationPitfallsSection = () => {
		const negotiation = element as Negotiation;

		const addPitfall = () => {
			const copy = JSON.parse(JSON.stringify(element)) as Negotiation;
			copy.pitfalls.push({
				trait: NegotiationTrait.Benevolence,
				description: ''
			});
			setElement(copy);
			setDirty(true);
		};

		const setPitfallTrait = (index: number, value: NegotiationTrait) => {
			const copy = JSON.parse(JSON.stringify(element)) as Negotiation;
			const m = copy.pitfalls[index];
			m.trait = value;
			setElement(copy);
			setDirty(true);
		};

		const setPitfallDescription = (index: number, value: string) => {
			const copy = JSON.parse(JSON.stringify(element)) as Negotiation;
			const m = copy.pitfalls[index];
			m.description = value;
			setElement(copy);
			setDirty(true);
		};

		const movePitfall = (index: number, direction: 'up' | 'down') => {
			const copy = JSON.parse(JSON.stringify(element)) as Negotiation;
			copy.pitfalls = Collections.move(copy.pitfalls, index, direction);
			setElement(copy);
			setDirty(true);
		};

		const deletePitfall = (trait: NegotiationTrait) => {
			const copy = JSON.parse(JSON.stringify(element)) as Negotiation;
			copy.pitfalls = copy.pitfalls.filter(m => m.trait !== trait);
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					negotiation.pitfalls.map((p, n) => (
						<Expander
							key={`p${n}`}
							title={p.trait}
							extra={[
								<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); movePitfall(n, 'up'); }} />,
								<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); movePitfall(n, 'down'); }} />,
								<DangerButton key='delete' mode='icon' onConfirm={e => { e.stopPropagation(); deletePitfall(p.trait); }} />
							]}
						>
							<HeaderText>Pitfall</HeaderText>
							<Space direction='vertical' style={{ width: '100%' }}>
								<Select
									style={{ width: '100%' }}
									placeholder='Trait'
									options={[ NegotiationTrait.Benevolence, NegotiationTrait.Discovery, NegotiationTrait.Freedom, NegotiationTrait.Greed, NegotiationTrait.HigherAuthority, NegotiationTrait.Justice, NegotiationTrait.Legacy, NegotiationTrait.Peace, NegotiationTrait.Power, NegotiationTrait.Protection, NegotiationTrait.Revelry, NegotiationTrait.Vengeance ].map(nt => ({ label: nt, value: nt, desc: NegotiationLogic.getMotivationDescription(nt) }))}
									optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
									value={p.trait}
									onChange={t => setPitfallTrait(n, t)}
								/>
								<MultiLine label='Description' value={p.description} onChange={value => setPitfallDescription(n, value)} />
							</Space>
						</Expander>
					))
				}
				{
					negotiation.pitfalls.length === 0 ?
						<Alert
							type='warning'
							showIcon={true}
							message='No pitfalls'
						/>
						: null
				}
				<Button block={true} onClick={addPitfall}>Add a pitfall</Button>
			</Space>
		);
	};

	const getEditSection = () => {
		switch (kind!) {
			case 'encounter':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Encounter',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Monsters',
								children: getEncounterContentsSection()
							}
						]}
					/>
				);
			case 'negotiation':
				return (
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
							}
						]}
					/>
				);
		}
	};

	//#endregion

	//#region Preview

	const getEncounterPreviewSection = () => {
		return (
			<div style={{ margin: '0 10px' }}>
				<SelectablePanel>
					<EncounterPanel encounter={element as Encounter} playbook={props.playbook} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
				</SelectablePanel>
			</div>
		);
	};

	const getEncounterMonstersSection = () => {
		const addMonster = (monster: Monster, groupID: string | null) => {
			const copy = JSON.parse(JSON.stringify(element)) as Encounter;

			if (groupID) {
				const group = copy.groups.find(g => g.id === groupID);
				if (group) {
					const slot = group.slots.find(s => s.monsterID === monster.id);
					if (slot) {
						slot.count += 1;
					} else {
						group.slots.push(FactoryLogic.createEncounterSlot(monster.id));
					}
				};
			} else {
				const group = FactoryLogic.createEncounterGroup();
				group.slots.push(FactoryLogic.createEncounterSlot(monster.id));
				copy.groups.push(group);
			}

			setElement(copy);
			setDirty(true);
		};

		const encounter = element as Encounter;
		const monsters = Collections.sort(props.sourcebooks.flatMap(s => s.monsterGroups.flatMap(mg => mg.monsters).filter(m => MonsterLogic.matches(m, monsterFilter))), m => m.name);

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Expander title='Filter'>
					<HeaderText>Filter</HeaderText>
					<MonsterFilterPanel monsterFilter={monsterFilter} onChange={setMonsterFilter} />
				</Expander>
				{
					monsters.map(m => {
						const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, m.id) as MonsterGroup;

						let addBtn: ReactNode;
						if (encounter.groups.length === 0) {
							addBtn = (
								<Button icon={<PlusOutlined />} onClick={() => addMonster(m, null)}>Add</Button>
							);
						}
						if (encounter.groups.length === 1) {
							addBtn = (
								<Button icon={<PlusOutlined />} onClick={() => addMonster(m, encounter.groups[0].id)}>Add</Button>
							);
						}
						if (encounter.groups.length > 1) {
							addBtn = (
								<DropdownButton
									label='Add'
									items={encounter.groups.map((group, n) => ({ key: group.id, label: <div className='ds-text centered-text'>Group {n + 1}</div> }))}
									onClick={groupID => addMonster(m, groupID)}
								/>
							);
						}

						return (
							<div key={m.id} className='monster-row'>
								<MonsterPanel monster={m} monsterGroup={monsterGroup} mode={PanelMode.Compact} />
								<div className='actions'>
									<Button block={true} onClick={() => props.showMonster(m, monsterGroup)}>Details</Button>
									{addBtn}
								</div>
							</div>
						);
					})
				}
				{
					monsters.length === 0 ?
						<Alert
							type='warning'
							showIcon={true}
							message='No monsters'
						/>
						: null
				}
			</Space>
		);
	};

	const getEncounterDifficultySection = () => {
		return (
			<SelectablePanel>
				<EncounterDifficultyPanel
					encounter={element as Encounter}
					sourcebooks={props.sourcebooks}
				/>
			</SelectablePanel>
		);
	};

	const getPreview = () => {
		switch (kind!) {
			case 'encounter':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Preview',
								children: getEncounterPreviewSection()
							},
							{
								key: '2',
								label: 'Monsters',
								children: getEncounterMonstersSection()
							},
							{
								key: '3',
								label: 'Difficulty',
								children: getEncounterDifficultySection()
							}
						]}
					/>
				);
			case 'negotiation':
				return (
					<SelectablePanel>
						<NegotiationPanel negotiation={element as Negotiation} mode={PanelMode.Full} />
					</SelectablePanel>
				);
		}
	};

	//#endregion

	try {
		return (
			<div className='playbook-edit-page'>
				<AppHeader breadcrumbs={[ { label: `${Format.capitalize(kind!)} Builder` } ]} showDirectory={props.showDirectory} showAbout={props.showAbout} showRoll={props.showRoll}>
					<Button type='primary' disabled={!dirty} onClick={() => props.saveChanges(kind!, element)}>
						Save Changes
					</Button>
					<Button onClick={() => navigation.goToPlaybookView(kind!, element.id)}>
						Cancel
					</Button>
				</AppHeader>
				<div className='playbook-edit-page-content'>
					<div className='edit-column'>
						{getEditSection()}
					</div>
					<div className='preview-column'>
						{getPreview()}
					</div>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
