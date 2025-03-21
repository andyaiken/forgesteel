import { EncounterObjective } from '../models/encounter';

export class EncounterObjectiveData {
	static diminishNumbers: EncounterObjective = {
		id: 'diminish-numbers',
		name: 'Diminish Numbers',
		description: 'The simplest combat encounter objective is “defeat them before they defeat us.” While the heroes don’t have to kill every last enemy in a Diminish Numbers encounter, they do need to remove their opponents to win the day and get their opponents to a point where they flee or surrender.',
		difficultyModifier: 'This objective doesn’t modify the encounter’s difficulty.',
		successCondition: `
Choose one of the following success conditions:
* An encounter that includes at least two groups of minions ends when the heroes have no nonminion enemies remaining.
* An encounter with mostly band creatures ends when the heroes outnumber their foes.
* An encounter with mostly platoon creatures ends when the heroes outnumber their foes two to one.
* The encounter ends when the number of the heroes’ remaining foes is half or fewer what it was at the start.
* In a battle against a solo creature, the creature flees or surrenders when reduced to a quarter of their Stamina or less and after using all their villain actions.`,
		failureCondition: 'The heroes gain no Victories if they are killed, captured, flee, or otherwise fail to defeat their foes.',
		victories: 'If the heroes achieve success, they gain 1 Victory for an easy or standard encounter, or 2 Victories for a hard or extreme encounter.'
	};

	static defeatFoe: EncounterObjective = {
		id: 'defeat-foe',
		name: 'Defeat a Specific Foe',
		description: 'A Defeat a Specific Foe encounter includes one or more of the heroes’ enemies commanding the rest, such as a hobgoblin bloodlord leading a group of mercenaries, or one or more particularly powerful foes among a group of weaker ones, such as a pair of tusker demons in a gnoll war band. Because these enemies are the stars of the encounter, if only weak foes are left once the stars are gone, the battle loses its challenge and it’s time to wrap it up. It makes sense that those weaker foes flee or surrender once their biggest advantage has gone down.',
		difficultyModifier: 'If the creature or creatures who need to be taken down for the encounter to end makes up one third or less of the opposing side’s total EV, then the encounter is one step of difficulty easier (e.g. from hard to standard).',
		successCondition: 'The heroes win when the designated creature or creatures are reduced to 0 Stamina.',
		failureCondition: 'The heroes gain no Victories if they don’t defeat all the designated creatures. Note that designated creatures could choose to flee if all their allies start dying.',
		victories: 'The heroes gain Victories according to the encounter’s difficulty after being adjusted for this objective. They earn 1 Victory for an easy or standard encounter or 2 for a hard encounter.'
	};

	static getThing: EncounterObjective = {
		id: 'get-thing',
		name: 'Get the Thing!',
		description: `
Classic heroic fantasy is full of important objects that the heroes must protect from the forces of evil: magic rings, royal birth certificates, dragon eggs, and the like. Heroes often find themselves at violent odds with their enemies as they race to collect a valuable or important item from a guarded temple or castle, or when they need to steal the item from a group of enemies already in possession of it. Objectives in this category work well when paired with other objectives, such as Defeat a Specific Foe. For instance, the heroes must steal a ledger containing a record of criminal activity from an overmind and her lackeys. However, even if they obtain the ledger, the battle won’t be over until they also defeat the overmind, who won’t let the book go without a fight!

### THE THING

The thing the heroes need to get is typically a 1T object. (If the thing is a creature or a bulky object that must be carried past enemies, this might instead be an Escort encounter!) Most or all approach routes to the thing are guarded by enemies, and often a trap or a particularly powerful monster stands guard over the object.

The thing might be fragile (like a document) or virtually unbreakable (like a magic weapon), but in any case, the enemies don’t particularly want to harm it. However, in some cases it can be damaged accidentally.

Additionally, a thing can have one of the following extra defenses:

* **Hidden**: The heroes may need to make one or more successful tests to find the thing, or it may be behind a door or lid that must be opened. It might even be hidden in plain sight. The unassuming sword in an inanimate suit of armor’s hand is really the magic sword they need!
* **Held**: The thing is possessed by an enemy. Perhaps it’s in their pocket or, if the thing is a weapon or implement, the enemy might be using it.`,
		difficultyModifier: 'If there is no powerful monster (at least one-third or more of the encounter’s total EV) or trap directly guarding the thing, the encounter is one step easier. If the thing is hidden or held, the encounter is one stage harder.',
		successCondition: 'The heroes win when all the heroes leave the encounter map with the thing.',
		failureCondition: 'The heroes gain no Victories if the thing is destroyed or remains in the enemies’ hands.',
		victories: 'The heroes gain 1 Victory if they leave the map with the thing and the encounter was easy, standard, or hard after being adjusted for this objective. They instead earn 2 Victories if the success condition is met and the encounter’s difficulty is Extreme or none of the heroes take damage during the encounter.'
	};

