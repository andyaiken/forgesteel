import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { StatBlockIcon } from '../../enums/stat-block-icon';

export const dragonThorn: MonsterGroup = {
	id: 'monster-group-dragon-thorn',
	name: 'Dragon, Thorn',
	description: ` Thorn dragons take root in the destitution of nature, and are cultivated by the suffering of those who struggle against the cruelty of drought, fire, flood, and more. Though a region’s people might have long overcome past famine, the desperation of those who suffered long before has already nurtured their future scourge.

These dragons appear born of the wood, resembling living thickets bedecked in torturous thorns. With twisting briar horns and wings shaped by tangled roots, thorn dragons embody the richness of nature they so readily leech the life from.`,
	picture: null,
	information: [
		{
			id: 'dragon-thorn-info-1',
			name: 'Conquerors of the Green',
			description: `
Thorn dragons cultivate their lairs in lush farmlands or flourishing forests. They engulf these beautiful regions in massive briar thickets, choking out existing flora until their own brambles are the only things that grow. In forests, this process drives out local fauna smart enough to flee rather than foolishly fight against the wood’s new ruler. When a thorn dragon establishes their lair over a village’s farmlands, local folk either wisely relocate or slowly starve for the sake of stubborn pride.`
		},
		{
			id: 'dragon-thorn-info-2',
			name: 'Natural Curators',
			description: ' More intelligent dragons seek all forms of riches for their hoard, but thorn dragons have no eye for worldly treasures. Instead, they amass the wealth of the wild they represent. Thorn dragons stockpile food—even food they won’t eat—alongside uncut gemstones, minerals and ore, wood, oils, and spices.'
		},
		{
			id: 'dragon-thorn-info-3',
			name: 'Bestial Instincts',
			description: `
Compared to more powerful dragons, thorn dragons are closer to beasts in temperament. They are incapable of speech and act primarily on instinct as they expand their territories, defend their lairs, and grow their hoards. 

Despite this, the folk of certain settlements manage to avoid being driven from their homes or starved at the expense of being dependent on a thorn dragon’s bestial ego. These farmers and woods folk come to a tenuous understanding with the dragon, trading them the kinds of treasure they desire in exchange for meager foodstuffs from the dragon’s hoard.`
		},
		{
			id: 'dragon-thorn-info-4',
			name: 'Territorial Brutes',
			description: ' Thorn dragons are highly territorial, and are vigilant against potential threats to their lairs. To defend their homes, these dragons take advantage of their thickets by dragonsealing intruders, pushing and pulling them across the briars, and letting the thorns bleed them dry. When mere brambles aren’t enough, thorn dragons either imbue those brambles’ barbs with poison or breathe out those toxins directly, taking pleasure in slowly draining the life from their enemies.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'dragon-thorn-malice-1',
			name: 'Cage of Thorns',
			cost: 3,
			icon: StatBlockIcon.Trait,
			sections: [
				'A cage of thorns grows around one dragonsealed enemy on the encounter map, making that enemy restrained until the end of their next turn.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-thorn-malice-2',
			name: 'Bramble Barricade',
			cost: 5,
			icon: StatBlockIcon.Area,
			sections: [
				'The dragon grows a 10 wall of briars in unoccupied spaces on the encounter map. The wall blocks line of effect for all creatures except the dragon. Each square of the wall has 5 Stamina and fire weakness 5. The area can be moved through but is difficult terrain. Any creature who is force moved into or within the area takes 1 damage for each square of the area entered and is bleeding until the end of their next turn.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-thorn-malice-3',
			name: 'Solo Action',
			cost: 5,
			icon: StatBlockIcon.Villain,
			sections: [
				'The dragon takes an additional main action on their turn. They can use this feature even if they are dazed.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dragon-thorn-malice-4',
			name: 'Afflictive Overgrowth',
			cost: 7,
			icon: StatBlockIcon.SpecialArea,
			sections: [
				'The dragon summons poisonous, biting thorns around their foes. Each enemy on the encounter map makes an **Agility test**.',
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
			characteristics: FactoryLogic.createCharacteristics(2, 3, -1, 1, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'dragon-thorn-feature-1',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				}),
				FactoryLogic.feature.createSoloMonster({
					id: 'dragon-thorn-feature-2',
					name: 'the thorn dragon',
					endEffect: 10
				}),
				FactoryLogic.feature.create({
					id: 'dragon-thorn-feature-4',
					name: 'Withering Wyrmscale Aura',
					description: 'The dragon’s scales create a 2 aura of withering green magic around them. Any creature other than the dragon who regains Stamina in the area regains only half the expected amount. Any winded creature who enters the area for the first time in a round or starts their turn there takes 1d3 corruption damage.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-5',
						name: 'Virulent Breath',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 1, within: 1 }) ],
						target: 'Each enemy and object in the area',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes a **Might test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Might,
								tier1: '12 poison damage; the target is dragonsealed (save ends)',
								tier2: '9 poison damage; the target is dragonsealedd (save ends)',
								tier3: '5 poison damage'
							})),
							FactoryLogic.createAbilitySectionText('A dragonsealed creature has their wounds bound by nettles and thorns, causing them to take an extra 1d3 damage whenever they take damage rolled as a d6 or a d3.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-6',
						name: 'Spinous Tail Swing',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two enemies or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '8 damage; push 2',
								tier2: '12 damage; push 4',
								tier3: '15 damage; push 8'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'Each target takes an extra 1d3 damage, and if they have A<2, they are bleeding (save ends).'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dragon-thorn-feature-7',
					name: 'Provoking Nettles',
					description: 'Once per turn, the dragon shifts up to 5 squares and can move through enemies’ spaces at their usual speed. The first time the dragon moves through an enemy’s space during this movement, the enemy takes 3 damage.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-8',
						name: 'Investiture of Verdure',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each enemy in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('Each target must be dragonsealed. Each target is pulled up to 5 squares toward the dragon, who gains 5 temporary Stamina for each target pulled.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-9',
						name: 'Prickly Situation',
						type: FactoryLogic.type.createTrigger('A dragonsealed creature within distance ends the dragonsealed effect.', { free: true }),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target is pulled up to 5 squares toward the dragon, and if they have A<2, they are restrained until the end of their next turn.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-10',
						name: 'Thorny Scales',
						type: FactoryLogic.type.createTrigger('A creature within distance deals damage to the dragon with a melee strike.'),
						cost: 1,
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The dragon makes a free strike against the target, and if the target has m<2], they are bleeding until the end of their next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dragon-thorn-feature-11',
					name: 'Thorn Dragon\'s Domain',
					description: ' If the encounter map is a location the dragon has occupied for 1 week or more, all surfaces on the map are covered in overgrowth. Any creature other than the dragon who starts their turn on the encounter map has their speed reduced by 2 (to a minimum of 1). Any creature made restrained while on the ground is also made bleeding.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-12',
						name: 'Briar Bindings',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
						target: 'All enemies',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '5 damage, A<1 restrained (save ends)',
								tier2: '9 damage, A<2 restrained (save ends)',
								tier3: '12 damage, A<3 restrained (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-13',
						name: 'Thorned Armor',
						type: FactoryLogic.type.createVillainAction(2),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The thorns upon the dragon’s scales grow longer and sharper. Until the end of the encounter, any adjacent creature who targets the dragon with a melee strike takes 3 damage. The dragon then uses their Provoking Nettles ability.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dragon-thorn-feature-14',
						name: 'Malign Thicket',
						type: FactoryLogic.type.createVillainAction(3),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText(`Poisonous overgrowth and seeking vines cover all surfaces on the encounter map. The dragon uses their Bramble Barricade Malice feature twice at no cost. Until the end of the encounter, any creature force moved by the dragon takes 1d3 poison damage, and if they have M<2, they are weakened (save ends).

*Special*: If the Thorn Dragon’s Domain trait is in effect, any creature other than the dragon who starts their turn on the encounter map takes 1d3 poison damage.`)
						]
					})
				})
			]
		})
	],
	addOns: []
};
