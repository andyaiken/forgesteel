import { Drawer, Flex, Tag } from 'antd';
import { Monster, MonsterGroup } from '../../../../models/monster';
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
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Token } from '../../../controls/token/token';
import { useState } from 'react';

import './monster-panel.scss';

interface Props {
	monster: Monster;
	monsterGroup?: MonsterGroup;
	mode?: PanelMode;
	canRoll?: boolean;
}

export const MonsterPanel = (props: Props) => {
	const [ selectedAbility, setSelectedAbility ] = useState<Ability | null>(null);

	try {
		if (props.mode !== PanelMode.Full) {
			return (
				<div className='monster-panel compact'>
					<HeaderText level={1} ribbon={<Token monster={props.monster} monsterGroup={props.monsterGroup} size={28} />}>
						{MonsterLogic.getMonsterName(props.monster, props.monsterGroup)}
					</HeaderText>
					<MonsterLabel monster={props.monster} />
					<Flex align='center' justify='space-between'>
						<div>{props.monster.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)}</div>
						<Field label='EV' value={(props.monster.role.organization === MonsterOrganizationType.Minion) ? `${props.monster.encounterValue} for 8 minions` : ((props.monster.encounterValue === 0) ? '-': props.monster.encounterValue)} />
					</Flex>
				</div>
			);
		}

		const signatureBonus = MonsterLogic.getSignatureDamageBonus(props.monster);

		const immunities = MonsterLogic.getDamageModifiers(props.monster, DamageModifierType.Immunity);
		const weaknesses = MonsterLogic.getDamageModifiers(props.monster, DamageModifierType.Weakness);
		const speed = props.monster.speed.modes !== '' ? `${props.monster.speed.value} (${props.monster.speed.modes})` : props.monster.speed.value;

		const features = MonsterLogic.getFeatures(props.monster).filter(f => (f.type === FeatureType.Text) || (f.type === FeatureType.AddOn));
		const abilities = MonsterLogic.getFeatures(props.monster).filter(f => f.type === FeatureType.Ability).map(f => f.data.ability);

		return (
			<div className='monster-panel' id={props.monster.id}>
				<HeaderText level={1} ribbon={<Token monster={props.monster} monsterGroup={props.monsterGroup} size={28} />}>
					{MonsterLogic.getMonsterName(props.monster, props.monsterGroup)}
				</HeaderText>
				<MonsterLabel monster={props.monster} />
				<Markdown text={props.monster.description} />
				<Flex align='center' justify='space-between'>
					<div>{props.monster.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)}</div>
					<Field label='EV' value={(props.monster.role.organization === MonsterOrganizationType.Minion) ? `${props.monster.encounterValue} for 8 minions` : ((props.monster.encounterValue === 0) ? '-': props.monster.encounterValue)} />
				</Flex>
				<div className='stats'>
					<Field orientation='vertical' label='Speed' value={speed} />
					<Field orientation='vertical' label='Size' value={FormatLogic.getSize(props.monster.size)} />
					<Field orientation='vertical' label='Stamina' value={MonsterLogic.getStamina(props.monster)} />
					<Field orientation='vertical' label='Stability' value={props.monster.stability} />
					<Field orientation='vertical' label='Free Strike' value={MonsterLogic.getFreeStrikeDamage(props.monster)} />
				</div>
				<div className='stats'>
					{
						[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ]
							.map(ch => <Field key={ch} orientation='vertical' label={ch} value={MonsterLogic.getCharacteristic(props.monster, ch)} />)
					}
				</div>
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
				{immunities.length > 0 ? <Field label='Immunities' value={immunities.map(mod => `${mod.damageType} ${mod.value}`).join(', ')} /> : null}
				{weaknesses.length > 0 ? <Field label='Weaknesses' value={weaknesses.map(mod => `${mod.damageType} ${mod.value}`).join(', ')} /> : null}
				{
					features.length > 0 ?
						<div className='features'>
							{features.map(f => <FeaturePanel key={f.id} feature={f} mode={PanelMode.Full} />)}
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
					props.monster.retainer ?
						<>
							{
								props.monster.retainer.level4 && (props.monster.retainer.level < 4) ?
									<>
										<HeaderText level={1}>Level 4</HeaderText>
										<FeaturePanel key={props.monster.retainer.level4.id} feature={props.monster.retainer.level4} mode={PanelMode.Full} />
									</>
									: null
							}
							{
								props.monster.retainer.level7 && (props.monster.retainer.level < 7) ?
									<>
										<HeaderText level={1}>Level 7</HeaderText>
										<FeaturePanel key={props.monster.retainer.level7.id} feature={props.monster.retainer.level7} mode={PanelMode.Full} />
									</>
									: null
							}
							{
								props.monster.retainer.level10 && (props.monster.retainer.level < 10) ?
									<>
										<HeaderText level={1}>Level 10</HeaderText>
										<FeaturePanel key={props.monster.retainer.level10.id} feature={props.monster.retainer.level10} mode={PanelMode.Full} />
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
								monster={props.monster}
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
