import { ClocktowerCharacter, ClocktowerScript } from '@/models/clocktower';
import { ClocktowerScriptType } from '@/enums/clocktower-script-type';
import { ClocktowerTeam } from '@/enums/clocktower-team';

// #region Townsfolk

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
		description: `
The Beastheart reads the stories left behind by the dead.

* Each night, beginning on the second night, the Beastheart chooses one dead player and learns one character that player held at some point during the game.
* If the chosen player held only one character during the game, the Storyteller reveals that character. If the player held multiple characters — due to role-swapping effects such as the Hive Queen or Voiceless Talker — the Storyteller chooses which one to reveal.
* The Beastheart may choose the same dead player on multiple nights, potentially learning a different character they held each time.
* If the Beastheart is drunk or poisoned, the character they learn may be false.`
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
		ability: 'Each night*, choose a player (different to last night); if they are not on your team, they are drunk until dusk.',
		otherNightReminder: 'Choose a player to judge.',
		reminders: [
			'Judged'
		]
	},
	details: {
		description: `
The Censor quietly incapacitates their enemies.

* Each night, beginning on the second night, the Censor chooses a player to judge. If that player is not on the Censor's team — that is, they are of a different alignment — that player becomes drunk.
* The chosen player remains drunk until dusk the next night. Each night the Censor wakes and chooses, the drunk effect moves to the new choice and the previous player is no longer drunk.
* The Censor must choose a different player each night.
* If the Censor chooses a player who shares their alignment, nothing happens that night.
* If the Censor is drunk or poisoned, their chosen player is not actually drunk, but the Storyteller acts as though they are.`
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
		ability: 'Each night, choose a player; they are no longer drunk or poisoned, and until dusk they cannot be made drunk or poisoned.',
		firstNightReminder: 'Choose a player to protect.',
		otherNightReminder: 'Choose a player to protect.',
		reminders: [
			'Blessed'
		]
	},
	details: {
		description: `
The Conduit purifies those touched by corruption.

* Each night, including the first night, the Conduit chooses a player to bless. That player is immediately cleansed of any drunk or poisoned status and cannot be made drunk or poisoned again until the following dusk.
* Protection expires at dusk — that is, the start of the next night phase. After that, the player may be affected by drunk or poison effects normally.
* The Conduit may choose themselves.
* If the Conduit is drunk or poisoned, the player they choose is not actually protected, though the Storyteller acts as if the protection has been applied.`
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
		ability: 'The first time you nominate, if your nominee is a Townsfolk, that player is executed and all players learn your role. Your role and alignment cannot be changed.',
		reminders: [
			'Ability used'
		]
	},
	details: {
		description: `
The Director can prove they are trustworthy.

* The first time the Director nominates a player, if that player is a Townsfolk, that player is executed; every player in the game immediately and publicly learns the Director's character, and the day ends.
* This revelation occurs during the nomination itself, before any vote is held.
* The ability only triggers if the nominee is a Townsfolk. Nominating an Outsider, Minion, Demon, or Traveller has no special effect and does not expend the ability.
* If the Director is drunk or poisoned when making their first nomination, the ability does not trigger, even if the nominee is a Townsfolk. The ability is still expended — the Director does not get a second chance when sober.
* After the first nomination (whether or not it triggered), the Director has no further special effect.
* The Director cannot be made evil or changed into a different role - the good Director is always the good Director.`
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
		description: `
The Elementalist turns execution into a weapon against its instigator.

* The first time the Elementalist would be executed by vote, their nominator dies instead, and the Elementalist survives.
* This ability triggers automatically — the Elementalist need not announce or declare it.
* The nominator is the player who nominated the Elementalist during that vote. If the Elementalist was nominated by a dead player, that player "dies" but is already dead; the effect is spent for no practical gain.
* If the Elementalist is drunk or poisoned when they would be executed, the ability does not trigger and the Elementalist is executed normally. The ability is still expended.
* This ability only protects against execution by vote. It does not prevent death by night kill or any other source.`
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
		description: `
The Fury gambles their life to expose the Demon.

* Once per game, during the day, the Fury may publicly announce the use of their ability and nominate two players who are sitting adjacent to one another in the seating order.
* If either of the two chosen players is the Demon, the Fury dies. If neither is the Demon, one of them dies — the Storyteller decides which.
* The two players must be adjacent to each other; they do not need to be adjacent to the Fury.
* If the Fury uses this ability and survives, the town has confirmation that neither of the two chosen players is the Demon.
* If the Fury is drunk or poisoned when they use this ability, nothing happens. The ability is still expended.
* Once used, this ability is gone.`
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
		ability: 'Your neighbours cannot be made drunk or poisoned. The first time one of them would be killed in the night, they live.',
		reminders: [
			'Null field',
			'Null field',
			'Ability used'
		]
	},
	details: {
		description: `
The Null creates a zone of stability around themselves.

* The Null's two neighbours (regardless of their team or alignment) cannot be made drunk or poisoned by any source.
* This ability is passive; the Null takes no action.
* If the Null is drunk or poisoned, this protection is suspended and their neighbours may be affected normally.
* The Null's protection prevents new applications of drunk or poison. It does not cleanse existing conditions.
* The first time one of your protected neighbours would be killed during the night phase, they live. If both would be killed simultaneously, the Storyteller chooses one to live and one to die.`
	}
};

