import { Characteristic } from '@/enums/characteristic';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { FormatLogic } from '@/logic/format-logic';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';

import './stats-sidebar-panel.scss';

interface Props {
	hero: Hero;
	showStats: boolean;
}

export const StatsSidebarPanel = (props: Props) => {
	const saveBonus = HeroLogic.getSaveBonus(props.hero);

	return (
		<ErrorBoundary>
			<div className='stats-sidebar-panel'>
				<div className={props.showStats ? 'stats-info ghost' : 'stats-info'}>
					{props.hero.name || 'Unnamed Hero'} - {HeroLogic.getHeroDescription(props.hero)}
				</div>
				<div className={props.showStats ? 'stats-section' : 'stats-section ghost'}>
					<Field orientation='vertical' label='M' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Might)} />
					<Field orientation='vertical' label='A' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Agility)} />
					<Field orientation='vertical' label='R' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Reason)} />
					<Field orientation='vertical' label='I' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Intuition)} />
					<Field orientation='vertical' label='P' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Presence)} />
				</div>
				<div className={props.showStats ? 'stats-section' : 'stats-section ghost'}>
					<Field orientation='vertical' label='Size' value={FormatLogic.getSize(HeroLogic.getSize(props.hero))} />
					<Field orientation='vertical' label='Spd' value={FormatLogic.getSpeed(HeroLogic.getSpeed(props.hero))} />
					<Field orientation='vertical' label='Stab' value={HeroLogic.getStability(props.hero)} />
					<Field orientation='vertical' label='Dis' value={HeroLogic.getDisengage(props.hero)} />
					{
						saveBonus !== 0 ?
							<Field orientation='vertical' label='Save' value={`${HeroLogic.getSaveThreshold(props.hero)} ${saveBonus > 0 ? '+' : ''}${saveBonus}`} />
							:
							<Field orientation='vertical' label='Save' value={HeroLogic.getSaveThreshold(props.hero)} />
					}
				</div>
			</div>
		</ErrorBoundary>
	);
};
