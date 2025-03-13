import { Divider, Flex, Tag } from 'antd';
import { Terrain, TerrainSection } from '../../../../models/terrain';
import { AbilityPanel } from '../ability-panel/ability-panel';
import { Badge } from '../../../controls/badge/badge';
import { DamageModifierType } from '../../../../enums/damage-modifier-type';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { PanelMode } from '../../../../enums/panel-mode';
import { TerrainLabel } from '../../monster-label/monster-label';
import { TerrainLogic } from '../../../../logic/terrain-logic';

import './terrain-panel.scss';

interface Props {
	terrain: Terrain;
	upgradeIDs?: string[];
	showUpgrades?: boolean;
	mode?: PanelMode;
}

export const TerrainPanel = (props: Props) => {
	try {
		const getSection = (section: TerrainSection, index: number) => {
			return (
				<div key={index} className='terrain-section'>
					<Divider />
					{
						section.content.map((content, n) => {
							switch (content.type) {
								case FeatureType.Text:
									return <Field key={n} label={content.name} value={content.description} />;
								case FeatureType.Ability:
									return <AbilityPanel key={n} ability={content.data.ability} mode={PanelMode.Full} />;
							}
						})
					}
				</div>
			);
		};

		const immunities = TerrainLogic.getDamageModifiers(props.terrain, DamageModifierType.Immunity);
		const weaknesses = TerrainLogic.getDamageModifiers(props.terrain, DamageModifierType.Weakness);

		return (
			<div className={props.mode === PanelMode.Full ? 'terrain-panel' : 'terrain-panel compact'} id={props.mode === PanelMode.Full ? props.terrain.id : undefined}>
				<HeaderText level={1}>{props.terrain.name || 'Unnamed Ancestry'}</HeaderText>
				<Markdown text={props.terrain.description} />
				<TerrainLabel terrain={props.terrain} />
				<Flex align='center' justify='space-between'>
					<Tag>{props.terrain.category}</Tag>
					<Field label='EV' value={props.terrain.area ? `${props.terrain.encounterValue} / ${props.terrain.area}` : ((props.terrain.encounterValue === 0) ? '-': props.terrain.encounterValue)} />
				</Flex>
				{
					props.mode === PanelMode.Full ?
						<div>
							<Field label='Size' value={props.terrain.size} />
							<Field label='Stamina' value={TerrainLogic.getStamina(props.terrain)} />
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
							{props.terrain.sections.map((section, n) => getSection(section, n))}
							{
								props.upgradeIDs ?
									props.terrain.upgrades
										.filter(u => (props.upgradeIDs|| []).includes(u.id))
										.map((upgrade, n) => (
											<div key={n}>
												<Divider />
												<Field label={upgrade.label} value={upgrade.text} />
												{upgrade.sections.map((section, n) => getSection(section, n))}
											</div>
										))
									: null
							}
							{props.showUpgrades && (props.terrain.upgrades.length > 0) ? <HeaderText level={1}>Customization</HeaderText> : null}
							{
								props.showUpgrades ?
									props.terrain.upgrades.map((upgrade, n) => (
										<div key={n}>
											<HeaderText ribbon={<Badge>+{upgrade.cost} EV</Badge>}>{upgrade.label}</HeaderText>
											{upgrade.text ? <div className='ds-text'>{upgrade.text}</div> : null}
											{upgrade.sections.map((section, n) => getSection(section, n))}
										</div>
									))
									: null
							}
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
