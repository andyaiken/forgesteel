interface RulesItem {
	label: string;
	content: string;
}

export class RulesData {
	static abilityDistance: RulesItem = {
		label: 'Ability Distance',
		content: `
An ability’s “Distance” entry indicates how close you need to be to a creature or object to affect that target with the ability.

**Melee**: Melee abilities with a distance of “Melee X” require you to touch a creature with your body, a weapon, or an implement. X is the distance in squares at which you can physically make contact with another creature or object targeted by the ability. For instance, a distance of “Melee 2” can be used to target creatures or objects within 2 squares of you.

**Ranged**: Abilities with a distance noted as “Ranged” can be used to target creatures who are more than a touch away. Ranged distances are presented as “Ranged X,” with X being the number of squares away a creature or object can be while still allowing you to target them with the ability. For instance, a distance of “Ranged 5” can be used to target creatures or objects within 5 squares of you.

If you make a ranged strike while an enemy is adjacent to you, you have a bane on the strike’s power roll.

**Melee or Ranged**: Some abilities have a melee distance and a ranged distance. When you use such an ability, you choose whether to use it as a melee or a ranged ability. The ability never has both the Melee and Ranged keywords at the same time. For example, if you have the Cloak and Dagger kit, which has a weapon damage bonus to melee and ranged abilities, only one bonus at a time applies to an ability with the Melee or Ranged keywords.

**Area Abilities**: Area abilities cover an area, creating an effect within that area that lets you target multiple creatures or objects at once. When an ability allows you to create an area of effect, you are sometimes given a distance, noted as “within X,” that describes how many squares away from you the area can be. If an area ability doesn’t originate from you, then least 1 square of the area of effect must be within that distance and your line of effect. This square is referred to as the origin square of the area of effect. The area of effect can spread from the origin square however you choose, as long as the area of effect conforms to the shape and arrangement rules of that particular area.

Unless otherwise noted, area abilities don’t pass through solid barriers such as walls or ceilings, or spread around corners.

As long as you have line of effect and distance to the origin square, you can place an area ability to include one or more squares where you don’t have line of effect (see Line of Effect below).

An area ability might use any of the following areas of effect:

* **Aura**: When an ability creates an aura, it is expressed as “X aura.” Aura areas always originate from you and move with you for the duration of the ability that created them. A creature must be within X squares of you to be targeted by an aura ability.
* **Burst**: When an ability creates a burst area, it is expressed as “X burst.” Burst areas always originate from you. A creature must be within X squares of you to be targeted with a burst ability.
* **Cube**: When an ability affects a cubic area, it is expressed as “X cube.” X is the length of all the area’s sides.
* **Line**: When an ability affects a linear area, it is expressed as “A × B line.” This means that A equals the line’s length in squares, while B equals the line’s width and height in squares. When you create a line area of effect, the squares it occupies on the grid must be in a straight line, forming either a rectangle or straight diagonal line shape with the squares it effects.
* **Wall**: When an ability creates a wall, it is expressed as “X wall,” where X equals how many squares are used to make the wall. When you place a wall, you can build it one square at a time, but each square must share at least one side (not just a corner) with another square of the wall. You can stack squares on top of each other to make the wall higher. Unless otherwise stated, a wall can’t be placed in occupied squares, and a wall blocks line of effect.
* **Special**: Some abilities create a unique area of effect. The distance entry of such abilities specifies how the area is created.

**Self**: If an ability has a distance of “Self,” that ability originates from or affects only you. The ability’s description specifies how it works.`
	};

	static burrowing: RulesItem = {
		label: 'Burrowing',
		content: `
A creature with “burrow” in their speed entry can move through dirt vertically or horizontally, and either has the means to breathe while doing so or doesn’t require air to live. Such creatures can’t move through more solid ground, such as stone, unless their stat block says otherwise.

A creature who can’t burrow can dig through soft, borrowable earth by spending 3 squares of movement for every 1 square they move.`
	};

