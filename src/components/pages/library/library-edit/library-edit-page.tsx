import { Alert, Button, Drawer, Flex, Input, Popover, Segmented, Select, Space, Tabs, Upload } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, CloseOutlined, CopyOutlined, DownOutlined, DownloadOutlined, EditOutlined, LeftOutlined, PlusOutlined, SaveOutlined, SettingOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { EnvironmentData, OrganizationData, UpbringingData } from '../../../../data/culture-data';
import { Feature, FeatureAbility, FeatureAddOn, FeatureAddOnType, FeatureMalice, FeatureText } from '../../../../models/feature';
import { Monster, MonsterGroup } from '../../../../models/monster';
import { Sourcebook, SourcebookElementKind } from '../../../../models/sourcebook';
import { Ability } from '../../../../models/ability';
import { AbilityEditPanel } from '../../../panels/edit/ability-edit/ability-edit-panel';
import { AbilityKeyword } from '../../../../enums/ability-keyword';
import { AbilityLogic } from '../../../../logic/ability-logic';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryPanel } from '../../../panels/elements/ancestry-panel/ancestry-panel';
import { AppFooter } from '../../../panels/app-footer/app-footer';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Career } from '../../../../models/career';
import { CareerPanel } from '../../../panels/elements/career-panel/career-panel';
import { Characteristic } from '../../../../enums/characteristic';
import { ClassPanel } from '../../../panels/elements/class-panel/class-panel';
import { Collections } from '../../../../utils/collections';
import { Complication } from '../../../../models/complication';
import { ComplicationPanel } from '../../../panels/elements/complication-panel/complication-panel';
import { Culture } from '../../../../models/culture';
import { CulturePanel } from '../../../panels/elements/culture-panel/culture-panel';
import { DamageModifierType } from '../../../../enums/damage-modifier-type';
import { DamageType } from '../../../../enums/damage-type';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Domain } from '../../../../models/domain';
import { DomainPanel } from '../../../panels/elements/domain-panel/domain-panel';
import { Element } from '../../../../models/element';
import { ElementEditPanel } from '../../../panels/edit/element-edit/element-edit-panel';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { FeatureEditPanel } from '../../../panels/edit/feature-edit/feature-edit-panel';
import { FeatureLogic } from '../../../../logic/feature-logic';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { Format } from '../../../../utils/format';
import { FormatLogic } from '../../../../logic/format-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroClass } from '../../../../models/class';
import { Item } from '../../../../models/item';
import { ItemPanel } from '../../../panels/elements/item-panel/item-panel';
import { ItemType } from '../../../../enums/item-type';
import { Kit } from '../../../../models/kit';
import { KitArmor } from '../../../../enums/kit-armor';
import { KitPanel } from '../../../panels/elements/kit-panel/kit-panel';
import { KitWeapon } from '../../../../enums/kit-weapon';
import { MonsterEditPanel } from '../../../panels/edit/monster-edit/monster-edit-panel';
import { MonsterGroupPanel } from '../../../panels/elements/monster-group-panel/monster-group-panel';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterOrganizationType } from '../../../../enums/monster-organization-type';
import { MonsterPanel } from '../../../panels/elements/monster-panel/monster-panel';
import { MonsterRoleType } from '../../../../enums/monster-role-type';
import { MonsterSelectModal } from '../../../modals/select/monster-select/monster-select-modal';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NameGenerator } from '../../../../utils/name-generator';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Options } from '../../../../models/options';
import { OptionsPanel } from '../../../panels/options/options-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { Perk } from '../../../../models/perk';
import { PerkPanel } from '../../../panels/elements/perk-panel/perk-panel';
import { ProjectPanel } from '../../../panels/elements/project-panel/project-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { SubClass } from '../../../../models/subclass';
import { SubclassPanel } from '../../../panels/elements/subclass-panel/subclass-panel';
import { Terrain } from '../../../../models/terrain';
import { TerrainCategory } from '../../../../enums/terrain-category';
import { TerrainPanel } from '../../../panels/elements/terrain-panel/terrain-panel';
import { TerrainRoleType } from '../../../../enums/terrain-role-type';
import { Title } from '../../../../models/title';
import { TitlePanel } from '../../../panels/elements/title-panel/title-panel';
import { Toggle } from '../../../controls/toggle/toggle';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';
import { useState } from 'react';

import './library-edit-page.scss';

interface Props {
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showReference: () => void;
 	showMonster: (monster: Monster, monsterGroup: MonsterGroup) => void;
	saveChanges: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
	setOptions: (options: Options) => void;
}