	static destroyThing: EncounterObjective = {
		id: 'destroy-thing',
		name: 'Destroy the Thing!',
		description: `
Combat doesn’t always have to be about destroying your enemies. Sometimes it’s about destroying their stuff! Burning a pirate captain’s vessel, closing a portal to the Abyssal Wasteland before it lets in an army of demons, or shutting down a massive kobold trap made of spinning blades could so hamper the heroes’ foes that the battle is no longer worth fighting once the damage is done.

Sometimes the thing is actually multiple things, all of which must be destroyed.

### THE THING

A typical thing is an object with Stamina equal to the heroes’ level times 20. Most objects have poison and psychic immunity. Additionally, the thing may have immunities or vulnerabilities to one or more damage types, for instance, a magic statue might be immune to fire damage but vulnerable to thunder damage.

Additionally, a thing can have one or more of the following extra defenses:

* **Hidden**: The heroes may need to make one or more successful tests to find the thing, or it may be behind a door or lid that must be opened. It might even be hidden in plain sight.
* **Held**: The thing is possessed by an enemy. A thing can’t be both hidden and held.
* **Sturdy**: The thing’s Stamina is twice what it was.
* **Multiple**: There are multiple things, all of which must be destroyed. Divide the thing’s stamina between all of them.`,
		difficultyModifier: 'If the thing doesn’t have any extra defenses, the encounter is one step easier. If the thing has at least two extra defenses, the encounter is one stage harder.',
		successCondition: 'The heroes win when they destroy the thing.',
		failureCondition: 'The heroes gain no Victories if the thing is not destroyed and remains in the enemies’ hands.',
		victories: 'The heroes gain Victories according to the encounter’s difficulty after being adjusted for this objective. They earn 1 Victory for an easy or standard encounter or 2 for a hard encounter.'
	};

	static saveAnother: EncounterObjective = {
		id: 'save-another',
		name: 'Save Another',
		description: `
No one earns the mantle of hero without saving a few lives. Sometimes the point of an encounter isn’t to kill, but to save as many folks as you can.

If the heroes rescue powerful allies from the clutches of their foes during combat, the added strength of those allies might be enough to make the remainder of the encounter trivial. When you and your companions save a griffon from a crew of poachers, the hunters become the … well, you know the rest.

### ALLIES AND POTENTIAL ALLIES

Some Save Another encounters feature willing allies (creatures that are able and willing to fight alongside the heroes), and some feature potential allies (creatures that can’t or won’t join the heroes right away—but might later in the battle). In combat, willing allies can be controlled by the heroes (and might use retainer stat blocks), while potential allies are controlled by the Director.

During an encounter, potential allies must be won over and freed from captivity before they become allies. This requires success on a **hard Presence test** made as a maneuver. Potential allies otherwise flee for the nearest exit on their turns.`,
		difficultyModifier: 'For each willing ally the heroes can save who is of their level or higher, add one hero to the party for the purposes of building your encounter.',
		successCondition: 'Once all allies are freed and have either joined the fight or retreated off the encounter map, and at least half of the allies lived through the encounter, the heroes win.',
		failureCondition: 'The heroes gain no Victories if half or more of the allies are dead or captured.',
		victories: 'The heroes gain 1 Victory if the success condition was met and encounter was easy or standard after being adjusted by the objective’s difficulty modifier. The heroes gain 2 Victories if the success condition is met and the combat encounter was hard or extreme or all of the allies were saved and survived.'
	};

