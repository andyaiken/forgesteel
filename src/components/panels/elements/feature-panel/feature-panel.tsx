import { AbilityCustomization, Hero } from '../../../../models/hero';
import { Alert, Button, Drawer, Flex, Input, Select, Space } from 'antd';
import { CSSProperties, useState } from 'react';
import { CloseOutlined, InfoCircleOutlined, ThunderboltFilled, ThunderboltOutlined } from '@ant-design/icons';
import { Feature, FeatureAbilityCostData, FeatureAbilityDamageData, FeatureAbilityDistanceData, FeatureAncestryChoiceData, FeatureAncestryFeatureChoiceData, FeatureBonusData, FeatureCharacteristicBonusData, FeatureChoiceData, FeatureClassAbilityData, FeatureCompanionData, FeatureConditionImmunityData, FeatureDamageModifierData, FeatureData, FeatureDomainData, FeatureDomainFeatureData, FeatureHeroicResourceData, FeatureHeroicResourceGainData, FeatureItemChoiceData, FeatureKitData, FeatureLanguageChoiceData, FeatureLanguageData, FeatureMaliceData, FeatureMovementModeData, FeatureMultipleData, FeaturePerkData, FeatureProficiencyData, FeatureSizeData, FeatureSkillChoiceData, FeatureSkillData, FeatureSpeedData, FeatureSummonData, FeatureTaggedFeatureChoiceData, FeatureTaggedFeatureData, FeatureTitleChoiceData } from '../../../../models/feature';
import { Pill, ResourcePill } from '../../../controls/pill/pill';
import { Ability } from '../../../../models/ability';
import { AbilityLogic } from '../../../../logic/ability-logic';
import { AbilityModal } from '../../../modals/ability/ability-modal';
import { AbilityPanel } from '../ability-panel/ability-panel';
import { AbilitySelectModal } from '../../../modals/select/ability-select/ability-select-modal';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryPanel } from '../ancestry-panel/ancestry-panel';
import { Collections } from '../../../../utils/collections';
import { Domain } from '../../../../models/domain';
import { DomainPanel } from '../domain-panel/domain-panel';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { FeatureLogic } from '../../../../logic/feature-logic';
import { FeatureSelectModal } from '../../../modals/select/feature-select/feature-select-modal';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { FollowerPanel } from '../follower-panel/follower-panel';
import { Format } from '../../../../utils/format';
import { FormatLogic } from '../../../../logic/format-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { HeroClass } from '../../../../models/class';
import { HeroLogic } from '../../../../logic/hero-logic';
import { Item } from '../../../../models/item';
import { ItemPanel } from '../item-panel/item-panel';
import { Kit } from '../../../../models/kit';
import { KitPanel } from '../kit-panel/kit-panel';
import { KitSelectModal } from '../../../modals/select/kit-select/kit-select-modal';
import { LanguageSelectModal } from '../../../modals/select/language-select/language-select-modal';
import { Markdown } from '../../../controls/markdown/markdown';
import { Modal } from '../../../modals/modal/modal';
import { Monster } from '../../../../models/monster';
import { MonsterInfo } from '../../../controls/token/token';
import { MonsterModal } from '../../../modals/monster/monster-modal';
import { MonsterOrganizationType } from '../../../../enums/monster-organization-type';
import { MonsterPanel } from '../monster-panel/monster-panel';
import { MonsterRoleType } from '../../../../enums/monster-role-type';
import { MonsterSelectModal } from '../../../modals/select/monster-select/monster-select-modal';
import { NameGenerator } from '../../../../utils/name-generator';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Perk } from '../../../../models/perk';
import { PerkPanel } from '../perk-panel/perk-panel';
import { PerkSelectModal } from '../../../modals/select/perk-select/perk-select-modal';
import { PowerRollPanel } from '../../power-roll/power-roll-panel';
import { SkillSelectModal } from '../../../modals/select/skill-select/skill-select-modal';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Title } from '../../../../models/title';
import { TitlePanel } from '../title-panel/title-panel';
import { TitleSelectModal } from '../../../modals/select/title-select/title-select-modal';
import { Utils } from '../../../../utils/utils';

import './feature-panel.scss';

interface Props {
	feature: Feature | Perk;
	source?: string;
	options: Options;
	cost?: number | 'signature';
	repeatable?: boolean;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
	style?: CSSProperties;
	setData?: (featureID: string, data: FeatureData) => void;
}

