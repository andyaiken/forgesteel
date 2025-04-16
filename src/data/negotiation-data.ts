import { Negotiation } from '../models/negotiation';
import { NegotiationTrait } from '../enums/negotiation-trait';

export class NegotiationData {
	static banditChief: Negotiation = {
		id: 'negotiation-bandit-chief',
		name: 'Bandit Chief',
		description: `
The bandit chief is a bully and a braggart, and most negotiate using intimidation and bluster before softening.

The bandit chief archetype can be used for any other local big shot, such as the privileged child of a local lord, an arrogant tavern darts champion, or any bully.`,
		impression: 1,
		interest: 1,
		patience: 1,
		motivations: [
			{
				trait: NegotiationTrait.Freedom,
				description: 'No one tells me what to do—not if they want to keep their head on their shoulders. And no one tells my toughs what to do, except ME!'
			},
			{
				trait: NegotiationTrait.Greed,
				description: 'Gold! I love the feel of shining, clinking coins running between my fingers. I never found something to spend it on that I like as much as the gold.'
			},
			{
				trait: NegotiationTrait.Power,
				description: 'I want a stronger hideout, more toughs, and a bigger share of the loot. Get me that, and I’ll do your dirty work for you. You can keep your fancy titles and lands.'
			},
			{
				trait: NegotiationTrait.Revelry,
				description: 'If you don’t get drunk after a raid, then why have a raid?'
			}
		],
		pitfalls: [
			{
				trait: NegotiationTrait.HigherAuthority,
				description: 'By order of the baron? I give the orders around here!'
			},
			{
				trait: NegotiationTrait.Justice,
				description: 'Only the weak whine for justice—the strong make their own rules.'
			},
			{
				trait: NegotiationTrait.Legacy,
				description: 'Listen, I don’t care what happens when I’m gone. I want my toughs shouting my name now, not in a hundred years.'
			},
			{
				trait: NegotiationTrait.Peace,
				description: 'In times of peace, if you pick up a silver coin that’s not yours, the sheriff comes knocking on your door. In war, whole caravans disappear and nobody blinks. Give me war.'
			}
		],
		outcomes: [ '', '', '', '', '', '' ]
	};

	static knight: Negotiation = {
		id: 'negotiation-knight',
		name: 'Knight',
		description: `
While not an idealist, the knight is a loyal servant of their liege and a stickler for duty. The knight knows their place in a regimented society and believes everyone else should keep to their own.

The knight archetype can be used for any other local authority, such as a village elder, town guard officer, or academic professor.`,
		impression: 2,
		interest: 1,
		patience: 1,
		motivations: [
			{
				trait: NegotiationTrait.HigherAuthority,
				description: 'That’s above my pay grade. If my superiors sign off on it, then so do I.'
			},
			{
				trait: NegotiationTrait.Justice,
				description: 'Thank you for bringing this to my attention. I agree, this must be put right. The only question is how.'
			},
			{
				trait: NegotiationTrait.Peace,
				description: 'People like us, we fight so that the common folk don’t have to. If I must, I’ll draw the sword again, to keep the peace.'
			},
			{
				trait: NegotiationTrait.Revelry,
				description: 'Every agreement should be sealed with a toast. Huzzah!'
			}
		],
		pitfalls: [
			{
				trait: NegotiationTrait.Benevolence,
				description: 'These people don’t need charity, they need order. Let them go to the town hall, and they’ll get a full belly in exchange for an honest day’s work.'
			},
			{
				trait: NegotiationTrait.Freedom,
				description: 'None of us are free—from the lowliest servant on up. Even a monarch has a duty to their people.'
			},
			{
				trait: NegotiationTrait.Power,
				description: 'My power comes to me through my lawful oath, not by some dirty deal made in secret.'
			},
			{
				trait: NegotiationTrait.Vengeance,
				description: 'I believe in law, not vengeance, and law is decided by higher courts. I’m just a functionary.'
			}
		],
		outcomes: [ '', '', '', '', '', '' ]
	};

