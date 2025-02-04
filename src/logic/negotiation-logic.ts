import { NegotiationTrait } from '../enums/negotiation-trait';

export class NegotiationLogic {
	static getMotivationDescription = (trait: NegotiationTrait) => {
		switch (trait) {
			case NegotiationTrait.Benevolence:
				return 'An NPC with the benevolence motivation believes in sharing what they have with others. However, an NPC involved in a negotiation must be limited in their benevolence, so that they don’t just give the heroes what they need.';
			case NegotiationTrait.Discovery:
				return 'An NPC with the discovery motivation wants to learn new lore, explore forgotten places, break ground with new experiments, or uncover artifacts lost to time. Their curiosity and quest for knowledge might be driven by a specific goal, such as seeking the cure for a rare disease or a portal to a specific far-off world. Or it could be that they are a naturally inquisitive person who just wants to understand all they can about the timescape.';
			case NegotiationTrait.Freedom:
				return 'An NPC with the freedom motivation wants no authority above them and desires no authority over others. They might already have personal freedom and wish to maintain that status quo, or they might wish to liberate themself or others from someone else’s authority.';
			case NegotiationTrait.Greed:
				return 'An NPC with the greed motivation desires wealth and resources above almost anything else. Sometimes these NPCs are misers, much like wyrms who hoard coins and gems but never spend or donate them. Others flaunt their wealth, viewing it as a sign of their station in life.';
			case NegotiationTrait.HigherAuthority:
				return 'An NPC with the higher authority motivation remains staunchly loyal to a person or force they perceive as more important than themself. This higher authority could be an organization, a deity or being of great power, a formal leader such as a noble or monarch, a mystical presence or force the NPC might not fully understand, or a person the NPC sees as an informal authority figure (an older sibling, a personal hero, and so forth).';
			case NegotiationTrait.Justice:
				return 'An NPC with the justice motivation wants to see the righteous rewarded and the wicked punished, however subjective their sense of who or what is good and evil. A priest who venerates a god of nature might believe that all who protect plants and animals are righteous, and that who harvest natural resources as miners and lumberjacks do must die. Having a justice motivation doesn’t necessarily make an NPC a kind or charitable person.';
			case NegotiationTrait.Legacy:
				return 'An NPC with the legacy motivation desires fame while alive and acclaim that lasts long after their death. They hope others will know and remember their deeds, great or terrible. Some of these NPCs might even seek immortality through deification or undeath, so that the eventual shedding of their mortal coil doesn’t prevent them from continuing to make history.';
			case NegotiationTrait.Peace:
				return 'An NPC with the peace motivation wants calm in their life. Under typical circumstances, they want to be left alone to run their business, farm, kingdom, criminal empire, or whatever small slice of the timescape is theirs. Some such NPCs don’t have peace and need help obtaining it, while others want their peaceful status quo to be maintained.';
			case NegotiationTrait.Power:
				return 'An NPC with the power motivation covets the authority of others. They want to increase their influence, no matter how great it already is, and maintain their domain. They might seek power through conquering others, the collection of artifacts, or through the infusion of supernatural rituals - though why choose one method when all three together achieve the best results? Some such NPCs are world-traversing tyrants, but the petty administrators of village organizations and shrines can covet power just as hungrily.';
			case NegotiationTrait.Protection:
				return 'An NPC with the protection motivation has land, people, information, items, or an organization they want protected above all else. Keeping their charge safe is a duty they hold dear, and aiding in that protection earns their favor. Most people have friends or family they wish to protect, but an NPC with the protection motivation believes in doing so above all else.';
			case NegotiationTrait.Revelry:
				return 'An NPC with the revelry motivation just wants to have fun. They enjoy socializing at parties, thrill-seeking, or indulging in other hedonistic activities. Getting pleasure out of life while spending time with people they like is paramount to such NPCs.';
			case NegotiationTrait.Vengeance:
				return 'An NPC with the vengeance motivation wants to harm another who has hurt them. Their desire for revenge could be proportional to the harm that was inflicted upon them, or they might wish to pay back their pain with interest. In some cases, a desire for vengeance can be satisfied only by the death of another, but an NPC might wish to pay back their own suffering with embarrassment, career failure, or some other less permanent pain.';
		}
	};

	static getPitfallDescription = (trait: NegotiationTrait) => {
		switch (trait) {
			case NegotiationTrait.Benevolence:
				return 'An NPC with the benevolence pitfall has a cynical view of the world, believing that no creature has a right to anything just by being alive. The idea of helping others because it’s the right thing to do is a preposterous, immature, or inexperienced idea to be laughed off or snuffed out.';
			case NegotiationTrait.Discovery:
				return 'An NPC with the discovery pitfall has no interest in finding new places, peoples, or ideas. It might be that the unknown scares them or makes them so uncomfortable that they’d rather remain ignorant. Alternatively, a previous pursuit of discovery might have turned out poorly for them.';
			case NegotiationTrait.Freedom:
				return 'An NPC with the freedom pitfall believes that a world without authority is one in turmoil and chaos. They might even believe that they are the right person to rule, and that their ideals should be the ones that become the law of the land.';
			case NegotiationTrait.Greed:
				return 'Greed-driven NPCs might share their wealth with a select group of people they love, such as a noble lord who indulges his children’s every desire. Some NPCs might be greedy for resources other than money, such as a demon who wants to collect and devour souls, or a troll lord who hungers endlessly for the flesh of others.';
			case NegotiationTrait.HigherAuthority:
				return 'An NPC with the higher authority pitfall scoffs at the idea of serving another. The NPC might not believe that all people should be free, but they certainly believe that they personally shouldn’t have to answer to anyone.';
			case NegotiationTrait.Justice:
				return 'An NPC with the justice pitfall doesn’t believe that the timescape is an inherently just place, and has no interest in making it one. The world is eternal conflict, there is no such thing as justice, and anyone who thinks otherwise is a naive fool.';
			case NegotiationTrait.Legacy:
				return 'An NPC with a legacy pitfall cares nothing about leaving a personal mark on the world. To them, such vain thinking is nothing but a waste of time.';
			case NegotiationTrait.Peace:
				return 'An NPC with the peace pitfall hates being bored. They want excitement, drama, and danger in their life. For them, there’s nothing worse than the status quo.';
			case NegotiationTrait.Power:
				return 'An NPC with the power pitfall has no interest in authority for themself. They might respect the authority of others, but they hate the thought of ruling over other people and roundly reject any suggestion of the idea.';
			case NegotiationTrait.Protection:
				return 'An NPC with the protection pitfall is happy to leave others to fend for themselves. They don’t believe that it’s their responsibility to protect anyone other than themself, and might be outright disgusted at the thought of risking themself or their property to protect others.';
			case NegotiationTrait.Revelry:
				return 'An NPC with the revelry pitfall sees social encounters and hedonism as a waste of time. They take pleasure only in work or in building their own skills and character. Others who suggest immature debauchery are not worth their time.';
			case NegotiationTrait.Vengeance:
				return 'An NPC with the vengeance pitfall believes that revenge solves nothing. They might have gained this belief first hand, or they might simply not have the ambition to seek revenge - and they take a dim view of others who do.';
		}
	};
}
