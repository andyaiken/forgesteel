import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { SkillList } from '@/enums/skill-list';
import { SubClass } from '@/models/subclass';

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
You envelop yourself in an illusion that makes you appear nonthreatening and harmless to your enemies. You might take on the appearance of a harmless animal of your size, such as a sheep or capybara, or you might appear as a less heroic and unarmed version of yourself. While this illusion lasts, your strikes gain an edge, and when you take the Disengage move action, you gain a +1 bonus to the distance you can shift.

The illusion ends when you harm another creature, when you physically interact with a creature, when you use this ability again, or when you end the illusion (no action required). If you end this illusion by harming another creature, you gain 1 surge.`),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'Choose a creature whose size is no more than 1 greater than yours and who is within 10 squares. This ability’s illusion makes you appear as that creature. This illusion covers your entire body, including clothing and armor, and alters your voice to sound like that of the creature. You gain an edge on tests made to convince the creature’s allies that you are the creature.'
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
					name: '2nd-Level College Ability',
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
									type: FactoryLogic.type.createTrigger('Another creature targets you with a strike.', { free: true }),
									keywords: [ AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You use your Clever Trick ability with no insight cost against the triggering creature and strike. You can teleport to an unoccupied space within 3 squares of that creature and can make a free strike against them. You can then spend a Recovery.')
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

Additionally, when you use your I’m No Threat ability, you can take the Disengage move action as part of that ability.`
				})
			]
		},
		{
			level: 3,
			features: []
		},
		{
			level: 4,
			features: []
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'shadow-sub-3-5-1',
					name: 'Harlequin Gambit',
					description: `
Whenever you reduce an adjacent non-minion creature to 0 Stamina, you can immediately use a free maneuver to use your I’m No Threat ability and then move up to your speed.

If the creature is the same size as you, you can disguise yourself as them using I’m No Threat without spending insight. If you do, while I’m No Threat is active, the creature’s body is disguised to look like your body. The illusion ends on their body if another creature physically interacts with it. When the illusion would end for either you or the creature’s body, it ends for both.`
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'shadow-sub-3-6-1',
					name: '6th-Level College Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-3-6-1a',
									name: 'Look!',
									description: 'You distract your foes, allowing your allies to take advantage of that distraction.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
									target: 'Each enemy in the area',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('Until the start of your next turn, any ability roll made against a target gains an edge.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-3-6-1b',
									name: 'Puppet Strings',
									description: 'You prick little needles on the tips of your fingers into the nerves of your enemies and cause them to lose control.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [
										FactoryLogic.distance.createMelee()
									],
									target: 'Two enemies',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '2 damage; if the target has R < [weak], before the damage is resolved, they make a free strike.',
											tier2: '5 damage; if the target has R < [average], before the damage is resolved, they use a main action ability of your choice.',
											tier3: '7 damage; if the target has R < [strong], before the damage is resolved, they can shift up to their speed and use a main action ability of your choice.'
										})),
										FactoryLogic.createAbilitySectionText('You choose the new targets for the original target’s free strike or ability. Additionally, if you are hidden or disguised, using this ability doesn’t cause you to be revealed.')

									]
								})
							}),
							value: 1
						}

					]
				})
			]
		},
		{
			level: 7,
			features: []
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.create({
					id: 'shadow-sub-3-8-1',
					name: 'Parkour',
					description: 'Your movement no longer provokes opportunity attacks. Additionally, you can use your Harlequin Gambit feature as a free triggered action when a creature is reduced to 0 Stamina by your Clever Trick ability.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'shadow-sub-3-9-1',
					name: '9th-Level College Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-3-9-1a',
									name: 'I Am You',
									description: 'Your mask reflects your foe’s face. Surely they won’t need it much longer.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'One creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('Until the end of the encounter, you gain the target’s damage immunities and speed (if they are better than yours), and can use any types of movement they can use. You can also use the target’s signature ability, using their bonus for the power roll.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-3-9-1b',
									name: 'It Was Me All Along',
									description: 'After everything you’ve been through together, you twist the blade and make the pain extra personal.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature or object',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '15 + A damage',
											tier2: '21 + A damage',
											tier3: '28 + A damage'
										})),
										FactoryLogic.createAbilitySectionText('If you are disguised as a creature the target knew using your I’m No Threat ability, this ability deals extra damage equal to three times your Agility score.')
									]
								})
							}),
							value: 1
						}
					]
				})
			]
		},
		{
			level: 10,
			features: []
		}
	],
	selected: false
};
