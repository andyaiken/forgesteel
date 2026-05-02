import { ClocktowerScript } from '@/models/clocktower';
import { ClocktowerTeam } from '@/enums/clocktower-team';

export class ClocktowerData {
	static script: ClocktowerScript = {
		meta: {
			id: '_meta',
			name: 'Draw Steel on the Clocktower',
			author: 'Andy Aiken',
			almanac: 'https://forgesteel.net/#/clocktower',
			firstNight: [
				'dusk',
				'minioninfo',
				'demoninfo',
				'devil',
				'angulotl',
				'criminal',
				'conduit',
				'talent',
				'rival',
				'highelf',
				'troubadour',
				'warden',
				'dawn'
			],
			otherNight: [
				'dusk',
				'memonek',
				'censor',
				'angulotl',
				'criminal',
				'conduit',
				'tactician',
				'fury',
				'aurumvas',
				'baleeye',
				'blightphage',
				'hivequeen',
				'torlas',
				'revenant',
				'disciple',
				'agent',
				'shadow',
				'polder',
				'highelf',
				'troubadour',
				'warden',
				'dawn'
			]
		},
		characters: [
			{
				role: {
					id: 'agent',
					name: 'Agent',
					image: [
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Townsfolk,
					flavor: 'I count the missing as carefully as the present.',
					ability: 'Each day, publicly claim a new role. That night, ask the Storyteller a yes/no question; if that role is in play, the Storyteller will answer truthfully.',
					otherNightReminder: 'Ask a question.',
					reminders: [
						'True info',
						'False info'
					]
				},
				details: {
					description: 'Each time you use this ability, you must publicly claim a different role; if you claim a role you have already claimed, you gain no benefit that night. The question you ask the Storyteller can be anything with a yes/no answer, but the Storyteller’s answer is only guaranteed to be true if the claimed role is in play; otherwise, the answer may be arbitrary or misleading. If you are drunk or poisoned, the Storyteller may give false information regardless of whether the role is in play.'
				}
			},
			{
				role: {
					id: 'censor',
					name: 'Censor',
					image: [
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Townsfolk,
					flavor: 'Speak not tonight. I have judged you wanting.',
					ability: 'Each night*, choose a player; if they are evil, they cannot use their ability tonight.',
					otherNightReminder: 'Choose a player to judge.',
					reminders: [
						'Judged'
					]
				},
				details: {
					description: 'A player who is “judged” and is evil cannot use their ability that night, including passive or triggered abilities. This does not affect good players. If the chosen player becomes evil later that night, they are still prevented from acting.'
				}
			},
			{
				role: {
					id: 'conduit',
					name: 'Conduit',
					image: [
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Townsfolk,
					flavor: 'Through me, no corruption flows; faith is our armour.',
					ability: 'Each night, choose a player; until dusk, they are not drunk or poisoned, and cannot be made drunk or poisoned.',
					firstNightReminder: 'Choose a player to protect.',
					otherNightReminder: 'Choose a player to protect.',
					reminders: [
						'Blessed'
					]
				},
				details: {
					description: 'The chosen player is protected from all sources of drunkenness and poisoning until dusk, including ongoing effects. If they are already drunk or poisoned, those conditions are removed for the duration. This protection does not extend beyond dusk and does not affect other players.'
				}
			},
			{
				role: {
					id: 'elementalist',
					name: 'Elementalist',
					image: [
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Townsfolk,
					flavor: 'Strike at me, and you will find that there are delightful consequences.',
					ability: 'The first time you would be executed, your nominator dies instead.',
					reminders: [
						'Ability used'
					]
				},
				details: {
					description: 'This ability triggers automatically the first time you would be executed. The nominator dies instead of you, and the execution ends.'
				}
			},
			{
				role: {
					id: 'fury',
					name: 'Fury',
					image: [
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Townsfolk,
					flavor: 'I’m not afraid to burn with you.',
					ability: 'Once per game, at night*, choose a pair of adjacent players: if you chose the Demon, you die; otherwise, one of them dies.',
					otherNightReminder: 'Once per game, choose 2 players.',
					reminders: [
						'Ability used'
					]
				},
				details: {
					description: 'You choose two players at night; they must be sitting adjacent to each other. If either of them is the Demon, you die; otherwise, the Storyteller chooses one of the two players to die. If you are drunk or poisoned, nothing happens.'
				}
			},
			{
				role: {
					id: 'highelf',
					name: 'High Elf',
					image: [
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Townsfolk,
					flavor: 'The truth is merely a matter of careful observation.',
					ability: 'Each night, you learn two Townsfolk roles, at least one of which is in play.',
					firstNightReminder: 'Learn 2 Townsfolk roles, at least one of which is in play.',
					otherNightReminder: 'Learn 2 Townsfolk roles, at least one of which is in play.',
					reminders: [
						'Known',
						'Known',
						'Known',
						'Known',
						'Known',
						'Known',
						'Known',
						'Known',
						'Known',
						'Known'
					]
				},
				details: {
					description: 'Each night, you learn two Townsfolk roles, at least one of which is currently in play. Once all in-play Townsfolk have been shown, the Storyteller may repeat roles. If you are drunk or poisoned, this information may be incorrect or misleading.'
				}
			},
			{
				role: {
					id: 'null',
					name: 'Null',
					image: [
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Townsfolk,
					flavor: 'Within my null field, the world behaves as it should.',
					ability: 'Your neighbours cannot be made drunk or poisoned.',
					reminders: [
						'Null field',
						'Null field'
					]
				},
				details: {
					description: 'While you are sober and healthy, your living neighbours cannot be made drunk or poisoned by any means. If you become drunk or poisoned, this protection immediately stops. This does not remove existing drunkenness or poison already affecting your neighbours.'
				}
			},
			{
				role: {
					id: 'revenant',
					name: 'Revenant',
					image: [
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Townsfolk,
					flavor: 'I have died before. This is merely an inconvenience.',
					ability: 'If you die, you come back to life at night with a dead Townsfolk’s ability instead of this ability.',
					otherNightReminder: 'If dead, resurrect.'
				},
				details: {
					description: 'When you die, you lose the Revenant ability and gain the ability of a dead Townsfolk of the Storyteller’s choice before being resurrected. However, the dead Townsfolk ability you gain might be your own, in which case you can die and come back to life again.'
				}
			},
			{
				role: {
					id: 'shadow',
					name: 'Shadow',
					image: [
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Townsfolk,
					flavor: 'Evil has a certain smell, a certain feel. Some nights I sense it more than others.',
					ability: 'Each day, publicly state how many evil players you believe are alive. That night, learn how accurate you are.',
					otherNightReminder: 'Learn correct / too high / too low.',
					reminders: [
						'Correct',
						'Too low',
						'Too high'
					]
				},
				details: {
					description: 'Each day, you must publicly state how many evil players you believe are alive. That night, you learn whether your guess was correct, too low, or too high based on the current game state. If you are drunk or poisoned, this feedback may be incorrect.'
				}
			},
			{
				role: {
					id: 'tactician',
					name: 'Tactician',
					image: [
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Townsfolk,
					flavor: 'With enough focus, every death can be a message. I decide who reads that message.',
					ability: 'Each night*, choose two players: if one dies tonight, the other may visit the Storyteller tomorrow to learn the dead player’s role and alignment.',
					otherNightReminder: 'Choose 2 players to mark.',
					reminders: [
						'Marked',
						'Marked'
					]
				},
				details: {
					description: 'If one of your marked players dies that night, the surviving marked player learns the dead player’s role and alignment. If both die, no information is learned. If the surviving marked player is drunk or poisoned, they may receive incorrect information.'
				}
			},
			{
				role: {
					id: 'talent',
					name: 'Talent',
					image: [
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Townsfolk,
					flavor: 'Give me a moment, and I will be whoever we need.',
					ability: 'You learn two not-in-play roles; once per game, you may publicly claim one and immediately use its ability; you then lose the ability.',
					firstNightReminder: 'Learn 2 not-in-play roles.',
					reminders: [
						'Ability used'
					]
				},
				details: {
					description: 'You learn two roles that are not in play at the start of the game. Once per game, you may publicly claim to be one of them and immediately use its ability as if you were that role. This use is still affected by drunkenness or poisoning. After using this ability, you lose it permanently.'
				}
			},
			{
				role: {
					id: 'troubadour',
					name: 'Troubadour',
					image: [
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Townsfolk,
					flavor: 'Every villain has a name. I will sing them all.',
					ability: 'Each night, you learn two Minion roles, at least one of which is in play.',
					firstNightReminder: 'Learn 2 Minion roles, at least one of which is in play.',
					otherNightReminder: 'Learn 2 Minion roles, at least one of which is in play.',
					reminders: [
						'Known',
						'Known',
						'Known',
						'Known'
					]
				},
				details: {
					description: 'Each night, you learn two Minion roles, at least one of which is currently in play. Once all in-play Minions have been shown, the Storyteller may repeat roles. If you are drunk or poisoned, this information may be incorrect or misleading.'
				}
			},
			{
				role: {
					id: 'warden',
					name: 'Warden',
					image: [
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Townsfolk,
					flavor: 'The strange are catalogued. The dangerous, remembered.',
					ability: 'Each night, you learn two Outsider roles, at least one of which is in play. [+1 Outsider]',
					firstNightReminder: 'Learn 2 Outsider roles, at least one of which is in play.',
					otherNightReminder: 'Learn 2 Outsider roles, at least one of which is in play.',
					reminders: [
						'Known',
						'Known',
						'Known',
						'Known'
					],
					setup: true
				},
				details: {
					description: 'Each night, you learn two Outsider roles, at least one of which is currently in play. Once all in-play Outsiders have been shown, the Storyteller may repeat roles. If you are drunk or poisoned, this information may be incorrect or misleading.'
				}
			},
			{
				role: {
					id: 'antihero',
					name: 'Antihero',
					image: [
						'https://forgesteel.net/assets/clocktower-outsider.png',
						'https://forgesteel.net/assets/clocktower-minion.png'
					],
					team: ClocktowerTeam.Outsider,
					flavor: 'Push me, and I will become what you feared.',
					ability: 'Each time you are nominated, you change alignment.'
				},
				details: {
					description: 'Each time you are nominated, your alignment immediately flips. This happens before the vote resolves and can occur multiple times per game.'
				}
			},
			{
				role: {
					id: 'coward',
					name: 'Coward',
					image: [
						'https://forgesteel.net/assets/clocktower-outsider.png',
						'https://forgesteel.net/assets/clocktower-minion.png'
					],
					team: ClocktowerTeam.Outsider,
					flavor: 'Please don’t hurt me.',
					ability: 'If you are nominated, you are executed immediately.'
				},
				details: {
					description: 'If you are nominated, the nomination immediately succeeds without a vote, and you are executed and die. This happens even if the nomination would otherwise fail or be withdrawn, or you would usually be unable to die for some reason.'
				}
			},
			{
				role: {
					id: 'devil',
					name: 'Devil',
					image: [
						'https://forgesteel.net/assets/clocktower-outsider.png',
						'https://forgesteel.net/assets/clocktower-minion.png'
					],
					team: ClocktowerTeam.Outsider,
					flavor: 'They told me I was one of them. I believed them.',
					ability: 'You think you are a minion, but you are not. The demon knows who you are. [+1 Outsider, -1 Minion]',
					firstNightReminder: 'The demon learns who you are.',
					remindersGlobal: [
						'Is the Devil'
					],
					setup: true,
					special: [
						{
							type: 'selection',
							name: 'bag-disabled'
						},
						{
							type: 'reveal',
							name: 'replace-character'
						}
					]
				},
				details: {
					description: 'You are shown a Minion token at the start of the game; although you do not have this Minion’s ability, the Storyteller will act as if you do, and any information you learn may be misleading. You are shown who the Demon is alongside the real Minions, and the Demon knows that you are the Devil. Although you believe yourself to be part of the evil team, you are still good and win with the good team unless your alignment changes.'
				}
			},
			{
				role: {
					id: 'memonek',
					name: 'Memonek',
					image: [
						'https://forgesteel.net/assets/clocktower-outsider.png',
						'https://forgesteel.net/assets/clocktower-minion.png'
					],
					team: ClocktowerTeam.Outsider,
					flavor: 'Those of us from higher planes can sometimes glimpse the workings of fate.',
					ability: 'If you are executed, the Demon sees the Grimoire that night.',
					otherNightReminder: 'If executed, the Demon sees the Grimoire.',
					reminders: [
						'Sees Grimoire tonight'
					]
				},
				details: {
					description: 'If you are executed, that night (just after dusk) the Demon is shown the Grimoire.'
				}
			},
			{
				role: {
					id: 'angulotl',
					name: 'Angulotl',
					image: [
						'https://forgesteel.net/assets/clocktower-minion.png',
						'https://forgesteel.net/assets/clocktower-outsider.png'
					],
					team: ClocktowerTeam.Minion,
					flavor: 'The poison is already in you. Can you not feel it?',
					ability: 'Each night, choose a player (if 5 or more good players live, choose 2 players): they are poisoned tonight and tomorrow day. Information a drunk or poisoned player learns is incorrect.',
					firstNightReminder: 'Choose player(s) to poison.',
					otherNightReminder: 'Choose player(s) to poison.',
					reminders: [
						'Poisoned'
					]
				},
				details: {
					description: 'You choose one player each night to be poisoned; if there are at least five living good players, you can choose an extra player. The chosen player is poisoned that night and the following day. While you are alive, if any player who is drunk or poisoned (for any reason, not just due to your ability) receives information, the information they receive must be incorrect. This does not affect non-information abilities.'
				}
			},
			{
				role: {
					id: 'duskelf',
					name: 'Dusk Elf',
					image: [
						'https://forgesteel.net/assets/clocktower-minion.png',
						'https://forgesteel.net/assets/clocktower-outsider.png'
					],
					team: ClocktowerTeam.Minion,
					flavor: 'The magics of Equinox can hide almost anything.',
					ability: 'If there are six or more players alive and your Demon is executed for the first time, they survive but register as dead. [You are the only Minion]',
					reminders: [
						'Is alive'
					],
					setup: true
				},
				details: {
					description: 'If the Demon is executed while six or more players are alive (including the Demon but not including Travellers), they do not die but instead register as dead. The day ends and the game continues as if the Demon had died, but they remain alive and continue acting. This ability can only be used once.'
				}
			},
			{
				role: {
					id: 'lightbender',
					name: 'Lightbender',
					image: [
						'https://forgesteel.net/assets/clocktower-minion.png',
						'https://forgesteel.net/assets/clocktower-outsider.png'
					],
					team: ClocktowerTeam.Minion,
					flavor: 'The blade falls - just not where you aimed it.',
					ability: 'If you would be executed, one of your good neighbours is executed instead.'
				},
				details: {
					description: 'If you would be executed and you have at least one immediate neighbour who is alive and on the good team, the Storyteller chooses one of them to be executed instead of you.'
				}
			},
			{
				role: {
					id: 'rival',
					name: 'Rival',
					image: [
						'https://forgesteel.net/assets/clocktower-minion.png',
						'https://forgesteel.net/assets/clocktower-outsider.png'
					],
					team: ClocktowerTeam.Minion,
					flavor: 'I’m exactly like you… except I’m just a little better at it.',
					ability: 'You have the ability of, and register as, an in-play Townsfolk. The player with this role is drunk.',
					firstNightReminder: 'Gain an in-play Townsfolk ability.',
					reminders: [
						'Drunk'
					]
				},
				details: {
					description: 'You are woken on the first night to be told an in-play Townsfolk role. You register as that Townsfolk to all abilities that learn or depend upon roles, and you have that role’s ability. The player with this role is drunk.'
				}
			},
			{
				role: {
					id: 'aurumvas',
					name: 'Aurumvas',
					image: [
						'https://forgesteel.net/assets/clocktower-demon.png',
						'https://forgesteel.net/assets/clocktower-townsfolk.png'
					],
					team: ClocktowerTeam.Demon,
					flavor: 'More!',
					ability: 'Each night*, choose a player: they either die, or become evil (your choice). You cannot choose to change alignment on consecutive nights. [No minions]',
					otherNightReminder: 'Choose a player; they die or become evil.',
					reminders: [
						'Killed'
					],
					setup: true
				},
				details: {
					description: 'You start with no minions, but when you would kill at night, you can choose instead to recruit a player to the evil team. If you chooose to recruit, that player is immediately woken up and told that their alignment has changed (but are not told who else is on the evil team), and you cannot then choose to recruit again the next night.'
				}
			},
			{
				role: {
					id: 'blightphage',
					name: 'Blight Phage',
					image: [
						'https://forgesteel.net/assets/clocktower-demon.png',
						'https://forgesteel.net/assets/clocktower-townsfolk.png'
					],
					team: ClocktowerTeam.Demon,
					flavor: 'Death is not the end of your service. You can be repurposed.',
					ability: 'Each night*, choose a player: they die. Once per game, you may bring a dead minion back as a different minion.',
					otherNightReminder: 'Choose a player; they die. Once per game, resurrect a Minion.',
					reminders: [
						'Killed',
						'Ability used'
					]
				},
				details: {
					description: 'Once per game, you may resurrect a dead Minion as a different Minion. The new Minion gains their new ability immediately. This happens after deaths but before information is given.'
				}
			},
			{
				role: {
					id: 'hivequeen',
					name: 'Hive Queen',
					image: [
						'https://forgesteel.net/assets/clocktower-demon.png',
						'https://forgesteel.net/assets/clocktower-townsfolk.png'
					],
					team: ClocktowerTeam.Demon,
					flavor: 'There is no ‘I’. There is only the role that must be filled.',
					ability: 'Each night*, choose a player: they die. Each night*, you can choose to swap roles with a living minion.',
					otherNightReminder: 'Choose a player; they die. Choose a Minion to swap roles with.',
					reminders: [
						'Killed'
					]
				},
				details: {
					description: 'Each night, just before dawn, you may choose to swap roles with a living Minion. The Minion does not have to agree to this swap. Both players keep their alignment but exchange abilities. This can create chains of changing identities.'
				}
			},
			{
				role: {
					id: 'torlas',
					name: 'Torlas',
					image: [
						'https://forgesteel.net/assets/clocktower-demon.png',
						'https://forgesteel.net/assets/clocktower-townsfolk.png'
					],
					team: ClocktowerTeam.Demon,
					flavor: 'Strike at me if you must, but know that every action has a consequence. I merely decide who suffers it.',
					ability: 'Each night*, choose a player: they die. Townsfolk abilities that target you instead target one of your Townsfolk neighbours.',
					otherNightReminder: 'Choose a player; they die.',
					reminders: [
						'Killed'
					]
				},
				details: {
					description: 'When a Townsfolk ability targets you, it instead targets one of your living Townsfolk neighbours, chosen by the Storyteller. This does not affect non-Townsfolk abilities.'
				}
			},
			{
				role: {
					id: 'aristocrat',
					name: 'Aristocrat',
					image: [
						'https://forgesteel.net/assets/clocktower-traveller.png',
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Traveller,
					flavor: 'I ruin lives with a gesture. It is expected of me. Pass the sherry.',
					ability: 'When you nominate, the nominee is drunk until dusk.',
					reminders: [
						'Drunk'
					]
				},
				details: {
					description: 'When you nominate a player, they are drunk until dusk regardless of whether the nomination succeeds. This happens immediately.'
				}
			},
			{
				role: {
					id: 'criminal',
					name: 'Criminal',
					image: [
						'https://forgesteel.net/assets/clocktower-traveller.png',
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Traveller,
					flavor: 'You meant well. That is not what will happen.',
					ability: 'Each night, choose a player; until dusk, if they use an ability that targets another player, it targets a different player instead.',
					firstNightReminder: 'Choose a player to redirect.',
					otherNightReminder: 'Choose a player to redirect.',
					reminders: [
						'Redirected ability'
					]
				},
				details: {
					description: 'The chosen player’s targeted abilities will affect a different player instead. The Storyteller determines the new target. This does not affect abilities that do not target.'
				}
			},
			{
				role: {
					id: 'disciple',
					name: 'Disciple',
					image: [
						'https://forgesteel.net/assets/clocktower-traveller.png',
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Traveller,
					flavor: 'Rise. Your purpose is not yet fulfilled.',
					ability: 'Once per game, at night*, choose a dead player; they are resurrected, but if you are evil they become drunk.',
					otherNightReminder: 'Once per game, resurrect a player.',
					reminders: [
						'Ability used',
						'Drunk'
					]
				},
				details: {
					description: 'You may resurrect a dead player once per game. If you are evil, that player is now drunk.'
				}
			},
			{
				role: {
					id: 'disgraced',
					name: 'Disgraced',
					image: [
						'https://forgesteel.net/assets/clocktower-traveller.png',
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Traveller,
					flavor: 'I’ve made mistakes, sure, but it’s time to forgive and forget, right?',
					ability: 'If a player of your alignment is executed, you might die instead.'
				},
				details: {
					description: 'When a player of your alignment is executed, the Storyteller may choose for you to die instead. This is not guaranteed and may be used to create uncertainty.'
				}
			},
			{
				role: {
					id: 'polder',
					name: 'Polder',
					image: [
						'https://forgesteel.net/assets/clocktower-traveller.png',
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Traveller,
					flavor: 'How dare you raise your hand against one so small?!',
					ability: 'If you are nominated for execution and survive, at night one player of your alignment learns your nominator’s role. You learn who learned this.',
					otherNightReminder: 'Learn nominator’s role.',
					reminders: [
						'Nominated & survived'
					]
				},
				details: {
					description: 'If you are nominated and survive, that night one player of your alignment learns the nominator’s role. You are told who received this information. If you are drunk or poisoned, this may not function correctly.'
				}
			},
			{
				role: {
					id: 'voicelesstalker',
					name: 'Voiceless Talker',
					image: [
						'https://forgesteel.net/assets/clocktower-traveller.png',
						'https://forgesteel.net/assets/clocktower-townsfolk.png',
						'https://forgesteel.net/assets/clocktower-demon.png'
					],
					team: ClocktowerTeam.Traveller,
					flavor: 'Come and speak to me, and perhaps I will change your mind.',
					ability: 'Each night*, choose two players; their roles (not alignments) are swapped and one becomes poisoned until dusk. You cannot nominate.'
				},
				details: {
					description: 'Each night, you swap the roles (but not alignments) of two players, then choose one of them to be poisoned until dusk. You cannot nominate, but you may still vote and speak.'
				}
			}
		]
	};
};