const radenwight: ClocktowerCharacter = {
	role: {
		id: 'radenwight',
		name: 'Radenwight',
		image: [
			'https://forgesteel.net/assets/clocktower/radenwight/good.png',
			'https://forgesteel.net/assets/clocktower/radenwight/evil.png'
		],
		team: ClocktowerTeam.Townsfolk,
		flavor: 'Names are like scraps - pick up enough of them and you’ll find something worth keeping.',
		ability: 'Each day, publicly claim to be a new role (not your own). That night, ask the Storyteller a yes/no question; if it’s in play, they will answer truthfully.',
		otherNightReminder: 'Ask a question.',
		reminders: [
			'True info',
			'False info'
		]
	},
	details: {
		description: `
The Radenwight uncovers truth by pretending to be someone else.

* Each day, the Radenwight must publicly announce to all players that they are a specific character. The claimed character cannot be the Radenwight, and must be a character they have not claimed on any previous day.
* That night, the Radenwight wakes and may ask the Storyteller any yes/no question. If the character the Radenwight claimed that day is actually in play, the Storyteller answers truthfully. If it is not in play, the Storyteller may answer however they wish.
* The Radenwight's daily claim does not need to be accurate — they may claim any character on the script, including evil characters. What matters is whether the claimed character is genuinely in play.
* The Radenwight's daily claims are public. Other players may try to "steal" a character the Radenwight intends to claim, robbing them of a guaranteed truthful answer the following night.
* If the Radenwight is drunk or poisoned, the Storyteller may answer their nightly question falsely regardless of whether the claimed character is in play.`
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
		ability: 'If you die, you come back to life at night as a dead Townsfolk; you retain your alignment.',
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
		description: `
The Revenant refuses to stay dead.

* If the Revenant dies, their character token is first replaced with a dead Townsfolk character of the Storyteller's choosing, and then they are resurrected that night as that character — with its ability fully active.
* The Revenant retains the alignment they were when they died.
* The Townsfolk the Revenant becomes is drawn from the dead Townsfolk in the game. If there are no other dead Townsfolk to draw from, the Storyteller may have no choice but to make them the Revenant again — in which case they can die and come back to life repeatedly.
* The Storyteller tracks the Revenant's true origin with the "Is the Revenant" reminder in the Grimoire. Other players do not automatically learn that the Revenant has returned or that their character has changed.`
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
		ability: 'Each night*, learn how many players are currently drunk or poisoned, how many players changed character tonight, and how many changed alignment tonight.',
		otherNightReminder: 'Learn how many players are drunk, how many changed character, and how many changed alignment.'
	},
	details: {
		description: `
The Shadow watches the invisible currents of change.

* Each night, beginning on the second night, the Shadow learns three numbers: how many players are drunk or poisoned, how many players changed their character that night, and how many players changed their alignment that night.
* "Changed character" covers any effect that altered a player's character token during the night, such as the Hive Queen's role swap, the Voiceless Talker's swap, or the Talent's transformation. A player whose character changed several times in the same night counts only once.
* "Changed alignment" covers any effect that changed which team a player is on during the night, such as the Aurumvas converting a player to evil, or the Wode Elf's alignment flip.
* If the Shadow is drunk or poisoned, the numbers they receive may be false.`
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
		description: `
The Tactician prepares for death to yield information.

* Each night, beginning on the second night, the Tactician secretly chooses two players and marks them. If exactly one of those two players dies that same night, the surviving marked player may privately visit the Storyteller the following day to learn the dead player's character and alignment.
* The ability only triggers if exactly one of the two marked players dies — not both, and not neither.
* Visiting the Storyteller is voluntary; the surviving marked player is not required to do so.
* The Tactician does not receive this information themselves — only the surviving marked player does.
* If the Tactician — or the surviving marked player — is drunk or poisoned, the information may be false or may not be given at all.`
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
		flavor: 'Deep down, I always knew I could do this. I just needed the right moment.',
		ability: 'You learn two non-Demon roles; once per game, when you publicly claim one of them, you become that role; you retain your alignment.',
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
		description: `
The Talent can become exactly who the team needs.

* At the start of the game, the Talent privately learns two character names. Once per game, if the Talent publicly claims to be one of those two characters during the day, they immediately transform into that character and gain its ability.
* "Publicly claims" means announcing to all players "I am the [character]." The transformation occurs at the moment of the claim.
* Once transformed, the Talent is treated as their new character for all purposes, but their alignment does not change. Their Talent token is replaced in the Grimoire; the "Is the Talent" reminder tracks their original identity.
* The two characters the Talent learns may be of any type except Demon, and may or may not be in play.
* The Talent may choose never to use this ability.
* If the Talent is drunk or poisoned when they make their public claim, the transformation does not occur and the ability is not expended.`
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
		ability: 'Each night, you learn two roles and are told how many of them are in play.',
		firstNightReminder: 'Learn 2 roles, and how many of them are in play.',
		otherNightReminder: 'Learn 2 roles, and how many of them are in play.'
	},
	details: {
		description: `
The Troubadour sings of those who walk among us.

* Each night, including the first night, the Troubadour wakes and learns two character names and how many of those two characters are in play — zero, one, or two.
* "In play" means currently held by a living or dead player in the game.
* The Storyteller chooses which two characters to show. The number given is the truthful count of how many are genuinely in play, and may be zero, one, or two.
* A count of two is a strong confirmation; a count of zero is a useful negative; a count of one leaves the Troubadour to reason over many nights about which of the two is genuine.
* If the Troubadour is drunk or poisoned, the count they receive may be false.`
	}
};

