import { ConditionEndType, ConditionType } from '@/enums/condition-type';
import { Condition } from '@/models/condition';
import { ConditionData } from '@/data/condition-data';
import type { ExtractedCondition } from '@/logic/condition-extraction-logic';
import { Utils } from '@/utils/utils';

export class ConditionLogic {
	static getDescription = (condition: ConditionType) => {
		switch (condition) {
			case ConditionType.Custom:
				return 'A custom condition.';
			case ConditionType.Quick:
				return 'A quick condition.';
			case ConditionType.Bleeding:
				return ConditionData.bleeding;
			case ConditionType.Dazed:
				return ConditionData.dazed;
			case ConditionType.Frightened:
				return ConditionData.frightened;
			case ConditionType.Grabbed:
				return ConditionData.grabbed;
			case ConditionType.Prone:
				return ConditionData.prone;
			case ConditionType.Restrained:
				return ConditionData.restrained;
			case ConditionType.Slowed:
				return ConditionData.slowed;
			case ConditionType.Taunted:
				return ConditionData.taunted;
			case ConditionType.Weakened:
				return ConditionData.weakened;
		}
	};

	static getName = (condition: Condition) => {
		switch (condition.type) {
			case ConditionType.Custom:
				return ConditionLogic.splitCustomText(condition.text).name || 'Custom Condition';
			case ConditionType.Quick:
				return condition.text;
			default:
				return condition.type.toString();
		}
	};

	// The rules to show alongside the condition's name
	static getText = (condition: Condition) => {
		switch (condition.type) {
			case ConditionType.Custom:
				return ConditionLogic.splitCustomText(condition.text).text;
			case ConditionType.Quick:
				return '';
			default:
				return ConditionLogic.getDescription(condition.type);
		}
	};

	static getFullDescription = (condition: Condition) => {
		const name = ConditionLogic.getName(condition);

		switch (condition.ends) {
			case ConditionEndType.EndOfTurn:
				return `${name} (EoT)`;
			case ConditionEndType.SaveEnds:
				return `${name} (${condition.ends})`;
			case ConditionEndType.UntilRemoved:
				return name;
		}
	};

	static createFromExtracted = (extracted: ExtractedCondition): Condition => {
		// The name and source go in a header that getName() can read back
		const source = extracted.abilities.length === 1 ? `${extracted.owner} · ${extracted.abilities[0]}` : extracted.owner;

		return {
			id: Utils.guid(),
			type: ConditionType.Custom,
			text: `**${extracted.name}** *(${source})*\n\n${extracted.rules}`,
			ends: extracted.ends
		};
	};

	// The name and source of a condition created by createFromExtracted, or null for any other condition
	static getSource = (condition: Condition) => {
		if (condition.type !== ConditionType.Custom) {
			return null;
		}

		const header = condition.text.trim().split('\n')[0].match(/^\*\*([^*\n]+)\*\* \*\((.+)\)\*$/);
		if (!header) {
			return null;
		}

		const [ owner, ability ] = header[2].split(' · ');
		return {
			name: header[1].trim(),
			owner: owner,
			ability: ability || null
		};
	};

	// A custom condition's name is its leading bold text, or the whole text if that's a single short line
	private static splitCustomText = (text: string) => {
		const trimmed = text.trim();

		const header = trimmed.match(/^\*\*([^*\n]+)\*\*/);
		if (header) {
			return { name: header[1].trim(), text: trimmed.substring(header[0].length).trim() };
		}

		if (trimmed && !trimmed.includes('\n') && (trimmed.length <= 40)) {
			return { name: trimmed, text: '' };
		}

		return { name: '', text: trimmed };
	};
}
