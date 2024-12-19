import { Alert, Divider, Space } from 'antd';
import { Encounter } from '../../../models/encounter';
import { EncounterLogic } from '../../../logic/encounter-logic';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { MonsterLogic } from '../../../logic/monster-logic';
import { MonsterPanel } from '../monster-panel/monster-panel';
import { PanelMode } from '../../../enums/panel-mode';
import { Playbook } from '../../../models/playbook';
import { PlaybookLogic } from '../../../logic/playbook-logic';
import { Utils } from '../../../utils/utils';

import './encounter-panel.scss';

interface Props {
	encounter: Encounter;
	playbook: Playbook;
	mode?: PanelMode;
}

export const EncounterPanel = (props: Props) => {
	try {
		const monsterIDs = EncounterLogic.getMonsterIDs(props.encounter);

		return (
			<div className='encounter-panel' id={props.mode === PanelMode.Full ? props.encounter.id : undefined}>
				<HeaderText level={1}>{props.encounter.name || 'Unnamed Encounter'}</HeaderText>
				{props.encounter.description ? <div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.encounter.description) }} /> : null}
				{
					props.encounter.groups.filter(g => g.slots.length > 0).map((group, n) => (
						<div key={group.id} className='encounter-group'>
							{props.encounter.groups.filter(g => g.slots.length > 0).length > 1 ? <HeaderText>Group {(n + 1).toString()}</HeaderText> : null}
							{
								group.slots.map(slot => {
									const monster = PlaybookLogic.getMonster(props.playbook, slot.monsterID);
									const monsterGroup = PlaybookLogic.getMonsterGroup(props.playbook, slot.monsterID);
									let name = (monster && monsterGroup) ? MonsterLogic.getMonsterName(monster, monsterGroup) : 'Unknown Monster';
									if (slot.count > 1) {
										name += ` x${slot.count}`;
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
						<Space direction='vertical' style={{ width: '100%' }}>
							{
								monsterIDs.map(id => {
									const monster = PlaybookLogic.getMonster(props.playbook, id);
									const monsterGroup = PlaybookLogic.getMonsterGroup(props.playbook, id);
									return (monster && monsterGroup) ?
										<MonsterPanel
											key={monster.id}
											monster={monster}
											monsterGroup={monsterGroup}
											mode={PanelMode.Full}
										/>
										: null;
								})
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
