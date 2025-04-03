import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const dragonThorn: MonsterGroup = {
	id: 'monster-group-dragon-thorn',
	name: 'Dragon, Thorn',
	description: 'Thorn dragons take root in the destitution of nature and are cultivated by the suffering of those who struggle against the green’s cruelty. Though a region’s people may have long overcome past famine, the desperation of those who came before has already nurtured their future scourge. These dragons appear born of the wood, living thickets bedecked in torturous thorns. With twisting briar horns and wings shaped by tangled roots, thorn dragons embody the richness of nature they so readily constrict the life from.',
	information: [
		{
			id: 'dragon-thorn-info-1',
			name: 'Conquerors of the Green',
			description: `
Thorn dragons cultivate their lairs in lush farmlands or flourishing forests. They overtake these beautiful regions with massive briar thickets, choking out the existing flora until the only thing that can grow are their own brambles. 

In forests, this ravaging drives out the local fauna smart enough to flee rather than foolishly fight against the wood’s new ruler. When a thorn dragon establishes their lair over a village’s farmlands, the populace either wisely flees or starves for their pride.`
		},
		{
			id: 'dragon-thorn-info-2',
			name: 'Natural Curators',
			description: 'More intelligent dragons seek all forms of riches for their hoard, but thorn dragons have no eye for manmade treasures. Instead, they amass the wealth of the wild they represent. Thorn dragons stockpile food, even food they won’t eat, alongside uncut gemstones, minerals and ore, wood, oils, and spices.'
		},
		{
			id: 'dragon-thorn-info-3',
			name: 'Bestial Instincts',
			description: `
Compared to more powerful dragons, thorn dragons are closer to beasts. They are incapable of speech and act primarily on instinct to expand their territory, defend their lair, and grow their hoard. 

Despite this, some villages manage to avoid being driven from their homes or starved within them—at the expense of being dependent on a thorn dragon’s bestial ego. These villagers come to a tenuous understanding with the dragon, trading it the kinds of treasure it desires in exchange for meager foodstuffs from the dragon’s hoard.`
		},
		{
			id: 'dragon-thorn-info-4',
			name: 'Territorial Bloodletters',
			description: 'Thorn dragons are highly territorial against unexpected threats to their lair. In order to defend their home, these dragons take advantage of the thicket—by dragonsealing intruders, pushing and pulling them across the briars and letting the thorns bleed them dry. When the brambles aren’t enough, thorn dragons either imbue the barbs with poison or breathe the toxins directly, taking advantage of another way to slowly drain the life from their enemies.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'dragon-thorn-malice-1',
			name: 'Cage of Thorns',
			cost: 3,
			sections: [
				'A dragon sealed enemy within the encounter map is restrained (EoT) as a cage of thorns is grown around them.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-thorn-malice-2',
			name: 'Bramble Barricade',
			cost: 5,
			sections: [
				'The dragon grows a 10 Wall of briars in unoccupied spaces on the encounter map. The wall doesn\'t block line of effect for the dragon, but it does for other creatures. Each sqaure of the wall has 5 Stamina and fire weakness 5. A creature who is force moved into this wall takes an additional 1 damage per square moved and is bleeding (EoT).'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-thorn-malice-3',
			name: 'Afflictive Overgrowth',
			cost: 7,
			sections: [
				'The dragon rapidly grows poisonous, biting thorns around their foes. Each enemy within the encounter map must make an **Agility test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '12 poison damage; restrained (save ends)',
					tier2: '9 poison damage; bleeding (save ends)',
					tier3: '5 poison damage; bleeding (EoT)'
				})
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'dragon-thorn-1',
			name: 'Thorn Dragon',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Dragon', 'Elemental' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(8, 'fly'),
			stamina: 250,
			stability: 6,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 3, -1, 1, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'dragon-thorn-feature-1',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				}),
				FactoryLogic.feature.createSoloMonster({
					id: 'dragon-thorn-feature-2',
					name: 'thorn dragon'
				}),
				FactoryLogic.feature.create({
					id: 'dragon-thorn-feature-3',
					name: 'Withering Wyrmsacle Aura',
					description: 'The dragon’s scales emit a 2 aura barrier of withering green magic. When a creature in the aﬀected area regains Stamina, they only regain half the Stamina. A winded creature who enters an aﬀected square or starts their turn there takes 1d6 poison damage.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-4',
						name: 'Virulent Breath',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 1, within: 1 }) ],
						target: 'All enemies',
						cost: 'signature',
						preEffect: 'Each target makes a **Might test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Might,
							tier1: '12 poison damage; P<4 dragonsealed (save ends)',
							tier2: '9 poison damage; P<3 dragonsealed (save ends)',
							tier3: '5 poison damage; P<2 dragonsealed (save ends)'
						}),
						effect: 'Until the condition ends, a creature dragonsealed by the dragon has their wounds overtaken by nettles and thorns, and they take an additional die of damage from conditions that deal damage, the dragon’s Wyrmscale Aura, and the dragon’s Malign Thicket Villain Action.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-5',
						name: 'Spinous Tail Swing',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two enemies or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; push 2',
							tier2: '12 damage; push 4',
							tier3: '17 damage; push 8'
						}),
						spend: [
							{
								value: 3,
								effect: 'Each target is A<3 bleeing (save ends).'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-6',
						name: 'Investiture of Verdure',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'All dragonsealed enemies',
						cost: 5,
						effect: 'Each target is pulled 5 toward the dragon. For each creature pulled, the dragon gains 5 temporary Stamina.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-7',
						name: 'Provoking Nettles',
						type: FactoryLogic.type.createManeuver({ free: true }),
						keywords: [],
						distance: [],
						target: '',
						effect: 'Once per turn, the dragon shifts 5 and can move through enemies at normal speed. The ﬁrst time the dragon passes through a creature’s space during this movement, the creature takes 3 damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-8',
						name: 'Prickly Situation',
						type: FactoryLogic.type.createTrigger('A creature successfully saves to end their dragonsealed condition.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Triggering creature',
						effect: 'The target is pulled 5 towards the dragon is restrained (EoT).'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-9',
						name: 'Thorny Scales',
						type: FactoryLogic.type.createTrigger('A creature deals damage to the dragon with a melee strike.', { free: true }),
						cost: 1,
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Triggering creature',
						effect: 'The dragon makes a free strike against the target. The target is M<2 bleeding (EoT).'
					})
				}),
				FactoryLogic.feature.create({
					id: 'dragon-thorn-feature-10',
					name: 'Thorn Dragon\'s Domain',
					description: 'If the encounter map is a location the dragon has occupied for 1 week or more, each space on the map is considered diﬃcult terrain for all creatures except for the dragon. Each such creature who moves within the area takes 1 damage for each square they enter. A creature restrained in this area is also bleeding.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-11',
						name: 'Briar Bindings',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 damage, A<2 restrained (save ends)',
							tier2: '9 damage, A<3 restrained (save ends)',
							tier3: '12 damage, A<4 restrained (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-12',
						name: 'Thorned Armor',
						type: FactoryLogic.type.createVillainAction(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The dragon grows longer, sharper thorns upon their scales. A creature who targets the dragon with a melee strike takes 3 damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-13',
						name: 'Malign Thicket',
						type: FactoryLogic.type.createVillainAction(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The dragon’s domain becomes imbued with deadly poison. A creature who takes damage from the dragon’s domain or from striking the dragon takes an additional 1d6 poison damage.'
					})
				})
			]
		})
	],
	addOns: []
};
