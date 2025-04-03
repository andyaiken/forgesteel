import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const medusa: MonsterGroup = {
	id: 'monster-group-medusa',
	name: 'Medusa',
	description: 'Hunted as monsters with no thought given to their nature or origin, few creatures are as underestimated and misunderstood as medusas. Many people fear medusas for their monstrous appearance and ability to turn others to stone, but few realize the truth. Each of these monstrosities was once a humanoid, cursed and transformed for defying a god—but while some medusas embrace wickedness, others simply fight for their lives against ignorant hunters.',
	information: [
		{
			id: 'medusa-info-1',
			name: 'Cursed for Defiance',
			description: `
When a powerful mortal defies a god for good or for ill, the deity may curse them to live as a medusa. The offender’s skin and eyes become reptilian, and a nest of black venomous snakes replaces their hair. When the medusa wishes, beams from their eyes can slowly petrify others to stone.

The gods who use this punishment spread terrifying myths about medusas, causing mortals to attack and shun them. This often drives medusas into solitude—or to places haunted by creatures who don’t judge them based on mere appearance and horror stories. Many plot ways to break their curse, searching for lost healing rituals or secrets to use against the gods who cursed them. Others embrace their new gifts, building stone gardens of victims who foolishly hunted or harmed them.`
		},
		{
			id: 'medusa-info-2',
			name: 'Serpentine Reflexes',
			description: `
While the medusa’s stone gaze is legendary, they also can move, strike, and evade as swiftly as a snake, even briefly manifesting scaled wings to dart through the chaos. This enhanced dexterity makes them difficult to pin down.

They can fire beams from their eyes, allowing them to attack at range as necessary, but they’re deadly in melee, where they have the full advantage of their snakes and the enervating venom pulsing through each set of needlelike fangs.`
		},
		{
			id: 'medusa-info-3',
			name: 'Baleful Magic',
			description: 'Medusas have many means to defend themselves, even aside from their petrifying stare. They slow enemies down, weaken them, and—once their petrifying magic has rooted itself in their foes—temporarily charm and control their enemies. These reclusive beings are no stranger to being outnumbered and overwhelmed; all they have in their power to gain leverage over their opponents, they wield ruthlessly.'
		},
		{
			id: 'medusa-info-4',
			name: 'Stone Gardens',
			description: 'Medusas often reside in stone gardens filled with statues of those who previously tried to slay them. This not only allows them to slip between their statues, hide, and then strike, it also allows them to command the battlefield of stone, shattering statues to harm others. Some may slowly unpetrify their victims, one limb at a time, to feed on them, creating grotesque mausoleums of the dead for unwitting adventurers to wander into.'
		},
		{
			id: 'medusa-info-5',
			name: 'Lifting the Curse',
			description: 'The deity who inflicted a medusa’s curse can rarely be convinced to lift the punishment, usually by undertaking an impossible task in the god’s name or making a threat they can’t ignore. Some sages claim ancient rituals can undo a god’s curse, but these lost secrets are hidden by wrathful divine servants—and performing such a ritual would almost certainly entail great sacrifice.'
		},
		{
			id: 'medusa-info-6',
			name: 'Medusa Languages',
			description: 'Medusas can speak any language they knew before they were cursed. Many of them speak Caelian, and others still have learned the languages of monsters and creatures they dwell near—many tales tell of medusas who speak the original form of Khamish.'
		}
	],
	malice: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'medusa-malice-1',
				name: 'Weakening Glare',
				type: FactoryLogic.type.createAction(),
				keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
				distance: [ FactoryLogic.distance.createRanged(10) ],
				target: 'One creature',
				cost: 3,
				powerRoll: FactoryLogic.createPowerRoll({
					bonus: 4,
					tier1: '6 damage; weakened (EoT)',
					tier2: '10 damage; weakened (EoT)',
					tier3: '12 damage; weakened (save ends)'
				})
			})
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'medusa-malice-2',
				name: 'Ssstop and Lisssten',
				type: FactoryLogic.type.createAction(),
				keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.createRanged(10) ],
				target: 'Three creatures',
				cost: 5,
				powerRoll: FactoryLogic.createPowerRoll({
					bonus: 4,
					tier1: 'I<2 charmed',
					tier2: 'I<3 charmed',
					tier3: 'I<4 charmed'
				}),
				effect: 'A charmed creature moves up to their speed and makes a free strike against an enemy of medusa’s choice as a free triggered action, and then is no longer charmed.'
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'medusa-malice-3',
			name: 'Shatter Victims',
			cost: 7,
			sections: [
				'The medusa causes three stone statues on the map within 10 to shatter in a 2-square-by-2-square explosion. Each enemy occupying an aﬀected square makes a **Might test**. A target aﬀected by the Medusa’s Petrify ability has a double bane on the test as the growing stone within them painfully reverberates.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Might,
					tier1: '12 damage; vertical push 2; bleeding',
					tier2: '10 damage; vertical push 1',
					tier3: '6 damage'
				})
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'medusa-1',
			name: 'Medusa',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Accursed', 'Humanoid', 'Medusa' ],
			encounterValue: 70,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 400,
			stability: 0,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(2, 4, 0, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'medusa-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 5 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Acid, modifierType: DamageModifierType.Immunity, value: 5 })
					]
				}),
				FactoryLogic.feature.createSoloMonster({
					id: 'medusa-feature-2',
					name: 'the ashen hoarder'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'medusa-feature-3',
						name: 'Snake Bite',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: '2 creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '11 damage; M<2 slowed (save ends)',
							tier2: '16 damage; M<3 slowed (save ends)',
							tier3: '19 damage; M<4 slowed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'medusa-feature-4',
						name: 'Damning Gaze',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '2 creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '11 damage; push 3',
							tier2: '16 damage; push 5',
							tier3: '19 damage; push 7'
						}),
						spend: [
							{
								value: 3,
								effect: 'The medusa targets two additional creatures or objects.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'medusa-feature-5',
						name: 'Petrify',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the burst',
						cost: 5,
						preEffect: 'The medusa turns dozens of eerie snake eyes on their foes. Each target must make a Might test. A target with cover has an edge on the test.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Might,
							tier1: 'Slowed (save ends) or M<4 restrained (save ends)',
							tier2: 'M<3 restrained (save ends)',
							tier3: 'M<2 restrained (save ends)'
						}),
						effect: 'An already slowed target has -1 to resist the potency. A target restrained by this ability magically begins to turn to stone. A target that ends two consecutive turns restrained by this ability is petrified (see Petrification)'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'medusa-feature-6',
						name: 'Nimble Escape',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The medusa shifts 3 and hides, even if observed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'medusa-feature-7',
						name: 'Venomous Spit',
						type: FactoryLogic.type.createTrigger('A creature deals damage to the medusa.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						cost: 2,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '13 acid damage',
							tier2: '18 acid damage',
							tier3: '22 acid damage'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'medusa-feature-8',
					name: 'Cunning Edge',
					description: 'The medusa has an edge on power rolls made against any creature aﬀected by their Petrify ability.'
				}),
				FactoryLogic.feature.create({
					id: 'medusa-feature-9',
					name: 'Many Peering Eyes',
					description: 'The medusa can’t be ﬂanked.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'medusa-feature-10',
						name: 'Mass Petrify',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createSpecial('Line of effect') ],
						target: 'All enemies',
						effect: 'The medusa uses their Petrify ability against each target without spending Malice. Each target not behind cover has a bane on the test.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'medusa-feature-11',
						name: 'Serpent Wings',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The medusa manifests temporary wings and vertically shifts up to their speed. During or after this movement, they can use Snake Bite and Damning Gaze once each.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'medusa-feature-12',
						name: 'Stone Puppets',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Special',
						effect: 'Each stone statue and creature affected by Petrify within distance moves up to their speed and uses a signature action with an edge targeting an enemy of medusa’s choice as a free triggered action. A stone statue without its own stats has a speed of 5 and uses the Medusa’s free strike instead.'
					})
				})
			]
		})
	],
	addOns: []
};
