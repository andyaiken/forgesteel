import { Career } from '../../models/career';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const laborer: Career = {
	id: 'career-laborer',
	name: 'Laborer',
	description: 'You worked as a farmer, builder, clothes washer, forester, miner, or some other profession engaged in hard manual labor.',
	features: [
		FactoryLogic.feature.createSkillChoice({
			id: 'laborer-feature-1',
			listOptions: [ SkillList.Exploration ],
			selected: [ 'Endurance' ]
		}),
		FactoryLogic.feature.createSkillChoice({
			id: 'laborer-feature-2',
			listOptions: [ SkillList.Crafting, SkillList.Exploration ],
			count: 2
		}),
		FactoryLogic.feature.createLanguageChoice({
			id: 'laborer-feature-3'
		}),
		FactoryLogic.feature.createBonus({
			id: 'laborer-feature-4',
			field: FeatureField.ProjectPoints,
			value: 120
		}),
		FactoryLogic.feature.createPerk({
			id: 'laborer-feature-5',
			lists: [ PerkList.Exploration ]
		})
	],
	incitingIncidents: {
		options: [
			{
				id: 'career-laborer-ii-1',
				name: 'Deep Sentinel',
				description: 'Spending your days cleaning and maintaining the sewers doesn’t make you many friends. But you found friendship among the rats. You fought the monsters that hunted your friends, and which everyone else ignored. After making the sewers safe for the rats, you decided to take your talents to the surface and serve other humanoids who might appreciate your efforts in the same way.'
			},
			{
				id: 'career-laborer-ii-2',
				name: 'Disaster',
				description: 'A disaster, such as a cave-in, wildfire, or tidal wave, hit your crew while you were working. You saved as many as you could, but the ones you couldn’t save weigh heavily on your mind. You took up the life of a hero to save as many people as possible, vowing that what happened to you won’t happen again.'
			},
			{
				id: 'career-laborer-ii-3',
				name: 'Embarrassment',
				description: 'A noble you worked for admonished you publicly for work done poorly - and more than once. Finally, you’d had enough. You vowed to take up a new path and show this noble you’re far more than what they make you out to be.'
			},
			{
				id: 'career-laborer-ii-4',
				name: 'Live the Dream',
				description: 'You worked with a good friend, and on the job, you would always fantasize about what it would be like to hit the road as adventuring heroes … someday. You didn’t count on your friend falling ill and passing away. Now it’s time to live out that dream for both of you.'
			},
			{
				id: 'career-laborer-ii-5',
				name: 'Shining Light',
				description: 'You kept a lighthouse along the constantly stormy cliffs of your village with your mentor. On a clear and sunny day, your mentor vanished. Finding only a cryptic notebook filled with his musings on the supernatural, you left to find what really what happened. The trail has gone cold for now, and you’re helping others find their loved ones in the meantime.'
			},
			{
				id: 'career-laborer-ii-6',
				name: 'Slow and Steady',
				description: 'You labored silently as an uncaring boss drove those around you into the ground, pushing you to work harder to lessen the burden on your companions. But when the boss pushed too far and killed a friend of yours, you led an uprising against them. That was the start of your adventuring life.'
			}
		],
		selected: null,
		selectedID: null
	}
};
