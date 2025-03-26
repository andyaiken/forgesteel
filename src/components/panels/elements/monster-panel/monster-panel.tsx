import { Drawer, Flex, Tag } from 'antd';
import { Monster, MonsterGroup, MonsterState } from '../../../../models/monster';
import { Ability } from '../../../../models/ability';
import { AbilityModal } from '../../../modals/ability/ability-modal';
import { AbilityPanel } from '../ability-panel/ability-panel';
import { Characteristic } from '../../../../enums/characteristic';
import { DamageModifierType } from '../../../../enums/damage-modifier-type';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { FormatLogic } from '../../../../logic/format-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { MonsterLabel } from '../../monster-label/monster-label';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterOrganizationType } from '../../../../enums/monster-organization-type';
import { MonsterStatePanel } from '../../monster-state/monster-state-panel';
import { MonsterToken } from '../../../controls/token/token';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './monster-panel.scss';

interface Props {
	monster: Monster;
	monsterGroup?: MonsterGroup;
	options: Options;
	mode?: PanelMode;
	canRoll?: boolean;
	updateMonster?: (monster: Monster) => void;
}

export const MonsterPanel = (props: Props) => {
	const [ monster, setMonster ] = useState<Monster>(Utils.copy(props.monster));
	const [ selectedAbility, setSelectedAbility ] = useState<Ability | null>(null);

	const updateState = (state: MonsterState) => {
		const copy = Utils.copy(monster);
		copy.state = state;
		setMonster(copy);
		if (props.updateMonster) {
			props.updateMonster(copy);
		}
	};

	try {
		if (props.mode !== PanelMode.Full) {
			return (
				<div className='monster-panel compact'>
					<HeaderText level={1} ribbon={<MonsterToken monster={monster} monsterGroup={props.monsterGroup} size={28} />}>
						{MonsterLogic.getMonsterName(monster, props.monsterGroup)}
					</HeaderText>
					<MonsterLabel monster={monster} />
					<Flex align='center' justify='space-between'>
						<div>{monster.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)}</div>
						<Field label='EV' value={(monster.role.organization === MonsterOrganizationType.Minion) ? `${monster.encounterValue} for ${props.options.minionCount} minions` : ((monster.encounterValue === 0) ? '-': monster.encounterValue)} />
					</Flex>
				</div>
			);
		}

		const signatureBonus = MonsterLogic.getSignatureDamageBonus(monster);

		const immunities = MonsterLogic.getDamageModifiers(monster, DamageModifierType.Immunity);
		const weaknesses = MonsterLogic.getDamageModifiers(monster, DamageModifierType.Weakness);
		const speed = monster.speed.modes !== '' ? `${monster.speed.value} (${monster.speed.modes})` : monster.speed.value;

		const features = MonsterLogic.getFeatures(monster).filter(f => (f.type === FeatureType.Text) || (f.type === FeatureType.AddOn));
		const abilities = MonsterLogic.getFeatures(monster).filter(f => f.type === FeatureType.Ability).map(f => f.data.ability);

		return (
			<div className='monster-panel' id={monster.id}>
				<HeaderText level={1} ribbon={<MonsterToken monster={monster} monsterGroup={props.monsterGroup} size={28} />}>
					{MonsterLogic.getMonsterName(monster, props.monsterGroup)}
				</HeaderText>
				<MonsterLabel monster={monster} />
				<Markdown text={monster.description} />
				<Flex align='center' justify='space-between'>
					<div>{monster.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)}</div>
					<Field label='EV' value={(monster.role.organization === MonsterOrganizationType.Minion) ? `${monster.encounterValue} ${props.options.minionCount} minions` : ((monster.encounterValue === 0) ? '-': monster.encounterValue)} />
				</Flex>
				{
					props.updateMonster ?
						<MonsterStatePanel
							state={monster.state}
							source={monster.role.organization === MonsterOrganizationType.Minion ? 'minion' : 'monster'}
							updateState={updateState}
						/>
						: null
				}
				<div className='stats'>
					<Field orientation='vertical' label='Speed' value={speed} />
					<Field orientation='vertical' label='Size' value={FormatLogic.getSize(monster.size)} />
					<Field orientation='vertical' label='Stamina' value={MonsterLogic.getStaminaDescription(monster)} />
					<Field orientation='vertical' label='Stability' value={monster.stability} />
					<Field orientation='vertical' label='Free Strike' value={MonsterLogic.getFreeStrikeDamage(monster)} />
				</div>
				<div className='stats'>
					{
						[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ]
							.map(ch => <Field key={ch} orientation='vertical' label={ch} value={MonsterLogic.getCharacteristic(monster, ch)} />)
					}
				</div>
				{
					signatureBonus || monster.withCaptain || (immunities.length > 0) || (weaknesses.length > 0) || (features.length > 0) ?
						<div className='features'>
							{
								signatureBonus ?
									<Field label='Signature Ability Damage' value={`+${signatureBonus.tier1} / +${signatureBonus.tier2} / +${signatureBonus.tier3}`} />
									: null
							}
							{
								monster.withCaptain ?
									<Field label='With Captain' value={monster.withCaptain} />
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
							{features.map(f => <Field key={f.id} label={f.name} value={<Markdown text={f.description} useSpan={true} />} />)}
						</div>
						: null
				}
				{
					abilities.length > 0 ?
						<div className='abilities'>
							{abilities.map(a => <SelectablePanel key={a.id} onSelect={() => setSelectedAbility(a)}><AbilityPanel ability={a} mode={PanelMode.Full} /></SelectablePanel>)}
						</div>
						: null
				}
				{
					monster.retainer ?
						<>
							{
								monster.retainer.level4 && (monster.retainer.level < 4) ?
									<>
										<HeaderText level={1}>Level 4</HeaderText>
										<FeaturePanel key={monster.retainer.level4.id} feature={monster.retainer.level4}options={props.options} mode={PanelMode.Full} />
									</>
									: null
							}
							{
								monster.retainer.level7 && (monster.retainer.level < 7) ?
									<>
										<HeaderText level={1}>Level 7</HeaderText>
										<FeaturePanel key={monster.retainer.level7.id} feature={monster.retainer.level7}options={props.options} mode={PanelMode.Full} />
									</>
									: null
							}
							{
								monster.retainer.level10 && (monster.retainer.level < 10) ?
									<>
										<HeaderText level={1}>Level 10</HeaderText>
										<FeaturePanel key={monster.retainer.level10.id} feature={monster.retainer.level10}options={props.options} mode={PanelMode.Full} />
									</>
									: null
							}
						</>
						: null
				}
				<Drawer open={selectedAbility !== null} onClose={() => setSelectedAbility(null)} closeIcon={null} width='500px'>
					{
						selectedAbility ?
							<AbilityModal
								ability={selectedAbility}
								monster={monster}
								onClose={() => setSelectedAbility(null)}
							/>
							: null
					}
				</Drawer>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
