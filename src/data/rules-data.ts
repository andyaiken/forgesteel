import { RulesItem } from '../models/rules-item';

export class RulesData {
	static abilityDistance: RulesItem = {
		label: 'Ability Distance',
		content: `
An ability’s “Distance” entry indicates how close you need to be to a creature or object to affect that target with the ability.

**Melee**: Melee abilities have a distance of “Melee X” and require you to make contact with a creature or object with your body, a weapon, or an implement. The number X is the maximum distance in squares at which you can physically make contact with another creature or object targeted by the ability. For instance, a distance of “Melee 2” can be used to target creatures or objects within 2 squares of you, while “Melee 1” limits you to adjacent targets (those within 1 square).

**Ranged**: Ranged abilities have a distance of “Ranged X” and can be used to target creatures or objects too far away for you to make contact with. The number X is the maximum distance in squares at which a creature or object can be targeted by the ability. For instance, a distance of “Ranged 5” can be used to target creatures or objects within 5 squares of you. 

If you make a ranged strike while any enemy is adjacent to you (within 1 square), you have a bane on the strike’s power roll.

**Melee or Ranged**: Some abilities have a melee distance and a ranged distance. When you use such an ability, you choose whether to use it as a melee or a ranged ability.

An ability never has both the Melee and Ranged keywords at the same time. For example, if you have the Cloak and Dagger kit, which has a weapon damage bonus to melee abilities and a weapon damage bonus to ranged abilities, only one bonus at a time applies to an ability with both the Melee and Ranged keywords.

**Self**: If an ability has a distance of “Self,” that ability originates from you, and often affects only you. The ability’s description specifies how it works.

**Area Abilities**: Area abilities cover a number of squares on the battlefield at once, creating an effect within that area that lets you target multiple creatures or objects. When an ability creates an area of effect, it sometimes notes a distance for the effect in the form “within X.” The number X tells you how many squares away from you the area can be. If an area ability doesn’t have this distance, it originates from you and you are at the center of the area.

If an area ability originates a distance away from you, then one square of the area of effect must be within that distance, and must also be within your line of effect (see below). This square is referred to as the origin square of the area of effect. The area of effect can spread from the origin square however you choose, according to the rules for the shape and arrangement of that particular area.

You can place an area of effect to include one or more squares where you don’t have line of effect, as long as you have line of effect to the origin square. Unless otherwise noted, area abilities don’t pass through solid barriers such as walls or ceilings, and they don’t spread around corners.

An area ability might use any of the following areas of effect.

* **Aura**: When an ability creates an aura, that area is expressed as “X aura.” The number X is the radius of the aura, which always originates from you and moves with you for the duration of the ability that created it. A creature or object must be within X squares of you to be targeted by an aura ability.
* **Burst**: When an ability creates a burst area, that area is expressed as “X burst.” The number X is the radius of the burst, which always originates from you and lasts only for as long as it takes to affect its targets. A creature or object must be within X squares of you to be targeted by a burst ability.
* **Cube**: When an ability affects a cubic area, that area is expressed as “X cube.” The number X is the length of each of the area’s sides. A creature or object must be within the area to be targeted by a cube ability.
* **Line**: When an ability affects a linear area, that area is expressed as “A × B line.” The number A denotes the line’s length in squares, while the number B equals the line’s width and height in squares. When you create a line area of effect, the squares in that area must be in a straight line. A creature or object must be within the area to be targeted by a line ability.
* **Wall**: When an ability creates a wall, that area is expressed as “X wall.” The number X is how many squares are used to make the wall. When you place a wall, you can build it one square at a time, but each square must share at least one side (not just a corner) with another square of the wall. A creature or object must be within the area to be targeted by a wall ability. You can stack squares on top of each other to make the wall higher. Unless otherwise stated, a wall can’t be placed in occupied squares, and a wall blocks line of effect.
* **Special**: Some abilities create a unique area of effect. The distance entry of such abilities specifies how the area is created.`
	};

