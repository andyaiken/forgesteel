import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Montage } from '@/models/montage';

export class MontageData {
	static fightFire: Montage = {
		id: 'montage-fight-fire',
		name: 'Fight Fire',
		description: 'Fire has broken out in the town! The heroes must prevent the conflagration from spreading while saving as many townsfolk as possible. Their efforts might be more complicated if the cause of the fire — such as a marauding dragon or an invading army — is still around causing trouble.',
		scene: 'Fire blazes in several buildings whose occupants need to be rescued. Elsewhere, some townsfolk flee while others throw water on the fire with no organization or plan. Without leadership and a way to stop its spread, the fire could easily consume everything. In a nearby stable, horses are panicking as their hay smolders. Burning rubble blocks pathways everywhere',
		sections: [
			{
				id: 'montage-fight-fire-main',
				name: '',
				description: '',
				challenges: [
					FactoryLogic.createMontageChallenge({
						id: 'bucket-chains',
						name: 'Bucket Chains',
						description: 'Organize the would-be firefighters into disciplined bucket brigades or fight the fire in some other way.',
						characteristics: [ Characteristic.Presence, Characteristic.Reason ],
						skills: 'Architecture, Intimidate, Lead'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'clearing-a-firebreak',
						name: 'Clearing a Firebreak',
						description: 'Prevent the fire from spreading by clearing the ground of flammable materials, either by moving it or burning it away. A creature loses a Recovery if they incur a consequence on this test.',
						characteristics: [ Characteristic.Might, Characteristic.Reason ],
						skills: 'Endurance, Lift',
						abilities: 'Abilities that deal fire damage'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'evacuating-buildings',
						name: 'Evacuating Buildings',
						description: 'Save people trapped in burning buildings. Heroes can attempt this task twice during the montage, since there are plenty of people to save. A creature that doesn’t have fire immunity loses a Recovery if they incur a consequence on their test.',
						characteristics: [ Characteristic.Might, Characteristic.Presence ],
						skills: 'Climb, Endurance, Persuade',
						uses: 2
					}),
					FactoryLogic.createMontageChallenge({
						id: 'find-more-firefighters',
						name: 'Find More Firefighters',
						description: 'Find groups that aren’t fighting the fire, such as fleeing civilians, and convince them to help.',
						characteristics: [ Characteristic.Presence ],
						skills: 'Intimidate, Lead, Persuade'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'free-the-horses',
						name: 'Free the Horses',
						description: 'Loose the stabled horses threatened by the fire and lead them to safety.',
						characteristics: [ Characteristic.Might, Characteristic.Presence ],
						skills: 'Lift, Handle Animals, Ride'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'move-burning-rubble',
						name: 'Move Burning Rubble',
						description: 'Shifting burning debris blocking doorways to allow people to escape the blaze. A creature that doesn’t have fire immunity loses a Recovery if they incur a consequence on this test.',
						characteristics: [ Characteristic.Might ],
						skills: 'Endurance, Lift'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'use-the-freed-horses',
						name: 'Use the Freed Horses',
						description: '(if **Free the Horses** was successful) Put the horses to work clearing rubble or bringing people to safety.',
						characteristics: [ Characteristic.Reason, Characteristic.Presence ],
						skills: 'Drive, Handle Animals, Ride'
					})
				],
				twistInfo: 'At the end of the first montage test round, an emergency crops up. One or more heroes, selected by the players, must deal with the situation before the end of the round. If the heroes successfully deal with the twist, they earn a success for the montage test. Otherwise, they earn a failure.',
				twists: [
					FactoryLogic.createMontageChallenge({
						id: 'building-collapse',
						name: 'Building Collapse',
						description: 'While a hero is in or near a blazing building, it starts to collapse. The hero must escape before the building crumbles.',
						characteristics: [ Characteristic.Agility, Characteristic.Intuition ],
						skills: 'Climb, Jump, Gymnastics'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'cause-of-the-fire',
						name: 'Cause of the Fire',
						description: 'At the end of the first round of the montage test, the hostile cause of the fire appears — a squad of an invading army, a dragon, a team of arsonists, and so forth. The characters must engage in a standard or hard encounter with this threat'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'help',
						name: 'Help!',
						description: 'Townsfolk are about to run into a burning building to save a trapped relative. This twist requires two tests, each of which nets a success or a failure for the montage test. One hero can try to prevent the townspeople from entering the burning building while another rescues the relative.',
						characteristics: [ Characteristic.Might, Characteristic.Presence ],
						skills: 'Lift, Persuade'
					})
				]
			}
		],
		outcomes: {
			totalSuccess: 'The fire is extinguished. Buildings are damaged but no lives were lost. The party achieves 2 Victories if the montage test was hard, or 1 Victory if it was easy or moderate, in addition to any Victories earned from combat during the montage test.',
			partialSuccess: 'The fire is quenched, although many buildings burned and a few lives were lost. Each character earns 1 Victory if the montage test was moderate or hard, in addition to any Victories earned from combat during the montage test.',
			totalFailure: 'When the fire finally burns out, the town lies in ruins. Townsfolk mourn their dead or grimly prepare to find a new home. Characters earn no Victories from the montage test, but might earn Victories from combat undertaken during the montage test'
		}
	};