	static guildmaster: Negotiation = {
		id: 'negotiation-guildmaster',
		name: 'Guildmaster',
		description: `
The guildmaster knows the value of a coin and that knowledge—inside information and trade secrets—is the most valuable currency. They bargain accordingly.

The guildmaster archetype can be used for any other local information broker, such as a cult leader, hag, or spy.`,
		impression: 3,
		interest: 1,
		patience: 1,
		motivations: [
			{
				trait: NegotiationTrait.Benevolence,
				description: 'The people can’t take care of themselves. Somebody’s got to look after them, the poor lambs.'
			},
			{
				trait: NegotiationTrait.Discovery,
				description: 'It would be highly illegal for you to show me those schematics you got from a rival guild. Likewise, it would be highly illegal for me to slide you this bag of gold.'
			},
			{
				trait: NegotiationTrait.Power,
				description: 'Who do you think will be in charge in the next age? The nobles? Pah! They still count their wealth in cows. No, whoever controls the information will rule the world—and I intend for it to be us.'
			},
			{
				trait: NegotiationTrait.Protection,
				description: 'We have rivals—hungry opportunists who will stop at nothing. If I want to protect my guild, I’ve got to do unto them before they do unto us.'
			}
		],
		pitfalls: [
			{
				trait: NegotiationTrait.HigherAuthority,
				description: 'My loyalty is to the guild—not the burgomaster, not the king, not Ajax himself. But don’t tell them I said that.'
			},
			{
				trait: NegotiationTrait.Justice,
				description: 'We’re reshaping the world here. Of course, some people who can’t adapt are going to find themselves on the bottom, and they’re going to blame us for it—but I had thought you were smarter than that.'
			},
			{
				trait: NegotiationTrait.Peace,
				description: 'Conflict isn’t bad in itself. It drives innovation. The key is not to be on the losing side.'
			},
			{
				trait: NegotiationTrait.Revelry,
				description: 'I don’t have time for this foolishness. Come talk to me again when you have something of value to show me.'
			}
		],
		outcomes: [ '', '', '', '', '', '' ]
	};

	static warlord: Negotiation = {
		id: 'negotiation-warlord',
		name: 'Warlord',
		description: `
The warlord has raised their banner, and troops flock to their cause. Some say they never negotiate, but that’s not true—they’re happy to listen to terms of surrender.

The warlord archetype can be used for any other local-level threat, such as a vampire, hobgoblin bloodlord, or rebellious noble.`,
		impression: 4,
		interest: 1,
		patience: 1,
		motivations: [
			{
				trait: NegotiationTrait.Freedom,
				description: 'I’m not paying a coin to some weakling liege lord for the privilege of being told what to do. I’ve raised my banner. I defy anyone to pull it down.'
			},
			{
				trait: NegotiationTrait.Legacy,
				description: 'Did you see that young captain out there putting the fear of the gods into her troops? That’s my kid, but she earned her title. Someday this will all be hers.'
			},
			{
				trait: NegotiationTrait.Peace,
				description: 'Look around you. Everywhere you look — weakness, corruption, waste. Peace is a noble goal, but we won’t have peace until the current regime is swept away.'
			},
			{
				trait: NegotiationTrait.Vengeance,
				description: 'Have you suffered like I have at the hands of that accursed villain? If so, then I’ll gladly call you friend.'
			}
		],
		pitfalls: [
			{
				trait: NegotiationTrait.Benevolence,
				description: 'Go back to your street corner and beg for alms if that’s what you’re after. You’ll get nothing from me.'
			},
			{
				trait: NegotiationTrait.Discovery,
				description: 'What does that have to do with me? I’m a soldier, not a scholar.'
			},
			{
				trait: NegotiationTrait.Justice,
				description: 'You dare call me unjust? I make the laws here. Justice is mine to give or take away!'
			},
			{
				trait: NegotiationTrait.Protection,
				description: 'I’m not some sniveling coward who begs for protection, and neither are my troops. Anyone who asks for safety doesn’t deserve it.'
			}
		],
		outcomes: [ '', '', '', '', '', '' ]
	};

