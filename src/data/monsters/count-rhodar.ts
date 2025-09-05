import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const countRhodar: MonsterGroup = {
	id: 'monster-group-count-rhodar',
	name: 'Count Rhodar von Glauer',
	description: `
After falling to a vampiric curse in his early twenties, Count Rhodar—the last Lord of Glauer—ruled his tiny, heavily forested mountainous county in eastern Rhöl for three hundred years. There were worse overlords, the people said. After all, Rhodar took his pact with the people and the land seriously. He aggressively defended the villages in his demesne against constant incursions from rival counts and barons. He believed his power waxed and waned with the prosperity of the people and the vitality of the land.

Each new moon, when the Red Tax came due, the count would visit a young candidate, then emerge with renewed vitality. Across the land, folk feared their Dragon Count, but the witches of the wood wove a prophecy: “The land’s darkest hour shall be the redemption of House von Glauer.”

Eventually, the conquering force of Emperor Gaius VIII came for Rhodar—not because he was a vampire, but because the empire wanted his land and people. Count von Glauer was staked, and his body burned to ash. The emperor kept the Rod of Count Rhodar von Glauer as a trophy, and with this symbol of authority, he sealed his claim to the land.

Under new rule, Rhodar’s people lament the absence of their lord, recalling the time before the coming of the empire as a golden age. But the witches’ whispers can still be heard. For as long as the people of Glauer persist, they continue believing their Dragon Count will return in their darkest hour to deliver them from tyranny.`,
	picture: null,
	information: [
		{
			id: 'count-rhodar-info-1',
			name: 'Excerpt from the Chronicle of the Chain of Acheron',
			description: `
“In those days the Chain was in service to the Emperor Gaius VIII, third of the Five Crusading Emperors, and 27th Emperor of Caelia. Gaius continued the crusades started by his illustrious granduncle. Those were profitable days for the Chain, the Wheel, and the Gate. While the other Helltroopers waded into the deserts of Khoursir and Khemhara, we battled in the forests of Vaslor. We had it easy. I hate deserts.

“Thinking his vampiric power would save him, Count Rhodar von Glauer waited until he was fulsome in his strength before trying to extend his dark realm into Caelian territory. But we know how to deal with vampires. The black and gold standard of the von Glauer family reads, “I do the devil’s work.” We can attest to that. We lost many souls to that long siege, but in the end, we staked him. An old woman howled at us saying, “He is the land!” but we hear that stuff all the time. We sacked his castle, burned his forest and orchards, and delivered his staff to the emperor. That was harder than it sounds. Finger had to drop it in one of his bottomless sacks to stop the mists from coming. What the emperor will do with it, I don’t know. I fear that staff may hold more than the power to make the mist.”

- Dancer, Chronicler of the Chain of Acheron, Heroes 228`
		},
		{
			id: 'count-rhodar-info-2',
			name: 'A Lordly Beast',
			description: `
In spite of the fact that he literally preyed upon them (though only one a month!) the people of Glauer seemed to take great pride in their immortal count. Many historical sources record Von Glauer’s noble bearing. He took his role as protector and defender of the people and their well-being seriously, in keeping with the traditions of classical nobility. Invited guests must be treated with decency, insults demand apology or satisfaction. Debts must be repaid, treaties honored.

Those who violated the law or threatened his people met a very different Count. It was said he stalked his enemies in the guise of a great wolf, or wingéd gangrenous beast.

In his humanoid form he treated guests, even enemy commanders with honor and dignity. What his demeanor might be should he return is unknown.`
		},
		{
			id: 'count-rhodar-info-3',
			name: 'The Darkest Hour',
			description: `
It’s been over a thousand years since The Chain of Acheron staked Von Glauer, but the wise women of Rhöl speak as though the Dragon Count is merely on vacation. Ajax killed the Earl of Rhöl during his conquest of Vasloria but has yet to dispatch anyone to rule in their stead.

For people of Glauer, the wise women’s prophesy feels close. They sense the import of the times in which they live, and expect Ajax or one of his lieutenants to return to rule with an iron fist. The people speak openly now of their Dragon Count returning to defend them against this possibility.

How his return might be possible is not clear, but it would surely involve the Rod of Count Rhodar Von Glauer, currently held under the city of Capital in the Great Reliquary of the Last Emperor, also known as Ringwell.`
		},
		{
			id: 'count-rhodar-info-4',
			name: 'Count Rhodar’s Languages',
			description: 'Rhodar speaks Caelian and Vaslorian.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'count-rhodar-malice-1',
			name: 'Slip',
			cost: 3,
			sections: [
				'During this turn, Rhodar can move through creatures and objects at his usual speed, but can’t end his turn inside a creature or object. Additionally, he doesn’t take damage from being force moved.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'count-rhodar-malice-2',
			name: 'Solo Action',
			cost: 5,
			sections: [
				'Rhodar takes an additional main action on his turn. He can use this feature even if he is dazed.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'count-rhodar-malice-3',
			name: 'Suffocating Dark',
			cost: 5,
			sections: [
				'Rhodar throws one of his spears into an unoccupied space within 10 squares, or chooses one of his spears that he has already thrown. Until that spear returns to him or he uses this feature again, the spear emanates magical darkness in a 5 aura. Rhodar can see through this darkness, and any enemy is suffocating while in the darkness.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'count-rhodar-malice-4',
			name: 'The Mirror Lies',
			cost: 7,
			sections: [
				'Rhodar chooses two creatures or objects within 20 squares of him. The targets immediately teleport to swap places. Any enemy teleported by this feature who has I<5 is dazed until the end of their next turn.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'count-rhodar-1',
			name: 'Count Rhodar von Glauer',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Undead', 'Vampire' ],
			encounterValue: 144,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(12, 'fly, hover, teleport'),
			stamina: 650,
			stability: 3,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(3, 5, 2, 2, 3),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'count-rhodar-1-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 10 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 10 })
					]
				}),
				FactoryLogic.feature.createSoloMonster({
					id: 'count-rhodar-1-2',
					name: 'Rhodar',
					gender: 'm',
					endEffect: 20
				}),
				FactoryLogic.feature.create({
					id: 'count-rhodar-1-3',
					name: 'Grave Ward',
					description: 'Rhodar has damage immunity 5. If he takes holy damage, he loses this immunity until the end of the round.'
				}),
				FactoryLogic.feature.create({
					id: 'count-rhodar-1-4',
					name: 'Thin the Blood',
					description: 'Each enemy within 10 squares of Rhodar takes a −2 penalty to saving throws.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'count-rhodar-1-5',
						name: 'Spear of the Damned',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2),
							FactoryLogic.distance.createRanged(15)
						],
						target: 'Three creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '13 damage; A<4 restrained (save ends)',
									tier2: '18 damage; A<5 restrained (save ends)',
									tier3: '21 damage; A<6 restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('A target restrained this way is impaled by a spear. Rhodar has four spears, each of which can be used to impale a target. At the start can summon any of his spears back to himself, ending the restrained condition on an impaled target.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'count-rhodar-1-6',
						name: 'Disarming Glare',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes an **Intuition test**.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '16 corruption damage; frightened (save ends)',
									tier2: '13 corruption damage; frightened (EoT)',
									tier3: '8 corruption damage'
								})
							),
							FactoryLogic.createAbilitySectionText('While a target is frightened this way, Rhodar ignores banes and double banes on abilities used against them.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'count-rhodar-1-7',
						name: 'Vermilion Fangs',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '17 corruption damage; M<4 bleeding (save ends) and prone',
									tier2: '24 corruption damage; prone; M<5 bleeding (save ends)',
									tier3: '30 corruption damage; prone; M<6 the target is bleeding until the end of the encounter'
								})
							),
							FactoryLogic.createAbilitySectionText('Rhodar regains Stamina equal to half the damage dealt.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'count-rhodar-1-8',
						name: 'Sanguineous Flourish',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '6 damage, 2 corruption damage; push 2; M<4 bleeding (save ends)',
									tier2: '6 damage, 7 corruption damage; push 5; M<5 bleeding (save ends)',
									tier3: '6 damage, 10 corruption damage; push 7; M<6 bleeding (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('Rhodar shifts up to his speed before or after using this ability. He regains Stamina equal to half the total corruption damage dealt.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'count-rhodar-1-9',
						name: 'Vengeance of Rhöl',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createSpecial('Two 3 cubes within 5') ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('Each area is saturated with vengeful spirits until the end of the round. Any enemy who enters the area for the first time in a round or starts their turn there takes 5 corruption damage. At the end of the round, the spirits violently disperse. Each enemy within 2 squares of an area and has P<5 is weakened (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'count-rhodar-1-10',
						name: 'Reactive Rebuke',
						type: FactoryLogic.type.createTrigger('A creature within distance makes a strike against Rhodar.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'The triggering creature',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionText('A target who has I<5 is frightened. This effect ends if the target is 11 or more squares from Rhodar.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'count-rhodar-1-11',
					name: 'Lord’s Bloodthirst',
					description: 'Rhodar has speed 15 and an edge on power rolls while any creature within 20 squares of him is bleeding. Any bleeding creature within 10 squares of Rhodar can’t hide.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'count-rhodar-1-12',
						name: 'Red Tide',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 8, within: 15 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '8 corruption damage; A<4 the target is blood soaked (save ends)',
									tier2: '13 corruption damage; A<5 the target is blood soaked (save ends)',
									tier3: '16 corruption damage; A<6 the target is blood soaked until the end of the encounter'
								})
							),
							FactoryLogic.createAbilitySectionText('While a creature is blood soaked, Rhodar has a double edge on abilities used against them.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'count-rhodar-1-13',
						name: 'Sanguine Mist',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes a **Presence test**.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Presence,
									tier1: '16 corruption damage; the target is bleeding until the end of the encounter',
									tier2: '13 corruption damage; bleeding (save ends)',
									tier3: '8 corruption damage'
								})
							),
							FactoryLogic.createAbilitySectionText('Rhodar teleports to an unoccupied space in the area. If he has lost the damage immunity from his Grave Ward trait, he regains it.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'count-rhodar-1-14',
						name: 'Fires of Dracul',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 15, value2: 3, within: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '10 fire damage; R<4 weakened (save ends)',
									tier2: '16 fire damage; R<5 weakened (save ends)',
									tier3: '20 fire damage; R<6 weakened (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('Rhodar teleports to an unoccupied space adjacent to one target after the ability resolves.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
