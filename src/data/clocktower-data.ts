import { ClocktowerRole, ClocktowerScript, ClocktowerScriptInfo } from '@/models/clocktower';
import { ClocktowerTeam } from '@/enums/clocktower-team';

const script: ClocktowerScriptInfo = {
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
		'highelf',
		'troubadour',
		'warden',
		'dawn'
	],
	otherNight: [
		'dusk',
		'memonek',
		'antihero',
		'censor',
		'angulotl',
		'criminal',
		'conduit',
		'tactician',
		'fury',
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
		'tactician',
		'hivequeen',
		'dawn'
	]
};

// #region Townsfolk

const agent: ClocktowerRole = {
	id: 'agent',
	name: 'Agent',
	team: ClocktowerTeam.Townsfolk,
	flavor: 'I count the missing as carefully as the present.',
	ability: 'Each day, publicly claim a new role. That night, ask the Storyteller a question; if that role is in play, the Storyteller will answer truthfully.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: 'Ask a question.',
	reminders: [
		'True info',
		'False info'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const censor: ClocktowerRole = {
	id: 'censor',
	name: 'Censor',
	team: ClocktowerTeam.Townsfolk,
	flavor: 'Speak not tonight. I have judged you wanting.',
	ability: 'Each night*, choose a player; if they are evil, they cannot use their ability tonight.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: 'Choose a player to judge. :reminder:',
	reminders: [
		'Judged'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const conduit: ClocktowerRole = {
	id: 'conduit',
	name: 'Conduit',
	team: ClocktowerTeam.Townsfolk,
	flavor: 'Through me, no corruption flows; faith is our armour.',
	ability: 'Each night, choose a player; until dusk, they are not drunk or poisoned, and cannot be made drunk or poisoned.',
	firstNight: 0,
	firstNightReminder: 'Choose a player to protect. :reminder:',
	otherNight: 0,
	otherNightReminder: 'Choose a player to protect. :reminder:',
	reminders: [
		'Blessed'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const elementalist: ClocktowerRole = {
	id: 'elementalist',
	name: 'Elementalist',
	team: ClocktowerTeam.Townsfolk,
	flavor: 'Strike at me, and you will find that there are delightful consequences.',
	ability: 'The first time you would be executed, your nominator dies instead. You become drunk for the rest of the game.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: '',
	reminders: [
		'Ability used'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const fury: ClocktowerRole = {
	id: 'fury',
	name: 'Fury',
	team: ClocktowerTeam.Townsfolk,
	flavor: 'I’m not afraid to burn with you.',
	ability: 'Once per game, at night*, choose two players: if you chose the Demon, you die; otherwise, one of them dies.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: 'Once per game, choose 2 players.',
	reminders: [
		'Ability used'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const highElf: ClocktowerRole = {
	id: 'highelf',
	name: 'High Elf',
	team: ClocktowerTeam.Townsfolk,
	flavor: 'The truth is merely a matter of careful observation.',
	ability: 'Each night, you learn two Townsfolk roles, at least one of which is in play.',
	firstNight: 0,
	firstNightReminder: 'Learn 2 Townsfolk roles, at least one of which is in play.',
	otherNight: 0,
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
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const nll: ClocktowerRole = {
	id: 'null',
	name: 'Null',
	team: ClocktowerTeam.Townsfolk,
	flavor: 'Within my null field, the world behaves as it should.',
	ability: 'If you are sober and healthy, your neighbours cannot be made drunk or poisoned.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: '',
	reminders: [
		'Null field',
		'Null field'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const revenant: ClocktowerRole = {
	id: 'revenant',
	name: 'Revenant',
	team: ClocktowerTeam.Townsfolk,
	flavor: 'I have died before. This is merely an inconvenience.',
	ability: 'If you die, you come back to life at night with a random dead Townsfolk’s ability instead of this ability.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: 'If dead, resurrect.',
	reminders: [],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const shadow: ClocktowerRole = {
	id: 'shadow',
	name: 'Shadow',
	team: ClocktowerTeam.Townsfolk,
	flavor: 'Evil has a certain smell, a certain feel. Some nights I sense it more than others.',
	ability: 'Each day, publicly state how many evil players you believe are alive. That night, learn how accurate you are.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: 'Learn correct / too high / too low.',
	reminders: [
		'Correct',
		'Too low',
		'Too high'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const tactician: ClocktowerRole = {
	id: 'tactician',
	name: 'Tactician',
	team: ClocktowerTeam.Townsfolk,
	flavor: 'With enough focus, every death can be a message. I decide who reads that message.',
	ability: 'Each night*, choose two players: if either dies tonight,  the other learns that player’s alignment, as do you.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: 'Choose 2 players to mark; if one is killed, wake and learn their role. :reminder:',
	reminders: [
		'Marked',
		'Marked'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const talent: ClocktowerRole = {
	id: 'talent',
	name: 'Talent',
	team: ClocktowerTeam.Townsfolk,
	flavor: 'Give me a moment, and I will be whoever we need.',
	ability: 'You learn two not-in-play roles; once per game, you may publicly claim one and immediately use its ability; you then lose the ability.',
	firstNight: 0,
	firstNightReminder: 'Learn 2 not-in-play roles.',
	otherNight: 0,
	otherNightReminder: '',
	reminders: [
		'Ability used'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const troubadour: ClocktowerRole = {
	id: 'troubadour',
	name: 'Troubadour',
	team: ClocktowerTeam.Townsfolk,
	flavor: 'Every villain has a name. I will sing them all.',
	ability: 'Each night, you learn two Minion roles, at least one of which is in play.',
	firstNight: 0,
	firstNightReminder: 'Learn 2 Minion roles, at least one of which is in play.',
	otherNight: 0,
	otherNightReminder: 'Learn 2 Minion roles, at least one of which is in play.',
	reminders: [
		'Known',
		'Known',
		'Known',
		'Known'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const warden: ClocktowerRole = {
	id: 'warden',
	name: 'Warden',
	team: ClocktowerTeam.Townsfolk,
	flavor: 'The strange are catalogued. The dangerous, remembered.',
	ability: 'Each night, you learn two Outsider roles, at least one of which is in play. [+1 Outsider]',
	firstNight: 0,
	firstNightReminder: 'Learn 2 Outsider roles, at least one of which is in play.',
	otherNight: 0,
	otherNightReminder: 'Learn 2 Outsider roles, at least one of which is in play.',
	reminders: [
		'Known',
		'Known',
		'Known',
		'Known'
	],
	remindersGlobal: [],
	setup: true,
	special: [],
	jinxes: []
};

// #endregion

// #region Outsiders

const coward: ClocktowerRole = {
	id: 'coward',
	name: 'Coward',
	team: ClocktowerTeam.Outsider,
	flavor: 'Please don’t hurt me.',
	ability: 'If you are nominated, you are executed immediately. [+1 Outsider]',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: '',
	reminders: [],
	remindersGlobal: [],
	setup: true,
	special: [],
	jinxes: []
};

const devil: ClocktowerRole = {
	id: 'devil',
	name: 'Devil',
	team: ClocktowerTeam.Outsider,
	flavor: 'They told me I was one of them. I believed them.',
	ability: 'You think you are a minion, but you are not. The demon knows who you are. [-1 Minion]',
	firstNight: 0,
	firstNightReminder: 'The demon learns who you are.',
	otherNight: 0,
	otherNightReminder: '',
	reminders: [],
	remindersGlobal: [
		'Is the Devil'
	],
	setup: false,
	special: [
		{
			type: 'selection',
			name: 'bag-disabled'
		},
		{
			type: 'reveal',
			name: 'replace-character'
		}
	],
	jinxes: []
};

const disgraced: ClocktowerRole = {
	id: 'disgraced',
	name: 'Disgraced',
	team: ClocktowerTeam.Outsider,
	flavor: 'I’ve made mistakes, sure, but it’s time to forgive and forget, right?',
	ability: 'If a player of your alignment is executed, you might die instead.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: '',
	reminders: [],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const memonek: ClocktowerRole = {
	id: 'memonek',
	name: 'Memonek',
	team: ClocktowerTeam.Outsider,
	flavor: 'Those of us from higher planes can sometimes glimpse the workings of fate.',
	ability: 'If you are executed, the Demon sees the Grimoire that night.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: '',
	reminders: [
		'Sees Grimoire tonight'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

// #endregion

// #region Minions

const angulotl: ClocktowerRole = {
	id: 'angulotl',
	name: 'Angulotl',
	team: ClocktowerTeam.Minion,
	flavor: 'The poison is already in you. Can you not feel it?',
	ability: 'Each night, choose a player: they are poisoned tonight and tomorrow day. Information a drunk or poisoned player learns is incorrect.',
	firstNight: 0,
	firstNightReminder: 'Choose a player to poison. :reminder:',
	otherNight: 0,
	otherNightReminder: 'Choose a player to poison. :reminder:',
	reminders: [
		'Poisoned'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const duskElf: ClocktowerRole = {
	id: 'duskelf',
	name: 'Dusk Elf',
	team: ClocktowerTeam.Minion,
	flavor: 'The magics of Equinox can hide almost anything.',
	ability: 'If there are six or more players alive and your Demon is executed for the first time, they survive but register as dead. [You are the only Minion]',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: '',
	reminders: [
		'Is alive'
	],
	remindersGlobal: [],
	setup: true,
	special: [],
	jinxes: []
};

const lightbender: ClocktowerRole = {
	id: 'lightbender',
	name: 'Lightbender',
	team: ClocktowerTeam.Minion,
	flavor: 'The blade falls - just not where you aimed it.',
	ability: 'If you would be executed, one of your neighbours is executed instead.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: '',
	reminders: [],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const rival: ClocktowerRole = {
	id: 'rival',
	name: 'Rival',
	team: ClocktowerTeam.Minion,
	flavor: 'I’m exactly like you… except I’m just a little better at it.',
	ability: 'You register as a Townsfolk. One good player knows a Rival is in play.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: '',
	reminders: [
		'Rival in play'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

// #endregion

// #region Demons

const baleEye: ClocktowerRole = {
	id: 'baleeye',
	name: 'Bale Eye',
	team: ClocktowerTeam.Demon,
	flavor: 'The eye does not lie. It simply ensures that what you see is never the truth.',
	ability: 'Each night*, choose a player: they die. You resister as a Townsfolk to Townsfolk abilities. [+1 Outsider or +1 Minion]',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: 'Choose a player; they die. :reminder:',
	reminders: [
		'Killed'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const blightPhage: ClocktowerRole = {
	id: 'blightphage',
	name: 'Blight Phage',
	team: ClocktowerTeam.Demon,
	flavor: 'Death is not the end of your service. You can be repurposed.',
	ability: 'Each night*, choose a player: they die. Once per game, you may bring a dead minion back as a different minion.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: 'Choose a player; they die. :reminder: Once per game, resurrect a Minion.',
	reminders: [
		'Killed',
		'Ability used'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const hivequeen: ClocktowerRole = {
	id: 'hivequeen',
	name: 'Hivequeen',
	team: ClocktowerTeam.Demon,
	flavor: 'There is no ‘I’. There is only the role that must be filled.',
	ability: 'Each night*, choose a player: they die. Each night*, you can choose to swap roles with a living minion.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: 'Choose a player; they die. :reminder: Choose a minion to swap roles with.',
	reminders: [
		'Killed'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const torlas: ClocktowerRole = {
	id: 'torlas',
	name: 'Torlas',
	team: ClocktowerTeam.Demon,
	flavor: 'Strike at me if you must, but know that every action has a consequence. I merely decide who suffers it.',
	ability: 'Each night*, choose a player: they die. Townsfolk abilities that target you instead target one of your Townsfolk neighbours.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: 'Choose a player; they die. :reminder:',
	reminders: [
		'Killed'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

// #endregion

// #region Travellers

const antihero: ClocktowerRole = {
	id: 'antihero',
	name: 'Antihero',
	team: ClocktowerTeam.Traveller,
	flavor: 'Push me, and I will become what you feared.',
	ability: 'Each time you are nominated, you change alignment.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: '',
	reminders: [],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const aristocrat: ClocktowerRole = {
	id: 'aristocrat',
	name: 'Aristocrat',
	team: ClocktowerTeam.Traveller,
	flavor: 'I ruin lives with a gesture. It is expected of me. Pass the sherry.',
	ability: 'When you nominate, the nominee is drunk until dusk.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: '',
	reminders: [
		'Drunk'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const criminal: ClocktowerRole = {
	id: 'criminal',
	name: 'Criminal',
	team: ClocktowerTeam.Traveller,
	flavor: 'You meant well. That is not what will happen.',
	ability: 'Each night, choose a player; until dusk, if they use an ability that targets another player, it targets a different player instead.',
	firstNight: 0,
	firstNightReminder: 'Choose a player to redirect. :reminder:',
	otherNight: 0,
	otherNightReminder: 'Choose a player to redirect. :reminder:',
	reminders: [
		'Redirected ability'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const disciple: ClocktowerRole = {
	id: 'disciple',
	name: 'Disciple',
	team: ClocktowerTeam.Traveller,
	flavor: 'Rise. Your purpose is not yet fulfilled.',
	ability: 'Once per game, at night*, choose a dead player; they are resurrected, but have no ability.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: 'Once per game, resurrect a player.',
	reminders: [
		'Resurrected (no ability)',
		'Ability used'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const polder: ClocktowerRole = {
	id: 'polder',
	name: 'Polder',
	team: ClocktowerTeam.Traveller,
	flavor: 'How dare you raise your hand against one so small?!',
	ability: 'If you are nominated for execution and survive, at night one player of your alignment learns your nominator’s role. You learn who learned this.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: 'Learn nominator’s role. :reminder:',
	reminders: [
		'Nominated & survived'
	],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

const voicelessTalker: ClocktowerRole = {
	id: 'voicelesstalker',
	name: 'Voiceless Talker',
	team: ClocktowerTeam.Traveller,
	flavor: 'Come and speak to me, and perhaps I will change your mind.',
	ability: 'Each night*, choose two players; their roles (not alignments) are swapped and one becomes poisoned until dusk. You cannot nominate.',
	firstNight: 0,
	firstNightReminder: '',
	otherNight: 0,
	otherNightReminder: '',
	reminders: [],
	remindersGlobal: [],
	setup: false,
	special: [],
	jinxes: []
};

// #endregion

export class ClocktowerData {
	static script: ClocktowerScript = [
		script,
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
		coward,
		devil,
		disgraced,
		memonek,
		angulotl,
		duskElf,
		lightbender,
		rival,
		baleEye,
		blightPhage,
		hivequeen,
		torlas,
		antihero,
		aristocrat,
		criminal,
		disciple,
		polder,
		voicelessTalker
	];
};
