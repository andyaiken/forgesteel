import { Button, Divider, Input, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { EnvironmentData, OrganizationData, UpbringingData } from '../../../../data/culture-data';
import { KitArmor, KitImplement, KitType, KitWeapon } from '../../../../enums/kit';
import { Ability } from '../../../../models/ability';
import { AbilityDistanceType } from '../../../../enums/abiity-distance-type';
import { AbilityEditPanel } from '../../../panels/ability-edit-panel/ability-edit-panel';
import { AbilityLogic } from '../../../../logic/ability-logic';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryPanel } from '../../../panels/ancestry-panel/ancestry-panel';
import { AppHeader } from '../../../panels/app-header/app-header';
import { CampaignSetting } from '../../../../models/campaign-setting';
import { Career } from '../../../../models/career';
import { CareerPanel } from '../../../panels/career-panel/career-panel';
import { Characteristic } from '../../../../enums/characteristic';
import { ClassPanel } from '../../../panels/class-panel/class-panel';
import { Collections } from '../../../../utils/collections';
import { Complication } from '../../../../models/complication';
import { ComplicationPanel } from '../../../panels/complication-panel/complication-panel';
import { Culture } from '../../../../models/culture';
import { CulturePanel } from '../../../panels/culture-panel/culture-panel';
import { Domain } from '../../../../models/domain';
import { DomainPanel } from '../../../panels/domain-panel/domain-panel';
import { Element } from '../../../../models/element';
import { ElementEditPanel } from '../../../panels/element-edit-panel/element-edit-panel';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { Feature } from '../../../../models/feature';
import { FeatureEditPanel } from '../../../panels/feature-edit-panel/feature-edit-panel';
import { FeatureLogic } from '../../../../logic/feature-logic';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { HeroClass } from '../../../../models/class';
import { Item } from '../../../../models/item';
import { ItemPanel } from '../../../panels/item-panel/item-panel';
import { Kit } from '../../../../models/kit';
import { KitPanel } from '../../../panels/kit-panel/kit-panel';
import { LanguageData } from '../../../../data/language-data';
import { NameGenerator } from '../../../../utils/name-generator';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { PanelMode } from '../../../../enums/panel-mode';
import { Perk } from '../../../../models/perk';
import { PerkPanel } from '../../../panels/perk-panel/perk-panel';
import { PerkType } from '../../../../enums/perk-type';
import { SubClass } from '../../../../models/subclass';
import { Toggle } from '../../../controls/toggle/toggle';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './element-edit.scss';

interface Props {
	element: Element;
	elementType: string;
	campaignSettings: CampaignSetting[];
	goHome: () => void;
	showAbout: () => void;
	saveChanges: (element: Element) => void;
	cancelChanges: () => void;
}