	static infiltrateThePalace: Montage = {
		id: 'montage-infiltrate-the-palace',
		name: 'Infiltrate the Palace',
		description: 'Whether the heroes are trying to reach a tyrant’s throne room, pull off a daring art heist, or rescue royalty from captivity, they’re somewhere they’re not supposed to be — and they’d prefer to keep their presence secret.',
		scene: 'The palace is well defended, with exterior patrols always on the alert. The few obvious entrances are locked and guarded, and once the party is inside, no one knows the way to the goal. Guards patrol the interior of the site as well, forcing the characters to sneak or bluff their way past them.',
		sections: [
			{
				id: 'montage-infiltrate-the-palace-preparation',
				name: 'Preparation',
				description: 'Half the work of any successful infiltration is done before setting foot in the target site. The players can choose to have the heroes make individual tests as part of the montage test before they attempt to enter the palace. One round of tests can be made this way, and those tests don’t affect the alarm level within the palace (see below).',
				challenges: [
					FactoryLogic.createMontageChallenge({
						id: 'bribe-guards',
						name: 'Bribe Guards',
						description: 'The heroes can pay off guards to look the other way. If successful, one or more heroes’ Wealth is lowered by 1.',
						characteristics: [ Characteristic.Presence ],
						skills: 'Criminal Underworld, Flirt, Persuade'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'find-blueprints',
						name: 'Find Blueprints',
						description: 'Researching secret entrances and little-known passageways can be undertaken in forgotten libraries or well-guarded town halls.',
						characteristics: [ Characteristic.Agility, Characteristic.Reason ],
						skills: 'Architecture, Sneak, History'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'identify-unguarded-entrance',
						name: 'Identify Unguarded Entrances',
						description: 'Scouting around or consulting contacts can reveal a forgotten back door or accessible window',
						characteristics: [ Characteristic.Agility, Characteristic.Intuition ],
						skills: 'Alertness, Architecture, Criminal Underworld'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'learn-guard-schedules',
						name: 'Learn Guard Schedules',
						description: 'By keeping their ears and eyes open, characters can learn when guards go off duty.',
						characteristics: [ Characteristic.Intuition, Characteristic.Reason ],
						skills: 'Alertness, Eavesdrop, Track'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'make-false-identities',
						name: 'Make False Identities',
						description: 'By procuring forged documents or badges, characters can prepare to walk into the palace in plain sight.',
						characteristics: [ Characteristic.Presence, Characteristic.Reason ],
						skills: 'Disguise, Forgery, Lie'
					})
				],
				twistInfo: 'At any time during the infiltration section of the montage test, immediately after one hero’s turn, the characters run into another group breaking into the palace at the same time, and possibly after the same prize. The characters can choose to fight or negotiate with the other party, or simply let them pass — in which case they might meet them again when they reach their final goal.',
				twists: []
			},
			{
				id: 'montage-infiltrate-the-palace-infiltration',
				name: 'Infiltration',
				description: `
When the heroes start their infiltration, the alarm level of the palace starts at 0. While they infiltrate the site, whenever any hero fails a test as part of the montage test, the alarm level increases by 1, to a maximum of 2. Each time the heroes succeed on such a test, the alarm level decreases, to a minimum of 0. While the alarm level is 1, tests made inside the palace by the characters as part of the montage test take a bane. While the alarm level is 2, such tests have a double bane.

The first time any hero fails a test made as part of the montage test while the alarm level is 2, they encounter guards and must engage in a hard combat encounter. The second time any hero fails such a test while the alarm level is 2, the montage test is a total failure.`,
				challenges: [
					FactoryLogic.createMontageChallenge({
						id: 'aerial-route',
						name: 'Aerial Route',
						description: 'Characters can follow a path that leads along catwalks or high ledges.',
						characteristics: [ Characteristic.Agility, Characteristic.Might ],
						skills: 'Climb, Gymnastics, Jump'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'avoid-traffic',
						name: 'Avoid Traffic',
						description: 'By finding the dustiest, least-traveled areas and sticking to them, characters can avoid notice.',
						characteristics: [ Characteristic.Intuition, Characteristic.Reason ],
						skills: 'Navigate, Search, Track'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'lay-low',
						name: 'Lay Low',
						description: 'Once while the alarm level is greater than 0, the heroes can find a place to hide for a bit, reducing the alarm level by 1. This activity doesn’t require a test or generate a success or failure.'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'make-a-diversion',
						name: 'Make a Diversion',
						description: 'After causing a ruckus, the characters quickly go the other way.',
						characteristics: [ Characteristic.Might, Characteristic.Presence ],
						skills: 'Alchemy, Perform, Sabotage'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'skulk-in-the-shadows',
						name: 'Skulk in the Shadows',
						description: 'Keeping out of sight is the simplest way for characters to move through the palace.  The heroes can attempt this challenge twice during the montage test.',
						characteristics: [ Characteristic.Agility ],
						skills: 'Hide, Sneak',
						uses: 2
					}),
					FactoryLogic.createMontageChallenge({
						id: 'pose-as-guards',
						name: 'Pose as Guards',
						description: 'Using stolen or specially prepared uniforms can let the characters move freely through the palace. The test for this challenge gains an edge if the characters prepared disguises in advance (including succeeding on the Use False Identities challenge) or defeated guards during their infiltration',
						characteristics: [ Characteristic.Intuition, Characteristic.Presence ],
						skills: 'Disguise, Lie, Search'
					})
				],
				twistInfo: 'At any time during the infiltration section of the montage challenge, between one hero’s turn and another’s, the heroes learn another group is breaking into the site at the same time, possibly after the same prize. When the heroes run into them during the infiltration, they can fight, negotiate, or let them go—in which case they may meet them again when they reach their prize.',
				twists: []
			}
		],
		outcomes: {
			totalSuccess: 'The heroes reach their goal and secure an escape route that lets them leave the palace safely. Each character earns 2 Victories if the montage test was hard, or 1 Victory if it was easy or moderate, in addition to any Victories earned from combat during the montage test.',
			partialSuccess: 'The heroes reach their goal, but they need to fight a standard combat encounter to escape the palace. Each character earns 1 Victory if the montage test was moderate or hard, in addition to any Victories earned from combat during the montage test.',
			totalFailure: 'The palace is locked down and the heroes’ goal is out of reach. The characters need to fight a hard combat encounter to escape. Characters earn no Victories from the montage test, but might earn Victories from combat undertaken during the montage test.'
		}
	};

