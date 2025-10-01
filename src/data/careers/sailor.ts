import { Career } from '@/models/career';
import { FactoryLogic } from '@/logic/factory-logic';
import { PerkList } from '@/enums/perk-list';
import { SkillList } from '@/enums/skill-list';

export const sailor: Career = {
	id: 'career-sailor',
	name: 'Sailor',
	description: 'You worked on a ship that might have been a merchant cog, a mercenary or military craft, or a pirate vessel. You might have been a deckhand, a mate, or even the captain.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'career-sailor-feature-1',
			listOptions: [ SkillList.Exploration ],
			selected: [ 'Swim' ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'career-sailor-feature-2',
			listOptions: [ SkillList.Exploration ],
			count: 2
		}),
		FactoryLogic.feature.createLanguageChoice({
			id: 'career-sailor-feature-3',
			count: 2
		}),
		FactoryLogic.feature.createPerk({
			id: 'career-sailor-feature-4',
			lists: [ PerkList.Exploration ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-sailor-ii-1',
				name: 'Alone',
				description: 'You joined up with your best friend, sibling, or other loved one, the culmination of a lifelong dream to sail the high seas together. When they died, you lost your taste for the seafaring life. You left at the first opportunity and haven’t looked back since.'
			},
			{
				id: 'career-sailor-ii-2',
				name: 'Deserter',
				description: 'It was in the middle of a pirate raid (whether you were part of it or targeted by it) that you realized you no longer yearned for a sailor’s life. You used the chaos of the moment to slip away unnoticed. You now work as a hero in an effort to either end the piracy of others or atone for your past deeds, but you fear the day your old crew finds you and punishes you for your desertion.'
			},
			{
				id: 'career-sailor-ii-3',
				name: 'Forgotten',
				description: 'You awoke aboard your ship with no memory of who you were. Though the other sailors insisted they knew you, you didn’t know them. The next time you went ashore, you decided to stay, determined to find out who you really are.'
			},
			{
				id: 'career-sailor-ii-4',
				name: 'Jealousy',
				description: 'You had the favor of your captain, which earned you many rivals aboard your ship. One night, your fellow sailors pulled you from your bunk and threw you overboard. By some miracle, you were scooped from the waters by a passing vessel. You worked off your debt to them, then set out on a new life with less pettiness.'
			},
			{
				id: 'career-sailor-ii-5',
				name: 'Marooned',
				description: 'There was a mutiny, and you were on the losing side. You were marooned on an island and escaped when a merchant vessel was blown off course by a storm and found you. Your reputation is ruined among sailors, so you seek adventure elsewhere.'
			},
			{
				id: 'career-sailor-ii-6',
				name: 'Water Fear',
				description: 'A catastrophic storm hit while you were at sea, destroying your ship and leaving you as the only survivor. Once you recovered, you tried to sign on with another ship, but the thought of the open water turned your legs to jelly. Instead, you’ve taken on the role of a traveling hero to make ends meet.'
			}
		],
		selected: null,
		selectedID: null
	}
};