	static escort: EncounterObjective = {
		id: 'escort',
		name: 'Escort',
		description: `
Surprising as it may seem, sometimes the fate of the mission doesn’t rest on the heroes’ shoulders at all! Sometimes it rests on the shoulders of someone standing next to the heroes. The heroes’ job is to keep this important person safe as they travel to a specific destination.

Not every Escort encounter is on behalf of a wise or mighty ally. Sometimes the heroes are tasked with protecting a helpless or even an actively troublesome creature, such as a hapless noble or a wayward child. They might even have to protect a bulky or inconvenient inanimate object. Whatever the case, the enemies just keep coming until the heroes get their charge to their destination.

### WARD

The creature or object to be protected is called the ward. At the start of each round, choose a hero. The ward moves on that hero’s turn and is controlled by that hero. Most wards can take a move action or a maneuver on their turn, but not both. A ward’s characteristics and speed are determined by the Director. Most humanoid wards have a speed of 5.

A sturdy ward, such as an able-bodied citizen, typically has Stamina equal to 10 times the heroes’ level. A delicate ward, such as an elderly diplomat or an important object, typically has Stamina equal to 5 times the heroes’ level.

### DESTINATION

Every Escort encounter has a destination: a place of safety beyond which the enemies won’t follow.

Typically, when the encounter begins, the ward’s distance from the destination is at least three times the ward’s Speed (though they can start closer if difficult terrain or other obstacles complicate the route). The heroes’ enemies can be placed anywhere on the encounter map, including between the ward and the destination, but not within 5 squares of the destination.

### REINFORCEMENTS

At the start of each round, any minion that was killed during the last round is replaced by a reinforcement. The Director chooses their position, which can’t be within 5 squares of the ward, the destination, or any hero.`,
		difficultyModifier: 'A combat encounter’s difficulty is one stage harder with a delicate ward.',
		successCondition: 'The heroes win when the ward reaches their destination.',
		failureCondition: 'If the ward is reduced to 0 Stamina or is prevented from reaching their destination, the heroes gain no Victories.',
		victories: 'The heroes gain 1 Victory if the success condition is met. They earn 2 Victories if the success condition is met and the combat encounter’s difficulty is extreme after being adjusted for this objective or the ward and all heroes reach their destination in fewer than 3 rounds.'
	};

	static holdThemOff: EncounterObjective = {
		id: 'hold-them-off',
		name: 'Hold Them Off',
		description: `
Sometimes the heroes just need to buy time. They might need to battle a conquering tyrant’s army to allow innocent villagers time to escape. They might need to hold off wave after wave of zombies while a group of priests completes a ritual to lay the undead to rest for good. To achieve this objective, the heroes need to stay alive and protect a particular position for a number of rounds determined by the Director.

### DEFENSIVE POSITION

The Director (or the heroes) choose a defensive position, an area that must be held and controlled by the heroes. The fewer of the heroes’ enemies that get passed the defensive position, the better their chances of success. The area can be any size. The defensive position blocks entry to a vulnerable area the heroes are defending.

Often, a defensive position grants bonuses to its defenders. The approach to the position might be narrow, over difficult terrain, or require climbing, or anyone inside the position might have the benefit of higher ground against anyone outside it.

### ENCOUNTER DURATION

The Director determines the encounter duration, the number of rounds that the heroes must defend the area in order to be successful. A typical encounter duration is 3 rounds.

### REINFORCEMENTS

At the end of each round, the Director adds more enemies for the heroes to battle on the map. The new group should have an EV of all the enemies killed during that round plus the EV value of one hero. If the Director doesn’t spend all of their EV in a round, the remainder can be added to a future round.

Reinforcements appear at least 10 squares from the defensive position.`,
		difficultyModifier: 'A Hold Them Off encounter’s difficulty is determined by the creatures present for the battle at the beginning of the first round of combat. Don’t count reinforcements toward the difficulty. The encounter difficulty is one step harder if the encounter duration is 5 rounds or greater.',
		successCondition: 'The heroes win if they survive for the encounter duration and let fewer creatures through the defensive position than there are heroes.',
		failureCondition: 'The heroes earn now Victories if a number of creatures equal to or greater than their number get passed the defensive position.',
		victories: 'The heroes gain 1 Victory if the success condition is met. They earn 2 Victories if the success condition is met and the combat encounter’s difficulty is extreme or the heroes hold off the enemy for an encounter duration of 5 rounds or more.'
	};

	static assaultDefenses: EncounterObjective = {
		id: 'assault-defenses',
		name: 'Assault the Defenses',
		description: `
The enemy holds a strategically important position and the heroes want it. In a reverse of the Hold Them Off encounter, the heroes seize the enemy’s defensive position. The encounter ends when the heroes secure this spot for themselves. Those enemies likely know better than to assault that position on a whim, because they just held it!

Sometimes, and Assault the Defenses encounter is part of a combined objective. First you’ve got to assault the defenses, then you’ve got to hold off against counterattack.

### DEFENSIVE POSITION

The Director choose a defensive position, an area that must be captured by the heroes. The area can be any size. Not all of the heroes’ enemies in the encounter are in this position, as some are outside attempting to stop heroes before they get close.

Often, a defensive position grants bonuses to its defenders. The approach to the position might be narrow, over difficult terrain, or require climbing, or anyone inside the position might have the benefit of higher ground against anyone outside it.`,
		difficultyModifier: 'An Assault the Defenses encounter’s difficulty is one stage harder if the defensive position grants two or more bonuses to its defenders.',
		successCondition: 'The heroes win when at least one hero and none of their enemies have been in the defensive position for four consecutive turns.',
		failureCondition: 'The heroes only fail if they are unable to achieve the success condition.',
		victories: 'The heroes gain 1 Victory if the success condition is met, or 2 Victories if the success condition is met and encounter’s difficulty is hard or extreme after being adjusted by the objective.'
	};

