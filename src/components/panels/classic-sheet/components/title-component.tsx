import { ClassicSheetLogic } from '@/logic/classic-sheet/classic-sheet-logic';
import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';
import { FeatureLogic } from '@/logic/feature-logic';
import { Hero } from '@/models/hero';
import { Title } from '@/models/title';

import './title-component.scss';

interface Props {
	title: Title;
	hero: Hero;
}

export const TitleComponent = (props: Props) => {
	const title = props.title;
	const features = FeatureLogic
		.getFeaturesFromTitle(title, props.hero.class?.level || 1, props.hero.state.tutorialMode)
		.map(f => f.feature)
		.filter(ClassicSheetLogic.hasContent);
	return (
		<div className='title'>
			<h3>{title.name}</h3>
			{features.map(f =>
				<FeatureComponent
					key={f.id}
					feature={f}
					hero={props.hero}
				/>
			)}
		</div>
	);
};
