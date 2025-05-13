import { Button, Flex, Space } from 'antd';
import { ConditionEndType, ConditionType } from '../../../enums/condition-type';
import { Encounter, EncounterGroup } from '../../../models/encounter';
import { HeroInfo, MonsterInfo } from '../../controls/token/token';
import { Condition } from '../../../models/condition';
import { EncounterLogic } from '../../../logic/encounter-logic';
import { Field } from '../../controls/field/field';
import { Format } from '../../../utils/format';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { Markdown } from '../../controls/markdown/markdown';
import { Modal } from '../modal/modal';
import { Random } from '../../../utils/random';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './encounter-turn-modal.scss';

interface Props {
	encounter: Encounter;
	updateEncounter: (encounter: Encounter) => void;
	onClose: () => void;
}

export const EncounterTurnModal = (props: Props) => {
	const [ encounter, setEncounter ] = useState<Encounter>(Utils.copy(props.encounter));

	try {
		const getConditions = (id: string, name: string, conditions: Condition[]) => {
			const removeCondition = (conditionID: string) => {
				const copy = Utils.copy(encounter);
				copy.groups.flatMap(g => g.slots).forEach(s => {
					s.state.conditions = s.state.conditions.filter(c => c.id !== conditionID);
				});
				copy.groups.flatMap(g => g.slots).flatMap(s => s.monsters).forEach(m => {
					m.state.conditions = m.state.conditions.filter(c => c.id !== conditionID);
				});
				copy.heroes.forEach(h => {
					h.state.conditions = h.state.conditions.filter(c => c.id !== conditionID);
				});
				setEncounter(copy);
				props.updateEncounter(copy);
			};

			if (conditions.length > 0) {
				return (
					<div key={id}>
						<HeaderText>{name}: Conditions</HeaderText>
						{
							conditions.map(c => (
								<div key={c.id}>
									<Flex key={c.id} align='center' justify='space-between' gap={10}>
										<Field label={c.type === ConditionType.Quick ? c.text : c.type} value={c.ends} />
										<Button
											type={c.ends === ConditionEndType.EndOfTurn ? 'primary' : 'default'}
											onClick={() => removeCondition(c.id)}
										>
											Remove
										</Button>
									</Flex>
									{c.type === ConditionType.Custom ? <Markdown text={c.text} /> : null}
									{
										c.ends === ConditionEndType.SaveEnds ?
											<SimpleRollPanel
												label='Save Ends'
												text1to5='With this roll, typically the condition would **persist**.'
												text6to0='With this roll, typically the condition would **end**.'
											/>
											: null
									}
								</div>
							))
						}
					</div>
				);
			}

			return null;
		};

		const getContent = () => {
			const content = [];

			const startRound = (combatantID: string | null) => {
				const copy = Utils.copy(encounter);

				copy.malice += EncounterLogic.getMaliceGained(copy);
				copy.round += 1;
				copy.groups.forEach(g => g.encounterState = (g.id === combatantID) ? 'current' : 'ready');
				copy.heroes.forEach(h => h.state.encounterState = (h.id === combatantID) ? 'current' : 'ready');

				setEncounter(copy);
				props.updateEncounter(copy);

				if (combatantID) {
					props.onClose();
				}
			};

			const endTurnAndStartNext = (currentID: string, nextID: string | null) => {
				const copy = Utils.copy(encounter);

				if (nextID) {
					copy.groups
						.filter(g => g.id === currentID)
						.forEach(g => g.encounterState = 'finished');
					copy.heroes
						.filter(h => h.id === currentID)
						.forEach(h => h.state.encounterState = 'finished');
					copy.groups
						.filter(g => g.id === nextID)
						.forEach(g => g.encounterState = 'current');
					copy.heroes
						.filter(h => h.id === nextID)
						.forEach(h => h.state.encounterState = 'current');
				} else {
					copy.groups.forEach(g => g.encounterState = 'ready');
					copy.heroes.forEach(h => h.state.encounterState = 'ready');
				}

				setEncounter(copy);
				props.updateEncounter(copy);

				if (nextID) {
					props.onClose();
				}
			};

			const getGroupButton = (group: EncounterGroup, onClick: () => void) => {
				return (
					<Button key={group.id} className='container-button' block={true} onClick={onClick}>
						{
							group.slots.flatMap(s => s.monsters).map(m => (
								<MonsterInfo key={m.id} monster={m} />
							))
						}
					</Button>
				);
			};

			const getHeroButton = (hero: Hero, onClick: () => void) => {
				return (
					<Button key={hero.id} className='container-button' block={true} onClick={onClick}>
						<HeroInfo hero={hero} />
					</Button>
				);
			};

			const activeGroups = encounter.groups.filter(g => g.slots.some(s => !s.state.defeated && s.monsters.some(m => !m.state.defeated)));
			const activeHeroes = encounter.heroes.filter(h => !h.state.defeated);

			if (!encounter.initiative) {
				const setEncounterInitiative = (value: 'monsters' | 'heroes') => {
					const copy = Utils.copy(encounter);

					copy.initiative = value;
					copy.groups.forEach(g => g.encounterState = 'ready');
					copy.heroes.forEach(h => h.state.encounterState = 'ready');

					setEncounter(copy);
					props.updateEncounter(copy);
				};

				content.push(
					<div key='initiative'>
						<HeaderText>Initiative</HeaderText>
						<div className='ds-text'>Which side will act first each round?</div>
						<Flex gap={10}>
							<Button block={true} onClick={() => setEncounterInitiative('monsters')}>Monsters</Button>
							<Button block={true} onClick={() => setEncounterInitiative('heroes')}>Heroes</Button>
						</Flex>
						<SimpleRollPanel
							label='Initiative'
							text1to5='With this roll, typically the **monsters** would go first.'
							text6to0='With this roll, typically the **heroes** would go first.'
						/>
					</div>
				);
			} else {
				content.push(
					<div key='initiative'>
						<HeaderText>Initiative</HeaderText>
						<div className='ds-text'>
							{`${Format.capitalize(encounter.initiative || 'None')} will act first each round.`}
						</div>
					</div>
				);

				const allMonstersReady = activeGroups.every(g => g.encounterState === 'ready');
				const allHeroesReady = activeHeroes.every(h => h.state.encounterState === 'ready');
				const allMonstersFinished = activeGroups.every(g => g.encounterState === 'finished');
				const allHeroesFinished = activeHeroes.every(h => h.state.encounterState === 'finished');
				if ((allMonstersReady && allHeroesReady) || (allMonstersFinished && allHeroesFinished)) {
					content.push(
						<div key='start-round'>
							<HeaderText>Round {encounter.round + 1}</HeaderText>
							<div className='ds-text'>
								Select a {encounter.initiative === 'monsters' ? 'monster group' : 'hero'} to start the round and gain <b>{EncounterLogic.getMaliceGained(encounter)} malice</b>.
							</div>
							<Space direction='vertical' style={{ width: '100%' }}>
								{
									encounter.initiative === 'monsters' ?
										activeGroups
											.filter(g => g.encounterState === 'ready')
											.map(g => getGroupButton(g, () => startRound(g.id)))
										:
										activeHeroes
											.filter(h => h.state.encounterState === 'ready')
											.map(h => getHeroButton(h, () => startRound(h.id)))
								}
							</Space>
						</div>
					);
				} else {
					const noCurrentMonsters = activeGroups.every(g => g.encounterState !== 'current');
					const noCurrentHeroes = activeHeroes.every(h => h.state.encounterState !== 'current');
					if (noCurrentMonsters && noCurrentHeroes) {
						const selectGroup = (groupID: string) => {
							const copy = Utils.copy(encounter);
							const group = copy.groups.find(g => g.id === groupID);
							if (group) {
								group.encounterState = 'current';
								setEncounter(copy);
								props.updateEncounter(copy);
								props.onClose();
							}
						};

						const selectHero = (heroID: string) => {
							const copy = Utils.copy(encounter);
							const hero = copy.heroes.find(h => h.id === heroID);
							if (hero) {
								hero.state.encounterState = 'current';
								setEncounter(copy);
								props.updateEncounter(copy);
								props.onClose();
							}
						};

						content.push(
							<Space key='select-group' direction='vertical' style={{ width: '100%' }}>
								<HeaderText>Select a Group</HeaderText>
								{
									activeGroups
										.filter(g => g.encounterState === 'ready')
										.map(g => getGroupButton(g, () => selectGroup(g.id)))
								}
							</Space>
						);

						content.push(
							<Space key='select-hero' direction='vertical' style={{ width: '100%' }}>
								<HeaderText>Select a Hero</HeaderText>
								{
									activeHeroes
										.filter(h => h.state.encounterState === 'ready')
										.map(h => getHeroButton(h, () => selectHero(h.id)))
								}
							</Space>
						);
					}
				}

				const groups = activeGroups.filter(g => g.encounterState === 'ready');
				const heroes = activeHeroes.filter(h => h.state.encounterState === 'ready');

				encounter.groups
					.filter(g => g.encounterState === 'current')
					.forEach(group => {
						content.push(
							<Space key={group.id} direction='vertical' style={{ width: '100%' }}>
								{group.slots.map(s => getConditions(s.id, EncounterLogic.getSlotName(s), s.state.conditions))}
								{
									group.slots
										.flatMap(s => s.monsters)
										.map(m => getConditions(m.id, m.name, m.state.conditions))
								}
								<HeaderText>{EncounterLogic.getGroupName(group, encounter)}: End Turn</HeaderText>
								<div className='ds-text'>
									{
										(groups.length > 0) || (heroes.length > 0) ?
											'Ready to finish this turn? Choose who\'s next.'
											:
											'Ready to finish this turn? That\'ll be the end of this round.'
									}
								</div>
								{
									heroes.length > 0 ?
										heroes.map(h => getHeroButton(h, () => endTurnAndStartNext(group.id, h.id)))
										:
										groups.map(g => getGroupButton(g, () => endTurnAndStartNext(group.id, g.id)))
								}
								{
									(groups.length === 0) && (heroes.length === 0) ?
										<Button block={true} onClick={() => endTurnAndStartNext(group.id, null)}>
											Next Round
										</Button>
										: null
								}
							</Space>
						);
					});

				encounter.heroes
					.filter(h => h.state.encounterState === 'current')
					.forEach(hero => {
						content.push(
							<Space key={hero.id} direction='vertical' style={{ width: '100%' }}>
								{getConditions(hero.id, hero.name, hero.state.conditions)}
								<HeaderText>{hero.name}: End Turn</HeaderText>
								<div className='ds-text'>
									{
										(groups.length > 0) || (heroes.length > 0) ?
											'Ready to finish this turn? Choose who\'s next.'
											:
											'Ready to finish this turn? That\'ll be the end of this round.'
									}
								</div>
								{
									groups.length > 0 ?
										groups.map(g => getGroupButton(g, () => endTurnAndStartNext(hero.id, g.id)))
										:
										heroes.map(h => getHeroButton(h, () => endTurnAndStartNext(hero.id, h.id)))
								}
								{
									(groups.length === 0) && (heroes.length === 0) ?
										<Button block={true} onClick={() => endTurnAndStartNext(hero.id, null)}>
											Next Round
										</Button>
										: null
								}
							</Space>
						);
					});
			}

			return content;
		};

		return (
			<Modal
				content={
					<div className='encounter-turn-modal'>
						<Space direction='vertical' style={{ width: '100%' }}>
							{getContent()}
						</Space>
					</div>
				}
				onClose={props.onClose}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};

interface SimpleRollPanelProps {
	label: string;
	text1to5: string;
	text6to0: string;
}

const SimpleRollPanel = (props: SimpleRollPanelProps) => {
	const [ roll, setRoll ] = useState<number | null>(null);

	try {
		return (
			<div className='simple-roll-panel'>
				{
					roll === null ?
						<Button block={true} onClick={() => setRoll(Random.die(10))}>
							{props.label}: Roll 1d10
						</Button>
						:
						<Field
							label={roll}
							value={<Markdown text={roll <= 5 ? props.text1to5 : props.text6to0} useSpan={true} />}
						/>
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
