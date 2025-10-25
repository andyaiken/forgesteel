import { Alert, Button, Drawer, Flex, Input, Select, Space } from 'antd';
import { CloseOutlined, InfoCircleOutlined, ThunderboltFilled, ThunderboltOutlined } from '@ant-design/icons';
import { Feature, FeatureAncestryChoiceData, FeatureAncestryFeatureChoiceData, FeatureChoiceData, FeatureClassAbilityData, FeatureCompanionData, FeatureData, FeatureDomainData, FeatureDomainFeatureData, FeatureItemChoiceData, FeatureKitData, FeatureLanguageChoiceData, FeaturePerkData, FeatureSkillChoiceData, FeatureSummonChoiceData, FeatureTaggedFeatureChoiceData, FeatureTitleChoiceData } from '@/models/feature';
import { Ability } from '@/models/ability';
import { AbilityLogic } from '@/logic/ability-logic';
import { AbilityModal } from '@/components/modals/ability/ability-modal';
import { AbilitySelectModal } from '@/components/modals/select/ability-select/ability-select-modal';
import { Ancestry } from '@/models/ancestry';
import { AncestryPanel } from '@/components/panels/elements/ancestry-panel/ancestry-panel';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Domain } from '@/models/domain';
import { DomainPanel } from '@/components/panels/elements/domain-panel/domain-panel';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureSelectModal } from '@/components/modals/select/feature-select/feature-select-modal';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { HeroLogic } from '@/logic/hero-logic';
import { Item } from '@/models/item';
import { ItemPanel } from '@/components/panels/elements/item-panel/item-panel';
import { ItemSelectModal } from '@/components/modals/select/item-select/item-select-modal';
import { Kit } from '@/models/kit';
import { KitPanel } from '@/components/panels/elements/kit-panel/kit-panel';
import { KitSelectModal } from '@/components/modals/select/kit-select/kit-select-modal';
import { LanguageSelectModal } from '@/components/modals/select/language-select/language-select-modal';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Modal } from '@/components/modals/modal/modal';
import { Monster } from '@/models/monster';
import { MonsterInfo } from '@/components/panels/token/token';
import { MonsterModal } from '@/components/modals/monster/monster-modal';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { MonsterSelectModal } from '@/components/modals/select/monster-select/monster-select-modal';
import { NameGenerator } from '@/utils/name-generator';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Perk } from '@/models/perk';
import { PerkPanel } from '@/components/panels/elements/perk-panel/perk-panel';
import { PerkSelectModal } from '@/components/modals/select/perk-select/perk-select-modal';
import { SkillSelectModal } from '@/components/modals/select/skill-select/skill-select-modal';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Summon } from '@/models/summon';
import { SummonLogic } from '@/logic/summon-logic';
import { SummonSelectModal } from '@/components/modals/select/summon-select/summon-select-modal';
import { Title } from '@/models/title';
import { TitlePanel } from '@/components/panels/elements/title-panel/title-panel';
import { TitleSelectModal } from '@/components/modals/select/title-select/title-select-modal';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './feature-config-panel.scss';

interface Props {
	feature: Feature | Perk;
	options: Options;
	hero: Hero;
	sourcebooks?: Sourcebook[];
	setData: (featureID: string, data: FeatureData) => void;
	onDelete?: () => void;
}

