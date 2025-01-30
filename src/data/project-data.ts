import { Characteristic } from '../enums/characteristic';
import { FactoryLogic } from '../logic/factory-logic';

export class ProjectData {
	static buildAirship = FactoryLogic.createProject({
		id: 'project-build-airship',
		name: 'Build Airship',
		prerequisites: 'Wind Crystal of Quintessence',
		source: 'Texts or lore in Old Sky Elf',
		characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Presence ],
		goal: 3000,
		effect: `
When you begin this project, you hire a crew of carpenters, mages, and shipwrights who work in the area where the project begins, with these artisans building the ship for you. You can make a project roll whenever you are overseeing the project, which you might be able to do remotely through the use of magic or psionics.

When the project is completed, you have an airship. You and any creatures you designate can operate the ship by touching the wheel. During combat, a creature touching the wheel of the ship can use a maneuver to make the ship move up to 10 squares. The ship can be moved only once per round. Out of combat, the ship has a speed of 130 miles per day.

An airship is an object (giving it immunity all to poison and psychic damage), and can take 200 damage before it is destroyed. If the damage the ship takes is not too severe (as the Director determines), as long as you have access to materials that can repair the ship, you can restore it back to its original condition as a respite activity.`
	});

	static buildRoad = FactoryLogic.createProject({
		id: 'project-build-road',
		name: 'Build or Repair Road',
		prerequisites: 'Three writs or approval, each from a different guild: one of engineers, one of masons, and one of guards',
		source: 'Texts or lore in Caelian',
		characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Presence ],
		effect: `
When you begin this project, you hire a crew of masons, engineers, and guards who work in the starting location where the project began and build or repair the road for you. You can make a project roll whenever you are overseeing the project, which you may be able to do remotely through the use of magic or psionics, provided you have the means.

The project points required to complete work on the road equals 10 × the road’s length in miles. The goal is cut in half if you are repairing an existing road, or someone else begins work on a second road project starting from the second location connecting to your first location.

| Project             | Renown Earned |
|:--------------------|:--------------|
| 25 Miles or less    | 1             |
| 26-50 Miles         | 1             |
| 51-100 Miles        | 2             |
| More than 100 Miles | 3             |

When you complete the project, you earn Renown with the people depending on the length of the road. Time spent traveling on the road is cut in half. Access to resources and knowledge is improved in both locations, giving you and your allies an edge on project rolls to discover lore while you are in the area.`
	});

	static craftTeleportationPlatform = FactoryLogic.createProject({
		id: 'project-craft-teleportation-platform',
		name: 'Craft Teleportation Platform',
		prerequisites: '1 spatial navigator',
		source: 'Texts or lore in Voll',
		characteristic: [ Characteristic.Reason ],
		goal: 1500,
		effect: 'When you complete this project, you end up with a 3 x 3 square teleportation platform with a magic password. The platform is permanently affixed to the ground where you create it. You can use the teleportation platform to instantly teleport any creatures or objects on the platform to a location or another teleportation platform with a magic password you know. Each time the teleportation platform is used, the chance of it malfunctioning and teleporting its contents to a random platform increases by 1% (to a maximum of 50%). When you have access to the platform, you can restore it back to its original condition as a respite activity.'
	});

	static findCure = FactoryLogic.createProject({
		id: 'project-find-cure',
		name: 'Find a Cure',
		prerequisites: 'Varies (see description)',
		characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
		effect: `
You research a cure for a disease, curse, or supernatural affliction that references this project as a way to end it. If the affliction was caused by another creature, you need the remains of that creature or another creature of the same kind as an item prerequisite for making the cure. For example, you can research the cure for the affliction of a werewolf’s Accursed Bite by studying the corpse of any werewolf, not just the one who did the biting. The number of project points it takes to complete this project is equal to the creature’s level times 50.

If the affliction is created by something other than a creature, such as an environmental effect, than the effect lists the item prerequisite and project points required to complete this project.

When you complete this project, you craft one dose of an alchemical cure for that affliction. Once the project is completed, you can craft subsequent doses for the same affliction in half the number of project points the initial project took.`
	});

	static imbueArmor = FactoryLogic.createProject({
		id: 'project-imbue-armor',
		name: 'Imbue Armor',
		prerequisites: 'Varies',
		source: 'Texts or lore in a language determined by the enhancement',
		characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
		goal: 150,
		effect: `
Armor imbued with an enhancement grants you special benefits while it is worn. Additionally, when your armor receives its 1st-level enhancement, it also grants a +6 Stamina bonus.

| Enhancement          | Item Prerequisite                                                                                | Project Source Language |
|:---------------------|:-------------------------------------------------------------------------------------------------|:------------------------|
| Awe                  | A lock of hair from a fey, taken in amicable bargain for Charming or in violence for Threatening | Khelt                   |
| Damage Immunity I    | Elemental sand left behind when an elemental enters Orden from Quintessence                      | Zaliac                  |
| Disguise             | The blood of a lycanthrope                                                                       | Khelt                   |
| Iridescent           | Fur from a lightbender                                                                           | Hyrallic                |
| Magic Resistance I   | A scale from a dragon                                                                            | The First Language      |
| Nettlebloom          | A rose from the enchanted hedge of a hag                                                         | Khelt                   |
| Phasing I            | Ichor from a destroyed wraith                                                                    | Szetch                  |
| Psionic Resistance I | Rare crystals that resonate with psionic energy, often found at sites of psionic experimentation | Voll                    |
| Swift                | The feather of a falcon slain as it was diving                                                   | Yllyric                 |
| Tempest I            | A strip of starmetal struck by lightning                                                         | Old Star Elf            |

**Awe**: When you begin this project, choose either Charming or Threatening. If you choose Charming, you gain an edge on Presence tests to win people other creatures over or make a good impression. If you choose Threatening, you gain an edge on Presence tests made to intimidate, coerce, or bully.

**Damage Immunity I**: When you begin this project, select three damage types. You have immunity 5 to those damage types.

**Disguise**: You can use a maneuver to cause this armor to appear as any type of clothing that you have been in the presence of—a noble’s dress, a guard’s uniform, a cultist’s robes, and so forth. The armor loses none of its protective qualities while transformed into other clothing.

**Iridescent**: When you are the sole target of an ability, you can use a free triggered action to reveal that the ability was targeting an afterimage of you in the same space as you. The power roll for the ability is treated as an 11. You can’t use this enhancement again until you earn a Victory.

**Magic Resistance I**: Your characteristic scores are considered 1 higher (to a maximum of 2) for the purpose of resisting the potencies of magic abilities.

**Nettlebloom**: Whenever you are grabbed by a creature adjacent to you, your armor sprouts toxic nettles. While an adjacent creature has you grabbed, they are weakened.

**Phasing I**: Once per turn, you can move through 1 square of solid matter. If you end your turn inside solid matter, you take 5 damage, which can’t be reduced in any way, and are shunted out into the space from which you entered it.

**Psionic Resistance I**: Your characteristic scores are considered 1 higher (to a maximum of 2) for the purpose of resisting the potencies of psionic abilities.

**Swift**: Your speed increases by 1.

**Tempest I**: As a maneuver, you can infuse this armor with the essence of a storm. The first time an adjacent creature makes deals damage to you before the end of your next turn, they take lightning damage equal to your highest characteristic score and you can push them 1 square.`
	});

	static imbueImplement = FactoryLogic.createProject({
		id: 'project-imbue-implement',
		name: 'Imbue Implement',
		prerequisites: 'Varies',
		source: 'Texts or lore in a language determined by the enhancement',
		characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
		goal: 150,
		effect: `
Implements are jewelry, orbs, staffs, tomes, wands, weapons, and other objects used by magic and psionic users to focus their power. You decide what object to imbue when you create an implement treasure, but it must be an object you can carry or wear. You must have a mundane version of the item you plan to imbue when you begin this project. An implement imbued with an enhancement grants you special benefits while it is wielded. Additionally, when an implement receives its 1st- level enhancement, it grants a +1 rolled damage bonus for your damage-dealing magic and psionic abilities.

| Enhancement     | Item Prerequisite                               | Project Source Language |
|:----------------|:------------------------------------------------|:------------------------|
| Berserking      | The tusk of a feral boar                        | Kalliak                 |
| Displacing I    | Slime from an ooze                              | Khelt                   |
| Elemental       | Ashes or other leavings from a natural disaster | The First Language      |
| Forceful I      | A lead slingstone that killed a giant           | High Kuric              |
| Rat Form        | One hundred rat pelts                           | Khamish                 |
| Rejuvenating I  | A singing quartz crystal                        | The First Language      |
| Seeking         | An inch-long needle carved from a diamond       | Caelian                 |
| Thought Sending | The brain of a psionic creature                 | Variac                  |
| Warding I       | Three skulls from the same chimera              | Zaliac                  |

**Berserking**: Whenever you damage a creature using a supernatural ability and obtain a tier 3 result on the power roll, that creature must make an opportunity attack against their nearest ally (if possible) after the ability’s effects resolve. This strike deals extra damage equal to the highest of your Reason, Intuition, or Presence scores.

**Displacing I**: Whenever you damage a creature using a supernatural ability and obtain a tier 3 result on the power roll, you can teleport that creature up to 2 squares after the ability’s effects resolve. If the creature started on a horizontal surface, they must end on a horizontal surface.

**Elemental**: Whenever you use an ability with the Air, Earth, Fire, Green, Rot, Void, or Water keyword, you can attune this implement to that element until the end of the encounter. While the implement is attuned, you gain an edge on power rolls with that elemental keyword. The implement can be attuned to only one element at a time.

**Forceful I**: Whenever you use a supernatural ability to push or pull a creature, you can move that creature an additional 2 squares.

**Rat Form**: As a maneuver, you can transform into a rat. Your equipment transforms with you. As a rat, you have a speed of 5 with the Climb keyword, your size is 1T, and you can see in the dark. You can speak and keep your skills while in rat form, but your Might becomes −5 and you lose all your regular abilities, features, and benefits. You can revert to your natural form as a maneuver, and do so automatically if you take any damage.

**Rejuvenating I**: Whenever you use an ability that costs 1 or more Heroic Resources, roll a d10. On a 9 or higher, you gain 1 Heroic Resource.

**Seeking**: Your ranged magic and psionic abilities gain a +2 distance bonus. Additionally, if you speak the name of a specific person, place, or object to the implement, the implement points toward that target, provided you are on the same world.

**Thought Sending**: Your ranged magic and psionic abilities gain a +2 distance bonus. Additionally, you can telepathically speak with any willing creature who knows a language and whose name you know, provided they are on the same world as you. You must initiate the conversation, but once you do, the creature can respond until you end the conversation.

**Warding I**: You gain a +6 Stamina bonus.
`
	});

	static imbueWeapon = FactoryLogic.createProject({
		id: 'project-imbue-weapon',
		name: 'Imbue Weapon',
		prerequisites: 'Varies',
		source: 'Texts or lore in a language determined by the enhancement',
		characteristic: [ Characteristic.Might, Characteristic.Reason, Characteristic.Intuition ],
		goal: 150,
		effect: `
A weapon imbued with an enhancement grants you special benefits while it is wielded. Additionally, when a weapon receives its 1st-level enhancement, it grants a +1 rolled damage bonus for your damage-dealing weapon abilities.

| Enhancement   | Item Prerequisite                                                    | Project Source Language |
|:--------------|:---------------------------------------------------------------------|:------------------------|
| Blood Bargain | The blood of a devil                                                 | Anjali                  |
| Chilling I    | A piece of ice from Quintessence that never melts                    | Yllyric                 |
| Disrupting I  | A vial of blood from a living saint                                  | Anjali                  |
| Hungering I   | Stomach bile from a gnoll pack leader                                | Proto-Ctholl            |
| Hurling       | A magnet made from rare metals                                       | Variac                  |
| Merciful A    | sprig of dockwart, a rare plant with natural anesthetic properties   | Yllyric                 |
| Terrifying I  | The preserved, intact amygdala of a mindkiller                       | Variac                  |
| Thundering I  | The heart of a lion, bear, or other large predatory animal           | Low Kuric               |
| Vengeance I   | The crown of an usurper                                              | Kalliak                 |
| Wingbane      | A sprig of dockwart, a rare plant with natural anesthetic properties | Yllyric                 |

**Blood Bargain**: As a maneuver, you can harm yourself with the weapon, taking 1d6 damage that can’t be reduced in any way. An ally within 5 squares can then spend a Recovery.

**Chilling I**: Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature takes 3 cold damage.

**Disrupting I**: Whenever you damage an undead using this weapon and leave that undead with 15 Stamina or less, they drop to 0 Stamina.

**Hungering I**: Whenever you damage a creature other than yourself using this weapon, you regain Stamina based on the tier result of the power roll—3 Stamina for tier 1, 5 for tier 2, and 8 for tier 3. You can’t regain this Stamina if you’re dying.

**Hurling**: Whenever you use an ability with a melee distance using this weapon, you can throw the weapon by treating the ability’s distance as Ranged 3 instead. When the ability is resolved, the weapon returns to your hand. Any ability used when you throw this weapon can’t impose the grabbed or restrained conditions.

**Merciful**: Whenever you reduce a non-undead to 0 Stamina using this weapon, the creature falls unconscious and wakes up 1d6 hours later. A creature with the Heal skill can wake the unconscious creature early with 1 minute of medical treatment. Whenever the creature wakes, they regain 1 Stamina.

**Terrifying I**: Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature takes 3 psychic damage.

**Thundering I**: Whenever you damage a creature using this weapon, you can push that creature up to 2 squares after the other effects of the ability resolve.

**Vengeance I**: Whenever you use this weapon with an ability against a creature who has dealt damage to you since the end of your last turn, you gain a +2 damage bonus on the ability.

**Wingbane**: Whenever you damage a flying creature using this weapon, that creature is also bleeding (save ends). While bleeding in this way, the creature takes 1 damage per square they fly. If the creature starts and ends their turn on the same solid surface, the bleeding condition ends.`
	});

	static discoverLore = FactoryLogic.createProject({
		id: 'project-discover-lore',
		name: 'Discover Lore',
		source: 'Texts or knowledge related to the subject you wish to research',
		characteristic: [ Characteristic.Reason ],
		effect: `
If you want to track the location of a lost treasure, decipher a ritual, or trace the lineage of a royal family to find the next heir to the throne, you can start a project to delve into whatever mysteries you seek to unravel. You might start a project to discover lore because the information can’t be discovered through a regular test, or you could do so because you failed a test to recall information and now want to learn it through research.

When you start a project to discover lore, you choose the lore you want investigated and the questions you want answered. The Director tells you if the lore you seek amounts to common, obscure, lost, or forbidden knowledge. The more esoteric the knowledge, the more project points are required to find the answers you seek.

When you begin a Discover Lore project, other creatures can also work on the project, using their respite activity to contribute a project roll to it in order to get the work done faster.

| Project             | Goal |
|:--------------------|:-----|
| Common knowledge    | 15   |
| Obscure knowledge   | 45   |
| Lost knowledge      | 120  |
| Forbidden knowledge | 240  |

**Common Knowledge**: Common knowledge is generally easy to discover with a day or so of research. It’s not known by every passerby and takes time to uncover, but with plentiful local sources for the information, you don’t need to spend a lot of time searching. It could be that you need to question several members of a rumor mill to figure out who a noble is not-so-secretly courting, or you might need to spend a few hours in a temple to find the particular religious text that carries a seldom-used alternative name for a deity.

**Obscure Knowledge**: Obscure knowledge is known only to specialized sages and is typically of interest only to those scholars. As such, precious few tomes are written on obscure subjects. Finding the right expert to interview or the best book to read typically requires several days of research. Uncovering the details of a ritual used to open and close a portal to the Sea of Stars isn’t easy information to come by, but there are people out there who know how to do it — and who wrote the instructions down.

**Lost Knowledge**: Lost knowledge is so esoteric that even among a field’s most dedicated scholars, there might be only one or two individuals who have dug deep enough to know that lore. Lost knowledge could come from a time so long ago that only a single text in a dead language now holds the lore you seek. Such lore often takes more than a week to hunt down. The location of a legendary steel dwarf’s workshop is most likely lore that is lost—except for one map hidden in a private collection.

**Forbidden Knowledge**: Forbidden knowledge is lore that a powerful individual or organization is attempting to keep secret. Those who know the secrets speak of them in whispered codes after passwords are exchanged, and write texts using ciphers. Hunting down leads and making sense of them typically takes weeks. The location of the dagger that slit the throat of the god of death is hidden behind layers of encoded text, and written in a dead language known only to that god’s most devout followers.`
	});

	static goUndercover = FactoryLogic.createProject({
		id: 'project-go-undercover',
		name: 'Go Undercover',
		prerequisites: 'Special',
		characteristic: [ Characteristic.Intuition, Characteristic.Presence ],
		goal: 15,
		effect: `
Going undercover to spy on a group of people is a cheap and easy way to find what you’re looking for. Choose an organization when you undertake this activity. Completing this project grants you access to maps, knowledge about an organization’s operations, or some other piece of knowledge that would be considered common or obscure. At the Director’s discretion, you must have a disguise, signet ring, tattoo, or some other indication that you belong to the organization in order to begin this project. Additionally, the Director can decide that the knowledge you seek may not be gained through this project but rather through adventuring.

**Complications**: This project has its own special complications. The first time you complete this project within an organization, you have a 25% chance of being caught. Each time you complete this project with the same organization, the chance of you being caught the next time you use it within the same organization increases by 25% and the project goal increases by 30. If you are caught going undercover, you are ruthlessly pursued by the organization you were infiltrating.

While your secret is safe, you may be called upon by the organization to complete a task you may not want to do. Failure to complete the task leads to you being caught.`
	});

	static honeCareerSkills = FactoryLogic.createProject({
		id: 'project-home-career-skills',
		name: 'Home Career Skills',
		characteristic: [ Characteristic.Intuition ],
		goal: 0,
		effect: `
You revisit your previous life and freshen up on the experience it provided you. When the project is complete, you have an edge on tests made with the skills provided by your career.

Project goal is 240 if your career granted you two skills, or 360 if your career granted you three skills.
`
	});

	static learnFromMaster = FactoryLogic.createProject({
		id: 'project-learn-from-a-master',
		name: 'Learn from a Master',
		source: 'An NPC with a higher level and the same class as you or another class with an ability you wish to learn or texts of their teachings in a language you know',
		characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
		effect: `
When you start a project with a master, you choose the goal you wish to work on as well as the benefit you would gain from it. The Director tells you if it is within the master’s ability to teach you what you’re looking for. Alternatively, you may stumble upon the left behind teachings of a master, and learning from them may fit into one of the following goals.

| Project         | Goal  |
|:----------------|:------|
| Hone Ability    | 120   |
| Improve Control | 500   |
| Acquire Ability | 1,000 |

**Hone Ability**: You sharpen the potency of one of your abilities of your choice. Choose between adding a +1/+1/+1 damage bonus to the ability or improving the distance of a ranged ability by 2. An ability can only be honed this way once.

**Improve Control**: You’ve learned efficient use of one of your heroic abilities. Reduce its initial heroic resource cost by 1 (to a minimum of 1). An ability can only receive this benefit once.

**Acquire Ability**: If your master’s class is different than yours, they give you a taste of another way. You gain one Signature Ability from the master’s class. If your master is a tactician, you can gain the Strike Now ability instead. You can’t gain another from their class.`
	});

	static learnNewLanguage = FactoryLogic.createProject({
		id: 'project-learn-new-language',
		name: 'Learn New Language',
		source: 'Texts or instruction that teach the language you want to learn',
		characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
		goal: 120,
		effect: 'When you start this project, choose a language taught by the project source. When the project is complete, you understand the language.'
	});

	static learnNewRecipe = FactoryLogic.createProject({
		id: 'project-learn-new-recipe',
		name: 'Learn New Recipe',
		prerequisites: 'Varies',
		source: 'Recipe in a language you know or a cook tutor',
		characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
		goal: 100,
		effect: `
You practice being able to reliably follow a recipe for a dish. The ingredients required depend on the recipe being followed, which may be easier or harder to acquire based on the degrees of separation you have from the recipe’s origin. When you complete this project, you can make 5 servings of the specific recipe as a respite activity whenever you have access to the ingredients. You and each creature taking a respite with you can a serving and gain its benefits until they take another respite. A creature can only benefit from one recipe at a time and can’t benefit from more than one serving of a recipe at a time.

The recipes in the Recipes table detail the effects consuming a serving of the recipe confers.

* **Comforting**: When you fail a saving throw, you can choose to succeed instead. This benefit then disappears.
* **Hearty**: You gain 1 additional Recovery.
* **Supernatural Power**: You increase the value of one of your characteristic scores by 1. This can increase your characteristics to 6.

| Project         | Item Prerequisites                                                | Benefits           |
|:----------------|:------------------------------------------------------------------|:-------------------|
| Modern          | Common Ingredients (examples: flour, carrots, beef)               | Hearty             |
| Vintage or Home | Key Ingredients (examples: starfruit, kindleseeds, oarfish)       | Comforting         |
| Ancient or Lost | Rare / Extinct Ingredients (examples: honeylillies, steel apples) | Supernatural Power |

You gain +3 to the project roll if it's a recipe from your culture.`
	});

	static communityService = FactoryLogic.createProject({
		id: 'project-community-service',
		name: 'Community Service',
		characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
		goal: 75,
		effect: `
When you begin this project, you must be in a settlement or other place where people gather, and you must be in that place each time you make a project roll for the project. You can undertake several Community Service projects, each one in a different community.

While undertaking this project, you provide help to people in need, doing odd jobs, tutoring life skills, cleaning statues, finding lost valuables, or the like. The Director determines the characteristic that applies to the project roll based on the activities you undertake. When you complete this project, you receive a random consumable of the Director’s choice as thanks for your hard work.`
	});

	static fishing = FactoryLogic.createProject({
		id: 'project-fishing',
		name: 'Fishing',
		characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Presence ],
		effect: `
You’ve gone fishing, provided you are near a body of water. The project roll for this project has the following changes:

* The points you roll represent the length of the fish (or fish-like creature) you catch.
* During each respite when you undertake this activity, you continue making project rolls until you get an 11 or lower (fish got away, earning you no points) or a breakthrough.
* A breakthrough results in rolling on the fishing events table instead of additional points or another project roll.

When you finish rolling, you can spend the points you earned on a reward from the Tackle table. Any points you don’t spend during this respite activity are lost.

| Reward                  | Cost | Effect                                                                                                                                                                                                                                                                                                      |
|:------------------------|:-----|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Hearty Meal (1 serving) | 50   | A serving of this meal gives the eater 1 additional Recovery that lasts until their next respite. A creature can only benefit from 1 serving of this meal or another (like from the Learn a New Recipe project) at a time.                                                                                  |
| Better Tackle           | 120  | You gain the following title. Angler: You have an edge on all Fishing project rolls.                                                                                                                                                                                                                        |
| Great Meal (1 serving)  | 100  | A serving of this meal gives the eater 1 additional Recovery and 10 Temporary Stamina that lasts until the end of their next respite if it doesn’t disappear through damage first. A creature can only benefit from 1 serving of this meal or another (like from the Learn a New Recipe project) at a time. |
| Fishing Event           | 200  | You invoke a fishing event as if you got a breakthrough.                                                                                                                                                                                                                                                    |
| Legendary Fisher        | 300  | You gain the following title. Goldenrod: While undertaking the Fishing project, you can ignore the results of one project roll.                                                                                                                                                                             |
`
	});

	static spendTimeWithLovedOnes = FactoryLogic.createProject({
		id: 'project-spend-time-with-loved-ones',
		name: 'Spend Time With Loved Ones',
		characteristic: [ Characteristic.Presence ],
		goal: 60,
		effect: 'You revitalize your spirit by spending time with people you love who you haven’t seen in a long while. You must be able to communicate with them in order to undertake this project and make project rolls for it. When you complete this project, your Stamina maximum increases by 12 + your level until the end of your next respite. You can’t start another Spend Time with Loved Ones project for 1 month.'
	});
}
