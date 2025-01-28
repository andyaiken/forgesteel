import { AbilityKeyword } from '../enums/ability-keyword';
import { FactoryLogic } from '../logic/factory-logic';
import { FeatureType } from '../enums/feature-type';
import { Perk } from '../models/perk';
import { PerkList } from '../enums/perk-list';

export class PerkData {
	static areaOfExpertise: Perk = {
		id: 'perk-area-of-expertise',
		name: 'Area of Expertise',
		description: 'Choose one skill from the crafting skill group that you have. When you roll an 11 or lower on an easy or medium test with this skill, you instead take the 12-16 result. Additionally, if you spend 1 minute inspecting an object related to this skill, you can approximate its value and learn of any flaws in its construction.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static expertArtisan: Perk = {
		id: 'perk-expert-artisan',
		name: 'Expert Artisan',
		description: 'Whenever you make a test as part of a research or crafting project that uses a skill you have from the crafting skill group, you can roll the test twice and use either roll.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static handy: Perk = {
		id: 'perk-handy',
		name: 'Handy',
		description: 'When you make a test to craft something and don’t have a skill that applies, you gain a +1 bonus to the roll.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static homesteader: Perk = {
		id: 'perk-homesteader',
		name: 'Homesteader',
		description: 'You gain an artisan follower, in addition to followers you acquire through renown or other means.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static improvisationCreation: Perk = {
		id: 'perk-improvisation-creation',
		name: 'Improvisation Creation',
		description: 'Even without tools, you can quickly jury-rig a mundane item or repair a mundane piece of equipment related to a skill you have from the crafting skill group without needing to make a test. That items works for 1 hour or 1 use (whichever comes first) then breaks beyond repair. For example, if you have the carpentry skill, you can repair a rickety wooden bridge long enough for a group of creatures to cross it or build a simple shovel made of wood that works for 1 hour.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static inspiredArtisan: Perk = {
		id: 'perk-inspired-artisan',
		name: 'Inspired Artisan',
		description: 'When you make a project roll using a skill from the crafting skill group that you have, you can spend a hero token to make another project roll for the same project as part of the same respite activity. You can’t use this perk more than once per respite.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static travellingArtisan: Perk = {
		id: 'perk-travelling-artisan',
		name: 'Travelling Artisan',
		description: 'On a day when you don’t take a respite, you can spend an uninterrupted hour working on a crafting project that uses a crafting skill you have. If you do so, you gain 1d10 points toward that project.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Crafting
	};

	static brawny: Perk = {
		id: 'perk-brawny',
		name: 'Brawny',
		description: 'When you fail a Might test, you can roll a d6. You lose Stamina equal to the roll and improve the result of your test by one tier. You can use this perk only once per test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static camouflageHunter: Perk = {
		id: 'perk-camouflage-hunter',
		name: 'Camouflage Hunter',
		description: 'While in the wilderness, once you are hidden from a creature, you don’t need cover or concealment from them to stay hidden.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static dangerSense: Perk = {
		id: 'perk-danger-sense',
		name: 'Danger Sense',
		description: 'When in a natural environment that isn’t in a settlement, you have an edge on all tests made with the Alertness skill, and you cannot be surprised. Additionally, you’re attuned to the instincts of wildlife and know if a natural disaster is imminent within the next 72 hours. You don’t know exactly what it will entail.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static friendCatapult: Perk = {
		id: 'perk-friend-catapult',
		name: 'Friend Catapult',
		description: '',
		type: FeatureType.Ability,
		data: {
			ability: FactoryLogic.createAbility({
				id: 'perk-friend-catapult-1',
				name: 'Friend Catapult',
				description: 'You hurl your ally through the air.',
				type: FactoryLogic.type.createManeuver(),
				keywords: [],
				distance: [ FactoryLogic.distance.createSelf() ],
				target: 'Self',
				effect: 'You grab a willing, adjacent ally or object of your size or smaller and hurl them a number of squares equal to twice your Might score in any direction. If they fall as a result of this movement, their fall distance is reduced by a number equal to twice your Might score. You can\'t use this perk again until you gain at least 1 Victory.'
			})
		},
		list: PerkList.Exploration
	};