	static abilityTarget: RulesItem = {
		label: 'Ability Target',
		content: `
The “Target” entry of an ability notes the number of creatures, objects, or both who can be targeted by that ability. You can always affect fewer targets than the number indicated by this entry.

**Creature**: If an ability targets one or more creatures, it can affect creatures within the ability’s distance or area. You aren’t an eligible creature target for your own abilities unless those abilities also have “self” as a target (see below), or unless the ability indicates otherwise.

**Object**: If an ability targets one or more objects, it can affect any object within the ability’s distance or area. Unless otherwise noted, objects have poison immunity all and psychic immunity all. 

When an ability can target creatures and objects, the ability can damage objects. However, unless otherwise noted (as with the talent’s Minor Telekinesis ability) or if the Director allows it, objects are immune to an ability’s other effects. If an ability forces an object to make a test, the object automatically gets a tier 1 result on the test.

**Enemy**: If an ability targets one or more enemies, it can affect only creatures who are hostile to the creature using the ability. Typically, you decide who counts as an enemy for the purpose of using your hero’s abilities, though the Director has the final say.

**Ally**: If an ability targets one or more allies, it can affect only willing creatures who are friendly to the creature using the ability. Typically, you and any other player whose character you target with an ability decide who counts as an ally, though the Director has the final say.

You aren’t an eligible target for your own abilities that target allies unless those abilities also have “self” as a target, or unless the ability indicates otherwise.

**Self**: If an ability targets “self,” it can affect only the creature using the ability. Your own abilities can affect you only if they target “self.”

**Each [Target]**: If an area ability doesn’t provide a number of targets but instead says it applies to each creature, object, enemy, or ally in the area, then all eligible targets for the ability are affected.`
	};

	static assist: RulesItem = {
		label: 'Assisting a Test',
		content: `
You can attempt to assist another creature with a test they make, provided you have a skill that applies to the test, the other creature isn’t using that same skill on the test, and you can describe how your character helps to the Director’s satisfaction. In other words, your attempt to help has to make sense, and you have to bring some useful expertise to the table. Helping another creature sneak by shouting encouragement at them isn’t going to make them stealthier.

When you attempt to assist another creature, make a test using the skill you choose, and using a characteristic chosen by the Director based on the activity you use to help. The outcome of that test determines the bonus applied to the test you’re assisting:

| Roll  | Effect |
|:------|:---------|
| ≤ 11  | You get in the way or make things worse. The creature takes a bane on their test.|
|12–16 | Your help grants the other creature an edge on their test.|
|17+ | Your help gives the other creature a double edge on their test.|

For example, when an ally tries to pick a jailer’s pocket, you might attempt to assist by using the Flirt skill to distract the jailer. The Director accepts this, and asks you to make a Presence test using Flirt. The outcome of that test determines the bonus you provide to the other hero’s Agility test to pick the jailer’s pocket—or whether you fumble the distraction and potentially draw attention to the attempt.`
	};

	static burrowing: RulesItem = {
		label: 'Burrowing',
		content: `
A creature who has “burrow” in their speed entry, or who gains the temporary ability to burrow, can move through dirt horizontally, and either has the means to breathe while doing so or doesn’t require air to live. Such creatures can’t move through more solid ground, such as stone, unless their stat block or the effect that lets them burrow says otherwise. Similarly, a burrowing creature doesn’t leave a tunnel unless the rules say so.

**Dig Maneuver**: It takes extra effort to dig vertically through the ground as opposed to tunneling horizontally, requiring a creature to use a special maneuver. To use the Dig maneuver, a creature must have “burrow” in their speed entry, they must have a speed that is equal to or greater than their size, and they must be touching terrain that can be burrowed through. 

When a creature uses the Dig maneuver, they can move vertically up to a number of squares equal to their size. If a burrowing creature has a creature who is not unconscious grabbed, they can’t willingly move deeper into the ground. It’s too difficult to dig with a flailing enemy in your claws.

**Targeting Burrowing Creatures**: If you are on the ground, you have line of effect to a burrowing creature if that creature occupies 1 or more squares of terrain that can be burrowed through and that touch the ground, and if you have line of effect to any of those squares. The burrowing creature gains the benefit of cover from you.

If you are completely beneath the ground while burrowing, you don’t have line of effect to any creature on the surface unless a rule states otherwise.

If you are completely beneath the ground while burrowing and are adjacent to another creature who is burrowing, you have line of effect to that creature, though you both have cover from each other.

You can’t gain the benefit of high ground (see below) against creatures who are completely beneath the ground while burrowing.

**Targeting Burrowing Creatures**: If you are on the ground and adjacent to a creature who is beneath the ground while burrowing, you can use a maneuver to pull that creature up 1 square out of the ground, provided the creature is willing.

If a creature who can’t burrow wants to dig into the ground, they can use the following ability provided their speed is 2 or more.

**Claw Dirt**

**Power Roll + Might**:
| Roll  | Effect |
|:------|:---------|
| ≤ 11  | You can move 1 square into, out of, or through ground you are touching that can be burrowed through, and you are slowed and weakened (EoT).|
|12–16 | You can use your main action this turn to move 1 square into, out of, or through ground you are touching that can be burrowed through, and you are slowed (EoT).|
|17+ | You can move 1 square into, out of, or through ground you are touching that can be burrowed through.|

**Burrowing Forced Movement**: While a creature who is completely beneath the ground while burrowing is force moved by movement that isn’t vertical, they aren’t moved, and they take 1 damage for each square they would have been force moved. If the forced movement is vertical, the creature is moved through the dirt as if it were air.`
	};

