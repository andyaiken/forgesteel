import { Monster, MonsterGroup } from '../../../../models/monster';
import { Divider } from 'antd';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { MonsterPanel } from '../monster-panel/monster-panel';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';

import './monster-group-panel.scss';

interface Props {
	monsterGroup: MonsterGroup;
	options: Options;
	mode?: PanelMode;
	onSelectMonster?: (monster: Monster) => void;
}

export const MonsterGroupPanel = (props: Props) => {
	let eschelonGroup0 = props.monsterGroup.monsters.filter(x => x.echelon <= 0);
	let eschelonGroup1 = props.monsterGroup.monsters.filter(x => x.echelon === 1);
	let eschelonGroup2 = props.monsterGroup.monsters.filter(x => x.echelon === 2);
	let eschelonGroup3 = props.monsterGroup.monsters.filter(x => x.echelon === 3);
	let eschelonGroup4 = props.monsterGroup.monsters.filter(x => x.echelon >= 4);

	let eschelonInfo1 = props.monsterGroup.echelonInfo?.filter(x => x.echelon === 1) ?? [];
	let eschelonInfo2 = props.monsterGroup.echelonInfo?.filter(x => x.echelon === 2) ?? [];
	let eschelonInfo3 = props.monsterGroup.echelonInfo?.filter(x => x.echelon === 3) ?? [];
	let eschelonInfo4 = props.monsterGroup.echelonInfo?.filter(x => x.echelon >= 4) ?? [];

	try {
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
						(props.mode === PanelMode.Full && props.monsterGroup.malice.length > 0 && eschelonGroup0.length > 0) ?
							<Divider />
							: null
					}
					{
						(props.mode === PanelMode.Full && eschelonGroup0.length > 0) ?
							<div className='monsters'>
								{
									eschelonGroup0.map(m =>
										<SelectablePanel key={m.id} onSelect={props.onSelectMonster ? () => props.onSelectMonster!(m) : undefined}>
											<MonsterPanel monster={m} monsterGroup={props.monsterGroup} options={props.options} />
										</SelectablePanel>
									)
								}
							</div>
							: null
					}
					{
						(props.mode === PanelMode.Full && eschelonGroup1.length > 0) ?
							<>
								{
									(eschelonInfo1.length > 0) ?
									<div>
										{eschelonInfo1.map(i => (
											<>
												<HeaderText level={1}>{eschelonInfo1.map(i => i.name)}</HeaderText>
												<Markdown text={i.description} />
												{i.subInfo?.map(sub => (
													<div key={sub.id}>
														<HeaderText>{sub.name || 'Unnamed Information'}</HeaderText>
														<Markdown text={sub.description} />
													</div>
												))}
											</>
										))}
									</div>
									: <HeaderText level={1}>1st Echelon</HeaderText>
								}
								<div className='monsters'>
									{
										eschelonGroup1.map(m =>
											<SelectablePanel key={m.id} onSelect={props.onSelectMonster ? () => props.onSelectMonster!(m) : undefined}>
												<MonsterPanel monster={m} monsterGroup={props.monsterGroup} options={props.options} />
											</SelectablePanel>
										)
									}
								</div>
							</>
							: null
					}
					{
						(props.mode === PanelMode.Full && eschelonGroup2.length > 0) ?
							<>
								{
									(eschelonInfo2.length > 0) ?
									<div>
										{eschelonInfo2.map(i => (
											<>
												<HeaderText level={1}>{eschelonInfo2.map(i => i.name)}</HeaderText>
												<Markdown text={i.description} />
												{i.subInfo?.map(sub => (
													<div key={sub.id}>
														<HeaderText>{sub.name || 'Unnamed Information'}</HeaderText>
														<Markdown text={sub.description} />
													</div>
												))}
											</>
										))}
									</div>
									: <HeaderText level={1}>2nd Echelon</HeaderText>
								}
								<div className='monsters'>
									{
										eschelonGroup2.map(m =>
											<SelectablePanel key={m.id} onSelect={props.onSelectMonster ? () => props.onSelectMonster!(m) : undefined}>
												<MonsterPanel monster={m} monsterGroup={props.monsterGroup} options={props.options} />
											</SelectablePanel>
										)
									}
								</div>
							</>
							: null
					}
					{
						(props.mode === PanelMode.Full && eschelonGroup3.length > 0) ?
							<>
								{
									(eschelonInfo3.length > 0) ?
									<div>
										{eschelonInfo3.map(i => (
											<>
												<HeaderText level={1}>{eschelonInfo3.map(i => i.name)}</HeaderText>
												<Markdown text={i.description} />
												{i.subInfo?.map(sub => (
													<div key={sub.id}>
														<HeaderText>{sub.name || 'Unnamed Information'}</HeaderText>
														<Markdown text={sub.description} />
													</div>
												))}
											</>
										))}
									</div>
									: <HeaderText level={1}>3rd Echelon</HeaderText>
								}
								<div className='monsters'>
									{
										eschelonGroup3.map(m =>
											<SelectablePanel key={m.id} onSelect={props.onSelectMonster ? () => props.onSelectMonster!(m) : undefined}>
												<MonsterPanel monster={m} monsterGroup={props.monsterGroup} options={props.options} />
											</SelectablePanel>
										)
									}
								</div>
							</>
							: null
					}
					{
						(props.mode === PanelMode.Full && eschelonGroup4.length > 0) ?
							<>
								{
									(eschelonInfo4.length > 0) ?
									<div>
										<HeaderText level={1}>{eschelonInfo4.map(i => i.name)}</HeaderText>
										{eschelonInfo4.map(i => (
											<>
												<Markdown text={i.description} />
												{i.subInfo?.map(sub => (
													<div key={sub.id}>
														<HeaderText>{sub.name || 'Unnamed Information'}</HeaderText>
														<Markdown text={sub.description} />
													</div>
												))}
											</>
										))}
									</div>
									: <HeaderText level={1}>4th Echelon</HeaderText>
								}
								<div className='monsters'>
									{
										eschelonGroup4.map(m =>
											<SelectablePanel key={m.id} onSelect={props.onSelectMonster ? () => props.onSelectMonster!(m) : undefined}>
												<MonsterPanel monster={m} monsterGroup={props.monsterGroup} options={props.options} />
											</SelectablePanel>
										)
									}
								</div>
							</>
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
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
