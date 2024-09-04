import { HeroLogic } from '../../../logic/hero-logic';
import { Hero } from '../../../models/hero';
import { AbilityPanel } from '../ability-panel/ability-panel';
import { AncestryPanel } from '../ancestry-panel/ancestry-panel';
import { CareerPanel } from '../career-panel/career-panel';
import { ClassPanel } from '../class-panel/class-panel';
import { ComplicationPanel } from '../complication-panel/complication-panel';
import { CulturePanel } from '../culture-panel/culture-panel';
import { KitPanel } from '../kit-panel/kit-panel';

import './hero-panel.scss'

interface Props {
	hero: Hero;
}

export const HeroPanel = (props: Props) => {
	return (
		<div className='hero-panel'>
			<div>{props.hero.name || 'Unnamed Hero'}</div>
			{props.hero.ancestry ? <AncestryPanel ancestry={props.hero.ancestry} /> : <div>No ancestry chosen</div>}
			{props.hero.culture ? <CulturePanel culture={props.hero.culture} /> : <div>No culture chosen</div>}
			{props.hero.class ? <ClassPanel heroClass={props.hero.class} /> : <div>No class chosen</div>}
			{props.hero.career ? <CareerPanel career={props.hero.career} /> : <div>No career chosen</div>}
			{props.hero.complication ? <ComplicationPanel complication={props.hero.complication} /> : null}
			<div>CHARACTERISTICS</div>
			<div>STAMINA / RECOVERY VALUE / RECOVERIES</div>
			<div>REACH / SPEED / STABILITY</div>
			{
				props.hero.kits.map(kit => (
					<KitPanel kit={kit} />
				))
			}
			{
				HeroLogic.getAbilities(props.hero).map(ability => (
					<AbilityPanel ability={ability} />
				))
			}
		</div>
	);
}