// #endregion

// #region Outsiders

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
		description: `
The Devil believes they are something they are not.

* The Devil is told at the start of the game that they are a specific Minion character. On the first night, the Demon is privately told who the Devil is.
* The Devil receives any first-night information that their fake Minion character would normally receive. This information may be false. They are also shown who the Demon is, alongside the real Minions.
* The Devil genuinely does not know they are an Outsider. They believe they are evil and on the Demon's team, and will typically act accordingly. However, the Devil is still good and wins with the good team — unless their alignment is later changed.
* The Devil has no real ability — their fake Minion character's ability does not function.
* Other Minions in the game (if any) are not told about the Devil.
* The Devil adds one Outsider and removes one Minion from the game's expected character composition. As such, the Devil cannot be in play with the Dusk Elf (the Devil fills the only Minion slot the Dusk Elf needs) or the Aurumvas (with no Minions there is no Minion slot for the Devil to replace).`
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
		description: `
The Memonek's execution is a gift to the Demon.

* If the Memonek is executed by vote, the Demon is privately shown the full Grimoire that night, just after dusk.
* The Grimoire reveals every player's current character, alignment, and status — a complete picture of the game at that moment.
* This ability only triggers on execution. It does not activate on night kills or any other form of death.
* If the Memonek is drunk or poisoned when executed, the Demon does not see the Grimoire.`
	}
};

const npc: ClocktowerCharacter = {
	role: {
		id: 'npc',
		name: 'NPC',
		image: [
			'https://forgesteel.net/assets/clocktower/npc/good.png',
			'https://forgesteel.net/assets/clocktower/npc/evil.png'
		],
		team: ClocktowerTeam.Outsider,
		flavor: 'Everyone else gets to shape the story. I just live in it.',
		ability: 'You cannot vote.'
	},
	details: {
		description: `
The NPC exists on the margins of the story, never quite a full participant.

* The NPC cannot vote at any point during the game.
* The NPC may still nominate, speak, and be nominated and executed as normal.
* If the NPC is drunk or poisoned, they may vote, but the Storyteller acts as though they cannot.`
	}
};