	static climbingAndSwimming: RulesItem = {
		label: 'Climbing / Swimming',
		content: `
If a creature’s speed entry includes the word “climb,” they can climb across vertical and horizontal surfaces at full speed. Likewise, if a creature has “swim” in their speed entry, they can swim in liquid at full speed.

Creatures without those types of movement can still climb or swim when a rule allows them to move, but each square of climbing or swimming costs 2 squares of movement. If a surface is difficult to climb (for instance, a sheer cliff or ice-covered wall) or a liquid is hard to swim through (a raging river or whirlpool), the Director can call for a Might test. On a failure, a creature can’t climb or swim but wastes no movement in the attempt. The Director can also impose other consequences to failure, such as being caught in the spinning current of a whirlpool.

**Climbing other Creatures**: You can attempt to climb a creature whose size is greater than yours. If the creature is willing, you can climb them without any trouble. If the creature is unwilling, you make the following test:

**Power Roll + Might or Agility**:
* **11 or lower**: You fail to climb the creature, and they can make a free strike against you.
* **12–16**: You fail to climb the creature.
* **17+**: You climb the creature.

While you climb or ride a creature, you gain an edge to melee abilities used against them. The creature can use a maneuver to attempt to knock you off. If you are knocked off a creature, you must make the following test:

**Power Roll + Might or Agility**:
* **11 or lower**: You fall off the creature into an unoccupied adjacent space of your choice, taking falling damage and landing prone as usual (see Falling in Adventuring).
* **12–16**: You slide down the creature into an unoccupied adjacent space of your choice and don’t land prone.
* **17+**: You continue to hold on to the creature.

If you are knocked prone while climbing or riding a creature, you fall and land prone in an adjacent space of your choice, taking damage as usual from the fall.`
	};

	static concealment: RulesItem = {
		label: 'Concealment',
		content: 'Darkness, fog, invisibility magic, and any other effect that fully obscures a creature but doesn’t protect their body grants that creature concealment. You can target a creature who has concealment with strikes, provided they aren’t hidden. However, strikes against such creatures take a bane. Even if you have line of effect to a creature, they have concealment from you if you can’t see them.'
	};

	static cover: RulesItem = {
		label: 'Cover',
		content: 'When you have line of effect to a creature or object but that target has at least half their form blocked by a solid obstruction such as a tree, wall, or overturned table, the target has cover. You take a bane on abilities that deal damage against creatures or objects that have cover from you.'
	};

	static crawling: RulesItem = {
		label: 'Crawling',
		content: 'If you are prone, you can remain prone and crawl on the ground. Doing so costs you 1 additional square of movement for every square you crawl. If you intentionally want to crawl, you can fall prone as a free maneuver on your turn. While voluntarily prone, you can choose to stand as a free maneuver.'
	};

	static criticalHit: RulesItem = {
		label: 'Critical Hit',
		content: 'When you make an ability power roll as part of an strike or action and the total of the roll is 19 or 20 before adding your characteristic (a natural 19 or natural 20), you score a critical hit. This allows you to immediately take an additional action after resolving the power roll, whether or not it’s your turn and even if you are dazed.'
	};

	static damagingTerrain: RulesItem = {
		label: 'Damaging Terrain',
		content: 'Areas of acid, fire, sharp rocks, lava, or any other terrain that causes damage to creatures who are in it is damaging terrain. The amount of damage caused by hazardous terrain is listed in the terrain’s description or in the description of the effect that creates the terrain.'
	};

	static difficultTerrain: RulesItem = {
		label: 'Difficult Terrain',
		content: 'Areas of thick underbrush, rubble, spiderwebs, or other obstacles to movement create difficult terrain. It costs 1 additional square of movement to enter a square of difficult terrain.'
	};

	static falling: RulesItem = {
		label: 'Falling',
		content: `
When you fall 2 or more squares, you take 2 damage for each square you fall (to a maximum of 50 damage), then you land prone. When you fall, you reduce the effective height of the fall by a number of squares equal to your Agility score (minimum 0). Falling into liquid that is at least 1 square deep reduces the effective height of a fall by 4 squares.

Falling is not forced movement, but being force moved downward is considered falling. Movement from falling doesn’t provoke opportunity attacks.

**Falling Onto Another Creature**: If you land on another creature when you fall, that creature takes the same damage you do from the fall. You then land prone in the nearest unoccupied space of your choice. If your size is greater than the creature’s Might score, the creature also falls prone.

**Falling Far**: When you first fall from a great height, you fall 100 squares in the first round. At the end of each subsequent round that you remain falling, you fall another 100 squares.`
	};