	static burgomaster: Negotiation = {
		id: 'negotiation-burgomaster',
		name: 'Burgomaster',
		description: `
The burgomaster’s power comes from their constituents, and for the most part they aim to serve them. They’re experienced negotiators, never giving up any more than they mean to.

The burgomaster archetype can be used for any other local ruler, such as a baron, governor, or a watch captain in a metropolis.`,
		impression: 5,
		interest: 1,
		patience: 1,
		motivations: [
			{
				trait: NegotiationTrait.Greed,
				description: 'Keep talking. I’m sure we can come to an agreement that benefits all parties. A rising tide and all that.'
			},
			{
				trait: NegotiationTrait.HigherAuthority,
				description: 'No one can accuse me of being disloyal. What my duty demands, I do—but let’s determine the most sensible way to go about it.'
			},
			{
				trait: NegotiationTrait.Justice,
				description: 'The rule of law must be preserved. If you have evidence of crimes, they must be punished.'
			},
			{
				trait: NegotiationTrait.Protection,
				description: 'The [weak], the helpless … they depend upon me and, to a lesser extent, civic-minded heroes like yourselves. Together we’ll make sure the people come to no harm.'
			}
		],
		pitfalls: [
			{
				trait: NegotiationTrait.Vengeance,
				description: 'In politics you have to have a short memory. Your enemy today may be your ally tomorrow. There’s no need to make things personal.'
			},
			{
				trait: NegotiationTrait.Discovery,
				description: 'Trust me. No good is going to come from poking that particular beehive.'
			},
			{
				trait: NegotiationTrait.Freedom,
				description: 'Freedom, eh? What’s next, freedom from taxes? No one is born free except the gods, and only fools believe otherwise.'
			},
			{
				trait: NegotiationTrait.Revelry,
				description: 'Put that bottle away. I’m a public figure, I can’t be seen carousing and gallivanting and who knows what else.'
			}
		],
		outcomes: [ '', '', '', '', '', '' ]
	};

	static virtuoso: Negotiation = {
		id: 'negotiation-virtuoso',
		name: 'Virtuoso',
		description: `
The virtuoso is the preeminent musician in the land — perhaps a celebrated opera singer or composer. If you need a cause popularized or an enemy’s name tarnished, then you come to them.

The virtuoso archetype can be used for any other local celebrity, such as a master crafter, inspired artist, famous gladiator, or world champion.`,
		impression: 6,
		interest: 1,
		patience: 1,
		motivations: [
			{
				trait: NegotiationTrait.Freedom,
				description: 'I follow my muse, my only master. Who would dare put handcuffs on art?'
			},
			{
				trait: NegotiationTrait.Legacy,
				description: 'Castles will crumble. Empires will fall. But if I can only produce a work worthy of my talents, my name will live forever.'
			},
			{
				trait: NegotiationTrait.Peace,
				description: 'In war, bronze statues are melted down for armor. Money is wasted on ballistae instead of ballads. War is a crime against the god of art.'
			},
			{
				trait: NegotiationTrait.Revelry,
				description: 'Yes, tonight let us celebrate! Inspiration looks down kindly on those who drink life to the dregs.'
			}
		],
		pitfalls: [
			{
				trait: NegotiationTrait.Greed,
				description: 'You offer me money? Money comes to geniuses—it is our due. I can get it from a thousand admirers.'
			},
			{
				trait: NegotiationTrait.Power,
				description: ' I have no ambitions beyond this opera house. For me to leave this place, even for a palace or a throne … it would be an exile for me.'
			},
			{
				trait: NegotiationTrait.Protection,
				description: 'I’m not afraid. The god of music will look after her own.'
			},
			{
				trait: NegotiationTrait.Vengeance,
				description: 'Perhaps there are some who hate me … some who think I stand in their way, or some whose accomplishments I have eclipsed. But I hate no one and am jealous of no one.'
			}
		],
		outcomes: [ '', '', '', '', '', '' ]
	};

	static highPriest: Negotiation = {
		id: 'negotiation-high-priest',
		name: 'High Priest',
		description: `
The high priest may be a high-ranking member of their faith, but as they are quick to tell you, that doesn’t make them free to act as they wish. The commands of their deity must be paramount.

The high priest archetype can be used for any other national authority, such as a count, judge, or general.`,
		impression: 7,
		interest: 1,
		patience: 1,
		motivations: [
			{
				trait: NegotiationTrait.Benevolence,
				description: 'We are agreed on this matter. If this threat puts people in danger, we must come to their rescue.'
			},
			{
				trait: NegotiationTrait.Discovery,
				description: 'Oh indeed? Um ... I would be interested in looking at that document further. Surely no harm can come from being aware of the snares and dangers in the world.'
			},
			{
				trait: NegotiationTrait.HigherAuthority,
				description: 'Indeed, my appointed duty is to serve everyone—whether it be my deity, my liege, or the poorest person crying out in need.'
			},
			{
				trait: NegotiationTrait.Justice,
				description: 'Rest assured, the good will receive their just reward, and the evil will be punished. I will see to it.'
			}
		],
		pitfalls: [
			{
				trait: NegotiationTrait.Greed,
				description: 'Don’t offer that to me. Donate it to the faith, if you have no need of it.'
			},
			{
				trait: NegotiationTrait.Legacy,
				description: 'Me? I am no one. My good deeds, if I have any, are to my deity’s credit, not my own.'
			},
			{
				trait: NegotiationTrait.Power,
				description: 'My current responsibilities are quite enough. I have no desire for more.'
			},
			{
				trait: NegotiationTrait.Revelry,
				description: 'For shame! Do you boast of doing evil—and expect me to join you in it?'
			}
		],
		outcomes: [ '', '', '', '', '', '' ]
	};

