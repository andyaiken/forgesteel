import { CharacterSheet } from '../../../../models/character-sheet';
import { LabeledBooleanField } from '../components/labeled-field';
import './skills-card.scss';

interface Props {
	character: CharacterSheet;
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
					<div className='skill-list' key={list}>
						<h3>{list}</h3>
						<ul>
							{skills.map(s =>
								<li key={s}>
									<LabeledBooleanField
										value={character.skills?.includes(s)}
										label={s}
									/>
								</li>
							)}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};