export const ElementEditPage = (props: Props) => {
	const [ element, setElement ] = useState<Element>(JSON.parse(JSON.stringify(props.element)));
	const [ dirty, setDirty ] = useState<boolean>(false);

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Element;
			elementCopy.name = value;
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
				<Input.TextArea
					placeholder='Description'
					allowClear={true}
					rows={6}
					value={element.description}
					onChange={e => setDescription(e.target.value)}
				/>
			</Space>
		);
	};

	const getFeaturesEditSection = () => {
		const el = element as Ancestry | Career | Complication | Kit | Perk | Item;

		const addFeature = () => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Ancestry | Career | Complication | Kit | Perk | Item;
			elementCopy.features.push(FeatureLogic.createFeature({
				id: Utils.guid(),
				name: '',
				description: ''
			}));
			setElement(elementCopy);
			setDirty(true);
		};

		const changeFeature = (feature: Feature) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Ancestry | Career | Complication | Kit | Perk | Item;
			const index = elementCopy.features.findIndex(f => f.id === feature.id);
			if (index !== -1) {
				elementCopy.features[index] = feature;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Ancestry | Career | Complication | Kit | Perk | Item;
			const index = elementCopy.features.findIndex(f => f.id === feature.id);
			elementCopy.features = Collections.move(elementCopy.features, index, direction);
			setElement(elementCopy);
			setDirty(true);
		};

		const deleteFeature = (feature: Feature) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Ancestry | Career | Complication | Kit | Perk | Item;
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
								{
									title: 'Move Up',
									icon: <CaretUpOutlined />,
									onClick: () => moveFeature(f, 'up')
								},
								{
									title: 'Move Down',
									icon: <CaretDownOutlined />,
									onClick: () => moveFeature(f, 'down')
								}
							]}
						>
							<FeatureEditPanel
								feature={f}
								campaignSettings={props.campaignSettings}
								onChange={changeFeature}
								onDelete={deleteFeature}
							/>
						</Expander>
					))
				}
				{
					el.features.length === 0 ?
						<div className='ds-text dimmed-text'>None</div>
						: null
				}
				<Button block={true} onClick={addFeature}>Add a new feature</Button>
			</Space>
		);
	};

	const getTitleEditSection = () => {
		const career = element as Career;

		const changeFeature = (feature: Feature) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Career;
			elementCopy.title = feature;
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<FeatureEditPanel
				feature={career.title}
				campaignSettings={props.campaignSettings}
				onChange={changeFeature}
			/>
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
						<Expander key={o.id} title={o.name || 'Unnamed Incident'}>
							<ElementEditPanel
								element={o}
								onChange={changeIncident}
								onDelete={deleteIncident}
							/>
						</Expander>
					))
				}
				{
					career.incitingIncidents.options.length === 0 ?
						<div className='ds-text dimmed-text'>None</div>
						: null
				}
				<Button block={true} onClick={addIncident}>Add a new incident</Button>
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
					options={LanguageData.getLanguages(props.campaignSettings).map(l => ({ label: l.name, value: l.name, desc: l.description }))}
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

	const getClassLevelsEditSection = () => {
		const heroClass = element as HeroClass;

		const addFeature = (level: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
			elementCopy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					lvl.features.push(FeatureLogic.createFeature({
						id: Utils.guid(),
						name: '',
						description: ''
					}));
				});
			setElement(elementCopy);
			setDirty(true);
		};

		const changeFeature = (level: number, feature: Feature) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
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
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
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
			const elementCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
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
							{
								lvl.features.map(f => (
									<Expander
										key={f.id}
										title={f.name || 'Unnamed Feature'}
										extra={[
											{
												title: 'Move Up',
												icon: <CaretUpOutlined />,
												onClick: () => moveFeature(lvl.level, f, 'up')
											},
											{
												title: 'Move Down',
												icon: <CaretDownOutlined />,
												onClick: () => moveFeature(lvl.level, f, 'down')
											}
										]}
									>
										<FeatureEditPanel
											feature={f}
											campaignSettings={props.campaignSettings}
											onChange={feature => changeFeature(lvl.level, feature)}
											onDelete={feature => deleteFeature(lvl.level, feature)}
										/>
									</Expander>
								))
							}
							<Button block={true} onClick={() => addFeature(lvl.level)}>Add a new level {lvl.level} feature</Button>
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
			elementCopy.abilities.push(AbilityLogic.createAbility({
				id: Utils.guid(),
				name: '',
				description: '',
				type: AbilityLogic.createTypeAction(),
				keywords: [],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
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
						<Expander key={a.id} title={a.name || 'Unnamed Ability'}>
							<AbilityEditPanel
								ability={a}
								onChange={changeAbility}
								onDelete={deleteAbility}
							/>
						</Expander>
					))
				}
				{
					heroClass.abilities.length === 0 ?
						<div className='ds-text dimmed-text'>None</div>
						: null
				}
				<Button block={true} onClick={addAbility}>Add a new ability</Button>
			</Space>
		);
	};

	const getClassSubclassesEditSection = () => {
		const heroClass = element as HeroClass;

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
						lvl.features.push(FeatureLogic.createFeature({
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

		const addSubclass = () => {
			const classCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
			classCopy.subclasses.push(FactoryLogic.createSubclass());
			setElement(classCopy);
			setDirty(true);
		};

		const deleteSubclass = (e: SubClass) => {
			const classCopy = JSON.parse(JSON.stringify(element)) as HeroClass;
			classCopy.subclasses = classCopy.subclasses.filter(o => o.id !== e.id);
			setElement(classCopy);
			setDirty(true);
		};

		const getSubclassLevels = (subclass: SubClass) => {
			return subclass.featuresByLevel.map(lvl => (
				<div key={lvl.level}>
					<HeaderText>Level {lvl.level.toString()}</HeaderText>
					{
						lvl.features.map(f => (
							<Expander
								key={f.id}
								title={f.name || 'Unnamed Feature'}
								extra={[
									{
										title: 'Move Up',
										icon: <CaretUpOutlined />,
										onClick: () => moveFeature(subclass, lvl.level, f, 'up')
									},
									{
										title: 'Move Down',
										icon: <CaretDownOutlined />,
										onClick: () => moveFeature(subclass, lvl.level, f, 'down')
									}
								]}
							>
								<FeatureEditPanel
									feature={f}
									campaignSettings={props.campaignSettings}
									onChange={feature => changeFeature(subclass, lvl.level, feature)}
									onDelete={feature => deleteFeature(subclass, lvl.level, feature)}
								/>
							</Expander>
						))
					}
					<Button block={true} onClick={() => addFeature(subclass, lvl.level)}>Add a new level {lvl.level} feature</Button>
				</div>
			));
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					heroClass.subclasses.map(sc => (
						<Expander key={sc.id} title={sc.name || 'Unnamed Subclass'}>
							<Tabs
								items={[
									{
										key: '1',
										label: 'Element',
										children: (
											<div>
												<HeaderText>Name</HeaderText>
												<Input
													className={sc.name === '' ? 'input-empty' : ''}
													placeholder='Name'
													allowClear={true}
													value={sc.name}
													onChange={e => setName(sc, e.target.value)}
												/>
												<HeaderText>Description</HeaderText>
												<Input.TextArea
													placeholder='Description'
													allowClear={true}
													rows={6}
													value={sc.description}
													onChange={e => setDescription(sc, e.target.value)}
												/>
											</div>
										)
									},
									{
										key: '2',
										label: 'Levels',
										children: getSubclassLevels(sc)
									}
								]}
							/>
							<Divider />
							<Button block={true} danger={true} onClick={() => deleteSubclass(sc)}>Delete</Button>
						</Expander>
					))
				}
				{
					heroClass.subclasses.length === 0 ?
						<div className='ds-text dimmed-text'>None</div>
						: null
				}
				<Button block={true} onClick={addSubclass}>Add a new subclass</Button>
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

		const setImplement = (value: KitImplement[]) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			elementCopy.implement = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setMobility = (value: boolean) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			elementCopy.mobility = value;
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Type</HeaderText>
				<Select
					style={{ width: '100%' }}
					placeholder='Select type'
					options={[ KitType.Martial, KitType.Caster, KitType.Stormwight ].map(l => ({ value: l }))}
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
				<HeaderText>Implements</HeaderText>
				<Select
					style={{ width: '100%' }}
					className={kit.implement.length === 0 ? 'selection-empty' : ''}
					mode='multiple'
					allowClear={true}
					placeholder='Select implement'
					options={[ KitImplement.Bone, KitImplement.Crystal, KitImplement.Glass, KitImplement.Metal, KitImplement.Stone, KitImplement.Wood ].map(option => ({ value: option }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={kit.implement}
					onChange={setImplement}
				/>
				<HeaderText>Mobility</HeaderText>
				<Toggle label='Mobility' value={kit.mobility} onChange={setMobility} />
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

		const setDistance = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			elementCopy.distance = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setReach = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			elementCopy.reach = value;
			setElement(elementCopy);
			setDirty(true);
		};

		const setArea = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			elementCopy.area = value;
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
					min={0}
					value={kit.distance}
					onChange={setDistance}
				/>
				<HeaderText>Reach</HeaderText>
				<NumberSpin
					min={0}
					value={kit.reach}
					onChange={setReach}
				/>
				<HeaderText>Area</HeaderText>
				<NumberSpin
					min={0}
					value={kit.area}
					onChange={setArea}
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

		const setMagicalDamage = (value: boolean) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			elementCopy.magicalDamage = value ? { tier1: 0, tier2: 0, tier3: 0 } : null;
			setElement(elementCopy);
			setDirty(true);
		};

		const setMagicalDamage1 = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			if (elementCopy.magicalDamage) {
				elementCopy.magicalDamage.tier1 = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setMagicalDamage2 = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			if (elementCopy.magicalDamage) {
				elementCopy.magicalDamage.tier2 = value;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const setMagicalDamage3 = (value: number) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Kit;
			if (elementCopy.magicalDamage) {
				elementCopy.magicalDamage.tier3 = value;
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
				<HeaderText>Magical Damage</HeaderText>
				<Toggle label='Magical damage' value={!!kit.magicalDamage} onChange={setMagicalDamage} />
				{kit.magicalDamage ? <NumberSpin label='Tier 1' min={0} value={kit.magicalDamage.tier1} onChange={setMagicalDamage1} /> : null}
				{kit.magicalDamage ? <NumberSpin label='Tier 2' min={0} value={kit.magicalDamage.tier2} onChange={setMagicalDamage2} /> : null}
				{kit.magicalDamage ? <NumberSpin label='Tier 3' min={0} value={kit.magicalDamage.tier3} onChange={setMagicalDamage3} /> : null}
			</Space>
		);
	};

	const getPerkEditSection = () => {
		const perk = element as Perk;

		const setType = (value: PerkType) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Perk;
			elementCopy.type = value;
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Type</HeaderText>
				<Select
					style={{ width: '100%' }}
					placeholder='Select type'
					options={[ PerkType.Crafting, PerkType.Exploration, PerkType.Interpersonal, PerkType.Intrigue, PerkType.Lore, PerkType.Supernatural ].map(l => ({ value: l }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={perk.type}
					onChange={setType}
				/>
			</Space>
		);
	};

	const getEditSection = () => {
		switch (props.elementType) {
			case 'Ancestry':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Element',
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
			case 'Culture':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Element',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Culture',
								children: getCultureEditSection()
							}
						]}
					/>
				);
			case 'Career':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Element',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Features',
								children: getFeaturesEditSection()
							},
							{
								key: '3',
								label: 'Title',
								children: getTitleEditSection()
							},
							{
								key: '4',
								label: 'Inciting Incidents',
								children: getIncitingIncidentsSection()
							}
						]}
					/>
				);
			case 'Class':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Element',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Class',
								children: getClassEditSection()
							},
							{
								key: '3',
								label: 'Levels',
								children: getClassLevelsEditSection()
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
			case 'Complication':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Element',
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
			case 'Domain':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Element',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Levels',
								children: getClassLevelsEditSection()
							}
						]}
					/>
				);
			case 'Kit':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Element',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Kit',
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
			case 'Perk':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Element',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Perk',
								children: getPerkEditSection()
							},
							{
								key: '3',
								label: 'Features',
								children: getFeaturesEditSection()
							}
						]}
					/>
				);
			case 'Item':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Element',
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
		}

		return null;
	};

	const getPreview = () => {
		switch (props.elementType) {
			case 'Ancestry':
				return <AncestryPanel ancestry={element as Ancestry} mode={PanelMode.Full} />;
			case 'Culture':
				return <CulturePanel culture={element as Culture} mode={PanelMode.Full} />;
			case 'Career':
				return <CareerPanel career={element as Career} mode={PanelMode.Full} />;
			case 'Class':
				return <ClassPanel heroClass={element as HeroClass} mode={PanelMode.Full} />;
			case 'Complication':
				return <ComplicationPanel complication={element as Complication} mode={PanelMode.Full} />;
			case 'Domain':
				return <DomainPanel domain={element as Domain} mode={PanelMode.Full} />;
			case 'Kit':
				return <KitPanel kit={element as Kit} mode={PanelMode.Full} />;
			case 'Perk':
				return <PerkPanel perk={element as Perk} mode={PanelMode.Full} />;
			case 'Item':
				return <ItemPanel item={element as Item} mode={PanelMode.Full} />;
		}

		return null;
	};

	try {
		return (
			<div className='element-edit-page'>
				<AppHeader goHome={props.goHome} showAbout={props.showAbout}>
					<Button type='primary' disabled={!dirty} onClick={() => props.saveChanges(element)}>
						Save Changes
					</Button>
					<Button onClick={() => props.cancelChanges()}>
						Cancel
					</Button>
				</AppHeader>
				<div className='element-edit-page-content'>
					<div className='edit-column'>
						{getEditSection()}
					</div>
					<div className='preview-column'>
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
