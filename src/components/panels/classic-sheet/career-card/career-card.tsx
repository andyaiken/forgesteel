import { CareerSheet } from '@/models/classic-sheets/hero-sheet';
import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';
import { Hero } from '@/models/hero';
import './career-card.scss';

interface Props {
	career?: CareerSheet;
	hero: Hero;
}

export const CareerCard = (props: Props) => {
	const career = props.career;
	return (
		<div className='career card'>
			<h2>Career</h2>
			<div className='name'>{career?.name}</div>
			<section className='bordered benefit'>
				<h3>Benefit</h3>
				{career?.benefits?.map(f =>
					<FeatureComponent
						feature={f}
						hero={props.hero}
						key={f.id}
					/>
				)}
			</section>

			<section className='bordered inciting-incident'>
				<h3>Inciting Incident</h3>
				<h4>{career?.incitingIncident?.name}</h4>
				<p>{career?.incitingIncident?.description}</p>
			</section>
		</div>
	);
};
