import { Divider } from 'antd';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { MonsterGroup } from '../../../../models/monster';
import { MonsterPanel } from '../monster-panel/monster-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';

import './monster-group-panel.scss';

interface Props {
	monsterGroup: MonsterGroup;
	mode?: PanelMode;
}

export const MonsterGroupPanel = (props: Props) => {
	try {
		return (
			<div className={props.mode === PanelMode.Full ? 'monster-group-panel' : 'monster-group-panel compact'} id={props.mode === PanelMode.Full ? props.monsterGroup.id : undefined}>
				<HeaderText level={1}>{props.monsterGroup.name || 'Unnamed Monster Group'}</HeaderText>
				<Markdown text={props.monsterGroup.description} />
				{
					(props.mode === PanelMode.Full) && (props.monsterGroup.information.length > 0) ?
						props.monsterGroup.information.map(i => (
							<div key={i.id}>
								<HeaderText>{i.name || 'Unnamed Information'}</HeaderText>
								<Markdown text={i.description} />
							</div>
						))
						: null
				}
				{
					(props.mode === PanelMode.Full) && (props.monsterGroup.malice.length > 0) ?
						<div>
							<HeaderText level={1}>{props.monsterGroup.name} Malice</HeaderText>
							At the start of any {props.monsterGroup.name}'s turn, you can spend malice to activate one of the following features.
							<div className='malice'>
								{props.monsterGroup.malice.map(m =>
									<SelectablePanel key={m.id}>
										<FeaturePanel
											feature={m}
											mode={PanelMode.Full}
											cost={m.type === FeatureType.Ability ? m.data.ability.cost : m.data.cost}
											repeatable={m.type === FeatureType.Malice ? m.data.repeatable : undefined}
										/>
									</SelectablePanel>
								)}
							</div>
						</div>
						: null
				}
				{
					(props.mode === PanelMode.Full) && (props.monsterGroup.malice.length > 0) && (props.monsterGroup.monsters.length > 0) ?
						<Divider />
						: null
				}
				{
					(props.mode === PanelMode.Full) && (props.monsterGroup.monsters.length > 0) ?
						<div className='monsters'>
							{props.monsterGroup.monsters.map(m => <SelectablePanel key={m.id}><MonsterPanel monster={m} monsterGroup={props.monsterGroup} mode={PanelMode.Full} /></SelectablePanel>)}
						</div>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
