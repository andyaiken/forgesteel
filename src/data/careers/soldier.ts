import { Career } from '../../models/career';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const soldier: Career = {
	id: 'career-soldier',
	name: 'Soldier',
	description: 'In your formative years, you fought tirelessly in skirmishes and campaigns against enemy forces.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'career-soldier-feature-1',
			listOptions: [ SkillList.Exploration ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'career-soldier-feature-2',
			listOptions: [ SkillList.Intrigue ]
		}),
		FactoryLogic.feature.createLanguageChoice({
			id: 'career-soldier-feature-3',
			count: 2
		}),
		FactoryLogic.feature.createBonus({
			id: 'career-soldier-feature-4',
			field: FeatureField.Renown,
			value: 1
		}),
		FactoryLogic.feature.createPerk({
			id: 'career-soldier-feature-5',
			lists: [ PerkList.Exploration ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-soldier-ii-1',
				name: 'Dishonorable Discharge',
				description: 'You enlisted in the military to protect others, but your commander ordered you to beat and kill civilians. When you refused, things got violent. You barely escaped the brawl that ensued, but now you vow to help people on your own terms.'
			},
			{
				id: 'career-soldier-ii-2',
				name: 'Out of Retirement',
				description: 'You had a long and storied career as a soldier before deciding to retire to a simpler life. But when you returned to your old home, you found your enemies had laid waste to it. Now the skills you earned on the battlefield are helping you as you become a different kind of warrior - one seeking to save others from the fate you suffered.'
			},
			{
				id: 'career-soldier-ii-3',
				name: 'Peace Through Healing',
				description: 'The sight of constant bloodshed took its toll on you. You seek peace through healing and dedicated yourself to ending wars before they begin, to spare those around you from the horror.'
			},
			{
				id: 'career-soldier-ii-4',
				name: 'Sole Survivor',
				description: 'You were the last surviving member of your unit after an arduous battle or monstrous assault, surviving only through luck. You turned away from the life of a soldier then, seeking to become a hero who could stand against such threats.'
			},
			{
				id: 'career-soldier-ii-5',
				name: 'Stolen Valor',
				description: 'Tired of eking out an existence on the streets, you enrolled in the military. However, you were unable to escape your lower-status background until the officer leading your unit fell in battle. In the chaos that ensued, you assumed their identity and returned home a hero. To avoid suspicion, you took on the life of an adventurer, staying always on the move.'
			},
			{
				id: 'career-soldier-ii-6',
				name: 'Vow of Sacrifice',
				description: 'You promised a fellow soldier that you’d protect his family if he ever fell in battle. When he did, you traveled to his village, but found its people slain or scattered by war. Driven by your vow, you have dedicated your life to finding any survivors and protecting others from a similar fate.'
			}
		],
		selected: null,
		selectedID: null
	}
};
