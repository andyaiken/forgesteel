import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';

export class ProjectData {
	static buildAirship = FactoryLogic.createProject({
		id: 'project-build-airship',
		name: 'Build Airship',
		description: `
When you start this project, you hire a crew of carpenters, mages, and shipwrights who work in the area where the project is undertaken, with these artisans building the ship for you. You can make a project roll whenever you are overseeing the project, which you might be able to do remotely through the use of magic or psionics.

When the project is completed, you have an airship. You and any creatures you designate can operate the ship by touching the ship's wheel. During combat, a creature touching the wheel can use a maneuver to make the ship move up to 10 squares. The ship can be moved only once per round. Out of combat, the ship has a speed of 130 miles per day.

An airship is an object (giving it damage immunity all to poison and psychic damage) and can take 200 damage before it is destroyed. If the damage the ship takes is not too severe (as the Director determines), as long as you have access to materials that can repair the ship, you can restore it back to its original condition as a respite activity.`,
		prerequisites: 'Wind Crystal of Quintessence',
		source: 'Texts or lore in Low Rhyvian',
		characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Presence ],
		goal: 3000
	});

	static buildRoad = FactoryLogic.createProject({
		id: 'project-build-road',
		name: 'Build or Repair Road',
		description: `
When you start this project, you hire a crew of masons, engineers, and guards who start work at the location where the project begins and build or repair the road for you. You can make a project roll whenever you are overseeing the project, whether you do so in person or remotely through the use of magic or psionics.

The number of project points required to complete work on the road equals 10 × the road's length in miles. The goal is cut in half if you are repairing an existing road, or if someone else starts work on a second road project that connects to your project.

When you complete the project, you earn Renown among people in the area where the road is built, depending on the length of the road.

| Project             | Renown Earned |
|:--------------------|:--------------|
| 50 Miles or less    | 1             |
| 51-100 Miles        | 2             |
| More than 100 Miles | 3             |

Time spent traveling between locations on the road is cut in half. Access to resources and knowledge is improved in locations along the road, giving you and your allies an edge on project rolls to discover lore while you are in those areas.`,
		prerequisites: 'Three writs of approval, from an engineers\' guild, a masons\' guild, and a guards\' guild',
		source: 'Texts or lore in Caelian',
		characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Presence ]
	});

	static craftTeleportationPlatform = FactoryLogic.createProject({
		id: 'project-craft-teleportation-platform',
		name: 'Craft Teleportation Platform',
		description: `
When you complete this project, you end up with a 3-square-by-3-square teleportation platform activated by a supernatural password. The platform is permanently affixed to the ground in the location where you create it. Any creature with the password can use the teleportation platform to instantly teleport any creatures or objects on the platform to a location they know, including another teleportation platform whose supernatural password they know. You and any creature you designate upon completion of the activity can change the password as a respite activity.

Each time the teleportation platform is used, the chance of it malfunctioning and teleporting creatures or objects on it to a random platform increases by 1 percent (to a maximum of 50 percent). You can restore the platform back to its original condition and reset this chance of malfunction as a respite activity.`,
		prerequisites: 'One spatial navigator',
		source: 'Texts or lore in Voll',
		characteristic: [ Characteristic.Reason ],
		goal: 1500
	});

	static findCure = FactoryLogic.createProject({
		id: 'project-find-cure',
		name: 'Find a Cure',
		description: `
You research a cure for a disease, curse, or supernatural affliction whose text states that it can be ended by the Find a Cure downtime project. If the affliction was caused by the innate feature of a creature, you need the remains of that creature or another creature of the same kind as an item prerequisite for crafting the cure. For example, you can research the cure for the affliction of a werewolf's Accursed Bite by studying the corpse of any werewolf, not just the one who did the biting. 

The number of project points it takes to complete this project is equal to 50 times the level of the creature who caused the affliction. If the affliction was created by an environmental or supernatural effect, that effect notes the item prerequisite and project points required to complete this project.

When you complete this project, you craft one dose of an alchemical cure for the affliction. Once the project is completed, you can craft subsequent doses for the same affliction for half the number of project points required for the initial project.`,
		prerequisites: 'Varies (see description)',
		characteristic: [ Characteristic.Reason, Characteristic.Intuition ]
	});

	static discoverLore = FactoryLogic.createProject({
		id: 'project-discover-lore',
		name: 'Discover Lore',
		description: `
If you want to track the location of a lost treasure, decipher a ritual, or trace the lineage of a royal family to find the next heir to the throne, you can start a downtime project to delve into whatever mysteries you seek to unravel. You might start a project to discover lore because the information can't be discovered through a single test, or you could do so because you failed a test to recall information and now want to learn it through research.

When you start a downtime project to discover lore, you choose the lore you want investigated and the questions you want answered. The Director tells you if the lore you seek amounts to common, obscure, lost, or forbidden knowledge. The more esoteric the knowledge, the more project points are required to find the answers you seek.

| Project             | Goal |
|:--------------------|:-----|
| Common knowledge    | 15   |
| Obscure knowledge   | 45   |
| Lost knowledge      | 120  |
| Forbidden knowledge | 240  |

**Common Knowledge**: Common knowledge is generally easy to discover with a day or so of research. It's not known by every passerby and takes time to uncover, but with plentiful local sources for the information, you don't need to spend a lot of time searching. It could be that you need to question several members of a rumor mill to figure out who a noble is not-so-secretly courting, or you might need to spend a few hours in a temple to find the particular religious text that carries a seldom-used alternative name for a deity.

**Obscure Knowledge**: Obscure knowledge is known only to specialized sages and is typically of interest only to those scholars. As such, precious few tomes are written on obscure subjects. Finding the right expert to interview or the best book to read typically requires several days of research. Uncovering the details of a ritual used to open and close a portal to the Sea of Stars isn't easy information to come by, but there are people out there who know how to do it—and who wrote the instructions down.

**Lost Knowledge**: Lost knowledge is so esoteric that even among a field's most dedicated scholars, there might be only one or two individuals who have dug deep enough to know that lore. Lost knowledge could come from a time so long ago that only a single text in a dead language now holds the lore you seek. Such lore often takes more than a week to hunt down. The location of a legendary steel dwarf's workshop is most likely lore that is lost—except for one map hidden in a private collection.

**Forbidden Knowledge**: Forbidden knowledge is lore that a powerful individual or organization is attempting to keep secret. Those who know the secrets speak of them in whispered codes after passwords are exchanged, and write texts using ciphers. Hunting down leads and making sense of them typically takes weeks. The location of the dagger that slit the throat of the god of death is hidden behind layers of encoded text and written in a dead language known only to that god's most devout followers.`,
		source: 'Texts or knowledge related to the subject you wish to research',
		characteristic: [ Characteristic.Reason ]
	});

	static goUndercover = FactoryLogic.createProject({
		id: 'project-go-undercover',
		name: 'Go Undercover',
		description: `
Going undercover to spy on a group of people is a cheap and easy way to find information you're looking for. Choose an organization when you undertake this activity. Completing this project grants you access to maps, knowledge about an organization's operations, or some other piece of knowledge that would be considered common or obscure (see the Discover Lore project).

At the Director's discretion, you must have a disguise, a signet ring, a special tattoo, or some other indication that you belong to the organization in order to start this project. Additionally, the Director can decide that the knowledge you seek can't be gained through this project, but must be sought out by infiltrating the organization as part of an adventure.

**Complications**: This project has its own special complications. The first time you complete this project for an organization, you have a 25 percent chance of being caught. Each time you complete this project again with the same organization, the chance of being caught increases by 25 percent and the project goal increases by 30. If you are caught while going undercover, members of the organization pursue you ruthlessly as the Director determines.

Additionally, while you work to complete this project, you might be called upon by the organization to complete a task you might not want to do. Failure to complete the task leads to you being caught. You can avoid the task by fleeing the organization, but this prevents you from completing the project and makes it impossible for you to undertake this project again with the same organization.`,
		prerequisites: 'Special',
		characteristic: [ Characteristic.Intuition, Characteristic.Presence ],
		goal: 15
	});

	static honeCareerSkills = FactoryLogic.createProject({
		id: 'project-home-career-skills',
		name: 'Hone Career Skills',
		description: `
You revisit your previous life to freshen up on the experience it provided you. When this project is complete, you gain an edge on tests made using the skills provided by your career.

Project goal is 240 if your career granted you two skills, or 360 if your career granted you three skills.`,
		characteristic: [ Characteristic.Intuition ],
		goal: 0
	});

	static learnFromMaster = FactoryLogic.createProject({
		id: 'project-learn-from-a-master',
		name: 'Learn from a Master',
		description: `
When you seek to learn from a master, you choose the goal you wish to work on as well as the benefit you would gain from it. The Director tells you whether the master or the materials they've left behind are able to teach you what you want to learn.

| Project         | Goal  |
|:----------------|:------|
| Hone Ability    | 120   |
| Improve Control | 500   |
| Acquire Ability | 1,000 |

**Acquire Ability**: You gain one signature ability of your choice from the master's class (gaining a second signature ability if the master is of the same class as you). If the master is a tactician, you can gain the Strike Now ability instead. You can't gain this benefit again for the same class.

**Hone Ability**: You sharpen the effectiveness of one of your abilities of your choice. Choose between adding a +1/+1/+1 damage bonus to the ability, or improving the distance of a ranged ability by 2. An ability can be honed only once this way.

**Improve Control**: You learn to use one of your heroic abilities more efficiently, reducing its baseline Heroic Resource cost by 1 (to a minimum of 1). An ability can only be improved this way once.`,
		source: 'An NPC of a higher level, or records of such an NPC\'s teachings in a language you know',
		characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ]
	});

	static learnNewLanguage = FactoryLogic.createProject({
		id: 'project-learn-new-language',
		name: 'Learn New Language',
		description: 'When you start this project, choose a language taught by the project source. When the project is complete, you understand the language.',
		source: 'Texts or instruction that teaches the language you want to learn',
		characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
		goal: 120
	});

	static learnNewSkill = FactoryLogic.createProject({
		id: 'project-learn-new-skill',
		name: 'Learn New Skill',
		description: 'When you start this project, choose a skill taught by the project source. When the project is complete, you have that skill.',
		source: 'Texts or instruction that teaches the skill you want to learn',
		characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
		goal: 120
	});

	static perfectNewRecipe = FactoryLogic.createProject({
		id: 'project-learn-new-recipe',
		name: 'Perfect New Recipe',
		description: `
When you start this project, you choose a recipe for a specific type of dish. The item prerequisite for the project is the ingredients required, which depend on the recipe and which might be difficult to acquire depending on the recipe and its place of origin. You gain a +3 bonus to the project roll if the recipe is one from your culture.

When you complete the project, you can make five servings of food from the recipe as a respite activity whenever you have access to the ingredients. You and other creatures taking a respite with you can eat a serving of the food and gain its benefits (see below).

A creature who eats a serving of food from a particular type of recipe gains the listed benefit, which lasts until the creature takes another respite. 

| Type of Recipe  | Item Prerequisites                                                    | Benefit                                                                                                             |
|:----------------|:----------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------|
| Modern          | Common ingredients (flour, carrots, beef, and so forth)               | Hearty: The creature increases their Recoveries by 1 at the end of the respite in which the food is consumed.       |
| Vintage or home | Key ingredients (starfruit, kindleseeds, oarfish, and so forth)       | Comforting: When the creature fails a saving throw, they can choose to succeed instead. This benefit then ends.     |
| Ancient or lost | Rare or extinct ingredients (honeylilies, steel apples, and so forth) | Supernatural Power: The creature temporarily increases one of their characteristic scores by 1 (to a maximum of 6). |`,
		prerequisites: 'Varies',
		source: 'A recipe in a language you know, or someone who can tutor you in that recipe',
		characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
		goal: 100
	});

	static communityService = FactoryLogic.createProject({
		id: 'project-community-service',
		name: 'Community Service',
		description: `
When you start this project, you must be in a settlement or other location where people gather, and you must be in that same place each time you make a project roll for the project. You can undertake several Community Service projects at the same time, but each one must be in a different community.

While undertaking this project, you provide help to people in need, doing odd jobs, tutoring life skills, cleaning streets or public spaces, finding lost valuables, and the like. The Director determines the characteristic that applies to the project roll based on the activities you undertake. When you complete this project, you receive a random consumable treasure of the Director's choice from someone in the community as thanks for your hard work.`,
		characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
		goal: 75
	});

	static fishing = FactoryLogic.createProject({
		id: 'project-fishing',
		name: 'Fishing',
		description: `
Whether for sustenance, relaxation, or bragging rights, you've gone fishing, provided you are near a body of water. The project roll for this project has the following changes:

* The project points earned by your roll represent the relative size of the fish (or some other fishlike creature) you catch.
* During each respite when you undertake this activity, you continue making project rolls until you obtain a tier 1 outcome (indicating that a fish got away, earning you no points) or a breakthrough.
* When you obtain a breakthrough, the Director rolls on the Fishing Events table rather than you gaining points from the roll and making another project roll.
* When you've made your last Fishing project roll for the respite, you can spend the project points you accrued on a reward from the Tackle table. Any points you don't spend during the current respite are lost.

**Tackle**

| Reward                  | Cost | Effect                                                                                                                                                                                                                                                                                                                                                                                                    |
|:------------------------|:-----|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Hearty meal (1 serving) | 50   | A creature who eats a serving of a meal prepared with the fish caught during the project increases their Recoveries by 1 until the end of their next respite. A creature can benefit from only one serving of this meal or another like it (such as from the Perfect New Recipe project) at a time.                                                                                                       |
| Great meal (1 serving)  | 100  | A creature who eats a serving of a meal prepared with the fish caught during the project increases their Recoveries by 1 until the end of their next respite, and gains 10 temporary Stamina that lasts until the end of their next respite if it isn't lost first. A creature can benefit only from one serving of this meal or another like it (such as from the Perfect New Recipe project) at a time. |
| Better tackle           | 120  | You gain the **Angler** title.                                                                                                                                                                                                                                                                                                                                                                            |
| Fishing event           | 200  | You roll on the Fishing Events table.                                                                                                                                                                                                                                                                                                                                                                     |
| Legendary fisher        | 300  | You gain the **Goldenrod** title.                                                                                                                                                                                                                                                                                                                                                                         |

**Fishing Events**

| d10  | Event                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|:-----|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1    | While fishing, the hero reels in a talking fish. The fish informs the hero of any events that have occurred within 10 squares of the body of water where they were caught over the last week, or provides one piece of Forbidden Knowledge (see the Discover Lore project), as the Director determines.                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2    | While fishing, the hero reels in a note in a bottle. The note is written in Anjali and binds the reader into a deal with a powerful devil if read out loud. This gives the devil ownership of the reader’s soul in exchange for rolling an additional d10 on all future Fishing project rolls.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 3    | While the hero is fishing, passersby inform them of a rumor of a magic fishing rod that allows the fisher to double the size of the fish they reel in. The Director can decide whether the rumor is true, and if so, where the rod might be found.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 4    | While fishing, the hero reels in an **angulotl daybringer** (see Draw Steel: Monsters). The angulotl is insulted by the hero catching them, and threatens to summon heavy thunderstorms and drown the region in a flood. However, they can be negotiated with, and might provide the hero with one serving of an amazing meal if they stay on good terms. A creature who eats a serving of this meal increases their Recoveries by 1 until the end of their next respite, and gains 25 temporary Stamina that lasts until the end of their next respite if it isn’t lost first. A creature can benefit only from one serving of this meal or another like it (such as from the Perfect New Recipe project) at a time. |
| 5    | While fishing, the hero reels in half of a mysterious ancient treasure of the Director’s choice. If the other half is found, both halves magically meld together to restore the treasure.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 6    | While fishing, the hero is energized by fond memories of their life up to that point. They gain an edge on Presence tests until the end of their next respite.													                                                                                                                                                                                                                                                                                                                                                                          																															   |
| 7    | The hero reaches a new fishing milestone, gaining the **Master of Reels** title. 																																																																																																																																																								       |
| 8    | While fishing, the hero engages in relaxing meditation that grants an automatic breakthrough on another project they’re working on. Alternatively, they gain insight that grants an automatic breakthrough on another hero’s project of their choice. 																																																																																																																   |
| 9    | While fishing, the hero is pulled into the water by an ancient fish and must make a hard Might test. On a success, the hero reels in a humongous fish worth 100 points. On a failure, they end the current respite with 1 fewer Recoveries than usual. On a success with a complication, the hero obtains both outcomes. 																																																																																															   |
| 10   | While fishing, the hero notes what appears to be an underwater cavern. If the cavern is explored, it reveals a treasure of the Director’s choice guarded by a revenant knight fulfilling their duty until their captain returns. 																																																																																																																					   |`,
		characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ]
	});

	static spendTimeWithLovedOnes = FactoryLogic.createProject({
		id: 'project-spend-time-with-loved-ones',
		name: 'Spend Time With Loved Ones',
		description: 'You revitalize your spirit by spending time with people you love who you haven\'t seen in a long while. You must be able to communicate with those people to undertake this project or make project rolls for it. When you complete this project, your Stamina maximum increases by 12 + your level until the end of your next respite, and you can\'t start another Spend Time With Loved Ones project for a month.',
		characteristic: [ Characteristic.Presence ],
		goal: 60
	});
}
