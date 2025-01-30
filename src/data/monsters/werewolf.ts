import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const werewolf: MonsterGroup = {
	id: 'monster-group-werewolf',
	name: 'Werewolf',
	description: `
When you see the blood in their eyes, the werewolf is already upon you.

Werewolves are shapeshifters filled with a need to rend and tear. They used to be ordinary humans, elves, polders, and the like. But when their feral compulsion takes control, they change into abominable beastment and sometimes massive wolves.`,
	information: [
		{
			id: 'werewolf-info-1',
			name: 'Howling Primordial Chaos',
			description: 'Werewolves are swirling conductors of Primordial Chaos. Their bodies overflow with energy, almost painfully so. They shift and expand their forms into more beastlike shapes to best contain their power. And yet, one bite is all it takes for those ferocious forces to flow into its next host.'
		},
		{
			id: 'werewolf-info-2',
			name: 'Brokered or Cursed',
			description: `
The curse of the werewolf is actively sought out by terrible nobles and rulers looking to extend their power and instill fear into their people. They secure deals with devils who can tap into the Primodial Chaos and unleash their beast, usually in exchange for relinquishing their legacy after they come to pass.

Laypeople don’t have the luxury of a legacy, nor do they have councils that can help temper a werewolf. They know full well the horror of losing yourself to the beast and take action to rout out the threat of a werewolf among their own. Fear leaves them submissive to the demands of cursed kings, yet oppressive to their own accursed kin.`
		},
		{
			id: 'werewolf-info-3',
			name: 'On Wights and Weres',
			description: 'The powers that bore the werewolves were also harnessed and cultivated under the traditions of the stormwight furies. A werewolf’s ferocity cannot overcome the stormwight’s rage, nor can rage overpower ferocity. It’s not uncommon for werewolves to subconsciously treat encounters with stormwight furies as if they were sport.'
		},
		{
			id: 'werewolf-info-4',
			name: 'Werewolf Languages',
			description: 'Werewolves can speak any language they knew before they were cursed. The werewolves that have spent time researching their curse might also know Khamish, Anjali, or Khelt, depending on the source of their particular circumstances.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'werewolf-malice-1',
			name: 'Blood in their Eyes',
			cost: 3,
			sections: [
				'The werewolf gains 10 temporary Stamina and their speed increases by 3 until the end of their turn. The werewolf can’t activate this power if they took any holy damage since the end of their previous turn.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'werewolf-malice-2',
			name: 'Accursed Mist',
			cost: 5,
			sections: [
				'The encounter map becomes hazy until the end of the round. The werewolf has damage immunity 2 and is concealed while in the mist. Any Creatures that have 1 or more ferocity at the end of their turn while in the mist gains 2 ferocity.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'werewolf-malice-3',
			name: 'Moonfall',
			cost: 10,
			sections: [
				'The encounter map turns to night and the moon appears impossibly big in the sky until the end of the encounter. The werewolf can take an additional maneuver on each of their turns while they have line of effect to the moon.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'werewolf',
			name: 'Werewolf',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.NoRole, MonsterOrganizationType.Solo),
			keywords: [ 'Accursed', 'Humanoid', 'Werebeast' ],
			encounterValue: 30,
			speed: FactoryLogic.createSpeed(8),
			stamina: 200,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 2, -1, 1, 1),
			features: [
				FactoryLogic.feature.createSoloMonster({
					id: 'werewolf-feature-1',
					name: 'the werewolf'
				}),
				FactoryLogic.feature.create({
					id: 'werewolf-feature-2',
					name: 'Shapeshifter',
					description: 'The werewolf enters combat in their hybrid humanoid form. Their shape can’t change via any effects beyond their own ability.'
				}),
				FactoryLogic.feature.create({
					id: 'werewolf-feature-3',
					name: 'Ferocity',
					description: 'The werewolf’s abilities are capable of inflicting ferocity points on non-stormwight enemies. If a creature has 10 or more ferocity at the start of their turn, they spend all their ferocity and either make a free strike at the nearest creature or shift up to their speed towards the nearest creature and take a free strike. Non-stormwight creatures that take damage in this way gain 1 ferocity. All accumulated ferocity disappears after completing a respite.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'werewolf-feature-4',
						name: 'Accursed Bite',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage; 2 ferocity',
							tier2: '13 damage; 4 ferocity',
							tier3: '16 damage; 5 ferocity'
						}),
						spend: [
							{ value: 2, effect: 'The target has P<0 lycanthropy. The potency of this attack increases by 1 each time the werewolf forces the same target to resist it.' }
						],
						effect: 'A creature afflicted with lycanthropy accumulates 2 ferocity at the end of each of their turns whenever they’re in combat. Their ferocity does not disappear after completing a respite; they must complete the Find a Cure project to end this condition.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'werewolf-feature-5',
						name: 'Claws',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage',
							tier2: '11 damage; 1 ferocity; M<2 push 3',
							tier3: '14 damage; 3 ferocity; M<3 vertical slide 3'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'werewolf-feature-6',
						name: 'Berserker Slash',
						type: FactoryLogic.type.createAction(),
						cost: 5,
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The werewolf shifts up to their speed and uses Claws against each creature who comes within 1 of the werewolf during the move. The werewolf makes one power roll against all targets.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'werewolf-feature-7',
						name: 'Wall Leap',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The werewolf jumps 4 squares. If they end this movement at a wall, the werewolf jumps off the wall 4 squares and makes a melee free strike.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'werewolf-feature-8',
						name: 'Facepalm and Head Slam',
						type: FactoryLogic.type.createTrigger('The target targets the werewolf with a melee ability after charging nor moving 3 or more squares in a straight line towards them.'),
						cost: 2,
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature',
						effect: 'The target is knocked prone and takes 5 damage before executing the ability.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'werewolf-feature-9',
					name: 'Vukenstep',
					description: 'The werewolf ignores difficult terrain.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'werewolf-feature-10',
						name: 'Howl',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All enemies in the burst',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Intuition,
							tier1: 'Target moves up to their speed away from the werewolf; frightened (save ends)',
							tier2: 'Frightened (EoT)',
							tier3: 'no effect'
						}),
						effect: 'Enemies that have 1 or more ferocity gain 4 ferocity and howl along with the werewolf.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'werewolf-feature-11',
						name: 'Full Wolf',
						type: FactoryLogic.type.createVillainAction(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The werewolf changes into a massive wolf, pushing adjacent creatures out of their way and moving into a square that can accommodate their new size. Until they die or the end of the encounter, their Speed is 10, their Size is 3, and their Stability is 2. Each of the werewolf’s strikes deal an additional 3 damage and inflict an additional 1 ferocity. The potency of the werewolf’s Accursed Bite increases by 1.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'werewolf-feature-12',
						name: 'Rampage',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All creatures in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; 2 ferocity',
							tier2: '11 damage; 4 ferocity',
							tier3: '14 damage; 8 ferocity; prone'
						}),
						effect: 'The werewolf shifts up to twice their speed either before or after using this ability.'
					})
				})
			]
		})
	]
};
