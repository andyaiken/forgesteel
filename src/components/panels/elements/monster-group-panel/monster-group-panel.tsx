import { FeaturePanel } from '../feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { MonsterGroup } from '../../../../models/monster';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterPanel } from '../monster-panel/monster-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { Space } from 'antd';
import { Utils } from '../../../../utils/utils';

import './monster-group-panel.scss';

interface Props {
	monsterGroup: MonsterGroup;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
}

export const MonsterGroupPanel = (props: Props) => {
	try {
		return (
			<div className='monster-group-panel' id={props.mode === PanelMode.Full ? props.monsterGroup.id : undefined}>
				<HeaderText level={1}>{props.monsterGroup.name || 'Unnamed Monster Group'}</HeaderText>
				{props.monsterGroup.description ? <div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.monsterGroup.description) }} /> : null}
				{
					(props.mode !== PanelMode.Full) && (props.monsterGroup.monsters.length > 0) ?
						<Field label='Monsters' value={props.monsterGroup.monsters.map(m => MonsterLogic.getMonsterName(m, props.monsterGroup)).join(', ')} />
						: null
				}
				{
					(props.mode === PanelMode.Full) && (props.monsterGroup.information.length > 0) ?
						props.monsterGroup.information.map(i => (
							<div key={i.id}>
								<HeaderText>{i.name || 'Unnamed Information'}</HeaderText>
								{i.description ? <div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(i.description) }} /> : null}
							</div>
						))
						: null
				}
				{
					(props.mode === PanelMode.Full) && (props.monsterGroup.malice.length > 0) ?
						<SelectablePanel>
							<HeaderText level={1}>{props.monsterGroup.name} Malice</HeaderText>
							At the start of any {props.monsterGroup.name}'s turn, you can spend malice to activate one of the following features.
							{props.monsterGroup.malice.map(m =>
								<FeaturePanel
									key={m.id}
									feature={m}
									mode={PanelMode.Full}
									cost={m.type === FeatureType.Ability ? m.data.ability.cost : m.data.cost}
								/>
							)}
						</SelectablePanel>
						: null
				}
				{
					(props.mode === PanelMode.Full) && (props.monsterGroup.monsters.length > 0) ?
						<Space direction='vertical' style={{ width: '100%', marginTop: '25px' }}>
							{props.monsterGroup.monsters.map(m => <SelectablePanel key={m.id}><MonsterPanel monster={m} monsterGroup={props.monsterGroup} mode={PanelMode.Full} /></SelectablePanel>)}
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
