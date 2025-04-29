import { Characteristic } from '../enums/characteristic';
import { FactoryLogic } from '../logic/factory-logic';
import { Montage } from '../models/montage';

export class MontageData {
	static fightFire: Montage = {
		id: 'montage-fight-fire',
		name: 'Fight Fire',
		description: 'Fire has broken out in the town! The heroes must prevent it from spreading while saving as many townsfolk as possible. Their efforts might be more complicated if the cause of the fire—such as a marauding dragon or an invading army—is still around causing trouble.',
		scene: 'Fire blazes from several buildings, and the occupants need to be rescued. Elsewhere, some townsfolk flee while others throw water on the fire without any organization or plan. Without leadership and a way to stop the spread, the fire could easily consume everything. In a nearby stable, horses are panicking as their hay begins to smolder. Burning rubble blocks pathways everywhere.',
		sections: [
			{
				id: 'montage-fight-fire-main',
				name: '',
				description: '',
				challenges: [
					FactoryLogic.createMontageChallenge({
						id: 'bucket-chains',
						name: 'Bucket Chains',
						description: 'Organize the would-be firefighters into disciplined bucket brigades or fight the fire some other way.',
						characteristics: [ Characteristic.Presence, Characteristic.Reason ],
						skills: 'Architecture, Intimidation, Lead'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'clearing-a-firebreak',
						name: 'Clearing a Firebreak',
						description: 'Prevent the fire from spreading by clearing the ground of flammable materials, either by moving it or burning it away. A creature loses a Recovery if they get a consequence on this test.',
						characteristics: [ Characteristic.Might, Characteristic.Reason ],
						skills: 'Endurance, Lift',
						abilities: 'Abilities that deal fire damage'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'evacuating-buildings',
						name: 'Evacuating Buildings',
						description: 'Save people trapped in burning buildings. Heroes can attempt this task twice during the montage, since there are plenty of people to save. A creature that doesn’t have fire immunity loses a Recovery if they suffer a consequence on their test.',
						characteristics: [ Characteristic.Might, Characteristic.Presence ],
						skills: 'Athletics, Climb, Persuade',
						uses: 2
					}),
					FactoryLogic.createMontageChallenge({
						id: 'free-the-horses',
						name: 'Free the Horses',
						description: 'Loose the stabled horses threatened by the fire.',
						characteristics: [ Characteristic.Might, Characteristic.Presence ],
						skills: 'Lift, Handle Animals, Ride'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'find-more-firefighters',
						name: 'Find More Firefighters',
						description: 'Find groups that aren’t fighting the fire, such as fleeing civilians, and convince them to help.',
						characteristics: [ Characteristic.Presence ],
						skills: 'Intimidate, Lead, Persuade'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'move-burning-rubble',
						name: 'Move Burning Rubble',
						description: 'Move burning beams blocking doors. A creature that doesn’t have fire immunity loses a Recovery if they suffer a consequence on this test.',
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
				twistInfo: 'At the end of the first round, an emergency crops up. One or more heroes, selected by the players, must deal with the situation before the second round begins. If the heroes successfully deal with the twist, they earn a success for the montage test. Otherwise they earn a failure.',
				twists: [
					FactoryLogic.createMontageChallenge({
						id: 'building-collapse',
						name: 'Building Collapse',
						description: 'While a hero is in or near a blazing building, it begins to collapse. The hero must escape before it crumbles.',
						characteristics: [ Characteristic.Agility, Characteristic.Intuition ],
						skills: 'Climb, Jump, Gymnastics'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'cause-of-the-fire',
						name: 'Cause of the Fire',
						description: 'The entire party meets the hostile cause of the fire—the invading army, dragon, arsonist, etc. They must fight a standard or hard encounter against this threat.'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'help',
						name: 'Help!',
						description: 'Someone is about to run into a burning building to save a relative trapped under a burning beam. This twist requires two tests, each of which nets a success or a failure for the montage test. One hero can try to prevent the townsperson from entering the burning building while another rescues the relative.',
						characteristics: [ Characteristic.Might, Characteristic.Presence ],
						skills: 'Lift, Persuade'
					})
				]
			}
		],
		outcomes: {
			totalSuccess: 'The fire is extinguished. Buildings are damaged but no lives were lost. The party achieves 2 Victories if the montage test was hard, or 1 Victory if it was easy or moderate.',
			partialSuccess: 'The fire is quenched, although many buildings burned and a few lives were lost. The party achieves 1 Victory if the montage test was moderate or hard.',
			totalFailure: 'When the fire finally burns out, the town lies in ruins. Townsfolk mourn their dead or grimly prepare to find a new home. The party achieves no Victories from the montage test.'
		}
	};

	static infiltrateThePalace: Montage = {
		id: 'montage-infiltrate-the-palace',
		name: 'Infiltrate the Palace',
		description: 'Whether the heroes are trying to reach a tyrant’s throne room, pull off a daring art heist, or rescue royalty from captivity, they’re somewhere they’re not supposed to be— and they’d prefer to keep their presence secret.',
		scene: 'The target site is well-defended, with patrols that change every few hours. The few obvious entrances are locked and guarded. And once you’re inside, you don’t know your way to your goal. There are probably guard patrols inside as well. You’ll have to sneak or bluff your way past them.',
		sections: [
			{
				id: 'montage-infiltrate-the-palace-preparation',
				name: 'Preparation',
				description: 'Half the work of a successful infiltration is done before setting foot in the target building. If the heroes choose, they can make individual tests as part of the montage test before they enter the site. One round of montage tests can be made in this way. These tests don’t affect the alarm level of the site.',
				challenges: [
					FactoryLogic.createMontageChallenge({
						id: 'bribe-guards',
						name: 'Bribe Guards',
						description: 'The heroes can pay off guards to look the other way. On a success, the active hero’s Wealth is lowered by 1.',
						characteristics: [ Characteristic.Presence ],
						skills: 'Criminal Underworld, Flirt, Persuade'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'find-blueprints',
						name: 'Find Blueprints',
						description: 'Research secret entrances and little-known passageways in forgotten libraries or well-guarded town halls.',
						characteristics: [ Characteristic.Agility, Characteristic.Reason ],
						skills: 'Architecture, Sneak, History'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'identify-unguarded-entrance',
						name: 'Identify Unguarded Entrance',
						description: 'Find a forgotten back door or climbable window, or learn about one through contacts.',
						characteristics: [ Characteristic.Agility, Characteristic.Intuition ],
						skills: 'Alertness, Architecture, Criminal Underworld'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'learn-guard-schedules',
						name: 'Learn Guard Schedules',
						description: 'Keep ears and eyes open and learn when guards go off duty.',
						characteristics: [ Characteristic.Intuition, Characteristic.Reason ],
						skills: 'Alertness, Eavesdrop, Track'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'make-false-identities',
						name: 'Make False Identities',
						description: 'Prepare to walk right into the palace in plain sight.',
						characteristics: [ Characteristic.Presence, Characteristic.Reason ],
						skills: 'Disguise, Forgery, Lie'
					})
				],
				twistInfo: '',
				twists: []
			},
			{
				id: 'montage-infiltrate-the-palace-infiltration',
				name: 'Infiltration',
				description: `
When the heroes begin their infiltration, the alarm level of the site starts at 0. While infiltrating the site, whenever the heroes fail a test that is part of the montage test, the alarm level of the site increases, to a maximum of 2. When the heroes succeed at a test, the alarm level decreases, to a minimum of 0. All of the heroes’ montage tests inside the site gain a number of banes equal to the current alarm level.

The first time the heroes fail a test while the alarm level is 2, they encounter guards (enough for a hard combat encounter). The second time the heroes fail a test while the alarm level is 2, the montage test fails.`,
				challenges: [
					FactoryLogic.createMontageChallenge({
						id: 'aerial-route',
						name: 'Aerial Route',
						description: 'Take a path that leads along catwalks or high ledges. ',
						characteristics: [ Characteristic.Agility, Characteristic.Might ],
						skills: 'Climb, Gymnastics, Jump'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'avoid-traffic',
						name: 'Avoid Traffic',
						description: 'Find the dustiest, least-traveled areas and stick to them.',
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
						description: 'Cause a ruckus, then go the other way.',
						characteristics: [ Characteristic.Might, Characteristic.Presence ],
						skills: 'Alchemy, Perform, Sabotage'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'skulk-in-the-shadows',
						name: 'Skulk in the Shadows',
						description: 'Keep out of sight. Heroes can attempt this task twice during the montage.',
						characteristics: [ Characteristic.Agility ],
						skills: 'Hide, Sneak',
						uses: 2
					}),
					FactoryLogic.createMontageChallenge({
						id: 'pose-as-guards',
						name: 'Pose as Guards',
						description: 'Using castoff clothes, disguise as guards or other inhabitants. This test gets an edge if the party prepared disguises in advance or defeated guards while in the site.',
						characteristics: [ Characteristic.Intuition, Characteristic.Presence ],
						skills: 'Disguise, Lie, Search'
					})
				],
				twistInfo: 'At any time during the infiltration section of the montage challenge, between one hero’s turn and another’s, the heroes learn another group is breaking into the site at the same time, possibly after the same prize. When the heroes run into them during the infiltration, they can fight, negotiate, or let them go—in which case they may meet them again when they reach their prize.',
				twists: []
			}
		],
		outcomes: {
			totalSuccess: 'The party reaches their goal, and they secure an escape route that lets them leave safely. The party achieves 2 Victories if the montage test was hard, or 1 Victory if it was easy or moderate.',
			partialSuccess: 'The heroes reach their goal, but they’ll need to fight a standard difficulty combat encounter to escape. The party achieves 1 Victory if the montage test was moderate or hard, in addition to any Victories earned from combat.',
			totalFailure: 'The site is locked down, and their goal is out of reach. The party needs to fight a Hard combat encounter to escape. The party achieves no Victories from the montage test, although they may earn Victories from combats undertaken during the montage test.'
		}
	};

	static prepareForBattle: Montage = {
		id: 'montage-prepare-for-battle',
		name: 'Prepare for Battle',
		description: 'Whether it’s a village threatened by bandits or a great city preparing for a siege, enemies are on their way to attack the settlement. The heroes have a limited time to fortify the settlement’s defenses and bolster its troops.',
		scene: 'The walls or palisades around the settlement (if any) are in poor shape. The roads or rivers leading to the settlement may be convenient for trade, but they won’t slow down the invaders—barricades, traps, or ambushes could be set up. The settlement’s food, weapon, and ammunition supply is too low to survive a long siege. Its experienced fighters are competent but few, and its militia is poorly equipped and virtually untrained.',
		sections: [
			{
				id: 'montage-prepare-for-battle-main',
				name: '',
				description: '',
				challenges: [
					FactoryLogic.createMontageChallenge({
						id: 'evacuation',
						name: 'Evacuation',
						description: 'Heroes lead noncombatants to safety.',
						characteristics: [ Characteristic.Intuition, Characteristic.Presence ],
						skills: 'Handle Animal, Lead, Persuade'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'fortification',
						name: 'Fortification',
						description: 'Heroes help build or repair walls.',
						characteristics: [ Characteristic.Might, Characteristic.Reason ],
						skills: 'Architecture, Endurance, Lift'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'inspiration',
						name: 'Inspiration',
						description: 'Heroes improve morale with rousing speeches or performances.',
						characteristics: [ Characteristic.Intuition, Characteristic.Presence ],
						skills: 'Brag, Lead, Perform'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'propaganda',
						name: 'Propaganda',
						description: 'Heroes sow confusion or rebellion in the approaching army.',
						characteristics: [ Characteristic.Agility, Characteristic.Presence ],
						skills: 'Disguise, Forgery, Lie'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'smithing',
						name: 'Smithing',
						description: 'Heroes help craft weapons or invent entirely new ones.',
						characteristics: [ Characteristic.Might, Characteristic.Reason ],
						skills: 'Alchemy, Blacksmithing, Fletching'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'stockpiling',
						name: 'Stockpiling',
						description: 'Heroes hunt, magically summon food or water, or otherwise increase the settlement’s supplies in case of a protracted siege.',
						characteristics: [ Characteristic.Agility, Characteristic.Reason ],
						skills: 'Nature, Sneak, Track'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'training',
						name: 'Training',
						description: 'Heroes train the settlement’s defenders.',
						characteristics: [ Characteristic.Might, Characteristic.Presence ],
						skills: 'Endurance, Intimidation, Lead'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'trapmaking',
						name: 'Trapmaking',
						description: 'Heroes dig concealed pits, lay ambushes, or otherwise make it hard for the invaders to approach the settlement.',
						characteristics: [ Characteristic.Might, Characteristic.Reason ],
						skills: 'Conceal Object, Endurance, Mechanics'
					})
				],
				twistInfo: 'At the end of the first round of the montage test, fast-moving enemy troops attack before the heroes are ready. The heroes must fight off an easy combat encounter.',
				twists: []
			}
		],
		outcomes: {
			totalSuccess: 'The settlement is fully fortified, and even if the heroes don’t fight in the settlement’s defense, it survives. If the heroes wish, they can leave the settlement and fight a standard combat encounter against the invader’s leader and their lackeys. If the heroes succeed, they might kill or capture the leader. The party achieves 2 Victories if the montage test was hard, or 1 Victory if it was easy or moderate, in addition to any Victories they may earn in combat during the settlement’s defense.',
			partialSuccess: 'If the heroes hit the failure limit or time runs out, and if they’ve achieved at least two more successes than failures, they achieve a partial success. The settlement’s fortifications are improved, but the settlement will still fall unless the heroes fight in its defense. To save the settlement, the heroes must triumph in a hard combat encounter against the invader’s leader and lackeys. If the heroes lose the encounter, the settlement falls. The party achieves 1 Victory if the montage test was moderate or hard, in addition to any Victories they may earn in combat during the settlement’s defense.',
			totalFailure: 'The heroes each lose 1 recovery from their failed efforts in defense of the city. Invaders enter the settlement. If the heroes wish, they can fight two hard combat encounters against waves of invaders to allow some of the settlement’s inhabitants to retreat to safety. The party achieves no Victories from the montage test, although they may earn some Victories from combats undertaken during the settlement’s defense.'
		}
	};

	static trackTheFugitive: Montage = {
		id: 'montage-track-the-fugitive',
		name: 'Track the Fugitive',
		description: 'The heroes are on the trail of someone — an escaped criminal? A dangerous beast? A lost child? The difficulties of the chase depend on whether the quarry knows they’re being pursued, and if they want to be found.',
		scene: 'You can see the fugitive’s tracks—but could they be setting a false trail? Did anyone see them pass by, and do you have any idea where they might be headed? The goal is to do whatever you can to find and stay on the fugitive’s trail.',
		sections: [
			{
				id: 'montage-track-the-fugitive-main',
				name: '',
				description: '',
				challenges: [
					FactoryLogic.createMontageChallenge({
						id: 'ask-around',
						name: 'Ask Around',
						description: 'Gather clues from locals or bystanders, if any are present — or, if the heroes have the proper magic, from animals or the dead.',
						characteristics: [ Characteristic.Intuition, Characteristic.Presence ],
						skills: 'Interrogate, Persuade, Rumors'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'follow-the-trail',
						name: 'Follow the Trail',
						description: 'Look for tracks or other signs of the fugitive’s passage. Heroes can attempt this test twice during the montage.',
						characteristics: [ Characteristic.Intuition ],
						skills: 'Alertness, Search, Track',
						uses: 2
					}),
					FactoryLogic.createMontageChallenge({
						id: 'get-a-good-view',
						name: 'Get a Good View',
						description: 'Climb up high to get the big picture.',
						characteristics: [ Characteristic.Agility, Characteristic.Might ],
						skills: 'Climb, Gymnastics, Jump'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'predict-their-next-move',
						name: 'Predict their Next Move',
						description: 'Without needing to find their quarry’s trail, the heroes might have an idea where they’re headed. The hero gains an edge if they know the quarry well',
						characteristics: [ Characteristic.Intuition, Characteristic.Reason ],
						skills: 'Navigate, Read Person, an appropriate skill from the Lore group (such as Nature to follow an animal or Criminal Underworld to follow a criminal)'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'push-ahead',
						name: 'Push Ahead',
						description: 'While the quarry is resting, the heroes are closing in. The hero loses a recovery.',
						characteristics: [ Characteristic.Might ],
						skills: 'Endurance, Navigate, Ride, Drive'
					})
				],
				twistInfo: 'At the end of the first round of the montage test, the heroes stumble upon a trap set by the quarry, such as a pit trap full of poison spikes, or a problem they left behind, such as angry locals or a forest fire. The heroes must deal with the issue before they begin the test.',
				twists: []
			}
		],
		outcomes: {
			totalSuccess: 'The heroes catch their quarry before the fugitive reaches their destination (or before a lost or kidnapped creature comes to harm). The party achieves 2 Victories if the montage test was hard, or 1 Victory if it was easy or moderate.',
			partialSuccess: 'If the quarry was trying to evade capture, the quarry reaches their destination. They find allies and a fortified position to defend themselves, or they may have time to cause more harm. If the quarry was lost, the quarry is injured grievously when they are found. The party achieves 1 Victory if the montage test was moderate or hard.',
			totalFailure: 'The trail has gone cold. The heroes will need to wait for fresh clues to come along before they can resume the hunt. The party achieves no Victories from the montage test.'
		}
	};

	static wildernessRace: Montage = {
		id: 'montage-wilderness-race',
		name: 'Wilderness Race',
		description: 'The party needs to reach a besieged city before it falls or traverse a jungle before a curse is activated. In any case, the party needs to cross dangerous wildlands—fast.',
		scene: 'The wilds ahead hold unknown dangers. Someone will need to figure out the best route, and others can speed the journey by carrying baggage or keeping up spirits. It might be wise if someone kept an eye out for monsters and other hazards, as well.',
		sections: [
			{
				id: 'montage-wilderness-race-main',
				name: '',
				description: '',
				challenges: [
					FactoryLogic.createMontageChallenge({
						id: 'avoid-hazards',
						name: 'Avoid Hazards',
						description: 'Determine ways to overcome the area’s natural hazards, such as finding insect-repelling herbs in a swamp or making snowshoes to cross tundra.',
						characteristics: [ Characteristic.Intuition, Characteristic.Reason ],
						skills: 'Heal, Nature, an appropriate skill from the Crafting skill group (such as Alchemy to make bug repellent)'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'carry-baggage',
						name: 'Carry Baggage',
						description: 'By carrying supplies for the weaker party members, you increase the whole party’s speed.',
						characteristics: [ Characteristic.Might ],
						skills: 'Endurance, Lift'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'find-the-path',
						name: 'Find the Path',
						description: 'Keep the party from getting lost.',
						characteristics: [ Characteristic.Intuition, Characteristic.Reason ],
						skills: 'Alertness, Nature, Navigation'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'keep-up-spirits',
						name: 'Keep Up Spirits',
						description: 'Keep up morale with cheer and marching songs.',
						characteristics: [ Characteristic.Presence ],
						skills: 'Lead, Music, Performance'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'keep-watch',
						name: 'Keep Watch',
						description: 'Keep an eye out for danger.',
						characteristics: [ Characteristic.Intuition ],
						skills: 'Alertness, Eavesdrop, Track'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'push-on',
						name: 'Push On',
						description: 'Pick up the pace and push past the fatigue.',
						characteristics: [ Characteristic.Might ],
						skills: 'Endurance, Lead; Handle Animals, Drive, or Ride if the party has mounts or vehicles'
					}),
					FactoryLogic.createMontageChallenge({
						id: 'scout-ahead',
						name: 'Scout Ahead',
						description: 'Investigate the path ahead.',
						characteristics: [ Characteristic.Agility, Characteristic.Intuition ],
						skills: 'Alertness, Navigation, Sneak'
					})
				],
				twistInfo: 'At the end of the first round of the montage test, a natural hazard (such as an avalanche) interrupts the journey. Each hero must make a test of your choice to avoid the hazard, losing a Recovery on a failure.',
				twists: []
			}
		],
		outcomes: {
			totalSuccess: 'The heroes reach their goal in time. The party achieves 2 Victories if the montage test was hard, or 1 Victory if it was easy or moderate.',
			partialSuccess: 'In order to reach their goal in time, the heroes must sprint over the last leg of the journey, each hero must spend two Recoveries to do so. The party achieves 1 Victory if the montage test was moderate or hard, in addition to any Victories earned from combat.',
			totalFailure: 'The heroes don’t arrive in time to avert catastrophe. The party achieves no Victories from the montage test.'
		}
	};
}