	static climbingAndSwimming: RulesItem = {
		label: 'Climbing / Swimming',
		content: `
A creature who has “climb” in their speed entry, or who gains the temporary ability to automatically climb, can climb across vertical and horizontal surfaces at full speed. Likewise, a creature who has “swim” in their speed entry, or who gains the temporary ability to automatically swim, can swim in liquid at full speed.

Creatures without those types of movement can still climb or swim when a rule allows them to move, but each square of climbing or swimming costs 2 squares of movement. If a surface is difficult to climb (for instance, a sheer cliff or ice-covered wall) or a liquid is hard to swim through (a raging river or whirlpool), the Director can call for a Might test. On a failure, a creature can’t climb or swim but wastes no movement in the attempt. The Director can also impose other consequences to failure, such as being caught in the spinning current of a whirlpool.

**Climbing other Creatures**: You can attempt to climb a creature whose size is greater than yours. If the creature is willing, you can climb them without any trouble. If the creature is unwilling, you make the following test:

**Power Roll + Might or Agility**:

| Roll  | Effect |
|:------|:---------|
| ≤ 11  | You fail to climb the creature, and they can make a free strike against you.|
| 12–16 | You fail to climb the creature.|
| 17+   | You climb the creature.|

While you climb or ride a creature, you gain an edge to melee abilities used against them. The creature can use a maneuver to attempt to knock you off, forcing you to make the following test:

**Power Roll + Might or Agility**:

| Roll  | Effect |
|:------|:---------|
| ≤ 11  | You fall off the creature into an unoccupied adjacent space of your choice, taking falling damage and landing prone as usual.|
| 12–16 | You slide down the creature into an unoccupied adjacent space of your choice and don’t land prone.|
| 17+ | You continue to hold on to the creature.|

If you are knocked prone while climbing or riding a creature, you fall and land prone in an adjacent space of your choice, taking damage as usual from the fall.`
	};

	static concealment: RulesItem = {
		label: 'Concealment',
		content: `
Darkness, fog, invisibility magic, and any other effect that fully obscures a creature or object but doesn’t protect their physical form grants that creature or object concealment. Even if you have line of effect to such a target, a creature or object has concealment from you if you can’t see or otherwise observe them. You can target a creature or object with concealment using a strike, provided they aren’t hidden. However, strikes against such targets take a bane.`
	};

	static cover: RulesItem = {
		label: 'Cover',
		content: `
When you have line of effect to a creature or object but that target has at least half their form blocked by a solid object such as a tree, wall, or overturned table, the target has cover. You take a bane on damage-dealing abilities used against creatures or objects that have cover from you.`
	};

	static crawling: RulesItem = {
		label: 'Crawling',
		content: `
If you are prone, you can remain prone and crawl on the ground. Doing so costs you 1 additional square of movement for every square you crawl. If you intentionally want to crawl, you can fall prone as a free maneuver. While voluntarily prone, you can choose to stand as a free maneuver.`
	};

	static criticalHit: RulesItem = {
		label: 'Critical Hit',
		content: `
Whenever you make an ability roll as a main action and the roll is a natural 19 or natural 20 — a total of 19 or 20 before adding your characteristic score or other modifiers — you score a critical hit. A critical hit allows you to immediately take an additional main action after resolving the power roll, whether or not it’s your turn and even if you are dazed (see Conditions below).

You can’t score a critical hit with an ability roll made as a maneuver or any other action type, but you can score a critical hit with a main action you use off your turn. For example, an opportunity attack made as a triggered action or a signature ability used as a free triggered action with the assistance of the tactician’s Strike Now ability can be critical hits.`
	};

