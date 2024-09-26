import { ConditionType } from '../enums/condition-type';

export class ConditionLogic {
	static getDescription = (condition: ConditionType) => {
		switch (condition) {
			case ConditionType.Bleeding:
				return 'While you are bleeding, you can’t regain Stamina.';
			case ConditionType.Dazed:
				return 'While you are dazed, you can do only one thing on your turn: use a maneuver, use an action, or take a move action. You also can’t use triggered actions, free triggered actions, or free maneuvers.';
			case ConditionType.Frightened:
				return 'If you are frightened, attacks you make against the source of your fear take a bane. If that source is a creature, their attacks against you gain an edge. You can’t willingly move closer to the source of your fear if you know the location of that source. If you gain the frightened condition from one source while already frightened by a different source, the new condition replaces the old one.';
			case ConditionType.Grabbed:
				return `
While you are grabbed, your speed is 0, you can’t be force moved, you can’t use the Knockback maneuver, and you take a bane on attacks that don’t target the creature grabbing you. If the creature grabbing you moves, they bring you with them. If the creature’s size is equal to or less than yours, their speed is halved while they have you grabbed.
The creature grabbing you can use a maneuver to move you into an unoccupied space adjacent to them.
The creature grabbing you can end the grab at any time (no action required). You can also attempt to escape being grabbed. If you teleport or if the creature grabbing you is force moved to a space that isn’t adjacent to you, you are no longer grabbed.`;
			case ConditionType.Prone:
				return `
While you are prone, you are flat on the ground, attacks you make take a bane, and melee attacks made against you gain an edge. You must crawl to move along the ground, which costs you 1 additional square of movement for every square you crawl. You can’t climb, jump, swim, or fly while prone. If you are climbing, flying, or jumping while you are knocked prone, you fall.
While prone, you can stand up as a maneuver, unless the ability or effect that imposed the condition says otherwise. You can use a maneuver to make an adjacent prone creature stand up.`;
			case ConditionType.Restrained:
				return `
While you are restrained, your speed is 0 and you can’t be force moved. Your attacks take a bane, attacks and damaging area powers against you gain an edge, and you have a bane on Might and Agility resistance rolls.
If you teleport while restrained, the condition ends.`;
			case ConditionType.Slowed:
				return 'While you are slowed, your speed is 2 unless it is already lower.';
			case ConditionType.Taunted:
				return 'If you are taunted, you have a double bane on attacks that don’t include the creature who taunted you. If you gain the taunted condition from one creature while already taunted by a different creature, the new condition replaces the old one.';
			case ConditionType.Weakened:
				return 'While you are weakened, all your ability power rolls and tests (but not resistance rolls) take a bane.';
		}
	};
}
