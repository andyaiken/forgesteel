import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import { LabeledBooleanField } from '@/components/panels/classic-sheet/components/labeled-field';
import './skills-card.scss';

interface Props {
	character: HeroSheet;
}

export const SkillsCard = (props: Props) => {
	const character = props.character;
	const allSkills = character.allSkills?.entries() || new Map<string, string[]>();
	return (
		<div className='skills card'>
			<h2>Skills</h2>
			<div className='reference'>Have 1+ skills that apply to a test? +2 bonus</div>
			<div className='skills-lists'>
				{Array.from(allSkills).map(([ list, skills ]) =>
					<div className='skill-list' key={`skill-list-${list}`}>
						<h3>{list}</h3>
						<ul>
							{skills.map(s => {
								const key = s.replaceAll(' ', '-');
								return (
									<li key={`skill-list-${list}-item-${key}`}>
										<LabeledBooleanField
											value={character.skills?.includes(s)}
											label={s}
										/>
									</li>
								);
							})}
							{
								skills.length % 2 !== 0 ?
									<li>
										<div className='spacer'>&nbsp;</div>
									</li>
									: null
							}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};
