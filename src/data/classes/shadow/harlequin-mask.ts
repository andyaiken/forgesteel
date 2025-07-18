import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const harlequinMask: SubClass = {
	id: 'shadow-sub-3',
	name: 'College of the Harlequin Mask',
	description: 'Graduates of the College of the Harlequin Mask learn illusion magic, which they use to infiltrate enemy strongholds and create orchestrated chaos in combat.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'shadow-sub-3-1-1',
					listOptions: [ SkillList.Interpersonal ],
					selected: [ 'Lie' ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shadow-sub-3-1-2',
						name: 'I’m No Threat',
						description: 'Taking on the illusory countenance of another creature gives you an advantage on subterfuge.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText(`
When you use this ability, you cover yourself in an illusion that causes you to appear nonthreatening and harmless to your enemies. You might take on the appearance of a harmless animal of your size, such as a sheep or capybara, or you might appear as a less heroic, unarmed, and capable version of yourself. While this illusion lasts, your strikes made against other creatures gain an edge. If you use this ability in combat, you gain a surge when you use it.

The illusion ends when you harm another creature, when you and any creature physically interact, when you use this ability again, or when you end the illusion (no action required).`),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'Choose a creature whose size is no more than 1 greater than yours, and who is within 10 squares of you. This ability’s illusion makes you appear to be that creature. This illusion covers your entire body, including clothing and armor, and changes your voice to sound like the creature. You gain an edge on tests made to convince the creature’s allies that you are the creature.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shadow-sub-3-1-3',
						name: 'Clever Trick',
						description: 'You sow a moment of confusion in combat, to your enemy’s peril.',
						type: FactoryLogic.type.createTrigger('An enemy targets you with a strike.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('Choose an enemy within distance of the triggering strike, including the enemy who targeted you. The strike targets that enemy instead.')
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'shadow-sub-3-2-1',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-3-2-1a',
									name: 'Machinations of Sound',
									description: 'Illusory sounds make your foes reposition themselves as they cower or investigate the disturbance.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
									target: 'Each enemy in the area',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: 'Slide 4',
											tier2: 'Slide 5',
											tier3: 'Slide 7'
										})),
										FactoryLogic.createAbilitySectionText('This forced movement ignores stability. Instead, the forced movement is reduced by a number equal to the target’s Intuition score.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-3-2-1b',
									name: 'So Gullible',
									description: 'When your enemy strikes, you reveal you were in a different place all along.',
									type: FactoryLogic.type.createTrigger('An enemy strikes you.', { free: true }),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You use your Clever Trick ability with no insight cost, causing the creature who made the triggering strike to target an illusory image of you. You appear in an unoccupied space within 3 squares of that creature and can make a free strike against them. You can then spend a Recovery.')
									]
								})
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.create({
					id: 'shadow-sub-3-2-2',
					name: 'Friend!',
					description: `
Your illusions make your enemies believe you are their friend in critical moments. Whenever an enemy uses an ability or trait that targets multiple allies and you are within distance of the effect, you can choose to be a target of the effect as well.

Additionally when you use your I’m No Threat ability, you can take the Disengage move action as part of that ability.`
				})
			]
		},
		{
			level: 3,
			features: []
		}
	],
	selected: false
};
