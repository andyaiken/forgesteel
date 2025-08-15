export class ConditionData {
	static bleeding = `
While a creature is bleeding, whenever they use a main action, use a triggered action, or make a test or ability roll using Might or Agility, they lose Stamina equal to 1d6 + their level after the main action, triggered action, or power roll is resolved. This Stamina loss can’t be prevented in any way.

You take damage from this condition when you use a main action off your turn. For example, a signature ability used as a free triggered action with the assistance of the tactician’s Strike Now ability triggers the damage from the bleeding condition.`;

	static dazed = `
A creature who is dazed can do only one thing on their turn: use a main action, use a maneuver, or use a move action. A dazed creature also can’t use triggered actions, free triggered actions, or free maneuvers.`;

	static frightened = `
When a creature is frightened, any ability roll they make against the source of their fear takes a bane. If that source is a creature, their ability rolls made against the frightened creature gain an edge. A frightened creature can’t willingly move closer to the source of their fear if they know the location of that source. If a creature gains the frightened condition from one source while already frightened by a different source, the new condition replaces the old one.`;

	static grabbed = `
A creature who is grabbed has speed 0, can’t be force moved except by a creature, object, or effect that has them grabbed, can’t use the Knockback maneuver, and takes a bane on abilities that don’t target the creature, object, or effect that has them grabbed. If a creature is grabbed by another creature and that creature moves, they bring the grabbed creature with them. If a creature’s size is equal to or less than the size of a creature they have grabbed, their speed is halved while they have that creature grabbed.

A creature who has another creature grabbed can use a maneuver to move the grabbed creature into an unoccupied space adjacent to them.

A creature can release a creature they have grabbed at any time to end that condition (no action required). A grabbed creature can attempt to escape being grabbed using the Escape Grab maneuver. If a grabbed creature teleports, or if either the grabbed creature or the creature grabbing them is force moved so that both creatures are not adjacent to each other, that creature is no longer grabbed.

A creature can grab only creatures of their size or smaller. If a creature’s Might score is 2 or higher, they can grab any creature larger than them with a size equal to or less than their Might score.

Unless otherwise indicated, a creature can grab only one creature at a time.`;

	static prone = `
While a creature is prone, they are flat on the ground, any strike they make takes a bane, and melee abilities used against them gain an edge. A prone creature must crawl to move along the ground, which costs 1 additional square of movement for every square crawled. A creature can’t climb, jump, swim, or fly while prone. If they are climbing, flying, or jumping when knocked prone, they fall.

Unless the ability or effect that imposed the prone condition says otherwise, a prone creature can stand up using the Stand Up maneuver. A creature adjacent to a willing prone creature can likewise use the Stand Up maneuver to make that creature stand up.`;

	static restrained = `
A creature who is restrained has speed 0, can’t use the Stand Up maneuver, and can’t be force moved. A restrained creature takes a bane on ability rolls and on Might and Agility tests, and abilities used against them gain an edge.

If a creature teleports while restrained, that condition ends.`;

	static slowed = `
A creature who is slowed has speed 2 unless their speed is already lower, and they can’t shift.`;

	static taunted = `
A creature who is taunted has a double bane on ability rolls for any ability that doesn’t target the creature who taunted them, as long as they have line of effect to that creature. If a creature gains the taunted condition from one source while already taunted by a different source, the new condition replaces the old one.`;

	static weakened = `
A creature who is weakened takes a bane on power rolls.`;
}
