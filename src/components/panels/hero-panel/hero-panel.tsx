import { AbilityPanel } from '../ability-panel/ability-panel';
import { Characteristic } from '../../../enums/characteristic';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { FeatureType } from '../../../enums/feature-type';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { KitPanel } from '../kit-panel/kit-panel';
import { PanelMode } from '../../../enums/panel-mode';
import { Statistic } from 'antd';

import './hero-panel.scss';

interface Props {
	hero: Hero;
	mode?: PanelMode;
}

export const HeroPanel = (props: Props) => {
	return (
		<div className='hero-panel'>
			<div className='header-text'>{props.hero.name || 'Unnamed Hero'}</div>
			<div className='characteristics-row-container'>
				{
					props.hero.ancestry ?
						<div className='ds-text'>Ancestry: {props.hero.ancestry.name}</div>
						:
						<div className='dimmed-text'>No ancestry chosen</div>
				}
				{
					props.hero.culture ?
						<div>
							<div className='ds-text'>Culture: {props.hero.culture.name}</div>
							<div className='ds-text'>Environment: {props.hero.culture.environment.name}</div>
							<div className='ds-text'>Organization: {props.hero.culture.organization.name}</div>
							<div className='ds-text'>Upbringing: {props.hero.culture.upbringing.name}</div>
						</div>
						:
						<div className='dimmed-text'>No culture chosen</div>
				}
				{
					props.hero.class ?
						<div>
							<div className='ds-text'>Class: {props.hero.class.name}</div>
							<div className='ds-text'>Level: {props.hero.class.level}</div>
						</div>
						:
						<div className='dimmed-text'>No class chosen</div>
				}
				{
					props.hero.career ?
						<div className='ds-text'>Career: {props.hero.career.name}</div>
						:
						<div className='dimmed-text'>No career chosen</div>
				}
				{
					props.hero.complication ?
						<div className='ds-text'>Complication: {props.hero.complication.name}</div>
						: null
				}
				{
					props.hero.kits.length > 0 ?
						<div>
							<div className='ds-text'>Kit: {props.hero.kits.map(k => k.name).join(', ')}</div>
							<div className='ds-text'>Armor: {props.hero.kits.map(k => k.armor).join(', ')}</div>
							<div className='ds-text'>Weapons: {props.hero.kits.map(k => k.weapon).join(', ')}</div>
							<div className='ds-text'>Implements: {props.hero.kits.map(k => k.implement).join(', ')}</div>
						</div>
						:
						<div className='dimmed-text'>No kit chosen</div>
				}
			</div>
			<div className='ds-text'>Languages: {HeroLogic.getLanguages(props.hero).join(', ') || 'None'}</div>
			<div className='ds-text'>Skills: {HeroLogic.getSkills(props.hero).join(', ') || 'None'}</div>
			<div className='characteristics-row-container'>
				<div className='characteristics-row'>
					<div className='characteristic'>
						<Statistic title='Might' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Might)} />
					</div>
					<div className='characteristic'>
						<Statistic title='Agility' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Agility)} />
					</div>
					<div className='characteristic'>
						<Statistic title='Reason' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Reason)} />
					</div>
					<div className='characteristic'>
						<Statistic title='Intuition' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Intuition)} />
					</div>
					<div className='characteristic'>
						<Statistic title='Presence' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Presence)} />
					</div>
				</div>
				<div className='characteristics-row'>
					<div className='characteristic'>
						<Statistic title='Size' value={HeroLogic.getSize(props.hero)} />
					</div>
					<div className='characteristic'>
						<Statistic title='Reach' value={HeroLogic.getReach(props.hero)} />
					</div>
					<div className='characteristic'>
						<Statistic title='Speed' value={HeroLogic.getSpeed(props.hero)} />
					</div>
					<div className='characteristic'>
						<Statistic title='Stability' value={HeroLogic.getStability(props.hero)} />
					</div>
				</div>
			</div>
			<div className='characteristics-row-container'>
				<div className='characteristics-row'>
					<div className='characteristic'>
						<Statistic title='Stamina' value={HeroLogic.getStamina(props.hero)} />
					</div>
					<div className='characteristic'>
						<Statistic title='Recoveries' value={HeroLogic.getRecoveries(props.hero)} />
					</div>
					<div className='characteristic'>
						<Statistic title='Recovery Value' value={HeroLogic.getRecoveryValue(props.hero)} />
					</div>
				</div>
				<div className='characteristics-row'>
					<div className='characteristic'>
						<Statistic title={props.hero.class ? props.hero.class.heroicResource : 'Heroic Resource'} value={props.hero.state.heroicResource} />
					</div>
					<div className='characteristic'>
						<Statistic title='Renown' value={props.hero.state.renown} />
					</div>
					<div className='characteristic'>
						<Statistic title='Hero Tokens' value={props.hero.state.heroTokens} />
					</div>
				</div>
			</div>
			{
				props.hero.kits.map(kit => (
					<KitPanel key={kit.id} kit={kit} />
				))
			}
			{
				HeroLogic.getFeatures(props.hero)
					.filter(feature => feature.type === FeatureType.Text)
					.map(feature => (
						<FeaturePanel key={feature.id} feature={feature} settingID={props.hero.settingID} />
					))
			}
			{
				HeroLogic.getAbilities(props.hero)
					.map(ability => (
						<AbilityPanel key={ability.id} ability={ability} />
					))
			}
		</div>
	);
};