const retainer: ClocktowerCharacter = {
	role: {
		id: 'retainer',
		name: 'Retainer',
		image: [
			'https://forgesteel.net/assets/clocktower/retainer/good.png',
			'https://forgesteel.net/assets/clocktower/retainer/evil.png'
		],
		team: ClocktowerTeam.Outsider,
		flavor: 'I owe everything I am to my mentor.',
		ability: 'You know one player with a Townsfolk ability. If they die, you die at dusk the next day, even if drunk or poisoned.',
		firstNightReminder: 'Learn your mentor.',
		reminders: [
			'Mentor',
			'Borrowed Time'
		]
	},
	details: {
		description: `
The Retainer's life is bound to the hero they serve.

* On the first night, the Retainer learns one other player: their mentor. The Retainer learns only who the mentor is, not the mentor's character or alignment.
* The mentor is a player with a Townsfolk ability. This is normally a true Townsfolk, but the Storyteller may deliberately assign a player who merely holds a Townsfolk ability without being good — most notably the Rival, who has an in-play Townsfolk's ability while being an evil Minion. Binding the Retainer to such a mentor ties the Retainer's life to an evil player.
* Because the bond is to the player and not their alignment, it persists through changes. If the Aurumvas converts the mentor to evil, the mentor keeps their Townsfolk ability and the Retainer remains bound to them — so the Retainer can end the game tied to a player who is no longer good.
* If the mentor dies by any means — night kill, execution, or any other effect — the Retainer dies at the following dusk. Mark the Retainer with "Borrowed Time" when the mentor dies; they die at dusk the next day.
* This death is final and cannot be prevented. The Retainer dies even if they are drunk or poisoned, and even if the mentor is later resurrected — once the mentor has died, the Retainer's fate is sealed.
* During their final day on Borrowed Time, the Retainer is fully active: they may speak, nominate, and vote as normal until dusk takes them.
* If the Retainer dies by some other means before dusk claims them, they simply die then and the Borrowed Time clock no longer matters.
* If the Retainer is bound to the Rival, executing that Rival also kills the Retainer — so good can be punished for correctly executing a Minion.`
	}
};

