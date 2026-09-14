import { Flex } from 'antd';
import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import { LabeledBooleanField } from '@/components/panels/classic-sheet/components/labeled-field';
import { RollModifierMarker } from '@/components/controls/roll-modifier-marker/roll-modifier-marker';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';

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
						<div className='skill-group'>
							{
								skills.map(s => {
									const key = s.replaceAll(' ', '-');
									const cancelled = character.cancelledSkills?.includes(s);
									const rollModifiers = character.skillRollModifiers?.get(s) || [];
									return (
										<Flex key={`skill-list-${list}-item-${key}`}>
											<LabeledBooleanField
												value={character.skills?.includes(s)}
												label={SheetFormatter.getSkillAbbreviation(s)}
												additionalClasses={cancelled ? [ 'cancelled' ] : undefined}
											/>
											{rollModifiers.length > 0 ? <RollModifierMarker modifier={rollModifiers[0]} multiple={rollModifiers.length > 1} /> : null}
										</Flex>
									);
								})
							}
							{
								skills.length % 2 !== 0 ?
									<div className='spacer'>&nbsp;</div>
									: null
							}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
