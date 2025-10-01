import { EncounterSheet } from '@/models/classic-sheets/encounter-sheet';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { TerrainLogic } from '@/logic/terrain-logic';
import { useMemo } from 'react';

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
							const monster = slot.monster;
							if (!monster) {
								return ev;
							}
							return ev + (monster.encounterValue * slot.count);
						}, 0);
						const groupMonsters = group.slots.map(slot => slot.monster).filter(m => !!m);
						const minionSlots = groupMonsters.filter(m => m.role.organization === MonsterOrganizationType.Minion).length;
						const nonMinionSlots = groupMonsters.filter(m => m.role.organization !== MonsterOrganizationType.Minion).length;
						return (
							<tr key={`group-${i}`}>
								<td className='encounter-group'>
									<div className='group-number'>{`${i + 1}`}</div>
									{group.name ?
										<div className='group-name'>{group.name}</div>
										: null}
									<div className='turn-tracker'>
										Turn
										<br />
										<span className='checkbox'>◇</span>
									</div>
								</td>
								<td className='group-creatures'>
									<div className='wrapper'>
										{
											group.slots.map((slot, i) => {
												const monster = slot.monster;
												let extra = null;
												if (slot.isMinion) {
													if (slot.count > 1)
														extra = slot.count.toString();
												} else if (minionSlots === 1 && nonMinionSlots === 1) {
													extra = 'Captain';
												}
												return (
													<div key={`monsters-${slot.id}-${i}`} className={`encounter-slot ${monster.role.type.toLocaleLowerCase().split(' ').join('-')}`}>
														{monster.name}
														{extra ? ` (${extra})` : null}
													</div>
												);
											})
										}
										<div className='ev'>EV:<span className='ev-value'>{slotEv}</span></div>
									</div>
								</td>
								<td className='stamina-tracker'>
									<div className='wrapper'>
										{
											group.slots.map((slot, i) => {
												const monster = slot.monster;
												let stamina = monster.stamina.toString();
												if (slot.isMinion && slot.count > 1) {
													let s = monster.stamina;
													for (let i = 1; i < slot.count; ++i) {
														s += monster.stamina;
														stamina += ` / ${s}`;
													}
												}
												return (
													<div key={`stamina-${slot.id}-${i}`} className='encounter-slot'>
														{stamina}
													</div>
												);
											})
										}
									</div>
								</td>
								<td className='monster-stats'>
									<div className='wrapper'>
										{
											group.slots.map((slot, i) => {
												const monster = slot.monster;
												const speed = MonsterLogic.getSpeed(monster);
												let modes = ' ';
												if (speed.modes.length) {
													modes += `(${speed.modes.join(', ')})`;
												}
												return (
													<div key={`stats-${slot.id}-${i}`} className='encounter-slot'>
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
								<td className='notes'>
									{group.name ? group.name : null}
								</td>
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
							<tr className='terrain-object' key={`roster-terrain-${terrain.id}`}>
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