const wodeElf: ClocktowerCharacter = {
	role: {
		id: 'wodeelf',
		name: 'Wode Elf',
		image: [
			'https://forgesteel.net/assets/clocktower/wodeelf/good.png',
			'https://forgesteel.net/assets/clocktower/wodeelf/evil.png'
		],
		team: ClocktowerTeam.Outsider,
		flavor: 'Do not make me choose a side, for I owe allegiance to no court.',
		ability: 'Each time you are nominated, you change alignment.',
		otherNightReminder: 'Wake up if alignment flipped.'
	},
	details: {
		description: `
The Wode Elf is shaped entirely by the pressure placed upon them.

* The Wode Elf begins the game good. Each time they are nominated by any player — whether or not the nomination results in an execution — their alignment flips: good becomes evil, evil becomes good.
* Every individual nomination triggers a flip. If the Wode Elf is nominated twice in one day, they return to the alignment they started that day with.
* If alignment changes, the Storyteller will wake the Wode Elf at night to verify this.
* An evil Wode Elf counts as evil for all game purposes: they contribute to evil's win condition and are treated as an opponent by abilities like the Censor.`
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
		ability: 'Each night*, choose a player: they are poisoned tonight and tomorrow day. Before the Demon acts, they learn which players are currently poisoned. [+1 Outsider]',
		otherNightReminder: 'Choose a player; they are poisoned.',
		reminders: [
			'Poisoned'
		],
		setup: true
	},
	details: {
		description: `
The Angulotl poisons the well of information for the good team.

* Each night, beginning on the second night, the Angulotl chooses a player. That player is poisoned for the rest of that night and the entire following day, expiring at dusk.
* When the Demon is woken each night, they learns which players are currently poisoned — including those poisoned by any other source, such as the Rival.
* A poisoned player has no ability, but the Storyteller pretends they do. If their ability gives them information, the Storyteller may give them false information instead.
* If the Angulotl is drunk or poisoned, their chosen player is not actually poisoned, but the Storyteller acts as though they are.`
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
		ability: 'If there are five or more players alive when the Demon is executed for the first time, they survive but register as dead. [You are the only Minion]',
		reminders: [
			'Is alive'
		],
		setup: true
	},
	details: {
		description: `
The Dusk Elf gives the Demon a reprieve from the town's justice.

* If there are five or more players alive when the Demon is executed for the first time, the Demon survives but registers as dead to all players. For this count, the Demon is included but Travellers are not.
* The day ends and the game continues as though the Demon had died — players are told the Demon has been executed, and their seat may receive a shroud. In secret, the Demon remains alive: they can still nominate, vote, and use their night-kill ability as normal.
* This applies only to the Demon's first execution. If five or more are alive at that point, the save fires; otherwise the Demon dies normally. Either way, subsequent executions of the Demon kill them.
* If the Dusk Elf is drunk or poisoned at the moment of the Demon's execution, the ability does not trigger.
* The Dusk Elf is always the only Minion in games where it is used.`
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
		flavor: 'Grrrrrrrr.',
		ability: 'Once per game, if you would be executed, your nearest living good neighbour is executed instead.',
		reminders: [
			'Ability used'
		]
	},
	details: {
		description: `
The Lightbender makes their neighbours pay for the town's justice.

* Once per game, if the Lightbender would be executed by vote, the Lightbender's closest living good neighbour is executed in their place and the Lightbender survives.
* If there are two equally close good neighbours, the Storyteller chooses which one is executed.
* If the Lightbender is drunk or poisoned when they would be executed, they are executed normally and the once-per-game use is not expended.`
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
		remindersGlobal: [
			'Is the Rival'
		],
		reminders: [
			'Poisoned'
		],
		special: [
			{
				type: 'reveal',
				name: 'replace-character'
			}
		]
	},
	details: {
		description: `
The Rival steals a Townsfolk's identity — and ruins the original in the process.

* The Rival has the ability of one in-play Townsfolk character. The Townsfolk whose ability the Rival has copied is permanently poisoned while the Rival is alive.
* The Rival learns which Townsfolk they are copying on the first night. They fully gain that character's ability, including its nightly actions and information.
* Because the Rival is evil, the Storyteller may give them false information through their copied ability.
* The copied Townsfolk is permanently poisoned for as long as the Rival is in play. Their ability does not function, and any information they receive may be false. The Townsfolk is not told they are poisoned.
* If the Rival dies, the copied Townsfolk is no longer poisoned.
* If the Rival is drunk or poisoned, their copied ability does not function.`
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
		description: `
The Aurumvas does not merely kill — it converts.

* Each night, the Aurumvas chooses a player. That player either dies or becomes evil — the Aurumvas decides which outcome applies. The Aurumvas plays in a game with no Minions.
* The Aurumvas cannot choose to kill on the first night. On night 1, they must recruit (convert a player to evil) or take no action.
* The Aurumvas cannot recruit on two consecutive nights. If they recruited on the previous night, they must kill (or abstain) before recruiting again.
* A player converted to evil retains their original character and ability but becomes evil-aligned. They are immediately woken and told that their alignment has changed, but they are not told who else is on the evil team. They win alongside the Aurumvas. Converted players are not Minions — they are simply evil with their original role.
* If the Aurumvas is drunk or poisoned, their chosen action has no effect.`
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
		description: `
The Blight Phage never wastes a fallen servant.

* Each night, beginning on the second night, the Blight Phage chooses a player, who dies.
* Once per game, instead of making a kill, the Blight Phage may choose a dead Minion and resurrect them as a Minion of the Blight Phage's choice. The resurrected player is alive, evil, and has the full ability of their new role immediately. This resolves after deaths but before information is given to other players.
* The resurrection replaces the kill for that night — the Blight Phage cannot both kill and resurrect on the same night.
* If the Blight Phage is drunk or poisoned, the chosen player does not die, and any resurrection attempt fails. The once-per-game use is not expended if the ability fails due to being drunk or poisoned.`
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
		description: `
The Hive Queen can slip into any role that serves the swarm.

* Each night, beginning on the second night, the Hive Queen chooses a player, who dies. After the kill, the Hive Queen may optionally swap their own character with that of any other evil player.
* The swap is optional and targets only evil players. The chosen evil player does not have to agree to the swap. Both players keep their alignment and any reminder tokens, but exchange characters — and therefore abilities.
* After a swap, the evil player who receives the Hive Queen token is now the Demon and kills each night. The former Hive Queen has a new character and its ability.
* The kill occurs before the optional swap; the Hive Queen may not swap before acting.
* If the Hive Queen is drunk or poisoned, no kill occurs and no swap can take place.
* The Shadow detects when character swaps occur.`
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
		ability: 'Each night*, choose a player: they die. When a Townsfolk ability targets only you, it instead targets your closest living Townsfolk neighbour.',
		otherNightReminder: 'Choose a player; they die.',
		reminders: [
			'Killed'
		]
	},
	details: {
		description: `
The Torlas deflects every attack aimed at itself.

* Each night, beginning on the second night, the Torlas chooses a player, who dies.
* If a Townsfolk ability would target only the Torlas, it instead targets the Torlas's closest living Townsfolk neighbour in either direction. If both directions are equidistant, the Storyteller chooses.
* The deflection only triggers if the Torlas is the sole target of the ability. If an ability targets multiple players simultaneously, it is not deflected.
* If there is no living Townsfolk neighbour in any direction, the ability targets the Torlas normally.`
	}
};

