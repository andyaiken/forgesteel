import { Career } from '@/models/career';
import { FactoryLogic } from '@/logic/factory-logic';
import { PerkList } from '@/enums/perk-list';
import { SkillList } from '@/enums/skill-list';

export const beggar: Career = {
	id: 'career-beggar',
	name: 'Beggar',
	description: 'You lived by going to a tavern, crossroads, city street, or other busy area and begging passersby for money or food.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'career-beggar-feature-1',
			listOptions: [ SkillList.Lore ],
			selected: [ 'Rumors' ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'career-beggar-feature-2',
			listOptions: [ SkillList.Exploration ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'career-beggar-feature-3',
			listOptions: [ SkillList.Interpersonal ]
		}),
		FactoryLogic.feature.createLanguageChoice({
			id: 'career-beggar-feature-4',
			count: 2
		}),
		FactoryLogic.feature.createPerk({
			id: 'career-beggar-feature-5',
			lists: [ PerkList.Interpersonal ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-beggar-ii-1',
				name: 'Champion',
				description: 'You were never content with your lot. Watching yet another friend fall to preventable circumstances was your last straw. You gathered up what little you had and set off to become a hero, determined to make real change for those society forgot.'
			},
			{
				id: 'career-beggar-ii-2',
				name: 'Night Terrors',
				description: 'Something killed the other beggars. It came in the night. You barely saw it, but what you did see of it wasn’t natural. You survived by hiding, or perhaps it simply passed you over for reasons unknown to you. It still haunts your nightmares, and you kill monsters so no one else has to experience such horrors.'
			},
			{
				id: 'career-beggar-ii-3',
				name: 'One Good Deed',
				description: 'You ran afoul of the local watch by being in the wrong place when they were in a bad mood. A passing hero intervened on your behalf, shaming the guards into moving on, then gave you enough gold to get you back on your feet. Their kindness kindled a spark in you. You took the gold, bought some secondhand gear, and went to pay that hero’s kindness forward.'
			},
			{
				id: 'career-beggar-ii-4',
				name: 'Precious',
				description: 'No matter how far you’d fallen, there was one belonging you would never part with, no matter how much money it would bring you. When a pickpocket stole it, you chased them until you were in a part of the city you no longer recognized. With a jolt, you realized you had no desire to return to your previous stomping grounds. You kept going, and you haven’t looked back.'
			},
			{
				id: 'career-beggar-ii-5',
				name: 'Strange Charity',
				description: 'A passerby dropped something in your cup. When you counted your day’s collections, you found a magic coin among the coppers. You knew immediately that it was special. When the other beggars - your friends, you thought - were ready to murder you for it, you killed several of them in self- defense before you fled, leaving behind the only semblance of community you had.'
			},
			{
				id: 'career-beggar-ii-6',
				name: 'Witness',
				description: 'You saw something you weren’t meant to see. Others would kill you if they knew, and they might be searching for you even now. You remain on the move, terrified of remaining in one place too long lest it all catch up to you. Perhaps if you make a big enough name for yourself, you can become untouchable and can finally speak of what you saw without fear.'
			}
		],
		selected: null,
		selectedID: null
	}
};