	static stopAction: EncounterObjective = {
		id: 'stop-action',
		name: 'Stop the Action',
		description: `
Sometimes combat is complicated by the fact that the heroes need to stop the villainous actions of their foes. It’s not enough to simply defeat the warriors in a cult. The heroes must also stop the zealots’ archdevil-summoning ritual! Or it might be that the heroes need to interrupt a wedding and make sure an evil mage doesn’t marry the heir to the throne. Despite combat, the mage forces the ceremony to continue! Objectives in this category often have a timer associated with them. If the heroes don’t achieve the objective in a certain number of rounds, the conditions of the battle often change. For instance, if the cultists summon the archdevil, defeating the devil suddenly becomes the heroes’ new objective!

### ENCOUNTER DURATION

The Director determines the encounter duration, the number of rounds before the villains complete their plans. A typical encounter duration is 3 rounds. Sometimes, events can change the encounter duration Succeeding on a hard Reason test to dispute the wedding’s legality increases the encounter duration by 1, or allowing zealots to sacrifice an innocent creature as part of their ritual decreases it by 1.

### STOPPING THE ACTION

The villain’s evil plan has certain requirements, and if those requirements aren’t met, the action is stopped and the heroes are victorious. For instance, to complete a ritual, during each round at least one zealot priest might be required to spend an action to further the ritual. A wedding can’t be completed if a participant or the officiant is killed or captured.

### FAILURE CONSEQUENCES

If the villains’ plan succeeds, there may be additional consequences within the encounter. For instance, if the zealots summon a demon, or if a newly-crowned evil mage uses their new royal authority to summon guards, the heroes may face extra enemies. These potential reinforcements aren’t counted towards the encounter’s difficulty, since they only appear once the heroes have failed the encounter. This is an entirely new battle now!`,
		difficultyModifier: 'A Stop the Action encounter’s difficulty is one step harder if the encounter duration is 2 or less, and one Step easier if the action can be stopped by killing or removing any single creature.',
		successCondition: 'The heroes win if they stop the action before the encounter duration is up.',
		failureCondition: 'The heroes gain no Victories if they fail to stop the action before the end of the encounter duration. The heroes may earn Victories from any new encounters that occur because of a failure consequence.',
		victories: 'The heroes gain 1 Victory if the success condition is met, or 2 Victories if the success condition is met and the combat encounter’s difficulty is extreme or the heroes stop the action before the last round of the encounter duration.'
	};

	static completeAction: EncounterObjective = {
		id: 'complete-action',
		name: 'Complete the Action',
		description: `
The opposite of a Stop the Action encounter, this objective ending sees the characters charged with initiating an event, performing a ritual, and so forth. For instance, if the heroes are attempting to launch an airship while repelling a time raider boarding party, the encounter could be over the moment the heroes manage to activate the vessel and take off with just a few time raiders actually aboard.

### ENCOUNTER DURATION

The Director determines the encounter duration, the number of rounds before the heroes can complete their plans. A typical encounter duration is 3 rounds.

### TASKS AND FAILURES

During each round, at least half the heroes must spend a maneuver performing a task that advances their plans. Each round, the Director decides what tasks are available and where they must be performed. For instance, to launch an airship, one hero might have to cast off an anchor on deck while another unfurls a sail at the top of a mast. The list of available tasks may change each turn.

If at the end of a round the heroes have failed to perform the required number of tasks, the party accumulates one failure.

For more difficult encounters, performing a task may require a successful test.`,
		difficultyModifier: 'A Complete the Action encounter’s difficulty is one step harder if the encounter duration is 5 or more, or if completing tasks requires a successful test. It is one step easier if the encounter duration is 2 or less.',
		successCondition: 'The heroes win if they reach the end of the encounter duration with 1 or 0 failures.',
		failureCondition: 'The heroes gain no Victories and the can’t complete the action if they accumulate 2 or more failures during the encounter duration.',
		victories: 'The heroes gain 1 Victory if the success condition is met or 2 Victories if the success condition is met and the combat encounter’s difficulty is extreme after being modified by this objective or the heroes reach the end of the encounter duration with zero failures.'
	};
}