	static prepareForBattle: Montage = {
		id: 'montage-prepare-for-battle',
		name: 'Prepare for Battle',
		description: 'Whether it’s a village threatened by bandits or a great city preparing for a siege, enemies are on their way and readyu to attack. The heroes have a limited time to fortify the settlement’s defenses and bolster its troops.',
		scene: 'The walls or palisades around the settlement (if any) are in poor shape. Roads or rivers through the area give the invaders free access to the settlement unless barricades, traps, or ambushes can be set up. Supplies of food, weapons, and ammunition are too low to survive a long siege. The area is home to few experienced fighters compared to the numbers of the invaders, and the local militia is poorly equipped and untrained.',
		sections: [
			{
				id: 'montage-prepare-for-battle-main',
				name: '',
				description: '',
				challenges: [
					FactoryLogic.createMontageChallenge({
						id: 'arms-and-armor',
						name: 'Arms and Armor',
						description: 'Crafting or repairing weapons and armor of all kinds can help rebuild the defenders’ stores.',
						characteristics: [ Characteristic.Might, Characteristic.Reason ],
						skills: 'Alchemy, Blacksmithing, Fletching'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'evacuation',
						name: 'Evacuation',
						description: 'Heroes can help get noncombatants to safety before the invaders arrive.',
						characteristics: [ Characteristic.Intuition, Characteristic.Presence ],
						skills: 'Handle Animal, Lead, Persuade'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'fortification',
						name: 'Fortification',
						description: 'Characters can help build or repair walls and other defensive structures.',
						characteristics: [ Characteristic.Might, Characteristic.Reason ],
						skills: 'Architecture, Endurance, Lift'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'inspiration',
						name: 'Inspiration',
						description: 'Improving morale with rousing speeches or performances can help prepare the locals for the fight to come.',
						characteristics: [ Characteristic.Intuition, Characteristic.Presence ],
						skills: 'Brag, Lead, Perform'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'propaganda',
						name: 'Propaganda',
						description: 'Characters can attempt to sow confusion or rebellion in the ranks of the approaching army.',
						characteristics: [ Characteristic.Agility, Characteristic.Presence ],
						skills: 'Disguise, Forgery, Lie'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'stockpiling',
						name: 'Stockpiling',
						description: 'Characters can hunt, forage, or supernaturally conjure food or water to augment the settlement’s supplies.',
						characteristics: [ Characteristic.Agility, Characteristic.Reason ],
						skills: 'Nature, Sneak, Track'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'training',
						name: 'Training',
						description: 'Heroes can help train the settlement’s defenders.',
						characteristics: [ Characteristic.Might, Characteristic.Presence ],
						skills: 'Endurance, Intimidation, Lead'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'trapmaking',
						name: 'Trapmaking',
						description: 'Digging concealed pits, placing hindrances, and setting up ambushes will make it harder for the invaders to approach the settlement.',
						characteristics: [ Characteristic.Might, Characteristic.Reason ],
						skills: 'Conceal Object, Endurance, Mechanics'
					})
				],
				twistInfo: 'At the end of the first round of the montage test, a fast-moving enemy vanguard attack before the settlement’s defenders are ready. The heroes must must engage in an easy combat encounter.',
				twists: []
			}
		],
		outcomes: {
			totalSuccess: 'The settlement is fully fortified, and even if the heroes don’t fight in its defense, the settlement and its people survive. If the heroes wish, they can leave the settlement and fight a standard combat encounter against the leader of the invaders and their lackeys, possibly killing or capturing the leader. Each character earns 2 Victories if the montage test was hard, or 1 Victory if it was easy or moderate, in addition to any Victories earned from combat during the montage test.',
			partialSuccess: 'The settlement’s fortifications are improved, but the settlement will still fall unless the heroes fight in its defense. To save the settlement, the heroes must triumph in a hard combat encounter against the leader of the invaders and their lackeys. If the heroes lose the encounter, the settlement falls. Each character earns 1 Victory if the montage test was moderate or hard, in addition to any Victories earned from combat during the montage test.',
			totalFailure: 'The heroes each lose a Recovery from their failed efforts to defend the settlement, which is taken over by the invaders. If the players wish, the characters can fight two hard combat encounters against waves of invaders to allow some of the settlement’s inhabitants to retreat to safety. Characters earn no Victories from the montage test, but might earn Victories from combat undertaken during the montage test.'
		}
	};

