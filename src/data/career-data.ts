import { Career } from '../models/career';
import { FeatureField } from '../enums/feature-field';
import { FeatureLogic } from '../logic/feature-logic';
import { SkillList } from '../enums/skill-list';

export class CareerData {
	static artisan: Career = {
		id: 'career-artisan',
		name: 'Artisan',
		description: 'You started off making and selling art or useful wares.',
		features: [
			FeatureLogic.createSkillChoiceFeature({
				id: 'artisan-feature-1',
				listOptions: [ SkillList.Crafting ],
				count: 2
			}),
			FeatureLogic.createLanguageChoiceFeature({
				id: 'artisan-feature-2'
			}),
			FeatureLogic.createBonusFeature({
				id: 'artisan-feature-3',
				field: FeatureField.ProjectPoints,
				value: 100
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'artisan-ii-1',
					name: 'Continue the Work',
					description: 'A great hero was a fan of the things you created, and gave you a generous commission to create your best work for them. While working on this commission, you and the hero became close friends. The day you finished the work was the same day they disappeared. To honor their legacy, you took up the mantle of a hero with the intent of finishing your friend’s work.'
				},
				{
					id: 'artisan-ii-2',
					name: 'Inspired',
					description: 'As you traveled the road selling your wares, troll bandits attacked you. One of the bandits claimed an item belonging to someone precious to you—or perhaps claimed that person’s life—but the rest were driven off or slain by a group of heroes. Seeing the quick work these heroes made of the bandits inspired you to follow in their footsteps.'
				},
				{
					id: 'artisan-ii-3',
					name: 'Robbery',
					description: 'A criminal gang stole your goods and harmed a number of people who worked for you. You became a hero to prevent such indignities from being visited upon others, to seek revenge for the assault, or to find the thieves and get your stuff back.'
				}
			],
			selectedID: null
		}
	};

	static criminal: Career = {
		id: 'career-criminal',
		name: 'Criminal',
		description: 'You once worked as a bandit, insurgent, smuggler, outlaw, or even as an assassin.',
		features: [
			FeatureLogic.createSkillFeature({
				id: 'criminal-feature-1',
				skill: 'Criminal Underworld'
			}),
			FeatureLogic.createSkillChoiceFeature({
				id: 'criminal-feature-2',
				listOptions: [ SkillList.Intrigue ],
				count: 2
			}),
			FeatureLogic.createLanguageChoiceFeature({
				id: 'criminal-feature-3'
			}),
			FeatureLogic.createBonusFeature({
				id: 'criminal-feature-4',
				field: FeatureField.ProjectPoints,
				value: 50
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'criminal-ii-1',
					name: 'Atonement',
					description: 'The last criminal job you pulled led to the death of someone or the destruction of something you love. In order to make up for the loss you caused, you left your criminal ways behind and became a hero.'
				},
				{
					id: 'criminal-ii-2',
					name: 'Friendly Priest',
					description: 'You went to prison for your crimes and eventually escaped. An elderly priest took you in and shielded you from the law, convinced that your soul wasn’t corrupt. They never judged you for your past, speaking only of the future. Eventually, the priest died, imparting final words that inspired you to become a hero.'
				},
				{
					id: 'criminal-ii-3',
					name: 'Stand Against Tyranny',
					description: 'When a tyrant rose to power in your homeland, they began cracking down on all criminals with deadly raids and public executions. The nature of the crime didn’t matter—pickpockets and beggars were made to kneel before the axe alongside murderers. After losing enough friends, you stood up and joined the resistance—not just against this tyrant, but against authoritarians anywhere.'
				}
			],
			selectedID: null
		}
	};

	static gladiator: Career = {
		id: 'career-gladiator',
		name: 'Gladiator',
		description: 'In the past, you entertained the masses with flashy displays of violence in the arena.',
		features: [
			FeatureLogic.createSkillChoiceFeature({
				id: 'gladiator-feature-1',
				listOptions: [ SkillList.Exploration ],
				count: 2
			}),
			FeatureLogic.createLanguageChoiceFeature({
				id: 'gladiator-feature-2'
			}),
			FeatureLogic.createBonusFeature({
				id: 'gladiator-feature-3',
				field: FeatureField.Renown,
				value: 2
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'gladiator-ii-1',
					name: 'Betrayed',
					description: 'A local crime lord offered you money to throw your last bout, promising that you’d live through the ordeal and get a cut of all the wagers placed on the match. You held up your end of the deal—which made the knife in your back after the loss so surprising. You woke in a shallow grave, barely alive, and ready to mete out justice.'
				},
				{
					id: 'gladiator-ii-2',
					name: 'Heckler',
					description: 'As you stood victorious on the arena sands, a voice cried out among the cheering. “This violence is just for show. You should be ashamed. There are people who need you—who need your skills!” Why did that voice ring so clear? And why did it sound so familiar? You never saw the face of the person who uttered the words, but they weighed heavy on you. The next day, you fled the arena to begin a hero’s life.'
				},
				{
					id: 'gladiator-ii-3',
					name: 'New Challenges',
					description: 'You earned every title you could. You beat every opponent willing to face you in the arena. Your final battle with your rival ended with you victorious—and yet you were unsatisfied. There are other, greater foes out there, and you mean to find them.'
				}
			],
			selectedID: null
		}
	};