	static iveGotYou: Perk = {
		id: 'perk-ive-got-you',
		name: 'I\'ve Got You',
		description: '',
		type: FeatureType.Ability,
		data: {
			ability: FactoryLogic.createAbility({
				id: 'perk-ive-got-you-1',
				name: 'I\'ve Got You',
				description: 'You catch a falling ally at the last possible moment.',
				type: FactoryLogic.type.createTrigger('A willing ally lands on you when they fall.'),
				keywords: [],
				distance: [ FactoryLogic.distance.createSelf() ],
				target: 'Self',
				effect: 'You catch your ally. Neither of you takes damage from the fall.'
			})
		},
		list: PerkList.Exploration
	};

	static monsterWhisperer: Perk = {
		id: 'perk-monster-whisperer',
		name: 'Monster Whisperer',
		description: 'You can use the Handle Animals skill to interact with non-sapient monsters who are not animals.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static putYourBackIntoIt: Perk = {
		id: 'perk-put-your-back-into-it',
		name: 'Put Your Back Into It',
		description: 'Once per montage test, you can turn an ally’s tier 1 test result into a tier 2 result. Additionally, if you make a test to assist a test and a get a tier 1 result, you don’t add a bane to the assisted test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static survivalist: Perk = {
		id: 'perk-survivalist',
		name: 'Survivalist',
		description: 'While in the wilderness, you can spend 1 hour searching a 1-mile-radius area of land and find a safe location suitable for a respite (if one exists).',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static teamwork: Perk = {
		id: 'perk-teamwork',
		name: 'Teamwork',
		description: 'When you take your first turn during a montage test, you can both make a test and assist another hero’s test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static teamLeader: Perk = {
		id: 'perk-team-leader',
		name: 'Team Leader',
		description: 'At the start of a group test or montage test, you can spend a hero token. If you do, all participants make tests as if they also had your exploration skills.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static woodWise: Perk = {
		id: 'perk-wood-wise',
		name: 'Wood Wise',
		description: 'When you make a test with an exploration skill and at least one of the d10s rolled is a 1, you can reroll one d10. You can only use this perk once per test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Exploration
	};

	static charmingLiar: Perk = {
		id: 'perk-charming-liar',
		name: 'Charming Liar',
		description: `
If you fail a test with the Lie skill, you don’t suffer any consequences associated with the failure. You can’t benefit from this perk again until you gain at least 1 Victory.

During a negotiation, you can be caught in one lie without negative consequences. You can’t benefit from this perk again until you gain at least 1 Victory.`,
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static cunningPlan: Perk = {
		id: 'perk-cunning-plan',
		name: 'Cunning Plan',
		description: 'When you have at least 10 minutes to plan before going into a negotiation, you can declare a goal and offer up at least one piece of information you have about that NPC that will enable you to achieve that goal. If this intel is accurate and meaningful, you gain 1 Hero token which can be used to achieve that goal. If you have additional information, or your information is particularly extensive, you can gain a second Hero token at the Director’s discretion.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static dazzler: Perk = {
		id: 'perk-dazzler',
		name: 'Dazzler',
		description: 'When a creature watches you perform a song, dance, or role (as an actor, not in disguise) for at least 1 minute, you gain an edge on tests made to influence that creature for 1 hour after the performance ends.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static engrossingMonologue: Perk = {
		id: 'perk-engrossing-monologue',
		name: 'Engrossing Monologue',
		description: 'When you are not in combat, you can shout to get the attention of all creatures within 10 squares of you. Each creature who is not hostile toward you listens to what you have to say for at least the next minute, or until they sense danger or any form of imminent harm. While creatures are listening to you, your allies gain an edge on tests made to avoid being noticed by those creatures.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static fastNegotiator: Perk = {
		id: 'perk-fast-negotiator',
		name: 'Fast Negotiator',
		description: 'At the start of a negotiation, you can learn one negotiation motivation or pitfall (your choice) of an NPC in the negotiation.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static harmonizer: Perk = {
		id: 'perk-harmonizer',
		name: 'Harmonizer',
		description: `
For you, music is a universal language.

* You can make a Presence test with the music skill to influence creatures even if you don’t share a language.
* Once during a negotiation when an ally makes an argument, you can play music to give them an edge on their test.`,
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static lieDetector: Perk = {
		id: 'perk-lie-detector',
		name: 'Lie Detector',
		description: 'After another creature communicates with you, you can spend a hero token to determine whether what that creature communicated had any lies. If so, you know what the lies are, but not what the truth is.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static openBook: Perk = {
		id: 'perk-open-book',
		name: 'Open Book',
		description: 'When you have a chance to speak one-on-one with someone, you can ask them one question about themself. If they choose to answer honestly, they can immediately ask you a question about yourself in turn, which you must answer honestly. If they choose not to answer honestly, they simply deflect or redirect the question, no further complications result from the prying.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static pardonMyFriend: Perk = {
		id: 'perk-pardon-my-friend',
		name: 'Pardon My Friend',
		description: 'When an ally within 5 squares of you fails a Presence test, you can step in and make a Presence test with a bane. Your new roll replaces their roll. This feature can only be used once per test, regardless of how many heroes have it.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static persistent: Perk = {
		id: 'perk-persistent',
		name: 'Persistent',
		description: 'In a negotiation, when a creature’s patience reaches 0, you can make one last argument before the negotiation is over. Only one hero can use this perk per negotiation.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static powerPlayer: Perk = {
		id: 'perk-power-player',
		name: 'Power Player',
		description: 'When you make a test that uses the Brag, Flirt, or Intimidate skills, you can use Might in place of another characteristic used as part of the test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static soTellMe: Perk = {
		id: 'perk-so-tell-me',
		name: 'So, Tell Me ...',
		description: 'When you succeed on a Presence test to influence another creature, you can ask one creature you influenced a follow-up question after the test resolves, which they must answer honestly. At the Director’s discretion, the creature doesn’t have to answer the question completely or at all if the response would put them or a loved one in danger.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static spotTheTell: Perk = {
		id: 'perk-spot-the-tell',
		name: 'Spot The Tell',
		description: 'When you make a test to read a person and get a tier 3 result, you notice several tells that give away their true feelings. Any test you make to read that person in the future, you gain an edge on the test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Interpersonal
	};

	static criminalContacts: Perk = {
		id: 'perk-criminal-contacts',
		name: 'Criminal Contacts',
		description: 'You have access to a network of criminal contacts. As a respite activity during a respite in a settlement, you can ask a question of your contacts. Make a Presence test. On a tier 2 result, you gain knowledge that would be common among criminals (e.g. the secret entrances into a building, the location of a local, hidden criminal, the name of a local thieves’ guild leader). On a tier 3 result, you can also gain knowledge that would be uncommon among criminals, if such information exists (e.g. the location of a local treasure stock, the location of a murder weapon used in a noble’s assassination, the name of an NPC secretly bankrolling a local assassin’s guild).',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Intrigue
	};

	static forgettableFace: Perk = {
		id: 'perk-forgettable-face',
		name: 'Forgettable Face',
		description: 'If you interact with a creature for less than 10 minutes and they haven’t met you before in the past, you can cause them to forget your face when you part. If asked to describe you, they give only a vague, blank, and unhelpful description. Additionally, if you spend at least 1 hour assembling a disguise, creatures who meet you in that disguise do not recognize your true face later from when you were in disguise.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Intrigue
	};

	static gumUpTheWorks: Perk = {
		id: 'perk-gum-up-the-works',
		name: 'Gum Up The Works',
		description: '',
		type: FeatureType.Ability,
		data: {
			ability: FactoryLogic.createAbility({
				id: 'perk-gum-up-the-works-1',
				name: 'Gum Up The Works',
				description: 'You prevent a trap from activating.',
				type: FactoryLogic.type.createTrigger('A mundane trap activates within 3 squares of you.'),
				keywords: [],
				distance: [ FactoryLogic.distance.createSelf() ],
				target: 'Self',
				effect: 'You can move up to 3 squares toward the trap. If you’re adjacent to any of the trap’s mechanisms after this movement, you jam the trap, preventing it from activating. So long as you stay adjacent to the mechanism, the trap can’t go off. If an attempt to disarm the trap you are stall fails, it goes off.'
			})
		},
		list: PerkList.Intrigue
	};

	static luckyDog: Perk = {
		id: 'perk-lucky-dog',
		name: 'Lucky Dog',
		description: 'When you fail a test using any skill from the intrigue skill group, you can roll a d6. You lose Stamina equal to the roll and improve the result of your test by one tier. You can use this perk only once per test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Intrigue
	};

	static masterOfDisguise: Perk = {
		id: 'perk-master-of-disguise',
		name: 'Master of Disguise',
		description: 'You can don or remove a disguise as part of any Hide test you make or while taking the Hide maneuver.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Intrigue
	};

	static slippedLead: Perk = {
		id: 'perk-slipped-lead',
		name: 'Slipped Lead',
		description: 'You have an edge on checks made to escape bonds. Given at least 1 minute uninterrupted, you can escape any mundane bonds without making a test. Additionally, it’s not immediately obvious when you’ve escaped bonds until you use an ability that harms other creatures, cast them off, or do something else obvious that makes it clear you are unbound.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Intrigue
	};

	static butIKnowWhoDoes: Perk = {
		id: 'perk-but-i-know-who-does',
		name: 'But I Know Who Does',
		description: 'When you fail a test to recall lore with a skill from the lore skill group that you have, you know the closest place where the information you seek with that test can be found. It could be a sage, in a library, or somewhere deep in a dungeon. The Director determines the source’s location.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static eideticMemory: Perk = {
		id: 'perk-eidetic-memory',
		name: 'Eidetic Memory',
		description: 'Your mind is an encyclopedia, though not always an easy one to organize. After finishing a respite, choose one skill from the lore skill you don’t have. You gain that skill until you finish a respite. Additionally, if you spend at least 1 minute reading a page of text, you can memorize its contents. You can memorize entire books this way.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static expertSage: Perk = {
		id: 'perk-expert-sage',
		name: 'Expert Sage',
		description: 'Whenever you make a test as part of a research or crafting project that uses a skill you have from the lore skill group, you can roll the test twice and use either roll.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static iveReadAboutThisPlace: Perk = {
		id: 'perk-ive-read-about-this-place',
		name: 'I\'ve Read About This Place',
		description: `
When you enter a settlement you’ve never been to before, you can ask the Director one of the following questions:

* Who’s the most influential public figure in this settlement?
* Who in this town would be friendly to us right now?
* What does this settlement need most from outsiders?

If the Director does not have an answer to the question you ask, you can instead ask a different question.`,
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static linguist: Perk = {
		id: 'perk-linguist',
		name: 'Linguist',
		description: 'You have an ear for languages.',
		type: FeatureType.Multiple,
		data: {
			features: [
				FactoryLogic.feature.create({
					id: 'perk-linguist-1',
					name: 'Linguist',
					description: 'If you spend at least 7 days in a place where you regularly hear a language you don’t know spoken, you can pick up enough of that language to hold a conversation, though you still can’t read it. After doing so, you can learn it twice as fast as normal.'
				}),
				FactoryLogic.feature.createLanguageChoice({
					id: 'perk-linguist-2',
					count: 2
				})
			]
		},
		list: PerkList.Lore
	};

	static polymath: Perk = {
		id: 'perk-polymath',
		name: 'Polymath',
		description: 'When you make a test to recall lore and don’t have a skill that applies to the test, you gain a +1 bonus to the test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static specialist: Perk = {
		id: 'perk-specialist',
		name: 'Specialist',
		description: 'You are a leading expert on a particular subject. Choose one skill you have from the lore skill group. You always have a double edge on tests made to recall lore that use this skill. Additionally, you have at least one major contribution to this field, such as a thesis, field guide, gazetteer, or even an ongoing newsletter you maintain. This contribution grants you notoriety in your field. You treat your Renown as 1 higher when negotiating with people who know of your work, or 2 higher if they have the skill that you chose for this perk.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static travellingSage: Perk = {
		id: 'perk-travelling-sage',
		name: 'Travelling Sage',
		description: 'On a day when you don’t take a respite, you can spend an uninterrupted hour working on a research project that uses a lore skill you have. If you do so, you gain 1d10 points toward that project.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Lore
	};

	static arcaneTrick: Perk = {
		id: 'perk-arcane-trick',
		name: 'Arcane Trick',
		description: 'You cast an entertaining spell that creates a minor but impressive magical effect.',
		type: FeatureType.Ability,
		data: {
			ability: FactoryLogic.createAbility({
				id: 'perk-arcane-trick-1',
				name: 'Arcane Trick',
				description: 'You cast an entertaining spell that creates a minor but impressive magical effect.',
				type: FactoryLogic.type.createAction(),
				keywords: [ AbilityKeyword.Magic ],
				distance: [ FactoryLogic.distance.createSelf() ],
				target: 'Self',
				effect: `
Choose one of the following effects:

* You teleport an unattended size 1T or 1S object within 1 square of you to an unoccupied space within 1 square of you.
* Until the start of your next turn, a part of your body shoots a shower of harmless noisy sparks that give off light within 1 square of you.
* You ignite or snuff out (your choice) every mundane light source within 1 square of you.
* You make up to 1 pound of edible food you can touch taste delicious or disgusting.
* Until the start of your next turn, you make your body exude a particular odor you’ve smelled before. This smell can be sensed by creatures within 5 squares of you, but can’t impose any condition or other drawback on creatures.
* You place a small magical inscription on the surface of a mundane object you can touch, or remove an inscription that was made by you or by another creature using Arcane Trick.
* You cover a size 1T object that you touch with an illusion that makes it look like another object. A creature who handles the object can see through the illusion. The illusion ends when you stop touching the object.`
			})
		},
		list: PerkList.Supernatural
	};

	static creatureSense: Perk = {
		id: 'perk-creature-sense',
		name: 'Creature Sense',
		description: '',
		type: FeatureType.Ability,
		data: {
			ability: FactoryLogic.createAbility({
				id: 'perk-creature-sense-1',
				name: 'Creature Sense',
				description: 'You intuit a creature\'s keywords.',
				type: FactoryLogic.type.createManeuver(),
				keywords: [],
				distance: [ FactoryLogic.distance.createSelf() ],
				target: 'Self',
				effect: 'You magically learn the keywords a creature of lower level within 10 squares of you has in their stat block (e.g. “Demon,” “Humanoid,” or “Undead”).'
			})
		},
		list: PerkList.Supernatural
	};

	static familiar: Perk = {
		id: 'perk-familiar',
		name: 'Familiar',
		description: `
A magic spirit, which has taken the form of a specific small animal or animate object, has chosen to be your familiar — or to adopt you as its familiar. The familiar can’t perform activities that require hands, and it can’t harm other creatures or objects. It can provide flanking benefits only to you. The familiar uses the familiar stat block.

If the familiar is destroyed, you can restore them as a respite activity or by spending a Recovery as an action to bring them back into existence into an unoccupied space adjacent to you.`,
		type: FeatureType.Text,
		data: null,
		list: PerkList.Supernatural
	};

	static invisibleForce: Perk = {
		id: 'perk-invisible-force',
		name: 'Invisible Force',
		description: '',
		type: FeatureType.Ability,
		data: {
			ability: FactoryLogic.createAbility({
				id: 'perk-invisible-force-1',
				name: 'Invisible Force',
				description: 'You manipulate a tiny object with your mind.',
				type: FactoryLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Psionic ],
				distance: [ FactoryLogic.distance.createRanged() ],
				target: '1 size 1T unattended object',
				effect: 'You can grab or manipulate the target with your mind. You can move the object up to a number of squares equal to your Reason, Intuition, or Presence score (your choice). You can use this ability to turn doorknobs, pull levers, and manipulate other smaller, movable pieces of a larger object as long as the piece you\'re manipulating is unattended and size 1T (though you can’t use this ability to break smaller piece off of a larger object).'
			})
		},
		list: PerkList.Supernatural
	};

	static psychicWhisper: Perk = {
		id: 'perk-psychic-whisper',
		name: 'Psychic Whisper',
		description: '',
		type: FeatureType.Ability,
		data: {
			ability: FactoryLogic.createAbility({
				id: 'perk-psychic-whisper-1',
				name: 'Psychic Whisper',
				description: 'You send a one-way telepathic message to a friend.',
				type: FactoryLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Psionic ],
				distance: [ FactoryLogic.distance.createRanged() ],
				target: '1 ally who understands at least one language',
				effect: 'You send a telepathic message to the target that takes 10 seconds or less to speak.'
			})
		},
		list: PerkList.Supernatural
	};

	static thingspeaker: Perk = {
		id: 'perk-thingspeaker',
		name: 'Thingspeaker',
		description: `
When you hold an object in your hand, you can ask the Director if it bears emotional importance. Objects with emotional resonance could include treasured gifts, murder weapons, or personal keepsakes. If the answer is yes, the Director tells you the most dominant emotion associated with the object, and you can spend 1 uninterrupted minute focusing on the object, at the end of which you receive a vision which answers one of the following questions:

* What was the name of the person whose emotions are imprinted on this object?
* Why does this emotion linger on the object?
* How long has it been since this was held by the person whose emotions linger on it?

After asking one question, you can choose to delve deeper. You ask one additional question from the list, after which you are overcome with emotions that do not belong to you. You take a bane on Presence and Intuition tests until you finish a respite. While you suffer this bane, you can’t use this feature.`,
		type: FeatureType.Text,
		data: null,
		list: PerkList.Supernatural
	};

	static ritualist: Perk = {
		id: 'perk-ritualist',
		name: 'Ritualist',
		description: 'You can spend 1 minute performing a magic ritual of blessing. At the end of the ritual, touch one willing creature, including yourself. The creature gains a double edge on the next test they make within the next minute. A creature can’t use this benefit on an activity that takes longer than a minute.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Supernatural
	};
}
