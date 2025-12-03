import { Alert, Drawer } from 'antd';
import { CSSProperties, ReactNode, useState } from 'react';
import { Ability } from '@/models/ability';
import { AbilityModal } from '@/components/modals/ability/ability-modal';
import { AbilityPanel } from '@/components/panels/elements/ability-panel/ability-panel';
import { AbilityUsage } from '@/enums/ability-usage';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { Format } from '@/utils/format';
import { FormatLogic } from '@/logic/format-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Monster } from '@/models/monster';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterLabel } from '@/components/panels/monster-label/monster-label';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterToken } from '@/components/panels/token/token';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { StatsRow } from '@/components/panels/stats-row/stats-row';
import { SummoningInfo } from '@/models/summon';

import './monster-panel.scss';

interface Props {
	monster: Monster;
	monsterGroup?: MonsterGroup;
	summon?: SummoningInfo;
	sourcebooks: Sourcebook[];
	options: Options;
	mode?: PanelMode;
	style?: CSSProperties;
	extra?: ReactNode;
}

export const MonsterPanel = (props: Props) => {
	const [ selectedAbility, setSelectedAbility ] = useState<Ability | null>(null);

	const speed = MonsterLogic.getSpeed(props.monster);
	const signatureBonus = MonsterLogic.getSignatureDamageBonus(props.monster);

	let speedStr = speed.value.toString();
	if (MonsterLogic.getSpeedModified(props.monster)) {
		speedStr += '*';
	}

	const conditions = MonsterLogic.getConditionImmunities(props.monster);
	const immunities = MonsterLogic.getDamageModifiers(props.monster, DamageModifierType.Immunity);
	const weaknesses = MonsterLogic.getDamageModifiers(props.monster, DamageModifierType.Weakness);

	const features = MonsterLogic.getFeatures(props.monster).filter(f => (f.type === FeatureType.Text) || (f.type === FeatureType.AddOn));
	const abilities = MonsterLogic.getFeatures(props.monster).filter(f => f.type === FeatureType.Ability).map(f => f.data.ability);

	const tags = [];
	if (props.summon && props.summon.isSignature) {
		tags.push('Signature');
	}
	if (props.sourcebooks.length > 0) {
		const sourcebookType = SourcebookLogic.getMonsterSourcebook(props.sourcebooks, props.monster)?.type || SourcebookType.Official;
		if (sourcebookType !== SourcebookType.Official) {
			tags.push(sourcebookType);
		}
	}

	let rightOfTags = null;
	if (props.summon) {
		if (props.summon.cost > 0) {
			rightOfTags = (
				<div className='ds-text'>
					{`${props.summon.cost} essence ${props.summon.count === 1 ? 'per minion summoned' : `for ${props.summon.count} minions`}`}
				</div>
			);
		}
	} else {
		if (props.monster.role.organization === MonsterOrganizationType.Minion) {
			rightOfTags = (
				<Field label='EV' value={`${props.monster.encounterValue} for 4 minions`} />
			);
		} else if (props.monster.encounterValue > 0) {
			rightOfTags = (
				<Field label='EV' value={props.monster.encounterValue} />
			);
		}
	}

	return (
		<ErrorBoundary>
			<div className={props.mode === PanelMode.Full ? 'monster-panel' : 'monster-panel compact'} id={props.mode === PanelMode.Full ? SheetFormatter.getPageId('monster', props.monster.id) : undefined} style={props.style}>
				<HeaderText
					level={1}
					ribbon={<MonsterToken monster={props.monster} monsterGroup={props.monsterGroup} size={28} />}
					tags={tags}
					extra={props.extra}
				>
					{MonsterLogic.getMonsterName(props.monster, props.monsterGroup)}
				</HeaderText>
				<MonsterLabel monster={props.monster} extra={rightOfTags} />
				<Markdown text={props.monster.description} />
				{
					props.mode === PanelMode.Full ?
						<>
							<StatsRow>
								<Field orientation='vertical' label='Size' value={FormatLogic.getSize(props.monster.size)} />
								<Field orientation='vertical' label='Speed' value={speedStr} />
								<Field orientation='vertical' label='Stamina' value={MonsterLogic.getStaminaDescription(props.monster)} />
								<Field orientation='vertical' label='Stability' value={MonsterLogic.getStability(props.monster)} />
								<Field orientation='vertical' label='Free Strike' value={MonsterLogic.getFreeStrikeDamage(props.monster)} />
							</StatsRow>
							{
								![ 'healthy', 'injured' ].includes(MonsterLogic.getCombatState(props.monster)) ?
									<Alert
										type='warning'
										showIcon={true}
										title={`${MonsterLogic.getMonsterName(props.monster, props.monsterGroup)} is ${MonsterLogic.getCombatState(props.monster)}.`}
									/>
									: null
							}
							<StatsRow>
								{
									[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ]
										.map(ch => <Field key={ch} orientation='vertical' label={ch} value={MonsterLogic.getCharacteristic(props.monster, ch)} />)
								}
							</StatsRow>
							{
								signatureBonus || props.monster.withCaptain || (conditions.length > 0) || (immunities.length > 0) || (weaknesses.length > 0) || (features.length > 0) ?
									<div className='features'>
										{
											speed.modes.length > 0 ?
												<Field label='Movement' value={Format.capitalize(FormatLogic.getSpeedModes(speed.modes))} />
												: null
										}
										{
											immunities.length > 0 ?
												<Field label='Immunities' value={immunities.map(mod => `${mod.damageType} ${mod.value}`).join(', ')} />
												: null
										}
										{
											weaknesses.length > 0 ?
												<Field label='Weaknesses' value={weaknesses.map(mod => `${mod.damageType} ${mod.value}`).join(', ')} />
												: null
										}
										{
											conditions.length > 0 ?
												<Field label='Cannot Be' value={conditions.join(', ')} />
												: null
										}
										{
											props.monster.freeStrikeType !== DamageType.Damage ?
												<Field label='Free Strike Type' value={props.monster.freeStrikeType} />
												: null
										}
										{
											props.monster.role.organization === MonsterOrganizationType.Minion ?
												<Field label='Minion' value='On their turn, each minion can take only a move action and a main action, a move action and a maneuver, or two move actions.' />
												: null
										}
										{
											abilities.some(a => a.type.usage === AbilityUsage.VillainAction) ?
												<Field
													label='Villain Actions'
													value='This creature can use a villain action at the end of any other creature’s turn during combat. Each villain action can be used only once per encounter, and no more than one villain action can be used per round.'
												/>
												: null
										}
										{
											signatureBonus ?
												<Field label='Signature Ability Damage' value={`+${signatureBonus.tier1} / +${signatureBonus.tier2} / +${signatureBonus.tier3}`} />
												: null
										}
										{
											props.monster.withCaptain ?
												<Field label='With Captain' value={props.monster.withCaptain} />
												: null
										}
										{features.map(f => <Field key={f.id} label={f.name} value={<Markdown text={f.description} useSpan={true} />} />)}
									</div>
									: null
							}
							{
								abilities.length > 0 ?
									<div className='abilities'>
										{abilities.map(a => <SelectablePanel key={a.id} onSelect={() => setSelectedAbility(a)}><AbilityPanel ability={a} monster={props.monster} mode={PanelMode.Full} /></SelectablePanel>)}
									</div>
									: null
							}
							{
								props.monster.retainer ?
									<>
										{
											props.monster.retainer.level4 && (props.monster.retainer.level < 4) ?
												<>
													<HeaderText level={1}>Level 4</HeaderText>
													<FeaturePanel key={props.monster.retainer.level4.id} feature={props.monster.retainer.level4}options={props.options} mode={PanelMode.Full} />
												</>
												: null
										}
										{
											props.monster.retainer.level7 && (props.monster.retainer.level < 7) ?
												<>
													<HeaderText level={1}>Level 7</HeaderText>
													<FeaturePanel key={props.monster.retainer.level7.id} feature={props.monster.retainer.level7}options={props.options} mode={PanelMode.Full} />
												</>
												: null
										}
										{
											props.monster.retainer.level10 && (props.monster.retainer.level < 10) ?
												<>
													<HeaderText level={1}>Level 10</HeaderText>
													<FeaturePanel key={props.monster.retainer.level10.id} feature={props.monster.retainer.level10}options={props.options} mode={PanelMode.Full} />
												</>
												: null
										}
									</>
									: null
							}
						</>
						: null
				}
				<Drawer open={selectedAbility !== null} onClose={() => setSelectedAbility(null)} closeIcon={null} size={500}>
					{
						selectedAbility ?
							<AbilityModal
								ability={selectedAbility}
								monster={props.monster}
								onClose={() => setSelectedAbility(null)}
							/>
							: null
					}
				</Drawer>
			</div>
		</ErrorBoundary>
	);
};
