import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityLogic } from '../logic/ability-logic';
import { Domain } from '../models/domain';
import { FeatureLogic } from '../logic/feature-logic';
import { SkillList } from '../enums/skill-list';

export class DomainData {
	static creation: Domain = {
		id: 'domain-creation',
		name: 'Creation',
		description: 'The Creation domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FeatureLogic.createMultipleFeature({
						id: 'domain-creation-1',
						features: [
							FeatureLogic.createAbilityFeature({
								ability: AbilityLogic.createAbility({
									id: 'domain-creation-1-1',
									name: 'Hands Of The Maker',
									description: 'Craft objects with the power of your mind!',
									type: AbilityLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Magic ],
									distance: [ AbilityLogic.distance.createSelf() ],
									target: 'Self',
									effect: 'You create a mundane object no larger than size 1S that you hold. If you use this feature again or stop holding the object, it disappears.'
								})
							}),
							FeatureLogic.createSkillChoiceFeature({
								id: 'domain-creation-1-2',
								listOptions: [ SkillList.Crafting ]
							})
						]
					})
				]
			}
		]
	};

	static death: Domain = {
		id: 'domain-death',
		name: 'Death',
		description: 'The Death domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FeatureLogic.createMultipleFeature({
						id: 'domain-death-1',
						features: [
							FeatureLogic.createAbilityFeature({
								ability: AbilityLogic.createAbility({
									id: 'domain-death-1-1',
									name: 'Grave Speech',
									description: 'The power of death lets you speak with those who have passed from the world.',
									type: AbilityLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Magic ],
									distance: [ AbilityLogic.distance.createReach(1) ],
									target: 'Special',
									effect: 'You can speak to the corpse or head of a creature who has died within the last 24 hours and who can speak a language you know. The target regards you as they would have in life, and you might need to make tests to influence them and convince them to speak with you. After 1 minute, the effect ends. You can’t use this ability on the same creature twice.'
								})
							}),
							FeatureLogic.createSkillChoiceFeature({
								id: 'domain-death-1-2',
								listOptions: [ SkillList.Lore ]
							})
						]
					})
				]
			}
		]
	};

	static fate: Domain = {
		id: 'domain-fate',
		name: 'Fate',
		description: 'The Fate domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FeatureLogic.createMultipleFeature({
						id: 'domain-fate-1',
						features: [
							FeatureLogic.createFeature({
								id: 'domain-fate-1-1',
								name: 'Fate Trance',
								description: 'If you spend 10 minutes in an uninterrupted meditative state without moving, you get a glimpse of any significant events that will happen in the area around you in the next 24 hours unless you or your allies intercede in those events. As described by the Director, these glimpses of the future might be clear and concise, or might be vague and hard to understand.'
							}),
							FeatureLogic.createSkillChoiceFeature({
								id: 'domain-fate-1-2',
								listOptions: [ SkillList.Lore ]
							})
						]
					})
				]
			}
		]
	};

	static knowledge: Domain = {
		id: 'domain-knowledge',
		name: 'Knowledge',
		description: 'The Knowledge domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FeatureLogic.createMultipleFeature({
						id: 'domain-knowledge-1',
						features: [
							FeatureLogic.createFeature({
								id: 'domain-knowledge-1-1',
								name: 'Cypher Mind',
								description: 'Given a little time, you can translate almost any text into a language you know, even if you don’t know the text’s original language. For the purpose of making project rolls, you are considered fluent in all languages.'
							}),
							FeatureLogic.createSkillChoiceFeature({
								id: 'domain-knowledge-1-2',
								listOptions: [ SkillList.Lore ]
							})
						]
					})
				]
			}
		]
	};

	static life: Domain = {
		id: 'domain-life',
		name: 'Life',
		description: 'The Life domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FeatureLogic.createMultipleFeature({
						id: 'domain-life-1',
						features: [
							FeatureLogic.createFeature({
								id: 'domain-life-1-1',
								name: 'Revitalizing Ritual',
								description: 'Each time you finish a respite, you can choose yourself or another character who is also ending a respite to gain the benefit of a divine ritual. When you perform the ritual, the target’s recovery value increases by an amount equal to your level. This benefit lasts until you complete another respite.'
							}),
							FeatureLogic.createSkillChoiceFeature({
								id: 'domain-life-1-2',
								listOptions: [ SkillList.Exploration ]
							})
						]
					})
				]
			}
		]
	};

	static love: Domain = {
		id: 'domain-love',
		name: 'Love',
		description: 'The Love domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FeatureLogic.createMultipleFeature({
						id: 'domain-love-1',
						features: [
							FeatureLogic.createFeature({
								id: 'domain-love-1-1',
								name: 'Compassionate Aura',
								description: `
You exude a magic aura that can soothe those willing to socially engage with you. You gain an edge on any test made to assist another creature with a test.
Additionally, when you are present at the start of a negotiation, the NPC’s patience increases by 1 (to a maximum of 5), and the first test made to influence them gains an edge.`
							}),
							FeatureLogic.createSkillChoiceFeature({
								id: 'domain-love-1-2',
								listOptions: [ SkillList.Interpersonal ]
							})
						]
					})
				]
			}
		]
	};

	static nature: Domain = {
		id: 'domain-nature',
		name: 'Nature',
		description: 'The Nature domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FeatureLogic.createMultipleFeature({
						id: 'domain-nature-1',
						features: [
							FeatureLogic.createFeature({
								id: 'domain-nature-1-1',
								name: 'Animal Spirit',
								description: 'As an action, you conjure an animal spirit that takes the form of any animal you have seen. The incorporeal animal can’t physically interact with the world, but they have a speed of 5 (fly) and can move through mundane objects. While you are within 20 squares of the spirit, you can sense everything an animal of their form could sense, in addition to sensing your own surroundings. You can dismiss the spirit at any time (no action required).'
							}),
							FeatureLogic.createSkillChoiceFeature({
								id: 'domain-nature-1-2',
								listOptions: [ SkillList.Exploration ]
							})
						]
					})
				]
			}
		]
	};

	static protection: Domain = {
		id: 'domain-protection',
		name: 'Protection',
		description: 'The Protection domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FeatureLogic.createMultipleFeature({
						id: 'domain-protection-1',
						features: [
							FeatureLogic.createFeature({
								id: 'domain-protection-1-1',
								name: 'Alertness Ward',
								description: 'You exude a magic aura of awareness, granting you and each ally within 2 squares of you an edge on tests that use the Alertness skill.'
							}),
							FeatureLogic.createSkillChoiceFeature({
								id: 'domain-protection-1-2',
								listOptions: [ SkillList.Exploration ]
							})
						]
					})
				]
			}
		]
	};

	static storm: Domain = {
		id: 'domain-storm',
		name: 'Storm',
		description: 'The Storm domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FeatureLogic.createMultipleFeature({
						id: 'domain-storm-1',
						features: [
							FeatureLogic.createFeature({
								id: 'domain-storm-1-1',
								name: 'Control Weather',
								description: `
When you finish a respite, you can decide the weather conditions in the local area. Those weather conditions follow you through any mundane outdoors locations where you travel until the end of your next respite.
Choose one of the following types of weather:
* **Clear**: You and your allies each gain an edge on tests that use the Search or Navigate skills.
* **Foggy**: You and your allies each gain an edge on tests that use the Hide skill.
* **Overcast**: You and your allies each gain an edge on tests that use the Endurance skill.
* **Precipitation**: When the ground is muddy or snowy, you and your allies each gain an edge on tests that use the Track skill.`
							}),
							FeatureLogic.createSkillChoiceFeature({
								id: 'domain-storm-1-2',
								listOptions: [ SkillList.Exploration ]
							})
						]
					})
				]
			}
		]
	};

	static sun: Domain = {
		id: 'domain-sun',
		name: 'Sun',
		description: 'The Sun domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FeatureLogic.createMultipleFeature({
						id: 'domain-sun-1',
						features: [
							FeatureLogic.createFeature({
								id: 'domain-sun-1-1',
								name: 'Inner Light',
								description: 'Each time you finish a respite, you can choose yourself or another character who is also ending a respite to gain the benefit of a divine ritual. As you perform the ritual, you place a ray of morning light into the target’s soul, granting the target an edge on resistance rolls. This benefit lasts until you complete another respite.'
							}),
							FeatureLogic.createSkillChoiceFeature({
								id: 'domain-sun-1-2',
								listOptions: [ SkillList.Lore ]
							})
						]
					})
				]
			}
		]
	};

	static trickery: Domain = {
		id: 'domain-trickery',
		name: 'Trickery',
		description: 'The Trickery domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FeatureLogic.createMultipleFeature({
						id: 'domain-trickery-1',
						features: [
							FeatureLogic.createFeature({
								id: 'domain-trickery-1-1',
								name: 'Divine Thievery',
								description: 'The gods favor your thievery with magic. Whenever you make a test that uses a skill you have from the intrigue skill group, you can use Intuition on the test instead of another characteristic.'
							}),
							FeatureLogic.createSkillChoiceFeature({
								id: 'domain-trickery-1-2',
								listOptions: [ SkillList.Intrigue ]
							})
						]
					})
				]
			}
		]
	};

	static war: Domain = {
		id: 'domain-war',
		name: 'War',
		description: 'The War domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FeatureLogic.createMultipleFeature({
						id: 'domain-war-1',
						features: [
							FeatureLogic.createFeature({
								id: 'domain-war-1-1',
								name: 'Ritual Of Preparation',
								description: 'As a respite action, you can bless a weapon. Any creature who wields the weapon gains a +1 bonus to damage with abilities that use the weapon. This benefit lasts until you complete your next respite.'
							}),
							FeatureLogic.createSkillChoiceFeature({
								id: 'domain-war-1-2',
								listOptions: [ SkillList.Exploration ]
							})
						]
					})
				]
			}
		]
	};
}
