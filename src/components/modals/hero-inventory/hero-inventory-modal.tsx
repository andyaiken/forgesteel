import { Hero } from '@/models/hero';
import { InventoryPanel } from '@/components/modals/hero-inventory/inventory-panel/inventory-panel';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './hero-inventory-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	onClose: () => void;
	onChange: (hero: Hero) => void;
}

export const HeroInventoryModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));

	const onChange = (hero: Hero) => {
		setHero(hero);
		props.onChange(hero);
	};

	return (
		<Modal
			content={
				<div className='hero-inventory-modal'>
					<InventoryPanel
						hero={hero}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={onChange}
					/>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