	static flanking: RulesItem = {
		label: 'Flanking',
		content: `
When you and at least one ally are adjacent to the same enemy and on completely opposite sides of the enemy, you are flanking that enemy. While flanking an enemy, you gain an edge on melee strikes against them.

If you’re unsure whether your hero and an ally are flanking a foe, imagine a line extending from the center of your space to your ally’s space. If that line passes through opposite sides or corners of the enemy’s space, then you and your ally are flanking the enemy.

You must have line of effect to the enemy and be able to take triggered actions in order to gain or grant the flanking benefit.`
	};

	static flying: RulesItem = {
		label: 'Flying',
		content: `
A creature who can fly can move through the air vertically or horizontally at full speed and stay still in midair. If a flying creature is knocked prone or has their speed reduced to 0, they fall.

If a creature who can fly also has the Hover keyword in their speed, they remain in the air and don’t fall even if they are knocked prone or their speed is reduced to 0.`
	};

	static forcedMovement: RulesItem = {
		label: 'Forced Movement',
		content: `
Some actions and maneuvers allow you to push, pull, or slide another creature a specific distance across the battlefield. Collectively, these types of movement are called forced movement:

* **Push X**: You move the target up to X squares away from you in a straight line, without moving them vertically.
* **Pull X**: You move the target up to X squares toward you in a straight line, without moving them vertically. Each square you move the creature must bring them closer to you.
* **Slide X**: You move the target up to X squares in any direction, except for vertically.

When you force move a target, you can always move that target fewer squares than the number indicated.

Forced movement ignores difficult terrain and never provokes opportunity attacks. When you force move a target into damaging terrain or into terrain that produces an effect, they are affected as if they had moved into it willingly.

**Vertical**: If a forced movement effect has the word “vertical” in front of it, then the forced movement can move a target up or down in addition to horizontally. For example, if a forced movement effect says “vertical push 5,” then the creature targeted by the effect can be pushed up to 5 squares in any direction, as long as the forced movement is a straight line.

If a creature who can’t fly is left in midair at the end of a vertical forced move, they fall.

Though you can’t push, pull, or slide a creature unless that forced movement specifies “vertical,” you can move them along a physical slope, such as a hill or staircase. For a creature to be force moved along a slope, each square of the slope can be no more than 1 square higher or lower than the previous square.

**Big vs Little**:  When a larger creature force moves a smaller creature with a melee weapon ability, the force move distance is increased by 1. If a smaller creature force moves a larger creature with a melee weapon ability, the force move distance does not change.`
	};

	static hiding: RulesItem = {
		label: 'Hiding',
		content: `
When you wish to hide from a creature, you must have cover or concealment from your foe, and that foe can’t observe you attempting to hide. A creature is observing you if they’re aware of your specific location before you attempt to hide. This means they can pinpoint you with their senses and be able to point a finger (or paw or tentacle) at you as if to shout, “There they are!” If you duck behind a barrel to hide from a foe, your attempt to hide has a chance of succeeding only if your foe doesn’t notice you doing so. If you are being chased by a hungry dragon, you can hide only if you first move into a place where the dragon can’t observe you, such as turning a sharp corner into a tunnel full of giant stalagmites before the dragon does. You then make your hide attempt.

When you use the Hide maneuver to hide during combat while you have cover or concealment from a creature who isn’t observing you, you are automatically hidden from them unless the Director deems otherwise. If you hide outside of combat, the Director might ask you to make a test using the Hide skill to see how well hidden you are.

While you are hidden from another creature, you gain an edge on ability power rolls made against them, and the creature can’t target you with abilities that don’t have the Area keyword. This benefit lasts until the end of the turn in which you become no longer hidden. These rules allow you to be hidden from another creature at the start of your turn, move out of cover or concealment toward them and use an ability against them and still gain the benefit of being hidden as long as you use the ability before the end of the turn in which you moved out of hiding.

You are no longer hidden from a creature if you don’t have cover or concealment from them. If you use an ability, interact with an enemy creature, move without sneaking, or otherwise make noise or reveal yourself while hidden, you are no longer hidden once the thing you’re doing resolves. For instance, if you are hidden and then make an strike, you resolve the strike first, then are no longer hidden.

**Searching for Hidden Creatures**: You can search for creatures who are hidden from you as long as those creatures are within 10 squares of you and you have line of effect to them. To do so, you make an Intuition test as a maneuver and assess the result:

* **11 or lower**: You find any hidden creatures with an Agility of 0 or lower and who don’t have the Hide skill.
* **12–16**: You find any hidden creatures who don’t have the Hide skill.
* **17 or more**: You find all hidden creatures.

As part of this maneuver, you can point out any creatures you find to allies within 10 squares of you, making those creatures no longer hidden from those allies. If a creature is hidden from your allies but not from you, you can use a maneuver without making a test to point them out to your allies.`
	};