// #endregion

// #region Travellers

const celestial: ClocktowerCharacter = {
	role: {
		id: 'celestial',
		name: 'Celestial',
		image: [
			'https://forgesteel.net/assets/clocktower/celestial/traveller.png',
			'https://forgesteel.net/assets/clocktower/celestial/good.png',
			'https://forgesteel.net/assets/clocktower/celestial/evil.png'
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
		description: `
The Celestial can restore one life — at a possible hidden cost.

* Once per game, beginning on the second night, the Celestial may choose a dead player and resurrect them. The resurrected player is alive again and has their character and ability fully restored.
* If the Celestial is evil, the resurrected player is also poisoned. Their ability does not function and any information they receive may be false — neither the Celestial nor the resurrected player are told about the poison.
* The Celestial may choose not to use their ability on any given night, preserving it for a later night.
* Once used, the ability cannot be used again, even if the resurrected player dies a second time.
* If the Celestial is drunk or poisoned when attempting a resurrection, the chosen player is not resurrected and the once-per-game use is not expended.`
	}
};

const dwarf: ClocktowerCharacter = {
	role: {
		id: 'dwarf',
		name: 'Dwarf',
		image: [
			'https://forgesteel.net/assets/clocktower/dwarf/traveller.png',
			'https://forgesteel.net/assets/clocktower/dwarf/good.png',
			'https://forgesteel.net/assets/clocktower/dwarf/evil.png'
		],
		team: ClocktowerTeam.Traveller,
		flavor: 'A grudge, properly applied, is a precision instrument.',
		ability: 'When you nominate, if the nominee does not share your alignment, they are drunk until dusk.',
		reminders: [
			'Drunk'
		],
		jinxes: [
			{
				id: 'wodeelf',
				reason: 'If the Dwarf nominates the Wode Elf, the Wode Elf is drunk immediately and so does not switch alignment.'
			}
		]
	},
	details: {
		description: `
The Dwarf's nominations carry an immediate and personal cost for the accused.

* When the Dwarf nominates a player who is on the opposing team, the nominated player becomes drunk until dusk.
* This ability applies to every nomination the Dwarf makes — not only the first.
* The drunk status expires at the start of the next night phase. A drunk player has no ability, but the Storyteller pretends they do and may give them false information.
* If the Dwarf nominates a character with an ability that activates when nominated, the Dwarf makes them drunk before this happens, and so their ability will not activate.`
	}
};

const hakaan: ClocktowerCharacter = {
	role: {
		id: 'hakaan',
		name: 'Hakaan',
		image: [
			'https://forgesteel.net/assets/clocktower/hakaan/traveller.png',
			'https://forgesteel.net/assets/clocktower/hakaan/good.png',
			'https://forgesteel.net/assets/clocktower/hakaan/evil.png'
		],
		team: ClocktowerTeam.Traveller,
		flavor: 'I have seen all the ways this ends. This one, I choose - on my own terms.',
		ability: 'If a player of your alignment is executed, you can choose to die instead and learn the role of their nominator.',
		otherNightReminder: 'If a player of your alignment was executed, choose to die and learn the role of their nominator.'
	},
	details: {
		description: `
The Hakaan can trade their life to save an ally and learn a secret.

* If a player of the Hakaan's alignment is executed, the Hakaan may choose to die in that player's place. The executed player survives, the Hakaan dies, and the Hakaan learns the character of the player who originally nominated the executed player.
* To use this ability, the Hakaan must speak up before the Storyteller ends the day. The nominator's character is then revealed to them that night.
* If the player they chose to die for was not actually of the Hakaan's alignment, nothing happens.
* This ability may be used multiple times - once for each aligned player who is executed. The Hakaan may choose not to use it for any given execution.
* If the Hakaan is drunk or poisoned when the choice is made, the information they receive about the nominator may be false.`
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
		description: `
A failed execution against the Polder becomes intelligence for the good team.

* If the Polder is nominated and the vote does not result in their execution, that night one player of the Polder's alignment learns the nominator's character. The Polder is then told which player received this information.
* This ability may trigger multiple times, once per failed nomination against the Polder in the same game.
* If the Polder is drunk or poisoned when the failed nomination occurs, the information delivered may be false.`
	}
};

const timeRaider: ClocktowerCharacter = {
	role: {
		id: 'timeraider',
		name: 'Time Raider',
		image: [
			'https://forgesteel.net/assets/clocktower/timeraider/traveller.png',
			'https://forgesteel.net/assets/clocktower/timeraider/good.png',
			'https://forgesteel.net/assets/clocktower/timeraider/evil.png'
		],
		team: ClocktowerTeam.Traveller,
		flavor: 'Causality is a river. I just moved the banks a little.',
		ability: 'Each night, choose a player; until dusk, if they use an ability that targets one other player, it targets a different player instead.',
		firstNightReminder: 'Choose a player to redirect.',
		otherNightReminder: 'Choose a player to redirect.',
		reminders: [
			'Redirected ability'
		],
		jinxes: [
			{
				id: 'fury',
				reason: 'If the Time Raider targets the Fury, one of the Fury’s two chosen players is replaced with a player of the Storyteller’s choosing before the Fury’s ability resolves.'
			}
		]
	},
	details: {
		description: `
The Time Raider uses their understanding of the higher planes to ensure that intentions reach unintended destinations.

* Each night, including the first night, the Time Raider chooses a player. Until dusk the following day, if that player uses an ability that targets another player, the ability targets a different player instead — chosen by the Storyteller.
* The redirection applies to abilities that require the player to actively select a specific target. Passive abilities or abilities that affect only the player themselves are not redirected.
* The affected player is not aware that their ability has been redirected. They believe they targeted their intended player.
* If the Time Raider is drunk or poisoned, the chosen player's ability is not redirected and functions normally.`
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
		description: `
The Voiceless Talker silently rearranges the pieces on the board.

* Each night, beginning on the second night, the Voiceless Talker chooses two players and swaps their characters. Alignments are not changed — only character tokens are exchanged.
* Both players now have each other's character and ability. Neither player is told that a swap has occurred.
* The Voiceless Talker cannot nominate at any point during the game, but they may still vote and speak.
* If the Voiceless Talker is drunk or poisoned, the swap does not occur.
* If the swap would result in the creation of a good Demon, the swap does not occur.
* The Shadow detects when character swaps occur.`
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
				// Setup
				'devil',
				'retainer',
				// Modification
				'rival',
				'conduit',
				'timeraider',
				// Demons
				'aurumvas',
				// Info
				'talent',
				'troubadour'
			],
			otherNight: [
				'hakaan',
				'wodeelf',
				// Grim
				'memonek',
				// Modification
				'angulotl',
				'conduit',
				'timeraider',
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
				'celestial',
				// Info
				'radenwight',
				'beastheart',
				'shadow',
				'polder',
				'troubadour'
			]
		},
		characters: [
			// Townsfolk
			beastheart,
			censor,
			conduit,
			director,
			elementalist,
			fury,
			nll,
			radenwight,
			revenant,
			shadow,
			tactician,
			talent,
			troubadour,
			// Outsiders
			devil,
			memonek,
			retainer,
			wodeElf,
			// Minions
			angulotl,
			duskElf,
			lightbender,
			rival,
			// Demons
			aurumvas,
			blightPhage,
			hiveQueen,
			torlas,
			// Travellers
			celestial,
			dwarf,
			hakaan,
			polder,
			timeRaider,
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
				// Info
				'troubadour'
			],
			otherNight: [
				'wodeelf',
				// Modification
				'angulotl',
				'conduit',
				'tactician',
				// Demons
				'blightphage',
				'torlas',
				// Info
				'shadow',
				'troubadour'
			]
		},
		characters: [
			// Townsfolk
			conduit,
			elementalist,
			fury,
			shadow,
			tactician,
			troubadour,
			// Outsiders
			npc,
			wodeElf,
			// Minions
			angulotl,
			lightbender,
			// Demons
			blightPhage,
			torlas
		]
	};
};
