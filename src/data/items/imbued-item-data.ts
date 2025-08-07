import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { Item } from '../../models/item';
import { ItemType } from '../../enums/item-type';

export class ImbuedItemData {
	static imbuedArmor: Item = FactoryLogic.createItem({
		id: 'imbued-armor',
		name: 'Imbued Armor',
		description: 'Armor imbued with an enhancement grants you special benefits while it is worn.',
		type: ItemType.ImbuedArmor,
		customizationsByLevel: [
			{
				level: 1,
				features: [
					{
						feature: FactoryLogic.feature.create({
							id: 'awe-charming',
							name: 'Awe: Charming',
							description: 'You gain an edge on Presence tests made to win other creatures over or make a good impression.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'awe-threatening',
							name: 'Awe: Threatening',
							description: 'You gain an edge on Presence tests made to intimidate, coerce, or bully.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'damage-immunity-i',
							name: 'Damage Immunity I',
							description: 'Select three damage types. You have immunity 5 to those damage types.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'disguise',
								name: 'Disguise',
								type: FactoryLogic.type.createManeuver(),
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('You cause this armor to take the form of any type of clothing that you have been in the presence of—a noble’s dress, a guard’s uniform, a cultist’s robes, and so forth. The armor loses none of its protective qualities while transformed into other clothing.')
								]
							})
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'iridescent',
								name: 'Iridescent',
								type: FactoryLogic.type.createTrigger('You are the sole target of an ability', { free: true }),
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('You reveal that the ability was targeting an afterimage of you in the same space as you. The power roll for the ability is treated as an 11. You can’t use this enhancement again until you earn 1 or more Victories.')
								]
							})
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'magic-resistance-i',
							name: 'Magic Resistance I',
							description: 'Your characteristic scores are treated as 1 higher (to a maximum of 2) for the purpose of resisting the potencies of magic abilities.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'nettlebloom',
							name: 'Nettlebloom',
							description: 'Whenever you are grabbed by an adjacent creature, your armor sprouts toxic nettles. While that creature has you grabbed, they are weakened.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'phasing-i',
							name: 'Phasing I',
							description: 'Once per turn, you can move through 1 square of solid matter. If you end your turn inside solid matter, you are forced out into the space from which you entered it and you take 5 damage that can’t be reduced in any way.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'psionic-resistance-i',
							name: 'Psionic Resistance I',
							description: 'Your characteristic scores are treated as 1 higher (to a maximum of 2) for the purpose of resisting the potencies of psionic abilities.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createBonus({
							id: 'swift',
							name: 'Swift',
							field: FeatureField.Speed,
							value: 1
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'tempest-i',
								name: 'Tempest I',
								description: 'You infuse you armor with the essence of a storm.',
								type: FactoryLogic.type.createManeuver(),
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('The first time an adjacent creature deals damage to you before the end of your next turn, they take lightning damage equal to your highest characteristic score and you can push them 1 square.')
								]
							})
						}),
						selected: false
					}
				]
			},
			{
				level: 5,
				features: [
					{
						feature: FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'absorption',
								name: 'Absorption',
								type: FactoryLogic.type.createTrigger('You are targeted by a magic or psionic ability that targets only one creature', { free: true }),
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText(`
You cause this armor to absorb the ability after the ability’s effects resolve. While the armor has an ability absorbed, you can’t absorb another.

You can use an absorbed ability as if you knew it, making power rolls for the ability using your choice of Reason, Intuition, or Presence. You don’t need to spend any Heroic Resource to activate the ability. Once you use the ability, the armor loses it, and you can absorb another.`
									)
								]
							})
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'damage-immunity-ii',
							name: 'Damage Immunity II',
							description: 'The damage immunity conveyed by the armor increases to 10.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'dragon-soul',
								name: 'Dragon Soul',
								type: FactoryLogic.type.createTrigger('Another creature causes you to be winded or dying', { free: true }),
								distance: [ FactoryLogic.distance.createSpecial('') ],
								target: 'The triggering creature',
								sections: [
									FactoryLogic.createAbilitySectionRoll(
										FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
											tier1: '2 damage; push 3',
											tier2: '12 damage; push 4',
											tier3: '15 damage; push 5'
										})
									)
								]
							})
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'levitating',
							name: 'Levitating',
							description: 'On your turn, you can treat up to 5 consecutive squares of movement as flying movement. If you are still in midair at the end of your turn, you fall prone.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'magic-resistance-ii',
							name: 'Magic Resistance II',
							description: 'Your characteristic scores are treated as 2 higher (to a maximum of 3) for the purpose of resisting the potencies of magic abilities. This benefit replaces Magic Resistance I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'phasing-ii',
							name: 'Phasing II',
							description: 'When you use the armor’s Phasing I enhancement, you can move through 3 squares of solid matter per turn.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'psionic-resistance-ii',
							name: 'Psionic Resistance II',
							description: 'Your characteristic scores are treated as 2 higher (to a maximum of 3) for the purpose of resisting the potencies of psionic abilities. This benefit replaces Psionic Resistance I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'reactive',
							name: 'Reactive',
							description: 'Whenever you take damage, you have damage immunity 2 until the end of your next turn after the triggering damage is resolved.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'second-wind',
								name: 'Second Wind',
								type: FactoryLogic.type.createTrigger('You become winded', { free: true }),
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('Spend a recovery.')
								]
							})
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'shattering',
							name: 'Shattering',
							description: 'Whenever an enemy scores a critical hit against you, they take 10 sonic damage.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'tempest-ii',
							name: 'Tempest II',
							description: ' When you use the armor’s Tempest I enhancement, the affected creature takes 8 lightning damage and you push them up to 3 squares.'
						}),
						selected: false
					}
				]
			},
			{
				level: 9,
				features: [
					{
						feature: FactoryLogic.feature.create({
							id: 'devils-bargain',
							name: 'Devil\'s Bargain',
							description: 'You can fly. Additionally, if an effect would make you prone while flying, you can choose to not go prone by losing Stamina equal to the distance you would have fallen from becoming prone.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'dragon-soul-ii',
								name: 'Dragon Soul II',
								description: 'You open your maw and unleash hell.',
								type: FactoryLogic.type.createMain({ qualifiers: [ 'You are winded' ] }),
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 1, within: 1 }) ],
								target: 'Each enemy in the area',
								sections: [
									FactoryLogic.createAbilitySectionRoll(
										FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
											tier1: '5 fire damage',
											tier2: '8 fire damage',
											tier3: '11 fire damage'
										})
									)
								]
							})
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'invulnerable',
							name: 'Invulnerable',
							description: 'When an ability roll made against you obtains a tier 1 outcome, you can ignore its damage and effects.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'leyline-walker',
								name: 'Leyline Walker',
								type: FactoryLogic.type.createMove(),
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('Once per turn you can spend any amount of your movement to instead teleport that distance.')
								]
							})
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'life',
							name: 'Life',
							description: 'Whenever you would die, you can spend a Recovery to regain Stamina instead. If you have no Recoveries to spend, you die.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'magic-resistance-iii',
							name: 'Magic Resistance III',
							description: 'The benefit of the armor’s Magic Resistance II enhancement extends to each ally within 3 squares of you.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'phasing-iii',
							name: 'Phasing III',
							description: 'Your movement doesn’t provoke opportunity attacks, and you can move through the space of any enemy as if they were an ally. You can’t end your turn in an enemy’s space.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'psionic-resistance-iii',
							name: 'Psionic Resistance III',
							description: 'The benefit of the armor’s Psionic Resistance II enhancement extends to each ally within 3 squares of you.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createMultiple({
							id: 'temporal-flux',
							name: 'Temporal Flux',
							description: 'Whenever you move out of a square, you can choose to leave an imprint behind that lasts until the end of the encounter, until your imprint takes 20 or more damage, or until you create a new imprint. The square is occupied by your imprint, and you can share that space with it.',
							features: [
								FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: 'temporal-flux-a',
										name: 'Temporal Flux',
										type: FactoryLogic.type.createManeuver({ free: true }),
										distance: [ FactoryLogic.distance.createSpecial('') ],
										target: 'Self',
										sections: [
											FactoryLogic.createAbilitySectionText('You teleport to the imprint’s space')
										]
									})
								}),
								FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: 'temporal-flux-b',
										name: 'Temporal Flux',
										type: FactoryLogic.type.createTrigger('You are targeted by an ability', { free: true }),
										distance: [ FactoryLogic.distance.createSpecial('') ],
										target: 'Self',
										sections: [
											FactoryLogic.createAbilitySectionText('You teleport to your imprint, and the power roll for the ability is an automatic tier 1 result.')
										]
									})
								})
							]
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'unbending',
							name: 'Unbending',
							description: 'You can’t be subjected to forced movement unless you choose to be. Effects that ignore Stability also ignore this enhancement.'
						}),
						selected: false
					}
				]
			}
		]
	});

	static imbuedImplement: Item = FactoryLogic.createItem({
		id: 'imbued-implement',
		name: 'Imbued Implement',
		description: `
Implements are jewelry, spectacles, orbs, staffs, tomes, wands, weapons, and other objects used by those who channel magic and psionic power to focus that power. You decide what object to imbue when you create an implement treasure, but it must be an object you can carry or wear. You must have a mundane version of the item you plan to imbue when you start this project. 

An implement imbued with an enhancement grants you special benefits while it is wielded.`,
		type: ItemType.ImbuedImplement,
		customizationsByLevel: [
			{
				level: 1,
				features: [
					{
						feature: FactoryLogic.feature.create({
							id: 'berserking',
							name: 'Berserking',
							description: 'Whenever you damage a creature using a magic or psionic ability and obtain a tier 3 outcome, that creature must make an opportunity attack against their nearest ally if possible after the ability’s effects resolve. This strike deals extra damage equal to the highest of your Reason, Intuition, or Presence scores.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'displacing-i',
							name: 'Displacing I',
							description: 'Whenever you damage a creature using a magic or psionic ability and obtain a tier 3 outcome, you can teleport that creature up to 2 squares after the ability’s effects resolve. If the creature started on a horizontal surface, they must end on a horizontal surface.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'elemental',
							name: 'Elemental',
							description: 'Whenever you use an ability with the Air, Earth, Fire, Green, Rot, Void, or Water keyword, you can attune this implement to that element until the end of the encounter. While the implement is attuned, you gain an edge on power rolls with that elemental keyword. The implement can be attuned to only one element at a time.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'forceful-i',
							name: 'Forceful I',
							description: 'Whenever you use a magic or psionic ability to push or pull a creature, you can move that creature an additional 2 squares.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'rat-form',
								name: 'Rat Form',
								type: FactoryLogic.type.createManeuver(),
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('You transform into a rat. Your equipment transforms with you. As a rat, you have speed 5 and can automatically climb at full speed while moving, your size is 1T, and you can see in the dark. You can speak and keep your skills while in rat form, but your Might is −5 and you lose all your regular abilities, features, and benefits. You can revert to your natural form as a maneuver, and do so automatically if you take any damage.')
								]
							})
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'rejuvenating-i',
							name: 'Rejuvenating I',
							description: 'Whenever you use an ability that costs 1 or more of your Heroic Resource, roll a d10. On a 9 or higher, you gain 1 Heroic Resource.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'seeking',
							name: 'Seeking',
							description: 'Your ranged magic or psionic abilities gain a +2 distance bonus. Additionally, if you think the name of a specific creature, place, or object to the implement, the implement points toward that target, provided you are on the same world.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'thought-sending',
							name: 'Thought Sending',
							description: 'Your ranged magic and psionic abilities gain a +2 distance bonus. Additionally, you can telepathically communicate with any willing creature who knows a language and whose name you know, provided they are on the same world as you. You must initiate the conversation, but once you do, the creature can respond until you end the conversation.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createBonus({
							id: 'warding-i',
							name: 'Warding I',
							field: FeatureField.Stamina,
							value: 6
						}),
						selected: false
					}
				]
			},
			{
				level: 5,
				features: [
					{
						feature: FactoryLogic.feature.create({
							id: 'celerity',
							name: 'Celerity',
							description: 'Immediately after using a magic or psionic ability that requires a main action, you can shift up to 3 squares, or you can use the Escape Grab maneuver as a free maneuver.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'celestine',
								name: 'Celestine',
								type: FactoryLogic.type.createMain(),
								distance: [ FactoryLogic.distance.createSpecial('') ],
								target: 'Special; see below',
								sections: [
									FactoryLogic.createAbilitySectionText('You conjure up to three stars, which hover in unoccupied squares of your choice within 5 squares of you. The stars remain in place, and disappear if you create more stars. When an enemy enters any star’s space, the star detonates and is destroyed, and the enemy takes 10 fire damage. If you have line of effect to the enemy, you can also slide them 1 square. Otherwise, the enemy slides 1 square in a random direction.')
								]
							})
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'displacing-ii',
							name: 'Displacing II',
							description: 'When you use the implement’s Displacing I enhancement, you can teleport the creature up to 4 squares. Additionally, the creature takes a bane on their next power roll made before the end of their next turn'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'erupting-i',
							name: 'Erupting I',
							description: 'Whenever you damage a creature using a magic or psionic ability that targets only a single creature and obtain a tier 3 outcome, each enemy within 2 squares of the creature takes 3 fire damage after the ability’s effects resolve.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'forceful-ii',
							name: 'Forceful II',
							description: 'Whenever you use a magic or psionic ability to push or pull a creature, you can move that creature an additional 3 squares. This replaces the benefit of Forceful I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'hallucinatory',
								name: 'Hallucinatory',
								type: FactoryLogic.type.createManeuver(),
								distance: [ FactoryLogic.distance.create({type: AbilityDistanceType.Aura, value: 2}) ],
								target: 'Each enemy in the area',
								sections: [
									FactoryLogic.createAbilitySectionText('The area is difficult terrain for your enemies until the end of the encounter.')
								]
							})
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'lingering-i',
							name: 'Lingering I',
							description: 'Whenever you damage a creature using a magic or psionic ability and obtain a tier 3 outcome, that creature takes 8 damage at the start of your next turn.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'rejuvenating-ii',
							name: 'Rejuvenating II',
							description: 'Whenever you use an ability that costs 1 or more of your Heroic Resource, roll a d10. On an 8 or higher, you gain 1 Heroic Resource and you can spend a Recovery. This replaces the benefit of Rejuvenating I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createMultiple({
							id: 'warding-ii',
							name: 'Warding II',
							features: [
								FactoryLogic.feature.createBonus({
									id: 'warding-ii-a',
									field: FeatureField.Stamina,
									value: 6
								}),
								FactoryLogic.feature.create({
									id: 'warding-ii-b',
									name: 'Warding II',
									description: 'Your characteristic scores are considered 1 higher for the purpose of resisting potencies.'
								})
							]
						}),
						selected: false
					}
				]
			},
			{
				level: 9,
				features: [
					{
						feature: FactoryLogic.feature.create({
							id: 'anathema',
							name: 'Anathema',
							description: 'Whenever you damage a creature using a magic or psionic ability and obtain a tier 3 outcome, that creature is also weakened (save ends). If the creature is within 10 squares when this weakened effect ends, you can use a free triggered action to make a free strike against them.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'displacing-iii',
							name: 'Displacing III',
							description: 'When you use the implement’s Displacing I enhancement, you can teleport the creature up to 5 squares. Additionally, the creature takes a bane on their next power roll made before the end of their next turn.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'erupting-ii',
							name: 'Erupting II',
							description: 'The fire damage dealt by the implement’s Erupting I enhancement increases to 6.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'forceful-iii',
							name: 'Forceful III',
							description: 'Whenever you use a magic or psionic ability to push or pull a creature, you can move that creature an additional 3 squares and that movement can be vertical. This replaces the benefit of Forceful II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'lingering-ii',
							name: 'Lingering II',
							description: 'Whenever you damage a creature using a magic or psionic ability and obtain a tier 3 outcome, that creature takes 15 damage at the start of your next turn. This replaces the benefit of Lingering I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'piercing',
							name: 'Piercing',
							description: 'Your magic and psionic abilities ignore damage immunities.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'psionic-siphon',
							name: 'Psionic Siphon',
							description: 'Once per turn when you damage one or more creatures using a magic or psionic ability and obtain a tier 3 outcome, you gain Stamina equal to your highest characteristic score, and one creature you damage takes an extra 5 damage.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'rejuvenating-iii',
							name: 'Rejuvenating III',
							description: 'Whenever you use an ability that costs 1 or more of your Heroic Resource, roll a d10. On a 7 or higher, you gain 1 Heroic Resource, and you or a creature of your choice within 3 squares can spend a Recovery. This replaces the benefit of Rejuvenating II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createMultiple({
							id: 'warding-iii',
							name: 'Warding III',
							features: [
								FactoryLogic.feature.createBonus({
									id: 'warding-iii-a',
									field: FeatureField.Stamina,
									value: 6
								}),
								FactoryLogic.feature.create({
									id: 'warding-iii-b',
									name: 'Warding III',
									description: 'You and each ally within 3 squares of you has their characteristic scores considered 1 higher for the purpose of resisting potencies. This replaces the benefit of Warding II.'
								})
							]
						}),
						selected: false
					}
				]
			}
		]
	});

	static imbuedWeapon: Item = FactoryLogic.createItem({
		id: 'imbued-weapon',
		name: 'Imbued Weapon',
		description: 'A weapon imbued with an enhancement grants you special benefits while it is wielded.',
		type: ItemType.ImbuedWeapon,
		customizationsByLevel: [
			{
				level: 1,
				features: [
					{
						feature: FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'blood-bargain',
								name: 'Blood Bargain',
								type: FactoryLogic.type.createManeuver(),
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('You harm yourself with the weapon, taking 1d6 damage that can’t be reduced in any way. An ally within 5 squares can then spend a Recovery.')
								]
							})
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'chilling-i',
							name: 'Chilling I',
							description: 'Whenever you damage a creature with an ability using this weapon and obtain a tier 3 outcome, that creature takes 3 cold damage.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'disrupting-i',
							name: 'Disrupting I',
							description: 'Whenever you damage an undead using this weapon and leave that undead with 15 Stamina or less, they drop to 0 Stamina.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'hurling',
							name: 'Hurling',
							description: 'Whenever you use a melee ability using this weapon, you can throw the weapon by treating the ability’s distance as ranged 3 instead. When the ability is resolved, the weapon returns to your hand. Any ability used when you throw this weapon can’t impose the grabbed or restrained conditions.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'merciful',
							name: 'Merciful',
							description: 'Whenever you reduce a non-undead creature to 0 Stamina using this weapon, the creature falls unconscious and wakes up 1d6 hours later. A creature with the Heal skill can wake the unconscious creature early with 1 uninterrupted minute of medical treatment. Whenever the creature wakes, they regain 1 Stamina.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'terrifying-i',
							name: 'Terrifying I',
							description: 'Whenever you damage a creature with an ability using this weapon and obtain a tier 3 outcome, that creature takes 2 psychic damage.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'thundering-i',
							name: 'Thundering I',
							description: 'Whenever you deal rolled damage to a creature using this weapon, you can push that creature 1 square after the other effects of the ability resolve.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'vengeance-i',
							name: 'Vengeance I',
							description: 'Whenever you use a damage-dealing ability using this weapon against a creature who has dealt damage to you since the end of your last turn, the ability deals an extra 2 damage.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'wingbane',
							name: 'Wingbane',
							description: 'Whenever you damage a flying creature using this weapon, that creature is also bleeding (save ends). While bleeding in this way, the creature takes 1 damage per square they fly. If the creature starts and ends their turn on the same solid surface, the bleeding condition ends.'
						}),
						selected: false
					}
				]
			},
			{
				level: 5,
				features: [
					{
						feature: FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'chargebreaker',
								name: 'Chargebreaker',
								type: FactoryLogic.type.createTrigger('The target willingly moves adjacent to you', { free: true }),
								keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
								distance: [ FactoryLogic.distance.createMelee() ],
								target: 'One enemy',
								sections: [
									FactoryLogic.createAbilitySectionText('The target takes 5 damage.')
								]
							})
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'chilling-ii',
							name: 'Chilling II',
							description: 'Whenever you damage a creature with an ability using this weapon and obtain a tier 3 outcome, that creature takes 6 cold damage and is slowed (save ends). This replaces the benefit of Chilling I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'devastating',
							name: 'Devastating',
							description: 'Whenever you make an ability roll using this weapon, the number you need to roll to score a critical hit is reduced by 1.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'disrupting-ii',
							name: 'Disrupting II',
							description: 'Whenever you damage an undead using this weapon and leave that undead with 30 Stamina or less, they drop to 0 Stamina. This replaces the benefit of Disrupting I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'metamorphic',
								name: 'Metamorphic',
								type: FactoryLogic.type.createManeuver(),
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText(`
You can change this weapon’s shape and form, granting one of the following benefits of your choice:
* **Concealed**: The weapon shrinks to the size of a piece of jewelry and can be worn as an earring, necklace, or similar accessory. While in this form, the weapon can’t be used for weapon abilities.
* **Large**: Abilities using this weapon gain a +1 melee distance bonus or a +3 ranged distance bonus.
* **Vicious**: Whenever you damage a creature using this weapon, you deal an extra 1 damage on a tier 1 outcome, an extra 2 damage on a tier 2 outcome, and an extra 3 damage on a tier 3 outcome.`)
								]
							})
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'silencing',
							name: 'Silencing',
							description: 'Whenever you damage a creature with an ability using this weapon and obtain a tier 3 outcome, that creature also can’t use magic abilities until the end of their next turn.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'terrifying-ii',
							name: 'Terrifying II',
							description: 'Whenever you damage a creature with an ability using this weapon and obtain a tier 3 outcome, that creature takes 4 psychic damage and is frightened (save ends). This replaces the benefit of Terrifying I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'thundering-ii',
							name: 'Thundering II',
							description: 'Whenever you deal rolled damage to a creature using this weapon, you can push that creature up to 3 squares after the other effects of the ability resolve. If you obtained a tier 3 outcome, the creature is also knocked prone after being pushed. This replaces the benefit of Thundering I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'vengeance-ii',
							name: 'Vengeance II',
							description: 'Whenever you use a damage-dealing ability using this weapon against a creature who has dealt damage to you since the end of your last turn, the ability deals an extra 4 damage. This replaces the benefit of Vengeance I.'
						}),
						selected: false
					}
				]
			},
			{
				level: 9,
				features: [
					{
						feature: FactoryLogic.feature.create({
							id: 'chilling-iii',
							name: 'Chilling III',
							description: 'Whenever you damage a creature with an ability using this weapon and obtain a tier 3 outcome, that creature takes 9 cold damage and is slowed (save ends). This replaces the benefit of Chilling II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'disrupting-iii',
							name: 'Disrupting III',
							description: 'Whenever you damage an undead using this weapon and leave that undead with 50 Stamina or less, they immediately drop to 0 Stamina. If you instead leave the undead with 100 Stamina or less, they are frightened (save ends). This replaces the benefit of Disrupting II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'draining',
							name: 'Draining',
							description: 'Whenever you damage a creature with an ability using this weapon and obtain a tier 3 outcome, that creature is also weakened (save ends). Each time you weaken a creature with this weapon, you gain 1 surge.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'imprisioning',
							name: 'Imprisioning',
							description: 'Whenever you damage a creature with an ability using this weapon and obtain a tier 3 outcome, that creature is also restrained (save ends). While restrained in this way, the creature can’t use magic or psionic abilities.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'nova',
								name: 'Nova',
								description: 'I am an eternal flame, baby!',
								type: FactoryLogic.type.createMain(),
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
								target: 'Each enemy in the area',
								sections: [
									FactoryLogic.createAbilitySectionRoll(
										FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
											tier1: '7 fire damage',
											tier2: '11 fire damage',
											tier3: '16 fire damage'
										})
									)
								]
							})
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'terrifying-iii',
							name: 'Terrifying III',
							description: 'Whenever you damage a creature with an ability using this weapon and obtain a tier 3 outcome, that creature takes 6 psychic damage and is frightened (save ends). This replaces the benefit of Terrifying II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'thundering-iii',
							name: 'Thundering III',
							description: 'Whenever you deal rolled damage to a creature using this weapon, you can vertical push that creature up to 5 squares and knock them prone after the other effects of the ability resolve. If the creature takes or deals damage as a result of this movement, they also take 5 thunder damage. This replaces the benefit of Thundering II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'vengeance-iii',
							name: 'Vengeance III',
							description: 'Whenever you use a damage-dealing ability using this weapon against a creature who has dealt damage to you since the end of your last turn, the ability deals an extra 6 damage. This replaces the benefit of Vengeance II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'windcutting',
							name: 'Windcutting',
							description: 'Whenever you use a melee signature ability that usually targets one creature, you can take a bane on the ability to target each enemy in a cube 3 within distance. If your signature ability would usually cause its target to become grabbed or restrained, each target in the area is instead slowed until the end of their next turn.'
						}),
						selected: false
					}
				]
			}
		]
	});
}
