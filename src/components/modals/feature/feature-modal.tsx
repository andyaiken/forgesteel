import { Input, Segmented } from 'antd';
import { Expander } from '../../controls/expander/expander';
import { Feature } from '../../../models/feature';
import { FeaturePanel } from '../../panels/elements/feature-panel/feature-panel';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { Modal } from '../modal/modal';
import { MultiLine } from '../../controls/multi-line/multi-line';
import { Options } from '../../../models/options';
import { PanelMode } from '../../../enums/panel-mode';
import { Sourcebook } from '../../../models/sourcebook';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './feature-modal.scss';

interface Props {
	feature: Feature;
	hero: Hero;
	options: Options;
	sourcebooks: Sourcebook[];
	onClose: () => void;
	updateHero?: (hero: Hero) => void;
}

export const FeatureModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));
	const [ page, setPage ] = useState<string>('Feature');

	const customization = hero ? hero.abilityCustomizations.find(ac => ac.abilityID === props.feature.id) : undefined;

	try {
		const setName = (value: string) => {
			const copy = Utils.copy(hero) as Hero;

			let ac = copy.abilityCustomizations.find(ac => ac.abilityID === props.feature.id);
			if (!ac) {
				ac = {
					abilityID: props.feature.id,
					name: value,
					description: '',
					notes: ''
				};
				copy.abilityCustomizations.push(ac);
			} else {
				ac.name = value;
			}

			setHero(copy);
			if (props.updateHero) {
				props.updateHero(copy);
			}
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(hero) as Hero;

			let ac = copy.abilityCustomizations.find(ac => ac.abilityID === props.feature.id);
			if (!ac) {
				ac = {
					abilityID: props.feature.id,
					name: '',
					description: value,
					notes: ''
				};
				copy.abilityCustomizations.push(ac);
			} else {
				ac.description = value;
			}

			setHero(copy);
			if (props.updateHero) {
				props.updateHero(copy);
			}
		};

		const setNotes = (value: string) => {
			const copy = Utils.copy(hero) as Hero;

			let ac = copy.abilityCustomizations.find(ac => ac.abilityID === props.feature.id);
			if (!ac) {
				ac = {
					abilityID: props.feature.id,
					name: '',
					description: '',
					notes: value
				};
				copy.abilityCustomizations.push(ac);
			} else {
				ac.notes = value;
			}

			setHero(copy);
			if (props.updateHero) {
				props.updateHero(copy);
			}
		};

		const getContent = () => {
			switch (page) {
				case 'Feature': {
					return (
						<div className='feature-section'>
							<FeaturePanel
								feature={props.feature}
								options={props.options}
								hero={props.hero}
								sourcebooks={props.sourcebooks}
								mode={PanelMode.Full}
							/>
						</div>
					);
				}
				case 'Customize':
					return (
						<div className='customize-section'>
							<Expander title='Name and Description'>
								<HeaderText>Name</HeaderText>
								<Input
									placeholder={props.feature.name}
									allowClear={true}
									value={customization?.name || ''}
									onChange={e => setName(e.target.value)}
								/>
								<HeaderText>Description</HeaderText>
								<MultiLine value={customization?.description || ''} onChange={setDescription} />
							</Expander>
							<Expander title='Notes'>
								<HeaderText>Notes</HeaderText>
								<MultiLine value={customization?.notes || ''} onChange={setNotes} />
							</Expander>
						</div>
					);
			}
		};

		return (
			<Modal
				toolbar={
					props.updateHero ?
						<div style={{ width: '100%', textAlign: 'center' }}>
							<Segmented
								name='tabs'
								options={[ 'Feature', 'Customize' ]}
								value={page}
								onChange={setPage}
							/>
						</div>
						: null
				}
				content={
					<div className='feature-modal'>
						{getContent()}
					</div>
				}
				onClose={props.onClose}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
