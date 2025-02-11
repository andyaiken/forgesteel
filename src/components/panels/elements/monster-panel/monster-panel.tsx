import { Flex, Tag } from 'antd';
import { Monster, MonsterGroup } from '../../../../models/monster';
import { Characteristic } from '../../../../enums/characteristic';
import { DamageModifierType } from '../../../../enums/damage-modifier-type';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { FormatLogic } from '../../../../logic/format-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterOrganizationType } from '../../../../enums/monster-organization-type';
import { PanelMode } from '../../../../enums/panel-mode';

import './monster-panel.scss';

interface Props {
	monster: Monster;
	monsterGroup?: MonsterGroup;
	mode?: PanelMode;
}

export const MonsterPanel = (props: Props) => {
	try {
		if (props.mode !== PanelMode.Full) {
			return (
				<div className='monster-panel compact'>
					<HeaderText>{MonsterLogic.getMonsterName(props.monster, props.monsterGroup)}</HeaderText>
					<Flex justify='space-between'>
						<div className='ds-text'>
							{MonsterLogic.getMonsterDescription(props.monster)} {props.monster.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)}
						</div>
						<Field label='EV' value={(props.monster.role.organization === MonsterOrganizationType.Minion) ? `${props.monster.encounterValue} for 8 minions` : props.monster.encounterValue} />
					</Flex>
				</div>
			);
		}

		const signatureBonus = MonsterLogic.getSignatureDamageBonus(props.monster);

		const immunities = MonsterLogic.getDamageModifiers(props.monster, DamageModifierType.Immunity);
		const weaknesses = MonsterLogic.getDamageModifiers(props.monster, DamageModifierType.Weakness);
		const speed = props.monster.speed.modes !== '' ? `${props.monster.speed.value} (${props.monster.speed.modes})` : props.monster.speed.value;

		const types = [ FeatureType.Ability, FeatureType.Text ];
		const features = MonsterLogic.getFeatures(props.monster).filter(f => types.includes(f.type));

		return (
			<div className='monster-panel' id={props.monster.id}>
				<HeaderText level={1}>{MonsterLogic.getMonsterName(props.monster, props.monsterGroup)}</HeaderText>
				<Markdown text={props.monster.description} />
				<Flex justify='space-between'>
					<div className='ds-text'>
						{MonsterLogic.getMonsterDescription(props.monster)} {props.monster.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)}
					</div>
					<Field label='EV' value={(props.monster.role.organization === MonsterOrganizationType.Minion) ? `${props.monster.encounterValue} for 8 minions` : props.monster.encounterValue} />
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
				{immunities.length > 0 ? <Field label='Immunities' value={immunities.map(mod => `${mod.type} ${mod.value}`).join(', ')} /> : null}
				{weaknesses.length > 0 ? <Field label='Weaknesses' value={weaknesses.map(mod => `${mod.type} ${mod.value}`).join(', ')} /> : null}
				{
					features.length > 0 ?
						<div className='features'>
							{features.map(f => <FeaturePanel key={f.id} feature={f} mode={PanelMode.Full} />)}
						</div>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
