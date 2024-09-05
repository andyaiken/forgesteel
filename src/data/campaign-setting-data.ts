import { CampaignSetting } from '../models/campaign-setting';
import { SkillList } from '../enums/skill-list';
import { FeatureLogic } from '../logic/feature-logic';

export class CampaignSettingData {
	static orden: CampaignSetting = {
		id: 'orden',
		name: 'Orden',
		description: 'The default setting for Draw Steel.',
		languages: [
			'Anjal',
			'Caelian',
			'Higaran',
			'Hyrallic',
			'Kalliak',
			'Khemharic',
			'Khoursirian',
			'Oaxuatl',
			'Phaedran',
			'Riojan',
			'Uvalic',
			'Vaniric',
			'Vaslorian',
			'Yllyric',
			'Zaliac'
		],
		defaultLanguages: [
			'Caelian'
		],
		cultures: [
			{
				id: 'orden-capital',
				name: 'Capital',
				description: 'The greatest city of this or any age.',
				environment: FeatureLogic.createSkillFeature({
					id: 'env-urban',
					name: 'Urban',
					description: 'An urban culture is always centered in a city. Such a culture might arise within the walls of Capital, a massive metropolis with a cosmopolitan population; within a network of caverns that hold an underground city; or in any other place where a large population lives relatively close together. The people of urban cultures often learn to effectively misdirect others in order to navigate the crowd',
					listOptions: [
						SkillList.Interpersonal,
						SkillList.Intrigue
					]
				}),
				organization: FeatureLogic.createSkillFeature({
					id: 'org-bureaucratic',
					name: 'Bureaucratic',
					description: 'Bureaucratic cultures are steeped in official leadership and formally recorded laws. Members of such a culture are often ranked in power according to those laws, with a small group of people holding the power to rule according to birthright, popular vote, or some other official and measurable standard. Many bureaucratic communities have one person at the very top, though others might be ruled by a council. A trade guild with a guildmaster, treasurer, secretary, and a charter of rules and regulations for membership; a feudal lord who rules over a group of knights, who in turn rule over peasants who work the land; and a militaristic society with ranks and rules that its people must abide are all examples of bureaucratic cultures.',
					listOptions: [
						SkillList.Intrigue,
						SkillList.Lore
					]
				}),
				upbringing: FeatureLogic.createSkillFeature({
					id: 'up-martial',
					name: 'Martial',
					description: 'Heroes who have a martial upbringing are raised by warriors. These might be the soldiers of an established army, a band of mercenaries, a guild of monster-slaying adventurers, or any other folk whose lives revolve around combat. Heroes with a martial upbringing are always ready for a fight—and they know how to finish that fight.',
					options: [
						'Alertness',
						'Blacksmithing',
						'Climb',
						'Endurance',
						'Fletching',
						'Intimidate',
						'Jump',
						'Monsters',
						'Ride',
						'Track'
					]
				})
			}
		],
		skills: [
			{
				list: SkillList.Lore,
				name: 'Timescape',
				description: 'Knowing about the various planets of the timescape'
			}
		]
	};

	static getCampaignSettings = () => {
		return [
			this.orden
		];
	};
}
