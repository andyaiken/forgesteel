import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import { Title } from '@/models/title';
import { TitleComponent } from '@/components/panels/classic-sheet/components/title-component';
import './titles-card.scss';

interface Props {
	character: HeroSheet;
	showLong: number | 'all';
	wide?: boolean;
}

export const TitlesCard = (props: Props) => {
	const character = props.character;
	const wide = props.wide || false;

	const getTitleFragment = (title: Title, size: 'short' | 'long') => {
		const titleFeature = title.features.find(f => f.id === title.selectedFeatureID);
		if (size === 'short') {
			return (
				<div key={title.id}>
					<h4>{title.name}{(titleFeature && titleFeature.name !== title.name) ? `: ${titleFeature.name}` : null}</h4>
				</div>
			);
		} else {
			return (
				<div key={title.id}>
					<TitleComponent
						title={title}
						hero={character.hero}
					/>
				</div>
			);
		}
	};

	const numTitles = character.titles?.length || 0;
	const fragmentSize = (props.showLong === 'all' || numTitles <= props.showLong) ? 'long' : 'short';

	return (
		<div className='titles card'>
			<h2>Titles</h2>
			<div className={`titles-container ${wide ? 'three-column' : 'two-column'}`}>
				{character.titles?.map(t => getTitleFragment(t, fragmentSize))}
			</div>
		</div>
	);
};