export const LibraryEditPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind, sourcebookID, elementID, subElementID } = useParams<{ kind: SourcebookElementKind, sourcebookID: string, elementID: string, subElementID?: string }>();
	const [ element, setElement ] = useState<Element>(() => {
		const sourcebook = props.sourcebooks.find(s => s.id === sourcebookID)!;
		let original: Element;
		switch (kind!) {
			case 'ancestry':
				original = sourcebook.ancestries.find(e => e.id === elementID)!;
				break;
			case 'career':
				original = sourcebook.careers.find(e => e.id === elementID)!;
				break;
			case 'class':
				original = sourcebook.classes.find(e => e.id === elementID)!;
				break;
			case 'complication':
				original = sourcebook.complications.find(e => e.id === elementID)!;
				break;
			case 'culture':
				original = sourcebook.cultures.find(e => e.id === elementID)!;
				break;
			case 'domain':
				original = sourcebook.domains.find(e => e.id === elementID)!;
				break;
			case 'item':
				original = sourcebook.items.find(e => e.id === elementID)!;
				break;
			case 'kit':
				original = sourcebook.kits.find(e => e.id === elementID)!;
				break;
			case 'monster-group':
				original = sourcebook.monsterGroups.find(e => e.id === elementID)!;
				break;
			case 'perk':
				original = sourcebook.perks.find(e => e.id === elementID)!;
				break;
			case 'terrain':
				original = sourcebook.terrain.find(e => e.id === elementID)!;
				break;
			case 'title':
				original = sourcebook.titles.find(e => e.id === elementID)!;
				break;
		}
		return Utils.copy(original) as Element;
	});
	const [ dirty, setDirty ] = useState<boolean>(false);
	const [ scratchpadMonsters, setScratchpadMonsters ] = useState<Monster[]>([]);
	const [ hiddenMonsterIDs, setHiddenMonsterIDs ] = useState<string[]>([]);
	const [ drawerOpen, setDrawerOpen ] = useState<boolean>(false);

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const elementCopy = Utils.copy(element) as Element;
			elementCopy.name = value;
			if ((elementCopy as Item).crafting) {
				(elementCopy as Item).crafting!.name = `Craft ${value}`;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setDescription = (value: string) => {
			const elementCopy = Utils.copy(element) as Element;
			elementCopy.description = value;
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Input
					status={element.name === '' ? 'warning' : ''}
					placeholder='Name'
					allowClear={true}
					addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
					value={element.name}
					onChange={e => setName(e.target.value)}
				/>
				<HeaderText>Description</HeaderText>
				<MultiLine label='Description' value={element.description} onChange={setDescription} />
			</Space>
		);
	};

	const getFeaturesEditSection = () => {
		const el = element as Ancestry | Career | Complication | Kit;

		const addFeature = () => {
			const elementCopy = Utils.copy(element) as Ancestry | Career | Complication | Kit;
			elementCopy.features.push(FactoryLogic.feature.create({
				id: Utils.guid(),
				name: '',
				description: ''
			}));
			setElement(elementCopy);
			setDirty(true);
		};

		const changeFeature = (feature: Feature) => {
			const elementCopy = Utils.copy(element) as Ancestry | Career | Complication | Kit;
			const index = elementCopy.features.findIndex(f => f.id === feature.id);
			if (index !== -1) {
				elementCopy.features[index] = feature;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
			const elementCopy = Utils.copy(element) as Ancestry | Career | Complication | Kit;
			const index = elementCopy.features.findIndex(f => f.id === feature.id);
			elementCopy.features = Collections.move(elementCopy.features, index, direction);
			setElement(elementCopy);
			setDirty(true);
		};

		const deleteFeature = (feature: Feature) => {
			const elementCopy = Utils.copy(element) as Ancestry | Career | Complication | Kit;
			elementCopy.features = elementCopy.features.filter(f => f.id !== feature.id);
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					el.features.map(f => (
						<Expander
							key={f.id}
							title={f.name || 'Unnamed Feature'}
							tags={[ FeatureLogic.getFeatureTag(f) ]}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteFeature(f); }} />
							]}
						>
							<FeatureEditPanel
								feature={f}
								sourcebooks={props.sourcebooks}
								onChange={changeFeature}
							/>
						</Expander>
					))
				}
				{
					el.features.length === 0 ?
						<Empty />
						: null
				}
				<Button block={true} onClick={addFeature}>
					<PlusOutlined />
					Add a new feature
				</Button>
			</Space>
		);
	};

	const getIncitingIncidentsSection = () => {
		const career = element as Career;

		const addIncident = () => {
			const careerCopy = Utils.copy(element) as Career;
			careerCopy.incitingIncidents.options.push({
				id: Utils.guid(),
				name: '',
				description: ''
			});
			setElement(careerCopy);
			setDirty(true);
		};

		const changeIncident = (e: Element) => {
			const careerCopy = Utils.copy(element) as Career;
			const index = careerCopy.incitingIncidents.options.findIndex(o => o.id === e.id);
			if (index !== -1) {
				careerCopy.incitingIncidents.options[index] = e;
			}
			setElement(careerCopy);
			setDirty(true);
		};

		const moveIncident = (e: Element, direction: 'up' | 'down') => {
			const careerCopy = Utils.copy(element) as Career;
			const index = careerCopy.incitingIncidents.options.findIndex(o => o.id === e.id);
			careerCopy.incitingIncidents.options = Collections.move(careerCopy.incitingIncidents.options, index, direction);
			setElement(careerCopy);
			setDirty(true);
		};

		const deleteIncident = (e: Element) => {
			const careerCopy = Utils.copy(element) as Career;
			careerCopy.incitingIncidents.options = careerCopy.incitingIncidents.options.filter(o => o.id !== e.id);
			setElement(careerCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					career.incitingIncidents.options.map(o => (
						<Expander
							key={o.id}
							title={o.name || 'Unnamed Incident'}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveIncident(o, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveIncident(o, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteIncident(o); }} />
							]}
						>
							<ElementEditPanel
								element={o}
								onChange={changeIncident}
							/>
						</Expander>
					))
				}
				{
					career.incitingIncidents.options.length === 0 ?
						<Empty />
						: null
				}
				<Button block={true} onClick={addIncident}>
					<PlusOutlined />
					Add a new inciting incident
				</Button>
			</Space>
		);
	};

	const getCultureEditSection = () => {
		const culture = element as Culture;

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					status={culture.languages.length === 0 ? 'warning' : ''}
					allowClear={true}
					placeholder='Select language'
					options={SourcebookLogic.getLanguages(props.sourcebooks).map(l => ({ label: l.name, value: l.name, desc: l.description }))}
					optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
					showSearch={true}
					filterOption={(input, option) => {
						const strings = option ?
							[
								option.label,
								option.desc
							]
							: [];
						return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
					}}
					value={culture.languages.length > 0 ? culture.languages[0] : null}
					onChange={value => {
						const copy = Utils.copy(element) as Culture;
						copy.languages = value ? [ value ] : [];
						setElement(copy);
						setDirty(true);
					}}
				/>
				<Select
					style={{ width: '100%' }}
					status={culture.environment === null ? 'warning' : ''}
					allowClear={true}
					placeholder='Select environment'
					options={EnvironmentData.getEnvironments().map(s => ({ value: s.id, label: s.name }))}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
					showSearch={true}
					filterOption={(input, option) => {
						const strings = option ?
							[
								option.label
							]
							: [];
						return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
					}}
					value={culture.environment ? culture.environment.id : null}
					onChange={value => {
						const copy = Utils.copy(element) as Culture;
						const env = EnvironmentData.getEnvironments().find(e => e.id === value);
						if (env) {
							const envCopy = Utils.copy(env) as Feature;
							copy.environment = envCopy;
						}
						setElement(copy);
						setDirty(true);
					}}
				/>
				<Select
					style={{ width: '100%' }}
					status={culture.organization === null ? 'warning' : ''}
					allowClear={true}
					placeholder='Select organization'
					options={OrganizationData.getOrganizations().map(s => ({ value: s.id, label: s.name }))}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
					showSearch={true}
					filterOption={(input, option) => {
						const strings = option ?
							[
								option.label
							]
							: [];
						return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
					}}
					value={culture.organization ? culture.organization.id : null}
					onChange={value => {
						const copy = Utils.copy(element) as Culture;
						const org = OrganizationData.getOrganizations().find(o => o.id === value);
						if (org) {
							const orgCopy = Utils.copy(org) as Feature;
							copy.organization = orgCopy;
						}
						setElement(copy);
						setDirty(true);
					}}
				/>
				<Select
					style={{ width: '100%' }}
					status={culture.upbringing === null ? 'warning' : ''}
					allowClear={true}
					placeholder='Select upbringing'
					options={UpbringingData.getUpbringings().map(s => ({ value: s.id, label: s.name }))}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
					showSearch={true}
					filterOption={(input, option) => {
						const strings = option ?
							[
								option.label
							]
							: [];
						return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
					}}
					value={culture.upbringing ? culture.upbringing.id : null}
					onChange={value => {
						const copy = Utils.copy(element) as Culture;
						const ub = UpbringingData.getUpbringings().find(u => u.id === value);
						if (ub) {
							const ubCopy = Utils.copy(ub) as Feature;
							copy.upbringing = ubCopy;
						}
						setElement(copy);
						setDirty(true);
					}}
				/>
			</Space>
		);
	};

	const getClassEditSection = () => {
		const heroClass = element as HeroClass;

		const setHeroicResource = (value: string) => {
			const elementCopy = Utils.copy(element) as HeroClass;
			elementCopy.heroicResource = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setSubclassName = (value: string) => {
			const elementCopy = Utils.copy(element) as HeroClass;
			elementCopy.subclassName = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setSubclassCount = (value: number) => {
			const elementCopy = Utils.copy(element) as HeroClass;
			elementCopy.subclassCount = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const addCharacteristicSet = () => {
			const classCopy = Utils.copy(element) as HeroClass;
			classCopy.primaryCharacteristicsOptions.push([]);
			setElement(classCopy);
			setDirty(true);
		};

		const toggleCharacteristic = (index: number, characteristic: Characteristic) => {
			const classCopy = Utils.copy(element) as HeroClass;
			if (classCopy.primaryCharacteristicsOptions[index].includes(characteristic)) {
				classCopy.primaryCharacteristicsOptions[index] = classCopy.primaryCharacteristicsOptions[index].filter(ch => ch !== characteristic);
			} else {
				classCopy.primaryCharacteristicsOptions[index].push(characteristic);
			}
			setElement(classCopy);
			setDirty(true);
		};

		const moveCharacteristicSet = (index: number, direction: 'up' | 'down') => {
			const classCopy = Utils.copy(element) as HeroClass;
			classCopy.primaryCharacteristicsOptions = Collections.move(classCopy.primaryCharacteristicsOptions, index, direction);
			setElement(classCopy);
			setDirty(true);
		};

		const deleteCharacteristicSet = (index: number) => {
			const classCopy = Utils.copy(element) as HeroClass;
			classCopy.primaryCharacteristicsOptions.splice(index, 1);
			setElement(classCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Heroic Resource</HeaderText>
				<Input
					status={heroClass.heroicResource === '' ? 'warning' : ''}
					placeholder='Heroic resource'
					allowClear={true}
					value={heroClass.heroicResource}
					onChange={e => setHeroicResource(e.target.value)}
				/>
				<HeaderText>Subclass Name</HeaderText>
				<Input
					status={heroClass.subclassName === '' ? 'warning' : ''}
					placeholder='Subclass name'
					allowClear={true}
					value={heroClass.subclassName}
					onChange={e => setSubclassName(e.target.value)}
				/>
				<HeaderText>Subclass Count</HeaderText>
				<NumberSpin
					min={1}
					value={heroClass.subclassCount}
					onChange={setSubclassCount}
				/>
				<HeaderText>Primary Characteristics</HeaderText>
				{
					heroClass.primaryCharacteristicsOptions.map((o, n) => (
						<Expander
							key={n}
							title={o.join(', ') || 'No Characteristics'}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveCharacteristicSet(n, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveCharacteristicSet(n, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteCharacteristicSet(n); }} />
							]}
						>
							<Space direction='vertical' style={{ width: '100%' }}>
								<Toggle label={Characteristic.Might} value={o.includes(Characteristic.Might)} onChange={() => toggleCharacteristic(n, Characteristic.Might)} />
								<Toggle label={Characteristic.Agility} value={o.includes(Characteristic.Agility)} onChange={() => toggleCharacteristic(n, Characteristic.Agility)} />
								<Toggle label={Characteristic.Reason} value={o.includes(Characteristic.Reason)} onChange={() => toggleCharacteristic(n, Characteristic.Reason)} />
								<Toggle label={Characteristic.Intuition} value={o.includes(Characteristic.Intuition)} onChange={() => toggleCharacteristic(n, Characteristic.Intuition)} />
								<Toggle label={Characteristic.Presence} value={o.includes(Characteristic.Presence)} onChange={() => toggleCharacteristic(n, Characteristic.Presence)} />
								{
									(o.length === 0) || (o.length >= 3) ?
										<Alert
											type='warning'
											showIcon={true}
											message='One or two characteristics must be selected.'
										/>
										: null
								}
							</Space>
						</Expander>
					))
				}
				{
					heroClass.primaryCharacteristicsOptions.length === 0 ?
						<Alert
							type='warning'
							showIcon={true}
							message='A class must have one or two primary characteristics.'
						/>
						: null
				}
				<Button block={true} onClick={addCharacteristicSet}>
					<PlusOutlined />
					Add a new primary characteristic option
				</Button>
			</Space>
		);
	};

	const getFeaturesByLevelEditSection = () => {
		const heroClass = element as HeroClass | Domain | Item;

		const addFeature = (level: number) => {
			const elementCopy = Utils.copy(element) as HeroClass | Domain | Item;
			elementCopy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					lvl.features.push(FactoryLogic.feature.create({
						id: Utils.guid(),
						name: '',
						description: ''
					}));
				});
			setElement(elementCopy);
			setDirty(true);
		};

		const changeFeature = (level: number, feature: Feature) => {
			const elementCopy = Utils.copy(element) as HeroClass | Domain | Item;
			elementCopy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					const index = lvl.features.findIndex(f => f.id === feature.id);
					if (index !== -1) {
						lvl.features[index] = feature;
					}
				});
			setElement(elementCopy);
			setDirty(true);
		};

		const moveFeature = (level: number, feature: Feature, direction: 'up' | 'down') => {
			const elementCopy = Utils.copy(element) as HeroClass | Domain | Item;
			elementCopy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					const index = lvl.features.findIndex(f => f.id === feature.id);
					lvl.features = Collections.move(lvl.features, index, direction);
				});
			setElement(elementCopy);
			setDirty(true);
		};

		const deleteFeature = (level: number, feature: Feature) => {
			const elementCopy = Utils.copy(element) as HeroClass | Domain | Item;
			elementCopy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					lvl.features = lvl.features.filter(f => f.id !== feature.id);
				});
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					heroClass.featuresByLevel.map(lvl => (
						<div key={lvl.level}>
							<HeaderText>Level {lvl.level.toString()}</HeaderText>
							<Space direction='vertical' style={{ width: '100%' }}>
								{
									lvl.features.map(f => (
										<Expander
											key={f.id}
											title={f.name || 'Unnamed Feature'}
											tags={[ FeatureLogic.getFeatureTag(f) ]}
											extra={[
												<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(lvl.level, f, 'up'); }} />,
												<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(lvl.level, f, 'down'); }} />,
												<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteFeature(lvl.level, f); }} />
											]}
										>
											<FeatureEditPanel
												feature={f}
												sourcebooks={props.sourcebooks}
												onChange={feature => changeFeature(lvl.level, feature)}
											/>
										</Expander>
									))
								}
								{
									lvl.features.length === 0 ?
										<Empty />
										: null
								}
								<Button block={true} onClick={() => addFeature(lvl.level)}>
									<PlusOutlined />
									Add a new level {lvl.level} feature
								</Button>
							</Space>
						</div>
					))
				}
			</Space>
		);
	};

	const getClassAbilitiesEditSection = () => {
		const heroClass = element as HeroClass;

		const addAbility = () => {
			const elementCopy = Utils.copy(element) as HeroClass;
			elementCopy.abilities.push(FactoryLogic.createAbility({
				id: Utils.guid(),
				name: '',
				description: '',
				type: FactoryLogic.type.createAction(),
				keywords: [],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: ''
			}));
			setElement(elementCopy);
			setDirty(true);
		};

		const changeAbility = (ability: Ability) => {
			const elementCopy = Utils.copy(element) as HeroClass;
			const index = elementCopy.abilities.findIndex(a => a.id === ability.id);
			if (index !== -1) {
				elementCopy.abilities[index] = ability;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const moveAbility = (ability: Ability, direction: 'up' | 'down') => {
			const elementCopy = Utils.copy(element) as HeroClass;
			const index = elementCopy.abilities.findIndex(a => a.id === ability.id);
			elementCopy.abilities = Collections.move(elementCopy.abilities, index, direction);
			setElement(elementCopy);
			setDirty(true);
		};

		const deleteAbility = (ability: Ability) => {
			const elementCopy = Utils.copy(element) as HeroClass;
			elementCopy.abilities = elementCopy.abilities.filter(a => a.id !== ability.id);
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					heroClass.abilities.map(a => (
						<Expander
							key={a.id}
							title={a.name || 'Unnamed Ability'}
							tags={[ a.type.usage ]}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveAbility(a, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveAbility(a, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteAbility(a); }} />
							]}
						>
							<AbilityEditPanel
								ability={a}
								onChange={changeAbility}
							/>
						</Expander>
					))
				}
				{
					heroClass.abilities.length === 0 ?
						<Empty />
						: null
				}
				<Button block={true} onClick={addAbility}>
					<PlusOutlined />
					Add a new ability
				</Button>
			</Space>
		);
	};

	const getClassSubclassesEditSection = () => {
		const heroClass = element as HeroClass;

		const addSubclass = () => {
			const classCopy = Utils.copy(element) as HeroClass;
			classCopy.subclasses.push(FactoryLogic.createSubclass());
			setElement(classCopy);
			setDirty(true);
		};

		const moveSubclass = (subclass: SubClass, direction: 'up' | 'down') => {
			const classCopy = Utils.copy(element) as HeroClass;
			const index = classCopy.subclasses.findIndex(sc => sc.id === subclass.id);
			classCopy.subclasses = Collections.move(classCopy.subclasses, index, direction);
			setElement(classCopy);
			setDirty(true);
		};

		const deleteSubclass = (subclass: SubClass) => {
			const classCopy = Utils.copy(element) as HeroClass;
			classCopy.subclasses = classCopy.subclasses.filter(o => o.id !== subclass.id);
			setElement(classCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					heroClass.subclasses.map(sc => (
						<Expander
							key={sc.id}
							title={sc.name || 'Unnamed Subclass'}
							extra={[
								<Button key='edit' type='text' title='Edit' icon={<EditOutlined />} onClick={e => { e.stopPropagation(); navigation.goToLibraryEdit(kind!, sourcebookID!, elementID!, sc.id); }} />,
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSubclass(sc, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSubclass(sc, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteSubclass(sc); }} />
							]}
						>
							<SubclassPanel subclass={sc} options={props.options} />
						</Expander>
					))
				}
				{
					heroClass.subclasses.length === 0 ?
						<Empty />
						: null
				}
				<Button block={true} onClick={addSubclass}>
					<PlusOutlined />
					Add a new subclass
				</Button>
			</Space>
		);
	};

	const getSubclassEditSection = () => {
		const heroClass = element as HeroClass;
		const subclass = heroClass.subclasses.find(sc => sc.id === subElementID) as SubClass;

		const setName = (subclass: SubClass, value: string) => {
			const elementCopy = Utils.copy(element) as HeroClass;
			const index = elementCopy.subclasses.findIndex(sc => sc.id === subclass.id);
			if (index !== -1) {
				const sc = elementCopy.subclasses[index];
				sc.name = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setDescription = (subclass: SubClass, value: string) => {
			const elementCopy = Utils.copy(element) as HeroClass;
			const index = elementCopy.subclasses.findIndex(sc => sc.id === subclass.id);
			if (index !== -1) {
				const sc = elementCopy.subclasses[index];
				sc.description = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const addFeature = (subclass: SubClass, level: number) => {
			const elementCopy = Utils.copy(element) as HeroClass;
			const index = elementCopy.subclasses.findIndex(sc => sc.id === subclass.id);
			if (index !== -1) {
				const sc = elementCopy.subclasses[index];
				sc.featuresByLevel
					.filter(lvl => lvl.level === level)
					.forEach(lvl => {
						lvl.features.push(FactoryLogic.feature.create({
							id: Utils.guid(),
							name: '',
							description: ''
						}));
					});
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const changeFeature = (subclass: SubClass, level: number, feature: Feature) => {
			const elementCopy = Utils.copy(element) as HeroClass;
			const index = elementCopy.subclasses.findIndex(sc => sc.id === subclass.id);
			if (index !== -1) {
				const sc = elementCopy.subclasses[index];
				sc.featuresByLevel
					.filter(lvl => lvl.level === level)
					.forEach(lvl => {
						const index = lvl.features.findIndex(f => f.id === feature.id);
						if (index !== -1) {
							lvl.features[index] = feature;
						}
					});
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const moveFeature = (subclass: SubClass, level: number, feature: Feature, direction: 'up' | 'down') => {
			const elementCopy = Utils.copy(element) as HeroClass;
			const index = elementCopy.subclasses.findIndex(sc => sc.id === subclass.id);
			if (index !== -1) {
				const sc = elementCopy.subclasses[index];
				sc.featuresByLevel
					.filter(lvl => lvl.level === level)
					.forEach(lvl => {
						const index = lvl.features.findIndex(f => f.id === feature.id);
						lvl.features = Collections.move(lvl.features, index, direction);
					});
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const deleteFeature = (subclass: SubClass, level: number, feature: Feature) => {
			const elementCopy = Utils.copy(element) as HeroClass;
			const index = elementCopy.subclasses.findIndex(sc => sc.id === subclass.id);
			if (index !== -1) {
				const sc = elementCopy.subclasses[index];
				sc.featuresByLevel
					.filter(lvl => lvl.level === level)
					.forEach(lvl => {
						lvl.features = lvl.features.filter(f => f.id !== feature.id);
					});
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const getSubclassLevels = (subclass: SubClass) => {
			return subclass.featuresByLevel.map(lvl => (
				<Space key={lvl.level} direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Level {lvl.level.toString()}</HeaderText>
					{
						lvl.features.map(f => (
							<Expander
								key={f.id}
								title={f.name || 'Unnamed Feature'}
								tags={[ FeatureLogic.getFeatureTag(f) ]}
								extra={[
									<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(subclass, lvl.level, f, 'up'); }} />,
									<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(subclass, lvl.level, f, 'down'); }} />,
									<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteFeature(subclass, lvl.level, f); }} />
								]}
							>
								<FeatureEditPanel
									feature={f}
									sourcebooks={props.sourcebooks}
									onChange={feature => changeFeature(subclass, lvl.level, feature)}
								/>
							</Expander>
						))
					}
					{
						lvl.features.length === 0 ?
							<Empty />
							: null
					}
					<Button block={true} onClick={() => addFeature(subclass, lvl.level)}>
						<PlusOutlined />
						Add a new level {lvl.level} feature
					</Button>
				</Space>
			));
		};

		return (
			<Tabs
				items={[
					{
						key: '1',
						label: 'Subclass',
						children: (
							<div>
								<HeaderText>Name</HeaderText>
								<Input
									status={subclass.name === '' ? 'warning' : ''}
									placeholder='Name'
									allowClear={true}
									value={subclass.name}
									onChange={e => setName(subclass, e.target.value)}
								/>
								<HeaderText>Description</HeaderText>
								<MultiLine label='Description' value={subclass.description} onChange={value => setDescription(subclass, value)} />
							</div>
						)
					},
					{
						key: '2',
						label: 'Levels',
						children: getSubclassLevels(subclass)
					}
				]}
			/>
		);
	};

	const getPietyEditSection = () => {
		const domain = element as Domain;

		const setPiety = (value: string) => {
			const copy = Utils.copy(element) as Domain;
			copy.piety = value;
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Piety</HeaderText>
				<MultiLine label='Piety' value={domain.piety} onChange={setPiety} />
			</Space>
		);
	};

	const getKitDetailsSection = () => {
		const kit = element as Kit;

		const setType = (value: string) => {
			const elementCopy = Utils.copy(element) as Kit;
			elementCopy.type = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setArmor = (value: KitArmor[]) => {
			const elementCopy = Utils.copy(element) as Kit;
			elementCopy.armor = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setWeapon = (value: KitWeapon[]) => {
			const elementCopy = Utils.copy(element) as Kit;
			elementCopy.weapon = value;
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Type</HeaderText>
				<Input
					placeholder='Type'
					allowClear={true}
					value={kit.type}
					onChange={e => setType(e.target.value)}
				/>
				<HeaderText>Armor</HeaderText>
				<Select
					style={{ width: '100%' }}
					status={kit.armor.length === 0 ? 'warning' : ''}
					mode='multiple'
					allowClear={true}
					placeholder='Select armor'
					options={[ KitArmor.Light, KitArmor.Medium, KitArmor.Heavy, KitArmor.Shield ].map(option => ({ value: option }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					showSearch={true}
					filterOption={(input, option) => {
						const strings = option ?
							[
								option.value
							]
							: [];
						return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
					}}
					value={kit.armor}
					onChange={setArmor}
				/>
				<HeaderText>Weapons</HeaderText>
				<Select
					style={{ width: '100%' }}
					status={kit.weapon.length === 0 ? 'warning' : ''}
					mode='multiple'
					allowClear={true}
					placeholder='Select weapon'
					options={[ KitWeapon.Bow, KitWeapon.Ensnaring, KitWeapon.Heavy, KitWeapon.Light, KitWeapon.Medium, KitWeapon.Polearm, KitWeapon.Unarmed, KitWeapon.Whip ].map(option => ({ value: option }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					showSearch={true}
					filterOption={(input, option) => {
						const strings = option ?
							[
								option.value
							]
							: [];
						return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
					}}
					value={kit.weapon}
					onChange={setWeapon}
				/>
			</Space>
		);
	};

	const getKitStatsEditSection = () => {
		const kit = element as Kit;

		const setStamina = (value: number) => {
			const elementCopy = Utils.copy(element) as Kit;
			elementCopy.stamina = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setSpeed = (value: number) => {
			const elementCopy = Utils.copy(element) as Kit;
			elementCopy.speed = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setStability = (value: number) => {
			const elementCopy = Utils.copy(element) as Kit;
			elementCopy.stability = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setMeleeDistance = (value: number) => {
			const elementCopy = Utils.copy(element) as Kit;
			elementCopy.meleeDistance = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setRangedDistance = (value: number) => {
			const elementCopy = Utils.copy(element) as Kit;
			elementCopy.rangedDistance = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setDisengage = (value: number) => {
			const elementCopy = Utils.copy(element) as Kit;
			elementCopy.disengage = value;
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Stamina</HeaderText>
				<NumberSpin
					min={0}
					value={kit.stamina}
					onChange={setStamina}
				/>
				<HeaderText>Speed</HeaderText>
				<NumberSpin
					min={0}
					value={kit.speed}
					onChange={setSpeed}
				/>
				<HeaderText>Stability</HeaderText>
				<NumberSpin
					min={0}
					value={kit.stability}
					onChange={setStability}
				/>
				<HeaderText>Distance</HeaderText>
				<NumberSpin
					label='Melee'
					min={0}
					value={kit.meleeDistance}
					onChange={setMeleeDistance}
				/>
				<NumberSpin
					label='Ranged'
					min={0}
					value={kit.rangedDistance}
					onChange={setRangedDistance}
				/>
				<HeaderText>Disengage</HeaderText>
				<NumberSpin
					min={0}
					value={kit.disengage}
					onChange={setDisengage}
				/>
			</Space>
		);
	};

	const getKitDamageEditSection = () => {
		const kit = element as Kit;

		const setMeleeDamage = (value: boolean) => {
			const elementCopy = Utils.copy(element) as Kit;
			elementCopy.meleeDamage = value ? { tier1: 0, tier2: 0, tier3: 0 } : null;
			setElement(elementCopy);
			setDirty(true);
		};

		const setMeleeDamage1 = (value: number) => {
			const elementCopy = Utils.copy(element) as Kit;
			if (elementCopy.meleeDamage) {
				elementCopy.meleeDamage.tier1 = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setMeleeDamage2 = (value: number) => {
			const elementCopy = Utils.copy(element) as Kit;
			if (elementCopy.meleeDamage) {
				elementCopy.meleeDamage.tier2 = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setMeleeDamage3 = (value: number) => {
			const elementCopy = Utils.copy(element) as Kit;
			if (elementCopy.meleeDamage) {
				elementCopy.meleeDamage.tier3 = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setRangedDamage = (value: boolean) => {
			const elementCopy = Utils.copy(element) as Kit;
			elementCopy.rangedDamage = value ? { tier1: 0, tier2: 0, tier3: 0 } : null;
			setElement(elementCopy);
			setDirty(true);
		};

		const setRangedDamage1 = (value: number) => {
			const elementCopy = Utils.copy(element) as Kit;
			if (elementCopy.rangedDamage) {
				elementCopy.rangedDamage.tier1 = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setRangedDamage2 = (value: number) => {
			const elementCopy = Utils.copy(element) as Kit;
			if (elementCopy.rangedDamage) {
				elementCopy.rangedDamage.tier2 = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setRangedDamage3 = (value: number) => {
			const elementCopy = Utils.copy(element) as Kit;
			if (elementCopy.rangedDamage) {
				elementCopy.rangedDamage.tier3 = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Melee Damage</HeaderText>
				<Toggle label='Melee damage' value={!!kit.meleeDamage} onChange={setMeleeDamage} />
				{kit.meleeDamage ? <NumberSpin label='Tier 1' min={0} value={kit.meleeDamage.tier1} onChange={setMeleeDamage1} /> : null}
				{kit.meleeDamage ? <NumberSpin label='Tier 2' min={0} value={kit.meleeDamage.tier2} onChange={setMeleeDamage2} /> : null}
				{kit.meleeDamage ? <NumberSpin label='Tier 3' min={0} value={kit.meleeDamage.tier3} onChange={setMeleeDamage3} /> : null}
				<HeaderText>Ranged Damage</HeaderText>
				<Toggle label='Ranged damage' value={!!kit.rangedDamage} onChange={setRangedDamage} />
				{kit.rangedDamage ? <NumberSpin label='Tier 1' min={0} value={kit.rangedDamage.tier1} onChange={setRangedDamage1} /> : null}
				{kit.rangedDamage ? <NumberSpin label='Tier 2' min={0} value={kit.rangedDamage.tier2} onChange={setRangedDamage2} /> : null}
				{kit.rangedDamage ? <NumberSpin label='Tier 3' min={0} value={kit.rangedDamage.tier3} onChange={setRangedDamage3} /> : null}
			</Space>
		);
	};

	const getTitleEditSection = () => {
		const title = element as Title;

		const setEchelon = (value: number) => {
			const elementCopy = Utils.copy(element) as Title;
			elementCopy.echelon = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setPrerequisites = (value: string) => {
			const elementCopy = Utils.copy(element) as Title;
			elementCopy.prerequisites = value;
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Echelon</HeaderText>
				<NumberSpin min={1} max={4} value={title.echelon} onChange={setEchelon} />
				<HeaderText>Prerequisites</HeaderText>
				<Input
					placeholder='Prerequisites'
					allowClear={true}
					value={title.prerequisites}
					onChange={e => setPrerequisites(e.target.value)}
				/>
			</Space>
		);
	};

	const getItemDetailsEditSection = () => {
		const item = element as Item;

		const setType = (value: ItemType) => {
			const elementCopy = Utils.copy(element) as Item;
			elementCopy.type = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setKeywords = (value: (AbilityKeyword | KitArmor | KitWeapon)[]) => {
			const elementCopy = Utils.copy(element) as Item;
			elementCopy.keywords = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setEffect = (value: string) => {
			const elementCopy = Utils.copy(element) as Item;
			elementCopy.effect = value;
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Item Type</HeaderText>
				<Segmented
					name='itemtypes'
					block={true}
					options={[ ItemType.Consumable, ItemType.Trinket, ItemType.Leveled, ItemType.Artifact ]}
					value={item.type}
					onChange={setType}
				/>
				<HeaderText>Keywords</HeaderText>
				<Select
					style={{ width: '100%' }}
					placeholder='Keywords'
					mode='multiple'
					allowClear={true}
					options={AbilityLogic.getKeywords().map(option => ({ value: option }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					showSearch={true}
					filterOption={(input, option) => {
						const strings = option ?
							[
								option.value
							]
							: [];
						return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
					}}
					value={item.keywords}
					onChange={setKeywords}
				/>
				<HeaderText>Effect</HeaderText>
				<MultiLine label='Effect' value={item.effect} onChange={setEffect} />
			</Space>
		);
	};

	const getItemCustomizationEditSection = () => {
		const item = element as Item;

		const addFeature = (level: number) => {
			const elementCopy = Utils.copy(element) as Item;
			elementCopy.customizationsByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					lvl.features.push({
						feature: FactoryLogic.feature.create({
							id: Utils.guid(),
							name: '',
							description: ''
						}),
						selected: false
					});
				});
			setElement(elementCopy);
			setDirty(true);
		};

		const changeFeature = (level: number, feature: Feature) => {
			const elementCopy = Utils.copy(element) as Item;
			elementCopy.customizationsByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					const index = lvl.features.findIndex(f => f.feature.id === feature.id);
					if (index !== -1) {
						lvl.features[index].feature = feature;
					}
				});
			setElement(elementCopy);
			setDirty(true);
		};

		const moveFeature = (level: number, feature: Feature, direction: 'up' | 'down') => {
			const elementCopy = Utils.copy(element) as Item;
			elementCopy.customizationsByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					const index = lvl.features.findIndex(f => f.feature.id === feature.id);
					lvl.features = Collections.move(lvl.features, index, direction);
				});
			setElement(elementCopy);
			setDirty(true);
		};

		const deleteFeature = (level: number, feature: Feature) => {
			const elementCopy = Utils.copy(element) as Item;
			elementCopy.customizationsByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					lvl.features = lvl.features.filter(f => f.feature.id !== feature.id);
				});
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					item.customizationsByLevel.map(lvl => (
						<div key={lvl.level}>
							<HeaderText>Level {lvl.level.toString()}</HeaderText>
							<Space direction='vertical' style={{ width: '100%' }}>
								{
									lvl.features.map(f => (
										<Expander
											key={f.feature.id}
											title={f.feature.name || 'Unnamed Feature'}
											tags={[ FeatureLogic.getFeatureTag(f.feature) ]}
											extra={[
												<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(lvl.level, f.feature, 'up'); }} />,
												<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(lvl.level, f.feature, 'down'); }} />,
												<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteFeature(lvl.level, f.feature); }} />
											]}
										>
											<FeatureEditPanel
												feature={f.feature}
												sourcebooks={props.sourcebooks}
												onChange={feature => changeFeature(lvl.level, feature)}
											/>
										</Expander>
									))
								}
								{
									lvl.features.length === 0 ?
										<Empty />
										: null
								}
								<Button block={true} onClick={() => addFeature(lvl.level)}>
									<PlusOutlined />
									Add a new level {lvl.level} feature
								</Button>
							</Space>
						</div>
					))
				}
			</Space>
		);
	};

	const getCraftingEditSection = () => {
		const item = element as Item;

		const setCraftable = (value: boolean) => {
			const elementCopy = Utils.copy(element) as Item;
			elementCopy.crafting = value ? FactoryLogic.createProject({ id: `${item.id}-crafting`, name: `Craft ${item.name}`, description: item.name }) : null;
			setElement(elementCopy);
			setDirty(true);
		};

		const setPrerequisites = (value: string) => {
			const elementCopy = Utils.copy(element) as Item;
			if (elementCopy.crafting) {
				elementCopy.crafting.itemPrerequisites = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setSource = (value: string) => {
			const elementCopy = Utils.copy(element) as Item;
			if (elementCopy.crafting) {
				elementCopy.crafting.source = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setCharacteristic = (value: Characteristic[]) => {
			const elementCopy = Utils.copy(element) as Item;
			if (elementCopy.crafting) {
				elementCopy.crafting.characteristic = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setGoal = (value: number) => {
			const elementCopy = Utils.copy(element) as Item;
			if (elementCopy.crafting) {
				elementCopy.crafting.goal = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setEffect = (value: string) => {
			const elementCopy = Utils.copy(element) as Item;
			if (elementCopy.crafting) {
				elementCopy.crafting.effect = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Toggle label='Can be crafted' value={!!item.crafting} onChange={setCraftable} />
				{
					item.crafting ?
						<>
							<HeaderText>Item Prerequisites</HeaderText>
							<Input
								placeholder='Prerequisites'
								allowClear={true}
								value={item.crafting.itemPrerequisites}
								onChange={e => setPrerequisites(e.target.value)}
							/>
							<HeaderText>Source</HeaderText>
							<Input
								placeholder='Source'
								allowClear={true}
								value={item.crafting.source}
								onChange={e => setSource(e.target.value)}
							/>
							<HeaderText>Characteristic</HeaderText>
							<Select
								style={{ width: '100%' }}
								placeholder='Characteristic'
								mode='multiple'
								options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(option => ({ value: option }))}
								optionRender={option => <div className='ds-text'>{option.data.value}</div>}
								showSearch={true}
								filterOption={(input, option) => {
									const strings = option ?
										[
											option.value
										]
										: [];
									return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
								}}
								value={item.crafting.characteristic}
								onChange={setCharacteristic}
							/>
							<HeaderText>Goal</HeaderText>
							<NumberSpin min={0} max={500} steps={[ 5 ]} value={item.crafting.goal} onChange={setGoal} />
							<HeaderText>Effect</HeaderText>
							<MultiLine label='Effect' value={item.crafting.effect} onChange={setEffect} />
						</>
						: null
				}
			</Space>
		);
	};

	const getTerrainStatsSection = () => {
		const terrain = element as Terrain;

		const setCategory = (value: TerrainCategory) => {
			const copy = Utils.copy(element) as Terrain;
			copy.category = value;
			setElement(copy);
			setDirty(true);
		};

		const setLevel = (value: number) => {
			const copy = Utils.copy(element) as Terrain;
			copy.level = value;
			setElement(copy);
			setDirty(true);
		};

		const setRoleType = (value: MonsterRoleType) => {
			const copy = Utils.copy(element) as Terrain;
			copy.role.type = value;
			setElement(copy);
			setDirty(true);
		};

		const setTerrainRoleType = (value: TerrainRoleType) => {
			const copy = Utils.copy(element) as Terrain;
			copy.role.terrainType = value;
			setElement(copy);
			setDirty(true);
		};

		const setEncounterValue = (value: number) => {
			const copy = Utils.copy(element) as Terrain;
			copy.encounterValue = value;
			setElement(copy);
			setDirty(true);
		};

		const setArea = (value: string) => {
			const copy = Utils.copy(element) as Terrain;
			copy.area = value;
			setElement(copy);
			setDirty(true);
		};

		const setStaminaBase = (value: number) => {
			const copy = Utils.copy(element) as Terrain;
			copy.stamina.base = value;
			setElement(copy);
			setDirty(true);
		};

		const setStaminaPerSquare = (value: number) => {
			const copy = Utils.copy(element) as Terrain;
			copy.stamina.perSquare = value;
			setElement(copy);
			setDirty(true);
		};

		const setSize = (value: string) => {
			const copy = Utils.copy(element) as Terrain;
			copy.size = value;
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Category</HeaderText>
				<Select
					style={{ width: '100%' }}
					options={[ TerrainCategory.ArcaneObject, TerrainCategory.Environmental, TerrainCategory.Fieldwork, TerrainCategory.Mechanism, TerrainCategory.PowerFixture, TerrainCategory.SiegeEngine ].map(c => ({ label: c, value: c }))}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
					showSearch={true}
					filterOption={(input, option) => {
						const strings = option ?
							[
								option.label
							]
							: [];
						return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
					}}
					value={terrain.category}
					onChange={setCategory}
				/>
				<HeaderText>Level</HeaderText>
				<NumberSpin
					min={1}
					max={10}
					value={terrain.level}
					onChange={setLevel}
				/>
				<HeaderText>Role</HeaderText>
				<Select
					style={{ width: '100%' }}
					options={[ MonsterRoleType.NoRole, MonsterRoleType.Ambusher, MonsterRoleType.Artillery, MonsterRoleType.Brute, MonsterRoleType.Controller, MonsterRoleType.Defender, MonsterRoleType.Harrier, MonsterRoleType.Hexer, MonsterRoleType.Mount, MonsterRoleType.Support ].map(type => ({ label: type, value: type, desc: MonsterLogic.getRoleTypeDescription(type) }))}
					optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
					showSearch={true}
					filterOption={(input, option) => {
						const strings = option ?
							[
								option.label,
								option.desc
							]
							: [];
						return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
					}}
					value={terrain.role.type}
					onChange={setRoleType}
				/>
				<Select
					style={{ width: '100%' }}
					options={[ TerrainRoleType.Fortification, TerrainRoleType.Hazard, TerrainRoleType.Relic, TerrainRoleType.SiegeEngine, TerrainRoleType.Trap, TerrainRoleType.Trigger ].map(type => ({ label: type, value: type }))}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
					showSearch={true}
					filterOption={(input, option) => {
						const strings = option ?
							[
								option.label
							]
							: [];
						return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
					}}
					value={terrain.role.terrainType}
					onChange={setTerrainRoleType}
				/>
				<HeaderText>Encounter Value</HeaderText>
				<NumberSpin min={1} value={terrain.encounterValue} steps={[ 1, 10 ]} onChange={setEncounterValue} />
				<Input
					placeholder='Area'
					allowClear={true}
					value={terrain.area}
					onChange={e => setArea(e.target.value)}
				/>
				<HeaderText>Stamina</HeaderText>
				<NumberSpin label='Base Stamina' min={0} value={terrain.stamina.base} steps={[ 1, 10 ]} onChange={setStaminaBase} />
				<NumberSpin label='Per Square' min={0} value={terrain.stamina.perSquare} steps={[ 1, 10 ]} onChange={setStaminaPerSquare} />
				<HeaderText>Size</HeaderText>
				<Input
					placeholder='Size'
					allowClear={true}
					value={terrain.size}
					onChange={e => setSize(e.target.value)}
				/>
			</Space>
		);
	};

	const getTerrainDamageSection = () => {
		const terrain = element as Terrain;

		const addDamageMod = () => {
			const copy = Utils.copy(element) as Terrain;
			copy.damageMods.push(FactoryLogic.damageModifier.create({
				damageType: DamageType.Damage,
				modifierType: DamageModifierType.Immunity,
				value: 0
			}));
			setElement(copy);
			setDirty(true);
		};

		const setModifierType = (index: number, value: DamageModifierType) => {
			const copy = Utils.copy(element) as Terrain;
			copy.damageMods[index].type = value;
			setElement(copy);
			setDirty(true);
		};

		const setDamageType = (index: number, value: DamageType) => {
			const copy = Utils.copy(element) as Terrain;
			copy.damageMods[index].damageType = value;
			setElement(copy);
			setDirty(true);
		};

		const setValue = (index: number, value: number) => {
			const copy = Utils.copy(element) as Terrain;
			copy.damageMods[index].value = value;
			setElement(copy);
			setDirty(true);
		};

		const moveDamageMod = (index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(element) as Terrain;
			copy.damageMods = Collections.move(copy.damageMods, index, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteDamageMod = (index: number) => {
			const copy = Utils.copy(element) as Terrain;
			copy.damageMods.splice(index, 1);
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					terrain.damageMods.map((dm, n) => (
						<Expander
							key={n}
							title={FormatLogic.getDamageModifier(dm)}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveDamageMod(n, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveDamageMod(n, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteDamageMod(n); }} />
							]}
						>
							<HeaderText>Modifier Type</HeaderText>
							<Segmented
								name='modifiertypes'
								block={true}
								options={[ DamageModifierType.Immunity, DamageModifierType.Weakness ]}
								value={dm.type}
								onChange={value => setModifierType(n, value)}
							/>
							<HeaderText>Damage Type</HeaderText>
							<Select
								style={{ width: '100%' }}
								placeholder='Damage type'
								options={[ DamageType.Damage, DamageType.Acid, DamageType.Cold, DamageType.Corruption, DamageType.Fire, DamageType.Holy, DamageType.Lightning, DamageType.Poison, DamageType.Psychic, DamageType.Sonic ].map(option => ({ value: option }))}
								optionRender={option => <div className='ds-text'>{option.data.value}</div>}
								showSearch={true}
								filterOption={(input, option) => {
									const strings = option ?
										[
											option.value
										]
										: [];
									return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
								}}
								value={dm.damageType}
								onChange={value => setDamageType(n, value)}
							/>
							<HeaderText>Value</HeaderText>
							<NumberSpin min={0} value={dm.value} onChange={value => setValue(n, value)} />
						</Expander>
					))
				}
				{
					terrain.damageMods.length === 0 ?
						<Empty />
						: null
				}
				<Button block={true} onClick={addDamageMod}>
					<PlusOutlined />
					Add a new damage modifier
				</Button>
			</Space>
		);
	};

	const getTerrainSectionsSection = () => {
		const terrain = element as Terrain;

		const addSection = () => {
			const copy = Utils.copy(element) as Terrain;
			copy.sections.push({
				id: Utils.guid(),
				content: [
					FactoryLogic.feature.create({
						id: Utils.guid(),
						name: '',
						description: ''
					})
				]
			});
			setElement(copy);
			setDirty(true);
		};

		const moveSection = (sectionIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(element) as Terrain;
			copy.sections = Collections.move(copy.sections, sectionIndex, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteSection = (sectionIndex: number) => {
			const copy = Utils.copy(terrain) as Terrain;
			copy.sections.splice(sectionIndex);
			setElement(copy);
			setDirty(true);
		};

		const addSectionContent = (sectionIndex: number) => {
			const copy = Utils.copy(element) as Terrain;
			copy.sections[sectionIndex].content.push(
				FactoryLogic.feature.create({
					id: Utils.guid(),
					name: '',
					description: ''
				})
			);
			setElement(copy);
			setDirty(true);
		};

		const moveSectionContent = (sectionIndex: number, contentIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(element) as Terrain;
			copy.sections[sectionIndex].content = Collections.move(copy.sections[sectionIndex].content, contentIndex, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteSectionContent = (sectionIndex: number, contentIndex: number) => {
			const copy = Utils.copy(terrain) as Terrain;
			copy.sections[sectionIndex].content.splice(contentIndex);
			setElement(copy);
			setDirty(true);
		};

		const setSectionContentFeature = (sectionIndex: number, contentIndex: number, value: FeatureText | FeatureAbility) => {
			const copy = Utils.copy(element) as Terrain;
			copy.sections[sectionIndex].content[contentIndex] = value;
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					terrain.sections.map((section, sectionIndex) => (
						<Expander
							key={section.id}
							title='Section'
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSection(sectionIndex, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSection(sectionIndex, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteSection(sectionIndex); }} />
							]}
						>
							<Space direction='vertical' style={{ width: '100%' }}>
								{
									section.content.map((feature, contentIndex) => (
										<Expander
											key={feature.id}
											title={feature.name}
											extra={[
												<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSectionContent(sectionIndex, contentIndex, 'up'); }} />,
												<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSectionContent(sectionIndex, contentIndex, 'down'); }} />,
												<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteSectionContent(sectionIndex, contentIndex); }} />
											]}
										>
											<FeatureEditPanel
												feature={feature}
												allowedTypes={[ FeatureType.Text, FeatureType.Ability ]}
												sourcebooks={props.sourcebooks}
												onChange={f => setSectionContentFeature(sectionIndex, contentIndex, f as FeatureText | FeatureAbility)}
											/>
										</Expander>
									))
								}
								{
									section.content.length === 0 ?
										<Empty />
										: null
								}
								<Button block={true} onClick={() => addSectionContent(sectionIndex)}>
									<PlusOutlined />
									Add a new content item
								</Button>
							</Space>
						</Expander>
					))
				}
				{
					terrain.sections.length === 0 ?
						<Empty />
						: null
				}
				<Button block={true} onClick={addSection}>
					<PlusOutlined />
					Add a new section
				</Button>
			</Space>
		);
	};

	const getTerrainCustomizationSection = () => {
		const terrain = element as Terrain;

		const addUpgrade = () => {
			const copy = Utils.copy(element) as Terrain;
			copy.upgrades.push({
				id: Utils.guid(),
				label: '',
				cost: 1,
				text: '',
				sections: []
			});
			setElement(copy);
			setDirty(true);
		};

		const moveUpgrade = (upgradeIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(element) as Terrain;
			copy.upgrades = Collections.move(copy.upgrades, upgradeIndex, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteUpgrade = (upgradeIndex: number) => {
			const copy = Utils.copy(element) as Terrain;
			copy.upgrades.splice(upgradeIndex);
			setElement(copy);
			setDirty(true);
		};

		const setUpgradeLabel = (upgradeIndex: number, value: string) => {
			const copy = Utils.copy(element) as Terrain;
			copy.upgrades[upgradeIndex].label = value;
			setElement(copy);
			setDirty(true);
		};

		const setUpgradeText = (upgradeIndex: number, value: string) => {
			const copy = Utils.copy(element) as Terrain;
			copy.upgrades[upgradeIndex].text = value;
			setElement(copy);
			setDirty(true);
		};

		const setUpgradeCost = (upgradeIndex: number, value: number) => {
			const copy = Utils.copy(element) as Terrain;
			copy.upgrades[upgradeIndex].cost = value;
			setElement(copy);
			setDirty(true);
		};

		const addUpgradeSection = (upgradeIndex: number) => {
			const copy = Utils.copy(element) as Terrain;
			copy.upgrades[upgradeIndex].sections.push({
				id: Utils.guid(),
				content: [
					FactoryLogic.feature.create({
						id: Utils.guid(),
						name: '',
						description: ''
					})
				]
			});
			setElement(copy);
			setDirty(true);
		};

		const moveUpgradeSection = (upgradeIndex: number, sectionIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(element) as Terrain;
			copy.upgrades[upgradeIndex].sections = Collections.move(copy.sections, sectionIndex, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteUpgradeSection = (upgradeIndex: number, sectionIndex: number) => {
			const copy = Utils.copy(terrain) as Terrain;
			copy.upgrades[upgradeIndex].sections.splice(sectionIndex);
			setElement(copy);
			setDirty(true);
		};

		const addUpgradeSectionContent = (upgradeIndex: number, sectionIndex: number) => {
			const copy = Utils.copy(element) as Terrain;
			copy.upgrades[upgradeIndex].sections[sectionIndex].content.push(
				FactoryLogic.feature.create({
					id: Utils.guid(),
					name: '',
					description: ''
				})
			);
			setElement(copy);
			setDirty(true);
		};

		const moveUpgradeSectionContent = (upgradeIndex: number, sectionIndex: number, contentIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(element) as Terrain;
			copy.upgrades[upgradeIndex].sections[sectionIndex].content = Collections.move(copy.sections[sectionIndex].content, contentIndex, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteUpgradeSectionContent = (upgradeIndex: number, sectionIndex: number, contentIndex: number) => {
			const copy = Utils.copy(terrain) as Terrain;
			copy.upgrades[upgradeIndex].sections[sectionIndex].content.splice(contentIndex);
			setElement(copy);
			setDirty(true);
		};

		const setUpgradeSectionContentFeature = (upgradeIndex: number, sectionIndex: number, contentIndex: number, value: FeatureText | FeatureAbility) => {
			const copy = Utils.copy(element) as Terrain;
			copy.upgrades[upgradeIndex].sections[sectionIndex].content[contentIndex] = value;
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					terrain.upgrades.map((upgrade, upgradeIndex) => (
						<Expander
							key={upgrade.id}
							title={upgrade.label || 'Unnamed Customization'}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveUpgrade(upgradeIndex, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveUpgrade(upgradeIndex, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteUpgrade(upgradeIndex); }} />
							]}
						>
							<Space direction='vertical' style={{ width: '100%' }}>
								<HeaderText>Label</HeaderText>
								<Input
									status={upgrade.label === '' ? 'warning' : ''}
									placeholder='Label'
									allowClear={true}
									value={upgrade.label}
									onChange={e => setUpgradeLabel(upgradeIndex, e.target.value)}
								/>
								<HeaderText>Text</HeaderText>
								<MultiLine label='Text' value={upgrade.text} onChange={value => setUpgradeText(upgradeIndex, value)} />
								<HeaderText>Cost</HeaderText>
								<NumberSpin min={1} value={upgrade.cost} onChange={value => setUpgradeCost(upgradeIndex, value)} />
								<HeaderText>Sections</HeaderText>
								{
									upgrade.sections.map((section, sectionIndex) => (
										<Expander
											key={section.id}
											title='Section'
											extra={[
												<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveUpgradeSection(upgradeIndex, sectionIndex, 'up'); }} />,
												<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveUpgradeSection(upgradeIndex, sectionIndex, 'down'); }} />,
												<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteUpgradeSection(upgradeIndex, sectionIndex); }} />
											]}
										>
											<Space direction='vertical' style={{ width: '100%' }}>
												{
													section.content.map((feature, contentIndex) => (
														<Expander
															key={feature.id}
															title={feature.name}
															extra={[
																<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveUpgradeSectionContent(upgradeIndex, sectionIndex, contentIndex, 'up'); }} />,
																<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveUpgradeSectionContent(upgradeIndex, sectionIndex, contentIndex, 'down'); }} />,
																<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteUpgradeSectionContent(upgradeIndex, sectionIndex, contentIndex); }} />
															]}
														>
															<FeatureEditPanel
																feature={feature}
																allowedTypes={[ FeatureType.Text, FeatureType.Ability ]}
																sourcebooks={props.sourcebooks}
																onChange={f => setUpgradeSectionContentFeature(upgradeIndex, sectionIndex, contentIndex, f as FeatureText | FeatureAbility)}
															/>
														</Expander>
													))
												}
												{
													section.content.length === 0 ?
														<Empty />
														: null
												}
												<Button block={true} onClick={() => addUpgradeSectionContent(upgradeIndex, sectionIndex)}>
													<PlusOutlined />
													Add a new content item
												</Button>
											</Space>
										</Expander>
									))
								}
								{
									upgrade.sections.length === 0 ?
										<Empty />
										: null
								}
								<Button block={true} onClick={() => addUpgradeSection(upgradeIndex)}>
									<PlusOutlined />
									Add a new section
								</Button>
							</Space>
						</Expander>
					))
				}
				{
					terrain.upgrades.length === 0 ?
						<Empty />
						: null
				}
				<Button block={true} onClick={addUpgrade}>
					<PlusOutlined />
					Add a new customization
				</Button>
			</Space>
		);
	};

	const getInformationEditSection = () => {
		const monsterGroup = element as MonsterGroup;

		const addInformation = () => {
			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			copy.information.push({
				id: Utils.guid(),
				name: '',
				description: ''
			});
			setElement(copy);
			setDirty(true);
		};

		const changeInformation = (information: Element) => {
			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			const index = copy.information.findIndex(i => i.id === information.id);
			if (index !== -1) {
				copy.information[index] = information;
			}
			setElement(copy);
			setDirty(true);
		};

		const moveInformation = (information: Element, direction: 'up' | 'down') => {
			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			const index = copy.information.findIndex(i => i.id === information.id);
			copy.information = Collections.move(copy.information, index, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteInformation = (information: Element) => {
			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			copy.information = copy.information.filter(i => i.id !== information.id);
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					monsterGroup.information.map(i => (
						<Expander
							key={i.id}
							title={i.name || 'Unnamed Information'}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveInformation(i, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveInformation(i, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteInformation(i); }} />
							]}
						>
							<ElementEditPanel
								element={i}
								onChange={changeInformation}
							/>
						</Expander>
					))
				}
				{
					monsterGroup.information.length === 0 ?
						<Empty />
						: null
				}
				<Button block={true} onClick={addInformation}>
					<PlusOutlined />
					Add a new information piece
				</Button>
			</Space>
		);
	};

	const getMaliceEditSection = () => {
		const monsterGroup = element as MonsterGroup;

		const addMaliceFeature = () => {
			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			copy.malice.push(FactoryLogic.feature.createMalice({
				id: Utils.guid(),
				name: '',
				cost: 3,
				sections: [
					''
				]
			}));
			setElement(copy);
			setDirty(true);
		};

		const changeMaliceFeature = (feature: FeatureMalice | FeatureAbility) => {
			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			const index = copy.malice.findIndex(f => f.id === feature.id);
			if (index !== -1) {
				copy.malice[index] = feature;
			}
			setElement(copy);
			setDirty(true);
		};

		const moveMaliceFeature = (feature: FeatureMalice | FeatureAbility, direction: 'up' | 'down') => {
			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			const index = copy.malice.findIndex(f => f.id === feature.id);
			copy.malice = Collections.move(copy.malice, index, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteMaliceFeature = (feature: FeatureMalice | FeatureAbility) => {
			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			copy.malice = copy.malice.filter(f => f.id !== feature.id);
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					monsterGroup.malice.map(f => (
						<Expander
							key={f.id}
							title={f.name || 'Unnamed Malice Feature'}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveMaliceFeature(f, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveMaliceFeature(f, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteMaliceFeature(f); }} />
							]}
						>
							<FeatureEditPanel
								feature={f}
								allowedTypes={[ FeatureType.Ability, FeatureType.Malice ]}
								sourcebooks={props.sourcebooks}
								onChange={f => changeMaliceFeature(f as FeatureMalice | FeatureAbility)}
							/>
						</Expander>
					))
				}
				{
					monsterGroup.malice.length === 0 ?
						<Empty />
						: null
				}
				<Button block={true} onClick={addMaliceFeature}>
					<PlusOutlined />
					Add a new malice feature
				</Button>
			</Space>
		);
	};

	const getMonstersEditSection = () => {
		const monsterGroup = element as MonsterGroup;

		const addMonster = () => {
			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			copy.monsters.push(FactoryLogic.createMonster({
				id: Utils.guid(),
				name: '',
				level: 1,
				role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Ambusher),
				keywords: [],
				encounterValue: 0,
				size: FactoryLogic.createSize(1, 'M'),
				speed: FactoryLogic.createSpeed(5),
				stamina: 5,
				stability: 0,
				freeStrikeDamage: 2,
				characteristics: MonsterLogic.createCharacteristics(0, 0, 0, 0, 0),
				features: []
			}));
			setElement(copy);
			setDirty(true);
		};

		const copyMonster = (monster: Monster) => {
			const monsterCopy = Utils.copy(monster);
			monsterCopy.id = Utils.guid();

			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			copy.monsters.push(monsterCopy);
			setElement(copy);
			setDirty(true);
		};

		const moveMonster = (monster: Monster, direction: 'up' | 'down') => {
			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			const index = copy.monsters.findIndex(m => m.id === monster.id);
			copy.monsters = Collections.move(copy.monsters, index, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteMonster = (monster: Monster) => {
			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			copy.monsters = copy.monsters.filter(m => m.id !== monster.id);
			setElement(copy);
			if (subElementID === monster.id) {
				navigation.goToLibraryEdit(kind!, sourcebookID!, elementID!);
			}
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					monsterGroup.monsters.map(m => (
						<Expander
							key={m.id}
							title={MonsterLogic.getMonsterName(m, monsterGroup)}
							extra={[
								<Button key='edit' type='text' title='Edit' icon={<EditOutlined />} onClick={e => { e.stopPropagation(); navigation.goToLibraryEdit(kind!, sourcebookID!, elementID!, m.id); }} />,
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveMonster(m, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveMonster(m, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteMonster(m); }} />
							]}
						>
							<MonsterPanel
								monster={m}
								monsterGroup={monsterGroup}
								options={props.options}
							/>
						</Expander>
					))
				}
				{
					monsterGroup.monsters.length === 0 ?
						<Empty />
						: null
				}
				<Flex gap={10}>
					<Button block={true} onClick={addMonster}>
						<PlusOutlined />
						Add a new monster
					</Button>
					<Upload
						style={{ width: '100%' }}
						accept='.drawsteel-monster'
						showUploadList={false}
						beforeUpload={file => {
							file
								.text()
								.then(json => {
									const monster = (JSON.parse(json) as Monster);
									copyMonster(monster);
								});
							return false;
						}}
					>
						<Button block={true} onClick={() => null}>
							<DownloadOutlined />
							Import a monster
						</Button>
					</Upload>
					<Button block={true} onClick={() => setDrawerOpen(true)}>
						<CopyOutlined />
						Copy an existing monster
					</Button>
				</Flex>
				<Drawer open={drawerOpen} closeIcon={null} onClose={() => setDrawerOpen(false)} width='500px'>
					<MonsterSelectModal
						type='companion'
						sourcebooks={props.sourcebooks}
						options={props.options}
						selectOriginal={false}
						onSelect={monster => {
							copyMonster(monster);
							setDrawerOpen(false);
						}}
						onClose={() => setDrawerOpen(false)}
					/>
				</Drawer>
			</Space>
		);
	};

	const getMonstersCustomizationSection = () => {
		const monsterGroup = element as MonsterGroup;

		const addAddOn = () => {
			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			copy.addOns.push(FactoryLogic.feature.createAddOn({
				id: Utils.guid(),
				name: '',
				description: '',
				category: FeatureAddOnType.Defensive
			}));
			setElement(copy);
			setDirty(true);
		};

		const changeAddOn = (addOn: FeatureAddOn) => {
			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			const index = copy.addOns.findIndex(i => i.id === addOn.id);
			if (index !== -1) {
				copy.addOns[index] = addOn;
			}
			setElement(copy);
			setDirty(true);
		};

		const moveAddOn = (addOn: FeatureAddOn, direction: 'up' | 'down') => {
			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			const index = copy.addOns.findIndex(i => i.id === addOn.id);
			copy.addOns = Collections.move(copy.addOns, index, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteAddOn = (addOn: FeatureAddOn) => {
			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			copy.addOns = copy.addOns.filter(i => i.id !== addOn.id);
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					monsterGroup.addOns.map(i => (
						<Expander
							key={i.id}
							title={i.name || 'Unnamed Customization'}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveAddOn(i, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveAddOn(i, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteAddOn(i); }} />
							]}
						>
							<FeatureEditPanel
								feature={i}
								allowedTypes={[ FeatureType.AddOn ]}
								sourcebooks={props.sourcebooks}
								onChange={f => changeAddOn(f as FeatureAddOn)}
							/>
						</Expander>
					))
				}
				{
					monsterGroup.addOns.length === 0 ?
						<Empty />
						: null
				}
				<Button block={true} onClick={addAddOn}>
					<PlusOutlined />
					Add a new customization
				</Button>
			</Space>
		);
	};

	const getMonsterEditSection = () => {
		const monsterGroup = element as MonsterGroup;
		const monster = monsterGroup.monsters.find(m => m.id === subElementID) as Monster;

		const changeMonster = (monster: Monster) => {
			const copy = Utils.copy(monsterGroup) as MonsterGroup;
			const index = copy.monsters.findIndex(m => m.id === monster.id);
			if (index !== -1) {
				copy.monsters[index] = monster;
			}
			setElement(copy);
			setDirty(true);
		};

		return (
			<MonsterEditPanel
				monster={monster}
				monsterGroup={monsterGroup}
				sourcebooks={props.sourcebooks}
				options={props.options}
				similarMonsters={props.options.showSimilarMonsters ? getSimilarMonsters(monster) : []}
				onChange={changeMonster}
			/>
		);
	};

	const getSimilarMonsters = (monster: Monster) => {
		const monsters = props.sourcebooks
			.flatMap(sb => sb.monsterGroups)
			.flatMap(mg => mg.monsters)
			.filter(m => m.id !== monster.id)
			.filter(m => !props.options.similarLevel || (m.level === monster.level))
			.filter(m => !props.options.similarRole || (m.role.type === monster.role.type))
			.filter(m => !props.options.similarOrganization || (m.role.organization === monster.role.organization))
			.filter(m => !props.options.similarSize || ((m.size.value === monster.size.value) && (m.size.mod === monster.size.mod)))
			.filter(m => !hiddenMonsterIDs.includes(m.id));

		scratchpadMonsters
			.filter(m => !monsters.map(monster => monster.id).includes(m.id))
			.forEach(m => monsters.push(m));

		return Collections.sort(monsters, m => MonsterLogic.getMonsterName(m));
	};

	const getSimilarMonstersSection = (monster: Monster) => {
		const monsters = getSimilarMonsters(monster);

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Expander title='Modify This List'>
					<Space direction='vertical' style={{ paddingTop: '15px', width: '100%' }}>
						<Button block={true} onClick={() => setDrawerOpen(true)}>Add a Monster</Button>
						<Button block={true} disabled={hiddenMonsterIDs.length === 0} onClick={() => setHiddenMonsterIDs([])}>Restore Hidden Monsters</Button>
					</Space>
				</Expander>
				{
					monsters.map(m => {
						const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, m.id);
						if (!monsterGroup) {
							return null;
						}

						return (
							<SelectablePanel
								key={m.id}
								action={{
									label: 'Hide',
									onClick: () => {
										if (scratchpadMonsters.map(spm => spm.id).includes(m.id)) {
											let copy = Utils.copy(scratchpadMonsters) as Monster[];
											copy = copy.filter(cm => cm.id !== m.id);
											setScratchpadMonsters(copy);
										} else {
											const copy = Utils.copy(hiddenMonsterIDs) as string[];
											copy.push(m.id);
											setHiddenMonsterIDs(copy);
										}
									}
								}}
								onSelect={() => props.showMonster(m, monsterGroup)}
							>
								<MonsterPanel
									monster={m}
									monsterGroup={monsterGroup}
									options={props.options}
								/>
							</SelectablePanel>
						);
					})
				}
				{
					monsters.length === 0 ?
						<Empty text='No similar monsters.' />
						: null
				}
				<Drawer open={drawerOpen} closeIcon={null} onClose={() => setDrawerOpen(false)} width='500px'>
					<MonsterSelectModal
						type='companion'
						sourcebooks={props.sourcebooks}
						options={props.options}
						selectOriginal={true}
						onSelect={monster => {
							const copy = Utils.copy(scratchpadMonsters) as Monster[];
							copy.push(monster);
							setScratchpadMonsters(copy);
							setDrawerOpen(false);
						}}
						onClose={() => setDrawerOpen(false)}
					/>
				</Drawer>
			</Space>
		);
	};

	const getEditHeaderSection = () => {
		switch (kind) {
			case 'class': {
				const heroClass = element as HeroClass;
				if (heroClass.subclasses.length > 0) {
					return (
						<div className='edit-header-section'>
							<Select
								style={{ width: '100%' }}
								options={[ null, ...heroClass.subclasses ].map(sc => ({ label: sc ? sc.name || 'Unnamed Subclass' : 'Class', value: sc ? sc.id : '' }))}
								optionRender={option => <div className='ds-text'>{option.data.label}</div>}
								showSearch={true}
								filterOption={(input, option) => {
									const strings = option ?
										[
											option.label
										]
										: [];
									return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
								}}
								value={subElementID || ''}
								onChange={id => navigation.goToLibraryEdit(kind!, sourcebookID!, elementID!, id)}
							/>
						</div>
					);
				}
				break;
			}
			case 'monster-group': {
				const monsterGroup = element as MonsterGroup;
				if (monsterGroup.monsters.length > 0) {
					return (
						<div className='edit-header-section'>
							<Select
								style={{ width: '100%' }}
								options={[ null, ...monsterGroup.monsters ].map(m => ({ label: m ? MonsterLogic.getMonsterName(m, monsterGroup) : 'Monster Group', value: m ? m.id : '' }))}
								optionRender={option => <div className='ds-text'>{option.data.label}</div>}
								showSearch={true}
								filterOption={(input, option) => {
									const strings = option ?
										[
											option.label
										]
										: [];
									return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
								}}
								value={subElementID || ''}
								onChange={id => navigation.goToLibraryEdit(kind!, sourcebookID!, elementID!, id)}
							/>
						</div>
					);
				}
				break;
			}
		}

		return null;
	};

	const getEditSection = () => {
		switch (kind) {
			case 'ancestry':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Ancestry',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Features',
								children: getFeaturesEditSection()
							}
						]}
					/>
				);
			case 'culture':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Culture',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Details',
								children: getCultureEditSection()
							}
						]}
					/>
				);
			case 'career':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Career',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Features',
								children: getFeaturesEditSection()
							},
							{
								key: '3',
								label: 'Inciting Incidents',
								children: getIncitingIncidentsSection()
							}
						]}
					/>
				);
			case 'class':
				if (!subElementID) {
					return (
						<Tabs
							items={[
								{
									key: '1',
									label: 'Class',
									children: getNameAndDescriptionSection()
								},
								{
									key: '2',
									label: 'Details',
									children: getClassEditSection()
								},
								{
									key: '3',
									label: 'Levels',
									children: getFeaturesByLevelEditSection()
								},
								{
									key: '4',
									label: 'Abilities',
									children: getClassAbilitiesEditSection()
								},
								{
									key: '5',
									label: 'Subclasses',
									children: getClassSubclassesEditSection()
								}
							]}
						/>
					);
				} else {
					return getSubclassEditSection();
				}
			case 'complication':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Complication',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Features',
								children: getFeaturesEditSection()
							}
						]}
					/>
				);
			case 'domain':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Domain',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Levels',
								children: getFeaturesByLevelEditSection()
							},
							{
								key: '3',
								label: 'Piety',
								children: getPietyEditSection()
							}
						]}
					/>
				);
			case 'kit':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Kit',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Details',
								children: getKitDetailsSection()
							},
							{
								key: '3',
								label: 'Stats',
								children: getKitStatsEditSection()
							},
							{
								key: '4',
								label: 'Damage',
								children: getKitDamageEditSection()
							},
							{
								key: '5',
								label: 'Features',
								children: getFeaturesEditSection()
							}
						]}
					/>
				);
			case 'perk':
				return (
					<FeatureEditPanel
						feature={element as Perk}
						sourcebooks={props.sourcebooks}
						onChange={perk => {
							const copy = Utils.copy(perk) as Perk;
							setElement(copy);
							setDirty(true);
						}}
					/>
				);
			case 'terrain':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Terrain',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Stats',
								children: getTerrainStatsSection()
							},
							{
								key: '3',
								label: 'Damage',
								children: getTerrainDamageSection()
							},
							{
								key: '4',
								label: 'Sections',
								children: getTerrainSectionsSection()
							},
							{
								key: '5',
								label: 'Customization',
								children: getTerrainCustomizationSection()
							}
						]}
					/>
				);
			case 'title':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Title',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Details',
								children: getTitleEditSection()
							},
							{
								key: '3',
								label: 'Features',
								children: getFeaturesEditSection()
							}
						]}
					/>
				);
			case 'item':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Item',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Details',
								children: getItemDetailsEditSection()
							},
							{
								key: '3',
								label: 'Crafting',
								children: getCraftingEditSection()
							},
							{
								key: '4',
								label: 'Levels',
								children: getFeaturesByLevelEditSection()
							},
							{
								key: '5',
								label: 'Customization',
								children: getItemCustomizationEditSection()
							}
						]}
					/>
				);
			case 'monster-group':
				if (!subElementID) {
					return (
						<Tabs
							items={[
								{
									key: '1',
									label: 'Monster Group',
									children: getNameAndDescriptionSection()
								},
								{
									key: '2',
									label: 'Information',
									children: getInformationEditSection()
								},
								{
									key: '3',
									label: 'Malice',
									children: getMaliceEditSection()
								},
								{
									key: '4',
									label: 'Monsters',
									children: getMonstersEditSection()
								},
								{
									key: '5',
									label: 'Customization',
									children: getMonstersCustomizationSection()
								}
							]}
						/>
					);
				} else {
					return getMonsterEditSection();
				}
		}

		return null;
	};

	const getPreviewHeaderSection = () => {
		switch (kind) {
			case 'class':
				if (subElementID) {
					return (
						<div className='preview-header-section'>
							<Button icon={<LeftOutlined />} onClick={() => navigation.goToLibraryEdit(kind!, sourcebookID!, elementID!)}>Back to Class</Button>
						</div>
					);
				}
				break;
			case 'monster-group':
				if (subElementID) {
					return (
						<div className='preview-header-section'>
							<Button icon={<LeftOutlined />} onClick={() => navigation.goToLibraryEdit(kind!, sourcebookID!, elementID!)}>Back to Monster Group</Button>
						</div>
					);
				}
				break;
		}

		return null;
	};

	const getPreview = () => {
		switch (kind) {
			case 'ancestry':
				return (
					<SelectablePanel>
						<AncestryPanel ancestry={element as Ancestry} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'culture':
				return (
					<SelectablePanel>
						<CulturePanel culture={element as Culture} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'career':
				return (
					<SelectablePanel>
						<CareerPanel career={element as Career} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'class':
				if (!subElementID) {
					return (
						<SelectablePanel>
							<ClassPanel heroClass={element as HeroClass} options={props.options} mode={PanelMode.Full} />
						</SelectablePanel>
					);
				} else {
					const heroClass = element as HeroClass;
					const subclass = heroClass.subclasses.find(sc => sc.id === subElementID) as SubClass;

					return (
						<SelectablePanel>
							<SubclassPanel subclass={subclass} options={props.options} mode={PanelMode.Full} />
						</SelectablePanel>
					);
				}
			case 'complication':
				return (
					<SelectablePanel>
						<ComplicationPanel complication={element as Complication} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'domain':
				return (
					<SelectablePanel>
						<DomainPanel domain={element as Domain} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'kit':
				return (
					<SelectablePanel>
						<KitPanel kit={element as Kit} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'perk':
				return (
					<SelectablePanel>
						<PerkPanel perk={element as Perk} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'terrain':
				return (
					<SelectablePanel>
						<TerrainPanel terrain={element as Terrain} showCustomizations={true} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'title':
				return (
					<SelectablePanel>
						<TitlePanel title={element as Title} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'item':
				return (
					<>
						<SelectablePanel>
							<ItemPanel item={element as Item} options={props.options} showCustomizations={true} mode={PanelMode.Full} />
						</SelectablePanel>
						{
							(element as Item).crafting ?
								<SelectablePanel>
									<ProjectPanel project={(element as Item).crafting!} mode={PanelMode.Full} />
								</SelectablePanel>
								: null
						}
					</>
				);
			case 'monster-group':
				if (!subElementID) {
					return (
						<SelectablePanel>
							<MonsterGroupPanel monsterGroup={element as MonsterGroup} options={props.options} mode={PanelMode.Full} />
						</SelectablePanel>
					);
				} else {
					const monsterGroup = element as MonsterGroup;
					const monster = monsterGroup.monsters.find(m => m.id === subElementID) as Monster;

					if (props.options.showSimilarMonsters) {
						return (
							<Tabs
								items={[
									{
										key: '1',
										label: 'Preview',
										children: (
											<SelectablePanel>
												<MonsterPanel key={JSON.stringify(monster)} monster={monster} monsterGroup={monsterGroup} options={props.options} mode={PanelMode.Full} />
											</SelectablePanel>
										)
									},
									{
										key: '2',
										label: 'Similar Monsters',
										children: getSimilarMonstersSection(monster)
									}
								]}
							/>
						);
					} else {
						return (
							<SelectablePanel>
								<MonsterPanel key={JSON.stringify(monster)} monster={monster} monsterGroup={monsterGroup} options={props.options} mode={PanelMode.Full} />
							</SelectablePanel>
						);
					}
				}
		}

		return null;
	};

	const getSubheader = () => {
		if (kind === 'class') {
			if (subElementID) {
				return 'Subclass Builder';
			}
		}

		if (kind === 'monster-group') {
			if (subElementID) {
				return 'Monster Builder';
			}

			return 'Monster Group Builder';
		}

		return `${Format.capitalize(kind!)} Builder`;
	};

	try {
		let monster: Monster | null = null;
		if ((kind === 'monster-group') && !!subElementID) {
			monster = (element as MonsterGroup).monsters.find(m => m.id === subElementID) || null;
		}

		return (
			<ErrorBoundary>
				<div className='library-edit-page'>
					<AppHeader subheader={getSubheader()} showDirectory={props.showDirectory}>
						<Button type='primary' icon={<SaveOutlined />} disabled={!dirty} onClick={() => props.saveChanges(kind!, sourcebookID!, element)}>
							Save Changes
						</Button>
						<Button icon={<CloseOutlined />} onClick={() => navigation.goToLibraryView(kind!, elementID!)}>
							Cancel
						</Button>
						{
							monster ?
								<div className='divider' />
								: null
						}
						{
							monster ?
								<Popover
									trigger='click'
									content={<OptionsPanel mode='monster' options={props.options}heroes={props.heroes} setOptions={props.setOptions} />}
								>
									<Button icon={<SettingOutlined />}>
										Options
										<DownOutlined />
									</Button>
								</Popover>
								: null
						}
					</AppHeader>
					<div className='library-edit-page-content'>
						<div className='edit-column'>
							{getEditHeaderSection()}
							{getEditSection()}
						</div>
						<div className='preview-column'>
							{getPreviewHeaderSection()}
							{getPreview()}
						</div>
					</div>
					<AppFooter page='library' showAbout={props.showAbout} showRoll={props.showRoll} showReference={props.showReference} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