	static highGround: RulesItem = {
		label: 'High Ground',
		content: 'When you use an ability against a creature or object while standing on ground and occupying a space that is fully above the space the target takes up, with the bottom of your space higher than the top of the target’s space, you gain an edge on the power roll against that target. You can get this the benefit while climbing if your speed has the Climb keyword.'
	};

	static invisibility: RulesItem = {
		label: 'Invisibility',
		content: 'Invisible creatures always have concealment from other creatures. If an invisible creature isn’t hidden, they can still be targeted with abilities, though strikes against them take a bane. The test made to find a hidden creature who is invisible takes a bane.'
	};

	static jumping: RulesItem = {
		label: 'Jumping',
		content: `
When an effect allows you to move, you can long jump a number of squares up to your Might or Agility score (your choice; minimum 1 square) without a test as part of movement. If you move at least 2 squares in a straight line, you can long jump 1 additional square.

If you want to jump even farther than your initial jump allows, make a medium Might test. On a success, you jump 1 additional square, or 2 additional squares if you get a success with a reward.

The height of your jump is 1 square. If you move at least 2 squares in a straight line immediately before your jump, you can jump 1 square higher.

You can’t jump farther or higher than the distance of the effect that allows you to move. You can’t jump out of difficult or damaging terrain.`
	};

	static mountedCombat: RulesItem = {
		label: 'Mounted Combat',
		content: `
A willing allied creature with the Mount role can serve as your mount as long as their size is greater than yours. You can climb onto your mount freely. You determine which space you occupy. While mounted you can take the Ride move action, but a mount can only be ridden this way once per round.

If a creature riding a mount is force moved, they are knocked off the mount, and must make a test to determine how they land. If a mount is force moved, they carry any riders with them. Riders and mounts teleport separately.

If your mount dies, they fall prone and you fall off them and land prone in the closest unoccupied space of your choice.`
	};

	static multipleTargets: RulesItem = {
		label: 'Multiple Targets',
		content: 'When an ability targets multiple creatures, you make one power roll and apply the result to all the creatures you target. If you have edges or banes against some but not all of your targets, you might apply a different tier of result to individual targets.'
	};

	static opportunityAttack: RulesItem = {
		label: 'Opportunity Attack',
		content: `
Whenever a creature adjacent to you moves to a space that isn’t adjacent to you without shifting, you can take advantage of their movement to quickly make a melee free strike against them as a free triggered action. This is called an opportunity attack.

If you have a bane or double bane on the power roll against the creature, you can’t make the free strike.`
	};

	static shifting: RulesItem = {
		label: 'Shifting',
		content: 'Shifting is a careful form of movement that allows your hero to move safely by dangerous foes. Certain abilities, features, and other rules allow you to shift a specific number of squares, sometimes up to your speed. Whenever you shift, creatures can’t make opportunity attacks against you during your movement. You can’t shift into difficult or damaging terrain.'
	};

	static slammingCreatures: RulesItem = {
		label: 'Slamming into Creatures',
		content: `
When you force move a creature into another creature, the movement ends and both creatures take 1 damage for each square remaining in the first creature’s forced movement. You can also force move an object into a creature.

It is possible to move a creature or object of a larger size into several creatures of a smaller size at the same time. When this happens, all creatures in the collision take damage once.

If a creature is killed by damage from an ability or effect that force moves them, the second creature still takes damage unless the Director deems otherwise.

You can force move another creature into yourself with a pull or a slide.`
	};

