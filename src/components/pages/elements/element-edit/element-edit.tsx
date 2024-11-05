import { Button, Divider, Input, Segmented, Select, Space, Tabs } from 'antd';
import { EnvironmentData, OrganizationData, UpbringingData } from '../../../../data/culture-data';
import { Feature, FeatureAbilityCostData, FeatureAbilityData, FeatureBonusData, FeatureChoiceData, FeatureClassAbilityData, FeatureDamageModifierData, FeatureData, FeatureDomainData, FeatureDomainFeatureData, FeatureKitData, FeatureLanguageData, FeatureMultipleData, FeatureSizeData, FeatureSkillChoiceData, FeatureSkillData } from '../../../../models/feature';
import { KitArmor, KitImplement, KitType, KitWeapon } from '../../../../enums/kit';
import { Ability } from '../../../../models/ability';
import { AbilityDistanceType } from '../../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../../enums/ability-keyword';
import { AbilityLogic } from '../../../../logic/ability-logic';
import { AbilityUsage } from '../../../../enums/ability-usage';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryPanel } from '../../../panels/ancestry-panel/ancestry-panel';
import { AppHeader } from '../../../panels/app-header/app-header';
import { CampaignSetting } from '../../../../models/campaign-setting';
import { Career } from '../../../../models/career';
import { CareerPanel } from '../../../panels/career-panel/career-panel';
import { Characteristic } from '../../../../enums/characteristic';
import { ClassPanel } from '../../../panels/class-panel/class-panel';
import { Complication } from '../../../../models/complication';
import { ComplicationPanel } from '../../../panels/complication-panel/complication-panel';
import { Culture } from '../../../../models/culture';
import { CulturePanel } from '../../../panels/culture-panel/culture-panel';
import { DamageModifierType } from '../../../../enums/damage-modifier-type';
import { Domain } from '../../../../models/domain';
import { DomainPanel } from '../../../panels/domain-panel/domain-panel';
import { Element } from '../../../../models/element';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { FeatureField } from '../../../../enums/feature-field';
import { FeatureLogic } from '../../../../logic/feature-logic';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { HeroClass } from '../../../../models/class';
import { Kit } from '../../../../models/kit';
import { KitPanel } from '../../../panels/kit-panel/kit-panel';
import { LanguageData } from '../../../../data/language-data';
import { NameGenerator } from '../../../../utils/name-generator';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { PanelMode } from '../../../../enums/panel-mode';
import { SkillData } from '../../../../data/skill-data';
import { SkillList } from '../../../../enums/skill-list';
import { SubClass } from '../../../../models/subclass';
import { ThunderboltOutlined } from '@ant-design/icons';
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
		const el = element as Ancestry | Career | Kit | Complication;

		const addFeature = () => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Ancestry | Career | Kit | Complication;
			elementCopy.features.push(FeatureLogic.createFeature({
				id: Utils.guid(),
				name: '',
				description: ''
			}));
			setElement(elementCopy);
			setDirty(true);
		};

		const changeFeature = (feature: Feature) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Ancestry | Career | Kit | Complication;
			const index = elementCopy.features.findIndex(f => f.id === feature.id);
			if (index !== -1) {
				elementCopy.features[index] = feature;
			}
			setElement(elementCopy);
			setDirty(true);
		};

		const deleteFeature = (feature: Feature) => {
			const elementCopy = JSON.parse(JSON.stringify(element)) as Ancestry | Career | Kit | Complication;
			elementCopy.features = elementCopy.features.filter(f => f.id !== feature.id);
			setElement(elementCopy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					el.features.map(f => (
						<Expander key={f.id} title={f.name || 'Unnamed Feature'}>
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
					placeholder='Heroic resource'
					allowClear={true}
					value={heroClass.heroicResource}
					onChange={e => setHeroicResource(e.target.value)}
				/>
				<HeaderText>Subclass Name</HeaderText>
				<Input
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
									<Expander key={f.id} title={f.name || 'Unnamed Feature'}>
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
							<Expander key={f.id} title={f.name || 'Unnamed Feature'}>
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
							<HeaderText>Name</HeaderText>
							<Input
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
							{getSubclassLevels(sc)}
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
			case 'Domain':
				return <DomainPanel domain={element as Domain} mode={PanelMode.Full} />;
			case 'Kit':
				return <KitPanel kit={element as Kit} mode={PanelMode.Full} />;
			case 'Complication':
				return <ComplicationPanel complication={element as Complication} mode={PanelMode.Full} />;
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

interface ElementEditPanelProps {
	element: Element;
	onChange: (element: Element) => void;
	onDelete?: (element: Element) => void;
}

const ElementEditPanel = (props: ElementEditPanelProps) => {
	const [ element, setElement ] = useState<Element>(props.element);

	const setName = (value: string) => {
		const copy = JSON.parse(JSON.stringify(element)) as Feature;
		copy.name = value;
		setElement(copy);
		props.onChange(copy);
	};

	const setDescription = (value: string) => {
		const copy = JSON.parse(JSON.stringify(element)) as Feature;
		copy.description = value;
		setElement(copy);
		props.onChange(copy);
	};

	const deleteElement = () => {
		if (props.onDelete) {
			props.onDelete(element);
		}
	};

	try {
		return (
			<div className='element-edit-panel'>
				<HeaderText>Name</HeaderText>
				<Input
					placeholder='Name'
					allowClear={true}
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
				<Divider />
				{props.onDelete ? <Button block={true} danger={true} onClick={deleteElement}>Delete</Button> : null}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};

interface FeatureEditPanelProps {
	feature: Feature;
	campaignSettings: CampaignSetting[];
	onChange: (feature: Feature) => void;
	onDelete?: (feature: Feature) => void;
}

const FeatureEditPanel = (props: FeatureEditPanelProps) => {
	const [ feature, setFeature ] = useState<Feature>(props.feature);

	const setName = (value: string) => {
		const copy = JSON.parse(JSON.stringify(feature)) as Feature;
		copy.name = value;
		setFeature(copy);
		props.onChange(copy);
	};

	const setDescription = (value: string) => {
		const copy = JSON.parse(JSON.stringify(feature)) as Feature;
		copy.description = value;
		setFeature(copy);
		props.onChange(copy);
	};

	const setType = (value: FeatureType) => {
		let data: FeatureData | null;
		switch (value) {
			case FeatureType.Ability:
				data = {
					ability: AbilityLogic.createAbility({
						id: Utils.guid(),
						name: '',
						description: '',
						type: AbilityLogic.createTypeAction(),
						keywords: [],
						distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
						target: ''
					})
				};
				break;
			case FeatureType.AbilityCost:
				data = {
					keywords: [],
					modifier: -1
				};
				break;
			case FeatureType.Bonus:
				data = {
					field: FeatureField.Recoveries,
					value: 0,
					valuePerLevel: 0
				};
				break;
			case FeatureType.Choice:
				data = {
					options: [],
					count: 1,
					selected: []
				};
				break;
			case FeatureType.ClassAbility:
				data = {
					cost: 1,
					count: 1,
					selectedIDs: []
				};
				break;
			case FeatureType.DamageModifier:
				data = {
					modifiers: []
				};
				break;
			case FeatureType.Domain:
				data = {
					count: 1,
					selected: []
				};
				break;
			case FeatureType.DomainFeature:
				data = {
					level: 1,
					count: 1,
					selected: []
				};
				break;
			case FeatureType.Kit:
				data = {
					types: [],
					count: 1,
					selected: []
				};
				break;
			case FeatureType.KitType:
				data = {
					types: []
				};
				break;
			case FeatureType.Language:
				data = {
					options: [],
					count: 1,
					selected: []
				};
				break;
			case FeatureType.Multiple:
				data = {
					features: []
				};
				break;
			case FeatureType.Size:
				data = {
					size: {
						value: 1,
						mod: 'M'
					}
				};
				break;
			case FeatureType.Skill:
				data = {
					skill: ''
				};
				break;
			case FeatureType.SkillChoice:
				data = {
					options: [],
					listOptions: [],
					count: 1,
					selected: []
				};
				break;
			case FeatureType.Text:
				data = null;
				break;
		}

		const copy = JSON.parse(JSON.stringify(feature)) as Feature;
		copy.type = value;
		copy.data = data;
		setFeature(copy);
		props.onChange(copy);
	};

	const setData = (value: FeatureData) => {
		const copy = JSON.parse(JSON.stringify(feature)) as Feature;
		copy.data = value;
		setFeature(copy);
		props.onChange(copy);
	};

	const deleteFeature = () => {
		if (props.onDelete) {
			props.onDelete(feature);
		}
	};

	const getDataSection = () => {
		const setCount = (value: number) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureChoiceData | FeatureClassAbilityData | FeatureDomainData | FeatureDomainFeatureData | FeatureKitData | FeatureLanguageData | FeatureSkillChoiceData;
			copy.count = value;
			setData(copy);
		};

		const setLevel = (value: number) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureDomainFeatureData;
			copy.level = value;
			setData(copy);
		};

		const setValue = (value: number) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureBonusData;
			copy.value = value;
			setData(copy);
		};

		const setValuePerLevel = (value: number) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureBonusData;
			copy.valuePerLevel = value;
			setData(copy);
		};

		const setCost = (value: number) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureClassAbilityData;
			copy.cost = value;
			setData(copy);
		};

		const setSizeValue = (value: number) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureSizeData;
			copy.size.value = value;
			setData(copy);
		};

		const setSizeMod = (value: string) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureSizeData;
			copy.size.mod = value;
			setData(copy);
		};

		const setField = (value: FeatureField) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureBonusData;
			copy.field = value;
			setData(copy);
		};

		const setKitTypes = (value: KitType[]) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureKitData;
			copy.types = value;
			setData(copy);
		};

		const setLanguageOptions = (value: string[]) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureLanguageData;
			copy.options = value;
			setData(copy);
		};

		const setSkillOptions = (value: string[]) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureSkillChoiceData;
			copy.options = value;
			setData(copy);
		};

		const setSkillListOptions = (value: SkillList[]) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureSkillChoiceData;
			copy.listOptions = value;
			setData(copy);
		};

		const setSkill = (value: string) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureSkillData;
			copy.skill = value;
			setData(copy);
		};

		const setAbility = (value: Ability) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureAbilityData;
			copy.ability = value;
			setData(copy);
		};

		const setKeywords = (value: AbilityKeyword[]) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureAbilityCostData;
			copy.keywords = value;
			setData(copy);
		};

		const setModifier = (value: number) => {
			const copy = JSON.parse(JSON.stringify(feature.data)) as FeatureAbilityCostData;
			copy.modifier = value;
			setData(copy);
		};

		const addChoice = (data: FeatureChoiceData) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureChoiceData;
			copy.options.push({
				feature: FeatureLogic.createFeature({
					id: Utils.guid(),
					name: '',
					description: ''
				}),
				value: 1
			});
			setData(copy);
		};

		const deleteChoice = (data: FeatureChoiceData, index: number) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureChoiceData;
			copy.options.splice(index);
			setData(copy);
		};

		const setChoiceFeature = (data: FeatureChoiceData, index: number, value: Feature) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureChoiceData;
			copy.options[index].feature = value;
			setData(copy);
		};

		const setChoiceValue = (data: FeatureChoiceData, index: number, value: number) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureChoiceData;
			copy.options[index].value = value;
			setData(copy);
		};

		const addDamageModifier = (data: FeatureDamageModifierData) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureDamageModifierData;
			copy.modifiers.push({
				damageType: 'Fire',
				type: DamageModifierType.Immunity,
				value: 0,
				valuePerLevel: 0
			});
			setData(copy);
		};

		const deleteDamageModifier = (data: FeatureDamageModifierData, index: number) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureDamageModifierData;
			copy.modifiers.splice(index);
			setData(copy);
		};

		const setDamageModifierDamageType = (data: FeatureDamageModifierData, index: number, value: string) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureDamageModifierData;
			copy.modifiers[index].damageType = value;
			setData(copy);
		};

		const setDamageModifierType = (data: FeatureDamageModifierData, index: number, value: DamageModifierType) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureDamageModifierData;
			copy.modifiers[index].type = value;
			setData(copy);
		};

		const setDamageModifierValue = (data: FeatureDamageModifierData, index: number, value: number) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureDamageModifierData;
			copy.modifiers[index].value = value;
			setData(copy);
		};

		const setDamageModifierValuePerLevel = (data: FeatureDamageModifierData, index: number, value: number) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureDamageModifierData;
			copy.modifiers[index].valuePerLevel = value;
			setData(copy);
		};

		const addMultipleFeature = (data: FeatureMultipleData) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureMultipleData;
			copy.features.push(FeatureLogic.createFeature({
				id: Utils.guid(),
				name: '',
				description: ''
			}));
			setData(copy);
		};

		const deleteMultipleFeature = (data: FeatureMultipleData, index: number) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureMultipleData;
			copy.features.splice(index);
			setData(copy);
		};

		const setMultipleFeature = (data: FeatureMultipleData, index: number, value: Feature) => {
			const copy = JSON.parse(JSON.stringify(data)) as FeatureMultipleData;
			copy.features[index] = value;
			setData(copy);
		};

		switch (feature.type) {
			case FeatureType.Ability: {
				const data = feature.data as FeatureAbilityData;
				return (
					<Expander title={data.ability.name || 'Unnamed Ability'}>
						<AbilityEditPanel
							ability={data.ability}
							onChange={setAbility}
						/>
					</Expander>
				);
			}
			case FeatureType.AbilityCost: {
				const data = feature.data as FeatureAbilityCostData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Field</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Select keywords'
							mode='multiple'
							allowClear={true}
							options={[ AbilityKeyword.Animal, AbilityKeyword.Area, AbilityKeyword.Attack, AbilityKeyword.Charge, AbilityKeyword.Earth, AbilityKeyword.Fire, AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Persistent, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Resistance, AbilityKeyword.Void, AbilityKeyword.Weapon ].map(o => ({ value: o }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							value={data.keywords}
							onChange={setKeywords}
						/>
						<HeaderText>Modifier</HeaderText>
						<NumberSpin value={data.modifier} onChange={setModifier} />
					</Space>
				);
			}
			case FeatureType.Bonus: {
				const data = feature.data as FeatureBonusData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Field</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Select field'
							options={[ FeatureField.ProjectPoints, FeatureField.Recoveries, FeatureField.RecoveryValue, FeatureField.Renown, FeatureField.Speed, FeatureField.Stability, FeatureField.Stamina ].map(o => ({ value: o }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							value={data.field}
							onChange={setField}
						/>
						<HeaderText>Value</HeaderText>
						<NumberSpin min={0} value={data.value} onChange={setValue} />
						<HeaderText>Value Per Level</HeaderText>
						<NumberSpin min={0} value={data.valuePerLevel} onChange={setValuePerLevel} />
					</Space>
				);
			}
			case FeatureType.Choice: {
				const data = feature.data as FeatureChoiceData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Options</HeaderText>
						{
							data.options.map((option, n) => (
								<Expander key={n} title={option.feature.name || 'Unnamed Feature'}>
									<FeatureEditPanel
										feature={option.feature}
										campaignSettings={props.campaignSettings}
										onChange={f => setChoiceFeature(data, n, f)}
										onDelete={() => deleteChoice(data, n)}
									/>
									<NumberSpin min={1} value={option.value} onChange={value => setChoiceValue(data, n, value)} />
								</Expander>
							))
						}
						<Button block={true} onClick={() => addChoice(data)}>Add an option</Button>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.ClassAbility: {
				const data = feature.data as FeatureClassAbilityData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Cost</HeaderText>
						<NumberSpin min={1} value={data.cost} onChange={setCost} />
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.DamageModifier: {
				const data = feature.data as FeatureDamageModifierData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Modifiers</HeaderText>
						{
							data.modifiers.map((mod, n) => (
								<Expander key={n} title='Damage Modifier'>
									<Input
										placeholder='Damage type'
										allowClear={true}
										value={mod.damageType}
										onChange={e => setDamageModifierDamageType(data, n, e.target.value)}
									/>
									<Select
										style={{ width: '100%' }}
										placeholder='Modifier type'
										options={[ DamageModifierType.Immunity, DamageModifierType.Weakness ].map(o => ({ value: o }))}
										optionRender={option => <div className='ds-text'>{option.data.value}</div>}
										value={mod.type}
										onChange={value => setDamageModifierType(data, n, value)}
									/>
									<NumberSpin min={0} value={mod.value} onChange={value => setDamageModifierValue(data, n, value)} />
									<NumberSpin min={0} value={mod.valuePerLevel} onChange={value => setDamageModifierValuePerLevel(data, n, value)} />
									<Button block={true} danger={true} onClick={() => deleteDamageModifier(data, n)}>Delete</Button>
								</Expander>
							))
						}
						<Button block={true} onClick={() => addDamageModifier(data)}>Add a modifier</Button>
					</Space>
				);
			}
			case FeatureType.DomainFeature: {
				const data = feature.data as FeatureDomainFeatureData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Level</HeaderText>
						<NumberSpin min={1} value={data.level} onChange={setLevel} />
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.Domain: {
				const data = feature.data as FeatureDomainData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.Kit: {
				const data = feature.data as FeatureKitData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Types</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Kit types'
							mode='multiple'
							allowClear={true}
							options={[ KitType.Martial, KitType.Caster, KitType.Stormwight ].map(option => ({ value: option }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							value={data.types}
							onChange={setKitTypes}
						/>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.Language: {
				const data = feature.data as FeatureLanguageData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Options</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Options'
							mode='multiple'
							allowClear={true}
							options={LanguageData.getLanguages(props.campaignSettings).map(option => ({ value: option.name, description: option.description }))}
							optionRender={option => <Field label={option.data.value} value={option.data.description} />}
							value={data.options}
							onChange={setLanguageOptions}
						/>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.Multiple: {
				const data = feature.data as FeatureMultipleData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						{
							data.features.map((feature, n) => (
								<Expander key={feature.id} title={feature.name}>
									<FeatureEditPanel
										feature={feature}
										campaignSettings={props.campaignSettings}
										onChange={f => setMultipleFeature(data, n, f)}
										onDelete={() => deleteMultipleFeature(data, n)}
									/>
								</Expander>
							))
						}
						<Button block={true} onClick={() => addMultipleFeature(data)}>Add a feature</Button>
					</Space>
				);
			}
			case FeatureType.Size: {
				const data = feature.data as FeatureSizeData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Size</HeaderText>
						<NumberSpin min={1} value={data.size.value} onChange={setSizeValue} />
						{
							data.size.value === 1 ?
								<HeaderText>Modifier</HeaderText>
								: null
						}
						{
							data.size.value === 1 ?
								<Segmented
									block={true}
									options={[ 'T', 'S', 'M', 'L' ]}
									value={data.size.mod}
									onChange={setSizeMod}
								/>
								: null
						}
					</Space>
				);
			}
			case FeatureType.Skill: {
				const data = feature.data as FeatureSkillData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Skill</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Skill'
							allowClear={true}
							options={SkillData.getSkills(props.campaignSettings).map(option => ({ value: option.name, description: option.description }))}
							optionRender={option => <Field label={option.data.value} value={option.data.description} />}
							value={data.skill}
							onChange={setSkill}
						/>
					</Space>
				);
			}
			case FeatureType.SkillChoice: {
				const data = feature.data as FeatureSkillChoiceData;
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						<HeaderText>Options</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Skills'
							allowClear={true}
							mode='multiple'
							options={SkillData.getSkills(props.campaignSettings).map(option => ({ value: option.name, description: option.description }))}
							optionRender={option => <Field label={option.data.value} value={option.data.description} />}
							value={data.options}
							onChange={setSkillOptions}
						/>
						<HeaderText>List Options</HeaderText>
						<Select
							style={{ width: '100%' }}
							placeholder='Skill Lists'
							allowClear={true}
							mode='multiple'
							options={[ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ].map(option => ({ value: option }))}
							optionRender={option => <div className='ds-text'>{option.data.value}</div>}
							value={data.listOptions}
							onChange={setSkillListOptions}
						/>
						<HeaderText>Count</HeaderText>
						<NumberSpin min={1} value={data.count} onChange={setCount} />
					</Space>
				);
			}
			case FeatureType.Text:
				return null;
		}
	};

	try {
		return (
			<div className='feature-edit-panel'>
				<HeaderText>Name</HeaderText>
				<Input
					placeholder='Name'
					allowClear={true}
					value={feature.name}
					onChange={e => setName(e.target.value)}
				/>
				<HeaderText>Description</HeaderText>
				<Input.TextArea
					placeholder='Description'
					allowClear={true}
					rows={6}
					value={feature.description}
					onChange={e => setDescription(e.target.value)}
				/>
				<HeaderText>Type</HeaderText>
				<Select
					style={{ width: '100%' }}
					placeholder='Select type'
					options={[ FeatureType.Ability, FeatureType.Bonus, FeatureType.Choice, FeatureType.ClassAbility, FeatureType.DamageModifier, FeatureType.Domain, FeatureType.DomainFeature, FeatureType.Kit, FeatureType.Language, FeatureType.Multiple, FeatureType.Size, FeatureType.Skill, FeatureType.SkillChoice, FeatureType.Text ].map(o => ({ value: o }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={feature.type}
					onChange={setType}
				/>
				{getDataSection()}
				<Divider />
				{props.onDelete ? <Button block={true} danger={true} onClick={deleteFeature}>Delete</Button> : null}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};

interface AbilityEditPanelProps {
	ability: Ability;
	onChange: (ability: Ability) => void;
	onDelete?: (ability: Ability) => void;
}

const AbilityEditPanel = (props: AbilityEditPanelProps) => {
	const [ ability, setAbility ] = useState<Ability>(props.ability);

	const setName = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.name = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setDescription = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.description = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setTypeUsage = (value: AbilityUsage) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.type.usage = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setTypeFree = (value: boolean) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.type.free = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setTypeTrigger = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.type.trigger = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setTypeTime = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.type.time = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setKeywords = (value: AbilityKeyword[]) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.keywords = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const getDistanceMainType = (index: number) => {
		const distance = ability.distance[index];

		switch (distance.type) {
			case AbilityDistanceType.Self:
				return 'Self';
			case AbilityDistanceType.Reach:
				return 'Reach';
			case AbilityDistanceType.Ranged:
				return 'Ranged';
			case AbilityDistanceType.Aura:
			case AbilityDistanceType.Burst:
			case AbilityDistanceType.Cube:
			case AbilityDistanceType.Wall:
				return 'Area';
			case AbilityDistanceType.Line:
				return 'Line';
			case AbilityDistanceType.Special:
				return 'Special';
		}
	};

	const setDistanceMainType = (index: number, value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;

		switch (value) {
			case 'Self':
				copy.distance[index].type = AbilityDistanceType.Self;
				break;
			case 'Reach':
				copy.distance[index].type = AbilityDistanceType.Reach;
				break;
			case 'Ranged':
				copy.distance[index].type = AbilityDistanceType.Ranged;
				break;
			case 'Area':
				copy.distance[index].type = AbilityDistanceType.Aura;
				break;
			case 'Line':
				copy.distance[index].type = AbilityDistanceType.Line;
				break;
			case 'Special':
				copy.distance[index].type = AbilityDistanceType.Special;
				break;
		}

		setAbility(copy);
		props.onChange(copy);
	};

	const addDistance = () => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.distance.push(AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }));
		setAbility(copy);
		props.onChange(copy);
	};

	const setDistanceType = (index: number, value: AbilityDistanceType) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.distance[index].type = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setDistanceValue = (index: number, value: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.distance[index].value = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setDistanceValue2 = (index: number, value: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.distance[index].value2 = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setDistanceWithin = (index: number, value: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.distance[index].within = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setDistanceSpecial = (index: number, value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.distance[index].special = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const deleteDistance = (index: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.distance.splice(index, 1);
		setAbility(copy);
		props.onChange(copy);
	};

	const setTarget = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.target = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setCost = (value: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.cost = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setPreEffect = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.preEffect = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setPowerRoll = (value: boolean) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.powerRoll = value ? AbilityLogic.createPowerRoll({ characteristic: [], tier1: '', tier2: '', tier3: '' }) : null;
		setAbility(copy);
		props.onChange(copy);
	};

	const setPowerRoll1 = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		if (copy.powerRoll) {
			copy.powerRoll.tier1 = value;
		}
		setAbility(copy);
		props.onChange(copy);
	};

	const setPowerRollCharacteristics = (value: Characteristic[]) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		if (copy.powerRoll) {
			copy.powerRoll.characteristic = value;
		}
		setAbility(copy);
		props.onChange(copy);
	};

	const setPowerRoll2 = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		if (copy.powerRoll) {
			copy.powerRoll.tier2 = value;
		}
		setAbility(copy);
		props.onChange(copy);
	};

	const setPowerRoll3 = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		if (copy.powerRoll) {
			copy.powerRoll.tier3 = value;
		}
		setAbility(copy);
		props.onChange(copy);
	};

	const setEffect = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.effect = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const addAlternateEffect = () => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.alternateEffects.push('');
		setAbility(copy);
		props.onChange(copy);
	};

	const setAlternateEffect = (index: number, value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.alternateEffects[index] = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const deleteAlternateEffect = (index: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.alternateEffects.splice(index, 1);
		setAbility(copy);
		props.onChange(copy);
	};

	const addSpend = () => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.spend.push({ effect: '', value: 1 });
		setAbility(copy);
		props.onChange(copy);
	};

	const setSpendValue = (index: number, value: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.spend[index].value = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setSpendEffect = (index: number, value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.spend[index].effect = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const deleteSpend = (index: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.spend.splice(index, 1);
		setAbility(copy);
		props.onChange(copy);
	};

	const addPersistence = () => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.persistence.push({ effect: '', value: 1 });
		setAbility(copy);
		props.onChange(copy);
	};

	const setPersistenceValue = (index: number, value: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.persistence[index].value = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setPersistenceEffect = (index: number, value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.persistence[index].effect = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const deletePersistence = (index: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.persistence.splice(index, 1);
		setAbility(copy);
		props.onChange(copy);
	};

	const deleteAbility = () => {
		if (props.onDelete) {
			props.onDelete(ability);
		}
	};

	try {
		return (
			<div className='ability-edit-panel'>
				<HeaderText>Name</HeaderText>
				<Input
					placeholder='Name'
					allowClear={true}
					value={ability.name}
					onChange={e => setName(e.target.value)}
				/>
				<HeaderText>Description</HeaderText>
				<Input.TextArea
					placeholder='Description'
					allowClear={true}
					rows={6}
					value={ability.description}
					onChange={e => setDescription(e.target.value)}
				/>
				<HeaderText>Usage</HeaderText>
				<Expander title='Usage'>
					<Select
						style={{ width: '100%' }}
						placeholder='Select usage'
						options={[ AbilityUsage.Action, AbilityUsage.Maneuver, AbilityUsage.Trigger, AbilityUsage.Other ].map(option => ({ value: option }))}
						optionRender={option => <div className='ds-text'>{option.data.value}</div>}
						value={ability.type.usage}
						onChange={setTypeUsage}
					/>
					<Toggle label='Free' value={ability.type.free} onChange={setTypeFree} />
					<Input
						placeholder='Trigger'
						allowClear={true}
						disabled={ability.type.usage !== AbilityUsage.Trigger}
						value={ability.type.trigger}
						onChange={e => setTypeTrigger(e.target.value)}
					/>
					<Input
						placeholder='Other'
						allowClear={true}
						disabled={ability.type.usage !== AbilityUsage.Other}
						value={ability.type.time}
						onChange={e => setTypeTime(e.target.value)}
					/>
				</Expander>
				<HeaderText>Keywords</HeaderText>
				<Select
					style={{ width: '100%' }}
					placeholder='Keywords'
					mode='multiple'
					allowClear={true}
					options={[ AbilityKeyword.Animal, AbilityKeyword.Area, AbilityKeyword.Attack, AbilityKeyword.Charge, AbilityKeyword.Earth, AbilityKeyword.Fire, AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Persistent, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Resistance, AbilityKeyword.Void, AbilityKeyword.Weapon ].map(option => ({ value: option }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={ability.keywords}
					onChange={setKeywords}
				/>
				<HeaderText>Distance</HeaderText>
				{
					ability.distance.map((distance, n) => (
						<Expander key={n} title='Distance'>
							<Segmented
								block={true}
								options={[ 'Self', 'Reach', 'Ranged', 'Area', 'Line', 'Special' ]}
								value={getDistanceMainType(n)}
								onChange={value => setDistanceMainType(n, value)}
							/>
							{
								getDistanceMainType(n) === 'Area' ?
									<HeaderText>Area Type</HeaderText>
									: null
							}
							{
								getDistanceMainType(n) === 'Area' ?
									<Select
										style={{ width: '100%' }}
										disabled={getDistanceMainType(n) !== 'Area'}
										placeholder='Area type'
										options={[ AbilityDistanceType.Aura, AbilityDistanceType.Burst, AbilityDistanceType.Cube, AbilityDistanceType.Wall ].map(option => ({ value: option }))}
										optionRender={option => <div className='ds-text'>{option.data.value}</div>}
										value={distance.type}
										onChange={value => setDistanceType(n, value)}
									/>
									: null
							}
							{
								(getDistanceMainType(n) !== 'Self') && (getDistanceMainType(n) !== 'Special') ?
									<HeaderText>Value</HeaderText>
									: null
							}
							{
								(getDistanceMainType(n) !== 'Self') && (getDistanceMainType(n) !== 'Special') ?
									<NumberSpin min={1} value={distance.value} onChange={value => setDistanceValue(n, value)} />
									: null
							}
							{
								getDistanceMainType(n) === 'Line' ?
									<HeaderText>Value 2</HeaderText>
									: null
							}
							{
								getDistanceMainType(n) === 'Line' ?
									<NumberSpin min={1} value={distance.value2} onChange={value => setDistanceValue2(n, value)} />
									: null
							}
							{
								(getDistanceMainType(n) === 'Area' ) || (getDistanceMainType(n) === 'Line') ?
									<HeaderText>Within</HeaderText>
									: null
							}
							{
								(getDistanceMainType(n) === 'Area' ) || (getDistanceMainType(n) === 'Line') ?
									<NumberSpin min={1} value={distance.within} onChange={value => setDistanceWithin(n, value)} />
									: null
							}
							{
								getDistanceMainType(n) === 'Special' ?
									<HeaderText>Special</HeaderText>
									: null
							}
							{
								getDistanceMainType(n) === 'Special' ?
									<Input
										placeholder='Special'
										allowClear={true}
										value={distance.special}
										onChange={e => setDistanceSpecial(n, e.target.value)}
									/>
									: null
							}
							<Button block={true} danger={true} onClick={() => deleteDistance(n)}>Delete</Button>
						</Expander>
					))
				}
				<Button block={true} onClick={addDistance}>Add a new distance</Button>
				<HeaderText>Target</HeaderText>
				<Input
					placeholder='Target'
					allowClear={true}
					value={ability.target}
					onChange={e => setTarget(e.target.value)}
				/>
				<HeaderText>Cost</HeaderText>
				<NumberSpin min={0} value={ability.cost} onChange={setCost} />
				<HeaderText>Pre Effect</HeaderText>
				<Input.TextArea
					placeholder='Effect'
					allowClear={true}
					rows={6}
					value={ability.preEffect}
					onChange={e => setPreEffect(e.target.value)}
				/>
				<HeaderText>Power Roll</HeaderText>
				<Expander title='Power Roll'>
					<Toggle label='Power Roll' value={!!ability.powerRoll} onChange={setPowerRoll} />
					{
						ability.powerRoll ?
							<Select
								style={{ width: '100%' }}
								placeholder='Characteristics'
								mode='multiple'
								allowClear={true}
								options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(option => ({ value: option }))}
								optionRender={option => <div className='ds-text'>{option.data.value}</div>}
								value={ability.powerRoll.characteristic}
								onChange={setPowerRollCharacteristics}
							/>
							: null
					}
					{
						ability.powerRoll ?
							<Input
								placeholder='Tier 1'
								allowClear={true}
								value={ability.powerRoll.tier1}
								onChange={e => setPowerRoll1(e.target.value)}
							/>
							: null
					}
					{
						ability.powerRoll ?
							<Input
								placeholder='Tier 2'
								allowClear={true}
								value={ability.powerRoll.tier2}
								onChange={e => setPowerRoll2(e.target.value)}
							/>
							: null
					}
					{
						ability.powerRoll ?
							<Input
								placeholder='Tier 3'
								allowClear={true}
								value={ability.powerRoll.tier3}
								onChange={e => setPowerRoll3(e.target.value)}
							/>
							: null
					}
				</Expander>
				<HeaderText>Effect</HeaderText>
				<Input.TextArea
					placeholder='Effect'
					allowClear={true}
					rows={6}
					value={ability.effect}
					onChange={e => setEffect(e.target.value)}
				/>
				<HeaderText>Alternate Effects</HeaderText>
				{
					ability.alternateEffects.map((effect, n) => (
						<Space key={n} direction='vertical' style={{ width: '100%' }}>
							<Input
								placeholder='Alternate Effect'
								allowClear={true}
								value={effect}
								onChange={e => setAlternateEffect(n, e.target.value)}
							/>
							<Button block={true} danger={true} onClick={() => deleteAlternateEffect(n)}>Delete</Button>
						</Space>
					))
				}
				<Button block={true} onClick={addAlternateEffect}>Add an alternate effect</Button>
				<HeaderText>Spend</HeaderText>
				{
					ability.spend.map((spend, n) => (
						<Space key={n} direction='vertical' style={{ width: '100%' }}>
							<Input
								placeholder='Spend effect'
								allowClear={true}
								value={spend.effect}
								onChange={e => setSpendEffect(n, e.target.value)}
							/>
							<NumberSpin min={0} value={spend.value} onChange={value => setSpendValue(n, value)} />
							<Button block={true} danger={true} onClick={() => deleteSpend(n)}>Delete</Button>
						</Space>
					))
				}
				<Button block={true} onClick={addSpend}>Add a spend effect</Button>
				<HeaderText>Persistence</HeaderText>
				{
					ability.persistence.map((persist, n) => (
						<Space key={n} direction='vertical' style={{ width: '100%' }}>
							<Input
								placeholder='Persistence Effect'
								allowClear={true}
								value={persist.effect}
								onChange={e => setPersistenceEffect(n, e.target.value)}
							/>
							<NumberSpin min={0} value={persist.value} onChange={value => setPersistenceValue(n, value)} />
							<Button block={true} danger={true} onClick={() => deletePersistence(n)}>Delete</Button>
						</Space>
					))
				}
				<Button block={true} onClick={addPersistence}>Add a persistence effect</Button>
				<Divider />
				{props.onDelete ? <Button block={true} danger={true} onClick={deleteAbility}>Delete</Button> : null}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
