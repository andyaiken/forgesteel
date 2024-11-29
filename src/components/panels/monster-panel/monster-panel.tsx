import { Flex, Space, Tag } from 'antd';
import { CampaignSetting } from '../../../models/campaign-setting';
import { Characteristic } from '../../../enums/characteristic';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { FeatureType } from '../../../enums/feature-type';
import { Field } from '../../controls/field/field';
import { FormatLogic } from '../../../logic/format-logic';
import { HeaderText } from '../../controls/header-text/header-text';
import { Monster } from '../../../models/monster';
import { MonsterLogic } from '../../../logic/monster-logic';
import { PanelMode } from '../../../enums/panel-mode';

import './monster-panel.scss';

interface Props {
	monster: Monster;
	campaignSettings?: CampaignSetting[];
	mode?: PanelMode;
}

export const MonsterPanel = (props: Props) => {
	try {
		const immunities = MonsterLogic.getDamageModifiers(props.monster, DamageModifierType.Immunity);
		const weaknesses = MonsterLogic.getDamageModifiers(props.monster, DamageModifierType.Weakness);
		const speed = props.monster.speed.modes !== '' ? `${props.monster.speed.value} (${props.monster.speed.modes})` : props.monster.speed.value;
		const features = props.monster.features.filter(f => f.type === FeatureType.Text);
		const abilities = props.monster.features.filter(f => f.type === FeatureType.Ability);

		return (
			<div className='monster-panel' id={props.mode === PanelMode.Full ? props.monster.id : undefined}>
				<HeaderText level={1}>{props.monster.name || 'Unnamed Monster'}</HeaderText>
				<div className='ds-text description-text'>{props.monster.description}</div>
				<Flex justify='space-between'>
					<div className='ds-text'>
						Level {props.monster.level} {FormatLogic.getRole(props.monster.role)} {props.monster.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)}
					</div>
					<Field label='EV' value={props.monster.encounterValue} />
				</Flex>
				<Flex justify='space-between'>
					<Field label='Speed' value={speed} />
					<Field label='Size' value={FormatLogic.getSize(props.monster.size)} />
					<Field label='Stamina' value={props.monster.stamina} />
					<Field label='Stability' value={props.monster.stability} />
					<Field label='Free Strike' value={props.monster.freeStrikeDamage} />
				</Flex>
				<Flex justify='space-between'>
					{[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(ch => <Field key={ch} label={ch} value={MonsterLogic.getCharacteristic(props.monster, ch)} />)}
				</Flex>
				{immunities.length > 0 ? <Field label='Immunities' value={immunities.join(', ')} /> : null}
				{weaknesses.length > 0 ? <Field label='Weaknesses' value={weaknesses.join(', ')} /> : null}
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
				{
					props.monster.villainActions.length > 0 ?
						<Space direction='vertical' style={{ width: '100%' }}>
							{props.monster.villainActions.map(va => <FeaturePanel key={va.id} feature={va} mode={PanelMode.Full} />)}
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