	static damagingTerrain: RulesItem = {
		label: 'Damaging Terrain',
		content: ` 
Areas of acid, fire, sharp rocks, lava, or any other terrain that causes damage to creatures within it is damaging terrain. The damage dealt by damaging terrain is noted in the terrain’s description or in the description of the effect that creates the terrain.`
	};

	static difficultTerrain: RulesItem = {
		label: 'Difficult Terrain',
		content: `
Areas of thick underbrush, rubble, spiderwebs, or other obstacles to movement create difficult terrain. It costs 1 additional square of movement to enter a square of difficult terrain.`
	};

	static dyingAndDeath: RulesItem = {
		label: 'Dying and Death',
		content: `
When your Stamina is 0 or lower, you are dying. While dying, you can’t take the Catch Breath maneuver in combat, and you are bleeding, and this condition can’t be removed in any way until you are no longer dying. While you are dying, your allies can help you spend Recoveries in combat, and you can spend Recoveries out of combat as usual.

While your Stamina is lower than 0, if it reaches the negative of your winded value, you die. When you die, you can’t be brought back to life without the use of a special powerful item such as a Scroll of Resurrection.`
	};

	static falling: RulesItem = {
		label: 'Falling',
		content: `
When a creature falls 2 or more squares and lands on the ground, they take 2 damage for each square they fall (to a maximum of 50 damage) and land prone. A creature who falls can reduce the effective height of the fall by a number of squares equal to their Agility score (to a minimum of 0). Falling into liquid that is 1 square or more deep reduces the effective height of a fall by 4 squares (to a minimum of 0).

Falling is not forced movement, but being force moved downward is considered falling. Movement from falling doesn’t provoke opportunity attacks.

**Falling Onto Another Creature**: A creature who falls and lands on another creature causes that creature to take the same damage from the fall. The falling creature then lands prone in the nearest unoccupied space of their choice. If the falling creature’s size is greater than the Might score of the creature they land on, that creature is knocked prone.

**Falling Far**: When a creature first falls from a great height, they fall 100 squares in the first round. At the end of each subsequent round that they remain falling, they fall another 100 squares.`
	};

	static flanking: RulesItem = {
		label: 'Flanking',
		content: `
When you and one or more allies are adjacent to the same enemy and on opposite sides of the enemy, you are flanking that enemy. While flanking an enemy, you gain an edge on melee strikes against them.

If you’re unsure whether your hero and an ally are flanking a foe, imagine a line extending from the center of your space to the center of your ally’s space. If that line passes through opposite sides or corners of the enemy’s space, then you and your ally are flanking the enemy.

You must have line of effect to the enemy and be able to take triggered actions to gain or grant the flanking benefit.`
	};

	static flying: RulesItem = {
		label: 'Flying',
		content: `
A creature who has “hover” in their speed entry (most commonly alongside “fly” or “teleport”), or who gains the temporary ability to hover, can remain motionless in midair. They don’t fall even if they are knocked prone or their speed is reduced to 0.`
	};

