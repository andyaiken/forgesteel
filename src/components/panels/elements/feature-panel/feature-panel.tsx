import { AbilityCustomization, Hero } from '@/models/hero';
import { Button, Flex, Space } from 'antd';
import { CSSProperties, useState } from 'react';
import { Feature, FeatureAbilityCostData, FeatureAbilityDamageData, FeatureAbilityDistanceData, FeatureAncestryChoiceData, FeatureAncestryFeatureChoiceData, FeatureBonusData, FeatureCharacteristicBonusData, FeatureChoiceData, FeatureClassAbilityData, FeatureCompanionData, FeatureConditionImmunityData, FeatureDamageModifierData, FeatureDomainData, FeatureDomainFeatureData, FeatureFixtureData, FeatureHeroicResource, FeatureHeroicResourceGainData, FeatureItemChoiceData, FeatureKitData, FeatureLanguageChoiceData, FeatureLanguageData, FeatureMaliceData, FeatureMovementModeData, FeatureMultipleData, FeaturePackageData, FeaturePerkData, FeatureProficiencyData, FeatureSizeData, FeatureSkillChoiceData, FeatureSkillData, FeatureSpeedData, FeatureSummonChoiceData, FeatureSummonData, FeatureTaggedFeatureChoiceData, FeatureTaggedFeatureData, FeatureTitleChoiceData } from '@/models/feature';
import { Pill, ResourcePill } from '@/components/controls/pill/pill';
import { ThunderboltFilled, ThunderboltOutlined } from '@ant-design/icons';
import { Ability } from '@/models/ability';
import { AbilityLogic } from '@/logic/ability-logic';
import { AbilityPanel } from '@/components/panels/elements/ability-panel/ability-panel';
import { AncestryPanel } from '@/components/panels/elements/ancestry-panel/ancestry-panel';
import { Collections } from '@/utils/collections';
import { DomainPanel } from '@/components/panels/elements/domain-panel/domain-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { FixturePanel } from '@/components/panels/elements/fixture-panel/fixture-panel';
import { FollowerPanel } from '@/components/panels/elements/follower-panel/follower-panel';
import { Format } from '@/utils/format';
import { FormatLogic } from '@/logic/format-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { HeroLogic } from '@/logic/hero-logic';
import { ItemPanel } from '@/components/panels/elements/item-panel/item-panel';
import { KitPanel } from '@/components/panels/elements/kit-panel/kit-panel';
import { Markdown } from '@/components/controls/markdown/markdown';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Perk } from '@/models/perk';
import { PerkPanel } from '@/components/panels/elements/perk-panel/perk-panel';
import { PowerRollPanel } from '@/components/panels/power-roll/power-roll-panel';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { TitlePanel } from '@/components/panels/elements/title-panel/title-panel';

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
}

export const FeaturePanel = (props: Props) => {
	const [ autoCalc, setAutoCalc ] = useState<boolean>(true);

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
			<AncestryPanel
				ancestry={data.selected}
				options={props.options}
			/>
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

	const getInformationFixture = (data: FeatureFixtureData) => {
		return (
			<FixturePanel key={data.fixture.id} fixture={data.fixture} sourcebooks={props.sourcebooks} hero={props.hero} options={props.options} />
		);
	};

	const getInformationHeroicResourceFeature = (feature: FeatureHeroicResource) => {
		if (props.hero) {
			const resource = HeroLogic.getHeroicResources(props.hero).find(hr => hr.name === feature.name);
			if (resource) {
				return (
					<>
						<ul>
							{
								resource.gains.map((g, n) => (
									<li key={n}>
										<Flex align='center' justify='space-between' gap={10}>
											<div className='ds-text compact-text'>{g.trigger}</div>
											<Pill>+{g.value}</Pill>
										</Flex>
									</li>
								))
							}
						</ul>
						<Markdown text={resource.details} />
					</>
				);
			}
		}

		return null;
	};

	const getInformationHeroicResourceGainFeature = (data: FeatureHeroicResourceGainData) => {
		return (
			<>
				<div className='ds-text'></div>
				<Flex align='center' justify='space-between' gap={10}>
					<div className='ds-text compact-text'>{data.trigger}</div>
					<Pill>+{data.value}</Pill>
				</Flex>
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

	const getInformationPackage = (data: FeaturePackageData) => {
		if (!props.hero) {
			return null;
		}

		return (
			<>
				{
					HeroLogic.getFeatures(props.hero)
						.map(f => f.feature)
						.filter(f => f.type === FeatureType.PackageContent)
						.filter(f => f.data.tag === data.tag)
						.map(f => (
							<div key={f.id}>
								<div className='ds-text bold-text'>{f.name}</div>
								<Markdown text={f.description} />
							</div>
						))
				}
			</>
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

			let str = '';
			if (data.listOptions.length === 5) {
				str = (count > 1 ? `Choose ${count} skills.` : 'Choose a skill.');
			} else {
				const names = (Collections.sort(data.options, o => o) || []).concat((Collections.sort(data.listOptions, o => o) || []).map(l => `the ${l} list`)).join(', ');
				str = (count > 1 ? `Choose ${count} skills from ${names}.` : `Choose a skill from ${names}.`);
			}

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
		if (data.summons.length > 0) {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{data.summons.map(s => <SelectablePanel key={s.id}><MonsterPanel monster={s.monster} summon={s.info} options={props.options} /></SelectablePanel>)}
				</Space>
			);
		}

		return null;
	};

	const getInformationSummonChoice = (data: FeatureSummonChoiceData) => {
		if (data.selected.length > 0) {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{data.selected.map(s => <SelectablePanel key={s.id}><MonsterPanel monster={s.monster} summon={s.info} options={props.options} /></SelectablePanel>)}
				</Space>
			);
		}

		if (!props.feature.description) {
			return (
				<>
					<div className='ds-text'>Choose {data.count > 1 ? data.count : 'a'} {data.count > 1 ? 'monsters' : 'monster'}.</div>
					<Space direction='vertical' style={{ width: '100%' }}>
						{data.options.map(s => <SelectablePanel key={s.id}><MonsterPanel monster={s.monster} summon={s.info} options={props.options} /></SelectablePanel>)}
					</Space>
				</>
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
			case FeatureType.Fixture:
				return getInformationFixture(props.feature.data);
			case FeatureType.HeroicResource:
				return getInformationHeroicResourceFeature(props.feature);
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
				return getInformationPackage(props.feature.data);
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
			case FeatureType.SummonChoice:
				return getInformationSummonChoice(props.feature.data);
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

	const getTags = () => {
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

		if ((props.feature.type === FeatureType.Malice) || (props.feature.type === FeatureType.MaliceAbility)) {
			if (props.feature.data.echelon > 1) {
				tags.push(`Echelon ${props.feature.data.echelon}`);
			}
		}

		if (props.feature.type === FeatureType.TaggedFeature) {
			tags.push(props.feature.data.tag);
		}

		return tags;
	};

	const autoCalcAvailable = () => {
		return props.hero
			&& (props.feature.type === FeatureType.Text)
			&& (AbilityLogic.getTextEffect(props.feature.description, props.hero) !== props.feature.description);
	};

	try {
		if ((props.feature.type === FeatureType.Ability) || (props.feature.type === FeatureType.MaliceAbility)) {
			return (
				<AbilityPanel
					ability={props.feature.data.ability}
					hero={props.hero}
					cost={props.cost}
					repeatable={props.repeatable}
					mode={props.mode}
					tags={getTags()}
				/>
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
						tags={getTags()}
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
					{props.mode === PanelMode.Full ? getInformation() : null}
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
