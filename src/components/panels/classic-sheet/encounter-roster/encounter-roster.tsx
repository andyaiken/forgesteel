import { JSX, useMemo } from 'react';
import { EncounterLogic } from '../../../../logic/encounter-logic';
import { EncounterSheet } from '../../../../models/classic-sheets/encounter-sheet';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterOrganizationType } from '../../../../enums/monster-organization-type';
import { Options } from '../../../../models/options';
import { Sourcebook } from '../../../../models/sourcebook';
import { TerrainLogic } from '../../../../logic/terrain-logic';

import './encounter-roster.scss';

interface Props {
	encounter: EncounterSheet;
	sourcebooks: Sourcebook[];
	options: Options;
}

export const EncounterRosterCard = (props: Props) => {
	const encounter = useMemo(() => props.encounter, [ props.encounter ]);

	return (
		<div className='encounter-roster card'>
			<h2>Encounter Roster</h2>
			<table>
				<thead>
					<tr>
						<th className='group-id'>Group</th>
						<th>
							<div className='left'>Creatures</div>
							<div className='right'>Total EV:<span className='ev-value'>{encounter.encounterEv}</span></div>
						</th>
						<th className='stamina-tracker-header'>Stamina Tracker</th>
						<th className='stats'>Stats</th>
						<th className='notes'>Notes/Temporary Effects</th>
					</tr>
				</thead>
				<tbody>
					{encounter.groups?.map((group, i) => {
						const slotEv = group.slots.reduce((ev, slot) => {
							const monster = EncounterLogic.getCustomizedMonster(slot.monsterID, slot.customization, props.sourcebooks);
							if (!monster) {
								return ev;
							}
							return ev + (monster.encounterValue * slot.count);
						}, 0);
						const groupMonsters = group.slots.map(slot => EncounterLogic.getCustomizedMonster(slot.monsterID, slot.customization, props.sourcebooks)).filter(m => !!m);
						const minionSlots = groupMonsters.filter(m => m.role.organization === MonsterOrganizationType.Minion).length;
						const nonMinionSlots = groupMonsters.filter(m => m.role.organization !== MonsterOrganizationType.Minion).length;
						return (
							<tr key={`group-${i}`}>
								<td className='encounter-group'>
									<div className='group-number'>{group.name || `${i + 1}`}</div>
									<div className='turn-tracker'>
										Turn
										<br />
										<span className='checkbox'>◇</span>
									</div>
								</td>
								<td className='group-creatures'>
									<div className='wrapper'>
										{
											group.slots.flatMap(slot => {
												const monsters: JSX.Element[] = [];
												const monster = EncounterLogic.getCustomizedMonster(slot.monsterID, slot.customization, props.sourcebooks);
												if (!monster) {
													return null;
												}
												const isMinion = monster.role.organization === MonsterOrganizationType.Minion;
												let extra = null;
												if (isMinion) {
													const count = MonsterLogic.getRoleMultiplier(monster.role.organization, props.options);
													if (count > 1)
														extra = count.toString();
												} else if (minionSlots === 1 && nonMinionSlots === 1) {
													extra = 'Captain';
												}
												for (let i = 0; i < slot.count; ++i) {
													monsters.push(
														<div key={`monsters-${slot.id}-${i}`} className='encounter-slot'>
															{monster.name}
															{extra ? ` (${extra})` : null}
														</div>
													);
												}
												return monsters;
											})
										}
										<div className='ev'>EV:<span className='ev-value'>{slotEv}</span></div>
									</div>
								</td>
								<td className='stamina-tracker'>
									<div className='wrapper'>
										{
											group.slots.map(slot => {
												const staminas: JSX.Element[] = [];
												const monster = EncounterLogic.getCustomizedMonster(slot.monsterID, slot.customization, props.sourcebooks);
												if (!monster) {
													return null;
												}
												const isMinion = monster.role.organization === MonsterOrganizationType.Minion;
												let stamina = monster.stamina.toString();
												if (isMinion) {
													const count = MonsterLogic.getRoleMultiplier(monster.role.organization, props.options);
													if (count > 1) {
														let s = monster.stamina;
														for (let i = 1; i < count; ++i) {
															s += monster.stamina;
															stamina += ` / ${s}`;
														}
													}
												}
												for (let i = 0; i < slot.count; ++i) {
													staminas.push(
														<div key={`stamina-${slot.id}-${i}`} className='encounter-slot'>
															{stamina}
														</div>
													);
												}
												return staminas;
											})
										}
									</div>
								</td>
								<td className='monster-stats'>
									<div className='wrapper'>
										{
											group.slots.map(slot => {
												const monster = EncounterLogic.getCustomizedMonster(slot.monsterID, slot.customization, props.sourcebooks);
												if (!monster) {
													return null;
												}
												const speed = MonsterLogic.getSpeed(monster);
												let modes = ' ';
												if (speed.modes.length) {
													modes += `(${speed.modes.join(', ')})`;
												}
												return (
													<div key={slot.id} className='encounter-slot'>
														<span>{monster.stability}</span>
														<span>{speed.value}{modes}</span>
														<span>{monster.freeStrikeDamage}</span>
														<span>{MonsterLogic.getFreeStrikeDistance(monster)}</span>
													</div>
												);
											})
										}
										<div className='stat-labels'>
											<span>Stability</span>
											<span>Speed</span>
											<span>Free Strike</span>
											<span>Distance</span>
										</div>
									</div>
								</td>
								<td></td>
							</tr>
						);
					})}
					<tr>
						<th className='terrain' colSpan={2}>Dynamic Terrain Objects</th>
						<th className='stamina-tracker-header' colSpan={2}>Stamina Tracker</th>
						<th className='notes'>Notes/Temporary Effects</th>
					</tr>
					{encounter.terrain?.map(terrain => {
						return (
							<tr className='terrain-object'>
								<td colSpan={2}>
									<div className='wrapper'>
										<div className='encounter-slot'>{terrain.name}</div>
										<div className='ev'>EV:<span className='ev-value'>{terrain.encounterValue}</span></div>
									</div>
								</td>
								<td className='stamina-tracker' colSpan={2}>
									<div className='wrapper'>
										<div className='encounter-slot'>{TerrainLogic.getStaminaValue(terrain)}</div>
									</div>
								</td>
								<td></td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