	static forcedMovement: RulesItem = {
		label: 'Forced Movement',
		content: `
Some actions and maneuvers allow a creature to push, pull, or slide a target creature or object a specific distance across the battlefield. Collectively, these types of movement are called forced movement:

* **Push X**: The creature moves the target up to X squares away from them in a straight line, without moving them vertically. Each square the creature moves the target must put the target farther away from them.
* **Pull X**: The creature moves the target up to X squares toward them in a straight line, without moving them vertically. Each square the creature moves the target must bring the target closer to them.
* **Slide X**: The creature moves the target up to X squares in any direction, except for vertically. Unlike a push or a pull, a slide doesn’t need to be a straight line.

When you force move a target, you can always move that target fewer squares than the number indicated. For example, when the conduit obtains a tier 3 “push 3” outcome with their Call the Thunder Down ability, they can push targets any distance up to 3 squares, including choosing to not move certain targets at all.

Forced movement ignores difficult terrain and never provokes opportunity attacks. When you force move a target into damaging terrain or into terrain that produces an effect, they are affected as if they had moved into it willingly.

**Vertical**: If a forced movement effect has the word “vertical” in front of it, then the forced movement can move a target up or down in addition to horizontally. For example, if a forced movement effect says “vertical push 5,” then a creature targeted by the effect can be pushed up to 5 squares in any direction, as long as the forced movement is a straight line.

If a creature who can’t fly is left in midair at the end of a vertical forced move, they fall. Forced movement made against a creature who is flying is always a vertical forced move, whether or not the effect specifies it.

Though you can’t freely push, pull, or slide a target up and down unless that forced movement specifies “vertical,” you can move them along a physical slope such as a hill or staircase. For a target to be force moved along a slope, each square of the slope can be no more than 1 square higher or lower than the previous square.

**Big vs Little**:  When a larger creature force moves a smaller target with a melee weapon ability, the distance of the forced movement is increased by 1. If a smaller creature force moves a larger target with a melee weapon ability, the distance doesn’t change.

**Forced Into a Fall**: If you can’t fly and are force moved across an open space that would cause you to fall, such as being pushed over the edge of a cliff, you continue moving the total distance you were moved first. If you are still in a position to fall when the forced movement ends, you fall.

**“When a Creature Moves …”**: Certain abilities and effects trigger when a creature moves into a particular area. Forced movement triggers these options unless otherwise noted, including an effect stating that a creature must willingly move to trigger it.

**Death Effects and Forced Movement**: Some creatures have traits or abilities that trigger when they die or are reduced to 0 Stamina. If such a creature is reduced to 0 Stamina by damage from an ability or effect that also force moves them, the forced movement takes place before the triggered effect.

Some creatures can force move multiple creatures or objects with a single ability. Unless the ability specifies otherwise, the creature using the ability determines the order in which the targets are force moved. The creature should select each target individually and complete their forced movement before force moving the next target affected.`
	};

	static hiding: RulesItem = {
		label: 'Hiding',
		content: `
To hide from a creature, you must have cover or concealment from that creature (see Chapter 10: Combat), who can’t observe you attempting to hide. A creature is observing you if they’re aware of your specific location before you attempt to hide. This means they can pinpoint you with their senses and point a finger (or paw or tentacle) at you as if to shout, “There they are!” If you duck behind a barrel to hide from a foe, your attempt to hide has a chance of succeeding only if your foe doesn’t notice you doing so. If you’re being chased by a hungry dragon, you can hide only if you first move to a location where the dragon can’t observe you—for instance, by turning a sharp corner into a tunnel full of giant stalagmites before the dragon does. You then make your hide attempt.

When you use the Hide maneuver to hide during combat while you have cover or concealment from a creature who isn’t observing you, you are automatically hidden from them unless the Director deems otherwise. If you hide outside of combat, the Director might ask you to make a test using the Hide skill to determine how well hidden you are.

While you are hidden from another creature, the creature can’t target you with abilities that don’t have the Area keyword. This benefit ends as soon as you are no longer hidden from that creature.

Additionally, while you are hidden from another creature, you gain an edge on ability rolls made against that creature. This benefit lasts until the end of the turn in which you are no longer hidden. This means you can be hidden from another creature at the start of your turn, move out of cover or concealment toward them and use an ability against them, and still gain an edge on ability rolls made against the creature as long as you use the ability before the end of that turn.

You are no longer hidden from a creature if you don’t have cover or concealment from them. If you use an ability, interact with an enemy, move without sneaking, or otherwise make noise or reveal yourself while hidden, you are no longer hidden once the activity that reveals you resolves. For instance, if you are hidden and then make a strike, you resolve the strike first, then are no longer hidden.

**Searching for Hidden Creatures** You can search for creatures who are hidden from you as long as those creatures are within 10 squares and you have line of effect to them. To do so, you use a maneuver to make an Intuition test using the Search skill, and any hidden creatures within 10 squares of you each make an opposed Agility test using the Hide skill (see Opposed Power Rolls earlier in this chapter). At the Director’s discretion, different characteristics and skills can be used in this opposed test. For example, your foe might make a Presence test using the Handle Animals skill to hide among a flock of sheep without disturbing them, or you could make a Reason test using the Eavesdrop skill to pick out the breathing of a creature hidden in the dark.

If the total of your test is higher than that of a hidden creature, they are no longer hidden from you. Otherwise, they remain hidden from you. As part of the maneuver used to search for hidden creatures, you can point out any creatures you notice to allies within 10 squares of you, making those creatures no longer hidden from those allies.

If a creature is hidden from your allies but not from you, you can use a maneuver without making a test to point that creature out to your allies.`
	};

