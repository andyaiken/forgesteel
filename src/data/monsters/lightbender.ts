import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { StatBlockIcon } from '@/enums/stat-block-icon';

export const lightbender: MonsterGroup = {
	id: 'monster-group-lightbender',
	name: 'Lightbender',
	description: 'Lightbenders prowl deserts, plains, forests—any sunbathed wilderness where they can take advantage of the adaptations that make them skilled daylight predators. This monstrous creature’s fur bends and refracts light from the surrounding environment, producing mirages that distract and confuse their prey.',
	picture: null,
	information: [
		{
			id: 'lightbender-info-1',
			name: 'Hidden Hunters',
			description: 'At a distance, a lightbender looks akin to a regular lion, but closer inspection reveals their glowing eyes, iridescent mane, and a pair of lashing tails spiked with refractive crystals. The lightbender’s pelt magically warps light around them to disguise their movement, letting them teleport while leaving behind a past visual imprint. Unsuspecting prey rarely realize they’re staring at an afterimage of the lightbender until the predator pounces.'
		},
		{
			id: 'lightbender-info-2',
			name: 'Ghostly Echoes',
			description: 'Lightbenders can also bend the sounds they make, enabling them to almost completely disappear during a hunt. Many can delay their footsteps to slip into a silent prowl, while others might throw a guttural trill across a field to lure prey out of hiding. The lightbenders’ illusory mastery was said to inspire several techniques taught to shadows within the College of the Harlequin Mask.'
		},
		{
			id: 'lightbender-info-3',
			name: 'Protective Companions',
			description: 'Though lightbenders are typically solitary creatures, they sometimes cross into another lightbender’s territory to help protect a newborn litter of kittens. A few people have succeeded in taming lightbenders as guards or hunting beasts, and if treated well, they can make loyal protectors, often viewing their smaller humanoid companions as surrogate kittens.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'lightbender-malice-1',
			name: 'Silent Prowl',
			cost: 3,
			icon: StatBlockIcon.Trait,
			sections: [
				'Each lightbender acting this turn can teleport up to their speed as a move action and attempt to hide as a free maneuver, all until the start of their next turn.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'lightbender-malice-2',
			name: 'Duplicate',
			cost: 5,
			icon: StatBlockIcon.Trait,
			sections: [
				'Each lightbender acting this turn can create a duplicate lightbender in an unoccupied space adjacent to them. The duplicate is indistinguishable from the lightbender except by supernatural means, has 1 Stamina, and has the lightbender’s speed. A duplicate acts on the lightbender’s turn but can take only move actions. Once per round before or after using an ability, a lightbender can trade places with any lightbender duplicate.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'lightbender-malice-3',
			name: 'Everything the Light Touches',
			cost: 7,
			icon: StatBlockIcon.AuraBurst,
			sections: [
				'Each lightbender in the encounter shines radiantly, distorting the senses of any enemy within 5 squares of them. Each affected enemy makes a **Reason test.**',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: 'The target doesn’t have line of effect to any lightbender (save ends).',
					tier2: 'The target doesn’t have line of effect to any lightbender (EoT).',
					tier3: 'No effect.'
				})
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'lightbender-1',
			name: 'Lightbender',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Ambusher),
			keywords: [ 'Beast', 'Lightbender' ],
			encounterValue: 20,
			speed: FactoryLogic.createSpeed(10),
			stamina: 100,
			stability: 1,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(2, 1, -3, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lightbender-1-feature-1',
						name: 'Flash Swipe',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '9 damage',
									tier2: '14 damage',
									tier3: '18 damage'
								})
							),
							FactoryLogic.createAbilitySectionText('If this ability gains an edge or has a double edge, it deals an extra 4 damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lightbender-1-feature-2',
						name: 'Piercing Tails',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '8 damage',
									tier2: '12 damage; M<1 bleeding (save ends)',
									tier3: '15 damage; M<2 bleeding (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('While bleeding this way, the target takes a bane on tests to search for the lightbender while they are hidden.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lightbender-1-feature-3',
						name: 'Hypnotic Mane',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: 'I<0 dazed (save ends)',
									tier2: 'I<1 dazed (save ends)',
									tier3: 'I<2 dazed (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('While dazed this way, a target has speed 0. If a target takes damage, or if someone else uses a main action to shake the target out of their stupor, the dazed condition ends.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lightbender-1-feature-4',
						name: 'Stalker\'s Afterimage',
						type: FactoryLogic.type.createTrigger('The lightbender takes damage from a strike.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The lightbender halves the damage, ignores any nondamaging effects associated with it, and can teleport up to 5 squares. If they teleport into concealment or cover, the lightbender can immediately attempt to hide as a free maneuver.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'lightbender-1-feature-5',
					name: 'Avoidance',
					description: 'Any effect on the lightbender that would be ended by a saving throw instead ends automatically at the end of their next turn.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'lightbender-2',
			name: 'Lightbender Pouncer',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Harrier),
			keywords: [ 'Beast', 'Lightbender' ],
			encounterValue: 20,
			speed: FactoryLogic.createSpeed(10),
			stamina: 100,
			stability: 1,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 5,
			characteristics: FactoryLogic.createCharacteristics(2, 2, -3, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lightbender-2-feature-1',
						name: 'Pounce',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '7 damage',
									tier2: '11 damage; A<1 prone',
									tier3: '14 damage; A<2 prone'
								})
							),
							FactoryLogic.createAbilitySectionText('The pouncer can make a free strike against each target they knock prone.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lightbender-2-feature-2',
						name: 'Sparkling Tail Whip',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '4 damage',
									tier2: '7 damage; A<1 the target is dazzled (save ends)',
									tier3: '10 damage; A<2 the target is dazzled (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('A dazzled target takes a bane on strikes and has line of effect only within 1 square.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lightbender-2-feature-3',
						name: 'Illusory Feint',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'Each enemy in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: 'I<0 dazed (save ends)',
									tier2: 'I<1 dazed (save ends)',
									tier3: 'I<2 dazed (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('While dazed this way, a target has speed 0. If a target takes damage, or if someone else uses a main action to shake the target out of their stupor, the dazed condition ends.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lightbender-2-feature-4',
						name: 'Striking Afterimage',
						type: FactoryLogic.type.createTrigger('The pouncer takes damage from a strike.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The pouncer halves the damage, ignores any nondamaging effects associated with it, and can teleport up to 5 squares. If they teleport into concealment or cover, the pouncer can immediately attempt to hide as a free maneuver.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'lightbender-2-feature-5',
					name: 'Avoidance',
					description: 'Any effect on the pouncer that would be ended by a saving throw instead ends automatically at the end of their next turn.'
				})
			]
		})
	],
	addOns: [
	]
};
