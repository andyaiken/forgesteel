import { Alert, Button, Input, Segmented, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, EditOutlined, LeftOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { EnvironmentData, OrganizationData, UpbringingData } from '../../../../data/culture-data';
import { Feature, FeatureAbility, FeatureMalice } from '../../../../models/feature';
import { Monster, MonsterGroup } from '../../../../models/monster';
import { Sourcebook, SourcebookElementKind } from '../../../../models/sourcebook';
import { useMemo, useState } from 'react';
import { Ability } from '../../../../models/ability';
import { AbilityEditPanel } from '../../../panels/edit/ability-edit-panel/ability-edit-panel';
import { AbilityKeyword } from '../../../../enums/ability-keyword';
import { AbilityLogic } from '../../../../logic/ability-logic';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryPanel } from '../../../panels/elements/ancestry-panel/ancestry-panel';
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
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Domain } from '../../../../models/domain';
import { DomainPanel } from '../../../panels/elements/domain-panel/domain-panel';
import { Element } from '../../../../models/element';
import { ElementEditPanel } from '../../../panels/edit/element-edit-panel/element-edit-panel';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { FeatureEditPanel } from '../../../panels/edit/feature-edit-panel/feature-edit-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { Format } from '../../../../utils/format';
import { HeaderText } from '../../../controls/header-text/header-text';
import { HeroClass } from '../../../../models/class';
import { Item } from '../../../../models/item';
import { ItemPanel } from '../../../panels/elements/item-panel/item-panel';
import { ItemType } from '../../../../enums/item-type';
import { Kit } from '../../../../models/kit';
import { KitArmor } from '../../../../enums/kit-armor';
import { KitPanel } from '../../../panels/elements/kit-panel/kit-panel';
import { KitType } from '../../../../enums/kit-type';
import { KitWeapon } from '../../../../enums/kit-weapon';
import { MonsterEditPanel } from '../../../panels/edit/monster-edit-panel/monster-edit-panel';
import { MonsterGroupPanel } from '../../../panels/elements/monster-group-panel/monster-group-panel';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterOrganizationType } from '../../../../enums/monster-organization-type';
import { MonsterPanel } from '../../../panels/elements/monster-panel/monster-panel';
import { MonsterRoleType } from '../../../../enums/monster-role-type';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NameGenerator } from '../../../../utils/name-generator';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { PanelMode } from '../../../../enums/panel-mode';
import { Perk } from '../../../../models/perk';
import { PerkPanel } from '../../../panels/elements/perk-panel/perk-panel';
import { ProjectPanel } from '../../../panels/elements/project-panel/project-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { SubClass } from '../../../../models/subclass';
import { SubclassPanel } from '../../../panels/elements/subclass-panel/subclass-panel';
import { Title } from '../../../../models/title';
import { TitlePanel } from '../../../panels/elements/title-panel/title-panel';
import { Toggle } from '../../../controls/toggle/toggle';
import { Utils } from '../../../../utils/utils';
import { getSourcebookKey } from '../../../../utils/get-sourcebook-key';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './library-edit.scss';

interface Props {
	sourcebooks: Sourcebook[];
	showAbout: () => void;
 	showMonster: (monsterID: string) => void;
	saveChanges: (sourcebookID: string, kind: SourcebookElementKind, element: Element) => void;
}

