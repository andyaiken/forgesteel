import { Career } from '../../models/career';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const disciple: Career = {
	id: 'career-disciple',
	name: 'Disciple',
	description: 'You worked in a church, temple, or other religious institution as part of the clergy.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'career-disciple-feature-1',
			listOptions: [ SkillList.Lore ],
			selected: [ 'Religion' ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'career-disciple-feature-2',
			listOptions: [ SkillList.Lore ],
			count: 2
		}),
		FactoryLogic.feature.createBonus({
			id: 'career-disciple-feature-3',
			field: FeatureField.ProjectPoints,
			value: 240
		}),
		FactoryLogic.feature.createPerk({
			id: 'career-disciple-feature-4',
			lists: [ PerkList.Supernatural ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-disciple-ii-1',
				name: 'Angel\'s Advocate',
				description: 'Swayed by an evil faith, your cult was about to unleash horrors upon the world when an angel (figurative or literal) intervened. They convinced you to stop your cult’s efforts. Now you follow in the footsteps of the angel who showed you the righteous path.'
			},
			{
				id: 'career-disciple-ii-2',
				name: 'Dogma',
				description: 'Although you joined the religious institution under the guidance of a kind mentor, others within the house of worship became increasingly fanatical in their convictions. Your mentor sought to be a voice of reason in the rising tide of hatred and was tried as a heretic before being executed. Leaving the institution behind, you became a hero to uphold the beliefs you hold dear.'
			},
			{
				id: 'career-disciple-ii-3',
				name: 'Freedom to Worship',
				description: 'Your temple was destroyed in a religious conflict. The institution’s leaders sought retaliation, but you saw in these actions a ceaseless cycle of destruction that would lead to more conflict. Instead, you became a hero to protect religious freedoms, so all worshipers could practice their faith without fear.'
			},
			{
				id: 'career-disciple-ii-4',
				name: 'Lost Faith',
				description: 'You devoted your life to ministering to the sick and needy and other charitable work. Time and time again, tragedy struck those you served without rhyme or reason. Your prayers went unanswered, and your efforts went thankless. Eventually, you lost your faith in a higher power, and you left your church or temple to do good outside of any religious affiliation.'
			},
			{
				id: 'career-disciple-ii-5',
				name: 'Near-Death Experience',
				description: 'While serving at a religious institution, you almost died in an accident. When you woke, you had lost all memory of ever having worked for the church or temple. Though the clergy encouraged you to stay, you left to forge a new path. Your sense of altruism - whether instilled in you by your past work or a part of who you naturally are - guides you in your life.'
			},
			{
				id: 'career-disciple-ii-6',
				name: 'Taxing Times',
				description: 'The faith-based organization you were once part of became corrupt. It used its status in the community to accumulate wealth through tithes and its leaders sought political appointments. During a season of drought, the institution stockpiled resources and refused to give aid, resulting in the deaths of many. You became a hero to fight against such corruption and to honor your dearly departed.'
			}
		],
		selectedID: null
	}
};
