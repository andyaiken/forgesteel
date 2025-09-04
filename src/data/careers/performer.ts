import { Career } from '../../models/career';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const performer: Career = {
	id: 'career-performer',
	name: 'Performer',
	description: 'You can sing, act, or dance well enough that people actually pay to see you do it. Imagine that!',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'performer-feature-1',
			options: [ 'Music', 'Perform' ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'performer-feature-2',
			listOptions: [ SkillList.Interpersonal ],
			count: 2
		}),
		FactoryLogic.feature.createBonus({
			id: 'performer-feature-3',
			field: FeatureField.Renown,
			value: 2
		}),
		FactoryLogic.feature.createPerk({
			id: 'performer-feature-4',
			lists: [ PerkList.Interpersonal ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-performer-ii-1',
				name: 'Cursed Audience',
				description: 'During a performance, you watched in horror as the audience was suddenly overcome by a curse that caused them to disintegrate before your eyes. You aren’t sure what happened, but seeking an answer quickly led you to places where only heroes dare to go.'
			},
			{
				id: 'career-performer-ii-2',
				name: 'False Accolades',
				description: 'After a poor performance, you found a script to a well-written play left in your dressing room. The accompanying note asked that if you performed the play, you should give the author credit. But after a commanding performance, you claimed to be star and playwright both - and the curse hidden on those pages activated. A small portion of your skin has begun to transform into undead flesh, and the only cure is to prove you have become selfless.'
			},
			{
				id: 'career-performer-ii-3',
				name: 'Fame and Fortune',
				description: 'You thought you were famous - then that hero came to your show. Suddenly, all eyes were on the dragon-slaying brute instead of on the stage where they belonged. The audience even gave them a standing ovation when they entered the room. All you got was polite applause. Fine. If people want a hero so much, then a hero you shall be.'
			},
			{
				id: 'career-performer-ii-4',
				name: 'Songs to the Dead',
				description: 'Your performances have always been tinged with a bit of melancholy. During a particularly soulful performance, spirits disturbed the living audience and sat in their chairs. They begged you to prevent their demise, providing no other details before disappearing. You set out to see if you could help your most dedicated fans.'
			},
			{
				id: 'career-performer-ii-5',
				name: 'Speechless',
				description: 'A heckler’s mocking words left you utterly speechless during a performance, stinging your pride and stirring your arrogance. The incident strained your legendary voice, and you could only speak in soft whispers. The heckler was a fey trickster who stole your voice, promising to give it back after you accomplished real good in the world.'
			},
			{
				id: 'career-performer-ii-6',
				name: 'Tragic Lesson',
				description: 'When a producer who once shortchanged you shouted out on the street for you to stop a thief who had picked their pocket, your spite toward the producer inspired you to let the thief run right on by. But that decision led to tragedy when the thief later harmed someone you loved. From that moment on, you made it your responsibility to protect others.'
			}
		],
		selected: null,
		selectedID: null
	}
};
