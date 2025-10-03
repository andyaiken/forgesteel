import { Ability, AbilitySectionField, AbilitySectionPackage, AbilitySectionRoll, AbilitySectionText } from '@/models/ability';
import { Alert, Button, Space, Tag } from 'antd';
import { Pill, ResourcePill } from '@/components/controls/pill/pill';
import { ThunderboltFilled, ThunderboltOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { AbilityData } from '@/data/ability-data';
import { AbilityInfoPanel } from '@/components/panels/ability-info/ability-info-panel';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { AbilityLogic } from '@/logic/ability-logic';
import { AbilityUsage } from '@/enums/ability-usage';
import { ConditionType } from '@/enums/condition-type';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Monster } from '@/models/monster';
import { MonsterLogic } from '@/logic/monster-logic';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { PowerRollPanel } from '@/components/panels/power-roll/power-roll-panel';

import './ability-panel.scss';

interface Props {
	ability: Ability;
	hero?: Hero;
	monster?: Monster;
	cost?: number | 'signature';
	repeatable?: boolean;
	options?: Options;
	tags?: string[];
	highlightTier?: number;
	odds?: number[];
	mode?: PanelMode;
}

export const AbilityPanel = (props: Props) => {
	const [ autoCalc, setAutoCalc ] = useState<boolean>(true);

	const cost = useMemo(
		() => {
			const cost = props.cost ?? props.ability.cost;
			if (cost === 'signature' || cost <= 0 || !props.hero) {
				return cost;
			}
			const modifierSum = HeroLogic.getFeatures(props.hero)
				.map(f => f.feature)
				.filter(f => f.type === FeatureType.AbilityCost)
				.filter(f => f.data.keywords.every(k => props.ability.keywords.includes(k)))
				.map(f => f.data.modifier)
				.reduce((sum, m) => sum + m, 0);

			return Math.max(cost + modifierSum, 1);
		},
		[ props.cost, props.ability, props.hero ]
	);

	const repeatable = useMemo(
		() => {
			return props.repeatable ?? props.ability.repeatable;
		},
		[ props.repeatable, props.ability ]
	);

	const headerRibbon = useMemo(
		() => cost === 'signature'
			? (<Pill>Signature</Pill>)
			: cost > 0 ? (<ResourcePill value={cost} repeatable={repeatable} />) : null,
		[ cost, repeatable ]
	);

	const heroicResource = useMemo(
		() => {
			if (props.hero) {
				const resources = HeroLogic.getHeroicResources(props.hero);
				if (resources.length > 0) {
					return resources[0].value;
				}
			}

			return 0;
		},
		[ props.hero ]
	);

	const disabled = useMemo(
		() => {
			return props.options
				&& props.options.dimUnavailableAbilities
				&& cost !== 'signature'
				&& cost > 0
				&& cost > heroicResource;
		},
		[ cost, heroicResource, props.options ]
	);

	const parseText = (text: string) => {
		if (autoCalc) {
			text = AbilityLogic.getTextEffect(text, props.hero);
		}

		return text;
	};

	const autoCalcAvailable = () => {
		if (!props.hero) {
			return false;
		}

		if ((props.ability.sections || []).some(s => s.type === 'roll')) {
			return true;
		}

		const texts = [
			...(props.ability.sections || []).filter(s => s.type === 'text').map(s => s.text),
			...(props.ability.sections || []).filter(s => s.type === 'field').map(s => s.effect)
		];

		return texts.some(text => AbilityLogic.getTextEffect(text, props.hero!) !== text);
	};

	const getWarnings = () => {
		let conditions: ConditionType[] = [];
		let state = 'healthy';
		let level = 1;
		if (props.hero) {
			conditions = props.hero.state.conditions.map(c => c.type);
			state = HeroLogic.getCombatState(props.hero);
			level = props.hero.class?.level ?? 1;
		}
		if (props.monster) {
			conditions = props.monster.state.conditions.map(c => c.type);
			state = MonsterLogic.getCombatState(props.monster);
			level = props.monster.level ?? 1;
		}

		const warnings: { label: string, text: string }[] = [];

		const hasRoll = (props.ability.sections || []).some(s => s.type === 'roll');

		if ((conditions.includes(ConditionType.Bleeding) || ((state === 'dying') && (props.ability.id !== AbilityData.catchBreath.id))) && ([ AbilityUsage.MainAction, AbilityUsage.Maneuver, AbilityUsage.Trigger ].includes(props.ability.type.usage) || props.ability.keywords.includes(AbilityKeyword.Strike))) {
			warnings.push({
				label: ConditionType.Bleeding,
				text: `After using this ability, you lose 1d6 + ${level} Stamina.`
			});
		}
		if (conditions.includes(ConditionType.Dazed) && (props.ability.type.usage === AbilityUsage.Trigger)) {
			warnings.push({
				label: ConditionType.Dazed,
				text: 'You can’t use this ability.'
			});
		}
		if (conditions.includes(ConditionType.Dazed) && ((props.ability.type.usage === AbilityUsage.Maneuver) && props.ability.type.free)) {
			warnings.push({
				label: ConditionType.Dazed,
				text: 'You can’t use this ability.'
			});
		}
		if (conditions.includes(ConditionType.Frightened) && hasRoll) {
			warnings.push({
				label: ConditionType.Frightened,
				text: 'This ability takes a bane if it targets the source of your fear.'
			});
		}
		if (conditions.includes(ConditionType.Grabbed) && hasRoll) {
			warnings.push({
				label: ConditionType.Grabbed,
				text: 'This ability takes a bane if it doesn’t target the creature grabbing you.'
			});
		}
		if (conditions.includes(ConditionType.Grabbed) && (props.ability.id === AbilityData.knockback.id)) {
			warnings.push({
				label: ConditionType.Grabbed,
				text: 'You can’t use this ability.'
			});
		}
		if (conditions.includes(ConditionType.Prone) && props.ability.keywords.includes(AbilityKeyword.Strike)) {
			warnings.push({
				label: ConditionType.Prone,
				text: 'This ability takes a bane.'
			});
		}
		if (conditions.includes(ConditionType.Restrained) && hasRoll) {
			warnings.push({
				label: ConditionType.Restrained,
				text: 'This ability takes a bane.'
			});
		}
		if (conditions.includes(ConditionType.Restrained) && (props.ability.id === AbilityData.standUp.id)) {
			warnings.push({
				label: ConditionType.Restrained,
				text: 'You can’t use this ability.'
			});
		}
		if (conditions.includes(ConditionType.Taunted) && hasRoll) {
			warnings.push({
				label: ConditionType.Taunted,
				text: 'This ability takes a bane if it doesn’t target the creature who taunted you, and you have line of effect to that creature.'
			});
		}
		if (conditions.includes(ConditionType.Weakened) && hasRoll) {
			warnings.push({
				label: ConditionType.Weakened,
				text: 'This ability takes a bane.'
			});
		}
		if ((state === 'dying') && (props.ability.id === AbilityData.catchBreath.id)) {
			warnings.push({
				label: 'Dying',
				text: 'You can’t use this ability.'
			});
		}

		return warnings;
	};

	const getSection = (section: AbilitySectionText | AbilitySectionField | AbilitySectionRoll | AbilitySectionPackage, index: number) => {
		switch (section.type) {
			case 'text':
				return (
					<Markdown key={index} text={parseText(section.text)} />
				);
			case 'field':
				return (
					<Field
						key={index}
						disabled={props.hero && (props.options?.dimUnavailableAbilities || false) && (section.value > 0) && (section.value > heroicResource)}
						danger={(section.name === 'Strained') && props.hero && (heroicResource < 0)}
						label={section.name}
						labelTag={section.value ? <ResourcePill value={section.value} repeatable={section.repeatable} /> : null}
						value={<Markdown text={parseText(section.effect)} useSpan={true} />}
					/>
				);
			case 'roll':
				return (
					<PowerRollPanel
						key={index}
						powerRoll={section.roll}
						ability={props.ability}
						creature={props.hero || props.monster}
						autoCalc={autoCalc}
						highlightTier={props.highlightTier}
						odds={props.odds}
					/>
				);
			case 'package':
				if (props.hero) {
					return (
						<div key={index}>
							{
								HeroLogic.getFeatures(props.hero)
									.map(f => f.feature)
									.filter(f => f.type === FeatureType.PackageContent)
									.filter(f => f.data.tag === section.tag)
									.map(f => (
										<Field
											key={f.id}
											label={f.name}
											value={<Markdown text={parseText(f.description)} useSpan={true} />}
										/>
									))
							}
						</div>
					);
				} else {
					return null;
				}
		}
	};

	try {
		let className = 'ability-panel';
		if (props.mode !== PanelMode.Full) {
			className += ' compact';
		}
		if (disabled) {
			className += ' disabled';
		}

		return (
			<ErrorBoundary>
				<div className={className} id={props.mode === PanelMode.Full ? props.ability.id : undefined}>
					<Space direction='vertical' style={{ marginTop: '15px', width: '100%' }}>
						{
							getWarnings().map((warn, n) => (
								<Alert
									key={n}
									type='warning'
									showIcon={true}
									message={<div><b>{warn.label}</b>: {warn.text}</div>}
								/>
							))
						}
					</Space>
					<HeaderText
						ribbon={headerRibbon}
						tags={props.tags}
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
						{props.ability.name || 'Unnamed Ability'}
					</HeaderText>
					<Markdown text={props.ability.description} className='ability-description-text' />
					{
						props.mode === PanelMode.Full ?
							<div>
								{
									props.ability.keywords.length > 0 ?
										<div>
											{props.ability.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)}
										</div>
										: null
								}
								<AbilityInfoPanel ability={props.ability} hero={props.hero} />
								{(props.ability.sections || []).map(getSection)}
								{
									props.ability.keywords.includes(AbilityKeyword.Charge) && (props.ability.id !== AbilityData.freeStrikeMelee.id) ?
										<Alert
											type='info'
											showIcon={true}
											message='This ability can be used in place of a melee free strike when you take the Charge action.'
										/>
										: null
								}
							</div>
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
