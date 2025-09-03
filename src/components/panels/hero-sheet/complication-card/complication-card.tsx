import { ComplicationSheet } from '../../../../models/character-sheet';
import { FeatureComponent } from '../components/feature-component';
import { Hero } from '../../../../models/hero';

import '../career-card/career-card.scss';

interface Props {
	complication?: ComplicationSheet;
	hero: Hero;
}

export const ComplicationCard = (props: Props) => {
	const complication = props.complication;

	// Only display the description if either the benefir or drawback section will be empty
	const getDescriptionSection = () => {
		if (complication && !(complication.benefits.length && complication.drawbacks.length)) {
			return (
				<section className='bordered'>
					<h3>Description</h3>
					<p>{complication.description}</p>
				</section>
			);
		}
	};

	const getBenefitSection = () => {
		let header = 'Benefit';
		if (complication && !complication.drawbacks.length) {
			header = 'Benefit and Drawback';
		}
		if (!complication || complication.benefits.length) {
			return (
				<section className='bordered benefit'>
					<h3>{header}</h3>
					{complication?.benefits.map(f =>
						<FeatureComponent
							feature={f}
							hero={props.hero}
							key={f.id}
						/>
					)}
				</section>
			);
		}
	};

	const getDrawbackSection = () => {
		if (!complication || complication.drawbacks.length) {
			let header = 'Drawback';
			if (complication && !complication.benefits.length) {
				header = 'Benefit and Drawback';
			}
			return (
				<section className='bordered drawback'>
					<h3>{header}</h3>
					{complication?.drawbacks.map(f =>
						<FeatureComponent
							feature={f}
							hero={props.hero}
							key={f.id}
						/>
					)}
				</section>
			);
		}
	};

	return (
		<div className='complication card'>
			<h2>Complication</h2>
			<div className='name'>{complication?.name}</div>
			{getDescriptionSection()}
			{getBenefitSection()}
			{getDrawbackSection()}
		</div>
	);
};
