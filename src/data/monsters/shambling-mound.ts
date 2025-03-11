import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const shamblingMound: MonsterGroup = {
	id: 'monster-group-shambling-mound',
	name: 'Shambling Mound',
	description: `
The lush ground squelches under every footstep. Curtains of menacing vines block the way, and muffled groans echo distantly under the darkening canopy. By the time you realize the ground is moving, it’s too late— the shambling mound has devoured you.

Found in overgrown swamps, stinking marshes, dense wodes, and dark, damp rainforests, the shambling mound is a wandering mass of vegetation that feeds on everything in their path.`,
	information: [
		{
			id: 'shambling-mound-info-1',
			name: 'Noxious Origins',
			description: `
A shambling mound is most often a byproduct of nearby hags or mages, especially evil ones or those utilizing green magic. Latent magic seeps into the surrounding land, coalescing into a nocuous creature consumed by hunger. The shambling mound knows only that they must grow, and to grow they must feed—and thus they drag themself in search of a hunting ground.

It is believed these magical origins are what give shambling mounds their ability to produce poisons. These poisons range from region to region—for example, the toxins from a shambling mound along coastal beaches or swamps might appear milky white and smell sweet like manchineel trees, while shambling mounds found in rainforests might give off a heady, intoxicating sweet scent at night, luring victims in with beautiful pale blooms like angel’s trumpets and producing intense hallucinations for those unfortunate enough to become poisoned.

While more specific effects may vary, each shambling mound’s toxins typically have the same aim: enervate their foes, so that they might magically absorb that strength and vitality.`
		},
		{
			id: 'shambling-mound-info-2',
			name: 'Hearty Eaters',
			description: 'As a shambling mound drags their massive form through the undergrowth, they consume any organic matter they pass. When they find a good place to lurk until a meal comes to them, the result is far more satisfying. After a mound engulfs their prey—be they animal or adventurer—the meal-to-be is sealed in a sack of interwoven vines and leaves. This vegetative hunter can then sap the strength of those within to feast or empower itself.'
		},
		{
			id: 'shambling-mound-info-3',
			name: 'Verdant Core and Expansive Sprawl',
			description: `
When fighting a shambling mound, most attention is drawn to the cavernous chamber that holds their consumed victims. However, the shambling mound protects a smaller magical core with a knot of vines, leaves, and other natural defenses. The mound can expose this core to free up their form and become deadlier, thus opening themselves up, in turn, for more harm.

One must also be wary of the area around a shambling mound—their vines reach out far, the full extent of their form hidden amongst other flora until they strike enemies from afar.`
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'shambling-mound-malice-1',
			name: 'Poisoned Vines',
			cost: 3,
			sections: [
				'The shambling mound seeps noxious residue from its vines and deals 12 poison damage against both targets the next time they use their Vine Lash action before the end of their next turn.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'shambling-mound-malice-2',
			name: 'Grasp and Squeeze',
			cost: 5,
			sections: [
				'The shambling mound writhes, lashing out at each enemy within 10 to snatch them into the air, crush them, and drop them. Each target makes an **Agility test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '7 damage; A<3 vertical or horizontal push 5; restrained',
					tier2: '6 damage; M<2 vertical or horizontal push 3',
					tier3: '3 damage'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'shambling-mound-malice-3',
			name: 'Leeching Wilds',
			cost: 7,
			sections: [
				'Until the end of the shambling mound’s next turn, the area within 10 squares of them is considered diﬃcult terrain for enemies. An enemy who starts their turn in an aﬀected square takes 4 acid damage, and the shambling mound regains an equal amount of Stamina. An enemy has a bane on power rolls while occupying an aﬀected square.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'shambling-mound-1',
			name: 'Ashen Hoarder',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Plant', 'Shambling Mound' ],
			encounterValue: 70,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(3),
			stamina: 400,
			stability: 5,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(4, -1, 0, 1, 0),
			features: [
				FactoryLogic.feature.createSoloMonster({
					id: 'shambling-mound-feature-1',
					name: 'the shambling mound'
				}),
				FactoryLogic.feature.create({
					id: 'shambling-mound-feature-2',
					name: 'Engulfing Sack',
					description: 'The shambling mound has a vegetable sack on their body where they carry engulfed creatures. The sack has 30 Stamina, damage immunity 5, and ﬁre weakness 10. Destroying the sack frees creatures trapped by the shambling mound’s Engulf action. The shambling mound regrows the sack at the beginning of their next turn.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shambling-mound-feature-3',
						name: 'Vine Lash',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(6) ],
						target: '2 creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '11 damage; A<3 grabbed',
							tier2: '16 damage; A<4 grabbed',
							tier3: '19 damage; grabbed'
						}),
						spend: [
							{ value: 2, effect: 'The shambling mound can slide one or both targets up to 6 squares.' },
							{ value: 3, effect: 'Each target takes 7 poison damage.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shambling-mound-feature-4',
						name: 'Seismic Slam',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 6 }) ],
						target: 'Each enemy in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '4 damage; M<2 dazed (save ends)',
							tier2: '6 damage; M<3 dazed (save ends)',
							tier3: '7 damage; M<4 dazed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shambling-mound-feature-5',
						name: 'Engulf',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee(6) ],
						target: 'One creature or object',
						cost: 2,
						effect: 'The shambling mound reaches out with writhing vines and A<3 engulfs an enemy size 1L or smaller into their sack. The potency increases by 1 if the target is grabbed by the shambling mound. An engulfed creature is restrained, takes 3 poison damage at the start of each turn of combat, and can’t take damage from abilities used from outside the sack. When the shambling mound moves, the engulfed creature moves with them. If the mound dies or their engulfing sack is destroyed, each engulfed creature is freed and shunted to an unoccupied square within 2 squares.',
						spend: [
							{
								value: 2,
								repeatable: true,
								effect: 'The shambling mound can engulf 1 additional enemy for every 2 malice spent.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shambling-mound-feature-6',
						name: 'Leech',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Each creature trapped by Engulf',
						effect: '5 poison damage. The shambling mound gains 5 temporary Stamina for each creature affected by this maneuver.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shambling-mound-feature-7',
						name: 'Tether Down',
						type: FactoryLogic.type.createTrigger('A creature within distance moves.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee(6) ],
						target: 'One creature',
						cost: 1,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '7 damage; M<2 restrained (EoT)',
							tier2: '12 damage; M<3 restrained (EoT)',
							tier3: '15 damage; M<4 restrained (EoT)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'shambling-mound-feature-8',
					name: 'False Appearance',
					description: 'While the shambling mound remains motionless, they are indistinguishable from ordinary vegetation.'
				}),
				FactoryLogic.feature.create({
					id: 'shambling-mound-feature-9',
					name: 'Frothing Flora',
					description: 'The area within 6 squares of the shambling mound is considered diﬃcult terrain.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shambling-mound-feature-10',
						name: 'Ravenous Overgrowth',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 2, within: 1 }) ],
						target: 'All creatures in the line',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '7 damage; pull 3',
							tier2: '12 damage; pull 4; target gains poison weakness 3 until the encounter ends',
							tier3: '15 damage; pull 6; target gains poison weakness 5 until the encounter ends'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shambling-mound-feature-11',
						name: 'Composting',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(6) ],
						target: 'All enemies',
						effect: 'The shambling mound attempts to devour each enemy within distance with its Engulf action without spending malice.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shambling-mound-feature-12',
						name: 'Exposed Crux',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The shambling mound rips themself apart to lay waste, exposing the crux of magic holding them together. The distance of the shambling mound’s melee abilities increases to 10, they have a double edge on power rolls, and strikes have an edge against them.'
					})
				})
			]
		})
	],
	addOns: []
};
