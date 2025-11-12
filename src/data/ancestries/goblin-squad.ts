import { Ancestry } from '@/models/ancestry';
import { FactoryLogic } from '@/logic/factory-logic';

export const goblinSquad: Ancestry = {
	id: 'ancestry-goblin-squad',
	name: 'Goblin Squad',
	description: `
*By Tamwin Le'Feur*

Ever wish you were just a bunch of little guys? Are you a believer in Quantity over Quality? Then this may be the ancestry for you! Easily reflavourable to be a band of kobolds, angulotls, radenwights, or any other similar group.`,
	features: [
		FactoryLogic.feature.create({
			id: 'goblin-squad-feature-1',
			name: 'Goblins Goblins Everywhere!',
			description: `
You are a group of 5 1S minions, and your stamina pool has breakpoints at 2/3, 1/3, 0, and -1/3 of your health. Whenever you are dropped to or below a breakpoint, the goblin who was damaged dies (or maybe just runs away). Whenever you spend a recovery, another goblin jumps out of some nearby bushes, climbs out of a sewer, is dropped by a giant hawk, or otherwise enters the battlefield to join your squad. The exact entry point is up to the Director, but you may have the new goblin (and only the new goblins) immediately take a move action as a free triggered action.

Each goblin MUST have their own unique name.`
		}),
		FactoryLogic.feature.create({
			id: 'goblin-squad-feature-2',
			name: 'The Boss',
			description: `
Every goblin group has a Boss, chosen through rigorous methods such as having the most impressive ears or holding That One Cool Stick We Found. Even in situations where a non-goblin (such as another hero, perhaps) is the actual "boss" of a group, they will inevitably have a goblin sub-boss handling the day-to-day operations. You may change which goblin is the Boss as no action at the start of your turn to another goblin within a range of 5 plus your highest characteristic score, tossing over the stick or reclassifying the metrics for ear impressiveness as needed. If the Boss is killed, choose a new boss immediately. If there is no "valid" target (either due to range or LoE obstruction), then the closest goblin becomes the boss. You may also need to change the boss selection method if the cool stick was lost.

In combat, any goblin who is out of range of the Boss (ignoring LoE) can only use movement, and can only move towards the Boss.`
		}),
		FactoryLogic.feature.create({
			id: 'goblin-squad-feature-3',
			name: 'Tiny Stabs',
			description: 'Whenever a goblin makes an opportunity attack, they deal damage equal to their highest characteristic plus any weapon damage bonus you have (such as from kits or treasures).'
		}),
		FactoryLogic.feature.create({
			id: 'goblin-squad-feature-4',
			name: 'Frail Constitution',
			description: 'While together they may be mighty, individually they are very weak. When an individual goblin is suffering from being Weakened, Slowed, Frightened, Dazed, or Bleeding, they are stunned. While stunned this way, they can take no actions, manoeuvres/free manoeuvres, triggered actions/free triggered actions, movement, and cannot be made the Boss. If every goblin is stunned, then the boss can still act as normal (though still suffering normally from any conditions they might have).'
		}),
		FactoryLogic.feature.create({
			id: 'goblin-squad-feature-5',
			name: 'Goblin Turns',
			description: 'On your turn, you can use actions, manoeuvres, and triggered actions from any goblin. If you use an ability which only affects yourself, then you can use it with ALL of your goblins (For example, the Push and Grab manoeuvres happen for one goblin, but the stand up from prone and escape grab manoeuvres apply to every goblin). When you move, you can move with every goblin, and you can individually choose to advance, disengage, or ride for each.'
		}),
		FactoryLogic.feature.create({
			id: 'goblin-squad-feature-6',
			name: 'Safety in Numbers',
			description: 'Being a tight-knit squad is all fun and games until the Elementalist casts conflagration. Whenever multiple goblins take damage from the same ability, each goblin takes half damage. This includes being attacked by a squad of minions.'
		}),
		FactoryLogic.feature.create({
			id: 'goblin-squad-feature-7',
			name: 'No, That\'s MY Surge!',
			description: 'Goblins will squabble over anything. If multiple goblins in the same squad would benefit or be allowed to act by an ability, only one of them gains that benefit. When a goblin dies with a beneficial effect that has a duration, another goblin of your choice gains that effect for the remainder of the duration.'
		}),
		FactoryLogic.feature.createChoice({
			id: 'goblin-squad-feature-8',
			name: 'Goblin Squad Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8a',
						name: 'The Big Boss',
						description: 'Whether through prodigious appetite, by virtue of not actually being a goblin, or the clever use of two friends and a trenchcoat, one member of your group has grown to the point where there is no question that they are in charge. The Boss is size 1L, but can no longer be changed to a different goblin outside of a respite. If the Boss would die from being damaged below a breakpoint, you may have another goblin heroically sacrifice themselves instead.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8b',
						name: 'Snap Elections',
						description: 'Goblins are masters of rapid democracy and picking the right gob for the job. You can change the Boss off your turn, and can make stunned goblins the Boss.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8c',
						name: 'There are Dozens of Us. Dozens!',
						description: 'For each that falls, two one will take their place. As a triggered action when a goblin is killed, you may spend a recovery.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8d',
						name: 'Never Seen the Guy in My Life!',
						description: 'Your group of goblins has some clearly identifiable mark, such as a uniform, signature weapon, or manner of speech. By having a goblin remove that mark, their actions will not be attributed to your group. Particularly insightful or prejudiced individuals may still have suspicions, even if nothing can be proven.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8e',
						name: 'Sneaky',
						description: 'Stealth comes third nature to goblins (after stabbing things and running away). You can move at full speed when sneaking.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8f',
						name: 'A Very Particular Set of Skills',
						description: 'Each member of your band is a highly specialised expert. Assign each skill you have to a specific goblin in your group, as evenly as possible. Whenever that goblin dies, you lose those skills, and must pick different ones from the same skill groups which will be given to their replacement.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8g',
						name: 'Many Hands Make Grabby Work',
						description: 'You are practised in coordinated takedowns. When you have multiple goblins next to a target you attempt to grab, they can all take the grab maneuver against that target. The maximum size of creature you can grab is increased by the number of goblins currently or attempting to grab them beyond the first.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8h',
						name: 'Crafty',
						description: 'By weaving in between their legs, you can turn your enemies or allies into protectors. When you move into a creature\'s square, that movement doesn\'t trigger opportunity attacks.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'goblin-squad-feature-8i',
						name: 'Crafty, no wait actually',
						description: 'Like chefs in a kitchen, you know how to best work together and get the job done. Add +2 to the results of any crafting project roll. If you are crafting a consumable item, add +4 instead.'
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 4
};
