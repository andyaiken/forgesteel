import { MonsterInfo, TerrainInfo } from '../../token/token';
import { Empty } from '../../../controls/empty/empty';
import { Encounter } from '../../../../models/encounter';
import { EncounterDifficultyLogic } from '../../../../logic/encounter-difficulty-logic';
import { EncounterDifficultyPanel } from '../../encounter-difficulty/encounter-difficulty-panel';
import { EncounterLogic } from '../../../../logic/encounter-logic';
import { EncounterObjectivePanel } from '../encounter-objective/encounter-objective-panel';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Markdown } from '../../../controls/markdown/markdown';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterPanel } from '../monster-panel/monster-panel';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Pill } from '../../../controls/pill/pill';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Space } from 'antd';
import { TerrainPanel } from '../terrain-panel/terrain-panel';

import './encounter-panel.scss';

interface Props {
	encounter: Encounter;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
	mode?: PanelMode;
}

export const EncounterPanel = (props: Props) => {
	const getEncounterGroups = () => {
		if (props.mode !== PanelMode.Full) {
			return null;
		}

		if ((props.encounter.groups.length === 0) && (props.encounter.terrain.length === 0)) {
			return (
				<Empty text='No monsters or terrain' />
			);
		}

		return (
			<div className='encounter-groups'>
				{
					props.encounter.groups.filter(g => g.slots.length > 0).map((group, n) => (
						<SelectablePanel key={group.id} style={{ paddingTop: '0' }}>
							{
								props.encounter.groups.filter(g => g.slots.length > 0).length > 1 ?
									<HeaderText>{group.name || `Group ${n + 1}`}</HeaderText>
									:
									<HeaderText>Monsters</HeaderText>
							}
							<Space direction='vertical'>
								{
									group.slots.map(slot => {
										const monster = EncounterLogic.getCustomizedMonster(slot.monsterID, slot.customization, props.sourcebooks);
										if (!monster) {
											return null;
										}

										const count = slot.count * MonsterLogic.getRoleMultiplier(monster.role.organization, props.options);

										return (
											<div key={slot.id} className='encounter-slot'>
												<MonsterInfo monster={monster} />
												{count > 1 ? <Pill>x{count}</Pill> : null}
											</div>
										);
									})
								}
								{
									group.slots.length === 0 ?
										<Empty />
										: null
								}
							</Space>
						</SelectablePanel>
					))
				}
				{
					props.encounter.terrain.length > 0 ?
						<SelectablePanel key='terrain' style={{ paddingTop: '0' }}>
							<HeaderText>Terrain</HeaderText>
							<Space direction='vertical'>
								{
									props.encounter.terrain.map(slot => {
										const terrain = SourcebookLogic.getTerrains(props.sourcebooks).find(t => t.id === slot.terrainID);
										if (!terrain) {
											return null;
										}

										return (
											<div key={slot.id} className='terrain-slot'>
												<TerrainInfo terrain={terrain} />
												{slot.count > 1 ? <Pill>x{slot.count}</Pill> : null}
											</div>
										);
									})
								}
							</Space>
						</SelectablePanel>
						: null
				}
			</div>
		);
	};

	const getMeta = () => {
		if (props.mode !== PanelMode.Full) {
			return null;
		}

		return (
			<div className='encounter-meta'>
				{props.encounter.objective ? <EncounterObjectivePanel objective={props.encounter.objective} mode={PanelMode.Full} /> : null}
				<EncounterDifficultyPanel encounter={props.encounter} sourcebooks={props.sourcebooks} heroes={props.heroes} options={props.options} />
				{props.encounter.notes.map(note => <Field key={note.id} label={note.name} value={<Markdown text={note.description} useSpan={true} />} />)}
			</div>
		);
	};

	const getStatBlocks = () => {
		if (props.mode !== PanelMode.Full) {
			return null;
		}

		const monsterData = EncounterLogic.getMonsterData(props.encounter);
		if ((monsterData.length === 0) && (props.encounter.terrain.length === 0)) {
			return null;
		}

		return (
			<>
				<HeaderText level={1}>Stat Blocks</HeaderText>
				<div className='encounter-stat-blocks'>
					{
						monsterData.map(data => {
							const monster = EncounterLogic.getCustomizedMonster(data.monsterID, data.customization, props.sourcebooks);
							const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, data.monsterID);
							if (monster && monsterGroup) {
								return (
									<MonsterPanel
										key={monster.id}
										monster={monster}
										monsterGroup={monsterGroup}
										options={props.options}
										mode={PanelMode.Full}
									/>
								);
							}

							return null;
						})
					}
					{
						props.encounter.terrain.map(slot => {
							const terrain = SourcebookLogic.getTerrains(props.sourcebooks).find(t => t.id === slot.terrainID);
							if (terrain) {
								return (
									<TerrainPanel
										key={terrain.id}
										terrain={terrain}
										upgradeIDs={slot.upgradeIDs}
										mode={PanelMode.Full}
									/>
								);
							}
							return null;
						})
					}
				</div>
			</>
		);
	};

	const getMaliceDetails = () => {
		if (props.mode !== PanelMode.Full) {
			return null;
		}

		const monsterGroups = EncounterLogic.getMonsterGroups(props.encounter, props.sourcebooks);
		if (monsterGroups.length === 0) {
			return null;
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					monsterGroups.filter(group => group.malice.length > 0).map(group => (
						<div key={group.id}>
							<HeaderText level={1}>{group.name} Malice</HeaderText>
							<div className='malice'>
								{
									group.malice.map(m => (
										<SelectablePanel key={m.id}>
											<FeaturePanel
												feature={m}
												options={props.options}
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
		);
	};

	try {
		const strength = EncounterDifficultyLogic.getStrength(props.encounter, props.sourcebooks);
		const difficulty = EncounterDifficultyLogic.getDifficulty(strength, props.options, props.heroes);

		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'encounter-panel' : 'encounter-panel compact'} id={props.mode === PanelMode.Full ? props.encounter.id : undefined}>
					<HeaderText level={1} tags={[ difficulty ]}>{props.encounter.name || 'Unnamed Encounter'}</HeaderText>
					<Markdown text={props.encounter.description} />
					{getEncounterGroups()}
					{getMeta()}
					{getStatBlocks()}
					{getMaliceDetails()}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
