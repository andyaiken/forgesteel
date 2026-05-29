import { ClocktowerCharacter, ClocktowerScript } from '@/models/clocktower';
import { ClocktowerScriptType } from '@/enums/clocktower-script-type';
import { ClocktowerTeam } from '@/enums/clocktower-team';

// #region Townsfolk

const agent: ClocktowerCharacter = {
	role: {
		id: 'agent',
		name: 'Agent',
		image: [
			'https://forgesteel.net/assets/clocktower/agent/good.png',
			'https://forgesteel.net/assets/clocktower/agent/evil.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'If you pretend to be enough people, eventually someone will tell the truth.',
		ability: 'Each day, publicly claim a new role (not Agent). That night, ask the Storyteller a yes/no question; if that role is in play, they will answer truthfully.',
		otherNightReminder: 'Ask a question.',
		reminders: [
			'True info',
			'False info'
		]
	},
	details: {
		description: 'Each time you use this ability, you must publicly claim a different role; if you claim a role you have already claimed, you gain no benefit that night. The question you ask the Storyteller can be anything with a yes/no answer, but the Storyteller’s answer is only guaranteed to be true if the claimed role is in play; otherwise, the answer may be arbitrary or misleading. If you are drunk or poisoned, the Storyteller may give false information regardless of whether the role is in play.'
	}
};

const beastheart: ClocktowerCharacter = {
	role: {
		id: 'beastheart',
		name: 'Beastheart',
		image: [
			'https://forgesteel.net/assets/clocktower/beastheart/good.png',
			'https://forgesteel.net/assets/clocktower/beastheart/evil.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'I know your kind by scent alone. Even death does not wash it away.',
		ability: 'Each night*, choose a dead player: learn one character they were during the game.',
		otherNightReminder: 'Choose a dead player to learn their role.'
	},
	details: {
		description: 'Each night after the first, you can select a dead player and learn their role. If their role changed over the course of the game, you learn one role they played.'
	}
};

const censor: ClocktowerCharacter = {
	role: {
		id: 'censor',
		name: 'Censor',
		image: [
			'https://forgesteel.net/assets/clocktower/censor/good.png',
			'https://forgesteel.net/assets/clocktower/censor/evil.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'Speak not tonight. No spells. No whispers. No excuses.',
		ability: 'Each night*, choose a player; if they are not on your team, they are drunk until you choose again.',
		otherNightReminder: 'Choose a player to judge.',
		reminders: [
			'Judged'
		]
	},
	details: {
		description: 'A player who is “judged” and is on the other team becomes drunk until you choose to judge a different player.'
	}
};

const conduit: ClocktowerCharacter = {
	role: {
		id: 'conduit',
		name: 'Conduit',
		image: [
			'https://forgesteel.net/assets/clocktower/conduit/good.png',
			'https://forgesteel.net/assets/clocktower/conduit/evil.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'Faith is my armour, and corruption breaks upon me like waves on stone.',
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
};

const director: ClocktowerCharacter = {
	role: {
		id: 'director',
		name: 'Director',
		image: [
			'https://forgesteel.net/assets/clocktower/director/good.png',
			'https://forgesteel.net/assets/clocktower/director/evil.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'You can trust me. I’m on your side.',
		ability: 'The first time you nominate, if your nominee is a Townsfolk, all players immediately learn your role.'
	},
	details: {
		description: 'You can prove your identity; the first time you nominate, you can prove that you are the Director, which is enormously powerful.'
	}
};

const elementalist: ClocktowerCharacter = {
	role: {
		id: 'elementalist',
		name: 'Elementalist',
		image: [
			'https://forgesteel.net/assets/clocktower/elementalist/good.png',
			'https://forgesteel.net/assets/clocktower/elementalist/evil.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'Strike at me, and you will find that the consequences are delightful.',
		ability: 'The first time you would be executed, your nominator dies instead.',
		reminders: [
			'Ability used'
		]
	},
	details: {
		description: 'This ability triggers automatically the first time you would be executed. The nominator dies instead of you, and the execution ends.'
	}
};

const fury: ClocktowerCharacter = {
	role: {
		id: 'fury',
		name: 'Fury',
		image: [
			'https://forgesteel.net/assets/clocktower/fury/good.png',
			'https://forgesteel.net/assets/clocktower/fury/evil.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'I’m not afraid to burn with you.',
		ability: 'Once per game, choose a pair of adjacent players: if either is the Demon, you die; otherwise, one of them dies.',
		reminders: [
			'Ability used'
		]
	},
	details: {
		description: 'You choose two players; they must be sitting adjacent to each other. If either of them is the Demon, you immediately die; otherwise, the Storyteller chooses one of the two players to immediately die. If you are drunk or poisoned, nothing happens.'
	}
};

const nll: ClocktowerCharacter = {
	role: {
		id: 'null',
		name: 'Null',
		image: [
			'https://forgesteel.net/assets/clocktower/null/good.png',
			'https://forgesteel.net/assets/clocktower/null/evil.png'
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
};

const revenant: ClocktowerCharacter = {
	role: {
		id: 'revenant',
		name: 'Revenant',
		image: [
			'https://forgesteel.net/assets/clocktower/revenant/good.png',
			'https://forgesteel.net/assets/clocktower/revenant/evil.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'Bury me if it comforts you; death and I have an arrangement.',
		ability: 'If you die, you come back to life at night as a dead Townsfolk.',
		otherNightReminder: 'If dead, resurrect.',
		remindersGlobal: [
			'Is the Revenant'
		],
		special: [
			{
				type: 'reveal',
				name: 'replace-character'
			}
		]

	},
	details: {
		description: 'When you die, you become a dead Townsfolk of the Storyteller’s choice before being resurrected. However, if there are no other dead Townsfolk, then the dead Townsfolk you become might be the Revenant, in which case you can die and come back to life again.'
	}
};

const shadow: ClocktowerCharacter = {
	role: {
		id: 'shadow',
		name: 'Shadow',
		image: [
			'https://forgesteel.net/assets/clocktower/shadow/good.png',
			'https://forgesteel.net/assets/clocktower/shadow/evil.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'Evil has a certain smell, a certain feel. Some nights I sense it more than others.',
		ability: 'Each night*, learn how many players changed character, and how many changed alignment, tonight.',
		otherNightReminder: 'Learn how many players changed character / alignment.'
	},
	details: {
		description: 'Each night, you learn how many players have a different character token now than they started the night with (a player whose role has been changed multiple times only counts once), and how many have a different alignment than they started the night with.'
	}
};

const tactician: ClocktowerCharacter = {
	role: {
		id: 'tactician',
		name: 'Tactician',
		image: [
			'https://forgesteel.net/assets/clocktower/tactician/good.png',
			'https://forgesteel.net/assets/clocktower/tactician/evil.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'Every corpse is trying to tell us something.',
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
};

const talent: ClocktowerCharacter = {
	role: {
		id: 'talent',
		name: 'Talent',
		image: [
			'https://forgesteel.net/assets/clocktower/talent/good.png',
			'https://forgesteel.net/assets/clocktower/talent/evil.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'Give me but a moment, and I will become whoever we need.',
		ability: 'You learn two roles; once per game, when you publicly claim to be one of them, you become that role.',
		firstNightReminder: 'Learn 2 roles.',
		remindersGlobal: [
			'Is the Talent'
		],
		special: [
			{
				type: 'reveal',
				name: 'replace-character'
			}
		]
	},
	details: {
		description: 'You learn two roles at the start of the game; these roles may be of any type, and may be in play or not. Once per game, you may publicly claim to be one of them and immediately become that role (your alignment does not change).'
	}
};

const troubadour: ClocktowerCharacter = {
	role: {
		id: 'troubadour',
		name: 'Troubadour',
		image: [
			'https://forgesteel.net/assets/clocktower/troubadour/good.png',
			'https://forgesteel.net/assets/clocktower/troubadour/evil.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'Every hero worries they’ll be forgotten, but each one has a name, and I will sing them all.',
		ability: 'Each night, you learn two roles, at least one of which is in play.',
		firstNightReminder: 'Learn 2 roles, at least one of which is in play.',
		otherNightReminder: 'Learn 2 roles, at least one of which is in play.'
	},
	details: {
		description: 'Each night, you learn two roles, at least one of which is currently in play. If you are drunk or poisoned, this information may be incorrect or misleading.'
	}
};

// #endregion

// #region Outsiders

const antihero: ClocktowerCharacter = {
	role: {
		id: 'antihero',
		name: 'Antihero',
		image: [
			'https://forgesteel.net/assets/clocktower/antihero/good.png',
			'https://forgesteel.net/assets/clocktower/antihero/evil.png'
		],
		team: ClocktowerTeam.Outsider,
		flavor: 'Don’t make me choose a side. If you push me, I will become what you feared.',
		ability: 'Each time you are nominated, you change alignment.'
	},
	details: {
		description: 'Each time you are nominated, your alignment immediately flips. This happens before the vote resolves and can occur multiple times per game.'
	}
};

const coward: ClocktowerCharacter = {
	role: {
		id: 'coward',
		name: 'Coward',
		image: [
			'https://forgesteel.net/assets/clocktower/coward/good.png',
			'https://forgesteel.net/assets/clocktower/coward/evil.png'
		],
		team: ClocktowerTeam.Outsider,
		flavor: 'Please don’t hurt me.',
		ability: 'If you are nominated, you are executed immediately.'
	},
	details: {
		description: 'If you are nominated, the nomination immediately succeeds without a vote, and you are executed and die. This happens even if the nomination would otherwise fail or be withdrawn, or you would usually be unable to die for some reason.'
	}
};

const devil: ClocktowerCharacter = {
	role: {
		id: 'devil',
		name: 'Devil',
		image: [
			'https://forgesteel.net/assets/clocktower/devil/good.png',
			'https://forgesteel.net/assets/clocktower/devil/evil.png'
		],
		team: ClocktowerTeam.Outsider,
		flavor: 'They handed me a mask and called it destiny. They told me I was one of them. I believed them.',
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
};

const memonek: ClocktowerCharacter = {
	role: {
		id: 'memonek',
		name: 'Memonek',
		image: [
			'https://forgesteel.net/assets/clocktower/memonek/good.png',
			'https://forgesteel.net/assets/clocktower/memonek/evil.png'
		],
		team: ClocktowerTeam.Outsider,
		flavor: 'Those of us from higher planes can sometimes glimpse the workings of fate.',
		ability: 'If you are executed, the Demon sees the Grimoire that night.',
		otherNightReminder: 'If you were executed, the Demon sees the Grimoire.',
		reminders: [
			'Sees Grimoire tonight'
		]
	},
	details: {
		description: 'If you are executed, that night (just after dusk) the Demon is shown the Grimoire.'
	}
};

// #endregion

// #region Minions

const angulotl: ClocktowerCharacter = {
	role: {
		id: 'angulotl',
		name: 'Angulotl',
		image: [
			'https://forgesteel.net/assets/clocktower/angulotl/evil.png',
			'https://forgesteel.net/assets/clocktower/angulotl/good.png'
		],
		team: ClocktowerTeam.Minion,
		flavor: 'Ghrul-tha brakka-thul rrukkul vaa ghol-uGlurrak kroth ghol vaa-thul rrakka va ulmokh Glurrak thaa!',
		ability: 'Each night*, choose a player: they are poisoned tonight and tomorrow day. Before the Demon acts, they learn which players are currently poisoned.',
		otherNightReminder: 'Choose a player; they are poisoned.',
		reminders: [
			'Poisoned'
		]
	},
	details: {
		description: 'Each night, you can make a player poisoned until dusk the next day. Before the Demon kills, they are told which players are currently poisoned; they can use this information when they choose their target.'
	}
};

const duskElf: ClocktowerCharacter = {
	role: {
		id: 'duskelf',
		name: 'Dusk Elf',
		image: [
			'https://forgesteel.net/assets/clocktower/duskelf/evil.png',
			'https://forgesteel.net/assets/clocktower/duskelf/good.png'
		],
		team: ClocktowerTeam.Minion,
		flavor: 'The magics of Equinox can hide almost anything; twilight is generous with second chances.',
		ability: 'If there are six or more players alive and your Demon is executed for the first time, they survive but register as dead. [You are the only Minion]',
		reminders: [
			'Is alive'
		],
		setup: true
	},
	details: {
		description: 'If the Demon is executed while six or more players are alive (including the Demon but not including Travellers), they do not die but instead register as dead. The day ends and the game continues as if the Demon had died, but they remain alive; they can still nominate, vote, and act in the night. This ability can only be used once.'
	}
};

const lightbender: ClocktowerCharacter = {
	role: {
		id: 'lightbender',
		name: 'Lightbender',
		image: [
			'https://forgesteel.net/assets/clocktower/lightbender/evil.png',
			'https://forgesteel.net/assets/clocktower/lightbender/good.png'
		],
		team: ClocktowerTeam.Minion,
		flavor: 'Your blade will fall - just not where you aimed it.',
		ability: 'If you would be executed, one of your good neighbours is executed instead.'
	},
	details: {
		description: 'If you would be executed and you have at least one immediate neighbour who is alive and on the good team, the Storyteller chooses one of them to be executed instead of you.'
	}
};

const rival: ClocktowerCharacter = {
	role: {
		id: 'rival',
		name: 'Rival',
		image: [
			'https://forgesteel.net/assets/clocktower/rival/evil.png',
			'https://forgesteel.net/assets/clocktower/rival/good.png'
		],
		team: ClocktowerTeam.Minion,
		flavor: 'I’m exactly like you… except better.',
		ability: 'You have the ability of an in-play Townsfolk. The player with this role is poisoned.',
		firstNightReminder: 'Gain an in-play Townsfolk ability.',
		reminders: [
			'Poisoned'
		]
	},
	details: {
		description: 'You are woken on the first night to be told an in-play Townsfolk role. You have that role’s ability. The player with this role is poisoned.'
	}
};

// #endregion

// #region Demons

const aurumvas: ClocktowerCharacter = {
	role: {
		id: 'aurumvas',
		name: 'Aurumvas',
		image: [
			'https://forgesteel.net/assets/clocktower/aurumvas/evil.png',
			'https://forgesteel.net/assets/clocktower/aurumvas/good.png'
		],
		team: ClocktowerTeam.Demon,
		flavor: 'More!',
		ability: 'Each night, choose a player: they die or become evil (your choice). You cannot choose to kill on night 1, or to recruit on consecutive nights. [No minions]',
		firstNightReminder: 'Choose a player; they become evil.',
		otherNightReminder: 'Choose a player; they die or become evil.',
		reminders: [
			'Killed'
		],
		setup: true
	},
	details: {
		description: 'You start with no minions, but when you would kill at night, you can choose instead to recruit a player to the evil team. If you choose to recruit, that player is immediately woken up and told that their alignment has changed (but are not told who else is on the evil team). You cannot kill on night 1, and when you choose to recruit you cannot then choose to recruit again the next night.'
	}
};

const blightPhage: ClocktowerCharacter = {
	role: {
		id: 'blightphage',
		name: 'Blight Phage',
		image: [
			'https://forgesteel.net/assets/clocktower/blightphage/evil.png',
			'https://forgesteel.net/assets/clocktower/blightphage/good.png'
		],
		team: ClocktowerTeam.Demon,
		flavor: 'Death is not the end of your service. You can be repurposed.',
		ability: 'Each night*, choose a player: they die. Once per game, you may bring a dead minion back as a minion of your choice.',
		otherNightReminder: 'Choose a player; they die. Once per game, resurrect a Minion.',
		reminders: [
			'Killed',
			'Ability used'
		]
	},
	details: {
		description: 'Once per game, you may resurrect a dead Minion as any Minion of your choice. The new Minion gains their new ability immediately. This happens after deaths but before information is given.'
	}
};

const hiveQueen: ClocktowerCharacter = {
	role: {
		id: 'hivequeen',
		name: 'Hive Queen',
		image: [
			'https://forgesteel.net/assets/clocktower/hivequeen/evil.png',
			'https://forgesteel.net/assets/clocktower/hivequeen/good.png'
		],
		team: ClocktowerTeam.Demon,
		flavor: 'There is no ‘I’. There is only the role that must be filled.',
		ability: 'Each night*, choose a player: they die. You can then choose to swap roles with an evil player.',
		otherNightReminder: 'Choose a player; they die. Optionally, choose an evil player to swap roles with.',
		reminders: [
			'Killed'
		]
	},
	details: {
		description: 'Each night, just before dawn, you may choose to swap roles with another player of your choice on the evil team. The other player does not have to agree to this swap. Both players keep their alignment and any reminder tokens but exchange roles (and therefore abilities). This can create chains of changing identities.'
	}
};

const torlas: ClocktowerCharacter = {
	role: {
		id: 'torlas',
		name: 'Torlas',
		image: [
			'https://forgesteel.net/assets/clocktower/torlas/evil.png',
			'https://forgesteel.net/assets/clocktower/torlas/good.png'
		],
		team: ClocktowerTeam.Demon,
		flavor: 'Strike at me if you must, but know that every arrow can always find a softer target.',
		ability: 'Each night*, choose a player: they die. When a Townsfolk ability targets only you, it instead targets your closest living Townsfolk neighbour [+1 Outsider]',
		otherNightReminder: 'Choose a player; they die.',
		reminders: [
			'Killed'
		],
		setup: true
	},
	details: {
		description: 'When a Townsfolk ability targets you and only you, it instead targets your closest living Townsfolk neighbour (if there is a tie, the target is chosen by the Storyteller). This does not affect non-Townsfolk abilities or abilities that target more than one player.'
	}
};

// #endregion

// #region Travellers

const aristocrat: ClocktowerCharacter = {
	role: {
		id: 'aristocrat',
		name: 'Aristocrat',
		image: [
			'https://forgesteel.net/assets/clocktower/aristocrat/traveller.png',
			'https://forgesteel.net/assets/clocktower/aristocrat/good.png',
			'https://forgesteel.net/assets/clocktower/aristocrat/evil.png'
		],
		team: ClocktowerTeam.Traveller,
		flavor: 'I ruin lives with a gesture. It is expected of me. Pass the sherry.',
		ability: 'When you nominate, the nominee is drunk until dusk.',
		reminders: [
			'Drunk'
		],
		jinxes: [
			{
				id: 'antihero',
				reason: 'If the Aristocrat nominates the Antihero, the Antihero is drunk immediately and does not switch alignment.'
			}
		]
	},
	details: {
		description: 'When you nominate a player, they are drunk until dusk regardless of whether the nomination succeeds. This happens immediately.'
	}
};

const criminal: ClocktowerCharacter = {
	role: {
		id: 'criminal',
		name: 'Criminal',
		image: [
			'https://forgesteel.net/assets/clocktower/criminal/traveller.png',
			'https://forgesteel.net/assets/clocktower/criminal/good.png',
			'https://forgesteel.net/assets/clocktower/criminal/evil.png'
		],
		team: ClocktowerTeam.Traveller,
		flavor: 'Intentions are fragile things… let me improve yours.',
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
};

const disciple: ClocktowerCharacter = {
	role: {
		id: 'disciple',
		name: 'Disciple',
		image: [
			'https://forgesteel.net/assets/clocktower/disciple/traveller.png',
			'https://forgesteel.net/assets/clocktower/disciple/good.png',
			'https://forgesteel.net/assets/clocktower/disciple/evil.png'
		],
		team: ClocktowerTeam.Traveller,
		flavor: 'Rise. Your story is not yet finished.',
		ability: 'Once per game, at night*, choose a dead player; they are resurrected, but if you are evil they become poisoned.',
		otherNightReminder: 'Once per game, resurrect a player.',
		reminders: [
			'Ability used',
			'Drunk'
		]
	},
	details: {
		description: 'You may resurrect a dead player once per game. If you are evil, that player is now poisoned.'
	}
};

const disgraced: ClocktowerCharacter = {
	role: {
		id: 'disgraced',
		name: 'Disgraced',
		image: [
			'https://forgesteel.net/assets/clocktower/disgraced/traveller.png',
			'https://forgesteel.net/assets/clocktower/disgraced/good.png',
			'https://forgesteel.net/assets/clocktower/disgraced/evil.png'
		],
		team: ClocktowerTeam.Traveller,
		flavor: 'I’ve made mistakes, sure, but it’s time to forgive and forget, right?',
		ability: 'If a player of your alignment is executed, you can choose to die instead and learn the role of their nominator.',
		otherNightReminder: 'If a player of your alignment was executed, choose to die and learn the role of their nominator.'
	},
	details: {
		description: 'When a player of your alignment is executed, you choose to die in their place; you must speak up before the Storyteller ends the day. If you do, you learn the role of the player who nominated them. If the person you chose was not of your alignment, nothing happens.'
	}
};

const polder: ClocktowerCharacter = {
	role: {
		id: 'polder',
		name: 'Polder',
		image: [
			'https://forgesteel.net/assets/clocktower/polder/traveller.png',
			'https://forgesteel.net/assets/clocktower/polder/good.png',
			'https://forgesteel.net/assets/clocktower/polder/evil.png'
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
};

const voicelessTalker: ClocktowerCharacter = {
	role: {
		id: 'voicelesstalker',
		name: 'Voiceless Talker',
		image: [
			'https://forgesteel.net/assets/clocktower/voicelesstalker/traveller.png',
			'https://forgesteel.net/assets/clocktower/voicelesstalker/good.png',
			'https://forgesteel.net/assets/clocktower/voicelesstalker/evil.png'
		],
		team: ClocktowerTeam.Traveller,
		flavor: 'Perhaps I can change your mind.',
		ability: 'Each night*, choose two players; their roles (not alignments) are swapped. You cannot nominate.',
		otherNightReminder: 'Choose two players to switch.'
	},
	details: {
		description: 'Each night, you swap the roles (but not alignments) of two players. You cannot nominate, but you may still vote and speak.'
	}
};

// #endregion

export class ClocktowerData {
	static standard: ClocktowerScript = {
		type: ClocktowerScriptType.Standard,
		meta: {
			id: '_meta',
			name: 'Draw Steel on the Clocktower',
			author: 'Andy Aiken',
			logo: 'https://forgesteel.net/assets/clocktower/logo.png',
			background: undefined,
			hideTitle: true,
			almanac: 'https://forgesteel.net/#/clocktower',
			bootlegger: undefined,
			firstNight: [
				// Evil team
				'devil',
				// Modification
				'conduit',
				'criminal',
				'rival',
				// Demons
				'aurumvas',
				// Info
				'talent',
				'troubadour'
			],
			otherNight: [
				'disgraced',
				// Grim
				'memonek',
				// Modification
				'angulotl',
				'conduit',
				'criminal',
				'voicelesstalker',
				'censor',
				'tactician',
				// Demons
				'aurumvas',
				'blightphage',
				'hivequeen',
				'torlas',
				// Resurrection
				'revenant',
				'disciple',
				// Info
				'agent',
				'beastheart',
				'shadow',
				'polder',
				'troubadour'
			]
		},
		characters: [
			agent,
			beastheart,
			censor,
			conduit,
			director,
			elementalist,
			fury,
			nll,
			revenant,
			shadow,
			tactician,
			talent,
			troubadour,
			antihero,
			coward,
			devil,
			memonek,
			angulotl,
			duskElf,
			lightbender,
			rival,
			aurumvas,
			blightPhage,
			hiveQueen,
			torlas,
			aristocrat,
			criminal,
			disciple,
			disgraced,
			polder,
			voicelessTalker
		]
	};

	static teensy: ClocktowerScript = {
		type: ClocktowerScriptType.Teensyville,
		meta: {
			id: '_meta',
			name: 'Draw Steel on the Wristwatch',
			author: 'Andy Aiken',
			logo: 'https://forgesteel.net/assets/clocktower/logo.png',
			background: undefined,
			hideTitle: true,
			almanac: 'https://forgesteel.net/#/clocktower',
			bootlegger: undefined,
			firstNight: [
				// Modification
				'conduit',
				'rival'
			],
			otherNight: [
				// Grim
				'memonek',
				// Modification
				'angulotl',
				'conduit',
				'censor',
				'tactician',
				// Demons
				'blightphage',
				'torlas',
				// Info
				'agent'
			]
		},
		characters: [
			agent,
			censor,
			conduit,
			elementalist,
			fury,
			tactician,
			coward,
			memonek,
			angulotl,
			rival,
			blightPhage,
			torlas
		]
	};
};
