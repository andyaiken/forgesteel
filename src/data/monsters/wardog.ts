import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const warDog: MonsterGroup = {
	id: 'monster-group-wardog',
	name: 'War Dog',
	description: 'Ajax’s war dogs—brutal patchwork soldiers—owe their new lives to the Iron Saint and fight for him fanatically. War dog minions are the freshest recruits, possessing minimal patchwork qualities and generally treated as disposable. Those who survive a battle are rewarded with gifts from the Body Banks. Those who don’t survive become recycled back into the Body Banks to be reborn.',
	picture: null,
	information: [
		{
			id: 'wardog-1st-info-warning',
			name: 'Content Warning: Brainwashing and Body Horror',
			description: 'War dogs are explicitly evil soldiers built from the body parts of other humanoids. Check in with your players before running war dogs to make sure that they’re okay with battling brainwashed soldiers with an appearance akin to Frankenstein’s monster if he were built to be a shock trooper. If anyone is uncomfortable, modify the appearance and lore of the war dogs as you see fit.'
		},
		{
			id: 'wardog-1st-info-1',
			name: 'Withdrawn from the Body Banks',
			description: 'Body Bank technology stolen from the upper worlds allows for the storage, manipulation, and reuse of biological body parts, and this technology has been put to terrible use by Ajax and his followers. For the rich and powerful elite, the Body Banks serve as a source of reliable medical materials and even enhancements. For everyone else, they are a looming threat and a warning of what might happen to the disloyal. Those body parts not claimed by the upper classes are stitched, welded, and fused together to become an endless supply of twisted warriors.'
		},
		{
			id: 'wardog-1st-info-2',
			name: 'Soulless Soldiers',
			description: 'War dogs aren’t technically soulless: they have minds, wills, and a vital spark that separates them from the Undead, but their souls are as patchwork as their bodies. Congealed unnaturally from the shattered remains of their constituent parts, their mosaic souls are irrevocably damaged and only partially functional. War dogs are thus metaphysically unstable, incapable of higher spiritual functions like empathy or love, and their personalities and beliefs are highly malleable. This makes them the ideal disposable soldier for the discerning tyrant.'
		},
		{
			id: 'wardog-1st-info-3',
			name: 'Enlisted at Rebirth',
			description: `
From the moment they are reborn, every war dog is part of Ajax’s war machine. Fresh recruits undergo inspections and tests to ensure their viability and assess their capabilities, and those who are found lacking are immediately recycled. 

Those who meet the minimum requirements are sent to a brief but intense training camp, where they are drilled in basic combat, personal fitness, and unswerving loyalty. It is here that war dogs are first indoctrinated with Ajax’s ideals, and any who question those ideals are immediately recycled. Those who survive this training camp are fitted with loyalty collars—unremovable neck pieces fitted with explosive fuse-iron charges—and sent on to join a legion.`
		},
		{
			id: 'wardog-1st-info-4',
			name: 'Chain of Command',
			description: `Ajax leaves the management and tactical goals of individual legions to his hand-picked strategoi. Each strategos is an exceptionally talented war dog, often a veteran with dozens of upgrades and refinements, and is typically selected for their ability to think and plan. A strategos in turn appoints the most powerful and skilled war dogs in the legion to their inner council.

Below the inner council are hundreds of officers and thousands of soldiers. A single deviation from an order, no matter how rational or well considered, can get a lowly soldier sent back to the Body Banks. As such, lower-ranking war dogs rarely alter tactics or show initiative. Without an officer to command them, war dogs can easily turn into an unwieldy and stagnant force capable only of following their most recent orders.`
		},
		{
			id: 'wardog-1st-info-5',
			name: 'War Dog Tactics',
			description: `War dogs have a heavy focus on minion frontlines backed by captains with powerful control or support abilities. Those captains’ tactics reflect the replaceability of their low-ranking troops, who they throw into the fray without caution. Once a squad of minions is reduced to a few stragglers, a captain will order them into position for maximum effect and manually detonate their loyalty collars.

War dog captains are intelligent, well trained, and focused on prioritizing threats to their mission. Defensive and support units focus on tying up and slowing down high-Stamina threats while offensive units try their best to bully low-Stamina backline heroes. Unless ordered, retreat is not an option for war dogs.`
		},
		{
			id: 'wardog-2nd-info-1',
			name: 'Shrikeguns',
			description: 'The shrikegun is a new kind of weapon fit for a new kind of soldier. Each shrikegun is a rapid-firing bolt-thrower that replaces the draw of a crossbow with the compact energy of torsion springs. When loosed, a standard shrikegun throws a five-inch, iron-tipped wooden stake hard enough to reliably pierce steel plate at 50 yards. The stabilization grooves cut into the stakes create a shrill whistle when they are fired, leading to many less-disciplined armies breaking upon hearing the “shrike scream” of a loosed volley.'
		},
		{
			id: 'wardog-2nd-info-2',
			name: 'Fuse-Iron',
			description: 'Some war dogs use fuse-iron weapons that emit flames or cause explosions. While the exact properties of fuse-iron depend on its specific alloy and shape, the material is known for turning physical force into heat and light. Special arrangements of fuse-iron utilize crush cavities to create concussive detonations that are incredibly powerful, if not particularly reliable. Fuse-iron is expensive, accident-prone, and almost impossible to work with in large quantities, so that fuse-iron equipment is granted only to war dog specialists.'
		},
		{
			id: 'wardog-2nd-info-3',
			name: 'Houndweapons',
			description: 'Insubordinate war dogs are usually punished with a trip back to the Body Banks, but individuals who need to be made an example of are condemned to an even harsher fate: becoming a houndweapon. These living weapons are horrific blends of flesh, machine, and spirit created as powerful and terribly cruel tools of war. Only the highest-ranking and most capable war dogs can requisition houndweapons, given those living armaments’ power and the time and difficulty involved in making them.'
		},
		{
			id: 'wardog-3rd-info-1',
			name: 'Happy Accidents',
			description: 'Making war dogs is more art than science, and happy little accidents can create war dogs with unusual characteristics. These war dogs are given great attention by the flesh sculptors, both to further improve the abilities of these deviants and to learn how to replicate their creation.'
		},
		{
			id: 'wardog-3rd-info-2',
			name: 'Made to Order',
			description: `War dogs are most often made by playing the odds, with each new resurrection assumed to create certain ratios of infantry, mages, specialists, and so on. However, by radically altering their creation processes and providing special materials, war dogs can be made who bear little resemblance to any humanoid, and who possess power beyond that of any typical conscript.

These monstrous war dogs are developed to fulfill specific roles and combat niches, and are often fused with inorganic materials after their rebirth as living war machines. Monstrous war dogs are uniformly respected for having been chosen for greatness, and they consider their unnatural forms a badge of honor bestowed by Ajax.`
		},
		{
			id: 'wardog-4th-info-1',
			name: 'Castellan Hoplon',
			description: 'Hoplon’s scars are not from the Body Banks, but from years of combat and hard-fought sieges. A master of the harrying retreat, the holdfast, and the last stand, Hoplon is there to lead the defense wherever the fighting is most intense and the lines threaten to buckle.'
		},
		{
			id: 'wardog-4th-info-2',
			name: 'Iron Champion Doru',
			description: 'Upon the accidental creation of the Iron Champion, only the intervention of Ajax was able to stop Doru’s rampage. His raw strength and untempered aggression make him a valuable combatant, but it is his mysterious regeneration that makes him a true monster on the battlefield.'
		},
		{
			id: 'wardog-4th-info-3',
			name: 'Logostician Vesper',
			description: 'A master of logistical support and a living portal network, Vesper is the emergent personality of several dozen potent psychic minds working in concert. From their position within an armored and highly mobile flesh chassis, Vesper manages supply lines and transport for the forces of the Iron Saint.'
		},
		{
			id: 'wardog-4th-info-4',
			name: 'Soulbinder Psyche',
			description: 'Viewed by other war dogs as “The Goddess of the Banks,” Psyche possesses a spirit that can return from the Body Banks again and again without ever losing her core self. She is a master of the connection between soul and flesh, and a talented mage besides.'
		},
		{
			id: 'wardog-4th-info-5',
			name: 'Strategos Alkestis',
			description: 'Leader of the Legion Alkestis and one of the most brilliant commanders ever to be born a war dog, Alkestis has made her legion one of the most feared of Ajax’s armies. The Silver Wolf is known for her battlefield tactics and a willingness to stoop to any depths to gain an edge on her enemies.'
		},
		{
			id: 'wardog-1st-info-6',
			name: 'War Dog Languages',
			description: 'Most war dogs speak Caelian and one Vaslorian human language.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'wardog-1st-malice-1',
			name: 'Reconstitute',
			cost: 3,
			sections: [
				'One war dog acting this turn tears apart a nearby corpse of a humanoid and incorporates its body parts into their own. The war dog regains Stamina equal to 5 times their level.'
			]
		}),
		FactoryLogic.feature.createMaliceAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-1st-malice-2',
				name: 'Fire for Effect',
				type: FactoryLogic.type.createManeuver(),
				cost: 3,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
				target: 'Each creature in the area',
				sections: [
					FactoryLogic.createAbilitySectionText('Each target makes an **Agility test**. The same condition is imposed on each affected target'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '5 fire damage; slowed or weakened (save ends)',
						tier2: '5 fire damage; slowed or weakened (EoT)',
						tier3: '5 fire damage'
					}))
				]
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'wardog-1st-malice-3',
			name: 'Fodder Run',
			cost: 7,
			sections: [
				'Each war dog minion in the encounter shifts up to their speed and can make a free strike. A minion who does so is then reduced to 0 Stamina.'
			]
		}),
		FactoryLogic.feature.createMaliceAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-2nd-malice-4',
				name: 'Loyalty Unto Death',
				type: FactoryLogic.type.createManeuver(),
				cost: 5,
				keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.createRanged(10) ],
				target: 'Two war dogs',
				sections: [
					FactoryLogic.createAbilitySectionText('Each target who has a loyalty collar shifts up to their speed, then is reduced to 0 Stamina. After each target’s Loyalty Collar trait is resolved, each enemy adjacent to either target makes a **Presence test**.'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: 'Push 4; the enemy is frightened of the nearest non-minion war dog (save end)',
						tier2: 'Push 2; the enemy is frightened of the nearest non-minion war dog (EoT)',
						tier3: 'Push 2'
					}))
				]
			}),
			echelon: 2
		}),
		FactoryLogic.feature.createMaliceAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-3rd-malice-5',
				name: 'Alchemical Cloud',
				type: FactoryLogic.type.createNoAction(),
				cost: 7,
				keywords: [ ],
				distance: [ ],
				target: '',
				sections: [
					FactoryLogic.createAbilitySectionText('A bank of choking chemicals sweeps across the area of the enácounter map. Each enemy in the encounter makes a **Might test**.'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '8 poison damage; dazed (Eot)',
						tier2: '7 poison damage; weakened (EoT)',
						tier3: '4 poison damage'
					}))
				]
			}),
			echelon: 3
		}),
		FactoryLogic.feature.createMaliceAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-4th-malice-6',
				name: 'Cry Havoc',
				type: FactoryLogic.type.createManeuver(),
				cost: 7,
				keywords: [ ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
				target: 'Each enemy in the area',
				sections: [
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						bonus: 5,
						tier1: '7 psychic damage',
						tier2: '11 psychic damage; P < 4 frightened (save ends)',
						tier3: '14 psychic damage; P < 5 frightened (save ends)'
					})),
					FactoryLogic.createAbilitySectionText('Each war dog within distance deals an extra 15 damage with strikes until the end of their next turn. Additionally, they end any effect on them that can be ended by a saving throw or that ends at the end of their turn, then shift up to their speed and can make a free strike.'),
					FactoryLogic.createAbilitySectionText('**Special:** This ability can’t be used by a minion.')
				]
			}),
			echelon: 4
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'wardog-1st-1',
			name: 'War Dog Commando',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+1 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-1-feature-1',
						name: 'Daggers',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage',
								tier2: '4 damage',
								tier3: '5 damage'
							})),
							FactoryLogic.createAbilitySectionText('After using this ability, the commando can attempt to hide even if observed.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-1-feature-2',
					name: 'Loyalty Collar',
					description: 'When the commando is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d3 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-2',
			name: 'War Dog Conscript',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: '+1 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-2-feature-1',
						name: 'Blade',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 damage',
								tier2: '2 damage',
								tier3: '3 damage'
							})),
							FactoryLogic.createAbilitySectionText('If used with the Charge main action, this ability gains an edge.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-2-feature-2',
					name: 'Loyalty Collar',
					description: 'When the conscript is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d3 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-3',
			name: 'War Dog Sharpshooter',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+5 bonus to ranged distance',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-3-feature-1',
						name: 'Bolt Launcher',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage',
								tier2: '4 damage',
								tier3: '5 damage'
							})),
							FactoryLogic.createAbilitySectionText('This ability ignores cover and concealment. ')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-3-feature-2',
					name: 'Loyalty Collar',
					description: 'When the sharpshooter is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d3 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-4',
			name: 'War Dog Tetherite',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 5,
			stability: 1,
			freeStrikeDamage: 2,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-4-feature-1',
						name: 'Banded Dagger',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage',
								tier2: '4 damage',
								tier3: '5 damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-4-feature-2',
					name: 'Tethered',
					description: 'A captain attached to a tetherite squad has their stability increased by the number of tetherites within 2 squares of them.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-4-feature-3',
					name: 'Loyalty Collar',
					description: 'When the tetherite is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d3 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-5',
			name: 'War Dog Amalgamite',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 25,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-5-feature-1',
						name: 'Several Arms',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 damage',
								tier2: '5 damage; A < 1 grabbed',
								tier3: '6 damage; A < 2 grabbed'
							})),
							FactoryLogic.createAbilitySectionText('The amalgamite can have up to four targets grabbed at once.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'The amalgamite deals 3 damage to each creature grabbed this way or who they already have grabbed, and regains Stamina equal to the damage dealt.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-5-feature-2',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('Effect: If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-5-feature-3',
					name: 'Loyalty Collar',
					description: 'When the amalgamite is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-6',
			name: 'War Dog Crucibite',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-1st-6-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-6-feature-2',
						name: 'Flamebelcher',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 1, within: 1 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 fire damage',
								tier2: '4 fire damage',
								tier3: '5 fire damage'
							})),
							FactoryLogic.createAbilitySectionText('The area is covered in sticky fire until the start of the crucibite’s next turn. Any creature who enters the area for the first time in a round or starts their turn there takes 2 fire damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'The area becomes a 10 × 1 line, and if any ally of the crucibite is in the area when it is created, the ability deals an extra 2 damage to each target.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-6-feature-3',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-6-feature-4',
					name: 'Loyalty Collar',
					description: 'When the crucibite is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-7',
			name: 'War Dog Eviscerite',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-7-feature-1',
						name: 'Chainsaw Whip',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage',
								tier2: '4 damage; pull 1',
								tier3: '5 damage; pull 2'
							})),
							FactoryLogic.createAbilitySectionText('The eviscerite can automatically grab a target pulled adjacent to them this way.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-7-feature-2',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-7-feature-3',
					name: 'Loyalty Collar',
					description: 'When the eviscerite is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-8',
			name: 'War Dog Neuronite',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-1st-8-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-8-feature-2',
						name: 'Synlirii Grafts',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 psychic damage; vertical slide 1',
								tier2: '2 psychic damage; vertical slide 2',
								tier3: '3 psychic damage; vertical slide 3'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-8-feature-3',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-8-feature-4',
						name: 'The Voice',
						cost: 1,
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('The neuronite chooses one ally within 10 squares. Each target is either taunted by the ally, or the ally has damage immunity 3 whenever any target makes a strike against them (the neuronite’s choice). Either effect lasts until the start of the neuronite’s next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-8-feature-5',
					name: 'Loyalty Collar',
					description: 'When the neuronite is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-9',
			name: 'War Dog Pestilite',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 5,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-1st-9-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 3 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-9-feature-2',
						name: 'Plaguecaster',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 poison damage; I < 0 frightened (save ends)',
								tier2: '4 poison damage; I < 1 frightened (save ends)',
								tier3: '5 poison damage; I < 2 frightened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The area is filled with a cloud of pestilence that lasts until the start of the pestilite’s next turn. Any creature who enters the area for the first time in a round or starts their turn there takes 2 poison damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-9-feature-3',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-9-feature-4',
					name: 'Loyalty Collar',
					description: 'When the pestilite is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-10',
			name: 'War Dog Phosphorite',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-1st-10-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Acid, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-10-feature-2',
						name: 'Caustic Detonator',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('A detonator attaches to the target. At the end of each round, roll a die. On an odd result, the detonator explodes, triggering the power roll.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 acid damage; M<0 bleeding (save ends)',
								tier2: '6 acid damage; M<1 bleeding (save ends)',
								tier3: '10 acid damage; M<2 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('An adjacent creature can attempt an easy Agility test to remove the detonator as a maneuver. A failure does nothing, a success disarms and destroys the detonator, and a success with a reward allows the disarming creature to throw the detonator onto another target within 5 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-10-feature-3',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-10-feature-4',
					name: 'Loyalty Collar',
					description: 'When the phosphorite is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-11',
			name: 'War Dog Teletalite',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'teleport'),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-11-feature-1',
						name: 'Corrupted Ash Daggers',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 damage; slide 1',
								tier2: '6 damage; slide 2',
								tier3: '7 damage; slide 3'
							})),
							FactoryLogic.createAbilitySectionText('The teletalite gains an edge on this ability if any ally is adjacent to the target.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								effect: 'The portalite teleports the target 3 squares before sliding them.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-11-feature-2',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-11-feature-3',
						name: 'Corrupted Ash Teleport',
						cost: 1,
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The teletalite can teleport up to 5 squares and gains an edge on strikes until the end of their turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-11-feature-4',
					name: 'Loyalty Collar',
					description: 'When the teletalite is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-12',
			name: 'War Dog Subcommander',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-12-feature-1',
						name: 'Command Saber',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 damage',
								tier2: '5 damage',
								tier3: '7 damage'
							})),
							FactoryLogic.createAbilitySectionText('One ally within 5 squares of the subcommander can make a free strike against the target.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-12-feature-2',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-12-feature-3',
					name: 'The Iron Saint Does Not Recognize Retreat',
					description: 'Each ally within 5 squares of the subcommander gains a +3 bonus to stability.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-12-feature-4',
					name: 'Loyalty Collar',
					description: 'When the subcommander is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-13',
			name: 'War Dog Ground Commander',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 120,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 3, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-13-feature-1',
						name: 'Conditioning Spear',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '8 damage; pull 1',
								tier2: '12 damage; pull 2',
								tier3: '15 damage; pull 3'
							})),
							FactoryLogic.createAbilitySectionText('One ally within 10 squares of the ground commander can make a free strike.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								effect: 'A target who has <code>I < 2</code> and who is adjacent to the ground commander after this ability is resolved is grabbed (save ends). This grab can’t be escaped using the Escape Grab maneuver. The ground commander can grab up to two creatures at a time.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-13-feature-2',
						name: 'Highest Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each war dog in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Any target who has a loyalty collar is reduced to 0 Stamina')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-13-feature-3',
						name: 'Final Orders',
						type: FactoryLogic.type.createTrigger('The target takes damage, is force moved, or is reduced to 0 Stamina.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('Even if reduced to 0 Stamina, the target moves up to their speed and can make a free strike after the triggering effect is resolved. The target then immediately dies.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-13-feature-4',
					name: 'End Effect',
					description: 'At the end of each of their turns, the ground commander can take 5 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-13-feature-5',
					name: 'Loyalty Collar',
					description: 'When the ground commander is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-13-feature-6',
						name: 'Combined Arms',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target can make a ranged free strike, then immediately use the Charge main action.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-13-feature-7',
						name: 'Make an Example of Them',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('Each ally within 5 squares of the target moves up to their speed and can make a free strike against the target. If the target has <code>I < 2</code>, they are frightened of the ground commander (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-13-feature-8',
						name: 'Claim Them for the Body Banks',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target ally shifts up to 2 squares and can use the Grab maneuver. Until the end of the encounter, each target enemy takes a bane on the Escape Grab maneuver.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-1',
			name: 'War Dog Sparkslinger',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 7,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Lightning Spread increases by 1 square',
			characteristics: MonsterLogic.createCharacteristics(0, 0, 3, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-1-feature-1',
						name: 'Galvanic Arc',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(7) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 lightning damage',
								tier2: '5 lightning damage; the lightning spreads 1 square',
								tier3: '7 lightning damage; the lightning spreads 2 squares'
							})),
							FactoryLogic.createAbilitySectionText('The lightning’s spread is the distance it arcs from a target to nearby enemies. Each enemy within that distance takes 2 lightning damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-1-feature-2',
					name: 'Loyalty Collar',
					description: 'When the sparkslinger is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-2nd-1-feature-3',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Lightning, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-2',
			name: 'War Dog Sweeper',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(0, 3, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-2-feature-1',
						name: 'Shrikegun Shot',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(3)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '2 damage',
								tier2: '4 damage; push 1',
								tier3: '6 damage; push 3'
							})),
							FactoryLogic.createAbilitySectionText('Any target within 2 squares of the sweeper takes an extra 3 damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-2-feature-2',
					name: 'Shrapnel-Laced Loyalty Collar',
					description: 'When the sweeper is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each enemy and object within 2 squares of them.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-3',
			name: 'War Dog Frog',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'Climb, swim'),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: '+2 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(-1, 3, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-3-feature-1',
						name: 'Poisoned Dagger',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(4)
						],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 poison damage',
								tier2: '5 poison damage',
								tier3: '7 poison damage'
							})),
							FactoryLogic.createAbilitySectionText('The war frog can jump 3 squares before or after making the strike. If they end this jump in cover or concealment, they can attempt to hide.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-3-feature-2',
					name: 'Loyalty Collar',
					description: 'When the war frog is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-2nd-3-feature-3',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-4',
			name: 'War Dog Arachnite',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5, 'Climb'),
			stamina: 35,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(0, 3, 2, 2, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-4-feature-1',
						name: 'Longarm Shrikegun',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '2 damage',
								tier2: '4 damage; push 1',
								tier3: '6 damage; push 3'
							})),
							FactoryLogic.createAbilitySectionText('This ability ignores cover and concealment. The arachnite chooses one of the following damage types when making the strike: acid, cold, fire, lightning, poison, psychic, or sonic.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: ' The arachnite can use this ability as if they were in the space of any ally within distance.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-4-feature-2',
						name: 'Web Vial',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, value2: 10 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The area is difficult terrain until the end of the encounter.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-4-feature-3',
					name: 'Eight-Eyed Sight',
					description: 'At the start of each of their turns, the arachnite automatically knows the location of each hidden creature within 10 squares of them.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-4-feature-4',
					name: 'Loyalty Collar',
					description: 'When the arachnite is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-2nd-4-feature-5',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 6 })
					]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-5',
			name: 'War Dog Doomtheif',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 40,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(3, -1, 0, 3, 1),
			features: [
				FactoryLogic.feature.create({
					id: 'wardog-2nd-5-feature-1',
					name: 'Loyalty Collar',
					description: 'When the doomthief is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-5-feature-2',
					name: 'Doom Magnet',
					description: 'The doomthief emits a 3 aura of warped fate that blocks line of effect for any enemy ability that doesn’t include them as a target.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-5-feature-3',
						name: 'Ripper Shrikegun',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 3, within: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 damage; push 1',
								tier2: '5 damage; push 3',
								tier3: '6 damage; push 5; A < 3 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The doomthief can’t willingly move on the same turn they use this ability.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-5-feature-4',
						name: 'Expanding Doom',
						cost: 4,
						type: FactoryLogic.type.createManeuver(),
						keywords: [ ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The doomthief has damage immunity 4 and the size of the aura from their Doom Magnet trait increases by 3, both until the start of their next turn.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-6',
			name: 'War Dog Equivite',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(8),
			stamina: 53,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(3, 3, -1, -2, 0),
			features: [
				FactoryLogic.feature.create({
					id: 'wardog-2nd-6-feature-1',
					name: 'Loyalty Collar',
					description: 'When the equivite is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-6-feature-2',
						name: 'Fuse-Iron Lance',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '6 damage',
								tier2: '8 damage',
								tier3: '10 damage; I < 3 frightened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('This ability gains an edge while charging.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'The ability deals an extra 3 fire damage to the target and each enemy adjacent to the target.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-6-feature-3',
						name: 'Blazing Charge',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The equivite moves up to their speed and ignores difficult terrain. Any mundane size 1 object whose space they move through is destroyed. The equivite makes one power roll against each enemy whose space they move through for the first time.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: '2 damage; push 1',
								tier2: '4 damage; push 2',
								tier3: '5 damage; push 3; M < 3 prone'
							}))
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-7',
			name: 'War Dog Hypokrite',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(8),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 0, 0, 2),
			features: [
				FactoryLogic.feature.create({
					id: 'wardog-2nd-7-feature-1',
					name: 'Loyalty Collar',
					description: 'When the hypokrite is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-7-feature-2',
						name: 'Needle-Knife',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '6 damage',
								tier2: '8 damage; A < 2 bleeding (save ends)',
								tier3: '10 damage; A < 3 bleeding and weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('This ability deals an extra 6 damage if the hypokrite is hidden or disguised.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-7-feature-3',
						name: 'Feign Death',
						cost: 2,
						type: FactoryLogic.type.createTrigger('The hypokrite takes damage'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The hypokrite detonates their loyalty collar to deal 2d6 damage to each adjacent enemy, but teleports to an unoccupied space adjacent to an ally within distance and remains alive.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-7-feature-4',
					name: 'Face in the Crowd',
					description: 'The hypokrite is invisible while adjacent to any ally who isn’t hidden, and they can attempt to hide even while observed. Whenever they use the Hide maneuver, the hypokrite can disguise themself as another creature within line of effect.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-8',
			name: 'War Dog Mischievite',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 35,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 0, 2, 0),
			features: [
				FactoryLogic.feature.create({
					id: 'wardog-2nd-8-feature-1',
					name: 'Loyalty Collar',
					description: 'When the mischievite is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-8-feature-2',
						name: 'Fuse-Iron Knives',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'Two creatures',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '5 damage',
								tier2: '7 damage',
								tier3: '8 damage; R < 3 the target is dazzled (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A dazzled target takes a bane on strikes and has line of effect only within 1 square.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-8-feature-3',
						name: 'Misdirection',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(3) ],
						target: 'One ally or dazzled creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The mischievite swaps positions with the target. An ally targeted by this ability can make a free strike before or after being swapped.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'The mischievite can use this ability as a triggered action when they are targeted by an ability. If they do, the swapped target becomes the new target of the triggering ability.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-8-feature-4',
					name: 'Crafty',
					description: 'The mischievite doesn’t provoke opportunity attacks by moving.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-9',
			name: 'War Dog Thanatite',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 35,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(1, 1, 2, 3, 1),
			features: [
				FactoryLogic.feature.create({
					id: 'wardog-2nd-9-feature-1',
					name: 'Loyalty Collar',
					description: 'When the thanatite is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-9-feature-2',
						name: 'Snaking Entrails',
						cost: 'signature',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target dies and the thanatite makes one power roll against each enemy within 2 squares of the target.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 corruption damage; A < 1 slowed (save ends)',
								tier2: '5 corruption damage; A < 2 slowed (save ends)',
								tier3: '7 corruption damage; A < 3 restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'If an affected enemy is adjacent to any corpse, they are frightened of the thanatite (save ends).'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-9-feature-3',
						name: 'Wall of Flesh',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Wall, value: 10, within: 10 }) ],
						target: 'One corpse',
						sections: [
							FactoryLogic.createAbilitySectionText('The target spawns a wall of bloody muscle and pulsing viscera that must share one or more squares with the target. Each enemy in the area when the wall is created vertically slides up to 2 squares and is knocked prone. Each square of the wall has 3 Stamina.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-10',
			name: 'War Dog Tormentite',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 0, 2, 3, 0),
			features: [
				FactoryLogic.feature.create({
					id: 'wardog-2nd-10-feature-1',
					name: 'Loyalty Collar',
					description: 'When the tormentite is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-10-feature-2',
						name: 'Mark of Agony',
						cost: 'signature',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '6 corruption damage',
								tier2: '8 corruption damage; the target is marked (save ends)',
								tier3: '9 corruption damage; the target is marked (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Strikes made against a target marked this way gain an edge. Additionally, whenever the tormentite takes damage, each target marked by them takes 3 damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-10-feature-3',
						name: 'Vortex of Pain',
						cost: 3,
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '2 corruption damage',
								tier2: '4 corruption damage',
								tier3: '5 corruption damage; one ally in the area can end one effect on them that can be ended by a saving throw, and can give that effect to one target'
							})),
							FactoryLogic.createAbilitySectionText('The tormentite regains 2 Stamina for each creature targeted by this ability.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-10-feature-4',
					name: 'Persistent Pain',
					description: 'From the start of the encounter, the tormentite takes 1 damage at the start of each of their turns.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-11',
			name: 'War Dog War Doc',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 35,
			stability: 1,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 3, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-11-feature-1',
						name: 'Syringe Crossbow',
						cost: 'signature',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '6 poison damage',
								tier2: '8 poison damage',
								tier3: '9 poison damage; M < 3 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A target enemy is subject to this ability’s power roll. A target ally instead gains 5 temporary Stamina and can make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-11-feature-2',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-11-feature-3',
						name: 'Sanguine Stimulants',
						cost: 1,
						type: FactoryLogic.type.createTrigger('One ally within distance dies'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('Each ally adjacent to the dead ally deals an extra 6 damage on their next strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-11-feature-4',
					name: 'Body Bank Branch Manager',
					description: 'If the war doc uses the Reconstitute war dog Malice feature, it costs 1 Malice less. Additionally, allies can treat the living war doc as a corpse when using the Reconstitute feature.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-12',
			name: 'War Dog Tetrarch',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 180,
			stability: 2,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(4, 3, 2, 3, 4),
			features: [
				FactoryLogic.feature.create({
					id: 'wardog-2nd-12-feature-1',
					name: 'End Effect',
					description: 'At the end of each of their turns, the tetrarch can take 10 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-12-feature-2',
						name: 'Houndblade',
						cost: 'signature',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(3)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '11 damage',
								tier2: '16 damage; taunted (EoT)',
								tier3: '19 damage; taunted (EoT)'
							})),
							FactoryLogic.createAbilitySectionText('A creature taunted this way takes a bane on strikes.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'Each target loses 1d3 Recoveries.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-12-feature-3',
						name: 'Get Them, You Dolts!',
						cost: 1,
						repeatable: true,
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures (1 Malice per target)',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target shifts up to their speed and can make a free strike. If the free strike targets an enemy taunted by the tetrarch, it deals an extra 4 damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-12-feature-4',
						name: 'Sneering Disregard',
						type: FactoryLogic.type.createTrigger('A creature within distance who is not taunted by the tetrarch targets the tetrarch with a power roll.'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The power roll has a double bane. If the target obtains a tier 1 outcome, the tetrarch ignores any of the power roll’s effects other than damage and the target is frightened of the tetrarch (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-12-feature-5',
						name: 'Enter the Fray',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('The tetrarch can jump up to 7 squares before using this ability.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: 'Push 2; I < 2 frightened (save ends)',
								tier2: 'Push 4; I < 3 frightened (save ends)',
								tier3: 'Push 5; I < 4 frightened (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-12-feature-6',
						name: 'Lay Waste',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createSpecial('Five 2 cubes within 20') ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: '7 fire damage; A < 2 slowed (EoT)',
								tier2: '13 fire damage; A < 3 slowed (save ends)',
								tier3: '16 fire damage; A < 4 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The area is set ablaze until the end of the encounter. While ablaze, the area is difficult terrain, and any creature takes 2 fire damage for each square in the area they enter for the first time in a round.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-12-feature-7',
						name: 'You Would Dare?!',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of the encounter, the tetrarch has damage immunity 2, and their Houndblade ability targets three creatures or objects.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-1',
			name: 'War Dog Draconite',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 13,
			stability: 2,
			freeStrikeDamage: 4,
			withCaptain: '+3 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(4, 1, -2, -1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-1-feature-1',
						name: 'Greatsword and Roar',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '4 damage',
								tier2: '4 damage; 3 psychic damage',
								tier3: '4 damage; 3 psychic damage; the target must move their speed in a straight line away from the draconite'
							})),
							FactoryLogic.createAbilitySectionText('If this damage leaves the target winded, they are frightened of the draconite until the end of the target’s next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-1-feature-2',
					name: 'Loyalty Collar',
					description: 'When the draconite is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-2',
			name: 'War Dog Saboteur',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 12,
			stability: 0,
			freeStrikeDamage: 4,
			withCaptain: '+5 bonus to ranged distance',
			characteristics: MonsterLogic.createCharacteristics(-1, 2, 4, 3, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-2-feature-1',
						name: 'Fuse-Iron Bomb',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '4 fire damage',
								tier2: '7 fire damage; push 1',
								tier3: '8 fire damage; push 3'
							})),
							FactoryLogic.createAbilitySectionText('The space the target occupies fills with dark smoke and blocks line of effect until the start of the saboteur’s next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-2-feature-2',
					name: 'Loyalty Collar',
					description: 'When the saboteur is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-3',
			name: 'War Dog Shriketroop',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 4,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(1, 4, 3, 1, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-3-feature-1',
						name: 'Canis Shrikegun',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '4 damage',
								tier2: '7 damage',
								tier3: '8 damage; I < 3 the target is frightened of all shrikestroops (EoT)'
							})),
							FactoryLogic.createAbilitySectionText('The target must move their speed in a straight line away from the shriketroop.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-3-feature-2',
					name: 'Loyalty Collar',
					description: 'When the shriketroop is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-4',
			name: 'War Dog Aerocite',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(8, 'Fly'),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 4, 1, 3, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-4-feature-1',
						name: 'Dive Bomb',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '7 damage',
								tier2: '10 damage; vertical slide 2',
								tier3: '12 damage; vertical slide 3'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								effect: 'An enemy force moved by this ability is grabbed instead.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-4-feature-2',
						name: 'Caustic Paste Bomb',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5 }) ],
						target: 'Each creature or object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '2 acid damage; M < 2 slowed (save ends)',
								tier2: '4 acid damage; M < 3 slowed (save ends)',
								tier3: '6 acid damage; M < 4 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The area is difficult terrain.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-4-feature-3',
					name: 'Jetwing Agility',
					description: 'If the aerocite moves 5 or more squares on their turn, strikes made against them take a bane until the start of their next turn.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-4-feature-4',
					name: 'Loyalty Collar',
					description: 'When the aerocite is reduced to 0 Stamina, their loyalty collar explodes, dealing 3d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-5',
			name: 'War Dog Ballistite',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(0),
			stamina: 72,
			stability: 5,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(4, -2, 2, 3, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-5-feature-1',
						name: 'Biokinetic Ballista',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '7 damage; push 1',
								tier2: '10 damage; push 3',
								tier3: '11 damage; push 5'
							})),
							FactoryLogic.createAbilitySectionText('Any target pushed into an obstacle is knocked prone, and if they have <code>M < 3</code> they are restrained (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-5-feature-2',
						name: 'Kill Zone',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, value2: 12 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('Until the start of the ballistite’s next turn, the area is difficult terrain, and any ranged ability targeting an enemy in the area deals an extra 8 damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-5-feature-3',
					name: 'Set Up and Tear Down',
					description: 'At the start of each of the ballistite’s turns, they can gain a +4 bonus to speed until the end of their turn. While their speed is greater than 0 by any means, they can’t use main actions or maneuvers.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-5-feature-4',
					name: 'Loyalty Collar',
					description: 'When the ballistite is reduced to 0 Stamina, their loyalty collar explodes, dealing 3d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-6',
			name: 'War Dog Blackcap',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'Teleport'),
			stamina: 45,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(1, 4, 4, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-6-feature-1',
						name: 'Flesh-Eater Knife',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(15)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '8 damage',
								tier2: '11 damage',
								tier3: '12 damage; M < 4 bleeding and weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The blackcap can teleport up to their speed before using this ability, creating an ash clone (see below) in their original square.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-6-feature-2',
						name: 'Ashes to Ashes',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'Up to three ash clones',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes a free strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-6-feature-3',
					name: 'Ash Clones',
					description: 'An ash clone created by the blackcap has the blackcap’s statistics but has 1 Stamina. Ash clones don’t take turns in combat, but they can act when the blackcap allows them to and can move when the blackcap willingly moves.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-6-feature-4',
					name: 'Duplicating Loyalty Collar',
					description: 'When the blackcap or any of their ash clones is reduced to 0 Stamina, that creature’s loyalty collar explodes, dealing 3d6 poison damage to each adjacent enemy and object. If any adjacent enemy has <code>A < 3</code> they are also weakened (save ends).'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-7',
			name: 'War Dog Breaker',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 36,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 200,
			stability: 4,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(4, 2, 1, 1, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-7-feature-1',
						name: 'Pile Bunker Gauntlet',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '12 damage; push 4; prone',
								tier2: '17 damage; slide 4; prone or M < 3 dazed (save ends)',
								tier3: '21 damage; slide 4; prone; M < 4 dazed (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-7-feature-2',
						name: 'Surging Power',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Until the start of their next turn, the breaker has a double edge on abilities and is automatically affected by all potency effects.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-7-feature-3',
					name: 'Breaking Point',
					description: 'When the breaker would be reduced to 0 Stamina, they delay that effect as they end any conditions affecting them and immediately take a turn, regardless of whether they have already taken a turn this round. The breaker’s abilities deal an extra 5 damage during this turn, at the end of which they are reduced to 0 Stamina.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-7-feature-4',
					name: 'Loyalty Collar',
					description: 'When the breaker is reduced to 0 Stamina, their loyalty collar explodes, dealing 3d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-8',
			name: 'War Dog Firestarter',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 45,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 3, 4, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-8-feature-1',
						name: 'Twin Flamebelchers',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 1, value2: 1 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '3 fire damage; A < 2 the target is seared (save ends)',
								tier2: '6 fire damage; A < 3 the target is seared (save ends)',
								tier3: '8 fire damage; A < 4 the target is seared (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A seared creature takes a bane on strikes and has damage weakness 5. If this ability obtains a tier 3 outcome against one or more creatures who are already seared, the firestarter can use Enflame as a free triggered action.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-8-feature-2',
						name: 'Enflame',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('This ability targets each enemy within 2 squares of any seared creature within distance.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: '2 fire damage',
								tier2: '4 fire damage; A < 3 the target is seared (save ends)',
								tier3: '6 fire damage; A < 4 the target is seared (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-8-feature-3',
					name: 'Loyalty Collar',
					description: 'When the firestarter is reduced to 0 Stamina, their loyalty collar explodes, dealing 3d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-3rd-8-feature-4',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 8 })
					]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-9',
			name: 'War Dog Geomancer',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'Burrow'),
			stamina: 45,
			stability: 3,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 4, 4, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-9-feature-1',
						name: 'Earthwave',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 7, value2: 2, within: 10 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: '3 damage; M < 2 push (see effect)',
								tier2: '6 damage; M < 3 push',
								tier3: '8 damage; M < 4 push, prone'
							})),
							FactoryLogic.createAbilitySectionText('This ability ignores stability. The geomancer declares a direction for the area, and any creature pushed by this ability is pushed to the last space in the area in the chosen direction.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'The ground beneath the area becomes a 2-square-deep trench after the power roll is resolved.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-9-feature-2',
						name: 'Siegeworks',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Wall, value: 10 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The geomancer raises a wall of stone set with viewing gaps. Creatures have line of effect through the wall while adjacent to it.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-9-feature-3',
					name: 'Dust Cloud',
					description: 'The geomancer is always surrounded by a 2 aura of swirling dust and earthen debris. The geomancer and any ally in the area have concealment. '
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-9-feature-4',
					name: 'Loyalty Collar',
					description: 'When the geomancer is reduced to 0 Stamina, their loyalty collar explodes, dealing 3d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-10',
			name: 'War Dog Iron Priest',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 1, 4, 4),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-10-feature-1',
						name: 'Houndcannon',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 7, value2: 1, within: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: '3 damage',
								tier2: '6 damage; P < 3 bleeding (save ends)',
								tier3: '8 damage; P < 4 the target loses 1 Recovery and is bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Any ally within 2 squares of the iron priest gains an edge on their next strike. If any target lost a Recovery, any affected ally has a double edge instead.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-10-feature-2',
						name: 'Iron Banner',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						repeatable: true,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 4 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText(` For every 2 Malice spent, each target gains one of the following effects until the start of the iron priest’s next turn.
- The target has damage immunity 2.
- The target’s strikes deal an extra 3 holy damage.
- The target has a +3 bonus to speed.`)
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-10-feature-3',
					name: 'Chosen of the Iron Saint',
					description: 'The Director gains 1 Malice whenever an ally within 3 squares of the iron priest obtains a tier 3 outcome on a power roll.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-11',
			name: 'War Dog Prismite',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5, 'Fly, hover'),
			stamina: 82,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(4, 0, 4, 2, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-11-feature-1',
						name: 'Grasping Tonguetacles',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: '3 psychic damage',
								tier2: '6 psychic damage; R < 3 grabbed, pull 2',
								tier3: '8 psychic damage; R < 4 grabbed and the target takes a bane on the Escape Grab maneuver, pull 2'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-11-feature-2',
						name: 'Hard Light Field',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, value2: 10 }) ],
						target: 'Each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Until the start of the prismite’s next turn, each target has cover and gains a +2 bonus to stability.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-11-feature-3',
						name: 'Tractor Beam',
						type: FactoryLogic.type.createTrigger('An enemy within distance uses a melee ability against an ally.'),
						cost: 1,
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'The triggering enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('The target is pulled up to 5 squares toward the prismite and any damage from the triggering ability is halved.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-11-feature-4',
					name: 'Prismacore Detonation',
					description: 'When the prismite is reduced to 0 Stamina, they explode, dealing 3d6 psychic damage to each enemy within 2 squares of them.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-12',
			name: 'War Dog Taxiarch',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 44,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'Teleport'),
			stamina: 240,
			stability: 1,
			freeStrikeDamage: 9,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 5, 4, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-12-feature-1',
						name: 'Stunning Surge',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '14 lightning damage; the lightning spreads 1 square; I < 3 dazed (save ends)',
								tier2: '19 lightning damage; the lightning spreads 2 square; I < 4 dazed (save ends)',
								tier3: '23 lightning damage; the lightning spreads 3 square; I < 5 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The spread is the distance the charge arcs from a target to nearby enemies. Each enemy within spread takes 5 lightning damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'The lighting spread increases by 2 squares. Additionally, any creature who takes lightning damage from this ability and who has <code>M < 4</code> is slowed until the end of their next turn.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-12-feature-2',
						name: 'Overcharge',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, value2: 10 }) ],
						target: 'Each war dog in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target shifts up to their speed and can make a free strike that deals an extra 5 lightning damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-12-feature-3',
						name: 'Thunderstruck',
						type: FactoryLogic.type.createTrigger('An enemy within distance deals damage to the taxiarch'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'The triggering enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('After the ability is resolved, the target is teleported up to 5 squares and is thunderstruck (save ends). A thunderstruck creature has lightning weakness 5, and the taxiarch gains an edge on power rolls against them.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-12-feature-4',
					name: 'End Effect',
					description: 'At the end of each of their turns, the taxiarch can take 15 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-12-feature-5',
						name: 'Magnetic Trickery',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Slide 5, and if the the target has <code>M < 4</code>, they fall prone.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-12-feature-6',
						name: 'Conductor of Combat',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each war dog in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target shifts up to their speed, then can make a free strike or use a maneuver.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-12-feature-7',
						name: 'Unlimited Power!',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Agility,
								tier1: '18 lightning damage; the target is thunderstruck (save ends)',
								tier2: '14 lightning damage; the target is thunderstruck (EoT)',
								tier3: '9 lightning damage'
							})),
							FactoryLogic.createAbilitySectionText('See Thunderstruck. Additionally, until the end of the encounter, any enemy who moves within 3 squares of the taxiarch for the first time in a round or starts their turn there takes 3 lightning damage.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-1',
			name: 'War Dog Blood Jumper',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'Fly'),
			stamina: 15,
			stability: 2,
			freeStrikeDamage: 4,
			withCaptain: '+3 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(5, 4, 2, 3, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-1-feature-1',
						name: 'Jumplance',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '4 damage',
								tier2: '7 damage',
								tier3: '9 damage; A < 4 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If this damage leaves the target winded, they are frightened of the draconite until the end of the target’s next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-1-feature-2',
					name: 'Drop Troop',
					description: 'If the jumper doesn’t end their turn on the ground, they fall prone.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-1-feature-3',
					name: 'Loyalty Collar',
					description: 'When the jumper is reduced to 0 Stamina, their loyalty collar explodes, dealing 3d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-2',
			name: 'War Dog Hunter-Killer',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 14,
			stability: 0,
			freeStrikeDamage: 5,
			withCaptain: '+4 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(1, 5, 3, 5, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-2-feature-1',
						name: 'Fuse-Iron Rocket',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '5 damage; push 2',
								tier2: '8 damage; push 3',
								tier3: '10 damage; push 4'
							})),
							FactoryLogic.createAbilitySectionText('Each enemy adjacent to the target before the forced movement takes 5 fire damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-2-feature-2',
					name: 'Loyalty Collar',
					description: 'When the hunter-killer is reduced to 0 Stamina, their loyalty collar explodes, dealing 3d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-3',
			name: 'War Dog Socialite',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 14,
			stability: 0,
			freeStrikeDamage: 4,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(2, 2, 4, 3, 5),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-3-feature-1',
						name: 'Call to Self-Sabotage',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: 'The target makes a free strike (tier 1 result) against themself',
								tier2: 'The target makes a free strike (tier 2 result) against themself',
								tier3: 'The target makes a free strike (tier 3 result) against themself'
							})),
							FactoryLogic.createAbilitySectionText('Each enemy adjacent to the target before the forced movement takes 5 fire damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-3-feature-2',
					name: 'Loyalty Collar',
					description: 'When the socialite is reduced to 0 Stamina, their loyalty collar explodes, dealing 3d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-4',
			name: 'Castellan Hoplon',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 260,
			stability: 3,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(5, 2, 4, 3, 4),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-4-feature-1',
						name: 'Inspiring Strike',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 damage',
								tier2: '20 damage; push 3',
								tier3: '24 damage; push 5'
							})),
							FactoryLogic.createAbilitySectionText('Two allies within 10 squares of Hoplon each shift up to their speed, then can take the Defend main action or make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-4-feature-2',
						name: 'Summon the Onyx Tower',
						type: FactoryLogic.type.createManeuver(),
						cost: 5,
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('A 10-square-tall tower made of black stone shimmers into being in an unoccupied space that is 5 squares on a side. The tower has three floors, an entrance in the middle of each side on the ground floor, and a crenelated rooftop. Any war dog inside or adjacent to the tower has damage immunity 2 and regains 5 Stamina at the start of each of their turns, and war dogs inside the tower can observe through and have line of effect through its walls. This ability can be used only once per encounter.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-4-feature-3',
						name: 'Shield Warden',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: 'R < 3 taunted (EoT)',
								tier2: 'R < 4 taunted (EoT)',
								tier3: 'R < 5 taunted (EoT)'
							})),
							FactoryLogic.createAbilitySectionText('Until the start of Hoplon’s next turn, any enemy ability that includes him as a target takes a bane.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-4-feature-4',
						name: 'Timely Intervention',
						type: FactoryLogic.type.createTrigger('An enemy within 10 squares targets an ally with an ability.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Hoplon teleports to an unoccupied space adjacent to the enemy and becomes the new target of the ability. He can then make a free strike against the enemy, and if that enemy has <code>R < 4</code> they are taunted until the end of their next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-4-feature-5',
					name: 'Hold the Line',
					description: 'Each ally within 3 squares of Hoplon has cover and damage immunity 2.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-4-feature-6',
					name: 'Loyalty Collar',
					description: 'The first time in an encounter that Hoplon is reduced to 0 Stamina, he instead has 1 Stamina and gains damage immunity 10 until the end of his next turn. When Hoplon is reduced to 0 Stamina again, each ally within 5 squares of him gains damage immunity 3 and deals an extra 5 damage on strikes, all until the end of the encounter.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-4th-4-feature-7',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Damage, modifierType: DamageModifierType.Immunity, value: 3 })
					]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-5',
			name: 'Iron Champion Doru',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 260,
			stability: 2,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(5, 4, 1, 4, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-5-feature-1',
						name: 'Houndaxe',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 damage',
								tier2: '21 damage; Doru gains an edge on his next power rolls; M < 4 slide 3',
								tier3: '25 damage; Doru has a double edge on his next power roll; M < 5 slide 5'
							})),
							FactoryLogic.createAbilitySectionText('The damage from this ability can’t be reduced in any way.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'This ability targets one additional target.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-5-feature-2',
						name: 'Bloody Whirlwind',
						type: FactoryLogic.type.createMain(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '5 damage; A < 3 bleeding (save ends)',
								tier2: '11 damage; A < 4 bleeding (save ends)',
								tier3: '15 damage; A < 5 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('This ability deals an extra 5 damage for each winded target in the area.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-5-feature-3',
						name: 'Hunting Leap',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature of object',
						sections: [
							FactoryLogic.createAbilitySectionText('Doru jumps to an unoccupied space adjacent to the target, then can make a free strike against them. If the target is bleeding or winded, the distance of the ability becomes Ranged 10 and the free strike deals an extra 5 damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-5-feature-4',
						name: 'Laugh It Off',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The triggering strike takes a bane and Doru gains an edge on his next power roll.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-5-feature-5',
					name: 'Iron Juggernaut',
					description: 'Doru can’t be made slowed or restrained. Additionally, he can move while grabbed, and a creature grabbing him moves along with him unless they let go.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-5-feature-6',
					name: 'The Scarless',
					description: 'Doru regains 10 Stamina at the start of each of his turns unless he took acid or fire damage since the start of his previous turn. Whenever he regains Stamina this way, the Director can spend 2 Malice to end one effect on Doru that can be ended by a saving throw.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-5-feature-7',
					name: 'Champion’s Loyalty Collar',
					description: 'When Doru is reduced to 0 Stamina, his loyalty collar explodes, dealing 20 damage to each enemy and object within 3 squares of him.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-6',
			name: 'Logostician Vesper',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(10),
			stamina: 253,
			stability: 3,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 5, 4, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-6-feature-1',
						name: 'Portal to the Firing Line',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 3, within: 15 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Special:** This ability targets only non-prone creatures.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '8 damage',
								tier2: '12 damage; I < 4 slowed (save ends)',
								tier3: '15 damage; I < 5 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A target creature can choose to drop prone, in which case the ability takes a bane against them.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'The area remains active until Vesper is reduced to 0 Stamina or until the end of the encounter. Any non-prone enemy who enters the area for the first time in a round or starts their turn there takes 15 damage, or 7 damage if they choose to fall prone.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-6-feature-2',
						name: 'Portal to the Mantle',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, value2: 15 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '8 fire damage',
								tier2: '12 fire damage',
								tier3: '15 fire damage'
							})),
							FactoryLogic.createAbilitySectionText('The area is difficult terrain. Any creature who enters the area for the first time in a round or starts their turn there takes 10 fire damage. Until the end of the encounter, the size of the area increases by 1 at the start of each round.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-6-feature-3',
						name: 'Portal to the Void',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, value2: 15 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: 'A < 4 pull 3 toward the center of the area',
								tier2: 'A < 5 pull 3 toward the center of the area',
								tier3: 'Pull 3 toward the center of the area'
							})),
							FactoryLogic.createAbilitySectionText('A portal appears at the center of the area. Any creature at the center of the area when this ability is used or who is pulled into the center for the first time in a round takes 10 sonic damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'The area remains active and deals its damage until Vesper is reduced to 0 Stamina or until the end of the encounter. Any creature who enters the area and has <code>A < 4</code> is pulled 3 squares toward the center of the area. Any creature who starts their turn in the area and has <code>M < 4</code> is slowed until the end of their turn.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-6-feature-4',
						name: 'Portal to the Sky',
						type: FactoryLogic.type.createTrigger('The target moves within distance of Vesper'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(3) ],
						target: 'One enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('The target is dropped through a portal, which teleports them up to 7 squares above a space within 15 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-6-feature-5',
					name: 'Living Logistics Network',
					description: 'Each ally who starts their turn within 10 squares of Vesper can teleport whenever they willingly move until the end of their turn. Whenever an affected ally teleports, they deal an extra 5 damage on their next strike.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-6-feature-6',
					name: 'Crash and Burn',
					description: 'When Vesper is reduced to 0 Stamina, they move up to their speed and then explode, dealing 4d6 damage to each adjacent enemy and object. Any enemy who takes more than 14 damage this way vertically slides 5 squares.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-7',
			name: 'Soulbinder Psyche',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(10, 'Fly, hover'),
			stamina: 220,
			stability: 1,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 3, 4, 5),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-7-feature-1',
						name: 'Soulbind',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 holy damage; R < 3 the target is soulbound (save ends)',
								tier2: '20 holy damage; R < 4 the target is soulbound (save ends)',
								tier3: '24 holy damage; R < 5 the target is soulbound (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A soulbound creature can’t benefit from edges or double edges, and can’t gain or use surges.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-7-feature-2',
						name: 'Soulstorm',
						type: FactoryLogic.type.createMain(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, value2: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '8 corruption damage; P < 3 weakened (EoT)',
								tier2: '12 corruption damage; P < 4 weakened (EoT)',
								tier3: '15 corruption damage; P < 5 weakened (EoT)'
							})),
							FactoryLogic.createAbilitySectionText('The area is difficult terrain until the start of Psyche’s next turn. At the start of each of her turns, Psyche can use a maneuver to maintain this effect, move the area up to 5 squares, and make the power roll against each creature in the area’s new location.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								effect: 'Until the start of Psyche’s next turn, if this ability makes a creature weakened, that creature is also soulbound (save ends; see Soulbind above).'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-7-feature-3',
						name: 'Command the Awakened',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each soulbound enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target takes 5 damage from a self-inflicted wound, and if they have <code>M < 4</code> Psyche slides them up to 5 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-7-feature-4',
						name: 'Spirit Form',
						type: FactoryLogic.type.createTrigger('An enemy moves within 2 squares of Psyche'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Psyche moves up to 5 squares, and has damage immunity 5 and ignores difficult terrain during this movement. The first time she moves through any creature during this movement, that creature takes 5 corruption damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-7-feature-5',
						name: 'Vengence for the Slain',
						type: FactoryLogic.type.createTrigger('A war dog within distance is made winded or reduced to 0 Stamina', { free: true }),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('The target loses all their surges and takes 5 corruption damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								effect: 'The target also takes a bane on their next strike.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-7-feature-6',
					name: 'Immortal Soul',
					description: 'When Psyche is reduced to 0 Stamina, her spirit surrounds the nearest war dog, who has damage immunity 2, deals an extra 5 damage on strikes, and can use the Immortal Flare maneuver until the end of the encounter. That war dog also gains the Immortal Soul trait, and transfers this effect to the nearest war dog when they die.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-7-feature-7',
						name: 'Immortal Flare',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('The target takes 10 psychic damage.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-8',
			name: 'Strategos Alkestis',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 260,
			stability: 2,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(4, 4, 5, 5, 5),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-8-feature-1',
						name: 'Houndgun and Houndblade',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 damage; M < 4 bleeding (save ends)',
								tier2: '21 damage; M < 5 bleeding (save ends)',
								tier3: '25 damage; M < 6 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Each target loses 1d3 Recoveries.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'When a target is made bleeding this way, each ally adjacent to them can make a free strike against the target.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-8-feature-2',
						name: 'Focus Fire',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('Until the start of Alkestis’s next turn, any effect that reduces the damage taken by the target has no effect.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-8-feature-3',
						name: 'Artillery Enfilade',
						type: FactoryLogic.type.createTrigger('An ally is reduced to 0 Stamina within 10 squares of Alkestis.'),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 7, value2: 3, within: 10 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '8 damage; A < 4 slowed (save ends)',
								tier2: '13 damage; A < 5 slowed (save ends)',
								tier3: '16 damage; A < 6 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The area is difficult terrain until the start of the next round.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-8-feature-4',
					name: 'End Effect',
					description: 'At the end of each of her turns, Alkestis can take 20 damage to end one effect on her that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-8-feature-5',
					name: 'Tactical Brilliance',
					description: 'At the start of each of Alkestis’s turns, the Director gains 2 Malice. While Alkestis is alive and in the encounter, the Director also gains 1 Malice whenever a war dog in the encounter obtains a tier 3 outcome on a power roll.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-8-feature-6',
						name: 'Fog of War',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [],
						distance: [ FactoryLogic.distance.createSpecial('') ],
						target: 'Each ally in the encounter',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target can disappear, then reappear anywhere on the encounter map 3 or more squares away from any enemy. Additionally, each target has a double edge on their next power roll.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-8-feature-7',
						name: 'Send in the Second Wave',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('For each war dog reduced to 0 Stamina in the encounter, a war dog shriketrooper appears in an unoccupied space within distance.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-8-feature-8',
						name: 'The Silver Wolf’s Final Stratagem',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Until the start of the next round, each target enemy who has <code>I < 4</code> is dazed, each target enemy who has <code>M < 4</code> is restrained, and each target enemy who has <code>A < 4</code> can’t use triggered actions. Additionally, until the end of the encounter, Alkestis and each target ally have damage immunity 3 and deal an extra 5 damage with strikes.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
