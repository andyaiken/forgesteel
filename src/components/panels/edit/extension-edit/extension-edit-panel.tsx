import { AbilityListEditPanel, FeatureListEditPanel } from '@/components/panels/edit/list-edit/list-edit-panel';
import { Alert, Button, Segmented, Select, Space, Tabs } from 'antd';
import { Extension, ExtensionChange, ExtensionChangeAddChoiceOption, ExtensionChangeAddSummonOption, ExtensionTargetKind } from '@/models/extension';
import { Ability } from '@/models/ability';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { Expander } from '@/components/controls/expander/expander';
import { ExtensionChangeType } from '@/enums/extension-change-type';
import { ExtensionLogic } from '@/logic/extension-logic';
import { ExtensionPanel } from '@/components/panels/elements/extension-panel/extension-panel';
import { FactoryLogic } from '@/logic/factory-logic';
import { Feature } from '@/models/feature';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeatureType } from '@/enums/feature-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Monster } from '@/models/monster';
import { MonsterEditPanel } from '@/components/panels/edit/monster-edit/monster-edit-panel';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { NameDescEditPanel } from '@/components/panels/edit/name-desc-edit/name-desc-edit-panel';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { PanelMode } from '@/enums/panel-mode';
import { PlusOutlined } from '@ant-design/icons';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Summon } from '@/models/summon';
import { SummonEditPanel } from '@/components/panels/edit/summon-edit/summon-edit-panel';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './extension-edit-panel.scss';

interface Props {
	extension: Extension;
	sourcebooks: Sourcebook[];
	mode?: PanelMode;
	onChange: (extension: Extension) => void;
}