	static trackTheFugitive: Montage = {
		id: 'montage-track-the-fugitive',
		name: 'Track the Fugitive',
		description: 'The heroes are on the trail of someone. An escaped criminal? A dangerous beast? A lost or kidnapped child? The difficulties of the chase depend on whether the quarry knows they’re being pursued and whether they want to be found.',
		scene: 'The fugitive’s route is easy to follow, but could they be setting a false trail? Did anyone see them pass by, and is there any sense of where they might be headed? The goal is for the characters to do whatever they can to find and stay on the fugitive’s trail.',
		sections: [
			{
				id: 'montage-track-the-fugitive-main',
				name: '',
				description: '',
				challenges: [
					FactoryLogic.createMontageChallenge({
						id: 'ask-around',
						name: 'Ask Around',
						description: 'Characters can gather clues from locals or bystanders — or if they have the proper magic, from animals or the dead.',
						characteristics: [ Characteristic.Intuition, Characteristic.Presence ],
						skills: 'Interrogate, Persuade, Rumors'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'follow-the-trail',
						name: 'Follow the Trail',
						description: 'Looking for tracks or other signs of the fugitive’s passage can lead the characters on.',
						characteristics: [ Characteristic.Intuition ],
						skills: 'Alertness, Search, Track',
						uses: 2
					}),
					FactoryLogic.createMontageChallenge({
						id: 'get-a-good-view',
						name: 'Obtain a Good View',
						description: 'Characters can climb up high to get the big picture of where the fugitive might have gone.',
						characteristics: [ Characteristic.Agility, Characteristic.Might ],
						skills: 'Climb, Gymnastics, Jump'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'predict-their-next-move',
						name: 'Predict the Next Move',
						description: 'The heroes might have an idea where the quarry is headed. A character gains an edge on the test for this challenge if they know the quarry well.',
						characteristics: [ Characteristic.Intuition, Characteristic.Reason ],
						skills: 'Navigate, Read Person, an appropriate skill from the Lore group (Nature to follow an animal or Criminal Underworld to follow a criminal, and so forth)'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'push-ahead',
						name: 'Push Ahead',
						description: 'While the quarry is resting, the heroes have a chance to close in. The hero making the test for this challenge loses a Recovery.',
						characteristics: [ Characteristic.Might ],
						skills: 'Endurance, Navigate, Ride, Drive'
					})
				],
				twistInfo: 'At the end of the first round of the montage test, the heroes stumble upon a trap set by the quarry or a problem they left behind. This might include such things as a pit trap set with poison spikes, a mob of angry locals who’ve been told the characters are criminals, or an intentionally set fire. The heroes must deal with the trap or problem before they continue the montage test.',
				twists: []
			}
		],
		outcomes: {
			totalSuccess: 'The heroes catch their quarry before the fugitive reaches their destination, or before a lost or kidnapped creature comes to harm. Each character earns 2 Victories if the montage test was hard, or 1 Victory if it was easy or moderate, in addition to any Victories earned from combat during the montage test.',
			partialSuccess: 'If the quarry was trying to evade capture, they reach their destination. They find allies and a fortified position from which to defend themselves, or they might have time to cause more harm. If the quarry was lost or kidnapped, they are grievously injured when found. Each character earns 1 Victory if the montage test was moderate or hard, in addition to any Victories earned from combat during the montage test.',
			totalFailure: 'The trail has gone cold, and the heroes will need to seek fresh clues or a different approach before they can resume the hunt. Characters earn no Victories from the montage test, but might earn Victories from combat undertaken during the montage test.'
		}
	};

