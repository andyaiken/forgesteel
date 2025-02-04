import { Career } from '../models/career';
import { FactoryLogic } from '../logic/factory-logic';
import { FeatureField } from '../enums/feature-field';
import { PerkList } from '../enums/perk-list';
import { SkillList } from '../enums/skill-list';

export class CareerData {
	static agent: Career = {
		id: 'career-agent',
		name: 'Agent',
		description: 'You worked as a spy for a government or organization.',
		features: [
			FactoryLogic.feature.createSkill({
				id: 'career-agent-feature-1',
				skill: 'Sneak'
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'career-agent-feature-2',
				listOptions: [ SkillList.Interpersonal ]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'career-agent-feature-3',
				listOptions: [ SkillList.Intrigue ]
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'career-agent-feature-4',
				count: 2
			}),
			FactoryLogic.feature.createPerk({
				id: 'career-agent-feature-5',
				lists: [ PerkList.Intrigue ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-agent-ii-1',
					name: 'Disavowed',
					description: 'While on a dangerous espionage assignment, things went sideways. Although you escaped with your life, the mission was a public failure thanks to bad information your agency gave you. They denied you work for them, and you went on the run. Hero work will let you survive and clear your name.'
				},
				{
					id: 'career-agent-ii-2',
					name: 'Faceless',
					description: 'Your identity was always hidden. It was your way of protecting those around you because the work you did spying on powerful entities came with dangers. Then your world came crashing down when an enemy agent unmasked you, causing you to lose everything - your privacy, livelihood, loved ones, all gone in the blink of an eye. Instead of going into hiding, you became a public hero to protect the innocent in the name of those you lost.'
				},
				{
					id: 'career-agent-ii-3',
					name: 'Free Agent',
					description: 'There was a time in your life when you used to sell information to the highest bidder. Your acts were unsanctioned by any one organization, but you were well-connected enough to trade in secrets. Politics never mattered much to you until the information you sold wound up causing a ripple effect of harm that eventually destroyed the place you once called home. You became a hero to make up for your past.'
				},
				{
					id: 'career-agent-ii-4',
					name: 'Informed',
					description: 'After years of cultivating a rich list of informants, one of those informants risked everything to expose the heinous plans of powerful individuals. You promised to protect your informant, but your agency left them hanging - literally. You cut ties with your employer and swore to always make good on your word as a hero.'
				},
				{
					id: 'career-agent-ii-5',
					name: 'Spies and Lovers',
					description: 'While embedded in an undercover assignment, you fell for someone on the other side. They discovered you were a double-agent and though you insisted your feelings were real, the deceit cut too deep for your love interest to ignore. They exposed you, spurned you, or died because of their closeness to you. You left the espionage business to become a hero with nothing to hide.'
				},
				{
					id: 'career-agent-ii-6',
					name: 'Turncoat',
					description: 'You spent your life in service of your country or an organization that upheld your values. During your undercover operations, you discovered everything you were told was a lie. Whether you confronted your superiors or were exposed, you were stripped of your service medals before you left to become a true hero.'
				}
			],
			selectedID: null
		}
	};

	static aristocrat: Career = {
		id: 'career-aristocrat',
		name: 'Aristocrat',
		description: 'Career? Who needs a career when you’re born into money! Or marry into it! Or con your way into it! Whatever the case, you didn’t need to work thanks to (someone’s) generational wealth.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'career-aristocrat-feature-1',
				listOptions: [ SkillList.Interpersonal ]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'career-aristocrat-feature-2',
				listOptions: [ SkillList.Lore ]
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'career-aristocrat-feature-3'
			}),
			FactoryLogic.feature.createBonus({
				id: 'career-aristocrat-feature-4',
				field: FeatureField.Renown,
				value: 1
			}),
			FactoryLogic.feature.createBonus({
				id: 'career-aristocrat-feature-5',
				field: FeatureField.Wealth,
				value: 1
			}),
			FactoryLogic.feature.createPerk({
				id: 'career-aristocrat-feature-6',
				lists: [ PerkList.Lore ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-aristocrat-ii-1',
					name: 'Blood Money',
					description: 'When you entered adulthood, you heard unsavory whispers about your family’s fortune before learning that their wealth came at the cost of others’ suffering. Whether you shed light on the secret or not, you left to become a hero stripped of noble title.'
				},
				{
					id: 'career-aristocrat-ii-2',
					name: 'Charmed Life',
					description: 'Through some treasure or innate ability, you were able to defraud other aristocrats. You did it for fun. When you were found out, you lost your status. Whether you served time or escaped from punishment, you decided to rehabilitate yourself and became a hero.'
				},
				{
					id: 'career-aristocrat-ii-3',
					name: 'Inheritance',
					description: 'The guardians who instilled in you the virtues of doing the right thing were murdered in a senseless petty robbery. Though their wealth was bequeathed to you, it did little to assuage the guilt you felt for being unable to stop the deadly crime. You decided to use your riches to fund your life as a hero, whether publicly or using an alter ego.'
				},
				{
					id: 'career-aristocrat-ii-4',
					name: 'Privileged Position',
					description: 'Life outside the manor never piqued your interest. You had everything you wanted. It came as a surprise when the peasants came to overthrow your family. You narrowly escaped, and for the first time witnessed the world. It caused you to become a hero for the people, fighting against inequities.'
				},
				{
					id: 'career-aristocrat-ii-5',
					name: 'Royal Pauper',
					description: 'Seeking a break from noble duties, you sought a lookalike to switch identities with. It went so well that you made a habit of switching whenever bored. Unfortunately, your counterpart became so good at imitating you that they convinced everyone you were an impostor. You lost contact with your family, but pursue a heroic path free of the pomp of your old life.'
				},
				{
					id: 'career-aristocrat-ii-6',
					name: 'Wicked Secret',
					description: 'One parent passed away when you were a baby and the other remarried years later. Then that parent died under suspicious circumstances. Their spouse ousted you, and you were banished (and possibly hunted). Rising from tragedy, you now seek to right the wrongs of the world.'
				}
			],
			selectedID: null
		}
	};

	static artisan: Career = {
		id: 'career-artisan',
		name: 'Artisan',
		description: 'You made and sold useful wares.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'career-artisan-feature-1',
				listOptions: [ SkillList.Crafting ],
				count: 2
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'career-artisan-feature-2'
			}),
			FactoryLogic.feature.createBonus({
				id: 'career-artisan-feature-3',
				field: FeatureField.ProjectPoints,
				value: 240
			}),
			FactoryLogic.feature.createPerk({
				id: 'career-artisan-feature-4',
				lists: [ PerkList.Crafting ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-artisan-ii-1',
					name: 'Continue the Work',
					description: 'A great hero was a fan of the things you created, and gave you a generous commission to create your best work for them. While working on this commission, you and the hero became close friends. The day you finished the work was the same day they disappeared. To honor their legacy, you took up the mantle of a hero with the intent of finishing your friend’s work.'
				},
				{
					id: 'career-artisan-ii-2',
					name: 'Inspired',
					description: 'As you traveled the road selling your wares, troll bandits attacked you. One of the bandits claimed an item belonging to someone precious to you - or perhaps claimed that person’s life - but the rest were driven off or slain by a group of heroes. Seeing the quick work these heroes made of the bandits inspired you to follow in their footsteps.'
				},
				{
					id: 'career-artisan-ii-3',
					name: 'Robbery',
					description: 'A criminal gang stole your goods and harmed a number of people who worked for you. You became a hero to prevent such indignities from being visited upon others, to seek revenge for the assault, or to find the thieves and get your stuff back.'
				},
				{
					id: 'career-artisan-ii-4',
					name: 'Stolen Passions',
					description: 'Your parents discouraged your artistic talents, instead trying to focus your passions on the family business. You refused to dim your spark and continued your work in secret. Enraged at discovering your disobedience, they sold your work to a traveling merchant. You left your hometown, seeking your lost art and encouraging others to live freely.'
				},
				{
					id: 'career-artisan-ii-5',
					name: 'Tarnished Honor',
					description: 'A new patron commissioned some art, but on completion, they refused to pay you and claimed the work as their own. You were accused of plagiarism and run out of town. For you, heroics are about restoring your name and honor.'
				},
				{
					id: 'career-artisan-ii-6',
					name: 'Twisted Skill',
					description: 'You had great success that caused an unscrupulous rival to curse you. For a time, everything you tried to create turned to ruin. You broke the curse through adventuring, and in doing so discovered a new joy and purpose that now defines you.'
				}
			],
			selectedID: null
		}
	};

	static beggar: Career = {
		id: 'career-beggar',
		name: 'Beggar',
		description: 'You lived by going to a tavern, crossroads, city street, or other busy area and begging passersby for money or food.',
		features: [
			FactoryLogic.feature.createSkill({
				id: 'career-beggar-feature-1',
				skill: 'Rumors'
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'career-beggar-feature-2',
				listOptions: [ SkillList.Exploration ]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'career-beggar-feature-3',
				listOptions: [ SkillList.Interpersonal ]
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'career-beggar-feature-4',
				count: 2
			}),
			FactoryLogic.feature.createPerk({
				id: 'career-beggar-feature-5',
				lists: [ PerkList.Interpersonal ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-beggar-ii-1',
					name: 'Champion',
					description: 'You were never content with your lot. Watching yet another friend fall to preventable circumstances was your last straw. You gathered up what little you had and set off to become a hero, determined to make real change for those society forgot.'
				},
				{
					id: 'career-beggar-ii-2',
					name: 'Night Terrors',
					description: 'Something killed the other beggars. It came in the night. You barely saw it, but what you did see of it wasn’t natural. You survived by hiding, or perhaps it simply passed you over for reasons unknown to you. It still haunts your nightmares, and you kill monsters so no one else has to experience such horrors.'
				},
				{
					id: 'career-beggar-ii-3',
					name: 'One Good Deed',
					description: 'You ran afoul of the local watch by being in the wrong place when they were in a bad mood. A passing hero intervened on your behalf, shaming the guards into moving on, then gave you enough gold to get you back on your feet. Their kindness kindled a spark in you. You took the gold, bought some secondhand gear, and went to pay that hero’s kindness forward.'
				},
				{
					id: 'career-beggar-ii-4',
					name: 'Precious',
					description: 'No matter how far you’d fallen, there was one belonging you would never part with, no matter how much money it would bring you. When a pickpocket stole it, you chased them until you were in a part of the city you no longer recognized. With a jolt, you realized you had no desire to return to your previous stomping grounds. You kept going, and you haven’t looked back.'
				},
				{
					id: 'career-beggar-ii-5',
					name: 'Strange Charity',
					description: 'A passerby dropped something in your cup. When you counted your day’s collections, you found a magic coin among the coppers. You knew immediately that it was special. When the other beggars - your friends, you thought - were ready to murder you for it, you killed several of them in self- defense before you fled, leaving behind the only semblance of community you had.'
				},
				{
					id: 'career-beggar-ii-6',
					name: 'Witness',
					description: 'You saw something you weren’t meant to see. Others would kill you if they knew, and they might be searching for you even now. You remain on the move, terrified of remaining in one place too long lest it all catch up to you. Perhaps if you make a big enough name for yourself, you can become untouchable and can finally speak of what you saw without fear.'
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
			FactoryLogic.feature.createSkill({
				id: 'career-criminal-feature-1',
				skill: 'Criminal Underworld'
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'career-criminal-feature-2',
				listOptions: [ SkillList.Intrigue ],
				count: 2
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'career-criminal-feature-3'
			}),
			FactoryLogic.feature.createBonus({
				id: 'career-criminal-feature-4',
				field: FeatureField.ProjectPoints,
				value: 120
			}),
			FactoryLogic.feature.createPerk({
				id: 'career-criminal-feature-5',
				lists: [ PerkList.Intrigue ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-criminal-ii-1',
					name: 'Antiquity Procurement',
					description: 'You stole, smuggled, and sold antiquities. In your haste to make a quick sale, you didn’t fully vet a client and they subsequently robbed your warehouse. When the items you had stolen were taken from you, you realized the harm you had caused. Now you adventure to find those items you lost and return them where they belong.'
				},
				{
					id: 'career-criminal-ii-2',
					name: 'Atonement',
					description: 'The last criminal job you pulled led to the death of someone or the destruction of something you love. To make up for the loss you caused, you left your criminal ways behind and became a hero.'
				},
				{
					id: 'career-criminal-ii-3',
					name: 'Friendly Priest',
					description: 'You went to prison for your crimes and eventually escaped. An elderly priest took you in and shielded you from the law, convinced that your soul wasn’t corrupt. They never judged you for your past, speaking only of the future. Eventually, the priest died, imparting final words that inspired you to become a hero.'
				},
				{
					id: 'career-criminal-ii-4',
					name: 'Shadowed Influence',
					description: 'You spent years blackmailing and manipulating nobles for influence and wealth until a scheme went wrong. You were publicly exposed, and after a narrow escape, you reevaluated your life. Under a new identity, you work as a hero and hope no one looks at your past too closely.'
				},
				{
					id: 'career-criminal-ii-5',
					name: 'Simply Survival',
					description: 'Stealing was a matter of survival for you and not what defined you - at least in your mind. But when your thieving actions lead to innocent folk being harmed, you knew you could be better. You turned your back on your old life, though your old skills come in handy.'
				},
				{
					id: 'career-criminal-ii-6',
					name: 'Stand Against Tyranny',
					description: 'When a tyrant rose to power in your homeland, they began cracking down on all criminals with deadly raids and public executions. The nature of the crime didn’t matter - pickpockets and beggars were made to kneel before the axe alongside murderers. After losing enough friends, you stood up and joined the resistance - not just against this tyrant, but against authoritarians anywhere.'
				}
			],
			selectedID: null
		}
	};

	static disciple: Career = {
		id: 'career-disciple',
		name: 'Disciple',
		description: 'You worked in a church, temple, or other religious institution as part of the clergy.',
		features: [
			FactoryLogic.feature.createSkill({
				id: 'career-disciple-feature-1',
				skill: 'Religion'
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'career-disciple-feature-2',
				listOptions: [ SkillList.Lore ],
				count: 2
			}),
			FactoryLogic.feature.createBonus({
				id: 'career-disciple-feature-3',
				field: FeatureField.ProjectPoints,
				value: 240
			}),
			FactoryLogic.feature.createPerk({
				id: 'career-disciple-feature-4',
				lists: [ PerkList.Supernatural ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-disciple-ii-1',
					name: 'Angel\'s Advocate',
					description: 'Swayed by an evil faith, your cult was about to unleash horrors upon the world when an angel (figurative or literal) intervened. They convinced you to stop your cult’s efforts. Now you follow in the footsteps of the angel who showed you the righteous path.'
				},
				{
					id: 'career-disciple-ii-2',
					name: 'Dogma',
					description: 'Although you joined the religious institution under the guidance of a kind mentor, others within the house of worship became increasingly fanatical in their convictions. Your mentor sought to be a voice of reason in the rising tide of hatred and was tried as a heretic before being executed. Leaving the institution behind, you became a hero to uphold the beliefs you hold dear.'
				},
				{
					id: 'career-disciple-ii-3',
					name: 'Freedom to Worship',
					description: 'Your temple was destroyed in a religious conflict. The institution’s leaders sought retaliation, but you saw in these actions a ceaseless cycle of destruction that would lead to more conflict. Instead, you became a hero to protect religious freedoms, so all worshipers could practice their faith without fear.'
				},
				{
					id: 'career-disciple-ii-4',
					name: 'Lost Faith',
					description: 'You devoted your life to ministering to the sick and needy and other charitable work. Time and time again, tragedy struck those you served without rhyme or reason. Your prayers went unanswered, and your efforts went thankless. Eventually, you lost your faith in a higher power, and you left your church or temple to do good outside of any religious affiliation.'
				},
				{
					id: 'career-disciple-ii-5',
					name: 'Near-Death Experience',
					description: 'While serving at a religious institution, you almost died in an accident. When you woke, you had lost all memory of ever having worked for the church or temple. Though the clergy encouraged you to stay, you left to forge a new path. Your sense of altruism - whether instilled in you by your past work or a part of who you naturally are - guides you in your life.'
				},
				{
					id: 'career-disciple-ii-6',
					name: 'Taxing Times',
					description: 'The faith-based organization you were once part of became corrupt. It used its status in the community to accumulate wealth through tithes and its leaders sought political appointments. During a season of drought, the institution stockpiled resources and refused to give aid, resulting in the deaths of many. You became a hero to fight against such corruption and to honor your dearly departed.'
				}
			],
			selectedID: null
		}
	};

	static explorer: Career = {
		id: 'career-explorer',
		name: 'Explorer',
		description: 'You ventured into uncharted areas and made your living as a cartographer, researcher, resource seeker, or treasure hunter.',
		features: [
			FactoryLogic.feature.createSkill({
				id: 'career-explorer-feature-1',
				skill: 'Navigate'
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'career-explorer-feature-2',
				listOptions: [ SkillList.Exploration ],
				count: 2
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'career-explorer-feature-3',
				count: 2
			}),
			FactoryLogic.feature.createPerk({
				id: 'career-explorer-feature-4',
				lists: [ PerkList.Exploration ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-explorer-ii-1',
					name: 'Awakening',
					description: 'In an uncharted area, you awakened some dark horror. You have turned to the life of a hero to put an end to the horror you unleashed and keep other hidden dangers at bay.'
				},
				{
					id: 'career-explorer-ii-2',
					name: 'Missing Piece',
					description: 'You made an important but dangerous discovery about a treasure or ancient ritual that could spell mass destruction. Then the unthinkable happened when an unscrupulous colleague, spy, or treasure hunter stole your research notes. You’re looking for them now, and anyone else who might use such discoveries for ill.'
				},
				{
					id: 'career-explorer-ii-3',
					name: 'Nothing Belongs in a Museum',
					description: 'Traversing seas and mountains to collect valuable artifacts for cultural institutions was once your way of life. When people died trying to reclaim one of the objects you took, you realized the truth. Your work was part of a larger problem of misappropriation and the best place for these significant objects wasn’t in a museum but with the people who created them. You set out to return what had been taken and to protect others from theft.'
				},
				{
					id: 'career-explorer-ii-4',
					name: 'Unschooled',
					description: 'You delved into dungeons and far-off places by studying them in books. You were an explorer who never felt the need to experience the dangers your peers did. However, your theory about a lost world cost you your reputation. It gave you the impetus to go on adventures and stand up for those with different ideas.'
				},
				{
					id: 'career-explorer-ii-5',
					name: 'Wanderlust',
					description: 'You saw yourself as an observer and operated within a code of conduct. You swore to never interfere with a group by exposing them to your technology, knowledge, or values. When faced with a moral conundrum, you either broke your code or stood idly by - and suffered the consequences. During this incident, you lost your observation journal but became a hero who refuses to let evil stand unchecked.'
				},
				{
					id: 'career-explorer-ii-6',
					name: 'Wind in your Sails',
					description: 'As a seafaring explorer, you lived to chart unknown courses. Though travel on the high seas was fraught with danger, the destination was always rewarding in riches, knowledge, or some other way that was meaningful to you. Your luck ran out when your ship was destroyed by pirates or other enemy forces. You’ve taken to protecting those who seek safe passage while also hoping to avenge your crew.'
				}
			],
			selectedID: null
		}
	};

	static farmer: Career = {
		id: 'career-farmer',
		name: 'Farmer',
		description: 'You grew crops or cared for livestock.',
		features: [
			FactoryLogic.feature.createSkill({
				id: 'career-farmer-feature-1',
				skill: 'Handle Animals'
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'career-farmer-feature-2',
				listOptions: [ SkillList.Exploration ],
				count: 2
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'career-farmer-feature-3'
			}),
			FactoryLogic.feature.createBonus({
				id: 'career-farmer-feature-4',
				field: FeatureField.ProjectPoints,
				value: 120
			}),
			FactoryLogic.feature.createPerk({
				id: 'career-farmer-feature-5',
				lists: [ PerkList.Exploration ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-farmer-ii-1',
					name: 'Blight',
					description: 'A horrible blight swept over your homeland, sickening the livestock and causing crops to rot. No one knows whether the blight is of natural origin or something more malevolent, but you set out in search of a way to cleanse the land of this affliction.'
				},
				{
					id: 'career-farmer-ii-2',
					name: 'Bored',
					description: 'You’ve always wanted so much more than gathering eggs and milking cows. You kept a secret journal of your dreams, filled with all the things you wanted. When your parent found the journal, they burned it and told you to keep your head out of the clouds. In response, you gathered what you could in a pack and left everything else behind, seeking a life of adventure.'
				},
				{
					id: 'career-farmer-ii-3',
					name: 'Cursed',
					description: 'While tilling your fields, you found something in the dirt. Perhaps it was a chipped and dented weapon, a piece of ancient jewelry, or something altogether unique. Excited by your find, you showed it to a loved one, but when they touched it, something happened. You now know it was a curse conveyed by the item, though you don’t know why it affected them and not you. You left your old life in search of answers.'
				},
				{
					id: 'career-farmer-ii-4',
					name: 'Hard Times',
					description: 'Your farm had always been prosperous, until the last few years. Changes in the weather caused smaller yields until you could no longer pay your tithe to the local noble. Her soldiers took what items of value they found, including a precious family heirloom. You left the struggling farm behind to find a better life.'
				},
				{
					id: 'career-farmer-ii-5',
					name: 'Razed',
					description: 'Your animals were killed, your crops and home set ablaze. The culprits might have been wandering bandits, raiders from a nearby kingdom, or hired thugs sent by a rival farm. Whoever they were, they left you with nothing. You couldn’t face the thought of starting again from scratch, so you took up a life of heroism to protect others from such villainy.'
				},
				{
					id: 'career-farmer-ii-6',
					name: 'Stolen',
					description: 'Your family bred horses - beautiful creatures that few could rival on the track and in the jousting lists. When a local noble arrived with an offer to buy your prized stallion, your father refused. The noble struck him down where he stood and stole the horse. Without that stallion, the renowned bloodline would end. You intend to get them back - and get revenge.'
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
			FactoryLogic.feature.createSkillChoice({
				id: 'gladiator-feature-1',
				listOptions: [ SkillList.Exploration ],
				count: 2
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'gladiator-feature-2'
			}),
			FactoryLogic.feature.createBonus({
				id: 'gladiator-feature-3',
				field: FeatureField.Renown,
				value: 2
			}),
			FactoryLogic.feature.createPerk({
				id: 'gladiator-feature-4',
				lists: [ PerkList.Exploration ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-gladiator-ii-1',
					name: 'Betrayed',
					description: 'A local crime lord offered you money to throw your last bout, promising that you’d live through the ordeal and get a cut of all the wagers placed on the match. You upheld your end of the deal - which made the knife in your back after the bout so surprising. You woke in a shallow grave, barely alive, and ready to mete out justice.'
				},
				{
					id: 'career-gladiator-ii-2',
					name: 'Heckler',
					description: 'As you stood victorious on the arena sands, a voice cried out among the cheering. “This violence is just for show. You should be ashamed. There are people who need you - who need your skills!” Why did that voice ring so clear? And why did it sound so familiar? You never saw the face of the person who uttered those words, but they weighed heavy on you. The next day, you fled the arena to begin a hero’s life.'
				},
				{
					id: 'career-gladiator-ii-3',
					name: 'Joined the Arena',
					description: 'As a child, you loved gladiatorial matches, captivated by the fierce displays of showmanship, never giving much thought to how the competitors ended up in the ring. Then your friend was wrongly accused of a crime and sentenced to compete. You went in their place. After viewing what life was like for those forced to fight, you survived your sentence and resolved to protect the unfairly condemned.'
				},
				{
					id: 'career-gladiator-ii-4',
					name: 'New Challenges',
					description: 'You earned every title you could. You beat every opponent willing to face you in the arena. Your final battle with your rival ended with you victorious - and still you were unsatisfied. There are other, greater foes out there - and you mean to find them.'
				},
				{
					id: 'career-gladiator-ii-5',
					name: 'Scion\'s Compassion',
					description: 'You were born a noble, but the duplicitous and power-hungry nature of your family had you seeking your own fortune in the arena. You saw that competitors brought there by circumstance and not choice suffered. You gave all you could of your family money to those less fortunate folk and then set out to make a real difference in this cruel world.'
				},
				{
					id: 'career-gladiator-ii-6',
					name: 'Warrior\'s Home',
					description: 'The orphanage you grew up in secretly supplied gladiators to the arena. Forced to fight against many childhood friends as an adult, you vowed to dismantle the arena and free other victims. You became a liberator, dedicating to ending the oppression of others until your dying breath.'
				}
			],
			selectedID: null
		}
	};

	static laborer: Career = {
		id: 'career-laborer',
		name: 'Laborer',
		description: 'You worked as a farmer, builder, clothes washer, forester, miner, or some other profession engaged in hard manual labor.',
		features: [
			FactoryLogic.feature.createSkill({
				id: 'laborer-feature-1',
				skill: 'Endurance'
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'laborer-feature-2',
				listOptions: [ SkillList.Crafting, SkillList.Exploration ],
				count: 2
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'laborer-feature-3'
			}),
			FactoryLogic.feature.createBonus({
				id: 'laborer-feature-4',
				field: FeatureField.ProjectPoints,
				value: 120
			}),
			FactoryLogic.feature.createPerk({
				id: 'laborer-feature-5',
				lists: [ PerkList.Exploration ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-laborer-ii-1',
					name: 'Deep Sentinel',
					description: 'Spending your days cleaning and maintaining the sewers doesn’t make you many friends. But you found friendship among the rats. You fought the monsters that hunted your friends, and which everyone else ignored. After making the sewers safe for the rats, you decided to take your talents to the surface and serve other humanoids who might appreciate your efforts in the same way.'
				},
				{
					id: 'career-laborer-ii-2',
					name: 'Disaster',
					description: 'A disaster, such as a cave-in, wildfire, or tidal wave, hit your crew while you were working. You saved as many as you could, but the ones you couldn’t save weigh heavily on your mind. You took up the life of a hero to save as many people as possible, vowing that what happened to you won’t happen again.'
				},
				{
					id: 'career-laborer-ii-3',
					name: 'Embarrassment',
					description: 'A noble you worked for admonished you publicly for work done poorly - and more than once. Finally, you’d had enough. You vowed to take up a new path and show this noble you’re far more than what they make you out to be.'
				},
				{
					id: 'career-laborer-ii-4',
					name: 'Live the Dream',
					description: 'You worked with a good friend, and on the job, you would always fantasize about what it would be like to hit the road as adventuring heroes … someday. You didn’t count on your friend falling ill and passing away. Now it’s time to live out that dream for both of you.'
				},
				{
					id: 'career-laborer-ii-5',
					name: 'Shining Light',
					description: 'You kept a lighthouse along the constantly stormy cliffs of your village with your mentor. On a clear and sunny day, your mentor vanished. Finding only a cryptic notebook filled with his musings on the supernatural, you left to find what really what happened. The trail has gone cold for now, and you’re helping others find their loved ones in the meantime.'
				},
				{
					id: 'career-laborer-ii-6',
					name: 'Slow and Steady',
					description: 'You labored silently as an uncaring boss drove those around you into the ground, pushing you to work harder to lessen the burden on your companions. But when the boss pushed too far and killed a friend of yours, you led an uprising against them. That was the start of your adventuring life.'
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
			FactoryLogic.feature.createSkill({
				id: 'mages-apprentice-feature-1',
				skill: 'Magic'
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'mages-apprentice-feature-2',
				listOptions: [ SkillList.Lore ],
				count: 2
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'mages-apprentice-feature-3'
			}),
			FactoryLogic.feature.createBonus({
				id: 'mages-apprentice-feature-4',
				field: FeatureField.Renown,
				value: 1
			}),
			FactoryLogic.feature.createPerk({
				id: 'mages-apprentice-feature-5',
				lists: [ PerkList.Supernatural ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-mages-apprentice-ii-1',
					name: 'Forgotten Memories',
					description: 'While practicing a spell, your inexperience caused the magic to backfire and your memories were wiped, leaving you with only fragments of who you once were. Determined to recall your past, you now dedicate yourself to helping others, hoping your actions will spark some remembrance or lead you to a way to reverse the magic.'
				},
				{
					id: 'career-mages-apprentice-ii-2',
					name: 'Magic of Friendship',
					description: 'As a sign of your status as star pupil, your mentor gifted you a familiar as a magic pet. Another jealous apprentice captured the familiar and slipped away in the night. Haunted by your pet’s absence, you adventure to find your kidnapped friend and prevent others from feeling your loss.'
				},
				{
					id: 'career-mages-apprentice-ii-3',
					name: 'Missing Mage',
					description: 'One day you woke up and the mage you worked for was just gone. They didn’t take any of their belongings and there was no sign of any foul play - just the scent of sulfur in their bedchamber. You set out on your heroic journey in the aftermath and have been looking for them ever since.'
				},
				{
					id: 'career-mages-apprentice-ii-4',
					name: 'Nightmares Made Flesh',
					description: 'Your attempts at magic have always been unpredictable. A powerful mage promised to help you gain control. During your training, a terrible nightmare caused your body to flare with magic and pull the monster of your nightmare into the waking world. The horror escaped. You left, seeking to vanquish their terrible vileness.'
				},
				{
					id: 'career-mages-apprentice-ii-5',
					name: 'Otherworldly',
					description: 'While studying magic, you accidentally sent yourself from your original world to this one. Now you’re stranded here, hoping to find ancient texts or powerful magic treasures that might transport you back home. A life of adventure it is!'
				},
				{
					id: 'career-mages-apprentice-ii-6',
					name: 'Ultimate Power',
					description: 'The mage you worked for was a kindly old soul, but the basic magic they taught you always seemed like a small part of something bigger. It wasn’t until you met an adventuring elementalist that you realized hitting the road as a hero was the only way to truly improve and hone your skills. You resigned your apprenticeship and found yourself walking the path of a hero the next day.'
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
			FactoryLogic.feature.createSkillChoice({
				id: 'performer-feature-1',
				options: [ 'Music', 'Perform' ]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'performer-feature-2',
				listOptions: [ SkillList.Interpersonal ],
				count: 2
			}),
			FactoryLogic.feature.createBonus({
				id: 'performer-feature-3',
				field: FeatureField.Renown,
				value: 2
			}),
			FactoryLogic.feature.createPerk({
				id: 'performer-feature-4',
				lists: [ PerkList.Interpersonal ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-performer-ii-1',
					name: 'Cursed Audience',
					description: 'During a performance, you watched in horror as the audience was suddenly overcome by a curse that caused them to disintegrate before your eyes. You aren’t sure what happened, but seeking an answer quickly led you to places where only heroes dare to go.'
				},
				{
					id: 'career-performer-ii-2',
					name: 'False Accolades',
					description: 'After a poor performance, you found a script to a well-written play left in your dressing room. The accompanying note asked that if you performed the play, you should give the author credit. But after a commanding performance, you claimed to be star and playwright both - and the curse hidden on those pages activated. A small portion of your skin has begun to transform into undead flesh, and the only cure is to prove you have become selfless.'
				},
				{
					id: 'career-performer-ii-3',
					name: 'Fame and Fortune',
					description: 'You thought you were famous - then that hero came to your show. Suddenly, all eyes were on the dragon-slaying brute instead of on the stage where they belonged. The audience even gave them a standing ovation when they entered the room. All you got was polite applause. Fine. If people want a hero so much, then a hero you shall be.'
				},
				{
					id: 'career-performer-ii-4',
					name: 'Songs to the Dead',
					description: 'Your performances have always been tinged with a bit of melancholy. During a particularly soulful performance, spirits disturbed the living audience and sat in their chairs. They begged you to prevent their demise, providing no other details before disappearing. You set out to see if you could help your most dedicated fans.'
				},
				{
					id: 'career-performer-ii-5',
					name: 'Speechless',
					description: 'A heckler’s mocking words left you utterly speechless during a performance, stinging your pride and stirring your arrogance. The incident strained your legendary voice, and you could only speak in soft whispers. The heckler was a fey trickster who stole your voice, promising to give it back after you accomplished real good in the world.'
				},
				{
					id: 'career-performer-ii-6',
					name: 'Tragic Lesson',
					description: 'When a producer who once shortchanged you shouted out on the street for you to stop a thief who had picked their pocket, your spite toward the producer inspired you to let the thief run right on by. But that decision led to tragedy when the thief later harmed someone you loved. From that moment on, you made it your responsibility to protect others.'
				}
			],
			selectedID: null
		}
	};

	static politician: Career = {
		id: 'career-politician',
		name: 'Politician',
		description: 'You worked as a leader within a formal, bureaucratic organization or government. You might have been appointed, born, or elected into your position, but getting people to agree and making decisions for the people you serve (or who served you) was your job.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'career-politician-feature-1',
				listOptions: [ SkillList.Interpersonal ],
				count: 2
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'career-politician-feature-2'
			}),
			FactoryLogic.feature.createBonus({
				id: 'career-politician-feature-3',
				field: FeatureField.Renown,
				value: 1
			}),
			FactoryLogic.feature.createBonus({
				id: 'career-politician-feature-4',
				field: FeatureField.Wealth,
				value: 1
			}),
			FactoryLogic.feature.createPerk({
				id: 'career-politician-feature-5',
				lists: [ PerkList.Interpersonal ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-politician-ii-1',
					name: 'Diplomatic Immunity',
					description: 'Your political power allowed you to be foolish without consequence. Through sheer carelessness or on a dare, you accidentally harmed or killed an innocent bystander. Due to your position as an official, you faced no consequences. But this event was the final straw for the person you loved or respected most, and they turned away from you. You left the world of political machinations behind to earn back their trust.'
				},
				{
					id: 'career-politician-ii-2',
					name: 'Insurrectionist',
					description: 'You secretly funded a rebel organization intent on overthrowing the corrupt establishment. Someone discovered your treason, and you were forced to leave or risk execution. You became a hero to live and fight another day on behalf of those who have no power.'
				},
				{
					id: 'career-politician-ii-3',
					name: 'Respected Consul',
					description: 'You were seneschal to a leader, able to sway their opinions, but gossip convinced the monarch you were plotting a coup, and you were ousted from court. You became a hero to continue your work making meaningful change in the world.'
				},
				{
					id: 'career-politician-ii-4',
					name: 'Right Side of History',
					description: 'You tried to work on policy change from the inside of a bureaucratic organization. There were others like you who were more vocal. You started to notice those colleagues were disappearing overnight. Not wanting to find out if you were next on the list, you left to enact change in more direct ways.'
				},
				{
					id: 'career-politician-ii-5',
					name: 'Self-Serving',
					description: 'You used your skills to collect incriminating or scandalous information about your opponents to blackmail them. A rival got one step ahead of you and stole your book of dirty secrets, but instead of using it against you, they gave you an opportunity to leave the world of politics behind. Saved from public humiliation, you now use your skills for the greater good.'
				},
				{
					id: 'career-politician-ii-6',
					name: 'Unbound',
					description: 'The red tape required to achieve anything through your political position resulted in a crisis being mishandled and countless people harmed or killed. After that unfortunate event, you resolved to be unfettered by bureaucratic interference and sought to do good through action, not paperwork.'
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
			FactoryLogic.feature.createSkillChoice({
				id: 'career-sage-feature-1',
				listOptions: [ SkillList.Lore ],
				count: 2
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'career-sage-feature-2'
			}),
			FactoryLogic.feature.createBonus({
				id: 'career-sage-feature-3',
				field: FeatureField.ProjectPoints,
				value: 240
			}),
			FactoryLogic.feature.createPerk({
				id: 'career-sage-feature-4',
				lists: [ PerkList.Lore ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-sage-ii-1',
					name: 'Bookish Ideas',
					description: 'You were always content to live a peaceful life in your library, until you found that one book - the one that told the tale of heroes who had saved the timescape. They didn’t spend their days behind a desk. They made a real difference. It was time for you to do the same.'
				},
				{
					id: 'career-sage-ii-2',
					name: 'Cure the Curse',
					description: 'You used to think knowledge could fix everything. You were wrong. When someone you loved fell under a curse, the means to cure them couldn’t be found in any of the books you owned. But that wasn’t going to stop you. The answers are out there, and you’ll find them even if you have to face down death to do so.'
				},
				{
					id: 'career-sage-ii-3',
					name: 'Lost Library',
					description: 'An evil mage took all your books for themself, cackling at your impotence as they raided your shelves. Now, you’re off to search through ancient ruins and secret libraries to rebuild your collection of rare tomes - and to find the mage who stole from you.'
				},
				{
					id: 'career-sage-ii-4',
					name: 'Paper Guilt',
					description: 'While transcribing ancient texts, you and another scribe discovered a shelf of long-forgotten books. At your suggestion, your companion started work on one and vanished along with the tome. Your guilt drove you to seek out your friend and prevent others from falling to similar dangers.'
				},
				{
					id: 'career-sage-ii-5',
					name: 'Unforeseen Futures',
					description: 'In your pursuit of ancient knowledge, you discovered a prophecy that has yet to come to pass. And that prophecy involves someone who might be … you. Since your discovery, strange dreams have plagued you, driving you to seek out your destiny.'
				},
				{
					id: 'career-sage-ii-6',
					name: 'Vanishing',
					description: 'At first you thought it was your imagination, and you brushed off the disappearance of random sentences in historical books. Then as the books changed to entirely blank pages, the disappearances became difficult to ignore, particularly those involving ancient or critical text. Driven by the desire to preserve knowledge, you have made it your purpose to restore and reverse those vanishing texts before they forever disappear.'
				}
			],
			selectedID: null
		}
	};

	static sailor: Career = {
		id: 'career-sailor',
		name: 'Sailor',
		description: 'You worked on a ship that might have been a merchant cog, a mercenary or military craft, or a pirate vessel. You might have been a deckhand, a mate, or even the captain.',
		features: [
			FactoryLogic.feature.createSkill({
				id: 'career-sailor-feature-1',
				skill: 'Swim'
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'career-sailor-feature-2',
				listOptions: [ SkillList.Exploration ],
				count: 2
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'career-sailor-feature-3',
				count: 2
			}),
			FactoryLogic.feature.createPerk({
				id: 'career-sailor-feature-4',
				lists: [ PerkList.Exploration ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-sailor-ii-1',
					name: 'Alone',
					description: 'You joined up with your best friend, sibling, or other loved one, the culmination of a lifelong dream to sail the high seas together. When they died, you lost your taste for the seafaring life. You left at the first opportunity and haven’t looked back since.'
				},
				{
					id: 'career-sailor-ii-2',
					name: 'Deserter',
					description: 'It was in the middle of a pirate raid (whether you were part of it or targeted by it) that you realized you no longer yearned for a sailor’s life. You used the chaos of the moment to slip away unnoticed. You now work as a hero in an effort to either end the piracy of others or atone for your past deeds, but you fear the day your old crew finds you and punishes you for your desertion.'
				},
				{
					id: 'career-sailor-ii-3',
					name: 'Forgotten',
					description: 'You awoke aboard your ship with no memory of who you were. Though the other sailors insisted they knew you, you didn’t know them. The next time you went ashore, you decided to stay, determined to find out who you really are.'
				},
				{
					id: 'career-sailor-ii-4',
					name: 'Jealousy',
					description: 'You had the favor of your captain, which earned you many rivals aboard your ship. One night, your fellow sailors pulled you from your bunk and threw you overboard. By some miracle, you were scooped from the waters by a passing vessel. You worked off your debt to them, then set out on a new life with less pettiness.'
				},
				{
					id: 'career-sailor-ii-5',
					name: 'Marooned',
					description: 'There was a mutiny, and you were on the losing side. You were marooned on an island and escaped when a merchant vessel was blown off course by a storm and found you. Your reputation is ruined among sailors, so you seek adventure elsewhere.'
				},
				{
					id: 'career-sailor-ii-6',
					name: 'Water Fear',
					description: 'A catastrophic storm hit while you were at sea, destroying your ship and leaving you as the only survivor. Once you recovered, you tried to sign on with another ship, but the thought of the open water turned your legs to jelly. Instead, you’ve taken on the role of a traveling hero to make ends meet.'
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
			FactoryLogic.feature.createSkillChoice({
				id: 'career-soldier-feature-1',
				listOptions: [ SkillList.Exploration ]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'career-soldier-feature-2',
				listOptions: [ SkillList.Intrigue ]
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'career-soldier-feature-3',
				count: 2
			}),
			FactoryLogic.feature.createBonus({
				id: 'career-soldier-feature-4',
				field: FeatureField.Renown,
				value: 1
			}),
			FactoryLogic.feature.createPerk({
				id: 'career-soldier-feature-5',
				lists: [ PerkList.Exploration ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-soldier-ii-1',
					name: 'Dishonorable Discharge',
					description: 'You enlisted in the military to protect others, but your commander ordered you to beat and kill civilians. When you refused, things got violent. You barely escaped the brawl that ensued, but now you vow to help people on your own terms.'
				},
				{
					id: 'career-soldier-ii-2',
					name: 'Out of Retirement',
					description: 'You had a long and storied career as a soldier before deciding to retire to a simpler life. But when you returned to your old home, you found your enemies had laid waste to it. Now the skills you earned on the battlefield are helping you as you become a different kind of warrior - one seeking to save others from the fate you suffered.'
				},
				{
					id: 'career-soldier-ii-3',
					name: 'Peace Through Healing',
					description: 'The sight of constant bloodshed took its toll on you. You seek peace through healing and dedicated yourself to ending wars before they begin, to spare those around you from the horror.'
				},
				{
					id: 'career-soldier-ii-4',
					name: 'Sole Survivor',
					description: 'You were the last surviving member of your unit after an arduous battle or monstrous assault, surviving only through luck. You turned away from the life of a soldier then, seeking to become a hero who could stand against such threats.'
				},
				{
					id: 'career-soldier-ii-5',
					name: 'Stolen Valor',
					description: 'Tired of eking out an existence on the streets, you enrolled in the military. However, you were unable to escape your lower-status background until the officer leading your unit fell in battle. In the chaos that ensued, you assumed their identity and returned home a hero. To avoid suspicion, you took on the life of an adventurer, staying always on the move.'
				},
				{
					id: 'career-soldier-ii-6',
					name: 'Vow of Sacrifice',
					description: 'You promised a fellow soldier that you’d protect his family if he ever fell in battle. When he did, you traveled to his village, but found its people slain or scattered by war. Driven by your vow, you have dedicated your life to finding any survivors and protecting others from a similar fate.'
				}
			],
			selectedID: null
		}
	};

	static warden: Career = {
		id: 'career-warden',
		name: 'Warden',
		description: 'You protected a wild region from those who sought to harm it, such as poachers and cultists bent on the destruction of the natural world. Knowing your land well, you could also serve as a guide or the leader of a rescue party for those wandering the wilds.',
		features: [
			FactoryLogic.feature.createSkill({
				id: 'career-warden-feature-1',
				skill: 'Nature'
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'career-warden-feature-2',
				listOptions: [ SkillList.Exploration ]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'career-warden-feature-3',
				listOptions: [ SkillList.Intrigue ]
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'career-warden-feature-4'
			}),
			FactoryLogic.feature.createBonus({
				id: 'career-warden-feature-5',
				field: FeatureField.ProjectPoints,
				value: 120
			}),
			FactoryLogic.feature.createPerk({
				id: 'career-warden-feature-6',
				lists: [ PerkList.Exploration ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-warden-ii-1',
					name: 'Betrayed',
					description: 'When outsiders arrived in your lands with the intent to exploit the wilds for their resources, you spoke out against them. However, several other wardens spoke in favor of these outsiders and allowed them in to despoil nature. Refusing to watch your homeland destroyed, you left. Now you help others avoid such a fate.'
				},
				{
					id: 'career-warden-ii-2',
					name: 'Corruption',
					description: 'A disease has infected the lands you protect, causing animals to become violent and twisting plants into something dark and sinister. You’ve tried everything, magical and mundane, to stop the scourge, but it continues to spread. As such, you’ve set out in search of a cure or an unblighted land to protect.'
				},
				{
					id: 'career-warden-ii-3',
					name: 'Exiled',
					description: 'You made a mistake that could not be forgiven. The other wardens of the region decided your fate, exiling you from your lands with an order never to return.'
				},
				{
					id: 'career-warden-ii-4',
					name: 'Honor the Fallen',
					description: 'A group of heroes arrived in your territory with trouble close on their heels. You fought alongside them to turn back the evil, but it was too much. The heroes fell, and your wilderness was forever altered. Though your lands are beyond saving, there are other lands you can help.'
				},
				{
					id: 'career-warden-ii-5',
					name: 'Portents',
					description: 'There were signs. You tried to ignore them, but when a great beast died at your feet, you had to recognize the truth. You were meant to leave your home territory, meant to fight a battle for the fate of all lands - and so you gave up the only life you’ve ever known.'
				},
				{
					id: 'career-warden-ii-6',
					name: 'Theft',
					description: 'You were responsible for guarding something precious, something vital to your region’s survival. But you let someone in, and they betrayed your trust by stealing the thing you were meant to guard. You left your chosen territory to atone for your mistake.'
				}
			],
			selectedID: null
		}
	};

	static watchOfficer: Career = {
		id: 'career-watch-officer',
		name: 'Watch Officer',
		description: 'You served as an officer of the law for a local government. You might have been a single person in a much larger city watch or the only constable patrolling a small village.',
		features: [
			FactoryLogic.feature.createSkill({
				id: 'career-watch-officer-feature-1',
				skill: 'Alertness'
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'career-watch-officer-feature-2',
				listOptions: [ SkillList.Intrigue ],
				count: 2
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'career-watch-officer-feature-3',
				count: 2
			}),
			FactoryLogic.feature.createPerk({
				id: 'career-watch-officer-feature-4',
				lists: [ PerkList.Exploration ]
			})
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-watch-officer-ii-1',
					name: 'Bigger Fish',
					description: 'You grew bored and disillusioned with chasing down petty thieves and imprisoning folks just trying to survive. Surely there are greater threats in the world. You will find that evil wherever it may lurk, and you’ll be the one to stop it.'
				},
				{
					id: 'career-watch-officer-ii-2',
					name: 'Corruption Within',
					description: 'You joined the force to help the helpless and bring justice to those wronged. You weren’t prepared for the rampant corruption reaching the top of your organization. You refused to cover for your fellow officers and were told in no simple terms to leave town or face the consequences. Now you travel as a hero, acting as the protector you always wanted to be.'
				},
				{
					id: 'career-watch-officer-ii-3',
					name: 'Frame Job',
					description: 'Your partner was murdered. That much is irrefutable. But you didn’t do it, despite what the evidence implies. When it became clear you’d take the fall, you fled, leaving everything behind. Not content to cower in the shadows, you decided to adventure under a new name while you work to clear your own.'
				},
				{
					id: 'career-watch-officer-ii-4',
					name: 'Missing Mentor',
					description: 'You learned everything you know about the job from someone you always looked up to in a corrupt organization. One night, they sent you a cryptic message saying they had discovered “something big,” but before you found out more, they disappeared. No longer sure who you could trust, you slipped away and sought a new life. Now you do what good you can and search to find the truth.'
				},
				{
					id: 'career-watch-officer-ii-5',
					name: 'One That Got Away',
					description: 'A particularly violent or depraved criminal began targeting you - perhaps stealing something personal or hurting someone you love - after slipping through your grasp. You left your career to pursue the criminal, but the trail has gone cold … for now. Might as well help folk in the meantime.'
				},
				{
					id: 'career-watch-officer-ii-6',
					name: 'Powerful Enemies',
					description: 'You made it your responsibility to root out and bring down the region’s foremost crime syndicate. They sent goons to burn down your home and teach you a lesson, leaving you bleeding in the street with nothing left except your life. You’ve since taken on the life of a hero to gain the power and influence you need to destroy the syndicate once and for all.'
				}
			],
			selectedID: null
		}
	};
}
