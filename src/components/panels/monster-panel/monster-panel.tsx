import { Flex, Space, Tag } from 'antd';
import { Monster, MonsterGroup } from '../../../models/monster';
import { Characteristic } from '../../../enums/characteristic';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { FeatureType } from '../../../enums/feature-type';
import { Field } from '../../controls/field/field';
import { FormatLogic } from '../../../logic/format-logic';
import { HeaderText } from '../../controls/header-text/header-text';
import { MonsterLogic } from '../../../logic/monster-logic';
import { PanelMode } from '../../../enums/panel-mode';
import { Utils } from '../../../utils/utils';

import './monster-panel.scss';

interface Props {
	monster: Monster;
	monsterGroup: MonsterGroup;
	mode?: PanelMode;
}

export const MonsterPanel = (props: Props) => {
	try {
		if (props.mode === PanelMode.Compact) {
			return (
				<div className='monster-panel compact'>
					<HeaderText>{MonsterLogic.getMonsterName(props.monster, props.monsterGroup)}</HeaderText>
					<Flex justify='space-between'>
						<div className='ds-text'>
							Level {props.monster.level} {FormatLogic.getRole(props.monster.role)} {props.monster.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)}
						</div>
						<Field label='EV' value={props.monster.encounterValue} />
					</Flex>
				</div>
			);
		}

		const immunities = MonsterLogic.getDamageModifiers(props.monster, DamageModifierType.Immunity);
		const weaknesses = MonsterLogic.getDamageModifiers(props.monster, DamageModifierType.Weakness);
		const speed = props.monster.speed.modes !== '' ? `${props.monster.speed.value} (${props.monster.speed.modes})` : props.monster.speed.value;
		const features = props.monster.features.filter(f => f.type === FeatureType.Text);
		const abilities = props.monster.features.filter(f => f.type === FeatureType.Ability);

		return (
			<div className='monster-panel' id={props.monster.id}>
				<HeaderText level={1}>{MonsterLogic.getMonsterName(props.monster, props.monsterGroup)}</HeaderText>
				{props.monster.description ? <div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.monster.description) }} /> : null}
				<Flex justify='space-between'>
					<div className='ds-text'>
						Level {props.monster.level} {FormatLogic.getRole(props.monster.role)} {props.monster.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)}
					</div>
					<Field label='EV' value={props.monster.encounterValue} />
				</Flex>
				<div className='stats'>
					<Field orientation='vertical' label='Speed' value={speed} />
					<Field orientation='vertical' label='Size' value={FormatLogic.getSize(props.monster.size)} />
					<Field orientation='vertical' label='Stamina' value={props.monster.stamina} />
					<Field orientation='vertical' label='Stability' value={props.monster.stability} />
					<Field orientation='vertical' label='Free Strike' value={props.monster.freeStrikeDamage} />
				</div>
				<div className='stats'>
					{
						[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ]
							.map(ch => <Field key={ch} orientation='vertical' label={ch} value={MonsterLogic.getCharacteristic(props.monster, ch)} />)
					}
				</div>
				{immunities.length > 0 ? <Field label='Immunities' value={immunities.map(mod => `${mod.type} ${mod.value}`).join(', ')} /> : null}
				{weaknesses.length > 0 ? <Field label='Weaknesses' value={weaknesses.map(mod => `${mod.type} ${mod.value}`).join(', ')} /> : null}
				{
					features.length > 0 ?
						<Space direction='vertical' style={{ width: '100%' }}>
							{features.map(f => <FeaturePanel key={f.id} feature={f} mode={PanelMode.Full} />)}
						</Space>
						: null
				}
				{
					abilities.length > 0 ?
						<Space direction='vertical' style={{ width: '100%' }}>
							{abilities.map(f => <FeaturePanel key={f.id} feature={f} mode={PanelMode.Full} />)}
						</Space>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