export const FeatureConfigPanel = (props: Props) => {
	const [ autoCalc, setAutoCalc ] = useState<boolean>(true);
	const [ abilitySelectorOpen, setAbilitySelectorOpen ] = useState<boolean>(false);
	const [ choiceSelectorOpen, setChoiceSelectorOpen ] = useState<boolean>(false);
	const [ itemSelectorOpen, setItemSelectorOpen ] = useState<boolean>(false);
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
	const [ selectedSummon, setSelectedSummon ] = useState<Summon | null>(null);
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
		const pointsMax = data.count === 'ancestry' ? HeroLogic.getAncestryPoints(props.hero!) : data.count;
		const pointsLeft = pointsMax - pointsUsed;

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

		const showCosts = data.options.some(opt => opt.value > 1);

		const getAddButton = () => {
			if (sortedOptions.length === 0) {
				return (
					<Empty text='There are no options to choose for this feature.' />
				);
			}

			return (
				<Button className='status-warning' block={true} onClick={() => setChoiceSelectorOpen(true)}>
					Choose an option
				</Button>
			);
		};

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
				{pointsLeft > 0 ? getAddButton() : null}
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
		if (!props.hero || !props.sourcebooks) {
			return null;
		}

		let heroClass: HeroClass | null = props.hero.class;
		if (data.classID) {
			// You get an ability from a different class
			heroClass = SourcebookLogic.getClasses(props.sourcebooks).find(c => c.id === data.classID) || null;
		}
		if (!heroClass) {
			return null;
		}

		const currentAbilityIDs = HeroLogic.getFeatures(props.hero)
			.map(f => f.feature)
			.filter(f => f.id !== props.feature.id)
			.filter(f => f.type === FeatureType.ClassAbility)
			.flatMap(f => f.data.selectedIDs);
		const abilities = (data.allowAnySource ? SourcebookLogic.getAllClassAbilities(heroClass) : heroClass.abilities)
			.filter(a => a.cost === data.cost)
			.filter(a => a.minLevel <= data.minLevel)
			.filter(a => !currentAbilityIDs.includes(a.id));
		const distinctAbilities = Collections.distinct(abilities, a => a.name);
		const sortedAbilities = Collections.sort(distinctAbilities, a => a.name);

		const getAddButton = () => {
			if (sortedAbilities.length === 0) {
				return (
					<Empty text='There are no options to choose for this feature.' />
				);
			}

			return (
				<Button className='status-warning' block={true} onClick={() => setAbilitySelectorOpen(true)}>
					Choose an ability
				</Button>
			);
		};

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
				{data.selectedIDs.length < data.count ? getAddButton() : null}
				<Drawer open={abilitySelectorOpen} onClose={() => setAbilitySelectorOpen(false)} closeIcon={null} width='500px'>
					<AbilitySelectModal
						abilities={sortedAbilities}
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

		const choices = data.selected && data.selected.retainer ?
			data.selected.retainer.featuresByLevel
				.filter(lvl => data.selected!.retainer!.level >= lvl.level)
				.filter(lvl => FeatureLogic.isChoice(lvl.feature))
			: [];

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
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
						:
						<Button block={true} className='status-warning' onClick={() => setMonsterSelectorOpen(true)}>Select</Button>
				}
				{
					data.selected ?
						<Expander title='Customize'>
							<Space direction='vertical' style={{ width: '100%' }}>
								<div>
									<HeaderText>Name</HeaderText>
									<Input
										status={data.selected.name === '' ? 'warning' : ''}
										placeholder='Name'
										allowClear={true}
										addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
										value={data.selected.name}
										onChange={e => setName(e.target.value)}
									/>
								</div>
								{
									choices.map(lvl => (
										<FeatureConfigPanel
											key={lvl.level}
											feature={lvl.feature}
											options={props.options}
											hero={props.hero}
											sourcebooks={props.sourcebooks}
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
								}
							</Space>
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
		if (!props.hero || !props.sourcebooks) {
			return null;
		}

		const domains = SourcebookLogic.getDomains(props.sourcebooks);
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
					options={sortedDomains.map(a => ({ value: a.id, label: <Field label={a.name} value={a.description} /> }))}
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
								const domainCopy = Utils.copy(domain);
								[ ...domainCopy.defaultFeatures, ...domainCopy.featuresByLevel.flatMap(lvl => lvl.features) ].forEach(f => FeatureLogic.switchFeatureCharacteristic(f, Characteristic.Intuition, dataCopy.characteristic));
								dataCopy.selected.push(domainCopy);
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
		if (!props.hero || !props.sourcebooks) {
			return null;
		}

		const getAddButton = () => {
			return (
				<Button className='status-warning' block={true} onClick={() => setItemSelectorOpen(true)}>
					Choose an item
				</Button>
			);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{data.count > 1 ? <div className='ds-text'>Choose {data.count}:</div> : null}
				{
					data.selected.map(item => (
						<Flex key={item.id} className='selection-box' align='center' gap={10}>
							<Field
								style={{ flex: '1 1 0' }}
								label={item.name}
								value={<Markdown text={item.description} useSpan={true} />}
							/>
							<Flex vertical={true}>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Show details'
									icon={<InfoCircleOutlined />}
									onClick={() => setSelectedItem(item)}
								/>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Remove'
									icon={<CloseOutlined />}
									onClick={() => {
										const dataCopy = Utils.copy(data);
										dataCopy.selected = dataCopy.selected.filter(i => i.id !== item.id);
										if (props.setData) {
											props.setData(props.feature.id, dataCopy);
										}
									}}
								/>
							</Flex>
						</Flex>
					))
				}
				{data.selected.length < data.count ? getAddButton() : null}
				<Drawer open={itemSelectorOpen} onClose={() => setItemSelectorOpen(false)} closeIcon={null} width='500px'>
					<ItemSelectModal
						types={data.types}
						sourcebooks={props.sourcebooks}
						hero={props.hero}
						options={props.options}
						onSelect={item => {
							setItemSelectorOpen(false);

							const itemCopy = Utils.copy(item);

							const dataCopy = Utils.copy(data);
							dataCopy.selected.push(itemCopy);
							if (props.setData) {
								props.setData(props.feature.id, dataCopy);
							}
						}}
						onClose={() => setItemSelectorOpen(false)}
					/>
				</Drawer>
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
			.filter(k => kitTypes.includes(k.type))
			.filter(k => !currentKitIDs.includes(k.id));
		const sortedKits = Collections.sort(kits, k => k.name);

		const getAddButton = () => {
			if (sortedKits.length === 0) {
				return (
					<Empty text='There are no options to choose for this feature.' />
				);
			}

			return (
				<Button className='status-warning' block={true} onClick={() => setKitSelectorOpen(true)}>
					Choose a kit
				</Button>
			);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{data.count > 1 ? <div className='ds-text'>Choose {data.count}:</div> : null}
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
				{data.selected.length < data.count ? getAddButton() : null}
				<Drawer open={kitSelectorOpen} onClose={() => setKitSelectorOpen(false)} closeIcon={null} width='500px'>
					<KitSelectModal
						kits={sortedKits}
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
		if (!props.hero || !props.sourcebooks) {
			return null;
		}

		const currentLanguages = HeroLogic.getLanguages(props.hero, props.sourcebooks).map(l => l.name);
		const languages = SourcebookLogic.getLanguages(props.sourcebooks as Sourcebook[])
			.filter(l => !currentLanguages.includes(l.name));
		const distinctLanguages = Collections.distinct(languages, l => l.name);
		const sortedLanguages = Collections.sort(distinctLanguages, l => l.name);

		const getAddButton = () => {
			// We can always add a custom language, so we always show the Add button
			return (
				<Button className='status-warning' block={true} onClick={() => setLanguageSelectorOpen(true)}>
					Choose a language
				</Button>
			);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{data.count > 1 ? <div className='ds-text'>Choose {data.count}:</div> : null}
				{
					data.selected.map((language, n) => {
						const lang = SourcebookLogic.getLanguage(language, props.sourcebooks!);
						return (
							<Flex key={n} className='selection-box' align='center' gap={10}>
								{
									lang ?
										<Field label={lang.name} value={lang.description} style={{ flex: '1 1 0' }} />
										:
										<div className='ds-text' style={{ flex: '1 1 0' }}>{language}</div>
								}
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
						);
					})
				}
				{(data.selected.length < data.count) || (data.count === -1) ? getAddButton() : null}
				<Drawer open={languageSelectorOpen} onClose={() => setLanguageSelectorOpen(false)} closeIcon={null} width='500px'>
					<LanguageSelectModal
						languages={sortedLanguages}
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
			.filter(f => f.type === FeatureType.Perk)
			.flatMap(f => f.data.selected)
			.map(p => p.id);

		const perks = SourcebookLogic.getPerks(props.sourcebooks as Sourcebook[]).filter(p => data.lists.includes(p.list));
		const sortedPerks = Collections.sort(perks, p => p.name);

		const getAddButton = () => {
			if (sortedPerks.length === 0) {
				return (
					<Empty text='There are no options to choose for this feature.' />
				);
			}

			return (
				<Button className='status-warning' block={true} onClick={() => setPerkSelectorOpen(true)}>
					Choose a perk
				</Button>
			);
		};

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
				{data.selected.length < data.count ? getAddButton() : null}
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
		if (!props.hero || !props.sourcebooks) {
			return null;
		}
		const currentSkills = HeroLogic.getSkills(props.hero, props.sourcebooks).map(s => s.name);
		const skills = SourcebookLogic.getSkills(props.sourcebooks as Sourcebook[])
			.filter(skill => (data.options.includes(skill.name)) || (data.listOptions.includes(skill.list)))
			.filter(skill => !currentSkills.includes(skill.name));
		const distinctSkills = Collections.distinct(skills, s => s.name);
		const sortedSkills = Collections.sort(distinctSkills, s => s.name);

		const getAddButton = () => {
			// We can always add a custom skill, so we always show the Add button
			return (
				<Button className='status-warning' block={true} onClick={() => setSkillSelectorOpen(true)}>
					Choose a Skill
				</Button>
			);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{data.count > 1 ? <div className='ds-text'>Choose {data.count}:</div> : null}
				{
					data.selected.map((skill, n) => {
						const duplicated = props.hero && HeroLogic.getFeatures(props.hero)
							.map(f => f.feature)
							.filter(f => f.type === FeatureType.SkillChoice)
							.flatMap(f => f.data.selected)
							.filter(s => s === skill)
							.length > 1;

						const sk = SourcebookLogic.getSkill(skill, props.sourcebooks!);
						return (
							<Flex key={n} className='selection-box' align='center' justify='space-between' gap={10}>
								<Flex vertical={true}>
									{
										sk ?
											<Field label={sk.name} value={sk.description} style={{ flex: '1 1 0' }} />
											:
											<div className='ds-text' style={{ flex: '1 1 0' }}>{skill}</div>
									}
									{
										duplicated ?
											<Field danger={true} label='Duplicated' value='You already have this skill.' />
											: null
									}
								</Flex>
								<Flex vertical={true}>
									<Button
										style={{ flex: '0 0 auto' }}
										type='text'
										title='Remove'
										icon={<CloseOutlined />}
										onClick={() => {
											const dataCopy = Utils.copy(data);
											dataCopy.selected = dataCopy.selected.filter(s => s !== skill);
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
				{(data.selected.length < data.count) || (data.count === -1) ? getAddButton() : null}
				<Drawer open={skillSelectorOpen} onClose={() => setSkillSelectorOpen(false)} closeIcon={null} width='500px'>
					<SkillSelectModal
						skills={sortedSkills}
						sourcebooks={props.sourcebooks}
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

	const getSelectionSummonChoice = (data: FeatureSummonChoiceData) => {
		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					!data.selected ?
						<Button block={true} className='status-warning' onClick={() => setMonsterSelectorOpen(true)}>Select</Button>
						: null
				}
				{
					data.selected.map(summon => (
						<Flex className='selection-box' align='center' gap={10}>
							<MonsterInfo
								style={{ flex: '1 1 0' }}
								monster={summon.monster}
							/>
							<div style={{ flex: '0 0 auto' }}>
								<Button
									type='text'
									title='Show details'
									icon={<InfoCircleOutlined />}
									onClick={() => setSelectedSummon(summon)}
								/>
								<Button
									type='text'
									title='Remove'
									icon={<CloseOutlined />}
									onClick={() => {
										const dataCopy = Utils.copy(data);
										dataCopy.selected = dataCopy.selected.filter(m => m.id !== summon.id);
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
					<SummonSelectModal
						summons={data.options}
						hero={props.hero}
						options={props.options}
						onSelect={summon => {
							setMonsterSelectorOpen(false);

							const dataCopy = Utils.copy(data);
							dataCopy.selected.push(Utils.copy(summon));
							if (props.setData) {
								props.setData(props.feature.id, dataCopy);
							}
						}}
						onClose={() => setMonsterSelectorOpen(false)}
					/>
				</Drawer>
				<Drawer open={!!selectedSummon} onClose={() => setSelectedSummon(null)} closeIcon={null} width='500px'>
					{selectedSummon ? <MonsterModal monster={SummonLogic.getSummonedMonster(selectedSummon.monster, props.hero)} summon={selectedSummon.info} options={props.options} onClose={() => setSelectedSummon(null)} /> : null}
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

		const currentTitleIDs = HeroLogic.getTitles(props.hero).map(t => t.id);
		const titles = SourcebookLogic.getTitles(props.sourcebooks as Sourcebook[])
			.filter(t => t.echelon === data.echelon)
			.filter(t => !currentTitleIDs.includes(t.id));
		const sortedTitles = Collections.sort(titles, t => t.name);

		const customTitle = FactoryLogic.createTitle();
		customTitle.name = 'Custom Title';
		customTitle.echelon = data.echelon;
		customTitle.features.push(FactoryLogic.feature.create({ id: Utils.guid(), name: 'Custom Title', description: 'Details' }));

		const getAddButton = () => {
			return (
				<Button className='status-warning' block={true} onClick={() => setTitleSelectorOpen(true)}>
					Choose a title
				</Button>
			);
		};

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
				{data.selected.length < data.count ? getAddButton() : null}
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
			case FeatureType.SummonChoice:
				return getSelectionSummonChoice(props.feature.data);
			case FeatureType.TaggedFeatureChoice:
				return getSelectionTaggedFeatureChoice(props.feature.data);
			case FeatureType.TitleChoice:
				return getSelectionTitleChoice(props.feature.data);
		}

		return null;
	};

	// #endregion

	const autoCalcAvailable = () => {
		return (props.feature.type === FeatureType.Text) && (AbilityLogic.getTextEffect(props.feature.description, props.hero) !== props.feature.description);
	};

	const getDescription = () => {
		let desc = '';

		if (props.feature.type === FeatureType.Ability) {
			desc = props.feature.data.ability.description;
		} else {
			desc = props.feature.description;
		}

		if (!desc) {
			desc = FeatureLogic.getFeatureTypeDescription(props.feature.type);
		}

		if (autoCalc) {
			desc = AbilityLogic.getTextEffect(desc, props.hero);
		}

		return desc;
	};

	return (
		<ErrorBoundary>
			<div className='feature-config-panel'>
				<HeaderText
					extra={
						<>
							{
								autoCalcAvailable() ?
									<Button
										key='autocalc'
										type='text'
										title='Auto-calculate damage, potency, etc'
										icon={autoCalc ? <ThunderboltFilled style={{ color: 'rgb(22, 119, 255)' }} /> : <ThunderboltOutlined />}
										onClick={e => { e.stopPropagation(); setAutoCalc(!autoCalc); }}
									/>
									: null
							}
							{
								props.onDelete ?
									<DangerButton
										key='delete'
										mode='clear'
										onConfirm={() => props.onDelete!()}
									/>
									: null
							}
						</>
					}
				>
					{props.feature.name || 'Unnamed Feature'}
				</HeaderText>
				<Markdown text={getDescription()} />
				{getSelection()}
			</div>
		</ErrorBoundary>
	);
};