	static highGround: RulesItem = {
		label: 'High Ground',
		content: `
Whenever a creature uses an ability to target a creature or object while standing on the ground and occupying a space that is fully above the target’s space, they gain an edge on the power roll against that target. To be fully above a target, the bottom of a creature’s space must be higher than or bordering on the top of the target’s space.

A creature can gain this benefit while climbing only if they have “climb” in their speed entry or can automatically climb at full speed while moving.`
	};

	static hover: RulesItem = {
		label: 'Hover',
		content: `
A creature who has “fly” in their speed entry, or who gains the temporary ability to fly, can move through the air vertically or horizon- tally at full speed and remain in midair. If a flying creature is knocked prone or has their speed reduced to 0, they fall.`
	};

	static invisibility: RulesItem = {
		label: 'Invisible Creatures',
		content: `
Invisible creatures always have concealment from other creatures. If an invisible creature isn’t hidden, they can still be targeted by abilities. The test made to find a hidden creature who is invisible takes a bane.`
	};

	static jumping: RulesItem = {
		label: 'Jumping',
		content: `
Whenever an effect allows you to move (including using the Advance move action), you can automatically long jump a number of squares up to your Might or Agility score (your choice; minimum 1 square) as part of that movement. The height of your jump is automatically 1 square as part of that movement.

If you want to jump even longer or higher than your baseline jump allows, make a Might or Agility test:

**Power Roll + Might or Agility**:

| Roll  | Effect |
|:------|:---------|
| ≤ 11  | You don’t jump any farther than your baseline jump allows.		 |
| 12–16 | You jump 1 square longer and higher than your baseline jump allows.|
| 17+   | You jump 2 squares longer and higher than your baselinejump allows.|

You can’t jump farther or higher than the distance of the effect that allows you to move. You can’t jump out of difficult terrain or damaging terrain.`
	};

	static mainAction: RulesItem = {
		label: 'Main Action',
		content: `
When you take a main action, you most often do so to use a unique ability granted by your class, kit, or a treasure. These abilities represent the most unique, flavorful, and impactful things you can do with your main action.

You can also use your main action to help another creature regain Stamina, charge into battle, defend yourself, or make a free strike.

You can convert your main action into a maneuver or a move action, allowing you to take two maneuvers or move actions on your turn.
		`
	};

	static mountedCombat: RulesItem = {
		label: 'Mounted Combat',
		content: `
A willing creature with the Mount role can serve as your mount as long as their size is greater than yours. You can climb onto your mount freely (see Climbing Other Creatures above). You determine which space you occupy. While mounted, you can take the Ride move action, but a mount can only be ridden this way once per round. Both mount and rider each take a turn during combat.

If a creature riding a mount is force moved, they are knocked off the mount and must make a test to determine how they land (see Climbing Other Creatures). If a mount is force moved, they carry any riders with them. Riders and mounts teleport separately.

If your mount dies, they fall prone, and you fall off them and land prone in the nearest unoccupied space of your choice.`
	};

	static movement: RulesItem = {
		label: 'Movement',
		content: `
During combat, creatures can employ multiple mechanics that allow them to move around the battlefield. The most common of those mechanics is the Advance or Disengage move action (detailed under Move Actions below), but abilities granted by your class, equipment, ancestry, title, or other options might allow you other ways to move.

Your hero starts with a speed granted by their ancestry—usually 5. This represents the maximum number of squares you can move when you take the Advance move action or when another effect allows you to move. Your speed can be increased by your kit and other game options.

All squares adjacent to your character cost 1 movement to move into. No, there’s no Pythagorean theorem on the grid. It’s a game, don’t overthink it.

Your hero can move freely through an ally’s space. You can move through an enemy’s space, but that space is difficult terrain (see below). You can’t stop moving in any other creature’s space, including to make a strike or use a main action or maneuver while in that space and then continuing your move, unless that creature’s size is two or more sizes greater or smaller than your own.

At the Director’s discretion, you can be forced into the same space as another creature whose size is within 1 of yours, such as by falling down a narrow shaft with such a creature already at the bottom. When you are squeezed into the same space as another creature whose size is within 1 of yours, your ability rolls and tests take a bane.

**Can’t Exceed Speed:** A single move or other effect can never allow a creature to move more squares than their speed, unless the effect states otherwise. For example, a creature with speed 5 might have that speed reduced to 2 by the slowed condition (see Conditions in Chapter 5: Classes). If an ally then targets them with an effect that allows them to move up to 3 squares, the creature can move only 2 squares because that’s their current speed.

**Can’t Cut Corners:** A creature can’t move diagonally when doing so would involve passing through the corner of a wall or some other object that completely fills the corner between the creature’s space and the space they are moving to. This rule applies only to moving past objects, not moving past other creatures.`
	};