	static laborer: Career = {
		id: 'career-laborer',
		name: 'Laborer',
		description: 'You worked as a farmer, a builder, a lumberjack, a miner, or some other profession engaged in hard manual labor.',
		features: [
			FeatureLogic.createSkillFeature({
				id: 'laborer-feature-1',
				skill: 'Endurance'
			}),
			FeatureLogic.createSkillChoiceFeature({
				id: 'laborer-feature-2',
				options: [ 'Blacksmithing' ],
				listOptions: [ SkillList.Exploration ],
				count: 2
			}),
			FeatureLogic.createLanguageChoiceFeature({
				id: 'laborer-feature-3'
			}),
			FeatureLogic.createBonusFeature({
				id: 'laborer-feature-4',
				field: FeatureField.ProjectPoints,
				value: 50
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'laborer-ii-1',
					name: 'Disaster',
					description: 'A disaster, such as a cave-in, wildfire, or tidal wave, hit your crew while you were working. You saved as many folks as you could, but the ones you couldn’t save weigh heavily on your mind. You took up the life of a hero to save as many people as possible, vowing that what happened to you won’t happen again.'
				},
				{
					id: 'laborer-ii-2',
					name: 'Embarrassment',
					description: 'A noble you worked for admonished you publicly for work done poorly—more than once. Finally, you had enough. You vowed to take up a new path and show this noble that you are far more than what they make you out to be.'
				},
				{
					id: 'laborer-ii-3',
					name: 'Live the Dream',
					description: 'You worked with a good friend, and on the job you’d always fantasize about what it’d be like to hit the road as adventuring heroes—someday. You didn’t count on your friend falling ill and passing away. Now it’s time to live out that dream for both of you.'
				}
			],
			selectedID: null
		}
	};

	static magesApprentice: Career = {
		id: 'career-mages-apprentice',
		name: 'Mage’s Apprentice',
		description: 'For long years, you studied magic under the mentorship of a more experienced mage.',
		features: [
			FeatureLogic.createSkillFeature({
				id: 'mages-apprentice-feature-1',
				skill: 'Magic'
			}),
			FeatureLogic.createSkillChoiceFeature({
				id: 'mages-apprentice-feature-2',
				listOptions: [ SkillList.Lore ],
				count: 2
			}),
			FeatureLogic.createLanguageChoiceFeature({
				id: 'mages-apprentice-feature-3'
			}),
			FeatureLogic.createBonusFeature({
				id: 'mages-apprentice-feature-4',
				field: FeatureField.Renown,
				value: 1
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'mages-apprentice-ii-1',
					name: 'Oops',
					description: 'While studying magic, you accidentally sent yourself from your original world to this one. Now you’re stranded here, hoping to get back home by finding ancient texts or powerful magical treasures that might transport you there. A life of adventure it is!'
				},
				{
					id: 'mages-apprentice-ii-2',
					name: 'Ultimate Power',
					description: 'The mage you worked for was a kindly old soul, but the basic magic they taught you always seemed like a small part of something bigger. It wasn’t until you met an adventuring elementalist that you realized hitting the road as a hero was the only way to truly improve and hone your skills. You resigned your apprenticeship and found yourself walking the path of a hero the next day.'
				},
				{
					id: 'mages-apprentice-ii-3',
					name: 'Missing Mage',
					description: 'One day you woke up and the mage you worked for was just gone. They didn’t take any of their belongings, and there was no sign of any foul play—just the scent of sulfur in their bedchamber. You set out on your heroic journey in the aftermath, and have been looking for them ever since.'
				}
			],
			selectedID: null
		}
	};