	static wildernessRace: Montage = {
		id: 'montage-wilderness-race',
		name: 'Wilderness Race',
		description: 'The heroes must cross trackless wilderness, perhaps to reach a besieged city before it falls or seek the site where a curse is about to be activated. Getting there fast is a priority—but so is getting there alive.',
		scene: 'The wilds hold unknown dangers. Characters need to figure out the best route while maintaining a good pace, watching out for hazards, and avoiding predatory monsters.',
		sections: [
			{
				id: 'montage-wilderness-race-main',
				name: '',
				description: '',
				challenges: [
					FactoryLogic.createMontageChallenge({
						id: 'avoid-hazards',
						name: 'Avoid Hazards',
						description: 'Characters can determine ways to overcome the natural hazards of the wilderness, such as finding insect-repelling herbs in a swamp or making snowshoes to cross tundra.',
						characteristics: [ Characteristic.Intuition, Characteristic.Reason ],
						skills: 'Heal, Nature, an appropriate skill from the Crafting skill group (such as Alchemy to make bug repellent)'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'carry-baggage',
						name: 'Carry Baggage',
						description: 'By carrying supplies for the weaker party members, characters can increase the whole party’s speed.',
						characteristics: [ Characteristic.Might ],
						skills: 'Endurance, Lift'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'find-the-path',
						name: 'Find the Path',
						description: 'Avoiding getting lost is a major challenge for the characters.',
						characteristics: [ Characteristic.Intuition, Characteristic.Reason ],
						skills: 'Alertness, Nature, Navigation'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'keep-up-spirits',
						name: 'Keep Up Spirits',
						description: 'Characters can keep up the party’s morale during a forced march with cheer and song.',
						characteristics: [ Characteristic.Presence ],
						skills: 'Lead, Music, Performance'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'keep-watch',
						name: 'Keep Watch',
						description: 'Characters must be on constant guard against danger.',
						characteristics: [ Characteristic.Intuition ],
						skills: 'Alertness, Eavesdrop, Track'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'push-on',
						name: 'Push On',
						description: 'Characters must be ready to pick up the pace and push past their fatigue.',
						characteristics: [ Characteristic.Might ],
						skills: 'Endurance, Lead; Handle Animals, Drive, or Ride if the party has mounts or vehicles'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'scout-ahead',
						name: 'Scout Ahead',
						description: 'Investigating the path ahead lets the characters avoid dead-ends and arduous terrain',
						characteristics: [ Characteristic.Agility, Characteristic.Intuition ],
						skills: 'Alertness, Navigation, Sneak'
					})
				],
				twistInfo: '',
				twists: [
					FactoryLogic.createMontageChallenge({
						id: 'predatory-monster',
						name: 'Predatory Monster',
						description: 'The characters stumble into or are stalked by a monstrous predator, and must engage in a standard combat encounter to overcome the threat or drive it off. If any character has obtained a success on the Scout Ahead challenge, you can let the characters make a group test to sneak past or set an ambush for the monster.'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'unexpected-hazard',
						name: 'Unexpected Hazard',
						description: 'A natural hazard such as an avalanche, rockslide, or wildfire interrupts the journey. Each hero must make a test of your choice to avoid the hazard, losing a Recovery on a failure.'
					})
				]
			}
		],
		outcomes: {
			totalSuccess: 'The heroes reach their goal in time. Each character earns 2 Victories if the montage test was hard, or 1 Victory if it was easy or moderate, in addition to any Victories earned from combat during the montage test.',
			partialSuccess: 'To reach their goal in time, the heroes must sprint over the last leg of the journey, with each character spending 2 Recoveries to do so. (If even one character doesn’t have 2 Recoveries remaining, the characters instead earn a total failure for the montage test.) Each character earns 1 Victory if the montage test was moderate or hard, in addition to any Victories earned from combat during the montage test.',
			totalFailure: 'The heroes don’t arrive in time to avert catastrophe. Characters earn no Victories from the montage test, but might earn Victories from combat undertaken during the montage test.'
		}
	};
}
