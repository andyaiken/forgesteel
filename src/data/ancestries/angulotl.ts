import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { ConditionType } from '@/enums/condition-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';

// ANGULOTL — Axolotl-adjacent amphibians. Small, amphibious, slippery.
// Built following ANCESTRY_CREATION_GUIDE.md and patterned loosely after warforged.ts structure.

export const angulotl: Ancestry = {
	id: 'ancestry-angulotl',
	name: 'Angulotl',
	description:
    'Axolotl-blooded amphibians with frilled gills and elastic skin. Small (1S) and amphibious; excel at escapes, water-sense, and current-bending tricks.',
	features: [
		// --- SIGNATURE (always-on, 0 points) ---
		FactoryLogic.feature.createMultiple({
			id: 'angulotl-signature',
			name: 'Angulotl Physiology',
			features: [
				// Size: Small (1S)
				FactoryLogic.feature.createSize({
					id: 'angulotl-small',
					name: 'Small (1S)',
					description:
            'Your body plan is Small. Apply all standard 1S size interactions (carry, shove, squeeze, cover, and area effects).',
					sizeValue: 1,
					sizeMod: 'S'
				}),
				// Amphibious: breathe air and water; water counts as normal terrain for you
				FactoryLogic.feature.create({
					id: 'angulotl-amphibious',
					name: 'Amphibious',
					description:
            'You can breathe air and water. You move through water as though it were normal terrain and ignore penalties that stem purely from being submerged.'
				})
			]
		}),

		// --- PURCHASABLE OPTIONS (spend ancestry points) ---
		FactoryLogic.feature.createChoice({
			id: 'angulotl-options',
			name: 'Angulotl Options',
			options: [
				// 1‑POINT OPTIONS
				{
					feature: FactoryLogic.feature.createSpeed({
						id: 'angulotl-streamrunner',
						name: 'Streamrunner',
						description: 'Your base Speed is 6 as you slip along currents and wet stone.',
						speed: 6
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'angulotl-slick',
						name: 'Slick',
						description: 'Your Disengage becomes 1; you are practiced at slipping free of close pressure.',
						field: FeatureField.Disengage,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'angulotl-shed-skin',
							name: 'Shed Skin',
							description:
                'Triggered. When you become grabbed or restrained, you slough free and dart aside.',
							type: FactoryLogic.type.createTrigger('You gain grabbed or restrained'),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText(
									'End one of the triggering conditions on yourself, then shift 1.'
								)
							]
						})
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'angulotl-lateral-line',
						name: 'Lateral Line',
						description:
              'While in or adjacent to water, you have an edge on tests to detect creatures (sound/vibration/splash) and to track fresh movement through water within short distances.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'angulotl-mucous-sheen',
						name: 'Mucous Sheen',
						features: [
							FactoryLogic.feature.createBonus({
								id: 'angulotl-mucous-sheen-stability',
								name: 'Mucous Sheen — Stability',
								description: 'Your slick skin and low profile make you harder to shove or drag. +1 Stability.',
								field: FeatureField.Stability,
								value: 1
							}),
							FactoryLogic.feature.create({
								id: 'angulotl-mucous-sheen-escape',
								name: 'Mucous Sheen — Escape',
								description:
                  'You have an edge on tests to escape grapples initiated by creatures of your size or smaller.'
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'angulotl-slippery-mind',
						name: 'Slippery Mind',
						description:
              'Until the start of your next turn after you take any forced movement, you have an edge on saves vs. charm or compulsion.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'angulotl-still-heart',
						name: 'Still Heart',
						description:
              'While holding your breath or fully submerged, you have an edge on Stealth tests to remain unnoticed.'
					}),
					value: 1
				},

				// 2‑POINT OPTIONS
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'angulotl-gushing-jet',
							name: 'Gushing Jet',
							description:
                'You lash out with a high‑pressure jet of water that shoves foes and slicks the ground.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Area ],
							distance: [
								FactoryLogic.distance.create({
									type: AbilityDistanceType.Line,
									value: 3, // length of the line
									value2: 1, // width
									within: 1 // immediate range
								})
							],
							target: 'Each enemy in the area',
							cost: 'signature',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might, Characteristic.Reason ],
										tier1: '2 untyped damage',
										tier2: '5 untyped damage; push 1',
										tier3: '7 untyped damage; push 1; the affected squares become difficult terrain for enemies UEONT'
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
							id: 'angulotl-grasping-fronds',
							name: 'Grasping Fronds',
							description:
                'You yank a foe with kelp‑like fronds; water amplifies your pull.',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createRanged(5) ],
							target: 'One creature in or adjacent to water within 5 squares',
							sections: [
								FactoryLogic.createAbilitySectionText(
									'Pull 2. If the target started in water, it is slowed (save ends).'
								)
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createConditionImmunity({
						id: 'angulotl-immune-grabbed',
						name: 'Immune to Grabbed',
						description:
              'Your slick skin and joint flexion make it nearly impossible to keep hold of you.',
						conditions: [ ConditionType.Grabbed ]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'angulotl-regenerative-focus',
							name: 'Regenerative Focus',
							description:
                'You slough damaged tissue and re‑oxygenate your blood to blunt incoming harm.',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText(
									'End bleeding on yourself; you gain half damage against the next instance of untyped damage before end of turn.'
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
	ancestryPoints: 4
};
