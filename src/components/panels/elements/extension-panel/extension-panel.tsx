import { Alert, Space } from 'antd';
import { CSSProperties, ReactNode, useMemo } from 'react';
import { AbilityPanel } from '@/components/panels/elements/ability-panel/ability-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { Extension } from '@/models/extension';
import { ExtensionChangeType } from '@/enums/extension-change-type';
import { ExtensionLogic } from '@/logic/extension-logic';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Markdown } from '@/components/controls/markdown/markdown';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';

import './extension-panel.scss';

interface Props {
	extension: Extension;
	sourcebooks: Sourcebook[];
	mode?: PanelMode;
	style?: CSSProperties;
}

export const ExtensionPanel = (props: Props) => {
	const extension = props.extension;
	const target = ExtensionLogic.getTarget(extension, props.sourcebooks);
	// Working this out means copying the whole target, so it's only redone when the extension or sourcebooks change
	const unresolved = useMemo(() => ExtensionLogic.getUnresolvedChanges(extension, props.sourcebooks), [ extension, props.sourcebooks ]);
	const hasLevels = !!target && (target.kind !== 'ancestry') && (target.kind !== 'kit');

	const getFeatureName = (featureID: string) => ExtensionLogic.getTargetFeatureName(target, featureID);

	const getWarning = (changeID: string) => {
		if (!target || !unresolved.includes(changeID)) {
			return null;
		}

		return (
			<Alert
				type='warning'
				showIcon={true}
				title={`This change can't be applied - what it refers to isn't in ${target.element.name || 'the target'}.`}
			/>
		);
	};

	const getTarget = () => {
		if (!target) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					title='The element this extends can’t be found. Its sourcebook may have been removed or hidden.'
				/>
			);
		}

		return (
			<Field label='Extends' value={`${target.element.name || 'Unnamed element'} (${ExtensionLogic.getTargetKindName(target.kind)})`} />
		);
	};

	const getAbilities = () => {
		const changes = extension.changes.filter(c => c.type === ExtensionChangeType.AddAbility);
		if (changes.length === 0) {
			return null;
		}

		return (
			<>
				<HeaderText level={2}>New Abilities</HeaderText>
				<div className='extension-grid'>
					{
						changes.map(c => (
							<Space key={c.id} orientation='vertical' style={{ width: '100%' }}>
								{getWarning(c.id)}
								<SelectablePanel>
									<AbilityPanel ability={c.data.ability} mode={PanelMode.Full} />
								</SelectablePanel>
							</Space>
						))
					}
				</div>
			</>
		);
	};

	const getFeatures = () => {
		const changes = extension.changes.filter(c => c.type === ExtensionChangeType.AddFeature);
		if (changes.length === 0) {
			return null;
		}

		const levels = hasLevels ? [ ...new Set(changes.map(c => c.data.level)) ].sort((a, b) => a - b) : [ null ];

		return (
			<>
				<HeaderText level={2}>New Features</HeaderText>
				{
					levels.map(level => {
						const content = changes
							.filter(c => (level === null) || (c.data.level === level))
							.map(c => (
								<Space key={c.id} orientation='vertical' style={{ width: '100%' }}>
									{getWarning(c.id)}
									<FeaturePanel feature={c.data.feature} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
								</Space>
							));

						if (level === null) {
							return content;
						}

						return (
							<Expander key={level} title={ExtensionLogic.getLevelName(level, target!.kind)}>
								{content}
							</Expander>
						);
					})
				}
			</>
		);
	};

	const getOptions = () => {
		const changes = extension.changes.filter(c => (c.type === ExtensionChangeType.AddChoiceOption) || (c.type === ExtensionChangeType.AddSummonOption));
		if (changes.length === 0) {
			return null;
		}

		const featureIDs = [ ...new Set(changes.map(c => c.data.featureID)) ];

		return (
			<>
				<HeaderText level={2}>New Options</HeaderText>
				{
					featureIDs.map(featureID => (
						<Expander key={featureID} title={getFeatureName(featureID)}>
							<Space orientation='vertical' style={{ width: '100%' }}>
								{
									changes
										.filter(c => c.data.featureID === featureID)
										.map(c => {
											let content: ReactNode = null;
											switch (c.type) {
												case ExtensionChangeType.AddChoiceOption:
													content = (
														<FeaturePanel feature={c.data.option.feature} cost={c.data.option.value > 1 ? c.data.option.value : undefined} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
													);
													break;
												case ExtensionChangeType.AddSummonOption:
													content = (
														<SelectablePanel>
															<MonsterPanel monster={c.data.summon.monster} summon={c.data.summon.info} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
														</SelectablePanel>
													);
													break;
											}

											return (
												<Space key={c.id} orientation='vertical' style={{ width: '100%' }}>
													{getWarning(c.id)}
													{content}
												</Space>
											);
										})
								}
							</Space>
						</Expander>
					))
				}
			</>
		);
	};

	const getMalice = () => {
		const changes = extension.changes.filter(c => c.type === ExtensionChangeType.AddMalice);
		if (changes.length === 0) {
			return null;
		}

		return (
			<>
				<HeaderText level={2}>New Malice</HeaderText>
				<div className='extension-grid'>
					{
						changes.map(c => {
							const malice = c.data.malice;
							return (
								<Space key={c.id} orientation='vertical' style={{ width: '100%' }}>
									{getWarning(c.id)}
									<SelectablePanel>
										<FeaturePanel
											feature={malice}
											mode={PanelMode.Full}
											cost={MonsterLogic.getMaliceCost(malice)}
											repeatable={malice.type === FeatureType.Malice ? malice.data.repeatable : undefined}
										/>
									</SelectablePanel>
								</Space>
							);
						})
					}
				</div>
			</>
		);
	};

	const getMonsters = () => {
		const changes = extension.changes.filter(c => c.type === ExtensionChangeType.AddMonster);
		if (changes.length === 0) {
			return null;
		}

		const monsterGroup = (target && (target.kind === 'monster-group')) ? target.element : undefined;

		return (
			<>
				<HeaderText level={2}>New Monsters</HeaderText>
				<div className='extension-grid'>
					{
						changes.map(c => (
							<Space key={c.id} orientation='vertical' style={{ width: '100%' }}>
								{getWarning(c.id)}
								<SelectablePanel>
									<MonsterPanel monster={c.data.monster} monsterGroup={monsterGroup} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
								</SelectablePanel>
							</Space>
						))
					}
				</div>
			</>
		);
	};

	const getReplacements = () => {
		const changes = extension.changes.filter(c => c.type === ExtensionChangeType.ReplaceFeature);
		if (changes.length === 0) {
			return null;
		}

		return (
			<>
				<HeaderText level={2}>Replaced Features</HeaderText>
				{
					changes.map(c => (
						<Expander key={c.id} title={getFeatureName(c.data.featureID)}>
							<Space orientation='vertical' style={{ width: '100%' }}>
								{getWarning(c.id)}
								<FeaturePanel feature={c.data.feature} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
							</Space>
						</Expander>
					))
				}
			</>
		);
	};

	const tags = target ? [ ExtensionLogic.getTargetKindName(target.kind) ] : [];

	if (props.mode !== PanelMode.Full) {
		return (
			<div className='extension-panel compact'>
				<HeaderText level={1} tags={tags}>
					{extension.name || 'Unnamed Extension'}
				</HeaderText>
				{getTarget()}
				<Markdown text={extension.description} />
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<div className='extension-panel' id={SheetFormatter.getPageId('extension', extension.id)} style={props.style}>
				<HeaderText level={1} tags={tags}>
					{extension.name || 'Unnamed Extension'}
				</HeaderText>
				{getTarget()}
				<Markdown text={extension.description} />
				{getAbilities()}
				{getFeatures()}
				{getOptions()}
				{getReplacements()}
				{getMalice()}
				{getMonsters()}
				{
					extension.changes.length === 0 ?
						<div className='ds-text dimmed-text'>This extension doesn’t change anything yet.</div>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
