import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { AbilityLogic } from '../../logic/ability-logic';
import { Characteristic } from '../../enums/characteristic';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';
import { HeroClass } from '../../models/class';
import { SkillList } from '../../enums/skill-list';

export const troubadour: HeroClass = {
	id: 'class-troubadour',
	name: 'Troubadour',
	description: `
The whole world's a stage and everyone on it, an actor. No one knows this better than the troubadour. You find energy in the drama of everyday life and know how to draw spectacle forth from even the most mundane of situations. You accent highs and deepen lows in service to whomever would witness your performance.
And beyond the mundane, there are insurmountable dangers that cause many a hero to cower. But the troubadour must chase that drama. The troubadour takes the world stage not to die, but to find out if they are truly alive.`,
	heroicResource: 'Drama',
	subclassName: 'Class Act',
	subclassCount: 1,
	primaryCharacteristics: [ Characteristic.Agility, Characteristic.Presence ],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FeatureLogic.feature.createBonusFeature({
					id: 'troubadour-stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 9
				}),
				FeatureLogic.feature.createBonusFeature({
					id: 'troubadour-recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FeatureLogic.feature.createSkillFeature({
					id: 'troubadour-1-1',
					skill: 'Read Person'
				}),
				FeatureLogic.feature.createSkillChoiceFeature({
					id: 'troubadour-1-2',
					listOptions: [ SkillList.Interpersonal ],
					count: 2
				}),
				FeatureLogic.feature.createSkillChoiceFeature({
					id: 'troubadour-1-3',
					listOptions: [ SkillList.Intrigue, SkillList.Lore ]
				}),
				FeatureLogic.feature.createFeature({
					id: 'troubadour-1-4',
					name: 'Drama',
					description: `
At the start of each of your turns during combat, you gain 1d3 drama.
Additionally, you gain drama when certain events occur during battle:
* **2 Drama**: Three or more heroes use an ability on the same turn for the first time.
* **2 Drama**: A hero becomes winded for the first time (only once per encounter and not once per hero).
* **3 Drama**: A creature within your line of effect rolls a natural 19 or 20.
* **10 Drama**: A hero, including you, dies.

You still gain drama during combat if you are dead as long as your body is intact. During the encounter in which you died, if you have 30 drama, you can come back to life with 1 Stamina and 0 drama (no action required). You can’t gain drama in future encounters while you remain dead.`
				}),
				FeatureLogic.feature.createFeature({
					id: 'troubadour-1-5',
					name: 'Scene Partner',
					description: 'Whenever you use a skill from the interpersonal group on a test while interacting with an NPC (a bystander, a rival, and so forth) and you don’t fail the test, you can form a bond with that NPC. If you then enter into a negotiation with this NPC, their patience increases by 1, and any compelling arguments you personally make to the NPC that would increase their interest by 1 instead increase their interest by 2. You can have a number of such bonds active equal to your level, losing a bond of your choice whenever you make a new bond beyond your limit.'
				}),
				FeatureLogic.feature.createFeature({
					id: 'troubadour-1-6',
					name: 'Curtain Call',
					description: 'You enter every performance with a set of routines at the ready. Routines are auras and other wide-reaching effects that have the Routine keyword, and which center around you while you move through the fray. At the start of each round of combat, as long as you are not dazed, dead, or surprised, you can either set a new routine to be active or maintain your current routine (no action required). Your routine ends if you are unable to maintain it, or at the end of the encounter.'
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'troubadour-1-7',
						name: 'Choreography',
						description: 'Taps, kicks, steps. Now it’s all “choreography.”',
						type: AbilityLogic.type.createNoAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Routine ],
						distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
						target: 'Self and each ally in the area',
						effect: 'While this routine is active, each target who starts their turn in the aura gains a +2 bonus to speed until the end of their turn.'
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'troubadour-1-8',
						name: 'Revitalizing Limerick',
						description: 'There once was a man from Capital…',
						type: AbilityLogic.type.createNoAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Routine ],
						distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
						target: 'Self and each ally in the area',
						effect: 'While this routine is active, choose a number of targets equal to your Presence score at the end of your turn. Each chosen target can spend a Recovery.'
					})
				}),
				FeatureLogic.feature.createKitChoiceFeature({
					id: 'troubadour-1-9'
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'troubadour-1-10',
					cost: 0
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'troubadour-1-11',
					cost: 3
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'troubadour-1-12',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FeatureLogic.feature.createFeature({
					id: 'troubadour-2-1',
					name: 'Appeal to the Muses',
					description: `
You can give a rousing speech, invoke your inspirations, or lift your fellows’ spirits to heighten the drama of your present circumstances. However, irony is eager to hand your fortune to the villain and achieve the same ends.
Whenever you roll to gain 1d3 drama at the start of your turn, you can make your appeal to gain the following additional effects:
* If the roll is a 1, you gain 1 additional drama. The Director also gains 1d3 Malice.
* If the roll is a 2, you gain 1 Heroic Resource, which you can keep for yourself or give to an ally within the distance of your active routine. The Director also gains 1 Malice.
* If the roll is a 3, you gain 2 Heroic Resources, which you can distribute among yourself and any allies within the distance of your active routine.`
				}),
				FeatureLogic.feature.createChoiceFeature({
					id: 'troubadour-2-2',
					name: 'Invocation',
					options: [
						{
							feature: FeatureLogic.feature.createFeature({
								id: 'troubadour-2-2a',
								name: 'Allow Me To Introduce Tonight\'s Players',
								description: 'Whenever you take the first turn in a combat encounter, you can use your action to introduce yourself and your allies to your opponents. Each creature on your side can shift up to their speed and gains the benefit of the Defend action until the end of the round. However, any enemies who were surprised are no longer surprised.'
							}),
							value: 1
						},
						{
							feature: FeatureLogic.feature.createFeature({
								id: 'troubadour-2-2b',
								name: 'Formal Introductions',
								description: `
As a respite activity, you can scribe a notice of your arrival, such as a calling card or a formal letter, addressed to an enemy and have it delivered. You can deliver the notice to the target personally if you are in the same general area, send it by courier, or leave it in a covert location for the target to find. You can have only one notice active at a time.
The Director determines when the target receives your notice. Once the target receives the notice, they become alarmed and take desperate measures to stop you. The Director gains 1 additional Malice per round during future encounters involving the target. The heroes start each such encounter with 2 additional hero tokens. These hero tokens disappear at the end of the encounter.`
							}),
							value: 1
						},
						{
							feature: FeatureLogic.feature.createFeature({
								id: 'troubadour-2-2c',
								name: 'My Reputation Precedes Me',
								description: `
You can invoke your reputation at the start of a social interaction with a group of creatures who haven’t met you before, automatically creating a bond with a representative NPC as if using your Scene Partner feature. While the bond is active, all present heroes are treated as having Renown 2 higher than usual for the purpose of negotiations and influencing tests with the group.
The Director can choose to award the heroes with 1 Hero Token to stop you from forming this bond, making you infamous with the community instead. Until actions are taken to improve your reputations, all present heroes take a bane on tests using skills from the interpersonal skill group with the group of creatures. You can still use your Scene Partner feature to find allies within the community.`
							}),
							value: 1
						}
					]
				}),
				FeatureLogic.feature.createPerkFeature({
					id: 'troubadour-2-3'
				})
			]
		},
		{
			level: 3,
			features: [
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'troubadour-3-1',
					cost: 7
				})
			]
		}
	],
	abilities: [
		// TODO: Artful Flourish
		// TODO: Cutting Sarcasm
		// TODO: Instigator
		// TODO: Witty Banter

		// TODO: Harsh Critic
		// TODO: Hypnotic Overtones
		// TODO: Quick Rewrite
		// TODO: Upstage

		// TODO: Dramatic Reversal
		// TODO: Fake your Death
		// TODO: Flip the Script
		// TODO: Method Acting

		// TODO: Extensive Rewrites
		// TODO: Infernal Gavotte
		// TODO: Virtuoso's Solo
		// TODO: We Meet At Last; Let's Finish This
	],
	subclasses: [
		{
			id: 'troubadour-sub-1',
			name: 'Duelist',
			description: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						// TODO: Acrobatics
						// TODO: Star Power
						// TODO: Riposte
					]
				},
				{
					level: 2,
					features: [
						// TODO: Classic Chandelier Stunt / En Garde!
					]
				},
				{
					level: 3,
					features: [
						// TODO: Foil
					]
				}
			],
			selected: false
		},
		{
			id: 'troubadour-sub-2',
			name: 'Skald',
			description: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						// TODO: Blocking
						// TODO: Dramatic Monologue
						// TODO: Turnabout is Fair Play
					]
				},
				{
					level: 2,
					features: [
						// TODO: Guest Star / Twist at the End
					]
				},
				{
					level: 3,
					features: [
						// TODO: Recast a Supporting Part
					]
				}
			],
			selected: false
		},
		{
			id: 'troubadour-sub-3',
			name: 'Virtuoso',
			description: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						// TODO: Power Chord
						// TODO: Thunder Mother
						// TODO: Ballad of the Beast
						// TODO: Harmonize
					]
				},
				{
					level: 2,
					features: [
						// TODO: Encore / Tough Crowd
					]
				},
				{
					level: 3,
					features: [
						// TODO: Fire Up the Night
						// TODO: Neverending Hero
					]
				}
			],
			selected: false
		}
	],
	level: 1,
	characteristics: []
};
