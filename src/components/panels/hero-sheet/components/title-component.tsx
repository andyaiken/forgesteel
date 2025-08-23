import { FeatureComponent } from './feature-component';
import { Hero } from '../../../../models/hero';
import { Title } from '../../../../models/title';

import './title-component.scss';

interface Props {
	title: Title;
	hero: Hero;
}

export const TitleComponent = (props: Props) => {
	const title = props.title;
	const titleFeature = title.features.find(f => f.id === title.selectedFeatureID);
	return (
		<div className='title'>
			<h3>{title.name}</h3>
			<p className='title-description'>{title.description}</p>
			{titleFeature ?
				<FeatureComponent
					feature={titleFeature}
					hero={props.hero}
				/>
				: ''}
		</div>
	);
};
