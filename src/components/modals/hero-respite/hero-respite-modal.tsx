import { Button, Divider, Space } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureConfigPanel } from '@/components/panels/feature-config-panel/feature-config-panel';
import { FeatureData } from '@/models/feature';
import { FeatureType } from '@/enums/feature-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Modal } from '@/components/modals/modal/modal';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './hero-respite-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	onTakeRespite: (hero: Hero) => void;
	onChange: (hero: Hero) => void;
	onClose: () => void;
}

export const HeroRespiteModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));

	const setData = (featureID: string, data: FeatureData) => {
		const copy = Utils.copy(hero);
		const feature = HeroLogic.getFeatures(copy).find(f => f.feature.id === featureID);
		if (feature) {
			feature.feature.data = data;
		}
		setHero(copy);
		props.onChange(copy);
	};

	const list = HeroLogic.getFeatures(hero)
		.map(f => f.feature)
		.filter(f => {
			switch (f.type) {
				case FeatureType.Choice:
				case FeatureType.LanguageChoice:
				case FeatureType.SkillChoice:
					return f.data.selectAt === 'respite';
				case FeatureType.Kit:
					return true;
				default:
					return false;
			}
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
							list.length > 0 ?
								<Divider />
								: null
						}
						{
							list.length > 0 ?
								<Space orientation='vertical' style={{ width: '100%' }}>
									{
										list.map(f => (
											<Expander key={f.id} title={f.name}>
												<FeatureConfigPanel
													feature={f}
													hero={hero}
													sourcebooks={props.sourcebooks}
													setData={setData}
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
							onClick={() => props.onTakeRespite(hero)}
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
