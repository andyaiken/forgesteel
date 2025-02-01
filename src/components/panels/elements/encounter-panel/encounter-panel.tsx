import { Alert, Divider, Space } from 'antd';
import { Encounter } from '../../../../models/encounter';
import { EncounterLogic } from '../../../../logic/encounter-logic';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterPanel } from '../monster-panel/monster-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { Playbook } from '../../../../models/playbook';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';

import './encounter-panel.scss';

interface Props {
	encounter: Encounter;
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	mode?: PanelMode;
}

export const EncounterPanel = (props: Props) => {
	try {
		const monsterIDs = EncounterLogic.getMonsterIDs(props.encounter);
		const monsterGroups = EncounterLogic.getMonsterGroups(props.encounter, props.sourcebooks);

		return (
			<div className={props.mode === PanelMode.Full ? 'encounter-panel' : 'encounter-panel compact'} id={props.mode === PanelMode.Full ? props.encounter.id : undefined}>
				<HeaderText level={1}>{props.encounter.name || 'Unnamed Encounter'}</HeaderText>
				<Markdown text={props.encounter.description} />
				{
					props.encounter.groups.filter(g => g.slots.length > 0).map((group, n) => (
						<div key={group.id} className='encounter-group'>
							{props.encounter.groups.filter(g => g.slots.length > 0).length > 1 ? <HeaderText>Group {(n + 1).toString()}</HeaderText> : null}
							{
								group.slots.map(slot => {
									const monster = SourcebookLogic.getMonster(props.sourcebooks, slot.monsterID);
									const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, slot.monsterID);

									let name = (monster && monsterGroup) ? MonsterLogic.getMonsterName(monster, monsterGroup) : 'Unknown Monster';

									let count = slot.count;
									if (monster) {
										count *= MonsterLogic.getRoleMultiplier(monster.role.organization);
									}
									if (count > 1) {
										name += ` (x${count})`;
									}

									return (
										<div key={slot.id} className='encounter-slot'>
											<Field label='Monster' value={name} />
										</div>
									);
								})
							}
							{
								group.slots.length === 0 ?
									<Alert
										type='warning'
										showIcon={true}
										message='No monsters'
									/>
									: null
							}
						</div>
					))
				}
				{
					props.encounter.groups.length === 0 ?
						<Alert
							type='warning'
							showIcon={true}
							message='No monsters'
						/>
						: null
				}
				{(props.mode === PanelMode.Full) && (monsterIDs.length > 0) ? <Divider /> : null}
				{
					(props.mode === PanelMode.Full) && (monsterIDs.length > 0) ?
						<div className='monsters'>
							{
								monsterIDs.map(id => {
									const monster = SourcebookLogic.getMonster(props.sourcebooks, id);
									const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, id);
									return (monster && monsterGroup) ?
										<SelectablePanel key={monster.id}>
											<MonsterPanel
												monster={monster}
												monsterGroup={monsterGroup}
												mode={PanelMode.Full}
											/>
										</SelectablePanel>
										: null;
								})
							}
						</div>
						: null
				}
				{
					(props.mode === PanelMode.Full) && (monsterGroups.length > 0) ?
						<Space direction='vertical' style={{ width: '100%' }}>
							{
								monsterGroups.map(group => (
									<div key={group.id}>
										<HeaderText level={1}>{group.name} Malice</HeaderText>
										<div className='malice'>
											{
												group.malice.map(m => (
													<SelectablePanel key={m.id}>
														<FeaturePanel
															feature={m}
															mode={PanelMode.Full}
															cost={m.type === FeatureType.Ability ? m.data.ability.cost : m.data.cost}
															repeatable={m.type === FeatureType.Malice ? m.data.repeatable : undefined}
														/>
													</SelectablePanel>
												))
											}
										</div>
									</div>
								))
							}
						</Space>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
