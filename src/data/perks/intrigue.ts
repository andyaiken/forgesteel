import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureType } from '../../enums/feature-type';
import { Perk } from '../../models/perk';
import { PerkList } from '../../enums/perk-list';

export class IntriguePerkData {
	static criminalContacts: Perk = {
		id: 'perk-criminal-contacts',
		name: 'Criminal Contacts',
		description: 'You have access to a network of criminal contacts. As a respite activity during a respite in a settlement, you can ask a question of your contacts. Make a Presence test. On a tier 2 result, you gain knowledge that would be common among criminals (e.g. the secret entrances into a building, the location of a local, hidden criminal, the name of a local thieves’ guild leader). On a tier 3 result, you can also gain knowledge that would be uncommon among criminals, if such information exists (e.g. the location of a local treasure stock, the location of a murder weapon used in a noble’s assassination, the name of an NPC secretly bankrolling a local assassin’s guild).',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Intrigue
	};

	static forgettableFace: Perk = {
		id: 'perk-forgettable-face',
		name: 'Forgettable Face',
		description: 'If you interact with a creature for less than 10 minutes and they haven’t met you before in the past, you can cause them to forget your face when you part. If asked to describe you, they give only a vague, blank, and unhelpful description. Additionally, if you spend at least 1 hour assembling a disguise, creatures who meet you in that disguise do not recognize your true face later from when you were in disguise.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Intrigue
	};

	static gumUpTheWorks: Perk = {
		id: 'perk-gum-up-the-works',
		name: 'Gum Up The Works',
		description: 'You prevent a trap from activating.',
		type: FeatureType.Ability,
		data: {
			ability: FactoryLogic.createAbility({
				id: 'perk-gum-up-the-works-1',
				name: 'Gum Up The Works',
				description: 'You prevent a trap from activating.',
				type: FactoryLogic.type.createTrigger('A mundane trap activates within 3 squares of you.'),
				keywords: [],
				distance: [ FactoryLogic.distance.createSelf() ],
				target: 'Self',
				sections: [
					FactoryLogic.createAbilitySectionText('You can move up to 3 squares toward the trap. If you’re adjacent to any of the trap’s mechanisms after this movement, you jam the trap, preventing it from activating. So long as you stay adjacent to the mechanism, the trap can’t go off. If an attempt to disarm the trap you are stall fails, it goes off.')
				]
			})
		},
		list: PerkList.Intrigue
	};

	static luckyDog: Perk = {
		id: 'perk-lucky-dog',
		name: 'Lucky Dog',
		description: 'When you fail a test using any skill from the intrigue skill group, you can roll a d6. You lose Stamina equal to the roll and improve the result of your test by one tier. You can use this perk only once per test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Intrigue
	};

	static masterOfDisguise: Perk = {
		id: 'perk-master-of-disguise',
		name: 'Master of Disguise',
		description: 'You can don or remove a disguise as part of any Hide test you make or while taking the Hide maneuver.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Intrigue
	};

	static slippedLead: Perk = {
		id: 'perk-slipped-lead',
		name: 'Slipped Lead',
		description: 'You have an edge on checks made to escape bonds. Given at least 1 minute uninterrupted, you can escape any mundane bonds without making a test. Additionally, it’s not immediately obvious when you’ve escaped bonds until you use an ability that harms other creatures, cast them off, or do something else obvious that makes it clear you are unbound.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Intrigue
	};
}