export const LibraryEditPage = (props: Props) => {
	const navigation = useNavigation();
	const { sourcebookID, kind, elementID, subElementID } = useParams<{ sourcebookID: string, kind: SourcebookElementKind, elementID: string, subElementID?: string }>();
	const sourcebook = useMemo(() => props.sourcebooks.find(s => s.id === sourcebookID)!, [ sourcebookID, props.sourcebooks ]);
	const sourcebookKey = useMemo(() => getSourcebookKey(kind!), [ kind ]);
	const originalElement = useMemo(() => sourcebook[sourcebookKey].find(e => e.id === elementID)!, [ sourcebook, sourcebookKey, elementID ]);
	const [ element, setElement ] = useState<Element>(JSON.parse(JSON.stringify(originalElement)) as Element);
	const [ dirty, setDirty ] = useState<boolean>(false);
	const [ showSimilarMonsters, setShowSimilarMonsters ] = useState<boolean>(false);

	const [ similarLevel, setSimilarLevel ] = useState<boolean>(true);
	const [ similarRole, setSimilarRole ] = useState<boolean>(true);
	const [ similarOrganization, setSimilarOrganization ] = useState<boolean>(true);

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Element;
			elementCopy.name = value;
			if ((elementCopy as Item).crafting) {
				(elementCopy as Item).crafting!.name = `Craft ${value}`;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setDescription = (value: string) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Element;
			elementCopy.description = value;
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Input
					className={element.name === '' ? 'input-empty' : ''}
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
			const elementCopy = JSON.parse(JSON.stringify(element)) as Ancestry | Career | Complication | Kit;
			elementCopy.features.push(FactoryLogic.feature.create({
				id: Utils.guid(),
				name: '',
				description: ''
			}));
			setElement(elementCopy);
			setDirty(true);
		};

		const changeFeature = (feature: Feature) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Ancestry | Career | Complication | Kit;
			const index = elementCopy.features.findIndex(f => f.id === feature.id);
			if (index !== -1) {
				elementCopy.features[index] = feature;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Ancestry | Career | Complication | Kit;
			const index = elementCopy.features.findIndex(f => f.id === feature.id);
			elementCopy.features = Collections.move(elementCopy.features, index, direction);
			setElement(elementCopy);
			setDirty(true);
		};

		const deleteFeature = (feature: Feature) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Ancestry | Career | Complication | Kit;
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
							extra={[
								<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f, 'up'); }} />,
								<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f, 'down'); }} />,
								<DangerButton key='delete' mode='icon' onConfirm={e => { e.stopPropagation(); deleteFeature(f); }} />
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
						<Alert
							type='warning'
							showIcon={true}
							message='No features'
						/>
						: null
				}
				<Button block={true} onClick={addFeature}>Add a new feature</Button>
			</Space>
		);
	};

	const getIncitingIncidentsSection = () => {
		const career = element as Career;

		const addIncident = () => {
			const careerCopy = JSON.parse(JSON.stringify(element)) as Career;
			careerCopy.incitingIncidents.options.push({
				id: Utils.guid(),
				name: '',
				description: ''
			});
			setElement(careerCopy);
			setDirty(true);
		};

		const changeIncident = (e: Element) => {
			const careerCopy = JSON.parse(JSON.stringify(element)) as Career;
			const index = careerCopy.incitingIncidents.options.findIndex(o => o.id === e.id);
			if (index !== -1) {
				careerCopy.incitingIncidents.options[index] = e;
			}
			setElement(careerCopy);
			setDirty(true);
		};

		const moveIncident = (e: Element, direction: 'up' | 'down') => {
			const careerCopy = JSON.parse(JSON.stringify(element)) as Career;
			const index = careerCopy.incitingIncidents.options.findIndex(o => o.id ===  e.id);
			careerCopy.incitingIncidents.options = Collections.move(careerCopy.incitingIncidents.options, index, direction);
			setElement(careerCopy);
			setDirty(true);
		};

		const deleteIncident = (e: Element) => {
			const careerCopy = JSON.parse(JSON.stringify(element)) as Career;
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
								<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveIncident(o, 'up'); }} />,
								<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveIncident(o, 'down'); }} />,
								<DangerButton key='delete' mode='icon' onConfirm={e => { e.stopPropagation(); deleteIncident(o); }} />
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
						<Alert
							type='warning'
							showIcon={true}
							message='No inciting incidents'
						/>
						: null
				}
				<Button block={true} onClick={addIncident}>Add a new inciting incident</Button>
			</Space>
		);
	};

	const getCultureEditSection = () => {
		const culture = element as Culture;

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					className={culture.languages.length === 0 ? 'selection-empty' : ''}
					allowClear={true}
					placeholder='Select language'
					options={SourcebookLogic.getLanguages(props.sourcebooks).map(l => ({ label: l.name, value: l.name, desc: l.description }))}
					optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
					value={culture.languages.length > 0 ? culture.languages[0] : null}
					onChange={value => {
						const copy = JSON.parse(JSON.stringify(element)) as Culture;
						copy.languages = value ? [ value ] : [];
						setElement(copy);
						setDirty(true);
					}}
				/>
				<Select
					style={{ width: '100%' }}
					className={culture.environment === null ? 'selection-empty' : ''}
					allowClear={true}
					placeholder='Select environment'
					options={EnvironmentData.getEnvironments().map(s => ({ value: s.id, label: s.name }))}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
					value={culture.environment ? culture.environment.id : null}
					onChange={value => {
						const copy = JSON.parse(JSON.stringify(element)) as Culture;
						const env = EnvironmentData.getEnvironments().find(e => e.id === value);
						if (env) {
							const envCopy = JSON.parse(JSON.stringify(env)) as Feature;
							copy.environment = envCopy;
						}
						setElement(copy);
						setDirty(true);
					}}
				/>
				<Select
					style={{ width: '100%' }}
					className={culture.organization === null ? 'selection-empty' : ''}
					allowClear={true}
					placeholder='Select organization'
					options={OrganizationData.getOrganizations().map(s => ({ value: s.id, label: s.name }))}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
					value={culture.organization ? culture.organization.id : null}
					onChange={value => {
						const copy = JSON.parse(JSON.stringify(element)) as Culture;
						const org = OrganizationData.getOrganizations().find(o => o.id === value);
						if (org) {
							const orgCopy = JSON.parse(JSON.stringify(org)) as Feature;
							copy.organization = orgCopy;
						}
						setElement(copy);
						setDirty(true);
					}}
				/>
				<Select
					style={{ width: '100%' }}
					className={culture.upbringing === null ? 'selection-empty' : ''}
					allowClear={true}
					placeholder='Select upbringing'
					options={UpbringingData.getUpbringings().map(s => ({ value: s.id, label: s.name }))}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
					value={culture.upbringing ? culture.upbringing.id : null}
					onChange={value => {
						const copy = JSON.parse(JSON.stringify(element)) as Culture;
						const ub = UpbringingData.getUpbringings().find(u => u.id === value);
						if (ub) {
							const ubCopy = JSON.parse(JSON.stringify(ub)) as Feature;
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
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
			elementCopy.heroicResource = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setSubclassName = (value: string) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
			elementCopy.subclassName = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setSubclassCount = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
			elementCopy.subclassCount = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setPrimaryCharacteristics = (value: Characteristic[]) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
			elementCopy.primaryCharacteristics = value;
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Heroic Resource</HeaderText>
				<Input
					className={heroClass.heroicResource === '' ? 'input-empty' : ''}
					placeholder='Heroic resource'
					allowClear={true}
					value={heroClass.heroicResource}
					onChange={e => setHeroicResource(e.target.value)}
				/>
				<HeaderText>Subclass Name</HeaderText>
				<Input
					className={heroClass.subclassName === '' ? 'input-empty' : ''}
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
				<Select
					style={{ width: '100%' }}
					className={heroClass.primaryCharacteristics.length < 2 ? 'selection-empty' : ''}
					mode='multiple'
					maxCount={2}
					placeholder='Select primary characteristics'
					options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(ch => ({ value: ch }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={heroClass.primaryCharacteristics}
					onChange={setPrimaryCharacteristics}
				/>
			</Space>
		);
	};

	const getFeaturesByLevelEditSection = () => {
		const heroClass = element as HeroClass | Domain | Item;

		const addFeature = (level: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass | Domain | Item;
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
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass | Domain | Item;
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
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass | Domain | Item;
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
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass | Domain | Item;
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
											extra={[
												<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(lvl.level, f, 'up'); }} />,
												<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(lvl.level, f, 'down'); }} />,
												<DangerButton key='delete' mode='icon' onConfirm={e => { e.stopPropagation(); deleteFeature(lvl.level, f); }} />
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
										<Alert
											type='warning'
											showIcon={true}
											message='No features'
										/>
										: null
								}
								<Button block={true} onClick={() => addFeature(lvl.level)}>Add a new level {lvl.level} feature</Button>
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
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
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
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
			const index = elementCopy.abilities.findIndex(a => a.id === ability.id);
			if (index !== -1) {
				elementCopy.abilities[index] = ability;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const moveAbility = (ability: Ability, direction: 'up' | 'down') => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
			const index = elementCopy.abilities.findIndex(a => a.id === ability.id);
			elementCopy.abilities = Collections.move(elementCopy.abilities, index, direction);
			setElement(elementCopy);
			setDirty(true);
		};

		const deleteAbility = (ability: Ability) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
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
							extra={[
								<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveAbility(a, 'up'); }} />,
								<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveAbility(a, 'down'); }} />,
								<DangerButton key='delete' mode='icon' onConfirm={e => { e.stopPropagation(); deleteAbility(a); }} />
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
						<Alert
							type='warning'
							showIcon={true}
							message='No abilities'
						/>
						: null
				}
				<Button block={true} onClick={addAbility}>Add a new ability</Button>
			</Space>
		);
	};

	const getClassSubclassesEditSection = () => {
		const heroClass = element as HeroClass;

		const addSubclass = () => {
			const classCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
			classCopy.subclasses.push(FactoryLogic.createSubclass());
			setElement(classCopy);
			setDirty(true);
		};

		const moveSubclass = (subclass: SubClass, direction: 'up' | 'down') => {
			const classCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
			const index = classCopy.subclasses.findIndex(sc => sc.id ===  subclass.id);
			classCopy.subclasses = Collections.move(classCopy.subclasses, index, direction);
			setElement(classCopy);
			setDirty(true);
		};

		const deleteSubclass = (subclass: SubClass) => {
			const classCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
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
								<Button key='edit' type='text' icon={<EditOutlined />} onClick={e => { e.stopPropagation(); navigation.goToLibraryEdit(sourcebookID!, kind!, elementID!, sc.id); }} />,
								<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSubclass(sc, 'up'); }} />,
								<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSubclass(sc, 'down'); }} />,
								<DangerButton key='delete' mode='icon' onConfirm={e => { e.stopPropagation(); deleteSubclass(sc); }} />
							]}
						>
							<SubclassPanel subclass={sc} mode={PanelMode.Compact} />
						</Expander>
					))
				}
				{
					heroClass.subclasses.length === 0 ?
						<Alert
							type='warning'
							showIcon={true}
							message='No subclasses'
						/>
						: null
				}
				<Button block={true} onClick={addSubclass}>Add a new subclass</Button>
			</Space>
		);
	};

	const getSubclassEditSection = () => {
		const heroClass = element as HeroClass;
		const subclass = heroClass.subclasses.find(sc => sc.id === subElementID) as SubClass;

		const setName = (subclass: SubClass, value: string) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
			const index = elementCopy.subclasses.findIndex(sc => sc.id === subclass.id);
			if (index !== -1) {
				const sc = elementCopy.subclasses[index];
				sc.name = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setDescription = (subclass: SubClass, value: string) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
			const index = elementCopy.subclasses.findIndex(sc => sc.id === subclass.id);
			if (index !== -1) {
				const sc = elementCopy.subclasses[index];
				sc.description = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const addFeature = (subclass: SubClass, level: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
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
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
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
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
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
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
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
								extra={[
									<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(subclass, lvl.level, f, 'up'); }} />,
									<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(subclass, lvl.level, f, 'down'); }} />,
									<DangerButton key='delete' mode='icon' onConfirm={e => { e.stopPropagation(); deleteFeature(subclass, lvl.level, f); }} />
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
							<Alert
								type='warning'
								showIcon={true}
								message='No features'
							/>
							: null
					}
					<Button block={true} onClick={() => addFeature(subclass, lvl.level)}>Add a new level {lvl.level} feature</Button>
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
									className={subclass.name === '' ? 'input-empty' : ''}
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
			const copy = JSON.parse(JSON.stringify(element)) as Domain;
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

	const getKitEditSection = () => {
		const kit = element as Kit;

		const setType = (value: KitType) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			elementCopy.type = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setArmor = (value: KitArmor[]) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			elementCopy.armor = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setWeapon = (value: KitWeapon[]) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			elementCopy.weapon = value;
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Type</HeaderText>
				<Select
					style={{ width: '100%' }}
					placeholder='Select type'
					options={[ KitType.Standard, KitType.Stormwight ].map(l => ({ value: l }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={kit.type}
					onChange={setType}
				/>
				<HeaderText>Armor</HeaderText>
				<Select
					style={{ width: '100%' }}
					className={kit.armor.length === 0 ? 'selection-empty' : ''}
					mode='multiple'
					allowClear={true}
					placeholder='Select armor'
					options={[ KitArmor.Light, KitArmor.Medium, KitArmor.Heavy, KitArmor.Shield ].map(option => ({ value: option }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={kit.armor}
					onChange={setArmor}
				/>
				<HeaderText>Weapons</HeaderText>
				<Select
					style={{ width: '100%' }}
					className={kit.weapon.length === 0 ? 'selection-empty' : ''}
					mode='multiple'
					allowClear={true}
					placeholder='Select weapon'
					options={[ KitWeapon.Bow, KitWeapon.Ensnaring, KitWeapon.Heavy, KitWeapon.Light, KitWeapon.Medium, KitWeapon.Polearm, KitWeapon.Unarmed, KitWeapon.Whip ].map(option => ({ value: option }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={kit.weapon}
					onChange={setWeapon}
				/>
			</Space>
		);
	};

	const getKitStatsEditSection = () => {
		const kit = element as Kit;

		const setStamina = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			elementCopy.stamina = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setSpeed = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			elementCopy.speed = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setStability = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			elementCopy.stability = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setMeleeDistance = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			elementCopy.meleeDistance = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setRangedDistance = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			elementCopy.rangedDistance = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setDisengage = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
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
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			elementCopy.meleeDamage = value ? { tier1: 0, tier2: 0, tier3: 0 } : null;
			setElement(elementCopy);
			setDirty(true);
		};

		const setMeleeDamage1 = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			if (elementCopy.meleeDamage) {
				elementCopy.meleeDamage.tier1 = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setMeleeDamage2 = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			if (elementCopy.meleeDamage) {
				elementCopy.meleeDamage.tier2 = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setMeleeDamage3 = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			if (elementCopy.meleeDamage) {
				elementCopy.meleeDamage.tier3 = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setRangedDamage = (value: boolean) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			elementCopy.rangedDamage = value ? { tier1: 0, tier2: 0, tier3: 0 } : null;
			setElement(elementCopy);
			setDirty(true);
		};

		const setRangedDamage1 = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			if (elementCopy.rangedDamage) {
				elementCopy.rangedDamage.tier1 = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setRangedDamage2 = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			if (elementCopy.rangedDamage) {
				elementCopy.rangedDamage.tier2 = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setRangedDamage3 = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
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
			const elementCopy = JSON.parse(JSON.stringify(element)) as Title;
			elementCopy.echelon = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setPrerequisites = (value: string) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Title;
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
			const elementCopy = JSON.parse(JSON.stringify(element)) as Item;
			elementCopy.type = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setKeywords = (value: (AbilityKeyword | KitArmor | KitWeapon)[]) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Item;
			elementCopy.keywords = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setEffect = (value: string) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Item;
			elementCopy.effect = value;
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Item Type</HeaderText>
				<Segmented
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
					value={item.keywords}
					onChange={setKeywords}
				/>
				<HeaderText>Effect</HeaderText>
				<MultiLine label='Effect' value={item.effect} onChange={setEffect} />
			</Space>
		);
	};

	const getCraftingEditSection = () => {
		const item = element as Item;

		const setCraftable = (value: boolean) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Item;
			elementCopy.crafting = value ? FactoryLogic.createProject({ id: `${item.id}-crafting`, name: `Craft ${item.name}`, description: item.name }) : null;
			setElement(elementCopy);
			setDirty(true);
		};

		const setPrerequisites = (value: string) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Item;
			if (elementCopy.crafting) {
				elementCopy.crafting.itemPrerequisites = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setSource = (value: string) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Item;
			if (elementCopy.crafting) {
				elementCopy.crafting.source = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setCharacteristic = (value: Characteristic[]) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Item;
			if (elementCopy.crafting) {
				elementCopy.crafting.characteristic = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setGoal = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Item;
			if (elementCopy.crafting) {
				elementCopy.crafting.goal = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setEffect = (value: string) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Item;
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

	const getInformationEditSection = () => {
		const monsterGroup = element as MonsterGroup;

		const addInformation = () => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			copy.information.push({
				id: Utils.guid(),
				name: '',
				description: ''
			});
			setElement(copy);
			setDirty(true);
		};

		const changeInformation = (information: Element) => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			const index = copy.information.findIndex(i => i.id === information.id);
			if (index !== -1) {
				copy.information[index] = information;
			}
			setElement(copy);
			setDirty(true);
		};

		const moveInformation = (information: Element, direction: 'up' | 'down') => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			const index = copy.information.findIndex(i => i.id === information.id);
			copy.information = Collections.move(copy.information, index, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteInformation = (information: Element) => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
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
								<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveInformation(i, 'up'); }} />,
								<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveInformation(i, 'down'); }} />,
								<DangerButton key='delete' mode='icon' onConfirm={e => { e.stopPropagation(); deleteInformation(i); }} />
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
						<Alert
							type='warning'
							showIcon={true}
							message='No information pieces'
						/>
						: null
				}
				<Button block={true} onClick={addInformation}>Add a new information piece</Button>
			</Space>
		);
	};

	const getMaliceEditSection = () => {
		const monsterGroup = element as MonsterGroup;

		const addMaliceFeature = () => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
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
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			const index = copy.malice.findIndex(f => f.id === feature.id);
			if (index !== -1) {
				copy.malice[index] = feature;
			}
			setElement(copy);
			setDirty(true);
		};

		const moveMaliceFeature = (feature: FeatureMalice | FeatureAbility, direction: 'up' | 'down') => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			const index = copy.malice.findIndex(f => f.id === feature.id);
			copy.malice = Collections.move(copy.malice, index, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteMaliceFeature = (feature: FeatureMalice | FeatureAbility) => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
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
								<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveMaliceFeature(f, 'up'); }} />,
								<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveMaliceFeature(f, 'down'); }} />,
								<DangerButton key='delete' mode='icon' onConfirm={e => { e.stopPropagation(); deleteMaliceFeature(f); }} />
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
						<Alert
							type='warning'
							showIcon={true}
							message='No malice features'
						/>
						: null
				}
				<Button block={true} onClick={addMaliceFeature}>Add a new malice feature</Button>
			</Space>
		);
	};

	const getMonstersEditSection = () => {
		const monsterGroup = element as MonsterGroup;

		const addMonster = () => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			copy.monsters.push(FactoryLogic.createMonster({
				id: Utils.guid(),
				name: '',
				level: 1,
				role: FactoryLogic.createMonsterRole(MonsterRoleType.Ambusher, MonsterOrganizationType.Platoon),
				keywords: [],
				encounterValue: 0,
				size: FactoryLogic.createSize(1, 'M'),
				speed: FactoryLogic.createSpeed(5),
				stamina: 5,
				freeStrikeDamage: 2,
				characteristics: MonsterLogic.createCharacteristics(0, 0, 0, 0, 0),
				features: []
			}));
			setElement(copy);
			setDirty(true);
		};

		const moveMonster = (monster: Monster, direction: 'up' | 'down') => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			const index = copy.monsters.findIndex(m => m.id ===  monster.id);
			copy.monsters = Collections.move(copy.monsters, index, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteMonster = (monster: Monster) => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
			copy.monsters = copy.monsters.filter(m => m.id !== monster.id);
			setElement(copy);
			if (subElementID === monster.id) {
				navigation.goToLibraryEdit(sourcebookID!, kind!, elementID!);
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
								<Button key='edit' type='text' icon={<EditOutlined />} onClick={e => { e.stopPropagation(); navigation.goToLibraryEdit(sourcebookID!, kind!, elementID!, m.id); }} />,
								<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveMonster(m, 'up'); }} />,
								<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveMonster(m, 'down'); }} />,
								<DangerButton key='delete' mode='icon' onConfirm={e => { e.stopPropagation(); deleteMonster(m); }} />
							]}
						>
							<MonsterPanel
								monster={m}
								monsterGroup={monsterGroup}
								mode={PanelMode.Compact}
							/>
						</Expander>
					))
				}
				{
					monsterGroup.monsters.length === 0 ?
						<Alert
							type='warning'
							showIcon={true}
							message='No monsters'
						/>
						: null
				}
				<Button block={true} onClick={addMonster}>Add a new monster</Button>
			</Space>
		);
	};

	const getMonsterEditSection = () => {
		const monsterGroup = element as MonsterGroup;
		const monster = monsterGroup.monsters.find(m => m.id === subElementID) as Monster;

		const changeMonster = (monster: Monster) => {
			const copy = JSON.parse(JSON.stringify(monsterGroup)) as MonsterGroup;
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
				sourcebooks={props.sourcebooks}
				similarMonsters={showSimilarMonsters ? getSimilarMonsters(monster) : []}
				onChange={changeMonster}
			/>
		);
	};

	const getSimilarMonsters = (monster: Monster) => {
		return props.sourcebooks
			.flatMap(sb => sb.monsterGroups)
			.flatMap(mg => mg.monsters)
			.filter(m => m.id !== monster.id)
			.filter(m => !similarLevel || (m.level === monster.level))
			.filter(m => !similarRole || (m.role.type === monster.role.type))
			.filter(m => !similarOrganization || (m.role.organization === monster.role.organization));
	};

	const getSimilarMonstersSection = (monster: Monster) => {
		const monsters = getSimilarMonsters(monster);

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					monsters.length > 0 ?
						<Toggle label='Show data from this list in the monster builder' value={showSimilarMonsters} onChange={setShowSimilarMonsters} />
						: null
				}
				<Expander title='Similarity'>
					<Toggle label={`Match level (${monster.level})`} value={similarLevel} onChange={setSimilarLevel} />
					<Toggle label={`Match role (${monster.role.type})`} value={similarRole} onChange={setSimilarRole} />
					<Toggle label={`Match organization (${monster.role.organization})`} value={similarOrganization} onChange={setSimilarOrganization} />
				</Expander>
				{
					monsters.map(m => {
						const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, m.id);
						if (!monsterGroup) {
							return null;
						}

						return (
							<SelectablePanel key={m.id} onSelect={() => props.showMonster(m.id)}>
								<MonsterPanel
									monster={m}
									monsterGroup={monsterGroup}
									mode={PanelMode.Compact}
								/>
							</SelectablePanel>
						);
					})
				}
				{
					monsters.length === 0 ?
						<Alert
							type='warning'
							showIcon={true}
							message='No similar monsters.'
						/>
						: null
				}
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
								value={subElementID || ''}
								onChange={id => navigation.goToLibraryEdit(sourcebookID!, kind!, elementID!, id)}
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
								value={subElementID || ''}
								onChange={id => navigation.goToLibraryEdit(sourcebookID!, kind!, elementID!, id)}
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
								children: getKitEditSection()
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
							const copy = JSON.parse(JSON.stringify(perk)) as Perk;
							setElement(copy);
							setDirty(true);
						}}
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
				if (!subElementID) {
					return (
						<div className='preview-header-section'>
							<Button icon={<LeftOutlined />} onClick={() => navigation.goToLibraryEdit(sourcebookID!, kind!, elementID!)}>Back to Class</Button>
						</div>
					);
				}
				break;
			case 'monster-group':
				if (!subElementID) {
					return (
						<div className='preview-header-section'>
							<Button icon={<LeftOutlined />} onClick={() => navigation.goToLibraryEdit(sourcebookID!, kind!, elementID!)}>Back to Monster Group</Button>
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
						<AncestryPanel ancestry={element as Ancestry} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'culture':
				return (
					<SelectablePanel>
						<CulturePanel culture={element as Culture} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'career':
				return (
					<SelectablePanel>
						<CareerPanel career={element as Career} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'class':
				if (!subElementID) {
					return (
						<SelectablePanel>
							<ClassPanel heroClass={element as HeroClass} mode={PanelMode.Full} />
						</SelectablePanel>
					);
				} else {
					return (
						<SelectablePanel>
							<SubclassPanel subclass={element as SubClass} mode={PanelMode.Full} />
						</SelectablePanel>
					);
				}
			case 'complication':
				return (
					<SelectablePanel>
						<ComplicationPanel complication={element as Complication} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'domain':
				return (
					<SelectablePanel>
						<DomainPanel domain={element as Domain} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'kit':
				return (
					<SelectablePanel>
						<KitPanel kit={element as Kit} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'perk':
				return (
					<SelectablePanel>
						<PerkPanel perk={element as Perk} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'title':
				return (
					<SelectablePanel>
						<TitlePanel title={element as Title} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'item':
				return (
					<>
						<SelectablePanel>
							<ItemPanel item={element as Item} mode={PanelMode.Full} />
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
							<MonsterGroupPanel monsterGroup={element as MonsterGroup} mode={PanelMode.Full} />
						</SelectablePanel>
					);
				} else {
					const monsterGroup = element as MonsterGroup;
					const monster = monsterGroup.monsters.find(m => m.id === subElementID) as Monster;
					return (
						<Tabs
							items={[
								{
									key: '1',
									label: 'Preview',
									children: (
										<SelectablePanel>
											<MonsterPanel monster={monster} monsterGroup={monsterGroup} />
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
				}
		}

		return null;
	};

	try {
		let editing = Format.capitalize(kind!);
		if (kind === 'class') {
			if (subElementID) {
				editing = 'Subclass';
			}
		}
		if (kind === 'monster-group') {
			editing = 'Monster Group';
			if (subElementID) {
				editing = 'Monster';
			}
		}

		return (
			<div className='library-edit-page'>
				<AppHeader breadcrumbs={[ { label: `${editing} Builder` } ]} showAbout={props.showAbout}>
					<Button type='primary' disabled={!dirty} onClick={() => props.saveChanges(sourcebookID!, kind!, element)}>
						Save Changes
					</Button>
					<Button onClick={() => navigation.goToLibraryList(kind!)}>
						Cancel
					</Button>
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
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