	static slammingObjects: RulesItem = {
		label: 'Slamming into Objects',
		content: `
When you force move a creature into a stationary object that is a creature's size or larger and the object doesn’t break, the movement ends and it takes 2 damage plus 1 damage for each square remaining in their forced movement.

If you force move a creature downward into an object that doesn’t break (including the ground), they also take falling damage.

**Hurling through objects**:  When you move a creature into a mundane object, the object can break depending on how many squares of forced movement remain:

* It costs 1 remaining square of forced movement to destroy 1 square of glass. The creature moved takes 1 damage.
* It costs 3 remaining squares of forced movement to destroy 1 square of wood. The creature moved takes 3 damage.
* It costs 6 remaining squares of forced movement to destroy 1 square of stone. The creature moved takes 6 damage.
* It costs 9 remaining squares of forced movement to destroy 1 square of metal. The creature moved takes 9 damage.

If any forced movement remains after the object is destroyed, you can continue to move the creature who destroyed the object.`
	};

	static sneaking: RulesItem = {
		label: 'Sneaking',
		content: 'While you are hidden from another creature and not in combat, you can attempt to sneak, which means avoiding the senses of other creatures as you move around them out in the open, in order to remain hidden. While sneaking, your speed is halved. If you do so, you can make an Agility test with a difficulty set by the Director, remaining hidden during your movement if you succeed. This test can use another characteristic at the Director’s discretion, such as using Presence to blend in with a crowd in a packed city street.'
	};

	static suffocating: RulesItem = {
		label: 'Suffocating',
		content: `
During combat or under similarly stressful conditions, you can hold your breath for a number of rounds equal to your Might score (minimum 1 round). At the end of each round after that, you take 1d6 damage while holding your breath.

Out of combat, you can hold your breath for a number of minutes equal to your Might score. Being unable to breathe after that time counts as a stressful condition, causing you to run out of air as above.`
	};

	static surprise: RulesItem = {
		label: 'Surprise',
		content: 'When battle begins, the Director determines which creatures, if any, are caught off guard. Any creature who isn’t ready for combat at the start of an encounter is surprised until the end of the first round of combat. A surprised creature can’t take triggered or free triggered actions and ability power rolls against them gain an edge.'
	};

	static teleporting: RulesItem = {
		label: 'Teleporting',
		content: `
When you teleport, you move from one space to another space instantaneously. The following rules apply to teleporting:

* Teleporting doesn’t provoke opportunity attacks.
* When you teleport, you bypass any obstacles between the space you leave and your destination space.
* The creature teleporting you must have line of effect from the space you leave and to your destination space.
* Your destination space can’t be occupied by another creature or object.
* The effect that lets you teleport tells you how far you can teleport, which you can use even if it is greater than your speed.
* If your movement has the Teleport keyword, you can use the Advance move action to teleport a number of squares up to your speed, unmodified by conditions or effects.
* If you teleport while prone, you can be standing when you reach your destination space provided you are able to stand. If another creature teleports you, it is up to them if you remain prone or stand, provided you are able.
* If you teleport while affected by the grabbed or restrained conditions, those conditions end for you.
* When you teleport, you must leave the space when you start and enter a new one. You can’t teleport and remain in the same space.`
	};

	static takingATurn: RulesItem = {
		label: 'Taking a Turn',
		content: 'Each creature in combat — whether hero, adversary, or something in between — gets to take a move action, a maneuver, and an action on their turn. Each combatant can perform their maneuver and action in any order, and can break up the movement granted by their move action before, after, or between their maneuver and action however they like. You can also turn your action into a move action or a maneuver, so that your turn can alternatively consist of two move actions and a maneuver; or two maneuvers and a move action.'
	};

	static underwaterCombat: RulesItem = {
		label: 'Underwater Combat',
		content: 'If a creature is fully submerged in water, they have fire immunity 5 and lightning weakness 5. If their speed doesn’t have the Swim keyword, all their power rolls take a bane.'
	};
}
