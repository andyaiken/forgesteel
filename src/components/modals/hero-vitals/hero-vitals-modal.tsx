import { ExtractedCondition } from '@/logic/condition-extraction-logic';
import { Hero } from '@/models/hero';
import { HeroHealthPanel } from '@/components/panels/health/health-panel';
import { Modal } from '@/components/modals/modal/modal';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './hero-vitals-modal.scss';

interface Props {
	hero: Hero;
	showEncounterControls: boolean;
	encounterConditions?: ExtractedCondition[];
	onClose: () => void;
	onChange: (hero: Hero) => void;
}

export const HeroVitalsModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));

	const onChange = (hero: Hero) => {
		setHero(hero);
		props.onChange(hero);
	};

	return (
		<Modal
			content={
				<div className='hero-vitals-modal'>
					<HeroHealthPanel
						hero={hero}
						showEncounterControls={props.showEncounterControls}
						encounterConditions={props.encounterConditions}
						onChange={onChange}
					/>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
