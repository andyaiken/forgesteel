import { AbilityCustomization, Hero } from '@/models/hero';
import { CSSProperties, useState } from 'react';
import { Pill, ResourcePill } from '@/components/controls/pill/pill';
import { ThunderboltFilled, ThunderboltOutlined } from '@ant-design/icons';
import { AbilityLogic } from '@/logic/ability-logic';
import { AbilityPanel } from '@/components/panels/elements/ability-panel/ability-panel';
import { Button } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Feature } from '@/models/feature';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { FollowerPanel } from '@/components/panels/elements/follower-panel/follower-panel';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { InfoAbilityCost } from '@/components/panels/feature-data/ability-cost';
import { InfoAbilityDamage } from '@/components/panels/feature-data/ability-damage';
import { InfoAbilityDistance } from '@/components/panels/feature-data/ability-distance';
import { InfoAncestryChoice } from '@/components/panels/feature-data/ancestry-choice';
import { InfoAncestryFeatureChoice } from '@/components/panels/feature-data/ancestry-feature-choice';
import { InfoBonus } from '@/components/panels/feature-data/bonus';
import { InfoCharacteristicBonus } from '@/components/panels/feature-data/characteristic-bonus';
import { InfoChoice } from '@/components/panels/feature-data/choice';
import { InfoClassAbility } from '@/components/panels/feature-data/class-ability';
import { InfoCompanion } from '@/components/panels/feature-data/companion';
import { InfoConditionImmunity } from '@/components/panels/feature-data/condition-immunity';
import { InfoDamageModifier } from '@/components/panels/feature-data/damage-modifier';
import { InfoDomain } from '@/components/panels/feature-data/domain';
import { InfoDomainFeature } from '@/components/panels/feature-data/domain-feature';
import { InfoFixture } from '@/components/panels/feature-data/fixture';
import { InfoHeroicResource } from '@/components/panels/feature-data/heroic-resource';
import { InfoHeroicResourceGain } from '@/components/panels/feature-data/heroic-resource-gain';
import { InfoItemChoice } from '@/components/panels/feature-data/item-choice';
import { InfoKit } from '@/components/panels/feature-data/kit';
import { InfoLanguage } from '@/components/panels/feature-data/language';
import { InfoLanguageChoice } from '@/components/panels/feature-data/language-choice';
import { InfoMalice } from '@/components/panels/feature-data/malice';
import { InfoMovementMode } from '@/components/panels/feature-data/movement-mode';
import { InfoMultiple } from '@/components/panels/feature-data/multiple';
import { InfoPackage } from '@/components/panels/feature-data/package';
import { InfoPerk } from '@/components/panels/feature-data/perk';
import { InfoProficiency } from '@/components/panels/feature-data/proficiency';
import { InfoRetainer } from '@/components/panels/feature-data/retainer';
import { InfoSaveThreshold } from '@/components/panels/feature-data/save-threshold';
import { InfoSize } from '@/components/panels/feature-data/size';
import { InfoSkillChoice } from '@/components/panels/feature-data/skill-choice';
import { InfoSpeed } from '@/components/panels/feature-data/speed';
import { InfoSummon } from '@/components/panels/feature-data/summon';
import { InfoSummonChoice } from '@/components/panels/feature-data/summon-choice';
import { InfoTaggedFeature } from '@/components/panels/feature-data/tagged-feature';
import { InfoTaggedFeatureChoice } from '@/components/panels/feature-data/tagged-feature-choice';
import { InfoTitleChoice } from '@/components/panels/feature-data/title-choice';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Perk } from '@/models/perk';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';

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

	const getInformation = () => {
		switch (props.feature.type) {
			case FeatureType.AbilityCost:
				return <InfoAbilityCost data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.AbilityDamage:
				return <InfoAbilityDamage data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.AbilityDistance:
				return <InfoAbilityDistance data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.AncestryChoice:
				return <InfoAncestryChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.AncestryFeatureChoice:
				return <InfoAncestryFeatureChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.Bonus:
				return <InfoBonus data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.CharacteristicBonus:
				return <InfoCharacteristicBonus data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.Choice:
				return <InfoChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.ClassAbility:
				return <InfoClassAbility data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.Companion:
				return <InfoCompanion data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.ConditionImmunity:
				return <InfoConditionImmunity data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.DamageModifier:
				return <InfoDamageModifier data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.Domain:
				return <InfoDomain data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.DomainFeature:
				return <InfoDomainFeature data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.Fixture:
				return <InfoFixture data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.HeroicResource:
				return <InfoHeroicResource data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.HeroicResourceGain:
				return <InfoHeroicResourceGain data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.ItemChoice:
				return <InfoItemChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.Kit:
				return <InfoKit data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.Language:
				return <InfoLanguage data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.LanguageChoice:
				return <InfoLanguageChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.Malice:
				return <InfoMalice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.MovementMode:
				return <InfoMovementMode data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.Multiple:
				return <InfoMultiple data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.Package:
				return <InfoPackage data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.Perk:
				return <InfoPerk data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.Proficiency:
				return <InfoProficiency data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.Retainer:
				return <InfoRetainer data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.SaveThreshold:
				return <InfoSaveThreshold data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.Size:
				return <InfoSize data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.SkillChoice:
				return <InfoSkillChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.Speed:
				return <InfoSpeed data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.Summon:
				return <InfoSummon data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.SummonChoice:
				return <InfoSummonChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.TaggedFeature:
				return <InfoTaggedFeature data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.TaggedFeatureChoice:
				return <InfoTaggedFeatureChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
			case FeatureType.TitleChoice:
				return <InfoTitleChoice data={props.feature.data} feature={props.feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		}

		return null;
	};

	const getTags = () => {
		const tags = [];

		const list = (props.feature as Perk).list;
		if (list !== undefined) {
			if (props.sourcebooks && (props.sourcebooks.length > 0)) {
				const sourcebookType = SourcebookLogic.getPerkSourcebook(props.sourcebooks, props.feature as Perk)?.type || SourcebookType.Official;
				if (sourcebookType !== SourcebookType.Official) {
					tags.push(sourcebookType);
				}
			}

			tags.push(list);
		}

		if (props.source) {
			tags.push(props.source);
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

	if ((props.feature.type === FeatureType.Ability) || (props.feature.type === FeatureType.MaliceAbility)) {
		return (
			<AbilityPanel
				ability={props.feature.data.ability}
				hero={props.hero}
				cost={props.cost}
				repeatable={props.repeatable}
				mode={PanelMode.Full}
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
			<div className={props.mode === PanelMode.Full ? 'feature-panel' : 'feature-panel compact'} id={props.mode === PanelMode.Full ? SheetFormatter.getPageId('feaure', props.feature.id) : undefined} style={props.style}>
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
};
