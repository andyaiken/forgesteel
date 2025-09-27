import { Career } from '@/models/career';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { PerkList } from '@/enums/perk-list';
import { SkillList } from '@/enums/skill-list';

export const magesApprentice: Career = {
	id: 'career-mages-apprentice',
	name: 'Mage’s Apprentice',
	description: 'For long years, you studied magic under the mentorship of a more experienced mage.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'mages-apprentice-feature-1',
			listOptions: [ SkillList.Lore ],
			selected: [ 'Magic' ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'mages-apprentice-feature-2',
			listOptions: [ SkillList.Lore ],
			count: 2
		}),
		FactoryLogic.feature.createLanguageChoice({
			id: 'mages-apprentice-feature-3'
		}),
		FactoryLogic.feature.createBonus({
			id: 'mages-apprentice-feature-4',
			field: FeatureField.Renown,
			value: 1
		}),
		FactoryLogic.feature.createPerk({
			id: 'mages-apprentice-feature-5',
			lists: [ PerkList.Supernatural ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-mages-apprentice-ii-1',
				name: 'Forgotten Memories',
				description: 'While practicing a spell, your inexperience caused the magic to backfire and your memories were wiped, leaving you with only fragments of who you once were. Determined to recall your past, you now dedicate yourself to helping others, hoping your actions will spark some remembrance or lead you to a way to reverse the magic.'
			},
			{
				id: 'career-mages-apprentice-ii-2',
				name: 'Magic of Friendship',
				description: 'As a sign of your status as star pupil, your mentor gifted you a familiar as a magic pet. Another jealous apprentice captured the familiar and slipped away in the night. Haunted by your pet’s absence, you adventure to find your kidnapped friend and prevent others from feeling your loss.'
			},
			{
				id: 'career-mages-apprentice-ii-3',
				name: 'Missing Mage',
				description: 'One day you woke up and the mage you worked for was just gone. They didn’t take any of their belongings and there was no sign of any foul play - just the scent of sulfur in their bedchamber. You set out on your heroic journey in the aftermath and have been looking for them ever since.'
			},
			{
				id: 'career-mages-apprentice-ii-4',
				name: 'Nightmares Made Flesh',
				description: 'Your attempts at magic have always been unpredictable. A powerful mage promised to help you gain control. During your training, a terrible nightmare caused your body to flare with magic and pull the monster of your nightmare into the waking world. The horror escaped. You left, seeking to vanquish their terrible vileness.'
			},
			{
				id: 'career-mages-apprentice-ii-5',
				name: 'Otherworldly',
				description: 'While studying magic, you accidentally sent yourself from your original world to this one. Now you’re stranded here, hoping to find ancient texts or powerful magic treasures that might transport you back home. A life of adventure it is!'
			},
			{
				id: 'career-mages-apprentice-ii-6',
				name: 'Ultimate Power',
				description: 'The mage you worked for was a kindly old soul, but the basic magic they taught you always seemed like a small part of something bigger. It wasn’t until you met an adventuring elementalist that you realized hitting the road as a hero was the only way to truly improve and hone your skills. You resigned your apprenticeship and found yourself walking the path of a hero the next day.'
			}
		],
		selected: null,
		selectedID: null
	}
};
