import { Characteristic } from '../enums/characteristic';
import { FollowerType } from '../enums/follower-type';
import { SkillList } from '../enums/skill-list';
import { Sourcebook } from '../models/sourcebook';
import { SourcebookLogic } from './sourcebook-logic';

export class FollowerLogic {
	static getCharacteristicArrays = (type: FollowerType) => {
		switch (type) {
			case FollowerType.Artisan:
				return [
					[
						{ characteristic: Characteristic.Might, value: 1 },
						{ characteristic: Characteristic.Agility, value: 0 },
						{ characteristic: Characteristic.Reason, value: 1 },
						{ characteristic: Characteristic.Intuition, value: 0 },
						{ characteristic: Characteristic.Presence, value: 0 }
					],
					[
						{ characteristic: Characteristic.Might, value: 0 },
						{ characteristic: Characteristic.Agility, value: 1 },
						{ characteristic: Characteristic.Reason, value: 1 },
						{ characteristic: Characteristic.Intuition, value: 0 },
						{ characteristic: Characteristic.Presence, value: 0 }
					]
				];
			case FollowerType.Sage:
				return [
					[
						{ characteristic: Characteristic.Might, value: 0 },
						{ characteristic: Characteristic.Agility, value: 0 },
						{ characteristic: Characteristic.Reason, value: 1 },
						{ characteristic: Characteristic.Intuition, value: 1 },
						{ characteristic: Characteristic.Presence, value: 0 }
					]
				];
		}
	};

	static getSkillOptions = (type: FollowerType, sourcebooks: Sourcebook[]) => {
		const lists: SkillList[] = [];
		switch (type) {
			case FollowerType.Artisan:
				lists.push(SkillList.Crafting);
				break;
			case FollowerType.Sage:
				lists.push(SkillList.Lore);
				break;
		}

		return SourcebookLogic.getSkills(sourcebooks).filter(s => lists.includes(s.list));
	};

	static getLanguageOptions = (sourcebooks: Sourcebook[]) => {
		return SourcebookLogic.getLanguages(sourcebooks).filter(l => l.name !== 'Caelian');
	};
}
