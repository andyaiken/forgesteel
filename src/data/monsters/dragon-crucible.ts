import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const dragonCrucible: MonsterGroup = {
	id: 'monster-group-dragon-crucible',
	name: 'Dragon, Crucible',
	description: `
Crucible dragons are born from metallic elementals touched by the toxic combination of fiery rage and ice-cold grief, born from failure in the pursuit of perfection. A dark forge of abandoned creativity melted down in fires of spite, jealousy, and hate.

These metallic dragons are massive, heavy creatures requiring an immense release of heat to engage in flight. Their scales range from gleaming silver to blackened iron, depending on fastidiously they are about cleaning, and occasionally gilded with more precious metals. When threatened, they can encase themselves in shields they have embedded subcutaneously beneath their scales. Their long tails terminate with a massive, hammer-like tip that can freeze over and instantly cool hot metal.`,
	information: [
		{
			id: 'dragon-crucible-info-1',
			name: 'Bastions of Steel',
			description: `
Crucible dragons make their homes high in the mountains, most commonly in those cut with thick veins of iron. Occasionally they will take over a fortress or outpost, but wherever they settle the first thing in place is their colossal anvil. From there, the dragon consumes vast amounts of iron, expressing their dragonseal by slagging it in their belly to create a fortress of steel around them. Much of the slag is expelled into heated vats for forging, but they keep a small reserve inside their gut in case they need to melt any intrusive adventurers. 

Eventually their entire lair is coated with hardened metal and discarded weapons, armor, and shields. This makes the lair of any crucible dragon hazardous to navigate, and extremely conductive of electricity.`
		},
		{
			id: 'dragon-crucible-info-2',
			name: 'Discerning Collectors',
			description: `
The dragons tend to be obsessive collectors. They have a habit of hyper focusing on a singular creation when it comes to collection and replication. Bynirak, The Rain of 10,000 Spears, is known to collect only the most finely crafted and powerful magic polearms in Valsoria. Joris’nyrathi, The Scorching Aegis, is said to have a collection of shields that would rival any god of the forge.

Obsession aside, crucible dragons do manage to accrue large amounts of armaments and armor in their hoards. They care little for gems and gold, other than melting them down for filigree and embossment on the weapons and armor they forge. Adventurers plundering a crucible dragon’s hoard may not find much wealth but will usually find enough materials and armaments to supply several wars simultaneously.`
		},
		{
			id: 'dragon-crucible-info-3',
			name: 'Flawed Pursuits',
			description: 'The failure that spawned the crucible dragon drives their obsessive pursuits. They will endlessly attempt to reproduce the perfect treasures they find among their most prized possessions but can only recreate flawed copies at a fraction of their original power. Discarded projects, melted heaps of raw iron, and scrap angrily embedded in the walls perpetually surround crucible dragons as examples of their failures, perpetuating a cycle of obsessive rage, grief, and inescapable decline.'
		},
		{
			id: 'dragon-crucible-info-4',
			name: 'Hammers in Search of Nails',
			description: `
There is nothing a crucible dragon hates more than creativity, beauty, and exquisite craft. When raiding with a particular object in mind, they are not acute in how they make their entrance. Collateral damage is part of the equation and the message. Along with whatever they take, they’ll endeavor to destroy any great works of art, beautiful architecture, and slay craftspeople and artists who are considered the pinnacle of their craft within the immediate proximity.

The most notorious of these attacks was made by Nuvithiabalca the Hammer of the Spiteforge, who destroyed a dwarven Forgetemple at its grand opening. To add insult to injury, she killed the Forgetemple’s priesthood and its architect and absconded with the temples sacred Sainthammer before the stunned and horrified congregants could flee the grounds.`
		},
		{
			id: 'dragon-crucible-info-4',
			name: 'Crucible Dragon Languages',
			description: 'Only the oldest of crucible dragons have been known to speak some Vastariax. However, few survivors of an encounter with a younger crucible dragon have reported the monster used the Caelian phrases “not enough” and “mine.”'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'dragon-crucible-malice-1',
			name: 'Swordfall (While flying)',
			cost: 3,
			sections: [
				'The dragon forms their body into a blade and drops out of the sky. Each creature under the dragon and in a 6 × 4 line within 1 takes 7 damage, A<4 4 damage for each square the dragon fell, and is restrained (save ends). On resist, the creature moves into an unoccupied adjacent square.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-crucible-malice-2',
			name: 'Show of Blades',
			cost: 5,
			sections: [
				'Each creature and object in 6 × 4 line within 1 of the dragon must make an **Agility test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '16 damage; bleeding (save ends)',
					tier2: '13 damage; bleeding (EoT)',
					tier3: '7 damage'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-crucible-malice-3',
			name: 'Meltdown',
			cost: 7,
			sections: [
				'The dragon superheats the ﬂoor until the end of the round. An enemy who starts their turn grounded is slagged (see Slag Spew).'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'dragon-crucible-1',
			name: 'Thorn Dragon',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Dragon', 'Elemental' ],
			encounterValue: 80,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(8),
			stamina: 450,
			stability: 6,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(4, -1, 3, 3, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'dragon-crucible-feature-1',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				}),
				FactoryLogic.feature.createSoloMonster({
					id: 'dragon-crucible-feature-2',
					name: 'crucible dragon'
				}),
				FactoryLogic.feature.create({
					id: 'dragon-crucible-feature-3',
					name: 'Magnetized Wyrmscale Aura',
					description: 'The dragon’s scales emit a 3 aura of magnetism that aﬀects metal equipment and objects. A creature that enters an aﬀected square or starts their turn there while slagged or wearing metal is pulled 2 towards the dragon and is M<3 unable to move away.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-4',
						name: 'Slag Spew',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 2, within: 1 }) ],
						target: 'All creatures and objects',
						cost: 'signature',
						preEffect: 'Each target makes a **Agility test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Agility,
							tier1: '13 fire damage; A<4 slagged (save ends)',
							tier2: '10 fire damage; A<3 slagged (save ends)',
							tier3: '6 fire damage; A<2 slagged (save ends)'
						}),
						effect: 'Until the condition ends, a slagged target is coated in molten metal, takes 2d6 fire damage at the start of each of their turns, and is M<3 restrained (save ends) whenever they take cold damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-5',
						name: 'Forge Hammer Tail Slam',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '11 damage; M<2 prone',
							tier2: '17 damage; M<2 prone',
							tier3: '20 damage; M<2 prone'
						}),
						effect: 'The dragon makes a free strike against each slagged target knocked prone by this ability.',
						spend: [
							{
								value: 1,
								effect: 'The hammerhead freezes, dealing 1d6 cold damage.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-6',
						name: 'Thermodynamic Flight',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All enemies in burst',
						cost: 1,
						effect: 'The dragon expels blistering steam straight down, dealing 7 fire damage to each target. The dragon then shifts up to their speed vertically and adds the fly keyword to their movement until the end of the round.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-7',
						name: 'Heat Buffer',
						type: FactoryLogic.type.createManeuver({ free: true }),
						keywords: [],
						distance: [],
						target: 'Self (while flying)',
						effect: 'The dragon can use this ability once per round. They continue to give oﬀ steam to extend the duration of their ﬂight for an additional round. Each creature under the dragon when they use this ability takes 7 ﬁre damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-8',
						name: 'Polarize Aura',
						type: FactoryLogic.type.createTrigger('The dragon is targeted by 2 melee attacks in a single turn.'),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All creatures and objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: 'push 5',
							tier2: 'push 7',
							tier3: 'push 10 (ignores stability)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-9',
						name: 'Hammer and Anvil',
						type: FactoryLogic.type.createTrigger('The dragon starts their turn or moves while flying.', { free: true }),
						cost: 1,
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The dragon plumets to the ground and uses Forge Hammer Tail. They deal an additional 4 damage for each square they fell.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'dragon-crucible-feature-10',
					name: 'Crucible Dragon\'s Domain',
					description: 'If the encounter map is a location the dragon has occupied for 1 week or more, melted metal and blades coat nearly every wall and column. A creature or object other than the dragon that comes into physical contact with an aﬀected surface takes 5 damage. Whenever an enemy uses an ability that deals electric damage, they take 1d6 damage and deal half the amount of damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-11',
						name: 'Heart of the Forge',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 6 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '4 fire damage, I<2 frightened (save ends)',
							tier2: '6 fire damage, I<3 frightened (save ends)',
							tier3: '8 fire damage, I<4 frightened (save ends)'
						}),
						effect: 'The dragon roars, venting scorching air in every direction.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-12',
						name: 'Subdermal Shielding',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'Shields embedded under their scales emerge, giving the dragon damage immunity 6 at the start of each round for the rest of the encounter. The dragon loses this immunity for the rest of the round if they take any damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-crucible-feature-13',
						name: 'Polarity Chaos',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 6 }) ],
						target: 'All creatures and objects in the burst',
						preEffect: 'The dragon charges their wyrmscale aura, whipping metal into a magnetized frenzy. Each target makes an **Agility test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Agility,
							tier1: '16 damage, pull 10 or push 10',
							tier2: '13 damage, pull 8 or push 8',
							tier3: '7 damage, pull 5 or push 5'
						})
					})
				})
			]
		})
	],
	addOns: []
};