	static naturalRoll: RulesItem = {
		label: 'Natural Roll',
		content: `
The total of your power roll before your characteristic or any other modifiers are added is called the natural roll. The rules often refer to this as “rolling a natural X,” where X is the total of the roll. For example, if you get a 20 on a power roll before adding your characteristic, this is called rolling a natural 20.

When you roll a natural 19 or 20 on a power roll, it is always a tier 3 result regardless of any modifiers, and on certain types of power rolls, this is a critical hit (see Critical Hit in Classes).`
	};

	static opportunityAttack: RulesItem = {
		label: 'Opportunity Attack',
		content: `
Whenever a creature has an enemy adjacent to them and the enemy willingly moves to a space that isn’t adjacent to the creature without shifting, the creature can take advantage of that movement to quickly make a melee free strike against the enemy as a free triggered action. This is called an opportunity attack.

If a creature has a bane or double bane on the power roll against the enemy, they can’t make an opportunity attack.`
	};

	static rollVsMultipleCreatures: RulesItem = {
		label: 'Roll vs Multiple Creatures',
		content: `
When an ability has multiple targets (whether a strike with more than one target or an area affect), you make one power roll and apply the total to all targets. If you have edges or banes (see Chapter 1: The Basics) against some but not all of your targets, you might apply a different tier outcome to individual targets. 

For example, if you target three creatures with a strike ability and the power roll totals 11, each of the targets should be affected by the tier 1 outcome of the ability. However, if you gain an edge on strikes against one of the targets to add 2 to the power roll, your total against that target is 13, and they are affected by the tier 2 outcome of the ability.`
	};

	static shifting: RulesItem = {
		label: 'Shifting',
		content: `
Shifting is a careful form of movement that allows a creature to move safely past dangerous foes. Certain abilities, features, and other rules allow you to shift a specific number of squares, sometimes up to your speed. Whenever you shift, creatures can’t make opportunity attacks against you triggered by that movement.

You can’t shift into or while within difficult terrain or damaging terrain. If a rule allows you to shift, you can choose to instead move up to the number of squares you would have shifted (for example, to get out of difficult terrain). However, you can’t combine moving and shifting within that movement.`
	};

	static slammingCreatures: RulesItem = {
		label: 'Slamming into Creatures',
		content: `
When you force move a creature into another creature, the movement ends and both creatures take 1 damage for each square remaining in the first creature’s forced movement. You can also force move an object into a creature. The object’s movement ends, and the creature takes 1 damage for each square remaining in the object’s forced movement.

It’s possible to move a creature or object of a larger size into several creatures of a smaller size at the same time. When this happens, the larger creature in the collision takes damage only once, not once for each smaller creature they slam into.

If a creature is killed by damage from an ability or effect that also force moves them, a second creature they are slammed into still takes damage unless the Director deems otherwise.

You can force move another creature into yourself with a pull or a slide.`
	};

	static slammingObjects: RulesItem = {
		label: 'Slamming into Objects',
		content: `
When a creature force moves a target into a stationary object that is the target’s size or larger and the object doesn’t break (see below), the movement ends and the target takes 2 damage plus 1 damage for each square remaining in their forced movement.

If you force move a creature downward into an object that doesn’t break (including the ground), they also take falling damage as if they had fallen the distance force moved and their Agility score was 0.

**Hurling through objects**: When you move a creature into a mundane object, the object can break depending on how many squares of forced movement remain. The cost of being slammed into an object is tied to the damage a target takes for being hurled through it:

* It costs 1 remaining square of forced movement to destroy 1 square of glass. The creature moved takes 3 damage.
* It costs 3 remaining squares of forced movement to destroy 1 square of wood. The creature moved takes 5 damage.
* It costs 6 remaining squares of forced movement to destroy 1 squareof stone. The creature moved takes 8 damage.
* It costs 9 remaining squares of forced movement to destroy 1 square of metal. The creature moved takes 11 damage.

If any forced movement remains after the object is destroyed, you can continue to move the creature who destroyed the object.`
	};

