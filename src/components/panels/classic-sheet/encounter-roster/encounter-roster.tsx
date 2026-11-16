import { EncounterSheet } from '@/models/classic-sheets/encounter-sheet';
import { FactionType } from '@/enums/faction-type';
import { FormatLogic } from '@/logic/format-logic';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { Sourcebook } from '@/models/sourcebook';
import { useMemo } from 'react';

import './encounter-roster.scss';

interface Props {
	encounter: EncounterSheet;
	sourcebooks: Sourcebook[];
	// The roster's rows - its groups, then its terrain, numbered as one list - can be spread over more than one page;
	// if so, this card shows the rows from 'from' up to (but not including) 'to'
	from?: number;
	to?: number;
	continued?: boolean;
}

export const EncounterRosterCard = (props: Props) => {
	const encounter = useMemo(() => props.encounter, [ props.encounter ]);

	const groupCount = encounter.groups?.length ?? 0;
	const from = props.from ?? 0;
	const to = props.to ?? (groupCount + (encounter.terrainSlots?.length ?? 0));
	const isShown = (index: number) => (index >= from) && (index < to);

	const showGroups = (encounter.groups ?? []).some((_, i) => isShown(i));
	const showTerrain = (encounter.terrainSlots ?? []).some((_, i) => isShown(groupCount + i));

	return (
		<div className='encounter-roster card'>
			<h2>{props.continued ? 'Encounter Roster (continued)' : 'Encounter Roster'}</h2>
			<table>
				<thead className={showGroups || !props.continued ? undefined : 'hidden'}>
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
						if (!isShown(i)) {
							return null;
						}

						const groupMonsters = group.slots.map(slot => slot.monster).filter(m => !!m);
						const minionSlots = groupMonsters.filter(m => m.role.organization === MonsterOrganizationType.Minion).length;
						const nonMinionSlots = groupMonsters.filter(m => m.role.organization !== MonsterOrganizationType.Minion).length;
						return (
							<tr className='creature-group' key={`group-${i}`} data-roster-item={i}>
								<td className='encounter-group'>
									<div className='group-number'>{`${i + 1}`}</div>
									{group.name ?
										<div className='group-name'>{group.name}</div>
										: null}
									{group.faction === FactionType.Ally ?
										<div className='group-faction'>(Ally)</div>
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
													if (slot.count > 1) {
														extra = slot.count.toString();
													}
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
										<div className='ev'>EV:<span className='ev-value'>{group.groupEv}</span></div>
									</div>
								</td>
								<td className='stamina-tracker'>
									<div className='wrapper'>
										{
											group.slots.map((slot, i) => {
												const monster = slot.monster;
												let stamina = monster.stamina.toString();
												if (slot.isMinion && slot.count > 1) {
													let s = monster.stamina * slot.count;
													stamina = s.toString();
													for (let i = 1; i < slot.count; ++i) {
														s -= monster.stamina;
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
												return (
													<div key={`stats-${slot.id}-${i}`} className='encounter-slot'>
														<span>{monster.stability}</span>
														<span>{FormatLogic.getSpeed(speed)}</span>
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
				</tbody>
				<tbody>
					{
						encounter.terrain?.length && showTerrain ?
							<tr className='terrain-header'>
								<th className='terrain' colSpan={2}>Dynamic Terrain Objects</th>
								<th className='stamina-tracker-header' colSpan={2}>Stamina Tracker</th>
								<th className='notes'>Notes/Temporary Effects</th>
							</tr>
							: null

					}
					{encounter.terrainSlots?.map((slot, i) => {
						if (!isShown(groupCount + i)) {
							return null;
						}

						const terrain = slot.terrain;
						const name = slot.count > 1 ? `${terrain.name} (${slot.count})` : terrain.name;
						const stamina = Array(slot.count).fill(terrain.stamina).join(', ');
						return (
							<tr className='terrain-object' key={`roster-terrain-${slot.id}-${i}`} data-roster-item={groupCount + i}>
								<td colSpan={2}>
									<div className='wrapper'>
										<div className='encounter-slot'>{name}</div>
										<div className='ev'>EV:<span className='ev-value'>{slot.slotEv}</span></div>
									</div>
								</td>
								<td className='stamina-tracker' colSpan={2}>
									<div className='wrapper'>
										<div className='encounter-slot'>{stamina}</div>
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
