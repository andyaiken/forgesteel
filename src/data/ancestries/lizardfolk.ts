import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';

export const lizardfolk: Ancestry = {
	id: 'lizardfolk',
	name: 'Lizardfolk',
	description: 'Hard-scaled marsh hunters with crushing jaws, muscled tails, and a culture honed by flood and fang. Masters of water, grabs, and battlefield isolation.',
	features: [
		// SIGNATURE — always-on, 0 points
		FactoryLogic.feature.createMultiple({
			id: 'lizardfolk-signature',
			name: 'Marsh-Born',
			features: [
				FactoryLogic.feature.create({
					id: 'lizardfolk-swimmer',
					name: 'Swimmer',
					description: 'You move through water as though it were normal terrain. You ignore penalties that stem purely from being submerged for movement and routine strikes/tests. You can hold your breath for a number of minutes equal to your Might (minimum 1).'
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-languages',
					name: 'River Tongues',
					description: 'You speak Caelian and a Khamish dialect (Director may swap one for a local tongue).'
				})
			]
		}),

		// OPTIONS — spend ancestry points
		FactoryLogic.feature.createChoice({
			id: 'lizardfolk-options',
			name: 'Lizardfolk Options',
			options: [
				// 1-POINT OPTIONS
				{
					feature: FactoryLogic.feature.create({
						id: 'lizardfolk-strong-swimmer',
						name: 'Strong Swimmer',
						description: 'While in water or starting your turn adjacent to water, your effective speed is treated as 6 for that turn.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'lizardfolk-stonehide-scales',
						name: 'Stonehide Scales',
						description: 'Dense scales brace you against shoves and slides.',
						field: FeatureField.Stability,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'lizardfolk-grip-fighter',
						name: 'Grip-Fighter',
						description: 'You have an edge on tests to start, maintain, or escape the Grabbed condition.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'lizardfolk-bog-stalker',
						name: 'Bog Stalker',
						description: 'While in or adjacent to water or muddy/reedy difficult terrain, you have an edge on Stealth tests to remain unnoticed.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'lizardfolk-tail-feint',
							name: 'Tail Feint',
							description: 'Flick your tail to spoil an attacker\'s aim and slip away.',
							type: FactoryLogic.type.createTrigger('An adjacent creature makes a strike against you'),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'The triggering attacker',
							sections: [
								FactoryLogic.createAbilitySectionText('The attacker takes a bane on the triggering strike; then you Shift 1.')
							]
						})
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'lizardfolk-reptilian-escape',
							name: 'Reptilian Escape',
							description: 'You shed your tail-tip to wriggle free.',
							type: FactoryLogic.type.createTrigger('You become Grabbed, Prone, Slowed, or Weakened'),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText('End one of the triggering conditions on yourself, then Shift 2. Once per respite.')
							]
						})
					}),
					value: 1
				},

				// 2-POINT OPTIONS
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'lizardfolk-bola-cast',
							name: 'Bola Cast',
							description: 'Hurl a weighted cord to hobble your prey.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Ranged ],
							distance: [ FactoryLogic.distance.createRanged(5) ],
							target: 'One creature',
							cost: 'signature',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might, Characteristic.Agility ],
										tier1: '2 damage; on hit the target is restrained (save ends)',
										tier2: '5 damage; restrained (save ends)',
										tier3: '7 damage; restrained (save ends)'
									})
								)
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'lizardfolk-hooked-drag',
							name: 'Hooked Drag',
							description: 'Snag a foe with barbed iron or a hooked spear and haul them close.',
							type: FactoryLogic.type.createManeuver(),
							keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Ranged ],
							distance: [ FactoryLogic.distance.createRanged(3) ],
							target: 'One creature',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might, Characteristic.Agility ],
										tier1: '2 damage; pull 2',
										tier2: '5 damage; pull 2',
										tier3: '7 damage; pull 2'
									})
								)
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'lizardfolk-crocodilian-roll',
							name: 'Crocodilian Roll',
							description: 'Wrench and roll a grabbed foe, using momentum and water.',
							type: FactoryLogic.type.createManeuver(),
							keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'One grabbed creature',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might ],
										tier1: '2 damage; slide the target up to 3',
										tier2: '5 damage; slide the target up to 3',
										tier3: '7 damage; if you started this turn with the target grabbed, the target is dazed (save ends) instead of being slid'
									})
								)
							]
						})
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3
};

export default lizardfolk;