	static sneaking: RulesItem = {
		label: 'Sneaking',
		content: `
While you are hidden from another creature and not in combat, you can attempt to sneak—avoiding the senses of other creatures as you move around them in the open—to remain hidden. While sneaking, your speed is halved. To sneak, you make an Agility test using the Sneak skill with a difficulty set by the Director. If you succeed, you remain hidden during your movement. This test can use another characteristic at the Director’s discretion, such as using Presence to blend in with a crowd on a packed city street.`
	};

	static suffocating: RulesItem = {
		label: 'Suffocating',
		content: `
During combat or under similarly stressful circumstances, you can hold your breath for a number of combat rounds equal to your Might score (minimum 1 round). At the end of each combat round after that, you take 1d6 damage while holding your breath.

Out of combat, you can hold your breath for a number of minutes equal to your Might score. Being unable to breathe after that time counts as a stressful condition, causing you to run out of air as above.`
	};

	static surprise: RulesItem = {
		label: 'Surprise',
		content: `
When battle starts, the Director determines which creatures, if any, are caught off guard. Any creature who isn’t ready for combat at the start of an encounter is surprised until the end of the first combat round. A surprised creature can’t take triggered actions or free triggered actions, and ability rolls made against them gain an edge.

For example, if the heroes sneak up unnoticed on a camp of marauders and attack, each marauder is surprised. Likewise, if the heroes fail to notice that all the cloaked figures in a tavern are actually brain-devouring zombies, then the heroes are surprised. If one of the heroes notices the disguised undead before the zombies attack but has no opportunity to warn their allies, that hero isn’t surprised but the rest of the characters are.`
	};

	static takingATurn: RulesItem = {
		label: 'Taking a Turn',
		content: `
Each creature in combat—whether hero, adversary, or something in between—gets to take a main action, a maneuver, and a move action on their turn. Each combatant can perform their maneuver and main action in any order, and can break up the movement granted by their move action before, after, or between their maneuver and main action however they like. You can also turn your main action into a move action or a maneuver, so that your turn can alternatively consist of two move actions and a maneuver, or two maneuvers and a move action.`
	};

	static teleporting: RulesItem = {
		label: 'Teleporting',
		content: `
When a creature teleports, they move from one space to another space instantaneously. The following rules apply to teleporting:

* Teleporting doesn’t provoke opportunity attacks or other effects that are triggered by a creature moving.
* When a creature teleports, they bypass any obstacles between the space they leave and their destination space.
* A creature teleporting themself must have line of effect to their destination space. A creature teleporting another creature must have line of effect from the space the teleported creature leaves and to their destination space.
* A teleporting creature’s destination space can’t be occupied by another creature or object.
* The effect that lets a creature teleport indicates how far they can teleport. That distance can be greater than the creature’s speed.
* If a creature can teleport as part of their usual movement, they can use the Advance move action to teleport a number of squares up to their usual speed, unmodified by conditions or effects.
* If a creature teleports while prone, they can be standing when they reach their destination space provided they are able to stand. If a prone creature is teleported by another creature, it is up to that creature whether the teleported creature remains prone or stands if they are able.
* If a creature teleport while affected by the grabbed or restrained conditions, those conditions end for the creature.
* When a creature teleports, they must leave the space where they start and enter a new space. A creature can’t teleport to and from the same space.`
	};

	static underwaterCombat: RulesItem = {
		label: 'Underwater Combat',
		content: `
If a creature is fully submerged in water, they have fire immunity 5 and lightning weakness 5. If their speed doesn’t have the Swim keyword, all their power rolls take a bane.`
	};

	static wieldingTreasures: RulesItem = {
		label: 'Wielding Treasures',
		content: `
Some treasures are wielded in the form of weapons or implements. A weapon might have the Light Weapon, Medium Weapon, or Heavy Weapon keywords, or might have a keyword denoting a specific category of weapon (Bow, Polearm, and so forth). An implement might have the Implement keyword or a keyword denoting the type of implement (Orb, Wand, and so forth). Armor is also considered a wielded treasure, with the Light Armor, Medium Armor, or Heavy Armor keywords, or the Shield keyword.

A hero can wield as many weapons, implements, suits of armor, or shields as they can feasibly hold or wear. However, an ability can benefit only from one weapon or implement at a time.
		`
	};
}
