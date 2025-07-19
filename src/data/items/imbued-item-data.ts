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
							description: 'You gain an edge on Presence tests to win people other creatures over or make a good impression.'
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
						feature: FactoryLogic.feature.create({
							id: 'disguise',
							name: 'Disguise',
							description: 'You can use a maneuver to cause this armor to appear as any type of clothing that you have been in the presence of—a noble’s dress, a guard’s uniform, a cultist’s robes, and so forth. The armor loses none of its protective qualities while transformed into other clothing.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'iridescent',
							name: 'Iridescent',
							description: 'When you are the sole target of an ability, you can use a free triggered action to reveal that the ability was targeting an afterimage of you in the same space as you. The power roll for the ability is treated as an 11. You can’t use this enhancement again until you earn a Victory.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'magic-resistance-i',
							name: 'Magic Resistance I',
							description: 'Your characteristic scores are considered 1 higher (to a maximum of 2) for the purpose of resisting the potencies of magic abilities.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'nettlebloom',
							name: 'Nettlebloom',
							description: 'Whenever you are grabbed by a creature adjacent to you, your armor sprouts toxic nettles. While an adjacent creature has you grabbed, they are weakened.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'phasing-i',
							name: 'Phasing I',
							description: 'Once per turn, you can move through 1 square of solid matter. If you end your turn inside solid matter, you take 5 damage, which can’t be reduced in any way, and are shunted out into the space from which you entered it.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'psionic-resistance-i',
							name: 'Psionic Resistance I',
							description: 'Your characteristic scores are considered 1 higher (to a maximum of 2) for the purpose of resisting the potencies of psionic abilities.'
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
						feature: FactoryLogic.feature.create({
							id: 'tempest-i',
							name: 'Tempest I',
							description: 'As a maneuver, you can infuse this armor with the essence of a storm. The first time an adjacent creature makes deals damage to you before the end of your next turn, they take lightning damage equal to your highest characteristic score and you can push them 1 square.'
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
							id: 'absorption',
							name: 'Absorption',
							description: `
Whenever you are targeted by a supernatural ability that targets only one creature, you can use a free triggered action to cause this armor to absorb the ability after the ability’s effects resolve. While the armor has an ability absorbed, you can’t absorb another.

You can use an absorbed ability as if you knew it, making power rolls for the ability using your choice of Reason, Intuition, or Presence. You don’t need to spend any resources to activate the ability. Once you use the ability, the armor loses it, and you can absorb another.`
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
						feature: FactoryLogic.feature.create({
							id: 'dragon-soul',
							name: 'Dragon Soul',
							description: `
When another creature causes you to be winded or dying, you can use a free triggered action to cause the soul of a dragon to emerge from this armor and hurtle toward the creature. Make the following power roll against the creature:

**Power Roll + Highest Characteristic**:
* **11-**: 8 damage; push 3
* **12–16**: 12 damage; push 4
* **17+**: 15 damage; push 5`
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
							description: 'Your characteristic scores are considered 2 higher (to a maximum of 3) for the purpose of resisting the potencies of magic abilities. This benefit replaces Magic Resistance I.'
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
							description: 'Your characteristic scores are considered 2 higher (to a maximum of 3) for the purpose of resisting the potencies of psionic abilities. This benefit replaces Psionic Resistance I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'reactive',
							name: 'Reactive',
							description: 'Whenever you take damage, you gain damage immunity 2 until the end of your next turn after resolving the triggering damage.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'second-wind',
							name: 'Second Wind',
							description: 'Whenever you become winded, you can use a free triggered action to spend a Recovery.'
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
							description: 'When you use the armor’s Tempest I enhancement, the affected creature takes 8 lightning damage and you push them up to 3 squares.'
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
							description: 'Your movement gains the Fly keyword. Additionally, if an effect would make you prone while flying, you can choose to not go prone by losing Stamina equal to the distance you would have fallen from becoming prone.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'dragon-soul-ii',
							name: 'Dragon Soul II',
							description: `
While you are winded, your head transforms into a dragon’s head, and you gain the following ability.

**Dragon's Fire**
You open your maw and unleash hell.
**Keywords**: Area, Magic, Melee
**Type**: Action
**Distance**: 5 × 1 line within 1
**Target**: Each enemy in the line
**Power Roll + Highest Characteristic**:
* **11-**: 5 fire damage
* **12–16**: 8 fire damage
* **17+**: 11 fire damage`
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'invulnerable',
							name: 'Invulnerable',
							description: 'When a power roll made against you has a result of 11 or lower, you can ignore its damage and effects.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'leyline-walker',
							name: 'Leyline Walker',
							description: 'Once per turn, you can spend any amount of your movement to instead teleport that distance.'
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
							description: 'The benefits of the armor’s Magic Resistance II enhancement extend to each ally within 3 squares of you.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'phasing-iii',
							name: 'Phasing III',
							description: 'Your movement doesn’t provoke opportunity attacks, and you can move through enemy spaces as if they were allies. You can’t end your turn in an enemy’s space.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'psionic-resistance-iii',
							name: 'Psionic Resistance III',
							description: 'The benefits of the armor’s Psionic Resistance II trait extend to each ally within 3 squares of you.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'temporal-flux',
							name: 'Temporal Flux',
							description: `
Whenever you move out of a square, you can choose to leave an imprint behind that lasts until the end of the encounter, until your imprint takes 20 or more damage, or until you create a new imprint. The square is occupied by your imprint, and you can share that space with it.

During your turn, you can teleport to the imprint’s space as a free maneuver. When you are targeted by an ability, you can use a free triggered action to teleport to your imprint, and the power roll for the ability is treated as an 11.`
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
		description: 'Implements are jewelry, orbs, staffs, tomes, wands, weapons, and other objects used by magic and psionic users to focus their power. You decide what object to imbue when you create an implement treasure, but it must be an object you can carry or wear. You must have a mundane version of the item you plan to imbue when you begin this project. An implement imbued with an enhancement grants you special benefits while it is wielded.',
		type: ItemType.ImbuedImplement,
		customizationsByLevel: [
			{
				level: 1,
				features: [
					{
						feature: FactoryLogic.feature.create({
							id: 'berserking',
							name: 'Berserking',
							description: 'Whenever you damage a creature using a supernatural ability and obtain a tier 3 result on the power roll, that creature must make an opportunity attack against their nearest ally (if possible) after the ability’s effects resolve. This strike deals extra damage equal to the highest of your Reason, Intuition, or Presence scores.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'displacing-i',
							name: 'Displacing I',
							description: 'Whenever you damage a creature using a supernatural ability and obtain a tier 3 result on the power roll, you can teleport that creature up to 2 squares after the ability’s effects resolve. If the creature started on a horizontal surface, they must end on a horizontal surface.'
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
							description: 'Whenever you use a supernatural ability to push or pull a creature, you can move that creature an additional 2 squares.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'rat-form',
							name: 'Rat Form',
							description: 'As a maneuver, you can transform into a rat. Your equipment transforms with you. As a rat, you have a speed of 5 with the Climb keyword, your size is 1T, and you can see in the dark. You can speak and keep your skills while in rat form, but your Might becomes −5 and you lose all your regular abilities, features, and benefits. You can revert to your natural form as a maneuver, and do so automatically if you take any damage.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'rejuvenating-i',
							name: 'Rejuvenating I',
							description: 'Whenever you use an ability that costs 1 or more Heroic Resources, roll a d10. On a 9 or higher, you gain 1 Heroic Resource.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'seeking',
							name: 'Seeking',
							description: 'Your ranged magic and psionic abilities gain a +2 distance bonus. Additionally, if you speak the name of a specific person, place, or object to the implement, the implement points toward that target, provided you are on the same world.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'thought-sending',
							name: 'Thought Sending',
							description: 'Your ranged magic and psionic abilities gain a +2 distance bonus. Additionally, you can telepathically speak with any willing creature who knows a language and whose name you know, provided they are on the same world as you. You must initiate the conversation, but once you do, the creature can respond until you end the conversation.'
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
							description: 'Immediately after using a supernatural ability that requires an action, you can shift up to 3 squares, or you can use the Escape Grab maneuver as a free maneuver.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'celestine',
							name: 'Celestine',
							description: 'As an action, you conjure up to three stars, which hover in unoccupied squares of your choice within 5 squares of you. The stars remain in place, and disappear if you create more stars. When an enemy enters any star’s space, the star detonates and is destroyed, and the enemy takes 10 fire damage. You can also slide the enemy 1 square if they are within line of effect. Otherwise, the enemy slides 1 square in a random direction.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'displacing-ii',
							name: 'Displacing II',
							description: 'When you use the implement’s Displacing I enhancement, you can teleport the creature up to 4 squares. Additionally, the creature takes a bane on their next power roll made before the end of their next turn.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'erupting-i',
							name: 'Erupting I',
							description: 'Whenever you damage a creature using a supernatural ability that targets only a single creature and obtain a tier 3 result on the power roll, each enemy within 2 squares of the creature takes 3 fire damage after the ability’s effects resolve.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'forceful-ii',
							name: 'Forceful II',
							description: 'Whenever you use a supernatural ability to push or pull a creature, you can move that creature an additional 3 squares. This replaces the benefit of Forceful I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'hallucinatory',
							name: 'Hallucinatory',
							description: 'As a maneuver, you create an area of sensory instability in a 2 aura centered on yourself. The area is difficult terrain for your enemies until the end of the encounter or until you are dying.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'lingering-i',
							name: 'Lingering I',
							description: 'Whenever you damage a creature using a supernatural ability and obtain a tier 3 result on the power roll, that creature takes 8 damage at the start of your next turn.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'rejuvenating-ii',
							name: 'Rejuvenating II',
							description: 'Whenever you use an ability that costs 1 or more Heroic Resources, roll a d10. On an 8 or higher, you gain 1 Heroic Resource, and you can spend a Recovery. This replaces the benefit of Rejuvenating II.'
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
							description: 'Whenever you damage a creature using a supernatural ability and obtain a tier 3 result on the power roll, that creature is also weakened (save ends). If the creature is within 10 squares of you when this weakened effect ends, you can make a free strike against them as a free triggered action.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'displacing-iii',
							name: 'Displacing III',
							description: 'When you use the implement’s Displacing I enhancement, you can teleport the creature up to 5 squares. Additionally, the creature then has a bane on their next power roll made before the end of their next turn.'
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
							description: 'Whenever you use a supernatural ability to push or pull a creature, you can move that creature an additional 3 squares, and that movement can be vertical. This replaces the benefit of Forceful II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'lingering-ii',
							name: 'Lingering II',
							description: 'Whenever you damage a creature using a supernatural ability and obtain a tier 3 result on the power roll, that creature takes 15 damage at the start of your next turn. This replaces the benefit of Lingering I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'piercing',
							name: 'Piercing',
							description: 'Your supernatural abilities ignore damage immunities.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'psionic-siphon',
							name: 'Psionic Siphon',
							description: 'Once per turn when you damage one or more creatures with a supernatural ability and obtain a tier 3 result on the power roll, you gain Stamina equal to your highest characteristic score, and one creature you damage takes an additional 5 damage.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'rejuvenating-iii',
							name: 'Rejuvenating III',
							description: 'Whenever you use an ability that costs 1 or more Heroic Resources, roll a d10. On a 7 or higher, you gain 1 Heroic Resource, and you or a creature of your choice within 3 squares of you can spend a Recovery. This replaces the benefit of Rejuvenating II.'
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
									description: 'You and each ally within 3 squares of you has their characteristic scores considered 1 higher for the purpose of resisting potencies.'
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
						feature: FactoryLogic.feature.create({
							id: 'blood-bargain',
							name: 'Blood Bargain',
							description: 'As a maneuver, you can harm yourself with the weapon, taking 1d6 damage that can’t be reduced in any way. An ally within 5 squares can then spend a Recovery.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'chilling-i',
							name: 'Chilling I',
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature takes 3 cold damage.'
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
							id: 'hungering-i',
							name: 'Hungering I',
							description: 'Whenever you damage a creature other than yourself using this weapon, you regain Stamina based on the tier result of the power roll—3 Stamina for tier 1, 5 for tier 2, and 8 for tier 3. You can’t regain this Stamina if you’re dying.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'hurling',
							name: 'Hurling',
							description: 'Whenever you use an ability with a melee distance using this weapon, you can throw the weapon by treating the ability’s distance as Ranged 3 instead. When the ability is resolved, the weapon returns to your hand. Any ability used when you throw this weapon can’t impose the grabbed or restrained conditions.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'merciful',
							name: 'Merciful',
							description: 'Whenever you reduce a non-undead to 0 Stamina using this weapon, the creature falls unconscious and wakes up 1d6 hours later. A creature with the Heal skill can wake the unconscious creature early with 1 minute of medical treatment. Whenever the creature wakes, they regain 1 Stamina.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'terrifying-i',
							name: 'Terrifying I',
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature takes 3 psychic damage.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'thundering-i',
							name: 'Thundering I',
							description: 'Whenever you damage a creature using this weapon, you can push that creature up to 2 squares after the other effects of the ability resolve.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'vengeance-i',
							name: 'Vengeance I',
							description: 'Whenever you use this weapon with an ability against a creature who has dealt damage to you since the end of your last turn, you gain a +2 damage bonus on the ability.'
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
						feature: FactoryLogic.feature.create({
							id: 'chargebreaker',
							name: 'Chargebreaker',
							description: `
While you wield this weapon, you have the following ability.
**Stop Right There**
Their momentum, your impact.
**Keywords**: Melee, Strike, Weapon
**Type**: Free Triggered Action
**Distance**: Melee 1
**Target**: 1 enemy
**Trigger**: The target moves into a space adjacent to you.
**Effect**: The target takes 5 damage.`
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'chilling-ii',
							name: 'Chilling II',
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature takes 6 cold damage and is slowed (save ends). This replaces the benefit of Chilling I.'
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
						feature: FactoryLogic.feature.create({
							id: 'hungering-ii',
							name: 'Hungering II',
							description: 'Whenever you damage a creature other than yourself using this weapon, you regain Stamina based on the tier result of the power roll—4 Stamina for tier 1, 10 Stamina for tier 2, and 15 Stamina for tier 3. You can’t regain this stamina if you’re dying. This replaces the benefit of Hungering I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'metamorphic',
							name: 'Metamorphic',
							description: `
You can change this weapon’s shape and form as a maneuver, granting one of the following benefits of your choice:
* **Concealed**: The weapon shrinks to the size of a piece of jewelry and can be worn as an earring, necklace, or similar accessory. While in this form, the weapon can’t be used for weapon abilities.
* **Large**: The distance of abilities using this weapon increases by 1 for melee abilities, or by 3 for ranged abilities.
* **Vicious**: Whenever you damage a creature using this weapon, you deal 1 extra damage on a tier 1 result, 2 extra damage on a tier 2 result, and 3 extra damage on a tier 3 result.`
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'silencing',
							name: 'Silencing',
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature also can’t use magic abilities (EoT).'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'terrifying-ii',
							name: 'Terrifying II',
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature takes 10 psychic damage and is frightened (save ends). This replaces the benefit of Terrifying I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'thundering-ii',
							name: 'Thundering II',
							description: 'Whenever you damage a creature using this weapon, you can push that creature up to 4 squares after the other effects of the ability resolve. If you obtained a tier 3 result on the power roll for the ability, the creature is also knocked prone after being pushed. This replaces the benefit of Thundering I.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'vengeance-ii',
							name: 'Vengeance II',
							description: 'Whenever you use this weapon with an ability against a creature who has dealt damage to you since the end of your last turn, you gain a +4 damage bonus on the ability. This replaces the benefit of Vengeance I.'
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
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature takes 9 psionic cold damage and is slowed (save ends). This replaces the benefit of Chilling II.'
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
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature is also weakened (save ends). Each time you weaken a creature with this weapon, you gain one surge.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'hungering-iii',
							name: 'Hungering III',
							description: 'Whenever you damage a creature other than yourself using this weapon, you regain Stamina based on the tier result of the power roll—5 Stamina for tier 1, 12 for tier 2, or 20 for tier 3. Additionally, while you are dying, you gain an edge on abilities that use this weapon. This replaces the benefit of Hungering II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'imprisioning',
							name: 'Imprisioning',
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature is also restrained (save ends). While restrained in this way, the creature can’t use supernatural abilities.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'nova',
							name: 'Nova',
							description: `
Whenever you damage a creature using this weapon, each enemy within 1 square of you takes damage based on the tier result of the power roll—2 damage for tier 1, 6 for tier 2, or 10 for tier 3. Additionally, while you are winded, you gain the following ability.
**Nova**
I am an eternal flame, baby!
**Keywords**: Area, Magic, Melee
**Distance**: 3 burst
**Type**: Action
**Target**: All enemies
**Power Roll + Highest Characteristic**:
* **11-**: 7 fire damage
* **12–16**: 11 fire damage
* **17+**: 16 fire damage`
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'terrifying-iii',
							name: 'Terrifying III',
							description: 'Whenever you damage a creature using this weapon and obtain a tier 3 result on the power roll, that creature takes 6 psychic damage and is frightened (save ends). This replaces the benefit of Terrifying II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'thundering-iii',
							name: 'Thundering III',
							description: 'Whenever you damage a creature or object using this weapon, after the other effects of the ability resolve, you can vertical push that creature up to 5 squares and knock them prone. If the creature takes or deals damage as a result of this movement, they take 5 thunder damage. This replaces the benefit of Thundering II.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'vengeance-iii',
							name: 'Vengeance III',
							description: 'Whenever you use this weapon with an ability against a creature who has dealt damage to you since the end of your last turn, you gain a +6 damage bonus on the ability. This replaces the benefit of Vengeance III.'
						}),
						selected: false
					},
					{
						feature: FactoryLogic.feature.create({
							id: 'windcutting',
							name: 'Windcutting',
							description: 'Whenever you use a melee signature ability that normally targets one creature, you can take a bane on the ability to target each enemy in a cube 3 within distance. If your signature ability would normally cause its target to become grabbed or restrained, each target in the area is instead slowed (EoT) instead.'
						}),
						selected: false
					}
				]
			}
		]
	});
}