	static performer: Career = {
		id: 'career-performer',
		name: 'Performer',
		description: 'You can sing, act, or dance well enough that people actually pay to see you do it. Imagine that!',
		features: [
			FeatureLogic.createSkillChoiceFeature({
				id: 'performer-feature-1',
				options: [ 'Music', 'Performance' ]
			}),
			FeatureLogic.createSkillChoiceFeature({
				id: 'performer-feature-2',
				listOptions: [ SkillList.Interpersonal ],
				count: 2
			}),
			FeatureLogic.createBonusFeature({
				id: 'performer-feature-3',
				field: FeatureField.Renown,
				value: 2
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'performer-ii-1',
					name: 'Cursed Audience',
					description: 'During a performance, you watched in horror as the audience was suddenly overcome by a curse that caused them to disintegrate before your eyes. You’re not sure what happened, but seeking that answer quickly led you to places where only heroes dare to go.'
				},
				{
					id: 'performer-ii-2',
					name: 'Fame and Fortune',
					description: 'You thought you were famous—then that hero came to your show. Suddenly, all eyes were on the dragon-slaying brute instead of the stage where they belonged. The audience even gave them a standing ovation when they entered the room. All you got was polite applause. Fine. If people want a hero, then a hero you shall be.'
				},
				{
					id: 'performer-ii-3',
					name: 'Tragic Lesson',
					description: 'When a producer who once shortchanged you shouted out on the street for you to stop a thief who had picked their pocket, your spite toward the producer inspired you to let the thief run right on by. But that decision led to tragedy when the thief later harmed someone you loved. From that moment on, you decided to make it your responsibility to protect others.'
				}
			],
			selectedID: null
		}
	};

	static sage: Career = {
		id: 'career-sage',
		name: 'Sage',
		description: 'From an early age, you dedicated yourself to learning, whether you shared the knowledge of the world with others or sought out secret lore only for yourself.',
		features: [
			FeatureLogic.createSkillChoiceFeature({
				id: 'sage-feature-1',
				listOptions: [ SkillList.Lore ],
				count: 2
			}),
			FeatureLogic.createLanguageChoiceFeature({
				id: 'sage-feature-2'
			}),
			FeatureLogic.createBonusFeature({
				id: 'sage-feature-3',
				field: FeatureField.ProjectPoints,
				value: 100
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'sage-ii-1',
					name: 'Bookish Ideas',
					description: 'You were always content to live a peaceful life in your library, until you found that one book—the one that told the tale of heroes who had saved the timescape. They didn’t spend their days behind a desk. They made a real difference. It was time for you to do the same.'
				},
				{
					id: 'sage-ii-2',
					name: 'Cure the Curse',
					description: 'You used to think knowledge could fix everything. You were wrong. When someone you loved fell under a curse, the means to cure them couldn’t be found in any of the books you owned. But that wasn’t going to stop you. The answers are out there, and you’ll find them even if you need to face down death to do so.'
				},
				{
					id: 'sage-ii-3',
					name: 'Lost Library',
					description: 'An evil mage took all your books for themself, cackling at your impotence as they raided your shelves. Now you’re off to search through ancient ruins and secret libraries to rebuild your collection of rare tomes—and to find the mage who stole from you.'
				}
			],
			selectedID: null
		}
	};

	static soldier: Career = {
		id: 'career-soldier',
		name: 'Soldier',
		description: 'In your formative years, you fought tirelessly in skirmishes and campaigns against enemy forces.',
		features: [
			FeatureLogic.createSkillChoiceFeature({
				id: 'soldier-feature-1',
				listOptions: [ SkillList.Exploration ]
			}),
			FeatureLogic.createSkillChoiceFeature({
				id: 'soldier-feature-2',
				listOptions: [ SkillList.Intrigue ]
			}),
			FeatureLogic.createLanguageChoiceFeature({
				id: 'soldier-feature-3'
			}),
			FeatureLogic.createBonusFeature({
				id: 'soldier-feature-4',
				field: FeatureField.Renown,
				value: 1
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'soldier-ii-1',
					name: 'Dishonorable Discharge',
					description: 'You enlisted in the military to protect others, but your commander ordered you to beat and kill civilians. When you refused, things got violent. You barely escaped the brawl that ensued, but now you vow to help people on your own terms.'
				},
				{
					id: 'soldier-ii-2',
					name: 'Out of Retirement',
					description: 'You had a long and storied career as a soldier before deciding to retire to a simpler life. But when you returned to your old home, you found that your enemies had laid waste to it. Now the skills you earned on the battlefield are helping you as you become a different kind of warrior, seeking to save others from the fate you suffered.'
				},
				{
					id: 'soldier-ii-3',
					name: 'Sole Survivor',
					description: 'You were the last surviving member of your unit after an arduous battle or monstrous assault, surviving only because of your luck. You turned away from the life of a soldier then, seeking to become a hero who could stand against such threats.'
				}
			],
			selectedID: null
		}
	};
}
