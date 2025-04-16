import { Divider, Flex, Tag } from 'antd';
import { Terrain, TerrainSection } from '../../../../models/terrain';
import { AbilityPanel } from '../ability-panel/ability-panel';
import { Badge } from '../../../controls/badge/badge';
import { DamageModifierType } from '../../../../enums/damage-modifier-type';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { PanelMode } from '../../../../enums/panel-mode';
import { TerrainLabel } from '../../monster-label/monster-label';
import { TerrainLogic } from '../../../../logic/terrain-logic';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './terrain-panel.scss';

interface Props {
	terrain: Terrain;
	upgradeIDs?: string[];
	showCustomizations?: boolean;
	mode?: PanelMode;
	updateTerrain?: (terrain: Terrain) => void;
}

export const TerrainPanel = (props: Props) => {
	const [ terrain, setTerrain ] = useState<Terrain>(Utils.copy(props.terrain));

	const setSquares = (value: number) => {
		const copy = Utils.copy(terrain);
		copy.state.squares = value;
		setTerrain(copy);
		if (props.updateTerrain) {
			props.updateTerrain(copy);
		}
	};

	const setStaminaDamage = (value: number) => {
		const copy = Utils.copy(terrain);
		copy.state.staminaDamage = value;
		setTerrain(copy);
		if (props.updateTerrain) {
			props.updateTerrain(copy);
		}
	};

	try {
		const getSection = (section: TerrainSection, index: number) => {
			return (
				<div key={index} className='terrain-section'>
					<Divider />
					{
						section.content.map(content => {
							switch (content.type) {
								case FeatureType.Text:
									return <Field key={content.id} label={content.name} value={<Markdown text={content.description} useSpan={true} />} />;
								case FeatureType.Ability:
									return <AbilityPanel key={content.id} ability={content.data.ability} mode={PanelMode.Full} />;
							}
						})
					}
				</div>
			);
		};

		const immunities = TerrainLogic.getDamageModifiers(terrain, DamageModifierType.Immunity);
		const weaknesses = TerrainLogic.getDamageModifiers(terrain, DamageModifierType.Weakness);

		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'terrain-panel' : 'terrain-panel compact'} id={props.mode === PanelMode.Full ? terrain.id : undefined}>
					<HeaderText level={1}>{terrain.name || 'Unnamed Ancestry'}</HeaderText>
					<Markdown text={terrain.description} />
					<TerrainLabel terrain={terrain} />
					<Flex align='center' justify='space-between'>
						<Tag>{terrain.category}</Tag>
						<Field label='EV' value={terrain.area ? `${terrain.encounterValue} / ${terrain.area}` : ((terrain.encounterValue === 0) ? '-': terrain.encounterValue)} />
					</Flex>
					{
						props.mode === PanelMode.Full ?
							<div>
								{
									props.updateTerrain ?
										<div className='stats'>
											{
												terrain.stamina.perSquare ?
													<NumberSpin min={0} value={terrain.state.squares} onChange={setSquares}>
														<Field orientation='vertical' label='Squares' value={terrain.state.squares} />
													</NumberSpin>
													: null
											}
											<NumberSpin min={0} value={terrain.state.staminaDamage} onChange={setStaminaDamage}>
												<Field orientation='vertical' label='Damage' value={terrain.state.staminaDamage} />
											</NumberSpin>
										</div>
										: null
								}
								<Field label='Size' value={terrain.size} />
								<Field label='Stamina' value={props.updateTerrain ? TerrainLogic.getStaminaValue(terrain) : TerrainLogic.getStaminaDescription(terrain)} />
								{
									terrain.direction  ?
										<Field label='Direction' value={terrain.direction} />
										: null
								}
								{
									terrain.link  ?
										<Field label='Link' value={terrain.link} />
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
								{terrain.sections.map((section, n) => getSection(section, n))}
								{
									props.upgradeIDs ?
										terrain.upgrades
											.filter(u => (props.upgradeIDs|| []).includes(u.id))
											.map(upgrade => (
												<div key={upgrade.id}>
													<Divider />
													<Field label={upgrade.label} value={upgrade.text} />
													{upgrade.sections.map((section, n) => getSection(section, n))}
												</div>
											))
										: null
								}
								{props.showCustomizations && (terrain.upgrades.length > 0) ? <HeaderText level={1}>Customization</HeaderText> : null}
								{
									props.showCustomizations ?
										terrain.upgrades.map(upgrade => (
											<div key={upgrade.id}>
												{
													upgrade.cost >= 0 ?
														<HeaderText ribbon={<Badge>+{upgrade.cost} EV</Badge>}>{upgrade.label}</HeaderText>
														: <HeaderText ribbon={<Badge>{upgrade.cost} EV</Badge>}>{upgrade.label}</HeaderText>
												}

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
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
