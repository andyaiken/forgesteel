import { Button, Divider, Space } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureConfigPanel } from '@/components/panels/feature-config-panel/feature-config-panel';
import { FeatureType } from '@/enums/feature-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './hero-respite-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	onTakeRespite: () => void;
	onChange: (hero: Hero) => void;
	onClose: () => void;
}

export const HeroRespiteModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));

	const respiteFeatures = HeroLogic.getFeatures(hero)
		.map(f => f.feature)
		.filter(f => {
			switch (f.type) {
				case FeatureType.Choice:
					return f.data.respiteChange;
				case FeatureType.Kit:
					return true;
			}

			return false;
		});

	return (
		<ErrorBoundary>
			<Modal
				content={
					<div className='hero-respite-modal'>
						<HeaderText>Respite</HeaderText>
						<div className='ds-text'>
							Taking a respite has the following effects:
						</div>
						<ul>
							<li>
								Your Stamina and Recoveries are reset (and any temporary Stamina goes away)
							</li>
							<li>
								Your Victories are turned into XP
							</li>
							<li>
								Any conditions affecting you are removed
							</li>
						</ul>
						<div className='ds-text'>
							During a respite you can take one respite action. Standard respite actions are:
						</div>
						<ul>
							<li>
								Make a project roll
							</li>
							<li>
								Change your kit / prayer / enchantment / augmentation / ward
							</li>
							<li>
								Attract followers (for every 3 renown, you can have 1 follower)
							</li>
						</ul>
						{
							respiteFeatures.length > 0 ?
								<Divider />
								: null
						}
						{
							respiteFeatures.length > 0 ?
								<Space orientation='vertical' style={{ width: '100%' }}>
									{
										respiteFeatures.map(f => (
											<Expander key={f.id} title={f.name}>
												<FeatureConfigPanel
													feature={f}
													hero={hero}
													sourcebooks={props.sourcebooks}
													options={props.options}
													setData={(featureID, data) => {
														const copy = Utils.copy(hero);
														const feature = HeroLogic.getFeatures(copy)
															.map(f => f.feature)
															.find(f => f.id === featureID);
														if (feature) {
															feature.data = data;
														}
														setHero(copy);
														props.onChange(copy);
													}}
												/>
											</Expander>
										))
									}
								</Space>
								: null
						}
						<Divider />
						<Button
							key='take-respite'
							block={true}
							className='tall-button'
							onClick={props.onTakeRespite}
						>
							<div>
								<div>Take a Respite</div>
								<div className='subtext'>
									24 hours of rest
								</div>
							</div>
						</Button>
					</div>
				}
				onClose={props.onClose}
			/>
		</ErrorBoundary>
	);
};
