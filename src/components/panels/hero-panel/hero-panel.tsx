import { AbilityPanel } from '../ability-panel/ability-panel';
import { AncestryPanel } from '../ancestry-panel/ancestry-panel';
import { CareerPanel } from '../career-panel/career-panel';
import { Characteristic } from '../../../enums/characteristic';
import { ClassPanel } from '../class-panel/class-panel';
import { ComplicationPanel } from '../complication-panel/complication-panel';
import { CulturePanel } from '../culture-panel/culture-panel';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { KitPanel } from '../kit-panel/kit-panel';
import { Statistic } from 'antd';

import './hero-panel.scss';

interface Props {
	hero: Hero;
}

export const HeroPanel = (props: Props) => {
	return (
		<div className='hero-panel'>
			<div className='header-text'>{props.hero.name || 'Unnamed Hero'}</div>
			{props.hero.ancestry ? <AncestryPanel ancestry={props.hero.ancestry} /> : <div className='dimmed-text'>No ancestry chosen</div>}
			{props.hero.culture ? <CulturePanel culture={props.hero.culture} /> : <div className='dimmed-text'>No culture chosen</div>}
			{props.hero.class ? <ClassPanel heroClass={props.hero.class} /> : <div className='dimmed-text'>No class chosen</div>}
			{props.hero.career ? <CareerPanel career={props.hero.career} /> : <div className='dimmed-text'>No career chosen</div>}
			{props.hero.complication ? <ComplicationPanel complication={props.hero.complication} /> : null}
			<div>Languages: {HeroLogic.getLanguages(props.hero).join(', ')}</div>
			<div>Skills: {HeroLogic.getSkills(props.hero).join(', ')}</div>
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
				<div className='characteristics-row'>
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
			{
				props.hero.kits.map(kit => (
					<KitPanel kit={kit} />
				))
			}
			{
				HeroLogic.getFeatures(props.hero).map(feature => (
					<FeaturePanel feature={feature} />
				))
			}
			{
				HeroLogic.getAbilities(props.hero).map(ability => (
					<AbilityPanel ability={ability} />
				))
			}
		</div>
	);
};