	static duke: Negotiation = {
		id: 'negotiation-duke',
		name: 'Duke',
		description: `
As the duke gestures you to join him at his card table, spies whisper into his ear. The duke never plays a game or enters a negotiation unless he thinks he can gain the high card.

The duke archetype can be used for any other royal counselor, such as an archmage, spymaster, vizier, or even a beloved jester.`,
		impression: 8,
		interest: 1,
		patience: 1,
		motivations: [
			{
				trait: NegotiationTrait.Discovery,
				description: 'My agents have brought me many whispers, but this is news to me. Who else knows of this?'
			},
			{
				trait: NegotiationTrait.HigherAuthority,
				description: 'I must do as my liege commands.'
			},
			{
				trait: NegotiationTrait.Peace,
				description: 'We must have stability. I will sacrifice anything—and anyone—for this.'
			},
			{
				trait: NegotiationTrait.Vengeance,
				description: 'There is one—I will not speak their name—who thinks I have forgotten what they did to me. Someday they will discover that I have a long memory. Perhaps you have no love for this person either.'
			}
		],
		pitfalls: [
			{
				trait: NegotiationTrait.Benevolence,
				description: 'Do you think I do what I do because I love my fellow people? Half of them are nitwits, and the other half are villains. But without them, I’d be the Duke of Nothing, so I must preserve them.'
			},
			{
				trait: NegotiationTrait.Greed,
				description: 'Put away your gold. I’m far too busy to spend it.'
			},
			{
				trait: NegotiationTrait.Justice,
				description: 'Right and wrong? There is no right, except what strengthens the kingdom, and there is no wrong, except what hurts it.'
			},
			{
				trait: NegotiationTrait.Protection,
				description: 'I don’t care about saving lives. We’re all doomed to die. The question is, what will live on after us.'
			}
		],
		outcomes: [ '', '', '', '', '', '' ]
	};

	static dragon: Negotiation = {
		id: 'negotiation-dragon',
		name: 'Dragon',
		description: `
The dragon’s tremendous might is only overshadowed by their boundless ambition and pride.

The dragon archetype can be used for any other kingdom- level threat, such as a fire giant chief, a contender for a throne, or Lord Syuul.`,
		impression: 9,
		interest: 1,
		patience: 1,
		motivations: [
			{
				trait: NegotiationTrait.Freedom,
				description: 'Yes, my ambitions have been bound to the earth far too long. It’s time I took flight.'
			},
			{
				trait: NegotiationTrait.Greed,
				description: 'Bring me tribute now, and when I rule I will not forget you.'
			},
			{
				trait: NegotiationTrait.Protection,
				description: 'My people have been mistreated for centuries. It ends now!'
			},
			{
				trait: NegotiationTrait.Vengeance,
				description: 'This land, these people, their treasures, rightfully mine. Stolen from me!'
			}
		],
		pitfalls: [
			{
				trait: NegotiationTrait.Legacy,
				description: 'No heir will outlive me, no legend will remember my past glory ... for I shall never die!'
			},
			{
				trait: NegotiationTrait.Peace,
				description: 'You want to make peace? When there are still things in the world that are not yet mine?'
			},
			{
				trait: NegotiationTrait.Power,
				description: 'How can you possibly offer me power?'
			},
			{
				trait: NegotiationTrait.Revelry,
				description: 'My pleasures are as far beyond your comprehension as yours are to a worm.'
			}
		],
		outcomes: [ '', '', '', '', '', '' ]
	};