export const ExtensionEditPanel = (props: Props) => {
	const [ extension, setExtension ] = useState<Extension>(props.extension);

	const target = ExtensionLogic.getTarget(extension, props.sourcebooks);
	const targetFeatures = target ? ExtensionLogic.getTargetFeatures(target) : [];
	const targetChoices = targetFeatures.filter(tf => (tf.feature.type === FeatureType.Choice) || (tf.feature.type === FeatureType.SummonChoice));
	const targetName = target?.element.name || `this ${ExtensionLogic.getTargetKindName(extension.targetKind).toLowerCase()}`;

	const canChange = (type: ExtensionChangeType) => ExtensionLogic.canChange(extension.targetKind, type);
	const hasChanges = (...types: ExtensionChangeType[]) => extension.changes.some(c => types.includes(c.type));

	const update = (copy: Extension) => {
		setExtension(copy);
		props.onChange(copy);
	};

	// Swaps the changes that match the filter for a new set
	const setChanges = (matches: (change: ExtensionChange) => boolean, changes: ExtensionChange[]) => {
		const copy = Utils.copy(extension);
		copy.changes = [ ...copy.changes.filter(c => !matches(c)), ...changes ];
		update(copy);
	};

	const getFeatureLabel = (featureID: string) => ExtensionLogic.getTargetFeatureName(target, featureID);

	// Shown on a tab that is only there because the extension has changes that don't suit what it now targets,
	// so that they can be removed
	const getMismatchWarning = (text: string) => (
		<Alert
			type='warning'
			showIcon={true}
			title={`${text.charAt(0).toUpperCase()}${text.slice(1)} - these changes won't be applied.`}
		/>
	);

	const getTargetSection = () => {
		const setNameAndDescription = (name: string, desc: string) => {
			const copy = Utils.copy(extension);
			copy.name = name;
			copy.description = desc;
			update(copy);
		};

		const setTargetKind = (kind: ExtensionTargetKind) => {
			const copy = Utils.copy(extension);
			copy.targetKind = kind;
			copy.targetID = '';
			update(copy);
		};

		const setTargetID = (id: string) => {
			const copy = Utils.copy(extension);
			copy.targetID = id;
			update(copy);
		};

		let options: { value: string, label: string }[] = [];
		switch (extension.targetKind) {
			case 'ancestry':
				options = SourcebookLogic.getAncestries(props.sourcebooks).map(a => ({ value: a.id, label: a.name }));
				break;
			case 'class':
				options = SourcebookLogic.getClasses(props.sourcebooks).map(c => ({ value: c.id, label: c.name }));
				break;
			case 'domain':
				options = SourcebookLogic.getDomains(props.sourcebooks).map(d => ({ value: d.id, label: d.name }));
				break;
			case 'kit':
				options = SourcebookLogic.getKits(props.sourcebooks).map(k => ({ value: k.id, label: k.name }));
				break;
			case 'monster-group':
				options = SourcebookLogic.getMonsterGroups(props.sourcebooks).map(mg => ({ value: mg.id, label: mg.name }));
				break;
			case 'subclass': {
				const classes = SourcebookLogic.getClasses(props.sourcebooks);
				options = SourcebookLogic.getSubclasses(props.sourcebooks, true).map(sc => {
					const heroClass = classes.find(c => (c.id === sc.classID) || c.subclasses.some(s => s.id === sc.id));
					return { value: sc.id, label: heroClass ? `${sc.name} (${heroClass.name})` : sc.name };
				});
				break;
			}
		}
		options = options.map(o => ({ value: o.value, label: o.label || 'Unnamed element' }));
		if (extension.targetID && !target) {
			options.unshift({ value: extension.targetID, label: 'Unknown element' });
		}

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<Alert
					type='info'
					showIcon={true}
					title={
						<>
							<div>An extension adds to or changes an existing ancestry, class, subclass, kit, domain or monster group, without making a copy of it.</div>
							{
								extension.targetKind === 'monster-group' ?
									<div>The original stays as published. Extensions to monster groups are used in encounters, maps and adventures, as long as the extension's sourcebook isn't hidden.</div>
									:
									<div>The original stays as published. Players choose which extensions each hero uses, on the Details page of the hero builder.</div>
							}
						</>
					}
				/>
				<NameDescEditPanel
					element={extension}
					onChange={setNameAndDescription}
				/>
				<HeaderText>Extends</HeaderText>
				<Segmented
					block={true}
					options={([ 'ancestry', 'class', 'subclass', 'kit', 'domain', 'monster-group' ] as ExtensionTargetKind[]).map(k => ({ value: k, label: ExtensionLogic.getTargetKindName(k) }))}
					value={extension.targetKind}
					onChange={setTargetKind}
				/>
				<Select
					style={{ width: '100%' }}
					status={target ? '' : 'warning'}
					placeholder={`Choose ${ExtensionLogic.getTargetKindName(extension.targetKind).toLowerCase()}`}
					options={options}
					optionRender={o => <div className='ds-text'>{o.data.label}</div>}
					showSearch={{ optionFilterProp: 'label' }}
					value={extension.targetID || null}
					onChange={setTargetID}
				/>
				{
					hasChanges(ExtensionChangeType.AddChoiceOption, ExtensionChangeType.AddSummonOption, ExtensionChangeType.ReplaceFeature) ?
						<Alert
							type='info'
							showIcon={true}
							title='Options and replacements point at features in the element this extends - if you change it, they will need to be set up again.'
						/>
						: null
				}
			</Space>
		);
	};

	const getAbilitiesSection = () => {
		const changes = extension.changes.filter(c => c.type === ExtensionChangeType.AddAbility);

		const onChange = (abilities: Ability[]) => {
			setChanges(
				c => c.type === ExtensionChangeType.AddAbility,
				abilities.map(a => ({
					id: changes.find(c => c.data.ability.id === a.id)?.id || Utils.guid(),
					type: ExtensionChangeType.AddAbility,
					data: { ability: a }
				}))
			);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					!canChange(ExtensionChangeType.AddAbility) ?
						<Alert
							type='warning'
							showIcon={true}
							title={`Abilities can only be added to a class or subclass, not to ${ExtensionLogic.getTargetKindName(extension.targetKind).toLowerCase()} - these won't be applied.`}
						/>
						:
						<Alert
							type='info'
							showIcon={true}
							title={`These abilities join the ${ExtensionLogic.getTargetKindName(extension.targetKind).toLowerCase()}'s own, so they are offered whenever a hero chooses an ability from it.`}
						/>
				}
				<AbilityListEditPanel
					abilities={changes.map(c => c.data.ability)}
					onChange={onChange}
				/>
			</Space>
		);
	};

	const getFeaturesSection = () => {
		if (!target) {
			return <Empty text='Choose what this extends first.' />;
		}

		const changes = extension.changes.filter(c => c.type === ExtensionChangeType.AddFeature);

		let levels: number[] = [];
		switch (target.kind) {
			case 'ancestry':
			case 'kit':
				levels = [ 1 ];
				break;
			case 'domain':
				levels = [ 0, ...target.element.featuresByLevel.map(lvl => lvl.level) ];
				break;
			case 'class':
			case 'subclass':
				levels = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
				break;
			case 'monster-group':
				levels = [ 1 ];
				break;
		}
		if (levels.length > 1) {
			// A feature set up for a different target can sit at a level this one doesn't have - it still applies, so it has to be shown
			levels = [ ...new Set([ ...levels, ...changes.map(c => c.data.level) ]) ].sort((a, b) => a - b);
		}

		const onChange = (level: number, features: Feature[]) => {
			setChanges(
				c => (c.type === ExtensionChangeType.AddFeature) && ((levels.length === 1) || (c.data.level === level)),
				features.map(f => ({
					id: changes.find(c => c.data.feature.id === f.id)?.id || Utils.guid(),
					type: ExtensionChangeType.AddFeature,
					data: { level: level, feature: f }
				}))
			);
		};

		let info = '';
		switch (target.kind) {
			case 'ancestry':
			case 'kit':
				info = `These features are added to ${targetName}'s own.`;
				break;
			case 'domain':
				info = `Default features come with ${targetName} as soon as it is chosen; the others are added at the level they are listed under.`;
				break;
			case 'class':
			case 'subclass':
				info = `These features are added to ${targetName} at the level they are listed under, alongside its own features for that level.`;
				break;
		}

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					canChange(ExtensionChangeType.AddFeature) ?
						<Alert
							type='info'
							showIcon={true}
							title={info}
						/>
						:
						getMismatchWarning(`Features can't be added to ${targetName}`)
				}
				{
					levels.map(level => (
						<FeatureListEditPanel
							key={level}
							title={levels.length > 1 ? ExtensionLogic.getLevelName(level, target.kind) : 'Features'}
							features={changes.filter(c => (levels.length === 1) || (c.data.level === level)).map(c => c.data.feature)}
							sourcebooks={props.sourcebooks}
							onChange={features => onChange(level, features)}
						/>
					))
				}
			</Space>
		);
	};

	const getOptionsSection = () => {
		if (!target) {
			return <Empty text='Choose what this extends first.' />;
		}

		const changes = extension.changes.filter(c => (c.type === ExtensionChangeType.AddChoiceOption) || (c.type === ExtensionChangeType.AddSummonOption));
		const featureIDs = [ ...new Set(changes.map(c => c.data.featureID)) ];

		const addOption = (featureID: string) => {
			const feature = targetFeatures.find(tf => tf.feature.id === featureID)?.feature;
			if (!feature) {
				return;
			}

			const copy = Utils.copy(extension);
			if (feature.type === FeatureType.SummonChoice) {
				// Start from the same kind of monster as the existing options - a beastheart companion, say
				const template = feature.data.options.length > 0 ? feature.data.options[0].monster : null;
				copy.changes.push({
					id: Utils.guid(),
					type: ExtensionChangeType.AddSummonOption,
					data: {
						featureID: featureID,
						summon: FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: Utils.guid(),
								name: '',
								description: '',
								level: 1,
								role: template ? Utils.copy(template.role) : FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
								keywords: template ? [ ...template.keywords ] : [],
								encounterValue: 0,
								size: FactoryLogic.createSize(1),
								speed: FactoryLogic.createSpeed(5),
								stamina: 8,
								stability: 0,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(0, 0, 0, 0, 0),
								features: []
							}),
							isSignature: true,
							cost: 1,
							count: 1
						})
					}
				});
			} else {
				copy.changes.push({
					id: Utils.guid(),
					type: ExtensionChangeType.AddChoiceOption,
					data: {
						featureID: featureID,
						option: {
							feature: FactoryLogic.feature.create({ id: Utils.guid(), name: '', description: '' }),
							value: 1
						}
					}
				});
			}
			update(copy);
		};

		const setChange = (change: ExtensionChange) => {
			const copy = Utils.copy(extension);
			copy.changes = copy.changes.map(c => c.id === change.id ? change : c);
			update(copy);
		};

		const deleteChange = (changeID: string) => {
			const copy = Utils.copy(extension);
			copy.changes = copy.changes.filter(c => c.id !== changeID);
			update(copy);
		};

		const getOption = (change: ExtensionChangeAddChoiceOption | ExtensionChangeAddSummonOption) => {
			switch (change.type) {
				case ExtensionChangeType.AddChoiceOption:
					return (
						<Expander
							key={change.id}
							title={change.data.option.feature.name || 'Unnamed Feature'}
							extra={[ <DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteChange(change.id); }} /> ]}
						>
							<Space orientation='vertical' style={{ width: '100%' }}>
								<FeatureEditPanel
									feature={change.data.option.feature}
									sourcebooks={props.sourcebooks}
									onChange={f => setChange({ ...change, data: { ...change.data, option: { ...change.data.option, feature: f } } })}
								/>
								<NumberSpin
									min={1}
									label='Cost'
									value={change.data.option.value}
									onChange={value => setChange({ ...change, data: { ...change.data, option: { ...change.data.option, value: value } } })}
								/>
							</Space>
						</Expander>
					);
				case ExtensionChangeType.AddSummonOption:
					return (
						<Expander
							key={change.id}
							title={change.data.summon.monster.name || 'Unnamed Monster'}
							extra={[ <DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteChange(change.id); }} /> ]}
						>
							<SummonEditPanel
								summon={change.data.summon}
								sourcebooks={props.sourcebooks}
								onChange={(summon: Summon) => setChange({ ...change, data: { ...change.data, summon: summon } })}
							/>
						</Expander>
					);
			}
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					canChange(ExtensionChangeType.AddChoiceOption) ?
						<Alert
							type='info'
							showIcon={true}
							title={
								<>
									<div>Options are added to choices that {targetName} already offers (such as purchasable ancestry traits, or a beastheart's companions), and heroes see them alongside the original options.</div>
									<div>An option's cost is how much of the choice it uses up; most options cost 1.</div>
								</>
							}
						/>
						:
						getMismatchWarning(`${targetName} has no choices to add options to`)
				}
				{
					featureIDs.map(featureID => (
						<div key={featureID}>
							<HeaderText
								extra={
									<Button type='text' icon={<PlusOutlined />} title='Add an option' disabled={!targetChoices.some(tf => tf.feature.id === featureID)} onClick={() => addOption(featureID)} />
								}
							>
								{getFeatureLabel(featureID)}
							</HeaderText>
							<Space orientation='vertical' style={{ width: '100%' }}>
								{changes.filter(c => c.data.featureID === featureID).map(getOption)}
							</Space>
						</div>
					))
				}
				{
					featureIDs.length === 0 ?
						<Empty text='This extension doesn’t add options to any of its choices.' />
						: null
				}
				<HeaderText>Add Options To</HeaderText>
				{
					targetChoices.length > 0 ?
						<Select
							style={{ width: '100%' }}
							placeholder='Choose a feature'
							options={targetChoices.map(tf => ({ value: tf.feature.id, label: getFeatureLabel(tf.feature.id) }))}
							optionRender={o => <div className='ds-text'>{o.data.label}</div>}
							showSearch={{ optionFilterProp: 'label' }}
							value={null}
							onChange={addOption}
						/>
						:
						<Empty text={`${target.element.name || 'This element'} has no choices to add options to.`} />
				}
			</Space>
		);
	};

	const getReplacementsSection = () => {
		if (!target) {
			return <Empty text='Choose what this extends first.' />;
		}

		const changes = extension.changes.filter(c => c.type === ExtensionChangeType.ReplaceFeature);
		const replaceable = targetFeatures.filter(tf => !changes.some(c => c.data.featureID === tf.feature.id));

		// Starts from a copy of the original, so it can be tweaked rather than rebuilt
		const addReplacement = (featureID: string) => {
			const original = targetFeatures.find(tf => tf.feature.id === featureID)?.feature;
			if (!original) {
				return;
			}

			const copy = Utils.copy(extension);
			copy.changes.push({
				id: Utils.guid(),
				type: ExtensionChangeType.ReplaceFeature,
				data: { featureID: featureID, feature: Utils.copy(original) }
			});
			update(copy);
		};

		const setFeature = (changeID: string, feature: Feature) => {
			const copy = Utils.copy(extension);
			copy.changes
				.filter(c => c.id === changeID)
				.forEach(c => {
					if (c.type === ExtensionChangeType.ReplaceFeature) {
						c.data.feature = feature;
					}
				});
			update(copy);
		};

		const deleteChange = (changeID: string) => {
			const copy = Utils.copy(extension);
			copy.changes = copy.changes.filter(c => c.id !== changeID);
			update(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					canChange(ExtensionChangeType.ReplaceFeature) ?
						<Alert
							type='info'
							showIcon={true}
							title={
								<>
									<div>A replacement takes the place of one of {targetName}'s features. It starts as a copy of the original, ready for you to change.</div>
									<div>Heroes who already have the original feature keep the choices they made for it, as long as the replacement still offers them.</div>
								</>
							}
						/>
						:
						getMismatchWarning(`${targetName} has no features to replace`)
				}
				{
					changes.map(c => (
						<Expander
							key={c.id}
							title={getFeatureLabel(c.data.featureID)}
							extra={[ <DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteChange(c.id); }} /> ]}
						>
							<FeatureEditPanel
								feature={c.data.feature}
								sourcebooks={props.sourcebooks}
								onChange={f => setFeature(c.id, f)}
							/>
						</Expander>
					))
				}
				{
					changes.length === 0 ?
						<Empty text='This extension doesn’t replace any features.' />
						: null
				}
				<HeaderText>Replace</HeaderText>
				<Select
					style={{ width: '100%' }}
					placeholder='Choose a feature'
					options={replaceable.map(tf => ({ value: tf.feature.id, label: getFeatureLabel(tf.feature.id) }))}
					optionRender={o => <div className='ds-text'>{o.data.label}</div>}
					showSearch={{ optionFilterProp: 'label' }}
					value={null}
					onChange={addReplacement}
				/>
			</Space>
		);
	};

	const getMaliceSection = () => {
		if (!target) {
			return <Empty text='Choose what this extends first.' />;
		}

		const changes = extension.changes.filter(c => c.type === ExtensionChangeType.AddMalice);

		const onChange = (features: Feature[]) => {
			setChanges(
				c => c.type === ExtensionChangeType.AddMalice,
				features.map(f => ({
					id: changes.find(c => c.data.malice.id === f.id)?.id || Utils.guid(),
					type: ExtensionChangeType.AddMalice,
					data: { malice: f }
				}))
			);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					canChange(ExtensionChangeType.AddMalice) ?
						<Alert
							type='info'
							showIcon={true}
							title={`This malice is added to ${targetName}'s own, so it can be used in any encounter that includes the group's monsters.`}
						/>
						:
						getMismatchWarning(`Malice can only be added to a monster group, not to ${targetName}`)
				}
				<FeatureListEditPanel
					title='Malice'
					features={changes.map(c => c.data.malice)}
					allowedTypes={[ FeatureType.Malice, FeatureType.MaliceAbility ]}
					sourcebooks={props.sourcebooks}
					onChange={onChange}
				/>
			</Space>
		);
	};

	const getMonstersSection = () => {
		if (!target) {
			return <Empty text='Choose what this extends first.' />;
		}

		const changes = extension.changes.filter(c => c.type === ExtensionChangeType.AddMonster);
		const monsterGroup = (target.kind === 'monster-group') ? target.element : undefined;

		const addMonster = (monster: Monster) => {
			const copy = Utils.copy(extension);
			copy.changes.push({
				id: Utils.guid(),
				type: ExtensionChangeType.AddMonster,
				data: { monster: monster }
			});
			update(copy);
		};

		// Starts with the same keywords as the group's own monsters
		const addNewMonster = () => {
			const template = (monsterGroup && (monsterGroup.monsters.length > 0)) ? monsterGroup.monsters[0] : null;
			addMonster(FactoryLogic.createMonster({
				id: Utils.guid(),
				name: '',
				level: 1,
				role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Ambusher),
				keywords: template ? [ ...template.keywords ] : [],
				encounterValue: 0,
				size: FactoryLogic.createSize(1, 'M'),
				speed: FactoryLogic.createSpeed(5),
				stamina: 5,
				stability: 0,
				freeStrikeDamage: 2,
				characteristics: FactoryLogic.createCharacteristics(0, 0, 0, 0, 0),
				features: []
			}));
		};

		// Starts from one of the group's own monsters, to make a variant of it
		const copyMonster = (monsterID: string) => {
			const original = monsterGroup?.monsters.find(m => m.id === monsterID);
			if (!original) {
				return;
			}

			const monster = Utils.copy(original);
			monster.id = Utils.guid();
			addMonster(monster);
		};

		const setMonster = (changeID: string, monster: Monster) => {
			const copy = Utils.copy(extension);
			copy.changes
				.filter(c => c.id === changeID)
				.forEach(c => {
					if (c.type === ExtensionChangeType.AddMonster) {
						c.data.monster = monster;
					}
				});
			update(copy);
		};

		const deleteChange = (changeID: string) => {
			const copy = Utils.copy(extension);
			copy.changes = copy.changes.filter(c => c.id !== changeID);
			update(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					canChange(ExtensionChangeType.AddMonster) ?
						<Alert
							type='info'
							showIcon={true}
							title={`These monsters join ${targetName}'s own, so they can be added to encounters and use the group's malice.`}
						/>
						:
						getMismatchWarning(`Monsters can only be added to a monster group, not to ${targetName}`)
				}
				{
					changes.map(c => (
						<Expander
							key={c.id}
							title={c.data.monster.name || 'Unnamed Monster'}
							extra={[ <DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteChange(c.id); }} /> ]}
						>
							<MonsterEditPanel
								monster={c.data.monster}
								monsterGroup={monsterGroup}
								sourcebooks={props.sourcebooks}
								onChange={m => setMonster(c.id, m)}
							/>
						</Expander>
					))
				}
				{
					changes.length === 0 ?
						<Empty text='This extension doesn’t add any monsters.' />
						: null
				}
				{
					monsterGroup ?
						<>
							<HeaderText>Add a Monster</HeaderText>
							<Button block={true} icon={<PlusOutlined />} onClick={addNewMonster}>New Monster</Button>
							{
								monsterGroup.monsters.length > 0 ?
									<Select
										style={{ width: '100%' }}
										placeholder={`Copy one of ${targetName}'s monsters`}
										options={monsterGroup.monsters.map(m => ({ value: m.id, label: m.name || 'Unnamed Monster' }))}
										optionRender={o => <div className='ds-text'>{o.data.label}</div>}
										showSearch={{ optionFilterProp: 'label' }}
										value={null}
										onChange={copyMonster}
									/>
									: null
							}
						</>
						: null
				}
			</Space>
		);
	};

	// Each tab is offered only for changes that suit what the extension targets - or if the extension already has
	// changes of that kind (from when it targeted something else), so that they can be removed
	const showTab = (...types: ExtensionChangeType[]) => types.some(canChange) || hasChanges(...types);

	const tabs = [
		{
			key: 'extension',
			label: 'Extension',
			children: getTargetSection()
		}
	];
	if (showTab(ExtensionChangeType.AddAbility)) {
		tabs.push({
			key: 'abilities',
			label: 'Abilities',
			children: getAbilitiesSection()
		});
	}
	if (showTab(ExtensionChangeType.AddFeature)) {
		tabs.push({
			key: 'features',
			label: 'Features',
			children: getFeaturesSection()
		});
	}
	// Until the target is chosen, there's no telling whether it has any choices
	if ((canChange(ExtensionChangeType.AddChoiceOption) && (!target || (targetChoices.length > 0))) || hasChanges(ExtensionChangeType.AddChoiceOption, ExtensionChangeType.AddSummonOption)) {
		tabs.push({
			key: 'options',
			label: 'Options',
			children: getOptionsSection()
		});
	}
	if (showTab(ExtensionChangeType.ReplaceFeature)) {
		tabs.push({
			key: 'replacements',
			label: 'Replacements',
			children: getReplacementsSection()
		});
	}
	if (showTab(ExtensionChangeType.AddMalice)) {
		tabs.push({
			key: 'malice',
			label: 'Malice',
			children: getMaliceSection()
		});
	}
	if (showTab(ExtensionChangeType.AddMonster)) {
		tabs.push({
			key: 'monsters',
			label: 'Monsters',
			children: getMonstersSection()
		});
	}

	return (
		<div className='extension-edit-panel'>
			<div className='extension-workspace-column'>
				<Tabs items={tabs} />
			</div>
			{
				props.mode === PanelMode.Full ?
					<div className='extension-preview-column'>
						<Tabs
							items={[
								{
									key: '1',
									label: 'Preview',
									children: (
										<SelectablePanel>
											<ExtensionPanel
												extension={extension}
												sourcebooks={props.sourcebooks}
												mode={PanelMode.Full}
											/>
										</SelectablePanel>
									)
								}
							]}
						/>
					</div>
					: null
			}
		</div>
	);
};
