import { EnvironmentData, OrganizationData, UpbringingData } from '@/data/culture-data';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { ConditionType } from '@/enums/condition-type';
import { CultureType } from '@/enums/culture-type';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';

export const timeRaider: Ancestry = {
	id: 'ancestry-time-raider',
	name: 'Time Raider',
	description: 'The original servitor species of the synliroi — evil psions with near godlike power — the kuran’zoi liberated themselves during the First Psychic War. In the centuries since, they built their own culture and civilization as nomads of the timescape. The exonym “time raiders” was given to them by denizens of the lower worlds who, seeing the advanced technology the kuran’zoi wield, concluded they must be from the future',
	features: [
		FactoryLogic.feature.createDamageModifier({
			id: 'time-raider-feature-1',
			name: 'Psychic Scar',
			description: 'Your mind is a formidable layer of defense. You have psychic immunity equal to your level.',
			modifiers: [ FactoryLogic.damageModifier.createPerLevel({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 1 }) ]
		}),
		FactoryLogic.feature.createChoice({
			id: 'time-raider-feature-2',
			name: 'Time Raider Traits',
			options: [
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'time-raider-feature-2-1',
							name: 'Beyondsight',
							description: 'You adjust your vision to allow you to see through mundane obstructions.',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText('You can see through mundane obstructions that are 1 square thick or less. While your vision is adjusted this way, you can’t see the area within 1 square of you and you don’t have line of effect to any creature or object in that area. You can restore your usual vision as a maneuver.')
							]
						})
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'time-raider-feature-2-2',
						name: 'Foresight',
						description: 'Your senses extend past mundane obscuration and the veil of the future alike.',
						features: [
							FactoryLogic.feature.create({
								id: 'time-raider-feature-2-2a',
								name: 'Foresight',
								description: 'You automatically know the location of any creature with concealment who isn’t hidden from you within 20, and you negate the usual bane on strikes against such creatures.'
							}),
							FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'time-raider-feature-2-2b',
									name: 'Foresight',
									description: '',
									type: FactoryLogic.type.createTrigger('You are targeted with a strike'),
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									sections: [
										FactoryLogic.createAbilitySectionText('You impose a bane on the power roll.')
									]
								})
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'time-raider-feature-2-3',
						name: 'Four-Armed Athletics',
						description: 'Your unique physiology enhances your movement. You gain an edge on tests that use the Climb, Gymnastics, or Swim skills when you can use all your arms in the attempt.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'time-raider-feature-2-4',
						name: 'Four-Armed Martial Arts',
						description: 'Your multiple arms let you take on multiple tasks at the same time. Whenever you use the Grab or Knockback maneuver against an adjacent creature, you can target one additional adjacent creature, using the same power roll for both targets. Additionally, you can have up to two creatures grabbed at a time.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createChoice({
						id: 'time-raider-feature-2-5',
						name: 'Psionic Gift',
						count: 1,
						options: [
							{
								feature: FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: 'time-raider-feature-2-5-1',
										name: 'Concussive Slam',
										description: 'You slam an invisible force down upon the target.',
										type: FactoryLogic.type.createMain(),
										cost: 'signature',
										keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
										distance: [ FactoryLogic.distance.createRanged(10) ],
										target: 'One creature or object',
										sections: [
											FactoryLogic.createAbilitySectionRoll(
												FactoryLogic.createPowerRoll({
													characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
													tier1: '2 + R, I, or P damage',
													tier2: '5 + R, I, or P damage; push 1',
													tier3: '7 + R, I, or P damage; push 2; M < [strong] prone'
												})
											)
										]
									})
								}),
								value: 1
							},
							{
								feature: FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: 'time-raider-feature-2-5-2',
										name: 'Psionic Bolt',
										description: 'You shoot forth a purple beam of psychic force that grips your target.',
										type: FactoryLogic.type.createMain(),
										keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
										distance: [ FactoryLogic.distance.createRanged(10) ],
										target: 'One creature or object',
										cost: 'signature',
										sections: [
											FactoryLogic.createAbilitySectionRoll(
												FactoryLogic.createPowerRoll({
													characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
													tier1: '2 + R, I, or P psychic damage; slide 1',
													tier2: '5 + R, I, or P psychic damage; slide 2',
													tier3: '7 + R, I, or P psychic damage; slide 3'
												})
											)
										]
									})
								}),
								value: 1
							},
							{
								feature: FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: 'time-raider-feature-2-5-3',
										name: 'Minor Acceleration',
										description: 'You fill yourself or an ally with a burst of speed.',
										type: FactoryLogic.type.createManeuver(),
										keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Melee ],
										distance: [
											FactoryLogic.distance.createSelf(),
											FactoryLogic.distance.createMelee()
										],
										target: 'Self or one ally',
										cost: 'signature',
										sections: [
											FactoryLogic.createAbilitySectionText('The target gains a bonus to speed equal to your Reason, Intuition, or Presence score (your choice) until the start of your next turn.')
										]
									})
								}),
								value: 1
							}
						]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createConditionImmunity({
						id: 'time-raider-feature-2-6',
						name: 'Unstoppable Mind',
						description: 'Your mind allows you to maintain your focus in any situation.',
						conditions: [ ConditionType.Dazed ]
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3,
	culture: FactoryLogic.createCulture('Time Raider', 'Nomadic, communal, martial.', CultureType.Ancestral, EnvironmentData.nomadic, OrganizationData.communal, UpbringingData.martial, 'Voll')
};
