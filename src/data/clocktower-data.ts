import { ClocktowerCharacter, ClocktowerScript } from '@/models/clocktower';
import { ClocktowerScriptType } from '@/enums/clocktower-script-type';
import { ClocktowerTeam } from '@/enums/clocktower-team';

const agent: ClocktowerCharacter = {
	role: {
		id: 'agent',
		name: 'Agent',
		image: [
			'https://forgesteel.net/assets/clocktower-townsfolk.png',
			'https://forgesteel.net/assets/clocktower-demon.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'If you pretend to be enough people, eventually someone will tell the truth.',
		ability: 'Each day, publicly claim a new role. That night, ask the Storyteller a yes/no question; if that role is in play, they will answer truthfully.',
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

const censor: ClocktowerCharacter = {
	role: {
		id: 'censor',
		name: 'Censor',
		image: [
			'https://forgesteel.net/assets/clocktower-townsfolk.png',
			'https://forgesteel.net/assets/clocktower-demon.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'Speak not tonight. No spells. No whispers. No excuses.',
		ability: 'Each night*, choose a player; if they are not on your team, they cannot use their ability tonight.',
		otherNightReminder: 'Choose a player to judge.',
		reminders: [
			'Judged'
		]
	},
	details: {
		description: 'A player who is “judged” and is on the other team cannot use their ability that night, including passive or triggered abilities.'
	}
};

const conduit: ClocktowerCharacter = {
	role: {
		id: 'conduit',
		name: 'Conduit',
		image: [
			'https://forgesteel.net/assets/clocktower-townsfolk.png',
			'https://forgesteel.net/assets/clocktower-demon.png'
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

const elementalist: ClocktowerCharacter = {
	role: {
		id: 'elementalist',
		name: 'Elementalist',
		image: [
			'https://forgesteel.net/assets/clocktower-townsfolk.png',
			'https://forgesteel.net/assets/clocktower-demon.png'
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
			'https://forgesteel.net/assets/clocktower-townsfolk.png',
			'https://forgesteel.net/assets/clocktower-demon.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'I’m not afraid to burn with you.',
		ability: 'Once per game, at night*, choose a pair of adjacent players: if either is the Demon, you die; otherwise, one of them dies.',
		otherNightReminder: 'Once per game, choose 2 players.',
		reminders: [
			'Ability used'
		]
	},
	details: {
		description: 'You choose two players at night; they must be sitting adjacent to each other. If either of them is the Demon, you die; otherwise, the Storyteller chooses one of the two players to die. If you are drunk or poisoned, nothing happens.'
	}
};

const highElf: ClocktowerCharacter = {
	role: {
		id: 'highelf',
		name: 'High Elf',
		image: [
			'https://forgesteel.net/assets/clocktower-townsfolk.png',
			'https://forgesteel.net/assets/clocktower-demon.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'Patterns emerge for those with the patience to see them.',
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
};

const nll: ClocktowerCharacter = {
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
};

const revenant: ClocktowerCharacter = {
	role: {
		id: 'revenant',
		name: 'Revenant',
		image: [
			'https://forgesteel.net/assets/clocktower-townsfolk.png',
			'https://forgesteel.net/assets/clocktower-demon.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'Bury me if it comforts you; death and I have an arrangement.',
		ability: 'If you die, you come back to life at night with a dead Townsfolk’s ability instead of this ability.',
		otherNightReminder: 'If dead, resurrect.'
	},
	details: {
		description: 'When you die, you lose the Revenant ability and gain the ability of a dead Townsfolk of the Storyteller’s choice before being resurrected. However, the dead Townsfolk ability you gain might be your own, in which case you can die and come back to life again.'
	}
};

const shadow: ClocktowerCharacter = {
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
};

const tactician: ClocktowerCharacter = {
	role: {
		id: 'tactician',
		name: 'Tactician',
		image: [
			'https://forgesteel.net/assets/clocktower-townsfolk.png',
			'https://forgesteel.net/assets/clocktower-demon.png'
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
			'https://forgesteel.net/assets/clocktower-townsfolk.png',
			'https://forgesteel.net/assets/clocktower-demon.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'Give me but a moment, and I will become whoever we need.',
		ability: 'You learn two not-in-play roles; once per game, claim one and gain its ability.',
		firstNightReminder: 'Learn 2 not-in-play roles.',
		reminders: [
			'Ability used'
		]
	},
	details: {
		description: 'You learn two roles that are not in play at the start of the game. Once per game, you may publicly claim to be one of them and immediately gain its ability as if you were that role. This use is still affected by drunkenness or poisoning, as normal.'
	}
};

const troubadour: ClocktowerCharacter = {
	role: {
		id: 'troubadour',
		name: 'Troubadour',
		image: [
			'https://forgesteel.net/assets/clocktower-townsfolk.png',
			'https://forgesteel.net/assets/clocktower-demon.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'Every villain thinks they’ll be forgotten, but each one has a name, and I will sing them all.',
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
};

const warden: ClocktowerCharacter = {
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
};

const antihero: ClocktowerCharacter = {
	role: {
		id: 'antihero',
		name: 'Antihero',
		image: [
			'https://forgesteel.net/assets/clocktower-outsider.png',
			'https://forgesteel.net/assets/clocktower-minion.png'
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
};

const devil: ClocktowerCharacter = {
	role: {
		id: 'devil',
		name: 'Devil',
		image: [
			'https://forgesteel.net/assets/clocktower-outsider.png',
			'https://forgesteel.net/assets/clocktower-minion.png'
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
			'https://forgesteel.net/assets/clocktower-outsider.png',
			'https://forgesteel.net/assets/clocktower-minion.png'
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

const angulotl: ClocktowerCharacter = {
	role: {
		id: 'angulotl',
		name: 'Angulotl',
		image: [
			'https://forgesteel.net/assets/clocktower-minion.png',
			'https://forgesteel.net/assets/clocktower-outsider.png'
		],
		team: ClocktowerTeam.Minion,
		flavor: 'Ghrul-tha brakka-thul rrukkul vaa ghol-uGlurrak kroth ghol vaa-thul rrakka va ulmokh Glurrak thaa!',
		ability: 'Each night, choose a player (choose 2 if 5 or more good players live): they are poisoned until dusk tomorrow. Drunk or poisoned players get false info.',
		firstNightReminder: 'Choose player(s) to poison.',
		otherNightReminder: 'Choose player(s) to poison.',
		reminders: [
			'Poisoned',
			'Poisoned'
		]
	},
	details: {
		description: 'You choose one player each night to be poisoned; if there are at least five living good players, you can choose an extra player. The chosen player is poisoned that night and the following day. While you are alive, if any player who is drunk or poisoned (for any reason, not just due to your ability) receives information, the information they receive must be incorrect. This does not affect non-information abilities.'
	}
};

const duskElf: ClocktowerCharacter = {
	role: {
		id: 'duskelf',
		name: 'Dusk Elf',
		image: [
			'https://forgesteel.net/assets/clocktower-minion.png',
			'https://forgesteel.net/assets/clocktower-outsider.png'
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
		description: 'If the Demon is executed while six or more players are alive (including the Demon but not including Travellers), they do not die but instead register as dead. The day ends and the game continues as if the Demon had died, but they remain alive and continue acting. This ability can only be used once.'
	}
};

const lightbender: ClocktowerCharacter = {
	role: {
		id: 'lightbender',
		name: 'Lightbender',
		image: [
			'https://forgesteel.net/assets/clocktower-minion.png',
			'https://forgesteel.net/assets/clocktower-outsider.png'
		],
		team: ClocktowerTeam.Minion,
		flavor: 'Your bhe blade will fall - just not where you aimed it.',
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
			'https://forgesteel.net/assets/clocktower-minion.png',
			'https://forgesteel.net/assets/clocktower-outsider.png'
		],
		team: ClocktowerTeam.Minion,
		flavor: 'I’m exactly like you… except better.',
		ability: 'You have the ability of, and register as, an in-play Townsfolk. The player with this role is poisoned.',
		firstNightReminder: 'Gain an in-play Townsfolk ability.',
		reminders: [
			'Poisoned'
		]
	},
	details: {
		description: 'You are woken on the first night to be told an in-play Townsfolk role. You register as that Townsfolk to all abilities that learn or depend upon roles, and you have that role’s ability. The player with this role is poisoned.'
	}
};

const aurumvas: ClocktowerCharacter = {
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
		description: 'You start with no minions, but when you would kill at night, you can choose instead to recruit a player to the evil team. If you choose to recruit, that player is immediately woken up and told that their alignment has changed (but are not told who else is on the evil team), and you cannot then choose to recruit again the next night.'
	}
};

const blightPhage: ClocktowerCharacter = {
	role: {
		id: 'blightphage',
		name: 'Blight Phage',
		image: [
			'https://forgesteel.net/assets/clocktower-demon.png',
			'https://forgesteel.net/assets/clocktower-townsfolk.png'
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
			'https://forgesteel.net/assets/clocktower-demon.png',
			'https://forgesteel.net/assets/clocktower-townsfolk.png'
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
			'https://forgesteel.net/assets/clocktower-demon.png',
			'https://forgesteel.net/assets/clocktower-townsfolk.png'
		],
		team: ClocktowerTeam.Demon,
		flavor: 'Strike at me if you must, but know that every arrow can always find a softer target.',
		ability: 'Each night*, choose a player: they die. When a Townsfolk ability targets only you, it instead targets your closest living Townsfolk neighbour [+1 Outsider]',
		otherNightReminder: 'Choose a player; they die.',
		reminders: [
			'Killed'
		]
	},
	details: {
		description: 'When a Townsfolk ability targets you and only you, it instead targets your closest living Townsfolk neighbour (if there is a tie, the target is chosen by the Storyteller). This does not affect non-Townsfolk abilities or abilities that target more than one player.'
	}
};

const aristocrat: ClocktowerCharacter = {
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
			'https://forgesteel.net/assets/clocktower-traveller.png',
			'https://forgesteel.net/assets/clocktower-townsfolk.png',
			'https://forgesteel.net/assets/clocktower-demon.png'
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
			'https://forgesteel.net/assets/clocktower-traveller.png',
			'https://forgesteel.net/assets/clocktower-townsfolk.png',
			'https://forgesteel.net/assets/clocktower-demon.png'
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
			'https://forgesteel.net/assets/clocktower-traveller.png',
			'https://forgesteel.net/assets/clocktower-townsfolk.png',
			'https://forgesteel.net/assets/clocktower-demon.png'
		],
		team: ClocktowerTeam.Traveller,
		flavor: 'I’ve made mistakes, sure, but it’s time to forgive and forget, right?',
		ability: 'If a player of your alignment is executed, you can choose to die instead and learn the role of their nominator.',
		otherNightReminder: 'If a player of your alignment was executed, choose to die and learn the role of their nominator.'
	},
	details: {
		description: 'When a player of your alignment is executed, you choose to die in their place. If you do, you learn the role of the player who nominated them.'
	}
};

const polder: ClocktowerCharacter = {
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
};

const voicelessTalker: ClocktowerCharacter = {
	role: {
		id: 'voicelesstalker',
		name: 'Voiceless Talker',
		image: [
			'https://forgesteel.net/assets/clocktower-traveller.png',
			'https://forgesteel.net/assets/clocktower-townsfolk.png',
			'https://forgesteel.net/assets/clocktower-demon.png'
		],
		team: ClocktowerTeam.Traveller,
		flavor: 'Perhaps I can change your mind.',
		ability: 'Each night*, choose two players; their roles (not alignments) are swapped and one becomes poisoned until dusk. You cannot nominate.',
		otherNightReminder: 'Choose two players to switch.'
	},
	details: {
		description: 'Each night, you swap the roles (but not alignments) of two players, then the Storyteller chooses one of them to be poisoned until dusk. You cannot nominate, but you may still vote and speak.'
	}
};

export class ClocktowerData {
	static standard: ClocktowerScript = {
		type: ClocktowerScriptType.Standard,
		meta: {
			id: '_meta',
			name: 'Steel on the Clocktower',
			author: 'Andy Aiken',
			almanac: 'https://forgesteel.net/#/clocktower',
			firstNight: [
				// Evil team
				'devil',
				// Modification
				'conduit',
				'angulotl',
				'criminal',
				'rival',
				// Info
				'talent',
				'highelf',
				'troubadour',
				'warden'
			],
			otherNight: [
				'disgraced',
				// Grim
				'memonek',
				// Modification
				'conduit',
				'angulotl',
				'criminal',
				'voicelesstalker',
				'censor',
				'tactician',
				'fury',
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
				'shadow',
				'polder',
				'highelf',
				'troubadour',
				'warden'
			]
		},
		characters: [
			agent,
			censor,
			conduit,
			elementalist,
			fury,
			highElf,
			nll,
			revenant,
			shadow,
			tactician,
			talent,
			troubadour,
			warden,
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
			name: 'Steel on the Wristwatch',
			author: 'Andy Aiken',
			almanac: 'https://forgesteel.net/#/clocktower',
			firstNight: [
				// Modification
				'angulotl',
				'rival'
			],
			otherNight: [
				// Grim
				'memonek',
				// Modification
				'angulotl',
				'censor',
				'tactician',
				'fury',
				// Demons
				'blightphage',
				'torlas',
				// Info
				'agent',
				'shadow'
			]
		},
		characters: [
			agent,
			censor,
			elementalist,
			fury,
			shadow,
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