export const FeaturePanel = (props: Props) => {
	const [ autoCalc, setAutoCalc ] = useState<boolean>(true);
	const [ abilitySelectorOpen, setAbilitySelectorOpen ] = useState<boolean>(false);
	const [ choiceSelectorOpen, setChoiceSelectorOpen ] = useState<boolean>(false);
	const [ kitSelectorOpen, setKitSelectorOpen ] = useState<boolean>(false);
	const [ languageSelectorOpen, setLanguageSelectorOpen ] = useState<boolean>(false);
	const [ monsterSelectorOpen, setMonsterSelectorOpen ] = useState<boolean>(false);
	const [ perkSelectorOpen, setPerkSelectorOpen ] = useState<boolean>(false);
	const [ skillSelectorOpen, setSkillSelectorOpen ] = useState<boolean>(false);
	const [ titleSelectorOpen, setTitleSelectorOpen ] = useState<boolean>(false);
	const [ selectedAbility, setSelectedAbility ] = useState<Ability | null>(null);
	const [ selectedAncestry, setSelectedAncestry ] = useState<Ancestry | null>(null);
	const [ selectedDomain, setSelectedDomain ] = useState<Domain | null>(null);
	const [ selectedFeature, setSelectedFeature ] = useState<Feature | null>(null);
	const [ selectedItem, setSelectedItem ] = useState<Item | null>(null);
	const [ selectedKit, setSelectedKit ] = useState<Kit | null>(null);
	const [ selectedMonster, setSelectedMonster ] = useState<Monster | null>(null);
	const [ selectedPerk, setSelectedPerk ] = useState<Perk | null>(null);
	const [ selectedTitle, setSelectedTitle ] = useState<Title | null>(null);

	// #region Selection

	const getSelectionAncestryChoice = (data: FeatureAncestryChoiceData) => {
		const ancestries = SourcebookLogic.getAncestries(props.sourcebooks || []);
		const sortedAncestries = Collections.sort(ancestries, a => a.name);

		if (sortedAncestries.length === 0) {
			return (
				<Empty text='There are no options to choose for this feature.' />
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					status={!data.selected ? 'warning' : ''}
					allowClear={true}
					placeholder='Select an ancestry'
					options={sortedAncestries.map(a => ({ label: a.name, value: a.id, desc: a.description }))}
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
					value={data.selected ? data.selected.id : null}
					onChange={value => {
						const dataCopy = Utils.copy(data);
						dataCopy.selected = SourcebookLogic.getAncestries(props.sourcebooks || []).find(a => a.id === value) || null;
						if (props.setData) {
							props.setData(props.feature.id, dataCopy);
						}
					}}
				/>
				{
					data.selected ?
						<Flex className='selection-box' align='center' gap={10}>
							<Field
								style={{ flex: '1 1 0' }}
								label={data.selected.name}
								value={<Markdown text={data.selected.description} useSpan={true} />}
							/>
							<Button
								style={{ flex: '0 0 auto' }}
								type='text'
								title='Show details'
								icon={<InfoCircleOutlined />}
								onClick={() => setSelectedAncestry(data.selected)}
							/>
						</Flex>
						: null
				}
				<Drawer open={!!selectedAncestry} onClose={() => setSelectedAncestry(null)} closeIcon={null} width='500px'>
					<Modal
						content={selectedAncestry ? <AncestryPanel ancestry={selectedAncestry} options={props.options} mode={PanelMode.Full} /> : null}
						onClose={() => setSelectedAncestry(null)}
					/>
				</Drawer>
			</Space>
		);
	};

	const getSelectionAncestryFeatureChoice = (data: FeatureAncestryFeatureChoiceData) => {
		if (!props.hero) {
			return null;
		}

		const currentFeatureIDs = HeroLogic.getFeatures(props.hero)
			.map(f => f.feature)
			.filter(f => f.id !== props.feature.id)
			.map(f => f.id);

		const ancestries: Ancestry[] = [];
		if (data.source.customID && props.sourcebooks) {
			const a = SourcebookLogic.getAncestries(props.sourcebooks).find(a => a.id === data.source.customID);
			if (a) {
				ancestries.push(a);
			}
		} else {
			if (data.source.current && props.hero.ancestry) {
				ancestries.push(props.hero.ancestry);
			}
			if (data.source.former) {
				ancestries.push(...HeroLogic.getFormerAncestries(props.hero));
			}
		}

		const features = ancestries
			.flatMap(a => a.features)
			.filter(f => f.type === FeatureType.Choice)
			.flatMap(f => f.data.options)
			.filter(opt => data.value === opt.value)
			.filter(opt => opt.feature.type !== FeatureType.AncestryFeatureChoice)
			.map(opt => opt.feature);
		const sortedFeatures = Collections.sort(features, f => f.name);

		if (sortedFeatures.length === 0) {
			return (
				<Empty text='There are no options to choose for this feature.' />
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Select
					style={{ width: '100%' }}
					status={!data.selected ? 'warning' : ''}
					allowClear={true}
					placeholder='Select a feature from an ancestry'
					options={sortedFeatures.map(f => ({ label: f.name, value: f.id, desc: f.description || f.type, disabled: currentFeatureIDs.includes(f.id) }))}
					optionRender={option => <Field disabled={option.data.disabled} label={option.data.label} value={option.data.desc} />}
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
					value={data.selected ? data.selected.id : null}
					onChange={value => {
						const dataCopy = Utils.copy(data);
						dataCopy.selected = features.find(f => f.id === value) || null;
						if (props.setData) {
							props.setData(props.feature.id, dataCopy);
						}
					}}
				/>
				{
					data.selected ?
						<FeaturePanel feature={data.selected} options={props.options} />
						: null
				}
			</Space>
		);
	};

	const getSelectionChoice = (data: FeatureChoiceData) => {
		let allOptions = [ ...data.options ];
		if (allOptions.some(opt => opt.feature.type === FeatureType.AncestryFeatureChoice)) {
			allOptions = allOptions.filter(opt => opt.feature.type !== FeatureType.AncestryFeatureChoice);
			const additionalOptions = HeroLogic.getFormerAncestries(props.hero!)
				.flatMap(a => a.features)
				.filter(f => f.type === FeatureType.Choice)
				.flatMap(f => f.data.options)
				.filter(opt => opt.feature.type !== FeatureType.AncestryFeatureChoice);
			allOptions.push(...additionalOptions);
		}

		const selectedIDs = data.selected.map(f => f.id);
		const pointsUsed = Collections.sum(selectedIDs, id => {
			const original = allOptions.find(o => o.feature.id === id);
			return original ? original.value : 0;
		});
		const pointsLeft = data.count - pointsUsed;

		let unavailableIDs: string[] = [];
		if (data.options.some(opt => opt.value > 1)) {
			unavailableIDs = allOptions
				.filter(opt => !selectedIDs.includes(opt.feature.id) && (opt.value > pointsLeft))
				.map(opt => opt.feature.id);
		}

		const availableOptions = allOptions
			.filter(f => !unavailableIDs.includes(f.feature.id))
			.filter(f => !selectedIDs.includes(f.feature.id));
		const sortedOptions = Collections.sort(availableOptions, opt => opt.feature.name);

		if (sortedOptions.length + selectedIDs.length === 0) {
			return (
				<Empty text='There are no options to choose for this feature.' />
			);
		}

		const showCosts = data.options.some(opt => opt.value > 1);

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<div className='ds-text'>
					{
						showCosts ?
							(pointsLeft > 0) ? `You have ${pointsLeft} point(s) to spend.` : null
							:
							`Choose ${data.count} option(s).`
					}
				</div>
				{
					data.selected.map(f => (
						<Flex key={f.id} className='selection-box' align='center' gap={10}>
							<Field
								style={{ flex: '1 1 0' }}
								label={f.name}
								value={<Markdown text={f.description} useSpan={true} />}
							/>
							<Flex vertical={true}>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Show details'
									icon={<InfoCircleOutlined />}
									onClick={() => setSelectedFeature(f)}
								/>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Remove'
									icon={<CloseOutlined />}
									onClick={() => {
										const dataCopy = Utils.copy(data);
										dataCopy.selected = dataCopy.selected.filter(x => x.id !== f.id);
										if (props.setData) {
											props.setData(props.feature.id, dataCopy);
										}
									}}
								/>
							</Flex>
						</Flex>
					))
				}
				{
					pointsLeft > 0 ?
						<Button className='status-warning' block={true} onClick={() => setChoiceSelectorOpen(true)}>
							Choose an option
						</Button>
						: null
				}
				<Drawer open={choiceSelectorOpen} onClose={() => setChoiceSelectorOpen(false)} closeIcon={null} width='500px'>
					<FeatureSelectModal
						features={sortedOptions}
						hero={props.hero}
						options={props.options}
						onSelect={feature => {
							setChoiceSelectorOpen(false);

							const dataCopy = Utils.copy(data);
							dataCopy.selected.push(feature);
							if (props.setData) {
								props.setData(props.feature.id, dataCopy);
							}
						}}
						onClose={() => setChoiceSelectorOpen(false)}
					/>
				</Drawer>
				<Drawer open={!!selectedFeature} onClose={() => setSelectedFeature(null)} closeIcon={null} width='500px'>
					<Modal
						content={selectedFeature ? <FeaturePanel style={{ padding: '0 20px 20px 20px' }} feature={selectedFeature} options={props.options} mode={PanelMode.Full} /> : null}
						onClose={() => setSelectedFeature(null)}
					/>
				</Drawer>
			</Space>
		);
	};

	const getSelectionClassAbility = (data: FeatureClassAbilityData) => {
		if (!props.hero) {
			return null;
		}

		const currentAbilityIDs = HeroLogic.getFeatures(props.hero)
			.map(f => f.feature)
			.filter(f => f.id !== props.feature.id)
			.filter(f => f.type === FeatureType.ClassAbility)
			.flatMap(f => f.data.selectedIDs);

		let heroClass: HeroClass | null = props.hero.class;
		if (data.classID) {
			// You get an ability from a different class
			heroClass = SourcebookLogic.getClasses(props.sourcebooks || []).find(c => c.id === data.classID) || null;
		}

		const abilities: Ability[] = [];
		if (heroClass) {
			(data.allowAnySource ? SourcebookLogic.getAllClassAbilities(heroClass) : heroClass.abilities)
				.filter(a => a.cost === data.cost)
				.filter(a => a.minLevel <= data.minLevel)
				.forEach(a => abilities.push(a));
		}

		const distinctAbilities = Collections.distinct(abilities, a => a.name);
		const sortedAbilities = Collections.sort(distinctAbilities, a => a.name);

		if (sortedAbilities.length === 0) {
			return (
				<Empty text='There are no options to choose for this feature.' />
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<div className='ds-text'>
					Choose {data.count > 1 ? data.count : 'a'} {data.cost === 'signature' ? 'signature' : `${data.cost}pt`} {data.count > 1 ? 'abilities' : 'ability'}.
				</div>
				{
					data.selectedIDs.map(id => {
						const ability = abilities.find(a => a.id === id) as Ability;
						return (
							<Flex key={ability.id} className='selection-box' align='center' gap={10}>
								<Field
									style={{ flex: '1 1 0' }}
									label={ability.name}
									value={<Markdown text={ability.description} useSpan={true} />}
								/>
								<Flex vertical={true}>
									<Button
										style={{ flex: '0 0 auto' }}
										type='text'
										title='Show details'
										icon={<InfoCircleOutlined />}
										onClick={() => setSelectedAbility(ability)}
									/>
									<Button
										style={{ flex: '0 0 auto' }}
										type='text'
										title='Remove'
										icon={<CloseOutlined />}
										onClick={() => {
											const dataCopy = Utils.copy(data);
											dataCopy.selectedIDs = dataCopy.selectedIDs.filter(id => id !== ability.id);
											if (props.setData) {
												props.setData(props.feature.id, dataCopy);
											}
										}}
									/>
								</Flex>
							</Flex>
						);
					})
				}
				{
					data.selectedIDs.length < data.count ?
						<Button className='status-warning' block={true} onClick={() => setAbilitySelectorOpen(true)}>
							Choose an ability
						</Button>
						: null
				}
				<Drawer open={abilitySelectorOpen} onClose={() => setAbilitySelectorOpen(false)} closeIcon={null} width='500px'>
					<AbilitySelectModal
						abilities={sortedAbilities.filter(a => !currentAbilityIDs.includes(a.id))}
						hero={props.hero}
						onSelect={ability => {
							setAbilitySelectorOpen(false);

							const dataCopy = Utils.copy(data);
							dataCopy.selectedIDs.push(ability.id);
							if (props.setData) {
								props.setData(props.feature.id, dataCopy);
							}
						}}
						onClose={() => setAbilitySelectorOpen(false)}
					/>
				</Drawer>
				<Drawer open={!!selectedAbility} onClose={() => setSelectedAbility(null)} closeIcon={null} width='500px'>
					{selectedAbility ? <AbilityModal ability={selectedAbility} hero={props.hero} onClose={() => setSelectedAncestry(null)} /> : null}
				</Drawer>
			</Space>
		);
	};

	const getSelectionCompanion = (data: FeatureCompanionData) => {
		const setName = (value: string) => {
			const dataCopy = Utils.copy(data);
			dataCopy.selected!.name = value;
			if (props.setData) {
				props.setData(props.feature.id, dataCopy);
			}
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					data.selected && data.selected.retainer ?
						data.selected.retainer.featuresByLevel
							.filter(lvl => data.selected!.retainer!.level >= lvl.level)
							.filter(lvl => FeatureLogic.isChoice(lvl.feature))
							.map(lvl => (
								<FeaturePanel
									key={lvl.level}
									feature={lvl.feature}
									options={props.options}
									hero={props.hero}
									sourcebooks={props.sourcebooks}
									mode={props.mode}
									setData={(fID, d) => {
										const dataCopy = Utils.copy(data);
										dataCopy.selected!.retainer!.featuresByLevel.forEach(l => {
											if (l.feature.id === fID) {
												l.feature.data = d;
											}
										});
										if (props.setData) {
											props.setData(props.feature.id, dataCopy);
										}
									}}
								/>
							))
						: null
				}
				{
					!data.selected ?
						<Button block={true} onClick={() => setMonsterSelectorOpen(true)}>Select</Button>
						: null
				}
				{
					data.selected ?
						<Flex className='selection-box' align='center' gap={10}>
							<MonsterInfo
								style={{ flex: '1 1 0' }}
								monster={data.selected}
							/>
							<div style={{ flex: '0 0 auto' }}>
								<Button
									type='text'
									title='Show details'
									icon={<InfoCircleOutlined />}
									onClick={() => setSelectedMonster(data.selected)}
								/>
								<Button
									type='text'
									title='Remove'
									icon={<CloseOutlined />}
									onClick={() => {
										const dataCopy = Utils.copy(data);
										dataCopy.selected = null;
										if (props.setData) {
											props.setData(props.feature.id, dataCopy);
										}
									}}
								/>
							</div>
						</Flex>
						: null
				}
				{
					data.selected ?
						<Expander title='Customize'>
							<HeaderText>Name</HeaderText>
							<Input
								status={data.selected.name === '' ? 'warning' : ''}
								placeholder='Name'
								allowClear={true}
								addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
								value={data.selected.name}
								onChange={e => setName(e.target.value)}
							/>
						</Expander>
						: null
				}
				<Drawer open={monsterSelectorOpen} onClose={() => setMonsterSelectorOpen(false)} closeIcon={null} width='500px'>
					<MonsterSelectModal
						monsters={
							SourcebookLogic
								.getMonsterGroups(props.sourcebooks || [])
								.flatMap(g => g.monsters)
								.filter(m => {
									switch (data.type) {
										case 'mount':
											return m.role.type === MonsterRoleType.Mount;
										case 'retainer':
											return m.role.organization === MonsterOrganizationType.Retainer;
									}
									return true;
								})
						}
						subset={((data.type === 'mount') || (data.type === 'retainer')) ? data.type : undefined}
						options={props.options}
						onSelect={monster => {
							setMonsterSelectorOpen(false);

							const monsterCopy = Utils.copy(monster) as Monster;
							if (monsterCopy.retainer) {
								// Retainers match hero level
								monsterCopy.retainer.level = Math.max(monsterCopy.level, props.hero?.class?.level || 1);
							}
							const dataCopy = Utils.copy(data);
							dataCopy.selected = monsterCopy;
							if (props.setData) {
								props.setData(props.feature.id, dataCopy);
							}
						}}
						onClose={() => setMonsterSelectorOpen(false)}
					/>
				</Drawer>
				<Drawer open={!!selectedMonster} onClose={() => setSelectedMonster(null)} closeIcon={null} width='500px'>
					{selectedMonster ? <MonsterModal monster={selectedMonster} options={props.options} onClose={() => setSelectedMonster(null)} /> : null}
				</Drawer>
			</Space>
		);
	};

	const getSelectionDomain = (data: FeatureDomainData) => {
		if (!props.hero) {
			return null;
		}

		const domains = SourcebookLogic.getDomains(props.sourcebooks as Sourcebook[]);
		const sortedDomains = Collections.sort(domains, d => d.name);

		if (sortedDomains.length === 0) {
			return (
				<Empty text='There are no options to choose for this feature.' />
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{data.count > 1 ? <div className='ds-text'>Choose {data.count}:</div> : null}
				<Select
					style={{ width: '100%' }}
					status={data.selected.length < data.count ? 'warning' : ''}
					mode={data.count === 1 ? undefined : 'multiple'}
					maxCount={data.count === 1 ? undefined : data.count}
					allowClear={true}
					placeholder={data.count === 1 ? 'Select a domain' : 'Select domains'}
					options={sortedDomains.map(a => ({ label: a.name, value: a.id, desc: a.description }))}
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
					value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0].id : null) : data.selected.map(k => k.id)}
					onChange={value => {
						let ids: string[] = [];
						if (data.count === 1) {
							ids = value !== undefined ? [ value as string ] : [];
						} else {
							ids = value as string[];
						}
						const dataCopy = Utils.copy(data);
						dataCopy.selected = [];
						ids.forEach(id => {
							const domain = domains.find(k => k.id === id);
							if (domain) {
								dataCopy.selected.push(domain);
							}
						});
						if (props.setData) {
							props.setData(props.feature.id, dataCopy);
						}
					}}
				/>
				{
					data.selected.map(domain => (
						<Flex key={domain.id} className='selection-box' align='center' gap={10}>
							<Field
								style={{ flex: '1 1 0' }}
								label={domain.name}
								value={<Markdown text={domain.description} useSpan={true} />}
							/>
							<Button
								style={{ flex: '0 0 auto' }}
								type='text'
								title='Show details'
								icon={<InfoCircleOutlined />}
								onClick={() => setSelectedDomain(domain)}
							/>
						</Flex>
					))
				}
				<Drawer open={!!selectedDomain} onClose={() => setSelectedDomain(null)} closeIcon={null} width='500px'>
					<Modal
						content={selectedDomain ? <DomainPanel domain={selectedDomain} options={props.options} mode={PanelMode.Full} /> : null}
						onClose={() => setSelectedDomain(null)}
					/>
				</Drawer>
			</Space>
		);
	};

	const getSelectionDomainFeature = (data: FeatureDomainFeatureData) => {
		if (!props.hero) {
			return null;
		}

		const options: Feature[] = [];
		HeroLogic.getDomains(props.hero).forEach(d => {
			d.featuresByLevel
				.filter(lvl => lvl.level === data.level)
				.forEach(lvl => options.push(...lvl.features));
		});

		if (options.length === 0) {
			return (
				<Alert
					type='info'
					showIcon={true}
					message='Choose a domain to enable this feature.'
				/>
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{data.count > 1 ? <div className='ds-text'>Choose {data.count}:</div> : null}
				<Select
					style={{ width: '100%' }}
					status={data.selected.length < data.count ? 'warning' : ''}
					mode={data.count === 1 ? undefined : 'multiple'}
					maxCount={data.count === 1 ? undefined : data.count}
					allowClear={true}
					placeholder={data.count === 1 ? 'Select an option' : 'Select options'}
					options={options.map(o => ({ label: o.name, value: o.id, desc: o.description }))}
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
					value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0].id : null) : data.selected.map(f => f.id)}
					onChange={value => {
						let ids: string[] = [];
						if (data.count === 1) {
							ids = value !== undefined ? [ value as string ] : [];
						} else {
							ids = value as string[];
						}
						const features: Feature[] = [];
						ids.forEach(id => {
							const option = options.find(o => o.id === id);
							if (option) {
								const featureCopy = Utils.copy(option) as Feature;
								features.push(featureCopy);
							}
						});
						const dataCopy = Utils.copy(data);
						dataCopy.selected = features;
						if (props.setData) {
							props.setData(props.feature.id, dataCopy);
						}
					}}
				/>
				{
					data.selected.map(f => (
						<FeaturePanel key={f.id} feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
					))
				}
			</Space>
		);
	};

	const getSelectionItemChoice = (data: FeatureItemChoiceData) => {
		if (!props.hero) {
			return null;
		}

		const items = SourcebookLogic.getItems(props.sourcebooks as Sourcebook[])
			.filter(i => data.types.includes(i.type));

		const sortedItems = Collections.sort(items, i => i.name);

		if (sortedItems.length === 0) {
			return (
				<Empty text='There are no options to choose for this feature.' />
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{data.count > 1 ? <div className='ds-text'>Choose {data.count}:</div> : null}
				<Select
					style={{ width: '100%' }}
					status={data.selected.length < data.count ? 'warning' : ''}
					mode={data.count === 1 ? undefined : 'multiple'}
					maxCount={data.count === 1 ? undefined : data.count}
					allowClear={true}
					placeholder={data.count === 1 ? 'Select an item' : 'Select items'}
					options={sortedItems.map(a => ({ label: a.name, value: a.id, desc: a.description }))}
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
					value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0].id : null) : data.selected.map(i => i.id)}
					onChange={value => {
						let ids: string[] = [];
						if (data.count === 1) {
							ids = value !== undefined ? [ value as string ] : [];
						} else {
							ids = value as string[];
						}
						const dataCopy = Utils.copy(data);
						dataCopy.selected = [];
						ids.forEach(id => {
							const item = items.find(i => i.id === id);
							if (item) {
								dataCopy.selected.push(item);
							}
						});
						if (props.setData) {
							props.setData(props.feature.id, dataCopy);
						}
					}}
				/>
				{
					data.selected.map(item => (
						<Flex key={item.id} className='selection-box' align='center' gap={10}>
							<Field
								style={{ flex: '1 1 0' }}
								label={item.name}
								value={<Markdown text={item.description} useSpan={true} />}
							/>
							<Button
								style={{ flex: '0 0 auto' }}
								type='text'
								title='Show details'
								icon={<InfoCircleOutlined />}
								onClick={() => setSelectedItem(item)}
							/>
						</Flex>
					))
				}
				<Drawer open={!!selectedItem} onClose={() => setSelectedItem(null)} closeIcon={null} width='500px'>
					<Modal
						content={selectedItem ? <ItemPanel item={selectedItem} options={props.options} /> : null}
						onClose={() => setSelectedItem(null)}
					/>
				</Drawer>
			</Space>
		);
	};

	const getSelectionKit = (data: FeatureKitData) => {
		if (!props.hero) {
			return null;
		}

		const currentKitIDs = HeroLogic.getKits(props.hero).map(k => k.id);

		const kitTypes = data.types.length > 0 ? data.types : [ '' ];
		const kits = SourcebookLogic.getKits(props.sourcebooks as Sourcebook[])
			.filter(k => kitTypes.includes(k.type));

		const sortedKits = Collections.sort(kits, k => k.name);

		if (sortedKits.length === 0) {
			return (
				<Empty text='There are no options to choose for this feature.' />
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{data.count > 1 ? <div className='ds-text'>Choose {data.count}:</div> : null}
				{
					data.selected.length < data.count ?
						<Button className='status-warning' block={true} onClick={() => setKitSelectorOpen(true)}>
							Choose a kit
						</Button>
						: null
				}
				<Drawer open={kitSelectorOpen} onClose={() => setKitSelectorOpen(false)} closeIcon={null} width='500px'>
					<KitSelectModal
						kits={sortedKits.filter(k => !currentKitIDs.includes(k.id))}
						hero={props.hero}
						options={props.options}
						onSelect={kit => {
							setKitSelectorOpen(false);

							const kitCopy = Utils.copy(kit);

							const dataCopy = Utils.copy(data);
							dataCopy.selected.push(kitCopy);
							if (props.setData) {
								props.setData(props.feature.id, dataCopy);
							}
						}}
						onClose={() => setKitSelectorOpen(false)}
					/>
				</Drawer>
				{
					data.selected.map(kit => (
						<Flex key={kit.id} className='selection-box' align='center' gap={10}>
							<Field
								style={{ flex: '1 1 0' }}
								label={kit.name}
								value={<Markdown text={kit.description} useSpan={true} />}
							/>
							<Flex vertical={true}>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Show details'
									icon={<InfoCircleOutlined />}
									onClick={() => setSelectedKit(kit)}
								/>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Remove'
									icon={<CloseOutlined />}
									onClick={() => {
										const dataCopy = Utils.copy(data);
										dataCopy.selected = dataCopy.selected.filter(k => k.id !== kit.id);
										if (props.setData) {
											props.setData(props.feature.id, dataCopy);
										}
									}}
								/>
							</Flex>
						</Flex>
					))
				}
				<Drawer open={!!selectedKit} onClose={() => setSelectedKit(null)} closeIcon={null} width='500px'>
					<Modal
						content={selectedKit ? <KitPanel kit={selectedKit} options={props.options} mode={PanelMode.Full} /> : null}
						onClose={() => setSelectedKit(null)}
					/>
				</Drawer>
			</Space>
		);
	};

	const getSelectionLanguageChoice = (data: FeatureLanguageChoiceData) => {
		const currentLanguages: string[] = [];
		if (props.hero) {
			HeroLogic.getFeatures(props.hero)
				.map(f => f.feature)
				.filter(f => f.id !== props.feature.id)
				.forEach(f => {
					const addCurrent = (language: string) => {
						if (!data.selected.includes(language)) {
							currentLanguages.push(language);
						}
					};

					switch (f.type) {
						case FeatureType.Language:
							addCurrent(f.data.language);
							break;
						case FeatureType.LanguageChoice:
							f.data.selected.forEach(addCurrent);
							break;
					}
				});
			if (props.hero.culture) {
				currentLanguages.push(...props.hero.culture.languages);
			}
		}

		const languages = SourcebookLogic.getLanguages(props.sourcebooks as Sourcebook[]);
		const distinctLanguages = Collections.distinct(languages, l => l.name);
		const sortedLanguages = Collections.sort(distinctLanguages, l => l.name);

		if (sortedLanguages.length === 0) {
			return (
				<Empty text='There are no options to choose for this feature.' />
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{data.count > 1 ? <div className='ds-text'>Choose {data.count}:</div> : null}
				{
					data.selected.map((language, n) => (
						<Flex key={n} className='selection-box' align='center' gap={10}>
							<div className='ds-text' style={{ flex: '1 1 0' }}>{language}</div>
							<Flex vertical={true}>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Remove'
									icon={<CloseOutlined />}
									onClick={() => {
										const dataCopy = Utils.copy(data);
										dataCopy.selected = dataCopy.selected.filter(l => l !== language);
										if (props.setData) {
											props.setData(props.feature.id, dataCopy);
										}
									}}
								/>
							</Flex>
						</Flex>
					))
				}
				{
					(data.selected.length < data.count) || (data.count === -1) ?
						<Button className='status-warning' block={true} onClick={() => setLanguageSelectorOpen(true)}>
							Choose a language
						</Button>
						: null
				}
				<Drawer open={languageSelectorOpen} onClose={() => setLanguageSelectorOpen(false)} closeIcon={null} width='500px'>
					<LanguageSelectModal
						languages={sortedLanguages.filter(l => !currentLanguages.includes(l.name))}
						onSelect={l => {
							setLanguageSelectorOpen(false);

							const dataCopy = Utils.copy(data);
							dataCopy.selected.push(l.name);
							if (props.setData) {
								props.setData(props.feature.id, dataCopy);
							}
						}}
						onClose={() => setLanguageSelectorOpen(false)}
					/>
				</Drawer>
			</Space>
		);
	};

	const getSelectionPerk = (data: FeaturePerkData) => {
		if (!props.hero) {
			return null;
		}

		const currentPerkIDs = HeroLogic.getFeatures(props.hero)
			.map(f => f.feature)
			.filter(f => f.id !== props.feature.id)
			.filter(f => f.type === FeatureType.Perk)
			.flatMap(f => f.data.selected)
			.map(p => p.id);

		const perks = SourcebookLogic.getPerks(props.sourcebooks as Sourcebook[]).filter(p => data.lists.includes(p.list));
		const sortedPerks = Collections.sort(perks, p => p.name);

		if (sortedPerks.length === 0) {
			return (
				<Empty text='There are no options to choose for this feature.' />
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{data.count > 1 ? <div className='ds-text'>Choose {data.count}:</div> : null}
				{
					data.selected.map(perk => (
						<Flex key={perk.id} className='selection-box' align='center' gap={10}>
							<Field
								style={{ flex: '1 1 0' }}
								label={perk.name}
								value={<Markdown text={perk.description} useSpan={true} />}
							/>
							<Flex vertical={true}>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Show details'
									icon={<InfoCircleOutlined />}
									onClick={() => setSelectedPerk(perk)}
								/>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Remove'
									icon={<CloseOutlined />}
									onClick={() => {
										const dataCopy = Utils.copy(data);
										dataCopy.selected = dataCopy.selected.filter(p => p.id !== perk.id);
										if (props.setData) {
											props.setData(props.feature.id, dataCopy);
										}
									}}
								/>
							</Flex>
						</Flex>
					))
				}
				{
					data.selected.length < data.count ?
						<Button className='status-warning' block={true} onClick={() => setPerkSelectorOpen(true)}>
							Choose a perk
						</Button>
						: null
				}
				<Drawer open={perkSelectorOpen} onClose={() => setPerkSelectorOpen(false)} closeIcon={null} width='500px'>
					<PerkSelectModal
						perks={sortedPerks.filter(p => !currentPerkIDs.includes(p.id))}
						hero={props.hero}
						options={props.options}
						onSelect={perk => {
							setPerkSelectorOpen(false);

							const dataCopy = Utils.copy(data);
							dataCopy.selected.push(perk);
							if (props.setData) {
								props.setData(props.feature.id, dataCopy);
							}
						}}
						onClose={() => setPerkSelectorOpen(false)}
					/>
				</Drawer>
				<Drawer open={!!selectedPerk} onClose={() => setSelectedPerk(null)} closeIcon={null} width='500px'>
					<Modal
						content={selectedPerk ? <PerkPanel perk={selectedPerk} options={props.options} mode={PanelMode.Full} /> : null}
						onClose={() => setSelectedPerk(null)}
					/>
				</Drawer>
			</Space>
		);
	};

	const getSelectionSkillChoice = (data: FeatureSkillChoiceData) => {
		const currentSkills: string[] = [];
		if (props.hero) {
			HeroLogic.getFeatures(props.hero)
				.map(f => f.feature)
				.filter(f => f.id !== props.feature.id)
				.forEach(f => {
					const addCurrent = (skill: string) => {
						if (!data.selected.includes(skill)) {
							currentSkills.push(skill);
						}
					};

					switch (f.type) {
						case FeatureType.Skill:
							addCurrent(f.data.skill);
							break;
						case FeatureType.SkillChoice:
							f.data.selected.forEach(addCurrent);
							break;
					}
				});
		}

		const skills = SourcebookLogic.getSkills(props.sourcebooks as Sourcebook[])
			.filter(skill => (data.options.includes(skill.name)) || (data.listOptions.includes(skill.list)));
		const distinctSkills = Collections.distinct(skills, s => s.name);
		const sortedSkills = Collections.sort(distinctSkills, s => s.name);

		if (sortedSkills.length === 0) {
			return (
				<Empty text='There are no options to choose for this feature.' />
			);
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{data.count > 1 ? <div className='ds-text'>Choose {data.count}:</div> : null}
				{
					data.selected.map((language, n) => (
						<Flex key={n} className='selection-box' align='center' gap={10}>
							<div className='ds-text' style={{ flex: '1 1 0' }}>{language}</div>
							<Flex vertical={true}>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Remove'
									icon={<CloseOutlined />}
									onClick={() => {
										const dataCopy = Utils.copy(data);
										dataCopy.selected = dataCopy.selected.filter(l => l !== language);
										if (props.setData) {
											props.setData(props.feature.id, dataCopy);
										}
									}}
								/>
							</Flex>
						</Flex>
					))
				}
				{
					(data.selected.length < data.count) || (data.count === -1) ?
						<Button className='status-warning' block={true} onClick={() => setSkillSelectorOpen(true)}>
							Choose a Skill
						</Button>
						: null
				}
				<Drawer open={skillSelectorOpen} onClose={() => setSkillSelectorOpen(false)} closeIcon={null} width='500px'>
					<SkillSelectModal
						skills={sortedSkills.filter(s => !currentSkills.includes(s.name))}
						onSelect={s => {
							setSkillSelectorOpen(false);

							const dataCopy = Utils.copy(data);
							dataCopy.selected.push(s.name);
							if (props.setData) {
								props.setData(props.feature.id, dataCopy);
							}
						}}
						onClose={() => setSkillSelectorOpen(false)}
					/>
				</Drawer>
			</Space>
		);
	};

	const getSelectionSummon = (data: FeatureSummonData) => {
		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					!data.selected ?
						<Button block={true} onClick={() => setMonsterSelectorOpen(true)}>Select</Button>
						: null
				}
				{
					data.selected.map(monster => (
						<Flex className='selection-box' align='center' gap={10}>
							<MonsterInfo
								style={{ flex: '1 1 0' }}
								monster={monster}
							/>
							<div style={{ flex: '0 0 auto' }}>
								<Button
									type='text'
									title='Show details'
									icon={<InfoCircleOutlined />}
									onClick={() => setSelectedMonster(monster)}
								/>
								<Button
									type='text'
									title='Remove'
									icon={<CloseOutlined />}
									onClick={() => {
										const dataCopy = Utils.copy(data);
										dataCopy.selected = dataCopy.selected.filter(m => m.id !== monster.id);
										if (props.setData) {
											props.setData(props.feature.id, dataCopy);
										}
									}}
								/>
							</div>
						</Flex>
					))
				}
				{
					data.selected.length < data.count ?
						<Button className='status-warning' block={true} onClick={() => setMonsterSelectorOpen(true)}>
							Choose a monster
						</Button>
						: null
				}
				<Drawer open={monsterSelectorOpen} onClose={() => setMonsterSelectorOpen(false)} closeIcon={null} width='500px'>
					<MonsterSelectModal
						monsters={
							data.options.length > 0 ?
								data.options
								:
								props.sourcebooks ? props.sourcebooks.flatMap(sb => sb.monsterGroups).flatMap(g => g.monsters) : []
						}
						options={props.options}
						onSelect={monster => {
							setMonsterSelectorOpen(false);

							const dataCopy = Utils.copy(data);
							dataCopy.selected.push(Utils.copy(monster));
							if (props.setData) {
								props.setData(props.feature.id, dataCopy);
							}
						}}
						onClose={() => setMonsterSelectorOpen(false)}
					/>
				</Drawer>
				<Drawer open={!!selectedMonster} onClose={() => setSelectedMonster(null)} closeIcon={null} width='500px'>
					{selectedMonster ? <MonsterModal monster={selectedMonster} options={props.options} onClose={() => setSelectedMonster(null)} /> : null}
				</Drawer>
			</Space>
		);
	};

	const getSelectionTaggedFeatureChoice = (data: FeatureTaggedFeatureChoiceData) => {
		if (!props.hero) {
			return null;
		}

		const currentTaggedFeatureIDs = HeroLogic.getFeatures(props.hero)
			.map(f => f.feature)
			.filter(f => f.id !== props.feature.id)
			.filter(f => f.type === FeatureType.TaggedFeatureChoice)
			.filter(f => f.data.tag === data.tag)
			.flatMap(f => f.data.selected)
			.map(p => p.id);

		const features = HeroLogic.getFeatures(props.hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.TaggedFeature)
			.filter(f => f.data.tag === data.tag);
		const sortedFeatures = Collections.sort(features, f => f.name);

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{data.count > 1 ? <div className='ds-text'>Choose {data.count}:</div> : null}
				{
					sortedFeatures.length > 0 ?
						<Select
							style={{ width: '100%' }}
							status={data.selected.length < data.count ? 'warning' : ''}
							mode={data.count === 1 ? undefined : 'multiple'}
							maxCount={data.count === 1 ? undefined : data.count}
							allowClear={true}
							placeholder={data.count === 1 ? 'Select a feature' : 'Select features'}
							options={sortedFeatures.map(f => ({ label: f.name, value: f.id, desc: f.description || f.type, disabled: currentTaggedFeatureIDs.includes(f.id) }))}
							optionRender={option => <Field disabled={option.data.disabled} label={option.data.label} value={option.data.desc} />}
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
							value={data.count === 1 ? (data.selected.length > 0 ? data.selected[0].id : null) : data.selected.map(k => k.id)}
							onChange={value => {
								let ids: string[] = [];
								if (data.count === 1) {
									ids = value !== undefined ? [ value as string ] : [];
								} else {
									ids = value as string[];
								}
								const dataCopy = Utils.copy(data);
								dataCopy.selected = [];
								ids.forEach(id => {
									const feature = features.find(f => f.id === id);
									if (feature) {
										dataCopy.selected.push(feature);
									}
								});
								if (props.setData) {
									props.setData(props.feature.id, dataCopy);
								}
							}}
						/>
						:
						<Empty text='There are no options to choose for this feature.' />
				}
				{
					data.selected.map(feature => {
						return (
							<FeaturePanel key={feature.id} feature={feature} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
						);
					})
				}
			</Space>
		);
	};

	const getSelectionTitleChoice = (data: FeatureTitleChoiceData) => {
		if (!props.hero) {
			return null;
		}

		const currentTitleIDs = HeroLogic.getFeatures(props.hero)
			.map(f => f.feature)
			.filter(f => f.id !== props.feature.id)
			.filter(f => f.type === FeatureType.TitleChoice)
			.flatMap(f => f.data.selected)
			.map(p => p.id);

		const titles = SourcebookLogic.getTitles(props.sourcebooks as Sourcebook[]).filter(t => t.echelon === data.echelon);
		const availableTitles = titles.filter(t => !currentTitleIDs.includes(t.id));
		const sortedTitles = Collections.sort(availableTitles, t => t.name);

		const customTitle = FactoryLogic.createTitle();
		customTitle.name = 'Custom Title';
		customTitle.features.push(FactoryLogic.feature.create({ id: Utils.guid(), name: 'Custom Benefit', description: 'Details' }));

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{data.count > 1 ? <div className='ds-text'>Choose {data.count}:</div> : null}
				{
					data.selected.map(t => {
						const feature = t.features.find(f => f.id === t.selectedFeatureID);
						if (!feature) {
							return null;
						}
						return (
							<Flex key={t.id} className='selection-box' align='center' gap={10}>
								<Flex vertical={true} style={{ flex: '1 1 0' }}>
									<Field
										label={t.name}
										value={<Markdown text={t.description} useSpan={true} />}
									/>
									<Field
										label={feature.name}
										value={<Markdown text={feature.description} useSpan={true} />}
									/>
								</Flex>
								<Flex vertical={true}>
									<Button
										style={{ flex: '0 0 auto' }}
										type='text'
										title='Show details'
										icon={<InfoCircleOutlined />}
										onClick={() => setSelectedTitle(t)}
									/>
									<Button
										style={{ flex: '0 0 auto' }}
										type='text'
										title='Remove'
										icon={<CloseOutlined />}
										onClick={() => {
											const dataCopy = Utils.copy(data);
											dataCopy.selected = dataCopy.selected.filter(x => x.id !== t.id);
											if (props.setData) {
												props.setData(props.feature.id, dataCopy);
											}
										}}
									/>
								</Flex>
							</Flex>
						);
					})
				}
				{
					data.selected.length < data.count ?
						<Button className='status-warning' block={true} onClick={() => setTitleSelectorOpen(true)}>
							Choose a title
						</Button>
						: null
				}
				<Drawer open={titleSelectorOpen} onClose={() => setTitleSelectorOpen(false)} closeIcon={null} width='500px'>
					<TitleSelectModal
						titles={[ customTitle, ...sortedTitles ]}
						hero={props.hero}
						options={props.options}
						onSelect={title => {
							setTitleSelectorOpen(false);

							const dataCopy = Utils.copy(data);
							dataCopy.selected.push(title);
							if (props.setData) {
								props.setData(props.feature.id, dataCopy);
							}
						}}
						onClose={() => setTitleSelectorOpen(false)}
					/>
				</Drawer>
				<Drawer open={!!selectedTitle} onClose={() => setSelectedTitle(null)} closeIcon={null} width='500px'>
					<Modal
						content={
							selectedTitle ?
								<TitlePanel
									title={selectedTitle}
									options={props.options}
									mode={PanelMode.Full}
									onChange={title => {
										const dataCopy = Utils.copy(data);
										const index = dataCopy.selected.findIndex(t => t.id === title.id);
										if (index !== -1) {
											dataCopy.selected[index] = title;
											if (props.setData) {
												props.setData(props.feature.id, dataCopy);
											}
										}
									}}
								/>
								: null
						}
						onClose={() => setSelectedTitle(null)}
					/>
				</Drawer>
			</Space>
		);
	};

	const getSelection = () => {
		switch (props.feature.type) {
			case FeatureType.AncestryChoice:
				return getSelectionAncestryChoice(props.feature.data);
			case FeatureType.AncestryFeatureChoice:
				return getSelectionAncestryFeatureChoice(props.feature.data);
			case FeatureType.Choice:
				return getSelectionChoice(props.feature.data);
			case FeatureType.ClassAbility:
				return getSelectionClassAbility(props.feature.data);
			case FeatureType.Companion:
				return getSelectionCompanion(props.feature.data);
			case FeatureType.Domain:
				return getSelectionDomain(props.feature.data);
			case FeatureType.DomainFeature:
				return getSelectionDomainFeature(props.feature.data);
			case FeatureType.ItemChoice:
				return getSelectionItemChoice(props.feature.data);
			case FeatureType.Kit:
				return getSelectionKit(props.feature.data);
			case FeatureType.LanguageChoice:
				return getSelectionLanguageChoice(props.feature.data);
			case FeatureType.Perk:
				return getSelectionPerk(props.feature.data);
			case FeatureType.SkillChoice:
				return getSelectionSkillChoice(props.feature.data);
			case FeatureType.Summon:
				return getSelectionSummon(props.feature.data);
			case FeatureType.TaggedFeatureChoice:
				return getSelectionTaggedFeatureChoice(props.feature.data);
			case FeatureType.TitleChoice:
				return getSelectionTitleChoice(props.feature.data);
		}

		return null;
	};

	// #endregion

	// #region Information

	const getInformationAbilityCost = (data: FeatureAbilityCostData) => {
		return (
			<Field label={data.keywords.join(', ')} value={`Heroic resource cost ${data.modifier >= 0 ? '+' : ''}${data.modifier}`} />
		);
	};

	const getInformationAbilityDamage = (data: FeatureAbilityDamageData) => {
		return (
			<Field label={data.keywords.join(', ')} value={`${FormatLogic.getModifier(data)} ${data.damageType}`} />
		);
	};

	const getInformationAbilityDistance = (data: FeatureAbilityDistanceData) => {
		return (
			<Field label={data.keywords.join(', ')} value={`${FormatLogic.getModifier(data)} distance`} />
		);
	};

	const getInformationAncestryChoice = (data: FeatureAncestryChoiceData) => {
		if (!data.selected) {
			return null;
		}

		return (
			<AncestryPanel ancestry={data.selected} options={props.options} />
		);
	};

	const getInformationAncestryFeatureChoice = (data: FeatureAncestryFeatureChoiceData) => {
		if (!data.selected) {
			return (
				<div className='ds-text'>A {data.value}pt ancestry feature.</div>
			);
		}

		return null;
	};

	const getInformationBonus = (data: FeatureBonusData) => {
		return (
			<Field label={data.field} value={FormatLogic.getModifier(data)} />
		);
	};

	const getInformationCharacteristicBonus = (data: FeatureCharacteristicBonusData) => {
		return (
			<Field label={data.characteristic} value={data.value} />
		);
	};

	const getInformationChoice = (data: FeatureChoiceData) => {
		if (data.selected.length > 0) {
			return (
				<Space direction='vertical' style={{ width: '100%', padding: '0 20px', borderLeft: '5px solid rgb(200 200 200)' }}>
					{data.selected.map(f => <FeaturePanel key={f.id} feature={f} options={props.options} mode={PanelMode.Full} />)}
				</Space>
			);
		}

		if (data.options.length === 0) {
			return null;
		}

		const showCosts = data.options.some(o => o.value > 1);
		return (
			<div>
				<div className='ds-text'>
					{
						showCosts ?
							`You have ${data.count} points to spend on the following options:`
							:
							`Choose ${data.count} of the following options:`
					}
				</div>
				<Space direction='vertical' style={{ width: '100%', padding: '0 20px', borderLeft: '5px solid rgb(200 200 200)' }}>
					{data.options.map(o => <FeaturePanel key={o.feature.id} feature={o.feature} options={props.options} cost={showCosts ? o.value : undefined} mode={PanelMode.Full} />)}
				</Space>
			</div>
		);
	};

	const getInformationClassAbility = (data: FeatureClassAbilityData) => {
		if ((data.selectedIDs.length > 0) && props.hero && props.hero.class) {
			const abilities = props.hero.class.abilities.filter(a => a.cost === data.cost) || [];
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						data.selectedIDs.map(id => {
							const ability = abilities.find(a => a.id === id) as Ability;
							return (
								<AbilityPanel key={ability.id} ability={ability} mode={PanelMode.Full} />
							);
						})
					}
				</Space>
			);
		}

		if (!props.feature.description) {
			return (
				<div className='ds-text'>
					Choose {data.count > 1 ? data.count : 'a'} {(data.cost === 'signature') || (data.cost === 0) ? 'signature' : `${data.cost}pt`} {data.count > 1 ? 'abilities' : 'ability'}.
				</div>
			);
		}

		return null;
	};

	const getInformationCompanion = (data: FeatureCompanionData) => {
		if (data.selected === null) {
			return (
				<div className='ds-text'>
					Choose a {data.type}.
				</div>
			);
		}

		return <MonsterPanel monster={data.selected} options={props.options} />;
	};

	const getInformationConditionImmunity = (data: FeatureConditionImmunityData) => {
		return (
			<Field label='Cannot Be' value={data.conditions.join(', ')} />
		);
	};

	const getInformationDamageModifier = (data: FeatureDamageModifierData) => {
		if (!props.feature.description) {
			return (
				<div className='ds-text'>
					{data.modifiers.map(FormatLogic.getDamageModifier).join(', ')}
				</div>
			);
		}

		return null;
	};

	const getInformationDomain = (data: FeatureDomainData) => {
		if (data.selected.length > 0) {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						data.selected.map(d => <DomainPanel key={d.id} domain={d} options={props.options} />)
					}
				</Space>
			);
		}

		if (!props.feature.description) {
			return (
				<div className='ds-text'>Choose {data.count > 1 ? data.count : 'a'} {data.count > 1 ? 'domains' : 'domain'}.</div>
			);
		}

		return null;
	};

	const getInformationDomainFeature = (data: FeatureDomainFeatureData) => {
		if (data.selected.length === 0) {
			return null;
		}

		if (!props.feature.description) {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						data.selected.map(f => <FeaturePanel key={f.id} feature={f} options={props.options} />)
					}
				</Space>
			);
		}

		return null;
	};

	const getInformationHeroicResourceFeature = (data: FeatureHeroicResourceData) => {
		const gains = [ ...data.gains ];
		if (props.hero) {
			HeroLogic.getFeatures(props.hero)
				.map(f => f.feature)
				.filter(f => f.type === FeatureType.HeroicResourceGain)
				.forEach(f => gains.push(f.data));
		}

		return (
			<>
				<ul>
					{
						gains.map((g, n) => (
							<li key={n}>
								<Flex align='center' justify='space-between' gap={10}>
									<div className='ds-text compact-text'>{g.trigger}</div>
									<Pill>+{g.value}</Pill>
								</Flex>
							</li>
						))
					}
				</ul>
				<Markdown text={data.details} />
			</>
		);
	};

	const getInformationHeroicResourceGainFeature = (data: FeatureHeroicResourceGainData) => {
		return (
			<>
				<div className='ds-text'></div>
				<ul>
					<li>
						<Flex align='center' justify='space-between' gap={10}>
							<div className='ds-text compact-text'>{data.trigger}</div>
							<Pill>+{data.value}</Pill>
						</Flex>
					</li>
				</ul>
			</>
		);
	};

	const getInformationItemChoice = (data: FeatureItemChoiceData) => {
		if (data.selected.length > 0) {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						data.selected.map(i => <ItemPanel key={i.id} item={i} options={props.options} />)
					}
				</Space>
			);
		}

		if (!props.feature.description) {
			let types = data.types.join(', ') || 'item';
			if (data.count > 1) {
				types = `${data.count} ${types}s`;
			} else {
				if (Format.startsWithVowel(types)) {
					types = `an ${types}`;
				} else {
					types = `a ${types}`;
				}
			}
			return (
				<div className='ds-text'>Choose {types}.</div>
			);
		}

		return null;
	};

	const getInformationKit = (data: FeatureKitData) => {
		if (data.selected.length > 0) {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						data.selected.map(k => <KitPanel key={k.id} kit={k} options={props.options} />)
					}
				</Space>
			);
		}

		if (!props.feature.description) {
			return (
				<div className='ds-text'>Choose {data.count > 1 ? data.count : 'a'} {data.types.join(', ')} {data.count > 1 ? 'kits' : 'kit'}.</div>
			);
		}

		return null;
	};

	const getInformationLanguage = (data: FeatureLanguageData) => {
		if (!props.feature.description) {
			return (
				<Field label='Language' value={data.language} />
			);
		}

		return null;
	};

	const getInformationLanguageChoice = (data: FeatureLanguageChoiceData) => {
		if (data.selected.length > 0) {
			return (
				<Field label='Language' value={data.selected.join(', ')} />
			);
		}

		if (!props.feature.description) {
			return (
				<div className='ds-text'>Choose {data.count > 1 ? data.count : 'a'} {data.count > 1 ? 'languages' : 'language'}.</div>
			);
		}

		return null;
	};

	const getInformationMalice = (data: FeatureMaliceData) => {
		const sections = (data.sections ?? []).map((section, n) => (typeof section === 'string') ?
			<Markdown key={n} text={section} />
			:
			<PowerRollPanel key={n} powerRoll={section} test={true} />
		);

		return (
			<div>
				{sections}
			</div>
		);
	};

	const getInformationMovementMode = (data: FeatureMovementModeData) => {
		return (
			<div className='ds-text'>
				You gain the <b>{data.mode}</b> movement mode.
			</div>
		);
	};

	const getInformationMultiple = (data: FeatureMultipleData) => {
		if (data.features.length === 0) {
			return null;
		}

		return (
			<div>
				<Space direction='vertical' style={{ width: '100%', padding: '0 20px', borderLeft: '5px solid rgb(200 200 200)' }}>
					{data.features.map(f => <FeaturePanel key={f.id} feature={f} options={props.options} mode={props.mode} />)}
				</Space>
			</div>
		);
	};

	const getInformationPackage = () => {
		if (!props.hero) {
			return null;
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					HeroLogic.getDomains(props.hero).map(domain => (
						<div key={domain.id}>
							<div className='ds-text bold-text'>{domain.name}</div>
							<Markdown text={domain.piety} />
						</div>
					))
				}
			</Space>
		);
	};

	const getInformationPerk = (data: FeaturePerkData) => {
		if (data.selected.length > 0) {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						data.selected.map(p => <PerkPanel key={p.id} perk={p} options={props.options} />)
					}
				</Space>
			);
		}

		if (!props.feature.description) {
			return (
				<div className='ds-text'>Choose {data.count > 1 ? data.count : 'a'} {data.count > 1 ? 'perks' : 'perk'}.</div>
			);
		}

		return null;
	};

	const getInformationProficiency = (data: FeatureProficiencyData) => {
		return (
			<>
				{data.weapons.length > 0 ? <Field label='Weapons' value={data.weapons.join(', ')} /> : null}
				{data.armor.length > 0 ? <Field label='Armor' value={data.armor.join(', ')} /> : null}
			</>
		);
	};

	const getInformationSize = (data: FeatureSizeData) => {
		if (!props.feature.description) {
			return (
				<Field label='Size' value={FormatLogic.getSize(data.size)} />
			);
		}

		return null;
	};

	const getInformationSkill = (data: FeatureSkillData) => {
		if (!props.feature.description) {
			return (
				<Field label='Skill' value={data.skill} />
			);
		}

		return null;
	};

	const getInformationSkillChoice = (data: FeatureSkillChoiceData) => {
		if (data.selected.length > 0) {
			return (
				<Field label='Skill' value={data.selected.join(', ')} />
			);
		}

		if (!props.feature.description) {
			const count = data.count || 1;
			const names = (Collections.sort(data.options, o => o) || []).concat((Collections.sort(data.listOptions, o => o) || []).map(l => `the ${l} list`)).join(', ');
			const str = (count > 1 ? `Choose ${count} skills from ${names}.` : `Choose a skill from ${names}.`);

			return (
				<div className='ds-text'>{str}</div>
			);
		}

		return null;
	};

	const getInformationSpeed = (data: FeatureSpeedData) => {
		if (!props.feature.description) {
			return (
				<Field label='Speed' value={data.speed} />
			);
		}

		return null;
	};

	const getInformationSummon = (data: FeatureSummonData) => {
		if (data.selected.length > 0) {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						data.selected.map(m => <MonsterPanel key={m.id} monster={m} options={props.options} />)
					}
				</Space>
			);
		}

		if (!props.feature.description) {
			return (
				<div className='ds-text'>Choose {data.count > 1 ? data.count : 'a'} {data.count > 1 ? 'monsters' : 'monster'}.</div>
			);
		}

		return null;
	};

	const getInformationTaggedFeature = (data: FeatureTaggedFeatureData) => {
		return (
			<FeaturePanel key={data.feature.id} feature={data.feature} options={props.options} />
		);
	};

	const getInformationTaggedFeatureChoice = (data: FeatureTaggedFeatureChoiceData) => {
		if (data.selected.length > 0) {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						data.selected.map(f => <FeaturePanel key={f.id} feature={f} options={props.options} />)
					}
				</Space>
			);
		}

		if (!props.feature.description) {
			return (
				<div className='ds-text'>Choose {data.count > 1 ? data.count : 'a'} '{data.tag}' {data.count > 1 ? 'features' : 'feature'}.</div>
			);
		}

		return null;
	};

	const getInformationTitleChoice = (data: FeatureTitleChoiceData) => {
		if (data.selected.length > 0) {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						data.selected.map(t => <TitlePanel key={t.id} title={t} options={props.options} />)
					}
				</Space>
			);
		}

		if (!props.feature.description) {
			return (
				<div className='ds-text'>Choose {data.count > 1 ? data.count : 'a'} {data.count > 1 ? 'titles' : 'title'}.</div>
			);
		}

		return null;
	};

	const getInformation = () => {
		switch (props.feature.type) {
			case FeatureType.AbilityCost:
				return getInformationAbilityCost(props.feature.data);
			case FeatureType.AbilityDamage:
				return getInformationAbilityDamage(props.feature.data);
			case FeatureType.AbilityDistance:
				return getInformationAbilityDistance(props.feature.data);
			case FeatureType.AncestryChoice:
				return getInformationAncestryChoice(props.feature.data);
			case FeatureType.AncestryFeatureChoice:
				return getInformationAncestryFeatureChoice(props.feature.data);
			case FeatureType.Bonus:
				return getInformationBonus(props.feature.data);
			case FeatureType.CharacteristicBonus:
				return getInformationCharacteristicBonus(props.feature.data);
			case FeatureType.Choice:
				return getInformationChoice(props.feature.data);
			case FeatureType.ClassAbility:
				return getInformationClassAbility(props.feature.data);
			case FeatureType.Companion:
				return getInformationCompanion(props.feature.data);
			case FeatureType.ConditionImmunity:
				return getInformationConditionImmunity(props.feature.data);
			case FeatureType.DamageModifier:
				return getInformationDamageModifier(props.feature.data);
			case FeatureType.Domain:
				return getInformationDomain(props.feature.data);
			case FeatureType.DomainFeature:
				return getInformationDomainFeature(props.feature.data);
			case FeatureType.HeroicResource:
				return getInformationHeroicResourceFeature(props.feature.data);
			case FeatureType.HeroicResourceGain:
				return getInformationHeroicResourceGainFeature(props.feature.data);
			case FeatureType.ItemChoice:
				return getInformationItemChoice(props.feature.data);
			case FeatureType.Kit:
				return getInformationKit(props.feature.data);
			case FeatureType.Language:
				return getInformationLanguage(props.feature.data);
			case FeatureType.LanguageChoice:
				return getInformationLanguageChoice(props.feature.data);
			case FeatureType.Malice:
				return getInformationMalice(props.feature.data);
			case FeatureType.MovementMode:
				return getInformationMovementMode(props.feature.data);
			case FeatureType.Multiple:
				return getInformationMultiple(props.feature.data);
			case FeatureType.Package:
				return getInformationPackage();
			case FeatureType.Perk:
				return getInformationPerk(props.feature.data);
			case FeatureType.Proficiency:
				return getInformationProficiency(props.feature.data);
			case FeatureType.Size:
				return getInformationSize(props.feature.data);
			case FeatureType.Skill:
				return getInformationSkill(props.feature.data);
			case FeatureType.SkillChoice:
				return getInformationSkillChoice(props.feature.data);
			case FeatureType.Speed:
				return getInformationSpeed(props.feature.data);
			case FeatureType.Summon:
				return getInformationSummon(props.feature.data);
			case FeatureType.TaggedFeature:
				return getInformationTaggedFeature(props.feature.data);
			case FeatureType.TaggedFeatureChoice:
				return getInformationTaggedFeatureChoice(props.feature.data);
			case FeatureType.TitleChoice:
				return getInformationTitleChoice(props.feature.data);
		}

		return null;
	};

	// #endregion

	const autoCalcAvailable = () => {
		return props.hero
			&& (props.feature.type === FeatureType.Text)
			&& (AbilityLogic.getTextEffect(props.feature.description, props.hero) !== props.feature.description);
	};

	try {
		const tags = [];
		if (props.source) {
			tags.push(props.source);
		}
		const list = (props.feature as Perk).list;
		if (list !== undefined) {
			tags.push(list);
		}
		if (props.feature.type === FeatureType.AddOn) {
			tags.push(props.feature.data.category);
		}
		if (props.feature.type === FeatureType.HeroicResource) {
			switch (props.feature.data.type) {
				case 'heroic':
					tags.push('Heroic Resource');
					break;
				case 'epic':
					tags.push('Epic Resource');
					break;
			}
		}
		if (props.feature.type === FeatureType.TaggedFeature) {
			tags.push(props.feature.data.tag);
		}

		if (props.feature.type === FeatureType.Ability) {
			return (
				<AbilityPanel ability={props.feature.data.ability} hero={props.hero} cost={props.cost} repeatable={props.repeatable} mode={props.mode} tags={tags} />
			);
		}

		if (props.feature.type === FeatureType.AncestryFeatureChoice) {
			if (props.feature.data.selected) {
				return (
					<FeaturePanel feature={props.feature.data.selected} options={props.options} style={props.style} />
				);
			}
		}

		if (props.feature.type === FeatureType.Follower) {
			return (
				<FollowerPanel follower={props.feature.data.follower} mode={PanelMode.Full} />
			);
		}

		let customization: AbilityCustomization | null = null;
		if (props.hero) {
			customization = props.hero.abilityCustomizations.find(ac => ac.abilityID === props.feature.id) || null;
		}

		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'feature-panel' : 'feature-panel compact'} id={props.mode === PanelMode.Full ? props.feature.id : undefined} style={props.style}>
					<HeaderText
						ribbon={
							props.cost === 'signature' ?
								<Pill>Signature</Pill>
								:
								props.cost ?
									<ResourcePill value={props.cost} repeatable={props.repeatable} />
									: null
						}
						tags={tags}
						extra={
							autoCalcAvailable() ?
								<Button
									type='text'
									title='Auto-calculate damage, potency, etc'
									icon={autoCalc ? <ThunderboltFilled style={{ color: 'rgb(22, 119, 255)' }} /> : <ThunderboltOutlined />}
									onClick={e => { e.stopPropagation(); setAutoCalc(!autoCalc); }}
								/>
								: null
						}
					>
						{customization?.name || props.feature.name || 'Unnamed Feature'}
					</HeaderText>
					<Markdown
						text={
							(props.feature.type === FeatureType.Text) && autoCalc && props.hero ?
								AbilityLogic.getTextEffect(customization?.description || props.feature.description, props.hero)
								:
								(customization?.description || props.feature.description)
						}
					/>
					{
						props.mode === PanelMode.Full
							? (props.setData ? getSelection() : getInformation())
							: null
					}
					{
						customization && customization.notes ?
							<Field
								label='Notes'
								value={<Markdown text={customization.notes} useSpan={true} />}
							/>
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