	static monarch: Negotiation = {
		id: 'negotiation-monarch',
		name: 'Monarch',
		description: `
Whether they’re good or evil, the monarch is accustomed to authority—and wants to keep it. They respond better to pleas than to demands.

The monarch archetype can be used for any other kingdom-level ruler, such as a tyrant, a theocracy’s archpriest, or a republic’s consul.`,
		impression: 10,
		interest: 1,
		patience: 1,
		motivations: [
			{
				trait: NegotiationTrait.Benevolence,
				description: 'It’s not for nothing I’m called “the Good.”'
			},
			{
				trait: NegotiationTrait.Greed,
				description: 'Your offer intrigues me. In truth, our coffers are not as full as I should like.'
			},
			{
				trait: NegotiationTrait.Justice,
				description: 'Ah, do the villains ignore my laws? They must be punished!'
			},
			{
				trait: NegotiationTrait.Legacy,
				description: ' If I should die, promise me this: you will serve my heir as loyally as you have served me.'
			}
		],
		pitfalls: [
			{
				trait: NegotiationTrait.Discovery,
				description: 'Keep your secrets to yourself. I’m a monarch, not a spymaster.'
			},
			{
				trait: NegotiationTrait.Freedom,
				description: 'Freedom? Some of my disloyal subjects speak that word a little too often for my liking. I hope you’re not one of them.'
			},
			{
				trait: NegotiationTrait.HigherAuthority,
				description: 'Do you dare give orders to me? Never forget, no matter who sent you, I rule here!'
			},
			{
				trait: NegotiationTrait.Vengeance,
				description: 'Revenge is an exciting sport. Sadly, it’s one I’ve had to give up. It’s policy, not revenge, that rules here.'
			}
		],
		outcomes: [ '', '', '', '', '', '' ]
	};

	static lich: Negotiation = {
		id: 'negotiation-lich',
		name: 'Lich',
		description: `
The lich spent centuries alone, studying and building their power … but now the time for studying is over. The lich is willing to negotiate with strong heroes: they can make loyal lieutenants, or strong undead servants if the talks don’t go well.

The lich archetype can be used for any other world- shaking threat, such as a would-be emperor or Count Rhodar von Glauer.`,
		impression: 11,
		interest: 1,
		patience: 1,
		motivations: [
			{
				trait: NegotiationTrait.Discovery,
				description: 'Give me that book at once! Your very touch pollutes it.'
			},
			{
				trait: NegotiationTrait.Power,
				description: 'Yes … yes … power! Ahahahaha! Bring me this power and you will be rewarded.'
			},
			{
				trait: NegotiationTrait.Revelry,
				description: 'Join my court for the coming feast! We shall know such entertainments as were never seen in this world before.'
			},
			{
				trait: NegotiationTrait.Vengeance,
				description: 'The world despised me … banished me … forgot me. The world shall regret it.'
			}
		],
		pitfalls: [
			{
				trait: NegotiationTrait.Benevolence,
				description: 'Do you ask the farmer to pity the wheat before it’s harvested?'
			},
			{
				trait: NegotiationTrait.Legacy,
				description: 'I don’t care what the common people think of me. The less they think of me the better, as long as they obey my commands.'
			},
			{
				trait: NegotiationTrait.Peace,
				description: 'Yes, yes, peace will come … eventually.'
			},
			{
				trait: NegotiationTrait.Protection,
				description: 'If you’re so intent on saving lives, then bow down before me! No harm will come to my servants.'
			}
		],
		outcomes: [ '', '', '', '', '', '' ]
	};

	static deity: Negotiation = {
		id: 'negotiation-deity',
		name: 'Deity',
		description: `
The deity will listen to your prayers, and perhaps answer them as well—if the mood strikes them.

The deity archetype can be used for any other world-transcending power, such as Cthrion Uroniziir or Khorsekhef the Infinite.`,
		impression: 12,
		interest: 1,
		patience: 1,
		motivations: [
			{
				trait: NegotiationTrait.Benevolence,
				description: 'Worry not … I have sent champions to save the world. Perhaps these champions … are closer than you think.'
			},
			{
				trait: NegotiationTrait.Legacy,
				description: 'When that blessed day comes, all shall come before me to pray, and I shall offer my blessings to the world!'
			},
			{
				trait: NegotiationTrait.Power,
				description: 'Although I am all-powerful on the spiritual realm, my hands are bound in such worldly matters. But if you act for me, I can offer a little assistance.'
			},
			{
				trait: NegotiationTrait.Protection,
				description: 'Have faith, little one… none will be forgotten or left behind.'
			}
		],
		pitfalls: [
			{
				trait: NegotiationTrait.Discovery,
				description: 'Mortal, what can you tell me that I do not know?'
			},
			{
				trait: NegotiationTrait.Freedom,
				description: 'True freedom lies in service to me. Surrender your freedom and I shall raise you up high.'
			},
			{
				trait: NegotiationTrait.Greed,
				description: 'Fool! Do you seek to offer me what is mine?'
			},
			{
				trait: NegotiationTrait.HigherAuthority,
				description: 'Who do you speak of? Who is beyond me, who is above me? Who will live to see me die, and who drew breath before I gave it? Let them come forth and say their name!'
			}
		],
		outcomes: [ '', '', '', '', '', '' ]
	};
}
