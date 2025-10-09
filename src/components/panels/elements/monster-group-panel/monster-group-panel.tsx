import { Divider } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Monster } from '@/models/monster';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';

import './monster-group-panel.scss';

interface Props {
	monsterGroup: MonsterGroup;
	options: Options;
	mode?: PanelMode;
	onSelectMonster?: (monster: Monster) => void;
}

export const MonsterGroupPanel = (props: Props) => {
	return (
		<ErrorBoundary>
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
							<HeaderText level={1}>Malice</HeaderText>
							At the start of any {props.monsterGroup.name}'s turn, you can spend malice to activate one of the following features.
							<div className='malice'>
								{props.monsterGroup.malice.map(m =>
									<SelectablePanel key={m.id}>
										<FeaturePanel
											feature={m}
											options={props.options}
											mode={PanelMode.Full}
											cost={m.type === FeatureType.MaliceAbility ? m.data.ability.cost : m.data.cost}
											repeatable={m.type === FeatureType.Malice ? m.data.repeatable : undefined}
										/>
									</SelectablePanel>
								)}
							</div>
						</div>
						: null
				}
				{
					((props.mode === PanelMode.Full) && (props.monsterGroup.malice.length > 0) && (props.monsterGroup.monsters.length > 0)) ?
						<Divider />
						: null
				}
				{
					((props.mode === PanelMode.Full) && (props.monsterGroup.monsters.length > 0)) ?
						<div className='monsters'>
							{
								props.monsterGroup.monsters.map(m =>
									<SelectablePanel key={m.id} onSelect={props.onSelectMonster ? () => props.onSelectMonster!(m) : undefined}>
										<MonsterPanel monster={m} monsterGroup={props.monsterGroup} options={props.options} />
									</SelectablePanel>
								)
							}
						</div>
						: null
				}
				{
					(props.mode === PanelMode.Full) && (props.monsterGroup.addOns.length > 0) ?
						<>
							<HeaderText level={1}>Customization</HeaderText>
							<div className='add-ons'>
								{props.monsterGroup.addOns.map(a => <FeaturePanel key={a.id} feature={a} options={props.options} cost={a.data.cost} mode={PanelMode.Full} />)}
							</div>
						</>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
