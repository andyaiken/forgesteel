import { Career } from '@/models/career';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { PerkList } from '@/enums/perk-list';
import { SkillList } from '@/enums/skill-list';

export const gladiator: Career = {
	id: 'career-gladiator',
	name: 'Gladiator',
	description: 'In the past, you entertained the masses with flashy displays of violence in the arena.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'gladiator-feature-1',
			listOptions: [ SkillList.Exploration ],
			count: 2
		}),
		FactoryLogic.feature.createLanguageChoice({
			id: 'gladiator-feature-2'
		}),
		FactoryLogic.feature.createBonus({
			id: 'gladiator-feature-3',
			field: FeatureField.Renown,
			value: 2
		}),
		FactoryLogic.feature.createPerk({
			id: 'gladiator-feature-4',
			lists: [ PerkList.Exploration ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-gladiator-ii-1',
				name: 'Betrayed',
				description: 'A local crime lord offered you money to throw your last bout, promising that you’d live through the ordeal and get a cut of all the wagers placed on the match. You upheld your end of the deal - which made the knife in your back after the bout so surprising. You woke in a shallow grave, barely alive, and ready to mete out justice.'
			},
			{
				id: 'career-gladiator-ii-2',
				name: 'Heckler',
				description: 'As you stood victorious on the arena sands, a voice cried out among the cheering. “This violence is just for show. You should be ashamed. There are people who need you - who need your skills!” Why did that voice ring so clear? And why did it sound so familiar? You never saw the face of the person who uttered those words, but they weighed heavy on you. The next day, you fled the arena to begin a hero’s life.'
			},
			{
				id: 'career-gladiator-ii-3',
				name: 'Joined the Arena',
				description: 'As a child, you loved gladiatorial matches, captivated by the fierce displays of showmanship, never giving much thought to how the competitors ended up in the ring. Then your friend was wrongly accused of a crime and sentenced to compete. You went in their place. After viewing what life was like for those forced to fight, you survived your sentence and resolved to protect the unfairly condemned.'
			},
			{
				id: 'career-gladiator-ii-4',
				name: 'New Challenges',
				description: 'You earned every title you could. You beat every opponent willing to face you in the arena. Your final battle with your rival ended with you victorious - and still you were unsatisfied. There are other, greater foes out there - and you mean to find them.'
			},
			{
				id: 'career-gladiator-ii-5',
				name: 'Scion\'s Compassion',
				description: 'You were born a noble, but the duplicitous and power-hungry nature of your family had you seeking your own fortune in the arena. You saw that competitors brought there by circumstance and not choice suffered. You gave all you could of your family money to those less fortunate folk and then set out to make a real difference in this cruel world.'
			},
			{
				id: 'career-gladiator-ii-6',
				name: 'Warrior\'s Home',
				description: 'The orphanage you grew up in secretly supplied gladiators to the arena. Forced to fight against many childhood friends as an adult, you vowed to dismantle the arena and free other victims. You became a liberator, dedicating to ending the oppression of others until your dying breath.'
			}
		],
		selected: null,
		selectedID: null
	}
};
