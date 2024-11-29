import { CampaignSetting } from '../../../models/campaign-setting';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { MonsterGroup } from '../../../models/monster';
import { MonsterPanel } from '../monster-panel/monster-panel';
import { PanelMode } from '../../../enums/panel-mode';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';

import './monster-group-panel.scss';

interface Props {
	monsterGroup: MonsterGroup;
	campaignSettings?: CampaignSetting[];
	mode?: PanelMode;
}

export const MonsterGroupPanel = (props: Props) => {
	try {
		return (
			<div className='monster-group-panel' id={props.mode === PanelMode.Full ? props.monsterGroup.id : undefined}>
				<HeaderText level={1}>{props.monsterGroup.name || 'Unnamed Monster Group'}</HeaderText>
				<div className='ds-text description-text'>{props.monsterGroup.description}</div>
				{
					props.mode !== PanelMode.Full ?
						<Field label='Monsters' value={props.monsterGroup.monsters.map(m => m.name || 'Unnamed Monster').join(', ')} />
						: null
				}
				{
					(props.mode === PanelMode.Full) && (props.monsterGroup.information.length > 0) ?
						props.monsterGroup.information.map(i => (
							<div key={i.id}>
								<HeaderText>{i.name || 'Unnamed Information'}</HeaderText>
								<div className='ds-text description-text'>{i.description}</div>
							</div>
						))
						: null
				}
				{
					(props.mode === PanelMode.Full) && (props.monsterGroup.malice.length > 0) ?
						<div>
							<HeaderText level={1}>Malice</HeaderText>
							{props.monsterGroup.malice.map(m => <FeaturePanel key={m.id} feature={m} mode={PanelMode.Full} />)}
						</div>
						: null
				}
				{
					(props.mode === PanelMode.Full) && (props.monsterGroup.monsters.length > 0) ?
						props.monsterGroup.monsters.map(m => <SelectablePanel key={m.id}><MonsterPanel monster={m} mode={PanelMode.Full} /></SelectablePanel>)
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
