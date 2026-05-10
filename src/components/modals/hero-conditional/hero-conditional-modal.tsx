import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureConfigPanel } from '@/components/panels/feature-config-panel/feature-config-panel';
import { FeatureData } from '@/models/feature';
import { FeatureType } from '@/enums/feature-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Space } from 'antd';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './hero-conditional-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (hero: Hero) => void;
	onClose: () => void;
}

export const HeroConditionalModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));

	const features = HeroLogic.getFeatures(hero);
	const list = [
		...features.filter(f => f.feature.type === FeatureType.Toggle),
		...features.filter(f => (f.feature.type === FeatureType.Choice) && (f.feature.data.selectAt === 'play'))
	];

	const setData = (featureID: string, data: FeatureData) => {
		const copy = Utils.copy(hero);
		const feature = HeroLogic.getFeatures(copy).find(f => f.feature.id === featureID);
		if (feature) {
			feature.feature.data = data;
		}
		setHero(copy);
		props.onChange(copy);
	};

	return (
		<ErrorBoundary>
			<Modal
				content={
					<div className='hero-conditional-modal'>
						<HeaderText>Conditional Features</HeaderText>
						<Space orientation='vertical' style={{ width: '100%' }}>
							{
								list.map(f => (
									<SelectablePanel key={f.feature.id}>
										<FeatureConfigPanel
											feature={f.feature}
											hero={hero}
											sourcebooks={props.sourcebooks}
											options={props.options}
											setData={setData}
										/>
									</SelectablePanel>
								))
							}
							{
								list.length === 0 ?
									<Empty text='You have no conditional features.' />
									: null
							}
						</Space>
					</div>
				}
				onClose={props.onClose}
			/>
		</ErrorBoundary>
	);
};
