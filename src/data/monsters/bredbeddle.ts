import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const bredbeddle: MonsterGroup = {
	id: 'monster-group-bredbeddle',
	name: 'Bredbeddle',
	description: `
In their true forms, bredbeddles are ogre-sized, headless giants. Forever searching for their missing heads, they are drawn to populous lands, where they decapitate passers-by and magically adopt their victims’ forms.

Although bredbeddles have no traditional sensory organs of their own, they are keenly aware of their surroundings. Some lurk along dark country lanes in their monstrous true forms. Others walk disguised among crowds, dropping their facades only long enough to waylay a stranger and lop off their head.`,
	information: [
		{
			id: 'bredbeddle-info-1',
			name: 'Immortal Wanderers',
			description: 'Bredbeddles don’t age, and if they are slain, their bodies reform a few days later. Long ago, bredbeddles were giants who stood high among the nobility of giant kind. But when they declared themselves rulers of all giant kind, their kin thwarted the coup and beheaded the bredbeddles. Now these fallen nobles search the world for their missing heads, each wielding the axe that decapitated them. Many claim their heads are kept for safekeeping in a fire giant’s cellar to be returned after an indeterminate period of good behavior (which no bredbeddles has exhibited thus far).'
		},
		{
			id: 'bredbeddle-info-2',
			name: 'Green with Frenzy',
			description: `
The longer a bredbeddle goes without a head, the more twisted and desperate their power grows. Their desire to be whole stretches out of their body in the form of shadowy dark-green ribbons, wrapping around and clinging to every surface they spill onto.

Travelers warn one another of roads rumored to be haunted by “wild green knights,” often avoiding the routes for months. No journey is worth losing your head over.`
		},
		{
			id: 'bredbeddle-info-3',
			name: 'Bredbeddle Languages',
			description: 'When a bredbeddle communicates, they usually use the languages that their head’s previous owner knew or High Kuric. A bredbeddle that’s taken multiple heads over their lifetime will most likely know Caelian as well.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'bredbeddle-malice-1',
			name: 'Engreen',
			cost: 3,
			sections: [
				'The bredbeddle’s axe lengthens and turns a ghastly green, increasing the distance of the bredbeddle’s melee strikes and the dimensions of their area abilities by 1 until the end of their turn.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'bredbeddle-malice-2',
			name: 'Shadow Stockade',
			cost: 5,
			sections: [
				'A ghostly size-1L stockade seeps out from under the bredbeddle’s feet into an unoccupied square within 10 squares. When a size-1L or smaller enemy enters the stockade’s square, they are restrained (save ends). When a restrained creature frees themself, the stockade fades away. At the start of each of the bredbeddle’s subsequent turns, they can slide the stockade and any creature in it up to 3 squares.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'bredbeddle-malice-3',
			name: 'Green Phantom',
			cost: 7,
			sections: [
				'A phantom second bredbeddle phases into view, appearing in an unoccupied space anywhere on the encounter map, then vanishing at the end of the round. The phantom bredbeddle shares the original bredbeddle’s statistics, has 24 stamina, corruption immunity 10, and can �ly. The phantom bredbeddle can take one turn and use any of the bredbeddle’s abilities except for villain actions. Only one phantom bredbeddle can be active during an encounter.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'bredbeddle-1',
			name: 'Bredbeddle',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Bredbeddle', 'Giant' ],
			encounterValue: 50,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 300,
			stability: 4,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(3, 0, -3, 1, 2),
			features: [
				FactoryLogic.feature.createSoloMonster({
					id: 'bredbeddle-feature-1',
					name: 'the bredbeddle'
				}),
				FactoryLogic.feature.create({
					id: 'bredbeddle-feature-2',
					name: 'Resilient Form',
					description: 'The bredbeddle can’t be physically transformed in any way except by their Heady or Not trait.'
				}),
				FactoryLogic.feature.create({
					id: 'bredbeddle-feature-3',
					name: 'Heady or Not',
					description: `
While headless, the bredbeddle can move into a space with a severed head and attach it to their neck as an action. Doing so physically transforms the bredbeddle, who takes on the size, weight, reach, and stability of the head’s original owner. These eﬀects last until the bredbeddle is killed or beheaded, or until the head falls oﬀ after 24 hours. A head that falls oﬀ this way can no longer be attached to the bredbeddle.

A creature must succeed on a hard **Might test** made as a maneuver to rip a head oﬀ the bredbeddle. If they fail, the bredbeddle makes a free strike against them.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bredbeddle-feature-4',
						name: 'Executioner\'s Swing',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the burst',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '2 damage; A<1 bleeding (save ends)',
							tier2: '4 damage; A<2 bleeding (save ends)',
							tier3: '5 damage; A<3 bleeding (save ends)'
						}),
						spend: [
							{ value: 3, effect: 'The bredbeddle shifts up to 2 squares and can target addtional enemies who come within distance of this ability during the move.' }
						]

					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bredbeddle-feature-5',
						name: 'Lop',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature',
						cost: 3,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage; bleeding (save ends) or M<1 beheaded (see effect)',
							tier2: '13 damage; bleeding (save ends) or M<2 beheaded (see effect)',
							tier3: '16 damage; bleeding (save ends) or M<3 beheaded (see effect)'
						}),
						effect: 'A beheaded target has their head fall into an unoccupied square adjacent to the bredbeddle, but they remain alive. While beheaded, the target is bleeding and can’t establish line of effect beyond 1 square. The beheaded target can survive without their head for 24 hours, and can reattach their head with a maneuver by entering its square. A target who remains beheaded for 24 hours dies.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bredbeddle-feature-6',
						name: 'Scramble',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf('while headless') ],
						target: 'Self',
						effect: 'The bredbeddle shifts up to their speed, and can push each creature who comes within their reach during the movement 1 square. Each square the bredbeddle exits during the movement becomes difficult terrain.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bredbeddle-feature-7',
						name: 'Headway',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One creature or object',
						cost: 5,
						preEffect: 'The bredbeddle must have a head in their possession (attached to them or not), which they throw at the target. If the head was attached, the bredbeddle becomes headless.',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage; M<1 dazed (save ends)',
							tier2: '13 damage; prone; M<2 dazed (save ends)',
							tier3: '16 damage; prone; M<3 dazed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bredbeddle-feature-8',
						name: 'Envious Imitation',
						cost: 2,
						type: FactoryLogic.type.createTrigger('A creature targets the bredbeddle with a ranged strike.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The bredbeddle uses the same ability against the triggering creature, using that creature’s bonus to any power rolls they have to make.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bredbeddle-feature-9',
						name: 'Turn Green',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: 'P<1 The target turns green (save ends)',
							tier2: 'P<2 The target turns green (save ends)',
							tier3: 'P<3 The target turns green until the end of the encounter'
						}),
						effect: 'Green shadows crawl out from under the bredbeddle’s feet and attempt to turn each target green. The bredbeddle has a double edge on attacks made against targets turned green until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bredbeddle-feature-10',
						name: 'Challenge',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One enemy',
						effect: `
The bredbeddle points at the target and issues them a challenge. If the target refuses, they turn green until the end of the encounter (see Turn Green).

If the target accepts, the bredbeddle shifts to a space adjacent to the target, who must make a hard **Might test** with no additional modifiers. On success, the target can choose to deal 40 damage to the bredbeddle or remove the bredbeddle’s head. On failure, the target is beheaded (see Lop).`
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bredbeddle-feature-11',
						name: 'Headlam Rampage',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Four creatures',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '6 damage; bleeding (save ends) or A<1 beheaded',
							tier2: '7 damage; bleeding (save ends) or A<2 beheaded',
							tier3: '8 damage; bleeding (save ends) or A<3 beheaded (see Lop)'
						})
					})
				})
			]
		})
	],
	addOns: []
};
